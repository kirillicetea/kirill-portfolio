import "./app.css";
import Link from "next/link";
import { FaArrowLeft, FaBook, FaPen } from "react-icons/fa";

export const metadata = {
  title: "IT Transition Stories",
  description: "Реальные истории перехода в IT",
};

export default function AppLayout({ children }) {
  return (
    <div
  className="app-root min-h-screen bg-[#0a0a0f]"
  style={{ cursor: "auto" }}
>
      {/* App Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Логотип приложения */}
          <Link
            href="/projects/it-stories/app"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              IT
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-white leading-tight">
                IT Transition Stories
              </div>
              <div className="text-xs text-slate-500">
                Истории перехода в IT
              </div>
            </div>
          </Link>

          {/* Навигация */}
          <div className="flex items-center gap-3">
            <Link
              href="/projects/it-stories/app"
              className="text-sm text-slate-300 hover:text-blue-400 transition-colors hidden sm:flex items-center gap-2"
            >
              <FaBook className="text-xs" />
              Все истории
            </Link>
            <Link
              href="/projects/it-stories/app/share"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold text-white transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center gap-2"
            >
              <FaPen className="text-xs" />
              <span>Поделиться</span>
            </Link>
          </div>
        </div>

        {/* Кнопка «Вернуться на сайт» */}
        <div className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-2">
            <Link
              href="/projects/it-stories"
              className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-blue-400 transition-colors"
            >
              <FaArrowLeft className="text-[10px]" />
              Вернуться к описанию проекта
            </Link>
          </div>
        </div>
      </nav>

      {/* Контент */}
      <main className="pt-32 app-root" style={{ cursor: "auto" }}>
  {children}
</main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 mt-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-xs">Проект создан</span>
            <Link
              href="/"
              className="text-slate-300 hover:text-blue-400 transition-colors font-semibold"
            >
              Кириллом Мирончуком
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/projects/it-stories"
              className="hover:text-blue-400 transition-colors"
            >
              О проекте
            </Link>
            <Link
              href="/projects/it-stories/app"
              className="hover:text-blue-400 transition-colors"
            >
              Все истории
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}