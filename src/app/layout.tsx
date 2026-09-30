import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { DESCRIPTION, HANDLE, SITE_URL } from "@/lib/site";

const plex = IBM_Plex_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
});

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self' https://github-contributions-api.jogruber.de",
  "frame-src https://tryhackme.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const OG_IMAGE = {
  url: "/avatar.png",
  width: 320,
  height: 320,
  alt: "rxsklife profile picture",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: HANDLE,
  description: `Personal terminal of ${HANDLE}. ${DESCRIPTION}.`,
  keywords: [
    "rxsklife",
    "OSINT",
    "threat intelligence",
    "AI development",
    "osintpro",
    "flockradar",
  ],
  alternates: { canonical: `${SITE_URL}/` },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/`,
    siteName: "rxsk.life",
    title: HANDLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary",
    site: HANDLE,
    creator: HANDLE,
    title: HANDLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  formatDetection: { email: false, telephone: false },
  other: { referrer: "strict-origin-when-cross-origin" },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={plex.variable}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
      </head>
      <body>{children}</body>
    </html>
  );
}
