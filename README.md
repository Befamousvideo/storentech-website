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

## Pages

- `/` — hire after the math; Call Sarah; paid ROI → 30-day employee → retainer
- `/work` — service catalog as jobs (wedge, revenue, operations, growth)
- `/how-it-works` — paid analysis, first hire, retainer
- `/about` — Vincent Jackson, President
- `/contact` — name, email, company, what’s broken

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

1. Paid Automation ROI Analysis: $1,000 typical; $2,000–$3,000 complex. Never free.
2. First AI employee live in 30 days if the numbers work.
3. Retainers: $5,000/mo AI Employee; $7,500/mo Growth.

Sarah (live voice demo): 714-613-8557. Office: +1 714-794-9199.
