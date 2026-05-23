const QUESTION_BANK = [
  {
    difficulty: "easy",
    story: "Creation",
    question: "What did God create on the first day?",
    choices: ["Light", "Birds", "People", "The rainbow"],
    answer: "Light"
  },
  {
    difficulty: "easy",
    story: "Creation",
    question: "Who were the first man and woman in the garden?",
    choices: ["Adam and Eve", "Moses and Miriam", "Boaz and Ruth", "Joseph and Mary"],
    answer: "Adam and Eve"
  },
  {
    difficulty: "easy",
    story: "Noah",
    question: "What did Noah build before the big flood?",
    choices: ["An ark", "A palace", "A tower", "A chariot"],
    answer: "An ark"
  },
  {
    difficulty: "easy",
    story: "Noah",
    question: "What sign did God put in the sky after the flood?",
    choices: ["A rainbow", "A ladder", "A trumpet", "A crown"],
    answer: "A rainbow"
  },
  {
    difficulty: "easy",
    story: "Abraham",
    question: "What did God promise Abraham would be as many as?",
    choices: ["Stars in the sky", "Fish in the sea", "Leaves on one tree", "Stones in a basket"],
    answer: "Stars in the sky"
  },
  {
    difficulty: "easy",
    story: "Isaac",
    question: "What was the name of Abraham and Sarah's son?",
    choices: ["Isaac", "Jonah", "Daniel", "Peter"],
    answer: "Isaac"
  },
  {
    difficulty: "easy",
    story: "Jacob",
    question: "What did Jacob see in his dream reaching up to heaven?",
    choices: ["A ladder", "A ship", "A basket", "A lion"],
    answer: "A ladder"
  },
  {
    difficulty: "easy",
    story: "Joseph",
    question: "What special clothing did Joseph's father give him?",
    choices: ["A colorful coat", "Golden sandals", "A silver belt", "A purple hat"],
    answer: "A colorful coat"
  },
  {
    difficulty: "easy",
    story: "Moses",
    question: "Where was baby Moses hidden?",
    choices: ["In a basket", "In a cave", "In a tent", "In a tower"],
    answer: "In a basket"
  },
  {
    difficulty: "easy",
    story: "Moses",
    question: "What sea did God part so the Israelites could cross?",
    choices: ["The Red Sea", "The Dead Sea", "The Sea of Galilee", "The Great Sea"],
    answer: "The Red Sea"
  },
  {
    difficulty: "easy",
    story: "Wilderness",
    question: "What food did God send from heaven in the wilderness?",
    choices: ["Manna", "Grapes", "Fish", "Honey cakes"],
    answer: "Manna"
  },
  {
    difficulty: "easy",
    story: "Joshua",
    question: "What city wall fell after Israel marched and shouted?",
    choices: ["Jericho", "Bethlehem", "Nineveh", "Nazareth"],
    answer: "Jericho"
  },
  {
    difficulty: "easy",
    story: "Ruth",
    question: "Who stayed with Naomi and said Naomi's God would be her God?",
    choices: ["Ruth", "Esther", "Miriam", "Hannah"],
    answer: "Ruth"
  },
  {
    difficulty: "easy",
    story: "Samuel",
    question: "Who heard God calling his name in the night?",
    choices: ["Samuel", "Samson", "Solomon", "Saul"],
    answer: "Samuel"
  },
  {
    difficulty: "easy",
    story: "David",
    question: "What giant did David face?",
    choices: ["Goliath", "Pharaoh", "Herod", "Caesar"],
    answer: "Goliath"
  },
  {
    difficulty: "easy",
    story: "David",
    question: "What did David use when he fought Goliath?",
    choices: ["A sling and stones", "A golden sword", "A trumpet", "A fishing net"],
    answer: "A sling and stones"
  },
  {
    difficulty: "easy",
    story: "Solomon",
    question: "What did Solomon ask God to give him?",
    choices: ["Wisdom", "Many horses", "A bigger crown", "A new boat"],
    answer: "Wisdom"
  },
  {
    difficulty: "easy",
    story: "Elijah",
    question: "Who sent fire from heaven on Mount Carmel?",
    choices: ["God", "Baal", "A king", "A soldier"],
    answer: "God"
  },
  {
    difficulty: "easy",
    story: "Jonah",
    question: "What swallowed Jonah after he ran away?",
    choices: ["A great fish", "A lion", "A camel", "An eagle"],
    answer: "A great fish"
  },
  {
    difficulty: "easy",
    story: "Daniel",
    question: "Where was Daniel thrown for praying to God?",
    choices: ["A lions' den", "A fiery furnace", "A well", "A boat"],
    answer: "A lions' den"
  },
  {
    difficulty: "easy",
    story: "Fiery Furnace",
    question: "How many friends were thrown into the fiery furnace?",
    choices: ["Three", "Two", "Five", "Twelve"],
    answer: "Three"
  },
  {
    difficulty: "easy",
    story: "Esther",
    question: "Who became queen and helped save her people?",
    choices: ["Esther", "Leah", "Martha", "Deborah"],
    answer: "Esther"
  },
  {
    difficulty: "easy",
    story: "Jesus' Birth",
    question: "Where was Jesus born?",
    choices: ["Bethlehem", "Jerusalem", "Nazareth", "Egypt"],
    answer: "Bethlehem"
  },
  {
    difficulty: "easy",
    story: "Jesus' Birth",
    question: "What did the wise men follow to find Jesus?",
    choices: ["A star", "A river", "A dove", "A cloud"],
    answer: "A star"
  },
  {
    difficulty: "easy",
    story: "Jesus",
    question: "Who baptized Jesus in the Jordan River?",
    choices: ["John the Baptist", "Peter", "Moses", "Noah"],
    answer: "John the Baptist"
  },
  {
    difficulty: "easy",
    story: "Jesus",
    question: "What did Jesus feed to a huge crowd with five loaves?",
    choices: ["Two fish", "Seven apples", "Ten figs", "One lamb"],
    answer: "Two fish"
  },
  {
    difficulty: "easy",
    story: "Jesus",
    question: "What did Jesus calm when the disciples were afraid?",
    choices: ["A storm", "A fire", "A crowd", "A camel"],
    answer: "A storm"
  },
  {
    difficulty: "easy",
    story: "Jesus",
    question: "What did Jesus ride into Jerusalem?",
    choices: ["A donkey", "A horse", "A camel", "A chariot"],
    answer: "A donkey"
  },
  {
    difficulty: "easy",
    story: "Easter",
    question: "What happened on the third day after Jesus died?",
    choices: ["Jesus rose again", "The disciples sailed away", "The temple closed", "A king moved away"],
    answer: "Jesus rose again"
  },
  {
    difficulty: "easy",
    story: "Pentecost",
    question: "Who came to help Jesus' friends at Pentecost?",
    choices: ["The Holy Spirit", "Pharaoh", "Goliath", "A Roman guard"],
    answer: "The Holy Spirit"
  },
  {
    difficulty: "easy",
    story: "Paul",
    question: "What bright thing did Paul see on the road to Damascus?",
    choices: ["A light from heaven", "A rainbow", "A burning bush", "A golden lamp"],
    answer: "A light from heaven"
  },
  {
    difficulty: "easy",
    story: "Ten Virgins",
    question: "In Jesus' story, what did the ten young women carry?",
    choices: ["Lamps", "Fishing nets", "Scrolls", "Crowns"],
    answer: "Lamps"
  },
  {
    difficulty: "easy",
    story: "Ten Virgins",
    question: "How many young women were wise in the story of the ten virgins?",
    choices: ["Five", "Two", "Seven", "Ten"],
    answer: "Five"
  },
  {
    difficulty: "medium",
    story: "Creation",
    question: "On which day did God rest after creation?",
    choices: ["The seventh day", "The first day", "The third day", "The tenth day"],
    answer: "The seventh day"
  },
  {
    difficulty: "medium",
    story: "Noah",
    question: "What bird brought Noah an olive leaf?",
    choices: ["A dove", "A raven", "A sparrow", "An eagle"],
    answer: "A dove"
  },
  {
    difficulty: "medium",
    story: "Abraham",
    question: "Who visited Abraham and Sarah before Isaac was born?",
    choices: ["Three visitors", "Ten kings", "A shepherd boy", "A fisherman"],
    answer: "Three visitors"
  },
  {
    difficulty: "medium",
    story: "Joseph",
    question: "What did Joseph do for Pharaoh's dreams?",
    choices: ["Explained their meaning", "Painted them", "Forgot them", "Hid them"],
    answer: "Explained their meaning"
  },
  {
    difficulty: "medium",
    story: "Moses",
    question: "How did God speak to Moses in the desert?",
    choices: ["Through a burning bush", "Through a sleeping king", "Through a gold statue", "Through a whale"],
    answer: "Through a burning bush"
  },
  {
    difficulty: "medium",
    story: "Exodus",
    question: "What did God give Moses on Mount Sinai?",
    choices: ["The Ten Commandments", "A coat of many colors", "A sling", "A crown"],
    answer: "The Ten Commandments"
  },
  {
    difficulty: "medium",
    story: "Wilderness",
    question: "What guided Israel by day in the wilderness?",
    choices: ["A pillar of cloud", "A golden calf", "A rainbow", "A ladder"],
    answer: "A pillar of cloud"
  },
  {
    difficulty: "medium",
    story: "Joshua",
    question: "Who helped the spies in Jericho?",
    choices: ["Rahab", "Ruth", "Esther", "Martha"],
    answer: "Rahab"
  },
  {
    difficulty: "medium",
    story: "Gideon",
    question: "What did Gideon's army carry besides trumpets?",
    choices: ["Jars and torches", "Fishing nets", "Gold cups", "Bread baskets"],
    answer: "Jars and torches"
  },
  {
    difficulty: "medium",
    story: "Samson",
    question: "What was Samson known for?",
    choices: ["Great strength", "Building the ark", "Writing psalms", "Catching fish"],
    answer: "Great strength"
  },
  {
    difficulty: "medium",
    story: "Ruth",
    question: "In whose field did Ruth gather grain?",
    choices: ["Boaz's field", "David's field", "Pharaoh's field", "Daniel's field"],
    answer: "Boaz's field"
  },
  {
    difficulty: "medium",
    story: "Samuel",
    question: "What did Samuel say when he learned God was calling him?",
    choices: ["Speak, for your servant is listening", "Let my people go", "I am too young to fight", "Where is the lamb?"],
    answer: "Speak, for your servant is listening"
  },
  {
    difficulty: "medium",
    story: "David",
    question: "What job did David have before he became king?",
    choices: ["Shepherd", "Tax collector", "Tentmaker", "Cupbearer"],
    answer: "Shepherd"
  },
  {
    difficulty: "medium",
    story: "Solomon",
    question: "What special building did Solomon build in Jerusalem?",
    choices: ["The temple", "The ark", "A tower to heaven", "A prison"],
    answer: "The temple"
  },
  {
    difficulty: "medium",
    story: "Elijah",
    question: "How did God feed Elijah by the brook?",
    choices: ["Ravens brought bread and meat", "A fish carried bread", "Clouds dropped cakes", "A lion guarded grapes"],
    answer: "Ravens brought bread and meat"
  },
  {
    difficulty: "medium",
    story: "Elisha",
    question: "What did God make keep flowing for the widow in Elisha's story?",
    choices: ["Oil", "Milk", "Honey", "Water from a jar"],
    answer: "Oil"
  },
  {
    difficulty: "medium",
    story: "Naaman",
    question: "Where did Naaman wash seven times?",
    choices: ["The Jordan River", "The Red Sea", "The Nile River", "The Sea of Galilee"],
    answer: "The Jordan River"
  },
  {
    difficulty: "medium",
    story: "Jonah",
    question: "What city did God tell Jonah to visit?",
    choices: ["Nineveh", "Jericho", "Bethlehem", "Rome"],
    answer: "Nineveh"
  },
  {
    difficulty: "medium",
    story: "Daniel",
    question: "Why was Daniel put into the lions' den?",
    choices: ["He prayed to God", "He stole a crown", "He built an idol", "He broke a wall"],
    answer: "He prayed to God"
  },
  {
    difficulty: "medium",
    story: "Fiery Furnace",
    question: "Who refused to bow to the golden statue?",
    choices: ["Shadrach, Meshach, and Abednego", "Peter, James, and John", "Cain, Abel, and Seth", "Moses, Aaron, and Miriam"],
    answer: "Shadrach, Meshach, and Abednego"
  },
  {
    difficulty: "medium",
    story: "Esther",
    question: "Who encouraged Esther to speak up for her people?",
    choices: ["Mordecai", "Haman", "Nebuchadnezzar", "Gideon"],
    answer: "Mordecai"
  },
  {
    difficulty: "medium",
    story: "Jesus' Birth",
    question: "Who announced Jesus' birth to the shepherds?",
    choices: ["Angels", "Wise men", "Roman soldiers", "Fishermen"],
    answer: "Angels"
  },
  {
    difficulty: "medium",
    story: "Jesus",
    question: "What was Jesus doing when the storm scared the disciples?",
    choices: ["Sleeping", "Fishing", "Cooking", "Writing"],
    answer: "Sleeping"
  },
  {
    difficulty: "medium",
    story: "Jesus",
    question: "Which disciple walked on water toward Jesus?",
    choices: ["Peter", "John", "Thomas", "Matthew"],
    answer: "Peter"
  },
  {
    difficulty: "medium",
    story: "Jesus",
    question: "Who climbed a tree so he could see Jesus?",
    choices: ["Zacchaeus", "Nicodemus", "Jairus", "Bartimaeus"],
    answer: "Zacchaeus"
  },
  {
    difficulty: "medium",
    story: "Jesus",
    question: "In the Good Samaritan story, who helped the hurt man?",
    choices: ["A Samaritan", "A priest", "A Levite", "A soldier"],
    answer: "A Samaritan"
  },
  {
    difficulty: "medium",
    story: "Jesus",
    question: "What did the father do when the lost son came home?",
    choices: ["Welcomed him with joy", "Locked the door", "Sent him away", "Made him pay first"],
    answer: "Welcomed him with joy"
  },
  {
    difficulty: "medium",
    story: "Easter",
    question: "Who first found the stone rolled away from Jesus' tomb?",
    choices: ["Women who followed Jesus", "Roman kings", "The Pharisees", "The shepherds"],
    answer: "Women who followed Jesus"
  },
  {
    difficulty: "medium",
    story: "Pentecost",
    question: "What did Jesus' friends begin to do at Pentecost?",
    choices: ["Speak in other languages", "Build a tower", "Hide in Egypt", "Sell fish at the temple"],
    answer: "Speak in other languages"
  },
  {
    difficulty: "medium",
    story: "Paul",
    question: "What was Paul's name before he followed Jesus?",
    choices: ["Saul", "Silas", "Stephen", "Simeon"],
    answer: "Saul"
  },
  {
    difficulty: "medium",
    story: "Ten Virgins",
    question: "What did the wise young women bring with their lamps?",
    choices: ["Extra oil", "Extra sandals", "Extra bread", "Extra coins"],
    answer: "Extra oil"
  },
  {
    difficulty: "medium",
    story: "Ten Virgins",
    question: "Why did the five foolish young women leave?",
    choices: ["They needed to buy oil", "They went fishing", "They lost their lamps", "They went to see a king"],
    answer: "They needed to buy oil"
  },
  {
    difficulty: "hard",
    story: "Creation",
    question: "What did God say about creation when He saw all He had made?",
    choices: ["It was very good", "It was too small", "It needed a tower", "It was hidden"],
    answer: "It was very good"
  },
  {
    difficulty: "hard",
    story: "Noah",
    question: "How many of each clean animal did Noah take into the ark?",
    choices: ["Seven pairs", "One pair", "Three pairs", "Twelve pairs"],
    answer: "Seven pairs"
  },
  {
    difficulty: "hard",
    story: "Abraham",
    question: "What new name did God give Abram?",
    choices: ["Abraham", "Israel", "Isaac", "Boaz"],
    answer: "Abraham"
  },
  {
    difficulty: "hard",
    story: "Jacob",
    question: "What new name did God give Jacob?",
    choices: ["Israel", "Isaiah", "Samuel", "Solomon"],
    answer: "Israel"
  },
  {
    difficulty: "hard",
    story: "Joseph",
    question: "What did Pharaoh put Joseph in charge of during the famine?",
    choices: ["The land of Egypt's food", "The temple music", "The king's horses", "The river boats"],
    answer: "The land of Egypt's food"
  },
  {
    difficulty: "hard",
    story: "Moses",
    question: "What was Moses' brother's name?",
    choices: ["Aaron", "Abel", "Andrew", "Amos"],
    answer: "Aaron"
  },
  {
    difficulty: "hard",
    story: "Passover",
    question: "What meal helped Israel remember God rescuing them from Egypt?",
    choices: ["Passover", "Pentecost", "Purim", "Sabbath breakfast"],
    answer: "Passover"
  },
  {
    difficulty: "hard",
    story: "Wilderness",
    question: "What did Moses strike when God brought water for the people?",
    choices: ["A rock", "A tree", "A door", "A shield"],
    answer: "A rock"
  },
  {
    difficulty: "hard",
    story: "Joshua",
    question: "What river did Israel cross before entering the promised land?",
    choices: ["The Jordan River", "The Nile River", "The Euphrates River", "The Kishon River"],
    answer: "The Jordan River"
  },
  {
    difficulty: "hard",
    story: "Gideon",
    question: "How many men were in Gideon's small army?",
    choices: ["300", "12", "700", "5000"],
    answer: "300"
  },
  {
    difficulty: "hard",
    story: "Ruth",
    question: "What family line did Ruth become part of?",
    choices: ["King David's family", "Pharaoh's family", "Goliath's family", "Caesar's family"],
    answer: "King David's family"
  },
  {
    difficulty: "hard",
    story: "Samuel",
    question: "Who was the first king Samuel anointed over Israel?",
    choices: ["Saul", "David", "Solomon", "Ahab"],
    answer: "Saul"
  },
  {
    difficulty: "hard",
    story: "David",
    question: "Who was David's close friend, the son of King Saul?",
    choices: ["Jonathan", "Joab", "Nathan", "Jesse"],
    answer: "Jonathan"
  },
  {
    difficulty: "hard",
    story: "Solomon",
    question: "Which book begins, 'The Lord is my shepherd'?",
    choices: ["Psalm 23", "Genesis 1", "Jonah 2", "Matthew 5"],
    answer: "Psalm 23"
  },
  {
    difficulty: "hard",
    story: "Elijah",
    question: "What quiet sound did Elijah hear after wind, earthquake, and fire?",
    choices: ["A gentle whisper", "A trumpet blast", "A roaring river", "A loud drum"],
    answer: "A gentle whisper"
  },
  {
    difficulty: "hard",
    story: "Elisha",
    question: "Who was raised back to life after Elisha prayed?",
    choices: ["The Shunammite woman's son", "Jairus's daughter", "Lazarus", "Tabitha"],
    answer: "The Shunammite woman's son"
  },
  {
    difficulty: "hard",
    story: "Jonah",
    question: "What plant grew to shade Jonah and then withered?",
    choices: ["A leafy plant", "An olive tree", "A grape vine", "A cedar tree"],
    answer: "A leafy plant"
  },
  {
    difficulty: "hard",
    story: "Daniel",
    question: "What did Daniel do three times a day even when it was forbidden?",
    choices: ["Prayed", "Sang at the palace", "Played a harp", "Washed in the river"],
    answer: "Prayed"
  },
  {
    difficulty: "hard",
    story: "Fiery Furnace",
    question: "Who did the king see with the three friends in the furnace?",
    choices: ["A fourth person", "A lion", "A shepherd", "A soldier"],
    answer: "A fourth person"
  },
  {
    difficulty: "hard",
    story: "Esther",
    question: "What brave words are connected with Esther's choice to go to the king?",
    choices: ["If I perish, I perish", "Here I am, send me", "Let my people go", "Your God will be my God"],
    answer: "If I perish, I perish"
  },
  {
    difficulty: "hard",
    story: "Jesus' Birth",
    question: "What gifts did the wise men bring to Jesus?",
    choices: ["Gold, frankincense, and myrrh", "Bread, fish, and oil", "Silver, wool, and grapes", "A harp, crown, and lamp"],
    answer: "Gold, frankincense, and myrrh"
  },
  {
    difficulty: "hard",
    story: "Jesus",
    question: "At what event did Jesus turn water into wine?",
    choices: ["A wedding in Cana", "A feast in Jericho", "A picnic by Galilee", "A meal in Emmaus"],
    answer: "A wedding in Cana"
  },
  {
    difficulty: "hard",
    story: "Jesus",
    question: "Who did Jesus raise from the tomb after four days?",
    choices: ["Lazarus", "Stephen", "John", "Timothy"],
    answer: "Lazarus"
  },
  {
    difficulty: "hard",
    story: "Jesus",
    question: "What did Jesus wash at the Last Supper?",
    choices: ["His disciples' feet", "Fishing nets", "The temple steps", "A donkey's back"],
    answer: "His disciples' feet"
  },
  {
    difficulty: "hard",
    story: "Jesus",
    question: "Which disciple said he would not believe until he saw Jesus' wounds?",
    choices: ["Thomas", "Philip", "Andrew", "James"],
    answer: "Thomas"
  },
  {
    difficulty: "hard",
    story: "Easter",
    question: "Where did two followers recognize Jesus when He broke bread?",
    choices: ["Emmaus", "Nineveh", "Cana", "Joppa"],
    answer: "Emmaus"
  },
  {
    difficulty: "hard",
    story: "Pentecost",
    question: "Who preached to the crowd on the day of Pentecost?",
    choices: ["Peter", "Pilate", "Noah", "Joseph"],
    answer: "Peter"
  },
  {
    difficulty: "hard",
    story: "Acts",
    question: "Who was helped by Philip to understand Isaiah's scroll?",
    choices: ["An Ethiopian official", "A Roman jailer", "A shepherd from Bethlehem", "A king from Egypt"],
    answer: "An Ethiopian official"
  },
  {
    difficulty: "hard",
    story: "Paul",
    question: "What happened while Paul and Silas sang in prison?",
    choices: ["An earthquake opened the doors", "A whale arrived", "The king brought a crown", "The sea became dry"],
    answer: "An earthquake opened the doors"
  },
  {
    difficulty: "hard",
    story: "Ten Virgins",
    question: "In the parable of the ten virgins, who arrived at midnight?",
    choices: ["The bridegroom", "The shepherd", "The tax collector", "The king's guard"],
    answer: "The bridegroom"
  },
  {
    difficulty: "hard",
    story: "Ten Virgins",
    question: "What lesson did Jesus teach with the story of the ten virgins?",
    choices: ["Be ready", "Build bigger barns", "Hide your lamp", "Run away from storms"],
    answer: "Be ready"
  }
];

