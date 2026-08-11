export type Difficulty = "easy" | "medium" | "hard";

export type BibleQuestion = {
  difficulty: Difficulty;
  story: string;
  question: string;
  choices: string[];
  answer: string;
};

export const bibleQuestions: BibleQuestion[] = [
  { difficulty: "easy", story: "Creation", question: "What did God create on the first day?", choices: ["Light", "Birds", "People", "The rainbow"], answer: "Light" },
  { difficulty: "easy", story: "Noah", question: "What did Noah build before the big flood?", choices: ["An ark", "A palace", "A tower", "A chariot"], answer: "An ark" },
  { difficulty: "easy", story: "Abraham", question: "What did God promise Abraham would be as many as?", choices: ["Stars in the sky", "Fish in the sea", "Leaves on one tree", "Stones in a basket"], answer: "Stars in the sky" },
  { difficulty: "easy", story: "Moses", question: "What sea did God part so the Israelites could cross?", choices: ["The Red Sea", "The Dead Sea", "The Sea of Galilee", "The Great Sea"], answer: "The Red Sea" },
  { difficulty: "easy", story: "David", question: "What giant did David face?", choices: ["Goliath", "Pharaoh", "Herod", "Caesar"], answer: "Goliath" },
  { difficulty: "easy", story: "Jesus' Birth", question: "Where was Jesus born?", choices: ["Bethlehem", "Jerusalem", "Nazareth", "Egypt"], answer: "Bethlehem" },
  { difficulty: "easy", story: "Jesus", question: "What did Jesus calm when the disciples were afraid?", choices: ["A storm", "A fire", "A crowd", "A camel"], answer: "A storm" },
  { difficulty: "easy", story: "Easter", question: "What happened on the third day after Jesus died?", choices: ["Jesus rose again", "The disciples sailed away", "The temple closed", "A king moved away"], answer: "Jesus rose again" },
  { difficulty: "medium", story: "Creation", question: "On which day did God rest after creation?", choices: ["The seventh day", "The first day", "The third day", "The tenth day"], answer: "The seventh day" },
  { difficulty: "medium", story: "Joseph", question: "What did Joseph do for Pharaoh's dreams?", choices: ["Explained their meaning", "Painted them", "Forgot them", "Hid them"], answer: "Explained their meaning" },
  { difficulty: "medium", story: "Exodus", question: "What did God give Moses on Mount Sinai?", choices: ["The Ten Commandments", "A coat of many colors", "A sling", "A crown"], answer: "The Ten Commandments" },
  { difficulty: "medium", story: "Ruth", question: "In whose field did Ruth gather grain?", choices: ["Boaz's field", "David's field", "Pharaoh's field", "Daniel's field"], answer: "Boaz's field" },
  { difficulty: "medium", story: "Jesus", question: "Which disciple walked on water toward Jesus?", choices: ["Peter", "John", "Thomas", "Matthew"], answer: "Peter" },
  { difficulty: "medium", story: "Jesus", question: "Who climbed a tree so he could see Jesus?", choices: ["Zacchaeus", "Nicodemus", "Jairus", "Bartimaeus"], answer: "Zacchaeus" },
  { difficulty: "medium", story: "Pentecost", question: "What did Jesus' friends begin to do at Pentecost?", choices: ["Speak in other languages", "Build a tower", "Hide in Egypt", "Sell fish at the temple"], answer: "Speak in other languages" },
  { difficulty: "medium", story: "Ten Virgins", question: "What did the wise young women bring with their lamps?", choices: ["Extra oil", "Extra sandals", "Extra bread", "Extra coins"], answer: "Extra oil" },
  { difficulty: "hard", story: "Passover", question: "What meal helped Israel remember God rescuing them from Egypt?", choices: ["Passover", "Pentecost", "Purim", "Sabbath breakfast"], answer: "Passover" },
  { difficulty: "hard", story: "Gideon", question: "How many men were in Gideon's small army?", choices: ["300", "12", "700", "5000"], answer: "300" },
  { difficulty: "hard", story: "Esther", question: "What brave words are connected with Esther's choice to go to the king?", choices: ["If I perish, I perish", "Here I am, send me", "Let my people go", "Your God will be my God"], answer: "If I perish, I perish" },
  { difficulty: "hard", story: "Jesus", question: "At what event did Jesus turn water into wine?", choices: ["A wedding in Cana", "A feast in Jericho", "A picnic by Galilee", "A meal in Emmaus"], answer: "A wedding in Cana" },
  { difficulty: "hard", story: "Jesus", question: "Who did Jesus raise from the tomb after four days?", choices: ["Lazarus", "Stephen", "John", "Timothy"], answer: "Lazarus" },
  { difficulty: "hard", story: "Easter", question: "Where did two followers recognize Jesus when He broke bread?", choices: ["Emmaus", "Nineveh", "Cana", "Joppa"], answer: "Emmaus" },
  { difficulty: "hard", story: "Acts", question: "Who was helped by Philip to understand Isaiah's scroll?", choices: ["An Ethiopian official", "A Roman jailer", "A shepherd from Bethlehem", "A king from Egypt"], answer: "An Ethiopian official" },
  { difficulty: "hard", story: "Ten Virgins", question: "What lesson did Jesus teach with the story of the ten virgins?", choices: ["Be ready", "Build bigger barns", "Hide your lamp", "Run away from storms"], answer: "Be ready" },
];