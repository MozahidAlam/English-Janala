import type { Metadata } from "next";
import { VocabularyExplorer } from "@/components/vocab/VocabularyExplorer";
import { SectionHeading } from "@/components/ui/Card";
import { getLessons, snapshotWords } from "@/lib/api/vocabulary";

export const metadata: Metadata = {
  title: "Vocabulary — লেসন ধরে ধরে শব্দ শিখুন",
  description:
    "প্রতিটি Lesson-এ সাজানো ইংরেজি শব্দ, বাংলা অর্থ, উচ্চারণ, উদাহরণ বাক্য, synonym ও antonym। আসল অডিও দিয়ে উচ্চারণ শুনুন।",
};

export default async function VocabularyPage() {
  // Server-rendered from the bundled snapshot so the page is useful even before
  // any client fetch resolves; the explorer refreshes from the live API on mount.
  const lessons = await getLessons();
  const words = snapshotWords();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Vocabulary"
        title={
          <>
            চলুন <span className="marker">শব্দ</span> শিখি
          </>
        }
        subtitle="একটি Lesson বেছে নিন। প্রতিটি শব্দের বাংলা অর্থ, উচ্চারণ, উদাহরণ বাক্য আর সমার্থক শব্দ একসাথে পাবেন।"
        align="center"
      />
      <VocabularyExplorer initialLessons={lessons} initialWords={words} />
    </div>
  );
}
