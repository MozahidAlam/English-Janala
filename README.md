# English <img width="24" src="./public/assets/logo.png" /> জানালা

বাংলাভাষীদের জন্য English Grammar ও Vocabulary শেখার একটি ফ্রি প্ল্যাটফর্ম — মজার
উদাহরণ, ভুল-ঠিক তুলনা, Spaced Repetition ফ্ল্যাশকার্ড, ফ্রি গ্রামার চেকার আর ৫টি
মিনি-গেম নিয়ে।

**কোনো ডেটাবেজ নেই। কোনো লগইন নেই। কোনো ব্যাকএন্ড নেই।** পুরো অ্যাপটা স্ট্যাটিক
হিসেবে বিল্ড হয়, ডেটা আসে ফ্রি পাবলিক API থেকে, আর আপনার প্রোগ্রেস থাকে আপনার
ব্রাউজারের `localStorage`-এ।

---

## ✨ ফিচার

| মডিউল | কী আছে |
|---|---|
| **📖 Grammar** | ৮ ক্যাটাগরিতে ৪৩টি লেসন — Parts of Speech, ১২টি Tense, Voice, Narration, Article, Preposition, Conditional, Clause, Punctuation, Common Mistakes। প্রতিটিতে বাংলায় নিয়ম, সূত্র, ভুল-ঠিক কার্ড, মনে রাখার কৌশল ও কুইজ |
| **📚 Vocabulary** | লেসনভিত্তিক শব্দ, বাংলা অর্থ ও উচ্চারণ, English definition, IPA, synonym, antonym, collocation, উদাহরণ বাক্য, আসল মানুষের কণ্ঠে অডিও |
| **🧠 Flashcards** | Leitner box Spaced Repetition + ৫টি মোড: ফ্ল্যাশকার্ড, অর্থ বাছাই, উল্টো খেলা, শুনে বলুন, বানান লিখুন |
| **🔎 Grammar Guru** | LanguageTool দিয়ে রিয়েল গ্রামার ও বানান চেকার — ভুল, কারণ, সাজেশন আর এক ক্লিকে সংশোধন |
| **🎮 Games** | Spot the Error, Sentence Builder, Word Match, Hangman, Boss Battle |
| **📊 Progress** | XP, র‍্যাঙ্ক, স্ট্রিক, ১৮টি ব্যাজ, ৯১ দিনের হিটম্যাপ, SRS box distribution, ডেইলি গোল, ব্যাকআপ Export/Import |
| **⚙️ Platform** | PWA (অফলাইনে চলে), ডার্ক মোড, সম্পূর্ণ কীবোর্ড-অ্যাক্সেসিবল, SEO + sitemap + JSON-LD, OG share card |

---

## 🧱 টেক স্ট্যাক

- **Next.js 15** (App Router, ৬০+ পেজ স্ট্যাটিক প্রি-রেন্ডার)
- **TypeScript** (strict)
- **Tailwind CSS v4** — কাস্টম design system, কোনো UI লাইব্রেরি নেই
- **কোনো ডেটাবেজ / ORM / Auth নেই**

### ডেটা সোর্স (সবগুলো কী-বিহীন ও CORS-এনাবলড)

