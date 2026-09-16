# StorenTech AI

Production marketing site for StorenTech AI, Vincent Jackson’s full-service AI agency in Newport Beach / Corona Del Mar.

Stack: Next.js App Router, TypeScript, custom CSS. Contact form posts to `/api/inquiry`. The ROI interview posts to `/api/roi-analysis`. Both forward to `INQUIRY_WEBHOOK_URL` when set (handoff to vincent@storentech.com).

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
- `INQUIRY_WEBHOOK_URL` — optional. Contact and `/roi-analysis` POST JSON here. If unset, the interview still completes and tells the visitor to email vincent@storentech.com or call the office.
- `NEXT_PUBLIC_VAPI_PUBLIC_KEY` — optional. **Public key only — never a private/secret key, and never commit the real value.** Enables the Sarah web widget (assistant `9e0a6184-ccc7-49d2-9ef0-31acfac1cf59`). Leave blank to keep click-to-call only. Next.js inlines `NEXT_PUBLIC_*` at **build** time, so changing the env without a redeploy will not turn the widget on.

## Pages

- `/` — hire after the math; YouTube Short site avatar; Call Sarah; Start the ROI Analysis
- `/roi-analysis` — paid onboarding interview (also `/onboard` → same)
- `/work` — front of house, revenue, operations, growth
- `/work/[slug]` — what it includes, who it is for, intake / build / handoff / measurement
- `/how-it-works` — paid analysis, first hire, retainer (named monthly prices live here)
- `/technology` — RAG, voice agents, local vs cloud, human handoff, evaluation
- `/patterns` — illustrative composites, not testimonials
- `/about` — Vincent Jackson, President; same site avatar
- `/contact` — office note (name, email, company, what’s broken)

## Site avatar

The homepage and About play YouTube Short `r_YQ0j4Sg9w` in a portrait player, plus an on-page transcript. It is a site avatar film, not a live session.

## ROI interview

Ported from ONB1’s question flow, client-side only (no FastAPI). Welcome → new vs existing → identity → business → pain → inferred first jobs → optional scheduling → summary. Existing clients get the office line / email, no OTP. Office hours: 8:00 AM – 6:00 PM Pacific. Bookable Zoom or in-person: Monday–Thursday, 10:00 AM – 4:00 PM Pacific; other times by special request. Analysis starts at **$1,000** (never $500, never free).

## Sarah / Vapi

Click-to-call `+1 714-613-8557` is on every page. The floating web widget is mounted in the root layout and loads only when `NEXT_PUBLIC_VAPI_PUBLIC_KEY` is set at build time (public key, never a private key). Assistant id `9e0a6184-ccc7-49d2-9ef0-31acfac1cf59` is already in `src/lib/site.ts`.

To turn the widget on for preview and production:

1. Copy `.env.example` to `.env.local` for local work. Leave `NEXT_PUBLIC_VAPI_PUBLIC_KEY=` blank in git; put the real public key only in local env or the host.
2. In **Vercel**, add `NEXT_PUBLIC_VAPI_PUBLIC_KEY` for **Preview** and **Production**, then **redeploy** both. Next.js inlines `NEXT_PUBLIC_*` at build, so a new deploy is required after the env is set.
3. In the **Vapi dashboard**, lock that public key’s allowed origins to `https://storentech.com` and `https://storentechai.com`. Add the current Vercel preview host if you want the widget on preview. Do this once the site is live so the key cannot be used from random origins.

## Firebase App Hosting (recommended on GCP)

Region: **us-west1**.

1. Copy `.firebaserc.example.json` to `.firebaserc` and put in the Firebase project id.
2. Install the Firebase CLI and log in: `npm i -g firebase-tools && firebase login`
3. Create an App Hosting backend in us-west1, connected to this repo.
4. Set secrets in the backend (`INQUIRY_WEBHOOK_URL` if you use the form webhook; `NEXT_PUBLIC_VAPI_PUBLIC_KEY` to enable the Sarah widget). `apphosting.yaml` already declares `NEXT_PUBLIC_SITE_URL`. `NEXT_PUBLIC_*` is inlined at Next.js build time — add the secret, then rebuild.
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

Set `NEXT_PUBLIC_SITE_URL`, `INQUIRY_WEBHOOK_URL`, and `NEXT_PUBLIC_VAPI_PUBLIC_KEY` in the Vercel project for **Preview** and **Production**, then redeploy. Framework preset: Next.js. Public key only — never paste a private Vapi key into Vercel or into this repo.

## Offer (do not change on a whim)

1. Paid Automation ROI Analysis: from $1,000; more complex work can be higher (often $2,000–$3,000). Fee may be credited toward implementation. Never free. Never $500.
2. First AI employee live in about 30 days if the numbers work.
3. Retainers: around $5,000/mo AI Employee; $7,500/mo Growth. Do not turn the homepage into a price list.

Sarah (live voice demo): +1 714-613-8557. Office: +1 714-794-9199.
Office hours: 8:00 AM – 6:00 PM Pacific. Bookable appointments: Monday–Thursday, 10:00 AM – 4:00 PM Pacific. Other times by special request.
