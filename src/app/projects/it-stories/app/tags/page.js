import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { FaTags, FaArrowRight } from "react-icons/fa";

export const metadata = {
  title: "Теги — IT Transition Stories",
  description: "Все темы историй перехода в IT",
};

export const revalidate = 60;

export default async function TagsPage() {
  const { data: stories, error } = await supabase
    .from("stories")
    .select("tags")
    .eq("status", "published");

  // Считаем, сколько историй в каждом теге
  const tagCounts = {};
  stories?.forEach((story) => {
    (story.tags || []).forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <div className="mb-8">
        <div className="mb-3">
          <span className="app-badge">
            <FaTags className="text-xs" />
            Темы
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3 app-gradient-text">
          Все теги
        </h1>
        <p className="text-[#a78bfa] max-w-2xl">
          Найди истории по интересующей теме — от PM и карьеры до Python и дизайна
        </p>
      </div>

      {/* Теги */}
      {error && (
        <div className="app-card p-6 border-red-500/30">
          <p className="text-red-400 text-sm">Ошибка: {error.message}</p>
        </div>
      )}

      {sortedTags.length === 0 ? (
        <div className="app-card p-12 text-center border-dashed">
          <FaTags className="text-4xl text-[#7c6f9e] mx-auto mb-4" />
          <p className="text-[#7c6f9e]">Пока нет тегов</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sortedTags.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/projects/it-stories/app/feed?tag=${tag}`}
              className="app-card p-5 group flex items-center justify-between"
            >
              <div>
                <div className="text-base font-bold text-[#f5f3ff] group-hover:text-[#a855f7] transition-colors mb-1">
                  #{tag}
                </div>
                <div className="text-xs text-[#7c6f9e] font-mono">
                  {count} {count === 1 ? "история" : "историй"}
                </div>
              </div>
              <FaArrowRight className="text-[#a855f7] text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}