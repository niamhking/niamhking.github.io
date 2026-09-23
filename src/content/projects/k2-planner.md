---
title: K2 Planner
category: personal
featured: true
order: 100
period: '2026'
role: Sole designer and engineer
summary: An offline-first Android app for a one-person landscape gardening business — job logging, recurring grass-cutting schedules, and invoice PDFs generated and emailed from the phone.
clientAnonymised: false
metrics:
  - value: £0
    label: Ongoing running cost to the business
  - value: 30-day
    label: Undo window on every deletion
contributions:
  - Designed a recurrence engine that never stores future visits — they are generated on demand from a rule, with single-date exceptions for a moved or skipped visit, so rescheduling one cut never shifts the whole pattern.
  - Built the full data layer on SQLite with Drizzle ORM and generated migrations, so the schema is typed from the database through to the screen.
  - Generated customer-facing invoice PDFs on-device with expo-print and handed them to the mail composer — the only artefact a customer ever sees, so it gets the most design attention.
  - 'Made backup a first-class feature rather than a setting, because a serverless design puts the whole business on one device: automatic on open when the last backup is stale, a scheduled background task, and manual export to any folder via the Storage Access Framework, including Google Drive.'
  - Designed every destructive action to be reversible — undo snackbars, a 30-day bin, clients archived rather than deleted — because the user is one person with no IT support and no second chance.
stack:
  - React Native 0.86
  - Expo SDK 57
  - TypeScript
  - SQLite
  - Drizzle ORM
  - Expo Router
  - React Native Paper
galleryDevice: phone
gallery:
  - src: ../../assets/projects/k2/home.png
    alt: K2 Planner home screen showing today's job, a backup warning, upcoming visits this week and a prompt that two clients are waiting to be invoiced.
    caption: Home answers one question — what needs doing, and what is owed.
  - src: ../../assets/projects/k2/schedule.png
    alt: Schedule screen listing overdue visits in red, each with a Log the job and Skip it button.
    caption: Overdue visits are derived from the rule, not stored, and can be logged or skipped inline.
  - src: ../../assets/projects/k2/clients.png
    alt: Clients list showing hourly rate and recurrence for each client, with a search field and an Add a client button.
    caption: Each client carries their own rate and cutting pattern.
  - src: ../../assets/projects/k2/client-detail.png
    alt: Client detail screen for Mr Bennett showing rate, notes, a Create invoice button totalling forty-five pounds, cutting schedule and job history.
    caption: Uninvoiced work is surfaced as an action, not a report to go and find.
  - src: ../../assets/projects/k2/invoice-detail.png
    alt: Invoice detail screen showing status, send options for email, WhatsApp and PDF, and the line items making up the total.
    caption: Sending is whatever the client actually uses — email, WhatsApp, or a PDF to hand over.
  - src: ../../assets/projects/k2/invoice-pdf.png
    alt: Generated invoice PDF preview showing the business header, itemised works, and a total due of seventy-eight pounds.
    caption: The generated PDF — the only thing the customer sees.
---

K2 Gardening is a family-run landscape gardening business. The scheduling ran on memory and the
invoicing ran on a notebook. K2 Planner replaces both.

**The architecture is a cost decision, not a technical one.** There is no server, no account and no
network call anywhere in the app — everything is local SQLite on one Android phone. That was chosen
because a one-person gardening business should not be paying a monthly hosting bill for a tool that
replaces a notebook, and the work happens in gardens where the signal is unreliable anyway.

It is not the architecture I would choose without that constraint, and it costs real things. There
is no sync, so the records live on exactly one device. There is no web view, so the books cannot be
opened on a laptop. Recovery after a lost or broken phone depends entirely on whether a backup
happened — there is no server-side copy to fall back on.

That last trade-off is why backup is engineered harder than anything else in the app: automatic on
open whenever the last one is stale, a scheduled background task, a manual export to any folder
including Google Drive, and a warning on the home screen that will not go away while backups are
overdue. If I had picked the constraint differently, most of that code would not need to exist.

The second constraint was the user: one person, not a technical one, working in gloves. That drove
plain words over jargon, large touch targets, one primary action per screen, and a rule that every
state change is reversible — so nothing in the app is frightening to press.
