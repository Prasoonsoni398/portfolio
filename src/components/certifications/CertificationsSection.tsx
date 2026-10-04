import React from "react";
import { certifications as defaultCertifications } from "@/mockdata/certifications";
import { Certification } from "@/types/certification";
import { SectionHeading } from "../common/SectionHeading";
import { SectionWrapper } from "../layout/SectionWrapper";
import { Award } from "lucide-react";

export function CertificationsSection({ certifications: propCertifications }: { certifications?: Certification[] } = {}) {
  const certifications = propCertifications && propCertifications.length > 0 ? propCertifications : defaultCertifications;
  return (
    <SectionWrapper id="certifications">
      <SectionHeading
        badge="Credentials"
        title="Certifications &amp; Accreditations"
        subtitle="Verified coursework and professional software competencies."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="rounded-2xl border border-base-300 bg-base-200/50 p-6 flex flex-col justify-between gap-4 hover:border-primary/50 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold text-base-content/60">
                  {cert.issueYear}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-base-content">
                  {cert.title}
                </h3>
                <p className="text-xs text-primary font-medium mt-0.5">
                  {cert.issuer}
                </p>
                {cert.credentialId && (
                  <p className="text-[10px] font-mono text-base-content/50 mt-1">
                    Credential ID: {cert.credentialId}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-base-300/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/50 font-mono block mb-1.5">
                Skills Covered:
              </span>
              <div className="flex flex-wrap gap-1">
                {cert.skills.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-base-100 text-base-content/80 border border-base-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
