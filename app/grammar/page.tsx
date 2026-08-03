import type { Metadata } from "next";
import { GrammarIndex } from "@/components/grammar/GrammarIndex";
import { SectionHeading } from "@/components/ui/Card";
import { TOTAL_LESSONS } from "@/lib/content/grammar";
import { toBn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "English Grammar বাংলায় — সম্পূর্ণ সিলেবাস",
  description:
    "Parts of Speech, ১২টি Tense, Voice, Narration, Article, Preposition, Conditional সহ সম্পূর্ণ English Grammar — বাংলায় ব্যাখ্যা, ভুল-ঠিক উদাহরণ ও কুইজ সহ।",
  alternates: { canonical: "/grammar" },
};

export default function GrammarPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="সম্পূর্ণ সিলেবাস"
        accent="#7c5cff"
        title={
          <>
            গ্রামার, কিন্তু <span className="marker">মজার</span>
          </>
        }
        subtitle={`${toBn(TOTAL_LESSONS)}টি লেসন — প্রতিটিতে বাংলায় নিয়ম, ভুল-ঠিক তুলনা, মনে রাখার কৌশল আর কুইজ। মুখস্থ নয়, বোঝার জন্য।`}
        align="center"
      />
      <GrammarIndex />
    </div>
  );
}
