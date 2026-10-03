import { Achievement } from "@/types/achievement";

export const achievements: Achievement[] = [
  {
    id: "animated-dsa-curriculum",
    title: "Authored 50+ Animated Java DSA Solutions",
    category: "Content & Education",
    date: "2025 - 2026",
    description: "Designed animated visual explanations of complex algorithms and memory structures at Raj Institute of Coding and Robotics, clarifying computer science concepts for hundreds of learners.",
    metrics: "50+ Animated Modules",
    linkText: "View Profile",
    linkUrl: "https://github.com/Prasoonsoni398"
  },
  {
    id: "real-time-chat-deployment",
    title: "Engineered Sub-100ms Real-Time Chat Engine",
    category: "Engineering & Hackathons",
    date: "2026",
    description: "Architected a dual-channel WebSocket messaging system featuring optimistic client dispatch, room presence, and zero message dropping during simulated transient network losses.",
    metrics: "< 100ms Latency",
    linkText: "View Project",
    linkUrl: "/projects/real-time-communication-app"
  },
  {
    id: "btech-completion",
    title: "Completed B.Tech in Computer Science & Engineering",
    category: "Open Source & Academic",
    date: "2026",
    description: "Graduated with focused academic distinction in software engineering, object-oriented systems, and scalable database architectures from RGPV.",
    metrics: "Graduated 2026",
    linkText: "View Education",
    linkUrl: "/education"
  }
];
