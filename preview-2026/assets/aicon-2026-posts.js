/* AiCoN 2026 preview - posts library filtering. First-party only. */
(function(){
'use strict';
var input=document.getElementById('q'),grid=document.getElementById('postgrid');
if(!input||!grid)return;
var cards=Array.from(grid.children);
var chips=Array.from(document.querySelectorAll('.fchip'));
var count=document.getElementById('result-count');
var none=document.getElementById('nores');
var active='';
function normalize(s){return s.toLowerCase().replace(/licence/g,'license').replace(/colour/g,'color').replace(/centre/g,'center');}
function run(){
  var words=normalize(input.value).split(/\s+/).filter(Boolean),n=0;
  cards.forEach(function(c){
    var text=normalize(c.textContent+' '+(c.dataset.search||''));
    var cats=(c.dataset.categories||'').split(/\s+/);
    var show=words.every(function(w){return text.indexOf(w)!==-1;})&&(!active||cats.indexOf(active)!==-1);
    c.hidden=!show;if(show)n++;
  });
  if(count)count.textContent=n+(n===1?' guide':' guides');
  if(none)none.hidden=n>0;
  var p=new URLSearchParams(location.search);
  if(input.value)p.set('q',input.value);else p.delete('q');
  if(active)p.set('category',active);else p.delete('category');
  history.replaceState(null,'',location.pathname+(p.toString()?'?'+p:''));
}
chips.forEach(function(ch){
  ch.addEventListener('click',function(){
    active=ch.dataset.cat||'';
    chips.forEach(function(c){c.setAttribute('aria-pressed',String(c===ch));});
    run();
  });
});
input.addEventListener('input',run);
/* Restore from URL */
var p=new URLSearchParams(location.search);
var q0=p.get('q')||'',c0=p.get('category')||'';
if(q0)input.value=q0;
if(c0){active=c0;chips.forEach(function(c){c.setAttribute('aria-pressed',String(c.dataset.cat===c0));});}
run();
})();
