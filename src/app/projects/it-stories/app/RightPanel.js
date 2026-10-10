import Link from "next/link";
import { FaFire, FaUsers, FaTags } from "react-icons/fa";

export default function RightPanel({ stories }) {
  // Топ-5 тегов (по частоте)
  const tagCounts = {};
  stories.forEach((story) => {
    (story.tags || []).forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Топ-5 авторов (по количеству историй)
  const authorCounts = {};
  stories.forEach((story) => {
    authorCounts[story.author_name] =
      (authorCounts[story.author_name] || 0) + 1;
  });
  const topAuthors = Object.entries(authorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Популярные переходы (по частоте)
  const transitionCounts = {};
  stories.forEach((story) => {
    if (story.from_role && story.to_role) {
      const key = `${story.from_role}→${story.to_role}`;
      transitionCounts[key] = (transitionCounts[key] || 0) + 1;
    }
  });
  const topTransitions = Object.entries(transitionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <aside className="space-y-4">
      {/* Топ переходов */}
      {topTransitions.length > 0 && (
        <div className="app-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <FaFire className="text-[#ec4899] text-sm" />
            <h3 className="text-xs uppercase tracking-wider text-[#7c6f9e] font-mono">
              Топ переходов
            </h3>
          </div>
          <div className="space-y-3">
            {topTransitions.map(([key, count]) => {
              const [from, to] = key.split("→");
              return (
                <div key={key} className="text-xs">
                  <div className="text-[#a78bfa] mb-1 truncate">{from}</div>
                  <div className="flex items-center gap-2">
                    <div className="text-[#a855f7] text-[10px]">↓</div>
                    <div className="text-[#f5f3ff] font-semibold truncate">
                      {to}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Топ тегов */}
      {topTags.length > 0 && (
        <div className="app-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <FaTags className="text-[#a855f7] text-sm" />
            <h3 className="text-xs uppercase tracking-wider text-[#7c6f9e] font-mono">
              Топ тегов
            </h3>
          </div>
          <div className="space-y-2">
            {topTags.map(([tag, count]) => (
              <Link
                key={tag}
                href={`/projects/it-stories/app/tags`}
                className="flex items-center justify-between text-xs group"
              >
                <span className="text-[#a78bfa] group-hover:text-[#a855f7] transition-colors">
                  #{tag}
                </span>
                <span className="text-[#7c6f9e] font-mono">{count}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Топ авторов */}
      {topAuthors.length > 0 && (
        <div className="app-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <FaUsers className="text-[#a855f7] text-sm" />
            <h3 className="text-xs uppercase tracking-wider text-[#7c6f9e] font-mono">
              Топ авторов
            </h3>
          </div>
          <div className="space-y-2">
            {topAuthors.map(([author, count]) => (
              <Link
                key={author}
                href={`/projects/it-stories/app/authors`}
                className="flex items-center justify-between text-xs group"
              >
                <span className="text-[#a78bfa] group-hover:text-[#a855f7] transition-colors truncate">
                  {author}
                </span>
                <span className="text-[#7c6f9e] font-mono">{count}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* О проекте */}
      <div className="app-card p-4">
        <h3 className="text-xs uppercase tracking-wider text-[#7c6f9e] font-mono mb-3">
          О проекте
        </h3>
        <p className="text-xs text-[#a78bfa] leading-relaxed mb-3">
          Платформа реальных историй перехода в IT. Собрана Кириллом
          Мирончуком — как PM, разработчиком и автором.
        </p>
        <Link
          href="/projects/it-stories"
          className="text-xs text-[#a855f7] hover:text-[#ec4899] font-semibold transition-colors"
        >
          Узнать больше →
        </Link>
      </div>
    </aside>
  );
}