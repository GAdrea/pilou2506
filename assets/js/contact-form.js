/* ============================================================
   contact-form.js — Web3Forms handler partagé
   Branché sur tout formulaire portant data-web3forms="true"
   ============================================================ */

(function () {

    function checkRateLimit() {
        try {
            const KEY = 'cf_send_times';
            const WINDOW = 60 * 60 * 1000; // 1 heure
            const MAX = 3;
            const now = Date.now();
            const history = JSON.parse(localStorage.getItem(KEY) || '[]');
            const recent = history.filter(t => now - t < WINDOW);
            if (recent.length >= MAX) return false;
            recent.push(now);
            localStorage.setItem(KEY, JSON.stringify(recent));
            return true;
        } catch { return true; }
    }

    async function submitForm(form) {
        const btn = form.querySelector('button[type="submit"]');
        const feedback = form.querySelector('.form-feedback');
        const originalText = btn ? btn.textContent : '';

        // Validation du contenu du message (champ "message" ou textarea)
        const msgField = form.querySelector('textarea, [name="message"]');
        if (msgField && msgField.value.trim().length < 20) {
            showFeedback(feedback, '⚠️ Votre message est trop court (20 caractères minimum).', 'error');
            return;
        }

        if (!checkRateLimit()) {
            showFeedback(feedback, '⏳ Trop d\'envois en peu de temps. Réessayez dans une heure.', 'error');
            return;
        }

        if (btn) {
            btn.disabled = true;
            btn.textContent = '⏳ Envoi en cours...';
        }
        if (feedback) {
            feedback.className = 'form-feedback hidden';
        }

        try {
            const data = new FormData(form);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: data,
            });
            const json = await response.json();

            if (response.ok && json.success) {
                showFeedback(feedback, '✅ Message envoyé ! Je vous répondrai dès que possible.', 'success');
                form.reset();
            } else {
                throw new Error(json.message || 'Erreur inconnue');
            }
        } catch (err) {
            showFeedback(feedback, '❌ Une erreur est survenue. Réessayez ou contactez-moi directement.', 'error');
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.textContent = originalText;
            }
        }
    }

    function showFeedback(el, message, type) {
        if (!el) return;
        el.textContent = message;
        el.className = 'form-feedback text-center text-sm py-3 px-4 rounded mt-4';
        if (type === 'success') {
            el.style.background = 'rgba(0, 212, 255, 0.1)';
            el.style.border = '1px solid rgba(0, 212, 255, 0.3)';
            el.style.color = '#00d4ff';
        } else {
            el.style.background = 'rgba(255, 77, 109, 0.1)';
            el.style.border = '1px solid rgba(255, 77, 109, 0.3)';
            el.style.color = '#ff4d6d';
        }
    }

    document.querySelectorAll('form[data-web3forms="true"]').forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            submitForm(form);
        });
    });

})();
