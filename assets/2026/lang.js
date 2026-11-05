/* AiCoN site-wide language toggle (English / Malayalam). First-party. No third-party calls, no tracking, no cookies.
   Layers: (1) site UI strings are fixed, hand-written Malayalam; (2) a post with a reviewed Malayalam page opens that page;
   (3) otherwise the reader can translate the article ON THEIR OWN DEVICE (browser Translator API) with dates, amounts and
   numbers locked: any text block whose numbers changed is left in English. English pages stay canonical. */
(function(){
  if(window.__aiconLang)return; window.__aiconLang=true;
  function boot(){
  var KEY='aicon-lang', root=document.documentElement;
  var UI={'Posts':'Posts','Contact':'ബന്ധപ്പെടാം','About AiCoN':'AiCoN-നെ കുറിച്ച്','About':'കുറിച്ച്','Explore':'കാണാം','Latest guides':'പുതിയ guides','How we check':'എങ്ങനെ check ചെയ്യുന്നു','Home':'Home','More posts':'കൂടുതൽ posts','Share this post':'ഈ post share ചെയ്യൂ','WhatsApp':'WhatsApp','Telegram':'Telegram','Blog':'Blog','Dark mode':'Dark mode','Light mode':'Light mode','Top':'മുകളിലേക്ക്','© 2026 AiCoN | Your Trusted Tech Companion':'© 2026 AiCoN | നിങ്ങളുടെ Tech കൂട്ടുകാരൻ','Every guide shows what we checked.':'ഓരോ guide-ലും ഞങ്ങൾ എന്ത് check ചെയ്തു എന്ന് കാണിക്കുന്നു.','Join WhatsApp':'WhatsApp-ൽ ചേരൂ','YOUR TRUSTED TECH COMPANION':'നിങ്ങളുടെ TECH കൂട്ടുകാരൻ','Useful tech. Clear answers':'കൊള്ളാവുന്ന tech. വ്യക്തമായ ഉത്തരങ്ങൾ','Find a guide':'Guide തിരയൂ','Search':'Search','Join the WhatsApp channel':'WhatsApp channel-ൽ ചേരൂ','Browse the latest guides':'പുതിയ guides കാണൂ','Also on':'ഇവിടെയും:','Dates from our guides':'Guides-ലിലെ പ്രധാന date-കൾ','Check the official notice before applying':'Apply ചെയ്യും മുമ്പ് official notification ഒന്നുകൂടി നോക്കൂ','See all scholarship guides →':'എല്ലാ scholarship guides-ഉം →','How AiCoN checks a guide':'AiCoN ഒരു guide എങ്ങനെ check ചെയ്യുന്നു','Each guide lists the checks completed. When something could not be confirmed, the guide says so.':'ഓരോ guide-ലും ചെയ്ത checks പറയും. Confirm ചെയ്യാൻ പറ്റിയില്ലെങ്കിൽ അതും തുറന്നുപറയും.','Source checked':'Source check ചെയ്തു','We read the official page or notice itself, not only a summary.':'Summary മാത്രമല്ല, official page-o notification-o തന്നെ വായിക്കും.','Link tested':'Link test ചെയ്തു','We check that the source link reaches the intended page.':'Source link ശരിയായ page-ലേക്ക് പോകുന്നുണ്ടോ എന്ന് നോക്കും.','Costs and limits':'ചെലവും limits-ഉം','Prices, caps and trial terms include the date checked.':'വില, cap, trial conditions - check ചെയ്ത date-ഓടെ.','India availability':'India-യിൽ കിട്ടുമോ?','India and Kerala availability are checked where relevant.':'വേണ്ടിടത്തൊക്കെ India-യിലും Kerala-ത്തിലും കിട്ടുമോ എന്ന് നോക്കും.','Privacy and safety':'Privacy-യും safety-യും','Guides explain data access and what could go wrong.':'ഏതൊക്കെ data access ചെയ്യും, എന്ത് പ്രശ്നം വരാം എന്ന് guide-ൽ പറയും.','Limits disclosed':'Limits തുറന്നുപറയും','Anything not confirmed is stated plainly in the guide.':'Confirm ചെയ്യാത്ത കാര്യങ്ങൾ guide-ൽ വ്യക്തമായി പറയും.','Read the verification approach →':'എങ്ങനെ check ചെയ്യുന്നുവെന്ന് നോക്കൂ →','What we cover':'എന്തൊക്കെ ഉണ്ട്','Compare systems. Open details when you need them.':'System-കൾ compare ചെയ്യാം. വേണ്ട details തുറന്നുനോക്കാം.','PC tools &amp; software':'PC tools & software','PC tools & software':'PC tools & software','Useful software for your computer':'കമ്പ്യൂട്ടറിന് കൊള്ളാവുന്ന software','AI tools':'AI tools','New tools, checked before they reach you':'പുതിയ tools, check ചെയ്ത ശേഷം മാത്രം','Apps':'Apps','Android apps we try first':'ഞങ്ങൾ ആദ്യം try ചെയ്യുന്ന Android apps','Digital safety':'Digital safety','Scams, privacy and safe habits':'Scam-കൾ, privacy, safety','Scholarships':'Scholarships','Deadlines and eligibility':'Last date-കളും eligibility-ഉം','Fully Funded Abroad':'വിദേശത്ത് Fully Funded','Government services & schemes':'Govt services & schemes','Government services &amp; schemes':'Govt services & schemes','OS Explorer':'OS Explorer','Plain-language guides for AI tools, apps, scholarships and government services in India and Kerala. Each guide explains what was checked and what could not be confirmed.':'AI tools, apps, scholarships, India-ലെയും Kerala-ത്തിലെയും govt services - എല്ലാം ലളിതമായ ഭാഷയിൽ. എന്ത് check ചെയ്തു, എന്ത് confirm ചെയ്യാൻ പറ്റിയില്ല എന്ന് ഓരോ guide-ലും പറയും.'};
  var EXTRA={
   'Guides':'Guides','Topics':'വിഷയങ്ങൾ','Deadlines':'Last date-കൾ','Find a guide':'Guide തിരയൂ',
   'Your trusted tech companion':'നിങ്ങളുടെ Tech കൂട്ടുകാരൻ',
   'Tech, AI and government help,':'Tech, AI, Govt help,','checked before you click':'click ചെയ്യും മുമ്പ് check ചെയ്യൂ',
   'Plain-language guides for AI tools, apps, scholarships and government services in India and Kerala. Every guide lists what was checked and what could not be confirmed.':'AI tools, apps, scholarships, govt services - എല്ലാം ലളിതമായ ഭാഷയിൽ. എന്ത് check ചെയ്തു, എന്ത് confirm ചെയ്യാൻ കഴിഞ്ഞില്ല എന്ന് ഓരോ guide-ലും എഴുതിയിട്ടുണ്ട്.',
   'Act now':'ഇപ്പോൾ apply ചെയ്യൂ','Closing soon':'Last date അടുത്തു',
   'Deadlines from our guides, counted down live. Always check the official notice before applying.':'Guides-ലിലെ last date-കൾ, live countdown. Apply ചെയ്യും മുമ്പ് official notice ഒന്ന് നോക്കൂ.',
   'All scholarship guides':'എല്ലാ scholarship guides-ഉം',
   'Explore':'കാണാം','Latest guides':'പുതിയ guides','Events':'Events',
   'Events and hackathons':'Events-ഉം hackathons-ഉം','Browse event guides':'Event guides കാണൂ',
   'View all':'View all','guides':'guides',
   'New to AiCoN?':'AiCoN-ൽ പുതിയതാണോ?','Our verification approach':'ഞങ്ങൾ എങ്ങനെ check ചെയ്യുന്നു',
   'Read the verification approach →':'എങ്ങനെ check ചെയ്യുന്നുവെന്ന് നോക്കൂ →',
   'Follow':'Follow ചെയ്യൂ','WhatsApp channel':'WhatsApp channel','Blog (older posts)':'Blog (പഴയ posts)',
   'All guides':'എല്ലാ guides-ഉം','Filter by topic':'Topic തിരഞ്ഞെടുക്കൂ','Search guides':'Guides തിരയൂ',
   'Newest first':'പുതിയത് ആദ്യം','No guides match.':'Guide ഒന്നും കിട്ടിയില്ല.',
   'On this page':'ഈ page-ൽ','Sources':'Sources','Share this post':'ഈ post share ചെയ്യൂ',
   'The library':'Library','Every guide, in one place.':'എല്ലാ guides-ഉം, ഒരിടത്ത്.',
   'Search by tool, topic or scheme. Filter by category. Newest first.':'Tool, topic, scheme - എന്തും തിരയൂ. Category തിരഞ്ഞെടുക്കൂ. പുതിയത് ആദ്യം.',
   'Search posts':'Posts തിരയൂ','All':'All','PC tools':'PC tools','Linux':'Linux',
   'Government':'Govt','Offers':'Offers','Learning':'Learning','More':'കൂടുതൽ',
   'No posts match. Try another word, or check the':'Post ഒന്നും കിട്ടിയില്ല. വേറെ വാക്ക് ശ്രമിക്കൂ, അല്ലെങ്കിൽ','older blog':'പഴയ blog നോക്കൂ',
   'Read guide':'Guide വായിക്കൂ','Copy title, description & link':'Title, description, link copy ചെയ്യൂ','Copy link':'Link copy ചെയ്യൂ','Email':'Email',
   'Your Trusted Tech Companion.':'നിങ്ങളുടെ Tech കൂട്ടുകാരൻ.','Every guide shows what we checked, and what we could not confirm.':'ഓരോ guide-ലും ഞങ്ങൾ എന്ത് check ചെയ്തു, എന്ത് confirm ചെയ്യാൻ കഴിഞ്ഞില്ല എന്ന് എഴുതിയിട്ടുണ്ട്.',
   'Show avatar guide':'Avatar guide കാണിക്കൂ',
   'verified guides':'Check ചെയ്ത guides','topics to explore':'topics','Updated':'Updated','daily':'ദിവസവും',
   'Linux Distro':'Linux Distro','Pick a distribution that fits you':'നിങ്ങൾക്ക് ചേരുന്ന distro തിരഞ്ഞെടുക്കൂ',
   'Government services':'Govt services','Schemes and services from trusted authorities':'Official scheme-കളും services-ഉം',
   'Verified offers':'Check ചെയ്ത offers','Free deals that are real':'ശരിക്കും free ആയ offers',
   'Events & Hackathons':'Events & Hackathons','Contests, challenges and coding events':'മത്സരങ്ങളും challenges-ഉം coding events-ഉം',
   'Compare systems, open details on tap':'System-കൾ compare ചെയ്യൂ; tap ചെയ്താൽ details','Official embassy and government programmes':'Official embassy-കളും govt programme-കളും',
   'Subscribe':'Subscribe','Skip to content':'ഉള്ളടക്കത്തിലേക്ക് പോകൂ','Preview':'Preview',
   '☀ Light mode':'☀ Light mode','☾ Dark mode':'☾ Dark mode'};
  for(var ek in EXTRA){ if(!UI.hasOwnProperty(ek)) UI[ek]=EXTRA[ek]; }
  var MSG={
   ui:'മെനു ഇപ്പോൾ മലയാളത്തിലാണ്. ഈ post മലയാളത്തിൽ ഉണ്ടെങ്കിൽ അത് തുറക്കും. Date, fees, തുക പോലുള്ള കാര്യങ്ങൾക്ക് English page-ഉം official site-ഉമാണ് final.',
   btn:'ഈ post മലയാളത്തിലാക്കൂ (machine translation)',
   busy:'നിങ്ങളുടെ phone-ൽ തന്നെ translate ചെയ്യുന്നു...',
   done:'Machine translation (നിങ്ങളുടെ browser-ൽ മാത്രം). Date, fees, തുക പോലുള്ളവ English-ൽ തന്നെ ഉണ്ട്. Official കാര്യങ്ങൾക്ക് English page നോക്കൂ.',
   none:'ഈ browser-ൽ translation ഇല്ല; ഈ post മലയാളത്തിൽ ഇതുവരെ വന്നിട്ടില്ല. Original English തന്നെ കാണിക്കുന്നു.',
   rev:'ഇത് ഞങ്ങൾ review ചെയ്ത Malayalam version ആണ്. Date, fees പോലുള്ള കാര്യങ്ങൾക്ക് English page-ഉം official site-ഉം നോക്കൂ.'};
  var pageLang=(root.lang||'en').slice(0,2)==='ml'?'ml':'en';
  var alt={};document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(function(l){alt[l.hreflang.slice(0,2)]=l.href;});
  if(location.pathname.indexOf('/preview-2026/')===0){
    ['en','ml'].forEach(function(k){ if(alt[k]) alt[k]=alt[k].replace('https://aicon-hub.github.io/','/preview-2026/'); });
  }
  var pref='en';try{pref=localStorage.getItem(KEY)||'en';}catch(_){}
  var uiNodes=[];
  function collectUI(){
    var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n;
    while((n=w.nextNode())){
      var p=n.parentNode;if(!p||/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName)||p.closest('article.post,.lang-bar,#lang-toggle'))continue;
      var t=n.nodeValue.trim();if(UI.hasOwnProperty(t)&&uiNodes.indexOf(n)<0)uiNodes.push(n);
    }
    var f=document.querySelector('footer .wrap');
    if(f)f.childNodes.forEach(function(n){if(n.nodeType===3){var t=n.nodeValue.trim();if(UI[t]&&uiNodes.indexOf(n)<0)uiNodes.push(n);}});
  }
  var h1=document.querySelector('h1'),h1en=null,H1ML='കൊള്ളാവുന്ന tech. വ്യക്തമായ ഉത്തരങ്ങൾ';
  function setUI(l){
    if(h1&&/^Useful tech\./.test(h1.textContent)&&!h1.closest('article')){if(h1en===null)h1en=h1.innerHTML;h1.innerHTML=l==='ml'?H1ML:h1en;}
    uiNodes.forEach(function(n){
      if(n.__en===undefined)n.__en=n.nodeValue;
      var k=n.__en.trim();
      n.nodeValue=l==='ml'?n.__en.replace(k,UI[k]):n.__en;
    });
  }
  // header button
  var btn=document.createElement('button');btn.type='button';btn.id='lang-toggle';btn.className='lang-toggle';
  btn.setAttribute('aria-label','Language: English or Malayalam');
  var host=document.querySelector('header nav')||document.querySelector('header .wrap')||document.querySelector('header');
  var theme=document.getElementById('theme-toggle');
  if(host){if(theme&&theme.parentNode===host)host.insertBefore(btn,theme);else host.appendChild(btn);}
  function paintBtn(l){btn.innerHTML='<span'+(l==='en'?' class="on"':'')+'>EN</span><span'+(l==='ml'?' class="on"':'')+' lang="ml">മല</span>';btn.setAttribute('aria-pressed',l==='ml'?'true':'false');}
  // note bar + translate button (article pages only)
  var art=document.querySelector('article.post');
  var bar=document.createElement('div');bar.className='lang-bar';bar.setAttribute('aria-live','polite');
  var note=document.createElement('p');note.className='lang-note';
  var go=document.createElement('button');go.type='button';go.className='lang-go';go.hidden=true;go.textContent=MSG.btn;
  bar.appendChild(note);bar.appendChild(go);
  var main=document.querySelector('main');
  if(main)main.insertBefore(bar,main.firstChild);
  // number lock
  var NUM=/(?:₹|Rs\.?\s?)?\d[\d,.:/-]*(?:\s?(?:AM|PM|am|pm|%|lakh|crore))?|\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\b/g;
  function lock(t){var toks=[];var m=t.replace(NUM,function(x){toks.push(x);return '⟦'+(toks.length-1)+'⟧';});return {m:m,toks:toks};}
  function unlock(tr,toks){
    var seen=0;var out=tr.replace(/⟦\s*(\d+)\s*⟧/g,function(_,i){seen++;return toks[+i]!==undefined?toks[+i]:'\u0000';});
    return (seen===toks.length&&out.indexOf('\u0000')<0&&!/\d/.test(out.replace(new RegExp(toks.map(function(x){return x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}).join('|')||'$^','g'),'')))?out:null;
  }
  var translated=null;
  async function localTranslate(){
    if(!window.Translator)throw new Error('none');
    var av=await window.Translator.availability({sourceLanguage:'en',targetLanguage:'ml'});
    if(av==='unavailable')throw new Error('none');
    var tr=await window.Translator.create({sourceLanguage:'en',targetLanguage:'ml'});
    var w=document.createTreeWalker(art,NodeFilter.SHOW_TEXT),n,list=[];
    while((n=w.nextNode())){if(n.nodeValue.trim().length>1&&!/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName)&&!n.parentNode.closest('.src,.lang-bar'))list.push(n);}
    var kept=0;
    for(var i=0;i<list.length;i++){
      var s=list[i].nodeValue,L=lock(s);
      if(!/[A-Za-z]{3}/.test(L.m.replace(/⟦\d+⟧/g,'')))continue;
      try{var out=unlock(await tr.translate(L.m),L.toks);}catch(_){out=null;}
      list[i].__en=s;
      if(out===null){kept++;continue;}
      list[i].nodeValue=out;
    }
    translated=list;art.setAttribute('lang','ml');
  }
  async function toMalayalam(){
    if(alt.ml&&pageLang!=='ml'){location.href=alt.ml;return;}
    uiNodes.length||collectUI();setUI('ml');paintBtn('ml');root.setAttribute('data-ui-lang','ml');
    window.dispatchEvent(new Event('aicon:uilang'));
    if(pageLang==='ml'){note.textContent=MSG.rev;return;}
    note.textContent=MSG.ui;
    if(art){go.hidden=true;var ok=false;try{ok=!!window.Translator&&(await window.Translator.availability({sourceLanguage:'en',targetLanguage:'ml'}))!=='unavailable';}catch(_){}
      if(ok)go.hidden=false;else note.textContent=MSG.ui+' '+MSG.none;}
  }
  function toEnglish(){
    try{localStorage.setItem(KEY,'en');}catch(_){}
    if(alt.en&&pageLang==='ml'){location.href=alt.en;return;}
    if(translated){translated.forEach(function(n){if(n.__en!==undefined)n.nodeValue=n.__en;});translated=null;art.removeAttribute('lang');}
    setUI('en');paintBtn('en');root.removeAttribute('data-ui-lang');note.textContent='';go.hidden=true;
    window.dispatchEvent(new Event('aicon:uilang'));
  }
  btn.addEventListener('click',function(){
    var cur=(root.getAttribute('data-ui-lang')==='ml'||pageLang==='ml')?'ml':'en';
    if(cur==='ml'){toEnglish();}else{try{localStorage.setItem(KEY,'ml');}catch(_){}toMalayalam();}
  });
  go.addEventListener('click',async function(){
    go.hidden=true;note.textContent=MSG.busy;
    try{await localTranslate();note.textContent=MSG.done;}
    catch(_){note.textContent=MSG.ui+' '+MSG.none;}
  });
  collectUI();paintBtn(pageLang);
  if(pageLang==='ml'){uiNodes.length&&setUI('ml');note.textContent=MSG.rev;root.setAttribute('data-ui-lang','ml');window.dispatchEvent(new Event('aicon:uilang'));}
  else if(pref==='ml'){toMalayalam();}
  else bar.hidden=true;
  var _t=bar;new MutationObserver(function(){var h=!note.textContent&&go.hidden;if(_t.hidden!==h)_t.hidden=h;}).observe(bar,{childList:true,subtree:true,attributes:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
