# Pre-sale checklist — Skeeleton Base

Tracking what's needed to publish & sell this template. Internal doc — remove
before packaging the product for buyers.

## 🔴 Critical (blockers)

- [x] **Commercial license** — replaced MIT with a proprietary EULA (`LICENSE`).
- [x] **Fix `npm run lint`** — added ESLint 9 flat config + deps; lint is green.
- [x] **Real README** — buyer-facing `README.md` (was a 21-byte stub).
- [x] **Screenshots** — captured light + dark (login, sales, users) into `docs/`,
      embedded in `README.md`. Regenerate via `node scripts/capture-screenshots.mjs`.
- [x] **Live demo** — deployed at https://skeeleton-dashboard.vercel.app and
      linked at the top of `README.md`.

## 🟡 Documentation & onboarding

- [x] `.env.example` for the frontend (`VITE_API_BASE_URL`).
- [x] Demo credentials fixed (code uses `admin@skeeleton.dev` / `skeeleton2026`).
- [x] `CHANGELOG.md` (Keep a Changelog + SemVer; 1.0.0 entry).
- [ ] Clarify in docs whether the NestJS `backend/` is included in the sale.

## 🟢 Quality & tooling

- [x] ESLint installed + configured (`eslint.config.js`).
- [x] `.editorconfig` added.
- [x] `version` bumped to `1.0.0`; `license` field added to `package.json`.
- [x] `npm run typecheck` and `npm run build` pass clean.
- [x] `.codegraph/` git-ignored (dev index, must not ship).
- [x] **Auth consistency fixed** — `useAuth` now validates against the single
      `DEMO_CREDENTIALS` source (admin + viewer roles); login hint and
      `MOCK_USER_PROFILE` aligned (previously three conflicting credential sets).
- [x] **Tests** — Vitest + Testing Library; 12 smoke tests (useAuth, mockData, Badge).
- [x] **CI** — `.github/workflows/ci.yml` runs lint + typecheck + test + build; badge in README.
- [x] **Lockfile** — `package-lock.json` un-ignored and committed (required by `npm ci`).
- [x] **Analytics view** — real `/analytics` page (KPIs, revenue + plan charts via
      Recharts, activity log), lazy-loaded in its own chunk. Replaces the placeholder.

## 🔵 Sales assets

- [x] Screenshots of every view (login, sales, analytics, users) in light **and** dark.
- [x] Live demo on Vercel: https://skeeleton-dashboard.vercel.app
- [x] SEO/meta in `index.html` (description, favicon, Open Graph + Twitter image).
- [ ] Showcase the 4 languages + dark mode as headline features.
- [ ] Delivery format (ZIP, private repo invite, marketplace listing).

## ⚪ Optional (raises perceived value)

- [ ] `Dockerfile` + `docker-compose` (frontend + backend + Postgres).
- [x] Extra example view — Analytics dashboard with charts (done).
- [ ] More example views (settings, profile, filterable/paginated table).
- [ ] Storybook / catalog of `core/components/`.

## Recommended order

1. ~~Commercial license~~ ✅
2. ~~Fix lint + build~~ ✅
3. ~~README + screenshots + live demo~~ ✅
4. ~~Tests + CI~~ ✅
5. ~~Analytics view~~ ✅
6. Remaining extras (Docker, more views, Storybook, SEO meta, CHANGELOG)
