import "./globals.css";
import Navbar from "./Navbar";
import ParticlesBackground from "./ParticlesBackground";
import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";
import PmPlayground from "./PmPlayground";


export const metadata = {
  metadataBase: new URL("https://kirillmironchuk.ru"),
  title: "Кирилл Мирончук — Проектный менеджер | Коуч | Мотиватор",
  description:
    "4+ года в клиентском менеджменте. Координация федеральных проектов. Магистратура по управлению AI-проектами.",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Кирилл Мирончук — Проектный менеджер | Коуч | Мотиватор",
    description:
      "4+ года в клиентском менеджменте. Координация федеральных проектов. Магистратура по управлению AI-проектами.",
    url: "https://kirillmironchuk.ru",
    siteName: "Кирилл Мирончук",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Кирилл Мирончук — Портфолио",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Кирилл Мирончук — Проектный менеджер | Коуч | Мотиватор",
    description:
      "4+ года в клиентском менеджменте. Координация федеральных проектов. Магистратура по управлению AI-проектами.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body className="antialiased">
        <ParticlesBackground />
        <div className="mesh-gradient" />
        <ScrollProgress />
        <Navbar />
        <CustomCursor />
        <PmPlayground />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
