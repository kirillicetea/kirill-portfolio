"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({
  title,
  description,
  image,
  tags = [],
  href,
  status = "Готов",
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass rounded-2xl overflow-hidden hover:border-blue-500 transition-all group h-full flex flex-col"
    >
      {/* Обложка */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-400/60"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  </div>
)}
        <div className="absolute top-3 right-3">
          <span className="text-xs font-semibold text-blue-400 bg-slate-950/80 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-500/30">
            {status}
          </span>
        </div>
      </div>

      {/* Контент */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {/* Теги */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Ссылка */}
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors group-hover:gap-3"
        >
          Подробнее <span>→</span>
        </Link>
      </div>
    </motion.div>
  );
}
