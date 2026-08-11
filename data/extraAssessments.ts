import type { AssessmentLocaleContent, AssessmentQuestion, BaseAssessmentDefinition, DimensionInsight, Locale } from "./assessments";

type ExtraAssessmentId = "love-languages" | "identities-women" | "identities-men";
type LoveLanguageKey = "W" | "Q" | "G" | "A" | "P";

type LoveQuestion = {
  id: number;
  text: string;
  language: LoveLanguageKey;
};

type IdentityQuestion = {
  id: number;
  label: string;
  lie: string;
  truth: string;
  verse: string;
};

const loveDimensions: Record<LoveLanguageKey, string> = {
  W: "Words of Affirmation",
  Q: "Quality Time",
  G: "Receiving Gifts",
  A: "Acts of Service",
  P: "Physical Touch",
};

const loveVerses: Record<LoveLanguageKey, string> = {
  W: "Gracious words are a honeycomb, sweet to the soul. - Proverbs 16:24",
  Q: "Be devoted to one another in love. - Romans 12:10",
  G: "Every good and perfect gift is from above. - James 1:17",
  A: "Serve one another humbly in love. - Galatians 5:13",
  P: "Greet one another with a holy kiss. - Romans 16:16",
};

const loveQuestions: Record<Locale, LoveQuestion[]> = {
  en: [
    { id: 1, text: "I feel most loved when someone tells me they appreciate me.", language: "W" },
    { id: 2, text: "Compliments and encouraging words mean a lot to me.", language: "W" },
    { id: 3, text: "I feel hurt when people speak harshly or critically to me.", language: "W" },
    { id: 4, text: "I treasure handwritten notes and messages of appreciation.", language: "W" },
    { id: 5, text: "Verbal praise matters more to me than receiving gifts.", language: "W" },
    { id: 6, text: "I feel valued when people express their gratitude in words.", language: "W" },
    { id: 7, text: "I feel most connected when we spend uninterrupted time together.", language: "Q" },
    { id: 8, text: "Having someone's full attention makes me feel special.", language: "Q" },
    { id: 9, text: "I feel neglected when people are distracted during our conversations.", language: "Q" },
    { id: 10, text: "Shared activities and experiences are more meaningful than gifts.", language: "Q" },
    { id: 11, text: "I prefer quality conversations over quick check-ins.", language: "Q" },
    { id: 12, text: "Being together matters more than what we are doing.", language: "Q" },
    { id: 13, text: "Thoughtful gifts, big or small, make me feel loved.", language: "G" },
    { id: 14, text: "I remember when someone brings me a meaningful present.", language: "G" },
    { id: 15, text: "I feel hurt when my birthday or special occasions are forgotten.", language: "G" },
    { id: 16, text: "The effort behind a gift matters more than its price.", language: "G" },
    { id: 17, text: "I keep special gifts as reminders of people who care about me.", language: "G" },
    { id: 18, text: "Receiving something unexpected brightens my day significantly.", language: "G" },
    { id: 19, text: "I feel loved when someone helps me with tasks or chores.", language: "A" },
    { id: 20, text: "Actions speak louder than words to me.", language: "A" },
    { id: 21, text: "I appreciate when people go out of their way to help me.", language: "A" },
    { id: 22, text: "I feel let down when promises to help are not kept.", language: "A" },
    { id: 23, text: "Someone doing things for me shows they truly care.", language: "A" },
    { id: 24, text: "I would rather receive help with something than get a present.", language: "A" },
    { id: 25, text: "I feel most connected through physical affection.", language: "P" },
    { id: 26, text: "Hugs, holding hands, or a pat on the back mean a lot to me.", language: "P" },
    { id: 27, text: "I feel distant in relationships without physical closeness.", language: "P" },
    { id: 28, text: "Physical presence and touch comfort me when I am upset.", language: "P" },
    { id: 29, text: "A warm embrace can make me feel better than any words.", language: "P" },
    { id: 30, text: "I prefer sitting close to someone rather than across from them.", language: "P" },
  ],
  id: [
    { id: 1, text: "Saya merasa paling dicintai ketika seseorang mengatakan mereka menghargai saya.", language: "W" },
    { id: 2, text: "Pujian dan kata-kata penyemangat sangat berarti bagi saya.", language: "W" },
    { id: 3, text: "Saya merasa terluka ketika orang berbicara kasar atau kritis kepada saya.", language: "W" },
    { id: 4, text: "Saya menghargai catatan tulisan tangan dan pesan apresiasi.", language: "W" },
    { id: 5, text: "Pujian verbal lebih penting bagi saya daripada menerima hadiah.", language: "W" },
    { id: 6, text: "Saya merasa dihargai ketika orang mengekspresikan rasa terima kasih dalam kata-kata.", language: "W" },
    { id: 7, text: "Saya merasa paling terhubung saat menghabiskan waktu bersama tanpa gangguan.", language: "Q" },
    { id: 8, text: "Mendapat perhatian penuh dari seseorang membuat saya merasa spesial.", language: "Q" },
    { id: 9, text: "Saya merasa diabaikan ketika orang terganggu saat percakapan kami.", language: "Q" },
    { id: 10, text: "Aktivitas dan pengalaman bersama lebih bermakna daripada hadiah.", language: "Q" },
    { id: 11, text: "Saya lebih suka percakapan berkualitas daripada sekadar kabar singkat.", language: "Q" },
    { id: 12, text: "Kebersamaan lebih penting daripada apa yang kita lakukan.", language: "Q" },
    { id: 13, text: "Hadiah yang penuh perhatian, besar atau kecil, membuat saya merasa dicintai.", language: "G" },
    { id: 14, text: "Saya mengingat ketika seseorang membawakan hadiah yang bermakna.", language: "G" },
    { id: 15, text: "Saya merasa terluka ketika ulang tahun atau momen spesial saya dilupakan.", language: "G" },
    { id: 16, text: "Usaha di balik hadiah lebih penting daripada harganya.", language: "G" },
    { id: 17, text: "Saya menyimpan hadiah spesial sebagai pengingat orang-orang yang peduli.", language: "G" },
    { id: 18, text: "Menerima sesuatu yang tak terduga sangat mencerahkan hari saya.", language: "G" },
    { id: 19, text: "Saya merasa dicintai ketika seseorang membantu saya dengan tugas.", language: "A" },
    { id: 20, text: "Tindakan lebih berarti daripada kata-kata bagi saya.", language: "A" },
    { id: 21, text: "Saya menghargai ketika orang berusaha keras untuk membantu saya.", language: "A" },
    { id: 22, text: "Saya merasa kecewa ketika janji untuk membantu tidak ditepati.", language: "A" },
    { id: 23, text: "Seseorang yang melakukan sesuatu untuk saya menunjukkan kepedulian mereka.", language: "A" },
    { id: 24, text: "Saya lebih suka dibantu daripada menerima hadiah.", language: "A" },
    { id: 25, text: "Saya merasa paling terhubung melalui kasih sayang fisik.", language: "P" },
    { id: 26, text: "Pelukan, bergandengan tangan, atau tepukan di punggung sangat berarti.", language: "P" },
    { id: 27, text: "Saya merasa jauh dalam hubungan tanpa kedekatan fisik.", language: "P" },
    { id: 28, text: "Kehadiran fisik dan sentuhan menghibur saya saat sedih.", language: "P" },
    { id: 29, text: "Pelukan hangat bisa membuat saya merasa lebih baik daripada kata-kata.", language: "P" },
    { id: 30, text: "Saya lebih suka duduk dekat seseorang daripada berseberangan.", language: "P" },
  ],
};

