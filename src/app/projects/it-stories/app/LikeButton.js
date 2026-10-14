"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { FaHeart } from "react-icons/fa";

export default function LikeButton({
  storyId,
  initialLikes = 0,
  size = "sm",
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Проверяем localStorage при монтировании
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedLikes = JSON.parse(localStorage.getItem("liked_stories") || "[]");
    if (storedLikes.includes(storyId)) {
      setLiked(true);
    }
  }, [storyId]);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;
    setLoading(true);

    try {
      // Если лайк уже стоит — убираем
      if (liked) {
        const { error } = await supabase
          .from("stories")
          .update({ likes: Math.max(0, likes - 1) })
          .eq("id", storyId);

        if (!error) {
          setLikes(Math.max(0, likes - 1));
          setLiked(false);

          // Убираем из localStorage
          const storedLikes = JSON.parse(
            localStorage.getItem("liked_stories") || "[]"
          );
          const newLikes = storedLikes.filter((id) => id !== storyId);
          localStorage.setItem("liked_stories", JSON.stringify(newLikes));
        }
      } else {
        // Ставим лайк
        const { error } = await supabase
          .from("stories")
          .update({ likes: likes + 1 })
          .eq("id", storyId);

        if (!error) {
          setLikes(likes + 1);
          setLiked(true);

          // Добавляем в localStorage
          const storedLikes = JSON.parse(
            localStorage.getItem("liked_stories") || "[]"
          );
          storedLikes.push(storyId);
          localStorage.setItem("liked_stories", JSON.stringify(storedLikes));
        }
      }
    } catch (err) {
      console.error("Ошибка лайка:", err);
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses =
    size === "lg"
      ? "px-4 py-2 text-sm gap-2"
      : "px-2 py-1 text-xs gap-1";

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`inline-flex items-center rounded-lg font-mono transition-all cursor-pointer ${sizeClasses} ${
        liked
          ? "bg-[#ec4899]/20 border border-[#ec4899]/60 text-[#ec4899] hover:bg-[#ec4899]/30"
          : "bg-[#a855f7]/10 border border-[#a855f7]/20 text-[#a78bfa] hover:bg-[#a855f7]/20 hover:border-[#a855f7]/50 hover:text-[#a855f7]"
      } ${loading ? "opacity-50" : ""}`}
      title={liked ? "Убрать лайк" : "Поставить лайк"}
    >
      <FaHeart
        className={`transition-all ${liked ? "scale-110" : ""}`}
        style={{ fontSize: size === "lg" ? 14 : 10 }}
      />
      <span>{likes}</span>
    </button>
  );
}