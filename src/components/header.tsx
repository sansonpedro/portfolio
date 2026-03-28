import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full py-6 px-10 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
      <div className="font-bold tracking-widest text-sm uppercase">
        DEV.PEDRO
      </div>
      <nav className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
        <Link
          href="#projects"
          className="hover:text-primary-cyber transition-colors"
        >
          Projects
        </Link>
        <Link
          href="#stack"
          className="hover:text-primary-cyber transition-colors"
        >
          Stack
        </Link>
        <Link
          href="#experience"
          className="hover:text-primary-cyber transition-colors"
        >
          Experience
        </Link>
        <Link
          href="#contact"
          className="hover:text-primary-cyber transition-colors"
        >
          Contact
        </Link>
      </nav>
      <div className="w-20" />
    </header>
  );
}
