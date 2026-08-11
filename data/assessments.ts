export type AssessmentId = "prayer-life" | "overcomer" | "purpose" | "commitment";

export type AssessmentQuestion = {
  id: number;
  text: string;
  dimension: string;
  verse: string;
};

export type AssessmentDefinition = {
  id: AssessmentId;
  title: string;
  subtitle: string;
  description: string;
  accent: "cyan" | "amber" | "emerald" | "rose";
  dimensions: Record<string, string>;
  maxPerDimension: Record<string, number>;
  questions: AssessmentQuestion[];
};

export const assessmentScale = [
  { value: 5, label: "Very true" },
  { value: 4, label: "Often true" },
  { value: 3, label: "Sometimes" },
  { value: 2, label: "Rarely" },
  { value: 1, label: "Not yet" },
] as const;

export const assessments: AssessmentDefinition[] = [
  {
    id: "prayer-life",
    title: "Prayer Life Journey",
    subtitle: "Adoration, God's will, petition, and persistence",
    description: "Reflect on the rhythm of your prayer life through the pattern Jesus gives in Matthew 6.",
    accent: "cyan",
    dimensions: { A: "Adoration", F: "Focus on God's Will", S: "Supplication & Petition", P: "Persistence" },
    maxPerDimension: { A: 15, F: 15, S: 15, P: 15 },
    questions: [
      { id: 1, text: "I pray with a respectful heart to God, not only to seek what I need.", dimension: "A", verse: "Our Father in heaven, hallowed be your name. - Matthew 6:9" },
      { id: 2, text: "I include thanksgiving and humility when bringing requests to God.", dimension: "A", verse: "With thanksgiving, present your requests to God. - Philippians 4:6" },
      { id: 3, text: "I still trust God when I feel anxious, stressed, or discouraged.", dimension: "A", verse: "The peace of God will guard your hearts. - Philippians 4:7" },
      { id: 4, text: "I pray for God's will even when it challenges my plans.", dimension: "F", verse: "Your kingdom come, your will be done. - Matthew 6:10" },
      { id: 5, text: "I am willing to surrender outcomes to God in prayer.", dimension: "F", verse: "Yet not my will, but yours be done. - Luke 22:42" },
      { id: 6, text: "I choose God's Word over my own understanding when making decisions.", dimension: "F", verse: "Lean not on your own understanding. - Proverbs 3:5" },
      { id: 7, text: "I bring daily needs to God with honesty and dependence.", dimension: "S", verse: "Give us today our daily bread. - Matthew 6:11" },
      { id: 8, text: "I make specific requests in prayer instead of staying vague.", dimension: "S", verse: "Present your requests to God. - Philippians 4:6" },
      { id: 9, text: "I ask God's help in temptation and moral decisions.", dimension: "S", verse: "Deliver us from the evil one. - Matthew 6:13" },
      { id: 10, text: "I keep praying when answers are delayed.", dimension: "P", verse: "Always pray and not give up. - Luke 18:1" },
      { id: 11, text: "I practice short prayers throughout the day to stay connected with God.", dimension: "P", verse: "Pray continually. - 1 Thessalonians 5:17" },
      { id: 12, text: "Humility and consistent prayer grow together in my life.", dimension: "P", verse: "Devote yourselves to prayer. - Colossians 4:2" },
    ],
  },
  {
    id: "overcomer",
    title: "Overcomer Survey",
    subtitle: "Identity, love, obedience, and victorious faith",
    description: "Notice where Christ's victory is becoming visible in daily life.",
    accent: "amber",
    dimensions: { identity: "Identity", love: "Love", obedience: "Obedient Lifestyle", faith: "Victorious Faith" },
    maxPerDimension: { identity: 15, love: 15, obedience: 15, faith: 15, total: 60 },
    questions: [
      { id: 1, text: "I do not feel the need to prove myself to be accepted by others.", dimension: "identity", verse: "See what kind of love the Father has given to us. - 1 John 3:1" },
      { id: 2, text: "When I am not praised or noticed, I still feel secure and enough.", dimension: "identity", verse: "You are precious and honored in my sight. - Isaiah 43:4" },
      { id: 3, text: "When others succeed more, I do not feel threatened or inferior.", dimension: "identity", verse: "We are God's handiwork. - Ephesians 2:10" },
      { id: 4, text: "When conflict happens, I try to resolve it constructively.", dimension: "love", verse: "If possible, live at peace with everyone. - Romans 12:18" },
      { id: 5, text: "When someone hurts me, I can process and forgive faster than before.", dimension: "love", verse: "Forgive as the Lord forgave you. - Colossians 3:13" },
      { id: 6, text: "When serving, my motivation is more from God's love than recognition.", dimension: "love", verse: "Serve one another humbly in love. - Galatians 5:13" },
      { id: 7, text: "I seek to practice God's Word in daily decisions, not only understand it.", dimension: "obedience", verse: "Be doers of the word. - James 1:22" },
      { id: 8, text: "I feel close to God through prayer, Scripture, or awareness of His presence.", dimension: "obedience", verse: "Remain in me, as I also remain in you. - John 15:4" },
      { id: 9, text: "When I obey God, I do it because I love Him, not because I fear punishment.", dimension: "obedience", verse: "If you love me, keep my commands. - John 14:15" },
      { id: 10, text: "My faith is visible in real actions: how I work, decide, and face problems.", dimension: "faith", verse: "Faith without action is dead. - James 2:17" },
      { id: 11, text: "When facing difficulty, I have courage because Christ has already won.", dimension: "faith", verse: "Take heart! I have overcome the world. - John 16:33" },
      { id: 12, text: "I believe I am an overcomer by Christ who lives in me.", dimension: "faith", verse: "The one who is in you is greater. - 1 John 4:4" },
    ],
  },
  {
    id: "purpose",
    title: "Purpose & Identity Reflection",
    subtitle: "From emptiness toward fullness in God",
    description: "Map your sense of God-given purpose through relationship, Scripture, faithfulness, gifts, and eternity.",
    accent: "emerald",
    dimensions: { R: "Relationship with God", W: "Living in the Word", F: "Faithfulness in Small Things", G: "Gifts for Service", E: "Eternal Perspective" },
    maxPerDimension: { R: 10, W: 10, F: 10, G: 10, E: 10 },
    questions: [
      { id: 1, text: "I make space each day to simply be with God, not just ask Him for things.", dimension: "R", verse: "That they know you, the only true God. - John 17:3" },
      { id: 2, text: "I bring inner emptiness to God before trying to fill it elsewhere.", dimension: "R", verse: "My soul pants for you, my God. - Psalm 42:1" },
      { id: 3, text: "I read or listen to Scripture regularly to let it shape my thinking.", dimension: "W", verse: "Your word is a lamp for my feet. - Psalm 119:105" },
      { id: 4, text: "I let God's Word challenge my plans, not just confirm what I already want.", dimension: "W", verse: "The word of God is alive and active. - Hebrews 4:12" },
      { id: 5, text: "I try to be faithful in small, hidden tasks even when no one notices.", dimension: "F", verse: "Faithful in a very little is also faithful in much. - Luke 16:10" },
      { id: 6, text: "I do ordinary work as if I am doing it for the Lord.", dimension: "F", verse: "Whatever you do, work at it with all your heart. - Colossians 3:23" },
      { id: 7, text: "I know at least one gift God has put in me to bless others.", dimension: "G", verse: "Use whatever gift you have received to serve others. - 1 Peter 4:10" },
      { id: 8, text: "I use my gifts to build up people around me, not only myself.", dimension: "G", verse: "For the common good. - 1 Corinthians 12:7" },
      { id: 9, text: "My choices about money, time, and ambition are shaped by eternity.", dimension: "E", verse: "Store up for yourselves treasures in heaven. - Matthew 6:20" },
      { id: 10, text: "I live with the awareness that my ultimate purpose is to know, love, and glorify God.", dimension: "E", verse: "To him be glory forever. - Romans 11:36" },
    ],
  },
  {
    id: "commitment",
    title: "3C Commitment Assessment",
    subtitle: "Caring, connection, and commitment",
    description: "A practical relationship health reflection for small groups and ministry teams.",
    accent: "rose",
    dimensions: { caring: "Caring", connection: "Connection", commitment: "Commitment" },
    maxPerDimension: { caring: 15, connection: 15, commitment: 15 },
    questions: [
      { id: 1, text: "I look for simple ways to help people, even when I get nothing back.", dimension: "caring", verse: "Serve one another humbly in love. - Galatians 5:13" },
      { id: 2, text: "When someone is having a rough time, I usually want to jump in and help.", dimension: "caring", verse: "Carry each other's burdens. - Galatians 6:2" },
      { id: 3, text: "I stay gentle and patient when people mess up or get frustrated.", dimension: "caring", verse: "Be completely humble and gentle. - Ephesians 4:2" },
      { id: 4, text: "I give people my full attention when they talk to me.", dimension: "connection", verse: "Be quick to listen. - James 1:19" },
      { id: 5, text: "I ask real questions and slow down enough to hear the honest answer.", dimension: "connection", verse: "Full of grace. - Colossians 4:6" },
      { id: 6, text: "People feel safe opening up to me because I am not too quick to judge.", dimension: "connection", verse: "Accept one another. - Romans 15:7" },
      { id: 7, text: "When I say I will pray, help, or check in, I follow through.", dimension: "commitment", verse: "Let your yes be yes. - Matthew 5:37" },
      { id: 8, text: "People can count on me to show up and be on time.", dimension: "commitment", verse: "Trusted with very little. - Luke 16:10" },
      { id: 9, text: "When conflict comes up, I try to work through it instead of disappearing.", dimension: "commitment", verse: "Live at peace with everyone. - Romans 12:18" },
    ],
  },
];

export function getAssessmentById(id: string | null): AssessmentDefinition | undefined {
  return assessments.find((assessment) => assessment.id === id);
}