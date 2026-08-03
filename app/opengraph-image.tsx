import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "English Janala — learn English grammar and vocabulary in Bangla";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card. Kept to Latin text on purpose — ImageResponse ships only a
 * Latin font by default, so Bangla glyphs would render as boxes.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          backgroundColor: "#fffaf0",
          backgroundImage:
            "linear-gradient(#e8e0cd 1px, transparent 1px), linear-gradient(90deg, #e8e0cd 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            border: "3px solid #16151d",
            borderRadius: 999,
            backgroundColor: "#ffb020",
            padding: "10px 26px",
            fontSize: 26,
            fontWeight: 800,
            color: "#16151d",
            boxShadow: "5px 5px 0 #16151d",
          }}
        >
          100% FREE · NO LOGIN · BANGLA EXPLANATIONS
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 132,
            fontWeight: 800,
            color: "#16151d",
            marginTop: 34,
            letterSpacing: -4,
          }}
        >
          English Janala
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#46445a",
            marginTop: 12,
            maxWidth: 900,
          }}
        >
          Full English grammar, spaced-repetition vocabulary, a free grammar
          checker and 5 mini-games.
        </div>

        <div style={{ display: "flex", gap: 18, marginTop: 46 }}>
          {[
            { label: "43 lessons", color: "#1a91ff" },
            { label: "170+ words", color: "#14c39a" },
            { label: "5 games", color: "#e94ea8" },
            { label: "0 taka", color: "#7c5cff" },
          ].map((chip) => (
            <div
              key={chip.label}
              style={{
                display: "flex",
                border: "3px solid #16151d",
                borderRadius: 18,
                backgroundColor: chip.color,
                padding: "14px 26px",
                fontSize: 30,
                fontWeight: 800,
                color: "#ffffff",
                boxShadow: "5px 5px 0 #16151d",
              }}
            >
              {chip.label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
