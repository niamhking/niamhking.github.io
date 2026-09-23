---
title: Supplier Discovery Platform
category: commercial
order: 60
role: Engineer — full stack
clientAnonymised: true
summary: A B2B platform for discovering and filtering suppliers by location and category, built around an interactive clustered map with enterprise single sign-on.
contributions:
  - Built the interactive map interface with the Google Maps API and marker clustering, so a dense supplier set stays readable at every zoom level.
  - Implemented geolocation-based search and filtering across supplier categories.
  - Developed Redux Saga state management against a domain-driven backend structure.
  - Built the Laravel REST API, with OAuth2 and SAML2 single sign-on for enterprise clients.
stack:
  - React 19
  - TypeScript
  - Laravel 12
  - Redux Saga
  - Google Maps API
  - Ant Design
  - Tailwind CSS
---

Marker clustering is the whole usability story on a map product. Without it a national supplier
set renders as an unreadable wall of pins; with it, the same data reads as a map you can actually
make a decision from.
