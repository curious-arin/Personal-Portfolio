
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X, BrainCircuit } from "lucide-react";
import useActiveSection from "../../hooks/useActiveSection";

const links = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Contact", "contact"],
];

const sectionIds = ["home", ...links.map(([, id]) => id)];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => e.matches && setOpen(false);

    mq.addEventListener("change", onChange);

    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => e.key === "Escape" && setOpen(false);

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        open
          ? "border-white/[0.07] bg-ink/[0.97] backdrop-blur-xl"
          : scrolled
            ? "border-white/[0.07] bg-ink/85 backdrop-blur-xl"
            : "border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
        aria-label="Main"
      >
        {/* AI Logo */}
        <a
          href="#home"
          aria-label="Arin Sharma, back to top"
          className="group flex items-center gap-2.5 rounded-lg"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-violet/30 bg-violet/10 text-violet transition group-hover:border-violet group-hover:bg-violet/20">
            <BrainCircuit size={22} strokeWidth={1.8} />
          </span>

          <span className="text-sm font-extrabold tracking-wide text-white">
            ARIN <span className="text-violet">SHARMA</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map(([label, id]) => {
            const isActive = active === id;

            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative px-3.5 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {label}
              </a>
            );
          })}

          <a
            href="#contact"
            className="group ml-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-bold transition hover:border-violet/70 hover:bg-violet/10"
          >
            Let’s talk

            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-nav"
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="max-h-[calc(100dvh_-_var(--header-h))] overflow-y-auto px-5 pb-5 pt-1">
            {links.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className={`block border-b border-white/[0.07] py-4 text-base font-semibold ${
                  active === id ? "text-violet" : "text-zinc-300"
                }`}
              >
                {label}
              </a>
            ))}

            <a
              href="#contact"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-violet px-5 py-3 text-sm font-extrabold text-ink"
            >
              Let’s talk <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
