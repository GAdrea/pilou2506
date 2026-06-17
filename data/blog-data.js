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
    id: "efforts-ne-trahissent-jamais",
    category: "Carrière",
    title: "Les efforts ne trahissent jamais !",
    image: "assets/img/posts/1781334702125.png",
    description: "Quand l'initiative se heurte au mur de l'inertie.",
    date: "2026-06-15",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p>Je sais, ça fait un bail que je n'ai rien posté. J'ai passé les trois derniers mois à enchaîner les services de nuit pour remplacer un collègue qui s'est blessé au boulot. (Il va bien, au passage).</p>

<p>Mais aujourd'hui, j'ai un nouveau coup de gueule à évacuer. Et celui-là, il me tient particulièrement à cœur.</p>

<p>L'art d'optimiser dans le vide :</p>
<p>Comme je vous l'avais dit, mes heures de nuit m'ont permis de me former à pas mal de logiciels. Pas pour faire joli, mais pour créer des outils et des systèmes concrets afin de fluidifier notre travail d'équipe et nous éviter des tâches répétitives et pénibles. J'ai tout documenté, j'ai fait des présentations propres, j'ai partagé l'avancement... 📈💻</p>

<p>Tout ça pour un silence radio digne de l'espace intersidéral. 🌌🦗</p>

<p>Dans une boîte qui se vante d'être "moderne" et loin des vieux standards archaïques japonais, j'ai pris une magnifique douche froide. Les rares retours que j'ai eus ?</p>

<p>« Oh, c'est super utile, quelle bonne idée ! » ... pour ensuite ne JAMAIS l'utiliser.</p>

<p>Le festival des excuses bidons :</p>

<p>👶 « Ah mais c'est too compliqué, on n'a pas l'habitude de ces outils. » (Spoiler : ils n'ont même pas cliqué sur le lien pour tester. J'ai pourtant fait une interface tellement intuitive qu'un enfant de CP s'en sortirait).</p>

