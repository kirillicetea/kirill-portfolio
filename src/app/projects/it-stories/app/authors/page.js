import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { FaUsers, FaArrowRight } from "react-icons/fa";

export const metadata = {
  title: "Авторы — IT Transition Stories",
  description: "Люди, которые поделились своим путём в IT",
};

export const revalidate = 60;

export default async function AuthorsPage() {
  const { data: stories, error } = await supabase
    .from("stories")
    .select("author_name, author_social")
    .eq("status", "published");

  // Считаем, сколько историй у каждого автора
  const authorMap = {};
  stories?.forEach((story) => {
    if (!authorMap[story.author_name]) {
      authorMap[story.author_name] = {
        count: 0,
        social: story.author_social,
      };
    }
    authorMap[story.author_name].count += 1;
  });

  const sortedAuthors = Object.entries(authorMap).sort(
    (a, b) => b[1].count - a[1].count
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <div className="mb-8">
        <div className="mb-3">
          <span className="app-badge">
            <FaUsers className="text-xs" />
            Сообщество
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3 app-gradient-text">
          Авторы историй
        </h1>
        <p className="text-[#a78bfa] max-w-2xl">
          Люди, которые поделились своим опытом перехода в IT
        </p>
      </div>

      {/* Авторы */}
      {error && (
        <div className="app-card p-6 border-red-500/30">
          <p className="text-red-400 text-sm">Ошибка: {error.message}</p>
        </div>
      )}

      {sortedAuthors.length === 0 ? (
        <div className="app-card p-12 text-center border-dashed">
          <FaUsers className="text-4xl text-[#7c6f9e] mx-auto mb-4" />
          <p className="text-[#7c6f9e]">Пока нет авторов</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sortedAuthors.map(([name, info]) => (
            <div key={name} className="app-card p-5">
              <div className="flex items-start gap-4">
                {/* Аватар — инициал */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {name.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-[#f5f3ff] mb-1 truncate">
                    {name}
                  </h3>
                  <p className="text-xs text-[#7c6f9e] font-mono mb-3">
                    {info.count} {info.count === 1 ? "история" : "историй"}
                  </p>
                  {info.social && (
                    <a
                      href={info.social}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#a855f7] hover:text-[#ec4899] font-semibold transition-colors inline-flex items-center gap-1"
                    >
                      Связаться <FaArrowRight className="text-[10px]" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}