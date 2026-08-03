import type { GrammarLesson } from "@/lib/types";

export const ADVANCED_LESSONS: readonly GrammarLesson[] = [
  {
    slug: "clauses",
    category: "advanced",
    title: "Clauses",
    titleBn: "ক্লজ",
    hook: "Clause হলো ছোট্ট একটা বাক্য যা বড় বাক্যের ভেতরে বাস করে। কেউ স্বাধীন, কেউ পরনির্ভর।",
    rule: "Subject ও Finite Verb সহ যে শব্দসমষ্টি একটি বৃহত্তর বাক্যের অংশ হিসেবে কাজ করে তাকে Clause বলে।",
    points: [
      "Principal/Independent Clause — একাই সম্পূর্ণ অর্থ প্রকাশ করে",
      "Subordinate/Dependent Clause — একা দাঁড়াতে পারে না",
      "Noun Clause — Noun-এর কাজ করে (that, what, whether দিয়ে শুরু)",
      "Adjective Clause — Noun-কে modify করে (who, which, that দিয়ে শুরু)",
      "Adverbial Clause — Verb-কে modify করে (when, because, if, although দিয়ে শুরু)",
      "Phrase-এ Finite Verb থাকে না, Clause-এ থাকে",
    ],
    formulas: [
      {
        label: "Noun Clause",
        formula: "Verb + that/what/whether + S + V",
        example: "I know that he is honest.",
      },
      {
        label: "Adjective Clause",
        formula: "Noun + who/which/that + V",
        example: "The man who came is my uncle.",
      },
      {
        label: "Adverbial Clause",
        formula: "when/because/if/although + S + V",
        example: "He came when I was sleeping.",
      },
    ],
    examples: [
      "What he said is true. (Noun Clause — Subject-এর কাজ করছে)",
      "This is the book which I bought. (Adjective Clause)",
      "Although it was raining, we went out. (Adverbial Clause)",
      "Defining: The boy who won is my brother. (কমা নেই)",
      "Non-defining: Rahim, who won the prize, is my brother. (কমা আছে)",
    ],
    wrongRight: [
      {
        wrong: "The man which came is my teacher.",
        right: "The man who came is my teacher.",
        why: "ব্যক্তির জন্য 'who', বস্তুর জন্য 'which'।",
      },
      {
        wrong: "I know that what he wants.",
        right: "I know what he wants.",
        why: "একটি Noun Clause-এ দুটি connector বসে না।",
      },
      {
        wrong: "Rahim who won the prize is my brother.",
        right: "Rahim, who won the prize, is my brother.",
        why: "Proper Noun-এর পরে Non-defining clause — দুই পাশে কমা লাগবে।",
      },
    ],
    trick:
      "Clause চিনতে **Finite Verb খুঁজুন**। Verb আছে কিন্তু একা দাঁড়াতে পারছে না → Subordinate Clause। Verb-ই নেই → Phrase।",
    quiz: [
      {
        q: "‘I know what he wants.’ — ‘what he wants’ কোন Clause?",
        options: ["Adjective Clause", "Noun Clause", "Adverbial Clause", "Principal Clause"],
        answer: 1,
        explain: "know-এর object হিসেবে কাজ করছে — তাই Noun Clause।",
      },
      {
        q: "‘The house ___ stands on the hill is mine.’",
        options: ["who", "which", "whom", "what"],
        answer: 1,
        explain: "house বস্তু — তাই 'which'।",
      },
      {
        q: "‘Because he was late’ — এটি কী?",
        options: [
          "Principal Clause",
          "Noun Clause",
          "Adverbial Clause",
          "Complete Sentence",
        ],
        answer: 2,
        explain: "কারণ বোঝাচ্ছে এবং Verb-কে modify করছে — Adverbial Clause।",
      },
    ],
    minutes: 7,
  },
  {
    slug: "subject-verb-agreement",
    category: "advanced",
    title: "Subject–Verb Agreement",
    titleBn: "কর্তা-ক্রিয়ার মিল",
    hook: "‘The list of students are long’ — শোনার সময় ঠিকই লাগে, কিন্তু ভুল। আসল Subject কে? সেটাই আসল প্রশ্ন।",
    rule: "Verb সবসময় তার প্রকৃত Subject-এর বচন ও পুরুষ অনুযায়ী হবে — মাঝখানের শব্দগুলোর সাথে নয়।",
    points: [
      "Subject আর Verb-এর মাঝে phrase থাকলে সেটা উপেক্ষা করুন",
      "each, every, either, neither, everyone, somebody, nobody → singular verb",
      "and দিয়ে যুক্ত দুই subject → plural, কিন্তু একই ব্যক্তি/বস্তু বোঝালে singular",
      "with, along with, as well as, together with, besides দিয়ে যুক্ত হলে verb প্রথম subject অনুযায়ী",
      "either…or / neither…nor / not only…but also → verb কাছের subject অনুযায়ী",
      "The number of + plural → singular verb | A number of + plural → plural verb",
      "টাকা, দূরত্ব, সময়, ওজন — পরিমাণ বোঝালে singular verb",
    ],
    formulas: [
      {
        label: "মাঝের phrase উপেক্ষা",
        formula: "Subject + [of-phrase] + Verb (Subject অনুযায়ী)",
        example: "The list of items is long.",
      },
      {
        label: "as well as",
        formula: "Subject₁ + as well as + Subject₂ + Verb (Subject₁ অনুযায়ী)",
        example: "The teacher as well as the students was present.",
      },
      {
        label: "number",
        formula: "The number of … is | A number of … are",
        example: "A number of students are absent.",
      },
    ],
    examples: [
      "Each of the boys has a pen.",
      "Bread and butter is my favourite breakfast. (একটি খাবার)",
      "Rice and curry are on the table. (দুটি আলাদা জিনিস)",
      "Ten miles is a long distance.",
      "Neither the teacher nor the students were present.",
    ],
    wrongRight: [
      {
        wrong: "The quality of the mangoes were good.",
        right: "The quality of the mangoes was good.",
        why: "প্রকৃত Subject 'quality' (একবচন), 'mangoes' নয়।",
      },
      {
        wrong: "He as well as his brothers are coming.",
        right: "He as well as his brothers is coming.",
        why: "as well as দিয়ে যুক্ত হলে verb প্রথম subject (He) অনুযায়ী।",
      },
      {
        wrong: "Five thousand taka are a big amount.",
        right: "Five thousand taka is a big amount.",
        why: "টাকার পরিমাণ একক সত্তা — singular verb।",
      },
      {
        wrong: "Neither of the answers are correct.",
        right: "Neither of the answers is correct.",
        why: "neither singular — singular verb নেয়।",
      },
    ],
    trick:
      "Verb বসানোর আগে **‘of’-এর পরের সব কেটে দিন**। যা বাকি থাকে সেটাই আসল Subject। *The list ~~of students~~ is long.*",
    quiz: [
      {
        q: "‘The list of candidates ___ been published.’",
        options: ["have", "has", "are", "were"],
        answer: 1,
        explain: "Subject 'list' একবচন — 'has'।",
      },
      {
        q: "‘A number of students ___ absent today.’",
        options: ["is", "was", "are", "has"],
        answer: 2,
        explain: "'A number of' = অনেকগুলো — plural verb।",
      },
      {
        q: "‘Neither he nor his friends ___ coming.’",
        options: ["is", "are", "was", "has"],
        answer: 1,
        explain: "কাছের subject 'friends' বহুবচন।",
      },
      {
        q: "‘Twenty kilometres ___ a long way.’",
        options: ["are", "is", "were", "have"],
        answer: 1,
        explain: "দূরত্ব একক সত্তা — singular verb।",
      },
    ],
    minutes: 8,
  },
  {
    slug: "sequence-of-tense",
    category: "advanced",
    title: "Sequence of Tense",
    titleBn: "কালের অনুক্রম",
    hook: "প্রধান বাক্য অতীতে গেলে অধীন বাক্যকেও সাথে যেতে হয় — গ্রামারের পারিবারিক নিয়ম!",
    rule: "একটি বাক্যে Principal Clause-এর Verb-এর Tense অনুযায়ী Subordinate Clause-এর Verb-এর Tense নির্ধারিত হয়।",
    points: [
      "Principal Clause Present/Future হলে Subordinate Clause যেকোনো Tense-এ হতে পারে",
      "Principal Clause Past হলে Subordinate Clause-ও Past বা Past Perfect হবে",
      "ব্যতিক্রম ১ — চিরন্তন/বৈজ্ঞানিক সত্য সবসময় Present Simple",
      "ব্যতিক্রম ২ — ঐতিহাসিক ঘটনা সবসময় Past Simple",
      "ব্যতিক্রম ৩ — অভ্যাসগত সত্য Present-এই থাকে",
      "ব্যতিক্রম ৪ — তুলনায় (than-এর পরে) নিয়ম খাটে না",
    ],
    formulas: [
      {
        label: "মূল নিয়ম",
        formula: "Past Principal → Past/Past Perfect Subordinate",
        example: "He said that he was ill.",
      },
      {
        label: "সত্যের ব্যতিক্রম",
        formula: "Past Principal + that + Present (সত্য)",
        example: "He said that the sun rises in the east.",
      },
    ],
    examples: [
      "I know that he is honest. (Present → Present)",
      "I knew that he was honest. (Past → Past)",
      "He said that he had finished the work. (Past → Past Perfect)",
      "The teacher told us that water freezes at 0°C. (সত্য — অপরিবর্তিত)",
      "He said that Bangladesh became independent in 1971. (ঐতিহাসিক — Past Simple)",
    ],
    wrongRight: [
      {
        wrong: "He said that he is ill.",
        right: "He said that he was ill.",
        why: "Principal Clause past — তাই Subordinate Clause-ও past।",
      },
      {
        wrong: "He told me that the earth moved round the sun.",
        right: "He told me that the earth moves round the sun.",
        why: "চিরন্তন সত্য কখনো past-এ যায় না।",
      },
      {
        wrong: "The teacher said that Titanic sinks in 1912.",
        right: "The teacher said that Titanic sank in 1912.",
        why: "ঐতিহাসিক ঘটনা সবসময় Past Simple।",
      },
    ],
    trick:
      "**সত্য আর ইতিহাস — এই দুজন কারো কথা শোনে না।** সত্য চিরকাল Present-এ, ইতিহাস চিরকাল Past-এ।",
    quiz: [
      {
        q: "‘He said that he ___ busy.’",
        options: ["is", "was", "will be", "has been"],
        answer: 1,
        explain: "Principal Clause past — তাই was।",
      },
      {
        q: "‘Our teacher told us that the moon ___ round the earth.’",
        options: ["moved", "moves", "had moved", "was moving"],
        answer: 1,
        explain: "বৈজ্ঞানিক সত্য — Present Simple অপরিবর্তিত।",
      },
      {
        q: "‘He said that the war ___ in 1971.’",
        options: ["starts", "started", "had started", "has started"],
        answer: 1,
        explain: "ঐতিহাসিক ঘটনা — Past Simple।",
      },
    ],
    minutes: 6,
  },
];
