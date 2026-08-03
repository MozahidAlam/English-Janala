import type { GrammarLesson } from "@/lib/types";

export const FOUNDATION_LESSONS: readonly GrammarLesson[] = [
  {
    slug: "parts-of-speech",
    category: "foundation",
    title: "Parts of Speech",
    titleBn: "পদ প্রকরণ",
    hook: "ইংরেজি ভাষা একটা ক্রিকেট টিম — ৮ জন খেলোয়াড়, প্রত্যেকের আলাদা কাজ। কে কী করে জানলে খেলাটা সহজ।",
    rule: "ইংরেজি বাক্যে ব্যবহৃত প্রতিটি শব্দকে তার কাজ অনুযায়ী ৮ ভাগে ভাগ করা হয়। একই শব্দ বাক্যভেদে ভিন্ন Parts of Speech হতে পারে — তাই শব্দ দেখে নয়, **কাজ দেখে** চেনা লাগবে।",
    points: [
      "Noun — নাম বোঝায়: Rahim, Dhaka, book, honesty",
      "Pronoun — Noun-এর বদলে বসে: he, she, it, they, we",
      "Verb — কাজ বা অবস্থা বোঝায়: eat, run, is, seem",
      "Adjective — Noun-এর দোষ/গুণ/অবস্থা বোঝায়: good, tall, three",
      "Adverb — Verb/Adjective/অন্য Adverb-কে modify করে: slowly, very, yesterday",
      "Preposition — Noun/Pronoun-এর সাথে বাক্যের সম্পর্ক তৈরি করে: in, on, at, by",
      "Conjunction — শব্দ/বাক্য জোড়া লাগায়: and, but, because, although",
      "Interjection — আবেগ প্রকাশ করে: Alas!, Hurrah!, Oh!",
    ],
    formulas: [
      {
        label: "একই শব্দ, ভিন্ন পদ",
        formula: "শব্দের কাজ → Parts of Speech",
        example: "I gave him a call. (Noun) / Call me tonight. (Verb)",
      },
    ],
    examples: [
      "Alas! (Interjection) the poor (Adjective) boy (Noun) died (Verb) suddenly (Adverb) in (Preposition) the hospital, and (Conjunction) he (Pronoun) was only ten.",
      "Water is life. — এখানে water = Noun.",
      "Please water the plants. — এখানে water = Verb.",
    ],
    wrongRight: [
      {
        wrong: "He drives very careful.",
        right: "He drives very carefully.",
        why: "Verb (drives) কে modify করছে, তাই Adjective 'careful' নয়, Adverb 'carefully' লাগবে।",
      },
      {
        wrong: "She is a beautiful singing.",
        right: "She is a beautiful singer.",
        why: "Adjective-এর পরে Noun দরকার। 'singing' এখানে Noun হিসেবে বসে না, 'singer' বসবে।",
      },
    ],
    trick:
      "মনে রাখুন **NPVAAPCI** — Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Conjunction, Interjection। শব্দ দেখে নয়, বাক্যে তার কাজ দেখে পদ নির্ণয় করুন।",
    quiz: [
      {
        q: "‘The book on the table is mine.’ — এখানে 'on' কোন Parts of Speech?",
        options: ["Conjunction", "Preposition", "Adverb", "Adjective"],
        answer: 1,
        explain: "'on' এখানে book আর table-এর সম্পর্ক দেখাচ্ছে — তাই Preposition।",
      },
      {
        q: "‘Honesty is the best policy.’ — 'Honesty' কী?",
        options: ["Adjective", "Verb", "Noun", "Adverb"],
        answer: 2,
        explain: "গুণের নাম বোঝাচ্ছে — এটি Abstract Noun।",
      },
      {
        q: "কোনটি Interjection?",
        options: ["Although", "Hurrah!", "Quickly", "Beautiful"],
        answer: 1,
        explain: "Hurrah! আনন্দের আবেগ প্রকাশ করে, তাই Interjection।",
      },
      {
        q: "‘He runs fast.’ — 'fast' এখানে কী?",
        options: ["Adjective", "Adverb", "Noun", "Preposition"],
        answer: 1,
        explain: "'runs' (Verb) কীভাবে হচ্ছে তা বোঝাচ্ছে, তাই Adverb।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "noun",
    category: "foundation",
    title: "Noun",
    titleBn: "বিশেষ্য",
    hook: "পৃথিবীর সবকিছুর একটা নাম আছে — মানুষ, জায়গা, জিনিস, এমনকি ‘ভালোবাসা’-রও। সেই নামগুলোই Noun।",
    rule: "যে শব্দ দিয়ে কোনো ব্যক্তি, বস্তু, স্থান, প্রাণী বা গুণ/ভাবের নাম বোঝায় তাকে Noun বলে।",
    points: [
      "Proper Noun — নির্দিষ্ট নাম, সবসময় বড় হাতের অক্ষরে: Rahim, Dhaka, Monday",
      "Common Noun — সাধারণ শ্রেণির নাম: boy, city, book",
      "Collective Noun — সমষ্টির নাম: team, family, crowd, army",
      "Material Noun — উপাদানের নাম: gold, water, rice (সাধারণত countable নয়)",
      "Abstract Noun — অনুভব করা যায় কিন্তু ছোঁয়া যায় না: honesty, beauty, childhood",
      "Countable Noun গুণা যায় (a book, two books); Uncountable গুণা যায় না (water, information)",
    ],
    formulas: [
      {
        label: "Abstract Noun তৈরি",
        formula: "Adjective + -ness / -ty / -th",
        example: "kind → kindness, honest → honesty, long → length",
      },
      {
        label: "Verb থেকে Noun",
        formula: "Verb + -ment / -tion / -ance",
        example: "judge → judgement, act → action, perform → performance",
      },
    ],
    examples: [
      "Dhaka (Proper) is the capital city (Common) of Bangladesh.",
      "The crowd (Collective) was shouting.",
      "His honesty (Abstract) impressed everyone.",
      "I need some information. — 'information' uncountable, তাই 'informations' হয় না।",
    ],
    wrongRight: [
      {
        wrong: "He gave me many informations.",
        right: "He gave me much information.",
        why: "information uncountable — এর plural হয় না, আর many-র বদলে much বসে।",
      },
      {
        wrong: "I bought two furnitures.",
        right: "I bought two pieces of furniture.",
        why: "furniture uncountable। গুণতে হলে 'pieces of' ব্যবহার করতে হয়।",
      },
      {
        wrong: "My all friends came.",
        right: "All my friends came.",
        why: "Determiner-এর ক্রম: All → my → friends।",
      },
    ],
    trick:
      "Uncountable-এর তালিকা মুখস্থ রাখুন: **information, advice, furniture, luggage, news, equipment, money, water, bread, work**। এগুলোর শেষে কখনো -s বসে না।",
    quiz: [
      {
        q: "কোনটি Abstract Noun?",
        options: ["Table", "Kindness", "Dhaka", "Army"],
        answer: 1,
        explain: "Kindness একটি গুণ — ছোঁয়া যায় না, তাই Abstract Noun।",
      },
      {
        q: "সঠিক বাক্য কোনটি?",
        options: [
          "She gave me two advices.",
          "She gave me two pieces of advice.",
          "She gave me two advice.",
          "She gave me a advices.",
        ],
        answer: 1,
        explain: "advice uncountable, তাই 'pieces of advice' বলতে হয়।",
      },
      {
        q: "‘The team is playing well.’ — 'team' কোন ধরনের Noun?",
        options: ["Material", "Abstract", "Collective", "Proper"],
        answer: 2,
        explain: "একদল খেলোয়াড়ের সমষ্টি বোঝাচ্ছে, তাই Collective Noun।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "pronoun",
    category: "foundation",
    title: "Pronoun",
    titleBn: "সর্বনাম",
    hook: "‘রহিম রহিমের বই রহিমের ব্যাগে রাখল’ — শুনতে অসহ্য না? Pronoun এই যন্ত্রণা থেকে বাঁচায়।",
    rule: "Noun-এর পুনরাবৃত্তি এড়াতে তার পরিবর্তে যে শব্দ বসে তাকে Pronoun বলে।",
    points: [
      "Personal — I, we, you, he, she, it, they",
      "Possessive — my/mine, our/ours, your/yours, his, her/hers, their/theirs",
      "Reflexive — myself, yourself, himself, themselves (কর্তা ও কর্ম একই হলে)",
      "Demonstrative — this, that, these, those",
      "Relative — who, whom, whose, which, that",
      "Interrogative — who, what, which, whose",
      "Indefinite — someone, anybody, everything, none",
    ],
    formulas: [
      {
        label: "Subject vs Object",
        formula: "Subject: I, we, he, she, they | Object: me, us, him, her, them",
        example: "He called me. / I called him.",
      },
      {
        label: "কর্তা-কর্ম একই",
        formula: "Subject + Verb + …self",
        example: "He hurt himself.",
      },
    ],
    examples: [
      "Rahim lost his bag; he searched for it everywhere.",
      "This is the book that I bought.",
      "Between you and me, the plan will fail.",
    ],
    wrongRight: [
      {
        wrong: "Me and my friend went to school.",
        right: "My friend and I went to school.",
        why: "কর্তার জায়গায় 'me' নয়, 'I' বসে। আর ভদ্রতার নিয়মে নিজেকে শেষে রাখতে হয়।",
      },
      {
        wrong: "Between you and I, this is a secret.",
        right: "Between you and me, this is a secret.",
        why: "Preposition (between)-এর পরে সবসময় objective form — 'me'।",
      },
      {
        wrong: "Everyone should do their duty.",
        right: "Everyone should do his duty.",
        why: "পরীক্ষার প্রথাগত নিয়মে everyone singular, তাই his/her বসে। (তবে আধুনিক ইংরেজিতে singular 'their' এখন গৃহীত।)",
      },
    ],
    trick:
      "**‘I’ নাকি ‘me’?** — বাক্য থেকে অন্যজনকে সরিয়ে দিন। ‘Me went to school’ শুনতে ভুল লাগে → তাই ‘I’ ঠিক।",
    quiz: [
      {
        q: "সঠিক বাক্য কোনটি?",
        options: [
          "He gave the book to I.",
          "He gave the book to me.",
          "He gave the book to myself.",
          "He gave the book to mine.",
        ],
        answer: 1,
        explain: "Preposition 'to'-এর পরে objective form 'me' বসে।",
      },
      {
        q: "‘The boy ___ won the prize is my brother.’",
        options: ["which", "who", "whom", "what"],
        answer: 1,
        explain: "ব্যক্তির জন্য এবং subject হিসেবে 'who' বসে।",
      },
      {
        q: "‘She cut ___ while cooking.’",
        options: ["her", "herself", "hers", "she"],
        answer: 1,
        explain: "কর্তা ও কর্ম একই ব্যক্তি — তাই Reflexive Pronoun 'herself'।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "verb",
    category: "foundation",
    title: "Verb",
    titleBn: "ক্রিয়া",
    hook: "Verb ছাড়া বাক্য মানে ইঞ্জিন ছাড়া গাড়ি — দেখতে সুন্দর, কিন্তু নড়ে না।",
    rule: "যে শব্দ দ্বারা কোনো কাজ করা, হওয়া বা থাকা বোঝায় তাকে Verb বলে। প্রতিটি পূর্ণ বাক্যে অন্তত একটি Finite Verb থাকতেই হবে।",
    points: [
      "Transitive Verb — object লাগে: He eats rice.",
      "Intransitive Verb — object লাগে না: He sleeps.",
      "Linking Verb — কর্তার সাথে বিশেষণ জোড়ে: is, am, are, seem, become, look",
      "Auxiliary Verb — সাহায্যকারী: be, have, do + modals",
      "Verb-এর ৩ রূপ মনে রাখা জরুরি: V1 (present) – V2 (past) – V3 (past participle)",
      "Regular verb: play–played–played | Irregular: go–went–gone",
    ],
    formulas: [
      {
        label: "Verb-এর রূপ",
        formula: "V1 – V2 – V3 – V-ing",
        example: "write – wrote – written – writing",
      },
      {
        label: "Linking verb-এর পরে",
        formula: "Linking Verb + Adjective (Adverb নয়)",
        example: "The soup tastes good. (❌ tastes well)",
      },
    ],
    examples: [
      "She is a doctor. (Linking)",
      "He has finished the work. (Auxiliary + Main)",
      "The baby sleeps quietly. (Intransitive)",
      "I bought a book. (Transitive — 'a book' object)",
    ],
    wrongRight: [
      {
        wrong: "The flower smells sweetly.",
        right: "The flower smells sweet.",
        why: "smell এখানে Linking Verb — এর পরে Adjective বসে, Adverb নয়।",
      },
      {
        wrong: "He did not went there.",
        right: "He did not go there.",
        why: "'did' থাকলে মূল Verb সর্বদা base form (V1) হবে।",
      },
      {
        wrong: "I have wrote a letter.",
        right: "I have written a letter.",
        why: "have/has-এর পরে V3 বসে — write-এর V3 হলো 'written'।",
      },
    ],
    trick:
      "**do/does/did থাকলে মূল verb কখনো বদলায় না** — সবসময় base form। ‘Did he went?’ চিরকালের ভুল।",
    quiz: [
      {
        q: "‘He ___ not come yesterday.’",
        options: ["did", "does", "do", "is"],
        answer: 0,
        explain: "yesterday = past, তাই 'did' এবং তার পরে base form 'come'।",
      },
      {
        q: "কোনটি সঠিক?",
        options: [
          "The cake tastes deliciously.",
          "The cake tastes delicious.",
          "The cake taste delicious.",
          "The cake tasting delicious.",
        ],
        answer: 1,
        explain: "taste এখানে Linking Verb, তাই Adjective 'delicious' বসবে।",
      },
      {
        q: "‘go’ এর V3 কোনটি?",
        options: ["went", "goed", "gone", "going"],
        answer: 2,
        explain: "go – went – gone।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "adjective",
    category: "foundation",
    title: "Adjective",
    titleBn: "বিশেষণ",
    hook: "‘একটা ছেলে’ আর ‘একটা লম্বা, ভদ্র, বুদ্ধিমান ছেলে’ — পার্থক্যটা Adjective-এর।",
    rule: "যে শব্দ Noun বা Pronoun-এর দোষ, গুণ, অবস্থা বা সংখ্যা প্রকাশ করে তাকে Adjective বলে।",
    points: [
      "Attributive — Noun-এর আগে বসে: a red car",
      "Predicative — Linking verb-এর পরে বসে: The car is red.",
      "Quantity: much, many, some, few, little",
      "Number: one, first, several",
      "few = প্রায় নেই (নেতিবাচক) | a few = কিছু আছে (ইতিবাচক)",
      "little = প্রায় নেই | a little = অল্প কিছু আছে | the little = যেটুকু আছে",
    ],
    formulas: [
      {
        label: "একাধিক Adjective-এর ক্রম",
        formula: "Opinion → Size → Age → Shape → Colour → Origin → Material → Purpose",
        example: "a beautiful small old round black Italian wooden dining table",
      },
      {
        label: "Countable / Uncountable",
        formula: "many/few + countable | much/little + uncountable",
        example: "many books, much water",
      },
    ],
    examples: [
      "He is an honest man.",
      "I have a few friends here. (কিছু বন্ধু আছে)",
      "I have few friends here. (প্রায় কোনো বন্ধু নেই)",
      "There is little hope. (আশা প্রায় নেই)",
    ],
    wrongRight: [
      {
        wrong: "She has much friends.",
        right: "She has many friends.",
        why: "friends countable — তাই many বসবে, much নয়।",
      },
      {
        wrong: "He is more taller than me.",
        right: "He is taller than me.",
        why: "Comparative-এ 'more' আর '-er' একসাথে বসে না — double comparative ভুল।",
      },
      {
        wrong: "a black big beautiful car",
        right: "a beautiful big black car",
        why: "Adjective-এর ক্রম: Opinion → Size → Colour।",
      },
    ],
    trick:
      "**OSASCOMP** — Opinion, Size, Age, Shape, Colour, Origin, Material, Purpose। একাধিক Adjective এই ক্রমেই বসে।",
    quiz: [
      {
        q: "‘I have ___ money, so I can buy it.’",
        options: ["little", "a little", "few", "a few"],
        answer: 1,
        explain: "ইতিবাচক অর্থ (কিছু আছে) এবং money uncountable — তাই 'a little'।",
      },
      {
        q: "কোন ক্রমটি সঠিক?",
        options: [
          "an old lovely wooden chair",
          "a lovely old wooden chair",
          "a wooden lovely old chair",
          "an old wooden lovely chair",
        ],
        answer: 1,
        explain: "Opinion (lovely) → Age (old) → Material (wooden)।",
      },
      {
        q: "‘How ___ students are in the class?’",
        options: ["much", "many", "little", "few"],
        answer: 1,
        explain: "students countable — তাই many।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "adverb",
    category: "foundation",
    title: "Adverb",
    titleBn: "ক্রিয়া বিশেষণ",
    hook: "Adjective সাজায় Noun-কে, Adverb সাজায় বাকি সবাইকে। এ যেন ভাষার মেকআপ আর্টিস্ট।",
    rule: "যে শব্দ Verb, Adjective বা অন্য Adverb-কে modify করে তাকে Adverb বলে।",
    points: [
      "Manner (কীভাবে): slowly, carefully, well",
      "Time (কখন): now, yesterday, soon, already",
      "Place (কোথায়): here, there, everywhere",
      "Frequency (কতবার): always, often, never, rarely",
      "Degree (কতটা): very, quite, too, almost, enough",
      "Frequency adverb সাধারণ verb-এর আগে কিন্তু be-verb-এর পরে বসে",
    ],
    formulas: [
      {
        label: "Adverb তৈরি",
        formula: "Adjective + -ly",
        example: "quick → quickly, happy → happily, true → truly",
      },
      {
        label: "Frequency adverb-এর অবস্থান",
        formula: "Subject + [adv] + main verb | Subject + be + [adv]",
        example: "He always comes late. / He is always late.",
      },
      {
        label: "enough-এর অবস্থান",
        formula: "Adjective/Adverb + enough | enough + Noun",
        example: "old enough, enough money",
      },
    ],
    examples: [
      "She sings beautifully. (Manner)",
      "I have already finished. (Time)",
      "He is very intelligent. (Degree — Adjective modify করছে)",
      "She never tells a lie.",
    ],
    wrongRight: [
      {
        wrong: "He speaks English good.",
        right: "He speaks English well.",
        why: "Verb modify করতে Adverb 'well' লাগে, Adjective 'good' নয়।",
      },
      {
        wrong: "He comes always late.",
        right: "He always comes late.",
        why: "Frequency adverb মূল verb-এর আগে বসে।",
      },
      {
        wrong: "She is enough old to drive.",
        right: "She is old enough to drive.",
        why: "Adjective-এর পরে 'enough' বসে, আগে নয়।",
      },
    ],
    trick:
      "**good vs well:** ‘good’ কেমন তা বলে (Adjective), ‘well’ কীভাবে তা বলে (Adverb)। *He is a good singer. He sings well.*",
    quiz: [
      {
        q: "‘She ___ goes to the gym.’ (frequency)",
        options: ["goes often", "often", "often goes", "go often"],
        answer: 2,
        explain: "Frequency adverb মূল verb-এর আগে: 'often goes'।",
      },
      {
        q: "‘He did the work ___.’",
        options: ["careful", "carefully", "care", "carefulness"],
        answer: 1,
        explain: "Verb 'did' modify করছে — তাই Adverb।",
      },
      {
        q: "কোনটি সঠিক?",
        options: [
          "He is enough tall.",
          "He is tall enough.",
          "He is tall much.",
          "He enough is tall.",
        ],
        answer: 1,
        explain: "Adjective + enough — এটাই সঠিক ক্রম।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "sentence-and-parts",
    category: "foundation",
    title: "Sentence & Its Parts",
    titleBn: "বাক্য ও তার অংশ",
    hook: "প্রতিটা বাক্যের দুটো অংশ — কে (Subject) আর সে কী করল (Predicate)। এটুকু ধরতে পারলেই অর্ধেক গ্রামার জেতা।",
    rule: "মনের ভাব সম্পূর্ণরূপে প্রকাশ করে এমন শব্দসমষ্টিকে Sentence বলে। প্রতিটি Sentence-এ একটি Subject ও একটি Predicate থাকে।",
    points: [
      "গঠন অনুসারে: Simple (এক Clause), Complex (Principal + Subordinate), Compound (দুই Principal Clause)",
      "অর্থ অনুসারে: Assertive, Interrogative, Imperative, Optative, Exclamatory",
      "Subject = কে/কারা কাজ করছে | Predicate = Verb সহ বাকি অংশ",
      "Imperative বাক্যে Subject (You) উহ্য থাকে: Sit down.",
      "Object দুই ধরনের: Direct (কী?) আর Indirect (কাকে?)",
    ],
    formulas: [
      {
        label: "মৌলিক গঠন",
        formula: "Subject + Verb + Object + Adverbial",
        example: "Rahim (S) reads (V) a book (O) every night (A).",
      },
      {
        label: "Complex Sentence",
        formula: "Principal Clause + Subordinate Clause",
        example: "I know that he is honest.",
      },
      {
        label: "Compound Sentence",
        formula: "Clause + and/but/or/so + Clause",
        example: "He came, but I was not at home.",
      },
    ],
    examples: [
      "The tall boy in the blue shirt (Subject) won the first prize (Predicate).",
      "What a beautiful morning! (Exclamatory)",
      "May Allah bless you. (Optative)",
      "Please close the door. (Imperative — Subject 'you' উহ্য)",
    ],
    wrongRight: [
      {
        wrong: "Because he was ill.",
        right: "He did not come because he was ill.",
        why: "শুধু Subordinate Clause দিয়ে বাক্য হয় না — এটি Sentence Fragment।",
      },
      {
        wrong: "He is honest, he is poor.",
        right: "He is honest but he is poor.",
        why: "দুটি স্বাধীন clause শুধু কমা দিয়ে জোড়া যায় না (Comma Splice) — conjunction লাগবে।",
      },
      {
        wrong: "Where you are going?",
        right: "Where are you going?",
        why: "Interrogative-এ auxiliary verb subject-এর আগে বসে।",
      },
    ],
    trick:
      "বাক্যে Verb খুঁজুন, তারপর প্রশ্ন করুন **‘কে?’** — উত্তরটাই Subject। বাকি পুরোটাই Predicate।",
    quiz: [
      {
        q: "‘Although he is rich, he is not happy.’ — এটি কোন ধরনের Sentence?",
        options: ["Simple", "Compound", "Complex", "Imperative"],
        answer: 2,
        explain: "Subordinate Clause (Although…) + Principal Clause — তাই Complex।",
      },
      {
        q: "‘Sit down.’ বাক্যে উহ্য Subject কী?",
        options: ["I", "He", "You", "We"],
        answer: 2,
        explain: "Imperative বাক্যে Subject সবসময় উহ্য 'You'।",
      },
      {
        q: "কোনটি Compound Sentence?",
        options: [
          "He came late.",
          "He came late because of traffic.",
          "He came late, but he finished the work.",
          "Coming late, he apologized.",
        ],
        answer: 2,
        explain: "দুটি স্বাধীন clause 'but' দিয়ে যুক্ত — তাই Compound।",
      },
    ],
    minutes: 7,
  },
];
