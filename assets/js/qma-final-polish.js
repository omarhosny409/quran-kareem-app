(function(){
  'use strict';
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
  const ar='٠١٢٣٤٥٦٧٨٩';
  function toArabic(v){return String(v).replace(/\d/g,d=>ar[Number(d)]);}
  function bytes(n){
    if(!Number.isFinite(n)) return '—';
    if(n<1024) return `${n} B`;
    if(n<1024*1024) return `${Math.round(n/1024)} KB`;
    return `${(n/1024/1024).toFixed(1)} MB`;
  }
  function pageCacheKeys(){
    const keys=[];
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k && k.startsWith('qma-page-v14-clean-')) keys.push(k);
    }
    return keys;
  }
  function storageSize(){
    let total=0;
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      const v=localStorage.getItem(k)||'';
      total += (k.length + v.length) * 2;
    }
    return total;
  }
  function refreshDataStats(){
    const count=$('#qma-cached-pages-count');
    const size=$('#qma-current-storage-size');
    if(count) count.textContent=toArabic(pageCacheKeys().length);
    if(size) size.textContent=bytes(storageSize());
  }
  function toast(msg){
    let n=$('.qma-toast-reviewed') || $('.qma-toast');
    if(n) n.remove();
    n=document.createElement('div');
    n.className='qma-toast-reviewed';
    n.textContent=msg;
    document.body.appendChild(n);
    setTimeout(()=>n.remove(),2200);
  }
  function cleanVisibleQuran(){
    $$('.qma-mushaf-text,.qma-result-card p').forEach(node=>{
      node.childNodes.forEach(child=>{
        if(child.nodeType===Node.TEXT_NODE){
          child.nodeValue=child.nodeValue.replace(/[\u06D6-\u06ED\u0615-\u061A]/g,'').replace(/[\uE000-\uF8FF]/g,'').replace(/\u25A1|□/g,'');
        }
      });
    });
  }
  function bindSettingsData(){
    if(document.body.dataset.qmaPage!=='settings') return;
    refreshDataStats();
    $('#qma-clear-quran-cache')?.addEventListener('click',e=>{
      e.preventDefault();
      const keys=pageCacheKeys();
      keys.forEach(k=>localStorage.removeItem(k));
      refreshDataStats();
      toast(`تم مسح ${toArabic(keys.length)} صفحة محفوظة`);
    });
    $('#qma-reset-preferences')?.addEventListener('click',e=>{
      e.preventDefault();
      ['qmaLang','quranTheme','qmaFontScale','qmaReviewedSettings'].forEach(k=>localStorage.removeItem(k));
      toast('تمت إعادة ضبط الإعدادات');
      setTimeout(()=>location.reload(),500);
    });
    const dl=$('#qma-download-pages');
    if(dl){
      const mo=new MutationObserver(refreshDataStats);
      const st=$('#qma-offline-status');
      if(st) mo.observe(st,{childList:true,subtree:true,characterData:true});
      dl.addEventListener('click',()=>setTimeout(refreshDataStats,1000));
    }
  }
  function bindOpenAtBrowse(){
    // Keep any internal home links opening the reader, while the Tools tab opens tools.html.
    $$('a[href="index.html"]').forEach(a=>a.setAttribute('href','surah.html'));
    $$('.qma-bottom-nav a').forEach(a=>{
      const href=(a.getAttribute('href')||'').split('?')[0];
      if(href==='tools.html' && document.body.dataset.qmaPage==='tools') a.setAttribute('aria-current','page');
    });
  }
  function init(){
    bindOpenAtBrowse();
    bindSettingsData();
    cleanVisibleQuran();
    setTimeout(cleanVisibleQuran,800);
    document.addEventListener('qma-page-rendered',cleanVisibleQuran);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();

(function(){
  'use strict';
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
  const arDigits='٠١٢٣٤٥٦٧٨٩';
  const toArabic=v=>String(v).replace(/\d/g,d=>arDigits[Number(d)]);
  function sanitizeQuranText(value){
    return String(value||'').normalize('NFC')
      .replace(/[\u0610-\u061A\u06D6-\u06ED\u08D4-\u08FF]/g,'')
      .replace(/[\uE000-\uF8FF\uFDFD\uFD3E\uFD3F\uFFFC\uFFFD]/g,'')
      .replace(/[\u25A0-\u25FF□▪▫◦●○◆◇■]/g,'')
      .replace(/\s+/g,' ')
      .trim();
  }
  function toast(msg){
    let n=$('.qma-toast-reviewed')||$('.qma-toast');
    if(n)n.remove();
    n=document.createElement('div');
    n.className='qma-toast-reviewed';
    n.textContent=msg;
    document.body.appendChild(n);
    setTimeout(()=>n.remove(),2300);
  }
  function migrateCachedQuranText(){
    let changed=0;
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i);
      if(!key||!key.startsWith('qma-page-v14-clean-')) continue;
      try{
        const data=JSON.parse(localStorage.getItem(key)||'null');
        if(!data||!Array.isArray(data.ayahs)) continue;
        let dirty=false;
        data.ayahs.forEach(a=>{
          const clean=sanitizeQuranText(a.text);
          if(clean!==a.text){a.text=clean;dirty=true;}
        });
        if(dirty){localStorage.setItem(key,JSON.stringify(data));changed++;}
      }catch(e){}
    }
    return changed;
  }
  function cleanVisibleText(){
    $$('.qma-mushaf-text,.qma-result-card p,.qma-reader-article,.qma-tafsir-result').forEach(root=>{
      const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
      const nodes=[];
      while(walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node=>{
        const clean=sanitizeQuranText(node.nodeValue);
        if(clean!==node.nodeValue) node.nodeValue=clean;
      });
    });
  }
  function ayahPlainText(el){
    const clone=el.cloneNode(true);
    clone.querySelectorAll('.qma-ayah-number').forEach(n=>n.remove());
    return sanitizeQuranText(clone.textContent||'');
  }
  function closeAyahSheet(){
    $('.qma-ayah-actions-backdrop')?.remove();
    $$('.qma-ayah-inline.is-selected').forEach(x=>x.classList.remove('is-selected'));
  }
  async function copyText(text){
    try{
      if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);}
      else{
        const ta=document.createElement('textarea');
        ta.value=text; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
      }
      toast('تم النسخ');
    }catch(e){toast('تعذر النسخ من المتصفح');}
  }
  function saveAyah(info){
    let saved=[];
    try{saved=JSON.parse(localStorage.getItem('qmaSavedAyahs')||'[]')||[];}catch(e){}
    const key=`${info.surah}:${info.ayah}`;
    saved=saved.filter(x=>`${x.surah}:${x.ayah}`!==key);
    saved.unshift({surah:info.surah,ayah:info.ayah,page:info.page,text:info.text,createdAt:new Date().toISOString()});
    localStorage.setItem('qmaSavedAyahs',JSON.stringify(saved.slice(0,200)));
    toast('تم حفظ الآية في العلامات');
  }
  function openAyahActions(el){
    closeAyahSheet();
    el.classList.add('is-selected');
    const info={
      surah:Number(el.dataset.surah||0),
      ayah:Number(el.dataset.ayah||0),
      page:Number(el.dataset.page||localStorage.getItem('qmaCurrentPage')||0),
      text:ayahPlainText(el)
    };
    const sheet=document.createElement('div');
    sheet.className='qma-ayah-actions-backdrop';
    sheet.innerHTML=`<section class="qma-ayah-actions" role="dialog" aria-modal="true" aria-label="خيارات الآية">
      <h3>سورة ${toArabic(info.surah)} - آية ${toArabic(info.ayah)}</h3>
      <p>${info.text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</p>
      <div class="qma-ayah-actions-grid">
        <button class="is-primary" type="button" data-act="tafsir">تفسير</button>
        <button type="button" data-act="copy">نسخ</button>
        <button type="button" data-act="share">مشاركة</button>
        <button type="button" data-act="bookmark">حفظ علامة</button>
        <button type="button" data-act="open">فتح الصفحة</button>
        <button class="is-danger" type="button" data-act="close">إغلاق</button>
      </div>
    </section>`;
    document.body.appendChild(sheet);
    sheet.addEventListener('click',async e=>{
      if(e.target===sheet){closeAyahSheet();return;}
      const btn=e.target.closest('[data-act]');
      if(!btn)return;
      const act=btn.dataset.act;
      if(act==='close'){closeAyahSheet();return;}
      if(act==='tafsir'){location.href=`tafsir.html?surah=${encodeURIComponent(info.surah)}&ayah=${encodeURIComponent(info.ayah)}`;return;}
      if(act==='open'){location.href=`surah.html?page=${encodeURIComponent(info.page)}&surah=${encodeURIComponent(info.surah)}&ayah=${encodeURIComponent(info.ayah)}`;return;}
      if(act==='bookmark'){saveAyah(info);closeAyahSheet();return;}
      if(act==='copy'){await copyText(`${info.text} [${info.surah}:${info.ayah}]`);closeAyahSheet();return;}
      if(act==='share'){
        const payload={title:`آية ${info.surah}:${info.ayah}`,text:`${info.text} [${info.surah}:${info.ayah}]`};
        try{if(navigator.share) await navigator.share(payload); else await copyText(payload.text);}catch(e){}
        closeAyahSheet();return;
      }
    });
  }
  function bindAyahActions(){
    // Disabled here. The stronger mobile handler in qma-mobile-hard-fix.js handles ayah taps reliably on touch devices.
  }
  function improveIndexSheet(){
    const apply=sheet=>{
      const body=$('.qma-index-body',sheet);
      if(body){
        body.scrollTop=0;
        body.style.overscrollBehavior='contain';
      }
      const input=$('.qma-index-search input',sheet);
      if(input){
        input.autocomplete='off';
        input.addEventListener('input',()=>setTimeout(()=>{const b=$('.qma-index-body',sheet); if(b)b.scrollTop=0;},0));
      }
      $$('.qma-index-tabs button',sheet).forEach(btn=>btn.addEventListener('click',()=>setTimeout(()=>{const b=$('.qma-index-body',sheet); if(b)b.scrollTop=0;},0)));
    };
    const mo=new MutationObserver(muts=>muts.forEach(m=>m.addedNodes.forEach(node=>{
      if(node.nodeType===1 && node.matches?.('.qma-index-backdrop')) apply(node);
    })));
    mo.observe(document.body,{childList:true});
  }

  function bindReaderModeButton(){
    const btn=$('#qma-reader-mode');
    if(!btn)return;
    btn.addEventListener('click',e=>{
      e.preventDefault();
      document.body.classList.toggle('qma-reader-clean');
      const on=document.body.classList.contains('qma-reader-clean');
      btn.textContent=on?'□':'▯';
      toast(on?'تم تفعيل وضع القراءة الصافي':'تم إظهار عناصر التحكم');
    },true);
  }
  function bindTafsirParams(){
    if(document.body.dataset.qmaPage!=='tafsir')return;
    const params=new URLSearchParams(location.search);
    const surah=params.get('surah'), ayah=params.get('ayah');
    if(!surah||!ayah)return;
    setTimeout(()=>{
      const s=$('#qma-tafsir-surah'), a=$('#qma-tafsir-ayah'), form=$('#qma-tafsir-form');
      if(s)s.value=String(surah);
      if(a)a.value=String(ayah);
      if(form)form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
    },120);
  }
  function forceBrowseAsHome(){
    if(location.pathname.endsWith('/index.html')||location.pathname==='/'||location.pathname.endsWith('/')){
      // index.html already redirects. This keeps any cached shell pointing to the Browse reader.
      const current=localStorage.getItem('qmaCurrentPage')||'149';
      if(!location.pathname.endsWith('/surah.html')) location.replace(`surah.html?page=${encodeURIComponent(current)}`);
    }
  }
  function init(){
    migrateCachedQuranText();
    cleanVisibleText();
    bindAyahActions();
    bindReaderModeButton();
    improveIndexSheet();
    bindTafsirParams();
    forceBrowseAsHome();
    document.addEventListener('qma-page-rendered',()=>{cleanVisibleText();});
    setTimeout(cleanVisibleText,900);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
