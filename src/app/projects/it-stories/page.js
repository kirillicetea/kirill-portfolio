import Link from "next/link";
import FadeIn from "@/app/FadeIn";
import { supabase } from "@/app/lib/supabase";
import {
  FaRocket,
  FaGithub,
  FaBullseye,
  FaUsers,
  FaTags,
  FaCode,
  FaLightbulb,
  FaChartLine,
} from "react-icons/fa";

export const metadata = {
  title: "IT Transition Stories — кейс проекта",
  description:
    "Платформа реальных историй перехода в IT. Кейс: как я сделал продукт с нуля как PM, разработчик и дизайнер.",
};

export const revalidate = 60;

async function getStats() {
  const { data: stories, error } = await supabase
    .from("stories")
    .select("author_name, tags, from_role, to_role")
    .eq("status", "published");

  if (error || !stories) {
    return { stories: 0, authors: 0, tags: 0, transitions: 0 };
  }

  const uniqueAuthors = new Set(stories.map((s) => s.author_name)).size;
  const uniqueTags = new Set(stories.flatMap((s) => s.tags || [])).size;
  const uniqueTransitions = new Set(
    stories
      .filter((s) => s.from_role && s.to_role)
      .map((s) => `${s.from_role}→${s.to_role}`)
  ).size;

  return {
    stories: stories.length,
    authors: uniqueAuthors,
    tags: uniqueTags,
    transitions: uniqueTransitions,
  };
}

