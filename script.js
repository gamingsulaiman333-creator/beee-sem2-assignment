/* ============================================
   BEEE Website — JavaScript
   ============================================ */

// ---- Page Navigation ----
function navigateTo(pageId) {
    const currentPage = document.querySelector('.page.active');
    const targetPage = document.getElementById(pageId);

    if (!targetPage || currentPage === targetPage) return;

    // Fade out current
    currentPage.classList.remove('fade-in');
    currentPage.classList.add('fade-out');

    setTimeout(() => {
        currentPage.classList.remove('active', 'fade-out');
        targetPage.classList.add('active');

        // Reset scroll
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Fade in target
        requestAnimationFrame(() => {
            targetPage.classList.add('fade-in');
        });
    }, 280);
}

function goHome() {
    navigateTo('home');
}

// ---- Module Card Click Handlers ----
document.querySelectorAll('.module-card').forEach(card => {
    card.addEventListener('click', () => {
        const moduleNum = card.dataset.module;
        navigateTo(`module-${moduleNum}`);
    });
});

// ---- Card Glow Follow Mouse ----
document.querySelectorAll('.module-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    });
});

// ---- Keyboard Accessibility ----
document.querySelectorAll('.module-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

// ---- Back Button Keyboard Shortcut (Escape) ----
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activePage = document.querySelector('.page.active');
        if (activePage && activePage.id !== 'home') {
            goHome();
        }
    }
});

// ---- Intersection Observer for animate-on-scroll ----
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe topic cards and download cards when they become visible
function observeElements() {
    document.querySelectorAll('.topic-card, .download-card').forEach(el => {
        observer.observe(el);
    });
}

// ---- Download Click Feedback ----
document.querySelectorAll('.download-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const btn = card.querySelector('.dl-btn');
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 200);
    });
});

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
    // Set initial page
    const home = document.getElementById('home');
    home.classList.add('active', 'fade-in');
    observeElements();
});
