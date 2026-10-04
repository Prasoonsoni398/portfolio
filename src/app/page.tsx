import React from "react";
import { Hero } from "@/components/hero/Hero";
import { StatsSection } from "@/components/hero/StatsSection";
import { AboutSection } from "@/components/about/AboutSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { EducationSection } from "@/components/education/EducationSection";
import { CertificationsSection } from "@/components/certifications/CertificationsSection";
import { AchievementsSection } from "@/components/achievements/AchievementsSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ResumeSection } from "@/components/resume/ResumeSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const projects = db.getProjects();
  const skills = db.getSkills();
  const experiences = db.getExperiences();
  const educations = db.getEducations();
  const certifications = db.getCertifications();
  const achievements = db.getAchievements();
  const services = db.getServices();

  return (
    <>
      <Hero />
      <StatsSection />
      <AboutSection />
      <SkillsSection skillGroups={skills} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <EducationSection educations={educations} />
      <CertificationsSection certifications={certifications} />
      <AchievementsSection achievements={achievements} />
      <ServicesSection services={services} />
      <ResumeSection />
      <ContactSection />
    </>
  );
}
