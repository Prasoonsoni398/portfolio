# Product Requirements Document (PRD)
# Technical & Professional Portfolio Website

**Product Name:** Personal Technical & Professional Portfolio  
**Document Version:** 1.0  
**Status:** Ready for Development  
**Platform:** Web  
**Primary Audience:** Recruiters, Hiring Managers, Clients, Developers, Collaborators, and Professional Connections

---

## 0. Portfolio Owner — Professional Profile

The portfolio must use only the following professional information. Remove unrelated personal details, assumptions, or unsupported claims.

- **Current Role:** Trainee at Raj Digital, Bhopal
- **Start Date:** 1 July 2026
- **Previous Role:** Content Developer — Java & DSA at Raj Institute of Coding and Robotics
- **Previous Work:** Created multiple Java and DSA solutions in animated form for educational content.
- **Education:** B.Tech, completed in 2026
- **GitHub Username:** `Prasoonsoni398`
- **GitHub Profile:** `https://github.com/Prasoonsoni398`

## Primary Projects

1. **Cravings**
2. **Real-Time Communication App**
3. **Form Builder** — Create digital custom forms

**Profile-content rule:** Do not add DOB, address, B.Ed details, unrelated employment, or other personal information to the portfolio unless explicitly provided later for the portfolio.

---

# 1. Product Overview

The **Technical & Professional Portfolio** is a modern, responsive personal website designed to present a developer's professional identity, technical expertise, projects, experience, education, achievements, and contact information in a clear and visually compelling manner.

The portfolio should function as more than a digital resume. It should demonstrate:

- Technical expertise
- Real-world development experience
- Problem-solving ability
- Project experience
- Professional growth
- Coding and engineering practices
- Communication and presentation skills
- Personal brand

The website should provide recruiters and potential clients with enough information to understand the developer's profile within a few minutes while also allowing technical visitors to explore projects in depth.

---

# 2. Product Goals

## 2.1 Primary Goals

### G1 — Establish a Strong Professional Identity

The portfolio should immediately communicate:

> Who I am → What I do → What technologies I use → What I have built → How to contact me.

### G2 — Showcase Technical Expertise

The portfolio should clearly demonstrate knowledge of:

- Frontend development
- Backend development
- Full-stack development
- Databases
- APIs
- Authentication
- Deployment
- Software architecture
- Development tools

### G3 — Showcase Real Projects

Each important project should provide enough information to demonstrate actual engineering ability.

Projects should include:

- Problem
- Solution
- Features
- Technologies
- Architecture
- Screenshots
- GitHub repository
- Live demo
- Development challenges
- Technical decisions

### G4 — Support Job Applications

The website should make it easy for recruiters to:

- View resume
- Download resume
- Understand technical skills
- View experience
- Explore projects
- Contact the developer
- Access GitHub
- Access LinkedIn
- Review professional experience

### G5 — Build a Personal Brand

The portfolio should have a recognizable visual identity that can later be reused across:

- Resume
- LinkedIn
- GitHub
- Personal website
- Professional presentations
- Social profiles

---

# 3. Product Vision

The portfolio should feel like a **professional developer's digital identity**, not a generic template.

The experience should communicate:

> **Professional + Technical + Modern + Clean + Fast + Trustworthy**

The design should prioritize:

1. Content clarity
2. Visual hierarchy
3. Technical credibility
4. Professional presentation
5. Responsive behavior
6. Performance
7. Accessibility
8. Recruiter-friendly navigation

---

# 4. Target Users

## 4.1 Primary Users

### Recruiters

Recruiters want to quickly understand:

- Current role
- Experience
- Skills
- Education
- Projects
- Resume
- Contact information

### Hiring Managers

Hiring managers want to evaluate:

- Technical depth
- Project complexity
- Problem-solving
- Development practices
- Technology choices
- Professional experience

### Clients

Clients want to understand:

- Services offered
- Previous work
- Technical capabilities
- Reliability
- Communication channels

### Developers

Developers may want to explore:

- GitHub repositories
- Technical projects
- Architecture
- Technology stack
- Development approach

---

# 5. User Personas

## Persona 1 — Recruiter

**Goal:** Determine whether the candidate is suitable for a technical position.

**Important information:**

- Name
- Role
- Experience
- Skills
- Resume
- Projects
- Contact

**Expected behavior:**

The recruiter should be able to understand the candidate profile within 1–3 minutes.

---

## Persona 2 — Technical Hiring Manager

**Goal:** Evaluate engineering capability.

**Important information:**

- Project architecture
- Technologies
- Technical challenges
- GitHub
- Backend/frontend knowledge
- APIs
- Databases
- Deployment

---

## Persona 3 — Potential Client

**Goal:** Determine whether the developer can build their required product.

**Important information:**

- Services
- Portfolio projects
- Technologies
- Previous work
- Contact

---

# 6. Product Scope

## In Scope

The first version should include:

- Home
- About
- Skills
- Experience
- Projects
- Project Details
- Education
- Certifications
- Achievements
- Services
- Resume
- Contact
- Social links
- GitHub integration
- Responsive design
- SEO
- Accessibility
- Analytics
- Contact form

## Out of Scope for MVP

The following can be implemented later:

