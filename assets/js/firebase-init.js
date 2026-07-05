/* ============================================================
   firebase-init.js — Initialisation Firebase (projet Pilou)
   ============================================================
   Ces valeurs sont publiques par nature (elles partent dans le
   navigateur de chaque visiteur) — la sécurité ne vient pas
   d'ici mais des règles Firestore (voir FIREBASE_SETUP.md).

   ⚠️ Pourquoi en clair et pas via une variable d'environnement ?
   Ce site est du HTML/JS vanilla sans bundler (pas de Vite,
   pas de Webpack). Ce fichier est chargé en <script> classique,
   pas en <script type="module">. Du coup `import.meta.env`
   n'existe pas ici : ça casse le script au chargement dans un
   vrai navigateur (SyntaxError), ce qui empêche Firebase de
   s'initialiser — et donc casse les commentaires ET le panneau
   admin. Une variable d'environnement Vercel n'est lisible que
   côté build/serveur, jamais par du JS exécuté dans le navigateur,
   sauf à ajouter un bundler qui l'injecte au build. On n'en a pas
   besoin ici puisque ces valeurs sont sans risque à exposer.
   ============================================================ */

const firebaseConfig = {
    apiKey: "AIzaSyBeJbUTwpcNrUGZ8Dx7UU8stmGewFYEcrc",
    authDomain: "sodium-hour-451511-n6.firebaseapp.com",
    projectId: "sodium-hour-451511-n6",
    storageBucket: "sodium-hour-451511-n6.firebasestorage.app",
    messagingSenderId: "109258013426",
    appId: "1:109258013426:web:d29757b8bb91e9b301ae6b"
};

firebase.initializeApp(firebaseConfig);

// Exposé globalement pour comments.js et moderation.js
window.db = firebase.firestore();
