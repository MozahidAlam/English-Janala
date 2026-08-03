import type { GrammarLesson } from "@/lib/types";

export const SENTENCE_LESSONS: readonly GrammarLesson[] = [
  {
    slug: "voice",
    category: "sentence",
    title: "Active & Passive Voice",
    titleBn: "বাচ্য পরিবর্তন",
    hook: "‘আমি ভাত খাই’ আর ‘ভাত আমার দ্বারা খাওয়া হয়’ — দ্বিতীয়টা শুনতে অদ্ভুত, কিন্তু ইংরেজিতে এটাই Passive Voice।",
    rule: "Active Voice-এ কর্তা প্রধান, Passive Voice-এ কর্ম প্রধান। Passive-এ Object সামনে আসে, Verb হয় be + V3, আর মূল Subject 'by'-এর পরে যায়।",
    points: [
      "শুধুমাত্র Transitive Verb-এর Passive হয় (object লাগে এমন verb)",
      "Passive-এ verb সবসময় be-verb + V3",
      "Tense অনুযায়ী be-verb বদলায়, V3 বদলায় না",
      "Perfect Continuous ও Future Continuous-এর Passive সাধারণত ব্যবহৃত হয় না",
      "কর্তা অজানা/অপ্রয়োজনীয় হলে 'by + কর্তা' বাদ দেওয়া যায়",
      "Imperative-এর Passive: Let + object + be + V3",
    ],
    formulas: [
      { label: "Present Simple", formula: "am/is/are + V3", example: "Rice is eaten by me." },
      { label: "Present Continuous", formula: "am/is/are being + V3", example: "Rice is being eaten." },
      { label: "Present Perfect", formula: "have/has been + V3", example: "Rice has been eaten." },
      { label: "Past Simple", formula: "was/were + V3", example: "Rice was eaten." },
      { label: "Past Continuous", formula: "was/were being + V3", example: "Rice was being eaten." },
      { label: "Past Perfect", formula: "had been + V3", example: "Rice had been eaten." },
      { label: "Future Simple", formula: "will be + V3", example: "Rice will be eaten." },
      { label: "Modal", formula: "Modal + be + V3", example: "Rice can be eaten." },
      { label: "Imperative", formula: "Let + object + be + V3", example: "Let the door be opened." },
    ],
    examples: [
      "Active: They are building a house. → Passive: A house is being built by them.",
      "Active: Someone has stolen my bike. → Passive: My bike has been stolen.",
      "Active: Open the window. → Passive: Let the window be opened.",
      "Active: Who broke the glass? → Passive: By whom was the glass broken?",
    ],
    wrongRight: [
      {
        wrong: "The work is done by him yesterday.",
        right: "The work was done by him yesterday.",
        why: "yesterday = past, তাই be-verb-ও past হবে — 'was'।",
      },
      {
        wrong: "A house is being build by them.",
        right: "A house is being built by them.",
        why: "Passive-এ সবসময় V3 — build-এর V3 হলো 'built'।",
      },
      {
        wrong: "He was gone to school by me.",
        right: "He went to school.",
        why: "'go' Intransitive Verb — এর Passive হয় না।",
      },
    ],
    trick:
      "তিন ধাপ: **① Object সামনে আনুন ② Tense অনুযায়ী be-verb বসান ③ মূল verb-কে V3 বানান।** Subject-কে 'by'-এর পরে পাঠিয়ে দিন।",
    quiz: [
      {
        q: "‘They are repairing the road.’ — এর Passive কোনটি?",
        options: [
          "The road is repaired by them.",
          "The road is being repaired by them.",
          "The road was being repaired by them.",
          "The road has been repaired by them.",
        ],
        answer: 1,
        explain: "Present Continuous-এর Passive: am/is/are being + V3।",
      },
      {
        q: "‘Do it now.’ — এর Passive কোনটি?",
        options: [
          "It is done now.",
          "Let it be done now.",
          "It was done now.",
          "It has been done now.",
        ],
        answer: 1,
        explain: "Imperative-এর Passive: Let + object + be + V3।",
      },
      {
        q: "‘The letter ___ by him last week.’",
        options: ["is written", "was written", "has written", "is being written"],
        answer: 1,
        explain: "last week = Past Simple — was/were + V3।",
      },
      {
        q: "‘This problem can ___ easily.’",
        options: ["solve", "be solved", "solved", "being solved"],
        answer: 1,
        explain: "Modal-এর Passive: Modal + be + V3।",
      },
    ],
    minutes: 9,
  },
  {
    slug: "narration",
    category: "sentence",
    title: "Narration (Direct ⇄ Indirect)",
    titleBn: "উক্তি পরিবর্তন",
    hook: "কেউ কিছু বলল, আর আপনি সেটা অন্যকে বললেন — মাঝখানে Tense, Pronoun আর সময় সব বদলে গেল। এটাই Narration।",
    rule: "কারো কথা হুবহু উদ্ধৃত করলে Direct Speech, আর নিজের ভাষায় বললে Indirect Speech। Reporting Verb past হলে Reported Speech-এর Tense এক ধাপ পিছিয়ে যায়।",
    points: [
      "Reporting Verb Present/Future হলে Tense বদলায় না",
      "Reporting Verb Past হলে: Present→Past, Past→Past Perfect, will→would",
      "Pronoun বদলায় SON নিয়মে — Subject, Object, Nominative",
      "চিরন্তন সত্য বা অভ্যাসগত সত্যের Tense বদলায় না",
      "Assertive → that | Interrogative → if/whether বা wh-word | Imperative → to/not to | Optative → wished/prayed",
    ],
    formulas: [
      {
        label: "Assertive",
        formula: "S + said that + Reported Speech",
        example: 'He said, "I am ill." → He said that he was ill.',
      },
      {
        label: "Interrogative (Yes/No)",
        formula: "S + asked + if/whether + S + V",
        example: 'He said, "Do you know him?" → He asked if I knew him.',
      },
      {
        label: "Interrogative (Wh-)",
        formula: "S + asked + wh-word + S + V",
        example: 'He said, "Where do you live?" → He asked where I lived.',
      },
      {
        label: "Imperative",
        formula: "S + told/ordered/requested + object + to + V1",
        example: 'He said, "Go there." → He ordered me to go there.',
      },
      {
        label: "Optative",
        formula: "S + wished/prayed that + S + might…",
        example: 'He said, "May you live long." → He wished that I might live long.',
      },
    ],
    examples: [
      "now → then | today → that day | tomorrow → the next day | yesterday → the previous day",
      "here → there | this → that | these → those | ago → before",
      'She said, "I will come tomorrow." → She said that she would come the next day.',
      'He said, "The sun rises in the east." → He said that the sun rises in the east. (সত্য, তাই অপরিবর্তিত)',
    ],
    wrongRight: [
      {
        wrong: 'He said that he is ill.',
        right: "He said that he was ill.",
        why: "Reporting verb past (said), তাই Reported speech-ও এক ধাপ পিছিয়ে past হবে।",
      },
      {
        wrong: "He asked me that where I was going.",
        right: "He asked me where I was going.",
        why: "Wh-question-এ 'that' বসে না, wh-word নিজেই connector।",
      },
      {
        wrong: "He asked if did I know him.",
        right: "He asked if I knew him.",
        why: "Indirect-এ প্রশ্নের গঠন বদলে বিবৃতির মতো (Subject + Verb) হয়ে যায়।",
      },
    ],
    trick:
      "মনে রাখুন **PT-CS**: **P**ronoun, **T**ense, **C**onnector, **S** (Sign/time-place word) — এই চারটা বদলালেই Narration শেষ।",
    quiz: [
      {
        q: '‘He said, "I am busy now."’ — Indirect কোনটি?',
        options: [
          "He said that I am busy now.",
          "He said that he was busy then.",
          "He said that he is busy then.",
          "He told that he was busy now.",
        ],
        answer: 1,
        explain: "Pronoun I→he, Tense am→was, now→then।",
      },
      {
        q: '‘She said to me, "Please help me."’ — Indirect কোনটি?',
        options: [
          "She requested me to help her.",
          "She said me to help her.",
          "She told that I help her.",
          "She asked me that help her.",
        ],
        answer: 0,
        explain: "Please থাকলে Imperative → requested + to + V1।",
      },
      {
        q: '‘He said, "Water boils at 100°C."’ — Indirect-এ Tense কী হবে?',
        options: [
          "boiled",
          "boils (অপরিবর্তিত)",
          "had boiled",
          "was boiling",
        ],
        answer: 1,
        explain: "বৈজ্ঞানিক সত্যের Tense বদলায় না।",
      },
    ],
    minutes: 10,
  },
  {
    slug: "conditionals",
    category: "sentence",
    title: "Conditionals (If Clause)",
    titleBn: "শর্তবাচক বাক্য",
    hook: "‘যদি বৃষ্টি হয়…’ — বাংলায় এক রকম, ইংরেজিতে চার রকম! কোনটা বাস্তব, কোনটা কল্পনা, সেটাই আসল খেলা।",
    rule: "If-clause শর্ত প্রকাশ করে। বাস্তবতার মাত্রা অনুযায়ী চার ধরনের Conditional আছে, প্রত্যেকটির নির্দিষ্ট Tense-জোড়া আছে।",
    points: [
      "Type 0 — চিরন্তন সত্য: If + Present, Present",
      "Type 1 — বাস্তব সম্ভাবনা (ভবিষ্যৎ): If + Present Simple, will + V1",
      "Type 2 — বর্তমানের অবাস্তব কল্পনা: If + Past Simple, would + V1",
      "Type 3 — অতীতের অপূর্ণ কল্পনা: If + had + V3, would have + V3",
      "If-clause-এ কখনো 'will' বসে না",
      "Type 2-এ সব person-এর সাথে 'were' বসে: If I were you…",
    ],
    formulas: [
      { label: "Type 0", formula: "If + Present, Present", example: "If you heat ice, it melts." },
      { label: "Type 1", formula: "If + Present Simple, will + V1", example: "If it rains, I will stay home." },
      { label: "Type 2", formula: "If + Past Simple, would + V1", example: "If I were rich, I would travel." },
      {
        label: "Type 3",
        formula: "If + had + V3, would have + V3",
        example: "If I had studied, I would have passed.",
      },
      {
        label: "Unless",
        formula: "Unless = If … not",
        example: "Unless you hurry, you will miss the bus.",
      },
    ],
    examples: [
      "If you touch fire, you get burnt. (Type 0)",
      "If he comes, I will meet him. (Type 1)",
      "If I were a bird, I would fly. (Type 2)",
      "If she had told me, I would have helped her. (Type 3)",
    ],
    wrongRight: [
      {
        wrong: "If it will rain, we will cancel the trip.",
        right: "If it rains, we will cancel the trip.",
        why: "If-clause-এ 'will' বসে না — Present Simple বসে।",
      },
      {
        wrong: "If I was you, I would accept the offer.",
        right: "If I were you, I would accept the offer.",
        why: "Type 2-এর অবাস্তব কল্পনায় সব person-এ 'were' বসে।",
      },
      {
        wrong: "If he had come, I would help him.",
        right: "If he had come, I would have helped him.",
        why: "Type 3-এ দুই পাশেই perfect রূপ — had + V3 / would have + V3।",
      },
      {
        wrong: "Unless you don't work hard, you will fail.",
        right: "Unless you work hard, you will fail.",
        why: "Unless-এর মধ্যেই 'not' আছে — আবার not বসালে double negative হয়।",
      },
    ],
    trick:
      "**If-এর ঘরে ‘will’ ঢোকা নিষেধ।** আর মিলিয়ে রাখুন: Present↔will, Past↔would, had+V3↔would have+V3।",
    quiz: [
      {
        q: "‘If I ___ the answer, I would tell you.’",
        options: ["know", "knew", "had known", "will know"],
        answer: 1,
        explain: "Type 2 — If + Past Simple, would + V1।",
      },
      {
        q: "‘If she had worked harder, she ___ the exam.’",
        options: ["would pass", "will pass", "would have passed", "passed"],
        answer: 2,
        explain: "Type 3 — would have + V3।",
      },
      {
        q: "‘___ you leave now, you will be late.’",
        options: ["Unless", "If", "Although", "Because"],
        answer: 0,
        explain: "'যদি না' অর্থে Unless বসে।",
      },
      {
        q: "কোনটি ভুল?",
        options: [
          "If it rains, I will stay home.",
          "If it will rain, I will stay home.",
          "If I were you, I would go.",
          "If you heat water, it boils.",
        ],
        answer: 1,
        explain: "If-clause-এ will ব্যবহার করা যায় না।",
      },
    ],
    minutes: 9,
  },
  {
    slug: "degrees-of-comparison",
    category: "sentence",
    title: "Degrees of Comparison",
    titleBn: "তুলনামূলক পরিবর্তন",
    hook: "ভালো → আরও ভালো → সবচেয়ে ভালো। তিন ধাপে দুনিয়ার সব তুলনা হয়ে যায়।",
    rule: "Adjective ও Adverb-এর তিনটি অবস্থা: Positive (সাধারণ), Comparative (দুইয়ের তুলনা), Superlative (তিন বা তার বেশির মধ্যে সেরা)।",
    points: [
      "এক-অক্ষরের শব্দে -er/-est: tall → taller → tallest",
      "লম্বা শব্দে more/most: beautiful → more beautiful → most beautiful",
      "অনিয়মিত: good→better→best, bad→worse→worst, many/much→more→most, little→less→least",
      "Comparative-এ 'than', Superlative-এ 'the' + 'of/in'",
      "Latin comparative (superior, inferior, senior, junior, prior)-এর পরে 'than' নয়, 'to' বসে",
      "Double comparative/superlative ভুল: more better ❌",
    ],
    formulas: [
      {
        label: "Positive → Comparative",
        formula: "No other + Noun + is as … as + X → X is …-er than any other + Noun",
        example: "No other boy is as tall as Rahim → Rahim is taller than any other boy.",
      },
      {
        label: "Positive → Superlative",
        formula: "X is the …-est + Noun",
        example: "Rahim is the tallest boy in the class.",
      },
      {
        label: "সমান তুলনা",
        formula: "as + Positive + as",
        example: "He is as strong as his brother.",
      },
    ],
    examples: [
      "Dhaka is the largest city in Bangladesh.",
      "This book is more interesting than that one.",
      "He is senior to me. (❌ senior than)",
      "Very few boys are as bright as he.",
    ],
    wrongRight: [
      {
        wrong: "He is more taller than me.",
        right: "He is taller than me.",
        why: "-er আর more একসাথে বসে না।",
      },
      {
        wrong: "He is superior than me.",
        right: "He is superior to me.",
        why: "superior/inferior/senior/junior/prior-এর পরে 'to' বসে।",
      },
      {
        wrong: "Rahim is taller than any boy in the class.",
        right: "Rahim is taller than any other boy in the class.",
        why: "রহিম নিজেও ক্লাসের ছেলে — তাই 'any other' লাগবে, নইলে সে নিজের চেয়ে লম্বা হয়ে যায়!",
      },
    ],
    trick:
      "**superior, inferior, senior, junior, prior, preferable** — এই ছয়জন ‘than’ পছন্দ করে না, ‘to’ ভালোবাসে।",
    quiz: [
      {
        q: "‘He is ___ than his brother.’",
        options: ["more intelligent", "most intelligent", "intelligenter", "more intelligenter"],
        answer: 0,
        explain: "লম্বা adjective-এ more + adjective + than।",
      },
      {
        q: "‘She is junior ___ me.’",
        options: ["than", "to", "from", "of"],
        answer: 1,
        explain: "Latin comparative-এর পরে 'to'।",
      },
      {
        q: "‘No other student is as brilliant as Karim.’ — Superlative কোনটি?",
        options: [
          "Karim is more brilliant than any student.",
          "Karim is the most brilliant student.",
          "Karim is as brilliant as others.",
          "Karim is brilliant.",
        ],
        answer: 1,
        explain: "'No other … as … as' মানে সে-ই সেরা — Superlative।",
      },
    ],
    minutes: 7,
  },
  {
    slug: "transformation",
    category: "sentence",
    title: "Transformation of Sentences",
    titleBn: "বাক্য রূপান্তর",
    hook: "একই কথা দশ রকমে বলা যায় — অর্থ না বদলে চেহারা বদলানোই Transformation। পরীক্ষার সবচেয়ে বড় নম্বরদাতা অধ্যায়।",
    rule: "অর্থ অপরিবর্তিত রেখে বাক্যের গঠন বদলানোকে Transformation বলে। মূলত ছয় ভাগে এটি হয় — ① গঠন অনুযায়ী (Simple ⇄ Complex ⇄ Compound), ② Affirmative ⇄ Negative, ③ Assertive ⇄ Interrogative, ④ Assertive ⇄ Exclamatory, ⑤ Degree পরিবর্তন, ⑥ Voice ও Narration পরিবর্তন।",
    points: [
      "Simple Sentence — একটিমাত্র Finite Verb, একটিই clause",
      "Complex Sentence — একটি Principal + এক বা একাধিক Subordinate Clause",
      "Compound Sentence — দুই বা ততোধিক Principal Clause, and/but/or/so দিয়ে যুক্ত",
      "Simple → Complex: Phrase-কে Clause বানাতে হয় (because, though, that, when, who ইত্যাদি যোগ করে)",
      "Complex → Simple: Clause-কে Phrase বানাতে হয় (Participle, Infinitive, Preposition + Noun দিয়ে)",
      "Complex → Compound: Subordinate Clause-কে স্বাধীন করে and/but/so দিয়ে জুড়তে হয়",
      "Affirmative → Negative: বিপরীত শব্দ + not, অথবা নির্দিষ্ট structure ব্যবহার করতে হয়",
      "Assertive → Interrogative: Affirmative হলে Negative প্রশ্ন, Negative হলে Affirmative প্রশ্ন",
      "Assertive → Exclamatory: Adjective-এর আগে How, Noun-এর আগে What a বসে",
      "Degree পরিবর্তনে অর্থ এক রেখে Positive ⇄ Comparative ⇄ Superlative করতে হয়",
      "রূপান্তরের পরেও Tense, Person ও অর্থ অবশ্যই অপরিবর্তিত থাকতে হবে",
    ],
    formulas: [
      {
        label: "① Simple → Complex (কারণ)",
        formula: "Because of + Noun → Because + Subject + Verb",
        example: "Because of his illness, he failed. → Because he was ill, he failed.",
      },
      {
        label: "① Simple → Complex (সত্ত্বেও)",
        formula: "In spite of + Noun → Though/Although + S + V",
        example: "In spite of his poverty, he is happy. → Though he is poor, he is happy.",
      },
      {
        label: "① Simple → Complex (বিশেষণ)",
        formula: "Adjective + Noun → Noun + who/which/that + is/was + Adjective",
        example: "The honest man is respected. → The man who is honest is respected.",
      },
      {
        label: "① Simple → Complex (উদ্দেশ্য)",
        formula: "to + V1 → so that + S + can/could/may/might + V1",
        example: "He works hard to succeed. → He works hard so that he can succeed.",
      },
      {
        label: "② Complex → Simple (Participle)",
        formula: "When/As + S + V → V-ing / Having + V3",
        example: "When he saw me, he ran away. → Seeing me, he ran away.",
      },
      {
        label: "② Complex → Simple (Preposition)",
        formula: "Because + S + V → Because of / Owing to + Noun",
        example: "Because he was ill, he failed. → Because of his illness, he failed.",
      },
      {
        label: "③ Simple → Compound",
        formula: "Participle/Phrase → Finite Verb + and",
        example: "Being ill, he could not come. → He was ill and could not come.",
      },
      {
        label: "③ Complex → Compound (কারণ)",
        formula: "Because + S + V, S + V → S + V + and so / therefore + S + V",
        example: "Because he was ill, he did not come. → He was ill and so he did not come.",
      },
      {
        label: "③ Complex → Compound (সত্ত্বেও)",
        formula: "Though + S + V, S + V → S + V + but + S + V",
        example: "Though he is poor, he is honest. → He is poor but he is honest.",
      },
      {
        label: "③ Complex → Compound (শর্ত)",
        formula: "If + S + V, S + will + V → Imperative + or/otherwise + S + will + V",
        example: "If you run fast, you will catch the bus. → Run fast, or you will miss the bus.",
      },
      {
        label: "④ Negative করা (only / alone)",
        formula: "only/alone → none but (ব্যক্তি) / nothing but (বস্তু) / not more than (সংখ্যা)",
        example: "Only Allah can help us. → None but Allah can help us.",
      },
      {
        label: "④ Negative করা (must)",
        formula: "must → cannot but + V1 / could not but + V1",
        example: "I must go there. → I cannot but go there.",
      },
      {
        label: "④ Negative করা (as soon as)",
        formula: "As soon as + S + V2 → No sooner had + S + V3 + than + S + V2",
        example: "As soon as he came, it rained. → No sooner had he come than it rained.",
      },
      {
        label: "④ Negative করা (both … and)",
        formula: "both … and → not only … but also",
        example: "He is both wise and brave. → He is not only wise but also brave.",
      },
      {
        label: "④ Negative করা (every)",
        formula: "Every + Noun → There is no + Noun + but",
        example: "Every mother loves her child. → There is no mother but loves her child.",
      },
      {
        label: "④ Negative করা (as … as)",
        formula: "as + adj + as → not less + adj + than",
        example: "He is as wise as you. → He is not less wise than you.",
      },
      {
        label: "④ Negative করা (Superlative)",
        formula: "X is the best → No other … is so/as good as X",
        example: "He is the best boy. → No other boy is so good as he.",
      },
      {
        label: "④ শব্দ বদলে Negative",
        formula: "always → never | many → not a few | a few → not many | sometimes → not always",
        example: "He always tells a lie. → He never speaks the truth.",
      },
      {
        label: "⑤ Assertive → Interrogative",
        formula: "Affirmative → Negative প্রশ্ন | Negative → Affirmative প্রশ্ন",
        example: "He is a good boy. → Isn't he a good boy?",
      },
      {
        label: "⑤ Assertive → Interrogative (no use)",
        formula: "There is no use of + V-ing → What is the use of + V-ing?",
        example: "There is no use of crying. → What is the use of crying?",
      },
      {
        label: "⑤ Assertive → Interrogative (never)",
        formula: "S + never + V → Did/Does + S + ever + V1?",
        example: "He never told a lie. → Did he ever tell a lie?",
      },
      {
        label: "⑥ Assertive → Exclamatory (How)",
        formula: "How + Adjective + Subject + Verb!",
        example: "The girl is very beautiful. → How beautiful the girl is!",
      },
      {
        label: "⑥ Assertive → Exclamatory (What a)",
        formula: "What a/an + Adjective + Noun + Subject + Verb!",
        example: "It is a very fine picture. → What a fine picture it is!",
      },
      {
        label: "⑥ Exclamatory → Assertive",
        formula: "Subject + Verb + very + Adjective",
        example: "How lovely the scene is! → The scene is very lovely.",
      },
      {
        label: "⑦ Degree: Positive → Comparative",
        formula: "No other + N + is as … as + X → X is …-er than any other + N",
        example: "No other boy is as tall as Rahim. → Rahim is taller than any other boy.",
      },
      {
        label: "⑦ Degree: → Superlative",
        formula: "X is the …-est + Noun + in/of …",
        example: "Rahim is the tallest boy in the class.",
      },
      {
        label: "⑧ too … to",
        formula: "too + adj + to + V1 = so + adj + that + S + cannot/could not + V1",
        example: "He is too weak to walk. → He is so weak that he cannot walk.",
      },
      {
        label: "⑧ enough to",
        formula: "so + adj + that + S + can + V1 = adj + enough + to + V1",
        example: "He is so strong that he can lift it. → He is strong enough to lift it.",
      },
    ],
    examples: [
      "Simple: I know his name. → Complex: I know what his name is.",
      "Simple: Being tired, he stopped. → Complex: As he was tired, he stopped. → Compound: He was tired and so he stopped.",
      "Affirmative: He is a great poet. → Negative: He is not an ordinary poet.",
      "Affirmative: I shall remember it. → Negative: I shall never forget it.",
      "Assertive: Nobody can deny it. → Interrogative: Who can deny it?",
      "Assertive: It is a very beautiful bird. → Exclamatory: What a beautiful bird it is!",
      "Positive: Very few metals are as useful as iron. → Comparative: Iron is more useful than most other metals. → Superlative: Iron is one of the most useful metals.",
      "Active: He wrote a letter. → Passive: A letter was written by him. (বিস্তারিত Voice লেসনে)",
    ],
    wrongRight: [
      {
        wrong: "He is too weak that he cannot walk.",
        right: "He is so weak that he cannot walk.",
        why: "‘too … to’ একরকম গঠন, ‘so … that’ আরেকরকম — দুটো মেশানো যায় না।",
      },
      {
        wrong: "What beautiful the flower is!",
        right: "How beautiful the flower is!",
        why: "Adjective-এর আগে ‘How’, আর Noun-এর আগে ‘What a’ বসে।",
      },
      {
        wrong: "None but money can make him happy.",
        right: "Nothing but money can make him happy.",
        why: "ব্যক্তির জন্য ‘none but’, বস্তুর জন্য ‘nothing but’।",
      },
      {
        wrong: "No sooner he had come than it rained.",
        right: "No sooner had he come than it rained.",
        why: "‘No sooner’ দিয়ে বাক্য শুরু হলে auxiliary verb subject-এর আগে বসে (inversion)।",
      },
      {
        wrong: "Though he is poor, but he is honest.",
        right: "Though he is poor, he is honest.",
        why: "Complex-এ ‘Though’ থাকলে ‘but’ বসে না। Compound করতে চাইলে ‘He is poor but he is honest’ লিখতে হবে।",
      },
      {
        wrong: "Rahim is taller than any boy in the class.",
        right: "Rahim is taller than any other boy in the class.",
        why: "রহিম নিজেও ওই ক্লাসের ছেলে — ‘any other’ না লিখলে সে নিজের চেয়েই লম্বা হয়ে যায়।",
      },
    ],
    trick:
      "**How + Adjective, What a + Noun।** আর গঠন চেনার সহজ উপায় — Finite Verb একটা হলে Simple, Connector (because/though/that/who) থাকলে Complex, আর and/but/so দিয়ে দুটো স্বাধীন clause জোড়া থাকলে Compound।",
    quiz: [
      {
        q: "‘Only he can solve it.’ — Negative রূপ কোনটি?",
        options: [
          "Nothing but he can solve it.",
          "None but he can solve it.",
          "Not only he can solve it.",
          "He cannot solve it.",
        ],
        answer: 1,
        explain: "ব্যক্তি বোঝালে ‘None but’ বসে।",
      },
      {
        q: "‘He is too tired to work.’ — সমার্থক গঠন কোনটি?",
        options: [
          "He is so tired that he cannot work.",
          "He is very tired and cannot work.",
          "He is too tired that he cannot work.",
          "He is tired enough to work.",
        ],
        answer: 0,
        explain: "too … to = so … that … cannot।",
      },
      {
        q: "‘The scenery is very charming.’ — Exclamatory কোনটি?",
        options: [
          "What charming the scenery is!",
          "How charming the scenery is!",
          "How a charming scenery it is!",
          "What the scenery is charming!",
        ],
        answer: 1,
        explain: "Adjective-এর আগে How বসে।",
      },
      {
        q: "‘Because he was ill, he did not come.’ — Compound রূপ কোনটি?",
        options: [
          "He was ill and so he did not come.",
          "Being ill, he did not come.",
          "Because of illness, he did not come.",
          "Though he was ill, he did not come.",
        ],
        answer: 0,
        explain: "Compound-এ দুটি স্বাধীন clause ‘and so’ দিয়ে যুক্ত হয়।",
      },
      {
        q: "‘As soon as the bell rang, the students left.’ — Negative রূপ কোনটি?",
        options: [
          "No sooner the bell rang than the students left.",
          "No sooner had the bell rung than the students left.",
          "Not sooner had the bell rung than the students left.",
          "As soon as the bell had rung, the students left.",
        ],
        answer: 1,
        explain: "No sooner had + S + V3 + than + S + V2 (inversion সহ)।",
      },
      {
        q: "‘When he saw me, he ran away.’ — Simple রূপ কোনটি?",
        options: [
          "Seeing me, he ran away.",
          "He saw me and ran away.",
          "As he saw me, he ran away.",
          "Because of seeing, he ran away.",
        ],
        answer: 0,
        explain: "Clause-কে Participle Phrase বানালে Simple Sentence হয়।",
      },
    ],
    minutes: 14,
  },
];
