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
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-32 pb-24 px-6">
      <article className="max-w-3xl mx-auto">
        {/* Навигация назад */}
        <Link
          href="/projects/it-stories/app"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-8 text-sm"
        >
          <FaArrowLeft className="text-xs" />
          Все истории
        </Link>

        {/* Заголовок */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text font-[family-name:var(--font-space-grotesk)] leading-tight">
            {story.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span>
              Автор: <span className="text-slate-200">{story.author_name}</span>
            </span>

            {story.published_at && (
              <span>
                {new Date(story.published_at).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </div>

          {/* Теги */}
          {story.tags && story.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Контент */}
        <div className="glass rounded-2xl p-8 md:p-10 mb-12">
          <div className="text-slate-200 leading-relaxed whitespace-pre-line text-lg">
            {story.content}
          </div>
        </div>

        {/* Контакты автора */}
        {(story.author_social || story.author_email) && (
          <div className="glass rounded-2xl p-6 md:p-8 mb-12">
            <h3 className="text-lg font-bold text-white mb-4">
              Связаться с автором
            </h3>
            <div className="flex flex-wrap gap-4">
              {story.author_social && (
                <a
                  href={story.author_social}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-all text-sm"
                >
                  <FaTelegramPlane />
                  Написать в Telegram
                </a>
              )}
              {story.author_email && (
                <a
                  href={`mailto:${story.author_email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg font-semibold transition-all text-sm hover:border-blue-500"
                >
                  {story.author_email}
                </a>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/projects/it-stories/app"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            Вернуться к списку историй
          </Link>
        </div>
      </article>
    </main>
  );
}