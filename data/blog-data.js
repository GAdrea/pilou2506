/**
 * BLOG — Articles affichés sur la page Blog
 *
 * Pour publier un nouvel article : copie un bloc existant dans BLOG_ARTICLES
 * et remplis les champs. Le champ "content" est le texte complet de l'article (HTML autorisé).
 *
 * Modèle à copier :
 * {
 *   id: 'unique-id-article',     // ex: 'onsen-2024' (sert dans l'URL article.html?id=...)
 *   title: 'Titre de l\'article',
 *   image: 'assets/img/blog/mon-image.jpg',
 *   description: 'Courte description pour la carte.',
 *   date: '2024-01-15',
 *   content: `
 *     <p>Premier paragraphe de l'article...</p>
 *     <h2>Sous-titre</h2>
 *     <p>Autre paragraphe. Tu peux utiliser <strong>gras</strong>, <em>italique</em>, <a href="#">liens</a>.</p>
 *   `
 * },
 */
window.BLOG_ARTICLES = [
  {
    id: "bountyhunter",
    title: "Bientôt ma tête mise à prix ?",
    image: "assets/img/posts/1771370392077.png",
    description: "Y'a des moments, faut savoir s'arrêter quand même...",
    date: "2026-02-19",
    content: `
         <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🕵️‍♂️ Bounty Hunter au Japon 💴</strong></p>

<p>Bon, on ne va pas se mentir : j’espérais secrètement que Sanae rate son pari. Mais non. Madame a raflé les trois quarts des sièges. Apparemment, sa popularité est aussi solide que le déni japonais face aux problèmes démographiques. Félicitations quand même, le message est passé : c'est elle la boss. 👋👑</p>

<p>Mais le plus croustillant arrive. 🍿</p>
<p>J’ai vu passer des posts sur l'Article 66 du règlement sur le contrôle de l'immigration. Le concept est simple, efficace, et un tantinet flippant : dénoncez un immigrant en situation illégale et touchez jusqu' à 50 000 yens de prime. 💴✨</p>

<p>Faisons les comptes : Avec le yen qui continue sa chute libre vers les abysses, ça nous fait environ 275 euros. Oui, vous avez bien lu. Pour le prix d’une console d'occasion ou d’un chariot plein de courses, vous pouvez devenir le "chasseur de primes" du quartier. 🤠💸</p>

<p>Mais comment faire?</p>
<p>Pour toucher le pactole, il ne suffit pas de pointer du doigt. Il faut fournir :</p>
<p>📍 Le nom</p>
<p>📍 L’adresse</p>
<p>📍 Le lieu de travail</p>
<p>📍 Et même... la routine quotidienne de la personne.</p>
<p>Est-ce que vous sentez l’odeur de la paranoïa qui s’installe dans l’immeuble ? 👃❄️</p>
<p>Le problème ?</p>
<p>Le Japon a déjà un penchant assez prononcé pour les règles et la délation (le "Wa" a ses limites). Rappeler l'existence de cette prime dans un climat anti-immigration agressif, c'est comme jeter de l'essence sur un feu de forêt.</p>

<p>Surtout quand on sait que l'attribution d'un visa ici relève parfois de la magie noire ou du lancer de dés. On se demande où s'arrête la sécurité et où commence le délire pur et simple. ✋🚫</p>

<p>En soi, la loi existe pour la sécurité, soit. Mais entre les mains d'une politique ultra-ferme et d'une population incitée financièrement à surveiller son prochain, on risque de passer de "pays paisible" à "épisode de Black Mirror" assez rapidement. 🎞️🤡</p>

<p>Reste à savoir si tout ça est vrai ou non. Seul l'avenir nous le dira.</p>
       `,
  },

  //article suivant
  {
    id: "reconversion professionnelle",
    title: "Il n'est jamais trop tard pour changer de carrière",
    image: "/assets/img/posts/1771088738054.png",
    description: "Le déclic qui a changé ma vie",
    date: "2026-02-16",
    content: `
      <p><strong>Salut c'est Pilou 👋</strong></p>

<p>💻 <strong>Du portage de valises au portage de code : Ma reconversion 🚀</strong></p>

​<p>On ne va pas se mentir : bosser dans l’hôtellerie de luxe au Japon, c’est le rêve... surtout quand on est le client. ✨</p>

​<p>Quand on est l’employé (merci les contraintes de visa !), c’est surtout transporter des charges lourdes, attendre debout que le temps passe (souvenir ému des heures de solitude du COVID) et flinguer sa santé physique pour un salaire de misère. Tout ça avec un sourire "omotenashi" bien figé pendant que tes articulations demandent le divorce. 📉🏨</p>

​<p>Le déclic (il était temps !) : 😁</p>

<p>J’ai toujours voulu être développeur, mais comme je pensais qu’il fallait être un génie en maths, j’avais sagement abandonné l’idée. Puis un soir, une amie japonaise m'appelle à l'aide. Son fils, au collège, avait un devoir de code à faire.</p>

​<p>À son âge, je m'amusais avec des fers à souder. Lui, il devait modifier une page web. Face à leur détresse mutuelle, on s'est installés tous les trois devant le PC. Malgré mon ignorance totale, on a galéré dans la joie et on a fini par vaincre le code. 🧠💡</p>

​<p>L'école de la débrouille : 🛠️</p>

<p>C’est là que j’ai compris : ce n'est pas de la magie noire réservée aux matheux, c'est juste de la logique et de la persévérance. Je me suis lancé dans des formations en ligne, j'ai construit mes premiers sites et j'ai même recruté l'IA pour m'aider quand je bloquais (elle au moins, elle ne soupire pas quand je fais une erreur de syntaxe).</p>

​Moralité : 🎤🔥

Peu importe votre projet ou votre âge (enfin soyez raisonnables tout de même), lancez-vous!

Même si vous échouez, il en restera toujours quelque chose. Et croyez-moi, c'est bien plus gratifiant que de participer au festival du "j'aurais dû" à la fin de sa vie.</p>
    `,
  },
  //Article suivant

  {
    id: "inalco",
    title: "Mes meilleures années à l'université",
    image: "/assets/img/posts/1770713031580.png",
    description: "On dirait pas comme ça mais je vous jure que c'est vrai !",
    date: "2026-02-11",
    content: `
      <p><strong>Salut c'est Pilou 👋</strong></p>

<p>🇯🇵 <strong>Mon parcours universitaire dans la langue japonaise📖✍️</strong></p>

​<p><strong>Mon premier cours de grammaire ? 🎤</strong></p>

<p>Une salle de 30 personnes pour 80 étudiants. Résultat : j'ai passé 1h30 assis par terre sous une table. Derrière moi, certains étaient debout dans le couloir à essayer de capter un bout de phrase. Mais c'était bien, vraiment 😅</p>

​<p><strong>Le régime sec : 🍱💥</strong></p>

<p>Des examens de kanjis qui ressemblent à des massacres de masse. Des questions d'examen écrites... en japonais. Si tu n'as pas bossé, tu ne comprends même pas ce qu'on te demande. C'était intense, c'était dur, mais c'était (et de loin) la meilleure formation possible.</p>

​<p><strong>Le moment de vérité (désolé les influenceurs) : 📣🔥</strong></p>

<p>Arrêtez de croire qu'une application ouverte 5 minutes par jour entre deux stations de métro vous rendra bilingue en trois semaines. Le japonais, comme le sport, ça demande du temps, de l'investissement et une bonne dose de discipline.</p>

​<p>La vérité est dure à avaler, mais vous devrez vivre avec : sans effort, on n'obtient rien. Si vous préférez rester dans le déni avec vos applis à la con, grand bien vous fasse ! 🐢💨</p>

​<p>J'ai mis 3 ans à maîtriser les bases solidement, mais aujourd'hui, j'affronte n'importe quelle situation au Japon sans (trop) trembler.</p>

<p>Dans la fable de La Fontaine, c’est toujours la tortue qui gagne.</p>

<p>À bon entendeur... 😉</p>
    `,
  },

  //Article suivant
  {
    id: "demission",
    title: "La mort de ma carrière. (Bon débarras !)",
    image: "/assets/img/posts/1770536430634.png",
    description:
      "Pourquoi je ne travaillerai plus jamais pour un hôtel de luxe japonais.",
    date: "2026-02-08",
    content: `
       <p><strong>Salut c'est Pilou 👋</strong></p>

<p>👔 <strong>Pourquoi je ne travaillerai PLUS JAMAIS pour une entreprise japonaise 🚫🇯🇵</strong></p>

​<p>Cela fait presque un an que j'ai quitté mon ancien hôtel. Je garde le nom secret pour ma future vidéo YouTube (patience...), mais il est temps de vous raconter la fin du calvaire. 🍿</p>

​<p>Le bilan : 5 ans et 8 mois. C’est le temps qu’il m’a fallu pour réaliser que les promesses d’évolution de carrière au Japon sont parfois aussi réelles que les licornes. 🦄 Arrivé avec l'espoir de monter en grade à la réception, je suis reparti 6 ans plus tard avec... les mêmes galons, mais beaucoup plus de cernes.</p>

​La descente aux enfers : 🌀
<p>Travailler dans cette m....., c'est :</p>
<p>❌ Des horaires qui aspirent ta vie privée comme un trou noir avale la lumière.</p>
❌ Une discrimination latente distillée au quotidien.
❌ Une santé mentale et physique qui se dégrade plus vite que le cours du Yen. 📉
Bloqué par le COVID et les frontières fermées, j'ai dû tenir. Mais vient un moment où l'instinct de survie prend le dessus.

<p>​<strong>La démission (ou le chef-d’œuvre d'ironie) : ✍️🤖</strong></p>
<p>Pour ma lettre de démission, j'ai appliqué la loi du moindre effort : je l'ai fait rédiger par Microsoft Copilot. Pourquoi s'embêter quand l'entreprise ne vous a témoigné aucun respect en 6 ans ?</p>

​<p><strong>Le clou du spectacle ? L'enveloppe. ✉️💀</strong></p>
<p>Voulant bien faire les formes, j'achète une enveloppe "stylée". Au moment de la remettre, le visage de ma manager se décompose.</p>
« Mais... c'est une enveloppe pour les funérailles, on met de l'argent dedans pour les morts. » Ma réponse ? « Ça tombe bien, c'est l'enterrement de ma carrière ici. » ⚰️🥂
​<p>L'humour noir n'est visiblement pas au programme des formations managériales japonaises, car l'ambiance est passée de "glaciale" à "zéro absolu".</p>

​<p><strong>Le départ : 🚶💨</strong></p>
Je suis parti comme je suis rentré : dans l'indifférence générale. Pas de pot de départ, pas de cadeau, pas de "Otsukaresama" chaleureux (sauf de deux-trois collègues). Mais c'est pas grave.

​<p>Ces 5 années ont été une purge, mais aussi une expérience sociale fascinante sur les codes toxiques du travail ici.</p>
<p>En espérant que ça vous aidera ! ✨</p>
    `,
  },
  //Article suivant
  {
    id: "Fukuoka",
    title: "Fukuoka, une ville où il fait bon vivre",
    image: "assets/img/posts/1770182783755.png",
    description:
      "Sincèrement, je ne me verrai pas vivre autre part que dans cette ville.",
    date: "2026-02-05",
    content: `
      <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🍜 Fukuoka : Pourquoi j’ai fini dans le sud (et pourquoi je ne veux plus en bouger) 🇯🇵</strong></p>

​<p>On me demande souvent : « Mais pourquoi Fukuoka ? Pourquoi pas Tokyo pour les néons ou Kyoto pour les temples ? » 🏯</p>

​<p>La réponse courte ? Le hasard. La réponse longue ? Mon CV a fait le tour du Japon pour un stage et Fukuoka est le seul endroit qui a dit "Oui". 😂</p>

​<p><strong>Le rêve de Weeb brisé (ou presque) : 🎮</strong></p>

<p>Au début, je me voyais déjà vivre à Tokyo, à deux pas d'Akihabara. Et non, ce n'est pas parce que je suis un gros weeb, qu'est-ce que vous croyez ? C'était... pour la science. 🧪</p>

<p>Sauf qu'en tant qu'étudiant en galère, trouver un appart à distance à Tokyo, c'est comme essayer de finir un boss de Dark Souls avec un cure-dent (je sais c'est parfaitement faisable !).</p>

​<p>Finalement, seul l'Institut Français de Fukuoka m'a ouvert ses portes pour mon stage. 6 mois plus tard, le coup de foudre était scellé. ⚡️</p>

​<p>Pourquoi Fukuoka, c'est mon cheat code du Japon :</p>
<p>✅ Une ville à taille humaine (ni trop étouffante, ni morte).</p>
<p>✅ Les gens sont (vraiment) sympas.</p>
<p>✅ La mer, la montagne et l'aéroport sont à quelques minutes de métro. ✈️⛰️</p>
<p>✅ Le coût de la vie qui ne te force pas à vendre un rein pour payer ton studio.</p>

​<p>Bon, redescendons sur terre : 🧊</p>
<p>Ce n'est pas le paradis non plus. Qui dit loyer moins cher, dit salaire... moins élevé. Les opportunités pro ne pleuvent pas autant qu'à la capitale. Faut pas s'emballer non plus, l'argent ne tombe pas des cerisiers. 🌸💸</p>

​<p>Mais entre les sources thermales de Beppu, les friandises de Dazaifu et le village Ninja de Saga (où je me suis éclaté, mais je rappelle que JE NE SUIS PAS UN WEEB), la région de Kyushu a une âme que j'apprécie particulièrement. Et pourtant, je suis parisien (et fier de l'être !😎)</p>

​<p>Bref, si vous venez pour le tourisme ou pour vous installer, Fukuoka est une pépite. Qui sait ? On se croisera peut-être au détour d'un bar ou d'un stand de Ramen ! 🍜🍻</p>
    `,
  },
  //Article suivant

  {
    id: "tournoismash",
    title: "Mon premier tournoi de Smash Bros Melee",
    image: "assets/img/posts/1770173203134.png",
    description: "Une expérience unique et inoubliable !",
    date: "2026-02-04",
    content: `
       <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🎮 Smash Bros : L’épopée européenne de l’équipe « Sans Anesthésie » 🏥💉</strong></p>
​<p>Après ma confiance aveugle de casual, puis mon retour brutal sur terre, voici l’apothéose : ma première (et seule) participation à un tournoi européen en double avec mon rival de toujours. 🥊✨</p>

​<p>Le duo de choc : On débarque avec un nom d'équipe plein de finesse : « Sans Anesthésie ». Le concept ? Docteur Mario et son assistant Marth prêts à briser des côtes pour la science. 👨‍⚕️🗡️</p>

​<p><strong>La stratégie de l'instinct :</strong></p>
<p>Problème : on a passé des milliers d’heures à se taper dessus, mais ZÉRO minute à coopérer. Résultat ? On y est allés à l’instinct total. Mon rival en première ligne pour découper tout ce qui bouge, et moi en soutien avec mes pilules pour gérer les gêneurs. Étonnamment, ça marchait... jusqu'à ce qu'on tombe sur des joueurs vraiment sérieux. On s’est fait sortir, mais avec style (et j'ai quand même pris ma petite correction par le champion britannique, histoire de garder l'habitude). 🇬🇧💀</p>

​<p><strong>L'anecdote "Petite fierté" :</strong></p>
Le plus drôle ? Un joueur s'est plaint à mon rival que je le « sous-estimais » parce que je n'utilisais pas de techniques avancées comme le wavedash contre lui. Il pensait que je le méprisais...

<p>Mon rival, après avoir éclaté de rire, a dû lui expliquer la triste réalité : je n'étais pas arrogant, j'étais juste incapable de le faire en plein match. Passer pour un génie hautain alors qu'on galère juste avec ses doigts, tu parles d'une ironie du sort 😅</p>

​<p>Bref, une ambiance extra, des rencontres géniales et une dose d'humilité supplémentaire. Que demander de plus ?😁</p>

​<p>Et vous, c'est quoi le move technique que vous n'avez jamais réussi à sortir en match ? 👇</p>
      `,
  },

  //Article suivant

  {
    id: "franceoujapon",
    title: "La France ou le Japon ?",
    image: "assets/img/posts/1769992083148.png",
    description: "Entre les deux, mon coeur balance.",
    date: "2026-02-02",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🇯🇵 Japon : J'ai débloqué le succès "Rêve réalisé", et maintenant ? 🎮🌀</strong></p>

<p>Avant d'aller plus loin, une petite dose de transparence : oui, j'utilise l'IA pour m'aider à mettre mes idées en forme et générer mes visuels. Mais les tripes, les souvenirs et les coups de gueule, eux, sont 100% authentiques. C’est mon histoire, sans filtre. 😉</p>

<p>Cela fait un moment que je suis ici. Je ne compterai pas les années, je trouve que ça fait trop "succès Steam" un peu naze. Mais le constat est là : la lune de miel est terminée depuis un bail, et pour être honnête... je ne sais plus du tout où je vais. J'ai l'impression de partir à la dérive. 🚣‍♂️🌊</p>

<p>Le paradoxe de l'expat' : J'aime ce pays. Les paysages, la bouffe, les mangas, les amitiés solides que j'ai forgées... tout ça est bien réel. Si je râle souvent (faut bien faire honneur à mes gènes français ! 🥖), ce n'est pas par haine, mais par lucidité. Ignorer les problèmes d'un pays n'est pas une preuve d'amour, c'est du déni. D'autant plus que c'est pas comme ça qu'on les règle.</p>

<p>Le mur de la réalité : 🧱</p>
<p>J'ai lutté de toutes mes forces pour réaliser mon rêve : vivre au Japon. Mais une fois le drapeau planté au sommet, je n'ai pas pensé à la suite. Je me suis juste battu pour "rester".</p>
Et aujourd'hui, je suis fatigué.

<p>⚡ Fatigué de cette épée de Damoclès au-dessus de mon visa qui peut frapper n'importe quand sans aucune raison.</p>

<p>⚡ Fatigué de me dire qu'avec les nouvelles politiques de Sanae (on ne te remercie pas !), le combat passe d'un mode "Difficile" à un "Die and retry" sans retry justement.</p>

<p>Lâcher prise est douloureux quand on a investi autant de temps et d'âme dans un projet. Pourtant, malgré le brouillard, je regarde le chemin parcouru avec fierté.</p>
<p>Je suis venu, j'ai vu, j'ai vécu. Et ça, personne ne pourra me l'enlever. 🛡️✨</p>

<p>Je ne sais pas de quoi demain sera fait, mais je suis fier d'en être arrivé là. 😊</p>

<p>Et vous, vous avez déjà eu l'impression d'avoir atteint votre but sans savoir quoi faire après ? On partage nos doutes en commentaires ? 👇</p>

       `,
  },

  //Article suivant
  {
    id: "martinique",
    title: "Mes racines antillaises",
    image: "/assets/img/posts/1767992050685.jpg",
    description: "Parce que je n'oublie pas d'où je viens.",
    date: "2026-01-10",
    content: `
      <p>Salut c'est Pilou !👋

<p>🌴 <strong>De Madinina au Pays du Soleil-Levant : Mes racines martiniquaises 🇯🇵</strong></p>

​<p>Je suis né à Paris mais l'intégralité de mes racines se trouvent aux Antilles.🥥☀️</p>
​J’ai vécu seulement trois ans en Martinique (CM2, 6ème, 5ème). À l'époque, j'avais dû rentrer pour des raisons particulières mais ça m'a permis de profiter de ma famille et de découvrir une façon de vivre différente de mon quotidien parisien. Bon, j'avoue, je me serais bien passé des moustiques par contre🦟😅</p>

​<p><strong>L'école du respect (ou l'école "à la dure") : 📏</strong>
Ceux qui ont grandi aux Antilles à cette époque savent. Les profs avaient les pleins pouvoirs. Un bavardage ? Hop, un coup de règle sur les doigts ! Et si j'avais le malheur de m'en plaindre à la maison, je prenais double dose avec mes parents parce que j'avais bavardé ET que "le prof a toujours raison".
Aujourd'hui, ça peut choquer, mais ça m'a appris le respect des aînés et une certaine discipline. J’assume mon côté "gros boomer" sur ce coup-là mais ça n’a tué personne et ça forge le caractère ! 💪</p>

<p>​<strong>Le défi de la langue : 🗣️</strong>
En tant que "n*gropolitain" (c'est de l'humour, on se détend !), j'avais un mal fou à parler créole et les moqueries de ma famille sur mon accent n'ont pas aidé 😅 Résultat : je comprends tout, mais j'ai longtemps négligé de le parler. C'est mon petit regret aujourd'hui, car c'est un patrimoine magnifique... même si, je l'avoue, le créole revient très naturellement quand je suis en colère ! 🧨</p>

<p> <strong>Aujourd'hui, je vis au Japon.</strong> Le trajet pour rentrer voir les miens est interminable (14h pour aller en France + 8h depuis Paris pour la Martinique... une vraie expédition ✈️), mais cela rend les retrouvailles encore plus précieuses.</p>

<p><strong>La Martinique, c'est une culture, une force et une générosité incroyable.</strong> Si vous n'y êtes jamais allés, foncez ! Vous ne le regretterez pas. 🌺🍍</p>

<p><strong>Et vous, c'est quoi l'anecdote qui a marqué votre enfance ou votre éducation ?</strong> Dites-moi tout ! 👇</p>
    `,
  },
];
