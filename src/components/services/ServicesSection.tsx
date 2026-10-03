import React from "react";
import { services } from "@/mockdata/services";
import { SectionHeading } from "../common/SectionHeading";
import { SectionWrapper } from "../layout/SectionWrapper";
import {
  Layout,
  Layers,
  Server,
  Zap,
  Palette,
  CheckCircle2,
} from "lucide-react";

export function ServicesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Layout: <Layout className="w-5 h-5" />,
    Layers: <Layers className="w-5 h-5" />,
    Server: <Server className="w-5 h-5" />,
    Zap: <Zap className="w-5 h-5" />,
    Palette: <Palette className="w-5 h-5" />,
  };

  return (
    <SectionWrapper id="services">
      <SectionHeading
        badge="Engineering Services"
        title="What I Can Build For You"
        subtitle="End-to-end technical capabilities from component design to full-stack application development."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="rounded-2xl border border-base-300 bg-base-200/50 hover:bg-base-200/90 p-6 flex flex-col justify-between gap-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-sm"
          >
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary w-fit">
                {iconMap[svc.iconName] || <Layout className="w-5 h-5" />}
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-base-content">
                  {svc.title}
                </h3>
                <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
                  {svc.shortDescription}
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-base-content/60 font-mono block">
                  Deliverables:
                </span>
                <ul className="space-y-1.5">
                  {svc.deliverables.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-base-content/80"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-base-300/80 flex flex-wrap gap-1.5">
              {svc.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-base-100 text-base-content/80 border border-base-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
