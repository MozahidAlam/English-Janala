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
    hook: "একই কথা দশ রকমে বলা যায় — অর্থ না বদলে চেহারা বদলানোই Transformation।",
    rule: "অর্থ অপরিবর্তিত রেখে বাক্যের গঠন বদলানোকে Transformation বলে — Simple ⇄ Complex ⇄ Compound, Affirmative ⇄ Negative, Assertive ⇄ Interrogative/Exclamatory।",
    points: [
      "Simple → Complex: Participle/Phrase কে Clause বানান",
      "Complex → Compound: Subordinate clause কে and/but/so দিয়ে যোগ করুন",
      "Affirmative → Negative: বিপরীত শব্দ + not বসান",
      "only/alone → none but (ব্যক্তি), nothing but (বস্তু), not more than (সংখ্যা)",
      "must → cannot but / could not but",
      "Assertive → Exclamatory: How/What দিয়ে শুরু করুন",
    ],
    formulas: [
      {
        label: "Simple → Complex",
        formula: "Because of + Noun → Because + Subject + Verb",
        example: "Because of his illness, he failed → Because he was ill, he failed.",
      },
      {
        label: "Affirmative → Negative",
        formula: "Only → None but",
        example: "Only Allah can help us → None but Allah can help us.",
      },
      {
        label: "Assertive → Exclamatory",
        formula: "How + Adjective + Subject + Verb!",
        example: "The girl is very beautiful → How beautiful the girl is!",
      },
      {
        label: "Too … to",
        formula: "too + adj + to = so + adj + that + S + cannot",
        example: "He is too weak to walk → He is so weak that he cannot walk.",
      },
    ],
    examples: [
      "Simple: I know his name. → Complex: I know what his name is.",
      "Complex: As he is honest, everybody likes him. → Compound: He is honest and everybody likes him.",
      "Affirmative: He is a good boy. → Negative: He is not a bad boy.",
      "Assertive: It is a very fine picture. → Exclamatory: What a fine picture it is!",
    ],
    wrongRight: [
      {
        wrong: "He is too weak that he cannot walk.",
        right: "He is so weak that he cannot walk.",
        why: "'too … to' একরকম, 'so … that' আরেকরকম — মেশানো যায় না।",
      },
      {
        wrong: "What beautiful the flower is!",
        right: "How beautiful the flower is!",
        why: "Adjective-এর আগে 'How', Noun-এর আগে 'What a'।",
      },
      {
        wrong: "None but money can make him happy.",
        right: "Nothing but money can make him happy.",
        why: "ব্যক্তির জন্য 'none but', বস্তুর জন্য 'nothing but'।",
      },
    ],
    trick:
      "**How + Adjective, What a + Noun।** *How nice the boy is!* বনাম *What a nice boy he is!*",
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
        explain: "ব্যক্তি বোঝালে 'None but'।",
      },
      {
        q: "‘He is too tired to work.’ — Complex রূপ কোনটি?",
        options: [
          "He is so tired that he cannot work.",
          "He is very tired and cannot work.",
          "He is too tired that he cannot work.",
          "He is tired so he cannot work.",
        ],
        answer: 0,
        explain: "too…to = so…that…cannot।",
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
    ],
    minutes: 8,
  },
];
