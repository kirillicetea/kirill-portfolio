import Link from "next/link";
import FadeIn from "../../../FadeIn";
import {
  FaRocket,
  FaBook,
  FaPen,
  FaUser,
  FaTelegramPlane,
} from "react-icons/fa";

export const metadata = {
  title: "IT Transition Stories — приложение",
  description: "Платформа историй перехода в IT",
};

export default function AppPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <Link
            href="/projects/it-stories"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-8 text-sm"
          >
            ← К описанию проекта
          </Link>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="text-center py-24">
            <FaRocket className="text-7xl mb-6 mx-auto text-blue-400/60" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text font-[family-name:var(--font-space-grotesk)]">
              Проект в разработке
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12">
              Здесь будет сама платформа IT Transition Stories — лента историй,
              форма для авторов и профили. Работаю над этим прямо сейчас!
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-6 text-center">
              <FaBook className="text-3xl mb-3 mx-auto text-blue-400" />
              <p className="text-sm text-slate-300">Лента историй</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <FaPen className="text-3xl mb-3 mx-auto text-blue-400" />
              <p className="text-sm text-slate-300">Форма «Поделиться»</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <FaUser className="text-3xl mb-3 mx-auto text-blue-400" />
              <p className="text-sm text-slate-300">Профили авторов</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="text-center mt-16">
            <p className="text-slate-500 text-sm mb-4">
              Следи за обновлениями в моём Telegram
            </p>
            <a
              href="https://t.me/kirill_icetea"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-all"
            >
              <FaTelegramPlane className="text-base" />
              Подписаться
            </a>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
