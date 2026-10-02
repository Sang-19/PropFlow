# PropFlow

Monorepo for the PropFlow real-estate platform.

## Layout

| Path | Purpose |
| --- | --- |
| `apps/web` | React + Vite frontend (feature-sliced under `src/features`). |
| `apps/auth-server` | Authentication service: routes, middleware, token/JWT services, key management. |
| `apps/crm-api` | CRM + property/visit API: controllers, services, models, sockets, jobs. |
| `packages/shared` | Shared schemas and TypeScript types used by every app. |

## Getting started

1. Copy `.env.example` to `.env` and fill in secrets.
2. `docker compose up -d postgres redis mongodb`
3. Install dependencies: `pnpm install`
4. Run dev servers: `pnpm dev`

See `RUNBOOK.md` for operational procedures and `DECISIONS.md` for architecture decisions.