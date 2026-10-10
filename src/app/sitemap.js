import { supabase } from "@/app/lib/supabase";

export default async function sitemap() {
  const baseUrl = "https://kirillmironchuk.ru";

  // Статические страницы
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects/it-stories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects/it-stories/app`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/it-stories/app/feed`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/it-stories/app/tags`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects/it-stories/app/authors`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects/it-stories/app/share`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Динамические страницы — все опубликованные истории
  const { data: stories } = await supabase
    .from("stories")
    .select("slug, published_at")
    .eq("status", "published");

  const storyPages =
    stories?.map((story) => ({
      url: `${baseUrl}/projects/it-stories/app/${story.slug}`,
      lastModified: story.published_at
        ? new Date(story.published_at)
        : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    })) || [];

  return [...staticPages, ...storyPages];
}