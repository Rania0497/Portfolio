/**
 * RANIA BENNANI — PORTFOLIO v2
 * script.js
 *
 * 1. Navbar scroll + active link
 * 2. Hamburger menu mobile
 * 3. IntersectionObserver — reveal au scroll
 * 4. Skill bars animées
 * 5. Compteurs animés (stats)
 * 6. Smooth scroll avec offset navbar
 */

/* ================================================
   1. NAVBAR — shadow + lien actif
   ================================================ */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  /* Shadow au scroll */
  navbar.style.boxShadow = window.scrollY > 30
    ? '0 4px 32px rgba(0,0,0,0.45)'
    : 'none';

  /* Lien actif */
  const scrollPos = window.scrollY + 100;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { passive: true });

/* ================================================
   2. HAMBURGER MOBILE
   ================================================ */
const hamburger  = document.getElementById('hamburger');
const navLinksList = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
});

/* Ferme le menu au clic sur un lien */
navLinks.forEach(link => {
  link.addEventListener('click', () => navLinksList.classList.remove('open'));
});

/* ================================================
   3. REVEAL AU SCROLL (IntersectionObserver)
   ================================================ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ================================================
   4. SKILL BARS — animation de largeur
   ================================================ */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        const target = bar.getAttribute('data-target');
        requestAnimationFrame(() => { bar.style.width = target + '%'; });
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

/* ================================================
   5. COMPTEURS ANIMÉS
   ================================================ */
function animateCounter(el, target, duration = 1600) {
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    /* Ease out cubic */
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number[data-target]').forEach(el => {
        animateCounter(el, parseInt(el.getAttribute('data-target'), 10));
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

/* ================================================
   6. SMOOTH SCROLL avec offset navbar
   ================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10
    ) || 68;
    window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
  });
});

/* Stagger reveal des cartes projets */
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});
