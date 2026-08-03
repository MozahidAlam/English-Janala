import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60dvh] w-full max-w-xl flex-col items-center justify-center gap-5 px-4 py-16 text-center">
      <span className="anim-drift text-7xl" aria-hidden>
        🧭
      </span>
      <h1 className="text-display">৪০৪</h1>
      <p className="font-bangla text-xl font-bold">এই পাতাটি খুঁজে পাওয়া গেল না</p>
      <p className="font-bangla text-muted">
        হয়তো লিংকটি ভুল, অথবা পাতাটি সরিয়ে ফেলা হয়েছে। চলুন শুরুতে ফিরে যাই।
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" tone="ink">
          🏠 হোমে ফিরুন
        </ButtonLink>
        <ButtonLink href="/grammar" variant="outline">
          📖 গ্রামার লেসন
        </ButtonLink>
      </div>
    </div>
  );
}
