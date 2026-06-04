# Skeeleton Backend (NestJS)

Companion backend for the Skeeleton Dashboard demo. Exposes auth + demo data endpoints with RBAC, multi-tenancy and standardized error responses.

## Layout

```
src/
  auth/                  # Login (Zod-validated) issuing JWTs
  common/
    decorators/          # @Roles, @Public
    filters/             # AllExceptionsFilter (uniform error body)
    guards/              # JwtAuthGuard (global), RolesGuard (global)
    middleware/          # TenantMiddleware (x-tenant-id → req.tenantId)
    pipes/               # ZodValidationPipe
  demo/                  # demo.controller, demo.service, dto/, fixtures
  db/schema/             # Drizzle tables (all carry tenant_id)
scripts/seed.ts          # `npm run seed`
```

## Run

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev          # http://localhost:4000/api
npm run seed               # populate PostgreSQL with demo dataset
```

## Auth

`POST /api/auth/login` →

```json
{ "email": "admin@skeeleton.dev", "password": "skeeleton2026" }
```

Returns `{ token, user }`. Send `Authorization: Bearer <token>` on every other request.

## Demo endpoints (require JWT)

| Method | Path                  | Roles              |
| ------ | --------------------- | ------------------ |
| GET    | `/api/demo/kpis`      | SuperAdmin, Viewer |
| GET    | `/api/demo/users`     | SuperAdmin, Viewer |
| GET    | `/api/demo/users/:id` | SuperAdmin, Viewer |
| GET    | `/api/demo/activity`  | SuperAdmin, Viewer |
| GET    | `/api/demo/charts`    | SuperAdmin, Viewer |
| GET    | `/api/demo/alerts`    | SuperAdmin         |

All endpoints simulate 250–900 ms latency via the service layer so the frontend skeleton states are visible.

## Error contract

Every error (Zod validation, HttpException, unknown) is rewritten by `AllExceptionsFilter` to:

```json
{
  "ok": false,
  "statusCode": 400,
  "error": "ValidationError",
  "message": "Invalid request payload",
  "details": {
    /* zod flatten */
  },
  "path": "/api/auth/login",
  "timestamp": "2026-05-24T..."
}
```
