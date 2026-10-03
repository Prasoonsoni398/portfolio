export interface Experience {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string; // or 'Present'
  isCurrent: boolean;
  type: "Full-time" | "Traineeship" | "Educational Content Development";
  summary: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  highlights?: string[];
}