- Blog CMS
- Admin dashboard
- Authentication
- Visitor accounts
- Advanced analytics dashboard
- Newsletter system
- Comments
- Multi-language support
- AI chatbot
- Portfolio marketplace

---

# 7. Information Architecture

```text
Portfolio
│
├── Home
│
├── About
│
├── Skills
│   ├── Frontend
│   ├── Backend
│   ├── Database
│   ├── DevOps
│   └── Tools
│
├── Experience
│
├── Projects
│   ├── Project Listing
│   └── Project Details
│
├── Education
│
├── Certifications
│
├── Achievements
│
├── Services
│
├── Resume
│
└── Contact
```

---

# 8. Navigation Requirements

The navigation bar should contain:

- Logo / Name
- Home
- About
- Skills
- Experience
- Projects
- Resume
- Contact

### Desktop

Use a horizontal navigation menu.

### Mobile

Use a mobile menu / hamburger navigation.

### Sticky Navigation

The navigation should remain accessible while scrolling.

### Active Section

The current section should have a visible active state.

---

# 9. Home Page

The home page is the most important page.

Its purpose is to immediately communicate the developer's identity and value.

## 9.1 Hero Section

The hero section should contain:

### Primary Heading

Example:

> Hi, I'm Prasoon Soni.

### Professional Title

Example:

> Frontend Developer / Full Stack Developer

### Supporting Description

Example:

> I build responsive, scalable and user-focused web applications using modern JavaScript technologies.

### Primary CTA

**View My Work**

### Secondary CTA

**Download Resume**

### Additional CTA

**Contact Me**

### Social Links

- GitHub
- LinkedIn
- Email
- Other relevant professional platforms

---

# 10. Hero Visual

The hero section may include:

- Professional photograph
- Developer illustration
- Abstract technology graphic
- Code editor visual
- Interactive 3D element
- Terminal-style component

The visual should not reduce readability or performance.

---

# 11. Quick Professional Statistics

A statistics section can communicate professional experience quickly.

Example:

```text
3+        10+        5+        250+
Years     Projects   Technologies  Users/Students
Experience
```

Possible metrics:

- Years of experience
- Projects completed
- Technologies used
- Clients
- Certifications
- Contributions
- Students trained
- Applications developed

Only verified metrics should be displayed.

---

# 12. About Section

The About section should provide a concise professional introduction.

## Content

It should contain:

- Professional summary
- Career focus
- Technical interests
- Development philosophy
- Current role
- Career objectives

### Example Structure

```text
About Me

I am a software developer focused on building modern,
responsive and scalable web applications.

My development journey includes...

Currently, I work with...
```

---

# 13. Skills Section

The skills section should be categorized instead of presenting one large list.

## Frontend

Possible technologies:

- HTML5
- CSS3
- JavaScript
- TypeScript
- React
- Next.js
- Tailwind CSS
- Bootstrap
- Vite

## Backend

Possible technologies:

- Node.js
- Express.js
- REST APIs
- Authentication
- JWT

## Databases

Possible technologies:

- MongoDB
- PostgreSQL
- MySQL

## Programming

Possible technologies:

- Java
- JavaScript
- TypeScript

## Tools

Possible technologies:

- Git
- GitHub
- VS Code
- Postman
- Figma
- Docker

Only technologies with practical experience should be included.

---

# 14. Skill Presentation

Each skill can contain:

```text
Technology
Short description
Experience level
Optional proficiency indicator
```

Avoid excessive progress bars such as:

```text
React       95%
JavaScript  90%
Node.js     85%
```

Unless these percentages are backed by a meaningful evaluation system.

Prefer:

```text
React
Advanced

Used for:
- Component architecture
- State management
- API integration
- Responsive UI
```

---

# 15. Experience Section

The Experience section should use a timeline layout.

Each experience entry should include:

- Organization
- Job title
- Location
- Start date
- End date / Present
- Responsibilities
- Technologies
- Achievements
- Impact

### Example

```text
Frontend Developer
Raj Digital — Bhopal

2025 – Present

Responsibilities:
• Developed responsive web applications
• Integrated REST APIs
• Built reusable React components
• Collaborated with designers and developers

Technologies:
React.js, Next.js, Tailwind CSS, JavaScript
```

Focus on measurable outcomes whenever possible.

---

# 16. Project Section

Projects are a core component of the portfolio.

The Projects page should support:

- Featured projects
- All projects
- Technology filtering
- Category filtering
- Search
- Project details

---

# 17. Project Card

Each project card should contain:

- Project image
- Project name
- Short description
- Technology tags
- Category
- GitHub button
- Live Demo button
- View Details button

### Example

```text
Voting Management System

A full-stack application designed to manage
digital voting workflows.

React | Node.js | Express | PostgreSQL

[Live Demo] [GitHub] [View Details]
```

---

# 18. Project Categories

Projects may be categorized as:

- Frontend
- Backend
- Full Stack
- Java
- React
- Next.js
- Academic
- Professional
- Personal
- Open Source

---

# 19. Project Details Page

Every major project should have a dedicated page.

## Required Sections

### Project Overview

Explain:

- What the project is
- Why it was built
- Who it is for

### Problem Statement

Explain the problem being solved.

### Solution

