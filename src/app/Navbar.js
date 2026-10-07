"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Определяем, на главной ли мы
  const isHome = pathname === "/";

  // Ссылки для главной (якорные) или для других страниц (полные)
  const links = isHome
  ? [
      { href: "#about", label: "Обо мне" },
      { href: "#services", label: "Услуги" },
      { href: "#experience", label: "Опыт" },
      { href: "#projects", label: "Проекты", highlight: true },  // ← выделить
      { href: "#education", label: "Образование" },
    ]
  : [
      { href: "/#about", label: "Обо мне" },
      { href: "/#services", label: "Услуги" },
      { href: "/#experience", label: "Опыт" },
      { href: "#", label: "Проекты", highlight: true },  // ← на странице проектов уже
      { href: "/#education", label: "Образование" },
    ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Логотип — ведёт на главную */}
        <Link
          href="/"
          className="text-lg font-bold text-white hover:text-blue-400 transition-colors font-[family-name:var(--font-space-grotesk)]"
        >
          Кирилл Мирончук
        </Link>

        <div className="hidden md:flex items-center gap-6">
  {links.map((link) => {
    if (link.highlight) {
      return (
        <Link
          key={link.href}
          href={link.href}
          className="group relative px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/40 hover:border-blue-400 hover:from-blue-600/30 hover:to-cyan-500/30 transition-all shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 flex items-center gap-2"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
          </span>
          {link.label}
        </Link>
      );
    }

    return (
      <Link
        key={link.href}
        href={link.href}
        className="text-sm text-slate-300 hover:text-blue-400 transition-colors relative group"
      >
        {link.label}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
      </Link>
    );
  })}
</div>

        <Link
          href={isHome ? "#contact" : "/#contact"}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold text-white transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
        >
          Связаться
        </Link>
      </div>
    </nav>
  );
}
