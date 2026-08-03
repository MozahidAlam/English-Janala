import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "অফলাইন",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-[60dvh] w-full max-w-xl flex-col items-center justify-center gap-5 px-4 py-16 text-center">
      <span className="anim-drift text-7xl" aria-hidden>
        📡
      </span>
      <h1 className="font-bangla text-[length:var(--text-display)]">ইন্টারনেট নেই</h1>
      <p className="font-bangla text-muted">
        এই পাতাটি এখনো ডাউনলোড হয়নি। তবে আগে যেসব পাতা দেখেছেন সেগুলো অফলাইনেও
        খুলবে — আর আপনার প্রোগ্রেস নিরাপদ আছে।
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" tone="ink">
          🏠 হোমে যান
        </ButtonLink>
        <ButtonLink href="/grammar" variant="outline">
          📖 গ্রামার
        </ButtonLink>
      </div>
    </div>
  );
}
