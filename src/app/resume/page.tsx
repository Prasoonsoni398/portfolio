import React from "react";
import { constructMetadata } from "@/lib/metadata";
import { ResumeSection } from "@/components/resume/ResumeSection";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = constructMetadata({
  title: `Resume | ${SITE_CONFIG.name}`,
  description: "View and download Prasoon Soni's technical curriculum vitae."
});

export default function ResumePage() {
  return (
    <div className="pt-20">
      <div className="py-12 bg-base-200/40 border-b border-base-300">
        <Container>
          <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
            Curriculum Vitae
          </h1>
          <p className="text-sm sm:text-base text-base-content/70 mt-2 max-w-xl">
            Official verified professional resume of Prasoon Soni.
          </p>
        </Container>
      </div>

      <ResumeSection />
    </div>
  );
}
