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
- `NEXT_PUBLIC_INTAKE_URL` — Start analysis CTA. Default is the Workspace Google Form. Set to `https://onboarding.storentechai.com` when ONB1 is live. Not Stripe `/pay`.
- `INQUIRY_WEBHOOK_URL` — optional. If set, each inquiry is `POST`ed as JSON (`name`, `email`, `company`, `broken`, `submittedAt`, `source`)

## Pages

- `/` — leak-map hero; $1k Automation ROI Analysis; Sarah; humans in the loop. Start analysis → `site.intakeUrl` (Form). No “See the work.”
- `/work` — services catalog; map first, then build what pays
- `/how-it-works` — paid analysis, then build what pays
- `/about` — StorenTech AI; humans in the loop
- `/contact` — name, email, company, what’s broken
- `/pay` and `pay.storentechai.com` — 302 to Stripe Payment Link (`site.stripe.roiPaymentLink`). Invoice short URL only. Not the Start analysis CTA.
- `/redo` — thin Red O pay page. Pay CTA → Stripe Payment Link. Does not redirect. Same page on `pay.storentechai.com/redo`.

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
2. After the map: humans in the loop; AI does the grind humans hate. 10× capacity. Mary’s primary line stays on the site.
3. Ongoing capacity: $5,000/mo Capacity; $7,500/mo Growth.

Public contact: phone is `public/sarah-phone.png` (`alt="Call Sarah"`) as an image only. Never render `tel:`, `mailto:`, digits, or email addresses as HTML text. Write-us goes to `/contact` form only.
