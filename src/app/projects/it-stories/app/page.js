"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import TransitionMap from "./TransitionMap";
import { FaCompass, FaPen, FaArrowRight } from "react-icons/fa";

export default function AppHome() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("stories")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (!error && data) {
        setStories(data);
      }
      setLoading(false);
    }
    load();
  }, []);

  // Истории, связанные с выбранной ролью
  const filteredStories = selectedRole
    ? stories.filter(
        (s) =>
          s.from_role === selectedRole ||
          s.to_role === selectedRole
      )
    : [];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero */}
      <div className="mb-8">
        <div className="mb-3">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            MVP запущен
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#e6edf3] mb-3">
          Карта переходов в IT
        </h1>
        <p className="text-[#8b949e] max-w-2xl">
          Каждая стрелка — реальный путь человека из одной профессии в другую.
          Кликни на узел, чтобы прочитать истории.
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="app-card p-4">
          <div className="text-2xl font-bold text-[#e6edf3]">
            {stories.length}
          </div>
          <div className="text-xs text-[#8b949e] mt-1">историй</div>
        </div>
        <div className="app-card p-4">
          <div className="text-2xl font-bold text-[#e6edf3]">
            {new Set(stories.flatMap((s) => s.tags || [])).size}
          </div>
          <div className="text-xs text-[#8b949e] mt-1">тегов</div>
        </div>
        <div className="app-card p-4">
          <div className="text-2xl font-bold text-[#e6edf3]">
            {new Set(stories.map((s) => s.author_name)).size}
          </div>
          <div className="text-xs text-[#8b949e] mt-1">авторов</div>
        </div>
      </div>

      {/* Карта */}
      {!loading && (
  <TransitionMap
    stories={stories}
    selectedRole={selectedRole}
    onNodeClick={(role) =>
      setSelectedRole(selectedRole === role ? null : role)
    }
  />
)}

      {/* Истории по выбранной роли */}
      {selectedRole && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#e6edf3]">
              Истории с ролью:{" "}
              <span className="text-blue-400">{selectedRole}</span>
            </h2>
            <button
              onClick={() => setSelectedRole(null)}
              className="text-xs text-[#8b949e] hover:text-[#e6edf3] transition-colors"
            >
              Сбросить ✕
            </button>
          </div>

          {filteredStories.length === 0 ? (
            <div className="app-card p-6 text-center">
              <p className="text-[#8b949e] text-sm">
                Пока нет историй с этой ролью
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredStories.map((story) => (
                <Link
                  key={story.id}
                  href={`/projects/it-stories/app/${story.slug}`}
                  className="app-card block p-5 hover:border-blue-500 transition-all group"
                >
                  <h3 className="text-base font-bold text-[#e6edf3] mb-2 group-hover:text-blue-400 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs text-[#8b949e] mb-2">
                    {story.from_role} → {story.to_role}
                  </p>
                  <span className="inline-flex items-center gap-1 text-blue-400 text-xs font-semibold">
                    Читать <FaArrowRight className="text-[10px]" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="app-card p-8 text-center mt-8 border-dashed border-2 border-blue-500/30">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
          <FaPen className="text-xl text-white" />
        </div>
        <h3 className="text-xl font-bold text-[#e6edf3] mb-2">
          Поделись своей историей
        </h3>
        <p className="text-[#8b949e] text-sm mb-6 max-w-md mx-auto">
          Твой путь может помочь тысячам людей сделать первый шаг в IT
        </p>
        <Link
          href="/projects/it-stories/app/share"
          className="app-btn-primary inline-flex"
        >
          <FaPen className="text-xs" />
          Написать историю
        </Link>
      </div>
    </div>
  );
}