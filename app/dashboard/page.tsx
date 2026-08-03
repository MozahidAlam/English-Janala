import type { Metadata } from "next";
import { Dashboard } from "@/components/progress/Dashboard";
import { SectionHeading } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "আপনার অগ্রগতি",
  description:
    "XP, স্ট্রিক, ব্যাজ, শেখা শব্দ আর পড়া লেসন — আপনার সব অগ্রগতি এক জায়গায়। ডেটা থাকে আপনার ব্রাউজারেই।",
  robots: { index: false, follow: true },
};

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Progress"
        accent="#14c39a"
        title={
          <>
            আপনি কতদূর <span className="marker">এগোলেন</span>
          </>
        }
        subtitle="সব তথ্য আপনার ব্রাউজারে সংরক্ষিত। কোনো অ্যাকাউন্ট নেই, কোনো ট্র্যাকিং নেই।"
        align="center"
      />
      <Dashboard />
    </div>
  );
}
