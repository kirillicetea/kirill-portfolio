import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { FaTimes } from "react-icons/fa";
import FeedList from "./FeedList";

export const metadata = {
  title: "Лента историй — IT Transition Stories",
  description: "Все истории перехода в IT",
};

export const revalidate = 60;

export default async function FeedPage({ searchParams }) {
  const params = await searchParams;
  const activeTag = params?.tag || null;

  const { data: stories, error } = await supabase
    .from("stories")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  // Собираем все уникальные теги
  const allTags = stories
    ? [...new Set(stories.flatMap((s) => s.tags || []))].sort()
    : [];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Заголовок */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#f5f3ff] mb-2">
          Лента историй
        </h1>
        <p className="text-[#a78bfa]">
          {activeTag
            ? `Истории по теме #${activeTag}`
            : "Все истории перехода в IT — от новых к старым"}
        </p>
      </div>

      {/* Фильтр по тегам */}
      {allTags.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-wider text-[#7c6f9e] font-mono">
              Теги
            </span>
            {activeTag && (
              <Link
                href="/projects/it-stories/app/feed"
                className="inline-flex items-center gap-1 text-xs text-[#ec4899] hover:text-[#a855f7] transition-colors"
              >
                <FaTimes className="text-[10px]" />
                сбросить
              </Link>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const isActive = tag === activeTag;
              return (
                <Link
                  key={tag}
                  href={
                    isActive
                      ? "/projects/it-stories/app/feed"
                      : `/projects/it-stories/app/feed?tag=${encodeURIComponent(tag)}`
                  }
                  className={`app-tag ${
                    isActive
                      ? "!bg-[#a855f7]/30 !border-[#a855f7] !text-[#f5f3ff]"
                      : ""
                  }`}
                >
                  #{tag}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Ошибка */}
      {error && (
        <div className="app-card p-6 border-red-500/30 mb-6">
          <p className="text-red-400 text-sm">Ошибка загрузки: {error.message}</p>
        </div>
      )}

      {/* Лента с поиском (клиентский компонент) */}
      {stories && <FeedList stories={stories} activeTag={activeTag} />}
    </div>
  );
}