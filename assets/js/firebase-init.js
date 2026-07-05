/* ============================================================
   firebase-init.js — Initialisation Firebase (projet Pilou)
   ------------------------------------------------------------
   ⚠️ À FAIRE : remplace les valeurs ci-dessous par celles de
   TON projet Firebase.
   Où les trouver : console.firebase.google.com → ton projet →
   ⚙️ Paramètres du projet → onglet "Général" → section
   "Vos applications" → app Web → "Configuration du SDK".

   Ces valeurs sont publiques par nature (elles partent dans le
   navigateur de chaque visiteur) — la sécurité ne vient pas
   d'ici mais des règles Firestore (voir FIREBASE_SETUP.md).
   ============================================================ */

const firebaseConfig = {
    apiKey: "REMPLACE_MOI",
    authDomain: "REMPLACE_MOI.firebaseapp.com",
    projectId: "REMPLACE_MOI",
    storageBucket: "REMPLACE_MOI.appspot.com",
    messagingSenderId: "REMPLACE_MOI",
    appId: "REMPLACE_MOI"
};

firebase.initializeApp(firebaseConfig);

// Exposé globalement pour comments.js et moderation.js
window.db = firebase.firestore();
