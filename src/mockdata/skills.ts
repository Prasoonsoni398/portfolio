import { SkillGroup } from "@/types/skill";

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    description: "Building responsive, accessible, and high-performance user interfaces with modern client frameworks.",
    skills: [
      {
        name: "React.js",
        level: "Advanced",
        description: "Component lifecycle, custom hooks, state management, virtualization, and performance tuning.",
        appliedIn: ["Cravings", "Real-Time Chat", "Form Builder"]
      },
      {
        name: "Next.js",
        level: "Advanced",
        description: "App Router, Server & Client Components, SEO optimization, and API route architectures.",
        appliedIn: ["Portfolio", "Cravings"]
      },
      {
        name: "TypeScript",
        level: "Advanced",
        description: "Static typing, generics, strict type checking, and schema validation integrations.",
        appliedIn: ["All Projects", "Form Builder"]
      },
      {
        name: "JavaScript (ES6+)",
        level: "Proficient",
        description: "Asynchronous programming, closures, event loop, Promises, and DOM manipulation.",
        appliedIn: ["Core Applications", "DSA Animations"]
      },
      {
        name: "Tailwind CSS",
        level: "Proficient",
        description: "Design systems, semantic tokens, responsive mobile-first grids, and clean CSS variables.",
        appliedIn: ["All Projects", "UI Components"]
      },
      {
        name: "HTML5 & CSS3",
        level: "Proficient",
        description: "Semantic markup, modern layout models (Flexbox, CSS Grid), and accessibility standards (WCAG).",
        appliedIn: ["Every Web Experience"]
      },
      {
        name: "Vite",
        level: "Proficient",
        description: "Modern frontend build tooling, rapid HMR development workflows, and bundle optimization.",
        appliedIn: ["Single Page Applications"]
      }
    ]
  },
  {
    category: "Backend",
    description: "Designing scalable RESTful web APIs, real-time communication pipelines, and authentication systems.",
    skills: [
      {
        name: "Node.js",
        level: "Proficient",
        description: "Non-blocking event loop runtime, microservices, file streams, and backend server architecture.",
        appliedIn: ["Real-Time Chat Backend", "API Services"]
      },
      {
        name: "Express.js",
        level: "Proficient",
        description: "RESTful routing, middleware pipelines, error handling controllers, and CORS policies.",
        appliedIn: ["Real-Time Chat", "Voting System"]
      },
      {
        name: "REST APIs",
        level: "Proficient",
        description: "Endpoint contract design, pagination, request validation, standard HTTP status codes, and security.",
        appliedIn: ["Cravings", "Chat", "Voting System"]
      },
      {
        name: "Authentication & JWT",
        level: "Proficient",
        description: "Stateless JSON Web Tokens, bcrypt password hashing, session tokens, and route protection.",
        appliedIn: ["User Authentication", "Voting Integrity"]
      },
      {
        name: "WebSockets / Socket.io",
        level: "Proficient",
        description: "Bidirectional real-time event streaming, room management, and presence tracking.",
        appliedIn: ["Real-Time Communication App"]
      }
    ]
  },
  {
    category: "Databases",
    description: "Structuring relational schemas, document collections, and optimized transactional queries.",
    skills: [
      {
        name: "PostgreSQL",
        level: "Proficient",
        description: "Relational schema modeling, foreign key constraints, indexing, and transactional guarantees.",
        appliedIn: ["Voting Management System"]
      },
      {
        name: "MongoDB",
        level: "Proficient",
        description: "Document-oriented databases, flexible schemas, indexing, and aggregation pipelines.",
        appliedIn: ["Chat App Message Store", "User Profiles"]
      },
      {
        name: "MySQL",
        level: "Intermediate",
        description: "Relational table normalization, complex JOIN queries, and schema migrations.",
        appliedIn: ["Academic Projects"]
      }
    ]
  },
  {
    category: "Programming",
    description: "Core algorithms, data structures, object-oriented principles, and modular software craft.",
    skills: [
      {
        name: "Java",
        level: "Advanced",
        description: "Object-oriented design, collections framework, multithreading, and algorithmic problem solving.",
        appliedIn: ["Educational Content Development", "DSA Visualizations"]
      },
      {
        name: "Data Structures & Algorithms",
        level: "Advanced",
        description: "Trees, graphs, dynamic programming, sorting/searching, and Big-O computational analysis.",
        appliedIn: ["Raj Institute of Coding & Robotics", "Animated Solutions"]
      },
      {
        name: "TypeScript & JavaScript",
        level: "Advanced",
        description: "Full-stack application logic, type systems, functional and OOP paradigms.",
        appliedIn: ["Production Frontend & Backend"]
      }
    ]
  },
  {
    category: "Tools & Practices",
    description: "Version control workflows, API testing, component prototyping, and developer tooling.",
    skills: [
      {
        name: "Git & GitHub",
        level: "Proficient",
        description: "Branching strategies, pull requests, version control hygiene, and open-source collaboration.",
        appliedIn: ["Daily Workflow", "Repository Maintenance"]
      },
      {
        name: "Postman",
        level: "Proficient",
        description: "API testing, automated endpoint collections, environment variables, and payload simulation.",
        appliedIn: ["Backend API Verification"]
      },
      {
        name: "VS Code",
        level: "Proficient",
        description: "Advanced debugging, linting integrations, productivity extensions, and snippet design.",
        appliedIn: ["Primary IDE"]
      },
      {
        name: "Figma",
        level: "Intermediate",
        description: "UI/UX component inspection, design tokens, wireframing, and responsive layout planning.",
        appliedIn: ["Design to Code Translation"]
      }
    ]
  }
];