const womenIdentities: Record<Locale, IdentityQuestion[]> = {
  en: [
    { id: 1, label: "The Not Enough Woman", lie: "I am not good enough.", truth: "I am fearfully and wonderfully made.", verse: "Psalm 139:14" },
    { id: 2, label: "The Approval-Seeker", lie: "My worth depends on what others think of me.", truth: "My calling is to seek God's approval first.", verse: "Galatians 1:10" },
    { id: 3, label: "The Perfectionist", lie: "If I make mistakes, I am a failure.", truth: "God's grace is sufficient for me.", verse: "2 Corinthians 12:9" },
    { id: 4, label: "The Invisible Woman", lie: "I do not matter.", truth: "I am never forgotten by God.", verse: "Luke 12:6" },
    { id: 5, label: "The Comparison Identity", lie: "Everyone else is better than me.", truth: "I am God's handiwork, uniquely formed.", verse: "Ephesians 2:10" },
    { id: 6, label: "The Body-Shame Identity", lie: "My worth depends on how I look.", truth: "God looks at the heart.", verse: "1 Samuel 16:7" },
    { id: 7, label: "The Past-Defined Woman", lie: "My past determines who I am.", truth: "In Christ, I am a new creation.", verse: "2 Corinthians 5:17" },
    { id: 8, label: "The Shame Identity", lie: "Because of what I have done, I am unworthy.", truth: "There is no condemnation for me in Christ.", verse: "Romans 8:1" },
    { id: 9, label: "The Performance Identity", lie: "My value comes from what I accomplish.", truth: "I am saved and sustained by grace, not performance.", verse: "Ephesians 2:8" },
    { id: 10, label: "The Strong-One Identity", lie: "I must carry everything alone.", truth: "I can cast my anxiety on God because He cares for me.", verse: "1 Peter 5:7" },
    { id: 11, label: "The Responsible-for-Everyone Identity", lie: "Everyone's happiness depends on me.", truth: "Each person carries their own load.", verse: "Galatians 6:5" },
    { id: 12, label: "The Control Identity", lie: "Everything depends on me.", truth: "I trust in the Lord with all my heart.", verse: "Proverbs 3:5" },
    { id: 13, label: "The Fearful Woman", lie: "I am powerless.", truth: "God gives me power, love, and a sound mind.", verse: "2 Timothy 1:7" },
    { id: 14, label: "The Rejected Woman", lie: "I am unwanted.", truth: "God chose me before the foundation of the world.", verse: "Ephesians 1:4" },
    { id: 15, label: "The Lonely Woman", lie: "I am alone.", truth: "God will never leave nor forsake me.", verse: "Hebrews 13:5" },
    { id: 16, label: "The Unlovable Woman", lie: "I am difficult to love.", truth: "The Father has lavished His love on me.", verse: "1 John 3:1" },
    { id: 17, label: "The Failure Identity", lie: "Because I failed, I am a failure.", truth: "The righteous rise again after falling.", verse: "Proverbs 24:16" },
    { id: 18, label: "The Victim Identity", lie: "What happened to me defines me.", truth: "In Christ, I am more than a conqueror.", verse: "Romans 8:37" },
    { id: 19, label: "The Busy Identity", lie: "My worth comes from being productive.", truth: "I can be still and know that God is God.", verse: "Psalm 46:10" },
    { id: 20, label: "The Helper Identity", lie: "I exist only to serve others.", truth: "Jesus invites me to rest and be with Him.", verse: "Matthew 11:28" },
    { id: 21, label: "The Comparison Mother", lie: "I am not a good enough mother.", truth: "God's grace is sufficient for me as a mother.", verse: "2 Corinthians 12:9" },
    { id: 22, label: "The Unqualified Woman", lie: "God cannot use me.", truth: "God often chooses the weak to display His strength.", verse: "1 Corinthians 1:27" },
    { id: 23, label: "The Hopeless Woman", lie: "Nothing will change.", truth: "God has plans filled with hope and a future.", verse: "Jeremiah 29:11" },
    { id: 24, label: "The Forgotten Woman", lie: "God has forgotten me.", truth: "God will never forget me.", verse: "Isaiah 49:15" },
    { id: 25, label: "The Label-Defined Identity", lie: "Other people's labels define me.", truth: "I am called a child of God.", verse: "1 John 3:1" },
  ],
  id: [
    { id: 1, label: "Perempuan Tidak Cukup", lie: "Saya tidak cukup baik.", truth: "Saya diciptakan dengan dahsyat dan ajaib.", verse: "Mazmur 139:14" },
    { id: 2, label: "Pencari Persetujuan", lie: "Nilai saya ditentukan oleh pendapat orang lain.", truth: "Panggilan saya adalah mencari perkenanan Tuhan terlebih dahulu.", verse: "Galatia 1:10" },
    { id: 3, label: "Perfeksionis", lie: "Jika saya salah, berarti saya gagal.", truth: "Kasih karunia Tuhan cukup bagi saya.", verse: "2 Korintus 12:9" },
    { id: 4, label: "Perempuan yang Tak Terlihat", lie: "Saya tidak berarti.", truth: "Saya tidak pernah dilupakan oleh Tuhan.", verse: "Lukas 12:6" },
    { id: 5, label: "Identitas Perbandingan", lie: "Semua orang lebih baik dari saya.", truth: "Saya adalah karya tangan Tuhan yang unik.", verse: "Efesus 2:10" },
    { id: 6, label: "Identitas Malu pada Tubuh", lie: "Nilai saya bergantung pada penampilan.", truth: "Tuhan melihat hati.", verse: "1 Samuel 16:7" },
    { id: 7, label: "Perempuan yang Didefinisikan Masa Lalu", lie: "Masa lalu saya menentukan siapa saya.", truth: "Di dalam Kristus saya adalah ciptaan baru.", verse: "2 Korintus 5:17" },
    { id: 8, label: "Identitas Rasa Malu", lie: "Karena yang saya lakukan, saya tidak layak.", truth: "Tidak ada penghukuman bagi saya di dalam Kristus.", verse: "Roma 8:1" },
    { id: 9, label: "Identitas Prestasi", lie: "Nilai saya berasal dari pencapaian.", truth: "Saya diselamatkan dan ditopang oleh kasih karunia, bukan performa.", verse: "Efesus 2:8" },
    { id: 10, label: "Identitas Si Kuat", lie: "Saya harus memikul semuanya sendiri.", truth: "Saya dapat menyerahkan kekhawatiran saya kepada Tuhan karena Ia peduli.", verse: "1 Petrus 5:7" },
    { id: 11, label: "Identitas Penanggung Semua Orang", lie: "Kebahagiaan semua orang tergantung pada saya.", truth: "Setiap orang memikul bebannya sendiri.", verse: "Galatia 6:5" },
    { id: 12, label: "Identitas Kontrol", lie: "Semua hal bergantung pada saya.", truth: "Saya percaya kepada Tuhan dengan segenap hati.", verse: "Amsal 3:5" },
    { id: 13, label: "Perempuan yang Dikuasai Takut", lie: "Saya tidak berdaya.", truth: "Tuhan memberi saya kuasa, kasih, dan ketertiban pikiran.", verse: "2 Timotius 1:7" },
    { id: 14, label: "Perempuan yang Ditolak", lie: "Saya tidak diinginkan.", truth: "Tuhan memilih saya sebelum dunia dijadikan.", verse: "Efesus 1:4" },
    { id: 15, label: "Perempuan yang Kesepian", lie: "Saya sendirian.", truth: "Tuhan tidak akan meninggalkan saya.", verse: "Ibrani 13:5" },
    { id: 16, label: "Perempuan yang Sulit Dicintai", lie: "Saya sulit untuk dikasihi.", truth: "Bapa telah melimpahkan kasih-Nya kepada saya.", verse: "1 Yohanes 3:1" },
    { id: 17, label: "Identitas Kegagalan", lie: "Karena saya gagal, maka saya adalah kegagalan.", truth: "Orang benar bangkit kembali setelah jatuh.", verse: "Amsal 24:16" },
    { id: 18, label: "Identitas Korban", lie: "Apa yang terjadi pada saya menentukan saya.", truth: "Di dalam Kristus saya lebih dari pemenang.", verse: "Roma 8:37" },
    { id: 19, label: "Identitas Sibuk", lie: "Nilai saya berasal dari produktivitas.", truth: "Saya dapat diam dan mengetahui bahwa Tuhan adalah Allah.", verse: "Mazmur 46:10" },
    { id: 20, label: "Identitas Penolong", lie: "Saya ada hanya untuk melayani orang lain.", truth: "Yesus juga mengundang saya untuk datang dan beristirahat.", verse: "Matius 11:28" },
    { id: 21, label: "Ibu yang Selalu Membandingkan", lie: "Saya bukan ibu yang cukup baik.", truth: "Kasih karunia Tuhan cukup bagi saya sebagai ibu.", verse: "2 Korintus 12:9" },
    { id: 22, label: "Perempuan yang Merasa Tak Memadai", lie: "Tuhan tidak bisa memakai saya.", truth: "Tuhan memilih yang lemah untuk menyatakan kekuatan-Nya.", verse: "1 Korintus 1:27" },
    { id: 23, label: "Perempuan Tanpa Harapan", lie: "Tidak ada yang akan berubah.", truth: "Tuhan punya rancangan penuh harapan dan masa depan.", verse: "Yeremia 29:11" },
    { id: 24, label: "Perempuan yang Dilupakan", lie: "Tuhan melupakan saya.", truth: "Tuhan tidak akan melupakan saya.", verse: "Yesaya 49:15" },
    { id: 25, label: "Identitas dari Label Orang", lie: "Label dari orang lain menentukan saya.", truth: "Saya disebut anak Allah.", verse: "1 Yohanes 3:1" },
  ],
};

