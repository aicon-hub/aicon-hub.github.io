(function(){
  var q=document.getElementById('q'),list=document.getElementById('postlist'),none=document.getElementById('nores');
  if(!q||!list)return;
  var items=[].slice.call(list.children),category=document.getElementById('category');
  function inCategory(li,key){
    if(!key)return true;
    var tag=li.querySelector('.tag'),t=tag?tag.textContent.toLowerCase():'',a=li.querySelector('a'),slug=a?a.getAttribute('href'):'';
    if(key==='ai')return /ai|coding|developer|open model|data science|design tools|cloud tools|creator tools/.test(t);
    if(key==='safety')return /safety|security|privacy/.test(t);
    if(key==='scholarships')return /scholarship/.test(t);
    if(key==='government')return /govt|government|public service|insurance scheme|pension scheme|banking scheme|business loans|kerala jobs|student challenge/.test(t);
    if(key==='offers')return /^(resourify-student-digital-deals-check-guide|zoho-catalyst-students-free-cloud-project-guide|zoho-notebook-ai-student-plan-guide|elevenlabs-students-free-elevenreader-ultra-guide)\.html$/.test(slug);
    if(key==='apps')return /app|music|video editing|wellbeing|productivity|meal planning|travel planning|accessibility|nature|learning|study|voice|browser|photo editing|meetings|writing|android/.test(t);
    return false;
  }
  function normalise(text){
    return text.toLowerCase().replace(/licences?/g,function(w){return w==='licences'?'licenses':'license';}).replace(/colours?/g,function(w){return w==='colours'?'colors':'color';}).replace(/centres?/g,function(w){return w==='centres'?'centers':'center';});
  }
  function run(){
    var words=normalise(q.value).split(/\s+/).filter(Boolean),shown=0;
    items.forEach(function(li){
      var t=normalise(li.textContent+' '+(li.getAttribute('data-search')||''));
      var ok=inCategory(li,category?category.value:'')&&words.every(function(w){return t.indexOf(w)>-1;});
      li.hidden=!ok;if(ok)shown++;
    });
    if(none)none.hidden=shown>0;
  }
  q.addEventListener('input',run);
  if(category){category.addEventListener('change',function(){var params=new URLSearchParams(location.search);if(category.value)params.set('category',category.value);else params.delete('category');history.replaceState(null,'',location.pathname+(params.toString()?'?'+params.toString():''));run();});var initial=new URLSearchParams(location.search).get('category');if(initial&&Array.from(category.options).some(function(o){return o.value===initial;}))category.value=initial;}

  var m=location.search.match(/[?&]q=([^&]*)/);
  if(m){q.value=decodeURIComponent(m[1].replace(/\+/g,' '));}run();
})();