Explain the proposed solution.

### Features

List major features.

### Technology Stack

Example:

```text
Frontend:
React + Tailwind CSS

Backend:
Node.js + Express

Database:
PostgreSQL

Authentication:
JWT

Deployment:
Vercel / Render
```

### Architecture

Include an architecture diagram where useful.

### Database Design

For database-based projects:

- ER diagram
- Main tables
- Relationships

### API Documentation

For API-driven projects:

- Endpoint
- Method
- Request
- Response
- Authentication

### Challenges

Explain important technical challenges.

### Solutions

Explain how those challenges were solved.

### Results

Describe measurable outcomes when available.

### Links

- Live Demo
- GitHub
- Documentation

---

# 20. Featured Projects

The home page should display 3–6 featured projects.

Selection criteria:

- Professional relevance
- Technical complexity
- Visual quality
- Real-world usefulness
- Demonstrated skills

Featured projects should be manually selected rather than automatically showing the newest projects.

---

# 21. Education Section

Include:

- Degree
- Institution
- University
- Start year
- Graduation year
- Relevant coursework
- Academic achievements

Example:

```text
Bachelor of Engineering

Rajiv Gandhi Proudyogiki Vishwavidyalaya

Relevant Areas:
Computer Science
Programming
Data Structures
Database Systems
Web Development
```

---

# 22. Certifications

Each certification should include:

- Certification name
- Issuing organization
- Issue date
- Credential ID
- Credential URL
- Skills covered

Example:

```text
Certification Name
Issued by Organization

2026

[Verify Credential]
```

---

# 23. Achievements

Possible achievement categories:

- Hackathons
- Coding competitions
- Academic achievements
- Professional achievements
- Open-source contributions
- Certifications
- Leadership
- Teaching/training
- Publications

Each achievement should contain evidence where possible.

---

# 24. Services Section

If the portfolio is intended for freelance/client opportunities, include services such as:

### Web Development

Building responsive and modern websites.

### Frontend Development

Creating scalable React/Next.js applications.

### Backend Development

Building REST APIs and backend systems.

### Full-Stack Development

Developing complete web applications.

### UI Implementation

Converting Figma/UI designs into production-ready interfaces.

---

# 25. Resume Section

The portfolio should provide a dedicated resume experience.

## Features

- View Resume
- Download Resume
- Open Resume in new tab

The resume should be available as a PDF.

### CTA

> Download My Resume

The resume should be kept synchronized with the professional information shown on the portfolio.

---

# 26. Contact Section

The Contact section should provide multiple ways to connect.

## Contact Information

- Email
- Phone, if intentionally published
- Location, at a broad level only
- LinkedIn
- GitHub

## Contact Form

Fields:

```text
Name
Email
Subject
Message
```

### Submit Button

> Send Message

---

# 27. Contact Form Validation

Required validation:

### Name

- Required
- Minimum 2 characters

### Email

- Required
- Valid email format

### Subject

- Required

### Message

- Required
- Minimum 20 characters

### Error State

Display clear messages such as:

> Please enter a valid email address.

### Success State

Display:

> Your message has been sent successfully.

---

# 28. Footer

The footer should include:

- Name / Logo
- Short description
- Navigation links
- Social links
- Email
- Copyright
- Resume link

Example:

```text
Prasoon Soni

Frontend Developer building modern web experiences.

GitHub | LinkedIn | Email

© 2026 Prasoon Soni. All rights reserved.
```

---

# 29. Design Requirements

## Design Direction

The visual language should be:

- Modern
- Minimal
- Professional
- Technical
- Premium
- Clean
- Responsive

Avoid:

- Excessive gradients
- Excessive animations
- Overcrowded layouts
- Excessive glassmorphism
- Unnecessary decorative elements

---

# 30. Color System

Primary brand color:

```text
#175CDD
```

Suggested supporting colors:

```text
Primary:       #175CDD
Background:    #FFFFFF
Text:          #111827
Secondary:     #6B7280
Border:        #E5E7EB
Dark:          #0F172A
Light Blue:    #EFF6FF
```

The primary blue should be professional rather than excessively bright.

---

# 31. Typography

Recommended font families:

- Inter
- Geist
- Manrope
- Plus Jakarta Sans

### Typography hierarchy

```text
Hero Heading     48–72px
Section Heading  32–48px
Card Heading     20–24px
Body             16–18px
Small Text       14px
```

Typography should scale responsively.

---

# 32. Layout Requirements

Use a consistent content container.

Preferred section structure:

```text
lg:px-4 px-8 max-w-7xl mx-auto
```

For wider layouts:

```text
2xl:max-w-[70%]
xl:max-w-[85%]
lg:max-w-[92%]
max-w-[95%]
mx-auto
```

The exact container can be adjusted where required by the design.

---

# 33. Responsive Design

The website must support:

- Mobile
- Tablet
- Laptop
- Desktop
- Large desktop

Breakpoints should follow Tailwind CSS conventions.

### Mobile

- Single-column layouts
- Collapsed navigation
- Touch-friendly buttons
- Optimized typography
- Optimized images

### Tablet

- 2-column cards where appropriate
- Adaptive navigation
- Balanced spacing

### Desktop

