import { ComponentType, ElementType } from "react";

interface DatabaseItemProps {
  icon: ElementType<any> | ComponentType<{ className?: string }>;
  name: string;
  type?: string;
}

export function DatabaseItem({ icon: Icon, name, type }: DatabaseItemProps) {
  return (
    <div className="flex items-center justify-between bg-[#141414] p-4 border border-white/5 hover:border-primary-cyber/30 transition-all group relative overflow-hidden">
      <div className="flex items-center gap-4 relative z-10">
        <Icon
          className="w-5 h-5 text-white/40 group-hover:text-primary-cyber group-hover:drop-shadow-[0_0_8px_#7c3aed] transition-all"
        />
        <span className="text-sm font-bold uppercase tracking-tight text-white/80 group-hover:text-white transition-colors">
          {name}
        </span>
      </div>
      {type && (
        <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest italic group-hover:text-white/40 transition-colors relative z-10">
          {type}
        </span>
      )}
      <div className="absolute inset-0 bg-linear-to-r from-primary-cyber/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}