export type SkillCategory = "Frontend" | "Backend" | "Databases" | "Programming" | "Tools & Practices";

export interface SkillItem {
  name: string;
  level: "Proficient" | "Advanced" | "Intermediate";
  iconName?: string;
  description: string;
  appliedIn: string[];
}

export interface SkillGroup {
  category: SkillCategory;
  description: string;
  skills: SkillItem[];
}
