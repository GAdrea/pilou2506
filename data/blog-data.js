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
    id: "onsen",
    title: "Survivre au premier Onsen",
    image: "1000048873.png",
    description:
      "Le guide ultime pour ne pas perdre la face dans les bains publics...",
    date: "2024-01-10",
    content: `
      <p>Votre premier onsen au Japon peut être source de stress : règles strictes, nudité, codes à respecter. Voici un petit guide pour aborder sereinement l'expérience.</p>
      <h2>Avant d'entrer</h2>
      <p>On se lave toujours avant de rejoindre le bain. Les douches sont en général assises, avec petit tabouret et miroir. Prenez votre temps, les Japonais le font aussi.</p>
      <h2>Les règles d'or</h2>
      <p>Pas de vêtement dans l'eau, pas de serviette qui trempe, pas de cris. Le calme et la discrétion sont de mise. Une fois ces bases intégrées, la détente peut commencer.</p>
    `,
  },
  {
    id: "tokyo-kyoto",
    title: "Tokyo vs Kyoto",
    image: "1000044219.jpg",
    description:
      "Mon cœur balance entre la modernité électrique et la tradition calme.",
    date: "2024-01-05",
    content: `
      <p>Tokyo, c'est la folie des néons, des gratte-ciel et des quartiers qui ne dorment jamais. Kyoto, ce sont les temples, les jardins et le temps qui semble ralentir.</p>
      <h2>Tokyo : l'énergie</h2>
      <p>À Akihabara, Shibuya ou Shinjuku, on est immergé dans le Japon contemporain. Manga, jeux vidéo, mode, gastronomie : tout va très vite et tout est possible.</p>
      <h2>Kyoto : la sérénité</h2>
      <p>Les sanctuaires, les cerisiers et les rues traditionnelles offrent un contraste total. Idéal pour se ressourcer après l'agitation tokyoïte.</p>
    `,
  },
  {
    id: "martinique",
    title: "Mes racines antillaises",
    image: "/assets/img/posts/1767992050685.jpg",
    description:
      "Faire découvrir les accras de morue à mes collègues japonais.",
    date: "2024-01-01",
    content: `
      <p>Salut c'est Pilou !👋

🌴 De Madinina au Pays du Soleil-Levant : Mes racines martiniquaises 🇯🇵

​Je suis né à Paris mais l'intégralité de mes racines se trouvent aux Antilles.🥥☀️
​J’ai vécu seulement trois ans en Martinique (CM2, 6ème, 5ème). À l'époque, j'avais dû rentrer pour des raisons particulières mais ça m'a permis de profiter de ma famille et de découvrir une façon de vivre différente de mon quotidien parisien. Bon, j'avoue, je me serais bien passé des moustiques par contre🦟😅

​L'école du respect (ou l'école "à la dure") : 📏
Ceux qui ont grandi aux Antilles à cette époque savent. Les profs avaient les pleins pouvoirs. Un bavardage ? Hop, un coup de règle sur les doigts ! Et si j'avais le malheur de m'en plaindre à la maison, je prenais double dose avec mes parents parce que j'avais bavardé ET que "le prof a toujours raison".
Aujourd'hui, ça peut choquer, mais ça m'a appris le respect des aînés et une certaine discipline. J’assume mon côté "gros boomer" sur ce coup-là mais ça n’a tué personne et ça forge le caractère ! 💪

​Le défi de la langue : 🗣️
En tant que "n*gropolitain" (c'est de l'humour, on se détend !), j'avais un mal fou à parler créole et les moqueries de ma famille sur mon accent n'ont pas aidé 😅 Résultat : je comprends tout, mais j'ai longtemps négligé de le parler. C'est mon petit regret aujourd'hui, car c'est un patrimoine magnifique... même si, je l'avoue, le créole revient très naturellement quand je suis en colère ! 🧨

​Aujourd'hui, je vis au Japon. Le trajet pour rentrer voir les miens est interminable (14h pour aller en France + 8h depuis Paris pour la Martinique... une vraie expédition ✈️), mais cela rend les retrouvailles encore plus précieuses.

​La Martinique, c'est une culture, une force et une générosité incroyable. Si vous n'y êtes jamais allés, foncez ! Vous ne le regretterez pas. 🌺🍍

​Et vous, c'est quoi l'anecdote qui a marqué votre enfance ou votre éducation ? Dites-moi tout ! 👇</p>
    `,
  },
];
