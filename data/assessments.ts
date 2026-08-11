import { additionalAssessmentContent, additionalBaseAssessments } from "./extraAssessments";

export type AssessmentId = "prayer-life" | "overcomer" | "purpose" | "commitment" | "love-languages" | "identities-women" | "identities-men";
export type Locale = "en" | "id";

export type AssessmentQuestion = {
  id: number;
  text: string;
  dimension: string;
  verse: string;
};

export type BaseAssessmentDefinition = {
  id: AssessmentId;
  title: string;
  subtitle: string;
  description: string;
  accent: "cyan" | "amber" | "emerald" | "rose";
  dimensions: Record<string, string>;
  maxPerDimension: Record<string, number>;
  questions: AssessmentQuestion[];
};

export type DimensionInsight = {
  label: string;
  summary: string;
  detail: string;
  next: string;
};

export type AssessmentResultLabels = {
  complete: string;
  strongest: string;
  dimensions: string;
  whatThisMeans: string;
  nextStep: string;
  versesToRevisit: string;
  versesToRevisitDesc: string;
  reflectionTitle: string;
  saved: string;
  localHistory: string;
  retake: string;
  chooseAnother: string;
  question: string;
  of: string;
  previous: string;
  skip: string;
  biblicalAnchor: string;
  back: string;
  scoreGuide: string;
};

export type AssessmentDefinition = Omit<BaseAssessmentDefinition, "dimensions" | "questions"> & {
  locale: Locale;
  time: string;
  source: string;
  prompt: string;
  groundTruth: string;
  scale: readonly { value: 5 | 4 | 3 | 2 | 1; label: string }[];
  dimensions: Record<string, DimensionInsight>;
  revisitMode: "low" | "high";
  resultLabels: AssessmentResultLabels;
  reflectionQuestions: string[];
  questions: AssessmentQuestion[];
};

export const assessmentScale = [
  { value: 5, label: "Very true" },
  { value: 4, label: "Often true" },
  { value: 3, label: "Sometimes" },
  { value: 2, label: "Rarely" },
  { value: 1, label: "Not yet" },
] as const;

const localizedScale = {
  en: assessmentScale,
  id: [
    { value: 5, label: "Sangat benar" },
    { value: 4, label: "Sering benar" },
    { value: 3, label: "Kadang-kadang" },
    { value: 2, label: "Jarang" },
    { value: 1, label: "Belum" },
  ],
} as const;

const resultLabels: Record<Locale, AssessmentResultLabels> = {
  en: {
    complete: "Assessment Complete",
    strongest: "Your strongest dimension",
    dimensions: "Dimension Summary",
    whatThisMeans: "What This Means",
    nextStep: "Suggested Next Step",
    versesToRevisit: "Verses to Revisit",
    versesToRevisitDesc: "These verses are linked to highlighted answers. Use them for prayer and reflection this week.",
    reflectionTitle: "Reflection Questions",
    saved: "Result saved in this browser.",
    localHistory: "Recent local results",
    retake: "Retake Assessment",
    chooseAnother: "Choose Another",
    question: "Question",
    of: "of",
    previous: "Previous",
    skip: "Skip",
    biblicalAnchor: "Biblical anchor",
    back: "Back to hub",
    scoreGuide: "Scale: 1 = Not yet, 3 = Sometimes, 5 = Very true",
  },
  id: {
    complete: "Assessment Selesai",
    strongest: "Dimensi terkuat Anda",
    dimensions: "Ringkasan Dimensi",
    whatThisMeans: "Apa Artinya",
    nextStep: "Langkah Berikutnya",
    versesToRevisit: "Ayat untuk Direnungkan",
    versesToRevisitDesc: "Ayat-ayat ini terkait jawaban yang disorot. Pakai untuk doa dan refleksi minggu ini.",
    reflectionTitle: "Pertanyaan Refleksi",
    saved: "Hasil tersimpan di browser ini.",
    localHistory: "Riwayat lokal terbaru",
    retake: "Ulangi Assessment",
    chooseAnother: "Pilih Assessment Lain",
    question: "Pertanyaan",
    of: "dari",
    previous: "Sebelumnya",
    skip: "Lewati",
    biblicalAnchor: "Dasar Alkitab",
    back: "Kembali ke hub",
    scoreGuide: "Skala: 1 = Belum, 3 = Kadang-kadang, 5 = Sangat benar",
  },
};

