/* =============================================
   EXPERIENCE PAGE — experience.js
   K. Janarthanan Portfolio
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     ACCORDION — Toggle card open / close
  ───────────────────────────────────────── */
  function toggleCard(header) {
    const body   = header.nextElementSibling;        // .exp-card-body
    const btn    = header.querySelector('.exp-toggle-btn');
    const isOpen = body.classList.contains('open');

    // Close every open card first
    document.querySelectorAll('.exp-card-body.open').forEach(openBody => {
      openBody.classList.remove('open');
      const openBtn = openBody.previousElementSibling.querySelector('.exp-toggle-btn');
      if (openBtn) openBtn.classList.remove('open');
    });

    // If this one was closed → open it now
    if (!isOpen) {
      body.classList.add('open');
      if (btn) btn.classList.add('open');

      // Smooth scroll so the card top is visible
      setTimeout(() => {
        header.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }

  // Attach click listeners to every card header
  document.querySelectorAll('.exp-card-header').forEach(header => {
    header.addEventListener('click', () => toggleCard(header));

    // Keyboard: Enter / Space also toggles
    header.setAttribute('tabindex', '0');
    header.setAttribute('role', 'button');
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(header);
      }
    });
  });

  /* ─────────────────────────────────────────
     FILTER TABS — show / hide cards by type
  ───────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.exp-filter');
  const expCards   = document.querySelectorAll('.exp-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      expCards.forEach(card => {
        const types = (card.dataset.type || '').split(' ');
        const match = filter === 'all' || types.includes(filter);

        if (match) {
          card.style.display    = 'block';
          card.style.opacity    = '0';
          card.style.transform  = 'translateY(12px)';
          card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          // Small delay so display:block renders before transition
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.opacity   = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        } else {
          card.style.opacity    = '0';
          card.style.transform  = 'translateY(-8px)';
          card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          setTimeout(() => {
            card.style.display = 'none';
          }, 260);
        }
      });
    });
  });

  /* ─────────────────────────────────────────
     COUNTER ANIMATION — stat numbers count up
  ───────────────────────────────────────── */
  function animateCounter(el) {
    const raw    = el.textContent.trim();           // e.g. "3+", "20+", "10+"
    const suffix = raw.replace(/[\d.]/g, '');       // "+", "k+", "%", etc.
    const target = parseFloat(raw);
    if (isNaN(target)) return;

    const duration = 1200;
    const steps    = 50;
    const stepTime = duration / steps;
    let current    = 0;

    const timer = setInterval(() => {
      current += target / steps;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = (Number.isInteger(target)
        ? Math.round(current)
        : current.toFixed(1)) + suffix;
    }, stepTime);
  }

  // Trigger counter when stat strip enters viewport
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.exp-stat-num').forEach(animateCounter);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsEl = document.querySelector('.exp-stats');
  if (statsEl) statsObserver.observe(statsEl);

  /* ─────────────────────────────────────────
     HIGHLIGHT COUNTER — numbers inside cards
  ───────────────────────────────────────── */
  const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.exp-highlight-num').forEach(animateCounter);
        highlightObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.exp-highlights').forEach(el => {
    highlightObserver.observe(el);
  });

});
