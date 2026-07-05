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