const menIdentities: Record<Locale, IdentityQuestion[]> = {
  en: [
    { id: 1, label: "The Provider Identity", lie: "My worth is based on how much I provide.", truth: "God is the ultimate provider, not me.", verse: "Matthew 6:26" },
    { id: 2, label: "The Performance Identity", lie: "I am valuable because of my success.", truth: "I am saved by grace, not by performance.", verse: "Ephesians 2:8-9" },
    { id: 3, label: "The Strong Man Identity", lie: "I must never show weakness.", truth: "God's power is made perfect in weakness.", verse: "2 Corinthians 12:9" },
    { id: 4, label: "The Emotionally Distant Man", lie: "Real men do not express emotions.", truth: "Even Jesus showed deep compassion, sorrow, and grief.", verse: "John 11:35" },
    { id: 5, label: "The Independent Man", lie: "I do not need help from anyone.", truth: "I am called to carry burdens together with others.", verse: "Galatians 6:2" },
    { id: 6, label: "The Failure Identity", lie: "Because I failed, I am a failure.", truth: "The righteous rise again after falling.", verse: "Proverbs 24:16" },
    { id: 7, label: "The Approval-Seeker", lie: "I need respect and approval to have value.", truth: "My identity is anchored in God's approval, not people's.", verse: "Galatians 1:10" },
    { id: 8, label: "The Control Identity", lie: "Everything depends on me.", truth: "I trust in the Lord with all my heart.", verse: "Proverbs 3:5" },
    { id: 9, label: "The Sexual Identity Distortion", lie: "My masculinity is proven through sexual conquest or performance.", truth: "I belong to God and am called to honor Him with my body.", verse: "1 Corinthians 6:19-20" },
    { id: 10, label: "The Workaholic Identity", lie: "My value comes from how hard I work.", truth: "I can be still and know that God is God.", verse: "Psalm 46:10" },
    { id: 11, label: "The Protector-Savior Identity", lie: "I must fix everything and save everyone.", truth: "Only Christ is Savior.", verse: "Luke 2:11" },
    { id: 12, label: "The Stoic Man", lie: "I must not feel pain or struggle.", truth: "God welcomes honesty and vulnerability.", verse: "Psalm 34:18" },
    { id: 13, label: "The Comparison Identity", lie: "I am only valuable if I am better than other men.", truth: "I am God's handiwork, uniquely made.", verse: "Ephesians 2:10" },
    { id: 14, label: "The Angry Man Identity", lie: "My anger defines my strength.", truth: "Strength includes being quick to listen and slow to anger.", verse: "James 1:19" },
    { id: 15, label: "The Silent Shame Identity", lie: "I must hide my struggles.", truth: "Healing begins with confession and openness.", verse: "James 5:16" },
    { id: 16, label: "The Success-Equals-Identity Man", lie: "If I lose success, I lose my identity.", truth: "Life is more than possessions and status.", verse: "Luke 12:15" },
    { id: 17, label: "The Unqualified Man", lie: "God cannot use me.", truth: "God chooses the weak to display His strength.", verse: "1 Corinthians 1:27" },
    { id: 18, label: "The Fearful Man", lie: "I am not strong enough.", truth: "God gives me power, love, and self-control.", verse: "2 Timothy 1:7" },
    { id: 19, label: "The Lone Leader", lie: "Leadership means carrying everything alone.", truth: "Wise leadership receives counsel and shares responsibility.", verse: "Exodus 18:21" },
    { id: 20, label: "The I Am What I Do Identity", lie: "My job defines who I am.", truth: "I am a child of God through faith.", verse: "Galatians 3:26" },
  ],
  id: [
    { id: 1, label: "Identitas Pencari Nafkah", lie: "Nilai saya ditentukan oleh seberapa banyak saya menyediakan.", truth: "Tuhan adalah penyedia utama, bukan saya.", verse: "Matius 6:26" },
    { id: 2, label: "Identitas Performa", lie: "Saya berharga karena keberhasilan saya.", truth: "Saya diselamatkan oleh kasih karunia, bukan performa.", verse: "Efesus 2:8-9" },
    { id: 3, label: "Identitas Pria Kuat", lie: "Saya tidak boleh menunjukkan kelemahan.", truth: "Kuasa Tuhan menjadi sempurna dalam kelemahan.", verse: "2 Korintus 12:9" },
    { id: 4, label: "Pria yang Jauh Secara Emosi", lie: "Pria sejati tidak mengekspresikan emosi.", truth: "Yesus pun menunjukkan belas kasihan, dukacita, dan tangisan.", verse: "Yohanes 11:35" },
    { id: 5, label: "Pria Independen", lie: "Saya tidak butuh bantuan siapa pun.", truth: "Saya dipanggil untuk saling menanggung beban.", verse: "Galatia 6:2" },
    { id: 6, label: "Identitas Kegagalan", lie: "Karena saya gagal, maka saya adalah kegagalan.", truth: "Orang benar bangkit kembali setelah jatuh.", verse: "Amsal 24:16" },
    { id: 7, label: "Pencari Persetujuan", lie: "Saya butuh hormat dan persetujuan agar bernilai.", truth: "Identitas saya berakar pada perkenanan Tuhan, bukan manusia.", verse: "Galatia 1:10" },
    { id: 8, label: "Identitas Kontrol", lie: "Semua hal bergantung pada saya.", truth: "Saya percaya kepada Tuhan dengan segenap hati.", verse: "Amsal 3:5" },
    { id: 9, label: "Distorsi Identitas Seksual", lie: "Maskulinitas saya dibuktikan oleh penaklukan atau performa seksual.", truth: "Saya milik Tuhan dan dipanggil untuk memuliakan-Nya dengan tubuh saya.", verse: "1 Korintus 6:19-20" },
    { id: 10, label: "Identitas Gila Kerja", lie: "Nilai saya berasal dari seberapa keras saya bekerja.", truth: "Saya dapat diam dan mengetahui bahwa Tuhan adalah Allah.", verse: "Mazmur 46:10" },
    { id: 11, label: "Identitas Pelindung-Penyelamat", lie: "Saya harus memperbaiki segalanya dan menyelamatkan semua orang.", truth: "Hanya Kristus adalah Juruselamat.", verse: "Lukas 2:11" },
    { id: 12, label: "Pria Stoik", lie: "Saya tidak boleh merasa sakit atau bergumul.", truth: "Tuhan mengundang kejujuran dan kerentanan.", verse: "Mazmur 34:18" },
    { id: 13, label: "Identitas Perbandingan", lie: "Saya berharga hanya jika lebih baik dari pria lain.", truth: "Saya adalah karya tangan Tuhan, diciptakan unik.", verse: "Efesus 2:10" },
    { id: 14, label: "Identitas Pria Pemarah", lie: "Amarah saya menunjukkan kekuatan saya.", truth: "Kekuatan sejati juga berarti cepat mendengar dan lambat marah.", verse: "Yakobus 1:19" },
    { id: 15, label: "Identitas Malu dalam Diam", lie: "Saya harus menyembunyikan pergumulan saya.", truth: "Pemulihan dimulai dari pengakuan dan keterbukaan.", verse: "Yakobus 5:16" },
    { id: 16, label: "Sukses = Identitas", lie: "Jika saya kehilangan sukses, saya kehilangan identitas.", truth: "Hidup lebih dari harta dan status.", verse: "Lukas 12:15" },
    { id: 17, label: "Pria yang Merasa Tidak Layak", lie: "Tuhan tidak dapat memakai saya.", truth: "Tuhan memilih yang lemah untuk menyatakan kekuatan-Nya.", verse: "1 Korintus 1:27" },
    { id: 18, label: "Pria yang Dikuasai Takut", lie: "Saya tidak cukup kuat.", truth: "Tuhan memberi saya kuasa, kasih, dan penguasaan diri.", verse: "2 Timotius 1:7" },
    { id: 19, label: "Pemimpin yang Sendirian", lie: "Kepemimpinan berarti memikul semua hal sendirian.", truth: "Kepemimpinan yang bijak menerima nasihat dan berbagi tanggung jawab.", verse: "Keluaran 18:21" },
    { id: 20, label: "Identitas Saya Adalah Pekerjaan Saya", lie: "Pekerjaan saya mendefinisikan siapa saya.", truth: "Saya adalah anak Allah melalui iman.", verse: "Galatia 3:26" },
  ],
};