const DIFFICULTY_SEQUENCE = ["easy", "easy", "medium", "easy", "medium", "hard"];
const WELL_CELLS = 48;
const TEAM_SHORTCUTS = {
  left: ["A", "B", "C", "D"],
  right: ["1", "2", "3", "4"]
};

const state = {
  running: false,
  finished: false,
  timeLeft: 300,
  timerId: null,
  usedQuestionIds: {
    left: new Set(),
    right: new Set()
  },
  teams: {
    left: { score: 0, answered: 0, currentQuestion: null },
    right: { score: 0, answered: 0, currentQuestion: null }
  }
};

const els = {
  minutesInput: document.querySelector("#minutesInput"),
  startButton: document.querySelector("#startButton"),
  resetButton: document.querySelector("#resetButton"),
  timerDisplay: document.querySelector("#timerDisplay"),
  gameMessage: document.querySelector("#gameMessage"),
  resultDialog: document.querySelector("#resultDialog"),
  resultTitle: document.querySelector("#resultTitle"),
  resultSummary: document.querySelector("#resultSummary"),
  playAgainButton: document.querySelector("#playAgainButton"),
  closeResultButton: document.querySelector("#closeResultButton"),
  left: {
    name: document.querySelector("#leftName"),
    score: document.querySelector("#leftScore"),
    well: document.querySelector("#leftWell"),
    fallingBlock: document.querySelector("#leftFallingBlock"),
    difficulty: document.querySelector("#leftDifficulty"),
    progress: document.querySelector("#leftProgress"),
    question: document.querySelector("#leftQuestion"),
    choices: document.querySelector("#leftChoices"),
    feedback: document.querySelector("#leftFeedback")
  },
  right: {
    name: document.querySelector("#rightName"),
    score: document.querySelector("#rightScore"),
    well: document.querySelector("#rightWell"),
    fallingBlock: document.querySelector("#rightFallingBlock"),
    difficulty: document.querySelector("#rightDifficulty"),
    progress: document.querySelector("#rightProgress"),
    question: document.querySelector("#rightQuestion"),
    choices: document.querySelector("#rightChoices"),
    feedback: document.querySelector("#rightFeedback")
  }
};