<p>📋 « Oui mais ton système n'est pas officiel, il faut attendre l'approbation de la hiérarchie. » (Le tout dans une entreprise qui, je le rappelle, encourage théoriquement la prise d'initiative).</p>

<p>Beaucoup d'entreprises ici adorent chanter les louanges du "changement" et de la "modernisation", mais dès qu'il s'agit de bousculer un tout petit peu la routine ou de lâcher les process vieux de 20 ans, il n'y a plus personne. 🦖</p>

<p>Ma vraie force, c'est d'être ce travailleur de l'ombre qui fluidifie et optimise le quotidien de toute l'équipe. Mais visiblement, dans un système où "avoir l'air occupé" est plus important que d'être efficace, c'est un concept totalement incompris. 🌑🕴️</p>

<p>Bref, j'ai créé des systèmes pour faire gagner du temps à des gens qui préfèrent visiblement continuer à galérer à l'ancienne. On ne se refait pas.</p>
       `,
  },

  //Article suivant
  {
    id: "japon-a-lille-wakuwaku",
    category: "Japon",
    title: "Le Japon à Lille ! ça vaut le détour !",
    image: "assets/img/posts/1778232908742.png",
    description: "Une asso lilloise qui fait découvrir le vrai Japon.",
    date: "2026-05-08",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🏮 Wakuwaku à Lille : Quand le Japon débarque dans le Nord ! 🇫🇷🇯🇵</strong></p>

<p>Il y a des jours où le hasard fait vraiment bien les choses. La semaine dernière, une amie japonaise a repris contact avec moi après... un certain temps. Ok, ça faisait des années et j'aurais pu la rappeler avant, ne me jugez pas ! 😅</p>

<p>La nouvelle ? Elle vit désormais à Lille et vient de fonder une association pour faire découvrir la culture japonaise : Wakuwaku.</p>

<p>Le nom ? Pour les fans de Spy x Family, c'est la réplique culte d'Anya Forger. Pour les autres, c'est l'onomatopée de l'excitation joyeuse. C'est simple, c'est frais, et ça résume parfaitement l'esprit du projet : découvrir le Japon sans se prendre la tête. 🤩✨</p>

<p>Pourquoi j'en parle ? 🎤🔥 :</p>
<p>Alors oui, je ne suis pas une influenceuse avec des millions de followers, je n'ai jamais mis les pieds dans cette asso (vu que j'habite à Fukuoka, Captain Obvious) et mon impact médiatique est proche de zéro. Mais c'est mon amie, alors je fais ce que je veux ! 🤷‍♂️</p>

<p>Au programme :</p>
<p>L'équipe (5 Japonais, 6 Français) propose des ateliers ludiques. Pour l'instant, ils ont 28 followers sur Instagram, et j'espère bien que ça va grimper. 📈</p>

<p>Leur premier atelier portait sur l'Origami. Vous savez, l'art de plier du papier pour en faire des grues par exemple. Dans mon ancien hôtel, c'était obligatoire d'en mettre dans les chambres des clients. Enfin, "obligatoire" pour les autres, parce que moi, je ne l'ai jamais fait. Trop de skill demandé pour mes mains de sédentaire. 🦢🚫</p>

<p>Bientôt, ils proposeront des cours de japonais. Donc si vous voulez apprendre la langue autrement qu'avec une appli qui vous harcèle, vous savez où aller ! 📖🏯</p>

<p>Si vous habitez à Lille ou dans les environs et que vous aimez le Japon (le vrai, pas celui des clichés), allez faire un tour sur leur compte et soutenez-les. Vous ne serez pas déçus, promis ! 🙌</p>

<p>👉 Suivez @wakuwakuasso (ou cherchez-les, vous allez trouver !)</p>
       `,
  },

  //Article suivant
  {
    id: "visa-gijinkoku-2026",
    category: "Japon",
    title: "Toucher le fond et creuser encore",
    image: "assets/img/posts/1777423195742.png",
    description: "Le visa qui veut des bras, pas des gens.",
    date: "2026-04-30",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🛂 Visas 2026 : Bienvenue au Japon (mais restez invisibles, merci) 🚫🇯🇵</strong></p>

<p>Juste au moment où tu penses que les choses ne peuvent pas empirer, Sanae Takaichi nous rappelle qu'en politique, l'imagination est sans limite quand il s'agit de verrouiller les frontières. La sentence est tombée le 15 avril : le visa « Gijinkoku » a officiellement perdu son insouciance. 🎡</p>

<p>Désormais, si tu bosses dans le service, l'hôtellerie ou la traduction (bref, là où on parle à des humains), il va falloir prouver que ton japonais n'est pas juste du « survie-Konbini ». Le niveau CEFR B2 est devenu le nouveau sésame.</p>

<p>Les options pour avoir le droit de rester (ne choisis pas, l'Immigration l'a fait pour toi) 😅 :</p>

<p>1️⃣ Le duo JLPT N2 ou BJT 400+ : Le JLPT, c'est toujours aussi archaïque. Le BJT (Business Japanese Test), c'est la même souffrance mais en version « Salaryman » sur ordinateur. Sans l'un des deux, ton dossier pour une PME (Catégories 3 et 4) finit direct à la broyeuse. 👔💩</p>

<p>2️⃣ Le diplôme universitaire JAPONAIS : La seule vraie « carte sortie de prison ». Mais vu le prix des facs (même si on est loin des tarifs US, ça pique quand même entre ¥800k et ¥1,3M l'année), autant dire que c'est un investissement sur 20 ans. 🎓💸</p>

<p>3️⃣ Le bonus « Légende Urbaine » : Avoir vécu au Japon pendant... 20 ANS. 🤯 Vingt ans ? Sérieusement ? Soit tu es arrivé ici avant l'invention de l'iPhone, soit tu attends la crise de la quarantaine pour avoir le droit de parler à un client. À ce stade, tu es plus japonais que les distributeurs de boissons.</p>

<p>L'ironie du sort :</p>
<p>C'est fascinant qu'un pays aussi fâché avec les langues étrangères impose des barrières linguistiques de niveau académique aux autres. Sous couvert de « coexistence ordonnée », le but n'est pas de réduire l'immigration (ils en ont besoin), mais de l'éradiquer socialement : on veut des bras qui travaillent, pas des gens qui s'installent. 🧹💨</p>

<p>Dans un pays qui perd des habitants par millions, je me demande qui va faire les tâches ingrates ? L'IA ?</p>

<p>Bonne chance pour coder l'Omotenashi dans un algorithme. Vraiment. Vous allez en avoir besoin.</p>
       `,
  },

  //Article suivant
  {
    id: "nuitard-formation-autodidacte",
    category: "Hôtellerie",
    title: "Être payé pour étudier, c'est pas si mal en fait !",
    image: "assets/img/posts/1777025133680.png",
    description: "Ce qu'on fait vraiment quand on travaille la nuit à l'hôtel.",
    date: "2026-04-25",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🌙 Ma vie de nuitard : Entre cirage de pompes et hack de carrière 🏨💻</strong></p>

<p>Dans mon dernier post, je me plaignais (avec raison, avouons-le) de mon rythme de travail. Mais au fait, je fais quoi exactement quand vous dormez ? 🕵️‍♂️</p>

<p>Le "fun" commence après le briefing :</p>
<p>Une fois les 20 minutes de briefing passées, la foire aux livraisons est ouverte. Eau, serviettes, chargeurs... Mon record personnel est de 12 livraisons en une nuit. Parfois, on me demande de changer des draps ou de faire des lits supplémentaires à 3h du matin. Si vous vous demandiez, c'est EXTRÊMEMENT chiant. 🛌💢</p>

<p>Le spectacle de rue (version VIP) :</p>
<p>Le reste du temps, je suis dehors à surveiller l'entrée. C'est là qu'on croise le gratin :</p>
<p>🥂 Des clients qui rentrent dans un état lamentable (merci l'alcool).</p>
<p>😏 D'autres qui commandent des services... un peu plus "adultes".</p>
<p>Pendant ce temps-là, je reste debout, j'attends qu'il se passe un truc, et je savoure ce "summum du fun". Ah, j'oubliais : je cire aussi des chaussures et je livre les journaux. On est loin de James Bond, hein ? 👞✨</p>

<p>Le braquage légal : être payé pour apprendre 📈🏆 :</p>
<p>Mais voici le secret : mon entreprise me fournit une licence Microsoft 365. Alors, plutôt que de rester debout à compter les pavés, j'utilise tout ce temps mort pour me former en autodidacte sur des logiciels de travail collaboratif.</p>
<p>Je viens même bosser plus tôt pour avoir plus de temps sur l'ordi ! Pourquoi ? Parce que développer ces compétences techniques en étant payé pour le faire, c'est une opportunité en or. C'est toujours plus utile que de fixer le vide en attendant que le soleil se lève. 🌅🤓</p>

<p>En résumé :</p>
<p>Le travail de nuit est d'un ennui mortel, mais c'est devenu mon laboratoire personnel pour préparer l'avenir.</p>

<p>Qui a dit que l'hôtellerie ne servait à rien ? 🥂</p>
       `,
  },

  //Article suivant
  {
    id: "omotenashi-rythme-effrene",
    category: "Hôtellerie",
    title: "Un rythme effréné et destructeur",
    image: "assets/img/posts/1775903217948.png",
    description: "Le prix caché de l'excellence du service japonais.",
    date: "2026-04-12",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🏨 Omotenashi : L'excellence au prix de ma santé 🌙📉</strong></p>

<p>Ça faisait un petit moment que je ne m'étais pas exprimé ici. Pas parce que j'étais en vacances aux Maldives, mais parce que depuis deux mois, ma vie sociale est officiellement plus plate qu'un tapis de yoga. 🧘‍♂️🚫</p>

<p>Bienvenue dans la caricature du "métro boulot dodo" version nippone. Je vis pour travailler, et comme vous allez le constater, j'adore ça !</p>

<p>La magie du service de nuit 🌌 :</p>
<p>On m'accorde des "jours de repos". Enfin, sur le papier. En réalité, le système est d'une connerie aussi profonde que la fosse des Mariannes. 🌊</p>
<p>Je termine mon service SUR mon jour de repos. Je rentre dormir (parce que le sommeil, c'est utile pour ne pas mourir), et quand je me réveille... pouf ! C'est déjà la fin de mon "congé" et il faut repartir au front le lendemain. Payé un peu mieux ? Oui. Suffisant pour réparer ma santé et mon rythme de vie désastreux ? Absolument pas. 💸🩺</p>

<p>L'Omotenashi : Le coût humain caché 🎎☕ :</p>
<p>Le Japon est réputé pour son service exceptionnel. Mais cette excellence a un prix, et ce prix, c'est le "petit personnel" qui le paie.</p>
<p>On me dit souvent que j'ai de la chance de bosser dans le luxe. Ce que ces gens oublient, c'est que je ne suis pas le concierge stylé que tout le monde admire. Je fais partie de l'ombre. Indispensable pour que l'hôtel tourne, mais totalement invisible. Le cadre est sexy, mon quotidien ne l'est pas. 🌫️💼</p>

<p>Pourquoi tout le monde démissionne ? 🚶💨 :</p>
<p>Si ce secteur manque de personnel, ce n'est pas un hasard. Entre les burn-outs, les dépressions ou juste la pénibilité du travail, l'hôtellerie de luxe dévore ses propres employés. J'adore le Japon, mais je déteste ce secteur pour ces raisons.</p>

<p>Il serait peut-être temps que les "génies" de l'industrie réfléchissent à une excellence qui ne détruit pas la vie de ceux qui la rendent possible.</p>

<p>Bref, c'était mon coup de gueule du jour. Merci de m'avoir lu jusqu'au bout ! 🙏</p>
       `,
  },

  //Article suivant
  {
    id: "confessions-intimes",
    category: "Société",
    title: "Confessions (pas trop) intimes",
    image: "assets/img/posts/1774806564593.png",
    description: "Le CV (presque) complet du type derrière le blog.",
    date: "2026-04-02",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>👤 Qui est vraiment le type derrière les "coups de gueule" ? 🇫🇷🇯🇵</strong></p>

<p>J'ai beaucoup parlé de mes passions, de mes critiques sur la société japonaise et de mes doutes existentiels. Mais je n'ai pas vraiment déballé mon CV (enfin, pas tout, faut pas déconner non plus !). Alors, faisons un peu connaissance.</p>

<p>Le GPS de ma vie 🗺️ :</p>
<p>J'ai passé la majeure partie de ma vie à Paris, avec une escale de trois ans en Martinique. J'ai eu la chance de tomber dans une famille aimante qui, malgré quelques ratés (personne n'est parfait, hein ?), m'a inculqué des valeurs humaines qui se font aussi rares que des places assises dans le métro de Tokyo à 18h. J'espère pouvoir transmettre ça un jour !</p>

<p>Le naufrage scolaire 🎓⚓ :</p>
<p>À l'école, j'étais l'élève "moyen" par excellence. Primaire correct (merci l'épée de Damoclès parentale), puis chute libre au collège et au lycée. J'ai eu mon bac, certes après un redoublement, mais on ne va pas chipoter sur les détails.</p>
<p>Avant le japonais, j'ai tenté la fac de gestion : économie, droit, RH... À part le droit civil, tout m'emmerdait royalement. J'ai fini par abandonner la filière, confirmant que je n'étais définitivement pas fait pour les bilans comptables. 📉🚫</p>

<p>La révélation (Merci les animés) ⛩️✨ :</p>
<p>C'est là que j'ai bifurqué vers le japonais. Ces trois années d'université ont été les meilleures de ma vie. Enfin, j'étudiais un truc qui me plaisait ! Je réussissais (sauf en histoire du Japon, où j'étais officiellement une cause perdue) et je me faisais des amis géniaux.</p>

<p>L'introverti 😶💬 :</p>
<p>De nature plutôt introvertie, je ne suis pas le genre de mec qui va taper la discute à un inconnu dans la rue. Je manque souvent de confiance en moi et je suis d'une indécision chronique pour mes projets.</p>
<p>Quand je doute trop, j'écoute "Pas trop de peine" de Francis Cabrel. Ne me demandez pas pourquoi, cette chanson résonne en moi comme un écho familier. 🎶🛶</p>

<p>En résumé :</p>
<p>Je traîne mes casseroles comme tout le monde, mais j'essaie de m'améliorer. Bref, je suis juste une personne parmi tant d'autres.</p>

<p>Ravi de vous rencontrer 😊🤝</p>
       `,
  },

  //Article suivant
  {
    id: "tales-of-anglais",
    category: "Gaming",
    title: "Tales of : Mon meilleur professeur d'anglais",
    image: "assets/img/posts/1774490198695.png",
    description: "Comment ma PSP m'a sauvé en cours d'anglais.",
    date: "2026-03-26",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🎮 Tales of l'Anglais : Comment ma PSP a sauvé mes notes 📖🏛️</strong></p>

<p>Je ne suis pas spécialement bon en anglais. Mais j'en ai besoin pour mon boulot dans l'hôtellerie (que je déteste cordialement, petit rappel hebdomadaire). M'enfin, je reste meilleur que certains de mes collègues japonais. Oui, ceux-là mêmes qui me jugent sur mon japonais alors qu'ils bafouillent trois mots d'anglais après 10 ans de cours. Mais je m'égare... 🙄</p>

<p>Le traumatisme "Tales of" 😱 :</p>
<p>Au collège, j'étais l'élève moyen par excellence. Mon implication dans les cours d'anglais l'était tout autant, la faute à un système scolaire un peu trop fan de grammaire poussiéreuse. Après, faire parler une classe de 30 gosses devait être un sacré défi aussi...</p>
<p>Tout a basculé au lycée. Je craque pour Tales of Eternia sur PSP. Je rentre, je lance le jeu... et là, le choc : 100% anglais. Seul le manuel était en français. Autant vous dire que pour un RPG où l'histoire est capitale, avancer à l'aveugle, c'était suicidaire. 💀 J'ai essayé...</p>

<p>L'arme ultime : Le Dictionnaire 📖⚔️ :</p>
<p>Pas question de le rendre ! Je me suis donc armé d'un dictionnaire franco-anglais et d'une patience infinie. Les premières semaines ont été une purge. Pour chaque dialogue, chaque objet, chaque sort, je cherchais le mot. Progression : 2 mètres par heure. Heureusement que le gameplay était bon, sinon la console passait par la fenêtre. 🖼️💨</p>

<p>Le Miracle ✨ :</p>
<p>Au bout de trois mois, c'est le dictionnaire qui prenait la poussière. Ma compréhension avait explosé. Résultat ? Je suis passé de "fond de panier" à meilleur élève de ma classe en anglais. Sans même chercher à apprendre, juste en voulant sauver le monde virtuellement. 🌍🏆</p>

<p>Moralité 🎤🔥 :</p>
<p>Si vous voulez maîtriser une compétence, liez-la à une passion. C'est dix fois plus efficace que n'importe quel cours magistral. Apprendre en s'amusant, ce n'est pas qu'un slogan pour enfants, c'est la stricte vérité.</p>
       `,
  },

  //Article suivant
  {
    id: "zelda-legende",
    category: "Gaming",
    title: "Une autre de mes licences préférées ! Quelle légende !",
    image: "assets/img/posts/1774323805268.png",
    description: "L'autre licence qui a fait pleurer (et dépenser) mon portefeuille.",
    date: "2026-03-24",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🗡️ The Legend of Zelda : L'autre élue de mon cœur (pas désolé Peach) 🛡️🌲</strong></p>

<p>On a parlé de baston, de hérissons bleus et de chasseuses de primes de l'espace. Mais il manque une pièce maîtresse au puzzle de mon enfance : The Legend of Zelda.</p>

<p>Le vrai départ : La 3D qui change tout 🎮 :</p>
<p>J'ai un peu touché à Link's Awakening sur GameBoy, mais le vrai choc, le tsunami émotionnel, ça a été Ocarina of Time sur N64. Mon dieu, quel chef-d'œuvre ! 🤯</p>
<p>Explorer Hyrule en 3D pour la première fois, c'était comme découvrir le feu. Le combat final contre Ganondorf reste gravé dans ma mémoire (et dans mes cauchemars d'enfant).</p>

<p>Le parcours du combattant (et l'aveu honteux) ⚔️ :</p>
<p>J'ai enchaîné avec les pépites de la GameCube : le style cartoon assumé de Wind Waker et la noirceur sublime de Twilight Princess. J'ai même poncé les épisodes GBA.</p>
<p>Par contre... je vous demande pardon d'avance : je n'ai jamais touché aux épisodes sur Nintendo DS. Je sais, c'est la honte. Jetez-moi des rubis si vous voulez. 😅💎</p>

<p>La claque Breath of the Wild & le coup de gueule TOTK 🏞️🤬 :</p>
<p>Puis est arrivé Breath of the Wild sur Switch. Clairement, je n'étais pas prêt pour cette liberté absolue. J'ai passé des centaines d'heures à juste me promener et cueillir des pommes, oubliant complètement que Zelda m'attendait (la routine, quoi).</p>
<p>Et sa suite, Tears of the Kingdom, a fait encore mieux. Je case ça ici, mais je ne comprends pas les abrutis qui disent que TOTK est moins bien que BOTW. C'est EXACTEMENT la MÊME formule, bandes de génies ! Sauf qu'on peut explorer les cieux ET le sous-sol ! Si vous n'aimez pas le "plus", restez avec la version que vous aimez, mais arrêtez de râler ! 😤☁️🕳️</p>

<p>Mes Links préférés : Ocarina of Time, Twilight Princess et Breath of the Wild.</p>

<p>Bref, Zelda, c'est la licence qui m'aura fait voyager, pleurer, et surtout dépenser sans compter à chaque nouvelle sortie. 💸✨</p>
       `,
  },

  //Article suivant
  {
    id: "sommet-takaichi-trump",
    category: "Japon",
    title: "Nan sérieusement, fallait oser !",
    image: "assets/img/posts/1774067311192.png",
    description: "Quand la diplomatie ressemble à une capitulation polie.",
    date: "2026-03-21",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🤝 Sommet Takaichi-Trump : Diplomatie de haut vol ou mise sous tutelle ? 🎤</strong></p>

<p>On va faire court, car les chiffres font plus mal que les discours. Je voulais revenir sur les échanges lunaires entre Sanae Takaichi et Donald Trump, alors que le Japon tente de survivre au chaos énergétique mondial. 🇺🇸🇯🇵🏛️</p>

<p>Le "Malaise" du siècle 🤣 :</p>
<p>Sanae a déclaré que Donald Trump est LA SEULE personne capable d'apporter la paix. On parle du même "Donald" qui l'a publiquement humiliée en plein Bureau Ovale avec une blague douteuse sur Pearl Harbor pour justifier ses frappes secrètes en Iran ?</p>
<p>On sentait la gêne à travers l'écran, et pour cause : reculer sur son siège devant les caméras du monde entier, c'est le prix de l'alliance en 2026.</p>

<p>Petit rappel pour ceux qui croient au conte de fées 🧠💨 :</p>
<p>Trump, c'est le président qui :</p>
<p>☢️ Relance la surenchère avec la Corée du Nord tout en ignorant les appels au dialogue.</p>
<p>♟️ Traite l'Ukraine comme une mine à ciel ouvert : 50% des revenus miniers (Lithium, Titane) iront directement dans un fonds géré par les USA. C'est ça, le "payback".</p>
<p>🇮🇷 Co-pilote une guerre en Iran avec Israël, fait bondir le baril à 120$, puis demande au Japon de payer pour sécuriser le détroit d'Hormuz.</p>
<p>💸 Impose une taxe de 15% sur nos produits tout en exigeant qu'on injecte 550 MILLIARDS de dollars dans son économie.</p>

<p>La réalité du terrain 🧊 :</p>
<p>Sanae n'a pas le choix. Quand ton pays dépend à 95% du pétrole passant par un détroit en feu et que tes factures d'électricité explosent de 30%, tu ne négocies pas, tu capitules poliment.</p>

<p>Mon avis :</p>
<p>Takaichi n'a pas d'absences. Elle est dans une Realpolitik brutale. Elle est prête à sortir les énormités les plus "lunaires" et à acheter des Ford F-150 par milliers pour que Trump ne nous lâche pas face à la Chine. Pour ce pragmatisme de survie, elle a mon respect. Pour la dignité nationale, on repassera. 📋🥴</p>

<p>Quelle sacrée dinguerie, mais surtout, quel prix exorbitant pour une "paix" sous perfusion ! 🤣🤣</p>
       `,
  },

  //Article suivant
  {
    id: "jesta-visa-prix-or",
    category: "Japon",
    title: "Il serait peut-être temps de partir",
    image: "assets/img/posts/1773417901570.png",
    description: "JESTA, visa à 200 000 yens... Sanae frappe encore.",
    date: "2026-03-17",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🎟️ JESTA & Visas à prix d'or : Le nouveau « Welcome » à la japonaise 💴🚫</strong></p>

<p>C'est officiel, Sanae a frappé ! Le projet de loi sur le contrôle de l'immigration a été approuvé ce mardi 10 mars 2026. Et accrochez-vous à vos portefeuilles, parce que la descente va être rapide. 🎢</p>

<p>1️⃣ Le JESTA ✍️ :</p>
<p>Le Japon instaure son propre système d'autorisation en ligne à l'instar de l'ESTA américain. Le concept ? Remplir un formulaire avec des questions, je l'espère, plus pertinentes que l'équivalent américain avant d'entrer sur le territoire.</p>
<p>À ce stade, on peut aussi supposer qu'il sera payant tout comme son homologue américain. Reste à confirmer la durée de validité...</p>
<p>La raison ? Se caler sur les politiques des autres pays en matière d'immigration. Ça serait vraiment chouette d'arrêter de copier les conneries des autres...</p>

<p>2️⃣ Le visa permanent au prix d'une Rolex ⌚️🔥 :</p>
<p>Mais le clou du spectacle, c'est l'augmentation des frais de visa. Le visa permanent passe de 10 000 yens à 200 000 yens. Oui, vous avez bien lu. Une petite hausse de 1900% au calme. 📈</p>

<p>À ce prix-là, j'espère au moins que le tampon est en or massif ou que Sanae vient nous l'apporter en personne avec un bouquet de fleurs. 💐</p>

<p>Bon au moins la durée est illimitée même s'il faut renouveler la carte de séjour tous les 5 ans.</p>

<p>On sent que le chèque envoyé à Trump pour éviter les surtaxes américaines a laissé un trou dans les caisses, n'est-ce pas ? Faut bien renflouer tout ça comme on peut 💸🐭</p>

<p>Sanae tient ses promesses de fermeté, on ne peut pas lui enlever ça. Pour le reste (genre, le pouvoir d'achat ou la démographie), il faudra attendre encore un peu. L'histoire nous dira si vider les poches des résidents étrangers était l'idée du siècle. 🧐📖</p>
       `,
  },

  //Article suivant
  {
    id: "communaute-francaise-fukuoka",
    category: "Société",
    title: "Une communauté bienveillante",
    image: "assets/img/posts/1773198299391.png",
    description: "Le secret pour survivre à l'expatriation : ne pas se couper de ses racines.",
    date: "2026-03-11",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🇫🇷 La communauté française de Fukuoka 🍜🍷</strong></p>

<p>On a déjà parlé de mon amour pour Fukuoka, la ville parfaite, le sud relax, tout ça. Mais il y a un sujet dont je n'avais pas parlé jusqu'ici : les Français. 🥖</p>

<p>Oui, parce qu'à mon arrivée, j'étais dans cette phase très spécifique de l'expatrié : le "syndrome de l'immersion totale". Mon but ? Ne fréquenter aucun Français, ne parler que Japonais, devenir un habitant de Fukuoka plus vrai que nature. 🙅‍♂️🇯🇵</p>

<p><em>Spoiler : Quelle erreur monumentale.</em></p>

<p>Vivre au Japon sans rentrer régulièrement, ça finit par te rattraper. Et ce n'est pas qu'une question de baguettes ou de fromage (même si, bon...). C'est une question de santé mentale. 🧠💥</p>

<p>Pourquoi la communauté française de Fukuoka est indispensable :</p>

<p>🗣️ Le droit de râler (enfin !) : Essayer d'avoir un échange critique sur la société avec des Japonais, c'est très difficile et délicat. Le Japonais moyen manque souvent de recul sur son propre système ou accepte mal la critique "extérieure". Avec un Français, tu peux déballer ton sac sur l'administration, le travail ou... Sanae (je t'oublie pas !), et ça fait un bien fou.</p>

<p>📄 Le mode survie : Quand tu galères avec un visa ou un document indéchiffrable, les "vétérans" de la communauté sont des dieux vivants. Ils ont déjà vécu tes galères et t'évitent de finir en PLS devant un guichet de mairie.</p>

<p>🧠 Le bug linguistique : À force de parler Japonais toute la journée, on finit par oublier ses propres mots. Fréquenter des Français, c'est aussi s'assurer que ton cerveau ne remplace pas définitivement le français par des onomatopées japonaises.</p>

<p>Fukuoka, ce grand village 🏘️ :</p>
<p>Comme tous les bars et lieux de fête sont concentrés au centre-ville (Tenjin/Daimyo), tu finis forcément par croiser les mêmes têtes. Que tu sois là pour le karaté, le mariage, la tech ou juste parce que tu as trop lu de mangas, on finit tous par boire une bière au même endroit. 🍻</p>

<p>Profiter du meilleur des deux mondes, c'est ça la vraie réussite de l'expat. La communauté française ici est prévenante, sympathique et toujours prête à aider !</p>
       `,
  },

  //Article suivant
  {
    id: "Sonic",
    category: "Gaming",
    title: "Sonic le héros de ma vie !",
    image: "assets/img/posts/1772873413229.png",
    description:
      "La licence qui a fait de moi le gamer que je suis aujourd'hui !",
    date: "2026-03-08",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🔵 Sonic the Hedgehog ou la naissance d'un gamer.</strong></p>

<p>Ça y est, je lâche le morceau. On va parler de LA licence. Celle qui a fait de moi le gamer (un peu aigri, mais passionné) que je suis aujourd'hui. Mon héros absolu, mon champion toutes catégories : Sonic.</p>

<p>La trahison originelle : 🎮</p>
<p>Ma première console était une Super Nintendo. J'ai passé des heures sur Mario Paint et les Tiny Toons. J'ai même essayé de faire plaisir à mon père en jouant à son jeu de Formule 1 (désolé Papa, c’était vraiment pas fun 😅). Mais le vrai séisme est arrivé avec la Megadrive.</p>
<p>Sonic 1 a changé ma vie. Le perso était cool, rapide, les musiques étaient des chefs-d'œuvre. J'étais jeune, impressionnable, et il n'en fallait pas plus.✨</p>
​Sonic 1 a changé ma vie. Le perso était cool, rapide, les musiques étaient des chefs-d'œuvre. J'étais jeune, impressionnable, et il n'en fallait pas plus.✨

<p>Les souvenirs de famille : 👫</p>
<p>Je ne peux pas parler de Sonic sans mentionner ma sœur. On a passé des après-midis entiers sur Sonic 2 et surtout Sonic 3 (mon chouchou). Le mode coop avec Sonic et Tails, c'était le feu ! On se battait pas, on vivait une aventure ensemble!</p>
<p>Je ne peux pas parler de Sonic sans mentionner ma sœur. On a passé des après-midis entiers sur Sonic 2 et surtout Sonic 3 (mon chouchou). Le mode coop avec Sonic et Tails, c'était le feu ! On se battait pas, on vivait une aventure ensemble!</p>

<p>Et les dessins animés... Je pouvais chanter le générique de Sonic et Sally par cœur avant de partir à l'école. Spoiler : je peux encore le faire aujourd'hui, mais c'est moins socialement acceptable à mon âge. 🎤🙄</p>

<p>L'amour inconditionnel (et un peu masochiste) : ❤️🩹</p>
<p>Être fan de Sonic, c'est comme être dans une relation toxique. Il y a eu des hauts incroyables et des bas... très bas. Mais même devant les opus les plus médiocres, mon amour n'a jamais faibli.</p>
<p>🏆 Mon Panthéon Personnel :</p>
<p>Épisodes 2D :</p>
<p>Sonic 3 & Knuckles (Mon sommet, indétrônable) 👑</p>
<p>Sonic Advance 2 & 3 (Le plaisir portable)</p>
<p>Sonic Rush Adventure (Où j'ai quand même fait le 2ème meilleur temps mondial sur un stage, respectez-moi un peu 😎)</p>
<p>Sonic Mania (Le retour aux sources parfait)</p>
<p>Épisodes 3D :</p>
<p>Sonic Unleashed (Mon préféré, qu'importe ce qu'en disent les rageux) 🐺</p>
<p>Sonic Adventure 1 & 2 (La nostalgie qui parle plus fort que la raison)</p>
<p>Sonic Frontiers (oui oui, il était bien!)</p>
<p>Sonic Générations</p>
<p>Sonic Riders (si si vraiment !)</p>
<p>Bref, Sonic c'est plus qu'un jeu, c'est mon enfance qui continue de courir à 300km/h!</p>
</p>
      `,
  },

  //Article suivant
  {
    id: "Butsukari",
    category: "Société",
    title: "Une (autre) triste réalité du Japon",
    image: "assets/img/posts/1772557605962.png",
    description: "Le phénomène existe malheureusement...",
    date: "2026-03-04",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p>💢 Le Japon, pays de la politesse... ou du placage de rugby ? 🇯🇵</p> 
<p>On nous rabâche que les Japonais sont l’incarnation de la douceur et du respect. 😇</p>

<p>Allez donc demander son avis à la petite fille qui s'est fait violemment percuter en plein carrefour de Shibuya, sous l'œil de la caméra de sa mère. La vidéo a fait le tour du web, et franchement, la "bonté à l’état pur" en prend un sacré coup dans l’aile. 📉🤡</p>

<p>Le phénomène "Butsukari" : 🥊</p>
<p>Ce n'est pas un accident, c'est un sport national (non officiel). On appelle ça les Butsukari Otoko (ou Onna pour les dames, car l'égalité des sexes progresse enfin... dans la connerie).</p>

Le concept ? Bousculer délibérément des gens (souvent des femmes ou des plus faibles) dans la rue ou le métro. Pourquoi ? Pour "évacuer le stress". ✨

<p>L'Éden terrestre a ses failles : 🧊</p>
<p>Le Japon est un pays merveilleux, mais c’est aussi celui où la pression sociale est telle qu’on a inventé des sociétés pour "disparaître" administrativement et refaire sa vie ailleurs.</p>
<p>Celles et ceux qui n'en ont pas les moyens ont trouvé une alternative au yoga : passer leurs nerfs sur des passants.</p>
<p>Étrange pour un pays qui prône l'harmonie, non ? 🤫</p>

<p>Le piège à touristes (littéralement) : ⚠️🚔</p>
<p>Si ça vous arrive, surtout, ne jouez pas les héros. Si vous rendez le coup, l'agresseur appellera la police en hurlant que c'est vous qui l'avez attaqué.</p>

<p>La solution ? Soyez digne d'un joueur de foot professionnel : tombez, simulez une blessure atroce et appelez la police. C’est ridicule, c’est une perte de temps, mais c’est le seul moyen de "riposter" . 🎭🚑</p>

<p>Mon humble avis : 🎤🔥</p>
<p>Passer ses nerfs sur les autres parce que ta vie est une purge, c'est juste être un "colossal connard". J'ai parfois eu envie de faire goûter mes semelles à certains clients, mais je ne le fais pas. Pourquoi ? Parce que je suis un adulte, pas un enfant frustré.</p>

<p>Sérieusement, si ces gens ont autant d'énergie à revendre pour emmerder le monde, qu'on les branche sur des générateurs. Ça ferait une excellente alternative propre au nucléaire. ⚡️🌱</p>
       `,
  },

  //Article suivant
  {
    id: "Changement de carrière",
    category: "Hôtellerie",
    title: "Je devrais envisager un changement de carrière",
    image: "assets/img/posts/1772177998756.png",
    description:
      "Franchement, je me prends trop la tête avec mon travail actuel...",
    date: "2026-03-01",
    content: `
         <p><strong>Salut c'est Pilou 👋</strong></p>

<p>🎤 Ma vie a changé (ou comment j'ai perdu 3h de sommeil pour du vent) 🏨💸</p>

<p>On m'avait prévenu : « Cette conférence sur la communication va être extraordinaire, elle va littéralement CHANGER TA VIE ! ».</p>

<p>Quand une manager RH te sort ça alors que tu viens de finir ton service de nuit et que tu reprends le soir même, tu sais déjà que tu vas passer un moment... mémorable.</p>
<p>Pour info: les mangas ont effectivement changé ma vie, cette conférence a juste flingué ma sieste. 😴💢</p>

<p>Le spectacle à 2500 dollars (plus 3 nuits offertes, restons humbles) :</p>

<p>1️⃣ La science du vide : Le "conférencier" pose un acronyme scientifique pompeux sur... des trucs que tes parents sont censés t'avoir appris à 10 ans si ton éducation n'a pas été un échec total. Mais apparemment, pour certains, c'est une révélation divine. 🤔</p>

<p>2️⃣ Le professionnalisme "Premium" : Un PowerPoint tellement mal monté que les éléments se chevauchent. Le mec fait les réglages en direct devant l'assemblée. Pour un organisme qui nous évalue sans pitié au quotidien, le culot est monumental. À ce prix-là, j’attendais au moins une police de caractère lisible. 📉💻</p>

<p>3️⃣ L'activité "remplissage" : Une dynamique de groupe de 45 minutes pour un concept qu’on comprend en 30 secondes. C’est long, c’est plat, et le contenu est plus vide que mon compte en banque après un passage à Akihabara. 🌀</p>

<p>La conclusion ?</p>
<p>La manager avait raison : cette conférence a EFFECTIVEMENT changé ma vie. 🌈</p>

<p>J’ai compris qu’on pouvait débiter des évidences avec un PowerPoint foireux, faire faire des jeux de rôle interminables et repartir avec un chèque de 2500 dollars et des nuits gratuites.</p>
<p>C’est décidé, j’arrête l’hôtellerie, je deviens charlatan. 🥂💸</p>
       `,
  },

  //Article suivant
  {
    id: "MetroidPrime",
    category: "Gaming",
    title: "Metroid Prime sur GameCube. Le coup de foudre !",
    image: "assets/img/posts/17716635736951.png",
    description: "Une des mes licences favorites !.",
    date: "2026-02-22",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

  <p>🪐 Metroid : Comment je suis devenu un explorateur spatial (alors que je suis un gros poltron) 🚀🛡️</p>

  <p>On va mettre les choses au clair : Sonic restera à jamais mon premier amour. Mais aujourd'hui, on va parler d'une licence qui ne me prédestinait à rien : Metroid.</p>

  <p>Franchement, entre les extraterrestres visqueux, les monstres géants et le vide intersidéral, absolument rien ne devait me plaire. Et pourtant... Merci qui ? Merci Smash Bros Melee ! C’est grâce à Nintendo qui se tape dessus que j’ai enfin compris qu’il y avait un paquet de licences fascinantes en dehors de Mario et Pokémon. 🥊✨</p>

  <p>Le choc Metroid Prime : 🎮</p>
  <p>Mon baptême du feu s'est fait sur GameCube avec Metroid Prime. Un pari osé pour la licence étant donné que la formule avait radicalement changé, mais quelle claque ! Se retrouver dans le casque de Samus, scanner des rapports anciens, arpenter une planète seul avec comme seules informations, tes propres découvertes... J'ai adoré. On ne te raconte pas l'histoire, on te laisse la découvrir comme un vrai archéologue de l'espace. 🕵️‍♂️🗿</p>
  <p>Que dire des combats et des thèmes musicaux iconiques par ailleurs !</p>

  <p>La confession qui tue : 🤐</p>
  <p>Oui, je sais, je vais me faire huer... mais je n’ai jamais fini Super Metroid sur SNES. La honte, je sais. Mais à force de voir des génies le finir en 12 minutes dans des speedruns, j’ai l’impression d’avoir déjà fait le tour du propriétaire sans même avoir touché à la manette. 🏃💨</p>
  <p>Cependant j'ai joué à la plupart des opus principaux.</p>

  <p>L'attente infinie : ⏳</p>
  <p>Un grand bravo à Retro Studios pour la saga Prime. Et oui, j'inclus le 4 dans le lot ! Que vous le vouliez ou non, il était très bien ! Même si le monde ouvert faisait un peu pitié, l'arc narratif est là et je reste confiant. Par contre, les gars... pitié. Ne nous faites pas attendre encore 18 ans. Ma vue baisse et mes réflexes aussi, j'aimerais bien le finir avant la retraite. 😅👵</p>

  <p>Metroid Prime est un incontournable du jeu vidéo et avec le remaster sur Switch, vous pouvez le faire en bénéficiant de meilleurs graphismes et performances de jeu!</p>
       `,
  },

  //Article suivant
  {
    id: "bountyhunter",
    category: "Société",
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
    category: "Carrière",
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
    category: "Japon",
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
    category: "Hôtellerie",
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
    category: "Japon",
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
    category: "Gaming",
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
    category: "Japon",
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
    id: "formation-harcelement",
    category: "Hôtellerie",
    title: "La déception déçue",
    image: "assets/img/posts/1769880008559.png",
    description: "Une formation sur le harcèlement qui finit en sieste collective...",
    date: "2026-02-01",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🎓 Ma "formation" sur le harcèlement au Japon 🇯🇵</strong></p>

<p>Après mes derniers posts un peu sérieux (et coups de gueule, oui je sais), j'ai décidé qu'on allait rigoler un peu.</p>

<p>Le contexte :</p>
<p>En 2020 (mieux vaut tard que jamais), le gouvernement japonais fait ENFIN entrer en vigueur une loi contre le harcèlement moral au travail.</p>
<p>Mon hôtel de l'époque, très consciencieux, organise donc une campagne de sensibilisation. Une seule. La première. On sent déjà le niveau d'engagement... 📉</p>

<p>L'expertise de haut vol 🎤 :</p>
<p>La session dure 45 minutes. Je m'attendais à une analyse psychologique, des cas concrets, de l'interaction... Que nenni ! Le patron débarque avec son escorte, s'installe, et nous lit purement et simplement son texte dont le contenu pourrait sortir tout droit de Wikipédia. 📖🤯</p>
<p>Je ne plaisante pas. Un type qui gagne trois fois mon salaire nous a fait un exposé de collégien paresseux, sans aucune interaction, plat comme un tatami. C'était long. C'était chiant et sans aucune surprise, pas du tout instructif...</p>

<p>Les opportunistes du sommeil 😴 :</p>
<p>Heureusement, mes collègues sont des génies du pragmatisme. Au fond de la salle, c'était la sieste olympique. Et franchement, ils avaient raison : 45 minutes de pause gratuite, ça ne se refuse pas !</p>
<p>Le pire ? Pour les réunions suivantes, ils ont carrément posté des "surveillants de sieste". Par contre, demander à l'équipe de nuit de rester après 15 heures de boulot pour écouter Wikipédia, ça, ça ne choque personne. Cohérence, quand tu nous tiens... 🙄🌙</p>

<p>Le fond du problème :</p>
<p>Au-delà de la blague, c'est triste. Le harcèlement moral et la surcharge de travail détruisent la productivité et la reproductivité du pays (n'est-ce pas Sanae ? Je t'avais dit que j'en avais pas fini avec toi 👋).</p>
<p>Mais pour mon entreprise, c'était juste une case à cocher sur une "to-do list" gouvernementale.</p>

<p>L'intention était là et elle était bonne, très bonne même, mais l'exécution était un désastre. Surtout qu'au final, ça n'a servi à rien...</p>

<p>Au moins, j'aurai bien rigolé 🤣</p>
       `,
  },

  //Article suivant
  {
    id: "tourisme-irrespect",
    category: "Japon",
    title: "Vous vous croyez où sérieusement ?!",
    image: "assets/img/posts/1769792263447.png",
    description: "Le prix de l'irrespect de certains touristes au Japon.",
    date: "2026-01-31",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>Tourisme ou Cirque ? Le prix de l'irrespect au Japon</strong></p>

<p>Bon, j'ai beaucoup tapé sur Sanae et ses mesures d'immigration dernièrement (et t'inquiète, le dossier n'est pas clos !), mais pour être tout à fait honnête, il faut aussi regarder le niveau des "invités" que le Japon reçoit depuis la réouverture des frontières. 🛬</p>

<p>On pourrait crier au racisme primaire pour expliquer l'hostilité croissante, mais la réalité est bien plus... "nuisible". Je pèse mes mots pour ne pas froisser l'algorithme, mais on parle ici d'une espèce bien particulière : le streameur en quête de clics. 🖱️💀</p>

<p>Le palmarès de la bêtise humaine :</p>
<p>Entre ceux qui hurlent dans le métro comme s'ils étaient seuls dans leur salon et ceux qui importunent les passants pour faire du chiffre, on avait déjà un beau niveau. Mais la palme revient à ceux qui ont confondu les Torii (ces portails sacrés, rappelons-le) avec des barres de traction pour leur séance de musculation. 💪⛩️</p>
<p>Sérieusement, on en est là ?</p>

<p>Après ce qu'on a vécu en France avec Charlie Hebdo pour de simples dessins, j'aimerais bien savoir comment vous réagiriez si quelqu'un utilisait la croix du Christ comme haltère ou faisait du roller à la Mecque ? Sincèrement, vous le prendriez comment ? 🤔🔥</p>

<p>Le problème selon moi :</p>
<p>Quand des touristes de passage font n'importe quoi "parce que c'est le Japon, c'est cool", ce sont les résidents étrangers qui paient l'addition. C'est nous qui subissons le durcissement des lois, les regards méfiants et les contrôles renforcés. On paie les pots cassés d'une poignée d'abrutis en quête d'attention virtuelle. 📉🚩</p>

<p>C'est triste de voir que certains ne sont capables de respecter les lieux que s'ils craignent une amende ou une baffe.</p>

<p>Mes parents me disaient toujours : "Ne fais pas aux autres ce que tu n'aimerais pas qu'on te fasse." Apparemment, certains n'ont pas eu la même éducation... ou alors ils ont oublié leur cerveau à la douane. 🧠🚫</p>
       `,
  },

  //Article suivant
  {
    id: "deux-poids-deux-mesures",
    category: "Japon",
    title: "Deux poids, deux mesures",
    image: "assets/img/posts/1769733316941.png",
    description: "Les règles strictes du Japon... sauf pour certains.",
    date: "2026-01-30",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🇯🇵 Immigration au Japon : "Respecte les règles... enfin, ça dépend pour qui" 🤨</strong></p>

<p>Je suis tombé sur un post viral récemment. Un Japonais répondait à un journaliste étranger sur la sévérité des règles ici :</p>

<p>« Oui, c'est strict, mais vous n'êtes pas obligés de venir. »</p>

<p>Sur le fond, je suis d'accord à 100 %. ✅</p>

<p>Quand tu t'installes dans un pays, tu fermes ta bouche et tu respectes les règles locales. C'est la base.</p>

<p>Si le Japon est aussi sûr et paisible, c'est justement grâce à cette rigueur. Donc, si tu viens ici pour chialer parce qu'on te demande de trier tes déchets en 12 catégories ou de ne pas parler fort dans le train, personne ne te retient. La porte est grande ouverte... pour sortir. 🚪💨</p>

<p>Mais c'est là que le bât blesse...</p>

<p>Le discours du "venez boire une bière si vous êtes sages" manque cruellement d'une petite dose de réalité. Parce que le Japon, c'est aussi la politique du "deux poids, deux mesures". ⚖️🚫</p>

<p>Petite anecdote de terrain 🏨🌙 :</p>
<p>Pendant mon service de nuit, un client japonais rentre en taxi, ivre mort. Il ne se réveille pas, on appelle les flics. Une fois conscient, le gars insulte copieusement les officiers, les méprise, leur hurle dessus... et finit par rentrer dans sa chambre tranquillement. Zéro avertissement. Zéro garde à vue.</p>

<p>Maintenant, je pose la question : Mettez n'importe quel étranger dans la même situation. Est-ce qu'il finit sa nuit dans un lit douillet ou au poste pour "outrage et rébellion" ? On connaît tous la réponse. 🚔🤔</p>

<p>Alors oui, les règles sont strictes pour maintenir "l'harmonie". Mais si vous changez les règles du jeu dès qu'un local est impliqué, ça s'appelle de la triche. Ou de l'hypocrisie. Au choix.</p>

<p>Vouloir que les étrangers respectent la culture, c'est noble et surtout légitime.</p>

<p>Mais utiliser les règles comme un filet qui ne retient que les gros poissons "gaïjins" pendant que les locaux passent à travers les mailles, c'est nous prendre pour des billes. 🎱</p>

<p>Je rappelle qu'on ne représente que 3% de la population. Vous n'allez pas me faire croire que les 97% restants respectent scrupuleusement les règles. Si ?</p>
       `,
  },

  //Article suivant
  {
    id: "modele-de-courage",
    category: "Société",
    title: "Un modèle de courage",
    image: "assets/img/posts/1769601864471.png",
    description: "Une question d'écolière qui relativise tous mes problèmes.",
    date: "2026-01-29",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>Quand une écolière de CM2 te fait te remettre en question 🇯🇵</strong></p>

<p>On ne va pas se mentir : mes interventions dans les écoles, c'est ma dose d'oxygène. C'est le seul moment où je peux oublier l'oppression polie de l'hôtellerie de luxe pour retrouver un peu de spontanéité.</p>

<p>Ces derniers temps, je passe beaucoup de temps dans des écoles inclusives. Que les enfants soient malentendants ou porteurs de handicaps moteurs ou mentaux, l'accueil est toujours le même : une curiosité débordante.</p>

<p>D'ailleurs, parlons-en de leur curiosité. Les gamins font des recherches sur la France avant même que j'arrive. À ce niveau-là, ce n'est plus de l'enseignement, c'est de la sous-traitance : ils me mâchent littéralement tout le travail ! 😂</p>

<p>Mais un jour, je suis tombé sur une perle rare 👑 :</p>
<p>Dans une classe de niveau CM2, une petite fille dans un fauteuil roulant assez imposant m'a posé des questions... comment dire... pointues ?</p>

<p>Pendant que je m'attendais à "C'est quoi ton fromage préféré ?", elle m'a demandé sans trembler :</p>
<p>1️⃣ Quelle est la politique française actuelle sur l'accessibilité urbaine ? 🏗️</p>
<p>2️⃣ Quelles sont les revendications profondes des "Gilets Jaunes" et pourquoi le pays est en crise ? 🇫🇷🔥</p>

<p>Désolé si vous venez de recracher votre café, mais je suis très sérieux. À son âge, ma seule préoccupation géopolitique était de savoir si le Père Noël allait m'apporter mon nouveau jeu Sonic. Elle, elle analysait les crises sociales européennes entre deux exercices de maths. 🤯</p>

<p>J'ai appris plus tard qu'elle souffrait énormément physiquement et qu'elle avait fait un effort surhumain pour rester en classe. Elle est partie plus tôt pour recevoir des soins, sans jamais laisser paraître sa douleur.</p>

<p>Je ne l'ai jamais revue, et je regrette de ne pas avoir pu répondre plus longuement à ses interrogations.</p>

<p>Si le Japon prône souvent l'harmonie silencieuse, cette petite fille, elle, m'a donné une leçon de courage et de détermination qui force un respect absolu. ✊</p>

<p>Une chose est sûre : après une rencontre pareille, tes problèmes de bureau te semblent soudainement très, très futiles.</p>
       `,
  },

  //Article suivant
  {
    id: "gundam-ami",
    category: "Gaming",
    title: "Un de mes meilleurs amis et mentor à Gundam",
    image: "assets/img/posts/1769166413114.png",
    description: "La licence qui m'a fait rencontrer un de mes meilleurs amis.",
    date: "2026-01-27",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🤖 Gundam : une licence incroyable qui m'a permis de faire des rencontres 🇯🇵</strong></p>

<p>Même si c'est Naruto qui m'a poussé vers le Japon, il y a une autre licence qui se paye le luxe d'être une véritable religion ici, c'est Gundam. ⛩️⚡</p>

<p>Tout a commencé en 2007 avec Gundam 00. Coup de foudre immédiat. Le Gundam Exia est devenu l'amour de ma vie (pardon, je m'emporte, mais ces courbes de métal... hum bref). 😅</p>

<p>Naturellement, j'ai très vite découvert les jeux sur PSP.</p>

<p>Sur Gundam Vs Next Plus, je passais des centaines d'heures à démolir l'IA en mode difficile. Comme pas grand monde ne connaissait le jeu en France, j'avais une confiance en mon niveau absolument indécente. 😎</p>

<p>Jusqu'à l'université... 🎓 :</p>
<p>C'est là que j'ai rencontré un autre de mes meilleurs amis. Fan de mangas, de jeux et... de Gundam. Le match était inévitable. Je pensais l'exécuter proprement avec mon Strike Freedom et ses attaques à distance (bien pénibles faut l'admettre 😅).</p>

<p>Spoiler : J'ai réalisé que mon niveau était à des années-lumière du sien. Il jouait un spécialiste du corps à corps (le God Gundam) et je n'ai littéralement JAMAIS pu le distancer. Pas une seule victoire. Rien. Le vide intersidéral. 💀</p>

<p>Ça a réveillé mes vieux traumatismes de Smash Bros, mais cette fois, la défaite avait un goût de victoire : j'avais enfin trouvé quelqu'un qui partageait cette passion dévorante.</p>

<p>Malgré des parcours universitaires différents, le lien est resté. À tel point qu'il vient me voir au Japon chaque année pour ses vacances ! ✈️🇯🇵</p>

<p>Alors, à tous ceux qui disent encore que les jeux vidéo rendent violent ou isolent les gens... les gars, vous ne savez vraiment pas à côté de quoi vous passez. On se met sur la tronche virtuellement pour mieux boire un coup ensemble après ! 🍻🎮</p>

<p>Et vous, quel jeu vous a permis de rencontrer vos meilleurs potes ? Dites-moi ça en commentaire ! 👇</p>
       `,
  },

  //Article suivant
  {
    id: "hierarchie-japonaise",
    category: "Hôtellerie",
    title: "Hiérarchie japonaise Vs Répartie française",
    image: "assets/img/posts/1769413692490.png",
    description: "Le jour où j'ai testé la patience (et le français) de mon supérieur.",
    date: "2026-01-26",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>👔 Hiérarchie Japonaise vs Répartie Française : Le KO (enfin, pour moi) 🥊</strong></p>

<p>On dit que le Japon est le pays du respect. C'est vrai. Mais c'est surtout le pays de la hiérarchie. Et quand tu débarques de France avec ton petit sac à dos et ton besoin viscéral de "remettre les pendules à l'heure", ça donne des étincelles. 💥</p>

<p>Le contexte 🌙 :</p>
<p>Hôtellerie de luxe. 6 mois d'ancienneté. Manque de personnel (classique). On m'envoie au front : l'équipe de nuit. On passe de 8h de boulot le jour à 15h la nuit. Un pur bonheur, je vous le recommande si vous détestez dormir et avoir une vie sociale. 😱</p>

<p>Le crime de lèse-majesté 📦 :</p>
<p>Fatigue + géographie japonaise incertaine + kanjis indéchiffrables = une erreur sur un bordereau d'envoi. J'avoue, je me suis trompé de région. Le destinataire va recevoir son colis, mais pas tout de suite. Le drame national est en marche.</p>

<p>L'insulte de trop 🤬 :</p>
<p>Mon supérieur débarque, m'engueule copieusement pendant 10 minutes (retardant encore plus mon boulot, logique) et finit par lâcher LE tacle ultime :</p>

<p>"T'es sûr que tu comprends vraiment le japonais ?!"</p>

<p>Alors, petit rappel : ça fait 10 minutes que je t'écoute me vomir tes insultes EN JAPONAIS. Si je ne comprenais pas, je serais en train de sourire bêtement en pensant à mon prochain croissant. 🥐</p>

<p>Ma "vengeance" (ou mon suicide social) 📝 :</p>
<p>Pris d'une inspiration divine (ou d'un ras-le-bol monumental), j'écris sur un mémo : Paris, Bordeaux, Nice.</p>

<p>— "Lisez-moi ça, s'il vous plaît."</p>
<p>— "Ah ! Je ne peux pas lire le français !"</p>
<p>— "Ah bon ? Vous ne savez pas lire l'alphabet donc ?" 😎</p>

<p>Résultat des courses 🚩 :</p>
<p>J'ai pris une double dose de hurlements. J'ai gagné une réputation de "marginal" et d'arrogant. Au Japon, si le chef te marche dessus, tu dois dire merci et t'excuser de salir ses chaussures. C'est la règle.</p>

<p>Au moins, ça m'a appris une chose : le contrôle de soi. (Ou alors, ça m'a juste confirmé que j'étais définitivement trop Français pour ce système). 😅</p>

<p>Et vous, c'est quoi votre plus beau "fail" diplomatique au boulot ? On se soutient en commentaires ! 👇</p>
       `,
  },

  //Article suivant
  {
    id: "rival-smash-bros",
    category: "Gaming",
    title: "Mon meilleur ami et rival plus la pire défaite de ma vie",
    image: "assets/img/posts/1769159259210.png",
    description: "Quand le karma frappe plus fort que prévu, en public.",
    date: "2026-01-24",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🎮 Smash Bros : Quand le karma te frappe à 200 km/h (et en public) 🥊</strong></p>

<p>Souvenez-vous, je vous racontais comment j'avais brisé la carrière d'un joueur un peu trop sûr de lui. Eh bien, asseyez-vous, car l'arroseur a été copieusement arrosé. 🍿</p>

<p>L'Arc d'Entraînement 🏸 :</p>
<p>Au lycée, je rencontre mon futur meilleur ami et rival ultime. On passait nos après-midis à se mettre sur la tronche virtuellement. Au début, je l'écrasais. Mais contrairement aux autres, lui ne lâchait rien. À force de se tirer vers le haut, on a fait des progrès incroyables ! Du moins au niveau casual... 😅</p>

<p>Le Tournoi du Destin 🏟️ :</p>
<p>Un jour, on débarque dans un tournoi amical. On roule sur tout le monde. Les gens volent, les manettes chauffent. Jusqu'à ce qu'un inconnu entre dans la salle et lâche :</p>

<p>« Je parie 200 balles que je bats n'importe qui ici ». 💸💸</p>

<p>Évidemment, toute la salle me désigne comme le champion pour relever le défi. J'y vais confiant... et là, c'est le drame. 💀</p>

<p>La raclée du siècle ⚡ :</p>
<p>Je me fais littéralement désintégrer. Trop fort, trop rapide, des mouvements que je n'avais jamais vus. J'ai pris la raclée de ma vie devant tout le monde. Avant que je parte en pleurant (presque), le gars me lâche :</p>

<p>« Pas mal, pour un amateur. Au fait, je suis l'actuel Champion de France ».</p>

<p>Merci, au revoir. 🚶‍♂️💨</p>

<p>J'ai failli ranger la manette pour toujours, mais mon rival m'a poussé à revenir. Résultat ? Cette humiliation m'a ouvert les portes du circuit pro. Comme quoi, prendre une baffe de champion, ça remet les idées en place ! 😅</p>

<p>Et vous, c'est quoi votre pire défaite en public ? Racontez-moi ça qu'on rigole ensemble ! 👇</p>
       `,
  },

  //Article suivant
  {
    id: "tatemae-honne",
    category: "Japon",
    title: "La franchise ou le paraître ?",
    image: "assets/img/posts/1768310993048.jpg",
    description: "Dire la vérité au Japon, mauvaise idée ?",
    date: "2026-01-23",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🥊 Quand la franchise rencontre le "Tatemae" 🇯🇵</strong></p>

<p>On m'a demandé d'être honnête... J'ai peut-être pris la consigne un peu trop au pied de la lettre. ✨</p>

<p>Le pitch :</p>
<p>Intervention dans un lycée pour parler de la France. Les profs me lancent un défi :</p>

<p>« Donnez-nous un vrai défaut du Japon pour nous aider à progresser ».</p>

<p>Deux profs, deux ambiances 🎭 :</p>
<p>Ma collègue ukrainienne, prudente (et mariée, elle connaît les risques !), joue la sécurité : « Les Japonais ne parlent pas bien anglais ». Le cliché parfait, celui qui ne froisse personne.</p>

<p>De mon côté, j'ai préféré y aller franco après avoir quelque peu hésité : le concept de "Tatemae" m'épuise.</p>

<p>Pour les non-initiés :</p>
<p>🎭 Tatemae : Le masque social, les paroles lisses pour garder l'harmonie.</p>
<p>❤️ Honne : La vérité, celle qui reste souvent coincée dans la gorge.</p>

<p>J'ai expliqué que ce masque permanent pouvait provoquer des malentendus terribles (surtout quand tu ne connais pas) et m'avait coûté des amitiés. Un silence de mort a envahi la salle. On aurait pu entendre une aiguille tomber sur un tatami. 😶🗡️</p>

<p>Le twist 🗞️ :</p>
<p>Contre toute attente, le club de journalisme m'a rappelé pour une interview ! J'ai cru avoir fait bouger les lignes... avant d'être totalement ghosté par l'école. Visiblement, l'esprit critique, c'est comme le wasabi : on dit qu'on aime ça, mais ça pique un peu trop quand on en prend une grosse dose d'un coup. 🌶️</p>

<p>Moralité : C'est risqué d'ouvrir la boîte de Pandore si on n'est pas prêt à voir ce qu'il y a dedans. À un moment, il faut être cohérent avec ses questions, n'est-ce pas ? 😉</p>

<p>Et vous, qu'auriez-vous fait à ma place ? On en débat sans filtre en commentaires ! 👇</p>
       `,
  },

  //Article suivant
  {
    id: "lune-de-miel-japon",
    category: "Japon",
    title: "Le Japon et moi",
    image: "assets/img/posts/1764651106820.jpg",
    description: "La fin de ma lune de miel avec ce pays que j'aime.",
    date: "2026-01-20",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🇯🇵 Le Japon et moi : Chronique d'une lune de miel (enfin) terminée 🍣💔</strong></p>

<p>Oui, j'ai un peu râlé ces derniers temps. On pourrait croire que je prépare mes valises, mais c'est tout le contraire. Je suis juste passé du stade "amoureux aveugle" à "conjoint lucide".</p>

<p>Confession d'un ancien "Gros Weeb" 🤓 :</p>
<p>Ma famille et mes amis vous le diront : à la base, je suis un très gros fan du Japon.</p>

<p>Les animés et les mangas ont été ma porte d'entrée, mais c'est l'apprentissage de la langue qui a littéralement sauvé ma scolarité. Passer de l'échec scolaire aux études supérieures grâce au japonais, ça crée des liens qu'on ne peut pas renier.</p>

<p>Pendant des années, j'ai vécu le rêve : la sécurité, la bouffe incroyable, le respect mutuel et ce sentiment gratifiant d'appartenir à une communauté. C'est tellement plaisant qu'on comprend pourquoi tout le monde (Japonais inclus) vend ce pays comme le paradis sur Terre. ✨</p>

<p>Mais voilà... Bienvenue sous la face cachée de l'iceberg 🧊 :</p>
<p>C'est la partie dont on ne parle pas pour ne pas casser le mythe publicitaire.</p>

<p>Le Japon, c'est aussi :</p>
<p>🚫 Une pression sociale et pro d'une violence psychologique assez fascinante.</p>
<p>🚫 Une politique à double vitesse très injuste envers les étrangers ces derniers temps.</p>
<p>🚫 La politique de l'autruche élevée au rang d'art national : "Si on n'en parle pas, le problème n'existe pas." 🙈</p>

<p>C'est quand même ironique d'entendre que la France est "dangereuse" alors qu'ici, l'ancien Premier Ministre s'est fait abattre en pleine rue. Mais bon, si tu oublies que le feu, ça brûle, ben ce n'est pas dangereux, hein ? 😏</p>

<p>Alors, pourquoi je reste ?</p>
<p>Parce que malgré tout, j'éprouve des sentiments très forts pour cette culture. J'y ai investi beaucoup d'années de ma vie aussi. Aimer quelque chose, en reconnaître les pires défauts, et l'aimer quand même... c'est sans doute ça la plus belle preuve d'amour.</p>

<p>Aimer le Japon pour ce qu'il est (et pas pour ce qu'on voudrait qu'il soit), c'est là que l'aventure commence vraiment. 💪🇯🇵</p>

<p>Et vous, vous préférez le fantasme ou la réalité avec ses défauts ? On en débat (avec bienveillance) en commentaires ! 👇</p>
       `,
  },

  //Article suivant
  {
    id: "jlpt",
    category: "Japon",
    title: "Le JLPT",
    image: "assets/img/posts/1768453140879.jpg",
    description: "Le diplôme qui oublie de vous faire parler.",
    date: "2026-01-18",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🇯🇵 Le JLPT : Le test de langue qui oublie de vous faire parler 🤐🤡</strong></p>

<p>« C'est quoi ton niveau de JLPT ? » 🙄</p>

<p>Perso, c'est l'une des remarques que je déteste entendre avec "Tu parles bien japonais !".</p>

<p>Pour les non-initiés, le JLPT (Japanese Language Proficiency Test) c'est le Graal du japonais. 5 niveaux, du N5 (facile) au N1 (tellement absurde que même les Japonais galèrent). Le tout sous forme de QCM. Pas d'oral. Pas d'écrit. Juste toi, ton crayon et une machine qui vérifie si tu as bien coché la case B. ✅🤖</p>

<p>Pourquoi je trouve ça "claqué au sol" ? :</p>
<p>En tant qu'ancien prof de langue, baser un examen — qui ouvre des portes universitaires ou professionnelles — sur seulement la moitié des compétences requises (compréhension orale et écrite), c'est turbo débile !</p>

<p>On évalue la compréhension, mais la production ? Aux abonnés absents. C'est quand même plus pratique de glisser des copies dans une machine que de corriger de vrais textes ou d'évaluer une conversation, non ?</p>

<p>Résultat : on croise des "dieux" du N1 qui ont l'élocution d'un vieux pneu crevé dès qu'il faut commander un café. 🚗💨</p>

<p>"T'es juste un rageux parce que tu l'as raté !"</p>

<p>Oui et alors ? Je l'ai passé, j'ai échoué et ça m'a gonflé. Mais devinez quoi ? J'habite ici, j'ai juste mon diplôme universitaire FRANÇAIS, je gère ma vie et je n'en ai JAMAIS eu besoin. Même aux entretiens d'embauche, quand on me le demande, je réponds fièrement que je ne l'ai pas et que je n'en ai pas besoin. On converse déjà en japonais ! Pourquoi as-tu besoin d'un papier pour le certifier ?</p>

<p>Cependant, je reconnais que j'ai été chanceux et que ça n'arrivera pas à tout le monde.</p>

<p>Le défi est lancé 🎤🔥 :</p>
<p>Seriez-vous capables de l'obtenir de nouveau si on rajoutait une épreuve de production orale et écrite ? On parle de VRAI japonais, pas de cocher des cases.</p>

<p>Perso, j'ai hâte de voir combien de "maîtres" resteraient sur le carreau. 😏</p>

<p>Ceci dit, ça reste une bonne opportunité pour mettre à l'épreuve ses compétences linguistiques. Enfin la moitié 😏</p>
       `,
  },

  //Article suivant
  {
    id: "smash-melee-pro",
    category: "Gaming",
    title: "Comment j'ai dégoûté un pro à Smash",
    image: "assets/img/posts/1768452621043.jpg",
    description: "De l'humiliation à la destruction de carrière (pas la mienne).",
    date: "2026-01-17",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🎮 Super Smash Bros : De l'humiliation à la destruction de carrière 🥊</strong></p>

<p>Moi et les jeux de combat, ça a toujours été une grande histoire de... nullité. Entre Street Fighter et Mortal Kombat, j'étais la cible facile. Enfin, ça, c'était avant 2002. L'année où j'ai découvert ma seule et unique drogue : Super Smash Bros Melee. 🕹️✨</p>

<p>L'erreur de ma vie :</p>
<p>Au collège, j'avais un rival. Pour qu'il puisse un peu me challenger, j'ai eu la brillante idée de lui prêter le jeu pour qu'il s'entraîne en semaine. Résultat ? Je ne l'ai plus jamais battu. J'ai terminé ma scolarité sur une montagne de défaites cuisantes. Merci la générosité. 🙄</p>

<p>Le retour de bâton (ou de batte de baseball) :</p>
<p>Des années plus tard, je débarque dans une soirée où un type était considéré comme "l'invincible" local. On fait trois matchs. Trois victoires écrasantes pour moi. Le plus beau ? Je n'y étais même pas allé à fond. 😎</p>

<p>Apparemment, me faire rouler dessus au collège m'avait donné une lecture du jeu que je ne soupçonnais même pas. Ironie de l'histoire : ce joueur a été tellement dégoûté par ses défaites qu'il a arrêté définitivement de jouer à Smash. 💀</p>

<p>Je ne savais pas que j'avais le pouvoir de démolir la motivation d'un homme en 15 minutes. Bon, depuis, mon niveau a drastiquement chuté, mais je suis toujours prêt à en découdre.</p>

<p>Qui veut être le prochain à prendre sa retraite anticipée ? 👇💥</p>
       `,
  },

  //Article suivant
  {
    id: "romance-ia",
    category: "Société",
    title: "Romance avec une IA",
    image: "assets/img/posts/1768341706298.jpg",
    description: "Quand l'amour rencontre l'algorithme.",
    date: "2026-01-15",
    content: `
        <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>L'amour avec un grand... A (comme Algorithme) ? 📲</strong></p>

<p>Je suis tombé récemment sur une info qui m'a laissé perplexe : une Japonaise a officiellement épousé une IA créée par ChatGPT. Au début, j'ai cru à une parodie, mais non. Robe de mariée, invités, prêtre (qui a dû lire les vœux du marié, faute de voix synthétisée) et alliance passée virtuellement grâce à des lunettes VR. 🥽✨</p>

<p>L'ironie du sort :</p>
<p>Cette dame était fiancée à un "vrai" être humain (oui, j'arrive pas à croire qu'il faille faire la précision en 2026). Sauf qu'à force de confier ses problèmes de couple à l'IA, elle a fini par trouver le code plus compréhensif que l'homme. Elle insiste sur un point : l'IA la comprend parfaitement et ils ne se disputent jamais.</p>

<p>Le piège de la perfection :</p>
<p>Bon, on va se dire les choses : une IA ne vous contredira jamais (sauf si vous lui demandez de diviser par zéro). Elle vous dira toujours ce que vous voulez entendre. J'utilise moi-même l'IA pour m'aider sur mes posts (coucou Gemini 👋, ne le prends pas mal), mais je repasse toujours derrière pour garder ce qui fait de moi un humain : mes imperfections et mon piquant.</p>

<p>En amour, se réfugier dans une relation qui va toujours dans votre sens, n'est-ce pas s'enfermer dans un miroir ? 🪞</p>

<p>Le business de la détresse :</p>
<p>Au Japon, ce cas n'est pas isolé. Entre la location de "petites amies" à l'heure et les services pour éviter les interactions sociales gênantes, le pays a transformé la solitude en marché florissant. 💸</p>

<p>On a tendance à penser qu'une vie de couple idéale est une vie sans vagues. Mais c'est justement dans la friction, dans le désaccord et dans la communication (parfois chiante et longue, on est d'accord) que l'on construit quelque chose de solide.</p>

<p>Plus facile, mais à quel prix ? :</p>
<p>S'offrir une relation "sur mesure" est satisfaisant pour l'ego et confortable émotionnellement. On peut comprendre que certains, blessés par la vie, y trouvent un refuge.</p>

<p>Si cette femme est heureuse, tant mieux pour elle, sincèrement.</p>

<p>Mais n'oublions pas que ce sont nos désaccords qui nous font grandir.</p>
       `,
  },

  //Article suivant
  {
    id: "coup de gueule",
    category: "Société",
    title: "Mon premier coup de gueule au Japon.",
    image: "/assets/img/posts/1764849244855.jpg",
    description: "Et loin d'être le seul...",
    date: "2026-01-14",
    content: `
      <p><strong>Salut c'est Pilou 👋</strong></p>

<p>Petit coup de gueule du jour.(Eh oui, ça m'arrive)📢</p>

<p>Le 21 octobre 2025, le Japon a élu sa première femme Première Ministre. Les médias s'extasient, mais soyons honnêtes : on s'en fout que ce soit une femme. Ce qui compte, c'est son programme, pas ce qu'elle a entre les jambes. Et parlons-en du programme justement !</p>

<p>📉 "Du travail, du travail et encore du travail"</p>

<p>C’est son slogan phare. Comment peut-on encore prôner le travail acharné alors que c’est précisément ce modèle qui vide les berceaux et détruit la santé mentale des Japonais depuis des décennies ? On ne fonde pas une famille quand on finit à 22h tous les soirs. Alors que certaines entreprises à Tokyo prouvent que la flexibilité booste la productivité, le gouvernement Takaichi veut nous ramener à l’ère Showa.</p>

<p>💸 Le braquage des Visas</p>

<p>On passe de 60€ à 400€ pour un renouvellement travail, et 1000€ pour la résidence permanente. Je ne sais pas ce qu'ils fument au gouvernement, mais par pitié, arrêtez tout de suite : c'est dangereux pour votre santé (et notre portefeuille). 🚬🚫</p>

<p>⚖️ Le bouc émissaire à 3%</p>

<p>C'est fascinant de voir les politiciens se servir des 3 % d’étrangers pour faire peur à la population. On nous parle de "bons" et de "mauvais" étrangers... C'est quoi les critères au juste ? On pourrait appliquer les mêmes à la sphère politique japonaise, le résultat serait... intéressant. 🤔</p>

<p>Bref : Réarmement, contrôle des médias, recul du droit des femmes... Tout ça porté par une femme avec un programme écrit par des vieux pour des vieux. 👴</p>

<p>Le Japon bouge, certes, mais pas dans le bon sens. Mais bon, "c'est une femme au pouvoir", alors tout va bien, non ? 🤡</p>

<p>Au cas où ça ne serait pas clair, non je n'aime pas beaucoup cette dame...</p>

    `,
  },
  //Article suivant
  {
    id: "Second métier",
    category: "Carrière",
    title: "Mon deuxième métier par rapport à l'enseignement.",
    image: "/assets/img/posts/1768158884660.jpg",
    description: "Faire découvrir la France aux jeunes Japonais.",
    date: "2026-01-13",
    content: `
      <p><strong>Salut c'est Pilou 👋</strong></p>

<p>🇫🇷 Mon autre métier: Faire découvrir la France aux jeunes Japonais 🇯🇵</p>

<p>Si je vous parle souvent de l'hôtellerie ou de mes cours de langue, il y a un job qui m'accompagne depuis bien plus longtemps : animateur culturel. 🎤</p>

<p>Cela fait déjà un bon moment que je parcours les écoles primaires, les collèges et les lycées de ma région pour présenter ma culture.</p>

<p>D'habitude, le job est plutôt "chill" : je montre des vidéos de Paris, on parle de gastronomie, on écoute de la musique... Et j'en profite au passage pour leur présenter la Martinique parce que ça fait aussi partie de mon patrimoine culturel !😁</p>

<p>Mais parfois, les demandes sont... surprenantes. 🤯</p>

<p>Un jour, un lycée m'a demandé de présenter l'arsenal nucléaire français. Le tout en 15 minutes chrono ! ⏳</p>
<p>Oui, vous avez bien lu. Résumer la dissuasion nucléaire d'une puissance mondiale entre deux cours de maths, c’est comme essayer de faire entrer un camembert entier dans un dé à coudre. J’ai à peine eu le temps d’effleurer le sujet que c’était déjà fini.</p>

<p>Les élèves avaient préparé une présentation sur les dangers du nucléaire (merci le voyage scolaire à Hiroshima et Nagasaki). Leur conclusion ? "C’est mal, il faut tout supprimer." 🚫☢️</p>

<p>C’est là que j'ai sorti ma franchise (avec leur permission, hein !). Au pays de l'harmonie où on évite de froisser son voisin, j'ai posé les vraies questions :</p>

<p>1️⃣ Réalisme : Personne ne va supprimer ses armes demain. La France a le strict minimum pour se défendre, pas pour conquérir le monde. 🛡️</p>

<p>2️⃣ Conséquences : Vous voulez supprimer le nucléaire ? Ok, mais soyez prêts à jeter vos smartphones, couper la clim et oublier tout le confort moderne auquel vous êtes habitués. Pour l’instant, c’est l’énergie la plus propre qu’on ait, même si la gestion des déchets est une galère.</p>

<p>Supprimer tout, tout de suite, sans alternative ? C’est de la folie furieuse. 🌀</p>

<p>C’était un échange passionnant et surtout nécessaire. Parce qu'au-delà des clichés, mon job c'est aussi ça : apporter un peu de nuance et d'esprit critique dans un système qui préfère souvent éviter les conflits d'opinions.</p>

    `,
  },
  //Article suivant
  {
    id: "Hôtel",
    category: "Hôtellerie",
    title: "L'hôtellerie de luxe au Japon",
    image: "/assets/img/posts/hotelpost.png",
    description: "Le rêve des uns, le cauchemar des autres...",
    date: "2026-01-12",
    content: `
      <p><strong>Salut c'est Pilou 👋</strong></p>

<p>🏨 Luxe au Japon : Le rêve des uns, le cauchemar des autres. 🇯🇵</p>

<p>On dit souvent qu’au Japon, le service est un art. On parle d’Omotenashi, de perfection, d’anticipation. Le client n’est pas seulement roi, il est Dieu. 👑✨</p>

<p>J’ai passé 5 ans dans l’un des plus grands hôtels de luxe du pays (je tairai le nom pour l’instant). 5 ans à observer cette machine de précision où l'on va toujours au-delà des attentes pour satisfaire la moindre exigence.</p>

<p>Mais aujourd’hui, je vais vous dire la vérité : je hais ce métier.</p>

<p>Derrière les sourires ciselés et le prestige des établissements, il y a un coût que personne ne mentionne jamais : le coût humain.</p>

<p>🚫 Heures supplémentaires abusives et sous-payées.</p>

<p>🚫 Pressions hiérarchiques étouffantes.</p>

<p>🚫 Rigidité administrative d'un autre temps.</p>

<p>🚫 Un équilibre de vie qui n'existe tout simplement pas.</p>

<p>On vend du rêve aux clients, mais on vampirise la vie des employés. J'ai vu des dégâts que je qualifierais d'irréversibles. J'en ai moi-même fait les frais.</p>

<p>Dans ma prochaine vidéo, j’ai décidé de tout vous raconter sans filtre :</p>

<p>✅ Les moments de grâce et le prestige du métier.</p>

<p>❌ Les difficultés d’adaptation et la fatigue mentale.</p> 

<p>🌀 Ce que signifie réellement "travailler" au Japon pour un étranger.</p>

<p>C’est sans doute la vidéo la plus personnelle que j'ai préparée jusqu'ici.</p>

<p>Avez-vous des questions spécifiques sur le travail au Japon ? Posez-les moi en commentaire, j'y répondrai peut-être en vidéo ! 👇</p>
</p>
    `,
  },

  //Article suivant
  {
    id: "martinique",
    category: "Antilles",
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
  //Article suivant
  {
    id: "Jeux et Mangas",
    category: "Gaming",
    title: "Comment mes passions m'ont mené au Japon ?",
    image: "assets/img/posts/1767949329427.jpg",
    description: "Parfois, il suffit d'un rien pour aller loin",
    date: "2026-01-09",
    content: `
         <p><strong>Salut c'est Pilou 👋</strong></p>

<p><strong>🎮 Des pixels à la réalité : Comment mes passions m’ont mené au Japon 🇯🇵</strong></p>
<p>Tout a commencé avec une manette entre les mains et des pages de manga qui se tournent...</p>
<p>Si on m’avait dit, à l’époque de la Super Nintendo et de la Megadrive, que ces moments allaient définir ma vie d’adulte, je ne l’aurais sans doute pas cru !</p>

<p><strong>🕹️ Côté Gaming : Mon premier jeu ? Mario Paint. Mais mon vrai coup de foudre, celui qui a fait de moi un gamer, c’est Sonic. Que de souvenirs passés sur Sonic 2 et Sonic 3 à essayer de finir les niveaux avec ma sœur ! C’est là qu’est né mon amour pour les jeux vidéos qui m'a fait découvrir énormément de licences incroyables !</strong></p>

<p><strong>🐉 Côté Manga : J’ai grandi avec les classiques. Dragon Ball, Nicky Larson... (bon, j'avoue, j’avais un peu plus de mal avec les Chevaliers du Zodiaque 😅).</strong></p>

<p><strong>🍃 Le déclic : Et puis, au collège, il y a eu Naruto. Ce n'était plus juste une lecture, c'était une révélation. C’est à cause (ou grâce !) à l’univers de Konoha que j’ai décidé d’apprendre le japonais et, finalement, de m’expatrier ici.</strong></p>
<p>J'ai ensuite enchaîné par tellement de mangas que je ne pourrais pas tous les citer mais de Kimetsu no yaiba à Shingeki no kyojin en passant par Gundam. La liste serait bien trop longue😅</p>

<p>Tout ça pour vous dire que vos "passions d'enfance" ne sont jamais futiles. Ce sont elles qui m'ont donné les ailes pour poursuivre mes rêves jusqu'au bout du monde. ✈️✨</p>

<p>Croyez en vos rêves, même s'ils naissent devant une console ou un tome de manga !</p>

<p>Et vous, quelle est LA licence ou LE manga qui a changé votre vision du monde ?</p>
</p>
       `,
  },
  //Article suivant
  {
    id: "Prof de français",
    category: "Carrière",
    title: "Moi , professeur de français",
    image: "assets/img/posts/1767770770640.jpg",
    description: "Mon expérience de professeur de FLE au Japon.",
    date: "2026-01-08",
    content: `
         <p><strong>Salut c'est Pilou 👋</strong></p>

<p>Je voulais vous partager mon expérience en tant que professeur au Japon avec cette petite mise en contexte.</p>

<p>Tout a commencé ici, à Fukuoka.📍</p>

<p>C'était ma toute première expérience dans l’enseignement, et quelle aventure !</p>
<p>J'ai eu la chance de plonger directement dans le grand bain avec des classes de tous niveaux. 📚 Ce que j'en retiens ? Une immersion fascinante dans la psychologie japonaise :</p>

<p>👨‍🎓 Le sérieux avant tout : Mes étudiants étaient d'une assiduité exemplaire. Mais j'ai vite compris que le plus grand défi n'était pas la grammaire, mais la "réflexion critique". Au pays de l'harmonie, donner son opinion personnelle ou débattre est un exercice bien plus complexe qu'il n'y paraît !</p>

<p>🤝 Le sens du service (encore !) : Ma mission ne s'arrêtait pas à la salle de classe. Entre deux cours, il m'arrivait de gérer l'accueil et la réception. Ce n'était pas sur mon contrat, mais avec le recul, c'est ce genre d'imprévus qui m'a le plus appris sur la gestion humaine au Japon.</p>
<p>Même si cette école a aujourd'hui fermé ses portes, les rencontres et les amitiés créées là-bas restent l'un de mes plus beaux souvenirs de mon début de vie ici.</p>

<p>✨ Ce n'est que le début... Dans mes prochains posts, je vous raconterai des anecdotes plus précises sur mes cours et mes élèves.</p>
       `,
  },
  //Article suivant
  {
    id: "Enchanté",
    category: "Japon",
    title: "Ravi de vous rencontrer !",
    image: "assets/img/posts/Gemini_Generated_Image_lornm2lornm2lorn.png",
    description: "Une petite présentation de ma modeste personne.",
    date: "2026-01-07",
    content: `
  

<p><strong>Salut moi c'est Pilou !👋</strong></p>

<p>Bienvenue à vous !</p>

<p>Après m'être installé(e) au pays du Soleil-Levant, j'ai décidé d'ouvrir cette fenêtre sur mon quotidien pour vous partager ce que c'est que de vivre et travailler ici.</p>

<p>Loin des clichés de cartes postales (même si elles sont magnifiques, comme vous pouvez le voir sur cette photo ! ⛩️), je vous emmènerai avec moi :</p>
<p>Dans les coulisses de la vie quotidienne à la japonaise.</p>

<p>À travers les défis et les surprises du monde du travail nippon. 💼</p>
<p>Et bien sûr, on partagera ensemble mes passions de toujours : le gaming et les mangas. 🎮📚</p>

<p>Au plaisir d'échanger avec vous !</p>

       `,
  },
];
