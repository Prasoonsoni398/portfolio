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

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <CertificationsSection />
      <AchievementsSection />
      <ServicesSection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}
