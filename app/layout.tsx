import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DM_Sans, Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { FigmaMakeNavigation } from "@/components/figma-make-navigation";
import { ProgressProvider } from "@/components/progress-provider";
import { siteConfig, siteOgImage } from "@/lib/site";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteOgImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050607",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark font-sans", sans.variable, mono.variable)}
    >
      <body className="flex min-h-svh flex-col">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-16 rounded-md border border-border bg-background px-4 py-2 text-chrome font-medium text-foreground outline-none transition-transform focus:translate-y-0 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Skip to content
        </a>
        <FigmaMakeNavigation />
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
