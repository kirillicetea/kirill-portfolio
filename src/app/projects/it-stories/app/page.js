import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { FaRocket, FaArrowRight } from "react-icons/fa";

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

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/projects/it-stories"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-8 text-sm"
        >
          ← К описанию проекта
        </Link>

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
        <p className="text-lg text-slate-400 mb-12 max-w-2xl">
          Реальные опыты людей, которые сменили профессию. Без маркетинга и обещаний — только честные истории.
        </p>

        {error && (
          <div className="glass rounded-2xl p-6 border border-red-500/30 mb-8">
            <p className="text-red-400">Ошибка загрузки: {error.message}</p>
          </div>
        )}

        {!error && stories?.length === 0 && (
          <div className="glass rounded-2xl p-12 text-center border-dashed border-2 border-white/10">
            <FaRocket className="text-5xl text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Пока нет историй. Стань первым!</p>
          </div>
        )}

        {stories && stories.length > 0 && (
          <div className="grid gap-6">
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
      </div>
    </main>
  );
}