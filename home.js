(function () {
  // nodes
  const menuBtn = document.getElementById('menu-btn');
  const sidebar = document.getElementById('sidebar');
  const navLinks = document.querySelectorAll('#sidebar ul li a');
  const hero = document.querySelector('.hero');
  const body = document.body;

  if (!menuBtn || !sidebar) return; // only require menu + sidebar

  // helper: lock/unlock body scroll
  const lockScroll = (shouldLock) => {
    if (shouldLock) {
      body.style.overflow = 'hidden';
      body.style.touchAction = 'none';
    } else {
      body.style.overflow = '';
      body.style.touchAction = '';
    }
  };

  // helper: set aria-expanded
  const setAria = (open) => {
    menuBtn.setAttribute('aria-expanded', String(!!open));
  };

  // focusable elements selector for trap
  const focusableSelector = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  // focus trap state
  let lastFocused = null;

  // open sidebar
  function openSidebar() {
    menuBtn.classList.add('active');
    sidebar.classList.add('active');
    setAria(true);
    lastFocused = document.activeElement;
    lockScroll(true);

    const firstLink = sidebar.querySelector('a');
    if (firstLink) firstLink.focus();

    document.addEventListener('keydown', handleKeydownTrap);
  }

  // close sidebar
  function closeSidebar() {
    menuBtn.classList.remove('active');
    sidebar.classList.remove('active');
    setAria(false);
    lockScroll(false);

    if (lastFocused) lastFocused.focus();
    document.removeEventListener('keydown', handleKeydownTrap);
  }

  // toggle
  menuBtn.addEventListener('click', () => {
    const isOpen = sidebar.classList.contains('active');
    if (isOpen) closeSidebar();
    else openSidebar();
  });

  // Close sidebar when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeSidebar();
    });
  });

  // click outside -> close
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!sidebar.classList.contains('active')) return;
    if (menuBtn.contains(target)) return;
    if (sidebar.contains(target)) return;
    closeSidebar();
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (sidebar.classList.contains('active')) {
        closeSidebar();
      }
    }
  });

  // Focus trap handler
  function handleKeydownTrap(e) {
    if (e.key !== 'Tab') return;
    const focusables = Array.from(sidebar.querySelectorAll(focusableSelector))
      .filter(f => f.offsetWidth > 0 || f.offsetHeight > 0 || f === document.activeElement);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // HERO entrance animation (only if hero exists)
  if (hero) {
    function revealHero() {
      const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduce) {
        document.querySelectorAll('.hero-title, .tagline, .btn').forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
        return;
      }
      window.setTimeout(() => {
        hero.classList.add('revealed');
      }, 180);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', revealHero);
    } else {
      revealHero();
    }
  }

  // Accessibility adjustments
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener?.('change', (e) => {
    if (e.matches) {
      document.querySelectorAll('.hero-title, .tagline, .btn').forEach(el => {
        el.style.transition = 'none';
      });
    }
  });

  // Prevent accidental double-tap toggle on mobile
  let lastTap = 0;
  menuBtn.addEventListener('touchend', (e) => {
    const current = Date.now();
    if (current - lastTap < 300) {
      e.preventDefault();
    }
    lastTap = current;
  });

  // Animate nav items
  const observer = new MutationObserver(() => {
    if (sidebar.classList.contains('active')) {
      sidebar.querySelectorAll('li').forEach((li, idx) => {
        li.style.transitionDelay = `${90 + idx * 70}ms`;
      });
    } else {
      sidebar.querySelectorAll('li').forEach((li) => {
        li.style.transitionDelay = '';
      });
    }
  });
  observer.observe(sidebar, { attributes: true });

  setAria(false);
})();

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
