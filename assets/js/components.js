/**
 * GREEN SPARKS — Shared Components
 * Injects the navbar and footer into every page from one source of
 * truth, so all 9 pages stay visually identical without a build step.
 * Runs before DOMContentLoaded logic in main.js needs the DOM nodes.
 */

(function () {
  const NAV_LINKS = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'campaigns.html', label: 'Campaigns' },
    { href: 'projects.html', label: 'Projects' },
    { href: 'events.html', label: 'Events' },
    { href: 'volunteer.html', label: 'Volunteer' },
    { href: 'gallery.html', label: 'Gallery' },
    { href: 'blog.html', label: 'Blog' },
    { href: 'contact.html', label: 'Contact' },
  ];

  function currentPage() {
    const path = window.location.pathname.split('/').pop();
    return path === '' ? 'index.html' : path;
  }

  function buildNavbar() {
    const current = currentPage();
    const desktopLinks = NAV_LINKS.map(link => `
      <a href="${link.href}" class="nav-link text-sm font-medium tracking-wide ${link.href === current ? 'active text-emerald-500' : 'text-white/90 hover:text-emerald-400'}">${link.label}</a>
    `).join('');

    const mobileLinks = NAV_LINKS.map(link => `
      <a href="${link.href}" class="block px-4 py-3 rounded-xl text-sm font-medium ${link.href === current ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-100 hover:bg-white/10'}">${link.label}</a>
    `).join('');

    return `
    <nav id="site-navbar" class="fixed top-0 inset-x-0 z-50 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <a href="index.html" class="flex items-center gap-2 shrink-0">
            <span class="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center shadow-lg">
              <i class="fa-solid fa-leaf text-white text-lg"></i>
            </span>
            <span class="text-white font-bold text-lg tracking-tight">Green<span class="text-emerald-400">Sparks</span></span>
          </a>

          <div class="hidden lg:flex items-center gap-8">
            ${desktopLinks}
          </div>

          <div class="hidden lg:flex items-center gap-3">
            <button id="dark-mode-toggle" aria-label="Toggle dark mode" class="w-10 h-10 rounded-full glass-dark flex items-center justify-center text-white hover:text-emerald-400 transition">
              <i class="fa-solid fa-moon text-sm" id="dark-mode-icon"></i>
            </button>
            <a href="volunteer.html#donate" class="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold shadow-lg shadow-emerald-500/30 transition">
              Donate Now
            </a>
          </div>

          <div class="flex items-center gap-3 lg:hidden">
            <button id="dark-mode-toggle-mobile" aria-label="Toggle dark mode" class="w-10 h-10 rounded-full glass-dark flex items-center justify-center text-white">
              <i class="fa-solid fa-moon text-sm" id="dark-mode-icon-mobile"></i>
            </button>
            <button id="mobile-menu-btn" aria-label="Open menu" aria-expanded="false" class="w-10 h-10 rounded-full glass-dark flex items-center justify-center text-white">
              <i class="fa-solid fa-bars text-sm" id="mobile-menu-icon"></i>
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-menu" class="lg:hidden max-h-0 opacity-0 px-4">
        <div class="glass-dark rounded-2xl p-3 mb-4 space-y-1">
          ${mobileLinks}
          <a href="volunteer.html#donate" class="block text-center mt-2 px-4 py-3 rounded-xl bg-emerald-500 text-white text-sm font-semibold">Donate Now</a>
        </div>
      </div>
    </nav>`;
  }

  function buildFooter() {
    return `
    <footer class="relative bg-[#0f1f16] text-gray-300 pt-20 pb-8 overflow-hidden">
      <div class="blob-accent w-72 h-72 bg-emerald-500 -top-10 -left-10"></div>
      <div class="blob-accent w-72 h-72 bg-sky-500 bottom-0 right-0"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          <div>
            <a href="index.html" class="flex items-center gap-2 mb-4">
              <span class="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center">
                <i class="fa-solid fa-leaf text-white"></i>
              </span>
              <span class="text-white font-bold text-lg">Green<span class="text-emerald-400">Sparks</span></span>
            </a>
            <p class="text-sm leading-relaxed text-gray-400">A grassroots Kenyan campaign fighting plastic pollution, restoring green cover, and building climate-resilient communities — one spark at a time.</p>
            <div class="flex gap-3 mt-5">
              <a href="#" aria-label="Facebook" class="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-500 flex items-center justify-center transition"><i class="fa-brands fa-facebook-f text-sm"></i></a>
              <a href="#" aria-label="Twitter / X" class="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-500 flex items-center justify-center transition"><i class="fa-brands fa-x-twitter text-sm"></i></a>
              <a href="#" aria-label="Instagram" class="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-500 flex items-center justify-center transition"><i class="fa-brands fa-instagram text-sm"></i></a>
              <a href="#" aria-label="YouTube" class="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-500 flex items-center justify-center transition"><i class="fa-brands fa-youtube text-sm"></i></a>
              <a href="#" aria-label="LinkedIn" class="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-500 flex items-center justify-center transition"><i class="fa-brands fa-linkedin-in text-sm"></i></a>
            </div>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4">Explore</h4>
            <ul class="space-y-2.5 text-sm">
              <li><a href="about.html" class="hover:text-emerald-400 transition">About Green Sparks</a></li>
              <li><a href="campaigns.html" class="hover:text-emerald-400 transition">Featured Campaigns</a></li>
              <li><a href="projects.html" class="hover:text-emerald-400 transition">Our Projects</a></li>
              <li><a href="events.html" class="hover:text-emerald-400 transition">Upcoming Events</a></li>
              <li><a href="gallery.html" class="hover:text-emerald-400 transition">Gallery</a></li>
              <li><a href="blog.html" class="hover:text-emerald-400 transition">News & Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4">Get Involved</h4>
            <ul class="space-y-2.5 text-sm">
              <li><a href="volunteer.html" class="hover:text-emerald-400 transition">Become a Volunteer</a></li>
              <li><a href="volunteer.html#donate" class="hover:text-emerald-400 transition">Donate</a></li>
              <li><a href="contact.html" class="hover:text-emerald-400 transition">Partner With Us</a></li>
              <li><a href="contact.html" class="hover:text-emerald-400 transition">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4">Stay Updated</h4>
            <p class="text-sm text-gray-400 mb-3">Get monthly updates on our clean-ups, tree drives, and impact reports.</p>
            <form id="footer-newsletter-form" novalidate class="flex gap-2">
              <input type="email" id="footer-newsletter-email" placeholder="Your email address" class="gs-input min-w-0 flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/10 text-sm text-white placeholder-gray-500" />
              <button type="submit" class="w-11 h-11 shrink-0 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center transition"><i class="fa-solid fa-paper-plane text-sm text-white"></i></button>
            </form>
            <p id="footer-newsletter-msg" class="text-xs mt-2 gs-error-msg"></p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-gray-500">
          <p>&copy; <span id="footer-year"></span> Green Sparks Kenya. All rights reserved.</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-emerald-400">Privacy Policy</a>
            <a href="#" class="hover:text-emerald-400">Terms of Use</a>
            <a href="contact.html" class="hover:text-emerald-400">Contact</a>
          </div>
        </div>
      </div>
    </footer>`;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const navMount = document.getElementById('navbar-mount');
    const footerMount = document.getElementById('footer-mount');
    if (navMount) navMount.outerHTML = buildNavbar();
    if (footerMount) footerMount.outerHTML = buildFooter();

    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Let main.js know components are ready
    document.dispatchEvent(new CustomEvent('gs:components-ready'));
  });
})();
