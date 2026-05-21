(function(){
  'use strict';
  const SURAH_INDEX = [{"id": 1, "name": "الفاتحة", "english": "Al-Fatihah", "type": "مكية", "ayahs": 7, "page": 1, "juz": 1}, {"id": 2, "name": "البقرة", "english": "Al-Baqarah", "type": "مدنية", "ayahs": 286, "page": 2, "juz": 1}, {"id": 3, "name": "آل عمران", "english": "Aal-Imran", "type": "مدنية", "ayahs": 200, "page": 50, "juz": 3}, {"id": 4, "name": "النساء", "english": "An-Nisa", "type": "مدنية", "ayahs": 176, "page": 77, "juz": 4}, {"id": 5, "name": "المائدة", "english": "Al-Maidah", "type": "مدنية", "ayahs": 120, "page": 106, "juz": 6}, {"id": 6, "name": "الأنعام", "english": "Al-Anam", "type": "مكية", "ayahs": 165, "page": 128, "juz": 7}, {"id": 7, "name": "الأعراف", "english": "Al-Araf", "type": "مكية", "ayahs": 206, "page": 151, "juz": 8}, {"id": 8, "name": "الأنفال", "english": "Al-Anfal", "type": "مدنية", "ayahs": 75, "page": 177, "juz": 9}, {"id": 9, "name": "التوبة", "english": "At-Tawbah", "type": "مدنية", "ayahs": 129, "page": 187, "juz": 10}, {"id": 10, "name": "يونس", "english": "Yunus", "type": "مكية", "ayahs": 109, "page": 208, "juz": 11}, {"id": 11, "name": "هود", "english": "Hud", "type": "مكية", "ayahs": 123, "page": 221, "juz": 11}, {"id": 12, "name": "يوسف", "english": "Yusuf", "type": "مكية", "ayahs": 111, "page": 235, "juz": 12}, {"id": 13, "name": "الرعد", "english": "Ar-Rad", "type": "مدنية", "ayahs": 43, "page": 249, "juz": 13}, {"id": 14, "name": "إبراهيم", "english": "Ibrahim", "type": "مكية", "ayahs": 52, "page": 255, "juz": 13}, {"id": 15, "name": "الحجر", "english": "Al-Hijr", "type": "مكية", "ayahs": 99, "page": 262, "juz": 14}, {"id": 16, "name": "النحل", "english": "An-Nahl", "type": "مكية", "ayahs": 128, "page": 267, "juz": 14}, {"id": 17, "name": "الإسراء", "english": "Al-Isra", "type": "مكية", "ayahs": 111, "page": 282, "juz": 15}, {"id": 18, "name": "الكهف", "english": "Al-Kahf", "type": "مكية", "ayahs": 110, "page": 293, "juz": 15}, {"id": 19, "name": "مريم", "english": "Maryam", "type": "مكية", "ayahs": 98, "page": 305, "juz": 16}, {"id": 20, "name": "طه", "english": "Taha", "type": "مكية", "ayahs": 135, "page": 312, "juz": 16}, {"id": 21, "name": "الأنبياء", "english": "Al-Anbiya", "type": "مكية", "ayahs": 112, "page": 322, "juz": 17}, {"id": 22, "name": "الحج", "english": "Al-Hajj", "type": "مدنية", "ayahs": 78, "page": 332, "juz": 17}, {"id": 23, "name": "المؤمنون", "english": "Al-Muminun", "type": "مكية", "ayahs": 118, "page": 342, "juz": 18}, {"id": 24, "name": "النور", "english": "An-Nur", "type": "مدنية", "ayahs": 64, "page": 350, "juz": 18}, {"id": 25, "name": "الفرقان", "english": "Al-Furqan", "type": "مكية", "ayahs": 77, "page": 359, "juz": 18}, {"id": 26, "name": "الشعراء", "english": "Ash-Shuara", "type": "مكية", "ayahs": 227, "page": 367, "juz": 19}, {"id": 27, "name": "النمل", "english": "An-Naml", "type": "مكية", "ayahs": 93, "page": 377, "juz": 19}, {"id": 28, "name": "القصص", "english": "Al-Qasas", "type": "مكية", "ayahs": 88, "page": 385, "juz": 20}, {"id": 29, "name": "العنكبوت", "english": "Al-Ankabut", "type": "مكية", "ayahs": 69, "page": 396, "juz": 20}, {"id": 30, "name": "الروم", "english": "Ar-Rum", "type": "مكية", "ayahs": 60, "page": 404, "juz": 21}, {"id": 31, "name": "لقمان", "english": "Luqman", "type": "مكية", "ayahs": 34, "page": 411, "juz": 21}, {"id": 32, "name": "السجدة", "english": "As-Sajdah", "type": "مكية", "ayahs": 30, "page": 415, "juz": 21}, {"id": 33, "name": "الأحزاب", "english": "Al-Ahzab", "type": "مدنية", "ayahs": 73, "page": 418, "juz": 21}, {"id": 34, "name": "سبأ", "english": "Saba", "type": "مكية", "ayahs": 54, "page": 428, "juz": 22}, {"id": 35, "name": "فاطر", "english": "Fatir", "type": "مكية", "ayahs": 45, "page": 434, "juz": 22}, {"id": 36, "name": "يس", "english": "Ya-Sin", "type": "مكية", "ayahs": 83, "page": 440, "juz": 22}, {"id": 37, "name": "الصافات", "english": "As-Saffat", "type": "مكية", "ayahs": 182, "page": 446, "juz": 23}, {"id": 38, "name": "ص", "english": "Sad", "type": "مكية", "ayahs": 88, "page": 453, "juz": 23}, {"id": 39, "name": "الزمر", "english": "Az-Zumar", "type": "مكية", "ayahs": 75, "page": 458, "juz": 23}, {"id": 40, "name": "غافر", "english": "Ghafir", "type": "مكية", "ayahs": 85, "page": 467, "juz": 24}, {"id": 41, "name": "فصلت", "english": "Fussilat", "type": "مكية", "ayahs": 54, "page": 477, "juz": 24}, {"id": 42, "name": "الشورى", "english": "Ash-Shura", "type": "مكية", "ayahs": 53, "page": 483, "juz": 25}, {"id": 43, "name": "الزخرف", "english": "Az-Zukhruf", "type": "مكية", "ayahs": 89, "page": 489, "juz": 25}, {"id": 44, "name": "الدخان", "english": "Ad-Dukhan", "type": "مكية", "ayahs": 59, "page": 496, "juz": 25}, {"id": 45, "name": "الجاثية", "english": "Al-Jathiyah", "type": "مكية", "ayahs": 37, "page": 499, "juz": 25}, {"id": 46, "name": "الأحقاف", "english": "Al-Ahqaf", "type": "مكية", "ayahs": 35, "page": 502, "juz": 26}, {"id": 47, "name": "محمد", "english": "Muhammad", "type": "مدنية", "ayahs": 38, "page": 507, "juz": 26}, {"id": 48, "name": "الفتح", "english": "Al-Fath", "type": "مدنية", "ayahs": 29, "page": 511, "juz": 26}, {"id": 49, "name": "الحجرات", "english": "Al-Hujurat", "type": "مدنية", "ayahs": 18, "page": 515, "juz": 26}, {"id": 50, "name": "ق", "english": "Qaf", "type": "مكية", "ayahs": 45, "page": 518, "juz": 26}, {"id": 51, "name": "الذاريات", "english": "Adh-Dhariyat", "type": "مكية", "ayahs": 60, "page": 520, "juz": 26}, {"id": 52, "name": "الطور", "english": "At-Tur", "type": "مكية", "ayahs": 49, "page": 523, "juz": 27}, {"id": 53, "name": "النجم", "english": "An-Najm", "type": "مكية", "ayahs": 62, "page": 526, "juz": 27}, {"id": 54, "name": "القمر", "english": "Al-Qamar", "type": "مكية", "ayahs": 55, "page": 528, "juz": 27}, {"id": 55, "name": "الرحمن", "english": "Ar-Rahman", "type": "مدنية", "ayahs": 78, "page": 531, "juz": 27}, {"id": 56, "name": "الواقعة", "english": "Al-Waqiah", "type": "مكية", "ayahs": 96, "page": 534, "juz": 27}, {"id": 57, "name": "الحديد", "english": "Al-Hadid", "type": "مدنية", "ayahs": 29, "page": 537, "juz": 27}, {"id": 58, "name": "المجادلة", "english": "Al-Mujadilah", "type": "مدنية", "ayahs": 22, "page": 542, "juz": 28}, {"id": 59, "name": "الحشر", "english": "Al-Hashr", "type": "مدنية", "ayahs": 24, "page": 545, "juz": 28}, {"id": 60, "name": "الممتحنة", "english": "Al-Mumtahanah", "type": "مدنية", "ayahs": 13, "page": 549, "juz": 28}, {"id": 61, "name": "الصف", "english": "As-Saff", "type": "مدنية", "ayahs": 14, "page": 551, "juz": 28}, {"id": 62, "name": "الجمعة", "english": "Al-Jumuah", "type": "مدنية", "ayahs": 11, "page": 553, "juz": 28}, {"id": 63, "name": "المنافقون", "english": "Al-Munafiqun", "type": "مدنية", "ayahs": 11, "page": 554, "juz": 28}, {"id": 64, "name": "التغابن", "english": "At-Taghabun", "type": "مدنية", "ayahs": 18, "page": 556, "juz": 28}, {"id": 65, "name": "الطلاق", "english": "At-Talaq", "type": "مدنية", "ayahs": 12, "page": 558, "juz": 28}, {"id": 66, "name": "التحريم", "english": "At-Tahrim", "type": "مدنية", "ayahs": 12, "page": 560, "juz": 28}, {"id": 67, "name": "الملك", "english": "Al-Mulk", "type": "مكية", "ayahs": 30, "page": 562, "juz": 29}, {"id": 68, "name": "القلم", "english": "Al-Qalam", "type": "مكية", "ayahs": 52, "page": 564, "juz": 29}, {"id": 69, "name": "الحاقة", "english": "Al-Haqqah", "type": "مكية", "ayahs": 52, "page": 566, "juz": 29}, {"id": 70, "name": "المعارج", "english": "Al-Maarij", "type": "مكية", "ayahs": 44, "page": 568, "juz": 29}, {"id": 71, "name": "نوح", "english": "Nuh", "type": "مكية", "ayahs": 28, "page": 570, "juz": 29}, {"id": 72, "name": "الجن", "english": "Al-Jinn", "type": "مكية", "ayahs": 28, "page": 572, "juz": 29}, {"id": 73, "name": "المزمل", "english": "Al-Muzzammil", "type": "مكية", "ayahs": 20, "page": 574, "juz": 29}, {"id": 74, "name": "المدثر", "english": "Al-Muddaththir", "type": "مكية", "ayahs": 56, "page": 575, "juz": 29}, {"id": 75, "name": "القيامة", "english": "Al-Qiyamah", "type": "مكية", "ayahs": 40, "page": 577, "juz": 29}, {"id": 76, "name": "الإنسان", "english": "Al-Insan", "type": "مدنية", "ayahs": 31, "page": 578, "juz": 29}, {"id": 77, "name": "المرسلات", "english": "Al-Mursalat", "type": "مكية", "ayahs": 50, "page": 580, "juz": 29}, {"id": 78, "name": "النبأ", "english": "An-Naba", "type": "مكية", "ayahs": 40, "page": 582, "juz": 30}, {"id": 79, "name": "النازعات", "english": "An-Naziat", "type": "مكية", "ayahs": 46, "page": 583, "juz": 30}, {"id": 80, "name": "عبس", "english": "Abasa", "type": "مكية", "ayahs": 42, "page": 585, "juz": 30}, {"id": 81, "name": "التكوير", "english": "At-Takwir", "type": "مكية", "ayahs": 29, "page": 586, "juz": 30}, {"id": 82, "name": "الانفطار", "english": "Al-Infitar", "type": "مكية", "ayahs": 19, "page": 587, "juz": 30}, {"id": 83, "name": "المطففين", "english": "Al-Mutaffifin", "type": "مكية", "ayahs": 36, "page": 587, "juz": 30}, {"id": 84, "name": "الانشقاق", "english": "Al-Inshiqaq", "type": "مكية", "ayahs": 25, "page": 589, "juz": 30}, {"id": 85, "name": "البروج", "english": "Al-Buruj", "type": "مكية", "ayahs": 22, "page": 590, "juz": 30}, {"id": 86, "name": "الطارق", "english": "At-Tariq", "type": "مكية", "ayahs": 17, "page": 591, "juz": 30}, {"id": 87, "name": "الأعلى", "english": "Al-Ala", "type": "مكية", "ayahs": 19, "page": 591, "juz": 30}, {"id": 88, "name": "الغاشية", "english": "Al-Ghashiyah", "type": "مكية", "ayahs": 26, "page": 592, "juz": 30}, {"id": 89, "name": "الفجر", "english": "Al-Fajr", "type": "مكية", "ayahs": 30, "page": 593, "juz": 30}, {"id": 90, "name": "البلد", "english": "Al-Balad", "type": "مكية", "ayahs": 20, "page": 594, "juz": 30}, {"id": 91, "name": "الشمس", "english": "Ash-Shams", "type": "مكية", "ayahs": 15, "page": 595, "juz": 30}, {"id": 92, "name": "الليل", "english": "Al-Layl", "type": "مكية", "ayahs": 21, "page": 595, "juz": 30}, {"id": 93, "name": "الضحى", "english": "Ad-Duhaa", "type": "مكية", "ayahs": 11, "page": 596, "juz": 30}, {"id": 94, "name": "الشرح", "english": "Ash-Sharh", "type": "مكية", "ayahs": 8, "page": 596, "juz": 30}, {"id": 95, "name": "التين", "english": "At-Tin", "type": "مكية", "ayahs": 8, "page": 597, "juz": 30}, {"id": 96, "name": "العلق", "english": "Al-Alaq", "type": "مكية", "ayahs": 19, "page": 597, "juz": 30}, {"id": 97, "name": "القدر", "english": "Al-Qadr", "type": "مكية", "ayahs": 5, "page": 598, "juz": 30}, {"id": 98, "name": "البينة", "english": "Al-Bayyinah", "type": "مدنية", "ayahs": 8, "page": 598, "juz": 30}, {"id": 99, "name": "الزلزلة", "english": "Az-Zalzalah", "type": "مدنية", "ayahs": 8, "page": 599, "juz": 30}, {"id": 100, "name": "العاديات", "english": "Al-Adiyat", "type": "مكية", "ayahs": 11, "page": 599, "juz": 30}, {"id": 101, "name": "القارعة", "english": "Al-Qariah", "type": "مكية", "ayahs": 11, "page": 600, "juz": 30}, {"id": 102, "name": "التكاثر", "english": "At-Takathur", "type": "مكية", "ayahs": 8, "page": 600, "juz": 30}, {"id": 103, "name": "العصر", "english": "Al-Asr", "type": "مكية", "ayahs": 3, "page": 601, "juz": 30}, {"id": 104, "name": "الهمزة", "english": "Al-Humazah", "type": "مكية", "ayahs": 9, "page": 601, "juz": 30}, {"id": 105, "name": "الفيل", "english": "Al-Fil", "type": "مكية", "ayahs": 5, "page": 601, "juz": 30}, {"id": 106, "name": "قريش", "english": "Quraysh", "type": "مكية", "ayahs": 4, "page": 602, "juz": 30}, {"id": 107, "name": "الماعون", "english": "Al-Maun", "type": "مكية", "ayahs": 7, "page": 602, "juz": 30}, {"id": 108, "name": "الكوثر", "english": "Al-Kawthar", "type": "مكية", "ayahs": 3, "page": 602, "juz": 30}, {"id": 109, "name": "الكافرون", "english": "Al-Kafirun", "type": "مكية", "ayahs": 6, "page": 603, "juz": 30}, {"id": 110, "name": "النصر", "english": "An-Nasr", "type": "مدنية", "ayahs": 3, "page": 603, "juz": 30}, {"id": 111, "name": "المسد", "english": "Al-Masad", "type": "مكية", "ayahs": 5, "page": 603, "juz": 30}, {"id": 112, "name": "الإخلاص", "english": "Al-Ikhlas", "type": "مكية", "ayahs": 4, "page": 604, "juz": 30}, {"id": 113, "name": "الفلق", "english": "Al-Falaq", "type": "مكية", "ayahs": 5, "page": 604, "juz": 30}, {"id": 114, "name": "الناس", "english": "An-Nas", "type": "مكية", "ayahs": 6, "page": 604, "juz": 30}];
  const JUZ_STARTS = [1, 22, 42, 62, 82, 102, 121, 142, 162, 182, 201, 222, 242, 262, 282, 302, 322, 342, 362, 382, 402, 422, 442, 462, 482, 502, 522, 542, 562, 582];
  const PAGE_COUNT = 604;
  const API_PAGE = 'https://api.alquran.cloud/v1/page/';
  const SETTINGS_KEY = 'qmaReviewedSettings';
  const $ = (s,c=document)=>c.querySelector(s);
  const $$ = (s,c=document)=>Array.from(c.querySelectorAll(s));
  const arDigits = '٠١٢٣٤٥٦٧٨٩';
  function toArabicDigits(value){return String(value).replace(/\d/g,d=>arDigits[Number(d)]);}
  function toLatinDigits(value){return String(value).replace(/[٠-٩]/g,d=>String(arDigits.indexOf(d)));}
  function escapeHtml(value){return String(value??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');}
  function normalizeArabic(value){return String(value||'').replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,'').replace(/[إأآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ؤ/g,'و').replace(/ئ/g,'ي').replace(/ة/g,'ه').replace(/ـ/g,'').replace(/[٠-٩]/g,d=>String(arDigits.indexOf(d))).replace(/[\s\p{P}\p{S}]+/gu,' ').trim().toLowerCase();}
  function readJson(key, fallback=null){try{return JSON.parse(localStorage.getItem(key)||'');}catch(e){return fallback;}}
  function writeJson(key, value){try{localStorage.setItem(key, JSON.stringify(value));}catch(e){}}
  function settings(){return readJson(SETTINGS_KEY,{}) || {};}
  function saveSetting(key,value){const s=settings();s[key]=value;writeJson(SETTINGS_KEY,s);}
  function getJuz(page){let current=1;JUZ_STARTS.forEach((p,i)=>{if(Number(page)>=p)current=i+1;});return current;}
  function pageOfSurah(id){return (SURAH_INDEX.find(s=>s.id===Number(id))||SURAH_INDEX[0]).page;}
  function currentLang(){return localStorage.getItem('qmaLang') || settings().lang || 'ar';}
  const TEXT = {
    ar:{
      navBrowse:'تصفح',navTools:'الأدوات',navNotify:'التنبيهات',navAudio:'الصوتيات',navLibrary:'المكتبة',
      index:'الفهرس',juz:'الأجزاء',refs:'المرجعيات',notes:'الملاحظات',searchSurah:'بحث في أسماء السور',page:'صفحة',ayahs:'آياتها',makki:'مكية',madani:'مدنية',
      open:'فتح',saved:'المحفوظة',lastRead:'آخر قراءة',bookmarks:'العلامات',noSaved:'لا توجد صفحات محفوظة بعد.',download:'تحميل',downloading:'جار التحميل',done:'تم',offlineHint:'الفهرس كامل ومحفوظ داخل التطبيق. صفحات المصحف نفسها تعمل أوفلاين بعد فتحها أو تحميلها من الإعدادات.',
      search:'بحث',settings:'إعدادات',tools:'أدوات المسلم',audio:'مكتبة الوسائط الخاصة بي',library:'كُتبي ومراجعي',advancedSearch:'بحث متقدم',quran:'المصحف',languageSaved:'تم تغيير اللغة'
    },
    en:{
      navBrowse:'Read',navTools:'Tools',navNotify:'Alerts',navAudio:'Audio',navLibrary:'Library',
      index:'Index',juz:'Juz',refs:'Refs',notes:'Notes',searchSurah:'Search surah names',page:'Page',ayahs:'Ayahs',makki:'Makki',madani:'Madani',
      open:'Open',saved:'Saved',lastRead:'Last read',bookmarks:'Bookmarks',noSaved:'No saved pages yet.',download:'Download',downloading:'Downloading',done:'Done',offlineHint:'The full index is stored locally. Quran pages work offline after opening them once or downloading them from Settings.',
      search:'Search',settings:'Settings',tools:'Muslim Tools',audio:'My Media Library',library:'Books and References',advancedSearch:'Advanced Search',quran:'Mushaf',languageSaved:'Language changed'
    }
  };
  function t(key){return (TEXT[currentLang()]||TEXT.ar)[key] || TEXT.ar[key] || key;}
  window.QMA_SURAH_INDEX = SURAH_INDEX;
  window.QMA_pageOfSurah = pageOfSurah;
  function showToast(message){
    let old=$('.qma-toast-reviewed'); if(old) old.remove();
    const n=document.createElement('div'); n.className='qma-toast-reviewed'; n.textContent=message; document.body.appendChild(n); setTimeout(()=>n.remove(),2200);
  }
  function setLang(lang){
    lang = lang === 'en' ? 'en' : 'ar';
    localStorage.setItem('qmaLang', lang); saveSetting('lang',lang);
    document.documentElement.lang = lang; document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl'; document.body.classList.toggle('qma-lang-en', lang==='en');
    const titleByPage={tools:'tools',mushaf:'quran',audio:'audio',library:'library',settings:'settings',search:'advancedSearch',notify:'navNotify',tafsir:'library'};
    const key=titleByPage[document.body.dataset.qmaPage];
    const h1=$('.qma-page-title h1, .qma-settings-head h1, .qma-search-shell h1'); if(h1&&key) h1.textContent=t(key);
    const topSearch=$('#qma-header-search'); if(topSearch) topSearch.placeholder=t('search');
    const bigSearch=$('#qma-search-input'); if(bigSearch) bigSearch.placeholder=t('search');
    const nav=[['surah.html','navBrowse'],['tools.html','navTools'],['hadith.html','navNotify'],['audio.html','navAudio'],['library.html','navLibrary']];
    $$('.qma-bottom-nav a').forEach(a=>{const href=(a.getAttribute('href')||'').split('?')[0]; const item=nav.find(n=>n[0]===href); const span=$('span',a); if(item&&span) span.textContent=t(item[1]);});
    $$('#qma-language-segment [data-lang], .qma-segment [data-lang]').forEach(b=>b.classList.toggle('is-active', b.dataset.lang===lang));
  }
  function bindLanguage(){
    const segment=$('#qma-language-segment') || $('.qma-segment');
    if(segment){
      const buttons=$$('button',segment);
      if(buttons.length>=2){ if(!buttons[0].dataset.lang) buttons[0].dataset.lang='ar'; if(!buttons[1].dataset.lang) buttons[1].dataset.lang='en'; }
      segment.addEventListener('click', e=>{const btn=e.target.closest('[data-lang]'); if(!btn)return; setLang(btn.dataset.lang); showToast(t('languageSaved'));});
    }
    setLang(currentLang());
  }
  function markActiveNav(){
    const file=(location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $$('.qma-bottom-nav a').forEach(a=>{const href=(a.getAttribute('href')||'').split('?')[0].toLowerCase(); if(href===file){a.setAttribute('aria-current','page')} else if(!((file==='settings.html'||file==='search.html'||file==='tafsir.html') && href==='surah.html')){a.removeAttribute('aria-current')}});
  }
  function indexGroups(items){
    const groups=[]; let last=null;
    items.forEach(s=>{ if(s.juz!==last){groups.push({juz:s.juz,items:[]}); last=s.juz;} groups[groups.length-1].items.push(s); });
    return groups;
  }
  function surahRow(s, active){
    const type=currentLang()==='en' ? (s.type==='مكية'?t('makki'):t('madani')) : s.type;
    return `<button class="qma-index-row${active?' is-active':''}" type="button" data-page="${s.page}" data-surah="${s.id}">
      <span class="qma-index-num">${toArabicDigits(s.id)}</span>
      <strong>${escapeHtml(s.name)}<small>${t('ayahs')} ${toArabicDigits(s.ayahs)} - ${type}</small></strong>
      <span class="qma-index-page">${toArabicDigits(s.page)}</span>
    </button>`;
  }
  function renderIndexList(container, filter=''){
    const clean=normalizeArabic(filter);
    const activePage=Number(localStorage.getItem('qmaCurrentPage')||new URLSearchParams(location.search).get('page')||149);
    const items=SURAH_INDEX.filter(s=>!clean || normalizeArabic(`${s.id} ${s.name} ${s.english} ${s.type} ${s.page}`).includes(clean));
    if(!items.length){ container.innerHTML='<div class="qma-index-empty">لا توجد نتائج.</div>'; return; }
    const grouped=indexGroups(items);
    container.innerHTML=grouped.map(g=>`<div class="qma-index-group"><h3>${t('juz')} ${toArabicDigits(g.juz)}</h3>${g.items.map(s=>surahRow(s, activePage>=s.page && activePage < ((SURAH_INDEX.find(x=>x.id===s.id+1)||{page:605}).page))).join('')}</div>`).join('');
  }
  function renderJuzList(container){
    container.innerHTML=JUZ_STARTS.map((p,i)=>`<button class="qma-juz-row" type="button" data-page="${p}"><strong>${t('juz')} ${toArabicDigits(i+1)}</strong><span>${t('page')} ${toArabicDigits(p)}</span></button>`).join('');
  }
  function renderSavedList(container){
    const saved=readJson('qmaSavedPages',[]) || [];
    const unique=[...new Set(saved.map(Number).filter(n=>n>=1&&n<=604))].sort((a,b)=>a-b);
    const last=Number(localStorage.getItem('qmaCurrentPage')||149);
    const rows=[`<button class="qma-juz-row is-current" type="button" data-page="${last}"><strong>${t('lastRead')}</strong><span>${t('page')} ${toArabicDigits(last)}</span></button>`].concat(unique.map(p=>`<button class="qma-juz-row" type="button" data-page="${p}"><strong>${t('saved')}</strong><span>${t('page')} ${toArabicDigits(p)}</span></button>`));
    container.innerHTML=rows.join('') || `<div class="qma-index-empty">${t('noSaved')}</div>`;
  }
  function openPage(page, surah){
    const p=Math.max(1,Math.min(604,Number(page)||149));
    localStorage.setItem('qmaCurrentPage', String(p));
    const url=`surah.html?page=${encodeURIComponent(p)}${surah?`&surah=${encodeURIComponent(surah)}`:''}`;
    location.href=url;
  }
  function showIndexSheet(defaultTab='surahs'){
    $('.qma-index-backdrop')?.remove();
    const sheet=document.createElement('div');
    sheet.className='qma-index-backdrop';
    sheet.innerHTML=`<section class="qma-index-sheet" role="dialog" aria-modal="true" aria-label="${t('index')}">
      <header class="qma-index-head"><button type="button" class="qma-index-close">×</button><h2>${t('index')}</h2></header>
      <label class="qma-index-search"><input type="search" placeholder="${t('searchSurah')}" autocomplete="off"><span>⌕</span></label>
      <nav class="qma-index-tabs" aria-label="${t('index')}"><button class="is-active" data-tab="surahs" type="button">${t('index')}</button><button data-tab="juz" type="button">${t('juz')}</button><button data-tab="saved" type="button">${t('bookmarks')}</button></nav>
      <div class="qma-index-body"></div>
      <footer class="qma-index-foot">${t('offlineHint')}</footer>
    </section>`;
    document.body.appendChild(sheet); document.body.classList.add('qma-sheet-open');
    const body=$('.qma-index-body',sheet); const input=$('input',sheet);
    let tab=defaultTab;
    function render(){ if(tab==='surahs') renderIndexList(body,input.value); else if(tab==='juz') renderJuzList(body); else renderSavedList(body); }
    render(); setTimeout(()=>{try{$('.qma-index-body',sheet).scrollTop=0;}catch(e){}},0);
    sheet.addEventListener('click',e=>{ if(e.target===sheet || e.target.closest('.qma-index-close')){sheet.remove();document.body.classList.remove('qma-sheet-open');return;} const tabBtn=e.target.closest('[data-tab]'); if(tabBtn){tab=tabBtn.dataset.tab; $$('.qma-index-tabs button',sheet).forEach(b=>b.classList.toggle('is-active',b===tabBtn)); input.value=''; render(); return;} const row=e.target.closest('[data-page]'); if(row){openPage(row.dataset.page,row.dataset.surah);}});
    input.addEventListener('input',()=>{tab='surahs'; $$('.qma-index-tabs button',sheet).forEach(b=>b.classList.toggle('is-active',b.dataset.tab==='surahs')); render();});
  }
  function bindIndex(){
    const triggers=['#qma-fullscreen','[data-qma-index-trigger]'];
    triggers.forEach(sel=>$$(sel).forEach(btn=>{btn.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();showIndexSheet();},true); btn.setAttribute('aria-label',t('index'));}));
    const badge=$('#qma-mushaf-badge'); if(badge){badge.style.cursor='pointer'; badge.addEventListener('click',()=>showIndexSheet());}
    document.addEventListener('keydown',e=>{ if(e.key==='Escape'){$('.qma-index-backdrop')?.remove();document.body.classList.remove('qma-sheet-open');} });
  }
  function fixMushafSizing(){
    if(document.body.dataset.qmaPage!=='mushaf') return;
    const panel=$('.qma-reader-panel'); const nav=$('.qma-bottom-nav');
    function apply(){
      const h=(panel?.offsetHeight||140)+(nav?.offsetHeight||78)+56;
      document.documentElement.style.setProperty('--qma-reader-offset', `${h}px`);
    }
    apply(); window.addEventListener('resize',apply); setTimeout(apply,700);
  }
  function bindPagePicker(){
    const pageNum=$('#qma-page-number'); if(!pageNum) return;
    pageNum.closest('.qma-page-range')?.addEventListener('click',()=>{
      const current=Number(localStorage.getItem('qmaCurrentPage')||149);
      const value=prompt('رقم الصفحة 1 - 604', String(current));
      const n=Number(toLatinDigits(value||'')); if(n>=1&&n<=604) openPage(n);
    });
  }
  async function cachePage(page){
    const url=`${API_PAGE}${page}/quran-simple-clean`;
    const res=await fetch(url,{headers:{Accept:'application/json'}});
    if(!res.ok) throw new Error('network');
    const json=await res.json();
    const ayahs=json?.data?.ayahs||[];
    if(!ayahs.length) throw new Error('empty');
    const first=ayahs[0];
    const data={number:Number(page),source:'downloaded',juz:first.juz||getJuz(page),ayahs:ayahs.map(a=>({number:a.number,numberInSurah:a.numberInSurah,page:a.page||Number(page),juz:a.juz||first.juz||getJuz(page),surah:{number:a.surah?.number,name:a.surah?.name},text:String(a.text||'').replace(/[\u06D6-\u06ED\u0615-\u061A]/g,'').replace(/[\uE000-\uF8FF]/g,'').replace(/\u25A1|□/g,'').replace(/\s+/g,' ').trim()}))};
    localStorage.setItem(`qma-page-v14-clean-${page}`,JSON.stringify(data));
    return data;
  }
  function countSavedPages(){let c=0; for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i); if(k&&k.startsWith('qma-page-v14-clean-')) c++;} return c;}
  function bindOfflineDownload(){
    const btn=$('#qma-download-pages'); if(!btn)return;
    const status=$('#qma-offline-status');
    btn.addEventListener('click',async e=>{
      e.preventDefault(); e.stopImmediatePropagation();
      btn.disabled=true; btn.textContent=t('downloading');
      let ok=countSavedPages();
      for(let page=1;page<=PAGE_COUNT;page++){
        if(localStorage.getItem(`qma-page-v14-clean-${page}`)){ if(status && page%20===0) status.textContent=`محفوظ مسبقاً: ${toArabicDigits(ok)} / ٦٠٤`; continue; }
        try{ await cachePage(page); ok++; }catch(err){}
        if(status && (page===1 || page%5===0 || page===PAGE_COUNT)) status.textContent=`${t('downloading')}: ${toArabicDigits(ok)} / ٦٠٤ - ${t('page')} ${toArabicDigits(page)}`;
        await new Promise(r=>setTimeout(r,25));
      }
      if(status) status.textContent=`${t('done')}: ${toArabicDigits(ok)} / ٦٠٤. ${t('offlineHint')}`;
      btn.textContent=t('download'); btn.disabled=false;
    },true);
  }
  function bindSettingsExtras(){
    if(document.body.dataset.qmaPage!=='settings') return;
    const font=$('#qma-font-range'); if(font){ const v=Number(localStorage.getItem('qmaFontScale')||100); font.value=String(v); }
    bindOfflineDownload();
    const sync=$('#qma-sync-now'); if(sync){ sync.addEventListener('click',e=>{e.preventDefault(); e.stopImmediatePropagation(); showToast(navigator.onLine?'متصل: البيانات ستتحدث عند الفتح':'أوفلاين: يتم استخدام المحفوظ');},true); }
  }
  function bindAudioRows(){
    if(document.body.dataset.qmaPage!=='audio')return;
    $$('.qma-row[href="#"]').forEach(row=>row.setAttribute('role','button'));
  }
  function addAuditStamp(){
    const meta=document.createElement('meta'); meta.name='qma-reviewed-build'; meta.content='index-114-language-mobile-offline-fixes'; document.head.appendChild(meta);
  }
  function init(){
    addAuditStamp(); markActiveNav(); bindLanguage(); bindIndex(); fixMushafSizing(); bindPagePicker(); bindSettingsExtras(); bindAudioRows();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
