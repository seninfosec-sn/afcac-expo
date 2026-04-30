/* =====================================================
   AFCAC EXPO 2026 — Main Script
===================================================== */

/* ── Countdown Timer ── */
(function () {
  const target = new Date('2026-11-10T08:00:00');

  function update() {
    const now  = new Date();
    const diff = target - now;

    if (diff <= 0) {
      document.getElementById('days').textContent    = '000';
      document.getElementById('hours').textContent   = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const d  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h  = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s  = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent    = String(d).padStart(3, '0');
    document.getElementById('hours').textContent   = String(h).padStart(2, '0');
    document.getElementById('minutes').textContent = String(m).padStart(2, '0');
    document.getElementById('seconds').textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
})();


/* ── Hero Particles ── */
(function () {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: ${Math.random() * 8}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(p);
  }
})();


/* ── Sticky Header ── */
(function () {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();


/* ── Hamburger Menu ── */
(function () {
  const burger = document.getElementById('hamburger');
  const nav    = document.getElementById('nav');

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  // Close on nav link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      nav.classList.remove('open');
      burger.classList.remove('open');
    }
  });
})();


/* ── Active Nav Link on Scroll ── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.btn-register)');

  function setActive() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = document.querySelector(`.nav-link[href="#${id}"]`);

      if (link && scrollY >= top && scrollY < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
})();


/* ── Programme Tabs ── */
(function () {
  const tabs = document.querySelectorAll('.tab-btn');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const day = tab.dataset.day;

      // Update tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update content
      document.querySelectorAll('.programme-content').forEach(c => {
        c.classList.add('hidden');
      });
      const target = document.getElementById(`prog-day-${day}`);
      if (target) target.classList.remove('hidden');
    });
  });
})();


/* ── Scroll Reveal ── */
(function () {
  const elements = document.querySelectorAll(
    '.about-card, .remark-card, .speaker-card, .hotel-card, ' +
    '.travel-card, .prog-item, .stat-item, .contact-item, ' +
    '.section-header, .venue-info, .venue-map, .sponsor-logo-box'
  );

  elements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();


/* ── Back to Top ── */
(function () {
  const btn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ── Smooth Anchor Scroll (offset for sticky header) ── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const headerH = document.getElementById('header').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 10;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ── Contact Form ── */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message Sent!';
    btn.style.background = 'rgba(20, 88, 71, 1)';
    btn.style.color = 'rgb(254, 255, 255)';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
})();


/* ── Newsletter Form ── */
(function () {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn   = form.querySelector('button');
    const input = form.querySelector('input');
    if (!input.value) return;

    btn.innerHTML = '<i class="fas fa-check"></i>';
    btn.style.background = 'rgba(20,88,71,1)';

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i>';
      btn.style.background = '';
      input.value = '';
    }, 3000);
  });
})();


/* ── Counter Animation ── */
(function () {
  const stats = document.querySelectorAll('.stat-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const raw = el.textContent.replace(/\D/g, '');
      const end = parseInt(raw, 10);
      if (isNaN(end)) return;

      const suffix = el.textContent.replace(/[\d]/g, '').trim();
      let current  = 0;
      const step   = end / 50;

      const timer = setInterval(() => {
        current = Math.min(current + step, end);
        el.textContent = Math.floor(current) + suffix;
        if (current >= end) {
          el.textContent = end + suffix;
          clearInterval(timer);
        }
      }, 30);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(s => observer.observe(s));
})();
