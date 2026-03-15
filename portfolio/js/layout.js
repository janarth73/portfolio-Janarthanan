/* =============================================
   SHARED NAV + FOOTER INJECTOR
   K. Janarthanan Portfolio
   ============================================= */

function getActivePage() {
  const path = window.location.pathname;
  if (path.includes('about'))      return 'about';
  if (path.includes('experience')) return 'experience';
  if (path.includes('skills'))     return 'skills';
  if (path.includes('projects'))   return 'projects';
  if (path.includes('contact'))    return 'contact';
  return 'home';
}

function injectNav() {
  const active = getActivePage();
  const pages = [
    { id: 'about',      label: 'About',      href: 'about.html' },
    { id: 'experience', label: 'Experience', href: 'experience.html' },
    { id: 'skills',     label: 'Skills',     href: 'skills.html' },
    { id: 'projects',   label: 'Projects',   href: 'projects.html' },
    { id: 'contact',    label: 'Contact',    href: 'contact.html' },
  ];

  const root = active === 'home' ? '' : '../';
  const homePath = root + 'index.html';

  const navHTML = `
  <div id="progress-bar"></div>
  <div class="cursor-dot" id="cursorDot"></div>
  <div class="cursor-ring" id="cursorRing"></div>
  <div class="noise" aria-hidden="true"></div>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <nav id="navbar">
    <a href="${homePath}" class="nav-logo">K.<span>jan</span></a>
    <ul class="nav-links">
      ${pages.map(p => `<li><a href="${root}pages/${p.href}" class="${active === p.id ? 'active' : ''}">${p.label}</a></li>`).join('')}
    </ul>
    <button class="hamburger" id="hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </nav>
  <div class="nav-mobile-menu" id="mobileMenu">
    ${pages.map(p => `<a href="${root}pages/${p.href}" class="${active === p.id ? 'active' : ''}">${p.label}</a>`).join('')}
  </div>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
}

function injectFooter() {
  const active = getActivePage();
  const root = active === 'home' ? '' : '../';

  const footerHTML = `
  <div class="section-divider"></div>
  <footer>
    <div class="blob blob-blue" style="width:400px;height:200px;bottom:0;left:50%;transform:translateX(-50%);opacity:.06;filter:blur(80px)"></div>
    <div class="footer-grid">
      <div>
        <a href="${root}index.html" class="footer-brand">K.<span>jan</span></a>
        <p class="footer-desc">Software Engineer crafting robust, scalable software solutions with clean architecture and a passion for performance.</p>
        <div class="footer-meta">
          <span>📍 Tamil Nadu, India</span>
          <span>💼 Software Engineer</span>
        </div>
      </div>
      <div>
        <h4 class="footer-heading">Navigation</h4>
        <ul class="footer-links">
          <li><a href="${root}pages/about.html">About</a></li>
          <li><a href="${root}pages/experience.html">Experience</a></li>
          <li><a href="${root}pages/skills.html">Skills</a></li>
          <li><a href="${root}pages/projects.html">Projects</a></li>
          <li><a href="${root}pages/contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 class="footer-heading">Connect</h4>
        <div class="footer-socials">
          <a href="https://github.com" target="_blank" class="footer-social" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" class="footer-social" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="mailto:janarthanan@email.com" class="footer-social" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
        </div>
      </div>
      <div>
        <h4 class="footer-heading">Let's Work Together</h4>
        <p class="footer-cta-text">Have a project in mind? I'd love to hear about it.</p>
        <a href="${root}pages/contact.html" class="btn-primary footer-cta-btn">Get in Touch</a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© 2025 K. Janarthanan · Made with ❤</div>
      <div class="footer-right">
        <div class="footer-hire"><div class="hire-dot"></div>Available for hire</div>
        <button class="back-top" id="backTop">↑ Top</button>
      </div>
    </div>
  </footer>`;

  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();

  // Init shared JS after injection
  if (typeof initShared === 'function') initShared();
});
