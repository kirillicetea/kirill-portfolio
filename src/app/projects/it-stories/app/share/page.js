"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { FaArrowLeft, FaCheck, FaPen } from "react-icons/fa";

// Транслитерация русских букв в латиницу
function translit(text) {
  return text
    .toLowerCase()
    .replace(/а/g, "a")
    .replace(/б/g, "b")
    .replace(/в/g, "v")
    .replace(/г/g, "g")
    .replace(/д/g, "d")
    .replace(/е/g, "e")
    .replace(/ё/g, "e")
    .replace(/ж/g, "zh")
    .replace(/з/g, "z")
    .replace(/и/g, "i")
    .replace(/й/g, "y")
    .replace(/к/g, "k")
    .replace(/л/g, "l")
    .replace(/м/g, "m")
    .replace(/н/g, "n")
    .replace(/о/g, "o")
    .replace(/п/g, "p")
    .replace(/р/g, "r")
    .replace(/с/g, "s")
    .replace(/т/g, "t")
    .replace(/у/g, "u")
    .replace(/ф/g, "f")
    .replace(/х/g, "h")
    .replace(/ц/g, "ts")
    .replace(/ч/g, "ch")
    .replace(/ш/g, "sh")
    .replace(/щ/g, "sch")
    .replace(/ъ/g, "")
    .replace(/ы/g, "y")
    .replace(/ь/g, "")
    .replace(/э/g, "e")
    .replace(/ю/g, "yu")
    .replace(/я/g, "ya")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

export default function SharePage() {
  const [formData, setFormData] = useState({
    author_name: "",
    author_email: "",
    author_social: "",
    title: "",
    from_role: "",
    to_role: "",
    content: "",
    tags: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    // Генерируем slug с транслитерацией + уникальный суффикс
    const slug =
      translit(formData.title) + "-" + Date.now().toString(36).slice(-4);

    // Парсим теги через запятую
    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const { error } = await supabase.from("stories").insert({
      author_name: formData.author_name.trim(),
      author_email: formData.author_email.trim() || null,
      author_social: formData.author_social.trim() || null,
      title: formData.title.trim(),
      from_role: formData.from_role.trim() || null,
      to_role: formData.to_role.trim() || null,
      content: formData.content.trim(),
      tags: tagsArray,
      slug,
      status: "pending",
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }

    setStatus("success");
    setFormData({
      author_name: "",
      author_email: "",
      author_social: "",
      title: "",
      from_role: "",
      to_role: "",
      content: "",
      tags: "",
    });
  };

  if (status === "success") {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#a855f7]/40">
          <FaCheck className="text-3xl text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 app-gradient-text">
          Спасибо!
        </h1>
        <p className="text-[#a78bfa] mb-8 max-w-md mx-auto">
          Твоя история отправлена на модерацию. После одобрения она появится в
          ленте и на карте переходов.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/projects/it-stories/app/feed" className="app-btn-primary">
            Все истории
          </Link>
          <button
            onClick={() => setStatus("idle")}
            className="app-btn-secondary"
          >
            Отправить ещё
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/projects/it-stories/app/feed"
        className="inline-flex items-center gap-2 text-[#7c6f9e] hover:text-[#a855f7] transition-colors mb-8 text-sm font-mono"
      >
        <FaArrowLeft className="text-xs" />
        все истории
      </Link>

      <div className="mb-8">
        <div className="mb-3">
          <span className="app-badge">
            <FaPen className="text-xs" />
            Поделиться
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3 app-gradient-text">
          Расскажи свою историю
        </h1>
        <p className="text-[#a78bfa]">
          Твой опыт перехода в IT может помочь тысячам людей. После модерации
          история появится в ленте и на карте переходов.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#7c6f9e] font-mono mb-2">
            Имя *
          </label>
          <input
            type="text"
            name="author_name"
            value={formData.author_name}
            onChange={handleChange}
            required
            placeholder="Как тебя зовут?"
            className="w-full px-4 py-3 bg-[#1a0f30]/60 border border-[#a855f7]/20 rounded-lg text-[#f5f3ff] placeholder-[#7c6f9e] focus:border-[#a855f7] focus:outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7c6f9e] font-mono mb-2">
              Email (не публикуется)
            </label>
            <input
              type="email"
              name="author_email"
              value={formData.author_email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="w-full px-4 py-3 bg-[#1a0f30]/60 border border-[#a855f7]/20 rounded-lg text-[#f5f3ff] placeholder-[#7c6f9e] focus:border-[#a855f7] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7c6f9e] font-mono mb-2">
              Telegram / соцсеть
            </label>
            <input
              type="url"
              name="author_social"
              value={formData.author_social}
              onChange={handleChange}
              placeholder="https://t.me/..."
              className="w-full px-4 py-3 bg-[#1a0f30]/60 border border-[#a855f7]/20 rounded-lg text-[#f5f3ff] placeholder-[#7c6f9e] focus:border-[#a855f7] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#7c6f9e] font-mono mb-2">
            Заголовок истории *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Как я перешёл из X в Y"
            className="w-full px-4 py-3 bg-[#1a0f30]/60 border border-[#a855f7]/20 rounded-lg text-[#f5f3ff] placeholder-[#7c6f9e] focus:border-[#a855f7] focus:outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7c6f9e] font-mono mb-2">
              Откуда (было) *
            </label>
            <input
              type="text"
              name="from_role"
              value={formData.from_role}
              onChange={handleChange}
              required
              placeholder="Менеджер по продажам"
              className="w-full px-4 py-3 bg-[#1a0f30]/60 border border-[#a855f7]/20 rounded-lg text-[#f5f3ff] placeholder-[#7c6f9e] focus:border-[#a855f7] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7c6f9e] font-mono mb-2">
              Куда (стало) *
            </label>
            <input
              type="text"
              name="to_role"
              value={formData.to_role}
              onChange={handleChange}
              required
              placeholder="Product Manager"
              className="w-full px-4 py-3 bg-[#1a0f30]/60 border border-[#a855f7]/20 rounded-lg text-[#f5f3ff] placeholder-[#7c6f9e] focus:border-[#a855f7] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#7c6f9e] font-mono mb-2">
            История *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="10"
            placeholder="Расскажи, как ты пришёл к этому решению, с какими сложностями столкнулся, что помогло..."
            className="w-full px-4 py-3 bg-[#1a0f30]/60 border border-[#a855f7]/20 rounded-lg text-[#f5f3ff] placeholder-[#7c6f9e] focus:border-[#a855f7] focus:outline-none transition-colors resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#7c6f9e] font-mono mb-2">
            Теги (через запятую)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="PM, карьера, менеджмент"
            className="w-full px-4 py-3 bg-[#1a0f30]/60 border border-[#a855f7]/20 rounded-lg text-[#f5f3ff] placeholder-[#7c6f9e] focus:border-[#a855f7] focus:outline-none transition-colors font-mono"
          />
        </div>

        {status === "error" && (
          <div className="app-card p-4 border-red-500/40">
            <p className="text-red-400 text-sm">Ошибка: {errorMsg}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="app-btn-primary w-full justify-center text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Отправляю..." : "Отправить на модерацию"}
        </button>

        <p className="text-xs text-[#7c6f9e] text-center">
          После отправки история попадёт на модерацию. Обычно занимает 1–2 дня.
        </p>
      </form>
    </div>
  );
}