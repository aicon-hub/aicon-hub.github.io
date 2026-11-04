/* AiCoN site-wide language toggle (English / Malayalam). First-party. No third-party calls, no tracking, no cookies.
   Layers: (1) site UI strings are fixed, hand-written Malayalam; (2) a post with a reviewed Malayalam page opens that page;
   (3) otherwise the reader can translate the article ON THEIR OWN DEVICE (browser Translator API) with dates, amounts and
   numbers locked: any text block whose numbers changed is left in English. English pages stay canonical. */
(function(){
  var KEY='aicon-lang', root=document.documentElement;
  var UI={'Posts':'പോസ്റ്റുകൾ','Contact':'ബന്ധപ്പെടുക','About AiCoN':'AiCoN-നെ കുറിച്ച്','About':'കുറിച്ച്','Explore':'പര്യവേക്ഷണം','Latest guides':'പുതിയ ഗൈഡുകൾ','How we check':'ഞങ്ങൾ എങ്ങനെ പരിശോധിക്കുന്നു','Home':'ഹോം','More posts':'കൂടുതൽ പോസ്റ്റുകൾ','Share this post':'ഈ പോസ്റ്റ് പങ്കിടുക','WhatsApp':'വാട്ട്സ്ആപ്പ്','Telegram':'ടെലിഗ്രാം','Blog':'ബ്ലോഗ്','Dark mode':'ഡാർക്ക് മോഡ്','Light mode':'ലൈറ്റ് മോഡ്','Top':'മുകളിലേക്ക്',
   '© 2026 AiCoN | Your Trusted Tech Companion':'© 2026 AiCoN | നിങ്ങളുടെ വിശ്വസ്ത ടെക് കൂട്ടുകാരൻ','Every guide shows what we checked.':'ഓരോ ഗൈഡും ഞങ്ങൾ എന്താണ് പരിശോധിച്ചതെന്ന് കാണിക്കുന്നു.'};
  var MSG={
   ui:'സൈറ്റ് മെനു മലയാളത്തിലാണ്. ലേഖനങ്ങൾക്ക് അംഗീകൃത മലയാളം പതിപ്പുള്ളപ്പോൾ അത് കാണിക്കും. തീയതി, ഫീസ്, തുക എന്നിവയ്ക്ക് ഇംഗ്ലീഷ് പേജും ഔദ്യോഗിക വെബ്സൈറ്റുമാണ് അവസാന ആശ്രയം.',
   btn:'ഈ ലേഖനം മലയാളത്തിലാക്കുക (മെഷീൻ പരിഭാഷ)',
   busy:'നിങ്ങളുടെ ഉപകരണത്തിൽ പരിഭാഷപ്പെടുത്തുന്നു...',
   done:'മെഷീൻ പരിഭാഷ (നിങ്ങളുടെ ബ്രൗസറിൽ മാത്രം). തീയതി, ഫീസ്, തുക എന്നിവ ഇംഗ്ലീഷിൽ നിന്ന് മാറിയ ഭാഗങ്ങൾ ഇംഗ്ലീഷിൽ തന്നെ നിലനിർത്തിയിട്ടുണ്ട്. ഇംഗ്ലീഷ് പേജ് പരിശോധിക്കുക.',
   none:'ഈ ബ്രൗസറിൽ ഓൺ-ഡിവൈസ് പരിഭാഷ ലഭ്യമല്ല, ഈ ലേഖനത്തിന് അംഗീകൃത മലയാളം പതിപ്പും ഇതുവരെ ഇല്ല. ഇംഗ്ലീഷ് ആണ് ഒറിജിനൽ.',
   rev:'ഇത് അവലോകനം ചെയ്ത മലയാളം പതിപ്പാണ്. തീയതി, ഫീസ് എന്നിവയ്ക്ക് ഇംഗ്ലീഷ് പേജും ഔദ്യോഗിക വെബ്സൈറ്റുമാണ് അവസാന ആശ്രയം.'};
  var pageLang=(root.lang||'en').slice(0,2)==='ml'?'ml':'en';
  var alt={};document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(function(l){alt[l.hreflang.slice(0,2)]=l.href;});
  var pref='en';try{pref=localStorage.getItem(KEY)||'en';}catch(_){}
  var uiNodes=[];
  function collectUI(){
    var sel='header a, header button, footer, footer a, .crumbs a, .share a, #top';
    document.querySelectorAll(sel).forEach(function(el){
      var w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),n;
      while((n=w.nextNode())){var t=n.nodeValue.trim();if(UI[t]&&!n.__en){uiNodes.push(n);}else if(t.indexOf('© 2026 AiCoN')===0&&n.parentNode.nodeName!=='SCRIPT'){}}
    });
    var f=document.querySelector('footer .wrap');
    if(f)f.childNodes.forEach(function(n){if(n.nodeType===3){var t=n.nodeValue.trim();if(UI[t])uiNodes.push(n);}});
  }
  function setUI(l){
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
  var _t=bar;new MutationObserver(function(){_t.hidden=!note.textContent&&go.hidden;}).observe(bar,{childList:true,subtree:true,attributes:true});
})();
