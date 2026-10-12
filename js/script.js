/* ==========================================================================
   script.js — core interactions: navigation, skills tabs, project modals,
   contact form validation, back-to-top
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Mobile navigation ---------------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  function closeMenu() {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  function openMenu() {
    navMenu.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  /* ---------------- Smooth scroll for internal links ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  /* ---------------- Active section indicator ---------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach((section) => sectionObserver.observe(section));

  /* ---------------- Skills tabs ---------------- */
  const tabs = document.querySelectorAll('.skills-tab');
  const panels = document.querySelectorAll('.skills-panel');

  function activateTab(tab) {
    tabs.forEach((t) => {
      const isTarget = t === tab;
      t.classList.toggle('is-active', isTarget);
      t.setAttribute('aria-selected', String(isTarget));
      t.setAttribute('tabindex', isTarget ? '0' : '-1');
    });
    panels.forEach((panel) => {
      const shouldShow = panel.id === tab.dataset.target;
      panel.classList.toggle('is-active', shouldShow);
      panel.hidden = !shouldShow;
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (e) => {
      let newIndex = null;
      if (e.key === 'ArrowRight') newIndex = (index + 1) % tabs.length;
      if (e.key === 'ArrowLeft') newIndex = (index - 1 + tabs.length) % tabs.length;
      if (newIndex !== null) {
        e.preventDefault();
        tabs[newIndex].focus();
        activateTab(tabs[newIndex]);
      }
    });
  });

  /* ---------------- Project modals ---------------- */
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  let lastFocusedEl = null;

  function openModal(modal) {
    lastFocusedEl = document.activeElement;
    modal.hidden = false;
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const modal = document.getElementById(trigger.dataset.modalTarget);
      if (modal) openModal(modal);
    });
  });

  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });

    overlay.querySelectorAll('[data-modal-close]').forEach((btn) => {
      btn.addEventListener('click', () => closeModal(overlay));
    });

    overlay.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal(overlay);
        return;
      }
      if (e.key === 'Tab') {
        const focusable = overlay.querySelectorAll('button, a[href]');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  });

  /* ---------------- Contact form validation ---------------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  function setError(fieldId, message) {
    const errorEl = document.getElementById(`err-${fieldId}`);
    const group = document.getElementById(`cf-${fieldId}`).closest('.form-group');
    if (errorEl) errorEl.textContent = message;
    if (group) group.classList.toggle('has-error', Boolean(message));
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name) { setError('name', 'Please enter your name.'); valid = false; }
    else setError('name', '');

    if (!email) { setError('email', 'Please enter your email.'); valid = false; }
    else if (!isValidEmail(email)) { setError('email', 'Please enter a valid email address.'); valid = false; }
    else setError('email', '');

    if (!subject) { setError('subject', 'Please enter a subject.'); valid = false; }
    else setError('subject', '');

    if (!message) { setError('message', 'Please enter a message.'); valid = false; }
    else setError('message', '');

    if (!valid) {
      formStatus.textContent = 'Please fix the highlighted fields.';
      return;
    }

    formStatus.textContent = 'Message validated locally — this is a frontend prototype, so no email has actually been sent.';
    form.reset();
  });

  /* ---------------- Back to top ---------------- */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 480) {
      backToTop.hidden = false;
    } else {
      backToTop.hidden = true;
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
