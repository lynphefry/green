/**
 * GREEN SPARKS — Main Interactivity (Vanilla JS only)
 * Handles: loading screen, dark mode, mobile menu, navbar scroll state,
 * scroll-reveal animations, animated counters, back-to-top, gallery
 * filtering, and form validation (volunteer + newsletter + contact).
 */

/* ---------------- Loading screen ---------------- */
window.addEventListener('load', function () {
  const loader = document.getElementById('loading-screen');
  if (loader) setTimeout(() => loader.classList.add('hide'), 400);
});

/* ---------------- Dark mode ---------------- */
function applyStoredTheme() {
  const stored = localStorage.getItem('gs-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (stored === 'dark' || (!stored && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
}
applyStoredTheme(); // run immediately to avoid flash

function updateDarkModeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  ['dark-mode-icon', 'dark-mode-icon-mobile'].forEach(id => {
    const icon = document.getElementById(id);
    if (icon) icon.className = isDark ? 'fa-solid fa-sun text-sm text-amber-400' : 'fa-solid fa-moon text-sm';
  });
}

function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('gs-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  updateDarkModeIcons();
}

/* ---------------- Mobile menu ---------------- */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('mobile-menu-icon');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    const isOpen = menu.classList.contains('gs-open');
    if (isOpen) {
      menu.style.maxHeight = '0px';
      menu.style.opacity = '0';
      menu.classList.remove('gs-open');
      icon.className = 'fa-solid fa-bars text-sm';
      btn.setAttribute('aria-expanded', 'false');
    } else {
      menu.style.maxHeight = menu.scrollHeight + 'px';
      menu.style.opacity = '1';
      menu.classList.add('gs-open');
      icon.className = 'fa-solid fa-xmark text-sm';
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  // Close menu when a link is tapped
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.style.maxHeight = '0px';
    menu.style.opacity = '0';
    menu.classList.remove('gs-open');
    icon.className = 'fa-solid fa-bars text-sm';
  }));
}

/* ---------------- Navbar background on scroll ---------------- */
function initNavbarScrollState() {
  const nav = document.getElementById('site-navbar');
  if (!nav) return;
  function update() {
    if (window.scrollY > 40) {
      nav.classList.add('glass-dark', 'shadow-lg');
    } else {
      nav.classList.remove('glass-dark', 'shadow-lg');
    }
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------------- Scroll reveal animations ---------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(t => t.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(t => observer.observe(t));
}

/* ---------------- Animated counters (Impact Ribbon) ---------------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString() + suffix;
    }
    requestAnimationFrame(tick);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => observer.observe(c));
}

/* ---------------- Back to top ---------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      btn.classList.add('gs-visible'); btn.classList.remove('gs-hidden-btn');
    } else {
      btn.classList.remove('gs-visible'); btn.classList.add('gs-hidden-btn');
    }
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------------- Gallery filtering ---------------- */
function initGalleryFilter() {
  const buttons = document.querySelectorAll('[data-filter-btn]');
  const items = document.querySelectorAll('.gallery-item');
  if (!buttons.length || !items.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter-btn');

      buttons.forEach(b => {
        b.classList.remove('bg-emerald-500', 'text-white');
        b.classList.add('bg-white', 'text-gray-700');
      });
      this.classList.add('bg-emerald-500', 'text-white');
      this.classList.remove('bg-white', 'text-gray-700');

      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) item.classList.remove('gs-hidden');
        else item.classList.add('gs-hidden');
      });
    });
  });
}

/* ---------------- Generic form validation helpers ---------------- */
function gsShowError(input, msgEl, message) {
  input.classList.add('gs-error');
  if (msgEl) { msgEl.textContent = message; msgEl.classList.add('gs-show'); msgEl.classList.remove('text-emerald-600'); msgEl.classList.add('text-red-500'); }
}
function gsClearError(input, msgEl) {
  input.classList.remove('gs-error');
  if (msgEl) { msgEl.textContent = ''; msgEl.classList.remove('gs-show'); }
}
function gsIsValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
function gsIsValidPhone(value) {
  return /^[+]?[\d\s-]{7,15}$/.test(value.trim());
}

/* ---------------- Newsletter forms (footer + page-level) ---------------- */
function initNewsletterForms() {
  document.querySelectorAll('form[id$="newsletter-form"]').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const msg = form.parentElement.querySelector('[id$="newsletter-msg"]') || form.nextElementSibling;
      if (!input) return;

      if (!gsIsValidEmail(input.value)) {
        gsShowError(input, msg, 'Please enter a valid email address.');
        return;
      }
      gsClearError(input, msg);
      if (msg) {
        msg.textContent = 'Thanks for subscribing! Check your inbox to confirm.';
        msg.classList.add('gs-show');
        msg.classList.remove('text-red-500');
        msg.classList.add('text-emerald-500');
      }
      input.value = '';
      form.reset();
    });
  });
}

