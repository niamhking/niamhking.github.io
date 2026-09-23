---
title: Field Operations & Waste Documentation Platform
category: commercial
order: 95
period: '2026'
role: Sole developer
clientAnonymised: true
summary: An offline-first mobile app for field crews — jobs, clock in and out, and statutory waste transfer notes signed on the device — backed by a Laravel API and an admin panel for office staff.
metrics:
  - value: '14'
    label: Tables kept in sync offline
  - value: '90'
    label: Backend test suites
  - value: '1'
    label: Developer, end to end
contributions:
  - 'Sole developer across both applications: the React Native field app and the Laravel API and admin panel behind it.'
  - 'Built a custom offline-first sync engine — a pull/push protocol over a local SQLite database with Drizzle ORM — because crews work at sites with no usable signal and cannot wait for connectivity to record a job.'
  - 'Implemented the statutory waste transfer note flow, including on-device signature capture, so the legally required document is produced and signed at the point of collection rather than reconstructed later.'
  - 'Built jobs, clock in and out, job history and issue reporting in the mobile app, and the office-facing admin panel in Filament.'
  - 'Adapted an internal multi-tenant SaaS boilerplate for a single-organisation deployment, stripping the tenancy, billing and feature-flag layers rather than carrying dead abstraction.'
  - 'Wrote the technical documentation the project is maintained from — architecture, the API surface, the sync protocol and the data model — alongside per-sprint client testing guides.'
stack:
  - React Native
  - Expo SDK 54
  - TypeScript
  - Redux Toolkit
  - Drizzle ORM
  - SQLite
  - Laravel 12
  - Filament 5
  - Passport OAuth2
  - MySQL
  - Docker
---

The whole design follows from one fact: the people using this are standing in a yard or at the
roadside, and the document they are producing is a legal record. Connectivity is optional; the
record is not.

So the mobile app is the source of truth until it can sync. Everything is written locally first,
and a custom pull/push engine reconciles with the server when a connection appears — which is more
work than an online-only app, but the alternative is a crew unable to complete a collection because
a signal dropped.

Being the only developer on it meant the architecture, the sync protocol, the database, both
applications and the documentation were all mine to get right, which is also why the technical docs
exist: the project should not depend on my memory.
