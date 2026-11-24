# StorenTech AI

Production marketing site for StorenTech AI, Vincent Jackson’s full-service AI agency in Orange County, CA.

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

- `NEXT_PUBLIC_SITE_URL` — public origin for metadata, sitemap, and Open Graph (default `https://www.storentechai.com`). If this is set on Vercel, it must be `https://www.storentechai.com` or it will override the default.
- `NEXT_PUBLIC_INTAKE_URL` — Start your map CTA. Default is the Google Calendar booking link. Set to `https://onboarding.storentechai.com` when ONB1 is live. Not Stripe `/pay`.
- `INQUIRY_WEBHOOK_URL` — optional. If set, each inquiry is `POST`ed as JSON (`name`, `email`, `company`, `broken`, `submittedAt`, `source`)
- `DATABASE_URL` — Neon/Postgres URL for `/free-ai-map` leads (`free_map_leads`). If unset, a valid submit still shows the prompt and nothing is stored. Create the table with `npm run migrate:free-map-leads`.
- Google Search Console verification is hardcoded in the root layout (`google-site-verification`) and is emitted on every page in every environment. `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is unused for that tag.
- `NEXT_PUBLIC_BING_SITE_VERIFICATION` — optional. Bing Webmaster Tools token. Emitted as `msvalidate.01` only when set; empty values produce no tag.
- `AI_CHAT_ENABLED` — preview-only. Set `true` on Vercel Preview to allow the floating FAQ widget to call the model. Forced off when `VERCEL_ENV=production`. If unset, or if no AI Gateway key is present, the widget keeps the scripted FAQ.
- `NEXT_PUBLIC_AI_CHAT_ENABLED` — preview-only client flag. Set `true` on Preview builds so the widget posts to `/api/chat`. Leave unset in Production.
- `AI_GATEWAY_API_KEY` — authenticates the AI SDK to Vercel AI Gateway. On Vercel, `VERCEL_OIDC_TOKEN` can stand in. Do not buy a key if one is missing; leave the flags off.
- `AI_CHAT_MODEL` or `AI_GATEWAY_MODEL` — optional Gateway model id (`provider/model`). Default `openai/gpt-4o-mini`.

## Pages

- `/` — leak-map hero; AI Opportunity Map (Automation ROI Analysis); Sarah; humans in the loop. Start your map → `site.intakeUrl` (calendar booking). No “See the work.”
- `/opportunity` — AI Opportunity Map service page. `/ai-opportunity-map`, `/map`, and `/roia` permanently redirect here (301, single hop).
- `/work` — services catalog; map first, then the Build Plan
- `/how-it-works` — paid AI Opportunity Map, then the Build Plan
- `/about` — StorenTech AI; humans in the loop
- `/contact` — name, email, company, what’s broken
- `/free-ai-map` — free Opportunity Map **prompt** (not the paid Map). Lead capture, then the copy-paste prompt on the page. CTA is a free AI Opportunity Map **conversation**.
- `/pay` and `pay.storentechai.com` — temporary redirect (307) to the homepage (`https://www.storentechai.com/`). Former Stripe Payment Link is retired. Not the Start your map CTA.
- `/redo` — permanently redirects to the homepage (`https://www.storentechai.com/`), including trailing slash, query strings, and the same path on `pay.storentechai.com`.
- `/ceo`, `/cfo`, `/ops` — permanently redirect to the homepage.

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

Set `NEXT_PUBLIC_SITE_URL` and `INQUIRY_WEBHOOK_URL` in the Vercel project environment. Framework preset: Next.js. No special config file is required.

## Offer (do not change on a whim)

1. Paid AI Opportunity Map (an Automation ROI Analysis): a comprehensive deep-dive report on the client’s business — not a quick assessment or a generic checklist. Starting at $1,000. Never free.
2. After the map: the Build Plan. When AI takes the grind, your people get time back for the work that needs a human, so more gets done and the human touch stays where customers feel it. No multiplier or job-cut framing.
3. We do not publish retainers on this site. Ongoing work is scoped from the evidence in the map. The AI Opportunity Map (starting at $1,000, after the value of that report) is the paid front door, not a retainer.

Public contact: phone is `public/sarah-phone.png` (`alt="Call Sarah"`) as an image only. Never render `tel:`, `mailto:`, digits, or email addresses as HTML text. Write-us goes to `/contact` form only.
