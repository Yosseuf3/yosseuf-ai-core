import type { Metadata } from "next";
import "./globals.css";
import "./brand.css";

export const metadata: Metadata = {
  title: "YOSSEUF AI Core | Yosseuf Radwan",
  description: "The creative intelligence operating core by Yosseuf Radwan for identity, assets, prompts, production, and brand consistency.",
  applicationName: "YOSSEUF AI Core",
  authors: [{ name: "Yosseuf Radwan" }],
  creator: "Yosseuf Radwan",
  publisher: "YOSSEUF",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
