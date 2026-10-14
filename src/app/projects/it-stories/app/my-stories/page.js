"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { FaArrowRight, FaEnvelope, FaTimes, FaPlus } from "react-icons/fa";

export default function MyStoriesPage() {
  const [email, setEmail] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("author_email");
    if (savedEmail) {
      setEmail(savedEmail);
      loadStories(savedEmail);
    }
  }, []);

  const loadStories = async (userEmail) => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("stories")
      .select("*")
      .eq("author_email", userEmail)
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setStories(data || []);
    }
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const trimmed = inputEmail.trim().toLowerCase();

    if (!trimmed || !trimmed.includes("@")) {
      setError("Введи корректный email");
      return;
    }

    localStorage.setItem("author_email", trimmed);
    setEmail(trimmed);
    setInputEmail("");
    loadStories(trimmed);
  };

  const handleLogout = () => {
    localStorage.removeItem("author_email");
    setEmail("");
    setStories([]);
  };

  if (!email) {
    return (
      <div className="max-w-md mx-auto mt-12">
        <div className="app-card p-8 text-center">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#a855f7]/40">
            <FaEnvelope className="text-xl text-white" />
          </div>

          <h1 className="text-2xl font-bold mb-2 app-gradient-text">
            Мои истории
          </h1>
          <p className="text-[#a78bfa] text-sm mb-6">
            Введи email, который использовал при подаче истории
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              placeholder="email@example.com"
              autoFocus
              className="w-full px-4 py-3 bg-[#1a0f30]/60 border border-[#a855f7]/20 rounded-lg text-[#f5f3ff] placeholder-[#7c6f9e] focus:border-[#a855f7] focus:outline-none text-sm"
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button
              type="submit"
              className="app-btn-primary w-full justify-center"
            >
              Показать мои истории
            </button>
          </form>

          <p className="text-xs text-[#7c6f9e] mt-6 leading-relaxed">
            Никаких паролей — мы просто покажем истории, отправленные с этого
            email. Данные хранятся только в твоём браузере.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-1 app-gradient-text">
            Мои истории
          </h1>
          <p className="text-[#a78bfa] text-sm">
            <span className="text-[#7c6f9e]">Email:</span>{" "}
            <span className="font-mono">{email}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/projects/it-stories/app/share"
            className="app-btn-primary text-sm"
          >
            <FaPlus className="text-xs" />
            Подать историю
          </Link>
          <button
            onClick={handleLogout}
            className="app-btn-secondary text-sm"
            title="Выйти"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12 text-[#7c6f9e]">Загрузка...</div>
      )}

      {!loading && stories.length === 0 && (
        <div className="app-card p-12 text-center border-dashed">
          <p className="text-[#7c6f9e] mb-4">
            С этого email ещё не было историй
          </p>
          <Link
            href="/projects/it-stories/app/share"
            className="app-btn-primary inline-flex"
          >
            <FaPlus className="text-xs" />
            Стать первым
          </Link>
        </div>
      )}

      {!loading && stories.length > 0 && (
        <div className="space-y-3">
          {stories.map((story) => {
            const statusConfig = {
              published: { label: "Опубликовано", color: "green" },
              pending: { label: "На модерации", color: "yellow" },
              rejected: { label: "Отклонено", color: "red" },
            };
            const status = statusConfig[story.status] || statusConfig.pending;

            return (
              <div key={story.id} className="app-card p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-[#f5f3ff] flex-1">
                    {story.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded font-mono whitespace-nowrap ${
                      status.color === "green"
                        ? "bg-green-500/10 border border-green-500/30 text-green-400"
                        : status.color === "yellow"
                        ? "bg-yellow-500/10 border border-yellow-500/30 text-yellow-400"
                        : "bg-red-500/10 border border-red-500/30 text-red-400"
                    }`}
                  >
                    {status.label}
                  </span>
                </div>

                {story.from_role && story.to_role && (
                  <p className="text-xs text-[#7c6f9e] font-mono mb-3">
                    {story.from_role} → {story.to_role}
                  </p>
                )}

                <p className="text-sm text-[#a78bfa] leading-relaxed mb-4 line-clamp-2">
                  {story.content}
                </p>

                {story.status === "published" && (
                  <Link
                    href={`/projects/it-stories/app/${story.slug}`}
                    className="inline-flex items-center gap-1 text-[#a855f7] text-xs font-semibold hover:text-[#ec4899] transition-colors"
                  >
                    Читать <FaArrowRight className="text-[10px]" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}