import React from "react";
import { constructMetadata } from "@/lib/metadata";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: `Projects | ${SITE_CONFIG.name}`,
  description: "Explore flagship engineering projects by Prasoon Soni including Cravings, Real-Time Communication App, and Form Builder."
});

export default function ProjectsPage() {
  const projects = db.getProjects();

  return (
    <div className="">
      <ProjectsSection projects={projects} />
    </div>
  );
}
