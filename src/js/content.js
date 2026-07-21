/* ---------------- drill content ---------------- */

const AAO_WORDS = [
  "på","så","går","år","från","då","håll","språk","måste","början",
  "här","där","när","väl","själv","kärlek","vänner","längre","ändå","hälsa",
  "över","höst","möte","större","fönster","grönsaker","kök","sjö","björk","mörk",
  "förstå","berätta","människa","kanske","väldigt","område","förändring","trädgård",
  "månad","fråga","svår","sång","kläder","fika","lagom","midsommar","jordgubbar",
  "smörgås","räksmörgås","köpa","söka","höra","låta","stänga","öppna","tänka","må"
];

const COMMON_WORDS = [
  "och","att","det","som","en","jag","har","vi","med","för","inte","den",
  "till","av","om","ett","men","de","var","sig","kan","man","hade","skulle",
  "kommer","mycket","också","bara","eller","vad","alla","sedan","kunde","något",
  "mellan","utan","genom","arbete","tiden","dag","nu","ska","hur","vill","bra",
  "hem","se","gör","får","vet","nya","stora","under","efter","andra","första"
];

const SYMBOL_LINES = [
  "const arr = [1, 2, 3];",
  "if (a !== b) { return null; }",
  "markus@molnify.com",
  "echo $PATH | grep \"bin\"",
  "npm install --save-dev @types/node",
  "cd ~/dotfiles && git push",
  "SELECT * FROM users WHERE id = 42;",
  "price: 40 € ($45) + 25% moms",
  "map[key] = { value: 100 };",
  "a < b && b > c || !d",
  "path\\to\\file # windows :(",
  "curl -s https://api.se/v1?q=hej",
  "let x = `sum: ${a + b}`;",
  "grep -rn \"TODO\" src/ | wc -l",
  "chmod 755 ./deploy.sh && ./run",
  "{ \"name\": \"glove80\", \"keys\": 80 }"
];

const STOIC_QUOTES = [
  "Du har makt över ditt sinne, inte över yttre händelser.",
  "Vi lider oftare i fantasin än i verkligheten.",
  "Ingen människa är fri som inte är herre över sig själv.",
  "Livet är långt, om du vet hur du ska använda det.",
  "Den bästa hämnden är att inte likna den som gjorde dig illa.",
  "Börja genast leva, och räkna varje dag som ett liv i sig.",
  "Svårigheter visar vad människor går för.",
  "Allt vi hör är en åsikt, inte ett faktum.",
  "Rikedom består inte i att äga mycket, utan i att behöva lite.",
  "Tänk inte på vad du saknar, utan på vad du har.",
  "Ödet leder den villige, men släpar den ovillige.",
  "Var och en förlorar bara det liv han lever nu.",
  "Om det inte är rätt, gör det inte; är det inte sant, säg det inte.",
  "Det är inte det som händer dig som avgör, utan hur du svarar.",
  "Hur länge tänker du vänta innan du kräver det bästa av dig själv?",
  "En ädelsten poleras inte utan friktion, en människa inte utan prövningar.",
  "Det som står i vägen blir vägen.",
  "Ingen vind är gynnsam för den som inte vet vilken hamn han söker.",
  "Säg först till dig själv vad du vill vara; gör sedan vad du måste.",
  "Lycka och frihet börjar med att förstå vad som ligger i din makt.",
  "Själen färgas av tankarnas färg.",
  "Det mesta av det vi säger och gör är inte nödvändigt.",
  "Gräv inom dig; där finns källan till allt gott.",
  "Vill du bli rik, minska dina begär.",
  "Det är inte tingen som plågar oss, utan våra åsikter om dem.",
  "Gör varje handling som om den vore din sista.",
  "Tiden är en flod av händelser, och strömmen är strid.",
  "Uthärda och försaka.",
  "Ingen blir vis av en slump.",
  "Den som fruktar döden gör inget som är värdigt en levande människa."
];

const SENTENCES = [
  "Flygande bäckasiner söka hwila på mjuka tuvor.",
  "Yxskaftbud, ge vår WC-zonmö IQ-hjälp.",
  "Öva långsamt och noggrant, så kommer farten av sig själv.",
  "Fikat står på bordet: kaffe, bullar och en räksmörgås."
];

const EN_COMMON = [
  "the","and","that","have","for","not","with","you","this","but","his","from",
  "they","say","her","she","will","one","all","would","there","their","what",
  "out","about","who","get","which","when","make","can","like","time","just",
  "him","know","take","people","into","year","your","good","some","could",
  "them","see","other","than","then","now","look","only","come","its","over",
  "think","also","back","after","use","two","how","our","work","first","well"
];

