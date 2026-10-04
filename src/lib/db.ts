import fs from "fs";
import path from "path";
import { Project } from "@/types/project";
import { SkillGroup } from "@/types/skill";
import { Experience } from "@/types/experience";
import { Education } from "@/types/education";
import { Service } from "@/types/service";
import { Certification } from "@/types/certification";
import { Achievement } from "@/types/achievement";
import { Inquiry } from "@/types/inquiry";
import { ProfileSettings } from "@/types/profile";

import { projects as defaultProjects } from "@/mockdata/projects";
import { skillGroups as defaultSkills } from "@/mockdata/skills";
import { experiences as defaultExperiences } from "@/mockdata/experience";
import { educations as defaultEducations } from "@/mockdata/education";
import { services as defaultServices } from "@/mockdata/services";
import { certifications as defaultCertifications } from "@/mockdata/certifications";
import { achievements as defaultAchievements } from "@/mockdata/achievements";
import { SITE_CONFIG } from "@/lib/constants";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filename: string, defaultValue: T): T {
  try {
    ensureDirectoryExists();
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      // Auto seed
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), "utf-8");
      return defaultValue;
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return defaultValue;
  }
}

function writeJsonFile<T>(filename: string, data: T): boolean {
  try {
    ensureDirectoryExists();
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
}

// Initial default profile
const defaultProfile: ProfileSettings = {
  name: SITE_CONFIG.name,
  title: SITE_CONFIG.title,
  shortTitle: SITE_CONFIG.shortTitle,
  role: SITE_CONFIG.role,
  bio: SITE_CONFIG.bio,
  location: SITE_CONFIG.location,
  email: SITE_CONFIG.email,
  availableForHire: true,
  githubUsername: SITE_CONFIG.githubUsername,
  githubUrl: SITE_CONFIG.githubUrl,
  linkedinUrl: SITE_CONFIG.linkedinUrl,
  siteUrl: SITE_CONFIG.siteUrl,
  resumePath: SITE_CONFIG.resumePath
};

// Initial default demo inquiries
const defaultInquiries: Inquiry[] = [
  {
    id: "inq-1",
    name: "Alexander Reed",
    email: "alexander@techcraft.io",
    subject: "Full-Stack Project Collaboration",
    message: "Hi Prasoon, I came across your Cravings and Real-Time Chat apps. We have an upcoming contract project for a high-performance web dashboard and would love to discuss having you lead frontend & API integrations.",
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    status: "new",
    notes: "High priority lead from Techcraft. Review repository links before replying."
  },
  {
    id: "inq-2",
    name: "Sara Lin",
    email: "sara.lin@startupstudio.co",
    subject: "Next.js & Frontend Architecture Consulting",
    message: "Hello Prasoon! Loved your interactive portfolio UI. Are you currently available for freelance architectural reviews and UI component performance tuning?",
    createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    status: "in_review",
    notes: "Follow up with consulting rate sheet."
  }
];

export const db = {
  // Projects
  getProjects(): Project[] {
    return readJsonFile<Project[]>("projects.json", defaultProjects);
  },
  getProjectBySlug(slug: string): Project | undefined {
    const list = this.getProjects();
    return list.find((p) => p.slug === slug || p.id === slug);
  },
  saveProject(project: Project): Project {
    const list = this.getProjects();
    const existingIndex = list.findIndex((p) => p.id === project.id);
    if (existingIndex >= 0) {
      list[existingIndex] = project;
    } else {
      list.unshift(project);
    }
    writeJsonFile("projects.json", list);
    return project;
  },
  deleteProject(id: string): boolean {
    const list = this.getProjects().filter((p) => p.id !== id);
    return writeJsonFile("projects.json", list);
  },

  // Skills
  getSkills(): SkillGroup[] {
    return readJsonFile<SkillGroup[]>("skills.json", defaultSkills);
  },
  saveSkills(groups: SkillGroup[]): boolean {
    return writeJsonFile("skills.json", groups);
  },

  // Experience
  getExperiences(): Experience[] {
    return readJsonFile<Experience[]>("experience.json", defaultExperiences);
  },
  saveExperience(item: Experience): Experience {
    const list = this.getExperiences();
    const idx = list.findIndex((e) => e.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.unshift(item);
    }
    writeJsonFile("experience.json", list);
    return item;
  },
  deleteExperience(id: string): boolean {
    const list = this.getExperiences().filter((e) => e.id !== id);
    return writeJsonFile("experience.json", list);
  },

  // Education
  getEducations(): Education[] {
    return readJsonFile<Education[]>("education.json", defaultEducations);
  },
  saveEducation(item: Education): Education {
    const list = this.getEducations();
    const idx = list.findIndex((e) => e.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.unshift(item);
    }
    writeJsonFile("education.json", list);
    return item;
  },
  deleteEducation(id: string): boolean {
    const list = this.getEducations().filter((e) => e.id !== id);
    return writeJsonFile("education.json", list);
  },

  // Services
  getServices(): Service[] {
    return readJsonFile<Service[]>("services.json", defaultServices);
  },
  saveService(item: Service): Service {
    const list = this.getServices();
    const idx = list.findIndex((s) => s.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.push(item);
    }
    writeJsonFile("services.json", list);
    return item;
  },
  deleteService(id: string): boolean {
    const list = this.getServices().filter((s) => s.id !== id);
    return writeJsonFile("services.json", list);
  },

  // Certifications
  getCertifications(): Certification[] {
    return readJsonFile<Certification[]>("certifications.json", defaultCertifications);
  },
  saveCertification(item: Certification): Certification {
    const list = this.getCertifications();
    const idx = list.findIndex((c) => c.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.push(item);
    }
    writeJsonFile("certifications.json", list);
    return item;
  },
  deleteCertification(id: string): boolean {
    const list = this.getCertifications().filter((c) => c.id !== id);
    return writeJsonFile("certifications.json", list);
  },

  // Achievements
  getAchievements(): Achievement[] {
    return readJsonFile<Achievement[]>("achievements.json", defaultAchievements);
  },
  saveAchievement(item: Achievement): Achievement {
    const list = this.getAchievements();
    const idx = list.findIndex((a) => a.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.push(item);
    }
    writeJsonFile("achievements.json", list);
    return item;
  },
  deleteAchievement(id: string): boolean {
    const list = this.getAchievements().filter((a) => a.id !== id);
    return writeJsonFile("achievements.json", list);
  },

  // Inquiries / Leads CRM
  getInquiries(): Inquiry[] {
    return readJsonFile<Inquiry[]>("inquiries.json", defaultInquiries);
  },
  addInquiry(data: Omit<Inquiry, "id" | "createdAt" | "status">): Inquiry {
    const list = this.getInquiries();
    const newInquiry: Inquiry = {
      id: "inq-" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      createdAt: new Date().toISOString(),
      status: "new",
      notes: ""
    };
    list.unshift(newInquiry);
    writeJsonFile("inquiries.json", list);
    return newInquiry;
  },
  updateInquiry(id: string, updates: Partial<Inquiry>): Inquiry | null {
    const list = this.getInquiries();
    const idx = list.findIndex((i) => i.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    writeJsonFile("inquiries.json", list);
    return list[idx];
  },
  deleteInquiry(id: string): boolean {
    const list = this.getInquiries().filter((i) => i.id !== id);
    return writeJsonFile("inquiries.json", list);
  },

  // Profile Settings
  getProfile(): ProfileSettings {
    return readJsonFile<ProfileSettings>("profile.json", defaultProfile);
  },
  updateProfile(updates: Partial<ProfileSettings>): ProfileSettings {
    const current = this.getProfile();
    const updated = { ...current, ...updates };
    writeJsonFile("profile.json", updated);
    return updated;
  },

  // Dashboard Aggregates
  getDashboardStats() {
    const projects = this.getProjects();
    const skills = this.getSkills();
    const experiences = this.getExperiences();
    const inquiries = this.getInquiries();
    const services = this.getServices();

    const totalSkillsCount = skills.reduce((acc, g) => acc + g.skills.length, 0);
    const newInquiriesCount = inquiries.filter((i) => i.status === "new").length;

    return {
      projectsCount: projects.length,
      featuredProjectsCount: projects.filter((p) => p.featured).length,
      skillsCategoryCount: skills.length,
      totalSkillsCount,
      experienceCount: experiences.length,
      servicesCount: services.length,
      totalInquiries: inquiries.length,
      newInquiriesCount,
      recentInquiries: inquiries.slice(0, 5)
    };
  }
};
