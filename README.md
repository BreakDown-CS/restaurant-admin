# Restaurant Admin

![CI](https://github.com/BreakDown-CS/restaurant-admin/actions/workflows/ci.yml/badge.svg)

Admin web app for a restaurant system that supports **buffet packages and à la carte** in the same bill.
Rebuilt from my graduation project to learn how a production-style React app is structured.

Backend: [restaurant-api](https://github.com/BreakDown-CS/restaurant-api)

## Tech stack

React 19 · TypeScript · Vite · TanStack Router · TanStack Query · Ant Design · Tailwind CSS · React Hook Form + zod · MSW · Vitest + Testing Library · Bun

## How it is organised

Feature folders: each feature owns its API calls, query hooks, schemas and components.

```
src/
  features/menu/
    api/          fetch functions + TanStack Query hooks
    components/   page, table columns, form modal
    schemas.ts    zod schemas: form rules AND response validation
  lib/
    api-client.ts unwraps the backend envelope, throws ApiError { code, details }
  mocks/          MSW handlers that mimic the real API
  routes/         file-based routes
```

- Every response is checked with zod, so a backend change shows up as a clear error instead of a broken page.
- Form rules (price ≥ 0, max 2 decimals, trimmed names) match the backend, so most mistakes are caught before a request is sent.
- MSW returns the same envelope as the real API, so the app runs without a backend.

## Features

- [x] Menu management: list, create, edit, delete
- [x] Works against the real Go API or fully mocked
- [ ] Categories as a dropdown
- [ ] Buffet packages
- [ ] Tables, bills and POS checkout
- [ ] Login with 5 roles
- [ ] Kitchen display, sales reports

## Getting started

Requires Node 24 and Bun.

```bash
bun install
cp .env.example .env   # mocks are ON by default, no backend needed
bun run dev            # http://localhost:3000
```

To use the real API, start [restaurant-api](https://github.com/BreakDown-CS/restaurant-api) and set `VITE_ENABLE_MOCKS=false` in `.env`.

## Quality checks

```bash
bun run typecheck
bun run lint
bunx vitest run
```

Git hooks format code and check commit messages. CI runs typecheck, lint, format check, tests and build on every pull request, and `main` only accepts pull requests that pass.

## What I learned

- Validating API responses with zod, not only form input: the server is also a source of bad data.
- Mocking the API with MSW so the frontend can be built and tested before the backend exists.
- Unwrapping a response envelope in one place, so features never deal with it.
