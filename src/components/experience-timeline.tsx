import { experiences } from "@/data/experience";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="w-full">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-xl font-bold tracking-[0.3em] uppercase italic text-white/90">
          Journey
        </h2>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="relative border-l border-white/10 ml-3 pl-8 pb-4 space-y-12">
        {experiences.map((exp, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-9.25 top-1">
              <div className="h-4 w-4 rounded-full bg-[#0a0a0a] border-2 border-primary-cyber flex items-center justify-center">
                {exp.isCurrent && (
                  <div className="h-1.5 w-1.5 rounded-full bg-primary-cyber animate-pulse shadow-[0_0_8px_#7c3aed]" />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary-cyber uppercase">
                {exp.startDate} — {exp.endDate}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tighter">
                {exp.title}
              </h3>
              <div className="flex items-center gap-2 text-white/50 text-sm font-medium">
                <span className="text-white/80">{exp.company}</span>
              </div>
              <p className="mt-4 text-white/40 text-xs leading-relaxed max-w-xl">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
