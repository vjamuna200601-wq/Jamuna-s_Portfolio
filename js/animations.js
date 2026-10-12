/* ==========================================================================
   animations.js — hero typing effect and scroll-reveal animations
   Respects prefers-reduced-motion throughout.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Typing animation ---------------- */
  const typingEl = document.getElementById('typingText');
  const phrases = [
    'AI & Machine Learning Enthusiast',
    'Python Developer',
    'Data Science Enthusiast',
    'Cloud & DevOps Learner'
  ];

  if (typingEl) {
    if (prefersReducedMotion) {
      // Static, accessible fallback: no motion, first phrase shown.
      typingEl.textContent = phrases[0];
    } else {
      let phraseIndex = 0;
      let charIndex = 0;
      let deleting = false;

      function tick() {
        const current = phrases[phraseIndex];

        if (!deleting) {
          charIndex++;
          typingEl.textContent = current.slice(0, charIndex);
          if (charIndex === current.length) {
            deleting = true;
            setTimeout(tick, 1600);
            return;
          }
        } else {
          charIndex--;
          typingEl.textContent = current.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
          }
        }

        const speed = deleting ? 35 : 65;
        setTimeout(tick, speed);
      }

      tick();
    }
  }

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el) => revealObserver.observe(el));
  }

});
