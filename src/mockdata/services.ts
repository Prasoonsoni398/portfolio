import { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "frontend-development",
    title: "Frontend Engineering",
    shortDescription: "Crafting modern, accessible, and high-performance React & Next.js user interfaces.",
    detailedDescription: "Architecting interactive single-page and server-rendered web applications with clean TypeScript code, reusable components, and fluid responsive behaviors across all viewports.",
    iconName: "Layout",
    deliverables: [
      "Custom responsive web interfaces (Desktop & Mobile)",
      "State management & custom hook pipelines",
      "Interactive data visualizations & dashboards",
      "Rigorous accessibility & cross-browser testing"
    ],
    techStack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "FlyonUI"]
  },
  {
    id: "full-stack-web-apps",
    title: "Full-Stack Web Development",
    shortDescription: "End-to-end web applications combining robust backend services with polished frontends.",
    detailedDescription: "Delivering complete web solutions from database schema modeling and RESTful API development to interactive user portals and real-time event synchronization.",
    iconName: "Layers",
    deliverables: [
      "Full-stack web application architecture",
      "Secure authentication & session workflows",
      "Database design and query optimization",
      "End-to-end integration and API consumption"
    ],
    techStack: ["Next.js", "Node.js", "Express", "PostgreSQL", "MongoDB"]
  },
  {
    id: "backend-apis",
    title: "REST APIs & Backend Services",
    shortDescription: "Scalable backend routing, authentication, and database services.",
    detailedDescription: "Building modular Node.js & Express servers, structured RESTful API contracts, data validation pipelines, and secure authentication mechanisms with JWT.",
    iconName: "Server",
    deliverables: [
      "RESTful API contract design and implementation",
      "JWT-based authorization and user verification",
      "Third-party service integrations & webhooks",
      "Standardized error handling and logging"
    ],
    techStack: ["Node.js", "Express.js", "JWT", "REST", "Postman"]
  },
  {
    id: "real-time-systems",
    title: "Real-Time Features & WebSockets",
    shortDescription: "Interactive real-time communication channels, presence tracking, and instant alerts.",
    detailedDescription: "Implementing bidirectional WebSocket connections for live chat rooms, notification dispatchers, live status feeds, and optimistic state updates.",
    iconName: "Zap",
    deliverables: [
      "WebSocket server-client event architecture",
      "User presence and typing heartbeat indicators",
      "Optimistic UI updates with offline queuing",
      "Resilient auto-reconnection protocols"
    ],
    techStack: ["Socket.io", "WebSockets", "Node.js", "React"]
  },
  {
    id: "ui-implementation",
    title: "Figma to Responsive Code",
    shortDescription: "Pixel-accurate, accessible translation of UI/UX designs into production-ready web code.",
    deliverables: [
      "Pixel-crisp responsive translation of Figma designs",
      "Design system tokens and reusable component libraries",
      "Micro-animations, transitions, and hover feedback",
      "WCAG accessibility color contrast & semantic markup"
    ],
    detailedDescription: "Bridging the gap between design and production with clean semantic HTML, modular styling, fluid animations, and high performance.",
    iconName: "Palette",
    techStack: ["Figma", "Tailwind CSS", "Semantic HTML5", "TypeScript"]
  }
];
