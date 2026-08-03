import type { GrammarLesson } from "@/lib/types";

export const VERB_LESSONS: readonly GrammarLesson[] = [
  {
    slug: "right-form-of-verbs",
    category: "verbs",
    title: "Right Form of Verbs",
    titleBn: "ক্রিয়ার সঠিক রূপ",
    hook: "পরীক্ষার সবচেয়ে বড় নম্বরদাতা আর সবচেয়ে বড় নম্বর-খাদক — একই টপিক। চলুন একে বন্ধু বানাই।",
    rule: "বাক্যের অর্থ, Subject এবং সঙ্গী শব্দ (clue word) দেখে Verb-এর সঠিক রূপ নির্ধারণ করতে হয়।",
    points: [
      "Subject third person singular + Present → verb + s/es",
      "have/has/had-এর পরে → V3",
      "am/is/are/was/were-এর পরে → V-ing (Active) বা V3 (Passive)",
      "do/does/did-এর পরে → base form",
      "Modal (can, may, must, should, will)-এর পরে → base form",
      "Preposition-এর পরে verb এলে → V-ing (Gerund)",
      "It is time / It is high time-এর পরে → Past form",
      "Let-এর পরে → base form",
    ],
    formulas: [
      {
        label: "Clue word ধরুন",
        formula: "always/usually/every day → Present Simple",
        example: "He always comes late.",
      },
      {
        label: "It is high time",
        formula: "It is high time + S + V2",
        example: "It is high time we changed our habit.",
      },
      {
        label: "As if / As though",
        formula: "As if + S + V2 (were)",
        example: "He talks as if he were a king.",
      },
      {
        label: "Preposition + verb",
        formula: "Preposition + V-ing",
        example: "He is fond of playing cricket.",
      },
    ],
    examples: [
      "He has (go) → has gone.",
      "The sun (rise) in the east → rises.",
      "I saw him (run) → running.",
      "Let him (do) it → do.",
    ],
    wrongRight: [
      {
        wrong: "It is high time we change our plan.",
        right: "It is high time we changed our plan.",
        why: "'It is high time'-এর পরে Past form বসে।",
      },
      {
        wrong: "He is fond of play cricket.",
        right: "He is fond of playing cricket.",
        why: "Preposition 'of'-এর পরে Gerund (V-ing) বসে।",
      },
      {
        wrong: "He behaves as if he was a millionaire.",
        right: "He behaves as if he were a millionaire.",
        why: "As if-এর পরে অবাস্তব কল্পনায় 'were' বসে (Subjunctive)।",
      },
    ],
    trick:
      "প্রথমে **Subject** দেখুন, তারপর **সঙ্গী শব্দ** (auxiliary/clue word), তারপর **অর্থ**। এই তিন ধাপে ৯০% উত্তর বের হয়ে আসে।",
    quiz: [
      {
        q: "‘It is high time you ___ smoking.’",
        options: ["give up", "gave up", "have given up", "giving up"],
        answer: 1,
        explain: "It is high time + Past form।",
      },
      {
        q: "‘He insisted on ___ there.’",
        options: ["go", "to go", "going", "gone"],
        answer: 2,
        explain: "Preposition 'on'-এর পরে Gerund।",
      },
      {
        q: "‘Let him ___ his own decision.’",
        options: ["takes", "to take", "take", "taking"],
        answer: 2,
        explain: "Let-এর পরে base form।",
      },
      {
        q: "‘The train ___ before we reached the station.’",
        options: ["left", "had left", "has left", "leaves"],
        answer: 1,
        explain: "অতীতে আগে ঘটা কাজ — had + V3।",
      },
    ],
    minutes: 8,
  },
  {
    slug: "modals",
    category: "verbs",
    title: "Modal Verbs",
    titleBn: "মোডাল ভার্ব",
    hook: "‘can’ পারা, ‘may’ অনুমতি, ‘must’ বাধ্যতা — এক অক্ষরের হেরফেরে পুরো অর্থ বদলে যায়। ভদ্রতাও এখানেই লুকানো।",
    rule: "Modal Verb মূল Verb-কে সাহায্য করে সম্ভাবনা, সামর্থ্য, অনুমতি, বাধ্যবাধকতা বা পরামর্শ প্রকাশ করে। Modal-এর পরে সবসময় base form বসে।",
    points: [
      "can — সামর্থ্য / অনানুষ্ঠানিক অনুমতি",
      "could — অতীতের সামর্থ্য / ভদ্র অনুরোধ / সম্ভাবনা",
      "may — অনুমতি / সম্ভাবনা | might — কম সম্ভাবনা",
      "must — কঠোর বাধ্যবাধকতা / দৃঢ় অনুমান",
      "should / ought to — পরামর্শ, নৈতিক দায়িত্ব",
      "would — ভদ্র অনুরোধ / অতীতের অভ্যাস / কাল্পনিক",
      "need not = দরকার নেই | must not = নিষেধ (এদুটো এক নয়!)",
    ],
    formulas: [
      { label: "গঠন", formula: "Subject + Modal + V1", example: "He can swim." },
      { label: "Negative", formula: "Subject + Modal + not + V1", example: "He cannot swim." },
      {
        label: "অতীতের অনুমান",
        formula: "Modal + have + V3",
        example: "He must have forgotten. (নিশ্চয়ই ভুলে গেছে)",
      },
    ],
    examples: [
      "You must submit the form today. (বাধ্যতামূলক)",
      "You should see a doctor. (পরামর্শ)",
      "May I come in, sir? (ভদ্র অনুমতি)",
      "She might be at home. (হয়তো আছে)",
      "You need not worry. (দুশ্চিন্তার দরকার নেই)",
    ],
    wrongRight: [
      {
        wrong: "He can to swim.",
        right: "He can swim.",
        why: "Modal-এর পরে 'to' বসে না, সরাসরি base form।",
      },
      {
        wrong: "He must not go now, he is free.",
        right: "He need not go now, he is free.",
        why: "must not = নিষেধ; দরকার নেই বোঝাতে 'need not'।",
      },
      {
        wrong: "You should to help the poor.",
        right: "You should help the poor.",
        why: "should + base form। 'ought' একমাত্র modal যার সাথে 'to' বসে।",
      },
    ],
    trick:
      "**Modal-এর পরে ‘to’ নিষিদ্ধ — একমাত্র ব্যতিক্রম ‘ought to’ আর ‘used to’।** আর Modal-এর পরে কখনো -s/-ed বসে না।",
    quiz: [
      {
        q: "‘___ I borrow your pen, please?’ (ভদ্র অনুমতি)",
        options: ["Must", "Should", "May", "Will"],
        answer: 2,
        explain: "ভদ্রভাবে অনুমতি চাইতে 'May'।",
      },
      {
        q: "‘You ___ smoke here. It's a hospital.’ (নিষেধ)",
        options: ["need not", "must not", "may not have", "would not"],
        answer: 1,
        explain: "কঠোর নিষেধ বোঝাতে 'must not'।",
      },
      {
        q: "‘He ___ have missed the train — he looks upset.’",
        options: ["must", "can", "may to", "should to"],
        answer: 0,
        explain: "অতীতের দৃঢ় অনুমান — must have + V3।",
      },
    ],
    minutes: 7,
  },
  {
    slug: "gerund-infinitive",
    category: "verbs",
    title: "Gerund & Infinitive",
    titleBn: "জেরান্ড ও ইনফিনিটিভ",
    hook: "‘I like swimming’ নাকি ‘I like to swim’? দুটোই ঠিক! কিন্তু ‘I enjoy to swim’ চিরকালের ভুল। কেন? চলুন দেখি।",
    rule: "Verb + ing যখন Noun-এর কাজ করে তখন তা Gerund; আর 'to + V1' হলো Infinitive। কোন verb-এর পরে কোনটি বসবে তা নির্দিষ্ট নিয়মে চলে।",
    points: [
      "Preposition-এর পরে সর্বদা Gerund: good at singing",
      "শুধু Gerund নেয় এমন verb: enjoy, avoid, finish, mind, suggest, practise, consider, admit, deny, risk",
      "শুধু Infinitive নেয় এমন verb: want, decide, hope, agree, promise, refuse, manage, afford, expect",
      "দুটোই নেয় (অর্থ প্রায় একই): like, love, hate, begin, start, continue, prefer",
      "অর্থ বদলে যায়: stop, remember, forget, try",
      "Bare infinitive (to ছাড়া): let, make, see, hear, watch + object + V1",
    ],
    formulas: [
      { label: "Preposition + Gerund", formula: "prep + V-ing", example: "He is used to waking up early." },
      {
        label: "অর্থ বদলায়",
        formula: "stop + V-ing (থামানো) / stop + to V1 (থেমে কিছু করা)",
        example: "He stopped smoking. / He stopped to smoke.",
      },
      {
        label: "Bare infinitive",
        formula: "make/let/see/hear + object + V1",
        example: "He made me laugh.",
      },
    ],
    examples: [
      "I enjoy reading novels.",
      "She decided to leave the job.",
      "He is fond of playing cricket.",
      "Remember to lock the door. (ভবিষ্যতের কাজ মনে রাখা)",
      "I remember locking the door. (অতীতের কাজ মনে পড়া)",
    ],
    wrongRight: [
      {
        wrong: "I enjoy to read books.",
        right: "I enjoy reading books.",
        why: "enjoy শুধু Gerund নেয়।",
      },
      {
        wrong: "He wants going home.",
        right: "He wants to go home.",
        why: "want শুধু Infinitive নেয়।",
      },
      {
        wrong: "He made me to laugh.",
        right: "He made me laugh.",
        why: "make/let-এর পরে bare infinitive (to ছাড়া)।",
      },
      {
        wrong: "I am looking forward to meet you.",
        right: "I am looking forward to meeting you.",
        why: "এখানে 'to' একটি Preposition, Infinitive নয় — তাই Gerund বসবে।",
      },
    ],
    trick:
      "**‘look forward to’, ‘be used to’, ‘get used to’, ‘object to’, ‘confess to’** — এই ‘to’ গুলো Preposition, তাই পরে -ing। এটাই সবচেয়ে বড় ফাঁদ।",
    quiz: [
      {
        q: "‘She avoided ___ him.’",
        options: ["to meet", "meeting", "meet", "met"],
        answer: 1,
        explain: "avoid শুধু Gerund নেয়।",
      },
      {
        q: "‘I look forward to ___ from you.’",
        options: ["hear", "hearing", "heard", "have heard"],
        answer: 1,
        explain: "'look forward to'-এর 'to' Preposition — তাই Gerund।",
      },
      {
        q: "‘He let me ___ his bike.’",
        options: ["to use", "using", "use", "used"],
        answer: 2,
        explain: "let-এর পরে bare infinitive।",
      },
      {
        q: "‘She stopped ___ because the doctor advised her.’ (ধূমপান ছেড়ে দিল)",
        options: ["to smoke", "smoking", "smoke", "smoked"],
        answer: 1,
        explain: "stop + V-ing = কাজটি সম্পূর্ণ বন্ধ করা।",
      },
    ],
    minutes: 8,
  },
  {
    slug: "participle",
    category: "verbs",
    title: "Participle",
    titleBn: "পার্টিসিপল",
    hook: "Verb আর Adjective-এর মাঝামাঝি একটা প্রাণী — কাজও বোঝায়, গুণও বোঝায়। নাম তার Participle।",
    rule: "যে Verb-রূপ একই সাথে Verb ও Adjective-এর কাজ করে তাকে Participle বলে।",
    points: [
      "Present Participle — V-ing, সক্রিয় অর্থ: a running train, a crying baby",
      "Past Participle — V3, নিষ্ক্রিয় অর্থ: a broken glass, written work",
      "Perfect Participle — having + V3: Having finished the work, he left.",
      "-ing = যে করছে | -ed/V3 = যার উপর করা হয়েছে",
      "interesting (বিষয়টি আকর্ষণীয়) vs interested (আমি আগ্রহী)",
    ],
    formulas: [
      {
        label: "Perfect Participle",
        formula: "Having + V3, Subject + V2",
        example: "Having eaten, he went to bed.",
      },
      {
        label: "Participle দিয়ে বাক্য সংযোগ",
        formula: "V-ing …, Subject + Verb",
        example: "Walking on the road, I met him.",
      },
    ],
    examples: [
      "The boiling water is hot. (Present Participle)",
      "The boiled egg is ready. (Past Participle)",
      "Having completed the task, she relaxed.",
      "I am bored. The class is boring.",
    ],
    wrongRight: [
      {
        wrong: "I am very boring in this class.",
        right: "I am very bored in this class.",
        why: "-ing = যা বিরক্তি সৃষ্টি করে; -ed = যে বিরক্ত হয়। আপনি বিরক্ত, তাই 'bored'।",
      },
      {
        wrong: "Walking on the road, a snake was seen by me.",
        right: "Walking on the road, I saw a snake.",
        why: "Participle-এর কর্তা ও মূল বাক্যের কর্তা একই হতে হবে (Dangling Participle এড়ান)।",
      },
      {
        wrong: "The exciting news made me exciting.",
        right: "The exciting news made me excited.",
        why: "খবর উত্তেজনা সৃষ্টি করে (-ing), আর আমি উত্তেজিত হই (-ed)।",
      },
    ],
    trick:
      "**-ing দেয়, -ed নেয়।** The movie is *boring* (দিচ্ছে) → I am *bored* (নিচ্ছি)। একই নিয়ম: exciting/excited, confusing/confused, tiring/tired।",
    quiz: [
      {
        q: "‘The film was so ___ that I fell asleep.’",
        options: ["bored", "boring", "bore", "to bore"],
        answer: 1,
        explain: "ফিল্ম বিরক্তি সৃষ্টি করছে — তাই 'boring'।",
      },
      {
        q: "‘___ the work, he went home.’",
        options: ["Finish", "Finishing", "Having finished", "Finished"],
        answer: 2,
        explain: "আগের কাজ শেষ করে পরের কাজ — Perfect Participle।",
      },
      {
        q: "‘A ___ glass cannot be repaired.’",
        options: ["breaking", "broke", "broken", "break"],
        answer: 2,
        explain: "নিষ্ক্রিয় অর্থ — Past Participle 'broken'।",
      },
    ],
    minutes: 6,
  },
  {
    slug: "causative-verbs",
    category: "verbs",
    title: "Causative Verbs",
    titleBn: "কার্যকারক ক্রিয়া",
    hook: "চুল নিজে কাটেন না, কাটান। ‘I cut my hair’ আর ‘I had my hair cut’ — এই পার্থক্যটাই Causative।",
    rule: "যখন কর্তা নিজে কাজটি না করে অন্যকে দিয়ে করায়, তখন Causative Verb (make, have, get, let, help) ব্যবহৃত হয়।",
    points: [
      "make + object + V1 — জোর করে করানো",
      "have + object + V1 — ব্যবস্থা করে করানো (person)",
      "get + object + to + V1 — রাজি করিয়ে করানো",
      "let + object + V1 — অনুমতি দেওয়া",
      "help + object + V1/to V1 — দুটোই ঠিক",
      "কাজটি করানো হয়েছে বোঝাতে: have/get + object + V3",
    ],
    formulas: [
      { label: "make", formula: "make + person + V1", example: "The teacher made him stand." },
      { label: "get", formula: "get + person + to + V1", example: "I got him to sign the paper." },
      { label: "কাজ করানো (জিনিস)", formula: "have/get + thing + V3", example: "I had my car repaired." },
    ],
    examples: [
      "She made me wait for an hour.",
      "I had the plumber fix the pipe.",
      "I had the pipe fixed.",
      "He let his son go abroad.",
      "I got my brother to help me.",
    ],
    wrongRight: [
      {
        wrong: "I made him to leave.",
        right: "I made him leave.",
        why: "make-এর পরে bare infinitive (to ছাড়া)।",
      },
      {
        wrong: "I got him leave the room.",
        right: "I got him to leave the room.",
        why: "get-এর পরে 'to + V1' বসে — এটাই make/have থেকে পার্থক্য।",
      },
      {
        wrong: "I cut my hair yesterday. (সেলুনে গিয়েছিলেন)",
        right: "I had my hair cut yesterday.",
        why: "নিজে না কেটে অন্যকে দিয়ে কাটালে have + object + V3।",
      },
    ],
    trick:
      "**make/have/let → bare (to নেই), get → to আছে, help → দুটোই চলে।** মনে রাখুন: “get একটু ভদ্র, তাই ‘to’ বলে অনুরোধ করে”।",
    quiz: [
      {
        q: "‘The manager made the staff ___ overtime.’",
        options: ["to work", "work", "working", "worked"],
        answer: 1,
        explain: "make + object + base form।",
      },
      {
        q: "‘I got my friend ___ me with the project.’",
        options: ["help", "helping", "to help", "helped"],
        answer: 2,
        explain: "get + object + to + V1।",
      },
      {
        q: "‘She had her room ___ before the guests arrived.’",
        options: ["clean", "cleaning", "cleaned", "to clean"],
        answer: 2,
        explain: "জিনিসের উপর কাজ করানো — have + thing + V3।",
      },
    ],
    minutes: 6,
  },
];
