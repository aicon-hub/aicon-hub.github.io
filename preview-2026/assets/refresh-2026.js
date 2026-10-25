/* AiCoN 2026 refresh: latest-guides carousel (arrows + dots, scroll-snap). */
(function(){
 function init(){
  var grid=document.querySelector('.latest-grid');
  if(!grid||grid.classList.contains('carousel'))return;
  var cards=grid.querySelectorAll('.guide-card');
  if(cards.length<2)return;
  grid.classList.add('carousel');
  var wrap=document.createElement('div');wrap.className='carousel-wrap';
  grid.parentNode.insertBefore(wrap,grid);wrap.appendChild(grid);
  var nav=document.createElement('div');nav.className='carousel-nav';
  var prev=document.createElement('button');prev.className='carousel-btn';prev.type='button';prev.setAttribute('aria-label','Previous guides');prev.textContent='←';
  var next=document.createElement('button');next.className='carousel-btn';next.type='button';next.setAttribute('aria-label','More guides');next.textContent='→';
  var dots=document.createElement('div');dots.className='carousel-dots';dots.setAttribute('aria-hidden','true');
  nav.appendChild(prev);nav.appendChild(next);nav.appendChild(dots);
  wrap.appendChild(nav);
  function pages(){var w=grid.clientWidth,cw=cards[0].getBoundingClientRect().width+18;return Math.max(1,Math.round((grid.scrollWidth-w)/cw)+1);}
  function page(){var cw=cards[0].getBoundingClientRect().width+18;return Math.round(grid.scrollLeft/cw);}
  function draw(){var n=pages(),p=Math.min(page(),n-1),i;
   dots.innerHTML='';for(i=0;i<n;i++){var d=document.createElement('i');if(i===p)d.className='on';dots.appendChild(d);}
   prev.disabled=grid.scrollLeft<=4;next.disabled=grid.scrollLeft>=grid.scrollWidth-grid.clientWidth-4;}
  function go(dir){var cw=cards[0].getBoundingClientRect().width+18;
   grid.scrollBy({left:dir*cw*Math.max(1,Math.floor(grid.clientWidth/cw)),behavior:'smooth'});}
  prev.addEventListener('click',function(){go(-1);});
  next.addEventListener('click',function(){go(1);});
  var t;grid.addEventListener('scroll',function(){clearTimeout(t);t=setTimeout(draw,60);},{passive:true});
  window.addEventListener('resize',draw);
  draw();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

/* Explicit full-library access: open the collapsed archive details into a visible button + search. */
(function(){
 function open(){
  var d=document.querySelector('details.archive');
  if(!d)return;
  var label=(d.querySelector('summary')||{}).textContent||'Browse all guides';
  var form=d.querySelector('form');
  var box=document.createElement('div');box.className='archive-open';
  var a=document.createElement('a');a.className='button outline browse-all';a.href='posts/index.html';
  a.textContent=label.replace(/\s+/g,' ').trim()+' \u2192';
  box.appendChild(a);
  if(form){form.classList.add('archive-search');box.appendChild(form);}
  d.parentNode.replaceChild(box,d);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',open);else open();
})();

/* Motion layer: header elevation + transform-only scroll reveals (text opacity never gated). */
(function(){
 function init(){
  var h=document.querySelector('.site-header,header.top');
  if(h){
   var tick=false;
   var onscroll=function(){
    if(tick)return;tick=true;
    requestAnimationFrame(function(){h.classList.toggle('r26-scrolled',window.scrollY>12);tick=false;});
   };
   window.addEventListener('scroll',onscroll,{passive:true});onscroll();
  }
  if(!('IntersectionObserver' in window))return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var els=document.querySelectorAll('.home-redesign .guide-card,.home-redesign .card.tile,.home-redesign .event-guide,.home-redesign .checks-grid>div,.home-redesign .deadline');
  if(!els.length)return;
  var io=new IntersectionObserver(function(entries){
   entries.forEach(function(en){
    if(en.isIntersecting){en.target.classList.add('r26-in');io.unobserve(en.target);}
   });
  },{rootMargin:'0px 0px -8% 0px',threshold:.05});
  els.forEach(function(el,i){el.setAttribute('data-r26','');el.style.transitionDelay=Math.min(i%6*40,200)+'ms';io.observe(el);});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
