import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "SoccerStat",
  description: "Soccer stat informations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning className="min-h-full">
      <body className="bg-[#f5f7fa] min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
