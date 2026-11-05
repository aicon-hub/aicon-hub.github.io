/* AiCoN site-wide language toggle (English / Malayalam). First-party. No third-party calls, no tracking, no cookies.
   Layers: (1) site UI strings are fixed, hand-written Malayalam; (2) a post with a reviewed Malayalam page opens that page;
   (3) otherwise the reader can translate the article ON THEIR OWN DEVICE (browser Translator API) with dates, amounts and
   numbers locked: any text block whose numbers changed is left in English. English pages stay canonical. */
(function(){
  if(window.__aiconLang)return; window.__aiconLang=true;
  function boot(){
  var KEY='aicon-lang', root=document.documentElement;
  var UI={'Posts':'പോസ്റ്റുകൾ','Contact':'ബന്ധപ്പെടാം','About AiCoN':'AiCoN-നെ കുറിച്ച്','About':'കുറിച്ച്','Explore':'കാണാം','Latest guides':'പുതിയ ഗൈഡുകൾ','How we check':'ഞങ്ങൾ എങ്ങനെ ചെക്ക് ചെയ്യുന്നു','Home':'ഹോം','More posts':'കൂടുതൽ പോസ്റ്റുകൾ','Share this post':'ഈ പോസ്റ്റ് ഷെയർ ചെയ്യൂ','WhatsApp':'വാട്സ്ആപ്പ്','Telegram':'ടെലിഗ്രാം','Blog':'ബ്ലോഗ്','Dark mode':'ഡാർക്ക് മോഡ്','Light mode':'ലൈറ്റ് മോഡ്','Top':'മുകളിലേക്ക്','© 2026 AiCoN | Your Trusted Tech Companion':'© 2026 AiCoN | നിങ്ങളുടെ വിശ്വസ്ത ടെക് കൂട്ടുകാരൻ','Every guide shows what we checked.':'ഓരോ ഗൈഡിലും ഞങ്ങൾ എന്തൊക്കെ ചെക്ക് ചെയ്തു എന്ന് കാണിക്കുന്നു.','Join WhatsApp':'വാട്സ്ആപ്പിൽ ചേരൂ','YOUR TRUSTED TECH COMPANION':'നിങ്ങളുടെ വിശ്വസ്ത ടെക് കൂട്ടുകാരൻ','Useful tech. Clear answers':'ഉപകാരപ്രദമായ ടെക്ക് വ്യക്തമായ ഉത്തരങ്ങൾ','Find a guide':'ഒരു ഗൈഡ് കണ്ടെത്തൂ','Search':'സെർച്ച്','Join the WhatsApp channel':'വാട്സ്ആപ്പ് ചാനലിൽ ചേരൂ','Browse the latest guides':'പുതിയ ഗൈഡുകൾ കാണാം','Also on':'ഇവിടെയും:','Dates from our guides':'ഗൈഡുകളിലെ പ്രധാന തീയതികൾ','Check the official notice before applying':'അപേക്ഷിക്കുന്നതിന് മുൻപ് ഔദ്യോഗിക നോട്ടിഫിക്കേഷൻ ഒന്നുകൂടി നോക്കുക','See all scholarship guides →':'എല്ലാ സ്കോളർഷിപ്പ് ഗൈഡുകളും →','How AiCoN checks a guide':'AiCoN ഒരു ഗൈഡ് എങ്ങനെ ചെക്ക് ചെയ്യുന്നു','Each guide lists the checks completed. When something could not be confirmed, the guide says so.':'ഓരോ ഗൈഡിലും ചെയ്ത ചെക്കുകൾ പറയും. എന്തെങ്കിലും ഉറപ്പിക്കാൻ പറ്റിയില്ലെങ്കിൽ അതും തുറന്നു പറയും.','Source checked':'സോഴ്സ് ചെക്ക് ചെയ്തു','We read the official page or notice itself, not only a summary.':'സംഗ്രഹം മാത്രമല്ല, ഔദ്യോഗിക പേജോ നോട്ടിഫിക്കേഷനോ തന്നെ ഞങ്ങൾ വായിക്കും.','Link tested':'ലിങ്ക് ടെസ്റ്റ് ചെയ്തു','We check that the source link reaches the intended page.':'സോഴ്സ് ലിങ്ക് ശരിയായ പേജിലേക്ക് തന്നെയാണോ പോകുന്നത് എന്ന് നോക്കും.','Costs and limits':'ചെലവും പരിധികളും','Prices, caps and trial terms include the date checked.':'വില, പരിധി, ട്രയൽ നിബന്ധനകൾ എന്നിവയ്ക്കൊപ്പം ചെക്ക് ചെയ്ത തീയതിയും ഉണ്ടാകും.','India availability':'ഇന്ത്യയിൽ ലഭ്യമാണോ','India and Kerala availability are checked where relevant.':'ആവശ്യമുള്ളിടത്ത് ഇന്ത്യയിലും കേരളത്തിലും ലഭ്യമാണോ എന്ന് നോക്കും.','Privacy and safety':'പ്രൈവസിയും സുരക്ഷയും','Guides explain data access and what could go wrong.':'ഏതൊക്കെ ഡാറ്റ ആക്സസ് ചെയ്യും, എന്തൊക്കെ പ്രശ്നം വരാം എന്ന് ഗൈഡിൽ വിശദീകരിക്കും.','Limits disclosed':'പരിമിതികൾ തുറന്നു പറയും','Anything not confirmed is stated plainly in the guide.':'ഉറപ്പിക്കാത്ത കാര്യങ്ങൾ ഗൈഡിൽ വ്യക്തമായി പറയും.','Read the verification approach →':'ചെക്ക് ചെയ്യുന്ന രീതി വായിക്കാം →','What we cover':'എന്തൊക്കെ ഉൾപ്പെടുന്നു','Compare systems. Open details when you need them.':'സിസ്റ്റങ്ങൾ താരതമ്യം ചെയ്യാം. വേണ്ട വിവരങ്ങൾ തുറന്നു നോക്കാം.','PC tools &amp; software':'PC ടൂളുകളും സോഫ്റ്റ്‌വെയറും','PC tools & software':'PC ടൂളുകളും സോഫ്റ്റ്‌വെയറും','Useful software for your computer':'കമ്പ്യൂട്ടറിന് ഉപകാരപ്പെടുന്ന സോഫ്റ്റ്‌വെയർ','AI tools':'AI ടൂളുകൾ','New tools, checked before they reach you':'പുതിയ ടൂളുകൾ, നിങ്ങളിലെത്തും മുൻപ് ചെക്ക് ചെയ്തത്','Apps':'ആപ്പുകൾ','Android apps we try first':'ഞങ്ങൾ ആദ്യം പരീക്ഷിക്കുന്ന ആൻഡ്രോയിഡ് ആപ്പുകൾ','Digital safety':'ഡിജിറ്റൽ സേഫ്റ്റി','Scams, privacy and safe habits':'തട്ടിപ്പുകൾ, പ്രൈവസി, സുരക്ഷിതമായ ശീലങ്ങൾ','Scholarships':'സ്കോളർഷിപ്പുകൾ','Deadlines and eligibility':'അവസാന തീയതികളും യോഗ്യതയും','Fully Funded Abroad':'വിദേശത്ത് ഫുള്ളി ഫണ്ടഡ്','Government services & schemes':'സർക്കാർ സേവനങ്ങളും പദ്ധതികളും','Government services &amp; schemes':'സർക്കാർ സേവനങ്ങളും പദ്ധതികളും','OS Explorer':'OS എക്സ്പ്ലോറർ','Plain-language guides for AI tools, apps, scholarships and government services in India and Kerala. Each guide explains what was checked and what could not be confirmed.':'AI ടൂളുകൾ, ആപ്പുകൾ, സ്കോളർഷിപ്പുകൾ, ഇന്ത്യയിലെയും കേരളത്തിലെയും സർക്കാർ സേവനങ്ങൾ എന്നിവയ്ക്കുള്ള ലളിതമായ ഗൈഡുകൾ. എന്തൊക്കെ ചെക്ക് ചെയ്തു, എന്തൊക്കെ ഉറപ്പിക്കാൻ പറ്റിയില്ല എന്നും ഓരോ ഗൈഡിലും പറയും.'};
  var EXTRA={
   'Guides':'ഗൈഡുകൾ','Topics':'വിഷയങ്ങൾ','Deadlines':'അവസാന തീയതികൾ','Find a guide':'ഗൈഡ് തിരയൂ',
   'Your trusted tech companion':'നിങ്ങളുടെ ടെക് കൂട്ടുകാരൻ',
   'Tech, AI and government help,':'ടെക്, AI, സർക്കാർ സഹായം,','checked before you click':'ക്ലിക്ക് ചെയ്യും മുൻപ് ചെക്ക് ചെയ്തത്.',
   'Plain-language guides for AI tools, apps, scholarships and government services in India and Kerala. Every guide lists what was checked and what could not be confirmed.':'AI ടൂളുകൾ, ആപ്പുകൾ, സ്കോളർഷിപ്പുകൾ, സർക്കാർ സേവനങ്ങൾ - എല്ലാം ലളിതമായ ഭാഷയിൽ. എന്ത് ചെക്ക് ചെയ്തു, എന്ത് ഉറപ്പാക്കാൻ കഴിഞ്ഞില്ല എന്ന് ഓരോ ഗൈഡിലും എഴുതിയിട്ടുണ്ട്.',
   'Act now':'ഇപ്പോൾ അപേക്ഷിക്കൂ','Closing soon':'ലാസ്റ്റ് ഡേറ്റ് അടുത്തു',
   'Deadlines from our guides, counted down live. Always check the official notice before applying.':'ഗൈഡുകളിലെ ലാസ്റ്റ് ഡേറ്റുകൾ, ലൈവ് കൗണ്ട്ഡൗൺ. അപേക്ഷിക്കും മുൻപ് ഔദ്യോഗിക നോട്ടീസ് ഒന്ന് നോക്കുക.',
   'All scholarship guides':'എല്ലാ സ്കോളർഷിപ്പ് ഗൈഡുകളും',
   'Explore':'കാണാം','Latest guides':'പുതിയ ഗൈഡുകൾ','Events':'ഇവന്റുകൾ',
   'Events and hackathons':'ഇവന്റുകളും ഹാക്കത്തോണുകളും','Browse event guides':'ഇവന്റ് ഗൈഡുകൾ കാണാം',
   'View all':'എല്ലാം കാണാം','guides':'ഗൈഡുകൾ',
   'New to AiCoN?':'AiCoN പുതുമുഖമാണോ?','Our verification approach':'ഞങ്ങൾ എങ്ങനെ ചെക്ക് ചെയ്യുന്നു',
   'Read the verification approach →':'എങ്ങനെ ചെക്ക് ചെയ്യുന്നുവെന്ന് നോക്കൂ →',
   'Follow':'ഫോളോ ചെയ്യൂ','WhatsApp channel':'വാട്സ്ആപ്പ് ചാനൽ','Blog (older posts)':'ബ്ലോഗ് (പഴയ പോസ്റ്റുകൾ)',
   'All guides':'എല്ലാ ഗൈഡുകളും','Filter by topic':'വിഷയം തിരഞ്ഞെടുക്കൂ','Search guides':'ഗൈഡുകൾ തിരയൂ',
   'Newest first':'പുതിയത് ആദ്യം','No guides match.':'ഗൈഡ് ഒന്നും കിട്ടിയില്ല.',
   'On this page':'ഈ പേജിൽ','Sources':'ഉറവിടങ്ങൾ','Share this post':'ഈ പോസ്റ്റ് ഷെയർ ചെയ്യൂ',
   'The library':'ലൈബ്രറി','Every guide, in one place.':'എല്ലാ ഗൈഡുകളും, ഒരിടത്ത്.',
   'Search by tool, topic or scheme. Filter by category. Newest first.':'ടൂൾ, വിഷയം, സ്കീം - എന്തും തിരയൂ. വിഭാഗം തിരഞ്ഞെടുക്കൂ. പുതിയത് ആദ്യം.',
   'Search posts':'പോസ്റ്റ് തിരയൂ','All':'എല്ലാം','PC tools':'PC ടൂളുകൾ','Linux':'ലിനക്സ്',
   'Government':'സർക്കാർ','Offers':'ഓഫറുകൾ','Learning':'പഠനം','More':'കൂടുതൽ',
   'No posts match. Try another word, or check the':'പോസ്റ്റ് ഒന്നും കിട്ടിയില്ല. വേറെ വാക്ക് ശ്രമിക്കൂ, അല്ലെങ്കിൽ','older blog':'പഴയ ബ്ലോഗ് നോക്കൂ',
   'Read guide':'ഗൈഡ് വായിക്കൂ','Copy title, description & link':'തലക്കെട്ടും വിവരണവും ലിങ്കും കോപ്പി ചെയ്യൂ','Copy link':'ലിങ്ക് കോപ്പി ചെയ്യൂ','Email':'ഇമെയിൽ',
   'Your Trusted Tech Companion.':'നിങ്ങളുടെ ടെക് കൂട്ടുകാരൻ.','Every guide shows what we checked, and what we could not confirm.':'ഓരോ ഗൈഡിലും ഞങ്ങൾ എന്ത് ചെക്ക് ചെയ്തു, എന്ത് ഉറപ്പാക്കാൻ കഴിഞ്ഞില്ല എന്ന് എഴുതിയിട്ടുണ്ട്.',
   'Show avatar guide':'അവതാർ ഗൈഡ് കാണിക്കൂ',
   'verified guides':'ചെക്ക് ചെയ്ത ഗൈഡുകൾ','topics to explore':'വിഷയങ്ങൾ','Updated':'അപ്ഡേറ്റ്','daily':'ദിവസവും',
   'Linux Distro':'ലിനക്സ് ഡിസ്ട്രോ','Pick a distribution that fits you':'നിങ്ങൾക്ക് ചേരുന്ന ഡിസ്ട്രോ തിരഞ്ഞെടുക്കൂ',
   'Government services':'സർക്കാർ സേവനങ്ങൾ','Schemes and services from trusted authorities':'ഔദ്യോഗിക സ്കീമുകളും സേവനങ്ങളും',
   'Verified offers':'ചെക്ക് ചെയ്ത ഓഫറുകൾ','Free deals that are real':'ശരിക്കും ഫ്രീ ആയ ഓഫറുകൾ',
   'Events & Hackathons':'ഇവന്റുകളും ഹാക്കത്തോണുകളും','Contests, challenges and coding events':'മത്സരങ്ങളും ചലഞ്ചുകളും കോഡിംഗ് ഇവന്റുകളും',
   'Compare systems, open details on tap':'സിസ്റ്റങ്ങൾ താരതമ്യം ചെയ്യൂ; ടാപ്പ് ചെയ്താൽ വിശദാംശങ്ങൾ','Official embassy and government programmes':'ഔദ്യോഗിക എംബസിയും സർക്കാർ പരിപാടികളും',
   'Subscribe':'സബ്സ്ക്രൈബ്','Skip to content':'ഉള്ളടക്കത്തിലേക്ക് പോകൂ','Preview':'പ്രിവ്യൂ'};
  for(var ek in EXTRA){ if(!UI.hasOwnProperty(ek)) UI[ek]=EXTRA[ek]; }
  var MSG={
   ui:'മെനു ഇപ്പോൾ മലയാളത്തിലാണ്. ലേഖനത്തിന്റെ മലയാളം പതിപ്പ് ഉണ്ടെങ്കിൽ അത് തുറക്കും. തീയതി, ഫീസ്, തുക പോലുള്ള കാര്യങ്ങൾക്ക് ഇംഗ്ലീഷ് പേജും ഔദ്യോഗിക സൈറ്റുമാണ് അന്തിമം.',
   btn:'ഈ ലേഖനം മലയാളത്തിലാക്കൂ (മെഷീൻ ട്രാൻസ്ലേഷൻ)',
   busy:'നിങ്ങളുടെ ഫോണിൽ തന്നെ പരിഭാഷപ്പെടുത്തുന്നു...',
   done:'മെഷീൻ പരിഭാഷ (നിങ്ങളുടെ ബ്രൗസറിൽ മാത്രം). തീയതി, ഫീസ്, തുക പോലുള്ളവ ഇംഗ്ലീഷിൽ തന്നെ നിലനിർത്തിയിട്ടുണ്ട്. ഔദ്യോഗിക കണക്കിന് ഇംഗ്ലീഷ് പേജ് നോക്കുക.',
   none:'ഈ ബ്രൗസറിൽ പരിഭാഷ ഇല്ല; ഈ ലേഖനത്തിന്റെ അംഗീകൃത മലയാളം പതിപ്പും ഇതുവരെ ഇല്ല. ഒറിജിനൽ ഇംഗ്ലീഷ് തന്നെ കാണിക്കുന്നു.',
   rev:'ഇത് ഞങ്ങൾ റിവ്യൂ ചെയ്ത മലയാളം പതിപ്പാണ്. തീയതി, ഫീസ് പോലുള്ള കാര്യങ്ങൾക്ക് ഇംഗ്ലീഷ് പേജും ഔദ്യോഗിക സൈറ്റും നോക്കുക.'};
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
  var h1=document.querySelector('h1'),h1en=null,H1ML='ഉപകാരപ്രദമായ ടെക്ക് വ്യക്തമായ ഉത്തരങ്ങൾ';
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
  if(pageLang==='ml'){uiNodes.length&&setUI('ml');note.textContent=MSG.rev;root.setAttribute('data-ui-lang','ml');}
  else if(pref==='ml'){toMalayalam();}
  else bar.hidden=true;
  var _t=bar;new MutationObserver(function(){var h=!note.textContent&&go.hidden;if(_t.hidden!==h)_t.hidden=h;}).observe(bar,{childList:true,subtree:true,attributes:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
