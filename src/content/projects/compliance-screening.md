---
title: AI Compliance Screening Platform
category: commercial
order: 90
role: Engineer — AI orchestration, interfaces, evaluation
clientAnonymised: true
summary: A Know Your Customer platform that screens individuals and entities against international sanctions lists using a multi-agent architecture, with adverse media analysis and confidence-scored risk assessment.
metrics:
  - value: '15'
    label: Specialised screening agents
  - value: '8'
    label: Check categories per subject
  - value: '4'
    label: Sanctions regimes — UK, EU, UN, US
contributions:
  - Built the AI agent orchestration on LangChain and AWS Bedrock, with an evaluation framework measuring agent accuracy so screening changes could be judged on evidence rather than impression.
  - 'Built the screening surface out to eight check categories per subject: sanctions, politically exposed persons, relatives and close associates, adverse media, FATF jurisdiction risk, Companies House company records, Companies House officer records, and disqualified directors.'
  - 'Integrated four sanctions regimes — UK OFSI, EU consolidated, UN Security Council and US OFAC — into a single screening pipeline, with the UK list scraped live.'
  - 'Built adverse media screening across 150+ UK news sources with two-stage AI validation, so a snippet match is confirmed against full article content before it reaches a risk score.'
  - Delivered three TypeScript interfaces — CLI, API and web — over a shared core in a NestJS and Turborepo monorepo.
  - 'Designed the sensitive-data lifecycle: a scheduled purge of names, emails, report data and S3 evidence after report expiry, while retaining the compliance audit trail.'
  - Wrote the user guide and risk-score methodology, used both to align the client's mental model with the system and as collateral they could hand to their own end users.
stack:
  - TypeScript
  - Node.js
  - NestJS
  - LangChain
  - AWS Bedrock
  - Turborepo
  - Docker
---

Compliance screening is a domain where a wrong answer is expensive in both directions: a missed
match is a regulatory problem, a false match is a customer who gets refused for nothing. Most of
the engineering effort went into making the system's reasoning legible — confidence scoring,
an evaluation harness, and written methodology the client could challenge — rather than into
raw matching.

When screening results did not match the client's expectations, the fix was rarely code first. I
consolidated the accumulated issues into a single document where every item traced to a stated
root cause and carried a recommended decision, so the client was choosing between options rather
than being handed an open-ended menu. That document is what moved the project to its Beta phase.