const baseAssessments: BaseAssessmentDefinition[] = [
  {
    id: "prayer-life",
    title: "Prayer Life Journey",
    subtitle: "Adoration, God's will, petition, and persistence",
    description: "Reflect on the rhythm of your prayer life through the pattern Jesus gives in Matthew 6.",
    accent: "cyan",
    dimensions: { A: "Adoration", F: "Focus on God's Will", S: "Supplication & Petition", P: "Persistence" },
    maxPerDimension: { A: 25, F: 25, S: 25, P: 25 },
    questions: [
      { id: 1, text: "I pray with a respectful heart to God, not only to seek what I need.", dimension: "A", verse: "Our Father in heaven, hallowed be your name. - Matthew 6:9" },
      { id: 2, text: "I include thanksgiving and humility when bringing requests to God.", dimension: "A", verse: "With thanksgiving, present your requests to God. - Philippians 4:6" },
      { id: 3, text: "I still trust God when I feel anxious, stressed, or discouraged.", dimension: "A", verse: "The peace of God will guard your hearts. - Philippians 4:7" },
      { id: 13, text: "I make room for worship in prayer before moving into problems or requests.", dimension: "A", verse: "Sing psalms, hymns, and spiritual songs with gratitude. - Colossians 3:16" },
      { id: 14, text: "I can praise God with gratitude in both ordinary and joyful seasons.", dimension: "A", verse: "Enter his gates with thanksgiving and his courts with praise. - Psalm 100:4" },
      { id: 4, text: "I pray for God's will even when it challenges my plans.", dimension: "F", verse: "Your kingdom come, your will be done. - Matthew 6:10" },
      { id: 5, text: "I am willing to surrender outcomes to God in prayer.", dimension: "F", verse: "Yet not my will, but yours be done. - Luke 22:42" },
      { id: 6, text: "I choose God's Word over my own understanding when making decisions.", dimension: "F", verse: "Lean not on your own understanding. - Proverbs 3:5" },
      { id: 15, text: "I invite Scripture to shape daily decisions, not only major turning points.", dimension: "F", verse: "Your word is a lamp for my feet. - Psalm 119:105" },
      { id: 16, text: "I ask God to search my motives before I act.", dimension: "F", verse: "Search me, God, and know my heart. - Psalm 139:23" },
      { id: 7, text: "I bring daily needs to God with honesty and dependence.", dimension: "S", verse: "Give us today our daily bread. - Matthew 6:11" },
      { id: 8, text: "I make specific requests in prayer instead of staying vague.", dimension: "S", verse: "Present your requests to God. - Philippians 4:6" },
      { id: 9, text: "I ask God's help in temptation and moral decisions.", dimension: "S", verse: "Deliver us from the evil one. - Matthew 6:13" },
      { id: 17, text: "I ask God for practical wisdom when I do not know what to do next.", dimension: "S", verse: "If any of you lacks wisdom, you should ask God. - James 1:5" },
      { id: 18, text: "I bring relational hurt and forgiveness struggles into prayer.", dimension: "S", verse: "Forgive us our debts, as we also have forgiven our debtors. - Matthew 6:12" },
      { id: 10, text: "I keep praying when answers are delayed.", dimension: "P", verse: "Always pray and not give up. - Luke 18:1" },
      { id: 11, text: "I practice short prayers throughout the day to stay connected with God.", dimension: "P", verse: "Pray continually. - 1 Thessalonians 5:17" },
      { id: 12, text: "Humility and consistent prayer grow together in my life.", dimension: "P", verse: "Devote yourselves to prayer. - Colossians 4:2" },
      { id: 19, text: "I return to prayer even when my spiritual life feels dry.", dimension: "P", verse: "Be patient in affliction, faithful in prayer. - Romans 12:12" },
      { id: 20, text: "I let forgiveness keep my persistence in prayer humble.", dimension: "P", verse: "If you forgive others, your heavenly Father will forgive you. - Matthew 6:14" },
    ],
  },
  {
    id: "overcomer",
    title: "Overcomer Survey",
    subtitle: "Identity, love, obedience, and victorious faith",
    description: "Notice where Christ's victory is becoming visible in daily life.",
    accent: "amber",
    dimensions: { identity: "Identity", love: "Love", obedience: "Obedient Lifestyle", faith: "Victorious Faith" },
    maxPerDimension: { identity: 25, love: 25, obedience: 25, faith: 25, total: 100 },
    questions: [
      { id: 1, text: "I do not feel the need to prove myself to be accepted by others.", dimension: "identity", verse: "See what kind of love the Father has given to us. - 1 John 3:1" },
      { id: 2, text: "When I am not praised or noticed, I still feel secure and enough.", dimension: "identity", verse: "You are precious and honored in my sight. - Isaiah 43:4" },
      { id: 3, text: "When others succeed more, I do not feel threatened or inferior.", dimension: "identity", verse: "We are God's handiwork. - Ephesians 2:10" },
      { id: 13, text: "I can work or serve from trust instead of anxiety about being enough.", dimension: "identity", verse: "My God will meet all your needs in Christ Jesus. - Philippians 4:19" },
      { id: 14, text: "I make decisions as God's loved child, not as someone trying to earn belonging.", dimension: "identity", verse: "He gave the right to become children of God. - John 1:12" },
      { id: 4, text: "When conflict happens, I try to resolve it constructively.", dimension: "love", verse: "If possible, live at peace with everyone. - Romans 12:18" },
      { id: 5, text: "When someone hurts me, I can process and forgive faster than before.", dimension: "love", verse: "Forgive as the Lord forgave you. - Colossians 3:13" },
      { id: 6, text: "When serving, my motivation is more from God's love than recognition.", dimension: "love", verse: "Serve one another humbly in love. - Galatians 5:13" },
      { id: 15, text: "I slow down before judging others so I can understand what may be happening.", dimension: "love", verse: "Be completely humble and gentle. - Ephesians 4:2" },
      { id: 16, text: "I protect unity instead of letting small issues become larger wounds.", dimension: "love", verse: "Make every effort to keep the unity of the Spirit. - Ephesians 4:3" },
      { id: 7, text: "I seek to practice God's Word in daily decisions, not only understand it.", dimension: "obedience", verse: "Be doers of the word. - James 1:22" },
      { id: 8, text: "I feel close to God through prayer, Scripture, or awareness of His presence.", dimension: "obedience", verse: "Remain in me, as I also remain in you. - John 15:4" },
      { id: 9, text: "When I obey God, I do it because I love Him, not because I fear punishment.", dimension: "obedience", verse: "If you love me, keep my commands. - John 14:15" },
      { id: 17, text: "When I hear Scripture, I receive it as help from God rather than pressure to perform.", dimension: "obedience", verse: "His commands are not burdensome. - 1 John 5:3" },
      { id: 18, text: "When God's commands feel heavy, I check whether my heart has drifted from Him.", dimension: "obedience", verse: "Come to me... and I will give you rest. - Matthew 11:28" },
      { id: 10, text: "My faith is visible in real actions: how I work, decide, and face problems.", dimension: "faith", verse: "Faith without action is dead. - James 2:17" },
      { id: 11, text: "When facing difficulty, I have courage because Christ has already won.", dimension: "faith", verse: "Take heart! I have overcome the world. - John 16:33" },
      { id: 12, text: "I believe I am an overcomer by Christ who lives in me.", dimension: "faith", verse: "The one who is in you is greater. - 1 John 4:4" },
      { id: 19, text: "I can see growth in how I respond to pressure, disappointment, or delay.", dimension: "faith", verse: "The testing of your faith produces perseverance. - James 1:3" },
      { id: 20, text: "Walking with Christ is changing my character in patient, gentle, and forgiving ways.", dimension: "faith", verse: "The fruit of the Spirit is love, joy, peace... - Galatians 5:22" },
    ],
  },
  {
    id: "purpose",
    title: "Purpose & Identity Reflection",
    subtitle: "From emptiness toward fullness in God",
    description: "Map your sense of God-given purpose through relationship, Scripture, faithfulness, gifts, and eternity.",
    accent: "emerald",
    dimensions: { R: "Relationship with God", W: "Living in the Word", F: "Faithfulness in Small Things", G: "Gifts for Service", E: "Eternal Perspective" },
    maxPerDimension: { R: 20, W: 20, F: 20, G: 20, E: 20 },
    questions: [
      { id: 1, text: "I make space each day to simply be with God, not just ask Him for things.", dimension: "R", verse: "That they know you, the only true God. - John 17:3" },
      { id: 2, text: "I bring inner emptiness to God before trying to fill it elsewhere.", dimension: "R", verse: "My soul pants for you, my God. - Psalm 42:1" },
      { id: 11, text: "My deepest identity is being loved by God, not what I achieve.", dimension: "R", verse: "We should be called children of God. - 1 John 3:1" },
      { id: 12, text: "I can come to God honestly instead of hiding when I feel exposed.", dimension: "R", verse: "The Lord God called to the man, Where are you? - Genesis 3:9" },
      { id: 3, text: "I read or listen to Scripture regularly to let it shape my thinking.", dimension: "W", verse: "Your word is a lamp for my feet. - Psalm 119:105" },
      { id: 4, text: "I let God's Word challenge my plans, not just confirm what I already want.", dimension: "W", verse: "The word of God is alive and active. - Hebrews 4:12" },
      { id: 13, text: "I bring confusing choices to Scripture before relying on my instincts alone.", dimension: "W", verse: "Trust in the Lord with all your heart. - Proverbs 3:5" },
      { id: 14, text: "I act on God's Word instead of only agreeing with it intellectually.", dimension: "W", verse: "Do not merely listen to the word... do what it says. - James 1:22" },
      { id: 5, text: "I try to be faithful in small, hidden tasks even when no one notices.", dimension: "F", verse: "Faithful in a very little is also faithful in much. - Luke 16:10" },
      { id: 6, text: "I do ordinary work as if I am doing it for the Lord.", dimension: "F", verse: "Whatever you do, work at it with all your heart. - Colossians 3:23" },
      { id: 15, text: "I keep small promises because hidden faithfulness matters to God.", dimension: "F", verse: "Let your yes be yes. - Matthew 5:37" },
      { id: 16, text: "I resist chasing visible importance while neglecting daily obedience.", dimension: "F", verse: "Well done, good and faithful servant. - Matthew 25:21" },
      { id: 7, text: "I know at least one gift God has put in me to bless others.", dimension: "G", verse: "Use whatever gift you have received to serve others. - 1 Peter 4:10" },
      { id: 8, text: "I use my gifts to build up people around me, not only myself.", dimension: "G", verse: "For the common good. - 1 Corinthians 12:7" },
      { id: 17, text: "I am willing to serve in unseen or uncomfortable ways when God leads.", dimension: "G", verse: "Whoever wants to become great among you must be your servant. - Mark 10:43" },
      { id: 18, text: "I see my work, role, or calling as a way to glorify God.", dimension: "G", verse: "From him and through him and for him are all things. - Romans 11:36" },
      { id: 9, text: "My choices about money, time, and ambition are shaped by eternity.", dimension: "E", verse: "Store up for yourselves treasures in heaven. - Matthew 6:20" },
      { id: 10, text: "I live with the awareness that my ultimate purpose is to know, love, and glorify God.", dimension: "E", verse: "To him be glory forever. - Romans 11:36" },
      { id: 19, text: "I think about what will last beyond this life when setting priorities.", dimension: "E", verse: "Set your minds on things above. - Colossians 3:2" },
      { id: 20, text: "Suffering and loss are easier to endure when I remember the glory to come.", dimension: "E", verse: "This light momentary trouble is achieving eternal glory. - 2 Corinthians 4:17" },
    ],
  },
  {
    id: "commitment",
    title: "3C Commitment Assessment",
    subtitle: "Caring, connection, and commitment",
    description: "A practical relationship health reflection for small groups and ministry teams.",
    accent: "rose",
    dimensions: { caring: "Caring", connection: "Connection", commitment: "Commitment" },
    maxPerDimension: { caring: 50, connection: 50, commitment: 50 },
    questions: [
      { id: 1, text: "I look for simple ways to help people, even when I get nothing back.", dimension: "caring", verse: "Serve one another humbly in love. - Galatians 5:13" },
      { id: 2, text: "When someone is having a rough time, I usually want to jump in and help.", dimension: "caring", verse: "Carry each other's burdens. - Galatians 6:2" },
      { id: 3, text: "I stay gentle and patient when people mess up or get frustrated.", dimension: "caring", verse: "Be completely humble and gentle. - Ephesians 4:2" },
      { id: 10, text: "I notice when someone feels overlooked and try to include them.", dimension: "caring", verse: "Look to the interests of others. - Philippians 2:4" },
      { id: 11, text: "I encourage people because I care, not because I want credit.", dimension: "caring", verse: "Do not let your left hand know what your right hand is doing. - Matthew 6:3" },
      { id: 12, text: "I can celebrate another person's good news without competing.", dimension: "caring", verse: "Rejoice with those who rejoice. - Romans 12:15" },
      { id: 13, text: "I am willing to adjust my comfort when someone genuinely needs help.", dimension: "caring", verse: "Lay down one's life for one's friends. - John 15:13" },
      { id: 14, text: "I keep practicing kindness toward people who are difficult for me.", dimension: "caring", verse: "Love your enemies and pray for those who persecute you. - Matthew 5:44" },
      { id: 15, text: "I do quiet acts of kindness without needing them to be seen.", dimension: "caring", verse: "Your Father, who sees what is done in secret, will reward you. - Matthew 6:4" },
      { id: 16, text: "I intentionally check in when friends or group members are under strain.", dimension: "caring", verse: "Encourage one another and build each other up. - 1 Thessalonians 5:11" },
      { id: 4, text: "I give people my full attention when they talk to me.", dimension: "connection", verse: "Be quick to listen. - James 1:19" },
      { id: 5, text: "I ask real questions and slow down enough to hear the honest answer.", dimension: "connection", verse: "Full of grace. - Colossians 4:6" },
      { id: 6, text: "People feel safe opening up to me because I am not too quick to judge.", dimension: "connection", verse: "Accept one another. - Romans 15:7" },
      { id: 17, text: "I listen to understand, not only to prepare my reply.", dimension: "connection", verse: "The purposes of a person's heart are deep waters. - Proverbs 20:5" },
      { id: 18, text: "I protect personal stories and avoid spreading gossip.", dimension: "connection", verse: "A trustworthy person keeps a secret. - Proverbs 11:13" },
      { id: 19, text: "I can share real needs with safe people instead of staying guarded.", dimension: "connection", verse: "Confess your sins to each other and pray for each other. - James 5:16" },
      { id: 20, text: "I am open to receiving prayer, help, and practical support.", dimension: "connection", verse: "Two are better than one. - Ecclesiastes 4:9" },
      { id: 21, text: "I treat people with warmth and honor even when we disagree.", dimension: "connection", verse: "Honor one another above yourselves. - Romans 12:10" },
      { id: 22, text: "I regularly thank people who invest in or support me.", dimension: "connection", verse: "Give thanks in all circumstances. - 1 Thessalonians 5:18" },
      { id: 23, text: "I move toward forgiveness and peace when misunderstandings happen.", dimension: "connection", verse: "Forgive as the Lord forgave you. - Colossians 3:13" },
      { id: 7, text: "When I say I will pray, help, or check in, I follow through.", dimension: "commitment", verse: "Let your yes be yes. - Matthew 5:37" },
      { id: 8, text: "People can count on me to show up and be on time.", dimension: "commitment", verse: "Trusted with very little. - Luke 16:10" },
      { id: 9, text: "When conflict comes up, I try to work through it instead of disappearing.", dimension: "commitment", verse: "Live at peace with everyone. - Romans 12:18" },
      { id: 24, text: "I show love through concrete action, not only kind words.", dimension: "commitment", verse: "Love with actions and in truth. - 1 John 3:18" },
      { id: 25, text: "I stay present when a friend's situation is complicated or slow to improve.", dimension: "commitment", verse: "A friend loves at all times. - Proverbs 17:17" },
      { id: 26, text: "I remain committed to my group or community when my feelings fluctuate.", dimension: "commitment", verse: "Do not give up meeting together. - Hebrews 10:25" },
      { id: 27, text: "I set healthy limits so I can remain reliable instead of burning out.", dimension: "commitment", verse: "Jesus went off to a solitary place, where he prayed. - Mark 1:35" },
      { id: 28, text: "I stay close to friends at low points, not only when life is easy.", dimension: "commitment", verse: "A friend who sticks closer than a brother. - Proverbs 18:24" },
      { id: 29, text: "When I hurt someone, I take responsibility and seek repair.", dimension: "commitment", verse: "First go and be reconciled to them. - Matthew 5:24" },
      { id: 30, text: "I keep choosing kindness when I am also walking through a hard season.", dimension: "commitment", verse: "Do not become weary in doing good. - Galatians 6:9" },
    ],
  },
  ...additionalBaseAssessments,
];

