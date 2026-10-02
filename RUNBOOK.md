# Runbook

Operational procedures for PropFlow.

## Services

| Service | Port | Health check |
| --- | --- | --- |
| web | 5173 | `GET /` |
| auth-server | 4001 | `GET /health` |
| crm-api | 4000 | `GET /health` |

## Common tasks

- **Start everything:** `docker compose up -d`
- **Stop everything:** `docker compose down`
- **Reset local data:** `docker compose down -v` (destroys volumes)
- **Tail API logs:** `docker compose logs -f crm-api`
- **Rebuild after schema change:** `docker compose up -d --build crm-api`

## Escalation

1. Check service health and container status.
2. Check application logs for the failing service.
3. Verify dependencies (Postgres, Redis, Mongo) are reachable.
4. Roll back with the last known-good image tag if the failure follows a deploy.