"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { FaPaperPlane, FaCheck, FaTimes } from "react-icons/fa";

export default function CommentsSection({ storyId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    author_name: "",
    content: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  // Загружаем комментарии
  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("story_id", storyId)
        .eq("status", "published")
        .order("created_at", { ascending: true });

      if (!error && data) {
        setComments(data);
      }
      setLoading(false);
    }
    load();
  }, [storyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const { error } = await supabase.from("comments").insert({
      story_id: storyId,
      author_name: formData.author_name.trim(),
      content: formData.content.trim(),
      status: "pending",
    });

    if (error) {
      setStatus("error");
      setError(error.message);
      return;
    }

    setStatus("success");
    setFormData({ author_name: "", content: "" });
  };

  return (
    <div className="mt-12">
      {/* Заголовок */}
      <h2 className="text-2xl font-bold text-[#f5f3ff] mb-6 flex items-center gap-3">
        <span className="w-1 h-6 bg-gradient-to-b from-[#a855f7] to-[#ec4899] rounded-full" />
        Комментарии ({comments.length})
      </h2>

      {/* Список комментариев */}
      {loading ? (
        <p className="text-[#7c6f9e] text-sm">Загрузка...</p>
      ) : comments.length === 0 ? (
        <div className="app-card p-6 text-center border-dashed mb-6">
          <p className="text-[#7c6f9e] text-sm">
            Пока нет комментариев. Будь первым!
          </p>
        </div>
      ) : (
        <div className="space-y-3 mb-8">
          {comments.map((comment) => (
            <div key={comment.id} className="app-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center text-white font-bold text-xs">
                  {comment.author_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#f5f3ff]">
                    {comment.author_name}
                  </div>
                  <div className="text-xs text-[#7c6f9e] font-mono">
                    {new Date(comment.created_at).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#a78bfa] leading-relaxed whitespace-pre-line">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Форма */}
      {status === "success" ? (
        <div className="app-card p-6 border-2 border-[#a855f7]/40">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center flex-shrink-0">
              <FaCheck className="text-white text-sm" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-[#f5f3ff] mb-1">
                Спасибо!
              </h3>
              <p className="text-sm text-[#a78bfa] mb-3">
                Твой комментарий отправлен на модерацию. После одобрения он
                появится здесь.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-xs text-[#a855f7] hover:text-[#ec4899] transition-colors"
              >
                Написать ещё
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="app-card p-5 md:p-6 space-y-4"
        >
          <h3 className="text-base font-bold text-[#f5f3ff] mb-2">
            Оставить комментарий
          </h3>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7c6f9e] font-mono mb-2">
              Имя *
            </label>
            <input
              type="text"
              value={formData.author_name}
              onChange={(e) =>
                setFormData({ ...formData, author_name: e.target.value })
              }
              required
              placeholder="Как тебя зовут?"
              className="w-full px-3 py-2 bg-[#1a0f30]/60 border border-[#a855f7]/20 rounded-lg text-[#f5f3ff] placeholder-[#7c6f9e] focus:border-[#a855f7] focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7c6f9e] font-mono mb-2">
              Комментарий *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
              rows="4"
              placeholder="Что думаешь об этой истории?"
              className="w-full px-3 py-2 bg-[#1a0f30]/60 border border-[#a855f7]/20 rounded-lg text-[#f5f3ff] placeholder-[#7c6f9e] focus:border-[#a855f7] focus:outline-none text-sm resize-none"
            />
          </div>

          {status === "error" && (
            <div className="app-card p-3 border-red-500/40">
              <p className="text-red-400 text-xs">Ошибка: {error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="app-btn-primary text-sm disabled:opacity-50"
          >
            <FaPaperPlane className="text-xs" />
            {status === "loading" ? "Отправляю..." : "Отправить"}
          </button>

          <p className="text-xs text-[#7c6f9e]">
            Комментарии проходят модерацию — появятся после одобрения.
          </p>
        </form>
      )}
    </div>
  );
}