export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  category: "Full Stack" | "Frontend" | "Backend" | "Java & Algorithms" | "Interactive App";
  featured: boolean;
  image: string;
  architectureSummary?: string;
  architectureComponents?: { name: string; description: string; tech: string }[];
  githubUrl?: string;
  liveUrl?: string;
  challenges?: string[];
  metrics?: { label: string; value: string }[];
}
