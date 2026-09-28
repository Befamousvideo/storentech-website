# Executive interview intake — owner checklist (Windows)

This service runs on your PC. Answers and audio stay on this machine. The public website only hosts empty pages. Do not put answers, audio, keys, or the real questions file in GitHub or Vercel.

You already have Docker Desktop and Tailscale signed in. The hardened stack that provides `storentech_postgres` on network `storentech_hardened_storentech_net` should already be running.

Funnel is public. Serve stays tailnet-only. Do not run Funnel on port 443.

## 1. Pull the code from GitHub

In PowerShell:

```powershell
cd $HOME\src\storentech-website   # or wherever you keep the repo
git pull origin main
cd services\exec-interview
```

If this folder is not on `main` yet, check out the branch that added it, then pull.

## 2. Copy the questions JSON into place

The repo has dummy questions only.

```powershell
copy questions.example.json questions.json
```

Replace `questions.json` with the real interview file. Keep the same shape (see `questions.schema.json`):

- `company_label` (use `Company 111`, not a legal name)
- `roles.ceo`, `roles.cfo`, `roles.ops`
- each question: `id`, `text`, `tag` (`must` or `if_time`), `follow_ups` (boolean)

`questions.json` is gitignored. Do not commit it.

## 3. Create the env file and database user

```powershell
copy .env.example .env
notepad .env
```

Set at least:

- `DATABASE_ADMIN_URL` — postgres superuser URL on the Docker network, for example `postgresql://postgres:YOUR_ADMIN_PASSWORD@storentech_postgres:5432/postgres`
- `DATABASE_PASSWORD` — new password for the least-privilege `exec_interview` user (make one up)
- `DATABASE_URL` — `postgresql://exec_interview:THE_SAME_PASSWORD@storentech_postgres:5432/exec_interviews`
- `CORS_DEV_ORIGIN=http://localhost:3000` if you will test the Next.js app on this PC
- `SITE_PUBLIC_URL=https://www.storentechai.com`

Leave the `INTERVIEW_KEY_HASH_*` lines empty until step 7.

Confirm the Postgres container is up:

```powershell
docker ps --filter name=storentech_postgres
docker network inspect storentech_hardened_storentech_net
```

## 4. Run the migration

The compose file expects `questions.json` to exist (step 2). Build the image, then provision the new database and user and apply the schema. This is idempotent.

```powershell
docker compose build interview-api
docker compose run --rm --no-deps interview-api python -m scripts.migrate --provision
```

`--provision` creates database `exec_interviews` and role `exec_interview` if they are missing, then applies `sql/001_init.sql`. You can run it again safely.

If the admin URL is wrong, the command fails and nothing is exposed.

## 5. Start the stack (auto-restart with Docker Desktop)

```powershell
docker compose up -d
```

Both services use `restart: unless-stopped`, so they come back when Docker Desktop starts after a reboot.

Compose publishes the intake API on `127.0.0.1:8443` only. Whisper is on the private `exec_interview_net` network and is **not** published to the host. The API also joins `storentech_hardened_storentech_net` so it can reach Postgres. No other stack is modified.

GPU: the Whisper service requests one NVIDIA device. In Docker Desktop, enable GPU support (Settings → Resources → GPU). The image is the machine-local `max/whisper-service:local`.

## 6. Verify health

From PowerShell on the PC:

```powershell
curl.exe http://127.0.0.1:8443/health
```

You want `{"ok":"true","service":"interview-intake"}`.

Whisper is not on localhost. Check it from the API container:

```powershell
docker compose exec interview-api python -c "import urllib.request; print(urllib.request.urlopen('http://whisper:8000/health', timeout=10).read())"
```

Optional warmup (first call can be slow while the model loads):

```powershell
docker compose exec interview-api python -c "import urllib.request; print(urllib.request.urlopen('http://whisper:8000/warmup', timeout=180).read())"
```

### Confirm the Whisper request shape

The intake service defaults to:

`POST http://whisper:8000/transcribe` as multipart, field name `file`.

To see what the image actually expects:

