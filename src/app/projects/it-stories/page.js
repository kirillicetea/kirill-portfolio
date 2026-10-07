import Link from "next/link";
import FadeIn from "../../FadeIn";
import { FaRocket, FaGithub } from "react-icons/fa";

export const metadata = {
  title: "IT Transition Stories — кейс проекта",
  description: "Платформа реальных историй перехода в IT. Роль PM, этапы, результаты.",
};

export default function ItStoriesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Навигация */}
        <FadeIn>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-8 text-sm"
          >
            ← Все проекты
          </Link>
        </FadeIn>

        {/* Hero */}
        <FadeIn>
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/30 px-3 py-1.5 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              В разработке
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text font-[family-name:var(--font-space-grotesk)]">
            IT Transition Stories
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Платформа реальных историй перехода в IT. Люди делятся опытом,
            читают чужие пути и находят поддержку.
          </p>
        </FadeIn>

        {/* Кнопки */}
        <FadeIn delay={0.15}>
          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              href="/projects/it-stories/app"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 inline-flex items-center gap-2"
            >
              <FaRocket className="text-base" />
              Открыть проект
            </Link>
            <a
              href="https://github.com/kirillicetea/kirill-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 glass rounded-lg font-semibold hover:border-blue-500 transition-all inline-flex items-center gap-2"
            >
              <FaGithub className="text-base" />
              GitHub
            </a>
          </div>
        </FadeIn>

        {/* Секции — единый стиль с полосками */}
        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />
              Проблема
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Тысячи людей хотят войти в IT, но не знают, с чего начать.
              Им нужны реальные истории — не маркетинговые обещания,
              а опыт таких же людей. Сейчас эти истории разбросаны
              по YouTube, Telegram, VC.ru и Habr. Единой площадки нет.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 text-white flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />
              Цель проекта
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Создать площадку, где каждый может поделиться своим путём
              в IT и найти поддержку. Показать, что переход в IT —
              это реально, и помочь людям сделать первый шаг.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 text-white flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />
              Моя роль
            </h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▸</span>
                <span><strong className="text-white">Product Manager</strong> — видение, приоритеты, roadmap</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▸</span>
                <span><strong className="text-white">Разработчик</strong> — Next.js + Supabase</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▸</span>
                <span><strong className="text-white">Дизайнер</strong> — UI/UX</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▸</span>
                <span><strong className="text-white">Модератор</strong> — проверяю и публикую истории</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 text-white flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />
              Этапы работы
            </h2>
            <ol className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Исследование и PM-документ</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Дизайн и структура БД</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Разработка MVP (лента, форма, админка)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Наполнение контентом и запуск</span>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 text-white flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />
              Технологии
            </h2>
            <div className="flex flex-wrap gap-2">
              {["Next.js 16", "React 19", "Tailwind CSS 4", "Supabase", "Framer Motion"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 text-white flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />
              Метрики успеха
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold gradient-text mb-2">20+</div>
                <div className="text-sm text-slate-400">историй опубликовано</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold gradient-text mb-2">500+</div>
                <div className="text-sm text-slate-400">посетителей в месяц</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold gradient-text mb-2">10+</div>
                <div className="text-sm text-slate-400">отзывов от авторов</div>
              </div>
            </div>
          </section>
        </div>

        {/* Финальный CTA */}
        <div className="mt-20 glass rounded-2xl p-8 text-center border border-blue-500/30">
          <p className="text-slate-300 mb-4">
            Хочешь узнать больше о проекте или предложить идею?
          </p>
          <Link
            href="/#contact"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-all"
          >
            Связаться со мной
          </Link>
        </div>
      </div>
    </main>
  );
}
