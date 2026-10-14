"use client";

import LikeButton from "../LikeButton";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight, FaSearch, FaTimes } from "react-icons/fa";

export default function FeedList({ stories, activeTag }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce — фильтруем через 300мс после последнего ввода
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  // Фильтрация
  const filtered = useMemo(() => {
    let result = stories;

    // Фильтр по тегу (если активен)
    if (activeTag) {
      result = result.filter((s) => (s.tags || []).includes(activeTag));
    }

    // Фильтр по поисковому запросу
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase().trim();
      result = result.filter((story) => {
        const inTitle = story.title?.toLowerCase().includes(q);
        const inContent = story.content?.toLowerCase().includes(q);
        const inAuthor = story.author_name?.toLowerCase().includes(q);
        const inTags = (story.tags || []).some((tag) =>
          tag.toLowerCase().includes(q)
        );
        const inFrom = story.from_role?.toLowerCase().includes(q);
        const inTo = story.to_role?.toLowerCase().includes(q);

        return inTitle || inContent || inAuthor || inTags || inFrom || inTo;
      });
    }

    return result;
  }, [stories, activeTag, debouncedQuery]);

  return (
    <>
      {/* Поиск */}
      <div className="mb-6 relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7c6f9e] text-sm" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по историям, авторам, тегам..."
          className="w-full pl-10 pr-10 py-2.5 bg-[#161b22] border border-[#a855f7]/20 rounded-lg text-[#f5f3ff] placeholder-[#7c6f9e] focus:border-[#a855f7] focus:outline-none transition-colors text-sm"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7c6f9e] hover:text-[#a855f7] transition-colors"
          >
            <FaTimes className="text-xs" />
          </button>
        )}
      </div>

      {/* Счётчик результатов */}
      {(debouncedQuery || activeTag) && (
        <div className="mb-4 text-xs text-[#7c6f9e] font-mono">
          Найдено: <span className="text-[#a855f7]">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "история" : "историй"}
          {activeTag && (
            <span>
              {" "}по тегу <span className="text-[#a855f7]">#{activeTag}</span>
            </span>
          )}
          {debouncedQuery && (
            <span>
              {" "}по запросу <span className="text-[#a855f7]">«{debouncedQuery}»</span>
            </span>
          )}
        </div>
      )}

      {/* Пусто */}
      {filtered.length === 0 && (
        <div className="app-card p-12 text-center border-dashed">
          <p className="text-[#7c6f9e]">
            {debouncedQuery
              ? `Ничего не найдено по запросу «${debouncedQuery}»`
              : activeTag
              ? `Нет историй с тегом #${activeTag}`
              : "Пока нет историй"}
          </p>
          {query && (
            <button
              onClick={() => setQuery("")}
              className="mt-4 text-sm text-[#a855f7] hover:text-[#ec4899] transition-colors"
            >
              Очистить поиск
            </button>
          )}
        </div>
      )}

      {/* Лента */}
      {filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((story) => (
            <Link
              key={story.id}
              href={`/projects/it-stories/app/${story.slug}`}
              className="app-card block p-5 md:p-6 group"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#f5f3ff] mb-2 group-hover:text-[#a855f7] transition-colors">
                {story.title}
              </h2>
              <p className="text-sm text-[#7c6f9e] mb-3">
                Автор: <span className="text-[#f5f3ff]">{story.author_name}</span>
              </p>
              <p className="text-[#a78bfa] leading-relaxed line-clamp-2 mb-3 text-sm">
                {story.content}
              </p>
              <div className="flex flex-wrap items-center gap-2">
  {story.tags?.map((tag) => (
    <span
      key={tag}
      className={`text-xs px-2 py-0.5 rounded font-mono transition-all ${
        tag === activeTag
          ? "bg-[#a855f7]/30 border border-[#a855f7] text-[#f5f3ff]"
          : "bg-[#a855f7]/10 border border-[#a855f7]/20 text-[#a78bfa]"
      }`}
    >
      #{tag}
    </span>
  ))}
  <div className="ml-auto flex items-center gap-2">
    <LikeButton
      storyId={story.id}
      initialLikes={story.likes || 0}
      size="sm"
    />
    <span className="inline-flex items-center gap-1 text-[#a855f7] text-xs font-semibold group-hover:gap-2 transition-all">
      Читать <FaArrowRight className="text-[10px]" />
    </span>
  </div>
</div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}