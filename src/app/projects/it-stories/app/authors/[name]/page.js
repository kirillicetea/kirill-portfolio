import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { FaArrowLeft, FaArrowRight, FaTelegramPlane } from "react-icons/fa";

export const revalidate = 60;

async function getAuthorData(name) {
  const decodedName = decodeURIComponent(name);

  const { data: stories, error } = await supabase
    .from("stories")
    .select("*")
    .eq("author_name", decodedName)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error || !stories || stories.length === 0) return null;

  return {
    name: decodedName,
    stories,
    social: stories[0]?.author_social || null,
  };
}

export async function generateMetadata({ params }) {
  const { name } = await params;
  const data = await getAuthorData(name);

  if (!data) return { title: "Автор не найден" };

  return {
    title: `${data.name} — IT Transition Stories`,
    description: `Истории перехода в IT от ${data.name}`,
  };
}

export default async function AuthorPage({ params }) {
  const { name } = await params;
  const data = await getAuthorData(name);

  if (!data) {
    notFound();
  }

  const { name: authorName, stories, social } = data;

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/projects/it-stories/app/authors"
        className="inline-flex items-center gap-2 text-[#7c6f9e] hover:text-[#a855f7] transition-colors mb-8 text-sm font-mono"
      >
        <FaArrowLeft className="text-xs" />
        все авторы
      </Link>

      {/* Hero автора */}
      <div className="app-card p-8 mb-8">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center text-white font-bold text-3xl flex-shrink-0 shadow-lg shadow-[#a855f7]/40">
            {authorName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 app-gradient-text">
              {authorName}
            </h1>
            <p className="text-[#a78bfa] mb-4">
              {stories.length} {stories.length === 1 ? "история" : "историй"}{" "}
              на платформе
            </p>
            {social && (
              <a
                href={social}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#a855f7] hover:text-[#ec4899] font-semibold transition-colors text-sm"
              >
                <FaTelegramPlane />
                Связаться
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Истории автора */}
      <h2 className="text-xl font-bold text-[#f5f3ff] mb-4">Истории</h2>
      <div className="space-y-3">
        {stories.map((story) => (
          <Link
            key={story.id}
            href={`/projects/it-stories/app/${story.slug}`}
            className="app-card block p-5 group"
          >
            <h3 className="text-lg font-bold text-[#f5f3ff] mb-2 group-hover:text-[#a855f7] transition-colors">
              {story.title}
            </h3>
            {story.from_role && story.to_role && (
              <p className="text-xs text-[#7c6f9e] font-mono mb-3">
                {story.from_role} → {story.to_role}
              </p>
            )}
            <p className="text-sm text-[#a78bfa] leading-relaxed line-clamp-2 mb-3">
              {story.content}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {story.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded font-mono bg-[#a855f7]/10 border border-[#a855f7]/20 text-[#a78bfa]"
                >
                  #{tag}
                </span>
              ))}
              <span className="ml-auto inline-flex items-center gap-1 text-[#a855f7] text-xs font-semibold group-hover:gap-2 transition-all">
                Читать <FaArrowRight className="text-[10px]" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}