- Multi-column layouts
- Full navigation
- Large project cards
- Advanced visual elements

---

# 34. Animation Requirements

Animations should improve the experience without distracting from content.

Possible animations:

- Fade-in
- Slide-up
- Scale
- Hover elevation
- Button transitions
- Section reveal
- Project card hover
- Navigation transitions

Animations should be subtle.

Avoid animations that significantly delay access to content.

---

# 35. Accessibility

The portfolio should target WCAG 2.1 AA practices.

Requirements:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Sufficient color contrast
- Alt text for meaningful images
- Accessible form labels
- Accessible buttons
- Proper heading hierarchy
- Reduced-motion support

Users who prefer reduced motion should be able to browse the site comfortably.

---

# 36. Performance Requirements

The portfolio should load quickly.

Target:

- Fast initial page load
- Optimized images
- Lazy loading
- Code splitting where appropriate
- Minimized JavaScript
- Efficient animations
- Optimized fonts

Images should use modern formats such as:

- WebP
- AVIF

---

# 37. SEO Requirements

Each major page should have:

- Unique title
- Meta description
- Canonical URL
- Open Graph metadata
- Twitter/X metadata
- Structured headings
- Semantic HTML

## Example Title

```text
Prasoon Soni | Frontend Developer
```

## Example Description

```text
Portfolio of Prasoon Soni, a frontend developer specializing
in React, Next.js and modern web application development.
```

---

# 38. Structured Data

Where appropriate, implement Schema.org structured data.

Possible schemas:

- Person
- WebSite
- CreativeWork
- SoftwareApplication
- Article, if a blog is added later

---

# 39. Social Sharing

When the portfolio URL is shared, it should display:

- Profile/name
- Professional title
- Portfolio preview image
- Short description

Open Graph image dimensions should be optimized for social platforms.

---

# 40. GitHub Integration

The portfolio may integrate GitHub data.

Possible features:

- Public repositories
- Repository stars
- Repository languages
- Contribution activity
- GitHub profile link

GitHub integration should not become the primary representation of professional experience.

---

# 41. Optional GitHub API Section

A dynamic GitHub section may display:

```text
GitHub Activity

Repositories
Commits
Languages
Stars
```

The API should be cached where possible to prevent unnecessary requests.

---

# 42. Technical Architecture

## Recommended Stack

### Frontend

```text
React.js
TypeScript
Tailwind CSS
Vite
```

or:

```text
Next.js
TypeScript
Tailwind CSS
```

Next.js is preferred if SEO, routing, server rendering, and future content features are important.

---

# 43. UI Architecture

Recommended structure:

```text
src/
│
├── components/
│   ├── Navbar
│   ├── Hero
│   ├── About
│   ├── Skills
│   ├── Experience
│   ├── Projects
│   ├── ProjectCard
│   ├── Contact
│   └── Footer
│
├── pages/
│
├── data/
│   ├── projects
│   ├── skills
│   ├── experience
│   └── education
│
├── assets/
│
├── hooks/
│
├── utils/
│
└── styles/
```

---

# 44. Data-Driven Architecture

Portfolio content should be separated from UI components.

Example:

```javascript
const projects = [
  {
    title: "Project Name",
    description: "Project description",
    technologies: ["React", "Node.js", "PostgreSQL"],
    category: "Full Stack",
    image: "/projects/project.png",
    github: "https://github.com/...",
    live: "https://..."
  }
];
```

This makes it easier to add or update projects without modifying component logic.

---

# 45. Backend Requirements

A backend is optional for the initial version.

## MVP

The portfolio can operate as a static application.

## Backend Required For

- Contact form processing
- Admin dashboard
- Blog
- Authentication
- Dynamic content
- Analytics storage

Possible backend stack:

```text
Node.js
Express.js
PostgreSQL / MongoDB
```

---

# 46. Contact API

If a backend is implemented:

```http
POST /api/contact
```

### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss..."
}
```

### Success Response

```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

---

# 47. Security Requirements

If a backend exists:

- Validate all inputs
- Sanitize user input
- Rate-limit contact submissions
- Protect API endpoints
- Use environment variables
- Never expose secrets
- Implement CORS correctly
- Use HTTPS
- Protect against spam
- Avoid storing unnecessary personal information

---

# 48. Analytics

The portfolio may use privacy-conscious analytics.

Track:

- Page views
- Project views
- Resume clicks
- Resume downloads
- Contact form submissions
- External link clicks

Do not collect unnecessary personal information.

---

# 49. Content Management

## MVP

Content can be stored in:

```text
JSON / TypeScript data files
```

## Future

Introduce a CMS or admin panel for:

- Projects
- Experience
- Skills
- Blog posts
- Certifications
- Achievements

---

# 50. Dark Mode

Dark mode should be considered as a secondary feature.

Requirements:

- System preference detection
- Manual toggle
- Persist user preference
- Accessible contrast
- Consistent component styling

Example:

```text
Light
Dark
System
```

---

# 51. Search

Search is not required for the MVP.

Future search can support:

- Projects
- Blog posts
- Skills
- Technologies

---

# 52. Project Filtering

The Projects page should optionally support:

```text
All
Frontend
Backend
Full Stack
React
Next.js
Java
Other
```

