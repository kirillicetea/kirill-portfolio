"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import {
  FaLock,
  FaCheck,
  FaTimes,
  FaEye,
  FaSignOutAlt,
  FaBook,
  FaComment,
} from "react-icons/fa";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stories, setStories] = useState([]);
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [tab, setTab] = useState("stories"); // "stories" | "comments"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
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

    if (error) setError(error.message);
    else setStories(data || []);
    setLoading(false);
  };

  const loadComments = async (status = "pending") => {
    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select("*, stories(title, slug)")
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error) setError(error.message);
    else setComments(data || []);
    setLoading(false);
  };

  const handleStoryApprove = async (id) => {
    const { error } = await supabase
      .from("stories")
      .update({ status: "published", published_at: new Date().toISOString() })
      .eq("id", id);
    if (!error) loadStories(filter);
    else setError(error.message);
  };

  const handleStoryReject = async (id) => {
    if (!confirm("Отклонить эту историю?")) return;
    const { error } = await supabase
      .from("stories")
      .update({ status: "rejected" })
      .eq("id", id);
    if (!error) loadStories(filter);
    else setError(error.message);
  };

  const handleCommentApprove = async (id) => {
    const { error } = await supabase
      .from("comments")
      .update({ status: "published" })
      .eq("id", id);
    if (!error) loadComments(filter);
    else setError(error.message);
  };

  const handleCommentReject = async (id) => {
    if (!confirm("Отклонить этот комментарий?")) return;
    const { error } = await supabase
      .from("comments")
      .update({ status: "rejected" })
      .eq("id", id);
    if (!error) loadComments(filter);
    else setError(error.message);
  };

  // Переключение вкладки
  const handleTabChange = (newTab) => {
    setTab(newTab);
    setFilter("pending");
    if (newTab === "stories") loadStories("pending");
    else loadComments("pending");
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    if (tab === "stories") loadStories(newFilter);
    else loadComments(newFilter);
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

  // Основная панель
  return (
    <div className="min-h-screen bg-[#0a0514] text-[#f5f3ff] px-6 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold app-gradient-text">
              Модерация
            </h1>
            <p className="text-[#a78bfa] text-sm mt-1">
              Истории и комментарии
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

        {/* Вкладки */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => handleTabChange("stories")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              tab === "stories"
                ? "bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-lg shadow-[#a855f7]/30"
                : "bg-[#1a0f30]/60 text-[#a78bfa] hover:text-[#f5f3ff] border border-[#a855f7]/20"
            }`}
          >
            <FaBook className="text-xs" />
            Истории
          </button>
          <button
            onClick={() => handleTabChange("comments")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              tab === "comments"
                ? "bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-lg shadow-[#a855f7]/30"
                : "bg-[#1a0f30]/60 text-[#a78bfa] hover:text-[#f5f3ff] border border-[#a855f7]/20"
            }`}
          >
            <FaComment className="text-xs" />
            Комментарии
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
              onClick={() => handleFilterChange(f.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === f.id
                  ? "bg-[#a855f7]/30 border border-[#a855f7] text-[#f5f3ff]"
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

        {/* ИСТОРИИ */}
        {!loading && tab === "stories" && (
          <>
            {stories.length === 0 ? (
              <div className="app-card p-12 text-center border-dashed">
                <p className="text-[#7c6f9e]">
                  {filter === "pending"
                    ? "Нет историй на модерации"
                    : "Нет историй в этой категории"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {stories.map((story) => (
                  <div key={story.id} className="app-card p-6">
                    <h3 className="text-lg font-bold text-[#f5f3ff] mb-1">
                      {story.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-xs text-[#7c6f9e] font-mono mb-3">
                      <span>Автор: {story.author_name}</span>
                      {story.from_role && story.to_role && (
                        <span>
                          {story.from_role} → {story.to_role}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#a78bfa] leading-relaxed mb-4 line-clamp-3">
                      {story.content}
                    </p>
                    {story.tags && story.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {story.tags.map((tag) => (
                          <span key={tag} className="app-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {filter === "pending" && (
                        <>
                          <button
                            onClick={() => handleStoryApprove(story.id)}
                            className="app-btn-primary text-sm"
                          >
                            <FaCheck />
                            Одобрить
                          </button>
                          <button
                            onClick={() => handleStoryReject(story.id)}
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
            )}
          </>
        )}

        {/* КОММЕНТАРИИ */}
        {!loading && tab === "comments" && (
          <>
            {comments.length === 0 ? (
              <div className="app-card p-12 text-center border-dashed">
                <p className="text-[#7c6f9e]">
                  {filter === "pending"
                    ? "Нет комментариев на модерации"
                    : "Нет комментариев в этой категории"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="app-card p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {comment.author_name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-[#f5f3ff]">
                          {comment.author_name}
                        </div>
                        {comment.stories && (
                          <div className="text-xs text-[#7c6f9e] font-mono mt-0.5">
                            к истории: «{comment.stories.title}»
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-[#a78bfa] leading-relaxed mb-4 whitespace-pre-line">
                      {comment.content}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {filter === "pending" && (
                        <>
                          <button
                            onClick={() => handleCommentApprove(comment.id)}
                            className="app-btn-primary text-sm"
                          >
                            <FaCheck />
                            Одобрить
                          </button>
                          <button
                            onClick={() => handleCommentReject(comment.id)}
                            className="app-btn-secondary text-sm text-red-400 hover:border-red-500/40"
                          >
                            <FaTimes />
                            Отклонить
                          </button>
                        </>
                      )}
                      {filter === "published" && comment.stories && (
                        <a
                          href={`/projects/it-stories/app/${comment.stories.slug}`}
                          target="_blank"
                          className="app-btn-secondary text-sm"
                        >
                          <FaEye />
                          К истории
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}