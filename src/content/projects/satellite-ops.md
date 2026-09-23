---
title: Satellite Operations System
category: university
order: 30
period: '2023'
role: UI/UX designer and front-end developer
summary: Built in four days at the LeanSpace hackathon during Space Tech Expo in Bremen — matching client coordinate requests against available satellites and ground stations.
metrics:
  - value: '4'
    label: Days, start to demo
  - value: '15'
    label: Selected across Europe
contributions:
  - Designed and built the React interface for satellite scheduling.
  - Implemented real-time availability search within rolling three-hour windows.
  - Built ground station path validation for telecommand uplinks.
  - Presented the result to an audience of industry professionals at the expo.
stack:
  - React
  - JavaScript
  - LeanSpace API
  - Figma
gallery:
  - src: ../../assets/projects/satellite/landing.png
    alt: The landing screen of the satellite operations application showing scheduling controls.
    caption: Scheduling interface
---

Four days is not enough time to build a satellite tasking system properly, so the interesting
constraint was deciding what to leave out. We scoped to the single question an operator actually
asks — can this request be served, by which asset, in which window — and built only that.
