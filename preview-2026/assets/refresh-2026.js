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
