(function(){
  'use strict';
  const BUILD='hard-fix-v13-mobile-icons-ayah-touch-clean';
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
  const AR='٠١٢٣٤٥٦٧٨٩';
  const EN='0123456789';
  const toArabic=v=>String(v==null?'':v).replace(/\d/g,d=>AR[Number(d)]);
  const toLatin=v=>String(v==null?'':v).replace(/[٠-٩]/g,d=>String(AR.indexOf(d)));
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));}
  function cleanText(value){
    return String(value||'').normalize('NFC')
      .replace(/[ؐ-ؚۖ-ۭࣔ-ࣿ]/g,'')
      .replace(/[-﷽﴾﴿￼�]/g,'')
      .replace(/[■-◿□▪▫◦●○◆◇■⬚⬛⬜]/g,'')
      .replace(/[^ء-يً-ٰٟٱیە\s]/g,'')
      .replace(/\s+/g,' ')
      .trim();
  }
  function toast(msg){
    let n=$('.qma-toast-reviewed,.qma-toast-hard,.qma-toast');
    if(n) n.remove();
    n=document.createElement('div');
    n.className='qma-toast-hard';
    n.textContent=msg;
    document.body.appendChild(n);
    setTimeout(()=>n.remove(),2300);
  }
  function localPage(){
    const qs=new URLSearchParams(location.search);
    return Number(qs.get('page')||localStorage.getItem('qmaCurrentPage')||149)||149;
  }
  function stripAyahNumber(el){
    const c=el.cloneNode(true);
    c.querySelectorAll('.qma-ayah-number').forEach(n=>n.remove());
    return cleanText(c.textContent||'');
  }
  function hydrateAyahs(){
    $$('.qma-ayah-inline').forEach((el,idx)=>{
      if(!el.dataset.page) el.dataset.page=String(localPage());
      if(!el.dataset.ayah){
        const num=el.querySelector('.qma-ayah-number')?.textContent || String(idx+1);
        el.dataset.ayah=toLatin(num).replace(/\D/g,'') || String(idx+1);
      }
      if(!el.dataset.surah){
        const name=$('#qma-surah-name')?.textContent?.trim() || '';
        const map={
          'الفاتحة':1,'البقرة':2,'آل عمران':3,'النساء':4,'المائدة':5,'الأنعام':6,'الأعراف':7,'الأنفال':8,'التوبة':9,'يونس':10,'هود':11,'يوسف':12,'الرعد':13,'إبراهيم':14,'الحجر':15,'النحل':16,'الإسراء':17,'الكهف':18,'مريم':19,'طه':20,'الأنبياء':21,'الحج':22,'المؤمنون':23,'النور':24,'الفرقان':25,'الشعراء':26,'النمل':27,'القصص':28,'العنكبوت':29,'الروم':30,'لقمان':31,'السجدة':32,'الأحزاب':33,'سبأ':34,'فاطر':35,'يس':36,'الصافات':37,'ص':38,'الزمر':39,'غافر':40,'فصلت':41,'الشورى':42,'الزخرف':43,'الدخان':44,'الجاثية':45,'الأحقاف':46,'محمد':47,'الفتح':48,'الحجرات':49,'ق':50,'الذاريات':51,'الطور':52,'النجم':53,'القمر':54,'الرحمن':55,'الواقعة':56,'الحديد':57,'المجادلة':58,'الحشر':59,'الممتحنة':60,'الصف':61,'الجمعة':62,'المنافقون':63,'التغابن':64,'الطلاق':65,'التحريم':66,'الملك':67,'القلم':68,'الحاقة':69,'المعارج':70,'نوح':71,'الجن':72,'المزمل':73,'المدثر':74,'القيامة':75,'الإنسان':76,'المرسلات':77,'النبأ':78,'النازعات':79,'عبس':80,'التكوير':81,'الانفطار':82,'المطففين':83,'الانشقاق':84,'البروج':85,'الطارق':86,'الأعلى':87,'الغاشية':88,'الفجر':89,'البلد':90,'الشمس':91,'الليل':92,'الضحى':93,'الشرح':94,'التين':95,'العلق':96,'القدر':97,'البينة':98,'الزلزلة':99,'العاديات':100,'القارعة':101,'التكاثر':102,'العصر':103,'الهمزة':104,'الفيل':105,'قريش':106,'الماعون':107,'الكوثر':108,'الكافرون':109,'النصر':110,'المسد':111,'الإخلاص':112,'الفلق':113,'الناس':114
        };
        el.dataset.surah=String(map[name]||0);
      }
      el.setAttribute('role','button');
      el.setAttribute('tabindex','0');
      el.setAttribute('aria-label',`خيارات الآية ${toArabic(el.dataset.ayah)}`);
      el.classList.add('qma-ayah-clickable');
    });
  }
  function deepCleanVisible(){
    $$('.qma-mushaf-text,.qma-result-card p,.qma-reader-article,.qma-tafsir-result').forEach(root=>{
      const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
      const nodes=[];
      while(walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(n=>{const c=cleanText(n.nodeValue); if(c!==n.nodeValue) n.nodeValue=c;});
    });
  }
  function migrateBadCachedPages(){
    try{
      for(let i=0;i<localStorage.length;i++){
        const k=localStorage.key(i);
        if(!k || !(k.startsWith('qma-page-v1-') || k.startsWith('qma-page-v2-clean-'))) continue;
        const raw=localStorage.getItem(k)||'';
        if(!/[\uE000-\uF8FF\uFFFD\u25A0-\u25FF□]/.test(raw)) continue;
        const data=JSON.parse(raw);
        let dirty=false;
        if(data && Array.isArray(data.ayahs)){
          data.ayahs.forEach(a=>{const c=cleanText(a.text); if(c!==a.text){a.text=c; dirty=true;}});
          if(dirty) localStorage.setItem(k, JSON.stringify(data));
        }
      }
    }catch(e){}
  }
  function closeAyahActions(){
    $('.qma-ayah-actions-backdrop')?.remove();
    $$('.qma-ayah-inline.is-selected').forEach(el=>el.classList.remove('is-selected'));
  }
  async function copyText(text){
    try{
      if(navigator.clipboard && window.isSecureContext){ await navigator.clipboard.writeText(text); }
      else{
        const ta=document.createElement('textarea');
        ta.value=text; ta.style.position='fixed'; ta.style.opacity='0'; ta.style.pointerEvents='none';
        document.body.appendChild(ta); ta.focus(); ta.select(); document.execCommand('copy'); ta.remove();
      }
      toast('تم نسخ الآية');
    }catch(e){ toast('المتصفح منع النسخ'); }
  }
  function saveBookmark(info){
    let pages=[]; let ayahs=[];
    try{pages=JSON.parse(localStorage.getItem('qmaSavedPages')||'[]')||[];}catch(e){}
    try{ayahs=JSON.parse(localStorage.getItem('qmaSavedAyahs')||'[]')||[];}catch(e){}
    const p=Number(info.page)||localPage();
    if(!pages.map(Number).includes(p)) pages.unshift(p);
    const key=`${info.surah}:${info.ayah}`;
    ayahs=ayahs.filter(x=>`${x.surah}:${x.ayah}`!==key);
    ayahs.unshift({surah:info.surah,ayah:info.ayah,page:p,text:info.text,createdAt:new Date().toISOString()});
    localStorage.setItem('qmaSavedPages',JSON.stringify(pages.slice(0,300)));
    localStorage.setItem('qmaSavedAyahs',JSON.stringify(ayahs.slice(0,300)));
    toast('تم حفظ العلامة');
  }
  function tafsirUrl(info){return `tafsir.html?surah=${encodeURIComponent(info.surah)}&ayah=${encodeURIComponent(info.ayah)}`;}
  function currentSurahName(){return $('#qma-surah-name')?.textContent?.trim() || 'السورة';}
  function iconSvg(name){
    const attrs='viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.15" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';
    const map={
      settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.05.05a2.05 2.05 0 0 1-2.9 2.9l-.05-.05A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2.05 2.05 0 0 1-4.1 0v-.08A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.84.34l-.05.05a2.05 2.05 0 0 1-2.9-2.9l.05-.05A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H2.8a2.05 2.05 0 0 1 0-4.1h.08A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.84l-.05-.05a2.05 2.05 0 0 1 2.9-2.9l.05.05A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V2.8a2.05 2.05 0 0 1 4.1 0v.08A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.84-.34l.05-.05a2.05 2.05 0 0 1 2.9 2.9l-.05.05A1.7 1.7 0 0 0 19.4 9c.06.38.27.73.6 1 .3.25.7.4 1.1.4h.1a2.05 2.05 0 0 1 0 4.1h-.1c-.4 0-.8.15-1.1.4-.33.27-.54.62-.6 1Z"/>',
      bookmark:'<path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5V22l-6-3.5L6 22V4.5Z"/>',
      book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
      menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
      search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
      grid:'<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
      audio:'<path d="M4 10v4h4l5 4V6L8 10H4Z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M18.5 6.5a8 8 0 0 1 0 11"/>',
      down:'<path d="M12 5v14"/><path d="m5 12 7 7 7-7"/>',
      tools:'<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
      note:'<path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
      library:'<path d="M4 19.5V5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-1.5Z"/><path d="M8 7h6"/>',
      mail:'<path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/>'
    };
    return `<svg class="qma-svg-icon" ${attrs}>${map[name]||map.grid}</svg>`;
  }
  function replaceRoughIcons(){
    const pairs=[
      ['.qma-topbar a[href="settings.html"]','settings'],['#qma-save-page','bookmark'],['#qma-reader-mode','book'],['#qma-fullscreen','menu'],
      ['#qma-scroll-down','down'],['#qma-audio-toggle','audio']
    ];
    pairs.forEach(([sel,name])=>{const el=$(sel); if(el && !el.dataset.svgReady){el.innerHTML=iconSvg(name); el.dataset.svgReady='1';}});
    const searchIcon=$('.qma-top-search span'); if(searchIcon && !searchIcon.dataset.svgReady){searchIcon.innerHTML=iconSvg('search'); searchIcon.dataset.svgReady='1';}
    const navIcons=['book','tools','mail','audio','library'];
    $$('.qma-bottom-nav a b').forEach((b,i)=>{ if(!b.dataset.svgReady){ b.innerHTML=iconSvg(navIcons[i]||'grid'); b.dataset.svgReady='1'; }});
  }
  function elementFromCaret(x,y){
    let node=null;
    if(document.caretRangeFromPoint){ const r=document.caretRangeFromPoint(x,y); node=r&&r.startContainer; }
    else if(document.caretPositionFromPoint){ const p=document.caretPositionFromPoint(x,y); node=p&&p.offsetNode; }
    if(node && node.nodeType===3) return node.parentElement;
    return node || null;
  }
  function ayahFromEvent(e){
    const target=e.target && e.target.nodeType===3 ? e.target.parentElement : e.target;
    let el=target?.closest?.('.qma-ayah-inline');
    if(el) return el;
    const touch=e.changedTouches&&e.changedTouches[0] || e.touches&&e.touches[0];
    const x=touch?touch.clientX:e.clientX, y=touch?touch.clientY:e.clientY;
    if(Number.isFinite(x)&&Number.isFinite(y)){
      const atPoint=document.elementFromPoint(x,y);
      el=atPoint?.closest?.('.qma-ayah-inline');
      if(el) return el;
      const caret=elementFromCaret(x,y);
      el=caret?.closest?.('.qma-ayah-inline');
      if(el) return el;
    }
    return null;
  }
  function openAyahActions(el){
    hydrateAyahs();
    closeAyahActions();
    el.classList.add('is-selected');
    const info={
      surah:Number(el.dataset.surah||0),
      ayah:Number(el.dataset.ayah||0),
      page:Number(el.dataset.page||localPage()),
      text:stripAyahNumber(el)
    };
    if(!info.text){ toast('تعذر قراءة نص الآية'); return; }
    const sheet=document.createElement('div');
    sheet.className='qma-ayah-actions-backdrop';
    sheet.innerHTML=`<section class="qma-ayah-actions qma-ayah-actions--hard" role="dialog" aria-modal="true" aria-label="خيارات الآية">
      <header><button type="button" data-act="close" aria-label="إغلاق">×</button><h3>${esc(currentSurahName())} - آية ${toArabic(info.ayah)}</h3></header>
      <p>${esc(info.text)}</p>
      <div class="qma-ayah-actions-grid">
        <button class="is-primary" type="button" data-act="tafsir">تفسير</button>
        <button type="button" data-act="copy">نسخ</button>
        <button type="button" data-act="share">مشاركة</button>
        <button type="button" data-act="bookmark">حفظ علامة</button>
        <button type="button" data-act="open">فتح الصفحة</button>
        <button type="button" data-act="listen">استماع</button>
      </div>
    </section>`;
    document.body.appendChild(sheet);
    sheet.addEventListener('pointerup',async ev=>{
      const target=ev.target.nodeType===3?ev.target.parentElement:ev.target;
      if(target===sheet){ closeAyahActions(); return; }
      const btn=target.closest?.('[data-act]');
      if(!btn) return;
      ev.preventDefault();
      const act=btn.dataset.act;
      if(act==='close'){ closeAyahActions(); return; }
      if(act==='tafsir'){ location.href=tafsirUrl(info); return; }
      if(act==='open'){ location.href=`surah.html?page=${encodeURIComponent(info.page)}&surah=${encodeURIComponent(info.surah)}&ayah=${encodeURIComponent(info.ayah)}`; return; }
      if(act==='copy'){ await copyText(`${info.text} [${info.surah}:${info.ayah}]`); closeAyahActions(); return; }
      if(act==='bookmark'){ saveBookmark(info); closeAyahActions(); return; }
      if(act==='share'){
        const text=`${info.text} [${info.surah}:${info.ayah}]`;
        try{ if(navigator.share) await navigator.share({title:`${currentSurahName()} ${info.ayah}`,text}); else await copyText(text); }catch(e){}
        closeAyahActions(); return;
      }
      if(act==='listen'){
        const src=`https://everyayah.com/data/Alafasy_128kbps/${String(info.surah).padStart(3,'0')}${String(info.ayah).padStart(3,'0')}.mp3`;
        let audio=$('#qma-ayah-audio-player');
        if(!audio){audio=document.createElement('audio'); audio.id='qma-ayah-audio-player'; audio.controls=true; audio.style.width='100%'; sheet.querySelector('.qma-ayah-actions').appendChild(audio);}
        audio.src=src; audio.play().catch(()=>toast('تعذر تشغيل الصوت'));
      }
    });
  }
  let lastOpen=0;
  function bindAyahPointers(){
    if(document.documentElement.dataset.ayahBound==='1') return;
    document.documentElement.dataset.ayahBound='1';
    let downTarget=null, downX=0, downY=0, downAt=0;
    const openFromEvent=(e)=>{
      if($('.qma-ayah-actions-backdrop')) return false;
      const raw=e.target && e.target.nodeType===3 ? e.target.parentElement : e.target;
      if(raw?.closest?.('.qma-reader-panel,.qma-reader-actions,.qma-bottom-nav,.qma-topbar,.qma-index-backdrop,.qma-ayah-actions-backdrop')) return false;
      const el=ayahFromEvent(e);
      if(!el) return false;
      e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation();
      openAyahActions(el);
      return true;
    };
    document.addEventListener('pointerdown',e=>{
      const el=ayahFromEvent(e); if(!el) return;
      downTarget=el; downX=e.clientX; downY=e.clientY; downAt=Date.now();
    },{capture:true,passive:true});
    document.addEventListener('pointerup',e=>{
      const el=ayahFromEvent(e);
      if(!el || (downTarget && el!==downTarget)) return;
      if(Math.abs((e.clientX||0)-downX)>16 || Math.abs((e.clientY||0)-downY)>16) return;
      if(Date.now()-downAt>900) return;
      openFromEvent(e);
      downTarget=null;
    },{capture:true,passive:false});
    document.addEventListener('click',e=>{
      if(e.defaultPrevented) return;
      openFromEvent(e);
    },{capture:true,passive:false});
    document.addEventListener('touchend',e=>{
      if(e.defaultPrevented) return;
      openFromEvent(e);
    },{capture:true,passive:false});
    ['contextmenu','selectstart','dragstart'].forEach(type=>document.addEventListener(type,e=>{
      const raw=e.target && e.target.nodeType===3 ? e.target.parentElement : e.target;
      if(raw?.closest?.('.qma-mushaf-text,.qma-mushaf-page')){ e.preventDefault(); e.stopPropagation(); }
    },{capture:true,passive:false}));
    document.addEventListener('keydown',e=>{
      if((e.key==='Enter'||e.key===' ') && e.target?.closest?.('.qma-ayah-inline')){e.preventDefault();openAyahActions(e.target.closest('.qma-ayah-inline'));}
      if(e.key==='Escape') closeAyahActions();
    },true);
  }
  function improveIndexWhenOpen(){
    const setup=(sheet)=>{
      if(!sheet) return;
      document.body.classList.add('qma-sheet-open');
      sheet.setAttribute('data-hard-fix',BUILD);
      const body=$('.qma-index-body',sheet);
      if(body){
        body.scrollTop=0;
        body.addEventListener('touchmove',e=>e.stopPropagation(),{passive:true});
        body.addEventListener('wheel',e=>e.stopPropagation(),{passive:true});
      }
      $$('.qma-index-tabs button',sheet).forEach(btn=>btn.addEventListener('click',()=>setTimeout(()=>{const b=$('.qma-index-body',sheet); if(b)b.scrollTop=0;},30),true));
      const close=$('.qma-index-close',sheet);
      close?.addEventListener('click',()=>document.body.classList.remove('qma-sheet-open'),true);
      sheet.addEventListener('click',e=>{if(e.target===sheet) document.body.classList.remove('qma-sheet-open');},true);
    };
    $$('.qma-index-backdrop').forEach(setup);
    const mo=new MutationObserver(muts=>{
      muts.forEach(m=>m.addedNodes.forEach(node=>{
        if(node.nodeType===1 && node.matches?.('.qma-index-backdrop')) setup(node);
      }));
    });
    mo.observe(document.body,{childList:true});
  }
  function addDeveloperCard(){
    if(document.body.dataset.qmaPage!=='settings') return;
    if($('.qma-developer-card')) return;
    const panel=$('.qma-settings-panel') || $('main');
    if(!panel) return;
    const card=document.createElement('section');
    card.className='qma-developer-card';
    card.innerHTML=`<p>تصميم وبرمجة</p><h2>Omar Hosny</h2><a href="tel:+201210150524">+20 121 015 0524</a><a href="mailto:omarhosny10100@gmail.com">omarhosny10100@gmail.com</a>`;
    panel.appendChild(card);
  }
  function refreshDataStats(){
    const count=$('#qma-cached-pages-count');
    const size=$('#qma-current-storage-size');
    if(!count && !size) return;
    let pages=0,total=0;
    try{
      for(let i=0;i<localStorage.length;i++){
        const k=localStorage.key(i); const v=localStorage.getItem(k)||'';
        if(k && (k.startsWith('qma-page-v1-') || k.startsWith('qma-page-v2-clean-'))) pages++;
        total+=(String(k||'').length+v.length)*2;
      }
    }catch(e){}
    const pretty=total<1024?`${total} B`:total<1024*1024?`${Math.round(total/1024)} KB`:`${(total/1024/1024).toFixed(1)} MB`;
    if(count) count.textContent=toArabic(pages);
    if(size) size.textContent=pretty;
  }
  function forceBrowserStart(){
    try{
      const link=$('link[rel="manifest"]');
      if(link) link.href='manifest.json?v='+encodeURIComponent(BUILD);
    }catch(e){}
  }
  function hardReloadServiceWorkerOnce(){
    if(!('serviceWorker' in navigator)) return;
    const key='qmaHardFixSWV';
    if(localStorage.getItem(key)===BUILD) return;
    localStorage.setItem(key,BUILD);
    navigator.serviceWorker.getRegistrations?.().then(regs=>{
      regs.forEach(r=>{ try{ r.update(); }catch(e){} });
    }).catch(()=>{});
  }
  function init(){
    document.documentElement.setAttribute('data-qma-hard-fix',BUILD);
    migrateBadCachedPages();
    hydrateAyahs();
    deepCleanVisible();
    bindAyahPointers();
    improveIndexWhenOpen();
    addDeveloperCard();
    refreshDataStats();
    replaceRoughIcons();
    forceBrowserStart();
    hardReloadServiceWorkerOnce();
    document.addEventListener('qma-page-rendered',()=>{hydrateAyahs();deepCleanVisible();replaceRoughIcons();refreshDataStats();});
    setTimeout(()=>{hydrateAyahs();deepCleanVisible();replaceRoughIcons();refreshDataStats();},600);
    setTimeout(()=>{hydrateAyahs();deepCleanVisible();replaceRoughIcons();refreshDataStats();},1600);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
