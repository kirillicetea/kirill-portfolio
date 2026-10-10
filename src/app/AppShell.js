"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "./Navbar";
import ParticlesBackground from "./ParticlesBackground";
import CustomCursor from "./CustomCursor";
import PmPlayground from "./PmPlayground";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isApp =
  pathname?.startsWith("/projects/it-stories/app") ||
  pathname?.startsWith("/admin");

  useEffect(() => {
    if (isApp) {
      document.body.classList.add("app-mode");
    } else {
      document.body.classList.remove("app-mode");
    }
  }, [isApp]);

  if (isApp) {
    return <>{children}</>;
  }

  return (
    <>
      <ParticlesBackground />
      <div className="mesh-gradient" />
      <Navbar />
      <CustomCursor />
      <PmPlayground />
      <main className="relative z-10">{children}</main>
    </>
  );
}