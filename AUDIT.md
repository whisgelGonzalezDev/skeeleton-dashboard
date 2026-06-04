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
- [ ] `CHANGELOG.md` (signals active maintenance).
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
- [ ] **Tests** — currently 0. Add Vitest + a few smoke tests (login, dashboard render).
- [ ] **CI** — add `.github/workflows/ci.yml` (typecheck + lint + build) for a green badge.
- [ ] Decide whether to commit `package-lock.json` (currently git-ignored — most
      sold templates ship the lockfile for reproducible installs).

## 🔵 Sales assets

- [x] Screenshots of every view (login, sales, users) in light **and** dark.
- [x] Live demo on Vercel: https://skeeleton-dashboard.vercel.app
- [ ] SEO/meta in `index.html` (description, favicon, `og:image`).
- [ ] Showcase the 4 languages + dark mode as headline features.
- [ ] Delivery format (ZIP, private repo invite, marketplace listing).

## ⚪ Optional (raises perceived value)

- [ ] `Dockerfile` + `docker-compose` (frontend + backend + Postgres).
- [ ] Extra example views (settings, profile, filterable/paginated table).
- [ ] Storybook / catalog of `core/components/`.

## Recommended order

1. ~~Commercial license~~ ✅
2. ~~Fix lint + build~~ ✅
3. ~~README~~ → **screenshots + live demo** (next, highest sales impact)
4. Tests + CI
5. Extras (Docker, views, Storybook)
