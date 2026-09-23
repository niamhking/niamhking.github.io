/**
 * Single source of truth for everything that appears in more than one place:
 * metadata, structured data, the nav, and the contact block.
 */

export const site = {
  name: 'Niamh King',
  /** Shown under the name in the hero and used in the JSON-LD `jobTitle`. */
  role: 'Software Engineer',
  employer: 'Scorchsoft',
  location: 'Remote, UK',
  url: 'https://niamhking.github.io',
  /** Under 160 characters — this is the search result and the link preview. */
  description:
    'Software engineer at Scorchsoft, a UK software development and AI company. Production web and mobile apps across a mixed stack — Laravel, NestJS, React, React Native, TypeScript.',
  email: 'Niamh_king@hotmail.co.uk',
  links: {
    linkedin: 'https://www.linkedin.com/in/niamh-king-453b8a6a/',
    github: 'https://github.com/niamhking',
  },
} as const;

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Background', href: '#background' },
  { label: 'Contact', href: '#contact' },
] as const;

export type Role = {
  title: string;
  org: string;
  /** Anonymised organisations still need something to show. */
  orgNote?: string;
  period: string;
  current?: boolean;
  blurb: string;
  points: string[];
};

export const experience: Role[] = [
  {
    title: 'Engineer',
    org: 'Scorchsoft',
    period: 'September 2026 — present',
    current: true,
    blurb:
      'Promoted from Junior Developer after eighteen months. I own mid-risk project slices end to end — discovery through to a working, supportable feature in production — with light oversight from a lead engineer.',
    points: [
      'Own the technical outcome of the work I take on, not just the ticket: shaped, built, tested, documented, released, then checked for defects after it landed.',
      'Lead customer-facing technical discussions and close them in writing, so decisions, actions and acceptance criteria are agreed on paper rather than assumed.',
      'Raise risks and trade-offs early with a recommendation attached, so a lead can confirm or adjust rather than start from a blank page.',
      'Introduced an adversarial AI security review pass on every security-sensitive pull request, catching capacity-enforcement, rate-limiting and payment-environment defects pre-release rather than in production.',
    ],
  },
  {
    title: 'Junior Developer',
    org: 'Scorchsoft',
    period: 'March 2025 — September 2026',
    blurb:
      'Full-stack delivery across concurrent client projects — Laravel and NestJS back ends, React and React Native front ends, AWS hosting.',
    points: [
      'Scoped and estimated a five-sprint mobile programme: 42 features across 303 output units, each with a user story and nested frontend/backend acceptance criteria agreed before implementation began.',
      'Designed the architecture, data model and integration boundaries for a freight pricing platform — a pnpm/Turborepo monorepo with business logic depending on contracts rather than concrete vendors.',
      'Wrote the client-facing system design artefacts — pricing methodology, data model, checkout flow — that projects were signed off against.',
    ],
  },
  {
    title: 'Software Engineering Intern',
    org: 'Rolls-Royce Defence',
    period: 'Summers 2021 & 2022',
    blurb:
      'Two ten-week internships in Bristol. Built Python GUI tooling for neural network training and image processing inside an Agile team; earlier, analysed failure-lifetime data for thermally coated jet engine blades.',
    points: [
      'Ran usability testing with the engineers who used the tools, and wrote the documentation that shipped with them.',
      'Received a graduate offer at the end of the 2022 placement.',
    ],
  },
];

export type SkillGroup = { heading: string; items: string[] };

/*
 * Deliberately not a definitive list. The stack changes from project to project,
 * so this is what I have actually shipped with, grouped by where it sits — not a
 * fixed set I only work inside.
 */
export const skills: SkillGroup[] = [
  {
    heading: 'Back end',
    items: ['PHP / Laravel', 'NestJS', 'Node.js', 'Fastify', 'REST API design', 'MVC'],
  },
  {
    heading: 'Front end',
    items: ['React 19', 'React Native / Expo', 'TypeScript', 'Redux Saga', 'Tailwind CSS'],
  },
  {
    heading: 'Data',
    items: ['SQL & schema design', 'PostgreSQL', 'MySQL', 'SQLite', 'TypeORM', 'Drizzle'],
  },
  {
    heading: 'Platform',
    items: ['AWS', 'Docker', 'CI/CD', 'Git & code review', 'Turborepo', 'Vite'],
  },
  {
    heading: 'AI engineering',
    items: ['LangChain', 'LangGraph', 'AWS Bedrock', 'Agent evaluation harnesses'],
  },
  {
    heading: 'Design',
    items: ['Figma', 'User research', 'Prototyping', 'Usability testing', 'WCAG'],
  },
];

export const education = {
  degree: 'MEng (First Class) Computer and Electronic Systems with International Study',
  institution: 'University of Strathclyde',
  period: '2019 — 2024',
  detail:
    'Double major in Electronic & Electrical Engineering and Computer Science, triple accredited by the IET, BCS and Science Council. Year abroad at Concordia University, Montreal. The course also covered user-centred design, which is where the UI/UX work on my university projects came from.',
};

export const honours = [
  {
    title: "Dean's List, University of Strathclyde",
    period: '2019 — 2024',
    detail: 'Awarded for achieving an A in every module across the five-year degree.',
  },
  {
    title: 'Best Engineering Capstone Project, Concordia University',
    period: '2022',
    detail: 'Led a Scrum team building a sensor-integrated gym tracking app.',
  },
  {
    title: 'Female Undergraduate of the Year finalist, Rolls-Royce / TargetJobs',
    period: '2021',
    detail: 'Awarded an internship for performance across the assessment.',
  },
  {
    title: 'Space Tech Expo hackathon, Bremen',
    period: '2023',
    detail: 'One of fifteen selected across Europe; built a satellite scheduling system in four days.',
  },
];

/** The non-work half of the background — what I have done outside a job or a degree. */
export const beyond = [
  {
    title: 'Gardening, K2 Gardening',
    period: 'since 2015',
    detail:
      'Part-time for a family-run landscape gardening business, from school through university and still now. It is also the reason K2 Planner exists.',
  },
  {
    title: 'Robotics club and STEM outreach',
    period: '2016 — 2019',
    detail:
      'Founding member of my school robotics club, and helped set up and run STEM initiatives across several local towns.',
  },
  {
    title: 'Scottish Space School, University of Strathclyde',
    period: '2018',
    detail:
      'One of 100 selected across Scotland for a programme delivered by NASA representatives — the thing that pointed me at engineering in the first place.',
  },
  {
    title: 'World Challenge expedition, Malaysia',
    period: '2017',
    detail:
      'Helped organise and run the expedition, including volunteering with indigenous communities.',
  },
  {
    title: "Duke of Edinburgh, Gold, Silver and Bronze",
    period: '2016 — 2019',
  },
  {
    title: 'CodeFirstGirls, SQL and Python courses',
    period: '2021',
  },
  {
    title: 'Spanish',
    detail: 'Fluent — I lived and went to school in Spain for five years.',
  },
];