const frequencyScale = {
  en: [
    { value: 5, label: "Very often" },
    { value: 4, label: "Often" },
    { value: 3, label: "Sometimes" },
    { value: 2, label: "Rarely" },
    { value: 1, label: "Almost never" },
  ],
  id: [
    { value: 5, label: "Sangat sering" },
    { value: 4, label: "Sering" },
    { value: 3, label: "Kadang-kadang" },
    { value: 2, label: "Jarang" },
    { value: 1, label: "Hampir tidak pernah" },
  ],
} as const;

function loveAssessmentQuestions(locale: Locale): AssessmentQuestion[] {
  return loveQuestions[locale].map((question) => ({
    id: question.id,
    text: question.text,
    dimension: question.language,
    verse: loveVerses[question.language],
  }));
}

function identityDimensions(questions: IdentityQuestion[]) {
  return Object.fromEntries(questions.map((question) => [String(question.id), question.label])) as Record<string, string>;
}

function identityMaxScores(questions: IdentityQuestion[]) {
  return Object.fromEntries(questions.map((question) => [String(question.id), 5])) as Record<string, number>;
}

function identityAssessmentQuestions(questions: IdentityQuestion[], locale: Locale): AssessmentQuestion[] {
  return questions.map((question) => ({
    id: question.id,
    text: locale === "id" ? `Seberapa sering keyakinan ini memengaruhi Anda: ${question.lie}` : `How often does this belief affect you: ${question.lie}`,
    dimension: String(question.id),
    verse: locale === "id" ? `Kebenaran: ${question.truth} - ${question.verse}` : `Truth: ${question.truth} - ${question.verse}`,
  }));
}