export default async function ItStoriesCasePage() {
  const stats = await getStats();

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
              Живой проект · MVP запущен
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text font-[family-name:var(--font-space-grotesk)]">
            IT Transition Stories
          </h1>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
            Платформа реальных историй перехода в IT. Люди делятся опытом,
            читают чужие пути и видят карту переходов — от учителя к Python-разработчику,
            от бухгалтера к аналитику.
          </p>

          {/* Кнопки */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/projects/it-stories/app"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 inline-flex items-center gap-2"
            >
              <FaRocket />
              Открыть приложение
            </Link>
            <a
              href="https://github.com/kirillicetea/kirill-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 glass rounded-lg font-semibold hover:border-blue-500 transition-all inline-flex items-center gap-2"
            >
              <FaGithub />
              GitHub
            </a>
          </div>
        </FadeIn>

        {/* Метрики */}
        <FadeIn delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold gradient-text mb-2">
                {stats.stories}
              </div>
              <div className="text-xs text-slate-400">историй</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold gradient-text mb-2">
                {stats.authors}
              </div>
              <div className="text-xs text-slate-400">авторов</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold gradient-text mb-2">
                {stats.tags}
              </div>
              <div className="text-xs text-slate-400">тегов</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold gradient-text mb-2">
                {stats.transitions}
              </div>
              <div className="text-xs text-slate-400">переходов</div>
            </div>
          </div>
        </FadeIn>

        {/* Секции */}
        <div className="space-y-16">
          {/* Проблема */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />
              <FaBullseye className="text-blue-400 text-2xl" />
              Проблема
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Тысячи людей хотят войти в IT, но не знают, с чего начать. Им
              нужны реальные истории — не маркетинговые обещания, а опыт таких
              же людей. Сейчас эти истории разбросаны по YouTube, Telegram,
              VC.ru и Habr. Единой площадки с картой переходов нет.
            </p>
          </section>

          {/* Решение */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />
              <FaLightbulb className="text-blue-400 text-2xl" />
              Решение
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              IT Transition Stories — платформа, где каждый может поделиться
              своим путём в IT и найти поддержку. Главная особенность —
              <strong className="text-white"> визуальная карта переходов</strong>:
              пользователь видит не просто список историй, а граф «откуда → куда»,
              где каждая стрелка — реальный путь человека.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Карта переходов", "UGC-платформа", "Модерация", "Neo-Tokyo дизайн", "Транслит slug"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Моя роль */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />
              <FaUsers className="text-blue-400 text-2xl" />
              Моя роль
            </h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▸</span>
                <span>
                  <strong className="text-white">Product Manager</strong> —
                  видение, приоритеты, roadmap, метрики
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▸</span>
                <span>
                  <strong className="text-white">Разработчик</strong> —
                  Next.js 16, React 19, Supabase, React Flow
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▸</span>
                <span>
                  <strong className="text-white">Дизайнер</strong> —
                  Neo-Tokyo дизайн-система с нуля, UI/UX, анимации
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▸</span>
                <span>
                  <strong className="text-white">Модератор</strong> — проверяю
                  и публикую истории, работаю с RLS-политиками
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▸</span>
                <span>
                  <strong className="text-white">Автор первой истории</strong> —
                  сам прошёл путь менеджер → PM
                </span>
              </li>
            </ul>
          </section>

          {/* Что реализовано */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />
              <FaCode className="text-blue-400 text-2xl" />
              Что реализовано
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass rounded-2xl p-5">
                <h3 className="text-base font-bold text-white mb-2">
                  🗺 Карта переходов
                </h3>
                <p className="text-sm text-slate-400">
                  Визуальный граф на React Flow. Узлы — профессии, стрелки —
                  переходы. Клик на узел — фильтр историй.
                </p>
              </div>
              <div className="glass rounded-2xl p-5">
                <h3 className="text-base font-bold text-white mb-2">
                  📝 Форма подачи
                </h3>
                <p className="text-sm text-slate-400">
                  Пользователи отправляют истории. Валидация, транслитерация slug,
                  автосохранение в Supabase.
                </p>
              </div>
              <div className="glass rounded-2xl p-5">
                <h3 className="text-base font-bold text-white mb-2">
                  🔒 Админ-панель
                </h3>
                <p className="text-sm text-slate-400">
                  Модерация: одобрить/отклонить. Фильтры по статусу. Защита
                  паролем через переменные окружения.
                </p>
              </div>
              <div className="glass rounded-2xl p-5">
                <h3 className="text-base font-bold text-white mb-2">
                  🏷 Теги и авторы
                </h3>
                <p className="text-sm text-slate-400">
                  Отдельные страницы со списками. Счётчики историй, аватары с
                  инициалами, ссылки на соцсети.
                </p>
              </div>
            </div>
          </section>

          {/* Чему научился */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />
              <FaChartLine className="text-blue-400 text-2xl" />
              Чему научился
            </h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▸</span>
                <span>
                  <strong className="text-white">Архитектура:</strong> разделил
                  портфолио и приложение через отдельные layout и AppShell с
                  usePathname
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▸</span>
                <span>
                  <strong className="text-white">Данные:</strong> настроил RLS-политики,
                  научился работать с Supabase на клиенте и сервере
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▸</span>
                <span>
                  <strong className="text-white">React Flow:</strong> разобрался
                  с handle, useNodesState, useEffect для синхронизации узлов
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▸</span>
                <span>
                  <strong className="text-white">UX:</strong> понял разницу между
                  лендингом и приложением — sidebar, плотность, фокус на контенте
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">▸</span>
                <span>
                  <strong className="text-white">Продукт:</strong> сделал UGC-платформу
                  с модерацией — не блог, а двустороннее движение
                </span>
              </li>
            </ul>
          </section>

          {/* Roadmap */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />
              Roadmap
            </h2>
            <div className="space-y-3">
              <div className="glass rounded-2xl p-4 flex items-start gap-3">
                <span className="text-green-400 text-lg">✓</span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    MVP: карта, лента, форма, админка
                  </div>
                  <div className="text-xs text-slate-400">Сделано</div>
                </div>
              </div>
              <div className="glass rounded-2xl p-4 flex items-start gap-3">
                <span className="text-green-400 text-lg">✓</span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Neo-Tokyo дизайн + правая панель
                  </div>
                  <div className="text-xs text-slate-400">Сделано</div>
                </div>
              </div>
              <div className="glass rounded-2xl p-4 flex items-start gap-3">
                <span className="text-yellow-400 text-lg">◐</span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Поиск по историям + фильтры по тегам
                  </div>
                  <div className="text-xs text-slate-400">В планах</div>
                </div>
              </div>
              <div className="glass rounded-2xl p-4 flex items-start gap-3">
                <span className="text-slate-500 text-lg">○</span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Комментарии и лайки
                  </div>
                  <div className="text-xs text-slate-400">Будущее</div>
                </div>
              </div>
              <div className="glass rounded-2xl p-4 flex items-start gap-3">
                <span className="text-slate-500 text-lg">○</span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Авторизация авторов через email
                  </div>
                  <div className="text-xs text-slate-400">Будущее</div>
                </div>
              </div>
            </div>
          </section>

          {/* Технологии */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />
              Технологии
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Next.js 16",
                "React 19",
                "Tailwind CSS 4",
                "Supabase",
                "React Flow",
                "Framer Motion",
                "PostgreSQL",
                "RLS",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* CTA */}
        <FadeIn>
          <div className="mt-20 glass rounded-2xl p-8 text-center border border-blue-500/30">
            <p className="text-slate-300 mb-4 text-lg">
              Хочешь увидеть продукт в действии?
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/projects/it-stories/app"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
              >
                <FaRocket />
                Открыть приложение
              </Link>
              <Link
                href="/#contact"
                className="px-6 py-3 glass rounded-lg font-semibold transition-all hover:border-blue-500"
              >
                Связаться со мной
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}