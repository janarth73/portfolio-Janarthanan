/* =============================================
   SHARED INTERACTIONS — main.js
   K. Janarthanan Portfolio
   ============================================= */

function initShared() {

  /* ---- SCROLL PROGRESS BAR ---- */
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop    = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      progressBar.style.width = (scrollTop / scrollHeight * 100) + '%';
    });
  }

  /* ---- CUSTOM CURSOR ---- */
  const cursorDot  = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top  = mouseY + 'px';
    });
    function animateCursor() {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorRing.style.transform   = 'translate(-50%,-50%) scale(1.8)';
        cursorRing.style.borderColor = '#4a80c4';
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.style.transform   = 'translate(-50%,-50%) scale(1)';
        cursorRing.style.borderColor = '#8aaad4';
      });
    });
  }

  /* ---- MOBILE NAV ---- */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      const spans  = hamburger.querySelectorAll('span');
      spans[0].style.transform = isOpen ? 'rotate(45deg) translate(4px, 4px)' : '';
      spans[1].style.opacity   = isOpen ? '0' : '1';
      spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(4px, -4px)' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
      });
    });
  }

  /* ---- NAV SCROLL SHADOW ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 20
        ? '0 4px 30px rgba(0,0,0,0.6)' : 'none';
    });
  }

  /* ---- REVEAL ON SCROLL ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 70);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ---- BACK TO TOP ---- */
  const backTop = document.getElementById('backTop');
  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ---- PAGE-SPECIFIC: SKILLS ---- */
function initSkills() {
  const skillData = {
    all:       { title: 'All Skills',         pills: ['Python','Java','JavaScript','TypeScript','C/C++','React.js','HTML5','CSS3','Tailwind CSS','Node.js','Express.js','Django','REST APIs','MySQL','PostgreSQL','MongoDB','Git','Docker','Linux','AWS'] },
    languages: { title: 'Languages',          pills: ['Python','Java','JavaScript','TypeScript','C/C++','SQL','Bash'] },
    frontend:  { title: 'Frontend',           pills: ['React.js','HTML5','CSS3','Tailwind CSS','TypeScript','Next.js','Figma','Redux'] },
    backend:   { title: 'Backend',            pills: ['Node.js','Express.js','Django','FastAPI','Spring Boot','REST APIs','GraphQL','WebSockets','JWT'] },
    database:  { title: 'Database & Storage', pills: ['MySQL','PostgreSQL','MongoDB','Redis','SQLite','Firebase','ElasticSearch'] },
    devops:    { title: 'DevOps & Tools',      pills: ['Git','GitHub','Docker','AWS','Linux','Nginx','CI/CD','Jest','Pytest','Webpack'] }
  };
  const skillTabs     = document.getElementById('skillTabs');
  const skillCatTitle = document.getElementById('skillCatTitle');
  const skillPills    = document.getElementById('skillPills');
  if (skillTabs) {
    skillTabs.addEventListener('click', (e) => {
      if (!e.target.classList.contains('skill-tab')) return;
      document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      const data = skillData[e.target.dataset.cat];
      skillCatTitle.textContent = data.title;
      skillPills.innerHTML = data.pills.map(p => `<span class="skill-pill">${p}</span>`).join('');
    });
  }
}

/* ---- PAGE-SPECIFIC: PROJECTS ---- */
function initProjects() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        const match = filter === 'all' || card.dataset.filter === filter;
        if (match) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; card.style.transition = 'opacity 0.4s'; }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transition = 'opacity 0.3s';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

/* ---- PAGE-SPECIFIC: CONTACT ----
   Moved to js/contact.js (mailto — no login, no API key)
---------------------------------------------------- */
