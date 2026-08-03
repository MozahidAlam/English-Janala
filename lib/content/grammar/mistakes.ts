import type { GrammarLesson } from "@/lib/types";

export const MISTAKE_LESSONS: readonly GrammarLesson[] = [
  {
    slug: "bangladeshi-common-mistakes",
    category: "mistakes",
    title: "Top Bangladeshi English Mistakes",
    titleBn: "আমরা যে ভুলগুলো রোজ করি",
    hook: "‘I am agree with you’ — এই বাক্যটা বাংলাদেশের প্রতিটি অফিসে প্রতিদিন অন্তত একশোবার বলা হয়। আজ থেকে বন্ধ! 😤",
    rule: "বাংলা থেকে সরাসরি অনুবাদ করার কারণে কিছু নির্দিষ্ট ভুল আমরা বারবার করি। এগুলো একবার ধরে ফেললে ইংরেজি অনেক নির্ভুল হয়ে যায়।",
    points: [
      "agree একটি Verb, Adjective নয় — তাই 'am/is/are' লাগে না",
      "discuss, enter, marry, resemble, lack — এদের পরে preposition বসে না",
      "advice (Noun) vs advise (Verb) — বানান আলাদা, অর্থও",
      "'Give exam' নয়, 'take/sit for an exam'",
      "'Cope up with' নয়, 'cope with'",
      "'Since long' নয়, 'for a long time'",
    ],
    formulas: [
      {
        label: "agree",
        formula: "S + agree with (ব্যক্তি) / agree to (প্রস্তাব)",
        example: "I agree with you. I agree to the proposal.",
      },
      {
        label: "Preposition লাগে না",
        formula: "discuss / enter / marry / resemble / lack + object",
        example: "We discussed the matter.",
      },
    ],
    examples: [
      "❌ I am agree → ✅ I agree",
      "❌ Discuss about → ✅ Discuss",
      "❌ Cope up with → ✅ Cope with",
      "❌ Give an exam → ✅ Take an exam",
      "❌ Since long → ✅ For a long time",
      "❌ Do the needful (পুরোনো/অস্বাভাবিক) → ✅ Please take the necessary action",
    ],
    wrongRight: [
      {
        wrong: "I am agree with your decision.",
        right: "I agree with your decision.",
        why: "agree নিজেই Verb — এর সাথে be-verb বসে না।",
      },
      {
        wrong: "He is my cousin brother.",
        right: "He is my cousin.",
        why: "'cousin' শব্দেই সম্পর্ক বোঝায়। 'cousin brother/sister' ইংরেজিতে নেই।",
      },
      {
        wrong: "I will give the exam next week.",
        right: "I will take the exam next week.",
        why: "শিক্ষক exam 'give' করেন, ছাত্র 'take' করে।",
      },
      {
        wrong: "Please revert back to me.",
        right: "Please reply to me.",
        why: "revert মানে ফিরে যাওয়া, উত্তর দেওয়া নয়। আর 'revert back' দ্বিরুক্তি।",
      },
      {
        wrong: "He is passed in the exam.",
        right: "He has passed the exam.",
        why: "pass এখানে Active — 'is passed' Passive হয়ে ভুল অর্থ দেয়।",
      },
      {
        wrong: "My all family members are fine.",
        right: "All my family members are fine.",
        why: "Determiner-এর সঠিক ক্রম: All → my → noun।",
      },
    ],
    trick:
      "**‘am/is/are + Verb’ দেখলেই সন্দেহ করুন।** agree, know, understand, belong — এরা Verb, এদের সামনে be-verb বসালেই ভুল।",
    quiz: [
      {
        q: "কোনটি সঠিক?",
        options: [
          "I am agree with you.",
          "I agree with you.",
          "I am agreed with you.",
          "I am agreeing with you.",
        ],
        answer: 1,
        explain: "agree একটি Verb — be-verb লাগে না।",
      },
      {
        q: "কোনটি সঠিক?",
        options: [
          "We discussed about the issue.",
          "We discussed on the issue.",
          "We discussed the issue.",
          "We discussed for the issue.",
        ],
        answer: 2,
        explain: "discuss-এর পরে সরাসরি object বসে।",
      },
      {
        q: "‘আমি পরীক্ষা দেব’ — সঠিক ইংরেজি কোনটি?",
        options: [
          "I will give the exam.",
          "I will take the exam.",
          "I will do the exam.",
          "I will put the exam.",
        ],
        answer: 1,
        explain: "ছাত্র পরীক্ষা 'take' করে।",
      },
      {
        q: "কোনটি সঠিক?",
        options: [
          "He is my cousin brother.",
          "He is my cousin.",
          "He is my brother cousin.",
          "He is my cousin's brother relation.",
        ],
        answer: 1,
        explain: "'cousin' একাই যথেষ্ট।",
      },
    ],
    minutes: 8,
  },
  {
    slug: "preposition-mistakes",
    category: "mistakes",
    title: "Preposition Traps",
    titleBn: "প্রিপোজিশনের ফাঁদ",
    hook: "কোন Verb-এর সাথে কোন Preposition — এটা যুক্তি দিয়ে হয় না, চর্চা দিয়ে হয়। ফাঁদগুলো চিনে রাখুন।",
    rule: "নির্দিষ্ট Verb, Adjective ও Noun-এর সাথে নির্দিষ্ট Preposition বসে। এগুলো নিয়ম নয়, প্রচলন — তাই মুখস্থ ও চর্চাই ভরসা।",
    points: [
      "wait for, listen to, look at, laugh at, depend on, insist on",
      "afraid of, fond of, aware of, capable of, tired of, proud of",
      "good at, bad at, expert in, interested in, engaged in",
      "married to, similar to, superior to, according to, belong to",
      "angry with (ব্যক্তি), angry at (আচরণ)",
      "কোনো preposition লাগে না: discuss, enter, marry, resemble, lack, reach, attack, mention",
    ],
    formulas: [
      { label: "Verb + for", formula: "wait / apply / long / search + for", example: "He applied for the job." },
      { label: "Adjective + of", formula: "afraid / fond / aware / capable + of", example: "She is afraid of dogs." },
      { label: "Adjective + to", formula: "married / similar / superior / accustomed + to", example: "He is accustomed to hard work." },
    ],
    examples: [
      "He is good at mathematics.",
      "She is interested in music.",
      "I am tired of waiting.",
      "This book is different from that one.",
      "He died of cholera. (রোগে) / He died from overwork. (কারণে)",
    ],
    wrongRight: [
      {
        wrong: "I am waiting your reply.",
        right: "I am waiting for your reply.",
        why: "wait-এর সাথে 'for'।",
      },
      {
        wrong: "He is good in English.",
        right: "He is good at English.",
        why: "দক্ষতা বোঝাতে good at।",
      },
      {
        wrong: "This is different than that.",
        right: "This is different from that.",
        why: "British/formal English-এ different from।",
      },
      {
        wrong: "She got married with a doctor.",
        right: "She got married to a doctor.",
        why: "married-এর সাথে 'to'।",
      },
      {
        wrong: "He reached at the station.",
        right: "He reached the station.",
        why: "reach-এর পরে preposition বসে না।",
      },
    ],
    trick:
      "রোজ ৫টা করে **Verb + Preposition** জোড়া মুখস্থ করুন এবং সেগুলো দিয়ে বাক্য বানান। এক মাসে ১৫০টা — ৯০% ভুল শেষ।",
    quiz: [
      {
        q: "‘He is good ___ playing chess.’",
        options: ["in", "at", "on", "for"],
        answer: 1,
        explain: "দক্ষতা বোঝাতে good at।",
      },
      {
        q: "‘She is afraid ___ snakes.’",
        options: ["from", "with", "of", "to"],
        answer: 2,
        explain: "afraid of।",
      },
      {
        q: "কোনটি সঠিক?",
        options: [
          "He reached at home.",
          "He reached to home.",
          "He reached home.",
          "He reached in home.",
        ],
        answer: 2,
        explain: "reach-এর পরে preposition বসে না।",
      },
      {
        q: "‘I am not accustomed ___ this weather.’",
        options: ["with", "to", "for", "in"],
        answer: 1,
        explain: "accustomed to।",
      },
    ],
    minutes: 7,
  },
  {
    slug: "confusing-words",
    category: "mistakes",
    title: "Confusing Word Pairs",
    titleBn: "যে শব্দজোড়া বিভ্রান্ত করে",
    hook: "affect নাকি effect? lose নাকi loose? এই জোড়াগুলো ইংরেজির জমজ ভাই — চেহারা এক, কাজ আলাদা।",
    rule: "কিছু শব্দ দেখতে বা শুনতে প্রায় একরকম হলেও অর্থ ও ব্যবহারে সম্পূর্ণ আলাদা। এদের পার্থক্য মনে রাখা জরুরি।",
    points: [
      "affect (Verb — প্রভাবিত করা) vs effect (Noun — প্রভাব)",
      "advice (Noun — উপদেশ) vs advise (Verb — উপদেশ দেওয়া)",
      "lose (হারানো) vs loose (ঢিলা)",
      "principal (প্রধান / অধ্যক্ষ) vs principle (নীতি)",
      "stationary (স্থির) vs stationery (লেখার সরঞ্জাম)",
      "its (এর) vs it's (it is)",
      "then (তখন) vs than (চেয়ে)",
      "accept (গ্রহণ করা) vs except (ছাড়া)",
      "borrow (ধার নেওয়া) vs lend (ধার দেওয়া)",
    ],
    formulas: [
      {
        label: "affect / effect",
        formula: "Verb → affect | Noun → effect",
        example: "Smoking affects health. It has a bad effect.",
      },
      {
        label: "borrow / lend",
        formula: "borrow from | lend to",
        example: "I borrowed a pen from him. He lent a pen to me.",
      },
    ],
    examples: [
      "The rain affected the match. The effect was terrible.",
      "My advice is good. I advise you to study.",
      "Don't lose your loose shirt.",
      "The principal is a man of principle.",
    ],
    wrongRight: [
      {
        wrong: "The medicine had a good affect.",
        right: "The medicine had a good effect.",
        why: "এখানে Noun দরকার — effect।",
      },
      {
        wrong: "He adviced me to go.",
        right: "He advised me to go.",
        why: "Verb হিসেবে 'advise' (s দিয়ে)।",
      },
      {
        wrong: "He is taller then me.",
        right: "He is taller than me.",
        why: "তুলনায় 'than', সময়ে 'then'।",
      },
      {
        wrong: "Can I lend your book?",
        right: "Can I borrow your book?",
        why: "নিজে নিলে borrow, অন্যকে দিলে lend।",
      },
    ],
    trick:
      "**A**ffect = **A**ction (Verb) | **E**ffect = **E**nd result (Noun)। আর **advi**c**e** = noun (ice-এর মতো জিনিস), **advi**s**e** = verb।",
    quiz: [
      {
        q: "‘The new law will ___ everyone.’",
        options: ["effect", "affect", "afect", "effekt"],
        answer: 1,
        explain: "কাজ বোঝাচ্ছে (Verb) — affect।",
      },
      {
        q: "‘He is a man of high ___.’",
        options: ["principal", "principle", "principals", "principly"],
        answer: 1,
        explain: "নীতি = principle।",
      },
      {
        q: "‘May I ___ your pen?’",
        options: ["lend", "borrow", "give", "loan out"],
        answer: 1,
        explain: "নিজে ধার নিলে borrow।",
      },
      {
        q: "‘Everyone came ___ him.’",
        options: ["accept", "except", "expect", "aspect"],
        answer: 1,
        explain: "'ছাড়া' অর্থে except।",
      },
    ],
    minutes: 7,
  },
];
