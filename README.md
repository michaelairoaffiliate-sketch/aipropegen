# ProposalPilotAI

A proposal generator & lead-tracking dashboard, recreated from your screenshots, with the 10 competitive features wired in end-to-end as a working prototype.

## Run it

No build step. Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

Deploys to Vercel/GitHub Pages as-is (static files only).

## Pages

| Page | File |
|---|---|
| Dashboard, Leads, Proposals, Templates, Email Templates, Analytics, Settings | `index.html` (single-page app, hash-routed) |
| Public proposal viewer (no login) | `proposal.html?id=<proposalId>` |

Data lives in `localStorage` (`db.js`) so the whole thing works standing alone and persists between visits. Click **"Reset demo data"** on the Dashboard to start fresh.

## The 10 features — what's real vs. what needs a backend

Everything below is a **fully working UI flow** — clicking through it behaves exactly like the finished product will. The parts noted "needs a backend" are things no static site can do safely (they involve secret API keys or server-side verification), so they're built as realistic mocks you can swap for live calls.

| Feature | Status here | To make it real |
|---|---|---|
| **AI pricing recommendations** | Working — `aiSuggestPricing()` in `db.js` analyzes scope text + line items locally | Swap for a call to the Claude API with the scope + past won-deal data as context |
| **Proposal open tracking** | Working — every visit to `proposal.html` logs a timestamp, shown on the Proposal Detail page | Same logic, just logged server-side instead of `localStorage` so it works across devices |
| **Electronic signatures** | Working — typed signature + consent checkbox, timestamped and locked in | For legal enforceability, integrate a provider like DocuSign or HelloSign |
| **Stripe payment button** | UI complete — realistic checkout modal, but **no real charge occurs** | Replace `openCheckout()` in `public.js` with Stripe Checkout / Payment Element using a real publishable key + a server endpoint to create the PaymentIntent |
| **AI follow-up email generator** | Working — `aiFollowUpEmail()` generates tone-adjusted drafts from proposal data | Swap for a Claude API call for more natural, varied phrasing |
| **CRM integrations (HubSpot/Pipedrive/Salesforce)** | UI complete — Connect/Disconnect toggles a local "connected" state | Needs a backend to run OAuth for each provider and a sync job to push leads/deals |
| **Proposal analytics** | Working — acceptance rate, avg deal value, revenue, time-to-accept, and a per-proposal views table, all computed from real local data | Same math, fed by real production data |
| **Custom branding & domains** | Working — company name, accent color, logo upload, and domain field all save and apply live to the public proposal page | Custom domain field is cosmetic here; real custom domains need DNS + a backend that maps domain → workspace |
| **Industry template library** | Working — 8 seeded templates across industries, plus "Create Template" | Same, just backed by a shared database instead of `localStorage` |
| **Team collaboration & approval workflows** | Working — invite teammates, assign roles, and set a dollar threshold above which a proposal needs Owner approval before it can send | Needs real auth (who is "the Owner") instead of a single shared browser |

## File map

```
index.html      → dashboard shell (sidebar + router mount point)
proposal.html   → public, no-login client view
styles.css      → shared design system (used by both)
db.js           → seed data, localStorage persistence, "AI" helper functions
app.js          → dashboard router + all page renders + actions
public.js       → public proposal page logic (view tracking, sign, pay)
```

## Design notes

Palette and type are pulled directly from your screenshots: near-black navy background, the exact indigo (`#6366f1`) shown in your Branding settings as the accent, Space Grotesk for headings, Inter for body text, JetBrains Mono for data/labels — the same combination used in the marketing site built earlier for brand consistency.