Filtering should happen without unnecessary page reloads.

---

# 53. User Stories

## Recruiter

> As a recruiter, I want to understand the developer's profile quickly so that I can decide whether to continue reviewing the candidate.

## Recruiter — Resume

> As a recruiter, I want to download the developer's resume so that I can save it for the hiring process.

## Hiring Manager

> As a hiring manager, I want to inspect project architecture and technologies so that I can evaluate technical capability.

## Client

> As a client, I want to see previous projects so that I can determine whether the developer can handle my project.

## Developer

> As a developer, I want to access GitHub repositories so that I can inspect the implementation.

## Visitor

> As a visitor, I want to contact the developer easily so that I can discuss an opportunity.

---

# 54. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Display professional identity | Must Have |
| FR-02 | Display professional summary | Must Have |
| FR-03 | Display technical skills | Must Have |
| FR-04 | Display experience | Must Have |
| FR-05 | Display projects | Must Have |
| FR-06 | Display project details | Must Have |
| FR-07 | Provide resume download | Must Have |
| FR-08 | Provide contact form | Must Have |
| FR-09 | Provide social links | Must Have |
| FR-10 | Responsive design | Must Have |
| FR-11 | SEO metadata | Must Have |
| FR-12 | Accessibility support | Must Have |
| FR-13 | Project filtering | Should Have |
| FR-14 | GitHub integration | Should Have |
| FR-15 | Dark mode | Should Have |
| FR-16 | Analytics | Should Have |
| FR-17 | Blog | Future |
| FR-18 | Admin dashboard | Future |
| FR-19 | CMS | Future |

---

# 55. Non-Functional Requirements

## Performance

- Fast initial render
- Optimized assets
- Minimal blocking JavaScript
- Responsive interactions

## Reliability

- No broken navigation links
- Valid external links
- Graceful API failure handling

## Scalability

The architecture should allow:

- More projects
- Blog
- CMS
- Admin panel
- Multiple languages

## Maintainability

Components should be:

- Reusable
- Modular
- Data-driven
- Well organized

---

# 56. Error Handling

## Contact Form

If submission fails:

> Something went wrong. Please try again or contact me directly via email.

## GitHub API

If GitHub data cannot be loaded:

> GitHub activity is temporarily unavailable.

The rest of the portfolio must continue functioning.

---

# 57. Empty States

Example:

### No Projects

> Projects are currently being updated. Please check back soon.

### No Certifications

> Certification information will be added soon.

---

# 58. Loading States

Use lightweight loading states for dynamic content.

Examples:

- Skeleton cards
- Spinner for form submission
- Button loading state

Avoid full-screen loaders unless absolutely necessary.

---

# 59. Browser Support

Support modern versions of:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

Mobile browsers should also be supported.

---

# 60. Deployment

Recommended deployment options:

### Frontend

- Vercel
- Netlify
- Cloudflare Pages

### Backend

- Render
- Railway
- Vercel Functions
- Cloudflare Workers

### Database

- PostgreSQL
- MongoDB Atlas

---

# 61. Domain

Recommended domain patterns:

```text
prasoonsoni.dev
prasoon.dev
prasoonsoni.com
```

The final domain should be selected based on availability and professional branding.

---

# 62. Repository Structure

Recommended Git repository:

```text
portfolio/
│
├── public/
│
├── src/
│   ├── components/
│   ├── sections/
│   ├── pages/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   └── assets/
│
├── README.md
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

---


# 63. Project Folder Structure & Code Organization Standards

The portfolio must follow a **feature-aware, maintainable, and scalable folder structure**. The purpose is to keep UI components, reusable hooks, TypeScript interfaces, mock data, utility functions, application logic, and styling concerns clearly separated.

## 63.1 Recommended Complete Folder Structure

```text
portfolio/
│
├── public/
│   ├── images/
│   │   ├── profile/
│   │   ├── projects/
│   │   ├── certifications/
│   │   ├── achievements/
│   │   └── og/
│   ├── resume/
│   │   └── resume.pdf
│   ├── icons/
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── about/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── projects/[slug]/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── education/page.tsx
│   │   ├── certifications/page.tsx
│   │   ├── achievements/page.tsx
│   │   ├── services/page.tsx
│   │   ├── contact/page.tsx
│   │   └── api/contact/route.ts
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── skills/
│   │   ├── experience/
│   │   ├── projects/
│   │   ├── education/
│   │   ├── certifications/
│   │   ├── achievements/
│   │   ├── services/
│   │   ├── resume/
│   │   └── contact/
│   │
│   ├── hooks/
│   │   ├── useScrollSpy.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useContactForm.ts
│   │   └── useTheme.ts
│   │
│   ├── types/
│   │   ├── project.ts
│   │   ├── skill.ts
│   │   ├── experience.ts
│   │   ├── education.ts
│   │   ├── certification.ts
│   │   ├── achievement.ts
│   │   ├── service.ts
│   │   └── contact.ts
│   │
│   ├── mockdata/
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   ├── education.ts
│   │   ├── certifications.ts
│   │   ├── achievements.ts
│   │   └── services.ts
│   │
│   ├── styles/
│   │   ├── components.ts
│   │   ├── layout.ts
│   │   ├── typography.ts
│   │   ├── buttons.ts
│   │   ├── cards.ts
│   │   └── sections.ts
│   │
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── metadata.ts
│   │   ├── github.ts
│   │   └── validations.ts
│   │
│   ├── utils/
│   │   ├── formatDate.ts
│   │   ├── slugify.ts
│   │   └── cn.ts
│   │
│   └── assets/
│       └── icons/
│
├── .env.local
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## 63.2 Folder Responsibilities