/* ---------------- Volunteer registration form ---------------- */
function initVolunteerForm() {
  const form = document.getElementById('volunteer-form');
  if (!form) return;

  const successBox = document.getElementById('volunteer-success');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'v-name', test: v => v.trim().length >= 2, msg: 'Please enter your full name.' },
      { id: 'v-email', test: v => gsIsValidEmail(v), msg: 'Please enter a valid email address.' },
      { id: 'v-phone', test: v => gsIsValidPhone(v), msg: 'Please enter a valid phone number.' },
      { id: 'v-location', test: v => v.trim().length >= 2, msg: 'Please tell us your county or town.' },
    ];

    fields.forEach(f => {
      const input = document.getElementById(f.id);
      const msgEl = document.getElementById(f.id + '-error');
      if (!input) return;
      if (!f.test(input.value)) {
        gsShowError(input, msgEl, f.msg);
        valid = false;
      } else {
        gsClearError(input, msgEl);
      }
    });

    const interestChecks = form.querySelectorAll('input[name="interest"]:checked');
    const interestError = document.getElementById('v-interest-error');
    if (interestChecks.length === 0) {
      if (interestError) { interestError.textContent = 'Please select at least one area of interest.'; interestError.classList.add('gs-show'); }
      valid = false;
    } else if (interestError) {
      interestError.textContent = ''; interestError.classList.remove('gs-show');
    }

    const terms = document.getElementById('v-terms');
    const termsError = document.getElementById('v-terms-error');
    if (terms && !terms.checked) {
      if (termsError) { termsError.textContent = 'Please agree to be contacted about volunteering opportunities.'; termsError.classList.add('gs-show'); }
      valid = false;
    } else if (termsError) {
      termsError.textContent = ''; termsError.classList.remove('gs-show');
    }

    if (!valid) return;

    form.classList.add('hidden');
    if (successBox) successBox.classList.remove('hidden');
  });
}

/* ---------------- Contact form ---------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const successBox = document.getElementById('contact-success');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'c-name', test: v => v.trim().length >= 2, msg: 'Please enter your name.' },
      { id: 'c-email', test: v => gsIsValidEmail(v), msg: 'Please enter a valid email address.' },
      { id: 'c-subject', test: v => v.trim().length >= 3, msg: 'Please add a short subject.' },
      { id: 'c-message', test: v => v.trim().length >= 10, msg: 'Your message should be at least 10 characters.' },
    ];

    fields.forEach(f => {
      const input = document.getElementById(f.id);
      const msgEl = document.getElementById(f.id + '-error');
      if (!input) return;
      if (!f.test(input.value)) { gsShowError(input, msgEl, f.msg); valid = false; }
      else gsClearError(input, msgEl);
    });

    if (!valid) return;
    form.classList.add('hidden');
    if (successBox) successBox.classList.remove('hidden');
  });
}

/* ---------------- Donation amount selector (Volunteer/Donate page) ---------------- */
function initDonationSelector() {
  const buttons = document.querySelectorAll('[data-donate-amount]');
  const customInput = document.getElementById('donate-custom-amount');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      buttons.forEach(b => { b.classList.remove('bg-emerald-500', 'text-white', 'border-emerald-500'); b.classList.add('bg-white', 'text-gray-700'); });
      this.classList.add('bg-emerald-500', 'text-white', 'border-emerald-500');
      this.classList.remove('bg-white', 'text-gray-700');
      if (customInput) customInput.value = this.getAttribute('data-donate-amount');
    });
  });
}

/* ---------------- Init everything once components are mounted ---------------- */
document.addEventListener('gs:components-ready', function () {
  updateDarkModeIcons();
  initMobileMenu();
  initNavbarScrollState();

  document.getElementById('dark-mode-toggle')?.addEventListener('click', toggleDarkMode);
  document.getElementById('dark-mode-toggle-mobile')?.addEventListener('click', toggleDarkMode);

  initNewsletterForms();
});

document.addEventListener('DOMContentLoaded', function () {
  initScrollReveal();
  initCounters();
  initBackToTop();
  initGalleryFilter();
  initVolunteerForm();
  initContactForm();
  initDonationSelector();
});
