/* AiCoN app update check (same-origin /version.json; no third-party calls). */
window.AiCoNUpdate = (function(){
  var FALLBACK = '1.0.0'; /* TWA v1.0.0 has no bridge; native app reports its own version */
  function current(){ try{ if (window.AiCoNNativeBridge && window.AiCoNNativeBridge.getVersion) { var v = String(window.AiCoNNativeBridge.getVersion()); if (v) return v; } }catch(e){} return FALLBACK; }
  function cmp(a,b){ var x=String(a).split('.').map(Number), y=String(b).split('.').map(Number); for (var i=0;i<3;i++){ if ((x[i]||0)!==(y[i]||0)) return (x[i]||0)>(y[i]||0)?1:-1; } return 0; }
  return { CURRENT: FALLBACK, current: current,
    check: function(){
      return fetch('/version.json', {cache:'no-store'}).then(function(r){ return r.json(); }).then(function(v){ v.newer = cmp(v.version, current()) > 0; return v; });
    } };
})();
/* AiCoN app mode: tab bar, round search, back button, For-you picks (on-device only),
   persisted app prefs. Runs only in the installed app/PWA or ?preview-app=1. */
(function(){
  function isApp(){
    return ((window.matchMedia && matchMedia('(display-mode: standalone)').matches) || (navigator.standalone === true)
      || /[?&]preview-app=1/.test(location.search) || window.AiCoNNative === true
      || !!(window.AiCoNNativeBridge && window.AiCoNNativeBridge.getVersion));
  }
  if (!isApp()) {
    /* the Android wrapper may inject its flag after DOMContentLoaded - retry once */
    var booted = false;
    document.addEventListener('aicon-native-ready', function(){
      if (booted) return; booted = true;
      var k = 'aicon-app-reloaded';
      try { if (sessionStorage.getItem(k)) return; sessionStorage.setItem(k,'1'); } catch(e){ return; }
      if (isApp()) { document.body.classList.add('app-preview'); location.reload(); }
    });
    return;
  }
  document.body.classList.add('app-preview');
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

  /* ---- native window insets -> CSS custom properties (informational: the native
     container already pads the WebView below the status bar, so layout CSS must NOT
     add these values again - exposed for diagnostics and future screens) ---- */
  (function(){
    try {
      if (window.AiCoNNativeBridge && window.AiCoNNativeBridge.getInsets) {
        var ins = JSON.parse(window.AiCoNNativeBridge.getInsets() || '{}');
        var st = document.documentElement.style;
        st.setProperty('--aicon-inset-top', (ins.top|0) + 'px');
        st.setProperty('--aicon-inset-right', (ins.right|0) + 'px');
        st.setProperty('--aicon-inset-bottom', (ins.bottom|0) + 'px');
        st.setProperty('--aicon-inset-left', (ins.left|0) + 'px');
      }
    } catch(e){}
  })();

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
    x.addEventListener('click', function(){ LS.set('aicon-app-update-dismissed', v.version); u.remove(); B.classList.remove('app-has-ub'); });
    u.appendChild(txt); u.appendChild(a); u.appendChild(x);
    B.appendChild(u);
    B.classList.add('app-has-ub');
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
    var cur = { s: SLUG, t: Date.now(), c: catsFor(document.title), d: 0, sc: 0 };
    reads.push(cur);
    if (reads.length > 120) reads = reads.slice(-120);
    var saveReads = function(){ LS.set('aicon-app-reads', JSON.stringify(reads)); };
    saveReads();
    /* dwell + scroll depth, on-device only */
    var t0 = Date.now(), maxSc = 0, rafPending = false;
    var onScroll = function(){
      if (rafPending) return; rafPending = true;
      requestAnimationFrame(function(){
        rafPending = false;
        var de = document.documentElement;
        var denom = (de.scrollHeight - window.innerHeight) || 1;
        var pctv = Math.min(100, Math.round(100 * (window.scrollY || de.scrollTop) / denom));
        if (pctv > maxSc) { maxSc = pctv; cur.sc = pctv; }
      });
    };
    var flushDwell = function(){
      cur.d = Math.min(180000, (cur.d || 0) + (Date.now() - t0)); t0 = Date.now();
      saveReads();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', function(){ if (document.visibilityState === 'hidden') flushDwell(); });
    window.addEventListener('pagehide', flushDwell);
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
  function setActiveTab(k){
    var links = bar.querySelectorAll('a');
    for (var i=0;i<links.length;i++) links[i].classList.toggle('active', links[i].getAttribute('data-k') === k);
  }
  function tabFromLocation(){
    var h = location.hash;
    if (h === '#closing' || h === '#deadlines') return 'deadlines';
    if (path === '/' || path === '/index.html') return 'home';
    if (path.indexOf('/settings') === 0) return 'settings';
    if (path.indexOf('/posts/') === 0) return 'guides';
    return '';
  }
  setActiveTab(tabFromLocation());
  window.addEventListener('hashchange', function(){ setActiveTab(tabFromLocation()); });

  var sb = document.createElement('a');
  sb.id = 'app-searchbtn';
  sb.href = '/posts/';
  sb.setAttribute('aria-label','Search guides');
  sb.innerHTML = '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.8-3.8"/></svg>';
  B.appendChild(sb);

  /* ---- haptics: native bridge in the app, navigator.vibrate in PWA. Default on. ---- */
  function hapticsOn(){ return LS.get('aicon-app-haptics') !== '0'; }
  function haptic(kind){
    if (!hapticsOn()) return;
    try {
      if (window.AiCoNNativeBridge && window.AiCoNNativeBridge.vibrate) { window.AiCoNNativeBridge.vibrate(kind || 'tick'); return; }
      if (navigator.vibrate) navigator.vibrate(8);
    } catch(e){}
  }
  document.addEventListener('pointerdown', function(e){
    if (e.button !== undefined && e.button > 0) return;
    var t = e.target && e.target.closest ? e.target.closest('#app-tabbar a, #app-searchbtn, #app-backbtn, .fy-card, .dl-card, .ad-card, .ad-back, .ad-ref, .fchip, .as-seg button, .as-switch') : null;
    if (t) haptic('tick');
  }, {passive: true});

  /* ---- Deadlines app view (IST day counts, same convention as the site) ---- */
  var adSheet = null;
  function istToday(){
    try { return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()); }
    catch(e){ return new Date().toISOString().slice(0,10); }
  }
  function adDays(date, today){ return Math.round((Date.parse(date+'T00:00:00Z') - Date.parse(today+'T00:00:00Z'))/86400000); }
  function adLeft(d){ return d === 0 ? 'Closes today' : d === 1 ? '1 day left' : d + ' days left'; }
  function adUrg(d){ return d <= 0 ? 'red' : d <= 3 ? 'amber' : d <= 7 ? 'soon' : 'ok'; }
  function adParse(doc){
    return Array.prototype.slice.call(doc.querySelectorAll('.dl-card')).map(function(el){
      var strong = el.querySelector('strong'), small = el.querySelector('.dl-info small');
      var day = el.querySelector('.dl-date b'), mon = el.querySelector('.dl-date small');
      return { href: el.getAttribute('href') || '#',
               title: strong ? strong.textContent.trim() : '',
               sub: small ? small.textContent.trim() : '',
               day: day ? day.textContent.trim() : '', mon: mon ? mon.textContent.trim() : '',
               date: el.getAttribute('data-date') || '' };
    }).filter(function(c){ return c.title && c.date; });
  }
  function adRender(cards){
    var list = adSheet.querySelector('.ad-list');
    list.innerHTML = '';
    var today = istToday();
    cards = cards.filter(function(c){ return adDays(c.date, today) >= 0; })
                 .sort(function(a,b){ return a.date < b.date ? -1 : 1; });
    if (!cards.length) { list.innerHTML = '<p class="ad-empty">No deadlines listed right now.</p>'; }
    cards.forEach(function(c){
      var d = adDays(c.date, today);
      var a = document.createElement('a');
      a.className = 'ad-card urg-' + adUrg(d);
      a.href = c.href;
      a.innerHTML = '<span class="ad-date"><b></b><small></small></span><span class="ad-info"><strong></strong><small></small></span><span class="ad-chip"></span>';
      a.querySelector('.ad-date b').textContent = c.day;
      a.querySelector('.ad-date small').textContent = c.mon;
      a.querySelector('.ad-info strong').textContent = c.title;
      a.querySelector('.ad-info small').textContent = c.sub;
      a.querySelector('.ad-chip').textContent = adLeft(d);
      list.appendChild(a);
    });
    adSheet.querySelector('.ad-count').textContent = cards.length ? cards.length + ' closing soon' : 'All caught up';
  }
  function adFill(){
    if (document.querySelector('.dl-card')) { adRender(adParse(document)); return; }
    fetch('/', {cache:'no-store'}).then(function(r){ return r.text(); }).then(function(html){
      adRender(adParse(new DOMParser().parseFromString(html, 'text/html')));
    }).catch(function(){ adRender([]); });
  }
  function openDeadlines(){
    haptic('tick');
    if (!adSheet) {
      adSheet = document.createElement('div');
      adSheet.id = 'app-deadlines';
      adSheet.innerHTML = '<div class="ad-head"><button type="button" class="ad-back" aria-label="Back"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><div class="ad-title"><h1>Deadlines</h1><small class="ad-count"></small></div><button type="button" class="ad-ref" aria-label="Refresh"><svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v5h-5"/></svg></button></div><div class="ad-list"></div>';
      adSheet.querySelector('.ad-back').addEventListener('click', function(){ closeDeadlines(); });
      adSheet.querySelector('.ad-ref').addEventListener('click', function(){ haptic('tick'); adFill(); });
      document.body.appendChild(adSheet);
    }
    adFill();
    adSheet.classList.add('open');
    document.body.classList.add('ad-open');
    if (location.hash !== '#deadlines') { try { history.pushState(null, '', '#deadlines'); } catch(e){} }
    setActiveTab('deadlines');
  }
  function closeDeadlines(){
    if (!adSheet || !adSheet.classList.contains('open')) return;
    adSheet.classList.remove('open');
    document.body.classList.remove('ad-open');
    if (location.hash === '#deadlines') { try { history.pushState(null, '', location.pathname); } catch(e){} }
    setActiveTab(tabFromLocation());
  }
  var dlTab = bar.querySelector('[data-k="deadlines"]');
  if (dlTab) dlTab.addEventListener('click', function(e){
    e.preventDefault();
    if (adSheet && adSheet.classList.contains('open')) closeDeadlines(); else openDeadlines();
  });
  window.addEventListener('popstate', function(){
    if (location.hash !== '#deadlines' && adSheet && adSheet.classList.contains('open')) closeDeadlines();
    setActiveTab(tabFromLocation());
  });
  if (location.hash === '#closing' || location.hash === '#deadlines') openDeadlines();

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
  var readSlugs = {};
  reads2.forEach(function(r){ if (r && r.s) readSlugs[r.s] = r.t || 0; });
  var hasReads = reads2.length > 0;
  var DAY = 86400000;

  function slugOf(href){
    var m = /(?:^|\/)posts\/([^/]+)\.html$/.exec(href || '');
    return m ? m[1] : '';
  }

  /* RANK-BEGIN */
  /* On-device For-you ranking. Pure function (also unit-tested off-device).
     Signals: repeat opens, recency (10-day half-life decay), dwell time (up to 4x
     for a 3-minute read), deadline urgency, freshness. Category-diversified top
     picks plus two day-rotating exploration slots so the rail never goes stale.
     Already-read guides are never shown. Cold start: urgent + fresh mix. */
  function rankPicks(cards, reads, now){
    var DAY = 864e5, HALF = 10, TAKE = 8, EXPL = 2;
    function slugOfH(href){ var m = /(?:^|\/)posts\/([^/]+)\.html$/.exec(href || ''); return m ? m[1] : ''; }
    var readSlugs = {};
    reads.forEach(function(r){ if (r && r.s) readSlugs[r.s] = 1; });
    var cardCats = {};
    cards.forEach(function(c){ var s2 = slugOfH(c.href); if (s2 && (c.cats||[]).length) cardCats[s2] = c.cats; });
    var aff = {};
    reads.forEach(function(r){
      if (!r || !r.s) return;
      var age = Math.max(0, (now - (r.t || now)) / DAY);
      var w = Math.pow(0.5, age / HALF);
      w *= 1 + Math.min(r.d || 0, 180000) / 60000;
      (cardCats[r.s] || r.c || []).forEach(function(c){ aff[c] = (aff[c] || 0) + w; });
    });
    var hasAff = false; for (var k in aff) { hasAff = true; break; }
    function urgency(c){
      if (!c.dl) return 0;
      var days = (c.dl - now) / DAY;
      if (days < -0.5) return 0;
      if (days <= 2) return 2.0;
      if (days <= 5) return 1.0;
      if (days <= 10) return 0.4;
      return 0;
    }
    function fresh(c){
      if (!c.date) return 0;
      var age = (now - c.date) / DAY;
      if (age <= 3) return 0.8;
      if (age <= 7) return 0.4;
      return 0;
    }
    function score(c){
      var a = 0;
      (c.cats||[]).forEach(function(ct){ a += (aff[ct] || 0); });
      return 3 * a + urgency(c) + fresh(c);
    }
    var pool = cards.filter(function(c){ return !readSlugs[slugOfH(c.href)]; });
    if (hasAff) {
      var strong = pool.filter(function(c){ return score(c) > 0; });
      if (strong.length) pool = strong;
    }
    var scored = pool.map(function(c, i){ return { c: c, s: score(c), i: i }; })
                     .sort(function(a, b){ return b.s - a.s || a.i - b.i; });
    /* greedy diversified take: max 2 per category */
    var perCat = {}, main = [], rest = [];
    scored.forEach(function(x){
      var cats = x.c.cats || ['?'];
      var blocked = cats.every(function(ct){ return (perCat[ct] || 0) >= 2; });
      if (!blocked && main.length < TAKE - EXPL) {
        main.push(x);
        cats.forEach(function(ct){ perCat[ct] = (perCat[ct] || 0) + 1; });
      } else rest.push(x);
    });
    /* day-seeded exploration: rotates daily, stable within a day */
    var seedStr = new Date(now).toISOString().slice(0, 10) + ':' + reads.length;
    var seed = 0; for (var si = 0; si < seedStr.length; si++) seed = (seed * 31 + seedStr.charCodeAt(si)) >>> 0;
    function rnd(){ seed = (seed + 0x6D2B79F5) >>> 0; var t = seed; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
    var expl = rest.map(function(x){ return { x: x, k: Math.pow(rnd(), 1.5) * (0.3 + x.s) }; })
                   .sort(function(a, b){ return b.k - a.k; }).slice(0, EXPL).map(function(e){ return e.x; });
    return main.concat(expl).map(function(x){ return x.c; });
  }
  /* RANK-END */

  function buildFromCards(cards){
    if (!cards.length) return;
    var top = rankPicks(cards, reads2, Date.now());
    if (!top.length) return;

    /* minibar: the top pick */
    var mb = document.createElement('a');
    mb.id = 'app-minibar'; mb.className = 'has';
    mb.href = top[0].href;
    mb.innerHTML = (top[0].img ? '<img src="'+top[0].img+'" alt="" loading="lazy" onerror="this.remove()"/>' : '') +
      '<span class="mb-txt"><span class="mb-k">For you</span><span class="mb-t"></span></span>' +
      '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>';
    mb.querySelector('.mb-t').textContent = top[0].title;
    B.appendChild(mb);
    B.classList.add('app-has-mb');

    /* rail section after hero */
    var hero = document.querySelector('.hero-section');
    var sec = document.createElement('section');
    sec.id = 'app-foryou'; sec.className = 'has';
    var label = reads2.length ? 'From your reading' : 'Fresh picks';
    sec.innerHTML = '<div class="shell"><div class="fy-head"><h2>For you</h2><small>'+label+'</small></div><div class="fy-rail"></div>' +
      '<p class="fy-note">Picked on your device from what you open in the app. Your reading never leaves your phone.</p></div>';
    var rail = sec.querySelector('.fy-rail');
    function monoTile(c){
      var d = document.createElement('span');
      d.className = 'fy-mono' + (c.mcat ? ' ' + c.mcat : ''); d.setAttribute('aria-hidden','true');
      if (c.mono) { d.innerHTML = c.mono; }
      else { d.textContent = (c.title || 'A').trim().charAt(0).toUpperCase(); d.classList.add('fy-mono-letter'); }
      return d;
    }
    top.forEach(function(c){
      var a = document.createElement('a');
      a.className = 'fy-card'; a.href = c.href;
      if (c.img) {
        var im = document.createElement('img');
        im.src = c.img; im.alt = ''; im.loading = 'lazy';
        if (c.ext) im.className = 'fy-contain';
        im.onerror = function(){ if (im.parentNode) im.parentNode.replaceChild(monoTile(c), im); };
        a.appendChild(im);
      } else {
        a.appendChild(monoTile(c));
      }
      var b = document.createElement('b');
      b.textContent = c.title;
      a.appendChild(b);
      rail.appendChild(a);
    });
    if (hero && hero.parentNode) hero.parentNode.insertBefore(sec, hero.nextSibling);
  }

  function parseCards(doc){
    return Array.prototype.slice.call(doc.querySelectorAll('.guide-card')).map(function(el){
      var a = el.querySelector('h3 a') || el.querySelector('a');
      var img = el.querySelector('img');
      var gm = el.querySelector('.guide-media');
      var svg = gm ? gm.querySelector('svg') : null;
      var mc = gm ? (gm.className.match(/cat-[a-z]+/) || [''])[0] : '';
      var title = a ? a.textContent.trim() : '';
      var dc = (el.getAttribute('data-categories') || '').split(/\s+/).filter(Boolean);
      var dl = 0;
      try {
        var dls = JSON.parse(el.getAttribute('data-deadlines') || '[]');
        dls.forEach(function(d){ var ms = Date.parse(d.date + 'T00:00:00'); if (!dl || ms < dl) dl = ms; });
      } catch(e){}
      var dsmall = el.querySelector('.guide-meta small');
      var dms = 0;
      if (dsmall) { var pms = Date.parse(dsmall.textContent.trim().replace(/(\d+)(st|nd|rd|th)/, '$1')); if (!isNaN(pms)) dms = pms; }
      var isrc = img ? img.getAttribute('src') : '';
      var ext = !!isrc && !/^(https:\/\/aicon-hub\.github\.io|\/|\.)/.test(isrc);
      return { href: a ? a.getAttribute('href') : '#', title: title,
               img: isrc, ext: ext,
               mono: svg ? svg.outerHTML : '', mcat: mc,
               dl: dl, date: dms,
               cats: dc.length ? dc : catsFor(title) };
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