const EN_QUOTES = [
  "You have power over your mind, not outside events.",
  "We suffer more often in imagination than in reality.",
  "What stands in the way becomes the way.",
  "Waste no more time arguing about what a good man should be. Be one.",
  "How long are you going to wait before you demand the best for yourself?",
  "No man is free who is not master of himself.",
  "Wealth consists not in having great possessions, but in having few wants.",
  "It is not things that disturb us, but our opinions about them.",
  "Begin at once to live, and count each separate day as a separate life.",
  "Difficulties show what men are.",
  "Everything we hear is an opinion, not a fact.",
  "The best revenge is to be unlike him who performed the injury.",
  "If it is not right, do not do it; if it is not true, do not say it.",
  "Life is long if you know how to use it.",
  "The soul becomes dyed with the color of its thoughts.",
  "Dig within; there lies the well-spring of good.",
  "Do every act of your life as though it were your last.",
  "Time is a river of passing events, and strong is its current.",
  "No man was ever wise by chance.",
  "Luck is what happens when preparation meets opportunity."
];

const EN_SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "Pack my box with five dozen liquor jugs.",
  "Sphinx of black quartz, judge my vow.",
  "Practice slowly and accurately; speed will follow."
];

const DE_UMLAUT_WORDS = [
  "über","schön","müssen","hören","können","ändern","fühlen","glück","tür",
  "grün","früh","spät","müde","dünn","süß","heiß","weiß","straße","fußball",
  "nördlich","östlich","königin","männer","mädchen","gefährlich","erzählen",
  "ungefähr","größe","natürlich","tatsächlich","französisch","verrückt"
];

const DE_COMMON = [
  "der","die","das","und","ist","ich","nicht","sie","es","ein","auch","auf",
  "mit","sich","wir","aber","haben","werden","kann","nach","wenn","oder",
  "noch","wie","für","aus","bei","nur","dann","schon","mehr","sehr","zeit",
  "gut","jahr","zwei","mensch","leben","arbeit","zwischen","während"
];

const DE_QUOTES = [
  "Wir leiden öfter in der Vorstellung als in der Wirklichkeit.",
  "Was im Weg steht, wird zum Weg.",
  "Niemand ist frei, der nicht Herr über sich selbst ist.",
  "Es sind nicht die Dinge, die uns beunruhigen, sondern unsere Meinungen über sie.",
  "Das Leben ist lang, wenn du es zu nutzen weißt.",
  "Beginne sofort zu leben, und zähle jeden Tag als ein eigenes Leben.",
  "Schwierigkeiten zeigen, was Menschen sind.",
  "Alles, was wir hören, ist eine Meinung, keine Tatsache.",
  "Die Seele nimmt die Farbe ihrer Gedanken an.",
  "Grabe in dir; dort liegt die Quelle des Guten.",
  "Niemand wurde je durch Zufall weise.",
  "Wenn es nicht richtig ist, tu es nicht; wenn es nicht wahr ist, sag es nicht."
];

const DE_SENTENCES = [
  "Franz jagt im komplett verwahrlosten Taxi quer durch Bayern.",
  "Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich.",
  "Übe langsam und genau, die Geschwindigkeit kommt von selbst."
];

const NO_LETTER_WORDS = [
  "blåbær","kjærlighet","særlig","være","først","høst","måned","språk","sjø",
  "grønn","kjøre","dør","fødselsdag","ærlig","søndag","lørdag","råd","kjøkken",
  "brød","smør","øl","så","på","år","gå","stå","få","nå","øy","mørk"
];
const NO_COMMON = [
  "og","jeg","det","er","du","ikke","som","på","de","med","han","av","vi",
  "til","seg","men","et","har","om","så","kan","der","hva","skal","ut",
  "være","kom","noen","hele","hvor","etter","bare","også","mye","godt"
];
const NO_QUOTES = [
  "Vi lider oftere i fantasien enn i virkeligheten.",
  "Det som står i veien, blir veien.",
  "Ingen er fri som ikke er herre over seg selv.",
  "Livet er langt om du vet å bruke det.",
  "Vanskeligheter viser hva folk er laget av.",
  "Alt vi hører er en mening, ikke et faktum.",
  "Sjelen farges av tankene dine.",
  "Begynn å leve nå, og regn hver dag som et helt liv."
];
const NO_SENTENCES = [
  "Høvdingens kjære squaw får litt pizza i Mexico by.",
  "Øv langsomt og nøyaktig, så kommer farten av seg selv."
];

const DA_LETTER_WORDS = [
  "æble","måske","kærlighed","brød","smør","øl","gå","år","blå","grøn",
  "køkken","dør","fødselsdag","søndag","lørdag","råd","høst","sprog","ærlig",
  "først","kød","sø","må","så","nå","stå","få","københavn","øje","mørk"
];
const DA_COMMON = [
  "og","jeg","det","er","du","ikke","at","en","den","til","af","han","vi",
  "med","om","så","kan","der","hvad","skal","ud","være","kom","hele","hvor",
  "men","har","sig","efter","bare","også","meget","godt","nu"
];
const DA_QUOTES = [
  "Vi lider oftere i fantasien end i virkeligheden.",
  "Det, der står i vejen, bliver vejen.",
  "Ingen er fri, som ikke er herre over sig selv.",
  "Livet er langt, hvis du ved, hvordan du bruger det.",
  "Vanskeligheder viser, hvad mennesker er gjort af.",
  "Alt, hvad vi hører, er en mening, ikke en kendsgerning.",
  "Sjælen farves af dine tanker.",
  "Begynd at leve nu, og regn hver dag for et helt liv."
];
const DA_SENTENCES = [
  "Quizdeltagerne spiste jordbær med fløde, mens cirkusklovnen Walther spillede på xylofon.",
  "Øv langsomt og præcist, så kommer farten af sig selv."
];

