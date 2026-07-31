import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YOSSEUF AI Core — Creative Intelligence System",
  description: "One intelligent core for identity, assets, prompts, production, and brand consistency.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