| API | কী দেয় |
|---|---|
| [Programming Hero Open API](https://openapi.programming-hero.com) | লেসন ও শব্দ, বাংলা অর্থ |
| [Free Dictionary API](https://dictionaryapi.dev) | definition, IPA, অডিও, synonym/antonym |
| [Datamuse](https://www.datamuse.com/api/) | collocation, related words, definition fallback |
| [LanguageTool](https://languagetool.org) | গ্রামার ও বানান চেকিং |

> **স্থিতিস্থাপকতা:** তৃতীয় পক্ষের API বন্ধ থাকলেও সাইট চলে। `lib/data/vocabulary.json`-এ
> ১৭০টি শব্দের একটি স্ন্যাপশট বান্ডিল করা আছে, আর dictionaryapi.dev ব্যর্থ হলে
> Datamuse থেকে definition আনা হয়।

---

## 🚀 লোকাল রান

```bash
npm install
npm run dev          # http://localhost:3000
```

অন্যান্য কমান্ড:

```bash
npm run build        # প্রোডাকশন বিল্ড
npm run start        # বিল্ড করা অ্যাপ চালান
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
```

---

## ☁️ Vercel-এ ডিপ্লয়

1. রিপোটি GitHub-এ পুশ করুন।
2. [vercel.com/new](https://vercel.com/new) → রিপো ইমপোর্ট করুন।
3. Framework অটো-ডিটেক্ট হবে (Next.js) — কোনো সেটিং বদলানোর দরকার নেই।
4. **Deploy** চাপুন।

**Environment variable (ঐচ্ছিক কিন্তু সুপারিশকৃত)** — canonical URL, sitemap আর OG
ট্যাগ ঠিক রাখতে:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

কোনো ডেটাবেজ, সিক্রেট বা API key লাগবে না।

---

## 📁 প্রজেক্ট স্ট্রাকচার

```
app/                     রুট ও পেজ (App Router)
  grammar/[slug]/        ৪৩টি লেসন পেজ (SSG)
  games/[slug]/          ৫টি গেম পেজ (SSG)
  vocabulary/ flashcards/ guru/ dashboard/
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx

components/
  layout/   Header, Footer, ThemeToggle, ServiceWorker
  ui/       Button, Card, Modal, ProgressBar, Confetti, Skeleton…
  home/ vocab/ study/ grammar/ guru/ games/ progress/

lib/
  api/      vocabulary.ts, dictionary.ts, languagetool.ts
  content/  grammar/ (৮টি ক্যাটাগরি ফাইল), games.ts, nav.ts
  storage/  progress.ts, srs.ts, badges.ts   ← localStorage ইঞ্জিন
  study/    session.ts                        ← কুইজ/সেশন লজিক
  hooks/    useProgress.tsx, useSpeech.ts
  data/     vocabulary.json                   ← অফলাইন স্ন্যাপশট

scripts/build-fallback.mjs   স্ন্যাপশট রিফ্রেশ করার স্ক্রিপ্ট
```

---

## ➕ নতুন কনটেন্ট যোগ করা

### গ্রামার লেসন

`lib/content/grammar/` এর যেকোনো ক্যাটাগরি ফাইলে একটি অবজেক্ট যোগ করুন:

```ts
{
  slug: "my-topic",
  category: "tense",
  title: "My Topic",
  titleBn: "আমার টপিক",
  hook: "মজার এক লাইনের ভূমিকা",
  rule: "বাংলায় মূল নিয়ম",
  points: ["পয়েন্ট ১", "পয়েন্ট ২"],
  formulas: [{ label: "গঠন", formula: "S + V + O", example: "He eats rice." }],
  examples: ["উদাহরণ বাক্য"],
  wrongRight: [{ wrong: "…", right: "…", why: "কেন" }],
  trick: "মনে রাখার কৌশল",
  quiz: [{ q: "প্রশ্ন?", options: ["ক","খ","গ","ঘ"], answer: 1, explain: "ব্যাখ্যা" }],
  minutes: 6,
}
```

রুট, sitemap, সার্চ, Boss Battle-এর প্রশ্ন আর Spot-the-Error-এর ডেটা — সব
স্বয়ংক্রিয়ভাবে আপডেট হয়ে যাবে।

### শব্দ ভান্ডার রিফ্রেশ

```bash
node scripts/build-fallback.mjs
```

---

## 🔐 প্রাইভেসি

কোনো অ্যাকাউন্ট নেই, কোনো কুকি নেই, কোনো অ্যানালিটিক্স নেই। আপনার XP, স্ট্রিক,
ব্যাজ আর শেখা শব্দ শুধু আপনার ব্রাউজারে থাকে। Grammar Guru-তে লেখা টেক্সট
LanguageTool-এ পাঠানো হয় চেক করার জন্য, কিন্তু কোথাও সংরক্ষণ করা হয় না।

অন্য ডিভাইসে প্রোগ্রেস নিতে চাইলে **Progress → 💾 আপনার ডেটা → প্রোগ্রেস ব্যাকআপ**
থেকে ফাইল নামিয়ে সেখানে ইমপোর্ট করুন।