### `app/`

Contains Next.js routes, layouts, page-level metadata, and API routes.

**Rule:** Do not place reusable UI components, hooks, or mock data directly inside `app/`.

### `components/`

Contains reusable UI components grouped by feature or responsibility.

Examples:

```text
components/
├── common/
├── layout/
├── hero/
├── projects/
└── contact/
```

Components should focus on presentation and interaction rather than owning large static datasets.

### `hooks/`

**All custom React hooks must be kept inside `hooks/`.**

Rules:

- Every custom hook must begin with `use`.
- Hooks contain reusable stateful or lifecycle logic.
- Do not put ordinary utility functions here.
- Avoid duplicating the same hook logic across components.

### `types/`

**All shared TypeScript interfaces and reusable type definitions must be kept inside `types/`.**

Example:

```typescript
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  category: string;
  image: string;
  github?: string;
  live?: string;
}
```

Rules:

- Prefer interfaces for object contracts.
- Use `type` for unions, intersections, mapped types, and aliases where appropriate.
- Never duplicate the same shared interface in multiple components.
- Avoid `any`.

### `mockdata/`

**All temporary/static portfolio content must be kept inside `mockdata/`.**

Examples:

```text
mockdata/
├── projects.ts
├── skills.ts
├── experience.ts
├── education.ts
└── certifications.ts
```

Components must consume typed mock data instead of defining large datasets internally.

### `styles/`

**Repeated Tailwind class combinations must be kept inside `styles/`.**

Example:

```typescript
export const styles = {
  container: "lg:px-4 px-8 max-w-7xl mx-auto",
  section: "py-16 md:py-20",
  heading: "text-3xl md:text-4xl font-bold tracking-tight",
  card: "rounded-2xl border border-gray-200 bg-white",
};
```

Rules:

- Extract genuinely repeated class combinations.
- Do not extract every one-off class.
- Keep component-specific styling close to the component.
- Name styles semantically.
- Avoid creating one huge style object for the entire application.

### `lib/`

Contains application-level integrations, constants, metadata helpers, API clients, and validation logic.

### `utils/`

Contains small, pure, reusable helper functions that do not depend on React state.

### `assets/`

Contains source assets that are imported into application code. Public static files should generally remain in `public/`.

---

# 64. Code Standards

## 64.1 TypeScript

All application code must use TypeScript.

Preferred:

```typescript
interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}
```

Avoid:

```typescript
const ProjectCard = (props: any) => {};
```

Rules:

- Avoid `any`.
- Explicitly type reusable component props.
- Type API responses.
- Do not duplicate interfaces.
- Keep shared types in `types/`.

## 64.2 React Components

Use functional components.

```tsx
interface HeroProps {
  title: string;
  description: string;
}

export function Hero({ title, description }: HeroProps) {
  return (
    <section>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
```

Each component should have one clear responsibility.

## 64.3 Naming

React components:

```text
PascalCase
ProjectCard.tsx
ContactForm.tsx
```

Functions and variables:

```text
camelCase
handleSubmit
projectList
```

Hooks:

```text
useSomething
useScrollSpy.ts
useContactForm.ts
```

Folders should use lowercase names.

## 64.4 Data Separation

Do not place large static data inside components.

Avoid:

```tsx
const Projects = () => {
  const projects = [
    // large dataset
  ];

  return (...);
};
```

Use:

```text
mockdata/projects.ts
```

instead.

## 64.5 Import Standards

Use the TypeScript path alias.

Preferred:

```typescript
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import type { Project } from "@/types/project";
import { projects } from "@/mockdata/projects";
import { styles } from "@/styles/components";
```

Avoid long relative paths such as:

```typescript
import { ProjectCard } from "../../../components/projects/ProjectCard";
```

## 64.6 Tailwind Standards

Use Tailwind CSS as the primary styling system.

Use canonical Tailwind spacing and sizing utilities whenever possible:

```text
p-4
p-6
mt-8
gap-6
rounded-2xl
max-w-7xl
```

Preferred section container:

```text
lg:px-4 px-8 max-w-7xl mx-auto
```

For wider responsive layouts, the project's established pattern may be used:

```text
2xl:max-w-[70%]
xl:max-w-[85%]
lg:max-w-[92%]
max-w-[95%]
mx-auto
```

Avoid arbitrary values unless genuinely required by the design.

## 64.7 Repeated Tailwind Classes

If the same combination is used repeatedly, move it into `styles/`.

Example:

```typescript
export const styles = {
  container: "lg:px-4 px-8 max-w-7xl mx-auto",
  section: "py-16 md:py-20",
};
```

Then:

```tsx
<section className={styles.section}>
  <div className={styles.container}>
    ...
  </div>
</section>
```

## 64.8 Conditional Classes

