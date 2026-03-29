"use client";

import { useState, useEffect } from "react";
import { Loader } from "./loader";
import { Cursor } from "./cursor";
import { SmoothScroll } from "./smooth-scroll";
import {
  NoiseGrain,
  Scanlines,
  ReadingProgress,
  GlobalStyles,
  ConsoleMessage,
} from "@/components/ui/atmosphere";
import { ColorShift } from "@/components/ui/effects";
import { ThemeProvider } from "@/components/theme-provider";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!loaded) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [loaded]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <GlobalStyles />
      <ColorShift />
      <ConsoleMessage />
      <Cursor />
      <NoiseGrain opacity={0.032} />
      <Scanlines opacity={0.025} />
      {loaded && <ReadingProgress />}

      <Loader onComplete={() => setLoaded(true)} />

      <SmoothScroll>
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease",
            pointerEvents: loaded ? "auto" : "none",
          }}
        >
          {children}
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}
