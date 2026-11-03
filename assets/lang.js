/* AiCoN language toggle (English / Malayalam). First-party, no third-party calls, no tracking.
   1) If the page declares <link rel="alternate" hreflang="ml|en">, the button opens that static page.
   2) Otherwise, if this browser has a built-in on-device translator, translate the article locally.
   3) Otherwise say plainly that no Malayalam version exists yet. */
(function(){
  var art=document.querySelector('article.post'); if(!art) return;
  var cur=(document.documentElement.lang||'en').slice(0,2)==='ml'?'ml':'en';
  var alt={}; document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(function(l){alt[l.hreflang.slice(0,2)]=l.href;});
  var bar=document.createElement('div'); bar.className='lang-bar'; bar.setAttribute('role','group'); bar.setAttribute('aria-label','Language');
  bar.innerHTML='<span class="lb-label">Read in:</span><button type="button" data-l="en" lang="en">English</button><button type="button" data-l="ml" lang="ml">മലയാളം</button><p class="lang-note" aria-live="polite"></p>';
  var note=bar.querySelector('.lang-note');
  function mark(l){bar.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.l===l?'true':'false');});}
  mark(cur);
  if(cur==='ml') note.textContent='ഈ പേജ് ഒരു പരിഭാഷയാണ്. തീയതി, ഫീസ് എന്നിവയ്ക്ക് ഇംഗ്ലീഷ് പേജും ഔദ്യോഗിക വെബ്സൈറ്റുമാണ് അവസാന ആശ്രയം.';
  var crumbs=document.querySelector('.crumbs'); (crumbs?crumbs.parentNode:art.parentNode).insertBefore(bar,crumbs||art);
  async function localTranslate(){
    var T=window.Translator||(window.translation&&window.translation.createTranslator);
    if(!window.Translator) throw new Error('no api');
    var av=await window.Translator.availability({sourceLanguage:'en',targetLanguage:'ml'});
    if(av==='unavailable') throw new Error('unsupported');
    var tr=await window.Translator.create({sourceLanguage:'en',targetLanguage:'ml'});
    var w=document.createTreeWalker(art,NodeFilter.SHOW_TEXT),n,list=[];
    while((n=w.nextNode())){ if(n.nodeValue.trim().length>1 && !/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName)) list.push(n); }
    for(var i=0;i<list.length;i++){ list[i].__en=list[i].nodeValue; list[i].nodeValue=await tr.translate(list[i].nodeValue); }
    art.__tr=list; art.setAttribute('lang','ml');
    note.textContent='മെഷീൻ പരിഭാഷ (നിങ്ങളുടെ ബ്രൗസറിൽ മാത്രം). തീയതി, ഫീസ് എന്നിവയ്ക്ക് ഇംഗ്ലീഷ് പേജും ഔദ്യോഗിക വെബ്സൈറ്റുമാണ് അവസാന ആശ്രയം.';
  }
  bar.addEventListener('click',async function(e){
    var b=e.target.closest('button'); if(!b) return; var l=b.dataset.l;
    try{localStorage.setItem('aicon-lang',l);}catch(_){}
    if(l===cur && !art.__tr){mark(l);return;}
    if(alt[l]){location.href=alt[l];return;}
    if(l==='en' && art.__tr){art.__tr.forEach(function(n){n.nodeValue=n.__en;});art.__tr=null;art.removeAttribute('lang');mark('en');note.textContent='';return;}
    if(l==='ml'){
      note.textContent='Translating on your device...';
      try{await localTranslate();mark('ml');}
      catch(_){mark(cur);note.textContent='A reviewed Malayalam version of this guide is not ready yet. English is the original.';}
    }
  });
})();
