---
title: AI Healthcare Consultation Platform
category: commercial
order: 80
role: Engineer — full stack
clientAnonymised: true
summary: A full-stack MVP for an AI medical consultation assistant, built around a multi-agent triage flow with safety-critical safeguarding detection.
contributions:
  - Built the multi-agent system on LangChain and LangGraph with OpenAI, including a triage agent driven by body-system-specific question banks.
  - Implemented safeguarding detection as a hard gate in the conversation flow rather than a post-hoc filter.
  - Designed an anti-repetition memory system so the assistant does not re-ask what it has already been told — the single biggest driver of a consultation feeling mechanical.
  - Built an empathy chunker that paces compassionate responses rather than delivering them in one block.
  - Wrote 300+ integration tests covering conversation quality, not just endpoint correctness.
stack:
  - TypeScript
  - Node.js
  - Fastify
  - LangChain
  - LangGraph
  - OpenAI
  - React
  - PostgreSQL
---

The hard problem here was not the model, it was the conversation. An assistant that forgets what
it has been told, or that delivers bad news at the pace of a database query, fails a patient long
before it gives a clinically wrong answer.

That is why the test suite covers conversation quality. Assertions about repetition, pacing and
safeguarding escalation catch regressions that an endpoint test would wave straight through.
