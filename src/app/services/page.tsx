import React from "react";
import { constructMetadata } from "@/lib/metadata";
import { ServicesSection } from "@/components/services/ServicesSection";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = constructMetadata({
  title: `Services | ${SITE_CONFIG.name}`,
  description: "Explore engineering services including React & Next.js frontend development, full-stack web applications, and real-time systems."
});

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <div className="py-12 bg-base-200/40 border-b border-base-300">
        <Container>
          <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
            Engineering Services
          </h1>
          <p className="text-sm sm:text-base text-base-content/70 mt-2 max-w-xl">
            Custom web development, scalable full-stack applications, and performant user interface implementations.
          </p>
        </Container>
      </div>

      <ServicesSection />
    </div>
  );
}