export type AssessmentLocaleContent = {
  title?: string;
  subtitle?: string;
  description?: string;
  dimensionLabels?: Record<string, string>;
  scale?: readonly { value: 5 | 4 | 3 | 2 | 1; label: string }[];
  revisitMode?: "low" | "high";
  resultLabelOverrides?: Partial<AssessmentResultLabels>;
  time: string;
  source: string;
  prompt: string;
  groundTruth: string;
  dimensionDetails: Record<string, Omit<DimensionInsight, "label">>;
  reflectionQuestions: string[];
  questions?: AssessmentQuestion[];
};

const assessmentContent: Record<AssessmentId, Record<Locale, AssessmentLocaleContent>> = {
  "prayer-life": {
    en: {
      time: "6-8 min",
      source: "Matthew 6:5-13 (Sermon on the Mount)",
      prompt: "How consistently do you practice this in real life?",
      groundTruth: "Bible verse",
      dimensionDetails: {
        A: {
          summary: "You prioritize worship, gratitude, and reverence in prayer.",
          detail: "Your prayer life starts with God's name and character. This keeps prayer God-centered before requests become the focus.",
          next: "Start each prayer this week with one sentence of praise and one sentence of gratitude before any request.",
        },
        F: {
          summary: "You are learning to surrender your plans to God's purposes.",
          detail: "Prayer becomes alignment, not only asking for preferred outcomes. This reflects 'Your kingdom come, your will be done.'",
          next: "Choose one current decision and pray daily: 'Father, shape my will to yours.' Write one obedient next step.",
        },
        S: {
          summary: "You bring needs honestly to God with daily dependence.",
          detail: "You are practicing practical trust by bringing provision, forgiveness, protection, and guidance to the Father.",
          next: "List three concrete needs and pray for them specifically this week, noting answers and inner changes.",
        },
        P: {
          summary: "You keep returning to prayer with humility and persistence.",
          detail: "Persistence turns prayer into a lived rhythm, while humility guards your heart from spiritual pride and comparison.",
          next: "Use a simple morning/noon/night prayer checkpoint for seven days, even if each prayer is brief.",
        },
      },
      reflectionQuestions: [
        "Which prayer dimension feels most natural to you right now?",
        "Which lower-scored area reveals an invitation from God this week?",
        "What simple prayer rhythm can you practice for the next seven days?",
      ],
    },
    id: {
      title: "Perjalanan Doa",
      subtitle: "Adorasi, kehendak Tuhan, permohonan, dan ketekunan",
      description: "Refleksikan ritme kehidupan doa Anda melalui pola yang Yesus ajarkan dalam Matius 6.",
      time: "6-8 mnt",
      source: "Matius 6:5-13 (Khotbah di Bukit)",
      prompt: "Seberapa konsisten Anda mempraktikkan ini dalam kehidupan nyata?",
      groundTruth: "Ayat Alkitab",
      dimensionLabels: { A: "Adorasi", F: "Fokus pada Kehendak Tuhan", S: "Permohonan & Petisi", P: "Ketekunan" },
      dimensionDetails: {
        A: {
          summary: "Anda memprioritaskan penyembahan, syukur, dan hormat dalam doa.",
          detail: "Kehidupan doa Anda dimulai dari nama dan karakter Tuhan. Doa tetap berpusat kepada Tuhan sebelum permohonan menjadi fokus utama.",
          next: "Mulai setiap doa minggu ini dengan satu kalimat pujian dan satu kalimat syukur sebelum menyampaikan permohonan.",
        },
        F: {
          summary: "Anda sedang belajar menyerahkan rencana kepada tujuan Tuhan.",
          detail: "Doa menjadi penyelarasan, bukan hanya meminta hasil yang kita mau. Ini mencerminkan 'datanglah Kerajaan-Mu, jadilah kehendak-Mu.'",
          next: "Pilih satu keputusan yang sedang dihadapi dan doakan setiap hari: 'Bapa, selaraskan kehendakku dengan kehendak-Mu.' Tulis satu langkah taat.",
        },
        S: {
          summary: "Anda membawa kebutuhan kepada Tuhan dengan jujur dan bergantung.",
          detail: "Anda melatih percaya secara praktis dengan membawa kebutuhan, pengampunan, perlindungan, dan tuntunan kepada Bapa.",
          next: "Tulis tiga kebutuhan konkret dan doakan secara spesifik minggu ini, sambil mencatat jawaban dan perubahan batin.",
        },
        P: {
          summary: "Anda terus kembali berdoa dengan rendah hati dan tekun.",
          detail: "Ketekunan menjadikan doa sebagai ritme hidup, dan kerendahan hati menjaga hati dari kesombongan rohani serta perbandingan.",
          next: "Gunakan checkpoint doa pagi/siang/malam selama tujuh hari, meski tiap doa singkat.",
        },
      },
      reflectionQuestions: [
        "Dimensi doa mana yang paling alami bagi Anda saat ini?",
        "Area dengan skor lebih rendah mengundang Anda bertumbuh dalam hal apa minggu ini?",
        "Ritme doa sederhana apa yang dapat Anda praktikkan selama tujuh hari ke depan?",
      ],
      questions: [
        { id: 1, text: "Saya berdoa dengan sikap hormat kepada Tuhan, bukan hanya mencari kebutuhan saya.", dimension: "A", verse: "Bapa kami yang di sorga, dikuduskanlah nama-Mu. - Matius 6:9" },
        { id: 2, text: "Saya menyertakan syukur dan kerendahan hati saat membawa permohonan kepada Tuhan.", dimension: "A", verse: "Nyatakanlah dalam segala hal keinginanmu kepada Allah dengan ucapan syukur. - Filipi 4:6" },
        { id: 3, text: "Saya tetap percaya Tuhan saat merasa cemas, stres, atau putus asa.", dimension: "A", verse: "Damai sejahtera Allah akan memelihara hatimu. - Filipi 4:7" },
        { id: 13, text: "Saya memberi ruang untuk penyembahan sebelum langsung masuk ke masalah atau permohonan.", dimension: "A", verse: "Dengan mazmur, puji-pujian dan nyanyian rohani untuk Allah. - Kolose 3:16" },
        { id: 14, text: "Saya dapat memuji Tuhan dengan syukur dalam musim biasa maupun penuh sukacita.", dimension: "A", verse: "Masuklah melalui pintu gerbang-Nya dengan nyanyian syukur. - Mazmur 100:4" },
        { id: 4, text: "Saya mendoakan kehendak Tuhan meski menantang rencana saya.", dimension: "F", verse: "Datanglah Kerajaan-Mu, jadilah kehendak-Mu. - Matius 6:10" },
        { id: 5, text: "Saya bersedia menyerahkan hasil akhir kepada Tuhan dalam doa.", dimension: "F", verse: "Bukanlah kehendak-Ku, melainkan kehendak-Mulah yang terjadi. - Lukas 22:42" },
        { id: 6, text: "Saya memilih Firman Tuhan di atas pengertian sendiri saat mengambil keputusan.", dimension: "F", verse: "Janganlah bersandar kepada pengertianmu sendiri. - Amsal 3:5" },
        { id: 15, text: "Saya mengundang Firman Tuhan membentuk keputusan harian, bukan hanya keputusan besar.", dimension: "F", verse: "Firman-Mu pelita bagi kakiku. - Mazmur 119:105" },
        { id: 16, text: "Saya meminta Tuhan menyelidiki motivasi hati sebelum saya bertindak.", dimension: "F", verse: "Selidikilah aku, ya Allah, dan kenallah hatiku. - Mazmur 139:23" },
        { id: 7, text: "Saya membawa kebutuhan harian kepada Tuhan dengan jujur dan bergantung.", dimension: "S", verse: "Berikanlah kami pada hari ini makanan kami yang secukupnya. - Matius 6:11" },
        { id: 8, text: "Saya menyampaikan permohonan yang spesifik, bukan hanya doa yang samar.", dimension: "S", verse: "Nyatakanlah dalam segala hal keinginanmu kepada Allah. - Filipi 4:6" },
        { id: 9, text: "Saya meminta pertolongan Tuhan dalam pencobaan dan keputusan moral.", dimension: "S", verse: "Lepaskanlah kami dari pada yang jahat. - Matius 6:13" },
        { id: 17, text: "Saya meminta hikmat praktis kepada Tuhan saat tidak tahu langkah berikutnya.", dimension: "S", verse: "Apabila kamu kekurangan hikmat, hendaklah ia memintakannya kepada Allah. - Yakobus 1:5" },
        { id: 18, text: "Saya membawa luka relasi dan pergumulan pengampunan ke dalam doa.", dimension: "S", verse: "Ampunilah kami akan kesalahan kami, seperti kami juga mengampuni. - Matius 6:12" },
        { id: 10, text: "Saya tetap berdoa saat jawaban tertunda.", dimension: "P", verse: "Mereka harus selalu berdoa dengan tidak jemu-jemu. - Lukas 18:1" },
        { id: 11, text: "Saya mempraktikkan doa singkat sepanjang hari agar tetap terhubung dengan Tuhan.", dimension: "P", verse: "Tetaplah berdoa. - 1 Tesalonika 5:17" },
        { id: 12, text: "Kerendahan hati dan doa yang konsisten bertumbuh bersama dalam hidup saya.", dimension: "P", verse: "Bertekunlah dalam doa. - Kolose 4:2" },
        { id: 19, text: "Saya kembali berdoa bahkan ketika kehidupan rohani terasa kering.", dimension: "P", verse: "Bersabarlah dalam kesesakan dan bertekunlah dalam doa. - Roma 12:12" },
        { id: 20, text: "Saya membiarkan pengampunan menjaga ketekunan doa saya tetap rendah hati.", dimension: "P", verse: "Jikalau kamu mengampuni orang, Bapamu akan mengampuni kamu juga. - Matius 6:14" },
      ],
    },
  },
  overcomer: {
    en: {
      time: "6-10 min",
      source: "TrueVine Church Overcomer Survey",
      prompt: "How much do you agree with this statement?",
      groundTruth: "Bible verse",
      dimensionDetails: {
        identity: {
          summary: "You are learning to live from beloved identity instead of proving yourself.",
          detail: "Identity in Christ gives security when praise, comparison, or performance pressure rises.",
          next: "Name one moment this week when you felt the need to prove yourself, then answer it with Scripture.",
        },
        love: {
          summary: "God's love is becoming visible in forgiveness, humility, and unity.",
          detail: "Love grows when conflict, offense, and service are shaped by grace rather than recognition.",
          next: "Choose one relationship where you can pursue peace or forgiveness with a concrete step.",
        },
        obedience: {
          summary: "Obedience is becoming a response of love, not fear.",
          detail: "A close walk with God turns Scripture from pressure into help for daily decisions.",
          next: "Pick one Scripture you already know and practice it intentionally in one decision this week.",
        },
        faith: {
          summary: "Your faith is becoming visible in action and courage under pressure.",
          detail: "Victorious faith rests on Christ's victory and shows up in character change, courage, and perseverance.",
          next: "Write one difficult situation where you need courage, then pray John 16:33 over it daily.",
        },
      },
      reflectionQuestions: [
        "Which area is strongest in your life right now, and why?",
        "Which area is most neglected, and what situation reveals it?",
        "What one practical step will you take this week to grow as an overcomer?",
      ],
    },
    id: {
      title: "Survey Overcomer",
      subtitle: "Identitas, kasih, ketaatan, dan iman yang menang",
      description: "Perhatikan di mana kemenangan Kristus mulai terlihat dalam kehidupan sehari-hari.",
      time: "6-10 mnt",
      source: "TrueVine Church Overcomer Survey",
      prompt: "Seberapa setuju Anda dengan pernyataan ini?",
      groundTruth: "Ayat Alkitab",
      dimensionLabels: { identity: "Identitas", love: "Kasih", obedience: "Gaya Hidup Taat", faith: "Iman yang Menang" },
      dimensionDetails: {
        identity: {
          summary: "Anda sedang belajar hidup dari identitas dikasihi, bukan membuktikan diri.",
          detail: "Identitas di dalam Kristus memberi rasa aman saat pujian, perbandingan, atau tekanan performa muncul.",
          next: "Sebutkan satu momen minggu ini saat Anda merasa perlu membuktikan diri, lalu jawab dengan Firman Tuhan.",
        },
        love: {
          summary: "Kasih Tuhan makin terlihat lewat pengampunan, kerendahan hati, dan kesatuan.",
          detail: "Kasih bertumbuh saat konflik, luka, dan pelayanan dibentuk oleh anugerah, bukan pengakuan.",
          next: "Pilih satu relasi di mana Anda dapat mengejar damai atau pengampunan dengan langkah konkret.",
        },
        obedience: {
          summary: "Ketaatan menjadi respons kasih, bukan rasa takut.",
          detail: "Kedekatan dengan Tuhan membuat Firman bukan tekanan, tetapi pertolongan untuk keputusan sehari-hari.",
          next: "Pilih satu Firman yang sudah Anda tahu dan praktikkan secara sengaja dalam satu keputusan minggu ini.",
        },
        faith: {
          summary: "Iman Anda makin terlihat dalam tindakan dan keberanian di bawah tekanan.",
          detail: "Iman yang menang bertumpu pada kemenangan Kristus dan terlihat dalam perubahan karakter, keberanian, dan ketekunan.",
          next: "Tulis satu situasi sulit yang membutuhkan keberanian, lalu doakan Yohanes 16:33 atasnya setiap hari.",
        },
      },
      reflectionQuestions: [
        "Area mana yang paling kuat dalam hidup Anda saat ini, dan mengapa?",
        "Area mana yang paling sering terabaikan, dan situasi apa yang memperlihatkannya?",
        "Satu langkah praktis apa yang akan Anda ambil minggu ini untuk bertumbuh sebagai overcomer?",
      ],
      questions: [
        { id: 1, text: "Saya tidak merasa perlu membuktikan diri agar diterima orang lain.", dimension: "identity", verse: "Lihatlah betapa besarnya kasih Bapa kepada kita. - 1 Yohanes 3:1" },
        { id: 2, text: "Ketika tidak dipuji atau diperhatikan, saya tetap merasa aman dan cukup.", dimension: "identity", verse: "Engkau berharga dan mulia di mata-Ku. - Yesaya 43:4" },
        { id: 3, text: "Ketika orang lain lebih berhasil, saya tidak merasa terancam atau minder.", dimension: "identity", verse: "Kita adalah buatan Allah. - Efesus 2:10" },
        { id: 13, text: "Saya dapat bekerja atau melayani dari rasa percaya, bukan dari kecemasan bahwa saya tidak cukup.", dimension: "identity", verse: "Allahku akan memenuhi segala keperluanmu dalam Kristus Yesus. - Filipi 4:19" },
        { id: 14, text: "Saya mengambil keputusan sebagai anak Allah yang dikasihi, bukan orang yang harus mencari kelayakan.", dimension: "identity", verse: "Ia memberi kuasa supaya menjadi anak-anak Allah. - Yohanes 1:12" },
        { id: 4, text: "Saat konflik terjadi, saya berusaha menyelesaikannya dengan cara membangun.", dimension: "love", verse: "Sedapat-dapatnya hiduplah dalam perdamaian. - Roma 12:18" },
        { id: 5, text: "Ketika seseorang menyakiti saya, saya dapat memproses dan mengampuni lebih cepat dari sebelumnya.", dimension: "love", verse: "Ampunilah sebagaimana Tuhan telah mengampuni kamu. - Kolose 3:13" },
        { id: 6, text: "Saat melayani, motivasi saya lebih berasal dari kasih Tuhan daripada pengakuan.", dimension: "love", verse: "Layanilah seorang akan yang lain oleh kasih. - Galatia 5:13" },
        { id: 15, text: "Saya melambat sebelum menghakimi orang lain agar dapat memahami situasinya.", dimension: "love", verse: "Hendaklah kamu rendah hati, lemah lembut, dan sabar. - Efesus 4:2" },
        { id: 16, text: "Saya menjaga kesatuan dan tidak membiarkan masalah kecil menjadi luka yang lebih besar.", dimension: "love", verse: "Peliharalah kesatuan Roh oleh ikatan damai sejahtera. - Efesus 4:3" },
        { id: 7, text: "Saya berusaha mempraktikkan Firman Tuhan dalam keputusan harian, bukan hanya memahaminya.", dimension: "obedience", verse: "Hendaklah kamu menjadi pelaku firman. - Yakobus 1:22" },
        { id: 8, text: "Saya merasa dekat dengan Tuhan melalui doa, Firman, atau kesadaran akan hadirat-Nya.", dimension: "obedience", verse: "Tinggallah di dalam Aku. - Yohanes 15:4" },
        { id: 9, text: "Ketika menaati Tuhan, saya melakukannya karena mengasihi Dia, bukan takut dihukum.", dimension: "obedience", verse: "Jikalau kamu mengasihi Aku, kamu akan menuruti perintah-Ku. - Yohanes 14:15" },
        { id: 17, text: "Saat mendengar Firman, saya menerimanya sebagai pertolongan Tuhan, bukan tekanan performa.", dimension: "obedience", verse: "Perintah-perintah-Nya itu tidak berat. - 1 Yohanes 5:3" },
        { id: 18, text: "Ketika perintah Tuhan terasa berat, saya memeriksa apakah hati saya sedang menjauh dari-Nya.", dimension: "obedience", verse: "Marilah kepada-Ku... Aku akan memberi kelegaan kepadamu. - Matius 11:28" },
        { id: 10, text: "Iman saya terlihat dalam tindakan nyata: cara bekerja, memutuskan, dan menghadapi masalah.", dimension: "faith", verse: "Iman tanpa perbuatan adalah mati. - Yakobus 2:17" },
        { id: 11, text: "Saat menghadapi kesulitan, saya berani karena Kristus sudah menang.", dimension: "faith", verse: "Kuatkanlah hatimu, Aku telah mengalahkan dunia. - Yohanes 16:33" },
        { id: 12, text: "Saya percaya saya adalah overcomer karena Kristus yang hidup di dalam saya.", dimension: "faith", verse: "Roh yang ada di dalam kamu lebih besar. - 1 Yohanes 4:4" },
        { id: 19, text: "Saya melihat pertumbuhan dari cara saya merespons tekanan, kekecewaan, atau penundaan.", dimension: "faith", verse: "Ujian terhadap imanmu menghasilkan ketekunan. - Yakobus 1:3" },
        { id: 20, text: "Berjalan dengan Kristus mengubah karakter saya menjadi lebih sabar, lembut, dan mengampuni.", dimension: "faith", verse: "Buah Roh ialah kasih, sukacita, damai sejahtera... - Galatia 5:22" },
      ],
    },
  },
  purpose: {
    en: {
      time: "6-10 min",
      source: "Genesis 3:8-10 / Ecclesiastes 3:11",
      prompt: "How true is this of your life right now?",
      groundTruth: "Ground truth verse",
      dimensionDetails: {
        R: { summary: "You start with knowing God, not just doing for God.", detail: "When relationship is the foundation, identity and purpose flow from being loved, not performance.", next: "Spend 10 quiet minutes with God this week with no agenda except honest presence." },
        W: { summary: "Scripture shapes your thinking and decisions.", detail: "Living in the Word turns confusion into clarity and feelings into formed convictions.", next: "Pick one short passage and read it daily for seven days. Write one sentence of application each day." },
        F: { summary: "You honor God in ordinary, hidden obedience.", detail: "Big purpose is built on small daily yeses that no one applauds.", next: "Choose one small commitment and keep it consistently for one week." },
        G: { summary: "You use what God gave you to build others.", detail: "Purpose grows clearer when your gifts meet other people's real needs.", next: "Identify one person or group you can bless this week using a gift you already have." },
        E: { summary: "You weigh life by what truly lasts.", detail: "Eternal perspective reorders priorities, suffering, and ambition under God's kingdom.", next: "Review your calendar and mark one item that reflects eternity and one that needs reshaping." },
      },
      reflectionQuestions: ["Where do you most often look for purpose outside God?", "Which dimension needs a concrete weekly habit?", "Who can you serve with a gift you already have?"],
    },
    id: {
      title: "Refleksi Tujuan & Identitas",
      subtitle: "Dari kekosongan menuju kepenuhan di dalam Tuhan",
      description: "Petakan kesadaran tujuan dari Tuhan melalui relasi, Firman, kesetiaan, karunia, dan kekekalan.",
      time: "6-10 mnt",
      source: "Kejadian 3:8-10 / Pengkhotbah 3:11",
      prompt: "Seberapa benar hal ini dalam hidup Anda saat ini?",
      groundTruth: "Ayat kebenaran",
      dimensionLabels: { R: "Relasi dengan Tuhan", W: "Hidup dalam Firman", F: "Setia dalam Hal Kecil", G: "Karunia untuk Melayani", E: "Perspektif Kekekalan" },
      dimensionDetails: {
        R: { summary: "Anda memulai dari mengenal Tuhan, bukan hanya melakukan sesuatu untuk Tuhan.", detail: "Saat relasi menjadi fondasi, identitas dan tujuan mengalir dari dikasihi, bukan dari performa.", next: "Luangkan 10 menit hening bersama Tuhan minggu ini tanpa agenda selain hadir dengan jujur." },
        W: { summary: "Firman membentuk cara berpikir dan keputusan Anda.", detail: "Hidup dalam Firman mengubah kebingungan menjadi kejelasan dan perasaan menjadi keyakinan yang dibentuk Tuhan.", next: "Pilih satu nas pendek dan baca setiap hari selama tujuh hari. Tulis satu kalimat aplikasi setiap hari." },
        F: { summary: "Anda menghormati Tuhan dalam ketaatan harian yang sederhana.", detail: "Tujuan besar dibangun dari 'ya' harian yang kecil dan sering tidak terlihat orang.", next: "Pilih satu komitmen kecil dan jaga secara konsisten selama satu minggu." },
        G: { summary: "Anda memakai pemberian Tuhan untuk membangun orang lain.", detail: "Purpose menjadi lebih jelas saat karunia Anda menjumpai kebutuhan nyata orang lain.", next: "Tentukan satu orang atau kelompok yang dapat Anda berkati minggu ini dengan karunia yang sudah ada." },
        E: { summary: "Anda menimbang hidup berdasarkan apa yang benar-benar bertahan.", detail: "Perspektif kekekalan menata ulang prioritas, penderitaan, dan ambisi di bawah Kerajaan Tuhan.", next: "Tinjau kalender Anda dan tandai satu hal yang mencerminkan kekekalan serta satu hal yang perlu dibentuk ulang." },
      },
      reflectionQuestions: ["Di mana Anda paling sering mencari tujuan di luar Tuhan?", "Dimensi mana yang perlu kebiasaan mingguan yang konkret?", "Siapa yang dapat Anda layani dengan karunia yang sudah ada?"],
      questions: [
        { id: 1, text: "Saya menyediakan ruang setiap hari untuk hadir bersama Tuhan, bukan hanya meminta sesuatu.", dimension: "R", verse: "Inilah hidup yang kekal itu, yaitu bahwa mereka mengenal Engkau. - Yohanes 17:3" },
        { id: 2, text: "Saya membawa kekosongan batin kepada Tuhan sebelum mencoba mengisinya dengan hal lain.", dimension: "R", verse: "Seperti rusa merindukan sungai, demikianlah jiwaku merindukan Engkau. - Mazmur 42:1" },
        { id: 11, text: "Identitas terdalam saya adalah dikasihi Tuhan, bukan pencapaian saya.", dimension: "R", verse: "Kita disebut anak-anak Allah. - 1 Yohanes 3:1" },
        { id: 12, text: "Saya dapat datang kepada Tuhan dengan jujur daripada bersembunyi saat merasa terbuka.", dimension: "R", verse: "TUHAN Allah memanggil manusia itu: Di manakah engkau? - Kejadian 3:9" },
        { id: 3, text: "Saya membaca atau mendengar Firman secara teratur agar membentuk cara berpikir saya.", dimension: "W", verse: "Firman-Mu pelita bagi kakiku. - Mazmur 119:105" },
        { id: 4, text: "Saya membiarkan Firman Tuhan menantang rencana saya, bukan hanya membenarkan keinginan saya.", dimension: "W", verse: "Firman Allah hidup dan kuat. - Ibrani 4:12" },
        { id: 13, text: "Saya membawa pilihan yang membingungkan kepada Firman sebelum hanya mengandalkan naluri sendiri.", dimension: "W", verse: "Percayalah kepada TUHAN dengan segenap hatimu. - Amsal 3:5" },
        { id: 14, text: "Saya melakukan Firman Tuhan, bukan hanya menyetujuinya secara pikiran.", dimension: "W", verse: "Hendaklah kamu menjadi pelaku firman. - Yakobus 1:22" },
        { id: 5, text: "Saya berusaha setia dalam tugas kecil yang tersembunyi meski tidak ada yang melihat.", dimension: "F", verse: "Setia dalam perkara kecil juga setia dalam perkara besar. - Lukas 16:10" },
        { id: 6, text: "Saya mengerjakan pekerjaan biasa seperti untuk Tuhan.", dimension: "F", verse: "Apa pun yang kamu perbuat, perbuatlah dengan segenap hati seperti untuk Tuhan. - Kolose 3:23" },
        { id: 15, text: "Saya menepati janji kecil karena kesetiaan tersembunyi berarti bagi Tuhan.", dimension: "F", verse: "Jika ya, hendaklah kamu katakan ya. - Matius 5:37" },
        { id: 16, text: "Saya menolak mengejar hal yang tampak penting sambil mengabaikan ketaatan harian.", dimension: "F", verse: "Baik sekali perbuatanmu, hai hambaku yang baik dan setia. - Matius 25:21" },
        { id: 7, text: "Saya mengenal setidaknya satu karunia yang Tuhan berikan untuk memberkati orang lain.", dimension: "G", verse: "Layanilah seorang akan yang lain sesuai karunia yang diperoleh. - 1 Petrus 4:10" },
        { id: 8, text: "Saya memakai karunia untuk membangun orang di sekitar saya, bukan hanya diri sendiri.", dimension: "G", verse: "Kepada tiap-tiap orang dikaruniakan penyataan Roh untuk kepentingan bersama. - 1 Korintus 12:7" },
        { id: 17, text: "Saya bersedia melayani dengan cara yang tidak terlihat atau tidak nyaman saat Tuhan menuntun.", dimension: "G", verse: "Barangsiapa ingin menjadi besar hendaklah menjadi pelayan. - Markus 10:43" },
        { id: 18, text: "Saya memandang pekerjaan, peran, atau panggilan sebagai cara memuliakan Tuhan.", dimension: "G", verse: "Segala sesuatu adalah dari Dia, oleh Dia, dan kepada Dia. - Roma 11:36" },
        { id: 9, text: "Pilihan saya tentang uang, waktu, dan ambisi dibentuk oleh kekekalan.", dimension: "E", verse: "Kumpulkanlah bagimu harta di sorga. - Matius 6:20" },
        { id: 10, text: "Saya hidup dengan kesadaran bahwa tujuan utama saya adalah mengenal, mengasihi, dan memuliakan Tuhan.", dimension: "E", verse: "Bagi Dialah kemuliaan sampai selama-lamanya. - Roma 11:36" },
        { id: 19, text: "Saya memikirkan apa yang bertahan melampaui hidup ini ketika menentukan prioritas.", dimension: "E", verse: "Pikirkanlah perkara yang di atas. - Kolose 3:2" },
        { id: 20, text: "Penderitaan dan kehilangan lebih dapat saya tanggung saat mengingat kemuliaan yang akan datang.", dimension: "E", verse: "Penderitaan ringan sekarang mengerjakan kemuliaan kekal. - 2 Korintus 4:17" },
      ],
    },
  },
  commitment: {
    en: {
      time: "7-10 min",
      source: "1 John 3:18 / Three-Legged Stool framework",
      prompt: "How accurately does this describe your everyday relationships?",
      groundTruth: "Biblical principle",
      dimensionDetails: {
        caring: { summary: "An active heart that wants to help, love, and bless others.", detail: "Caring is practical compassion that notices needs and moves toward people with humility and patience.", next: "Choose one hidden act of kindness this week and do it without announcing it." },
        connection: { summary: "Closeness, trust, safety, and mutual understanding.", detail: "Connection grows through attention, honesty, confidentiality, gratitude, forgiveness, and emotional safety.", next: "Have one unhurried conversation this week where your goal is to understand, not advise." },
        commitment: { summary: "Dependable presence and follow-through over time.", detail: "Commitment makes love visible through reliability, repair, healthy boundaries, loyalty, and perseverance.", next: "Pick one promise, follow-up, or relational repair you have delayed and follow through within 48 hours." },
      },
      reflectionQuestions: ["Which leg of the stool is strongest right now?", "Which leg needs practical strengthening?", "What follow-through would make love more visible this week?"],
    },
    id: {
      title: "Assessment Komitmen 3C",
      subtitle: "Caring, connection, dan commitment",
      description: "Refleksi kesehatan relasi yang praktis untuk kelompok kecil dan tim pelayanan.",
      time: "7-10 mnt",
      source: "1 Yohanes 3:18 / Framework bangku tiga kaki",
      prompt: "Seberapa akurat pernyataan ini menggambarkan relasi Anda sehari-hari?",
      groundTruth: "Prinsip Alkitab",
      dimensionLabels: { caring: "Caring", connection: "Connection", commitment: "Commitment" },
      dimensionDetails: {
        caring: { summary: "Hati yang aktif ingin menolong, mengasihi, dan memberkati orang lain.", detail: "Caring adalah belas kasihan praktis yang memperhatikan kebutuhan dan bergerak mendekat dengan rendah hati dan sabar.", next: "Pilih satu tindakan kebaikan tersembunyi minggu ini dan lakukan tanpa mengumumkannya." },
        connection: { summary: "Kedekatan, kepercayaan, rasa aman, dan saling memahami.", detail: "Connection bertumbuh melalui perhatian, kejujuran, menjaga rahasia, syukur, pengampunan, dan keamanan emosional.", next: "Bangun satu percakapan tanpa terburu-buru minggu ini dengan tujuan memahami, bukan menasihati." },
        commitment: { summary: "Kehadiran yang dapat diandalkan dan tindak lanjut dari waktu ke waktu.", detail: "Commitment membuat kasih terlihat melalui keandalan, pemulihan relasi, batas sehat, kesetiaan, dan ketekunan.", next: "Tentukan satu janji, follow-up, atau pemulihan relasi yang tertunda, lalu lakukan dalam 48 jam." },
      },
      reflectionQuestions: ["Kaki bangku mana yang paling kuat saat ini?", "Kaki mana yang perlu dikuatkan secara praktis?", "Tindak lanjut apa yang membuat kasih lebih terlihat minggu ini?"],
      questions: [
        { id: 1, text: "Saya mencari cara sederhana untuk membantu orang, meski tidak mendapat imbalan.", dimension: "caring", verse: "Layanilah seorang akan yang lain oleh kasih. - Galatia 5:13" },
        { id: 2, text: "Saat seseorang sedang berat, saya biasanya ingin ikut membantu.", dimension: "caring", verse: "Bertolong-tolonganlah menanggung bebanmu. - Galatia 6:2" },
        { id: 3, text: "Saya tetap lembut dan sabar saat orang lain salah atau frustrasi.", dimension: "caring", verse: "Hendaklah kamu rendah hati dan lemah lembut. - Efesus 4:2" },
        { id: 10, text: "Saya memperhatikan ketika seseorang merasa tersisih dan berusaha melibatkannya.", dimension: "caring", verse: "Perhatikanlah juga kepentingan orang lain. - Filipi 2:4" },
        { id: 11, text: "Saya menguatkan orang karena peduli, bukan karena ingin dipuji.", dimension: "caring", verse: "Janganlah diketahui tangan kirimu apa yang diperbuat tangan kananmu. - Matius 6:3" },
        { id: 12, text: "Saya dapat ikut bersukacita atas kabar baik orang lain tanpa merasa bersaing.", dimension: "caring", verse: "Bersukacitalah dengan orang yang bersukacita. - Roma 12:15" },
        { id: 13, text: "Saya bersedia menyesuaikan kenyamanan ketika seseorang sungguh membutuhkan bantuan.", dimension: "caring", verse: "Memberikan nyawanya untuk sahabat-sahabatnya. - Yohanes 15:13" },
        { id: 14, text: "Saya tetap melatih kebaikan kepada orang yang sulit saya hadapi.", dimension: "caring", verse: "Kasihilah musuhmu dan berdoalah bagi mereka. - Matius 5:44" },
        { id: 15, text: "Saya melakukan kebaikan tersembunyi tanpa perlu dilihat orang.", dimension: "caring", verse: "Bapamu yang melihat yang tersembunyi akan membalasnya. - Matius 6:4" },
        { id: 16, text: "Saya sengaja mengecek kabar teman atau anggota kelompok yang sedang tertekan.", dimension: "caring", verse: "Nasihatilah seorang akan yang lain dan saling membangunlah. - 1 Tesalonika 5:11" },
        { id: 4, text: "Saya memberi perhatian penuh saat orang berbicara kepada saya.", dimension: "connection", verse: "Hendaklah setiap orang cepat untuk mendengar. - Yakobus 1:19" },
        { id: 5, text: "Saya bertanya sungguh-sungguh dan cukup pelan untuk mendengar jawaban yang jujur.", dimension: "connection", verse: "Hendaklah kata-katamu senantiasa penuh kasih. - Kolose 4:6" },
        { id: 6, text: "Orang merasa aman terbuka kepada saya karena saya tidak cepat menghakimi.", dimension: "connection", verse: "Terimalah satu akan yang lain. - Roma 15:7" },
        { id: 17, text: "Saya mendengar untuk memahami, bukan hanya menyiapkan jawaban.", dimension: "connection", verse: "Rancangan di dalam hati manusia itu seperti air yang dalam. - Amsal 20:5" },
        { id: 18, text: "Saya menjaga cerita pribadi orang lain dan menjauhi gosip.", dimension: "connection", verse: "Orang yang setia menutupi perkara. - Amsal 11:13" },
        { id: 19, text: "Saya dapat membagikan kebutuhan nyata kepada orang yang aman, bukan selalu menjaga jarak.", dimension: "connection", verse: "Hendaklah kamu saling mengaku dosamu dan saling mendoakan. - Yakobus 5:16" },
        { id: 20, text: "Saya terbuka menerima doa, bantuan, dan dukungan praktis.", dimension: "connection", verse: "Berdua lebih baik dari pada seorang diri. - Pengkhotbah 4:9" },
        { id: 21, text: "Saya memperlakukan orang dengan hangat dan hormat meski kami berbeda pendapat.", dimension: "connection", verse: "Hendaklah kamu saling mendahului dalam memberi hormat. - Roma 12:10" },
        { id: 22, text: "Saya secara teratur berterima kasih kepada orang yang mendukung atau membangun saya.", dimension: "connection", verse: "Mengucap syukurlah dalam segala hal. - 1 Tesalonika 5:18" },
        { id: 23, text: "Saya bergerak menuju pengampunan dan damai saat terjadi salah paham.", dimension: "connection", verse: "Ampunilah seorang akan yang lain sebagaimana Tuhan mengampuni kamu. - Kolose 3:13" },
        { id: 7, text: "Saat saya berkata akan berdoa, membantu, atau mengecek kabar, saya menindaklanjutinya.", dimension: "commitment", verse: "Jika ya, hendaklah kamu katakan ya. - Matius 5:37" },
        { id: 8, text: "Orang dapat mengandalkan saya untuk hadir dan tepat waktu.", dimension: "commitment", verse: "Setia dalam perkara kecil. - Lukas 16:10" },
        { id: 9, text: "Saat konflik muncul, saya berusaha menghadapinya daripada menghilang.", dimension: "commitment", verse: "Hiduplah dalam perdamaian dengan semua orang. - Roma 12:18" },
        { id: 24, text: "Saya menunjukkan kasih lewat tindakan nyata, bukan hanya kata-kata baik.", dimension: "commitment", verse: "Mengasihi dengan perbuatan dan dalam kebenaran. - 1 Yohanes 3:18" },
        { id: 25, text: "Saya tetap hadir saat situasi teman rumit atau lambat membaik.", dimension: "commitment", verse: "Seorang sahabat menaruh kasih setiap waktu. - Amsal 17:17" },
        { id: 26, text: "Saya tetap berkomitmen pada kelompok atau komunitas saat perasaan saya naik turun.", dimension: "commitment", verse: "Janganlah menjauhkan diri dari pertemuan-pertemuan. - Ibrani 10:25" },
        { id: 27, text: "Saya menetapkan batas sehat agar tetap dapat diandalkan dan tidak kelelahan.", dimension: "commitment", verse: "Yesus pergi ke tempat yang sunyi dan berdoa di sana. - Markus 1:35" },
        { id: 28, text: "Saya tetap dekat dengan teman di titik rendah, bukan hanya saat hidup terasa mudah.", dimension: "commitment", verse: "Ada sahabat yang lebih karib dari pada saudara. - Amsal 18:24" },
        { id: 29, text: "Ketika melukai seseorang, saya bertanggung jawab dan mencari pemulihan.", dimension: "commitment", verse: "Pergilah berdamai dahulu dengan saudaramu. - Matius 5:24" },
        { id: 30, text: "Saya tetap memilih kebaikan ketika saya sendiri sedang melewati musim sulit.", dimension: "commitment", verse: "Janganlah kita jemu-jemu berbuat baik. - Galatia 6:9" },
      ],
    },
  },
  ...additionalAssessmentContent,
};

