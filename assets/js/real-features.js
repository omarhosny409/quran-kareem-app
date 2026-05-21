
(function () {
  'use strict';

  const SURAHS = [
    { id: 1, name: 'الفاتحة', english: 'Al-Fatihah', type: 'مكية', ayahs: 7 },
    { id: 2, name: 'البقرة', english: 'Al-Baqarah', type: 'مدنية', ayahs: 286 },
    { id: 3, name: 'آل عمران', english: 'Aal-Imran', type: 'مدنية', ayahs: 200 },
    { id: 4, name: 'النساء', english: 'An-Nisa', type: 'مدنية', ayahs: 176 },
    { id: 5, name: 'المائدة', english: 'Al-Ma’idah', type: 'مدنية', ayahs: 120 },
    { id: 6, name: 'الأنعام', english: 'Al-An’am', type: 'مكية', ayahs: 165 },
    { id: 7, name: 'الأعراف', english: 'Al-A’raf', type: 'مكية', ayahs: 206 },
    { id: 8, name: 'الأنفال', english: 'Al-Anfal', type: 'مدنية', ayahs: 75 },
    { id: 9, name: 'التوبة', english: 'At-Tawbah', type: 'مدنية', ayahs: 129 },
    { id: 10, name: 'يونس', english: 'Yunus', type: 'مكية', ayahs: 109 },
    { id: 11, name: 'هود', english: 'Hud', type: 'مكية', ayahs: 123 },
    { id: 12, name: 'يوسف', english: 'Yusuf', type: 'مكية', ayahs: 111 },
    { id: 13, name: 'الرعد', english: 'Ar-Ra’d', type: 'مدنية', ayahs: 43 },
    { id: 14, name: 'إبراهيم', english: 'Ibrahim', type: 'مكية', ayahs: 52 },
    { id: 15, name: 'الحجر', english: 'Al-Hijr', type: 'مكية', ayahs: 99 },
    { id: 16, name: 'النحل', english: 'An-Nahl', type: 'مكية', ayahs: 128 },
    { id: 17, name: 'الإسراء', english: 'Al-Isra', type: 'مكية', ayahs: 111 },
    { id: 18, name: 'الكهف', english: 'Al-Kahf', type: 'مكية', ayahs: 110 },
    { id: 19, name: 'مريم', english: 'Maryam', type: 'مكية', ayahs: 98 },
    { id: 20, name: 'طه', english: 'Taha', type: 'مكية', ayahs: 135 },
    { id: 21, name: 'الأنبياء', english: 'Al-Anbiya', type: 'مكية', ayahs: 112 },
    { id: 22, name: 'الحج', english: 'Al-Hajj', type: 'مدنية', ayahs: 78 },
    { id: 23, name: 'المؤمنون', english: 'Al-Mu’minun', type: 'مكية', ayahs: 118 },
    { id: 24, name: 'النور', english: 'An-Nur', type: 'مدنية', ayahs: 64 },
    { id: 25, name: 'الفرقان', english: 'Al-Furqan', type: 'مكية', ayahs: 77 },
    { id: 26, name: 'الشعراء', english: 'Ash-Shu’ara', type: 'مكية', ayahs: 227 },
    { id: 27, name: 'النمل', english: 'An-Naml', type: 'مكية', ayahs: 93 },
    { id: 28, name: 'القصص', english: 'Al-Qasas', type: 'مكية', ayahs: 88 },
    { id: 29, name: 'العنكبوت', english: 'Al-Ankabut', type: 'مكية', ayahs: 69 },
    { id: 30, name: 'الروم', english: 'Ar-Rum', type: 'مكية', ayahs: 60 },
    { id: 31, name: 'لقمان', english: 'Luqman', type: 'مكية', ayahs: 34 },
    { id: 32, name: 'السجدة', english: 'As-Sajdah', type: 'مكية', ayahs: 30 },
    { id: 33, name: 'الأحزاب', english: 'Al-Ahzab', type: 'مدنية', ayahs: 73 },
    { id: 34, name: 'سبأ', english: 'Saba', type: 'مكية', ayahs: 54 },
    { id: 35, name: 'فاطر', english: 'Fatir', type: 'مكية', ayahs: 45 },
    { id: 36, name: 'يس', english: 'Ya-Sin', type: 'مكية', ayahs: 83 },
    { id: 37, name: 'الصافات', english: 'As-Saffat', type: 'مكية', ayahs: 182 },
    { id: 38, name: 'ص', english: 'Sad', type: 'مكية', ayahs: 88 },
    { id: 39, name: 'الزمر', english: 'Az-Zumar', type: 'مكية', ayahs: 75 },
    { id: 40, name: 'غافر', english: 'Ghafir', type: 'مكية', ayahs: 85 },
    { id: 41, name: 'فصلت', english: 'Fussilat', type: 'مكية', ayahs: 54 },
    { id: 42, name: 'الشورى', english: 'Ash-Shura', type: 'مكية', ayahs: 53 },
    { id: 43, name: 'الزخرف', english: 'Az-Zukhruf', type: 'مكية', ayahs: 89 },
    { id: 44, name: 'الدخان', english: 'Ad-Dukhan', type: 'مكية', ayahs: 59 },
    { id: 45, name: 'الجاثية', english: 'Al-Jathiyah', type: 'مكية', ayahs: 37 },
    { id: 46, name: 'الأحقاف', english: 'Al-Ahqaf', type: 'مكية', ayahs: 35 },
    { id: 47, name: 'محمد', english: 'Muhammad', type: 'مدنية', ayahs: 38 },
    { id: 48, name: 'الفتح', english: 'Al-Fath', type: 'مدنية', ayahs: 29 },
    { id: 49, name: 'الحجرات', english: 'Al-Hujurat', type: 'مدنية', ayahs: 18 },
    { id: 50, name: 'ق', english: 'Qaf', type: 'مكية', ayahs: 45 },
    { id: 51, name: 'الذاريات', english: 'Adh-Dhariyat', type: 'مكية', ayahs: 60 },
    { id: 52, name: 'الطور', english: 'At-Tur', type: 'مكية', ayahs: 49 },
    { id: 53, name: 'النجم', english: 'An-Najm', type: 'مكية', ayahs: 62 },
    { id: 54, name: 'القمر', english: 'Al-Qamar', type: 'مكية', ayahs: 55 },
    { id: 55, name: 'الرحمن', english: 'Ar-Rahman', type: 'مدنية', ayahs: 78 },
    { id: 56, name: 'الواقعة', english: 'Al-Waqi’ah', type: 'مكية', ayahs: 96 },
    { id: 57, name: 'الحديد', english: 'Al-Hadid', type: 'مدنية', ayahs: 29 },
    { id: 58, name: 'المجادلة', english: 'Al-Mujadila', type: 'مدنية', ayahs: 22 },
    { id: 59, name: 'الحشر', english: 'Al-Hashr', type: 'مدنية', ayahs: 24 },
    { id: 60, name: 'الممتحنة', english: 'Al-Mumtahanah', type: 'مدنية', ayahs: 13 },
    { id: 61, name: 'الصف', english: 'As-Saff', type: 'مدنية', ayahs: 14 },
    { id: 62, name: 'الجمعة', english: 'Al-Jumu’ah', type: 'مدنية', ayahs: 11 },
    { id: 63, name: 'المنافقون', english: 'Al-Munafiqun', type: 'مدنية', ayahs: 11 },
    { id: 64, name: 'التغابن', english: 'At-Taghabun', type: 'مدنية', ayahs: 18 },
    { id: 65, name: 'الطلاق', english: 'At-Talaq', type: 'مدنية', ayahs: 12 },
    { id: 66, name: 'التحريم', english: 'At-Tahrim', type: 'مدنية', ayahs: 12 },
    { id: 67, name: 'الملك', english: 'Al-Mulk', type: 'مكية', ayahs: 30 },
    { id: 68, name: 'القلم', english: 'Al-Qalam', type: 'مكية', ayahs: 52 },
    { id: 69, name: 'الحاقة', english: 'Al-Haqqah', type: 'مكية', ayahs: 52 },
    { id: 70, name: 'المعارج', english: 'Al-Ma’arij', type: 'مكية', ayahs: 44 },
    { id: 71, name: 'نوح', english: 'Nuh', type: 'مكية', ayahs: 28 },
    { id: 72, name: 'الجن', english: 'Al-Jinn', type: 'مكية', ayahs: 28 },
    { id: 73, name: 'المزمل', english: 'Al-Muzzammil', type: 'مكية', ayahs: 20 },
    { id: 74, name: 'المدثر', english: 'Al-Muddaththir', type: 'مكية', ayahs: 56 },
    { id: 75, name: 'القيامة', english: 'Al-Qiyamah', type: 'مكية', ayahs: 40 },
    { id: 76, name: 'الإنسان', english: 'Al-Insan', type: 'مدنية', ayahs: 31 },
    { id: 77, name: 'المرسلات', english: 'Al-Mursalat', type: 'مكية', ayahs: 50 },
    { id: 78, name: 'النبأ', english: 'An-Naba', type: 'مكية', ayahs: 40 },
    { id: 79, name: 'النازعات', english: 'An-Nazi’at', type: 'مكية', ayahs: 46 },
    { id: 80, name: 'عبس', english: 'Abasa', type: 'مكية', ayahs: 42 },
    { id: 81, name: 'التكوير', english: 'At-Takwir', type: 'مكية', ayahs: 29 },
    { id: 82, name: 'الانفطار', english: 'Al-Infitar', type: 'مكية', ayahs: 19 },
    { id: 83, name: 'المطففين', english: 'Al-Mutaffifin', type: 'مكية', ayahs: 36 },
    { id: 84, name: 'الانشقاق', english: 'Al-Inshiqaq', type: 'مكية', ayahs: 25 },
    { id: 85, name: 'البروج', english: 'Al-Buruj', type: 'مكية', ayahs: 22 },
    { id: 86, name: 'الطارق', english: 'At-Tariq', type: 'مكية', ayahs: 17 },
    { id: 87, name: 'الأعلى', english: 'Al-A’la', type: 'مكية', ayahs: 19 },
    { id: 88, name: 'الغاشية', english: 'Al-Ghashiyah', type: 'مكية', ayahs: 26 },
    { id: 89, name: 'الفجر', english: 'Al-Fajr', type: 'مكية', ayahs: 30 },
    { id: 90, name: 'البلد', english: 'Al-Balad', type: 'مكية', ayahs: 20 },
    { id: 91, name: 'الشمس', english: 'Ash-Shams', type: 'مكية', ayahs: 15 },
    { id: 92, name: 'الليل', english: 'Al-Layl', type: 'مكية', ayahs: 21 },
    { id: 93, name: 'الضحى', english: 'Ad-Duhaa', type: 'مكية', ayahs: 11 },
    { id: 94, name: 'الشرح', english: 'Ash-Sharh', type: 'مكية', ayahs: 8 },
    { id: 95, name: 'التين', english: 'At-Tin', type: 'مكية', ayahs: 8 },
    { id: 96, name: 'العلق', english: 'Al-Alaq', type: 'مكية', ayahs: 19 },
    { id: 97, name: 'القدر', english: 'Al-Qadr', type: 'مكية', ayahs: 5 },
    { id: 98, name: 'البينة', english: 'Al-Bayyinah', type: 'مدنية', ayahs: 8 },
    { id: 99, name: 'الزلزلة', english: 'Az-Zalzalah', type: 'مدنية', ayahs: 8 },
    { id: 100, name: 'العاديات', english: 'Al-Adiyat', type: 'مكية', ayahs: 11 },
    { id: 101, name: 'القارعة', english: 'Al-Qari’ah', type: 'مكية', ayahs: 11 },
    { id: 102, name: 'التكاثر', english: 'At-Takathur', type: 'مكية', ayahs: 8 },
    { id: 103, name: 'العصر', english: 'Al-Asr', type: 'مكية', ayahs: 3 },
    { id: 104, name: 'الهمزة', english: 'Al-Humazah', type: 'مكية', ayahs: 9 },
    { id: 105, name: 'الفيل', english: 'Al-Fil', type: 'مكية', ayahs: 5 },
    { id: 106, name: 'قريش', english: 'Quraysh', type: 'مكية', ayahs: 4 },
    { id: 107, name: 'الماعون', english: 'Al-Ma’un', type: 'مكية', ayahs: 7 },
    { id: 108, name: 'الكوثر', english: 'Al-Kawthar', type: 'مكية', ayahs: 3 },
    { id: 109, name: 'الكافرون', english: 'Al-Kafirun', type: 'مكية', ayahs: 6 },
    { id: 110, name: 'النصر', english: 'An-Nasr', type: 'مدنية', ayahs: 3 },
    { id: 111, name: 'المسد', english: 'Al-Masad', type: 'مكية', ayahs: 5 },
    { id: 112, name: 'الإخلاص', english: 'Al-Ikhlas', type: 'مكية', ayahs: 4 },
    { id: 113, name: 'الفلق', english: 'Al-Falaq', type: 'مكية', ayahs: 5 },
    { id: 114, name: 'الناس', english: 'An-Nas', type: 'مكية', ayahs: 6 }
  ];
  const KAABA = { lat: 21.422487, lon: 39.826206 };
  const DEFAULT_LOCATION = { lat: 30.0444, lon: 31.2357, label: 'القاهرة' };
  const CACHE_NAMES = {
    api: 'qma-real-api-v1',
    audio: 'qma-real-audio-v1'
  };

  const HADITH_FALLBACK = [
    {
      title: 'إنما الأعمال بالنيات',
      text: 'عن أمير المؤمنين عمر بن الخطاب رضي الله عنه قال: سمعت رسول الله ﷺ يقول: إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى.',
      source: 'متفق عليه'
    },
    {
      title: 'من حسن إسلام المرء',
      text: 'عن أبي هريرة رضي الله عنه قال: قال رسول الله ﷺ: من حسن إسلام المرء تركه ما لا يعنيه.',
      source: 'حديث حسن'
    },
    {
      title: 'لا يؤمن أحدكم',
      text: 'عن أنس بن مالك رضي الله عنه عن النبي ﷺ قال: لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه.',
      source: 'متفق عليه'
    },
    {
      title: 'الدين النصيحة',
      text: 'عن تميم الداري رضي الله عنه أن النبي ﷺ قال: الدين النصيحة.',
      source: 'صحيح مسلم'
    }
  ];

  const ADHKAR = {
    morning: [
      { text: 'أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له.', count: 1 },
      { text: 'اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور.', count: 1 },
      { text: 'سبحان الله وبحمده.', count: 100 },
      { text: 'أعوذ بكلمات الله التامات من شر ما خلق.', count: 3 }
    ],
    evening: [
      { text: 'أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له.', count: 1 },
      { text: 'اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير.', count: 1 },
      { text: 'سبحان الله وبحمده.', count: 100 },
      { text: 'أعوذ بكلمات الله التامات من شر ما خلق.', count: 3 }
    ]
  };

  const RECITERS = [
    { id: 'ar.alafasy', name: 'مشاري راشد العفاسي' },
    { id: 'ar.abdulbasitmurattal', name: 'عبد الباسط عبد الصمد' },
    { id: 'ar.minshawi', name: 'محمد صديق المنشاوي' },
    { id: 'ar.husary', name: 'محمود خليل الحصري' }
  ];

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function toArabicDigits(value) {
    return String(value).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
  }

  function normalizeArabic(value) {
    return String(value || '')
      .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
      .replace(/[إأآٱ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/ـ/g, '')
      .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
      .replace(/[\s\p{P}\p{S}]+/gu, ' ')
      .trim()
      .toLowerCase();
  }

  function readJson(key, fallback = null) {
    try { return JSON.parse(localStorage.getItem(key) || ''); } catch (error) { return fallback; }
  }

  function writeJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) {}
  }

  function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function apiDate() {
    const d = new Date();
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  }

  async function cachePut(url, response, name = CACHE_NAMES.api) {
    if (!('caches' in window) || !response || !(response.ok || response.type === 'opaque')) return;
    try {
      const cache = await caches.open(name);
      await cache.put(url, response.clone());
    } catch (error) {}
  }

  async function cachedFetch(url, options = {}, cacheName = CACHE_NAMES.api) {
    try {
      const response = await fetch(url, options);
      await cachePut(url, response, cacheName);
      return response;
    } catch (error) {
      if (!('caches' in window)) throw error;
      const cache = await caches.open(cacheName);
      const cached = await cache.match(url);
      if (cached) return cached;
      throw error;
    }
  }

  function getStoredLocation() {
    const stored = readJson('qmaGeoLocation');
    if (stored && typeof stored.lat === 'number' && typeof stored.lon === 'number') return stored;
    return null;
  }

  function requestLocation() {
    return new Promise(resolve => {
      const stored = getStoredLocation();
      if (stored) {
        resolve(stored);
        return;
      }
      if (!navigator.geolocation) {
        resolve({ ...DEFAULT_LOCATION, fallback: true });
        return;
      }
      navigator.geolocation.getCurrentPosition(
        position => {
          const value = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            label: 'موقعي الحالي',
            accuracy: Math.round(position.coords.accuracy || 0),
            savedAt: Date.now()
          };
          writeJson('qmaGeoLocation', value);
          resolve(value);
        },
        () => resolve({ ...DEFAULT_LOCATION, fallback: true }),
        { enableHighAccuracy: false, timeout: 7500, maximumAge: 86400000 }
      );
    });
  }

  function clearSheet() {
    const old = $('.qma-sheet-backdrop');
    if (old) old.remove();
  }

  function showSheet(title, bodyHtml, footerHtml = '') {
    clearSheet();
    const node = document.createElement('div');
    node.className = 'qma-sheet-backdrop';
    node.innerHTML = `
      <section class="qma-sheet" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
        <div class="qma-sheet-head"><button type="button" class="qma-sheet-close" aria-label="إغلاق">×</button><h2>${escapeHtml(title)}</h2></div>
        <div class="qma-sheet-body">${bodyHtml}</div>
        ${footerHtml ? `<div class="qma-sheet-footer">${footerHtml}</div>` : ''}
      </section>`;
    document.body.appendChild(node);
    node.addEventListener('click', event => {
      if (event.target === node || event.target.closest('.qma-sheet-close')) clearSheet();
    });
    return node;
  }

  function showToast(message) {
    const old = $('.qma-toast');
    if (old) old.remove();
    const node = document.createElement('div');
    node.className = 'qma-toast';
    node.textContent = message;
    document.body.appendChild(node);
    setTimeout(() => node.remove(), 2600);
  }

  function parseTimeToDate(timeText) {
    const clean = String(timeText || '').split(' ')[0];
    const [hours, minutes] = clean.split(':').map(Number);
    const d = new Date();
    d.setHours(hours || 0, minutes || 0, 0, 0);
    return d;
  }

  function formatPrayerTime(timeText) {
    const d = parseTimeToDate(timeText);
    return d.toLocaleTimeString('ar-EG', { hour: 'numeric', minute: '2-digit' });
  }

  function findNextPrayer(timings) {
    const order = [
      ['Fajr', 'الفجر'],
      ['Dhuhr', 'الظهر'],
      ['Asr', 'العصر'],
      ['Maghrib', 'المغرب'],
      ['Isha', 'العشاء']
    ];
    const now = new Date();
    for (const [key, ar] of order) {
      const when = parseTimeToDate(timings[key]);
      if (when > now) return { key, name: ar, time: timings[key] };
    }
    return { key: 'Fajr', name: 'الفجر', time: timings.Fajr, tomorrow: true };
  }

  async function loadPrayerTimes() {
    if (document.body.dataset.qmaPage !== 'tools') return;
    const card = $('.qma-prayer-card');
    if (!card) return;
    const nextLabel = $('.qma-next-prayer span', card);
    const nextTime = $('.qma-next-prayer strong', card);
    const timesBox = $('.qma-prayer-times', card);
    const foot = $('.qma-card-foot', card);
    if (nextLabel) nextLabel.textContent = 'جار تحميل أوقات الصلاة...';

    const location = await requestLocation();
    const url = `https://api.aladhan.com/v1/timings/${apiDate()}?latitude=${encodeURIComponent(location.lat)}&longitude=${encodeURIComponent(location.lon)}&method=5`;
    let payload = readJson(`qmaPrayer-${todayKey()}`);
    let source = payload ? 'cache' : 'fallback';
    try {
      const response = await cachedFetch(url, { headers: { Accept: 'application/json' } });
      const json = await response.json();
      if (json && json.data && json.data.timings) {
        payload = json.data;
        source = 'network';
        writeJson(`qmaPrayer-${todayKey()}`, payload);
      }
    } catch (error) {}

    if (!payload || !payload.timings) {
      if (nextLabel) nextLabel.textContent = 'أوقات الصلاة غير متاحة الآن';
      return;
    }

    const timings = payload.timings;
    const next = findNextPrayer(timings);
    if (nextLabel) nextLabel.textContent = `الصلاة القادمة: ${next.name}${next.tomorrow ? ' غداً' : ''}`;
    if (nextTime) nextTime.textContent = formatPrayerTime(next.time);
    if (timesBox) {
      timesBox.innerHTML = [
        ['Fajr', 'الفجر'],
        ['Dhuhr', 'الظهر'],
        ['Asr', 'العصر'],
        ['Maghrib', 'المغرب'],
        ['Isha', 'العشاء']
      ].map(([key, name]) => `<div class="qma-prayer-time ${key === next.key ? 'is-next' : ''}">${name}<b>${formatPrayerTime(timings[key])}</b></div>`).join('');
    }
    const hijri = payload.date && payload.date.hijri ? `${payload.date.hijri.day} ${payload.date.hijri.month.ar} ${payload.date.hijri.year}` : new Date().toLocaleDateString('ar-EG');
    if ($('#qma-hijri-date')) $('#qma-hijri-date').textContent = hijri;
    if (foot) {
      const locationText = location.fallback ? `${location.label} - موقع افتراضي` : location.label;
      const sourceText = source === 'network' ? 'بيانات مباشرة' : 'آخر بيانات محفوظة';
      foot.innerHTML = `<span>${escapeHtml(hijri)}</span><span>${escapeHtml(locationText)} · ${sourceText}</span>`;
    }
  }

  function bearingToKaaba(lat, lon) {
    const toRad = deg => deg * Math.PI / 180;
    const toDeg = rad => rad * 180 / Math.PI;
    const phi1 = toRad(lat);
    const phi2 = toRad(KAABA.lat);
    const delta = toRad(KAABA.lon - lon);
    const y = Math.sin(delta);
    const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(delta);
    return (toDeg(Math.atan2(y, x)) + 360) % 360;
  }

  async function showQibla() {
    const location = await requestLocation();
    const bearing = bearingToKaaba(location.lat, location.lon);
    showSheet('القبلة', `
      <div class="qma-qibla-box">
        <div class="qma-qibla-compass"><i style="transform: rotate(${bearing}deg)">▲</i></div>
        <strong>${toArabicDigits(Math.round(bearing))}°</strong>
        <p>الاتجاه محسوب من موقعك إلى الكعبة. ${location.fallback ? 'تم استخدام القاهرة كموقع افتراضي لأن إذن الموقع غير متاح.' : 'تم استخدام موقع الجهاز.'}</p>
      </div>
    `);
  }

  async function openNearestMosque() {
    const location = await requestLocation();
    const url = `https://www.google.com/maps/search/${encodeURIComponent('مسجد')}/@${location.lat},${location.lon},15z`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function showTasbeeh() {
    const key = 'qmaTasbeehCount';
    const count = Number(localStorage.getItem(key) || 0);
    const sheet = showSheet('المسبحة', `
      <div class="qma-tasbeeh">
        <button class="qma-tasbeeh-count" type="button" id="qma-tasbeeh-hit">${toArabicDigits(count)}</button>
        <div class="qma-tasbeeh-actions"><button class="qma-pill-btn" id="qma-tasbeeh-reset" type="button">تصفير</button></div>
      </div>`);
    const hit = $('#qma-tasbeeh-hit', sheet);
    hit.addEventListener('click', () => {
      const next = Number(localStorage.getItem(key) || 0) + 1;
      localStorage.setItem(key, String(next));
      hit.textContent = toArabicDigits(next);
      if (navigator.vibrate) navigator.vibrate(18);
    });
    $('#qma-tasbeeh-reset', sheet).addEventListener('click', () => {
      localStorage.setItem(key, '0');
      hit.textContent = '٠';
    });
  }

  function showStats() {
    const saved = readJson('qmaSavedPages', []);
    const current = Number(localStorage.getItem('qmaCurrentPage') || 149);
    const reads = Number(localStorage.getItem('qmaReadSessions') || 0);
    const cached = countCachedPagesSync();
    showSheet('إحصائيات', `
      <div class="qma-stats-grid">
        <div><b>${toArabicDigits(current)}</b><span>آخر صفحة</span></div>
        <div><b>${toArabicDigits(saved.length)}</b><span>صفحات محفوظة</span></div>
        <div><b>${toArabicDigits(reads)}</b><span>جلسات قراءة</span></div>
        <div><b>${toArabicDigits(cached)}</b><span>صفحات في المتصفح</span></div>
      </div>`);
  }

  function countCachedPagesSync() {
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('qma-page-v1-')) count += 1;
    }
    return count;
  }

  function shareApp() {
    const data = { title: document.title, text: 'تطبيق القرآن الكريم', url: location.href };
    if (navigator.share) {
      navigator.share(data).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(location.href).then(() => showToast('تم نسخ الرابط'));
    }
  }

  function showReciteTool() {
    const pages = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('qma-page-v1-')) {
        const data = readJson(key);
        if (data && Array.isArray(data.ayahs)) pages.push(...data.ayahs);
      }
    }
    const item = pages.length ? pages[Math.floor(Math.random() * pages.length)] : null;
    showSheet('تسميع', item ? `
      <div class="qma-recitation-test">
        <p><b>أكمل الآية:</b></p>
        <p>${escapeHtml(item.text.split(' ').slice(0, 5).join(' '))} ...</p>
        <textarea placeholder="اكتب من حفظك هنا"></textarea>
        <details><summary>إظهار النص الكامل</summary><p>${escapeHtml(item.text)}</p></details>
      </div>` : '<p>افتح صفحات من المصحف أولاً أو حمّلها للأوفلاين، وبعدها تعمل أداة التسميع من البيانات المحفوظة.</p>');
  }

  function showAdhkar(type) {
    const rows = (ADHKAR[type] || ADHKAR.morning).map((item, index) => `
      <article class="qma-dhikr-card" data-dhikr-index="${index}">
        <p>${escapeHtml(item.text)}</p>
        <button type="button" class="qma-dhikr-counter" data-max="${item.count}">${toArabicDigits(item.count)}</button>
      </article>`).join('');
    const sheet = showSheet(type === 'evening' ? 'أذكار المساء' : 'أذكار الصباح', rows);
    $$('.qma-dhikr-counter', sheet).forEach(button => {
      button.addEventListener('click', () => {
        const next = Math.max(0, Number(button.textContent.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))) - 1);
        button.textContent = toArabicDigits(next);
        button.classList.toggle('is-done', next === 0);
      });
    });
  }

  function bindToolsPage() {
    if (document.body.dataset.qmaPage !== 'tools') return;
    loadPrayerTimes();
    $$('[data-action]').forEach(button => {
      button.addEventListener('click', event => {
        const action = event.currentTarget.dataset.action;
        if (action === 'qibla') showQibla();
        if (action === 'stats') showStats();
        if (action === 'mosque') openNearestMosque();
        if (action === 'recite') showReciteTool();
        if (action === 'share') shareApp();
        if (action === 'tasbeeh') showTasbeeh();
      });
    });
    const duaButtons = $$('.qma-dua-button');
    if (duaButtons[0]) duaButtons[0].addEventListener('click', () => showAdhkar('morning'));
    if (duaButtons[1]) duaButtons[1].addEventListener('click', () => showAdhkar('evening'));
  }

  function audioUrl(reciter, surah) {
    return `https://cdn.islamic.network/quran/audio-surah/128/${encodeURIComponent(reciter)}/${Number(surah)}.mp3`;
  }

  function bindAudioPage() {
    if (document.body.dataset.qmaPage !== 'audio') return;
    const app = $('.qma-app');
    if (!app) return;
    const panel = document.createElement('section');
    panel.className = 'qma-card qma-audio-player-card';
    panel.innerHTML = `
      <h2>مشغل التلاوة</h2>
      <div class="qma-audio-controls">
        <label>القارئ<select id="qma-reciter-select">${RECITERS.map(r => `<option value="${r.id}">${escapeHtml(r.name)}</option>`).join('')}</select></label>
        <label>السورة<select id="qma-surah-select">${SURAHS.map(s => `<option value="${s.id}">${s.id}. ${escapeHtml(s.name)}</option>`).join('')}</select></label>
      </div>
      <audio id="qma-audio-player" controls preload="none"></audio>
      <div class="qma-audio-actions"><button class="qma-pill-btn" id="qma-play-audio" type="button">تشغيل</button><button class="qma-pill-btn is-outline" id="qma-cache-audio" type="button">حفظ هذا الصوت</button></div>
      <p class="qma-audio-status" id="qma-audio-status">الصوت يعمل من الإنترنت، ويحاول المتصفح حفظ الملف بعد الضغط على حفظ.</p>`;
    const anchor = $('.qma-library-head');
    if (anchor) anchor.after(panel); else app.prepend(panel);

    const reciter = $('#qma-reciter-select');
    const surah = $('#qma-surah-select');
    const player = $('#qma-audio-player');
    const status = $('#qma-audio-status');
    function setSource(play) {
      const url = audioUrl(reciter.value, surah.value);
      player.src = url;
      localStorage.setItem('qmaLastAudio', JSON.stringify({ reciter: reciter.value, surah: surah.value }));
      if (play) player.play().catch(() => { status.textContent = 'اضغط تشغيل مرة أخرى إذا منع المتصفح التشغيل التلقائي.'; });
    }
    const last = readJson('qmaLastAudio');
    if (last) {
      reciter.value = last.reciter || reciter.value;
      surah.value = String(last.surah || surah.value);
    }
    setSource(false);
    $('#qma-play-audio').addEventListener('click', () => setSource(true));
    reciter.addEventListener('change', () => setSource(false));
    surah.addEventListener('change', () => setSource(false));
    $('#qma-cache-audio').addEventListener('click', async () => {
      const url = audioUrl(reciter.value, surah.value);
      status.textContent = 'جار حفظ ملف الصوت...';
      try {
        if (!('caches' in window)) throw new Error('no-cache');
        const cache = await caches.open(CACHE_NAMES.audio);
        const response = await fetch(url, { mode: 'no-cors' });
        await cache.put(url, response.clone());
        status.textContent = 'تم حفظ الصوت في كاش المتصفح. يعتمد التشغيل أوفلاين على دعم المتصفح للكاش.';
      } catch (error) {
        status.textContent = 'تعذر حفظ الصوت. التشغيل المباشر ما زال يعمل عند وجود إنترنت.';
      }
    });
    $$('.qma-row', document).forEach((row, index) => {
      row.addEventListener('click', event => {
        event.preventDefault();
        surah.value = String([1, 2, 18, 36, 67, 112][index % 6]);
        setSource(true);
      });
    });
  }

  async function getHadithItems() {
    const cached = readJson('qmaNawawiHadiths');
    if (cached && Array.isArray(cached) && cached.length) return cached;
    try {
      const url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-nawawi.min.json';
      const response = await cachedFetch(url, { headers: { Accept: 'application/json' } });
      const payload = await response.json();
      const source = Array.isArray(payload.hadiths) ? payload.hadiths : [];
      const items = source.map((item, index) => ({
        title: `الحديث ${toArabicDigits(item.hadithnumber || index + 1)}`,
        text: item.text || item.hadith || '',
        source: 'الأربعون النووية'
      })).filter(item => item.text);
      if (items.length) {
        writeJson('qmaNawawiHadiths', items);
        return items;
      }
    } catch (error) {}
    return HADITH_FALLBACK;
  }

  function renderHadithArticle(items, index) {
    const article = $('.qma-reader-article');
    if (!article) return;
    const item = items[index % items.length];
    article.innerHTML = `
      <time>${new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</time>
      <h2>${escapeHtml(item.title)}</h2>
      <p>${escapeHtml(item.text)}</p>
      <p>المصدر: ${escapeHtml(item.source || 'مصدر محفوظ')}</p>
      <hr>
      <div class="qma-hadith-actions">
        <button class="qma-pill-btn" id="qma-prev-hadith" type="button">السابق</button>
        <button class="qma-pill-btn" id="qma-next-hadith" type="button">التالي</button>
      </div>`;
    localStorage.setItem('qmaHadithIndex', String(index % items.length));
    $('#qma-next-hadith').addEventListener('click', () => renderHadithArticle(items, (index + 1) % items.length));
    $('#qma-prev-hadith').addEventListener('click', () => renderHadithArticle(items, (index - 1 + items.length) % items.length));
  }

  async function bindHadithPage() {
    if (document.body.dataset.qmaPage !== 'notify') return;
    const items = await getHadithItems();
    const daily = Math.floor(Date.now() / 86400000) % items.length;
    const saved = Number(localStorage.getItem('qmaHadithIndex'));
    renderHadithArticle(items, Number.isInteger(saved) ? saved : daily);
  }

  function bindLibraryPage() {
    if (document.body.dataset.qmaPage !== 'library') return;
    const card = $('.qma-books-card');
    if (!card) return;
    const cached = countCachedPagesSync();
    const current = localStorage.getItem('qmaCurrentPage') || '149';
    const summary = document.createElement('div');
    summary.className = 'qma-library-summary';
    summary.innerHTML = `
      <div><b>${toArabicDigits(current)}</b><span>آخر قراءة</span></div>
      <div><b>${toArabicDigits(cached)}</b><span>صفحات محفوظة</span></div>
      <a class="qma-pill-btn" href="surah.html?page=${encodeURIComponent(current)}">فتح المصحف</a>`;
    card.appendChild(summary);
    const add = $('.qma-books-card .qma-pill-btn');
    if (add) add.addEventListener('click', () => showSheet('إضافة ملف', '<p>إضافة ملفات صوت أو كتب محلية تحتاج اختيار ملف من جهازك. النسخة الحالية تشغّل القرآن والحديث والتفسير من الإنترنت مع كاش أوفلاين لما يتم تحميلها.</p>'));
  }

  async function fetchTafsir(surah, ayah) {
    const url = `https://api.quran-tafseer.com/tafsir/1/${Number(surah)}/${Number(ayah)}`;
    const response = await cachedFetch(url, { headers: { Accept: 'application/json' } });
    return response.json();
  }

  function bindTafsirPage() {
    if (document.body.dataset.qmaPage !== 'tafsir') return;
    const app = $('.qma-app');
    if (!app) return;
    const tool = document.createElement('section');
    tool.className = 'qma-card qma-tafsir-tool';
    tool.innerHTML = `
      <h2>تفسير آية</h2>
      <form id="qma-tafsir-form" class="qma-tafsir-form">
        <select id="qma-tafsir-surah">${SURAHS.map(s => `<option value="${s.id}">${s.id}. ${escapeHtml(s.name)}</option>`).join('')}</select>
        <input id="qma-tafsir-ayah" type="number" min="1" value="1" inputmode="numeric" aria-label="رقم الآية">
        <button class="qma-pill-btn" type="submit">عرض</button>
      </form>
      <article id="qma-tafsir-result" class="qma-tafsir-result">اختر السورة والآية لعرض التفسير. يعمل من الإنترنت ويحفظ آخر النتائج.</article>`;
    app.appendChild(tool);
    $('#qma-tafsir-form').addEventListener('submit', async event => {
      event.preventDefault();
      const result = $('#qma-tafsir-result');
      result.textContent = 'جار التحميل...';
      try {
        const data = await fetchTafsir($('#qma-tafsir-surah').value, $('#qma-tafsir-ayah').value);
        result.innerHTML = `<h3>${escapeHtml(data.surah_name || '')} - آية ${toArabicDigits(data.ayah_number || $('#qma-tafsir-ayah').value)}</h3><p>${escapeHtml(data.text || 'لا يوجد نص تفسير.')}</p>`;
      } catch (error) {
        result.textContent = 'تعذر تحميل التفسير. افتح نفس الآية مرة واحدة أثناء الاتصال ثم ستظهر من الكاش عند توفرها.';
      }
    });
  }

  async function cacheQuranPage(page) {
    const url = `https://api.alquran.cloud/v1/page/${page}/quran-uthmani`;
    const response = await cachedFetch(url, { headers: { Accept: 'application/json' } });
    const payload = await response.clone().json();
    if (!payload || !payload.data || !Array.isArray(payload.data.ayahs)) throw new Error('bad-page');
    const ayahs = payload.data.ayahs;
    try {
      const first = ayahs[0] || {};
      writeJson(`qma-page-v1-${page}`, {
        number: Number(page),
        source: 'offline-download',
        juz: first.juz || 1,
        ayahs: ayahs.map(ayah => ({
          number: ayah.number,
          numberInSurah: ayah.numberInSurah,
          page: ayah.page || Number(page),
          juz: ayah.juz || first.juz || 1,
          surah: { number: ayah.surah && ayah.surah.number, name: ayah.surah && ayah.surah.name },
          text: ayah.text
        }))
      });
    } catch (error) {}
    return ayahs.length;
  }

  function bindSettingsPage() {
    if (document.body.dataset.qmaPage !== 'settings') return;
    const download = $('#qma-download-pages');
    const status = $('#qma-offline-status');
    if (download) {
      download.addEventListener('click', async event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        download.disabled = true;
        let ok = 0;
        for (let page = 1; page <= 604; page += 1) {
          try {
            await cacheQuranPage(page);
            ok += 1;
          } catch (error) {}
          if (status && (page === 1 || page % 10 === 0 || page === 604)) status.textContent = `تم حفظ ${toArabicDigits(ok)} صفحة من ${toArabicDigits(page)} محاولة في كاش المتصفح.`;
          await new Promise(resolve => setTimeout(resolve, 40));
        }
        if (status) status.textContent = `انتهى تحميل المصحف: ${toArabicDigits(ok)} / ٦٠٤ صفحة. بعد ذلك افتح المصحف بدون إنترنت.`;
        download.disabled = false;
      }, true);
    }
    const sync = $('#qma-sync-now');
    if (sync) sync.addEventListener('click', () => showToast(navigator.onLine ? 'الاتصال متاح. الكاش سيُحدّث عند فتح البيانات.' : 'لا يوجد اتصال. يتم استخدام البيانات المحفوظة.'));
    const importButton = $('#qma-import-settings');
    if (importButton) importButton.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json';
      input.addEventListener('change', async () => {
        const file = input.files && input.files[0];
        if (!file) return;
        try {
          const data = JSON.parse(await file.text());
          if (data.theme) localStorage.setItem('quranTheme', data.theme);
          if (data.font) localStorage.setItem('qmaFontScale', data.font);
          if (data.page) localStorage.setItem('qmaCurrentPage', data.page);
          if (Array.isArray(data.saved)) writeJson('qmaSavedPages', data.saved);
          showToast('تم استيراد النسخة الاحتياطية');
        } catch (error) { showToast('ملف النسخة غير صالح'); }
      });
      input.click();
    });
  }

  function bindMushafEnhancements() {
    if (document.body.dataset.qmaPage !== 'mushaf') return;
    const sessions = Number(localStorage.getItem('qmaReadSessions') || 0) + 1;
    localStorage.setItem('qmaReadSessions', String(sessions));
    const audio = $('#qma-audio-toggle');
    if (audio) audio.addEventListener('click', () => {
      const current = Number(localStorage.getItem('qmaCurrentPage') || 149);
      showSheet('الصوت', `<p>لتشغيل التلاوة اختر السورة من صفحة الصوتيات. آخر صفحة قراءة: ${toArabicDigits(current)}.</p><p><a class="qma-pill-btn" href="audio.html">فتح الصوتيات</a></p>`);
    });
    const mode = $('#qma-reader-mode');
    if (mode) mode.addEventListener('click', () => document.body.classList.toggle('qma-reader-clean'));
  }

  function bindConnectivityBadge() {
    const badge = document.createElement('div');
    badge.className = 'qma-connectivity-badge';
    document.body.appendChild(badge);
    function update() {
      badge.textContent = navigator.onLine ? 'متصل' : 'أوفلاين';
      badge.classList.toggle('is-offline', !navigator.onLine);
    }
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    update();
  }

  function init() {
    bindConnectivityBadge();
    bindToolsPage();
    bindAudioPage();
    bindHadithPage();
    bindLibraryPage();
    bindTafsirPage();
    bindSettingsPage();
    bindMushafEnhancements();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
