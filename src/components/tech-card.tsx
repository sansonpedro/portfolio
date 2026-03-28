import { cn } from "@/lib/utils";

interface TechCardProps {
  number: string;
  label: string;
  title: string;
  description: string;
  tags?: string[];
  borderColor?: string;
}

export function TechCard({
  number,
  label,
  title,
  description,
  tags,
  borderColor,
}: TechCardProps) {
  return (
    <div
      className={cn(
        "bg-card-black p-8 border-l-4 transition-all hover:bg-[#1a1a1a]",
        borderColor || "border-white/10",
      )}
    >
      <div className="flex gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">
        <span>{number}</span>
        <span>|</span>
        <span>{label}</span>
      </div>
      <h3 className="text-3xl font-bold mb-4">{title}</h3>
      <p className="text-white/50 text-xs leading-relaxed mb-6">
        {description}
      </p>
      {tags && (
        <div className="flex gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] bg-white/5 px-2 py-1 uppercase font-bold tracking-tighter text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
