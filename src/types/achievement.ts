export interface Achievement {
  id: string;
  title: string;
  category: "Engineering & Hackathons" | "Content & Education" | "Open Source & Academic";
  date: string;
  description: string;
  metrics?: string;
  linkText?: string;
  linkUrl?: string;
}