function initializeWells() {
  ["left", "right"].forEach((team) => {
    els[team].well.innerHTML = "";
    for (let index = 0; index < WELL_CELLS; index += 1) {
      const cell = document.createElement("span");
      cell.className = "cell";
      els[team].well.append(cell);
    }
  });
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function getDurationSeconds() {
  const minutes = Number.parseInt(els.minutesInput.value, 10);
  return Math.max(1, Math.min(30, Number.isNaN(minutes) ? 5 : minutes)) * 60;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  els.timerDisplay.textContent = formatTime(state.timeLeft);
}

function nextDifficulty(team) {
  const answeredCount = state.teams[team].answered;
  const difficulty = DIFFICULTY_SEQUENCE[answeredCount % DIFFICULTY_SEQUENCE.length];
  return difficulty;
}

function getQuestion(team, difficulty, blockedQuestionId) {
  const used = state.usedQuestionIds[team];
  let pool = QUESTION_BANK
    .map((question, index) => ({ ...question, id: index }))
    .filter((question) => question.difficulty === difficulty && !used.has(question.id) && question.id !== blockedQuestionId);

  if (pool.length === 0) {
    used.clear();
    pool = QUESTION_BANK
      .map((question, index) => ({ ...question, id: index }))
      .filter((question) => question.difficulty === difficulty && question.id !== blockedQuestionId);
  }

  const question = pool[Math.floor(Math.random() * pool.length)];
  used.add(question.id);
  return question;
}

function drawQuestion(team) {
  const otherTeam = team === "left" ? "right" : "left";
  const difficulty = nextDifficulty(team);
  const otherQuestion = state.teams[otherTeam].currentQuestion;
  const blockedQuestionId = otherQuestion?.difficulty === difficulty ? otherQuestion.id : undefined;
  const question = getQuestion(team, difficulty, blockedQuestionId);
  setQuestion(team, question);
}

function setQuestion(team, question) {
  const teamState = state.teams[team];
  teamState.currentQuestion = question;
  teamState.answered += 1;

  els[team].difficulty.textContent = `${question.story} - ${question.difficulty}`;
  els[team].progress.textContent = `Question ${teamState.answered}`;
  els[team].question.textContent = question.question;
  els[team].feedback.textContent = "";
  els[team].choices.innerHTML = "";

  shuffle(question.choices).forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.dataset.choice = choice;
    button.innerHTML = `<span class="choice-key">${TEAM_SHORTCUTS[team][index]}</span><span>${choice}</span>`;
    button.addEventListener("click", () => answerQuestion(team, choice, button));
    els[team].choices.append(button);
  });
}

