/* ============================================================
   firebase-init.js — Initialisation Firebase (projet Pilou)
   ============================================================
   La configuration Firebase est chargée depuis les variables
   d'environnement (voir .env.example pour les variables requises).
   
   Ces valeurs sont publiques par nature (elles partent dans le
   navigateur de chaque visiteur) — la sécurité ne vient pas
   d'ici mais des règles Firestore (voir FIREBASE_SETUP.md).
   ============================================================ */

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

// Exposé globalement pour comments.js et moderation.js
window.db = firebase.firestore();
