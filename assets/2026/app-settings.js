/* AiCoN app settings: theme, design style, blur and animation prefs. localStorage only. */
(function(){
  var LS = { get:function(k){try{return localStorage.getItem(k);}catch(e){return null;}},
             set:function(k,v){try{localStorage.setItem(k,v);}catch(e){}},
             del:function(k){try{localStorage.removeItem(k);}catch(e){}} };
  var root = document.documentElement;
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var themeBtn = document.getElementById('theme-toggle');
  function paintBtn(t){ if(themeBtn){ themeBtn.textContent = t==='dark' ? '☀ Light mode' : '☾ Dark mode'; } }
  function applyTheme(t){ root.dataset.theme = t; root.style.colorScheme = t; paintBtn(t); }
  function sys(){ applyTheme(mq.matches ? 'dark' : 'light'); }
  function currentTheme(){ var s = LS.get('aicon-theme'); return (s==='dark'||s==='light') ? s : 'system'; }
  function onSystem(){ if (currentTheme()==='system') sys(); }
  mq.addEventListener('change', onSystem);

  /* segmented controls */
  function seg(id, get, set){
    var el = document.getElementById(id); if(!el) return;
    var btns = el.querySelectorAll('button');
    function paint(){ var v = get(); btns.forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-v')===v); }); }
    btns.forEach(function(b){ b.addEventListener('click', function(){ set(b.getAttribute('data-v')); paint(); }); });
    paint();
  }
  seg('seg-theme', currentTheme, function(v){
    if (v==='system'){ LS.del('aicon-theme'); sys(); } else { LS.set('aicon-theme', v); applyTheme(v); }
  });
  seg('seg-style', function(){ return LS.get('aicon-app-style')==='m3' ? 'm3' : 'glass'; }, function(v){
    if (v==='m3'){ LS.set('aicon-app-style','m3'); document.body.classList.add('app-style-m3'); }
    else { LS.del('aicon-app-style'); document.body.classList.remove('app-style-m3'); }
  });

  /* toggles */
  function tgl(id, key, cls){
    var el = document.getElementById(id); if(!el) return;
    el.checked = LS.get(key)==='1';
    el.addEventListener('change', function(){
      if (el.checked){ LS.set(key,'1'); document.body.classList.add(cls); }
      else { LS.del(key); document.body.classList.remove(cls); }
    });
  }
  tgl('tgl-pblur','aicon-app-pblur','app-pblur');
  tgl('tgl-rblur','aicon-app-rblur','app-rblur');
  tgl('tgl-ranim','aicon-app-ranim','app-ranim');

  /* check for updates */
  var row = document.getElementById('row-update');
  var status = document.getElementById('update-status');
  if (row && status && window.AiCoNUpdate) {
    var cv = window.AiCoNUpdate.current ? window.AiCoNUpdate.current() : window.AiCoNUpdate.CURRENT;
    status.textContent = 'You have version ' + cv;
    var vs=document.getElementById('version-static'); if(vs) vs.textContent=cv;
    var vf=document.getElementById('version-foot'); if(vf) vf.textContent=cv;
    row.addEventListener('click', function(e){
      e.preventDefault();
      status.textContent = 'Checking…';
      window.AiCoNUpdate.check().then(function(v){
        if (v.newer) {
          status.textContent = 'Version ' + v.version + ' available - tap to download';
          row.href = v.apk;
          row.onclick = function(ev){
            if (window.AiCoNNativeBridge && window.AiCoNNativeBridge.downloadUpdate) {
              ev.preventDefault();
              window.AiCoNNativeBridge.downloadUpdate(v.apk);
            }
          };
        } else {
          status.textContent = 'You are up to date (' + cv + ')';
        }
      }).catch(function(){ status.textContent = 'Could not check right now'; });
    });
  }
})();