function answerByShortcut(team, index) {
  if (!state.running || state.finished) return;

  const buttons = [...els[team].choices.querySelectorAll("button")];
  const button = buttons[index];
  if (!button || button.disabled) return;

  answerQuestion(team, button.dataset.choice, button);
}

function answerQuestion(team, choice, selectedButton) {
  if (!state.running || state.finished) return;

  const question = state.teams[team].currentQuestion;
  const isCorrect = choice === question.answer;
  const buttons = [...els[team].choices.querySelectorAll("button")];

  buttons.forEach((button) => {
    button.disabled = true;
    if (button.dataset.choice === question.answer) button.classList.add("correct");
  });

  if (isCorrect) {
    state.teams[team].score += 1;
    els[team].score.textContent = state.teams[team].score;
    selectedButton.classList.add("correct");
    els[team].feedback.textContent = "Correct! Your lamp shines brighter.";
    animateBlock(team);
    renderWell(team);
  } else {
    selectedButton.classList.add("wrong");
    els[team].feedback.textContent = `Good try. The answer was ${question.answer}.`;
  }

  const waitTime = isCorrect ? 850 : 1250;
  window.setTimeout(() => {
    if (state.running && !state.finished) {
      drawQuestion(team);
    }
  }, waitTime);
}

function renderWell(team) {
  const score = state.teams[team].score;
  const cells = [...els[team].well.children];
  cells.forEach((cell, index) => {
    const fromBottom = WELL_CELLS - index;
    cell.className = "cell";
    if (fromBottom <= score) {
      cell.classList.add("filled");
    }
    if (fromBottom <= score && fromBottom % 5 === 0) {
      cell.classList.add("bonus");
    }
  });
}

