"use client";

import { useRef, useState } from "react";
import { useProgress } from "@/lib/hooks/useProgress";
import { exportState, importState } from "@/lib/storage/progress";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { dateKey } from "@/lib/utils";

/**
 * Without an account there is no cloud sync, so the learner moves progress
 * between devices by exporting and importing a JSON file.
 */
export function DataControls() {
  const { state, replaceState, resetAll } = useProgress();
  const [status, setStatus] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const download = () => {
    const blob = new Blob([exportState(state)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `english-janala-progress-${dateKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus("✅ ফাইল ডাউনলোড হয়েছে। এটি অন্য ডিভাইসে ইমপোর্ট করতে পারবেন।");
  };

  const upload = async (file: File) => {
    try {
      const next = importState(await file.text());
      replaceState(next);
      setStatus("✅ প্রোগ্রেস ইমপোর্ট হয়েছে!");
    } catch {
      setStatus("❌ ফাইলটি পড়া গেল না। সঠিক backup ফাইল কিনা দেখে নিন।");
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={download}>
          ⬇️ প্রোগ্রেস ব্যাকআপ
        </Button>
        <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()}>
          ⬆️ ব্যাকআপ ইমপোর্ট
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setConfirmReset(true)}>
          🗑️ সব মুছুন
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
          }}
        />
      </div>

      {status ? (
        <p className="font-bangla text-sm" role="status">
          {status}
        </p>
      ) : null}

      <Modal open={confirmReset} onClose={() => setConfirmReset(false)} title="সব মুছে ফেলবেন?">
        <h2 className="font-bangla text-2xl">সত্যিই সব মুছে ফেলবেন?</h2>
        <p className="font-bangla mt-2 text-muted">
          আপনার XP, স্ট্রিক, ব্যাজ, শেখা শব্দ আর পড়া লেসন — সবকিছু চিরতরে মুছে
          যাবে। এটি ফেরানো যাবে না।
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => setConfirmReset(false)}>
            না, থাক
          </Button>
          <Button
            tone="coral"
            className="flex-1"
            onClick={() => {
              resetAll();
              setConfirmReset(false);
              setStatus("🗑️ সব ডেটা মুছে ফেলা হয়েছে।");
            }}
          >
            হ্যাঁ, মুছে দিন
          </Button>
        </div>
      </Modal>
    </div>
  );
}
