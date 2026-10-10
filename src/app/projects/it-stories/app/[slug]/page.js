import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { FaArrowLeft, FaTelegramPlane } from "react-icons/fa";

export const revalidate = 60;

async function getStory(slug) {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) return null;
  return data;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = await getStory(slug);

  if (!story) {
    return { title: "История не найдена" };
  }

  return {
    title: `${story.title} — IT Transition Stories`,
    description: story.content.slice(0, 160),
  };
}

export default async function StoryPage({ params }) {
  const { slug } = await params;
  const story = await getStory(slug);

  if (!story) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      {/* Навигация назад */}
      <Link
        href="/projects/it-stories/app/feed"
        className="inline-flex items-center gap-2 text-[#7c6f9e] hover:text-[#a855f7] transition-colors mb-8 text-sm font-mono"
      >
        <FaArrowLeft className="text-xs" />
        все истории
      </Link>

      {/* Заголовок */}
      <header className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 app-gradient-text leading-tight">
          {story.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-[#a78bfa] mb-6">
          <span>
            Автор: <span className="text-[#f5f3ff]">{story.author_name}</span>
          </span>

          {story.published_at && (
            <span className="font-mono">
              {new Date(story.published_at).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        {/* Переход откуда → куда */}
        {story.from_role && story.to_role && (
          <div className="app-card p-4 mb-6 inline-flex items-center gap-3">
            <div className="text-xs uppercase tracking-wider text-[#7c6f9e] font-mono">
              Переход:
            </div>
            <div className="text-sm text-[#f5f3ff] font-semibold">
              {story.from_role}
            </div>
            <div className="text-[#a855f7]">→</div>
            <div className="text-sm font-semibold app-gradient-text">
              {story.to_role}
            </div>
          </div>
        )}

        {/* Теги */}
        {story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag) => (
              <span key={tag} className="app-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Контент */}
      <div className="app-card p-8 md:p-10 mb-12">
        <div className="text-[#f5f3ff] leading-relaxed whitespace-pre-line text-base md:text-lg">
          {story.content}
        </div>
      </div>

      {/* Контакты автора */}
      {(story.author_social || story.author_email) && (
        <div className="app-card p-6 md:p-8 mb-12">
          <h3 className="text-lg font-bold text-[#f5f3ff] mb-4">
            Связаться с автором
          </h3>
          <div className="flex flex-wrap gap-4">
            {story.author_social && (
              <a
                href={story.author_social}
                target="_blank"
                rel="noopener noreferrer"
                className="app-btn-primary text-sm"
              >
                <FaTelegramPlane />
                Написать в Telegram
              </a>
            )}
            {story.author_email && (
              <a
                href={`mailto:${story.author_email}`}
                className="app-btn-secondary text-sm"
              >
                {story.author_email}
              </a>
            )}
          </div>
        </div>
      )}

      {/* CTA назад */}
      <div className="text-center">
        <Link
          href="/projects/it-stories/app/feed"
          className="inline-flex items-center gap-2 text-[#a855f7] hover:text-[#ec4899] font-semibold transition-colors text-sm"
        >
          <FaArrowLeft className="text-xs" />
          Вернуться к списку историй
        </Link>
      </div>
    </article>
  );
}