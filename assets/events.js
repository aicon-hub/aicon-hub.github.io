(function(){
'use strict';
var root=document.getElementById('events-list');if(!root)return;
fetch('posts/index.html',{cache:'no-cache'}).then(function(r){if(!r.ok)throw Error('index');return r.text();}).then(function(text){
var doc=new DOMParser().parseFromString(text,'text/html'),out=document.createDocumentFragment(),count=0;
doc.querySelectorAll('#postlist>li').forEach(function(li){
var tag=li.querySelector('.tag'),link=li.querySelector('a');if(!tag||!link||!/(hackathon|contest|challenge|events)/i.test(tag.textContent))return;
var href=new URL(link.getAttribute('href'),new URL('posts/index.html',location.href));if(href.origin!==location.origin)return;
var a=document.createElement('a');a.className='event-guide';a.href=href.href;var t=document.createElement('span');t.className='event-tag';t.textContent=tag.textContent;var h=document.createElement('h3');h.textContent=link.textContent;var p=document.createElement('p');var smalls=li.querySelectorAll('small');p.textContent=smalls.length?smalls[smalls.length-1].textContent:'';a.append(t,h,p);out.appendChild(a);count++;
});if(count){root.replaceChildren(out);}
}).catch(function(){/* Keep the published fallback guides. */});
})();
