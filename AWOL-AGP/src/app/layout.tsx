import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentWorkforce.online | Autonomous AI Workforce Platform",
  description: "Experience autonomous AI workforce operations in real-time. High-impact enterprise dispatch & AI automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