```powershell
docker compose exec interview-api python -c "import urllib.request; print(urllib.request.urlopen('http://whisper:8000/openapi.json', timeout=10).read().decode())"
```

If `/openapi.json` is missing, try `/docs` in a one-off curl, or read the image’s own README.

If the field name or path is different, set in `.env` and recreate:

```
WHISPER_MODE=multipart
WHISPER_PATH=/transcribe
WHISPER_FILE_FIELD=file
```

If you switch to an OpenAI-compatible server (faster-whisper-server / speaches) instead of `max/whisper-service:local`:

```
WHISPER_MODE=openai
WHISPER_URL=http://whisper:8000
```

That sends `POST /v1/audio/transcriptions`. Then `docker compose up -d --force-recreate interview-api`.

## 7. Generate the three private links

On the PC (hashes only go into `.env`; the raw key is printed once):

```powershell
docker compose run --rm --no-deps interview-api python -m scripts.generate_key --role ceo
docker compose run --rm --no-deps interview-api python -m scripts.generate_key --role cfo
docker compose run --rm --no-deps interview-api python -m scripts.generate_key --role ops
```

Each command prints:

- `INTERVIEW_KEY_HASH_…=…` — paste this into `.env`
- `Private link: https://www.storentechai.com/ceo#k=…` — send this to that executive. Do not put it in git, email drafts in this repo, or Vercel env.

After all three hashes are in `.env`:

```powershell
docker compose up -d --force-recreate interview-api
```

The `#k=` fragment never reaches Vercel logs. The page reads it in the browser and strips it from the address bar.

## 8. Tailscale Funnel on port 8443 only

Your machine already uses tailnet-only `tailscale serve` on 443 for other apps. Leave that alone. Funnel is a different command. Funnel may only listen on 443, 8443, or 10000. Use 8443.

Turn Funnel on for the intake service only:

```powershell
tailscale funnel --bg --https=8443 8443
```

That proxies public `https://<this-pc>.<tailnet>.ts.net:8443` to `http://127.0.0.1:8443`.

Check Funnel (should show 8443, not 443):

```powershell
tailscale funnel status
```

Confirm Serve on 443 is still tailnet-only (not Funnel):

```powershell
tailscale serve status
```

If `funnel status` shows port 443, turn that Funnel off immediately:

```powershell
tailscale funnel --https=443 off
```

and put Serve back if you had to fix it (`tailscale serve --bg --https=443 <your-existing-target>`).

Pick the Funnel hostname from `tailscale funnel status` or `tailscale status`. It looks like `storentechai26.<tailnet>.ts.net`. Use a placeholder in git. The real hostname goes only into Vercel as `NEXT_PUBLIC_INTERVIEW_API`.

Quick check from the PC:

```powershell
curl.exe -I https://YOUR-MACHINE.YOUR-TAILNET.ts.net:8443/health
```

## 9. Set `NEXT_PUBLIC_INTERVIEW_API` in Vercel

This is a public build-time variable (the browser calls this URL directly). It is not a secret, but do not commit the real hostname.

In the Vercel project:

1. Settings → Environment Variables
2. Name: `NEXT_PUBLIC_INTERVIEW_API`
3. Value: `https://YOUR-MACHINE.YOUR-TAILNET.ts.net:8443` (no trailing slash)
4. Choose Preview first. Only add Production when you are ready to send links. This repo work must not ship a production deploy by itself.
5. Redeploy the preview (or production, later) so the client bundle picks up the value.

Do not set interview keys, questions, or database URLs in Vercel.

## 10. Test on phone and laptop

1. Open the CEO private link on a laptop (Chrome or Edge, then Safari).
2. Confirm the address bar loses `#k=…` after load.
3. Confirm the header shows `Company 111` and `CEO`.
4. Type an answer. Wait a second. Refresh. The draft should come back.
5. Record a short answer with the microphone (Chrome = webm; iPhone Safari = mp4). You should see “transcribing…”, then editable text.
6. Deny the microphone once and confirm you can still type.
7. Add a follow-up row on a question that has follow-ups. Wishlist / if-time questions should not show those fields.
8. Repeat on an iPhone (Safari) and an Android phone (Chrome) on cellular, not only Wi-Fi.
9. Put the PC to sleep, try to save, and confirm the page says the draft is safe on the device.
10. Submit when the required questions are filled. Optional questions can stay empty.

