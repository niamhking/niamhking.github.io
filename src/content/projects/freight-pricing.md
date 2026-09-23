---
title: Maritime Freight Quotation Platform
category: commercial
order: 100
featured: true
period: '2026'
role: Main developer — architecture, data model and integrations
clientAnonymised: true
summary: A quotation platform for maritime freight that builds priced voyage quotes from live bunker, distance and port-cost data, delivered as an API, a React admin panel and a mobile app from one core.
metrics:
  - value: '161'
    label: REST endpoints across 42 controllers
  - value: '44'
    label: Domain entities in the data model
  - value: '154'
    label: Test suites across the API
contributions:
  - 'Designed the architecture before the repository existed: a pnpm/Turborepo monorepo with a NestJS API, a React admin panel and an Expo mobile app, split so business logic depends on contracts rather than on any concrete vendor.'
  - 'Defined the whole data model — quotes, routes, shipments, cost components, accessorials and the port, cargo and region reference data — as an ERD first, then 44 TypeORM entities behind 161 REST endpoints.'
  - 'Built the pricing engine as a pure, deterministic package with no I/O, so every rate calculation is unit-testable in isolation and reproducible from its inputs.'
  - 'Made one frontend-safe source of truth for data shapes — Zod schemas, inferred types and shared query-key factories consumed by both web and mobile — and stopped it drifting with a contract test suite that validates real API responses against those schemas.'
  - 'Added a machine-readable ontology served from the API, with a drift-guard test asserting the domain catalogue still matches the contracts package, so the documented model and the running one cannot diverge silently.'
  - 'Owned every third-party integration — distance and emission-control-area routing, daily bunker price sync over OAuth2, port disbursement costs, and messaging webhooks — each behind a contract interface with a fallback stub so the build never depends on a third party being up.'
  - 'Reworked the backend from the Laravel template to NestJS and re-applied the security baseline: an explicit CORS allowlist rather than origin reflection, global validation with whitelisting, role guards on all 29 admin-facing controllers, raw-body preservation for HMAC-verified webhooks, response serialisation that strips excluded fields, boot-time config validation, secret scanning on pre-commit, and production secrets from AWS Secrets Manager.'
  - 'Wrote the client-facing pricing methodology and drove it through three documented revisions to signed-off approval, with every input traced to its source and marked as stub, admin-editable or fixed.'
stack:
  - TypeScript
  - NestJS 11
  - TypeORM
  - PostgreSQL 17
  - React 19
  - TanStack Query
  - Expo / React Native
  - Turborepo / pnpm
  - Redis & BullMQ
  - Docker
  - AWS
---

Freight pricing is a domain where the answer has to be defensible. A quote is built from a dozen
inputs — distance, fuel at today's price, port costs, cargo handling, regional rates — and when a
customer asks why a number came out the way it did, "the system said so" is not an answer.

That shaped two decisions. The pricing engine is a pure package: no database, no network, no clock.
Given the same inputs it returns the same quote, which means it can be tested exhaustively and the
working can always be shown. And every external data source sits behind a contract interface with a
stub implementation, so a provider changing their API is a change in one adapter rather than a
change that reaches into the pricing logic.

The part I am most pleased with is the drift guard. Shared types, contract tests and a
machine-readable ontology mean the documented domain model, the API's actual responses and the
types the frontends compile against are checked against each other on every run — so the three
cannot quietly disagree, which on a model this size they otherwise would.
