import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ClientWrapper } from "@/components/client-wrapper";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pedro Sanson — Full-Stack Developer",
    template: "%s — Pedro Sanson",
  },
  description:
    "Full-stack developer specialized in React, Next.js, TypeScript, and Tailwind. Building scalable and performant web applications.",
  keywords: [
    "Pedro Sanson",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Portfolio",
  ],
  authors: [{ name: "Pedro Henrique Sanson" }],
  creator: "Pedro Henrique Sanson",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Pedro Sanson — Full-Stack Developer",
    description:
      "Architecting scalable full-stack environments with precision. React, Next.js, TypeScript.",
    siteName: "Pedro Sanson",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedro Sanson — Full-Stack Developer",
    description:
      "Architecting scalable full-stack environments with precision.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={jetbrainsMono.variable}>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
