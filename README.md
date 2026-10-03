# Personal Technical & Professional Portfolio

Modern, interactive, and high-performance developer portfolio built for **Prasoon Soni** (Frontend & Full-Stack Developer).

## 🚀 Overview

This application implements the complete **Product Requirements Document (PRD v1.0)** specifications, built with Next.js (App Router), TypeScript, and a semantic **FlyonUI color design system** supporting **Perplexity**, **Shadcn**, and **Studio Ghibli** theme engines.

### 🌟 Key Interactive Features

- **FlyonUI Semantic Color System**: Uses semantic color tokens (`primary`, `secondary`, `accent`, `base-100`, `base-200`, `base-300`, `base-content`, `info`, `success`, `warning`, `error`).
- **Interactive Theme Switcher**: Toggle dynamically between **Perplexity** (cyan/teal AI search vibe), **Shadcn** (minimalist zinc/slate precision), and **Ghibli** (warm Totoro meadow & parchment aesthetic), with instant Dark/Light mode support.
- **Hero Developer Playground**: Interactive in-browser terminal and live preview widget allowing recruiters to run commands (`whoami`, `projects`, `skills`, `contact`, `clear`) or click quick chips.
- **Dynamic Projects Showcase**:
  - Filterable by category (`All`, `Full Stack`, `Frontend`)
  - Debounced real-time search
  - **Interactive Architecture & Details Modal** with problem/solution, system flow, challenges, and live demo links
  - Deep-dive static case study pages (`/projects/[slug]`)
- **Interactive Experience & Education Timelines**: Expandable responsibility lists, technology tags, and verified milestone metrics.
- **Validated Contact Form with Celebratory Feedback**: Real-time client-side validation, confetti animations on submission, and dedicated `/api/contact` route.
- **Curriculum Vitae / Resume Experience**: In-browser resume sheet, printable view, and one-click PDF download (`/resume/resume.pdf`).

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router with Turbopack)
- **Language:** TypeScript 5
- **Styling:** Vanilla CSS Variables + Tailwind CSS v4 + FlyonUI Semantic Tokens
- **Icons:** Lucide Icons & SVG Brand Icons
- **Animation & Effects:** Canvas Confetti & Modern CSS Keyframes

---

## 📂 Architecture & Folder Structure

Following PRD Section 63 & 68:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── projects/[slug]/page.tsx
│   ├── experience/page.tsx
│   ├── education/page.tsx
│   ├── services/page.tsx
│   ├── contact/page.tsx
│   ├── resume/page.tsx
│   └── api/contact/route.ts
│
├── components/
│   ├── common/         # Navbar, Footer, ThemeSwitcher, Badge, SectionHeading, Icons
│   ├── layout/         # Container, SectionWrapper
│   ├── hero/           # Hero, InteractivePlayground, StatsSection
│   ├── about/          # AboutSection
│   ├── skills/         # SkillsSection
│   ├── experience/     # ExperienceSection
│   ├── projects/       # ProjectsSection, ProjectCard, ProjectModal
│   ├── education/      # EducationSection
│   ├── certifications/ # CertificationsSection
│   ├── achievements/   # AchievementsSection
│   ├── services/       # ServicesSection
│   ├── resume/         # ResumeSection
│   └── contact/        # ContactSection
│
├── hooks/
│   ├── useScrollSpy.ts
│   ├── useMediaQuery.ts
│   ├── useContactForm.ts
│   └── useTheme.ts
│
├── types/              # Strict TypeScript interfaces
├── mockdata/           # Typed datasets (projects, skills, experience, education, etc.)
├── styles/             # Modular reusable class tokens
├── lib/                # Constants, metadata, validation logic, GitHub helper
└── utils/              # cn, slugify, formatDate
```

---

## 🧑‍💻 Development & Build Commands

Run development server:
```bash
npm run dev
```

Run ESLint:
```bash
npm run lint
```

Build production bundle:
```bash
npm run build
```

Start production server:
```bash
npm run start
```

---

## 👤 Author Information

- **Name:** Prasoon Soni
- **Current Position:** Trainee at Raj Digital, Bhopal (1 July 2026 – Present)
- **Previous Role:** Content Developer — Java & DSA at Raj Institute of Coding and Robotics
- **Education:** B.Tech in Computer Science & Engineering (RGPV, 2026)
- **GitHub:** [https://github.com/Prasoonsoni398](https://github.com/Prasoonsoni398)
- **Email:** `contact.prasoonsoni@gmail.com`
