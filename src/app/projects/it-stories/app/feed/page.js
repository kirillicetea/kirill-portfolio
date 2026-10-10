import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { FaArrowRight, FaSearch } from "react-icons/fa";

export const metadata = {
  title: "Лента историй — IT Transition Stories",
  description: "Все истории перехода в IT",
};

export const revalidate = 60;

export default async function FeedPage() {
  const { data: stories, error } = await supabase
    .from("stories")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#e6edf3] mb-2">
          Лента историй
        </h1>
        <p className="text-[#8b949e]">
          Все истории перехода в IT — от новых к старым
        </p>
      </div>

      {/* Поиск */}
      <div className="mb-6 relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e] text-sm" />
        <input
          type="text"
          placeholder="Поиск по историям (скоро)..."
          disabled
          className="w-full pl-10 pr-4 py-2.5 bg-[#161b22] border border-[#30363d] rounded-lg text-[#e6edf3] placeholder-[#8b949e] focus:border-blue-500 focus:outline-none opacity-60 cursor-not-allowed text-sm"
        />
      </div>

      {/* Ошибка */}
      {error && (
        <div className="app-card p-6 border-red-500/30 mb-6">
          <p className="text-red-400 text-sm">Ошибка загрузки: {error.message}</p>
        </div>
      )}

      {/* Пусто */}
      {!error && stories?.length === 0 && (
        <div className="app-card p-12 text-center border-dashed">
          <p className="text-[#8b949e]">Пока нет историй. Стань первым!</p>
        </div>
      )}

      {/* Лента */}
      {stories && stories.length > 0 && (
        <div className="space-y-3">
          {stories.map((story) => (
            <Link
              key={story.id}
              href={`/projects/it-stories/app/${story.slug}`}
              className="app-card block p-5 md:p-6 hover:border-blue-500 transition-all group"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#e6edf3] mb-2 group-hover:text-blue-400 transition-colors">
                {story.title}
              </h2>
              <p className="text-sm text-[#8b949e] mb-3">
                Автор: <span className="text-[#e6edf3]">{story.author_name}</span>
              </p>
              <p className="text-[#c9d1d9] leading-relaxed line-clamp-2 mb-3 text-sm">
                {story.content}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {story.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
                <span className="ml-auto inline-flex items-center gap-1 text-blue-400 text-xs font-semibold group-hover:gap-2 transition-all">
                  Читать <FaArrowRight className="text-[10px]" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}