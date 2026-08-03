import type { GrammarLesson } from "@/lib/types";

export const POLISH_LESSONS: readonly GrammarLesson[] = [
  {
    slug: "punctuation",
    category: "polish",
    title: "Punctuation",
    titleBn: "যতিচিহ্ন",
    hook: "‘Let's eat, Grandma!’ আর ‘Let's eat Grandma!’ — একটা কমা দাদিকে বাঁচিয়ে দিল। যতিচিহ্ন জীবন বাঁচায়!",
    rule: "Punctuation বাক্যের অর্থ স্পষ্ট করে এবং পাঠকের পড়ার গতি নিয়ন্ত্রণ করে। ভুল যতিচিহ্ন অর্থ সম্পূর্ণ বদলে দিতে পারে।",
    points: [
      "Full stop (.) — বিবৃতিমূলক বাক্যের শেষে",
      "Comma (,) — তালিকা, ভূমিকামূলক অংশ, Non-defining clause",
      "Semicolon (;) — সম্পর্কিত দুটি স্বাধীন clause জোড়ার সময়",
      "Colon (:) — তালিকা বা ব্যাখ্যা শুরুর আগে",
      "Apostrophe (') — মালিকানা (Rahim's) ও সংক্ষেপ (don't)",
      "Quotation marks (\" \") — সরাসরি উক্তি",
      "Question mark (?) ও Exclamation mark (!) — প্রশ্ন ও আবেগ",
    ],
    formulas: [
      {
        label: "মালিকানা",
        formula: "একবচন + 's | বহুবচন (-s শেষ) + '",
        example: "the boy's book / the boys' books",
      },
      {
        label: "Non-defining clause",
        formula: "Noun, who/which …, + বাকি বাক্য",
        example: "Rahim, who is my friend, came.",
      },
      {
        label: "Semicolon",
        formula: "Independent clause; Independent clause",
        example: "It was raining; we stayed home.",
      },
    ],
    examples: [
      "I bought apples, bananas, and oranges.",
      "He said, \"I will come tomorrow.\"",
      "This is Rahim's book. Those are the students' bags.",
      "It's raining. (it is) / Its colour is red. (মালিকানা)",
    ],
    wrongRight: [
      {
        wrong: "Its raining outside.",
        right: "It's raining outside.",
        why: "It's = it is। Its = মালিকানাবাচক (এর)।",
      },
      {
        wrong: "The boys book is torn. (একজন ছেলের বই)",
        right: "The boy's book is torn.",
        why: "একবচন মালিকানায় apostrophe + s।",
      },
      {
        wrong: "He is tired, he wants to sleep.",
        right: "He is tired; he wants to sleep.",
        why: "দুটি স্বাধীন clause শুধু কমায় জোড়া যায় না (Comma Splice) — semicolon বা conjunction লাগবে।",
      },
    ],
    trick:
      "**It's = it is** (সবসময়!)। যদি ‘it is’ বসিয়ে বাক্যটা ঠিক থাকে, তবে apostrophe দিন; নাহলে ‘its’।",
    quiz: [
      {
        q: "কোনটি সঠিক?",
        options: [
          "Its a beautiful day.",
          "It's a beautiful day.",
          "Its' a beautiful day.",
          "It is' a beautiful day.",
        ],
        answer: 1,
        explain: "It's = It is।",
      },
      {
        q: "‘The students___ common room is upstairs.’ (অনেক ছাত্রের)",
        options: ["'s", "s'", "'", "s's"],
        answer: 1,
        explain: "students বহুবচন এবং -s দিয়ে শেষ — শুধু apostrophe: students'।",
      },
      {
        q: "কোন চিহ্নটি দুটি সম্পর্কিত স্বাধীন clause জোড়ে?",
        options: ["Comma", "Semicolon", "Apostrophe", "Hyphen"],
        answer: 1,
        explain: "Semicolon (;)।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "capitalization",
    category: "polish",
    title: "Capitalization",
    titleBn: "বড় হাতের অক্ষর",
    hook: "‘i am from bangladesh’ — বানান ঠিক, গ্রামার ঠিক, তবু চাকরির ইন্টারভিউতে খারাপ ইমপ্রেশন। বড় হাতের অক্ষরও নম্বর কাটে।",
    rule: "নির্দিষ্ট নিয়মে ইংরেজিতে বড় হাতের অক্ষর (Capital Letter) ব্যবহার করতে হয়।",
    points: [
      "প্রতিটি বাক্যের প্রথম অক্ষর",
      "'I' সবসময় বড় হাতের, বাক্যের যেখানেই থাকুক",
      "Proper Noun — ব্যক্তি, স্থান, দেশ, সংস্থার নাম",
      "সপ্তাহের দিন, মাস, ছুটির নাম (কিন্তু ঋতুর নাম নয়)",
      "ভাষা ও জাতির নাম: Bengali, English, Bangladeshi",
      "বই/সিনেমা/পত্রিকার শিরোনামের প্রধান শব্দগুলো",
      "সরাসরি উক্তির প্রথম শব্দ",
    ],
    formulas: [
      {
        label: "দিন/মাস",
        formula: "Capital: Monday, January | small: summer, winter",
        example: "It was a cold Monday in January during winter.",
      },
    ],
    examples: [
      "I met Dr. Rahman in Dhaka on Friday.",
      "She speaks Bengali, English and Arabic.",
      "He said, \"Come here.\"",
      "I love reading The Daily Star.",
    ],
    wrongRight: [
      {
        wrong: "i live in dhaka, bangladesh.",
        right: "I live in Dhaka, Bangladesh.",
        why: "'I' সবসময় বড় হাতের এবং স্থান/দেশের নাম Proper Noun।",
      },
      {
        wrong: "I like Winter more than Summer.",
        right: "I like winter more than summer.",
        why: "ঋতুর নাম বড় হাতের অক্ষরে লেখা হয় না।",
      },
      {
        wrong: "He speaks bengali and english.",
        right: "He speaks Bengali and English.",
        why: "ভাষার নাম Proper Noun।",
      },
    ],
    trick:
      "**দিন-মাস বড়, ঋতু ছোট।** *Monday, January* বড় হাতের — কিন্তু *summer, winter* ছোট হাতের।",
    quiz: [
      {
        q: "কোনটি সঠিক?",
        options: [
          "i am learning english.",
          "I am learning English.",
          "I am learning english.",
          "i am learning English.",
        ],
        answer: 1,
        explain: "'I' এবং ভাষার নাম দুটোই বড় হাতের।",
      },
      {
        q: "কোন শব্দটি বড় হাতের অক্ষরে লেখা হয় না?",
        options: ["Monday", "December", "spring", "Eid"],
        answer: 2,
        explain: "ঋতুর নাম ছোট হাতের অক্ষরে।",
      },
    ],
    minutes: 4,
  },
  {
    slug: "spelling-rules",
    category: "polish",
    title: "Spelling Rules",
    titleBn: "বানানের নিয়ম",
    hook: "‘Recieve’ নাকি ‘Receive’? ইংরেজি বানান বিশৃঙ্খল, কিন্তু কিছু নিয়ম মানে — সেগুলো জানলেই অনেক ভুল বাঁচে।",
    rule: "ইংরেজি বানানের কিছু নির্ভরযোগ্য নিয়ম আছে যা বেশিরভাগ শব্দে খাটে।",
    points: [
      "i before e, except after c: believe, receive, ceiling (ব্যতিক্রম: seize, weird)",
      "শব্দের শেষে consonant + y → -ies: baby → babies, city → cities",
      "শব্দের শেষে vowel + y → শুধু -s: boy → boys, key → keys",
      "নীরব -e বাদ যায় vowel দিয়ে শুরু suffix-এ: make → making, hope → hoping",
      "এক-syllable + একক vowel + একক consonant → consonant দ্বিগুণ: stop → stopping, run → running",
      "-s, -sh, -ch, -x, -o দিয়ে শেষ হলে plural-এ -es: boxes, watches, potatoes",
      "-f/-fe → -ves: leaf → leaves, knife → knives",
    ],
    formulas: [
      { label: "y-এর নিয়ম", formula: "consonant + y → ies | vowel + y → s", example: "city→cities, day→days" },
      { label: "double consonant", formula: "CVC (stressed) + suffix → double", example: "begin → beginning" },
    ],
    examples: [
      "believe, achieve, receive, deceive",
      "study → studies → studying (y থাকে -ing-এ)",
      "occur → occurred → occurring",
      "life → lives, wolf → wolves",
    ],
    wrongRight: [
      {
        wrong: "I recieved your letter.",
        right: "I received your letter.",
        why: "c-এর পরে 'ei' — receive, deceive, ceiling।",
      },
      {
        wrong: "He is studing hard.",
        right: "He is studying hard.",
        why: "-ing যোগ করার সময় y অপরিবর্তিত থাকে।",
      },
      {
        wrong: "There are many childs in the park.",
        right: "There are many children in the park.",
        why: "child-এর অনিয়মিত বহুবচন 'children'।",
      },
      {
        wrong: "He is writting a letter.",
        right: "He is writing a letter.",
        why: "নীরব -e বাদ যায়, consonant দ্বিগুণ হয় না (write → writing)।",
      },
    ],
    trick:
      "**‘i’ আগে ‘e’, কিন্তু ‘c’-এর পরে উল্টো** — bel**ie**ve, ach**ie**ve, কিন্তু rec**ei**ve, dec**ei**ve।",
    quiz: [
      {
        q: "কোন বানানটি সঠিক?",
        options: ["recieve", "receive", "receve", "reciev"],
        answer: 1,
        explain: "c-এর পরে ei — receive।",
      },
      {
        q: "‘city’-এর plural কোনটি?",
        options: ["citys", "cityes", "cities", "citie"],
        answer: 2,
        explain: "consonant + y → ies।",
      },
      {
        q: "‘run’ + ing = ?",
        options: ["runing", "running", "runnning", "runeing"],
        answer: 1,
        explain: "CVC গঠন — শেষ consonant দ্বিগুণ হয়।",
      },
    ],
    minutes: 5,
  },
];