function identityDetails(questions: IdentityQuestion[], locale: Locale) {
  return Object.fromEntries(
    questions.map((question) => [
      String(question.id),
      locale === "id"
        ? {
            summary: `Kebohongan yang diperiksa: ${question.lie}`,
            detail: `Kebenaran pengganti: ${question.truth} (${question.verse}). Skor tinggi menunjukkan area ini mungkin masih membentuk pikiran, emosi, atau keputusan Anda.`,
            next: "Doakan kebenaran ini setiap hari selama seminggu, lalu ceritakan kepada satu pemimpin atau teman rohani yang aman.",
          }
        : {
            summary: `Lie being checked: ${question.lie}`,
            detail: `Replacing truth: ${question.truth} (${question.verse}). A high score means this area may still shape your thoughts, emotions, or decisions.`,
            next: "Pray this truth daily for one week, then share it with one safe spiritual leader or friend.",
          },
    ])
  ) as Record<string, Omit<DimensionInsight, "label">>;
}

const loveDetails: Record<Locale, Record<string, Omit<DimensionInsight, "label">>> = {
  en: {
    W: {
      summary: "You feel loved through spoken or written appreciation.",
      detail: "Encouragement, affirmation, gratitude, and thoughtful words help you feel seen. Harsh criticism may land especially deeply.",
      next: "Tell one trusted person that words of appreciation help you feel loved, and practice offering specific encouragement this week.",
    },
    Q: {
      summary: "You feel loved through undistracted presence and shared time.",
      detail: "Attention, listening, and shared experiences communicate love to you more clearly than multitasking or quick check-ins.",
      next: "Schedule one device-free conversation or shared activity this week and protect it from distraction.",
    },
    G: {
      summary: "You feel loved through thoughtful gifts and visible remembrance.",
      detail: "The price matters less than the thought. A meaningful gift says, 'I noticed you and remembered you.'",
      next: "Write down two small meaningful gifts or gestures that would bless someone else this week.",
    },
    A: {
      summary: "You feel loved when people help, serve, and follow through.",
      detail: "Practical help communicates care because love becomes visible in action, reliability, and burden-sharing.",
      next: "Ask clearly for one kind of help you need, and offer one practical act of service to someone else.",
    },
    P: {
      summary: "You feel loved through appropriate physical affection and closeness.",
      detail: "Safe, respectful touch and physical presence can communicate comfort, belonging, and warmth to you.",
      next: "Name what kinds of appropriate affection feel meaningful to you while honoring boundaries and context.",
    },
  },
  id: {
    W: {
      summary: "Anda merasa dicintai melalui apresiasi lisan atau tulisan.",
      detail: "Dorongan, afirmasi, ucapan syukur, dan kata-kata yang penuh perhatian menolong Anda merasa dilihat. Kritik keras bisa terasa sangat dalam.",
      next: "Sampaikan kepada satu orang tepercaya bahwa kata-kata apresiasi membantu Anda merasa dicintai, lalu latih memberi dorongan yang spesifik minggu ini.",
    },
    Q: {
      summary: "Anda merasa dicintai melalui kehadiran penuh dan waktu bersama.",
      detail: "Perhatian, mendengar, dan pengalaman bersama mengkomunikasikan kasih lebih jelas daripada multitasking atau sapaan singkat.",
      next: "Jadwalkan satu percakapan atau aktivitas tanpa gawai minggu ini dan lindungi dari gangguan.",
    },
    G: {
      summary: "Anda merasa dicintai melalui hadiah bermakna dan tanda bahwa Anda diingat.",
      detail: "Harga bukan yang utama. Hadiah yang bermakna berkata, 'Aku memperhatikan dan mengingatmu.'",
      next: "Tulis dua hadiah kecil atau gestur bermakna yang dapat memberkati orang lain minggu ini.",
    },
    A: {
      summary: "Anda merasa dicintai saat orang membantu, melayani, dan menepati janji.",
      detail: "Pertolongan praktis mengkomunikasikan kepedulian karena kasih menjadi terlihat dalam tindakan, keandalan, dan menanggung beban bersama.",
      next: "Mintalah satu bentuk bantuan dengan jelas, lalu tawarkan satu tindakan pelayanan praktis kepada orang lain.",
    },
    P: {
      summary: "Anda merasa dicintai melalui kedekatan fisik yang aman dan tepat.",
      detail: "Sentuhan yang aman, hormat, dan kehadiran fisik dapat mengkomunikasikan penghiburan, rasa memiliki, dan kehangatan.",
      next: "Kenali bentuk afeksi yang tepat dan bermakna bagi Anda sambil tetap menghormati batasan dan konteks.",
    },
  },
};

