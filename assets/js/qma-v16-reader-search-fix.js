(function(){
  'use strict';
  const BUILD='qma-v16-reader-search-fixed';
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
  const AR='٠١٢٣٤٥٦٧٨٩';
  const toArabic=v=>String(v==null?'':v).replace(/\d/g,d=>AR[Number(d)]);
  const toLatin=v=>String(v==null?'':v).replace(/[٠-٩]/g,d=>String(AR.indexOf(d)));
  const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const pageKey=p=>`qma-page-v14-clean-${p}`;
  const normalize=v=>String(v||'')
    .normalize('NFC')
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0610-\u061A\u08D4-\u08FF]/g,'')
    .replace(/[إأآٱ]/g,'ا')
    .replace(/ى/g,'ي')
    .replace(/ؤ/g,'و')
    .replace(/ئ/g,'ي')
    .replace(/ة/g,'ه')
    .replace(/ـ/g,'')
    .replace(/[٠-٩]/g,d=>String(AR.indexOf(d)))
    .replace(/[\s\p{P}\p{S}]+/gu,' ')
    .trim()
    .toLowerCase();
  const cleanQuranText=v=>String(v||'')
    .normalize('NFC')
    .replace(/[\u0610-\u061A\u06D6-\u06ED\u08D4-\u08FF]/g,'')
    .replace(/[\uE000-\uF8FF\uFDFD\uFD3E\uFD3F\uFFFC\uFFFD]/g,'')
    .replace(/[\u25A0-\u25FF□▪▫◦●○◆◇■⬚⬛⬜]/g,'')
    .replace(/[^ء-يً-ٰٟٱیە٠-٩0-9\s]/g,'')
    .replace(/\s+/g,' ')
    .trim();
  function toast(msg){
    let n=$('.qma-toast-v16,.qma-toast-hard,.qma-toast-reviewed,.qma-toast');
    if(n)n.remove();
    n=document.createElement('div');
    n.className='qma-toast-v16';
    n.textContent=msg;
    document.body.appendChild(n);
    setTimeout(()=>n.remove(),2200);
  }
  function surahs(){return Array.isArray(window.QMA_SURAH_INDEX)?window.QMA_SURAH_INDEX:[];}
  function surahById(id){return surahs().find(s=>Number(s.id)===Number(id))||null;}
  function startPageOfSurah(id){const s=surahById(id);return Number(s&&s.page)||1;}
  function readJson(k){try{return JSON.parse(localStorage.getItem(k)||'null');}catch(e){return null;}}
  function writeJson(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}

  function icon(name){
    const a='viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';
    const paths={
      reader:'<path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v17H7.5A2.5 2.5 0 0 0 5 21.5v-17Z"/><path d="M8 6h7M8 10h8M8 14h6"/>',
      readerOff:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z"/><path d="M8 7h8M8 11h7M8 15h6"/><path d="M3 3l18 18"/>',
      search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
      close:'<path d="M6 6l12 12M18 6 6 18"/>'
    };
    return `<svg class="qma-svg-icon" ${a}>${paths[name]||paths.reader}</svg>`;
  }

  function setCleanMode(on){
    document.body.classList.toggle('qma-reader-clean',!!on);
    document.body.classList.toggle('qma-reader-clean-v16',!!on);
    localStorage.setItem('qmaReaderCleanMode',on?'1':'0');
    const btn=$('#qma-reader-mode');
    if(btn){
      btn.innerHTML=icon(on?'readerOff':'reader');
      btn.dataset.svgReady='1';
      btn.setAttribute('aria-pressed',on?'true':'false');
      btn.setAttribute('aria-label',on?'إظهار أدوات القراءة':'وضع القراءة الصافي');
      btn.title=on?'إظهار أدوات القراءة':'وضع القراءة الصافي';
    }
    let exit=$('#qma-reader-clean-exit');
    if(on){
      if(!exit){
        exit=document.createElement('button');
        exit.id='qma-reader-clean-exit';
        exit.type='button';
        exit.innerHTML=`${icon('close')}<span>إظهار الأدوات</span>`;
        document.body.appendChild(exit);
        exit.addEventListener('click',e=>{e.preventDefault();setCleanMode(false);});
      }
    }else if(exit){exit.remove();}
  }
  function installReaderMode(){
    if(document.body.dataset.qmaPage!=='mushaf')return;
    const btn=$('#qma-reader-mode');
    if(!btn||btn.dataset.v16Reader==='1')return;
    const fresh=btn.cloneNode(true);
    fresh.dataset.v16Reader='1';
    fresh.dataset.svgReady='1';
    fresh.innerHTML=icon('reader');
    btn.replaceWith(fresh);
    fresh.addEventListener('click',e=>{
      e.preventDefault();
      e.stopPropagation();
      if(e.stopImmediatePropagation)e.stopImmediatePropagation();
      setCleanMode(!document.body.classList.contains('qma-reader-clean-v16'));
    },{capture:true});
    setCleanMode(localStorage.getItem('qmaReaderCleanMode')==='1');
  }

  function sanitizeCachedPages(){
    try{
      for(let i=0;i<localStorage.length;i++){
        const k=localStorage.key(i);
        if(!k||!k.startsWith('qma-page-v14-clean-'))continue;
        const data=readJson(k);
        if(!data||!Array.isArray(data.ayahs))continue;
        let dirty=false;
        data.ayahs.forEach(a=>{
          const c=cleanQuranText(a.text||'');
          if(c!==a.text){a.text=c;dirty=true;}
        });
        if(dirty)writeJson(k,data);
      }
    }catch(e){}
  }
  function cleanVisibleMushaf(){
    $$('.qma-mushaf-text').forEach(root=>{
      const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
      const nodes=[];
      while(walker.nextNode())nodes.push(walker.currentNode);
      nodes.forEach(node=>{
        if(node.parentElement&&node.parentElement.closest('.qma-ayah-number,.qma-surah-break,.qma-basmala'))return;
        const c=cleanQuranText(node.nodeValue||'');
        if(c!==node.nodeValue)node.nodeValue=c;
      });
    });
  }

  async function resolveAyahPage(surah,ayah){
    const s=Number(surah), a=Number(ayah);
    if(!s)return 149;
    if(!a)return startPageOfSurah(s);
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(!k||!k.startsWith('qma-page-v14-clean-'))continue;
      const data=readJson(k);
      if(!data||!Array.isArray(data.ayahs))continue;
      if(data.ayahs.some(x=>Number(x?.surah?.number)===s&&Number(x?.numberInSurah)===a))return Number(data.number)||Number(k.replace('qma-page-v14-clean-',''))||startPageOfSurah(s);
    }
    try{
      const r=await fetch(`https://api.alquran.cloud/v1/ayah/${s}:${a}/quran-simple-clean`,{headers:{Accept:'application/json'}});
      if(r.ok){
        const j=await r.json();
        const p=Number(j?.data?.page);
        if(p>=1&&p<=604)return p;
      }
    }catch(e){}
    return startPageOfSurah(s);
  }
  function highlightText(text,query){
    const safe=esc(cleanQuranText(text));
    const q=esc(cleanQuranText(query));
    if(!q)return safe;
    try{return safe.replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'),'<mark>$&</mark>');}
    catch(e){return safe;}
  }
  function resultButton(r,query){
    const attrs=[`data-qma-search-result="1"`];
    if(r.surah)attrs.push(`data-surah="${Number(r.surah)}"`);
    if(r.ayah)attrs.push(`data-ayah="${Number(r.ayah)}"`);
    if(r.page)attrs.push(`data-page="${Number(r.page)}"`);
    const meta=r.meta?`<span>${esc(r.meta)}</span>`:'';
    return `<button type="button" class="qma-result-card qma-search-result-v16" ${attrs.join(' ')}><strong>${esc(r.title)}</strong>${meta}<p>${highlightText(r.text||'',query)}</p></button>`;
  }
  async function searchQuran(query){
    const output=$('#qma-search-results');
    if(!output)return;
    const raw=String(query||'').trim();
    const clean=normalize(raw);
    if(clean.length<2){output.innerHTML='<div class="qma-empty-state">اكتب اسم سورة أو كلمة من الآية.</div>';return;}
    output.innerHTML='<div class="qma-empty-state">جار البحث...</div>';
    const localSurahs=surahs().filter(s=>normalize(`${s.id} ${s.name} ${s.english} ${s.type}`).includes(clean)).slice(0,12).map(s=>({
      title:`سورة ${s.name}`,
      text:`${toArabic(s.ayahs)} آية · ${s.type} · تبدأ من صفحة ${toArabic(s.page)}`,
      meta:'نتيجة من الفهرس المحلي',
      surah:s.id,
      page:s.page
    }));
    const results=[...localSurahs];
    try{
      const r=await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(raw)}/all/quran-simple-clean`,{headers:{Accept:'application/json'}});
      if(r.ok){
        const j=await r.json();
        const matches=Array.isArray(j?.data?.matches)?j.data.matches:[];
        matches.slice(0,35).forEach(m=>{
          const sNo=Number(m?.surah?.number||0), aNo=Number(m?.numberInSurah||0);
          const sName=(surahById(sNo)?.name)||m?.surah?.name||`سورة ${sNo}`;
          results.push({
            title:`${sName} · آية ${toArabic(aNo)}`,
            text:m.text||'',
            meta:'نتيجة آية من القرآن',
            surah:sNo,
            ayah:aNo,
            page:Number(m.page)||0
          });
        });
      }
    }catch(e){}
    if(results.length<2){
      try{
        for(let i=0;i<localStorage.length;i++){
          const k=localStorage.key(i);
          if(!k||!k.startsWith('qma-page-v14-clean-'))continue;
          const data=readJson(k);
          if(!data||!Array.isArray(data.ayahs))continue;
          data.ayahs.forEach(a=>{
            if(results.length>45)return;
            if(normalize(a.text).includes(clean)){
              const sNo=Number(a?.surah?.number||0), aNo=Number(a?.numberInSurah||0);
              results.push({title:`${a?.surah?.name||surahById(sNo)?.name||'سورة'} · آية ${toArabic(aNo)}`,text:a.text,meta:`محفوظة محلياً · صفحة ${toArabic(data.number)}`,surah:sNo,ayah:aNo,page:Number(data.number)||0});
            }
          });
        }
      }catch(e){}
    }
    const seen=new Set();
    const unique=results.filter(r=>{
      const key=`${r.surah||''}:${r.ayah||''}:${r.page||''}:${r.title}`;
      if(seen.has(key))return false; seen.add(key); return true;
    });
    output.innerHTML=unique.length?unique.map(r=>resultButton(r,raw)).join(''):'<div class="qma-empty-state">لا توجد نتائج. افتح الإنترنت للبحث الكامل أو حمّل صفحات المصحف للأوفلاين.</div>';
  }
  function installSearch(){
    if(document.body.dataset.qmaPage==='search'){
      const form=$('#qma-search-form'),input=$('#qma-search-input'),out=$('#qma-search-results');
      if(form&&input&&!form.dataset.v16Search){
        form.dataset.v16Search='1';
        form.addEventListener('submit',e=>{
          e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
          const q=input.value.trim();
          const url=new URL(location.href); if(q)url.searchParams.set('q',q); history.replaceState(null,'',url);
          searchQuran(q);
        },{capture:true});
        input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));}},true);
        const initial=new URLSearchParams(location.search).get('q')||input.value.trim();
        if(initial){input.value=initial; setTimeout(()=>searchQuran(initial),60);}
      }
      if(out&&!out.dataset.v16Nav){
        out.dataset.v16Nav='1';
        out.addEventListener('click',async e=>{
          const row=e.target.closest('[data-qma-search-result]');
          if(!row)return;
          e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
          const surah=Number(row.dataset.surah||0), ayah=Number(row.dataset.ayah||0);
          let page=Number(row.dataset.page||0);
          row.classList.add('is-loading');
          if(!page)page=await resolveAyahPage(surah,ayah);
          if(page<1||page>604)page=startPageOfSurah(surah)||149;
          localStorage.setItem('qmaCurrentPage',String(page));
          location.href=`surah.html?page=${encodeURIComponent(page)}${surah?`&surah=${encodeURIComponent(surah)}`:''}${ayah?`&ayah=${encodeURIComponent(ayah)}&focusAyah=1`:''}`;
        },{capture:true});
      }
    }
    const header=$('#qma-header-search');
    if(header&&!header.dataset.v16Search){
      header.dataset.v16Search='1';
      header.addEventListener('keydown',e=>{
        if(e.key!=='Enter')return;
        e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
        const q=header.value.trim();
        if(q)location.href=`search.html?q=${encodeURIComponent(q)}`;
      },{capture:true});
    }
  }

  async function handleAyahDeepLink(){
    if(document.body.dataset.qmaPage!=='mushaf')return;
    const params=new URLSearchParams(location.search);
    const surah=Number(params.get('surah')||0), ayah=Number(params.get('ayah')||0);
    if(!surah||!ayah)return;
    const currentPage=Number(params.get('page')||localStorage.getItem('qmaCurrentPage')||0);
    const wanted=await resolveAyahPage(surah,ayah);
    if(wanted&&wanted!==currentPage){
      localStorage.setItem('qmaCurrentPage',String(wanted));
      params.set('page',String(wanted));
      location.replace(`surah.html?${params.toString()}`);
      return;
    }
    const scroll=()=>{
      const el=$(`.qma-ayah-inline[data-surah="${surah}"][data-ayah="${ayah}"]`);
      if(!el)return false;
      el.classList.add('qma-search-focus-ayah');
      el.scrollIntoView({behavior:'smooth',block:'center',inline:'nearest'});
      const pill=$('#qma-ayah-pill'); if(pill)pill.textContent=`آية ${toArabic(ayah)}`;
      setTimeout(()=>el.classList.remove('qma-search-focus-ayah'),3500);
      return true;
    };
    if(!scroll())setTimeout(scroll,500);
    document.addEventListener('qma-page-rendered',()=>setTimeout(scroll,180),{once:true});
  }

  function init(){
    document.documentElement.setAttribute('data-qma-v16',BUILD);
    sanitizeCachedPages();
    cleanVisibleMushaf();
    installReaderMode();
    installSearch();
    handleAyahDeepLink();
    document.addEventListener('qma-page-rendered',()=>{cleanVisibleMushaf();installReaderMode();handleAyahDeepLink();});
    setTimeout(()=>{cleanVisibleMushaf();installReaderMode();installSearch();},800);
    setTimeout(()=>{cleanVisibleMushaf();installReaderMode();installSearch();},1800);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();


/* v17 final repair: robust search navigation, mobile install button, standalone PWA, reader clean cancel */
(function(){
  'use strict';
  const BUILD='qma-v17-final-mobile-search-install';
  const SURAH_FALLBACK=[{"id":1,"name":"الفاتحة","english":"Al-Fatihah","type":"مكية","ayahs":7,"page":1,"juz":1},{"id":2,"name":"البقرة","english":"Al-Baqarah","type":"مدنية","ayahs":286,"page":2,"juz":1},{"id":3,"name":"آل عمران","english":"Aal-Imran","type":"مدنية","ayahs":200,"page":50,"juz":3},{"id":4,"name":"النساء","english":"An-Nisa","type":"مدنية","ayahs":176,"page":77,"juz":4},{"id":5,"name":"المائدة","english":"Al-Maidah","type":"مدنية","ayahs":120,"page":106,"juz":6},{"id":6,"name":"الأنعام","english":"Al-Anam","type":"مكية","ayahs":165,"page":128,"juz":7},{"id":7,"name":"الأعراف","english":"Al-Araf","type":"مكية","ayahs":206,"page":151,"juz":8},{"id":8,"name":"الأنفال","english":"Al-Anfal","type":"مدنية","ayahs":75,"page":177,"juz":9},{"id":9,"name":"التوبة","english":"At-Tawbah","type":"مدنية","ayahs":129,"page":187,"juz":10},{"id":10,"name":"يونس","english":"Yunus","type":"مكية","ayahs":109,"page":208,"juz":11},{"id":11,"name":"هود","english":"Hud","type":"مكية","ayahs":123,"page":221,"juz":11},{"id":12,"name":"يوسف","english":"Yusuf","type":"مكية","ayahs":111,"page":235,"juz":12},{"id":13,"name":"الرعد","english":"Ar-Rad","type":"مدنية","ayahs":43,"page":249,"juz":13},{"id":14,"name":"إبراهيم","english":"Ibrahim","type":"مكية","ayahs":52,"page":255,"juz":13},{"id":15,"name":"الحجر","english":"Al-Hijr","type":"مكية","ayahs":99,"page":262,"juz":14},{"id":16,"name":"النحل","english":"An-Nahl","type":"مكية","ayahs":128,"page":267,"juz":14},{"id":17,"name":"الإسراء","english":"Al-Isra","type":"مكية","ayahs":111,"page":282,"juz":15},{"id":18,"name":"الكهف","english":"Al-Kahf","type":"مكية","ayahs":110,"page":293,"juz":15},{"id":19,"name":"مريم","english":"Maryam","type":"مكية","ayahs":98,"page":305,"juz":16},{"id":20,"name":"طه","english":"Taha","type":"مكية","ayahs":135,"page":312,"juz":16},{"id":21,"name":"الأنبياء","english":"Al-Anbiya","type":"مكية","ayahs":112,"page":322,"juz":17},{"id":22,"name":"الحج","english":"Al-Hajj","type":"مدنية","ayahs":78,"page":332,"juz":17},{"id":23,"name":"المؤمنون","english":"Al-Muminun","type":"مكية","ayahs":118,"page":342,"juz":18},{"id":24,"name":"النور","english":"An-Nur","type":"مدنية","ayahs":64,"page":350,"juz":18},{"id":25,"name":"الفرقان","english":"Al-Furqan","type":"مكية","ayahs":77,"page":359,"juz":18},{"id":26,"name":"الشعراء","english":"Ash-Shuara","type":"مكية","ayahs":227,"page":367,"juz":19},{"id":27,"name":"النمل","english":"An-Naml","type":"مكية","ayahs":93,"page":377,"juz":19},{"id":28,"name":"القصص","english":"Al-Qasas","type":"مكية","ayahs":88,"page":385,"juz":20},{"id":29,"name":"العنكبوت","english":"Al-Ankabut","type":"مكية","ayahs":69,"page":396,"juz":20},{"id":30,"name":"الروم","english":"Ar-Rum","type":"مكية","ayahs":60,"page":404,"juz":21},{"id":31,"name":"لقمان","english":"Luqman","type":"مكية","ayahs":34,"page":411,"juz":21},{"id":32,"name":"السجدة","english":"As-Sajdah","type":"مكية","ayahs":30,"page":415,"juz":21},{"id":33,"name":"الأحزاب","english":"Al-Ahzab","type":"مدنية","ayahs":73,"page":418,"juz":21},{"id":34,"name":"سبأ","english":"Saba","type":"مكية","ayahs":54,"page":428,"juz":22},{"id":35,"name":"فاطر","english":"Fatir","type":"مكية","ayahs":45,"page":434,"juz":22},{"id":36,"name":"يس","english":"Ya-Sin","type":"مكية","ayahs":83,"page":440,"juz":22},{"id":37,"name":"الصافات","english":"As-Saffat","type":"مكية","ayahs":182,"page":446,"juz":23},{"id":38,"name":"ص","english":"Sad","type":"مكية","ayahs":88,"page":453,"juz":23},{"id":39,"name":"الزمر","english":"Az-Zumar","type":"مكية","ayahs":75,"page":458,"juz":23},{"id":40,"name":"غافر","english":"Ghafir","type":"مكية","ayahs":85,"page":467,"juz":24},{"id":41,"name":"فصلت","english":"Fussilat","type":"مكية","ayahs":54,"page":477,"juz":24},{"id":42,"name":"الشورى","english":"Ash-Shura","type":"مكية","ayahs":53,"page":483,"juz":25},{"id":43,"name":"الزخرف","english":"Az-Zukhruf","type":"مكية","ayahs":89,"page":489,"juz":25},{"id":44,"name":"الدخان","english":"Ad-Dukhan","type":"مكية","ayahs":59,"page":496,"juz":25},{"id":45,"name":"الجاثية","english":"Al-Jathiyah","type":"مكية","ayahs":37,"page":499,"juz":25},{"id":46,"name":"الأحقاف","english":"Al-Ahqaf","type":"مكية","ayahs":35,"page":502,"juz":26},{"id":47,"name":"محمد","english":"Muhammad","type":"مدنية","ayahs":38,"page":507,"juz":26},{"id":48,"name":"الفتح","english":"Al-Fath","type":"مدنية","ayahs":29,"page":511,"juz":26},{"id":49,"name":"الحجرات","english":"Al-Hujurat","type":"مدنية","ayahs":18,"page":515,"juz":26},{"id":50,"name":"ق","english":"Qaf","type":"مكية","ayahs":45,"page":518,"juz":26},{"id":51,"name":"الذاريات","english":"Adh-Dhariyat","type":"مكية","ayahs":60,"page":520,"juz":26},{"id":52,"name":"الطور","english":"At-Tur","type":"مكية","ayahs":49,"page":523,"juz":27},{"id":53,"name":"النجم","english":"An-Najm","type":"مكية","ayahs":62,"page":526,"juz":27},{"id":54,"name":"القمر","english":"Al-Qamar","type":"مكية","ayahs":55,"page":528,"juz":27},{"id":55,"name":"الرحمن","english":"Ar-Rahman","type":"مدنية","ayahs":78,"page":531,"juz":27},{"id":56,"name":"الواقعة","english":"Al-Waqiah","type":"مكية","ayahs":96,"page":534,"juz":27},{"id":57,"name":"الحديد","english":"Al-Hadid","type":"مدنية","ayahs":29,"page":537,"juz":27},{"id":58,"name":"المجادلة","english":"Al-Mujadilah","type":"مدنية","ayahs":22,"page":542,"juz":28},{"id":59,"name":"الحشر","english":"Al-Hashr","type":"مدنية","ayahs":24,"page":545,"juz":28},{"id":60,"name":"الممتحنة","english":"Al-Mumtahanah","type":"مدنية","ayahs":13,"page":549,"juz":28},{"id":61,"name":"الصف","english":"As-Saff","type":"مدنية","ayahs":14,"page":551,"juz":28},{"id":62,"name":"الجمعة","english":"Al-Jumuah","type":"مدنية","ayahs":11,"page":553,"juz":28},{"id":63,"name":"المنافقون","english":"Al-Munafiqun","type":"مدنية","ayahs":11,"page":554,"juz":28},{"id":64,"name":"التغابن","english":"At-Taghabun","type":"مدنية","ayahs":18,"page":556,"juz":28},{"id":65,"name":"الطلاق","english":"At-Talaq","type":"مدنية","ayahs":12,"page":558,"juz":28},{"id":66,"name":"التحريم","english":"At-Tahrim","type":"مدنية","ayahs":12,"page":560,"juz":28},{"id":67,"name":"الملك","english":"Al-Mulk","type":"مكية","ayahs":30,"page":562,"juz":29},{"id":68,"name":"القلم","english":"Al-Qalam","type":"مكية","ayahs":52,"page":564,"juz":29},{"id":69,"name":"الحاقة","english":"Al-Haqqah","type":"مكية","ayahs":52,"page":566,"juz":29},{"id":70,"name":"المعارج","english":"Al-Maarij","type":"مكية","ayahs":44,"page":568,"juz":29},{"id":71,"name":"نوح","english":"Nuh","type":"مكية","ayahs":28,"page":570,"juz":29},{"id":72,"name":"الجن","english":"Al-Jinn","type":"مكية","ayahs":28,"page":572,"juz":29},{"id":73,"name":"المزمل","english":"Al-Muzzammil","type":"مكية","ayahs":20,"page":574,"juz":29},{"id":74,"name":"المدثر","english":"Al-Muddaththir","type":"مكية","ayahs":56,"page":575,"juz":29},{"id":75,"name":"القيامة","english":"Al-Qiyamah","type":"مكية","ayahs":40,"page":577,"juz":29},{"id":76,"name":"الإنسان","english":"Al-Insan","type":"مدنية","ayahs":31,"page":578,"juz":29},{"id":77,"name":"المرسلات","english":"Al-Mursalat","type":"مكية","ayahs":50,"page":580,"juz":29},{"id":78,"name":"النبأ","english":"An-Naba","type":"مكية","ayahs":40,"page":582,"juz":30},{"id":79,"name":"النازعات","english":"An-Naziat","type":"مكية","ayahs":46,"page":583,"juz":30},{"id":80,"name":"عبس","english":"Abasa","type":"مكية","ayahs":42,"page":585,"juz":30},{"id":81,"name":"التكوير","english":"At-Takwir","type":"مكية","ayahs":29,"page":586,"juz":30},{"id":82,"name":"الانفطار","english":"Al-Infitar","type":"مكية","ayahs":19,"page":587,"juz":30},{"id":83,"name":"المطففين","english":"Al-Mutaffifin","type":"مكية","ayahs":36,"page":587,"juz":30},{"id":84,"name":"الانشقاق","english":"Al-Inshiqaq","type":"مكية","ayahs":25,"page":589,"juz":30},{"id":85,"name":"البروج","english":"Al-Buruj","type":"مكية","ayahs":22,"page":590,"juz":30},{"id":86,"name":"الطارق","english":"At-Tariq","type":"مكية","ayahs":17,"page":591,"juz":30},{"id":87,"name":"الأعلى","english":"Al-Ala","type":"مكية","ayahs":19,"page":591,"juz":30},{"id":88,"name":"الغاشية","english":"Al-Ghashiyah","type":"مكية","ayahs":26,"page":592,"juz":30},{"id":89,"name":"الفجر","english":"Al-Fajr","type":"مكية","ayahs":30,"page":593,"juz":30},{"id":90,"name":"البلد","english":"Al-Balad","type":"مكية","ayahs":20,"page":594,"juz":30},{"id":91,"name":"الشمس","english":"Ash-Shams","type":"مكية","ayahs":15,"page":595,"juz":30},{"id":92,"name":"الليل","english":"Al-Layl","type":"مكية","ayahs":21,"page":595,"juz":30},{"id":93,"name":"الضحى","english":"Ad-Duhaa","type":"مكية","ayahs":11,"page":596,"juz":30},{"id":94,"name":"الشرح","english":"Ash-Sharh","type":"مكية","ayahs":8,"page":596,"juz":30},{"id":95,"name":"التين","english":"At-Tin","type":"مكية","ayahs":8,"page":597,"juz":30},{"id":96,"name":"العلق","english":"Al-Alaq","type":"مكية","ayahs":19,"page":597,"juz":30},{"id":97,"name":"القدر","english":"Al-Qadr","type":"مكية","ayahs":5,"page":598,"juz":30},{"id":98,"name":"البينة","english":"Al-Bayyinah","type":"مدنية","ayahs":8,"page":598,"juz":30},{"id":99,"name":"الزلزلة","english":"Az-Zalzalah","type":"مدنية","ayahs":8,"page":599,"juz":30},{"id":100,"name":"العاديات","english":"Al-Adiyat","type":"مكية","ayahs":11,"page":599,"juz":30},{"id":101,"name":"القارعة","english":"Al-Qariah","type":"مكية","ayahs":11,"page":600,"juz":30},{"id":102,"name":"التكاثر","english":"At-Takathur","type":"مكية","ayahs":8,"page":600,"juz":30},{"id":103,"name":"العصر","english":"Al-Asr","type":"مكية","ayahs":3,"page":601,"juz":30},{"id":104,"name":"الهمزة","english":"Al-Humazah","type":"مكية","ayahs":9,"page":601,"juz":30},{"id":105,"name":"الفيل","english":"Al-Fil","type":"مكية","ayahs":5,"page":601,"juz":30},{"id":106,"name":"قريش","english":"Quraysh","type":"مكية","ayahs":4,"page":602,"juz":30},{"id":107,"name":"الماعون","english":"Al-Maun","type":"مكية","ayahs":7,"page":602,"juz":30},{"id":108,"name":"الكوثر","english":"Al-Kawthar","type":"مكية","ayahs":3,"page":602,"juz":30},{"id":109,"name":"الكافرون","english":"Al-Kafirun","type":"مكية","ayahs":6,"page":603,"juz":30},{"id":110,"name":"النصر","english":"An-Nasr","type":"مدنية","ayahs":3,"page":603,"juz":30},{"id":111,"name":"المسد","english":"Al-Masad","type":"مكية","ayahs":5,"page":603,"juz":30},{"id":112,"name":"الإخلاص","english":"Al-Ikhlas","type":"مكية","ayahs":4,"page":604,"juz":30},{"id":113,"name":"الفلق","english":"Al-Falaq","type":"مكية","ayahs":5,"page":604,"juz":30},{"id":114,"name":"الناس","english":"An-Nas","type":"مكية","ayahs":6,"page":604,"juz":30}];
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
  const AR='٠١٢٣٤٥٦٧٨٩';
  const toArabic=v=>String(v==null?'':v).replace(/\d/g,d=>AR[Number(d)]);
  const toLatin=v=>String(v==null?'':v).replace(/[٠-٩]/g,d=>String(AR.indexOf(d)));
  const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const normalize=v=>toLatin(String(v||''))
    .normalize('NFC')
    .replace(/[ً-ٰٟۖ-ۭؐ-ؚࣔ-ࣿ]/g,'')
    .replace(/[إأآٱ]/g,'ا')
    .replace(/ى/g,'ي')
    .replace(/ؤ/g,'و')
    .replace(/ئ/g,'ي')
    .replace(/ة/g,'ه')
    .replace(/ـ/g,'')
    .replace(/[\s\p{P}\p{S}]+/gu,' ')
    .trim()
    .toLowerCase();
  const cleanQuranText=v=>String(v||'')
    .normalize('NFC')
    .replace(/[ؐ-ؚۖ-ۭࣔ-ࣿ]/g,'')
    .replace(/[-﷽﴾﴿￼�]/g,'')
    .replace(/[■-◿□▪▫◦●○◆◇■⬚⬛⬜]/g,'')
    .replace(/\s+/g,' ')
    .trim();
  const surahs=()=>{
    const live=Array.isArray(window.QMA_SURAH_INDEX)&&window.QMA_SURAH_INDEX.length===114?window.QMA_SURAH_INDEX:null;
    return live||SURAH_FALLBACK;
  };
  const surahById=id=>surahs().find(s=>Number(s.id)===Number(id))||null;
  const startPageOfSurah=id=>Number(surahById(id)?.page)||149;
  const pageKey=p=>`qma-page-v14-clean-${p}`;
  const readJson=k=>{try{return JSON.parse(localStorage.getItem(k)||'null');}catch(e){return null;}};
  const toast=msg=>{
    let n=$('.qma-toast-v17,.qma-toast-v16,.qma-toast-hard,.qma-toast-reviewed,.qma-toast');
    if(n)n.remove();
    n=document.createElement('div');
    n.className='qma-toast-v17';
    n.textContent=msg;
    document.body.appendChild(n);
    setTimeout(()=>n.remove(),2600);
  };
  const isStandalone=()=>window.matchMedia?.('(display-mode: standalone)')?.matches || window.navigator.standalone===true;

  function parseDirectQuery(query){
    const raw=toLatin(String(query||'').trim());
    const n=normalize(raw);
    if(!n)return null;
    if(/ايه الكرسي|اية الكرسي|آية الكرسي|كرسي/.test(n))return {surah:2,ayah:255,reason:'آية الكرسي'};
    const colon=raw.match(/(?:^|\D)(\d{1,3})\s*[:：\/-]\s*(\d{1,3})(?:\D|$)/);
    if(colon){
      const s=Number(colon[1]), a=Number(colon[2]);
      if(s>=1&&s<=114&&a>=1&&(surahById(s)?.ayahs||0)>=a)return {surah:s,ayah:a,reason:'ترقيم مباشر'};
    }
    let found=null;
    const cleanNoPrefix=n.replace(/^(سوره|سورة)\s+/,'').trim();
    const sorted=[...surahs()].sort((a,b)=>normalize(b.name).length-normalize(a.name).length);
    for(const s of sorted){
      const name=normalize(s.name), en=normalize(s.english);
      if(cleanNoPrefix===name || cleanNoPrefix.includes(name) || (en && cleanNoPrefix.includes(en))){found=s;break;}
    }
    if(!found){
      const onlyNum=raw.match(/^\s*(\d{1,3})\s*$/);
      if(onlyNum){const s=surahById(Number(onlyNum[1])); if(s)found=s;}
    }
    if(!found)return null;
    const nums=[...raw.matchAll(/\d{1,3}/g)].map(m=>Number(m[0])).filter(Boolean);
    let ayah=0;
    for(const x of nums){
      if(x!==Number(found.id) && x>=1 && x<=Number(found.ayahs)){ayah=x;break;}
    }
    return {surah:Number(found.id),ayah,reason:ayah?'سورة وآية':'سورة'};
  }

  function resultMarkup(r,query){
    const attrs=['data-qma-search-result-v17="1"'];
    if(r.surah)attrs.push(`data-surah="${Number(r.surah)}"`);
    if(r.ayah)attrs.push(`data-ayah="${Number(r.ayah)}"`);
    if(r.page)attrs.push(`data-page="${Number(r.page)}"`);
    const meta=r.meta?`<span>${esc(r.meta)}</span>`:'';
    let text=esc(cleanQuranText(r.text||''));
    const q=cleanQuranText(query||'').trim();
    if(q){
      try{text=text.replace(new RegExp(esc(q).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'),'<mark>$&</mark>');}catch(e){}
    }
    return `<button type="button" class="qma-result-card qma-search-result-v16 qma-search-result-v17" ${attrs.join(' ')}><strong>${esc(r.title)}</strong>${meta}<p>${text}</p></button>`;
  }

  async function resolveAyahPage(surah,ayah){
    const s=Number(surah), a=Number(ayah);
    if(!s)return 149;
    if(!a)return startPageOfSurah(s);
    try{
      for(let i=0;i<localStorage.length;i++){
        const k=localStorage.key(i);
        if(!k||!k.startsWith('qma-page-v14-clean-'))continue;
        const data=readJson(k);
        if(!data||!Array.isArray(data.ayahs))continue;
        if(data.ayahs.some(x=>Number(x?.surah?.number)===s&&Number(x?.numberInSurah)===a))return Number(data.number)||Number(k.replace('qma-page-v14-clean-',''))||startPageOfSurah(s);
      }
    }catch(e){}
    try{
      const r=await fetch(`https://api.alquran.cloud/v1/ayah/${s}:${a}/quran-simple-clean`,{headers:{Accept:'application/json'}});
      if(r.ok){
        const j=await r.json();
        const p=Number(j?.data?.page);
        if(p>=1&&p<=604)return p;
      }
    }catch(e){}
    return startPageOfSurah(s);
  }

  async function openSearchResult(row){
    const surah=Number(row.dataset.surah||0), ayah=Number(row.dataset.ayah||0);
    let page=Number(row.dataset.page||0);
    row.classList.add('is-loading');
    row.setAttribute('aria-busy','true');
    if(!page)page=await resolveAyahPage(surah,ayah);
    if(page<1||page>604)page=startPageOfSurah(surah)||149;
    try{localStorage.setItem('qmaCurrentPage',String(page));}catch(e){}
    const url=new URL('surah.html',location.href);
    url.searchParams.set('page',String(page));
    if(surah)url.searchParams.set('surah',String(surah));
    if(ayah){url.searchParams.set('ayah',String(ayah));url.searchParams.set('focusAyah','1');}
    location.href=url.href;
  }

  async function search(query){
    const output=$('#qma-search-results');
    if(!output)return;
    const raw=String(query||'').trim();
    const n=normalize(raw);
    if(n.length<1){output.innerHTML='<div class="qma-empty-state">اكتب اسم سورة أو رقم آية أو كلمة من الآية.</div>';return;}
    output.innerHTML='<div class="qma-empty-state">جار البحث...</div>';
    const results=[];
    const direct=parseDirectQuery(raw);
    if(direct){
      const s=surahById(direct.surah);
      results.push({title:direct.ayah?`سورة ${s?.name||direct.surah} · آية ${toArabic(direct.ayah)}`:`سورة ${s?.name||direct.surah}`,text:direct.ayah?`فتح الآية ${toArabic(direct.ayah)} من سورة ${s?.name||direct.surah}`:`فتح سورة ${s?.name||direct.surah} من صفحة ${toArabic(s?.page||startPageOfSurah(direct.surah))}`,meta:'فتح مباشر',surah:direct.surah,ayah:direct.ayah,page:direct.ayah?0:startPageOfSurah(direct.surah)});
    }
    surahs().filter(s=>normalize(`${s.id} ${s.name} ${s.english} ${s.type}`).includes(n.replace(/^(سوره|سورة)\s+/,''))).slice(0,15).forEach(s=>{
      results.push({title:`سورة ${s.name}`,text:`${toArabic(s.ayahs)} آية · ${s.type} · تبدأ من صفحة ${toArabic(s.page)}`,meta:'نتيجة من الفهرس المحلي',surah:s.id,page:s.page});
    });
    try{
      for(let i=0;i<localStorage.length;i++){
        const k=localStorage.key(i);
        if(!k||!k.startsWith('qma-page-v14-clean-'))continue;
        const data=readJson(k);
        if(!data||!Array.isArray(data.ayahs))continue;
        data.ayahs.forEach(a=>{
          if(results.length>60)return;
          if(normalize(a.text).includes(n)){
            const sNo=Number(a?.surah?.number||0), aNo=Number(a?.numberInSurah||0);
            results.push({title:`${a?.surah?.name||surahById(sNo)?.name||'سورة'} · آية ${toArabic(aNo)}`,text:a.text,meta:`محفوظة محلياً · صفحة ${toArabic(data.number)}`,surah:sNo,ayah:aNo,page:Number(data.number)||0});
          }
        });
      }
    }catch(e){}
    try{
      const r=await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(raw)}/all/quran-simple-clean`,{headers:{Accept:'application/json'}});
      if(r.ok){
        const j=await r.json();
        const matches=Array.isArray(j?.data?.matches)?j.data.matches:[];
        matches.slice(0,40).forEach(m=>{
          const sNo=Number(m?.surah?.number||0), aNo=Number(m?.numberInSurah||0);
          const sName=surahById(sNo)?.name||m?.surah?.name||`سورة ${sNo}`;
          results.push({title:`${sName} · آية ${toArabic(aNo)}`,text:m.text||'',meta:'نتيجة آية من القرآن',surah:sNo,ayah:aNo,page:Number(m.page)||0});
        });
      }
    }catch(e){}
    const seen=new Set();
    const unique=results.filter(r=>{
      const key=`${r.surah||''}:${r.ayah||''}:${r.page||''}:${normalize(r.title)}`;
      if(seen.has(key))return false;
      seen.add(key);
      return true;
    });
    output.innerHTML=unique.length?unique.map(r=>resultMarkup(r,raw)).join(''):'<div class="qma-empty-state">لا توجد نتائج محلية. اتصل بالإنترنت للبحث الكامل أو حمّل صفحات المصحف للأوفلاين.</div>';
  }

  function installSearch(){
    const header=$('#qma-header-search');
    if(header&&!header.dataset.v17Search){
      header.dataset.v17Search='1';
      header.addEventListener('keydown',e=>{
        if(e.key!=='Enter')return;
        e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
        const q=header.value.trim();
        if(q)location.href=`search.html?q=${encodeURIComponent(q)}`;
      },{capture:true});
    }
    if(document.body.dataset.qmaPage!=='search')return;
    const oldForm=$('#qma-search-form');
    const oldOut=$('#qma-search-results');
    if(oldForm&&!oldForm.dataset.v17Replaced){
      const clone=oldForm.cloneNode(true);
      clone.dataset.v17Replaced='1';
      oldForm.replaceWith(clone);
    }
    if(oldOut&&!oldOut.dataset.v17Replaced){
      const clone=oldOut.cloneNode(true);
      clone.dataset.v17Replaced='1';
      oldOut.replaceWith(clone);
    }
    const form=$('#qma-search-form'), input=$('#qma-search-input'), out=$('#qma-search-results');
    if(form&&input&&!form.dataset.v17Search){
      form.dataset.v17Search='1';
      form.addEventListener('submit',e=>{
        e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
        const q=input.value.trim();
        const url=new URL(location.href);
        if(q)url.searchParams.set('q',q); else url.searchParams.delete('q');
        history.replaceState(null,'',url.href);
        search(q);
      },{capture:true});
      input.addEventListener('keydown',e=>{
        if(e.key==='Enter'){e.preventDefault();form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));}
      },{capture:true});
    }
    if(out&&!out.dataset.v17Nav){
      out.dataset.v17Nav='1';
      out.addEventListener('click',e=>{
        const row=e.target.closest('[data-qma-search-result-v17], [data-qma-search-result]');
        if(!row)return;
        e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
        openSearchResult(row);
      },{capture:true});
      out.addEventListener('keydown',e=>{
        if(e.key!=='Enter'&&e.key!==' ')return;
        const row=e.target.closest('[data-qma-search-result-v17], [data-qma-search-result]');
        if(!row)return;
        e.preventDefault();openSearchResult(row);
      },{capture:true});
    }
    const initial=new URLSearchParams(location.search).get('q')||input?.value?.trim()||'';
    if(initial&&input){input.value=initial;setTimeout(()=>search(initial),20);}
  }

  function installReaderCancel(){
    if(document.body.dataset.qmaPage!=='mushaf')return;
    let btn=$('#qma-reader-mode');
    if(btn&&!btn.dataset.v17Reader){
      const fresh=btn.cloneNode(true);
      fresh.dataset.v17Reader='1';
      fresh.dataset.v16Reader='1';
      fresh.dataset.svgReady='1';
      fresh.innerHTML='<span aria-hidden="true">▯</span>';
      btn.replaceWith(fresh);
      btn=fresh;
    }
    const setClean=on=>{
      document.body.classList.toggle('qma-reader-clean',!!on);
      document.body.classList.toggle('qma-reader-clean-v16',!!on);
      try{localStorage.setItem('qmaReaderCleanMode',on?'1':'0');}catch(e){}
      let exit=$('#qma-reader-clean-exit');
      if(on){
        if(!exit){
          exit=document.createElement('button');
          exit.id='qma-reader-clean-exit';
          exit.type='button';
          exit.setAttribute('aria-label','إلغاء وضع القراءة الصافي');
          exit.innerHTML='<span aria-hidden="true">×</span><b>إلغاء وضع القراءة</b>';
          document.body.appendChild(exit);
        }
        exit.onclick=e=>{e.preventDefault();e.stopPropagation();setClean(false);};
      }else if(exit){exit.remove();}
      if(btn){
        btn.setAttribute('aria-pressed',on?'true':'false');
        btn.setAttribute('aria-label',on?'إلغاء وضع القراءة الصافي':'وضع القراءة الصافي');
        btn.title=on?'إلغاء وضع القراءة الصافي':'وضع القراءة الصافي';
      }
    };
    if(btn&&!btn.dataset.v17ReaderBound){
      btn.dataset.v17ReaderBound='1';
      btn.addEventListener('click',e=>{
        e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
        setClean(!document.body.classList.contains('qma-reader-clean-v16'));
      },{capture:true});
    }
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('qma-reader-clean-v16'))setClean(false);},{capture:true});
    if(document.body.classList.contains('qma-reader-clean-v16')||localStorage.getItem('qmaReaderCleanMode')==='1')setClean(true);
  }

  let deferredInstallPrompt=null;
  function installHelpText(){
    const ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
    if(ios)return 'على iPhone افتح الموقع من Safari ثم اضغط مشاركة ثم Add to Home Screen.';
    return 'على Android افتح الموقع من Chrome ثم اضغط تثبيت التطبيق. لو الزر لم يفتح نافذة التثبيت، ارفع الموقع على HTTPS وتأكد من عمل manifest و service worker.';
  }
  function showInstallSheet(){
    let back=$('#qma-install-sheet');
    if(back)back.remove();
    back=document.createElement('div');
    back.id='qma-install-sheet';
    back.innerHTML=`<section role="dialog" aria-modal="true" aria-label="تثبيت التطبيق"><button type="button" class="qma-install-close" aria-label="إغلاق">×</button><h2>تثبيت التطبيق على الموبايل</h2><p>${esc(installHelpText())}</p><p>بعد التثبيت سيفتح التطبيق بواجهة موبايل مستقلة من الشاشة الرئيسية.</p></section>`;
    document.body.appendChild(back);
    back.addEventListener('click',e=>{if(e.target===back||e.target.closest('.qma-install-close'))back.remove();});
  }
  async function requestInstall(){
    if(isStandalone()){toast('التطبيق مثبت بالفعل');return;}
    if(deferredInstallPrompt){
      const promptEvent=deferredInstallPrompt;
      deferredInstallPrompt=null;
      try{
        promptEvent.prompt();
        await promptEvent.userChoice;
      }catch(e){showInstallSheet();}
      return;
    }
    showInstallSheet();
  }
  function ensureInstallUI(){
    if(isStandalone()){$$('.qma-install-floating,#qma-install-card').forEach(x=>x.remove());return;}
    if(document.body.dataset.qmaPage==='settings'){
      const panel=$('.qma-settings-panel');
      if(panel&&!$('#qma-install-card')){
        const card=document.createElement('section');
        card.className='qma-setting-block qma-install-card';
        card.id='qma-install-card';
        card.innerHTML='<h2>تثبيت على الموبايل</h2><div class="qma-switch-row"><span><b>تنزيل التطبيق على الشاشة الرئيسية</b><br><small id="qma-install-status">جاهز للتثبيت عند فتح الموقع من متصفح يدعم PWA.</small></span><button class="qma-pill-btn" id="qma-install-app-btn" type="button">تثبيت التطبيق</button></div>';
        const offline=[...panel.querySelectorAll('.qma-setting-block')].find(x=>/الأوفلاين|Offline/i.test(x.textContent||''));
        panel.insertBefore(card,offline||panel.children[1]||null);
      }
    }
    if(!$('.qma-install-floating')&&document.body.dataset.qmaPage!=='settings'){
      const b=document.createElement('button');
      b.type='button';
      b.className='qma-install-floating';
      b.textContent='تثبيت التطبيق';
      document.body.appendChild(b);
    }
    $$('#qma-install-app-btn,.qma-install-floating').forEach(b=>{
      if(b.dataset.v17Install)return;
      b.dataset.v17Install='1';
      b.addEventListener('click',e=>{e.preventDefault();requestInstall();},{capture:true});
    });
  }
  function installPwaControls(){
    window.addEventListener('beforeinstallprompt',e=>{
      e.preventDefault();
      deferredInstallPrompt=e;
      ensureInstallUI();
      const st=$('#qma-install-status');
      if(st)st.textContent='جاهز للتثبيت الآن.';
    });
    window.addEventListener('appinstalled',()=>{toast('تم تثبيت التطبيق');$$('.qma-install-floating,#qma-install-card').forEach(x=>x.remove());});
    ensureInstallUI();
  }

  async function focusDeepLinkedAyah(){
    if(document.body.dataset.qmaPage!=='mushaf')return;
    const params=new URLSearchParams(location.search);
    const surah=Number(params.get('surah')||0), ayah=Number(params.get('ayah')||0);
    if(!surah)return;
    if(ayah){
      const current=Number(params.get('page')||localStorage.getItem('qmaCurrentPage')||0);
      const wanted=await resolveAyahPage(surah,ayah);
      if(wanted&&current&&wanted!==current){
        params.set('page',String(wanted));
        try{localStorage.setItem('qmaCurrentPage',String(wanted));}catch(e){}
        location.replace(`surah.html?${params.toString()}`);
        return;
      }
    }
    const run=()=>{
      if(!ayah)return false;
      const el=$(`.qma-ayah-inline[data-surah="${surah}"] [data-ayah="${ayah}"], .qma-ayah-inline[data-surah="${surah}"][data-ayah="${ayah}"]`);
      if(!el)return false;
      el.classList.add('qma-search-focus-ayah');
      try{el.scrollIntoView({behavior:'smooth',block:'center',inline:'nearest'});}catch(e){el.scrollIntoView();}
      const pill=$('#qma-ayah-pill'); if(pill)pill.textContent=`آية ${toArabic(ayah)}`;
      setTimeout(()=>el.classList.remove('qma-search-focus-ayah'),4000);
      return true;
    };
    if(!run()){setTimeout(run,450);setTimeout(run,1200);}
  }

  function patchManifestLink(){
    document.documentElement.setAttribute('data-qma-v17',BUILD);
    const link=$('link[rel="manifest"]');
    if(link&&!/[?&]v=/.test(link.getAttribute('href')||''))link.setAttribute('href','manifest.json?v='+encodeURIComponent(BUILD));
  }
  function init(){
    patchManifestLink();
    installSearch();
    installReaderCancel();
    installPwaControls();
    focusDeepLinkedAyah();
    document.addEventListener('qma-page-rendered',()=>{installReaderCancel();focusDeepLinkedAyah();});
    setTimeout(()=>{installSearch();installReaderCancel();ensureInstallUI();focusDeepLinkedAyah();},600);
    setTimeout(()=>{installSearch();installReaderCancel();ensureInstallUI();focusDeepLinkedAyah();},1600);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
