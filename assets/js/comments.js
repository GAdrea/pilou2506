/* ============================================================
   comments.js — Commentaires d'articles (stockage Firestore)
   ------------------------------------------------------------
   Remplace l'ancien système localStorage (qui n'était visible
   que dans le navigateur du visiteur). Ici :
   - les commentaires sont partagés entre tous les visiteurs
   - un commentaire posté part en statut "pending" (invisible)
   - Pilou l'approuve depuis /pages/admin/moderation.html
   - une fois "approved", il apparaît pour tout le monde

   Dépendances (à charger AVANT ce fichier) :
   - firebase-app-compat.js + firebase-firestore-compat.js
   - firebase-init.js (fournit window.db)
   ============================================================ */

const PilouComments = (() => {

    // Même clé Web3Forms que le formulaire de contact —
    // sert uniquement à notifier Pilou par e-mail, pas à stocker.
    const WEB3FORMS_KEY = 'fbfbb782-fc2e-4ef3-b6a8-475a032551eb';
    const MODERATION_URL = 'https://pilou2506.vercel.app/pages/admin/moderation.html';
    const MAX_NAME_LEN = 60;
    const MAX_TEXT_LEN = 1000;

    function escapeHtml(text) {
        const d = document.createElement('div');
        d.textContent = text || '';
        return d.innerHTML;
    }

    function formatDate(ts) {
        if (!ts || typeof ts.toDate !== 'function') return '';
        return ts.toDate().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    function showFeedback(el, message, type) {
        if (!el) return;
        el.textContent = message;
        el.classList.remove('hidden');
        el.style.color = type === 'error' ? '#ff4d6d' : '#00d4ff';
    }

    function renderList(container, docs) {
        if (docs.length === 0) {
            container.innerHTML = '<p class="text-sm text-slate-500">Aucun commentaire pour le moment. Sois le premier !</p>';
            return;
        }
        container.innerHTML = docs.map(doc => {
            const c = doc.data();
            return `
            <div class="hud-card p-4 mb-3">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-bold" style="color:#00d4ff">${escapeHtml(c.authorName)}</span>
                    ${c.createdAt ? `<span class="text-xs text-slate-500">${escapeHtml(formatDate(c.createdAt))}</span>` : ''}
                </div>
                <p class="text-sm text-slate-300 whitespace-pre-wrap">${escapeHtml(c.text)}</p>
            </div>`;
        }).join('');
    }

    // Notification e-mail à Pilou — non bloquant : si ça échoue,
    // le commentaire est déjà bien enregistré dans Firestore.
    async function notifyNewComment({ articleTitle, articleUrl, authorName, text }) {
        try {
            const data = new FormData();
            data.append('access_key', WEB3FORMS_KEY);
            data.append('subject', `💬 Nouveau commentaire à modérer — "${articleTitle}"`);
            data.append('from_name', 'Blog Pilou — Commentaires');
            data.append('name', authorName);
            data.append('message', `${text}\n\n— Article : ${articleUrl}\n— Modérer ici : ${MODERATION_URL}`);
            await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: data,
            });
        } catch (err) {
            console.warn('Notification e-mail échouée (commentaire bien enregistré) :', err);
        }
    }

    function init(articleId, articleTitle) {
        const db = window.db;
        const listEl = document.getElementById('commentsList');
        const form = document.getElementById('commentForm');
        const feedback = document.getElementById('commentFormFeedback');

        if (!db) {
            if (listEl) listEl.innerHTML = '<p class="text-sm text-slate-500">Commentaires momentanément indisponibles.</p>';
            return;
        }

        // Lecture temps réel : uniquement les commentaires approuvés
        if (listEl) {
            db.collection('comments')
                .where('articleId', '==', articleId)
                .where('status', '==', 'approved')
                .orderBy('createdAt', 'desc')
                .onSnapshot(
                    snap => renderList(listEl, snap.docs),
                    err => {
                        console.error('Erreur chargement commentaires :', err);
                        listEl.innerHTML = '<p class="text-sm text-slate-500">Impossible de charger les commentaires pour le moment.</p>';
                    }
                );
        }

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Piège à bots (honeypot) : champ invisible, si rempli → on ignore silencieusement
            const honeypot = document.getElementById('commentWebsite');
            if (honeypot && honeypot.value.trim() !== '') return;

            const nameEl = document.getElementById('commentAuthorName');
            const textEl = document.getElementById('commentText');
            const name = (nameEl?.value || '').trim().slice(0, MAX_NAME_LEN);
            const text = (textEl?.value || '').trim().slice(0, MAX_TEXT_LEN);
            if (!name || !text) return;

            const btn = form.querySelector('button[type="submit"]');
            if (btn) { btn.disabled = true; btn.textContent = '⏳ Envoi...'; }

            try {
                await db.collection('comments').add({
                    articleId,
                    articleTitle,
                    authorName: name,
                    text,
                    status: 'pending',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                });

                showFeedback(feedback, '✅ Merci ! Ton commentaire est en attente de modération, il apparaîtra bientôt.', 'success');
                form.reset();

                notifyNewComment({
                    articleTitle,
                    articleUrl: window.location.href,
                    authorName: name,
                    text,
                });
            } catch (err) {
                console.error('Erreur envoi commentaire :', err);
                showFeedback(feedback, "❌ Une erreur est survenue, réessaie dans un instant.", 'error');
            } finally {
                if (btn) { btn.disabled = false; btn.textContent = 'Publier'; }
            }
        });
    }

    return { init };
})();

window.PilouComments = PilouComments;
