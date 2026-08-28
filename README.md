# StorenTech AI

Production marketing site for StorenTech AI, Vincent Jackson’s full-service AI agency in Newport Beach / Corona Del Mar.

Stack: Next.js App Router, TypeScript, custom CSS. Contact form posts to `/api/inquiry` and, when set, to `INQUIRY_WEBHOOK_URL`.

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

Environment:

- `NEXT_PUBLIC_SITE_URL` — public origin for metadata, sitemap, and Open Graph (default `https://storentech.com`)
- `INQUIRY_WEBHOOK_URL` — optional. If set, each inquiry is `POST`ed as JSON (`name`, `email`, `company`, `broken`, `submittedAt`, `source`)
- `NEXT_PUBLIC_VAPI_PUBLIC_KEY` — optional. **Public key only.** Enables the Sarah web widget (assistant `9e0a6184-ccc7-49d2-9ef0-31acfac1cf59`). Leave blank to keep click-to-call only.
- `NEXT_PUBLIC_HEYGEN_EMBED_URL` — optional iframe `src` for Vincent’s HeyGen film. Until set, `/` and `/about` show a placeholder plus the spoken script as transcript.

## Pages

- `/` — hire after the math; Call Sarah; paid ROI → ~30-day employee; catalog groups; HeyGen script; FAQ
- `/work` — front of house, revenue, operations, growth
- `/work/[slug]` — what it includes, who it is for, intake / build / handoff / measurement
- `/how-it-works` — paid analysis, first hire, retainer (named monthly prices live here)
- `/technology` — RAG, voice agents, local vs cloud, human handoff, evaluation
- `/patterns` — illustrative composites, not testimonials
- `/about` — Vincent Jackson, President; HeyGen script
- `/contact` — name, email, company, what’s broken

## HeyGen

No embed was in the repo. Homepage and About include a placeholder plus the spoken script/transcript so it can be pasted into HeyGen. After the film exists, set `NEXT_PUBLIC_HEYGEN_EMBED_URL` to the player URL.

## Sarah / Vapi

Click-to-call `714-613-8557` is on every page. The floating web widget loads only when `NEXT_PUBLIC_VAPI_PUBLIC_KEY` is set (public key, never a private key). Assistant id is already in code.

## Firebase App Hosting (recommended on GCP)

Region: **us-west1**.

1. Copy `.firebaserc.example.json` to `.firebaserc` and put in the Firebase project id.
2. Install the Firebase CLI and log in: `npm i -g firebase-tools && firebase login`
3. Create an App Hosting backend in us-west1, connected to this repo.
4. Set secrets in the backend (`INQUIRY_WEBHOOK_URL` if you use the form webhook). `apphosting.yaml` already declares `NEXT_PUBLIC_SITE_URL`.
5. Deploy from CI or `firebase deploy --only apphosting`

`apphosting.yaml` is the App Hosting run config. Do not put secrets in that file.

## Firebase Hosting (frameworks / Cloud Run)

`firebase.json` is configured for Firebase Hosting with a Next.js source and `frameworksBackend.region` of `us-west1`.

```bash
firebase experiments:enable webframeworks
firebase deploy --only hosting
```

Use App Hosting for a first-class Next.js backend; use Hosting + frameworks if that is already how the GCP project is wired.

## Vercel (alternate)

```bash
npx vercel
```

Set `NEXT_PUBLIC_SITE_URL`, `INQUIRY_WEBHOOK_URL`, and optional `NEXT_PUBLIC_VAPI_PUBLIC_KEY` / `NEXT_PUBLIC_HEYGEN_EMBED_URL` in the Vercel project environment. Framework preset: Next.js.

## Offer (do not change on a whim)

1. Paid Automation ROI Analysis: from $1,000; more complex work can be higher (often $2,000–$3,000). Fee may be credited toward implementation. Never free.
2. First AI employee live in about 30 days if the numbers work.
3. Retainers: around $5,000/mo AI Employee; $7,500/mo Growth. Do not turn the homepage into a price list.

Sarah (live voice demo): 714-613-8557. Office: +1 714-794-9199.
