# 🔥 Mise en place Firebase — Commentaires du blog

Ce guide t'accompagne pour brancher le nouveau système de commentaires
(stockage Firestore + panneau de modération + notification e-mail).
Compte à 5-10 min, tout est gratuit (tier Spark).

---

## 1. Créer le projet Firebase

1. Va sur https://console.firebase.google.com
2. **Ajouter un projet** → nomme-le (ex: `pilou2506`) → désactive Google
   Analytics (pas utile ici) → **Créer le projet**.

## 2. Créer la base Firestore

1. Menu de gauche → **Build → Firestore Database** → **Créer une base de données**
2. Mode : **Production** (pas "test", les règles ci-dessous gèrent l'accès)
3. Région : `asia-northeast1` (Tokyo) — la plus proche de Fukuoka.

## 3. Coller les règles de sécurité

Dans Firestore → onglet **Règles**, remplace tout par :

🆕 **Mise à jour (verrou admin par UID)** : le bloc ci-dessous corrige une
faille de la version précédente. `request.auth != null` veut dire *"n'importe
quel compte connecté"*, pas *"toi"* — et Firebase Auth Email/Password n'a pas
de bouton "désactiver l'inscription publique" : n'importe qui peut créer un
compte via l'API et modérer/supprimer tes commentaires. La règle ci-dessous
verrouille `update`/`delete` sur **ton UID exact uniquement**
(`q6AYZnHcXCNHhLukcHbZAcLt6KV2`, récupéré dans Firebase Console →
**Build → Authentication → onglet Users** → colonne **User UID**).

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /comments/{commentId} {
      // Lecture publique uniquement des commentaires approuvés.
      // Toi (ton UID) tu vois tout, y compris les "pending".
      allow read: if resource.data.status == 'approved'
                  || request.auth.uid == "q6AYZnHcXCNHhLukcHbZAcLt6KV2";

      // Un visiteur peut créer un commentaire, mais seulement
      // en statut "pending" et avec des champs bornés (anti-spam / anti-injection).
      allow create: if request.resource.data.status == 'pending'
                    && request.resource.data.articleId is string
                    && request.resource.data.articleTitle is string
                    && request.resource.data.authorName is string
                    && request.resource.data.authorName.size() > 0
                    && request.resource.data.authorName.size() <= 60
                    && !request.resource.data.authorName.matches('(?i).*(https?://|www\\.|viagra|cialis|casino|forex|crypto|bitcoin|escort|xxx|porn|backlink).*')
                    && request.resource.data.text is string
                    && request.resource.data.text.size() > 0
                    && request.resource.data.text.size() <= 1000
                    && !request.resource.data.text.matches('(?i).*(https?://|www\\.|viagra|cialis|casino|forex|crypto|bitcoin|escort|xxx|porn|backlink).*')
                    && request.resource.data.createdAt == request.time;

      // Seul TOI (ton UID exact) peux approuver/supprimer.
      // ⚠️ Ne remplace jamais par request.auth != null : ça rouvrirait la faille
      // à n'importe quel compte auto-inscrit via l'API Identity Toolkit.
      allow update, delete: if request.auth.uid == "q6AYZnHcXCNHhLukcHbZAcLt6KV2";
    }
  }
}
```

Clique **Publier**.

⚠️ **Si tu as un jour un deuxième compte admin** (ex: pour un futur collaborateur), remplace `request.auth.uid == "q6AYZnHcXCNHhLukcHbZAcLt6KV2"` par `request.auth.uid in ["UID_1", "UID_2"]`.

## 4. Activer l'authentification (pour toi, l'admin)

1. Menu de gauche → **Build → Authentication** → **Get started**
2. Onglet **Sign-in method** → active **E-mail/Mot de passe**
3. Onglet **Users** → **Add user** → renseigne ton e-mail + un mot de
   passe solide. C'est ce compte que tu utiliseras sur
   `/pages/admin/moderation.html`.

⚠️ Ne crée **qu'un seul** compte ici (le tien). N'active pas
"l'inscription libre" — ce n'est pas un espace membre, juste ton accès admin.

## 5. Récupérer la config et la coller dans le code

1. ⚙️ (roue crantée) → **Paramètres du projet** → onglet **Général**
2. Section **Vos applications** → clique l'icône **`</>`** (Web) → nomme
   l'app (ex: `pilou-blog`) → **Enregistrer l'application** (pas besoin
   de Firebase Hosting, tu restes sur Vercel).
3. Copie l'objet `firebaseConfig` affiché et colle-le dans
   `assets/js/firebase-init.js` (remplace les valeurs `REMPLACE_MOI`).

## 6. Premier index composite (automatique)

La première fois qu'un article est chargé après le déploiement, ouvre
la console navigateur (F12). Firestore va probablement afficher une
erreur du type *"The query requires an index"* avec un lien direct.
Clique ce lien → **Créer l'index** → attends 1-2 min que le statut passe
à "Activé". C'est normal, ça n'arrive qu'une fois par requête composite
(articleId + status + tri par date). Il t'en faudra deux : une pour les
commentaires publics (`article.js`) et une pour le panneau admin
(`moderation.js`) — les liens d'erreur les créent directement.

## 7. Tester le flux complet

1. Déploie sur Vercel (push normal).
2. Va sur un article → poste un commentaire test.
3. Tu dois recevoir un e-mail "💬 Nouveau commentaire à modérer" (via
   Web3Forms, même circuit que ton formulaire de contact).
4. Va sur `https://pilou2506.vercel.app/pages/admin/moderation.html`,
   connecte-toi avec ton compte admin → onglet **En attente** → **✅ Approuver**.
5. Retourne sur l'article : le commentaire apparaît maintenant pour
   tout le monde.

---

## Ce qui est déjà géré pour toi

- **Stockage partagé** : tous les visiteurs voient les mêmes commentaires (fini le localStorage individuel).
- **Modération obligatoire** : rien n'est public avant ton approbation.
- **Notification e-mail** : réutilise ta clé Web3Forms existante, aucun nouveau compte à créer.
- **Anti-spam basique** : champ honeypot invisible + limites de longueur (60 car. nom / 1000 car. texte) côté client ET côté règles Firestore.

## Ce qui reste à ta charge (reste à charge humain 🛠️)

- Créer le projet Firebase + ton compte admin (étapes 1-5, ~5 min, à faire une seule fois).
- Cliquer les liens de création d'index la première fois qu'une erreur apparaît (étape 6).
- Si tu veux un jour limiter davantage le spam (ex: reCAPTCHA), on pourra
  l'ajouter — le honeypot suffit pour la majorité des bots basiques mais
  pas contre un spammeur humain motivé.
