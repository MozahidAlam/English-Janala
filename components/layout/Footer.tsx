import Link from "next/link";
import { NAV } from "@/lib/content/nav";
import { AUTHOR } from "@/lib/content/author";

const SOURCES = [
  { name: "Programming Hero API", href: "https://openapi.programming-hero.com" },
  { name: "Free Dictionary API", href: "https://dictionaryapi.dev" },
  { name: "Datamuse", href: "https://www.datamuse.com/api/" },
  { name: "LanguageTool", href: "https://languagetool.org" },
];

export function Footer() {
  return (
    <footer className="no-print mt-20 border-t-2 border-line surface-alt">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-1.5 text-xl font-extrabold">
            <span className="font-display">English</span>
            <span className="font-bangla">জানালা</span>
          </p>
          <p className="font-bangla mt-3 max-w-xs text-sm text-muted">
            মজা করে English Grammar আর Vocabulary শেখার জায়গা। কোনো লগইন লাগে না,
            কোনো বিজ্ঞাপন নেই, কোনো ফি নেই। শুধু কতজন এসেছেন সেটুকু গোনা হয় —
            নাম-পরিচয় কিছুই নয়।
          </p>
        </div>

        <nav aria-label="ফুটার মেনু">
          <h2 className="mb-3 text-sm font-extrabold tracking-widest uppercase">
            শেখা শুরু করুন
          </h2>
          <ul className="text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center hover:underline"
                >
                  <span aria-hidden>{item.emoji}</span> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 text-sm font-extrabold tracking-widest uppercase">
            ডেটা সোর্স
          </h2>
          <ul className="text-sm text-muted">
            {SOURCES.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center hover:underline"
                >
                  {s.name} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-line px-4 py-5 text-center text-xs text-muted sm:px-6">
        <p className="font-bangla">
          ❤️ দিয়ে তৈরি করেছেন{" "}
          <strong className="text-(--fg)">{AUTHOR.name}</strong> —{" "}
          {AUTHOR.affiliation}
        </p>
      </div>
    </footer>
  );
}
