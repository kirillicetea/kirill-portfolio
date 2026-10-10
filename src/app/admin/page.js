"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import {
  FaLock,
  FaCheck,
  FaTimes,
  FaEye,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stories, setStories] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Проверка пароля (простая, через .env.local)
  const handleLogin = (e) => {
    e.preventDefault();
    // В продакшене это должно быть на сервере, но для MVP — ок
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      loadStories("pending");
    } else {
      setError("Неверный пароль");
    }
  };

  const loadStories = async (status = "pending") => {
    setLoading(true);
    const { data, error } = await supabase
      .from("stories")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setStories(data || []);
    }
    setLoading(false);
  };

  const handleApprove = async (id) => {
    const { error } = await supabase
      .from("stories")
      .update({
        status: "published",
        published_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (!error) {
      loadStories(filter);
    } else {
      setError(error.message);
    }
  };

  const handleReject = async (id) => {
    if (!confirm("Отклонить эту историю?")) return;

    const { error } = await supabase
      .from("stories")
      .update({ status: "rejected" })
      .eq("id", id);

    if (!error) {
      loadStories(filter);
    } else {
      setError(error.message);
    }
  };

  // Экран логина
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0514] text-[#f5f3ff] flex items-center justify-center px-6">
        <div className="app-card p-8 w-full max-w-md">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#a855f7]/40">
            <FaLock className="text-xl text-white" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-6 app-gradient-text">
            Админ-панель
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full px-4 py-3 bg-[#1a0f30]/60 border border-[#a855f7]/20 rounded-lg text-[#f5f3ff] placeholder-[#7c6f9e] focus:border-[#a855f7] focus:outline-none"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" className="app-btn-primary w-full justify-center">
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Панель модерации
  return (
    <div className="min-h-screen bg-[#0a0514] text-[#f5f3ff] px-6 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold app-gradient-text">
              Модерация историй
            </h1>
            <p className="text-[#a78bfa] text-sm mt-1">
              Одобряй или отклоняй новые истории
            </p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="app-btn-secondary text-sm"
          >
            <FaSignOutAlt />
            Выйти
          </button>
        </div>

        {/* Фильтры */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "pending", label: "На модерации" },
            { id: "published", label: "Опубликованные" },
            { id: "rejected", label: "Отклонённые" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setFilter(f.id);
                loadStories(f.id);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === f.id
                  ? "bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-lg shadow-[#a855f7]/30"
                  : "bg-[#1a0f30]/60 text-[#a78bfa] hover:text-[#f5f3ff] border border-[#a855f7]/20"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Ошибка */}
        {error && (
          <div className="app-card p-4 border-red-500/40 mb-6">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Загрузка */}
        {loading && (
          <div className="text-center py-12 text-[#7c6f9e]">Загрузка...</div>
        )}

        {/* Пусто */}
        {!loading && stories.length === 0 && (
          <div className="app-card p-12 text-center border-dashed">
            <p className="text-[#7c6f9e]">
              {filter === "pending"
                ? "Нет историй на модерации"
                : "Нет историй в этой категории"}
            </p>
          </div>
        )}

        {/* Список историй */}
        <div className="space-y-4">
          {stories.map((story) => (
            <div key={story.id} className="app-card p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-[#f5f3ff] mb-1">
                    {story.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-xs text-[#7c6f9e] font-mono">
                    <span>Автор: {story.author_name}</span>
                    {story.from_role && story.to_role && (
                      <span>
                        {story.from_role} → {story.to_role}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Превью контента */}
              <p className="text-sm text-[#a78bfa] leading-relaxed mb-4 line-clamp-3">
                {story.content}
              </p>

              {/* Теги */}
              {story.tags && story.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {story.tags.map((tag) => (
                    <span key={tag} className="app-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Кнопки */}
              <div className="flex flex-wrap gap-2">
                {filter === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(story.id)}
                      className="app-btn-primary text-sm"
                    >
                      <FaCheck />
                      Одобрить
                    </button>
                    <button
                      onClick={() => handleReject(story.id)}
                      className="app-btn-secondary text-sm text-red-400 hover:border-red-500/40"
                    >
                      <FaTimes />
                      Отклонить
                    </button>
                  </>
                )}
                {filter === "published" && (
                  <a
                    href={`/projects/it-stories/app/${story.slug}`}
                    target="_blank"
                    className="app-btn-secondary text-sm"
                  >
                    <FaEye />
                    Посмотреть
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}