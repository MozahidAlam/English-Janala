"use client";

import type { ProgressState } from "@/lib/types";
import { heatmapDays } from "@/lib/storage/progress";
import { toBn } from "@/lib/utils";

const LEVELS = ["#e8e2d4", "#a8e6d2", "#5fd3b0", "#22b98d", "#0e8f6c"];

function levelFor(xp: number, goal: number): number {
  if (xp <= 0) return 0;
  const ratio = xp / Math.max(1, goal);
  if (ratio < 0.34) return 1;
  if (ratio < 0.67) return 2;
  if (ratio < 1) return 3;
  return 4;
}

/** 13-week activity grid, newest column on the right. */
export function Heatmap({ state }: { state: ProgressState }) {
  const days = heatmapDays(state, 91);
  const weeks: Array<Array<{ date: string; xp: number }>> = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const total = days.reduce((s, d) => s + d.xp, 0);
  const active = days.filter((d) => d.xp > 0).length;

  return (
    <div>
      <div className="font-bangla mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-bold">📅 গত ৩ মাস</h3>
        <p className="text-sm text-muted">
          {toBn(active)} দিন সক্রিয় · {toBn(total)} XP
        </p>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1" role="img" aria-label={`গত ৯১ দিনে ${active} দিন সক্রিয় ছিলেন`}>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day) => (
                <span
                  key={day.date}
                  title={`${day.date} — ${day.xp} XP`}
                  className="h-3.5 w-3.5 rounded-[3px] border border-line-soft"
                  style={{ backgroundColor: LEVELS[levelFor(day.xp, state.dailyGoal)] }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="font-bangla mt-2 flex items-center gap-1.5 text-xs text-muted">
        <span>কম</span>
        {LEVELS.map((c) => (
          <span
            key={c}
            className="h-3 w-3 rounded-[3px] border border-line-soft"
            style={{ backgroundColor: c }}
          />
        ))}
        <span>বেশি</span>
      </div>
    </div>
  );
}
