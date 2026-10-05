"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="text-lg font-bold text-white hover:text-blue-400 transition-colors font-[family-name:var(--font-space-grotesk)]"
        >
          Кирилл Мирончук
        </a>

        <div className="hidden md:flex items-center gap-8">
          {[
            { href: "#about", label: "Обо мне" },
            { href: "#services", label: "Услуги" },
            { href: "#experience", label: "Опыт" },
            { href: "#projects", label: "Проекты" },
            { href: "#education", label: "Образование" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 hover:text-blue-400 transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold text-white transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
        >
          Связаться
        </a>
      </div>
    </nav>
  );
}
