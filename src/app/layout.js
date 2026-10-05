import "./globals.css";
import Navbar from "./Navbar";

export const metadata = {
  title: "Кирилл Мирончук — Проектный менеджер | Коуч | Мотиватор",
  description: "4+ года в клиентском менеджменте. Координация федеральных проектов. Магистратура по управлению AI-проектами.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="antialiased bg-slate-950">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
