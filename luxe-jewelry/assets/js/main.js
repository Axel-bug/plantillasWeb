(function () {
  // Elements
  const profileBtn = document.getElementById('profileBtn');
  const profileMenu = document.getElementById('profileMenu');
  const darkToggle = document.getElementById('darkToggle');
  const darkIcon = document.getElementById('darkIcon');
  const header = document.getElementById('site-header');

  // Utility to open/close menu
  function setMenu(open) {
    profileMenu.classList.toggle('hidden', !open);
    profileBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  // Toggle profile menu
  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = !profileMenu.classList.contains('hidden');
    setMenu(!isOpen);
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!profileMenu.classList.contains('hidden')) {
      if (!profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
        setMenu(false);
      }
    }
  });

  // Close with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  // Header shadow on scroll
  function checkHeader() {
    if (window.scrollY > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', checkHeader);
  checkHeader();

  // Dark mode persistence
  const storageKey = 'luxe-dark';
  function applyDark(isDark) {
    if (isDark) {
      document.body.classList.add('dark');
      darkIcon.textContent = '☀️';
      profileMenu.classList.add('dark-menu');
    } else {
      document.body.classList.remove('dark');
      darkIcon.textContent = '🌙';
      profileMenu.classList.remove('dark-menu');
    }
    localStorage.setItem(storageKey, isDark ? '1' : '0');
  }

  // Initialize from localStorage or system preference
  const saved = localStorage.getItem(storageKey);
  if (saved === null) {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyDark(prefersDark);
  } else {
    applyDark(saved === '1');
  }

  // Toggle dark mode from dropdown
  darkToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isDark = document.body.classList.contains('dark');
    applyDark(!isDark);
  });

  // Close dropdown when navigating inside menu
  profileMenu.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => setMenu(false));
  });
})();
