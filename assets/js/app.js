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

  const TAFSIRS = [
    { key: 'siraj', label: 'السراج', api: 'jsdelivr', edition: 'ara-sirajtafseer' },
    { key: 'muyassar', label: 'الميسر', api: 'quran-tafseer', id: 1 },
    { key: 'saadi', label: 'السعدي', api: 'quran-tafseer', id: 3 },
    { key: 'ibn-kathir', label: 'ابن كثير', api: 'quran-tafseer', id: 4 },
    { key: 'quranpedia', label: 'موسوعة قرآنية', api: 'quranpedia', id: 1 }
  ];

  const API = {
    quranCloud: 'https://api.alquran.cloud/v1',
    quranTafseer: 'https://api.quran-tafseer.com',
    quranpedia: 'https://api.quranpedia.net/v1',
    jsdelivrQuran: 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1'
  };

  const state = {
    currentSurah: 1,
    currentAyahs: [],
    selectedWord: null,
    fontScale: Number(localStorage.getItem('quranFontScale') || '1')
  };

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  function params() {
    try { return new URLSearchParams(window.location.search); } catch (error) { return new URLSearchParams(); }
  }

  function clampSurah(value) {
    const n = Number(value);
    return Number.isInteger(n) && n >= 1 && n <= 114 ? n : 1;
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function stripHtml(value) {
    const div = document.createElement('div');
    div.innerHTML = String(value || '');
    return div.textContent || div.innerText || '';
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
      .replace(/[\uFEFF]/g, '')
      .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
      .replace(/[\s\p{P}\p{S}]+/gu, ' ')
      .trim()
      .toLowerCase();
  }

  function getSurah(id) {
    return SURAHS.find(item => item.id === Number(id)) || SURAHS[0];
  }

  function setTheme(theme) {
    const selected = theme || localStorage.getItem('quranTheme') || 'emerald';
    document.documentElement.setAttribute('data-quran-theme', selected);
    localStorage.setItem('quranTheme', selected);
    $$('[data-theme]').forEach(button => button.classList.toggle('is-active', button.dataset.theme === selected));
  }

  function setFontScale(scale) {
    state.fontScale = Math.min(1.45, Math.max(0.82, Number(scale.toFixed(2))));
    document.documentElement.style.setProperty('--quran-font-scale', state.fontScale);
    localStorage.setItem('quranFontScale', String(state.fontScale));
  }

  function renderSurahOptions() {
    const select = $('#quran-surah-select');
    if (!select) return;
    select.innerHTML = SURAHS.map(surah => (
      `<option value="${surah.id}">${surah.id}. ${surah.name} - ${surah.ayahs} آية</option>`
    )).join('');
  }

  function surahCardMarkup(surah, active = false) {
    return `
      <button type="button" class="quran-surah-card${active ? ' is-active' : ''}" data-surah="${surah.id}">
        <div class="quran-surah-card__top">
          <span class="quran-surah-card__num">${surah.id}</span>
          <span>${surah.type}</span>
        </div>
        <h3>${escapeHtml(surah.name)}</h3>
        <p>${escapeHtml(surah.english)}</p>
        <p>${surah.ayahs} آية · الترتيب ${surah.id}</p>
      </button>`;
  }

  function renderSurahGrid(query = '') {
    const grid = $('#quran-surah-grid');
    if (!grid) return;
    const normalized = normalizeArabic(query);
    const filtered = SURAHS.filter(surah => {
      if (!normalized) return true;
      return normalizeArabic(`${surah.id} ${surah.name} ${surah.english} ${surah.type}`).includes(normalized);
    });
    grid.innerHTML = filtered.map(surah => surahCardMarkup(surah, surah.id === state.currentSurah)).join('') || '<p class="quran-muted">لا توجد سورة بهذا البحث.</p>';
    $$('[data-surah]', grid).forEach(button => {
      button.addEventListener('click', () => loadSurah(Number(button.dataset.surah), true));
    });
  }

  function renderMiniIndex() {
    const mini = $('#quran-mini-index');
    if (!mini) return;
    mini.innerHTML = SURAHS.map(surah => `
      <button type="button" data-mini-surah="${surah.id}" class="${surah.id === state.currentSurah ? 'is-active' : ''}">
        ${surah.id}. ${escapeHtml(surah.name)} <small>(${surah.ayahs})</small>
      </button>
    `).join('');
    $$('[data-mini-surah]', mini).forEach(button => {
      button.addEventListener('click', () => loadSurah(Number(button.dataset.miniSurah), true));
    });
  }

  async function fetchSurah(number, force = false) {
    const cacheKey = `quran-surah-v2-${number}`;
    if (!force) {
      const cached = sessionStorage.getItem(cacheKey) || localStorage.getItem(cacheKey);
      if (cached) {
        try { return JSON.parse(cached); } catch (error) {}
      }
    }

    const endpoints = [
      `${API.quranCloud}/surah/${number}/quran-uthmani`,
      `${API.quranCloud}/surah/${number}/ar.alafasy`
    ];

    let lastError = null;
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, { headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = await response.json();
        if (!payload || payload.code !== 200 || !payload.data || !Array.isArray(payload.data.ayahs)) {
          throw new Error('Invalid Quran response');
        }
        localStorage.setItem(cacheKey, JSON.stringify(payload.data));
        return payload.data;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError || new Error('تعذر تحميل السورة');
  }

  function renderCurrentMeta(surah, data) {
    const meta = $('#quran-current-meta');
    if (!meta) return;
    const first = data && data.ayahs && data.ayahs[0];
    const last = data && data.ayahs && data.ayahs[data.ayahs.length - 1];
    meta.innerHTML = `
      <span><b>الترتيب</b><em>${surah.id}</em></span>
      <span><b>عدد الآيات</b><em>${surah.ayahs}</em></span>
      <span><b>نوع النزول</b><em>${surah.type}</em></span>
      <span><b>الصفحات</b><em>${first && last ? `${first.page} - ${last.page}` : '—'}</em></span>
      <span><b>الأجزاء</b><em>${first && last ? `${first.juz} - ${last.juz}` : '—'}</em></span>
    `;
  }

  function wordSpan(word, surah, ayahNumber, position) {
    const clean = String(word || '').replace(/\uFEFF/g, '').trim();
    if (!clean) return '';
    return `<span class="quran-word" tabindex="0" role="button" data-word="${escapeHtml(clean)}" data-surah="${surah}" data-ayah="${ayahNumber}" data-position="${position}">${escapeHtml(clean)}</span>`;
  }

  function renderAyahText(text, surah, ayahNumber) {
    return String(text || '')
      .replace(/\uFEFF/g, '')
      .split(/\s+/)
      .map((word, index) => wordSpan(word, surah, ayahNumber, index + 1))
      .join(' ');
  }

  function renderAyahs(surah, data) {
    const ayahsWrap = $('#quran-ayahs');
    if (!ayahsWrap) return;
    ayahsWrap.innerHTML = data.ayahs.map(ayah => `
      <article id="ayah-${surah.id}-${ayah.numberInSurah}" class="quran-ayah-card" data-ayah-card="${ayah.numberInSurah}">
        <div class="quran-ayah-meta">
          <span class="quran-ayah-number">${ayah.numberInSurah}</span>
          <span>جزء ${ayah.juz || '—'} · صفحة ${ayah.page || '—'} · حزب ${ayah.hizbQuarter || '—'}</span>
        </div>
        <div class="quran-ayah-text">${renderAyahText(ayah.text, surah.id, ayah.numberInSurah)}</div>
      </article>
    `).join('');

    $$('.quran-word', ayahsWrap).forEach(element => {
      element.addEventListener('click', () => selectWord(element));
      element.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectWord(element);
        }
      });
    });
  }

  async function loadSurah(number = 1, scrollToReader = false, force = false) {
    const surah = getSurah(number);
    const loading = $('#quran-loading');
    const ayahsWrap = $('#quran-ayahs');
    state.currentSurah = surah.id;
    state.selectedWord = null;

    if (['/surah.html', '/tafsir.html'].some(path => window.location.pathname.endsWith(path))) {
      const next = new URL(window.location.href);
      next.searchParams.set('surah', String(surah.id));
      window.history.replaceState({}, '', next);
    }

    if ($('#quran-surah-select')) $('#quran-surah-select').value = String(surah.id);
    if ($('#quran-current-name')) $('#quran-current-name').textContent = surah.name;
    if ($('#quran-reader-title')) $('#quran-reader-title').textContent = `سورة ${surah.name}`;
    renderSurahGrid($('#quran-surah-filter') ? $('#quran-surah-filter').value : '');
    renderMiniIndex();

    if (loading) loading.hidden = false;
    if (ayahsWrap) ayahsWrap.innerHTML = '';

    try {
      const data = await fetchSurah(surah.id, force);
      state.currentAyahs = data.ayahs;
      renderCurrentMeta(surah, data);
      renderAyahs(surah, data);
      resetTafsirPanel();
    } catch (error) {
      state.currentAyahs = [];
      renderCurrentMeta(surah, null);
      if (ayahsWrap) {
        ayahsWrap.innerHTML = `<div class="quran-ayah-card quran-error">تعذر تحميل نص السورة الآن. تحقق من اتصال الموقع بالإنترنت أو جرّب إعادة التحميل.</div>`;
      }
    } finally {
      if (loading) loading.hidden = true;
    }

    if (scrollToReader) {
      $('#quran-reader')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function resetTafsirPanel() {
    const panel = $('#quran-word-detail');
    if (!panel) return;
    panel.innerHTML = '';
    const title = $('#quran-tafsir h2');
    if (title) title.textContent = 'حدد كلمة من الآيات';
  }

  function selectWord(element) {
    $$('.quran-word.is-active').forEach(item => item.classList.remove('is-active'));
    element.classList.add('is-active');

    const word = element.dataset.word || element.textContent.trim();
    const surah = Number(element.dataset.surah);
    const ayah = Number(element.dataset.ayah);
    const position = Number(element.dataset.position);
    state.selectedWord = { word, normalized: normalizeArabic(word), surah, ayah, position };
    renderWordDetail();
    $('#quran-tafsir')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function getCurrentAyah(ayahNumber) {
    return state.currentAyahs.find(ayah => Number(ayah.numberInSurah) === Number(ayahNumber));
  }

  function findWordMatches(normalizedWord) {
    if (!normalizedWord) return [];
    return state.currentAyahs
      .filter(ayah => normalizeArabic(ayah.text).split(' ').includes(normalizedWord))
      .slice(0, 10)
      .map(ayah => ({ number: ayah.numberInSurah, text: ayah.text }));
  }

  function renderWordDetail() {
    const panel = $('#quran-word-detail');
    const title = $('#quran-tafsir h2');
    if (!panel || !state.selectedWord) return;

    const { word, normalized, surah, ayah, position } = state.selectedWord;
    const surahInfo = getSurah(surah);
    const matches = findWordMatches(normalized);
    const currentAyah = getCurrentAyah(ayah);

    if (title) title.textContent = `تفسير: ${word}`;
    panel.innerHTML = `
      <div class="quran-word-badge">
        <strong>${escapeHtml(word)}</strong>
        <span>سورة ${escapeHtml(surahInfo.name)} · الآية ${ayah} · الكلمة رقم ${position}</span>
        <span>الصيغة المبسطة للبحث: ${escapeHtml(normalized || word)}</span>
      </div>
      <div class="quran-word-matches">
        <b>مواضع مطابقة داخل السورة الحالية: ${matches.length}</b>
        ${matches.length ? `<ul>${matches.map(match => `<li><b>${match.number}:</b> ${escapeHtml(match.text).replace(new RegExp(escapeRegExp(word), 'g'), `<mark>${escapeHtml(word)}</mark>`)}</li>`).join('')}</ul>` : '<p class="quran-muted">لا توجد مواضع مطابقة أخرى داخل السورة المحملة.</p>'}
      </div>
      <div class="quran-tafsir-tabs">
        ${TAFSIRS.map((source, index) => `<button type="button" data-tafsir="${source.key}" class="${index === 0 ? 'is-active' : ''}">${source.label}</button>`).join('')}
      </div>
      <div id="quran-tafsir-content" class="quran-tafsir-content">جارِ تحميل التفسير...</div>
      <p class="quran-muted">التفسير المعروض تفسير الآية التي وردت فيها الكلمة، مع ربطه بالكلمة المحددة داخل السياق.</p>
      ${currentAyah ? `<div class="quran-tafsir-content"><b>نص الآية:</b><br>${escapeHtml(currentAyah.text)}</div>` : ''}
    `;

    $$('.quran-tafsir-tabs button', panel).forEach(button => {
      button.addEventListener('click', () => {
        $$('.quran-tafsir-tabs button', panel).forEach(item => item.classList.remove('is-active'));
        button.classList.add('is-active');
        loadTafsir(button.dataset.tafsir);
      });
    });

    loadTafsir(TAFSIRS[0].key);
  }

  function escapeRegExp(value) {
    return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function extractTextValue(item) {
    if (!item || typeof item !== 'object') return typeof item === 'string' ? item : '';
    return item.text || item.tafseer || item.tafsir || item.translation || item.translation_text || item.content || item.value || item.note || '';
  }

  function extractQuranpediaText(payload) {
    if (!payload) return '';
    if (Array.isArray(payload.content)) {
      return payload.content.map(item => extractTextValue(item)).filter(Boolean).join('\n\n');
    }
    if (typeof payload.content === 'string') return payload.content;
    return extractTextValue(payload);
  }

  function extractGeneralTafsirText(payload) {
    if (!payload) return '';
    if (typeof payload === 'string') return payload;
    if (Array.isArray(payload)) return payload.map(extractGeneralTafsirText).filter(Boolean).join('\n\n');
    if (payload.tafsirs && Array.isArray(payload.tafsirs)) return extractGeneralTafsirText(payload.tafsirs);
    if (payload.data) return extractGeneralTafsirText(payload.data);
    if (payload.result) return extractGeneralTafsirText(payload.result);
    return extractTextValue(payload);
  }

  function extractJsdelivrVerse(payload, surah, ayah) {
    const wantedSurah = Number(surah);
    const wantedAyah = Number(ayah);

    function verseNumber(item) {
      return Number(item?.verse ?? item?.ayah ?? item?.aya ?? item?.number ?? item?.numberInSurah ?? item?.verse_number ?? item?.ayah_number);
    }

    function chapterNumber(item, inherited) {
      return Number(item?.chapter ?? item?.surah ?? item?.sura ?? item?.chapter_number ?? item?.surah_number ?? item?.id ?? item?.number ?? inherited);
    }

    function textFrom(item) {
      return extractTextValue(item);
    }

    function scan(node, inheritedSurah = null) {
      if (!node) return '';
      if (typeof node === 'string') return '';

      if (Array.isArray(node)) {
        for (const item of node) {
          const found = scan(item, inheritedSurah);
          if (found) return found;
        }
        return '';
      }

      if (typeof node !== 'object') return '';

      const currentSurah = chapterNumber(node, inheritedSurah);
      const currentVerse = verseNumber(node);
      if (currentSurah === wantedSurah && currentVerse === wantedAyah) {
        const direct = textFrom(node);
        if (direct) return direct;
      }

      const collections = [node.quran, node.verses, node.ayahs, node.ayat, node.surahs, node.chapters, node.data, node.result];
      for (const collection of collections) {
        const found = scan(collection, Number.isFinite(currentSurah) ? currentSurah : inheritedSurah);
        if (found) return found;
      }

      const knownKeys = new Set(['quran', 'verses', 'ayahs', 'ayat', 'surahs', 'chapters', 'data', 'result']);
      for (const [key, value] of Object.entries(node)) {
        if (knownKeys.has(key)) continue;
        const numericKey = Number(key);
        const nextSurah = Number.isFinite(numericKey) ? numericKey : (Number.isFinite(currentSurah) ? currentSurah : inheritedSurah);
        if (!Number.isFinite(nextSurah) || nextSurah === wantedSurah) {
          const found = scan(value, nextSurah);
          if (found) return found;
        }
      }
      return '';
    }

    return scan(payload);
  }

  async function fetchJson(url) {
    const response = await fetch(url, { headers: { Accept: 'application/json' }, cache: 'force-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  async function fetchQuranpediaTafsir(surah, ayah, bookId = 1) {
    const endpoint = `${API.quranpedia}/ayah/${surah}/${ayah}/book/${bookId}`;
    const payload = await fetchJson(endpoint);
    return extractQuranpediaText(payload);
  }

  async function fetchQuranTafseerApi(source, surah, ayah) {
    const endpoints = [
      `${API.quranTafseer}/tafseer/${source.id}/${surah}/${ayah}`,
      `${API.quranTafseer}/tafseer/${source.id}/${surah}/${ayah}/${ayah}`
    ];
    let lastError = null;
    for (const endpoint of endpoints) {
      try {
        const payload = await fetchJson(endpoint);
        const text = extractGeneralTafsirText(payload);
        if (stripHtml(text).trim()) return text;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError || new Error('Quran Tafseer API failed');
  }

  async function fetchJsdelivrTafsir(source, surah, ayah) {
    const edition = source.edition || 'ara-sirajtafseer';
    const cacheKey = `quran-tafsir-edition-${edition}`;
    const chapterUrls = [
      `${API.jsdelivrQuran}/editions/${edition}/${surah}.min.json`,
      `${API.jsdelivrQuran}/editions/${edition}/${surah}.json`
    ];

    for (const url of chapterUrls) {
      try {
        const payload = await fetchJson(url);
        const text = extractJsdelivrVerse(payload, surah, ayah) || extractGeneralTafsirText(payload);
        if (stripHtml(text).trim()) return text;
      } catch (error) {}
    }

    let payload = null;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try { payload = JSON.parse(cached); } catch (error) { payload = null; }
    }
    if (!payload) {
      payload = await fetchJson(`${API.jsdelivrQuran}/editions/${edition}.min.json`);
      try { localStorage.setItem(cacheKey, JSON.stringify(payload)); } catch (error) {}
    }

    return extractJsdelivrVerse(payload, surah, ayah);
  }

  async function fetchTafsirFromSource(source, surah, ayah) {
    if (source.api === 'jsdelivr') return fetchJsdelivrTafsir(source, surah, ayah);
    if (source.api === 'quranpedia') return fetchQuranpediaTafsir(surah, ayah, source.id);
    if (source.api === 'quran-tafseer') return fetchQuranTafseerApi(source, surah, ayah);
    throw new Error('Unknown tafsir source');
  }

  async function fetchTafsir(source, surah, ayah) {
    const cacheKey = `quran-tafsir-v4-${source.key}-${surah}-${ayah}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) return { text: cached, label: source.label, fallback: false };

    const orderedSources = [source, ...TAFSIRS.filter(item => item.key !== source.key)];
    let lastError = null;
    for (const candidate of orderedSources) {
      try {
        let text = await fetchTafsirFromSource(candidate, surah, ayah);
        text = stripHtml(text).replace(/\s{3,}/g, ' ').trim();
        if (!text) throw new Error('Empty tafsir response');
        localStorage.setItem(cacheKey, text);
        return { text, label: candidate.label, fallback: candidate.key !== source.key };
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError || new Error('All tafsir sources failed');
  }

  async function loadTafsir(sourceKey) {
    const content = $('#quran-tafsir-content');
    if (!content || !state.selectedWord) return;
    const source = TAFSIRS.find(item => item.key === sourceKey) || TAFSIRS[0];
    content.innerHTML = '<span class="quran-tafsir-status">جارِ تحميل التفسير...</span>';
    content.classList.remove('quran-error', 'is-loaded');

    try {
      const result = await fetchTafsir(source, state.selectedWord.surah, state.selectedWord.ayah);
      content.classList.add('is-loaded');
      const note = result.fallback ? `تم عرض مصدر بديل: ${result.label}` : `المصدر: ${result.label}`;
      content.innerHTML = `<span class="quran-tafsir-status">${escapeHtml(note)}</span><div>${escapeHtml(result.text).replace(/\n/g, '<br>')}</div>`;
    } catch (error) {
      const currentAyah = getCurrentAyah(state.selectedWord.ayah);
      content.classList.add('quran-error');
      content.innerHTML = `تعذر تحميل التفسير من كل المصادر الآن.<br><br><b>نص الآية:</b><br>${currentAyah ? escapeHtml(currentAyah.text) : '—'}<br><span class="quran-tafsir-source-note">تأكد من أن اتصال الإنترنت يعمل، ثم اضغط على مصدر آخر أو أعد فتح الصفحة.</span>`;
    }
  }

  function highlightExact(text, query) {
    const escapedText = escapeHtml(text);
    const cleanedQuery = String(query || '').trim();
    if (!cleanedQuery) return escapedText;
    try {
      return escapedText.replace(new RegExp(escapeRegExp(escapeHtml(cleanedQuery)), 'gi'), match => `<mark>${match}</mark>`);
    } catch (error) {
      return escapedText;
    }
  }

  async function searchQuran() {
    const input = $('#quran-global-search');
    const output = $('#quran-search-results');
    if (!input || !output) return;

    const rawQuery = input.value.trim();
    const query = normalizeArabic(rawQuery);
    if (query.length < 2) {
      output.innerHTML = '<div class="quran-search-result">اكتب كلمتين أو حرفين على الأقل لبدء البحث.</div>';
      return;
    }

    output.innerHTML = '<div class="quran-search-result">جارِ البحث...</div>';

    const surahMatches = SURAHS.filter(surah => normalizeArabic(`${surah.name} ${surah.english} ${surah.id}`).includes(query));
    const surahMarkup = surahMatches.slice(0, 8).map(surah => `
      <button type="button" class="quran-search-result" data-result-surah="${surah.id}">
        <strong>سورة ${escapeHtml(surah.name)}</strong>
        <span>${surah.ayahs} آية · ${surah.type} · ترتيبها ${surah.id}</span>
      </button>
    `).join('');

    try {
      const endpoint = `${API.quranCloud}/search/${encodeURIComponent(rawQuery)}/all/quran-uthmani`;
      const response = await fetch(endpoint, { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const matches = payload && payload.data && Array.isArray(payload.data.matches) ? payload.data.matches : [];
      const resultMarkup = matches.slice(0, 30).map(match => {
        const s = getSurah(match.surah.number);
        return `
          <button type="button" class="quran-search-result" data-result-surah="${match.surah.number}" data-result-ayah="${match.numberInSurah}">
            <strong>سورة ${escapeHtml(s.name)} · آية ${match.numberInSurah}</strong>
            <p>${highlightExact(match.text, rawQuery)}</p>
          </button>`;
      }).join('');

      output.innerHTML = surahMarkup + (resultMarkup || '<div class="quran-search-result">لا توجد نتائج آيات مطابقة.</div>');
    } catch (error) {
      const localMatches = state.currentAyahs.filter(ayah => normalizeArabic(ayah.text).includes(query)).slice(0, 20);
      const localMarkup = localMatches.map(ayah => `
        <button type="button" class="quran-search-result" data-result-surah="${state.currentSurah}" data-result-ayah="${ayah.numberInSurah}">
          <strong>السورة الحالية · آية ${ayah.numberInSurah}</strong>
          <p>${highlightExact(ayah.text, rawQuery)}</p>
        </button>
      `).join('');
      output.innerHTML = surahMarkup + (localMarkup || '<div class="quran-search-result quran-error">تعذر البحث العام الآن. لا توجد نتائج في السورة الحالية.</div>');
    }

    $$('[data-result-surah]', output).forEach(button => {
      button.addEventListener('click', async () => {
        const surahNumber = Number(button.dataset.resultSurah);
        const ayahNumber = Number(button.dataset.resultAyah || 0);
        if (!$('#quran-reader')) {
          window.location.href = `surah.html?surah=${surahNumber}${ayahNumber ? `&ayah=${ayahNumber}` : ''}`;
          return;
        }
        await loadSurah(surahNumber, true);
        if (ayahNumber) {
          setTimeout(() => {
            $(`#ayah-${surahNumber}-${ayahNumber}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 120);
        }
      });
    });
  }

  function bindEvents() {
    $$('[data-theme]').forEach(button => button.addEventListener('click', () => setTheme(button.dataset.theme)));
    $$('[data-font]').forEach(button => {
      button.addEventListener('click', () => {
        setFontScale(state.fontScale + (button.dataset.font === 'increase' ? 0.08 : -0.08));
      });
    });

    $('#quran-surah-select')?.addEventListener('change', event => loadSurah(Number(event.target.value), true));
    $('#quran-surah-filter')?.addEventListener('input', event => renderSurahGrid(event.target.value));
    $('#quran-search-btn')?.addEventListener('click', searchQuran);
    $('#quran-global-search')?.addEventListener('keydown', event => {
      if (event.key === 'Enter') searchQuran();
    });
    $('#quran-reload')?.addEventListener('click', () => loadSurah(state.currentSurah, false, true));
    $('#quran-prev')?.addEventListener('click', () => loadSurah(state.currentSurah === 1 ? 114 : state.currentSurah - 1, true));
    $('#quran-next')?.addEventListener('click', () => loadSurah(state.currentSurah === 114 ? 1 : state.currentSurah + 1, true));
  }

  async function init() {
    if (!$('#quran-app')) return;
    const urlParams = params();
    const initialSurah = clampSurah(urlParams.get('surah') || urlParams.get('s') || 1);
    const initialAyah = Number(urlParams.get('ayah') || urlParams.get('a') || 0);
    const initialQuery = urlParams.get('q') || '';

    setTheme();
    setFontScale(state.fontScale);
    renderSurahOptions();
    renderSurahGrid();
    renderMiniIndex();
    bindEvents();

    if ($('#quran-global-search') && initialQuery) {
      $('#quran-global-search').value = initialQuery;
    }

    await loadSurah(initialSurah, false);

    if (initialAyah) {
      setTimeout(() => {
        $(`#ayah-${initialSurah}-${initialAyah}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }

    if (initialQuery) searchQuran();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
