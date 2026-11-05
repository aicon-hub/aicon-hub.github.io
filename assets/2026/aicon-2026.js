/* AiCoN 2026 preview interactions. First-party only. */
(function(){
'use strict';
var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Header shadow */
var header=document.querySelector('.site-header');
function onScroll(){if(header)header.classList.toggle('scrolled',window.scrollY>8);}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();

/* Mobile nav */
var navToggle=document.getElementById('nav-toggle');
var nav=header&&header.querySelector('nav');
if(navToggle&&nav){
  navToggle.addEventListener('click',function(){
    var open=nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded',String(open));
  });
  nav.addEventListener('click',function(e){if(e.target.closest('a')){nav.classList.remove('open');navToggle.setAttribute('aria-expanded','false');}});
}

/* Deadline countdown badges (Asia/Kolkata), expired cards removed */
function todayIST(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
function updateDeadlines(){
  var today=todayIST();
  document.querySelectorAll('[data-date]').forEach(function(card){
    var date=card.getAttribute('data-date');
    if(date<today){card.remove();return;}
    var days=Math.round((Date.parse(date+'T00:00:00Z')-Date.parse(today+'T00:00:00Z'))/86400000);
    var badge=card.querySelector('.dl-badge');
    if(!badge)return;
    badge.textContent=days===0?'Closes today':days===1?'1 day left':days+' days left';
    badge.classList.toggle('soon',days<=3);
  });
}
updateDeadlines();setInterval(updateDeadlines,60000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)updateDeadlines();});

/* Ticker: duplicate track for a seamless loop */
var track=document.querySelector('.ticker-track');
if(track&&!reduced){track.innerHTML+=track.innerHTML;}
})();
;document.addEventListener('click',function(e){var t=e.target.closest('[data-to-top]');if(t){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});}});
