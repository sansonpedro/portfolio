import type { Metadata } from "next";
import { ClientWrapper } from "@/components/client-wrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pedro Sanson",
  description: "Full-stack developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
