import React from "react";
import { constructMetadata } from "@/lib/metadata";
import { ContactSection } from "@/components/contact/ContactSection";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = constructMetadata({
  title: `Contact | ${SITE_CONFIG.name}`,
  description: "Connect with Prasoon Soni for software engineering roles, project inquiries, or technical collaboration."
});

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="py-12 bg-base-200/40 border-b border-base-300">
        <Container>
          <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
            Contact Me
          </h1>
          <p className="text-sm sm:text-base text-base-content/70 mt-2 max-w-xl">
            Get in touch for professional inquiries, software engineering roles, or consulting requests.
          </p>
        </Container>
      </div>

      <ContactSection />
    </div>
  );
}
