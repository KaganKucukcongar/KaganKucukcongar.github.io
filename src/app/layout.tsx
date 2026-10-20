import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/config/site";
import "@/styles/globals.css";

const display = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-ext-wght-normal.woff2",
      weight: "500 700",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
      weight: "500 700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});
const body = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-ext-wght-normal.woff2",
      weight: "400 600",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
      weight: "400 600",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});
const mono = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-ext-wght-normal.woff2",
      weight: "400 500",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
      weight: "400 500",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Creative Engineering`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  icons: { icon: "/k.png" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: `${site.name} — Creative Engineering`,
    description: site.description,
    url: "/",
    images: [
      {
        url: "/social.png",
        width: 1200,
        height: 630,
        alt: "Kağan Küçükçongar — Building things that go beyond ideas.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Creative Engineering`,
    description: site.description,
    images: ["/social.png"],
  },
};
export const viewport: Viewport = {
  themeColor: "#0B0D12",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
