# NOBXDY STORE — Cloudflare Starter

A standalone, Kelly iOS-inspired black/purple React storefront and Cloudflare Worker + D1 schema. This is **not** a live ecommerce system yet. It intentionally does not process payments, generate reseller API credentials, or call EYAD until authenticated backend flows are implemented and official API contracts are verified.

## Setup
1. Create a NEW GitHub repository named `nobxdy-store-reseller` and upload these files.
2. `npm install`
3. `npx wrangler login`
4. `npx wrangler d1 create nobxdy-store-reseller-db`
5. Copy the returned database_id into `wrangler.toml` (replace placeholder).
6. `npm run db:local` for local schema, or `npm run db:remote` for the new remote database.
7. `npm run dev` for frontend preview; `npm run deploy` to publish after verifying configuration.

## Status
- Implemented: mobile responsive React UI; category navigation; placeholder reseller sections; read-only `/api/health` and `/api/products`; D1 migration.
- NOT implemented: secure registration/login, email verification, RBAC, wallet ledger operations, payments, supplier sync, fulfillment, API-key issuing, admin CRUD. These must not be presented as operational.
- EYAD secret must be stored with `wrangler secret put EYAD_STORE_KEY` when integration is implemented. Never expose it in React, repository, or logs.
- EYAD integration requires verifying exact official request/response contracts, buyer fields, error states and supplier idempotency before enabling orders.
- D1 `users.password_hash` is schema-only; no password handling exists yet. Use strong server-side password hashing and sessions before exposing registration.
- Protect admin routes and balance changes on the server. Implement atomic wallet debits, durable idempotency receipts and reconciliation before any live order.