export const additionalBaseAssessments: BaseAssessmentDefinition[] = [
  {
    id: "love-languages",
    title: "5 Love Languages",
    subtitle: "Relationship awareness and communication",
    description: "Discover how you tend to receive and express love in close relationships.",
    accent: "rose",
    dimensions: loveDimensions,
    maxPerDimension: { W: 30, Q: 30, G: 30, A: 30, P: 30 },
    questions: loveAssessmentQuestions("en"),
  },
  {
    id: "identities-women",
    title: "False Identity Check (Women)",
    subtitle: "Truth-based self reflection for women",
    description: "Identify false beliefs that may still shape your self-view and replace them with God's truth.",
    accent: "rose",
    dimensions: identityDimensions(womenIdentities.en),
    maxPerDimension: identityMaxScores(womenIdentities.en),
    questions: identityAssessmentQuestions(womenIdentities.en, "en"),
  },
  {
    id: "identities-men",
    title: "False Identity Check (Men)",
    subtitle: "Truth-based self reflection for men",
    description: "Identify false beliefs that may still shape masculine identity and replace them with God's truth.",
    accent: "cyan",
    dimensions: identityDimensions(menIdentities.en),
    maxPerDimension: identityMaxScores(menIdentities.en),
    questions: identityAssessmentQuestions(menIdentities.en, "en"),
  },
];

