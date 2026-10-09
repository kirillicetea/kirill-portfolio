import Link from "next/link";
import "./app.css";
import {
  FaCompass,
  FaBook,
  FaTags,
  FaUsers,
  FaInfoCircle,
  FaPen,
  FaArrowLeft,
} from "react-icons/fa";

export const metadata = {
  title: "IT Transition Stories",
  description: "Реальные истории перехода в IT",
};

export default function AppLayout({ children }) {
  return (
    <div className="app-root min-h-screen" style={{ cursor: "auto" }}>
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-60 fixed top-0 left-0 h-screen bg-[#161b22] border-r border-[#30363d] p-4">
          {/* Логотип */}
          <Link
            href="/projects/it-stories/app"
            className="flex items-center gap-3 mb-8 px-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              IT
            </div>
            <div>
              <div className="text-sm font-bold text-[#e6edf3] leading-tight">
                Transition
              </div>
              <div className="text-xs text-[#8b949e]">Stories</div>
            </div>
          </Link>

          {/* Навигация */}
          <nav className="flex-1 space-y-1">
            <Link href="/projects/it-stories/app" className="sidebar-item">
              <FaCompass className="text-base" />
              <span>Обзор</span>
            </Link>
            <Link href="/projects/it-stories/app/feed" className="sidebar-item">
              <FaBook className="text-base" />
              <span>Лента</span>
            </Link>
            <Link href="/projects/it-stories/app/tags" className="sidebar-item">
              <FaTags className="text-base" />
              <span>Теги</span>
            </Link>
            <Link href="/projects/it-stories/app/authors" className="sidebar-item">
              <FaUsers className="text-base" />
              <span>Авторы</span>
            </Link>
            <Link href="/projects/it-stories" className="sidebar-item">
              <FaInfoCircle className="text-base" />
              <span>О проекте</span>
            </Link>
          </nav>

          {/* CTA */}
          <Link
            href="/projects/it-stories/app/share"
            className="app-btn-primary w-full justify-center mb-4"
          >
            <FaPen className="text-xs" />
            Поделиться
          </Link>

          {/* Назад на сайт */}
          <Link
            href="/projects/it-stories"
            className="flex items-center gap-2 text-xs text-[#8b949e] hover:text-[#e6edf3] transition-colors px-2 py-2"
          >
            <FaArrowLeft className="text-[10px]" />
            На сайт
          </Link>
        </aside>

        {/* Основная область */}
        <div className="flex-1 md:ml-60">
          {/* Мобильный хедер */}
          <header className="md:hidden sticky top-0 z-40 bg-[#161b22] border-b border-[#30363d] px-4 py-3 flex items-center justify-between">
            <Link
              href="/projects/it-stories/app"
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xs">
                IT
              </div>
              <span className="text-sm font-bold text-[#e6edf3]">
                Transition
              </span>
            </Link>
            <Link
              href="/projects/it-stories/app/share"
              className="app-btn-primary text-xs px-3 py-1.5"
            >
              <FaPen className="text-[10px]" />
              Поделиться
            </Link>
          </header>

          {/* Контент */}
          <main className="min-h-screen">{children}</main>
        </div>
      </div>
    </div>
  );
}