(function(){
  var q=document.getElementById('q'),list=document.getElementById('postlist'),none=document.getElementById('nores');
  if(!q||!list)return;
  var items=[].slice.call(list.children);
  function normalise(text){
    return text.toLowerCase().replace(/licences?/g,function(w){return w==='licences'?'licenses':'license';}).replace(/colours?/g,function(w){return w==='colours'?'colors':'color';}).replace(/centres?/g,function(w){return w==='centres'?'centers':'center';});
  }
  function run(){
    var words=normalise(q.value).split(/\s+/).filter(Boolean),shown=0;
    items.forEach(function(li){
      var t=normalise(li.textContent+' '+(li.getAttribute('data-search')||''));
      var ok=words.every(function(w){return t.indexOf(w)>-1;});
      li.hidden=!ok;if(ok)shown++;
    });
    if(none)none.hidden=shown>0;
  }
  q.addEventListener('input',run);
  var m=location.search.match(/[?&]q=([^&]*)/);
  if(m){q.value=decodeURIComponent(m[1].replace(/\+/g,' '));run();}
})();
