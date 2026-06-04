# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-06-04

Initial commercial release.

### Added

- Mock authentication with protected routes and two demo roles (SuperAdmin, Viewer).
- Dark mode — system-aware, no flash on load, persisted to `localStorage`.
- Internationalization (i18next) in English, Spanish, French and Portuguese, with
  browser language detection.
- Sales dashboard with KPI cards and a recent-activity feed.
- Analytics view — KPI cards, a revenue-trend area chart and a plan-distribution
  donut (Recharts) plus an activity log; lazy-loaded into its own bundle chunk.
- Users module with a searchable, role-filterable table.
- Toast notifications through a single translated `useNotify()` hook (Sonner).
- Per-feature error boundaries so one crash never takes down the whole app.
- Centralized mock data layer with simulated API latency, designed to be swapped
  for a real API by changing a single query function.
- Optional NestJS + Drizzle ORM + JWT backend starter in [`backend/`](backend/).
- SEO meta tags (Open Graph + Twitter Card), favicon and a social share image.

### Tooling

- ESLint 9 (flat config), Prettier, `.editorconfig`.
- Vitest + Testing Library unit-test suite.
- Husky + lint-staged pre-commit hooks.
- GitHub Actions CI (lint, type-check, test, build).

[Unreleased]: https://github.com/whisgelGonzalezDev/skeeleton-dashboard/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/whisgelGonzalezDev/skeeleton-dashboard/releases/tag/v1.0.0
