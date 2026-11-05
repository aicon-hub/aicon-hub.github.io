/* AiCoN app update check (same-origin /version.json; no third-party calls). */
window.AiCoNUpdate = (function(){
  var CURRENT = '1.0.0';
  function cmp(a,b){ var x=String(a).split('.').map(Number), y=String(b).split('.').map(Number); for (var i=0;i<3;i++){ if ((x[i]||0)!==(y[i]||0)) return (x[i]||0)>(y[i]||0)?1:-1; } return 0; }
  return { CURRENT: CURRENT,
    check: function(){
      return fetch('/version.json', {cache:'no-store'}).then(function(r){ return r.json(); }).then(function(v){ v.newer = cmp(v.version, CURRENT) > 0; return v; });
    } };
})();
/* AiCoN app mode: tab bar, round search, back button, For-you picks (on-device only),
   persisted app prefs. Runs only in the installed app/PWA or ?preview-app=1. */
(function(){
  var STANDALONE = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || (navigator.standalone === true);
  var PREVIEW = /[?&]preview-app=1/.test(location.search);
  var NATIVE = window.AiCoNNative === true; /* set by the Android wrapper */
  if (!STANDALONE && !PREVIEW && !NATIVE) return;
  if (PREVIEW || NATIVE) document.body.classList.add('app-preview');
  var B = document.body;
  var path = location.pathname;
  var LS = { get: function(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
             set: function(k,v){ try { localStorage.setItem(k,v); } catch(e){} } };

  /* ---- persisted prefs ---- */
  if (LS.get('aicon-app-style') === 'm3') B.classList.add('app-style-m3');
  if (LS.get('aicon-app-pblur') === '1') B.classList.add('app-pblur');
  if (LS.get('aicon-app-rblur') === '1') B.classList.add('app-rblur');
  if (LS.get('aicon-app-ranim') === '1') B.classList.add('app-ranim');
  var veil = document.createElement('div'); veil.id = 'app-pblur-veil'; B.appendChild(veil);

  /* update banner */
  AiCoNUpdate.check().then(function(v){
    if (!v.newer) return;
    if (LS.get('aicon-app-update-dismissed') === v.version) return;
    var u = document.createElement('div');
    u.id = 'app-updatebar';
    var txt = document.createElement('div'); txt.className = 'ub-txt';
    var b = document.createElement('b'); b.textContent = 'AiCoN ' + v.version + ' is here';
    var sm = document.createElement('small'); sm.textContent = 'Tap Download to update the app';
    txt.appendChild(b); txt.appendChild(sm);
    var a = document.createElement('a'); a.className = 'ub-btn'; a.href = v.apk; a.textContent = 'Download';
    a.addEventListener('click', function(e){
      if (window.AiCoNNativeBridge && window.AiCoNNativeBridge.downloadUpdate) {
        e.preventDefault();
        window.AiCoNNativeBridge.downloadUpdate(v.apk);
      }
    });
    var x = document.createElement('button'); x.className = 'ub-x'; x.setAttribute('aria-label','Dismiss'); x.textContent = '\u00d7';
    x.addEventListener('click', function(){ LS.set('aicon-app-update-dismissed', v.version); u.remove(); });
    u.appendChild(txt); u.appendChild(a); u.appendChild(x);
    B.appendChild(u);
  }).catch(function(){});

  /* ---- category vocabulary + read tracking (on-device only) ---- */
  var VOCAB = [
    ['ai', /\b(ai|chatgpt|gemini|claude|copilot|perplexity|midjourney|openai|llm|prompt|image generator)\b/i],
    ['apps', /\b(app|apps|android|apk|whatsapp|telegram|instagram|spotify|youtube)\b/i],
    ['scholarships', /\b(scholarship|fellowship|stipend|funded|admission|admissions|phd|university|college|iit|iim)\b/i],
    ['government', /\b(kerala|scheme|subsidy|pension|gov|government|seva|certificate|licen[cs]e|voter|aadhaar|pan card|ration)\b/i],
    ['jobs', /\b(jobs?|recruitment|vacanc|rrb|ssc|upsc|ntpc|apply (by|online|till))\b/i],
    ['pc-tools', /\b(windows|pc|mac|software|converter|excel|word|photoshop|gimp|editor)\b/i],
    ['linux', /\b(linux|ubuntu|debian|fedora|arch|distro|mint)\b/i],
    ['safety', /\b(scam|privacy|safe|safety|fraud|phish|password|security|hack)\b/i],
    ['offers', /\b(free|deal|offer|giveaway|discount)\b/i],
    ['events', /\b(fest|hackathon|contest|event|workshop|meetup)\b/i],
    ['learning', /\b(course|learn|tutorial|certification|class)\b/i]
  ];
  function catsFor(text){
    var out = [];
    for (var i=0;i<VOCAB.length;i++) if (VOCAB[i][1].test(text)) out.push(VOCAB[i][0]);
    return out;
  }
  var SLUG = path.replace(/^\/posts\//,'').replace(/\.html$/,'');
  if (/^\/posts\/[^/]+\.html$/.test(path) && SLUG !== 'index' && SLUG.indexOf('about') !== 0) {
    var reads = [];
    try { reads = JSON.parse(LS.get('aicon-app-reads') || '[]'); } catch(e){}
    reads = reads.filter(function(r){ return r && r.s !== SLUG; });
    reads.push({ s: SLUG, t: Date.now(), c: catsFor(document.title) });
    if (reads.length > 120) reads = reads.slice(-120);
    LS.set('aicon-app-reads', JSON.stringify(reads));
  }

  /* ---- tab bar ---- */
  var bar = document.createElement('nav');
  bar.id = 'app-tabbar';
  bar.setAttribute('aria-label','App');
  bar.innerHTML =
    '<a href="/" data-k="home"><svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/></svg><span>Home</span></a>' +
    '<a href="/posts/" data-k="guides"><svg viewBox="0 0 24 24"><path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg><span>Guides</span></a>' +
    '<a href="/#closing" data-k="deadlines"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg><span>Deadlines</span></a>' +
    '<a href="/settings/" data-k="settings"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9A7 7 0 0 0 14.6 5L14.3 2.5h-4L9.9 5a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5a7 7 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2 1.2l.3 2.6h4l.3-2.6a7 7 0 0 0 2-1.2l2.3.9 2-3.4-2-1.5c.06-.4.1-.8.1-1.2z"/></svg><span>Settings</span></a>';
  B.appendChild(bar);
  var key = path === '/' || path === '/index.html' ? 'home'
    : path.indexOf('/settings') === 0 ? 'settings'
    : path.indexOf('/posts/') === 0 ? 'guides' : '';
  if (key) { var act = bar.querySelector('[data-k="'+key+'"]'); if (act) act.classList.add('active'); }

  var sb = document.createElement('a');
  sb.id = 'app-searchbtn';
  sb.href = '/posts/';
  sb.setAttribute('aria-label','Search guides');
  sb.innerHTML = '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.8-3.8"/></svg>';
  B.appendChild(sb);

  /* ---- back button on sub pages ---- */
  var home = path === '/' || path === '/index.html';
  if (!home) {
    B.classList.add('app-sub');
    var bb = document.createElement('a');
    bb.id = 'app-backbtn';
    bb.href = '/';
    bb.setAttribute('aria-label','Back');
    bb.innerHTML = '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>';
    bb.addEventListener('click', function(e){ if (history.length > 1) { e.preventDefault(); history.back(); } });
    B.appendChild(bb);
  }

  /* ---- For you (home only): on-device picks ---- */
  if (!home) return;
  var reads2 = [];
  try { reads2 = JSON.parse(LS.get('aicon-app-reads') || '[]'); } catch(e){}
  var aff = {};
  reads2.forEach(function(r){ (r.c||[]).forEach(function(c){ aff[c] = (aff[c]||0) + 1; }); });

  function buildFromCards(cards){
    if (!cards.length) return;
    var scored = cards.map(function(c, i){
      var s = 0;
      (c.cats||[]).forEach(function(ct){ s += (aff[ct]||0) * 3; });
      s += Math.max(0, 1 - i/200); /* freshness */
      return { c: c, s: s };
    }).sort(function(a,b){ return b.s - a.s; });
    var top = scored.slice(0,6).map(function(x){ return x.c; });

    /* minibar: the top pick */
    var mb = document.createElement('a');
    mb.id = 'app-minibar'; mb.className = 'has';
    mb.href = top[0].href;
    mb.innerHTML = (top[0].img ? '<img src="'+top[0].img+'" alt="" loading="lazy"/>' : '') +
      '<span class="mb-txt"><span class="mb-k">For you</span><span class="mb-t"></span></span>' +
      '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>';
    mb.querySelector('.mb-t').textContent = top[0].title;
    B.appendChild(mb);

    /* rail section after hero */
    var hero = document.querySelector('.hero-section');
    var sec = document.createElement('section');
    sec.id = 'app-foryou'; sec.className = 'has';
    var label = reads2.length ? 'From your reading' : 'Fresh picks';
    sec.innerHTML = '<div class="shell"><div class="fy-head"><h2>For you</h2><small>'+label+'</small></div><div class="fy-rail"></div>' +
      '<p class="fy-note">Picked on your device from what you open in the app. Your reading never leaves your phone.</p></div>';
    var rail = sec.querySelector('.fy-rail');
    top.forEach(function(c){
      var a = document.createElement('a');
      a.className = 'fy-card'; a.href = c.href;
      a.innerHTML = (c.img ? '<img src="'+c.img+'" alt="" loading="lazy"/>' : '') + '<b></b>';
      a.querySelector('b').textContent = c.title;
      rail.appendChild(a);
    });
    if (hero && hero.parentNode) hero.parentNode.insertBefore(sec, hero.nextSibling);
  }

  function parseCards(doc){
    return Array.prototype.slice.call(doc.querySelectorAll('.guide-card')).map(function(el){
      var a = el.querySelector('h3 a') || el.querySelector('a');
      var img = el.querySelector('img');
      return { href: a ? a.getAttribute('href') : '#', title: a ? a.textContent.trim() : '',
               img: img ? img.getAttribute('src') : '',
               cats: (el.getAttribute('data-categories') || '').split(/\s+/) };
    }).filter(function(c){ return c.title && c.href !== '#'; });
  }

  /* try the library page (cached 1h), fall back to home's latest cards */
  var cache = null;
  try { cache = JSON.parse(LS.get('aicon-app-lib') || 'null'); } catch(e){}
  if (cache && cache.html && (Date.now() - cache.ts) < 3600000) {
    var d = new DOMParser().parseFromString(cache.html, 'text/html');
    buildFromCards(parseCards(d));
  } else {
    fetch('/posts/index.html').then(function(r){ return r.text(); }).then(function(html){
      LS.set('aicon-app-lib', JSON.stringify({ ts: Date.now(), html: html }));
      var d = new DOMParser().parseFromString(html, 'text/html');
      buildFromCards(parseCards(d));
    }).catch(function(){ buildFromCards(parseCards(document)); });
  }
})();
