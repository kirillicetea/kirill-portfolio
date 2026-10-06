import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import ParticlesBackground from "./ParticlesBackground";
import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";
import PmPlayground from "./PmPlayground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Кирилл Мирончук — Проектный менеджер | Коуч | Мотиватор",
  description:
    "4+ года в клиентском менеджменте. Координация федеральных проектов. Магистратура по управлению AI-проектами.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
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
