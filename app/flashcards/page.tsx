import type { Metadata } from "next";
import { StudySession } from "@/components/study/StudySession";
import { SectionHeading } from "@/components/ui/Card";
import { playableWords } from "@/lib/api/vocabulary";

export const metadata: Metadata = {
  title: "Flashcards — Spaced Repetition দিয়ে শব্দ মুখস্থ",
  description:
    "Leitner box পদ্ধতির ফ্ল্যাশকার্ড। যে শব্দ ভুলে যান সেটি বারবার ফিরে আসে, যেটি পারেন সেটি কমে যায়। ৫টি প্র্যাকটিস মোড।",
};

export default function FlashcardsPage() {
  const pool = playableWords();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Spaced Repetition"
        accent="#7c5cff"
        title={
          <>
            যা ভুলে যান, তা <span className="marker">ফিরে আসে</span>
          </>
        }
        subtitle="ভুল করা শব্দ পরদিনই আবার আসবে, আর যেটা ভালো পারেন সেটা ১৬ দিন পরে। মস্তিষ্ক যেভাবে শেখে, ঠিক সেভাবেই।"
        align="center"
      />
      <StudySession pool={pool} />
    </div>
  );
}
