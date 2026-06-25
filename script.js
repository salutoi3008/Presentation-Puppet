/* ═══════════════════════════════════════════════════════════
   script.js — Puppet / Five Nights at Freddy's
   Rôle : gérer les interactions et animations dynamiques
          qui ne peuvent pas être réalisées en CSS seul.

   Fonctionnalités :
     1. Navigation active au scroll (IntersectionObserver)
     2. Ombre de la nav au scroll (scroll event)
     3. Apparition des sections au scroll (IntersectionObserver)
═══════════════════════════════════════════════════════════ */


/* ──────────────────────────────────────────────────────────
   SÉLECTION DES ÉLÉMENTS DU DOM
   On récupère les références une seule fois pour éviter
   de recalculer querySelectorAll() à chaque événement.
────────────────────────────────────────────────────────── */

// Toutes les sections qui ont un id (utilisées pour la nav active)
const sections = document.querySelectorAll('section[id]');

// Tous les liens de la navigation
const navLinks = document.querySelectorAll('nav a');

// La barre de navigation elle-même
const nav = document.querySelector('nav');

// Tous les éléments à faire apparaître au scroll
const reveals = document.querySelectorAll('.reveal');


/* ──────────────────────────────────────────────────────────
   1. LIEN ACTIF DANS LA NAVIGATION
   Utilise l'API IntersectionObserver pour détecter quelle
   section est actuellement visible dans le viewport.
   Quand une section devient visible, on active le lien
   correspondant dans la navigation.
────────────────────────────────────────────────────────── */

/**
 * observerNav — observe chaque <section id="...">
 * threshold: 0.4 → la section doit être visible à 40%
 * pour que son lien soit considéré comme actif.
 */
const observerNav = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Retirer la classe active de tous les liens
      navLinks.forEach((lien) => lien.classList.remove('active'));

      // Trouver le lien dont le href correspond à l'id de la section visible
      // ex : <a href="#intro"> pour <section id="intro">
      const lienActif = document.querySelector(`nav a[href="#${entry.target.id}"]`);

      // Ajouter la classe active si le lien existe
      if (lienActif) {
        lienActif.classList.add('active');
      }
    }
  });
}, {
  threshold: 0.4 // 40% de la section doit être visible
});

// Démarrer l'observation sur chaque section
sections.forEach((section) => {
  observerNav.observe(section);
});


/* ──────────────────────────────────────────────────────────
   2. OMBRE DE LA NAVIGATION AU SCROLL
   Écoute l'événement 'scroll' sur la fenêtre.
   Si l'utilisateur a scrollé de plus de 50px depuis le haut,
   on ajoute la classe .scrolled à la nav (qui déclenche
   une box-shadow en CSS).
────────────────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  // toggle() ajoute la classe si la condition est vraie, la retire sinon
  nav.classList.toggle('scrolled', window.scrollY > 50);
});


/* ──────────────────────────────────────────────────────────
   3. APPARITION DES SECTIONS AU SCROLL
   Les éléments portant la classe .reveal sont invisibles
   par défaut (opacity: 0, translateY(30px) en CSS).
   Quand ils entrent dans le viewport, on leur ajoute
   la classe .visible qui déclenche la transition CSS.

   On utilise unobserve() une fois l'animation jouée pour
   économiser des ressources : pas besoin de surveiller
   un élément déjà visible.
────────────────────────────────────────────────────────── */

/**
 * observerReveal — observe les éléments .reveal
 * threshold: 0.15 → l'animation se déclenche dès que
 * 15% de l'élément est visible (permet un déclenchement
 * tôt, même sur mobile où les sections sont plus hautes).
 */
const observerReveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Déclencher l'animation d'apparition
      entry.target.classList.add('visible');

      // Arrêter d'observer cet élément : l'animation est one-shot
      observerReveal.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15 // 15% de l'élément doit être visible pour déclencher
});

// Démarrer l'observation sur chaque élément .reveal
reveals.forEach((el) => {
  observerReveal.observe(el);
});