Use a reusable `cn()` utility for complex conditional Tailwind classes.

```tsx
<div
  className={cn(
    styles.card,
    featured && "border-primary"
  )}
>
```

Avoid unreadable string concatenation.

## 64.9 State Management

Use the simplest appropriate solution:

```text
Local state
    ↓
Custom hook
    ↓
Context
    ↓
External state library
```

Do not introduce global state for local component concerns.

## 64.10 Server and Client Components

With Next.js App Router:

**Default to Server Components.**

Use:

```tsx
"use client";
```

only when client-side functionality is required, such as:

- `useState`
- `useEffect`
- Browser APIs
- Interactive event handlers
- Client-only libraries

Avoid turning entire page trees into client components unnecessarily.

## 64.11 API and Business Logic

Keep API communication outside presentation components.

Prefer:

```text
lib/
└── github.ts
```

instead of putting a large API implementation directly inside a UI component.

## 64.12 Environment Variables

Never commit secrets.

Use:

```text
.env.local
.env.example
```

Only variables intended for browser exposure should use the framework's public environment-variable convention.

## 64.13 Error Handling

Expected errors must be handled explicitly.

```typescript
try {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
} catch (error) {
  console.error("GitHub API error:", error);
  return null;
}
```

Do not expose sensitive implementation details to users.

## 64.14 Accessibility

Every interactive element must support:

- Keyboard navigation
- Visible focus states
- Semantic HTML
- Accessible labels
- Appropriate ARIA attributes where necessary

Prefer:

```html
<button>
```

instead of:

```html
<div onClick={...}>
```

All meaningful images require useful `alt` text.

## 64.15 Performance

Follow these standards:

- Use `next/image` where appropriate.
- Optimize images.
- Lazy-load non-critical media.
- Avoid unnecessary client components.
- Avoid unnecessary state.
- Avoid unnecessary re-renders.
- Keep animations lightweight.
- Avoid large dependencies when a smaller solution is sufficient.

## 64.16 Comments

Comments should explain **why**, not simply repeat what the code does.

Avoid:

```typescript
// Set loading to true
setLoading(true);
```

Prefer:

```typescript
// Prevent duplicate submissions while the request is processing.
setLoading(true);
```

## 64.17 Constants

Application-wide constants should be kept in:

```text
src/lib/constants.ts
```

Avoid duplicating the same URL, label, or configuration value across components.

## 64.18 Reusability

Before creating a new component, hook, utility, or style, check whether an existing reusable implementation can be used.

Common reusable components include:

```text
Button
Container
SectionHeading
Badge
SocialLinks
```

## 64.19 No Duplicate Logic

The same logic must not be copied across multiple components.

If scroll tracking is required in multiple places:

```text
hooks/useScrollSpy.ts
```

should provide the shared implementation.

## 64.20 No Hardcoded Repeated Content

Avoid repeating professional information directly throughout components.

Prefer typed data from:

```text
mockdata/
```

and render it through reusable components.

---

# 65. Git & Version Control Standards

## Branch Naming

Use descriptive names:

```text
feature/hero-section
feature/projects-page
feature/contact-form
fix/mobile-navbar
fix/contact-validation
refactor/project-components
```

Avoid:

```text
abc
new
test
final
changes
```

## Commit Naming

Use meaningful conventional-style commits:

```text
feat: add hero section
feat: add project filtering
fix: resolve mobile navbar issue
refactor: extract reusable project card
style: improve portfolio spacing
docs: update README
chore: update dependencies
```

---

# 66. Code Quality Checklist

Before considering a feature complete:

- [ ] Component has a clear responsibility.
- [ ] Props are properly typed.
- [ ] Interfaces/types are stored in `types/`.
- [ ] Custom hooks are stored in `hooks/`.
- [ ] Mock/static data is stored in `mockdata/`.
- [ ] Repeated Tailwind classes are stored in `styles/`.
- [ ] No unnecessary `any` types exist.
- [ ] No duplicated logic exists.
- [ ] No unnecessary client components exist.
- [ ] Images are optimized.
- [ ] Accessibility has been considered.
- [ ] Responsive behavior has been tested.
- [ ] Loading/error states are handled where required.
- [ ] No secrets are committed.
- [ ] ESLint passes.
- [ ] TypeScript compilation passes.
- [ ] Production build succeeds.

---

# 67. Development Validation Commands

Before pushing code:

```bash
npm run lint
```

Run the production build:

```bash
npm run build
```

Run the production server locally:

```bash
npm run start
```

The project should not be considered ready for deployment if linting, type checking, or the production build fails.

---

# 68. Updated Repository Structure

The folder structure and code organization above supersede the simpler repository structure previously described in this PRD.

The following rules are mandatory project conventions:

```text
hooks/       → all custom React hooks
types/       → all shared interfaces and type definitions
mockdata/    → all mock/static portfolio data
styles/      → repeated Tailwind class combinations
components/  → reusable UI components
lib/         → integrations, constants, API/configuration logic
utils/       → pure reusable helper functions
app/         → routes, layouts, pages, API routes
public/      → public images, resume, icons, static files
```

This separation must be maintained as the project grows.


# 63. README Requirements

The GitHub repository should contain:

