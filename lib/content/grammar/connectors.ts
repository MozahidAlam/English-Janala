import type { GrammarLesson } from "@/lib/types";

export const CONNECTOR_LESSONS: readonly GrammarLesson[] = [
  {
    slug: "articles",
    category: "connectors",
    title: "Articles — a, an, the",
    titleBn: "আর্টিকেল",
    hook: "তিনটা ছোট্ট শব্দ, অথচ সবচেয়ে বেশি নম্বর কাটে এখানেই। মজার ব্যাপার — বাংলায় Article নেই বলেই আমরা ভুল করি।",
    rule: "a/an = Indefinite Article (অনির্দিষ্ট, singular countable noun-এর আগে)। the = Definite Article (নির্দিষ্ট কিছু বোঝাতে)। নিয়মটা বানান নয়, **উচ্চারণ** দিয়ে চলে।",
    points: [
      "উচ্চারণে consonant sound হলে 'a', vowel sound হলে 'an' — অক্ষর নয়, শব্দ শুনুন",
      "a university (ইউ = consonant sound), an hour (আওয়ার = vowel sound), an MBA (এম = vowel sound)",
      "the — আগে উল্লেখিত, অদ্বিতীয় (the sun, the moon), superlative-এর আগে, নদী/সাগর/পর্বতমালা/দেশের নাম যেখানে 'of' আছে",
      "Article বসে না: খেলার নাম, ভাষার নাম, খাবারের নাম, বিষয়ের নাম, দেশ/শহরের সাধারণ নাম",
      "Proper Noun-এর আগে সাধারণত Article বসে না, তবে ব্যতিক্রম আছে: the Padma, the Himalayas",
      "শ্রেণির সমগ্রতা বোঝাতে the + singular noun: The cow is a useful animal.",
    ],
    formulas: [
      {
        label: "a নাকি an",
        formula: "উচ্চারণ vowel sound → an | consonant sound → a",
        example: "an honest man, a European, an X-ray, a one-taka note",
      },
      {
        label: "the বসে",
        formula: "the + অদ্বিতীয় / superlative / ordinal",
        example: "the sun, the best boy, the first day",
      },
    ],
    examples: [
      "He is an MA in English. (এম-এ = vowel sound)",
      "She goes to school. (সাধারণ উদ্দেশ্যে — article নেই)",
      "She went to the school to meet the headmaster. (নির্দিষ্ট ভবন — the আছে)",
      "The Padma is a big river.",
      "I like playing cricket. (❌ the cricket)",
    ],
    wrongRight: [
      {
        wrong: "He is an university student.",
        right: "He is a university student.",
        why: "university-র উচ্চারণ 'ইউ' — consonant sound দিয়ে শুরু, তাই 'a'।",
      },
      {
        wrong: "I waited for a hour.",
        right: "I waited for an hour.",
        why: "hour-এ 'h' নীরব, উচ্চারণ 'আওয়ার' — vowel sound, তাই 'an'।",
      },
      {
        wrong: "He plays the cricket every day.",
        right: "He plays cricket every day.",
        why: "খেলার নামের আগে article বসে না।",
      },
      {
        wrong: "The honesty is the best policy.",
        right: "Honesty is the best policy.",
        why: "Abstract Noun সাধারণ অর্থে ব্যবহৃত হলে article বসে না।",
      },
    ],
    trick:
      "**চোখ নয়, কান ব্যবহার করুন।** শব্দটা উচ্চারণ করুন — শুরুতে স্বরধ্বনি শুনলে 'an', ব্যঞ্জনধ্বনি শুনলে 'a'। *an honest, a one-eyed man।*",
    quiz: [
      {
        q: "‘He is ___ honest man.’",
        options: ["a", "an", "the", "no article"],
        answer: 1,
        explain: "honest-এ 'h' নীরব — উচ্চারণ 'অনেস্ট', vowel sound।",
      },
      {
        q: "‘___ Himalayas are in Asia.’",
        options: ["A", "An", "The", "No article"],
        answer: 2,
        explain: "পর্বতমালার নামের আগে 'the' বসে।",
      },
      {
        q: "কোনটি সঠিক?",
        options: [
          "He plays the football.",
          "He plays football.",
          "He plays a football.",
          "He plays an football.",
        ],
        answer: 1,
        explain: "খেলার নামের আগে article বসে না।",
      },
      {
        q: "‘She is ___ MBBS doctor.’",
        options: ["a", "an", "the", "no article"],
        answer: 1,
        explain: "MBBS-এর উচ্চারণ 'এম-বি-বি-এস' — vowel sound দিয়ে শুরু।",
      },
    ],
    minutes: 8,
  },
  {
    slug: "prepositions",
    category: "connectors",
    title: "Prepositions",
    titleBn: "পদান্বয়ী অব্যয়",
    hook: "in, on, at — তিনটা শব্দ যা বাঙালির ইংরেজি জীবনটা কঠিন করে দিয়েছে। আজ এদের বশে আনি।",
    rule: "Preposition হলো সেই শব্দ যা Noun/Pronoun-এর সাথে বাক্যের অন্য অংশের সম্পর্ক (স্থান, কাল, উপায়) প্রকাশ করে। Preposition-এর পরে সবসময় Noun, Pronoun (objective form) বা Gerund বসে।",
    points: [
      "সময়: at (নির্দিষ্ট সময় — at 5 pm) | on (দিন/তারিখ — on Monday) | in (মাস/বছর/দীর্ঘ সময় — in June, in 2024)",
      "স্থান: at (নির্দিষ্ট বিন্দু) | on (উপরিতল) | in (ভেতরে)",
      "in time = সময়মতো (হাতে সময় নিয়ে) | on time = ঠিক নির্দিষ্ট সময়ে",
      "since + সময়বিন্দু | for + সময়ের ব্যাপ্তি",
      "by = নির্দিষ্ট সময়ের মধ্যে | within = সময়ের ভেতরে",
      "between = দুইয়ের মধ্যে | among = তিন বা তার বেশির মধ্যে",
    ],
    formulas: [
      {
        label: "সময়ের সিঁড়ি",
        formula: "at (ছোট) → on (মাঝারি) → in (বড়)",
        example: "at 6 o'clock → on Friday → in December",
      },
      {
        label: "Preposition + verb",
        formula: "Preposition + V-ing",
        example: "He is good at swimming.",
      },
    ],
    examples: [
      "The meeting is at 10 am on Monday in January.",
      "He is angry with me but angry at my behaviour.",
      "She is married to a doctor. (❌ married with)",
      "Divide the cake between the two brothers; distribute sweets among the students.",
    ],
    wrongRight: [
      {
        wrong: "I am waiting your reply.",
        right: "I am waiting for your reply.",
        why: "wait-এর সাথে 'for' লাগে।",
      },
      {
        wrong: "We discussed about the matter.",
        right: "We discussed the matter.",
        why: "discuss একটি Transitive Verb — এর পরে 'about' বসে না।",
      },
      {
        wrong: "She is married with a teacher.",
        right: "She is married to a teacher.",
        why: "married-এর সাথে 'to' বসে।",
      },
      {
        wrong: "He entered into the room.",
        right: "He entered the room.",
        why: "স্থানের ক্ষেত্রে enter-এর পরে 'into' বসে না। (তবে 'entered into an agreement' ঠিক।)",
      },
    ],
    trick:
      "সময়ের জন্য মনে রাখুন **at = ঘড়ি, on = ক্যালেন্ডারের পাতা, in = ক্যালেন্ডারের মলাট**। ছোট থেকে বড়।",
    quiz: [
      {
        q: "‘The class starts ___ 9 am ___ Sunday.’",
        options: ["in, on", "at, on", "on, at", "at, in"],
        answer: 1,
        explain: "নির্দিষ্ট সময়ে at, দিনে on।",
      },
      {
        q: "কোনটি সঠিক?",
        options: [
          "They discussed about the plan.",
          "They discussed the plan.",
          "They discussed on the plan.",
          "They discussed for the plan.",
        ],
        answer: 1,
        explain: "discuss-এর পরে সরাসরি object বসে।",
      },
      {
        q: "‘Distribute the books ___ the five students.’",
        options: ["between", "among", "in", "with"],
        answer: 1,
        explain: "দুইয়ের বেশি হলে 'among'।",
      },
      {
        q: "‘He has been ill ___ Monday.’",
        options: ["for", "since", "from", "in"],
        answer: 1,
        explain: "Monday একটি সময়বিন্দু — তাই 'since'।",
      },
    ],
    minutes: 8,
  },
  {
    slug: "conjunctions",
    category: "connectors",
    title: "Conjunctions & Linkers",
    titleBn: "সংযোজক অব্যয়",
    hook: "বাক্যগুলো ইট, Conjunction হলো সিমেন্ট। সিমেন্ট ভুল হলে দেয়াল ধসে পড়ে।",
    rule: "Conjunction দুই বা ততোধিক শব্দ, phrase বা clause-কে যুক্ত করে। একই কাজের জন্য দুটি conjunction একসাথে ব্যবহার করা যায় না।",
    points: [
      "Coordinating (FANBOYS): for, and, nor, but, or, yet, so",
      "Subordinating: because, although, though, since, unless, until, while, if, when, that",
      "Correlative (জোড়া): either…or, neither…nor, both…and, not only…but also, no sooner…than, hardly…when",
      "Although/Though থাকলে 'but' বসে না",
      "Because থাকলে 'so' বসে না",
      "No sooner had … than | Hardly had … when | Scarcely had … when",
    ],
    formulas: [
      {
        label: "No sooner",
        formula: "No sooner had + S + V3 + than + S + V2",
        example: "No sooner had he come than it started raining.",
      },
      {
        label: "Neither…nor",
        formula: "Neither + A + nor + B (verb কাছের subject অনুযায়ী)",
        example: "Neither he nor his friends were present.",
      },
      {
        label: "Not only…but also",
        formula: "Not only + A + but also + B",
        example: "She is not only intelligent but also hardworking.",
      },
    ],
    examples: [
      "Although he is poor, he is honest.",
      "Either you or I am responsible.",
      "He is so weak that he cannot walk.",
      "Wait here until I come back.",
    ],
    wrongRight: [
      {
        wrong: "Although he is rich, but he is unhappy.",
        right: "Although he is rich, he is unhappy.",
        why: "Although আর but একসাথে বসে না — যেকোনো একটি।",
      },
      {
        wrong: "Because he was ill, so he did not come.",
        right: "Because he was ill, he did not come.",
        why: "Because আর so একসাথে বসে না।",
      },
      {
        wrong: "No sooner he had come than it rained.",
        right: "No sooner had he come than it rained.",
        why: "No sooner দিয়ে শুরু হলে auxiliary verb subject-এর আগে বসে (inversion)।",
      },
      {
        wrong: "Neither he nor I is guilty.",
        right: "Neither he nor I am guilty.",
        why: "Neither…nor-এ verb কাছের subject (I) অনুযায়ী হয়।",
      },
    ],
    trick:
      "**এক বাক্যে দুই বস চলে না** — Although থাকলে but নয়, Because থাকলে so নয়, Though থাকলে yet ছাড়া অন্য কিছু নয়।",
    quiz: [
      {
        q: "‘___ he was tired, he continued working.’",
        options: ["Because", "Although", "So", "Unless"],
        answer: 1,
        explain: "বিপরীত ভাব — Although।",
      },
      {
        q: "কোনটি সঠিক?",
        options: [
          "Though he is poor, but he is happy.",
          "Though he is poor, he is happy.",
          "Though he is poor, so he is happy.",
          "Though he is poor and he is happy.",
        ],
        answer: 1,
        explain: "Though-এর সাথে but বসে না।",
      },
      {
        q: "‘Neither Rahim nor his brothers ___ present.’",
        options: ["is", "was", "were", "has"],
        answer: 2,
        explain: "কাছের subject 'brothers' বহুবচন — তাই 'were'।",
      },
    ],
    minutes: 7,
  },
  {
    slug: "determiners",
    category: "connectors",
    title: "Determiners & Quantifiers",
    titleBn: "নির্ধারক",
    hook: "some নাকি any? each নাকি every? ছোট শব্দ, বড় ফাঁদ।",
    rule: "Determiner হলো সেই শব্দ যা Noun-এর আগে বসে তার পরিমাণ, নির্দিষ্টতা বা মালিকানা নির্দেশ করে।",
    points: [
      "some — Affirmative বাক্যে | any — Negative ও Interrogative-এ",
      "তবে ভদ্র অনুরোধ/প্রস্তাবে প্রশ্নেও 'some' বসে: Would you like some tea?",
      "each = দুই বা তার বেশির প্রত্যেকটি আলাদাভাবে | every = তিন বা তার বেশির সবাই একসাথে",
      "each/every + singular noun + singular verb",
      "either/neither + singular noun + singular verb",
      "all/most/some + of + the + noun",
      "Determiner-এর ক্রম: all/both → the/my → two → other → noun",
    ],
    formulas: [
      { label: "each/every", formula: "each/every + singular noun + singular verb", example: "Every student was present." },
      { label: "of-phrase", formula: "all/some/most + of + the + plural noun", example: "Most of the students passed." },
      { label: "ক্রম", formula: "all + my + three + books", example: "All my three books are new." },
    ],
    examples: [
      "I have some money. / I don't have any money.",
      "Each of the boys has a pen.",
      "Every man is mortal.",
      "Neither answer is correct.",
    ],
    wrongRight: [
      {
        wrong: "Every students were present.",
        right: "Every student was present.",
        why: "every + singular noun + singular verb।",
      },
      {
        wrong: "My all friends are here.",
        right: "All my friends are here.",
        why: "Determiner-এর ক্রম: all → my → noun।",
      },
      {
        wrong: "I don't have some money.",
        right: "I don't have any money.",
        why: "Negative বাক্যে 'any' বসে।",
      },
      {
        wrong: "Each of the boy has a book.",
        right: "Each of the boys has a book.",
        why: "'each of'-এর পরে plural noun কিন্তু singular verb।",
      },
    ],
    trick:
      "**each/every-র পরে সবকিছু একবচন** — noun একবচন, verb একবচন। কিন্তু ‘each of / every one of’-এর পরে noun বহুবচন, verb তবুও একবচন।",
    quiz: [
      {
        q: "‘Each of the students ___ a book.’",
        options: ["have", "has", "having", "were"],
        answer: 1,
        explain: "each of + plural noun + singular verb।",
      },
      {
        q: "‘Would you like ___ tea?’",
        options: ["any", "some", "many", "much of"],
        answer: 1,
        explain: "ভদ্র প্রস্তাবে প্রশ্নেও 'some' বসে।",
      },
      {
        q: "কোন ক্রমটি সঠিক?",
        options: [
          "My all books",
          "All my books",
          "Books all my",
          "All books my",
        ],
        answer: 1,
        explain: "all → my → noun।",
      },
    ],
    minutes: 6,
  },
];
