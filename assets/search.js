(function(){
  var q=document.getElementById('q'),list=document.getElementById('postlist'),none=document.getElementById('nores');
  if(!q||!list)return;
  var items=[].slice.call(list.children),category=document.getElementById('category');
  var form=q.closest('form'),status=document.getElementById('result-count');
  if(form&&!form.querySelector('.search-field')){var qlabel=form.querySelector('label[for="q"]'),clabel=form.querySelector('label[for="category"]'),sf=document.createElement('div'),cf=document.createElement('div');sf.className='search-field';cf.className='category-field';if(qlabel)sf.appendChild(qlabel);sf.appendChild(q);if(clabel)cf.appendChild(clabel);if(category)cf.appendChild(category);form.appendChild(sf);form.appendChild(cf);var clear=document.createElement('button');clear.type='button';clear.textContent='Clear';clear.id='clear-search';clear.addEventListener('click',function(){q.value='';if(category)category.value='';history.replaceState(null,'',location.pathname);run();q.focus();});form.appendChild(clear);}
  if(!status){status=document.createElement('p');status.id='result-count';status.className='search-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');list.insertAdjacentElement('beforebegin',status);}
  if(!none){none=document.createElement('p');none.id='nores';list.insertAdjacentElement('afterend',none);}none.textContent='No guides match. Try another word or clear the filters.';

  function inCategory(li,key){
    if(!key)return true;
    var assigned=(li.getAttribute('data-categories')||'').split(/\s+/);
    if(assigned.indexOf(key)>-1)return true;
    var tag=li.querySelector('.tag'),t=tag?tag.textContent.toLowerCase():'',a=li.querySelector('a'),slug=a?a.getAttribute('href'):'';
    if(key==='linux')return /linux distro|linux distribution/.test(t);
    if(key==='pc-tools')return /pc tools|pc software|desktop software/.test(t);
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
    if(none)none.hidden=shown>0;status.textContent=shown+' of '+items.length+' guides';
  }
  q.addEventListener('input',run);
  if(category){category.addEventListener('change',function(){var params=new URLSearchParams(location.search);if(category.value)params.set('category',category.value);else params.delete('category');history.replaceState(null,'',location.pathname+(params.toString()?'?'+params.toString():''));run();});var initial=new URLSearchParams(location.search).get('category');if(initial&&Array.from(category.options).some(function(o){return o.value===initial;}))category.value=initial;}

  var m=location.search.match(/[?&]q=([^&]*)/);
  if(m){q.value=decodeURIComponent(m[1].replace(/\+/g,' '));}run();
})();