function animateBlock(team) {
  const block = els[team].fallingBlock;
  block.classList.remove("drop");
  window.requestAnimationFrame(() => {
    block.classList.add("drop");
  });
}

function resetState() {
  window.clearInterval(state.timerId);
  state.running = false;
  state.finished = false;
  state.timerId = null;
  state.timeLeft = getDurationSeconds();
  state.usedQuestionIds.left.clear();
  state.usedQuestionIds.right.clear();

  ["left", "right"].forEach((team) => {
    state.teams[team].score = 0;
    state.teams[team].answered = 0;
    state.teams[team].currentQuestion = null;
    els[team].score.textContent = "0";
    els[team].difficulty.textContent = "Ready";
    els[team].progress.textContent = "Question 0";
    els[team].question.textContent = "Press Start to begin.";
    els[team].choices.innerHTML = "";
    els[team].feedback.textContent = "";
    renderWell(team);
  });

  els.startButton.textContent = "Start";
  els.gameMessage.textContent = "Set the time, press Start, and help your team keep their lamp bright.";
  updateTimerDisplay();
}

function startGame() {
  if (state.running) {
    pauseGame();
    return;
  }

  if (state.finished || state.timeLeft <= 0) {
    resetState();
  }

  state.running = true;
  state.finished = false;
  els.startButton.textContent = "Pause";
  els.gameMessage.textContent = "Answer quickly and carefully. Both teams receive the same difficulty each round.";

  if (!state.teams.left.currentQuestion) {
    drawQuestion("left");
  }

  if (!state.teams.right.currentQuestion) {
    drawQuestion("right");
  }

  state.timerId = window.setInterval(() => {
    state.timeLeft -= 1;
    updateTimerDisplay();
    if (state.timeLeft <= 0) {
      finishGame();
    }
  }, 1000);
}