const FR_LETTER_WORDS = [
  "école","élève","mère","père","frère","très","après","déjà","voilà","ça",
  "garçon","français","légère","répéter","préférer","créé","idée","année",
  "journée","cinéma","café","thé","où","été","général","préciser","vérité"
];
const FR_COMMON = [
  "le","la","les","de","un","une","et","est","en","que","il","elle","nous",
  "vous","dans","pour","sur","avec","pas","ne","je","tu","son","ses","mais",
  "ou","si","tout","bien","plus","comme","faire","dire","voir","temps"
];
const FR_QUOTES = [
  "Nous souffrons plus souvent en imagination qu'en réalité.",
  "Ce qui barre la route fait faire du chemin.",
  "Nul n'est libre s'il n'est pas maître de soi.",
  "La vie est longue si l'on sait en user.",
  "Les difficultés montrent ce que valent les hommes.",
  "Tout ce que nous entendons est une opinion, non un fait.",
  "L'âme se teinte de la couleur de ses pensées.",
  "Commence à vivre dès maintenant."
];
const FR_SENTENCES = [
  "Portez ce vieux whisky au juge blond qui fume.",
  "Entraîne-toi lentement, la vitesse viendra."
];

const ES_LETTER_WORDS = [
  "año","niño","señor","mañana","español","pequeño","montaña","sueño",
  "enseñar","compañero","corazón","canción","razón","según","también",
  "después","así","aquí","más","café","teléfono","médico","rápido","fácil",
  "difícil","música","página","número"
];
const ES_COMMON = [
  "el","la","los","las","de","un","una","y","es","en","que","no","se","por",
  "con","para","su","al","lo","como","más","pero","sus","le","ya","este",
  "porque","muy","sin","sobre","también","hasta","donde","desde"
];
const ES_QUOTES = [
  "Sufrimos más en la imaginación que en la realidad.",
  "Lo que estorba el camino se convierte en el camino.",
  "Nadie es libre si no es dueño de sí mismo.",
  "La vida es larga si sabes usarla.",
  "Las dificultades muestran lo que son los hombres.",
  "Todo lo que oímos es una opinión, no un hecho.",
  "El alma se tiñe del color de sus pensamientos.",
  "Empieza a vivir ahora mismo."
];
const ES_SENTENCES = [
  "El veloz murciélago hindú comía feliz cardillo y kiwi.",
  "Practica despacio y con precisión; la velocidad llega sola."
];

const PACKS = {
  sv: { lettersLabel: "åäö focus", lettersWords: AAO_WORDS, commonWords: COMMON_WORDS, quotes: STOIC_QUOTES, sentences: SENTENCES },
  en: { lettersLabel: "Common words", lettersWords: EN_COMMON, commonWords: EN_COMMON, quotes: EN_QUOTES, sentences: EN_SENTENCES },
  de: { lettersLabel: "üöäß focus", lettersWords: DE_UMLAUT_WORDS, commonWords: DE_COMMON, quotes: DE_QUOTES, sentences: DE_SENTENCES },
  no: { lettersLabel: "æøå focus", lettersWords: NO_LETTER_WORDS, commonWords: NO_COMMON, quotes: NO_QUOTES, sentences: NO_SENTENCES },
  da: { lettersLabel: "æøå focus", lettersWords: DA_LETTER_WORDS, commonWords: DA_COMMON, quotes: DA_QUOTES, sentences: DA_SENTENCES },
  fr: { lettersLabel: "Accents focus", lettersWords: FR_LETTER_WORDS, commonWords: FR_COMMON, quotes: FR_QUOTES, sentences: FR_SENTENCES },
  es: { lettersLabel: "ñ & accents", lettersWords: ES_LETTER_WORDS, commonWords: ES_COMMON, quotes: ES_QUOTES, sentences: ES_SENTENCES }
};

const LANG_NAMES = {
  sv: "Swedish", en: "English", de: "German", no: "Norwegian",
  da: "Danish", fr: "French", es: "Spanish"
};

// language of the generated lines: explicit choice, or follow the OS input source
let textLang = store.getItem("tangent-textlang") || "auto";
function effLang() {
  return (textLang !== "auto" && PACKS[textLang]) ? textLang : LAYOUTS[osLayout].lang;
}
function pack() { return PACKS[effLang()]; }

