import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { FaRocket, FaArrowRight, FaPen, FaSearch } from "react-icons/fa";

export const metadata = {
  title: "IT Transition Stories — истории перехода в IT",
  description: "Реальные опыты людей, которые сменили профессию и вошли в IT",
};

export const revalidate = 60;

export default async function StoriesAppPage() {
  const { data: stories, error } = await supabase
    .from("stories")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const totalTags = stories
    ? [...new Set(stories.flatMap((s) => s.tags || []))].length
    : 0;
  const totalAuthors = stories
    ? [...new Set(stories.map((s) => s.author_name))].length
    : 0;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/30 px-3 py-1.5 rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            MVP запущен
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text font-[family-name:var(--font-space-grotesk)]">
          Истории перехода в IT
        </h1>
        <p className="text-lg text-slate-400 mb-8 max-w-2xl">
          Реальные опыты людей, которые сменили профессию. Без маркетинга и обещаний — только честные истории.
        </p>

        {/* Статистика */}
        <div className="flex flex-wrap gap-6 mb-8 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold gradient-text">{stories?.length || 0}</span>
            <span className="text-slate-400">историй</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold gradient-text">{totalAuthors}</span>
            <span className="text-slate-400">авторов</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold gradient-text">{totalTags}</span>
            <span className="text-slate-400">тегов</span>
          </div>
        </div>

        {/* Поиск */}
        <div className="mb-8 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
          <input
            type="text"
            placeholder="Поиск по историям (скоро)..."
            disabled
            className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none opacity-60 cursor-not-allowed"
          />
        </div>

        {/* Ошибка */}
        {error && (
          <div className="glass rounded-2xl p-6 border border-red-500/30 mb-8">
            <p className="text-red-400">Ошибка загрузки: {error.message}</p>
          </div>
        )}

        {/* Лента */}
        {stories && stories.length > 0 && (
          <div className="grid gap-6 mb-8">
            {stories.map((story) => (
              <Link
                key={story.id}
                href={`/projects/it-stories/app/${story.slug}`}
                className="glass rounded-2xl p-6 md:p-8 hover:border-blue-500 transition-all block group"
              >
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {story.title}
                </h2>
                <p className="text-sm text-slate-400 mb-4">
                  Автор: <span className="text-slate-300">{story.author_name}</span>
                </p>
                <p className="text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {story.content}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {story.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto inline-flex items-center gap-2 text-blue-400 text-sm font-semibold group-hover:gap-3 transition-all">
                    Читать <FaArrowRight className="text-xs" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="glass rounded-2xl p-8 md:p-12 text-center border-2 border-dashed border-blue-500/30">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
            <FaPen className="text-2xl text-white" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Поделись своей историей
          </h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Твой опыт может помочь тысячам людей сделать первый шаг в IT
          </p>
          <Link
            href="/projects/it-stories/app/share"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-lg font-semibold text-white transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
          >
            <FaPen />
            Написать историю
          </Link>
        </div>
      </div>
    </main>
  );
}