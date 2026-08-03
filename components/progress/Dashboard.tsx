"use client";

import { useProgress } from "@/lib/hooks/useProgress";
import {
  activeDays,
  liveStreak,
  masteredWords,
  todayXp,
  totalQuizzes,
} from "@/lib/storage/progress";
import { boxCounts } from "@/lib/storage/srs";
import { BADGES } from "@/lib/storage/badges";
import { BOX_LABEL } from "@/lib/storage/srs";
import { TOTAL_LESSONS } from "@/lib/content/grammar";
import { GAMES } from "@/lib/content/games";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Heatmap } from "@/components/progress/Heatmap";
import { DataControls } from "@/components/progress/DataControls";
import { cn, rankFor, toBn } from "@/lib/utils";

const GOALS = [20, 50, 100, 200];

export function Dashboard() {
  const { state, hydrated, storageBlocked, setDailyGoal } = useProgress();

  if (!hydrated) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="skeleton h-32 rounded-3xl border-2 border-line-soft" />
        ))}
      </div>
    );
  }

  const streak = liveStreak(state);
  const today = todayXp(state);
  const rank = rankFor(state.xp);
  const boxes = boxCounts(state);
  const learned = Object.keys(state.srs).length;
  const earned = new Set(state.badges);
  const bestGame = GAMES.map((g) => ({ ...g, score: state.gameScores[g.slug] ?? 0 }))
    .filter((g) => g.score > 0)
    .sort((a, b) => b.score - a.score);

  const isEmpty = state.xp === 0;

  return (
    <div className="space-y-8">
      {storageBlocked ? (
        <div
          role="alert"
          className="brut font-bangla p-4"
          style={{ backgroundColor: "#ffe6b0" }}
        >
          <p className="font-bold text-ink">
            ⚠️ ব্রাউজার স্টোরেজে লেখা যাচ্ছে না — সম্ভবত Private/Incognito মোডে আছেন।
            এই সেশনের প্রোগ্রেস সেভ হবে না।
          </p>
        </div>
      ) : null}

      {isEmpty ? (
        <Card size="lg" className="space-y-4 p-8 text-center">
          <span className="text-6xl anim-drift" aria-hidden>
            🌱
          </span>
          <h2 className="font-bangla text-2xl">এখনো যাত্রা শুরু হয়নি</h2>
          <p className="font-bangla text-muted">
            একটা লেসন পড়ুন বা কিছু শব্দ চর্চা করুন — এই পাতায় আপনার সব অগ্রগতি
            দেখা যাবে।
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/grammar">📖 গ্রামার পড়ুন</ButtonLink>
            <ButtonLink href="/flashcards" variant="outline">
              🧠 শব্দ চর্চা
            </ButtonLink>
          </div>
        </Card>
      ) : null}

      {/* --------------------------------------------------- rank + streak */}
      <div className="grid gap-5 md:grid-cols-3">
        <Card size="lg" className="p-6 md:col-span-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-bangla text-sm text-muted">আপনার র‍্যাঙ্ক</p>
              <p className="font-bangla text-3xl font-extrabold">
                {rank.current.emoji} {rank.current.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-extrabold text-[color:var(--color-violet)]">
                ⚡ {toBn(state.xp)}
              </p>
              <p className="font-bangla text-sm text-muted">মোট XP</p>
            </div>
          </div>
          <ProgressBar
            value={rank.progress * 100}
            color="#7c5cff"
            label="র‍্যাঙ্ক অগ্রগতি"
          />
          <p className="font-bangla mt-2 text-sm text-muted">
            {rank.next
              ? `পরবর্তী র‍্যাঙ্ক ${rank.next.emoji} ${rank.next.name} — আর ${toBn(
                  rank.next.min - state.xp,
                )} XP দরকার।`
              : "সর্বোচ্চ র‍্যাঙ্কে পৌঁছে গেছেন! 👑"}
          </p>
        </Card>

        <Card size="lg" className="flex flex-col items-center justify-center gap-1 p-6 text-center">
          <span className={cn("text-6xl", streak > 0 && "anim-flame")} aria-hidden>
            🔥
          </span>
          <p className="text-4xl font-extrabold">{toBn(streak)}</p>
          <p className="font-bangla text-sm text-muted">দিনের স্ট্রিক</p>
          <p className="font-bangla mt-1 text-xs text-muted">
            সেরা: {toBn(state.bestStreak)} দিন
          </p>
        </Card>
      </div>

      {/* -------------------------------------------------------- daily goal */}
      <Card className="p-6">
        <div className="font-bangla mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-bold">🎯 আজকের লক্ষ্য</h2>
          <span className="text-sm font-extrabold">
            {toBn(today)} / {toBn(state.dailyGoal)} XP
          </span>
        </div>
        <ProgressBar
          value={today}
          max={state.dailyGoal}
          color={today >= state.dailyGoal ? "#14c39a" : "#ffb020"}
          height={18}
        />
        <p className="font-bangla mt-2 text-sm text-muted">
          {today >= state.dailyGoal
            ? "🎉 আজকের লক্ষ্য পূরণ হয়েছে! চাইলে আরও চালিয়ে যান।"
            : `আর ${toBn(state.dailyGoal - today)} XP বাকি।`}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="font-bangla text-sm text-muted">লক্ষ্য বদলান:</span>
          {GOALS.map((g) => (
            <Button
              key={g}
              size="sm"
              variant={state.dailyGoal === g ? "solid" : "outline"}
              tone="amber"
              onClick={() => setDailyGoal(g)}
            >
              {toBn(g)} XP
            </Button>
          ))}
        </div>
      </Card>

      {/* ------------------------------------------------------------ stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { l: "শব্দ চর্চা", v: toBn(learned), s: "🗂️", c: "#1a91ff" },
          { l: "মুখস্থ", v: toBn(masteredWords(state)), s: "🧠", c: "#14c39a" },
          { l: "লেসন", v: `${toBn(state.readLessons.length)}/${toBn(TOTAL_LESSONS)}`, s: "📖", c: "#7c5cff" },
          { l: "কুইজ", v: toBn(totalQuizzes(state)), s: "❓", c: "#e94ea8" },
        ].map((s) => (
          <Card key={s.l} className="p-5 text-center">
            <span className="text-3xl" aria-hidden>
              {s.s}
            </span>
            <p className="mt-1 text-2xl font-extrabold" style={{ color: s.c }}>
              {s.v}
            </p>
            <p className="font-bangla text-xs text-muted">{s.l}</p>
          </Card>
        ))}
      </div>

      {/* ---------------------------------------------------------- heatmap */}
      <Card className="p-6">
        <Heatmap state={state} />
        <p className="font-bangla mt-3 text-sm text-muted">
          মোট {toBn(activeDays(state))} দিন পড়াশোনা করেছেন।
        </p>
      </Card>

      {/* ------------------------------------------------------- SRS boxes */}
      {learned > 0 ? (
        <Card className="p-6">
          <h2 className="font-bangla mb-4 text-lg font-bold">🗂️ শব্দ কোন স্তরে আছে</h2>
          <div className="grid grid-cols-5 gap-2">
            {([1, 2, 3, 4, 5] as const).map((box) => (
              <div key={box} className="surface-alt rounded-xl border-2 border-line-soft p-3 text-center">
                <p className="text-2xl font-extrabold">{toBn(boxes[box])}</p>
                <p className="font-bangla text-[11px] text-muted">{BOX_LABEL[box]}</p>
              </div>
            ))}
          </div>
          <p className="font-bangla mt-3 text-sm text-muted">
            ডানদিকে যত যাবে, তত ভালোভাবে মনে আছে। “মুখস্থ” স্তরের শব্দ ১৬ দিন পরপর আসে।
          </p>
        </Card>
      ) : null}

      {/* ----------------------------------------------------------- badges */}
      <Card className="p-6">
        <div className="font-bangla mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-bold">🏅 অর্জন</h2>
          <span className="text-sm text-muted">
            {toBn(earned.size)} / {toBn(BADGES.length)} আনলকড
          </span>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {BADGES.map((badge) => {
            const has = earned.has(badge.id);
            return (
              <li
                key={badge.id}
                className={cn(
                  "rounded-2xl border-2 border-line p-3 text-center transition-opacity",
                  has ? "surface-alt" : "opacity-40 grayscale",
                )}
                title={badge.desc}
              >
                <span className="text-3xl" aria-hidden>
                  {has ? badge.emoji : "🔒"}
                </span>
                <p className="font-bangla mt-1 text-sm font-bold">{badge.title}</p>
                <p className="font-bangla text-[11px] text-muted">{badge.desc}</p>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* ------------------------------------------------------- game scores */}
      {bestGame.length > 0 ? (
        <Card className="p-6">
          <h2 className="font-bangla mb-4 text-lg font-bold">🎮 গেমের সেরা স্কোর</h2>
          <ul className="space-y-2">
            {bestGame.map((g) => (
              <li
                key={g.slug}
                className="surface-alt flex items-center gap-3 rounded-xl border-2 border-line-soft p-3"
              >
                <span className="text-2xl" aria-hidden>
                  {g.emoji}
                </span>
                <span className="font-bangla flex-1 font-bold">{g.titleBn}</span>
                <span className="text-lg font-extrabold">🏆 {toBn(g.score)}</span>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      {/* -------------------------------------------------------- data tools */}
      <Card className="p-6">
        <h2 className="font-bangla mb-2 text-lg font-bold">💾 আপনার ডেটা</h2>
        <p className="font-bangla mb-4 text-sm text-muted">
          কোনো সার্ভারে কিছু পাঠানো হয় না — সব আপনার ব্রাউজারে। অন্য ডিভাইসে নিতে
          চাইলে ব্যাকআপ ফাইল ডাউনলোড করে সেখানে ইমপোর্ট করুন।
        </p>
        <DataControls />
      </Card>
    </div>
  );
}
