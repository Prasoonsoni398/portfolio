import React from "react";
import { constructMetadata } from "@/lib/metadata";
import { EducationSection } from "@/components/education/EducationSection";
import { CertificationsSection } from "@/components/certifications/CertificationsSection";
import { AchievementsSection } from "@/components/achievements/AchievementsSection";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: `Education & Credentials | ${SITE_CONFIG.name}`,
  description: "B.Tech Computer Science graduate from RGPV Bhopal with focus on software engineering, algorithms, and distributed systems."
});

export default function EducationPage() {
  const educations = db.getEducations();
  const certifications = db.getCertifications();
  const achievements = db.getAchievements();

  return (
    <div className="pt-20">
      <div className="py-12 bg-base-200/40 border-b border-base-300">
        <Container>
          <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
            Education &amp; Credentials
          </h1>
          <p className="text-sm sm:text-base text-base-content/70 mt-2 max-w-xl">
            Formal engineering degree, technical certifications, and academic milestones.
          </p>
        </Container>
      </div>

      <EducationSection educations={educations} />
      <CertificationsSection certifications={certifications} />
      <AchievementsSection achievements={achievements} />
    </div>
  );
}
