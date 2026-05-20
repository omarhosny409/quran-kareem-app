(function () {
  'use strict';

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  let deferredInstallPrompt = null;

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js', { scope: './' }).catch(() => {});
    });
  }

  function createInstallButton() {
    if (document.querySelector('.quran-install-app')) return document.querySelector('.quran-install-app');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'quran-install-app';
    button.hidden = true;
    button.innerHTML = '<span>تثبيت التطبيق</span><small>افتحه من شاشة الموبايل مباشرة</small>';
    document.body.appendChild(button);
    return button;
  }

  function bindInstallPrompt() {
    if (isStandalone) return;

    const button = createInstallButton();

    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      deferredInstallPrompt = event;
      button.hidden = false;
    });

    button.addEventListener('click', async () => {
      if (!deferredInstallPrompt) return;
      button.hidden = true;
      deferredInstallPrompt.prompt();
      try {
        await deferredInstallPrompt.userChoice;
      } finally {
        deferredInstallPrompt = null;
      }
    });

    window.addEventListener('appinstalled', () => {
      localStorage.setItem('quranPwaInstalled', '1');
      button.hidden = true;
    });
  }

  function bindGoToTop() {
    let button = document.getElementById('goToTopBtn');
    if (!button) {
      button = document.createElement('button');
      button.id = 'goToTopBtn';
      button.className = 'go-to-top';
      button.type = 'button';
      button.setAttribute('aria-label', 'الرجوع إلى الأعلى');
      button.textContent = '↑';
      document.body.appendChild(button);
    }

    if (button.dataset.goTopBound === '1') return;
    button.dataset.goTopBound = '1';

    function sync() {
      button.classList.toggle('is-visible', window.scrollY > 320);
    }

    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();

    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function bindMobileThemePanel() {
    const toggle = document.querySelector('[data-mobile-theme-toggle]');
    const panel = document.getElementById('quran-mobile-theme-panel');
    if (!toggle || !panel) return;

    function setPanel(open) {
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('quran-mobile-theme-open', open);
    }

    toggle.addEventListener('click', event => {
      event.stopPropagation();
      setPanel(panel.hidden);
    });

    panel.addEventListener('click', event => {
      event.stopPropagation();
      const themeButton = event.target.closest('[data-theme]');
      if (themeButton) setTimeout(() => setPanel(false), 120);
    });

    document.addEventListener('click', event => {
      if (panel.hidden) return;
      if (event.target.closest('.quran-mobile-tabbar')) return;
      setPanel(false);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') setPanel(false);
    });
  }

  function syncBottomNavActiveState() {
    const pathname = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.quran-mobile-tabbar a').forEach(link => {
      const target = (link.getAttribute('href') || '').split('?')[0].toLowerCase();
      if (target === pathname || (!pathname && target === 'index.html')) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function bindOldMenuSafety() {
    const toggle = document.querySelector('.quran-menu-toggle');
    const nav = document.querySelector('.quran-site-nav');
    const backdrop = document.querySelector('.quran-menu-backdrop');
    if (!toggle || !nav) return;

    function setMenu(open) {
      if (window.matchMedia('(max-width: 820px)').matches) open = false;
      document.body.classList.toggle('quran-menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
      if (backdrop) backdrop.hidden = !open;
    }

    toggle.addEventListener('click', () => setMenu(!document.body.classList.contains('quran-menu-open')));
    backdrop?.addEventListener('click', () => setMenu(false));
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') setMenu(false);
    });
    window.addEventListener('resize', () => {
      if (window.matchMedia('(max-width: 820px)').matches || window.matchMedia('(min-width: 821px)').matches) setMenu(false);
    });
  }

  function initUi() {
    bindOldMenuSafety();
    bindInstallPrompt();
    bindGoToTop();
    bindMobileThemePanel();
    syncBottomNavActiveState();
  }

  registerServiceWorker();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUi);
  } else {
    initUi();
  }
})();
