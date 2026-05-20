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



  function bindMobileMenu() {
    const toggle = document.querySelector('.quran-menu-toggle');
    const nav = document.querySelector('.quran-site-nav');
    const backdrop = document.querySelector('.quran-menu-backdrop');
    if (!toggle || !nav) return;

    function setMenu(open) {
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
      if (window.matchMedia('(min-width: 821px)').matches) setMenu(false);
    });
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

  registerServiceWorker();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { bindMobileMenu(); bindInstallPrompt(); });
  } else {
    bindMobileMenu();
    bindInstallPrompt();
  }
})();
