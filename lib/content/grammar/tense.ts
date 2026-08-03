import type { GrammarLesson } from "@/lib/types";

export const TENSE_LESSONS: readonly GrammarLesson[] = [
  {
    slug: "tense-overview",
    category: "tense",
    title: "Tense — The Big Picture",
    titleBn: "টেন্স: পুরো ম্যাপ",
    hook: "১২টা Tense শুনলেই ভয়? আসলে ৩টা সময় × ৪টা অবস্থা = ১২। ব্যস, এটুকুই।",
    rule: "Verb-এর যে রূপ কাজের সময় (Time) এবং কাজের অবস্থা (Aspect) প্রকাশ করে, তাকে Tense বলে। ৩টি Time (Present, Past, Future) × ৪টি Aspect (Simple, Continuous, Perfect, Perfect Continuous) = ১২টি Tense।",
    points: [
      "Simple — সাধারণ ঘটনা / অভ্যাস / সত্য",
      "Continuous — চলছে এমন কাজ (be + V-ing)",
      "Perfect — শেষ হয়ে গেছে, ফল এখনো আছে (have/had + V3)",
      "Perfect Continuous — শুরু হয়ে এখনো চলছে, সময়কাল উল্লেখ থাকে (have/had been + V-ing)",
      "Aspect চেনার সহজ সূত্র: -ing দেখলে Continuous, V3 দেখলে Perfect, been + -ing দেখলে Perfect Continuous",
    ],
    formulas: [
      { label: "Simple", formula: "V1 / V2 / will + V1", example: "I eat / I ate / I will eat" },
      { label: "Continuous", formula: "am-is-are / was-were / will be + V-ing", example: "I am eating" },
      { label: "Perfect", formula: "have-has / had / will have + V3", example: "I have eaten" },
      {
        label: "Perfect Continuous",
        formula: "have-has been / had been / will have been + V-ing",
        example: "I have been eating for an hour",
      },
    ],
    examples: [
      "I write a letter. (Present Simple)",
      "I am writing a letter. (Present Continuous)",
      "I have written a letter. (Present Perfect)",
      "I have been writing a letter for two hours. (Present Perfect Continuous)",
    ],
    wrongRight: [
      {
        wrong: "I am knowing the answer.",
        right: "I know the answer.",
        why: "know একটি State Verb — এদের Continuous রূপ হয় না।",
      },
      {
        wrong: "I have gone to Dhaka yesterday.",
        right: "I went to Dhaka yesterday.",
        why: "নির্দিষ্ট past time (yesterday) থাকলে Present Perfect নয়, Past Simple বসে।",
      },
    ],
    trick:
      "কাঠামো দেখেই Tense চিনুন — **-ing = চলছে, V3 = শেষ, been+ing = চলছেই আছে**। বাকিটা শুধু সময় বসানো।",
    quiz: [
      {
        q: "‘She has been reading for two hours.’ — কোন Tense?",
        options: ["Present Perfect", "Present Continuous", "Present Perfect Continuous", "Past Perfect"],
        answer: 2,
        explain: "has been + V-ing + সময়কাল = Present Perfect Continuous।",
      },
      {
        q: "মোট কতটি Tense আছে?",
        options: ["৩টি", "৬টি", "৯টি", "১২টি"],
        answer: 3,
        explain: "৩ Time × ৪ Aspect = ১২টি।",
      },
      {
        q: "কোনটি State Verb (Continuous হয় না)?",
        options: ["run", "believe", "write", "play"],
        answer: 1,
        explain: "believe, know, love, want — এগুলো State Verb।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "present-simple",
    category: "tense",
    title: "Present Indefinite / Simple",
    titleBn: "সাধারণ বর্তমান",
    hook: "সূর্য পূর্ব দিকে ওঠে — এটা কাল উঠবে না, গতকাল উঠেছিল না, সবসময়ই ওঠে। এই ‘সবসময়’-ই Present Simple।",
    rule: "অভ্যাসগত কাজ, চিরন্তন সত্য, বৈজ্ঞানিক সত্য বা বর্তমানে সাধারণভাবে ঘটে এমন কাজ বোঝাতে Present Simple ব্যবহৃত হয়।",
    points: [
      "Third person singular (he, she, it, একবচন Noun) হলে verb-এর শেষে -s/-es বসে",
      "Negative/Interrogative-এ do/does বসে, তখন মূল verb base form-এ ফিরে আসে",
      "Time expression: always, usually, often, every day, sometimes, never",
      "চিরন্তন সত্য সবসময় Present Simple-এ থাকে, এমনকি past narration-এও",
    ],
    formulas: [
      { label: "Affirmative", formula: "Subject + V1 (+s/es) + Object", example: "He plays cricket." },
      { label: "Negative", formula: "Subject + do/does + not + V1", example: "He does not play cricket." },
      { label: "Interrogative", formula: "Do/Does + Subject + V1?", example: "Does he play cricket?" },
    ],
    examples: [
      "The earth moves round the sun.",
      "I get up at six every morning.",
      "Water boils at 100°C.",
      "She does not like coffee.",
    ],
    wrongRight: [
      {
        wrong: "He do not like tea.",
        right: "He does not like tea.",
        why: "He (third person singular) হলে 'does' বসে।",
      },
      {
        wrong: "Does he plays football?",
        right: "Does he play football?",
        why: "'does' থাকলে মূল verb base form — 'play'।",
      },
      {
        wrong: "The teacher said that the earth moved round the sun.",
        right: "The teacher said that the earth moves round the sun.",
        why: "চিরন্তন সত্য সবসময় Present Simple-এ থাকে, Sequence of Tense-এর নিয়ম এখানে খাটে না।",
      },
    ],
    trick:
      "**He/She/It হলে verb-এ ‘s’ — কিন্তু do/does এসে গেলে ‘s’ ছিনিয়ে নেয়।** একটা বাক্যে একটাই ‘s’, দুটো নয়।",
    quiz: [
      {
        q: "‘My brother ___ to school every day.’",
        options: ["go", "goes", "going", "gone"],
        answer: 1,
        explain: "My brother = third person singular, তাই 'goes'।",
      },
      {
        q: "সঠিক প্রশ্নবাচক বাক্য কোনটি?",
        options: [
          "Does she likes music?",
          "Do she like music?",
          "Does she like music?",
          "Is she like music?",
        ],
        answer: 2,
        explain: "Does + Subject + base verb।",
      },
      {
        q: "‘Ice ___ at 0°C.’ (বৈজ্ঞানিক সত্য)",
        options: ["melted", "melts", "is melting", "has melted"],
        answer: 1,
        explain: "বৈজ্ঞানিক সত্য সবসময় Present Simple।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "present-continuous",
    category: "tense",
    title: "Present Continuous",
    titleBn: "ঘটমান বর্তমান",
    hook: "এই মুহূর্তে আপনি এটা পড়ছেন — ‘পড়ছেন’, ‘পড়েন’ নয়। এই ‘-ছেন’-ই Present Continuous।",
    rule: "বর্তমানে চলমান কাজ, সাময়িক অবস্থা, বা নিকট ভবিষ্যতের পূর্বপরিকল্পিত কাজ বোঝাতে Present Continuous ব্যবহৃত হয়।",
    points: [
      "গঠন: am/is/are + V-ing",
      "Time expression: now, at present, at the moment, look!, listen!",
      "নিকট ভবিষ্যতের নিশ্চিত পরিকল্পনাতেও ব্যবহৃত হয়: I am going to Dhaka tomorrow.",
      "State verb (know, believe, love, want, need, seem, belong) এই Tense-এ বসে না",
      "always + Continuous = বিরক্তি প্রকাশ: He is always complaining!",
    ],
    formulas: [
      { label: "Affirmative", formula: "Subject + am/is/are + V-ing", example: "She is cooking." },
      { label: "Negative", formula: "Subject + am/is/are + not + V-ing", example: "She is not cooking." },
      { label: "Interrogative", formula: "Am/Is/Are + Subject + V-ing?", example: "Is she cooking?" },
    ],
    examples: [
      "Look! The baby is crying.",
      "They are playing football now.",
      "I am meeting the doctor tomorrow. (পরিকল্পিত ভবিষ্যৎ)",
      "He is always losing his keys! (বিরক্তি)",
    ],
    wrongRight: [
      {
        wrong: "I am wanting a cup of tea.",
        right: "I want a cup of tea.",
        why: "want একটি State Verb — Continuous রূপ হয় না।",
      },
      {
        wrong: "She is cook rice.",
        right: "She is cooking rice.",
        why: "be-verb-এর পরে অবশ্যই V-ing বসবে।",
      },
      {
        wrong: "He is beleiving in ghosts.",
        right: "He believes in ghosts.",
        why: "believe State Verb, তাই Present Simple।",
      },
    ],
    trick:
      "State Verb-এর তালিকা: **know, believe, understand, love, hate, want, need, prefer, belong, seem, own**। এদের কখনো -ing হয় না।",
    quiz: [
      {
        q: "‘Listen! Someone ___ at the door.’",
        options: ["knocks", "knocked", "is knocking", "has knocked"],
        answer: 2,
        explain: "'Listen!' এখনই ঘটছে বোঝায় — Present Continuous।",
      },
      {
        q: "কোনটি ভুল?",
        options: [
          "I am reading a book.",
          "I am knowing the answer.",
          "They are playing.",
          "She is not coming.",
        ],
        answer: 1,
        explain: "know State Verb — 'I know the answer' হবে।",
      },
      {
        q: "‘We ___ to Cox's Bazar next Friday.’ (পরিকল্পিত)",
        options: ["go", "are going", "went", "have gone"],
        answer: 1,
        explain: "নিকট ভবিষ্যতের নিশ্চিত পরিকল্পনায় Present Continuous ব্যবহৃত হয়।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "present-perfect",
    category: "tense",
    title: "Present Perfect",
    titleBn: "পুরাঘটিত বর্তমান",
    hook: "‘আমি খেয়েছি’ — কাজটা শেষ, কিন্তু পেট এখনো ভরা। কাজ অতীতে, ফল বর্তমানে। এটাই Present Perfect।",
    rule: "অতীতে সম্পন্ন হয়েছে কিন্তু যার ফল বর্তমানে বিদ্যমান, এমন কাজ বোঝাতে Present Perfect ব্যবহৃত হয়। নির্দিষ্ট past time উল্লেখ থাকলে এটি ব্যবহার করা যায় না।",
    points: [
      "গঠন: have/has + V3",
      "he/she/it/একবচন → has | I/we/you/they/বহুবচন → have",
      "সঙ্গী শব্দ: just, already, yet, ever, never, recently, so far, lately",
      "since = নির্দিষ্ট সময়বিন্দু (since 2010) | for = সময়ের ব্যাপ্তি (for 5 years)",
      "❌ কখনো নয়: yesterday, ago, last night, in 2019 — এগুলো থাকলে Past Simple",
    ],
    formulas: [
      { label: "Affirmative", formula: "Subject + have/has + V3", example: "I have finished the work." },
      { label: "Negative", formula: "Subject + have/has + not + V3", example: "I have not finished." },
      { label: "Interrogative", formula: "Have/Has + Subject + V3?", example: "Have you finished?" },
    ],
    examples: [
      "I have just eaten my lunch.",
      "She has lived in Dhaka since 2015.",
      "Have you ever been to Sylhet?",
      "He has not come yet.",
    ],
    wrongRight: [
      {
        wrong: "I have seen him yesterday.",
        right: "I saw him yesterday.",
        why: "'yesterday' নির্দিষ্ট past time — তাই Past Simple বসবে।",
      },
      {
        wrong: "She has went to school.",
        right: "She has gone to school.",
        why: "have/has-এর পরে V3 — go-এর V3 হলো 'gone', 'went' নয়।",
      },
      {
        wrong: "He has been ill since three days.",
        right: "He has been ill for three days.",
        why: "three days সময়ের ব্যাপ্তি — তাই 'for' বসবে, 'since' নয়।",
      },
    ],
    trick:
      "**since নাকি for?** — পরে যদি ঘড়ি/ক্যালেন্ডারের একটা বিন্দু থাকে (Monday, 2019, morning) → since। যদি পরিমাণ থাকে (3 days, two hours) → for।",
    quiz: [
      {
        q: "‘I ___ my homework already.’",
        options: ["finish", "finished", "have finished", "am finishing"],
        answer: 2,
        explain: "'already' Present Perfect-এর সঙ্গী শব্দ।",
      },
      {
        q: "কোনটি ভুল?",
        options: [
          "He has lived here for five years.",
          "He has lived here since 2019.",
          "He has come here last week.",
          "He has just come.",
        ],
        answer: 2,
        explain: "'last week' নির্দিষ্ট past time — 'He came here last week' হবে।",
      },
      {
        q: "‘She ___ never been to London.’",
        options: ["have", "has", "had", "is"],
        answer: 1,
        explain: "She = third person singular, তাই 'has'।",
      },
    ],
    minutes: 7,
  },
  {
    slug: "present-perfect-continuous",
    category: "tense",
    title: "Present Perfect Continuous",
    titleBn: "পুরাঘটিত ঘটমান বর্তমান",
    hook: "‘তিন ঘণ্টা ধরে পড়ছি’ — শুরু হয়েছে অতীতে, এখনো চলছে, আর সময়টাও বলে দিচ্ছি। ট্রিপল কম্বো!",
    rule: "অতীতে শুরু হয়ে এখনো চলছে এমন কাজ, যার সময়কাল উল্লেখ থাকে, তা বোঝাতে Present Perfect Continuous ব্যবহৃত হয়।",
    points: [
      "গঠন: have/has been + V-ing",
      "সময়কাল প্রায় সবসময় উল্লেখ থাকে: for two hours, since morning",
      "Present Perfect শেষ হওয়া বোঝায়, এটি চলমানতা বোঝায়",
      "State Verb এখানেও বসে না",
    ],
    formulas: [
      {
        label: "Affirmative",
        formula: "Subject + have/has been + V-ing + for/since …",
        example: "It has been raining since morning.",
      },
      {
        label: "Negative",
        formula: "Subject + have/has not been + V-ing",
        example: "He has not been working.",
      },
      {
        label: "Interrogative",
        formula: "Have/Has + Subject + been + V-ing?",
        example: "Have you been waiting long?",
      },
    ],
    examples: [
      "I have been reading this book for three hours.",
      "She has been teaching here since 2018.",
      "They have been waiting for the bus for an hour.",
      "It has been raining all day.",
    ],
    wrongRight: [
      {
        wrong: "I am reading this book since morning.",
        right: "I have been reading this book since morning.",
        why: "since/for দিয়ে সময়কাল বোঝালে Present Continuous নয়, Present Perfect Continuous বসে।",
      },
      {
        wrong: "He has been knowing me for years.",
        right: "He has known me for years.",
        why: "know State Verb — Continuous রূপ হয় না, তাই Present Perfect।",
      },
      {
        wrong: "She has being working here.",
        right: "She has been working here.",
        why: "'being' নয়, 'been' বসবে।",
      },
    ],
    trick:
      "বাংলায় **‘ধরে/যাবৎ’** শব্দটা থাকলে ৯০% ক্ষেত্রেই Perfect Continuous। ‘দুই ঘণ্টা ধরে’ = for two hours + have been।",
    quiz: [
      {
        q: "‘We ___ for you since 10 o'clock.’",
        options: ["wait", "are waiting", "have been waiting", "waited"],
        answer: 2,
        explain: "since + সময়বিন্দু, কাজ এখনো চলছে — Present Perfect Continuous।",
      },
      {
        q: "কোনটি সঠিক?",
        options: [
          "He has been ill for a week.",
          "He has been being ill for a week.",
          "He is being ill for a week.",
          "He has being ill for a week.",
        ],
        answer: 0,
        explain: "'be' State — Present Perfect (has been) ব্যবহৃত হয়।",
      },
      {
        q: "‘It ___ since morning.’",
        options: ["rains", "is raining", "has been raining", "rained"],
        answer: 2,
        explain: "since morning = সময়কাল, কাজ চলমান।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "past-simple",
    category: "tense",
    title: "Past Indefinite / Simple",
    titleBn: "সাধারণ অতীত",
    hook: "‘গতকাল খেয়েছিলাম’ — শেষ, ফুরিয়ে গেছে, আর ফিরে আসবে না। Past Simple হলো অতীতের ফুলস্টপ।",
    rule: "অতীতে সম্পন্ন হয়ে গেছে এমন কাজ বা অতীতের অভ্যাস বোঝাতে Past Simple ব্যবহৃত হয়।",
    points: [
      "গঠন: Subject + V2",
      "Negative/Interrogative-এ 'did' বসে, verb base form-এ ফেরে",
      "Time expression: yesterday, ago, last night/week/year, in 1971, once",
      "অতীতের অভ্যাস বোঝাতে used to + V1-ও ব্যবহৃত হয়",
      "Person নির্বিশেষে V2 একই থাকে — কোনো -s/-es নেই",
    ],
    formulas: [
      { label: "Affirmative", formula: "Subject + V2", example: "He went to school." },
      { label: "Negative", formula: "Subject + did not + V1", example: "He did not go to school." },
      { label: "Interrogative", formula: "Did + Subject + V1?", example: "Did he go to school?" },
    ],
    examples: [
      "Bangladesh became independent in 1971.",
      "I met him two days ago.",
      "She did not attend the class yesterday.",
      "He used to smoke, but he quit.",
    ],
    wrongRight: [
      {
        wrong: "He did not went there.",
        right: "He did not go there.",
        why: "'did' থাকলে মূল verb base form (V1) হবে।",
      },
      {
        wrong: "Did you saw the movie?",
        right: "Did you see the movie?",
        why: "একই নিয়ম — did + base form।",
      },
      {
        wrong: "I have visited Sylhet last year.",
        right: "I visited Sylhet last year.",
        why: "'last year' নির্দিষ্ট past time — Past Simple।",
      },
    ],
    trick:
      "**did এলেই verb নিরস্ত্র হয়ে যায়** — কোনো -ed, কোনো V2, কোনো -s নয়। শুধু base form।",
    quiz: [
      {
        q: "‘She ___ the letter last night.’",
        options: ["write", "writes", "wrote", "has written"],
        answer: 2,
        explain: "last night = past time, তাই V2 'wrote'।",
      },
      {
        q: "কোনটি সঠিক?",
        options: [
          "Did he came?",
          "Did he come?",
          "Did he comes?",
          "Did he coming?",
        ],
        answer: 1,
        explain: "Did + Subject + base form।",
      },
      {
        q: "‘I ___ to play cricket in my childhood.’",
        options: ["use", "used", "am used", "have used"],
        answer: 1,
        explain: "অতীতের অভ্যাস — 'used to'।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "past-continuous",
    category: "tense",
    title: "Past Continuous",
    titleBn: "ঘটমান অতীত",
    hook: "‘আমি যখন পড়ছিলাম, তখন বিদ্যুৎ চলে গেল’ — একটা চলছিল, আরেকটা হুট করে এসে পড়ল। ক্লাসিক Past Continuous।",
    rule: "অতীতে কোনো নির্দিষ্ট সময়ে চলমান ছিল এমন কাজ বোঝাতে Past Continuous ব্যবহৃত হয়।",
    points: [
      "গঠন: was/were + V-ing",
      "I/he/she/it/একবচন → was | we/you/they/বহুবচন → were",
      "দীর্ঘ কাজ Past Continuous-এ, হঠাৎ ঘটা ছোট কাজ Past Simple-এ",
      "while + Past Continuous | when + Past Simple — এই জুটি মনে রাখুন",
    ],
    formulas: [
      { label: "Affirmative", formula: "Subject + was/were + V-ing", example: "They were playing." },
      {
        label: "দুই কাজ একসাথে",
        formula: "While + S + was/were + V-ing, S + V2",
        example: "While I was reading, the phone rang.",
      },
      {
        label: "সমান্তরাল কাজ",
        formula: "S + was/were + V-ing + while + S + was/were + V-ing",
        example: "She was cooking while he was cleaning.",
      },
    ],
    examples: [
      "It was raining at 5 o'clock yesterday.",
      "While she was singing, the guests arrived.",
      "They were not watching TV.",
      "What were you doing at midnight?",
    ],
    wrongRight: [
      {
        wrong: "While I was reading, the phone was ringing.",
        right: "While I was reading, the phone rang.",
        why: "হঠাৎ ঘটা ছোট কাজ Past Simple-এ বসে।",
      },
      {
        wrong: "They was playing football.",
        right: "They were playing football.",
        why: "They বহুবচন — তাই 'were'।",
      },
      {
        wrong: "I was knowing him then.",
        right: "I knew him then.",
        why: "know State Verb — Continuous হয় না।",
      },
    ],
    trick:
      "**‘While’-এর সাথে -ing, ‘When’-এর সাথে V2** — এই জোড়াটা মনে রাখলে ৮০% প্রশ্নের উত্তর পেয়ে যাবেন।",
    quiz: [
      {
        q: "‘When I entered the room, they ___ television.’",
        options: ["watch", "watched", "were watching", "have watched"],
        answer: 2,
        explain: "প্রবেশ করার সময় কাজটি চলছিল — Past Continuous।",
      },
      {
        q: "‘While she ___, someone knocked at the door.’",
        options: ["slept", "was sleeping", "sleeps", "has slept"],
        answer: 1,
        explain: "while + Past Continuous।",
      },
      {
        q: "কোনটি সঠিক?",
        options: [
          "He were writing.",
          "He was writing.",
          "He was write.",
          "He were wrote.",
        ],
        answer: 1,
        explain: "He একবচন — 'was' + V-ing।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "past-perfect",
    category: "tense",
    title: "Past Perfect",
    titleBn: "পুরাঘটিত অতীত",
    hook: "অতীতে দুটো কাজ হলে — যেটা আগে হয়েছিল সেটা Past Perfect, পরেরটা Past Simple। সময়ের সিরিয়াল ঠিক রাখার নিয়ম।",
    rule: "অতীতে দুটি কাজের মধ্যে যেটি আগে সম্পন্ন হয়েছিল, তা Past Perfect-এ (had + V3) এবং পরেরটি Past Simple-এ (V2) বসে।",
    points: [
      "গঠন: had + V3 (সব person-এর জন্য একই)",
      "before থাকলে: আগের কাজ had + V3, পরের কাজ V2",
      "after থাকলে: ক্রম উল্টে যায় — after-এর পরের অংশে had + V3",
      "শুধু একটি কাজ থাকলে সাধারণত Past Perfect লাগে না",
      "হতাশা/অপূর্ণ ইচ্ছা: I wish I had studied harder.",
    ],
    formulas: [
      {
        label: "before দিয়ে",
        formula: "S + had + V3 + before + S + V2",
        example: "The train had left before we reached.",
      },
      {
        label: "after দিয়ে",
        formula: "After + S + had + V3, S + V2",
        example: "After he had finished, he went home.",
      },
      {
        label: "অপূর্ণ ইচ্ছা",
        formula: "I wish + S + had + V3",
        example: "I wish I had listened to you.",
      },
    ],
    examples: [
      "The patient had died before the doctor came.",
      "After the guests had left, she cleaned the room.",
      "He had never seen snow before he went to Nepal.",
      "I realized that I had lost my wallet.",
    ],
    wrongRight: [
      {
        wrong: "The train left before we had reached.",
        right: "The train had left before we reached.",
        why: "আগে ঘটা কাজে had + V3 বসে — ট্রেন আগে ছেড়েছিল।",
      },
      {
        wrong: "After he finished the work, he had gone home.",
        right: "After he had finished the work, he went home.",
        why: "'after'-এর পরের clause-এ আগের কাজ, তাই সেখানে had + V3।",
      },
      {
        wrong: "I wish I studied harder.",
        right: "I wish I had studied harder.",
        why: "অতীতের অপূর্ণ ইচ্ছা প্রকাশে 'wish + had + V3'।",
      },
    ],
    trick:
      "**Before-এর বাঁ পাশে had, After-এর ডান পাশে had।** এই এক লাইনে পুরো Past Perfect।",
    quiz: [
      {
        q: "‘He ___ the work before I arrived.’",
        options: ["finished", "had finished", "has finished", "was finishing"],
        answer: 1,
        explain: "before-এর আগের অংশে had + V3।",
      },
      {
        q: "‘After the sun ___, we started our journey.’",
        options: ["rose", "had risen", "has risen", "rises"],
        answer: 1,
        explain: "after-এর পরের clause-এ আগের কাজ — had + V3।",
      },
      {
        q: "‘I wish I ___ her advice.’",
        options: ["take", "took", "had taken", "have taken"],
        answer: 2,
        explain: "অতীতের অপূর্ণ ইচ্ছা — had + V3।",
      },
    ],
    minutes: 7,
  },
  {
    slug: "past-perfect-continuous",
    category: "tense",
    title: "Past Perfect Continuous",
    titleBn: "পুরাঘটিত ঘটমান অতীত",
    hook: "‘সে দুই ঘণ্টা ধরে অপেক্ষা করছিল, তারপর চলে গেল’ — অতীতেও কিছু কাজ ধরে ধরে চলত।",
    rule: "অতীতে কোনো নির্দিষ্ট সময়ের আগে থেকে চলছিল এমন কাজ, যার সময়কাল উল্লেখ থাকে, তা বোঝাতে Past Perfect Continuous ব্যবহৃত হয়।",
    points: [
      "গঠন: had been + V-ing (সব person-এর জন্য একই — has/have নেই)",
      "সময়কাল সাধারণত উল্লেখ থাকে: for two hours, since morning",
      "Past Perfect শেষ হওয়া বোঝায়; এটি সেই সময় পর্যন্ত চলমান থাকা বোঝায়",
      "অতীতের কোনো অবস্থার কারণ ব্যাখ্যা করতেও ব্যবহৃত হয়: His eyes were red — he had been crying.",
      "State Verb (know, love, believe, want) এই Tense-এ বসে না",
      "সঙ্গী শব্দ: before, when, for, since, all day, all night",
    ],
    formulas: [
      {
        label: "Affirmative",
        formula: "S + had been + V-ing + for/since + সময় + before + S + V2",
        example: "He had been waiting for an hour before she came.",
      },
      {
        label: "Negative",
        formula: "S + had not been + V-ing",
        example: "She had not been feeling well.",
      },
      {
        label: "Interrogative",
        formula: "Had + S + been + V-ing?",
        example: "Had they been living there long?",
      },
      {
        label: "কারণ ব্যাখ্যা",
        formula: "S + V2 + because + S + had been + V-ing",
        example: "He was tired because he had been working all day.",
      },
    ],
    examples: [
      "She had been teaching for ten years before she retired.",
      "It had been raining since morning when we started.",
      "They had been living in Dhaka for five years before moving to Khulna.",
      "The ground was wet because it had been raining.",
      "Had you been waiting long when the train arrived?",
    ],
    wrongRight: [
      {
        wrong: "He was waiting for two hours before she came.",
        right: "He had been waiting for two hours before she came.",
        why: "অতীতের একটি বিন্দুর আগে থেকে চলমান কাজ ও সময়কাল — Past Perfect Continuous।",
      },
      {
        wrong: "She had being working there.",
        right: "She had been working there.",
        why: "'being' নয়, 'been' বসবে।",
      },
      {
        wrong: "They had been knowing each other for years.",
        right: "They had known each other for years.",
        why: "know একটি State Verb — এর Continuous রূপ হয় না, তাই Past Perfect।",
      },
      {
        wrong: "He has been working there before he resigned.",
        right: "He had been working there before he resigned.",
        why: "পুরো ঘটনাই অতীতে — তাই has নয়, had বসবে।",
      },
    ],
    trick:
      "Present Perfect Continuous-এর **have/has** কে **had** বানিয়ে দিলেই Past Perfect Continuous — এক শব্দের পার্থক্য। আর ‘had been’ কখনো ‘had being’ হয় না।",
    quiz: [
      {
        q: "‘They ___ for hours before the bus finally arrived.’",
        options: ["waited", "were waiting", "had been waiting", "have been waiting"],
        answer: 2,
        explain: "অতীতের একটি বিন্দুর আগে থেকে চলছিল + সময়কাল।",
      },
      {
        q: "সঠিক গঠন কোনটি?",
        options: ["had being + V-ing", "had been + V-ing", "has been + V-ing", "had been + V3"],
        answer: 1,
        explain: "had been + V-ing।",
      },
      {
        q: "‘His clothes were muddy because he ___ football.’",
        options: ["played", "has been playing", "had been playing", "was play"],
        answer: 2,
        explain: "অতীতের অবস্থার কারণ ব্যাখ্যা — had been + V-ing।",
      },
      {
        q: "‘She ___ in that company for six years before she quit.’",
        options: ["had been working", "has been working", "was working", "worked"],
        answer: 0,
        explain: "before-এর আগের চলমান কাজ + সময়কাল।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "future-simple",
    category: "tense",
    title: "Future Indefinite / Simple",
    titleBn: "সাধারণ ভবিষ্যৎ",
    hook: "‘কাল পড়ব’ — এই প্রতিজ্ঞাটা আমরা সবাই করি। Future Simple শেখার আগে বাস্তবায়নটাও শিখে নিন! 😄",
    rule: "ভবিষ্যতে ঘটবে এমন কাজ বোঝাতে Future Simple ব্যবহৃত হয়। গঠন: will/shall + V1।",
    points: [
      "আধুনিক ইংরেজিতে সব person-এর সাথেই 'will' চলে; 'shall' মূলত I/we-এর সাথে আনুষ্ঠানিক বা প্রস্তাবে",
      "will + V1 — সবসময় base form, কোনো -s নেই",
      "Time expression: tomorrow, next week, soon, in future",
      "পূর্বপরিকল্পিত কাজে 'be going to' বেশি স্বাভাবিক: I am going to buy a car.",
      "If/when/as soon as-এর পরে future time হলেও Present Simple বসে",
    ],
    formulas: [
      { label: "Affirmative", formula: "S + will + V1", example: "I will call you." },
      { label: "Negative", formula: "S + will not (won't) + V1", example: "I will not call you." },
      { label: "Interrogative", formula: "Will + S + V1?", example: "Will you call me?" },
      {
        label: "Time clause",
        formula: "If/When/As soon as + Present Simple, S + will + V1",
        example: "If it rains, I will stay home.",
      },
    ],
    examples: [
      "It will rain tomorrow.",
      "I shall be twenty next month.",
      "She will not attend the meeting.",
      "As soon as he comes, we will start.",
    ],
    wrongRight: [
      {
        wrong: "If it will rain, I will stay home.",
        right: "If it rains, I will stay home.",
        why: "If-clause-এ ভবিষ্যতের কথা হলেও Present Simple বসে, will নয়।",
      },
      {
        wrong: "He will goes to Dhaka.",
        right: "He will go to Dhaka.",
        why: "will-এর পরে সবসময় base form।",
      },
      {
        wrong: "When he will come, tell me.",
        right: "When he comes, tell me.",
        why: "time clause-এ Present Simple বসে।",
      },
    ],
    trick:
      "**If / When / As soon as / Until / Before-এর ঘরে ‘will’ ঢোকা নিষেধ।** ওখানে Present Simple পাহারা দেয়।",
    quiz: [
      {
        q: "‘If you ___ hard, you will succeed.’",
        options: ["will work", "work", "worked", "are working"],
        answer: 1,
        explain: "If-clause-এ Present Simple বসে।",
      },
      {
        q: "‘She ___ come tomorrow.’",
        options: ["will", "will to", "wills", "is will"],
        answer: 0,
        explain: "will + base form।",
      },
      {
        q: "‘I ___ finish the work by evening.’",
        options: ["will", "am", "have", "did"],
        answer: 0,
        explain: "ভবিষ্যতের কাজ — will।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "future-continuous",
    category: "tense",
    title: "Future Continuous",
    titleBn: "ঘটমান ভবিষ্যৎ",
    hook: "‘কাল এই সময়ে আমি প্লেনে বসে থাকব’ — ভবিষ্যতের একটা নির্দিষ্ট মুহূর্তে কাজটা চলতে থাকবে।",
    rule: "ভবিষ্যতে কোনো নির্দিষ্ট সময়ে কাজটি চলমান থাকবে বোঝাতে Future Continuous ব্যবহৃত হয়।",
    points: [
      "গঠন: will be + V-ing (সব person-এর জন্য একই)",
      "ভবিষ্যতের নির্দিষ্ট মুহূর্তে কাজটি চলতে থাকবে বোঝায়",
      "Time expression: this time tomorrow, at 8 pm tomorrow, when you arrive, all day tomorrow",
      "ভদ্রভাবে কারো পরিকল্পনা জানতে চাইতেও ব্যবহৃত হয়: Will you be using the car tonight?",
      "স্বাভাবিকভাবে ঘটবে এমন কাজ বোঝাতেও ব্যবহৃত হয়: He will be coming to office as usual.",
      "State Verb এই Tense-এ বসে না — I will be knowing ❌",
      "shall be + V-ing শুধু I/we-এর সাথে আনুষ্ঠানিক লেখায় চলে",
    ],
    formulas: [
      { label: "Affirmative", formula: "S + will be + V-ing", example: "I will be sleeping at midnight." },
      { label: "Negative", formula: "S + will not (won't) be + V-ing", example: "He will not be coming." },
      { label: "Interrogative", formula: "Will + S + be + V-ing?", example: "Will you be waiting for me?" },
      {
        label: "when-clause সহ",
        formula: "When + S + Present Simple, S + will be + V-ing",
        example: "When you arrive, I will be cooking dinner.",
      },
    ],
    examples: [
      "This time tomorrow I will be flying to Dubai.",
      "She will be waiting for you at the station.",
      "They will not be attending the seminar.",
      "Will you be using the printer this afternoon?",
      "When the guests come, we will be having lunch.",
    ],
    wrongRight: [
      {
        wrong: "I will be go there tomorrow.",
        right: "I will be going there tomorrow.",
        why: "will be-এর পরে অবশ্যই V-ing বসবে।",
      },
      {
        wrong: "This time tomorrow I will sleep.",
        right: "This time tomorrow I will be sleeping.",
        why: "ভবিষ্যতের নির্দিষ্ট মুহূর্তে চলমানতা — Future Continuous।",
      },
      {
        wrong: "When you will come, I will be cooking.",
        right: "When you come, I will be cooking.",
        why: "time clause-এ 'will' বসে না, Present Simple বসে।",
      },
      {
        wrong: "I will be knowing the result by then.",
        right: "I will know the result by then.",
        why: "know একটি State Verb — এর Continuous রূপ হয় না।",
      },
    ],
    trick:
      "**will + be + ing** — এই তিন টুকরো একসাথে না থাকলে Future Continuous হয় না। আর ‘this time tomorrow’ দেখলেই এই Tense।",
    quiz: [
      {
        q: "‘At 9 pm tomorrow, we ___ dinner.’",
        options: ["will have", "will be having", "have", "had"],
        answer: 1,
        explain: "ভবিষ্যতের নির্দিষ্ট সময়ে চলমান কাজ।",
      },
      {
        q: "সঠিক গঠন কোনটি?",
        options: ["will + V-ing", "will be + V-ing", "will been + V-ing", "will be + V3"],
        answer: 1,
        explain: "will be + V-ing।",
      },
      {
        q: "‘When you ___ home, I will be studying.’",
        options: ["will reach", "reach", "reached", "will be reaching"],
        answer: 1,
        explain: "time clause-এ Present Simple বসে।",
      },
      {
        q: "‘This time next week they ___ in Cox's Bazar.’",
        options: ["will stay", "stay", "will be staying", "are staying"],
        answer: 2,
        explain: "‘this time next week’ = ভবিষ্যতের নির্দিষ্ট মুহূর্ত, কাজ চলমান থাকবে।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "future-perfect",
    category: "tense",
    title: "Future Perfect",
    titleBn: "পুরাঘটিত ভবিষ্যৎ",
    hook: "‘আগামী ডিসেম্বরের মধ্যে আমি বইটা শেষ করে ফেলব’ — ভবিষ্যতের একটা ডেডলাইনের আগেই কাজ শেষ।",
    rule: "ভবিষ্যতে কোনো নির্দিষ্ট সময়ের মধ্যে বা তার আগেই কাজটি সম্পন্ন হয়ে যাবে বোঝাতে Future Perfect ব্যবহৃত হয়।",
    points: [
      "গঠন: will have + V3 (সব person-এর জন্য একই)",
      "ভবিষ্যতের কোনো নির্দিষ্ট সময়ের মধ্যে বা তার আগেই কাজ শেষ হয়ে যাবে বোঝায়",
      "সঙ্গী শব্দ: by + সময় (by tomorrow, by next year, by 2030), by the time, before",
      "'by the time'-এর পরে Present Simple বসে, কখনো will নয়",
      "বর্তমান সম্পর্কে দৃঢ় অনুমান বোঝাতেও ব্যবহৃত হয়: They will have reached home by now.",
      "Negative-এ 'will not have + V3', Interrogative-এ 'Will + S + have + V3?'",
      "‘by’ মানে ওই সময়ের মধ্যেই, আর ‘until’ মানে ওই সময় পর্যন্ত — দুটো এক নয়",
    ],
    formulas: [
      { label: "Affirmative", formula: "S + will have + V3 + by + সময়", example: "I will have finished by 6 pm." },
      { label: "Negative", formula: "S + will not have + V3", example: "She will not have arrived yet." },
      { label: "Interrogative", formula: "Will + S + have + V3?", example: "Will you have finished by then?" },
      {
        label: "by the time",
        formula: "By the time + S + V1(s), S + will have + V3",
        example: "By the time you arrive, I will have left.",
      },
      {
        label: "বর্তমানের অনুমান",
        formula: "S + will have + V3 + by now",
        example: "He will have reached Dhaka by now.",
      },
    ],
    examples: [
      "By next month, she will have completed her course.",
      "They will have reached home by now.",
      "By the time he comes, we will have finished dinner.",
      "I will not have read the whole book by Friday.",
      "Will they have announced the result by Sunday?",
    ],
    wrongRight: [
      {
        wrong: "By next year I will complete my degree.",
        right: "By next year I will have completed my degree.",
        why: "'by + ভবিষ্যৎ সময়' থাকলে Future Perfect বসে।",
      },
      {
        wrong: "By the time he will come, I will have left.",
        right: "By the time he comes, I will have left.",
        why: "'by the time' একটি time clause — সেখানে Present Simple বসে।",
      },
      {
        wrong: "She will have went home by then.",
        right: "She will have gone home by then.",
        why: "will have-এর পরে V3 — go-এর V3 হলো 'gone'।",
      },
      {
        wrong: "I will have finished the work until 5 pm.",
        right: "I will have finished the work by 5 pm.",
        why: "নির্দিষ্ট সময়ের 'মধ্যে' বোঝাতে 'by', 'until' নয়।",
      },
    ],
    trick:
      "**‘by + সময়’ দেখলেই will have + V3** — প্রায় নির্ভুল একটা সিগন্যাল। আর ‘by the time’-এর ঘরে will ঢোকা নিষেধ।",
    quiz: [
      {
        q: "‘By 2030, technology ___ everything.’",
        options: ["will change", "will have changed", "changes", "changed"],
        answer: 1,
        explain: "by + ভবিষ্যৎ সময় — Future Perfect।",
      },
      {
        q: "‘By the time you ___, I will have gone.’",
        options: ["will arrive", "arrive", "arrived", "are arriving"],
        answer: 1,
        explain: "'by the time' time clause — Present Simple।",
      },
      {
        q: "‘He ___ the letter by tomorrow evening.’",
        options: ["will write", "will have written", "will be writing", "writes"],
        answer: 1,
        explain: "by + ভবিষ্যৎ সময়ে কাজ শেষ হবে — will have + V3।",
      },
      {
        q: "কোনটি সঠিক?",
        options: [
          "They will have arrive by now.",
          "They will have arrived by now.",
          "They will has arrived by now.",
          "They will have arriving by now.",
        ],
        answer: 1,
        explain: "will have + V3।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "future-perfect-continuous",
    category: "tense",
    title: "Future Perfect Continuous",
    titleBn: "পুরাঘটিত ঘটমান ভবিষ্যৎ",
    hook: "সবচেয়ে লম্বা নাম, কিন্তু সবচেয়ে কম ব্যবহৃত। পরীক্ষায় আসে, বাস্তবে খুব কম।",
    rule: "ভবিষ্যতে কোনো নির্দিষ্ট সময় পর্যন্ত কাজটি চলতে থাকবে এবং তার সময়কাল উল্লেখ থাকবে — এমন ক্ষেত্রে Future Perfect Continuous ব্যবহৃত হয়।",
    points: [
      "গঠন: will have been + V-ing (সব person-এর জন্য একই)",
      "ভবিষ্যতের কোনো নির্দিষ্ট সময় পর্যন্ত কাজটি একটানা চলতে থাকবে বোঝায়",
      "সময়কাল প্রায় সবসময় থাকে: for five years, for two hours",
      "সাধারণত 'by + সময়' এবং 'for + সময়কাল' একসাথে বসে",
      "Future Perfect শেষ হওয়া বোঝায়; এটি সেই সময় পর্যন্ত চলতে থাকা বোঝায়",
      "State Verb এই Tense-এ বসে না — will have been knowing ❌",
      "চার Perfect Continuous-এর পার্থক্য শুধু শুরুতে: have/has been · had been · will have been",
    ],
    formulas: [
      {
        label: "Affirmative",
        formula: "S + will have been + V-ing + for + সময়কাল + by + সময়",
        example: "By June, I will have been working here for five years.",
      },
      {
        label: "Negative",
        formula: "S + will not have been + V-ing",
        example: "She will not have been waiting long.",
      },
      {
        label: "Interrogative",
        formula: "Will + S + have been + V-ing?",
        example: "Will you have been studying for three hours by then?",
      },
    ],
    examples: [
      "By next month, they will have been living here for a decade.",
      "By 5 pm, she will have been studying for six hours.",
      "By the time the match ends, we will have been watching for four hours.",
      "He will not have been sleeping that long.",
    ],
    wrongRight: [
      {
        wrong: "By June, I will have working here for five years.",
        right: "By June, I will have been working here for five years.",
        why: "'been' বাদ দেওয়া যায় না — will have been + V-ing।",
      },
      {
        wrong: "By 5 pm she will have studied for six hours continuously.",
        right: "By 5 pm she will have been studying for six hours.",
        why: "একটানা চলতে থাকা বোঝালে Future Perfect Continuous বসে।",
      },
      {
        wrong: "By next year he will have been knowing me for a decade.",
        right: "By next year he will have known me for a decade.",
        why: "know একটি State Verb — এর Continuous রূপ হয় না।",
      },
    ],
    trick:
      "চারটি Perfect Continuous-এর পার্থক্য শুধু প্রথম অংশে: **have/has been · had been · will have been** — তারপর সবসময়ই + V-ing।",
    quiz: [
      {
        q: "‘By December, he ___ in this company for ten years.’",
        options: [
          "will work",
          "will have worked",
          "will have been working",
          "is working",
        ],
        answer: 2,
        explain: "by + সময় এবং for + সময়কাল একসাথে — Future Perfect Continuous।",
      },
      {
        q: "সঠিক গঠন কোনটি?",
        options: [
          "will have been + V-ing",
          "will been have + V-ing",
          "will have + V-ing",
          "will be have + V-ing",
        ],
        answer: 0,
        explain: "will have been + V-ing।",
      },
      {
        q: "‘By the time the film ends, we ___ for three hours.’",
        options: [
          "will have been watching",
          "will watch",
          "have watched",
          "will be watch",
        ],
        answer: 0,
        explain: "নির্দিষ্ট সময় পর্যন্ত একটানা চলা + সময়কাল।",
      },
    ],
    minutes: 6,
  },
];
