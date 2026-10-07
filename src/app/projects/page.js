import Link from "next/link";
import ProjectCard from "../ProjectCard";

export const metadata = {
  title: "Мои проекты — Кирилл Мирончук",
  description: "Проекты, которые я создаю как PM и разработчик",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Навигация назад */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-8 text-sm"
        >
          ← На главную
        </Link>

        {/* Заголовок — БЕЗ FadeIn */}
        <div className="mb-4">
  <span className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full uppercase tracking-wider">
    <span className="relative flex h-1.5 w-1.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
    </span>
    Портфолио проектов
  </span>
</div>
<h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text font-[family-name:var(--font-space-grotesk)]">
  Мои проекты
</h1>

        <p className="text-lg text-slate-400 mb-16 max-w-2xl">
          Проекты, которые я создаю с нуля — как PM, разработчик и дизайнер
          в одном лице. Каждый проект решает реальную проблему.
        </p>

        {/* Сетка — БЕЗ FadeIn, карточки сразу видны */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard
            title="IT Transition Stories"
            description="Платформа реальных историй перехода в IT. Люди делятся опытом, читают чужие пути и находят поддержку. Проект в активной разработке."
            tags={["Next.js", "Supabase", "В разработке"]}
            href="/projects/it-stories"
            status="В разработке"
          />

          <div className="glass rounded-2xl overflow-hidden border-dashed border-2 border-white/10 min-h-[400px] flex flex-col">
  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-800/30 to-slate-900/30 flex items-center justify-center">
    <div className="text-6xl text-slate-700 group-hover:text-slate-500 transition-colors">+</div>
  </div>
  <div className="p-8 flex-1 flex items-center justify-center">
    <p className="text-slate-500 text-sm text-center">
      Здесь будет следующий проект
    </p>
  </div>
</div>
        </div>
      </div>
    </main>
  );
}
