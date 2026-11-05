(function(){
  var standalone = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || (navigator.standalone === true);
  var preview = /[?&]preview-app=1/.test(location.search);
  if (!standalone && !preview) return;
  if (preview) document.body.classList.add('app-preview');
  var bar = document.createElement('nav');
  bar.id = 'app-tabbar';
  bar.setAttribute('aria-label','App');
  var home = document.querySelector('.logo');
  bar.innerHTML =
    '<a href="/" class="active"><svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/></svg><span>Home</span></a>' +
    '<a href="/posts/"><svg viewBox="0 0 24 24"><path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg><span>Guides</span></a>' +
    '<a href="/#closing"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg><span>Deadlines</span></a>' +
    '<a href="/posts/about-aicon.html"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg><span>About</span></a>';
  document.body.appendChild(bar);
  var path = location.pathname;
  bar.querySelectorAll('a').forEach(function(a){
    var href = a.getAttribute('href');
    a.classList.toggle('active', href === '/' ? path === '/' || path === '/index.html' : path.indexOf(href.replace('/#','/')) === 0 && href.charAt(0) === '/' && href.indexOf('#') < 0);
  });
  if (path === '/' || path === '/index.html') bar.querySelector('a').classList.add('active');
})();
