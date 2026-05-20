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

  registerServiceWorker();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindInstallPrompt);
  } else {
    bindInstallPrompt();
  }
})();