function localizeAssessment(base: BaseAssessmentDefinition, locale: Locale): AssessmentDefinition {
  const content = assessmentContent[base.id][locale];
  return {
    ...base,
    locale,
    title: content.title || base.title,
    subtitle: content.subtitle || base.subtitle,
    description: content.description || base.description,
    time: content.time,
    source: content.source,
    prompt: content.prompt,
    groundTruth: content.groundTruth,
    scale: content.scale || localizedScale[locale],
    revisitMode: content.revisitMode || "low",
    dimensions: Object.fromEntries(
      Object.entries(base.dimensions).map(([key, label]) => [
        key,
        { label: content.dimensionLabels?.[key] || label, ...content.dimensionDetails[key] },
      ])
    ),
    resultLabels: { ...resultLabels[locale], ...content.resultLabelOverrides },
    reflectionQuestions: content.reflectionQuestions,
    questions: content.questions || base.questions,
  };
}

export function getAssessments(locale: Locale): AssessmentDefinition[] {
  return baseAssessments.map((assessment) => localizeAssessment(assessment, locale));
}

export function getAssessmentById(id: string | null, locale: Locale = "en"): AssessmentDefinition | undefined {
  const base = baseAssessments.find((assessment) => assessment.id === id);
  return base ? localizeAssessment(base, locale) : undefined;
}