function pauseGame() {
  window.clearInterval(state.timerId);
  state.running = false;
  state.timerId = null;
  els.startButton.textContent = "Resume";
  els.gameMessage.textContent = "Paused. Resume when both teams are ready.";
}

function finishGame() {
  window.clearInterval(state.timerId);
  state.running = false;
  state.finished = true;
  state.timeLeft = 0;
  updateTimerDisplay();
  els.startButton.textContent = "Start";

  ["left", "right"].forEach((team) => {
    [...els[team].choices.querySelectorAll("button")].forEach((button) => {
      button.disabled = true;
    });
  });

  const leftName = els.left.name.value.trim() || "Team Light";
  const rightName = els.right.name.value.trim() || "Team Wisdom";
  const leftScore = state.teams.left.score;
  const rightScore = state.teams.right.score;

  let title = "Time is up!";
  let summary = `${leftName}: ${leftScore} correct. ${rightName}: ${rightScore} correct. `;

  if (leftScore > rightScore) {
    title = `${leftName} wins!`;
    summary += "Their lamp tower is shining the brightest.";
  } else if (rightScore > leftScore) {
    title = `${rightName} wins!`;
    summary += "Their lamp tower is shining the brightest.";
  } else {
    title = "It is a tie!";
    summary += "Both teams kept their lamps bright.";
  }

  els.gameMessage.textContent = summary;
  els.resultTitle.textContent = title;
  els.resultSummary.textContent = summary;
  if (typeof els.resultDialog.showModal === "function") {
    els.resultDialog.showModal();
  }
}

els.startButton.addEventListener("click", startGame);
els.resetButton.addEventListener("click", resetState);
els.minutesInput.addEventListener("change", () => {
  if (!state.running) {
    resetState();
  }
});
els.playAgainButton.addEventListener("click", () => {
  els.resultDialog.close();
  resetState();
  startGame();
});
els.closeResultButton.addEventListener("click", () => els.resultDialog.close());
window.addEventListener("keydown", (event) => {
  const activeTag = document.activeElement?.tagName;
  if (activeTag === "INPUT" || activeTag === "TEXTAREA" || event.repeat) return;

  const key = event.key.toUpperCase();
  const leftIndex = TEAM_SHORTCUTS.left.indexOf(key);
  if (leftIndex >= 0) {
    event.preventDefault();
    answerByShortcut("left", leftIndex);
    return;
  }

  const rightIndex = TEAM_SHORTCUTS.right.indexOf(event.key);
  if (rightIndex >= 0) {
    event.preventDefault();
    answerByShortcut("right", rightIndex);
  }
});

initializeWells();
resetState();