export const additionalAssessmentContent: Record<ExtraAssessmentId, Record<Locale, AssessmentLocaleContent>> = {
  "love-languages": {
    en: {
      time: "10-14 min",
      source: "Inspired by the 5 Love Languages framework; original self-discovery questions",
      prompt: "How true is this for how you receive or express love?",
      groundTruth: "Relationship reflection",
      dimensionDetails: loveDetails.en,
      reflectionQuestions: [
        "Which love language helps you feel most seen and valued?",
        "Which love language do you most naturally give to others?",
        "How can you communicate your needs with humility and clarity this week?",
      ],
    },
    id: {
      title: "5 Bahasa Cinta",
      subtitle: "Kesadaran relasi dan komunikasi kasih",
      description: "Temukan cara Anda cenderung menerima dan mengekspresikan kasih dalam relasi dekat.",
      time: "10-14 mnt",
      source: "Terinspirasi dari framework 5 Bahasa Cinta; pertanyaan orisinal untuk refleksi diri",
      prompt: "Seberapa benar hal ini tentang cara Anda menerima atau mengekspresikan kasih?",
      groundTruth: "Refleksi relasi",
      dimensionLabels: { W: "Kata-kata Penegasan", Q: "Waktu Berkualitas", G: "Menerima Hadiah", A: "Tindakan Pelayanan", P: "Sentuhan Fisik" },
      dimensionDetails: loveDetails.id,
      reflectionQuestions: [
        "Bahasa cinta mana yang paling membuat Anda merasa dilihat dan dihargai?",
        "Bahasa cinta mana yang paling alami Anda berikan kepada orang lain?",
        "Bagaimana Anda dapat mengkomunikasikan kebutuhan dengan rendah hati dan jelas minggu ini?",
      ],
      questions: loveAssessmentQuestions("id"),
    },
  },
  "identities-women": {
    en: {
      time: "12-16 min",
      source: "False Identity Check for Women; Scripture-based reflection",
      prompt: "How often does this false belief affect your thoughts, emotions, or decisions?",
      groundTruth: "Scripture truth replacing the lie",
      scale: frequencyScale.en,
      revisitMode: "high",
      resultLabelOverrides: {
        strongest: "Highest false-identity risk",
        dimensions: "Risk Summary",
        whatThisMeans: "What This Reveals",
        versesToRevisit: "Truths to Revisit",
        versesToRevisitDesc: "These truths are linked to your most frequent false-identity patterns. Use them for prayer and renewal this week.",
      },
      dimensionDetails: identityDetails(womenIdentities.en, "en"),
      reflectionQuestions: [
        "Which false identity showed the highest score, and where does it appear in daily life?",
        "Which replacing truth do you need to repeat and practice this week?",
        "Who can walk with you as you renew this area in God's truth?",
      ],
    },
    id: {
      title: "Pemeriksaan Identitas Palsu (Perempuan)",
      subtitle: "Refleksi diri berbasis kebenaran untuk perempuan",
      description: "Kenali keyakinan palsu yang masih membentuk cara pandang diri dan gantikan dengan kebenaran Tuhan.",
      time: "12-16 mnt",
      source: "Pemeriksaan Identitas Palsu untuk Perempuan; refleksi berbasis Firman",
      prompt: "Seberapa sering keyakinan palsu ini memengaruhi pikiran, emosi, atau keputusan Anda?",
      groundTruth: "Kebenaran Firman pengganti kebohongan",
      scale: frequencyScale.id,
      revisitMode: "high",
      resultLabelOverrides: {
        strongest: "Risiko identitas palsu tertinggi",
        dimensions: "Ringkasan Risiko",
        whatThisMeans: "Apa yang Terlihat",
        versesToRevisit: "Kebenaran untuk Direnungkan",
        versesToRevisitDesc: "Kebenaran ini terkait pola identitas palsu yang paling sering muncul. Pakai untuk doa dan pembaruan minggu ini.",
      },
      dimensionLabels: identityDimensions(womenIdentities.id),
      dimensionDetails: identityDetails(womenIdentities.id, "id"),
      reflectionQuestions: [
        "Identitas palsu mana yang mendapat skor tertinggi, dan di mana itu muncul dalam hidup sehari-hari?",
        "Kebenaran pengganti mana yang perlu Anda ulangi dan praktikkan minggu ini?",
        "Siapa yang dapat berjalan bersama Anda saat area ini diperbarui oleh kebenaran Tuhan?",
      ],
      questions: identityAssessmentQuestions(womenIdentities.id, "id"),
    },
  },
  "identities-men": {
    en: {
      time: "10-14 min",
      source: "False Identity Check for Men; Scripture-based reflection",
      prompt: "How often does this false belief affect your thoughts, emotions, or decisions?",
      groundTruth: "Scripture truth replacing the lie",
      scale: frequencyScale.en,
      revisitMode: "high",
      resultLabelOverrides: {
        strongest: "Highest false-identity risk",
        dimensions: "Risk Summary",
        whatThisMeans: "What This Reveals",
        versesToRevisit: "Truths to Revisit",
        versesToRevisitDesc: "These truths are linked to your most frequent false-identity patterns. Use them for prayer and renewal this week.",
      },
      dimensionDetails: identityDetails(menIdentities.en, "en"),
      reflectionQuestions: [
        "Which false identity showed the highest score, and what pressure feeds it?",
        "Which replacing truth do you need to practice in decisions this week?",
        "What honest conversation would help you stop carrying this alone?",
      ],
    },
    id: {
      title: "Pemeriksaan Identitas Palsu (Pria)",
      subtitle: "Refleksi diri berbasis kebenaran untuk pria",
      description: "Kenali keyakinan palsu yang masih membentuk identitas sebagai pria dan gantikan dengan kebenaran Tuhan.",
      time: "10-14 mnt",
      source: "Pemeriksaan Identitas Palsu untuk Pria; refleksi berbasis Firman",
      prompt: "Seberapa sering keyakinan palsu ini memengaruhi pikiran, emosi, atau keputusan Anda?",
      groundTruth: "Kebenaran Firman pengganti kebohongan",
      scale: frequencyScale.id,
      revisitMode: "high",
      resultLabelOverrides: {
        strongest: "Risiko identitas palsu tertinggi",
        dimensions: "Ringkasan Risiko",
        whatThisMeans: "Apa yang Terlihat",
        versesToRevisit: "Kebenaran untuk Direnungkan",
        versesToRevisitDesc: "Kebenaran ini terkait pola identitas palsu yang paling sering muncul. Pakai untuk doa dan pembaruan minggu ini.",
      },
      dimensionLabels: identityDimensions(menIdentities.id),
      dimensionDetails: identityDetails(menIdentities.id, "id"),
      reflectionQuestions: [
        "Identitas palsu mana yang mendapat skor tertinggi, dan tekanan apa yang memicunya?",
        "Kebenaran pengganti mana yang perlu Anda praktikkan dalam keputusan minggu ini?",
        "Percakapan jujur apa yang dapat menolong Anda berhenti memikul ini sendirian?",
      ],
      questions: identityAssessmentQuestions(menIdentities.id, "id"),
    },
  },
};
