(function () {
  'use strict';

  const HADITH_CDN = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/';

  const HADITH_BOOKS = [
    { id: 'bukhari', title: 'صحيح البخاري', edition: 'ara-bukhari', minEdition: 'ara-bukhari.min', note: 'من أصح كتب الحديث، يحتوي على أبواب كثيرة وترقيم تفصيلي.' },
    { id: 'muslim', title: 'صحيح مسلم', edition: 'ara-muslim', minEdition: 'ara-muslim.min', note: 'أحد الصحيحين، مرتب على الكتب والأبواب.' },
    { id: 'abudawud', title: 'سنن أبي داود', edition: 'ara-abudawud', minEdition: 'ara-abudawud.min', note: 'من كتب السنن، غني بأحاديث الأحكام.' },
    { id: 'tirmidhi', title: 'جامع الترمذي', edition: 'ara-tirmidhi', minEdition: 'ara-tirmidhi.min', note: 'يتضمن أحكامًا على كثير من الأحاديث عند توفرها.' },
    { id: 'nasai', title: 'سنن النسائي', edition: 'ara-nasai', minEdition: 'ara-nasai.min', note: 'من دواوين السنن المشهورة.' },
    { id: 'ibnmajah', title: 'سنن ابن ماجه', edition: 'ara-ibnmajah', minEdition: 'ara-ibnmajah.min', note: 'من الكتب الستة عند جمهور المتأخرين.' },
    { id: 'malik', title: 'موطأ مالك', edition: 'ara-malik', minEdition: 'ara-malik.min', note: 'من أقدم كتب الحديث والفقه.' },
    { id: 'nawawi', title: 'الأربعون النووية', edition: 'ara-nawawi', minEdition: 'ara-nawawi.min', note: 'مختصر تعليمي مشهور في جوامع الكلم.' },
    { id: 'qudsi', title: 'الأحاديث القدسية', edition: 'ara-qudsi', minEdition: 'ara-qudsi.min', note: 'مجموعة أحاديث قدسية بحسب المصدر المتاح.' },
    { id: 'dehlawi', title: 'حجة الله البالغة', edition: 'ara-dehlawi', minEdition: 'ara-dehlawi.min', note: 'مصدر إضافي عند توفر الملف العربي.' }
  ];

  const state = {
    activeBookId: localStorage.getItem('hadithActiveBook') || 'bukhari',
    payloads: new Map(),
    currentItems: [],
    visibleItems: [],
    sections: [],
    page: 1,
    pageSize: 20,
    query: '',
    fontScale: Number(localStorage.getItem('quranFontScale') || '1')
  };

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

  function stripHtml(value) {
    const node = document.createElement('div');
    node.innerHTML = String(value || '');
    return node.textContent || node.innerText || '';
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
      .replace(/[٠-٩]/g, digit => '٠١٢٣٤٥٦٧٨٩'.indexOf(digit))
      .replace(/[\s\p{P}\p{S}]+/gu, ' ')
      .trim()
      .toLowerCase();
  }

  function escapeRegExp(value) {
    return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function setStatus(message, isError) {
    const node = $('#hadith-status');
    if (!node) return;
    node.textContent = message;
    node.classList.toggle('quran-error', Boolean(isError));
  }

  function getBook(bookId) {
    return HADITH_BOOKS.find(book => book.id === bookId) || HADITH_BOOKS[0];
  }

  function getBookUrl(book) {
    return `${HADITH_CDN}${book.minEdition || `${book.edition}.min`}.json`;
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

  function extractHadiths(payload) {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.hadiths)) return payload.hadiths;
    if (Array.isArray(payload.hadith)) return payload.hadith;
    if (Array.isArray(payload.data)) return payload.data;
    if (payload.data && Array.isArray(payload.data.hadiths)) return payload.data.hadiths;
    if (payload.collection && Array.isArray(payload.collection)) return payload.collection;
    return [];
  }

  function extractSections(payload) {
    const sources = [
      payload && payload.metadata && payload.metadata.sections,
      payload && payload.sections,
      payload && payload.metadata && payload.metadata.section_details,
      payload && payload.section_details
    ].filter(Boolean);

    for (const source of sources) {
      if (Array.isArray(source)) {
        return source.map((item, index) => ({
          id: String(item.id || item.number || item.section || index + 1),
          name: item.name || item.title || item.arabic || item.english || `باب ${index + 1}`
        }));
      }
      if (typeof source === 'object') {
        return Object.entries(source).map(([id, value]) => ({
          id: String(id),
          name: typeof value === 'string' ? value : (value.name || value.title || value.arabic || value.english || `باب ${id}`)
        }));
      }
    }
    return [];
  }

  function getHadithText(item) {
    const text = item.text || item.arabic || item.hadithArabic || item.hadeeth || item.hadith || item.body || item.content || '';
    return stripHtml(text).trim();
  }

  function getHadithNumber(item, index) {
    return item.hadithnumber || item.hadithNumber || item.arabicnumber || item.number || item.id || item.reference?.hadith || index + 1;
  }

  function getSectionId(item) {
    return String(item.reference?.book || item.book || item.section || item.section_id || item.chapter || item.chapterId || item.book_number || '');
  }

  function getGrade(item) {
    if (typeof item.grade === 'string') return item.grade;
    if (typeof item.status === 'string') return item.status;
    if (Array.isArray(item.grades) && item.grades.length) {
      return item.grades.map(grade => grade.grade || grade.name || grade).filter(Boolean).join(' · ');
    }
    if (item.classification) return item.classification;
    return '';
  }

  function getReference(item) {
    const parts = [];
    if (item.reference?.book) parts.push(`كتاب ${item.reference.book}`);
    if (item.reference?.hadith) parts.push(`حديث ${item.reference.hadith}`);
    if (item.bookSlug) parts.push(item.bookSlug);
    if (item.arabicnumber) parts.push(`رقم عربي ${item.arabicnumber}`);
    return parts.join(' · ');
  }

  function getSectionName(sectionId) {
    const found = state.sections.find(section => String(section.id) === String(sectionId));
    return found ? found.name : '';
  }

  function enrichItems(items, book) {
    return items.map((item, index) => {
      const sectionId = getSectionId(item);
      return {
        raw: item,
        bookId: book.id,
        bookTitle: book.title,
        number: getHadithNumber(item, index),
        sectionId,
        sectionName: getSectionName(sectionId),
        text: getHadithText(item),
        grade: getGrade(item),
        reference: getReference(item)
      };
    }).filter(item => item.text);
  }

  async function fetchBook(bookId) {
    const book = getBook(bookId);
    if (state.payloads.has(book.id)) return state.payloads.get(book.id);

    const response = await fetch(getBookUrl(book), { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`تعذر تحميل ${book.title}`);
    const payload = await response.json();
    state.payloads.set(book.id, payload);
    return payload;
  }

  function renderBooks() {
    const list = $('#hadith-book-list');
    const select = $('#hadith-book-select');
    if (select) {
      select.innerHTML = HADITH_BOOKS.map(book => `<option value="${book.id}">${escapeHtml(book.title)}</option>`).join('');
      select.value = state.activeBookId;
    }
    if (!list) return;
    list.innerHTML = HADITH_BOOKS.map(book => `
      <button type="button" class="hadith-book-button ${book.id === state.activeBookId ? 'is-active' : ''}" data-hadith-book="${book.id}">
        <strong>${escapeHtml(book.title)}</strong>
        <span>${escapeHtml(book.note)}</span>
      </button>
    `).join('');
  }

  function renderSections() {
    const select = $('#hadith-section-select');
    if (!select) return;
    const options = ['<option value="all">كل الأبواب</option>'].concat(
      state.sections.map(section => `<option value="${escapeHtml(section.id)}">${escapeHtml(section.name)}</option>`)
    );
    select.innerHTML = options.join('');
  }

  function highlight(text, query) {
    const escaped = escapeHtml(text);
    const raw = String(query || '').trim();
    if (!raw) return escaped;
    try {
      return escaped.replace(new RegExp(escapeRegExp(escapeHtml(raw)), 'gi'), match => `<mark>${match}</mark>`);
    } catch (error) {
      return escaped;
    }
  }

  function applyFilters(resetPage) {
    const sectionValue = $('#hadith-section-select')?.value || 'all';
    const normalizedQuery = normalizeArabic(state.query);
    state.visibleItems = state.currentItems.filter(item => {
      const sectionOk = sectionValue === 'all' || String(item.sectionId) === String(sectionValue);
      const queryOk = !normalizedQuery || normalizeArabic(`${item.text} ${item.bookTitle} ${item.sectionName} ${item.number}`).includes(normalizedQuery);
      return sectionOk && queryOk;
    });
    if (resetPage) state.page = 1;
    renderHadiths();
  }

  function renderHadiths() {
    const output = $('#hadith-results');
    const title = $('#hadith-current-title');
    const pageLabel = $('#hadith-page-label');
    if (!output) return;

    const total = state.visibleItems.length;
    const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
    state.page = Math.min(Math.max(1, state.page), totalPages);
    const start = (state.page - 1) * state.pageSize;
    const pageItems = state.visibleItems.slice(start, start + state.pageSize);

    if (title) {
      const book = getBook(state.activeBookId);
      title.textContent = total ? `${book.title} · ${total.toLocaleString('ar-EG')} حديث` : `${book.title} · لا توجد نتائج`;
    }
    if (pageLabel) pageLabel.textContent = `صفحة ${state.page.toLocaleString('ar-EG')} من ${totalPages.toLocaleString('ar-EG')}`;
    $('#hadith-prev-page')?.toggleAttribute('disabled', state.page <= 1);
    $('#hadith-next-page')?.toggleAttribute('disabled', state.page >= totalPages);

    if (!pageItems.length) {
      output.innerHTML = '<div class="hadith-empty">لا توجد أحاديث مطابقة للفلتر الحالي.</div>';
      return;
    }

    output.innerHTML = pageItems.map(item => `
      <article class="hadith-item">
        <div class="hadith-item__meta">
          <span>${escapeHtml(item.bookTitle)}</span>
          <span>رقم ${escapeHtml(item.number)}</span>
          ${item.sectionName ? `<span>${escapeHtml(item.sectionName)}</span>` : ''}
          ${item.grade ? `<span class="hadith-grade">${escapeHtml(item.grade)}</span>` : ''}
        </div>
        <p class="hadith-item__text">${highlight(item.text, state.query)}</p>
        ${item.reference ? `<div class="hadith-reference">${escapeHtml(item.reference)}</div>` : ''}
      </article>
    `).join('');
  }

  async function loadBook(bookId, showStatus) {
    const book = getBook(bookId || state.activeBookId);
    state.activeBookId = book.id;
    localStorage.setItem('hadithActiveBook', book.id);
    renderBooks();
    if ($('#hadith-book-select')) $('#hadith-book-select').value = book.id;
    if (showStatus) setStatus(`جارِ تحميل ${book.title}...`);

    try {
      const payload = await fetchBook(book.id);
      state.sections = extractSections(payload);
      renderSections();
      state.currentItems = enrichItems(extractHadiths(payload), book);
      state.query = '';
      if ($('#hadith-query')) $('#hadith-query').value = '';
      state.visibleItems = state.currentItems.slice();
      state.page = 1;
      setStatus(`تم تحميل ${book.title}: ${state.currentItems.length.toLocaleString('ar-EG')} حديث.`);
      renderHadiths();
    } catch (error) {
      state.sections = [];
      state.currentItems = [];
      state.visibleItems = [];
      renderSections();
      renderHadiths();
      setStatus(`فشل تحميل ${book.title}. تحقق من اتصال الإنترنت أو جرّب كتابًا آخر.`, true);
    }
  }

  async function searchAllBooks(rawQuery) {
    const normalizedQuery = normalizeArabic(rawQuery);
    if (!normalizedQuery || normalizedQuery.length < 2) {
      setStatus('اكتب حرفين على الأقل للبحث.', true);
      return;
    }

    state.query = rawQuery;
    state.visibleItems = [];
    state.currentItems = [];
    state.page = 1;
    renderHadiths();

    const matches = [];
    for (let index = 0; index < HADITH_BOOKS.length; index += 1) {
      const book = HADITH_BOOKS[index];
      setStatus(`بحث شامل: تحميل ${book.title} (${index + 1}/${HADITH_BOOKS.length})...`);
      try {
        const payload = await fetchBook(book.id);
        const previousSections = state.sections;
        state.sections = extractSections(payload);
        const items = enrichItems(extractHadiths(payload), book);
        state.sections = previousSections;
        matches.push(...items.filter(item => normalizeArabic(`${item.text} ${item.bookTitle} ${item.sectionName} ${item.number}`).includes(normalizedQuery)));
        state.currentItems = matches;
        state.visibleItems = matches.slice(0, 500);
        renderHadiths();
      } catch (error) {
        // Continue searching remaining books.
      }
    }

    state.currentItems = matches;
    state.visibleItems = matches.slice(0, 500);
    if (matches.length > 500) {
      setStatus(`تم العثور على ${matches.length.toLocaleString('ar-EG')} نتيجة. تم عرض أول 500 نتيجة لتخفيف الصفحة.`);
    } else {
      setStatus(`انتهى البحث الشامل: ${matches.length.toLocaleString('ar-EG')} نتيجة.`);
    }
    renderHadiths();
  }

  async function runSearch() {
    const rawQuery = $('#hadith-query')?.value.trim() || '';
    const scope = $('#hadith-search-scope')?.value || 'current';
    if (rawQuery.length < 2) {
      state.query = '';
      applyFilters(true);
      setStatus('اكتب حرفين على الأقل للبحث، أو اترك الحقل فارغًا لعرض الكتاب كاملًا.');
      return;
    }

    if (scope === 'all') {
      await searchAllBooks(rawQuery);
      return;
    }

    if (!state.currentItems.length) await loadBook(state.activeBookId, true);
    state.query = rawQuery;
    applyFilters(true);
    setStatus(`نتائج البحث داخل الكتاب الحالي: ${state.visibleItems.length.toLocaleString('ar-EG')}.`);
  }

  function bindEvents() {
    $$('[data-theme]').forEach(button => button.addEventListener('click', () => setTheme(button.dataset.theme)));
    $$('[data-font]').forEach(button => {
      button.addEventListener('click', () => setFontScale(state.fontScale + (button.dataset.font === 'increase' ? 0.08 : -0.08)));
    });

    $('#hadith-book-list')?.addEventListener('click', event => {
      const button = event.target.closest('[data-hadith-book]');
      if (!button) return;
      loadBook(button.dataset.hadithBook, true);
    });

    $('#hadith-book-select')?.addEventListener('change', event => {
      state.activeBookId = event.target.value;
      renderBooks();
      setStatus(`تم اختيار ${getBook(state.activeBookId).title}. اضغط تحميل الكتاب.`);
    });

    $('#hadith-load-book')?.addEventListener('click', () => loadBook(state.activeBookId, true));
    $('#hadith-section-select')?.addEventListener('change', () => applyFilters(true));
    $('#hadith-search-btn')?.addEventListener('click', runSearch);
    $('#hadith-query')?.addEventListener('keydown', event => {
      if (event.key === 'Enter') runSearch();
    });
    $('#hadith-prev-page')?.addEventListener('click', () => {
      state.page -= 1;
      renderHadiths();
      $('#hadith-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    $('#hadith-next-page')?.addEventListener('click', () => {
      state.page += 1;
      renderHadiths();
      $('#hadith-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function init() {
    if (!$('#hadith-app')) return;
    setTheme();
    setFontScale(state.fontScale);
    renderBooks();
    bindEvents();
    setStatus(`جاهز. الكتاب المختار: ${getBook(state.activeBookId).title}.`);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
