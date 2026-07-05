/* ============================================================
   moderation.js — Panneau admin de modération des commentaires
   ------------------------------------------------------------
   Accès restreint par Firebase Auth (email/mot de passe).
   Crée ton compte admin depuis Firebase Console → Authentication
   → Sign-in method → Email/Password → Ajouter un utilisateur.
   ============================================================ */

(function () {
    const auth = firebase.auth();
    const db = window.db;

    const loginScreen   = document.getElementById('loginScreen');
    const modScreen     = document.getElementById('modScreen');
    const loginForm     = document.getElementById('loginForm');
    const loginError    = document.getElementById('loginError');
    const logoutBtn     = document.getElementById('logoutBtn');
    const pendingList   = document.getElementById('pendingList');
    const approvedList  = document.getElementById('approvedList');
    const pendingCountEl = document.getElementById('pendingCount');
    const tabBtns       = document.querySelectorAll('.tab-btn');

    function escapeHtml(text) {
        const d = document.createElement('div');
        d.textContent = text || '';
        return d.innerHTML;
    }

    function formatDate(ts) {
        if (!ts || typeof ts.toDate !== 'function') return '…';
        return ts.toDate().toLocaleString('fr-FR');
    }

    function commentCard(doc, status) {
        const c = doc.data();
        const actions = status === 'pending'
            ? `<button class="hud-btn-inline" style="width:auto;padding:0.5rem 1rem;" data-action="approve" data-id="${doc.id}">✅ Approuver</button>
               <button class="hud-btn-inline hud-btn-inline-pink" style="width:auto;padding:0.5rem 1rem;" data-action="delete" data-id="${doc.id}">🗑️ Supprimer</button>`
            : `<button class="hud-btn-inline hud-btn-inline-pink" style="width:auto;padding:0.5rem 1rem;" data-action="delete" data-id="${doc.id}">🗑️ Supprimer</button>`;

        return `
        <div class="hud-card p-4 mb-3">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-bold" style="color:#00d4ff">${escapeHtml(c.authorName)}</span>
                <span class="text-xs text-slate-500">${escapeHtml(formatDate(c.createdAt))}</span>
            </div>
            <p class="text-xs text-slate-500 mb-2">Sur : ${escapeHtml(c.articleTitle || c.articleId)}</p>
            <p class="text-sm text-slate-300 whitespace-pre-wrap mb-3">${escapeHtml(c.text)}</p>
            <div class="flex gap-2 flex-wrap">${actions}</div>
        </div>`;
    }

    function renderCards(container, docs, status) {
        if (!container) return;
        if (docs.length === 0) {
            container.innerHTML = '<p class="text-sm text-slate-500">Rien ici pour le moment.</p>';
            return;
        }
        container.innerHTML = docs.map(d => commentCard(d, status)).join('');
    }

    let unsubPending = null;
    let unsubApproved = null;

    function listenComments() {
        unsubPending = db.collection('comments')
            .where('status', '==', 'pending')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snap => {
                renderCards(pendingList, snap.docs, 'pending');
                pendingCountEl.textContent = snap.size > 0 ? `(${snap.size})` : '';
            }, err => console.error('Erreur lecture pending :', err));

        unsubApproved = db.collection('comments')
            .where('status', '==', 'approved')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snap => {
                renderCards(approvedList, snap.docs, 'approved');
            }, err => console.error('Erreur lecture approved :', err));
    }

    function stopListening() {
        if (unsubPending) unsubPending();
        if (unsubApproved) unsubApproved();
        unsubPending = null;
        unsubApproved = null;
    }

    document.addEventListener('click', async (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        btn.disabled = true;
        try {
            if (action === 'approve') {
                await db.collection('comments').doc(id).update({ status: 'approved' });
            } else if (action === 'delete') {
                if (confirm('Supprimer définitivement ce commentaire ?')) {
                    await db.collection('comments').doc(id).delete();
                }
            }
        } catch (err) {
            console.error(err);
            alert('Erreur : ' + err.message);
        } finally {
            btn.disabled = false;
        }
    });

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            pendingList.classList.toggle('hidden', tab !== 'pending');
            approvedList.classList.toggle('hidden', tab !== 'approved');
            tabBtns.forEach(b => b.classList.toggle('active', b === btn));
        });
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginError.classList.add('hidden');
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const btn = loginForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (err) {
            loginError.textContent = "Connexion refusée. Vérifie l'e-mail et le mot de passe.";
            loginError.classList.remove('hidden');
        } finally {
            btn.disabled = false;
        }
    });

    logoutBtn.addEventListener('click', () => auth.signOut());

    auth.onAuthStateChanged(user => {
        if (user) {
            loginScreen.classList.add('hidden');
            modScreen.classList.remove('hidden');
            logoutBtn.style.display = 'inline-flex';
            listenComments();
        } else {
            loginScreen.classList.remove('hidden');
            modScreen.classList.add('hidden');
            logoutBtn.style.display = 'none';
            stopListening();
        }
    });
})();
