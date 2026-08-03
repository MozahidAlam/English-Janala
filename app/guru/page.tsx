import type { Metadata } from "next";
import Link from "next/link";
import { GuruChecker } from "@/components/guru/GuruChecker";
import { SectionHeading, Card } from "@/components/ui/Card";
import { GRAMMAR_LESSONS } from "@/lib/content/grammar";

export const metadata: Metadata = {
  title: "Grammar Guru — ফ্রি ইংরেজি গ্রামার চেকার",
  description:
    "আপনার লেখা ইংরেজি বাক্যের গ্রামার ও বানান চেক করুন। ভুল কোথায়, কেন ভুল আর কীভাবে ঠিক করবেন — এক ক্লিকেই। সম্পূর্ণ ফ্রি, লগইন লাগে না।",
  alternates: { canonical: "/guru" },
};

const RELATED = ["bangladeshi-common-mistakes", "preposition-mistakes", "confusing-words"];

export default function GuruPage() {
  const lessons = GRAMMAR_LESSONS.filter((l) => RELATED.includes(l.slug));

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Grammar Guru"
        accent="#14c39a"
        title={
          <>
            আপনার ইংরেজি <span className="marker">যাচাই</span> করুন
          </>
        }
        subtitle="যা খুশি লিখুন — ইমেইল, অ্যাসাইনমেন্ট, ফেসবুক পোস্ট। ভুল ধরে দেবে, সাজেশন দেবে, এক ক্লিকে ঠিকও করে দেবে।"
        align="center"
      />

      <GuruChecker />

      <section className="mt-14">
        <h2 className="font-bangla mb-4 text-xl">📚 ভুল বুঝতে চান? এই লেসনগুলো পড়ুন</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {lessons.map((l) => (
            <Link key={l.slug} href={`/grammar/${l.slug}`}>
              <Card interactive className="h-full p-4">
                <h3 className="font-bangla text-lg leading-snug">{l.titleBn}</h3>
                <p className="mt-1 text-xs font-bold text-muted uppercase">{l.title}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <p className="font-bangla mt-10 text-center text-xs text-muted">
        চেকিং করে{" "}
        <a
          href="https://languagetool.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          LanguageTool
        </a>{" "}
        — একটি ওপেন সোর্স গ্রামার চেকার। আপনার লেখা সংরক্ষণ করা হয় না।
      </p>
    </div>
  );
}
