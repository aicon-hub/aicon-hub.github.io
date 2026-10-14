(function(){
var d=document,root=d.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
try{if(!localStorage.getItem('aicon-theme')){root.dataset.theme='dark';root.style.colorScheme='dark';}}catch(e){}
/* Keep the approved dark default after theme.js handles pageshow. Saved choices still win. */
addEventListener('pageshow',function(){try{if(!localStorage.getItem('aicon-theme')){root.dataset.theme='dark';root.style.colorScheme='dark';var bt=d.getElementById('theme-toggle');if(bt){bt.textContent='☀ Light mode';bt.setAttribute('aria-label','Switch to light theme');bt.setAttribute('aria-pressed','true');}}}catch(e){}});
root.classList.add('cine-js');
function ready(f){d.readyState==='loading'?d.addEventListener('DOMContentLoaded',f):f();}
ready(function(){
var b=d.body,home=b.classList.contains('home-redesign');
function mk(c,t){var e=d.createElement(t||'div');e.className=c;e.setAttribute('aria-hidden','true');return e;}
b.appendChild(mk('cine-fx'));var st=mk('cine-stage');st.innerHTML='<i></i><i></i><i></i>';b.insertBefore(st,b.firstChild);
if(!reduce){
 /* opening letterbox, once per session on the home page */
 var seen=false;try{seen=sessionStorage.getItem('cine-open');}catch(e){}
 if(home&&!seen){var bars=mk('cine-bars');bars.innerHTML='<b>Ai<span>C</span>oN</b>';b.appendChild(bars);setTimeout(function(){bars.classList.add('open')},650);setTimeout(function(){bars.remove()},2300);try{sessionStorage.setItem('cine-open','1')}catch(e){}}
 /* page transition curtain */
 var cur=mk('cine-curtain');b.appendChild(cur);
 d.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target||a.hasAttribute('download'))return;var u=new URL(a.href,location.href);if(u.origin!==location.origin||(u.pathname===location.pathname&&u.hash)||u.pathname===location.pathname&&u.search===location.search)return;e.preventDefault();cur.classList.add('on');setTimeout(function(){location.href=a.href},320);});
 addEventListener('pageshow',function(e){if(e.persisted)cur.classList.remove('on')});
}
/* hero headline: word-by-word rise (text unchanged for readers/crawlers) */
var h1=d.querySelector('.hero-section h1');
if(h1&&!reduce&&!h1.querySelector('.cine-line')){var txt=h1.innerHTML.replace(/<br\s*\/?>/gi,' ').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&');var words=txt.trim().split(/\s+/);h1.setAttribute('aria-label',txt.trim());h1.innerHTML=words.map(function(w,i){return '<span class="cine-line" aria-hidden="true" style="display:inline-block"><span style="--i:'+i+'">'+w.replace(/</g,'&lt;')+'</span></span>'}).join(' ');}
var hs=d.querySelector('.hero-section');if(hs&&!reduce){hs.appendChild(mk('hero-beam'));}
/* chapter labels */
d.querySelectorAll('section.shell h2').forEach(function(h,i){if(h.closest('.cine-done'))return;var c=d.createElement('div');c.className='cine-chap';c.textContent='Chapter '+String(i+1).padStart(2,'0');var host=h.closest('.section-heading')||h.parentNode;host.classList.add('cine-done');host.insertBefore(c,host.firstChild);});
/* marquee between hero and explore */
var ex=d.getElementById('explore');if(ex&&!reduce){var names=[].map.call(d.querySelectorAll('.category-grid .tile b'),function(x){return x.textContent.trim()});if(names.length){var m=d.createElement('div');m.className='cine-marquee';m.setAttribute('aria-hidden','true');var row=names.concat(names).map(function(n){return '<span>'+n.replace(/</g,'&lt;')+'</span>'}).join('');m.innerHTML='<div>'+row+row+'</div>';ex.parentNode.insertBefore(m,ex);}}
/* reveal on scroll */
var sel='.checks-grid>div,.card.tile,.guide-card,.events-grid>*,.section-heading,.cine-chap,.os-explorer-section .section-intro,article.post>*,.deadline-panel,.hero-section .eyebrow,.hero-section .intro,.hero-section .actions,.hero-section .also,.footer-grid>div';
var els=[].slice.call(d.querySelectorAll(sel));
if(!reduce&&'IntersectionObserver' in window){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('cine-in');io.unobserve(e.target);}})},{rootMargin:'0px 0px -6% 0px',threshold:.06});
 els.forEach(function(el,i){el.classList.add('cine-pre');var sib=el.parentNode?[].indexOf.call(el.parentNode.children,el):0;el.style.setProperty('--d',Math.min(sib%4,3)*.09+'s');io.observe(el);});
 setTimeout(function(){els.forEach(function(el){el.classList.add('cine-in')})},6000);
}
/* spotlight cursor + card glow + 3D tilt */
if(fine&&!reduce){
 var sp=mk('cine-spot');b.appendChild(sp);var x=0,y=0,raf=0;
 addEventListener('mousemove',function(e){x=e.clientX;y=e.clientY;sp.classList.add('on');if(!raf)raf=requestAnimationFrame(function(){sp.style.transform='translate('+x+'px,'+y+'px)';raf=0;});},{passive:true});
 d.addEventListener('mousemove',function(e){var c=e.target.closest&&e.target.closest('.card.tile,.guide-card,.events-grid>*,.checks-grid>div,ul.posts li');if(!c)return;var r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;c.style.setProperty('--mx',px*100+'%');c.style.setProperty('--my',py*100+'%');if(c.matches('.card.tile,.guide-card'))c.style.transform='perspective(900px) rotateX('+((.5-py)*5)+'deg) rotateY('+((px-.5)*7)+'deg) translateY(-4px)';},{passive:true});
 d.addEventListener('mouseout',function(e){var c=e.target.closest&&e.target.closest('.card.tile,.guide-card');if(c&&!c.contains(e.relatedTarget))c.style.transform='';});
 /* hero parallax */
 var panel=d.querySelector('.deadline-panel'),beam=d.querySelector('.hero-beam');
 addEventListener('scroll',function(){var s=scrollY;if(s>900)return;if(panel&&!panel.matches(':hover'))panel.style.transform='translateY('+(s*-.06)+'px)';if(beam)beam.style.marginTop=(s*.15)+'px';},{passive:true});
}
/* header hides on scroll down, returns on scroll up */
var hd=d.querySelector('.site-header'),last=0;if(hd&&!reduce)addEventListener('scroll',function(){var s=scrollY;hd.classList.toggle('cine-hide',s>last&&s>240);last=s;},{passive:true});
});
})();
