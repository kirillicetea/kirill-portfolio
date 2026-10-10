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
        {/* Sidebar — только на десктопе */}
        <aside className="hidden md:flex flex-col w-60 fixed top-0 left-0 h-screen bg-[#130a24]/80 backdrop-blur-xl border-r border-[#a855f7]/15 p-4">
          {/* Логотип */}
          <Link
            href="/projects/it-stories/app"
            className="flex items-center gap-3 mb-8 px-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center text-white font-bold text-sm">
                IT
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-[#f5f3ff] leading-tight">
                Transition
              </div>
              <div className="text-xs text-[#7c6f9e] font-mono">Stories</div>
            </div>
          </Link>

          {/* Навигация */}
          <nav className="flex-1 space-y-1">
            <Link href="/projects/it-stories/app" className="sidebar-item active">
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
            className="app-btn-primary w-full mb-4"
          >
            <FaPen className="text-xs" />
            Поделиться
          </Link>

          {/* Назад на сайт */}
          <Link
            href="/projects/it-stories"
            className="flex items-center gap-2 text-xs text-[#7c6f9e] hover:text-[#a855f7] transition-colors px-2 py-2 font-mono"
          >
            <FaArrowLeft className="text-[10px]" />
            на сайт
          </Link>
        </aside>

        {/* Основная область */}
        <div className="flex-1 md:ml-60">
          {/* Мобильный хедер — только на мобилке */}
          <header className="md:hidden sticky top-0 z-40 bg-[#130a24]/90 backdrop-blur-xl border-b border-[#a855f7]/15 px-4 py-3 flex items-center justify-between">
            <Link
              href="/projects/it-stories/app"
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-[#a855f7]/30">
                IT
              </div>
              <span className="text-sm font-bold text-[#f5f3ff]">
                Transition
              </span>
            </Link>
            <Link
              href="/projects/it-stories"
              className="text-xs text-[#7c6f9e] hover:text-[#a855f7] transition-colors font-mono flex items-center gap-1"
            >
              <FaArrowLeft className="text-[10px]" />
              на сайт
            </Link>
          </header>

          {/* Контент */}
          <main className="min-h-screen py-8 px-6 pb-24 md:pb-8">
            {children}
          </main>

          {/* Нижняя навигация — только на мобилке */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#130a24]/95 backdrop-blur-xl border-t border-[#a855f7]/15">
            <div className="grid grid-cols-4 gap-0">
              <Link
                href="/projects/it-stories/app"
                className="flex flex-col items-center gap-1 py-3 text-[#7c6f9e] hover:text-[#a855f7] transition-colors"
              >
                <FaCompass className="text-lg" />
                <span className="text-[10px] font-mono uppercase tracking-wider">
                  Обзор
                </span>
              </Link>
              <Link
                href="/projects/it-stories/app/feed"
                className="flex flex-col items-center gap-1 py-3 text-[#7c6f9e] hover:text-[#a855f7] transition-colors"
              >
                <FaBook className="text-lg" />
                <span className="text-[10px] font-mono uppercase tracking-wider">
                  Лента
                </span>
              </Link>
              <Link
                href="/projects/it-stories/app/tags"
                className="flex flex-col items-center gap-1 py-3 text-[#7c6f9e] hover:text-[#a855f7] transition-colors"
              >
                <FaTags className="text-lg" />
                <span className="text-[10px] font-mono uppercase tracking-wider">
                  Теги
                </span>
              </Link>
              <Link
                href="/projects/it-stories/app/share"
                className="flex flex-col items-center gap-1 py-3 text-[#a855f7] transition-colors relative"
              >
                <div className="absolute -top-3 w-12 h-12 rounded-full bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center shadow-lg shadow-[#a855f7]/40 border-4 border-[#0a0514]">
                  <FaPen className="text-white text-base" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider mt-6">
                  Поделиться
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}