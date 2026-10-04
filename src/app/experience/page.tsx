import React from "react";
import { constructMetadata } from "@/lib/metadata";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: `Experience | ${SITE_CONFIG.name}`,
  description: "Review Prasoon Soni's professional experience as Trainee at Raj Digital and Content Developer at Raj Institute of Coding and Robotics."
});

export default function ExperiencePage() {
  const experiences = db.getExperiences();

  return (
    <div className="pt-20">
      <div className="py-12 bg-base-200/40 border-b border-base-300">
        <Container>
          <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
            Work Experience
          </h1>
          <p className="text-sm sm:text-base text-base-content/70 mt-2 max-w-xl">
            Traineeship contributions and pedagogical content creation across software development and algorithmic education.
          </p>
        </Container>
      </div>

      <ExperienceSection experiences={experiences} />
    </div>
  );
}
