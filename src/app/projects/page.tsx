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
    <div className="pt-20">
      <div className="py-12 bg-base-200/40 border-b border-base-300">
        <Container>
          <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
            Projects Portfolio
          </h1>
          <p className="text-sm sm:text-base text-base-content/70 mt-2 max-w-xl">
            Interactive showcase of full-stack web applications, real-time engines, and frontend developer tooling.
          </p>
        </Container>
      </div>

      <ProjectsSection projects={projects} />
    </div>
  );
}