Export locally when you want a file for report writers (this never uploads):

```powershell
docker compose exec interview-api python -m scripts.export_answers --role ceo --out /app/exports
```

Files land in `services\exec-interview\exports\` on the PC.

## 11. Take it down

The interview is temporary. Submitting a role already burns that role’s key. Answers stay in local Postgres (`exec_interviews`). Do not drop that database until the write-up is done.

### Turn off Funnel (8443 only)

Does not change tailnet-only Serve on 443:

```powershell
tailscale funnel --https=8443 off
tailscale funnel status
tailscale serve status
```

### Revoke leftover keys

Close any role that has not submitted yet (or close all three):

```powershell
cd path\to\storentech-website\services\exec-interview
docker compose exec interview-api python -m scripts.revoke_key --all --clear-env
```

One role only:

```powershell
docker compose exec interview-api python -m scripts.revoke_key --role ceo --clear-env
```

Same thing via the key CLI:

```powershell
docker compose exec interview-api python -m scripts.generate_key --role ceo --revoke
```

Then recreate the API so a blank hash in `.env` is loaded:

```powershell
docker compose up -d --force-recreate interview-api
```

Old private links then show a thank-you / closed page, not the form.

### Stop the containers

Postgres and other compose projects stay up. Answers stay in `exec_interviews`.

```powershell
cd path\to\storentech-website\services\exec-interview
docker compose down
```

Do not `up -d` again unless you need another export. Whisper and the intake API will stay down across Docker Desktop restarts once they are down.

Export before or after stop, as long as Postgres is running:

```powershell
docker compose up -d interview-api
docker compose exec interview-api python -m scripts.export_answers --role ceo --out /app/exports
docker compose down
```

### Remove the public routes (follow-up PR)

The marketing site still has empty `/ceo`, `/cfo`, and `/ops` shells until you delete them. Open a **follow-up** pull request (do not reuse this one as a production deploy). Remove or revert:

- `src/app/(interview)/` — `ceo/page.tsx`, `cfo/page.tsx`, `ops/page.tsx`, `layout.tsx`
- `src/components/interview/` — form, closed state, tests
- `src/lib/interview.ts`, `src/lib/interview-paths.ts`, `src/lib/interview.test.ts`
- `src/app/robots.ts` — drop `/ceo` `/cfo` `/ops` from `*` and delete the named-bot rules
- `src/app/robots.test.ts`
- `src/middleware.ts` — interview `X-Robots-Tag` branch
- `next.config.ts` — interview `headers()` block
- `src/components/SiteChrome.tsx` — `isInterviewPath` slim chrome
- `src/app/globals.css` — `.interview-*` styles
- `.env.example` and `README.md` — `NEXT_PUBLIC_INTERVIEW_API` lines
- `vitest.config.ts` / `src/test/setup.ts` only if nothing else uses them

Leave `src/app/sitemap.ts` as-is (it never listed these routes). Leave `services/exec-interview/` on the PC until exports are finished; you do not have to delete it from git in the same PR.

Then remove `NEXT_PUBLIC_INTERVIEW_API` from Vercel (Preview and Production if you added it) and redeploy so the public bundle no longer points at your PC.

When the write-up is finished and you want the rows gone:

```sql
DROP DATABASE IF EXISTS exec_interviews;
DROP ROLE IF EXISTS exec_interview;
```

## Notes

- Audio is written to a temp file, sent to Whisper, then deleted. It is not kept on disk and is not logged.
- The API does not store IP addresses or user agents.
- Access keys are accepted only on header `X-Interview-Key`, never on the query string.
- CORS allows `https://www.storentechai.com`, `https://storentechai.com`, and `CORS_DEV_ORIGIN`.
- If Docker Desktop was not running, the PC was asleep, or Funnel is off, executives will see that their draft is still on the device.
- Submitting a role revokes that role’s key. `python -m scripts.revoke_key` closes a role by hand. Answers stay in local Postgres.
