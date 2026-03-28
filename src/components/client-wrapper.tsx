"use client";

import { useState } from "react";
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

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <GlobalStyles />
      <ColorShift />
      <ConsoleMessage />
      <Cursor />
      <NoiseGrain opacity={0.032} />
      <Scanlines opacity={0.025} />
      <ReadingProgress />
      
      <Loader onComplete={() => setLoaded(true)} />

      <SmoothScroll>
        <div
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}
        >
          {children}
        </div>
      </SmoothScroll>
    </>
  );
}
