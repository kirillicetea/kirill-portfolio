"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import TransitionMap from "./TransitionMap";
import { FaPen, FaArrowRight } from "react-icons/fa";

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

  const filteredStories = selectedRole
    ? stories.filter(
        (s) => s.from_role === selectedRole || s.to_role === selectedRole
      )
    : [];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero */}
      <div className="mb-8">
        <div className="mb-3">
          <span className="app-badge app-badge-pulse">MVP запущен</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3 app-gradient-text">
          Карта переходов в IT
        </h1>
        <p className="text-[#a78bfa] max-w-2xl">
          Каждая стрелка — реальный путь человека из одной профессии в другую.
          Кликни на узел, чтобы прочитать истории.
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="app-card p-4">
          <div className="app-stat-value">{stories.length}</div>
          <div className="app-stat-label">историй</div>
        </div>
        <div className="app-card p-4">
          <div className="app-stat-value">
            {new Set(stories.flatMap((s) => s.tags || [])).size}
          </div>
          <div className="app-stat-label">тегов</div>
        </div>
        <div className="app-card p-4">
          <div className="app-stat-value">
            {new Set(stories.map((s) => s.author_name)).size}
          </div>
          <div className="app-stat-label">авторов</div>
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
            <h2 className="text-lg font-bold text-[#f5f3ff]">
              Истории с ролью:{" "}
              <span className="app-gradient-text">{selectedRole}</span>
            </h2>
            <button
              onClick={() => setSelectedRole(null)}
              className="text-xs text-[#7c6f9e] hover:text-[#a855f7] transition-colors"
            >
              Сбросить ✕
            </button>
          </div>

          {filteredStories.length === 0 ? (
            <div className="app-card p-6 text-center">
              <p className="text-[#7c6f9e] text-sm">
                Пока нет историй с этой ролью
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredStories.map((story) => (
                <Link
                  key={story.id}
                  href={`/projects/it-stories/app/${story.slug}`}
                  className="app-card block p-5 group"
                >
                  <h3 className="text-base font-bold text-[#f5f3ff] mb-2 group-hover:text-[#a855f7] transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs text-[#7c6f9e] mb-2 font-mono">
                    {story.from_role} → {story.to_role}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[#a855f7] text-xs font-semibold">
                    Читать <FaArrowRight className="text-[10px]" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="app-card p-8 text-center mt-8 border-dashed border-2 border-[#a855f7]/30">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#a855f7]/40">
          <FaPen className="text-xl text-white" />
        </div>
        <h3 className="text-xl font-bold text-[#f5f3ff] mb-2">
          Поделись своей историей
        </h3>
        <p className="text-[#a78bfa] text-sm mb-6 max-w-md mx-auto">
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