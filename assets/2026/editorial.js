/* Navigation, reading tools and mobile topic selection. First-party only. */
(function(){
'use strict';
function init(){
 var header=document.querySelector('header.site-header,header.top'),nav=header&&header.querySelector('nav');
 if(header&&nav&&!header.querySelector('#nav-toggle')){
  var menu=document.createElement('button');menu.id='nav-toggle';menu.type='button';menu.setAttribute('aria-label','Open navigation');menu.setAttribute('aria-expanded','false');
  if(!nav.id)nav.id='mainnav';menu.setAttribute('aria-controls',nav.id);menu.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  nav.before(menu);menu.addEventListener('click',function(){var open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
 }
 var toggle=document.getElementById('nav-toggle');
 function close(){if(nav)nav.classList.remove('open');if(toggle)toggle.setAttribute('aria-expanded','false');}
 document.addEventListener('keydown',function(e){if(e.key==='Escape'){close();if(toggle)toggle.focus();}});
 if(nav)nav.addEventListener('click',function(e){if(e.target.closest('a'))close();});
 var article=document.querySelector('article.post');
 if(article){
  var toc=article.querySelector('.on-this-page');
  if(toc&&!toc.closest('details')){var d=document.createElement('details');d.className='toc-disclosure';var summary=document.createElement('summary');summary.textContent='On this page';d.appendChild(summary);toc.before(d);d.appendChild(toc);}
  var progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.appendChild(progress);
  var top=document.createElement('button');top.type='button';top.className='back-top';top.textContent='↑';top.setAttribute('aria-label','Back to top');top.hidden=true;document.body.appendChild(top);
  top.addEventListener('click',function(){window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
  var pending=false;
  function update(){var max=document.documentElement.scrollHeight-innerHeight;progress.style.transform='scaleX('+Math.min(1,Math.max(0,scrollY/Math.max(1,max)))+')';top.hidden=scrollY<700;pending=false;}
  window.addEventListener('scroll',function(){if(!pending){pending=true;requestAnimationFrame(update);}},{passive:true});update();
 }
 var chips=Array.from(document.querySelectorAll('.fchip'));
 if(chips.length){var select=document.createElement('select');select.className='topic-select';select.setAttribute('aria-label','Filter guides by topic');chips.forEach(function(c){var o=document.createElement('option');o.value=c.dataset.cat||'';o.textContent=c.textContent;select.appendChild(o);if(c.getAttribute('aria-pressed')==='true')select.value=o.value;c.addEventListener('click',function(){select.value=c.dataset.cat||'';});});select.addEventListener('change',function(){var c=chips.find(function(x){return (x.dataset.cat||'')===select.value;});if(c)c.click();});document.querySelector('.filter-chips').after(select);}
 document.querySelectorAll('img').forEach(function(img){img.addEventListener('error',function(){var media=img.closest('.guide-media');if(media){media.classList.add('media-unavailable');img.hidden=true;}});});
}
if(document.readyState!=='complete')document.addEventListener('DOMContentLoaded',init);else init();
})();
