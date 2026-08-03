import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/lib/hooks/useProgress";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BadgeToast } from "@/components/ui/BadgeToast";
import { ServiceWorker } from "@/components/layout/ServiceWorker";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://english-janala.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "English জানালা — মজা করে English Grammar ও Vocabulary শিখুন",
    template: "%s | English জানালা",
  },
  description:
    "বাংলায় ব্যাখ্যা সহ সম্পূর্ণ English Grammar, Spaced Repetition ভিত্তিক Vocabulary, ফ্রি Grammar Checker আর মিনি-গেম। লগইন লাগে না, সম্পূর্ণ ফ্রি।",
  keywords: [
    "English Grammar Bangla",
    "ইংরেজি গ্রামার",
    "vocabulary bangla",
    "tense bangla",
    "English শেখা",
    "grammar checker bangla",
    "spoken english bangla",
  ],
  authors: [{ name: "English জানালা" }],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: SITE_URL,
    siteName: "English জানালা",
    title: "English জানালা — মজা করে English শিখুন",
    description:
      "সম্পূর্ণ English Grammar বাংলায়, SRS ভোকাবুলারি, ফ্রি Grammar Checker আর মিনি-গেম। একদম ফ্রি।",
  },
  twitter: {
    card: "summary_large_image",
    title: "English জানালা",
    description: "মজা করে English Grammar ও Vocabulary শেখার প্ল্যাটফর্ম।",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffaf0" },
    { media: "(prefers-color-scheme: dark)", color: "#131219" },
  ],
  width: "device-width",
  initialScale: 1,
};

/** Applies the stored theme before first paint so there is no flash. */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('ej.theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${bricolage.variable} ${jakarta.variable} ${hind.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <link rel="preconnect" href="https://openapi.programming-hero.com" />
        <link rel="dns-prefetch" href="https://api.dictionaryapi.dev" />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-80 focus:rounded-xl focus:border-2 focus:border-line focus:bg-amber focus:px-4 focus:py-2 focus:font-bold focus:text-ink"
        >
          মূল কনটেন্টে যান
        </a>
        <ProgressProvider>
          <div className="relative z-1 flex min-h-dvh flex-col">
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <BadgeToast />
          <ServiceWorker />
        </ProgressProvider>
      </body>
    </html>
  );
}
