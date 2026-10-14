"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectCard({
  title,
  description,
  tags = [],
  href,
  status = "Готов",
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass rounded-2xl overflow-hidden hover:border-[#a855f7] transition-all group h-full flex flex-col"
    >
      {/* Обложка — граф переходов */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#0a0514] via-[#1a0f30] to-[#2d1458]">
        {/* Неоновая сетка */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Мини-карта: узлы и стрелки */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 220"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Линии переходов */}
          <line
            x1="95"
            y1="60"
            x2="240"
            y2="60"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <line
            x1="95"
            y1="110"
            x2="240"
            y2="110"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <line
            x1="95"
            y1="160"
            x2="240"
            y2="160"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeDasharray="5 4"
          />

          {/* Стрелки-указатели */}
          <polygon points="235,54 248,60 235,66" fill="#ec4899" />
          <polygon points="235,104 248,110 235,116" fill="#ec4899" />
          <polygon points="235,154 248,160 235,166" fill="#ec4899" />

          {/* Левые узлы */}
          <rect
            x="25"
            y="45"
            width="70"
            height="30"
            rx="6"
            fill="#1a0f30"
            stroke="#a855f7"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <text
            x="60"
            y="64"
            textAnchor="middle"
            fill="#a78bfa"
            fontSize="10"
            fontFamily="monospace"
          >
            Из
          </text>

          <rect
            x="25"
            y="95"
            width="70"
            height="30"
            rx="6"
            fill="#1a0f30"
            stroke="#a855f7"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <text
            x="60"
            y="114"
            textAnchor="middle"
            fill="#a78bfa"
            fontSize="10"
            fontFamily="monospace"
          >
            Из
          </text>

          <rect
            x="25"
            y="145"
            width="70"
            height="30"
            rx="6"
            fill="#1a0f30"
            stroke="#a855f7"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <text
            x="60"
            y="164"
            textAnchor="middle"
            fill="#a78bfa"
            fontSize="10"
            fontFamily="monospace"
          >
            Из
          </text>

          {/* Правые узлы */}
          <rect
            x="255"
            y="45"
            width="100"
            height="30"
            rx="6"
            fill="url(#nodeGrad)"
            stroke="#a855f7"
            strokeWidth="1.5"
          />
          <text
            x="305"
            y="64"
            textAnchor="middle"
            fill="#f5f3ff"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
          >
            Python
          </text>

          <rect
            x="255"
            y="95"
            width="100"
            height="30"
            rx="6"
            fill="url(#nodeGrad)"
            stroke="#a855f7"
            strokeWidth="1.5"
          />
          <text
            x="305"
            y="114"
            textAnchor="middle"
            fill="#f5f3ff"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
          >
            PM
          </text>

          <rect
            x="255"
            y="145"
            width="100"
            height="30"
            rx="6"
            fill="url(#nodeGrad)"
            stroke="#a855f7"
            strokeWidth="1.5"
          />
          <text
            x="305"
            y="164"
            textAnchor="middle"
            fill="#f5f3ff"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
          >
            DevOps
          </text>
        </svg>

        {/* Градиент-затемнение снизу */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent pointer-events-none" />

        {/* Бейдж статуса */}
        <div className="absolute top-3 right-3 z-10">
          <span className="text-xs font-semibold text-green-400 bg-slate-950/80 backdrop-blur-sm px-3 py-1 rounded-full border border-green-500/30">
            {status}
          </span>
        </div>
      </div>

      {/* Контент */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#a855f7] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {/* Теги */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-[#a855f7]/10 border border-[#a855f7]/20 rounded-full text-[#a78bfa]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Ссылка */}
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-[#a855f7] hover:text-[#ec4899] font-semibold text-sm transition-colors group-hover:gap-3"
        >
          Подробнее <span>→</span>
        </Link>
      </div>
    </motion.div>
  );
}