- Project overview
- Features
- Tech stack
- Screenshots
- Installation steps
- Environment variables
- Development commands
- Deployment instructions
- Live demo
- Author information

---

# 69. Development Phases

## Phase 1 — Planning

Tasks:

- Finalize personal branding
- Collect professional information
- Collect projects
- Collect resume
- Collect photographs
- Finalize technologies

---

## Phase 2 — UI Design

Tasks:

- Design system
- Color palette
- Typography
- Navigation
- Hero
- Project cards
- Responsive layouts

---

## Phase 3 — Frontend Development

Tasks:

- Project setup
- Routing
- Components
- Sections
- Responsive design
- Animations

---

## Phase 4 — Content Integration

Tasks:

- Experience
- Skills
- Projects
- Education
- Certifications
- Achievements
- Resume

---

## Phase 5 — Advanced Features

Tasks:

- Contact API
- GitHub integration
- Analytics
- Dark mode

---

## Phase 6 — SEO & Accessibility

Tasks:

- Metadata
- Open Graph
- Structured data
- Semantic HTML
- Keyboard navigation
- Accessibility testing

---

## Phase 7 — Testing

Test:

- Desktop
- Tablet
- Mobile
- Different browsers
- Forms
- Navigation
- External links
- Resume download
- Project pages

---

## Phase 8 — Deployment

Tasks:

- Configure domain
- Configure HTTPS
- Deploy
- Verify production build
- Test SEO
- Test analytics
- Monitor errors

---

# 70. MVP Definition

The MVP is complete when the following are functional:

- [ ] Home page
- [ ] About section
- [ ] Skills section
- [ ] Experience section
- [ ] Projects section
- [ ] Project details
- [ ] Education
- [ ] Certifications
- [ ] Resume
- [ ] Contact
- [ ] Social links
- [ ] Responsive layout
- [ ] SEO
- [ ] Accessibility basics
- [ ] Production deployment

---

# 71. Acceptance Criteria

## Home

- Professional identity is visible immediately.
- Primary CTA works.
- Resume can be accessed.
- Social links work.

## Skills

- Skills are categorized.
- Technologies are readable.
- No unsupported skills are presented.

## Experience

- Experience is chronologically organized.
- Responsibilities are clearly described.
- Technologies are listed.

## Projects

- Projects contain images.
- Project cards contain technology tags.
- GitHub and live links work.
- Detailed project pages work.

## Resume

- Resume opens correctly.
- Resume downloads correctly.
- Resume is readable on desktop and mobile.

## Contact

- Form validates input.
- Invalid email addresses are rejected.
- Submission provides feedback.
- Spam protection is implemented if backend is used.

## Responsive

- No horizontal scrolling.
- Navigation works on mobile.
- Cards adapt correctly.
- Typography remains readable.

---

# 72. Success Metrics

The portfolio can be evaluated using:

### Engagement

- Project page visits
- Average session duration
- Resume clicks
- Resume downloads

### Conversion

- Contact form submissions
- Email clicks
- LinkedIn profile visits
- GitHub visits

### Technical

- Lighthouse performance
- Accessibility score
- SEO score
- Core Web Vitals

---

# 73. Future Roadmap

## Version 1.1

- Dark mode
- GitHub integration
- Advanced project filtering
- Improved animations

## Version 1.2

- Blog
- Markdown-based articles
- Search
- Categories

## Version 2.0

- Admin dashboard
- CMS
- Authentication
- Dynamic portfolio management

## Version 3.0

Potential features:

- AI-powered portfolio assistant
- Interactive developer resume
- Project architecture explorer
- GitHub analytics
- Case-study generator
- Recruiter-focused profile view

---

# 74. Recommended Final Page Structure

```text
┌─────────────────────────────────────┐
│              NAVBAR                 │
├─────────────────────────────────────┤
│                                     │
│               HERO                  │
│        Name + Role + CTA            │
│                                     │
├─────────────────────────────────────┤
│          PROFESSIONAL STATS         │
├─────────────────────────────────────┤
│              ABOUT                  │
├─────────────────────────────────────┤
│              SKILLS                 │
├─────────────────────────────────────┤
│            EXPERIENCE               │
├─────────────────────────────────────┤
│             PROJECTS                │
├─────────────────────────────────────┤
│            EDUCATION                │
├─────────────────────────────────────┤
│          CERTIFICATIONS             │
├─────────────────────────────────────┤
│           ACHIEVEMENTS              │
├─────────────────────────────────────┤
│             SERVICES                │
├─────────────────────────────────────┤
│              RESUME                 │
├─────────────────────────────────────┤
│             CONTACT                 │
├─────────────────────────────────────┤
│              FOOTER                 │
└─────────────────────────────────────┘
```

---

# 75. Final Product Positioning

The finished portfolio should position the developer as:

> **A technically capable professional who can design, develop, deploy, and explain real-world software applications.**

The website should therefore avoid being only a collection of attractive UI sections.

Every major section should answer at least one professional question:

```text
Who are you?
        ↓
What do you know?
        ↓
What have you built?
        ↓
What experience do you have?
        ↓
How technically capable are you?
        ↓
What value can you provide?
        ↓
How can someone contact you?
```

This creates a complete **technical + professional portfolio experience** rather than simply an online resume.
