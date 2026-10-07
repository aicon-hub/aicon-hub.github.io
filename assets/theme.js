(function(){
 var root=document.documentElement,key='aicon-theme',saved=null;
 try{saved=localStorage.getItem(key);}catch(e){}
 var media=window.matchMedia('(prefers-color-scheme: dark)');
 function apply(theme){root.dataset.theme=theme;root.style.colorScheme=theme;var b=document.getElementById('theme-toggle');if(b){b.textContent=theme==='dark'?'☀ Light mode':'☾ Dark mode';b.setAttribute('aria-label',theme==='dark'?'Switch to light theme':'Switch to dark theme');b.setAttribute('aria-pressed',theme==='dark'?'true':'false');}}
 apply(saved==='dark'||saved==='light'?saved:(media.matches?'dark':'light'));
 function enrich(){
 var header=document.querySelector('header'),nav=header&&header.querySelector('nav'),brand=header&&header.querySelector('.logo,.brand');
 if(brand){brand.innerHTML='Ai<span>C</span>oN';brand.setAttribute('aria-label','AiCoN home');}
 if(nav){nav.setAttribute('aria-label','Main');nav.querySelectorAll('a').forEach(function(a){if(a.textContent.trim()==='Posts')a.href='/posts/index.html';});}
 var article=document.querySelector('article.post');if(!article||article.querySelector('.on-this-page'))return;
 var hs=Array.from(article.querySelectorAll('h2')),words=article.textContent.split(/\s+/).length;if(hs.length<4||words<400)return;
 var box=document.createElement('nav');box.className='on-this-page';box.setAttribute('aria-label','On this page');var title=document.createElement('h2');title.textContent='On this page';box.appendChild(title);var list=document.createElement('ul');
 hs.forEach(function(h,i){if(!h.id){var base=h.textContent.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'section';var id=base,n=2;while(document.getElementById(id))id=base+'-'+n++;h.id=id;}var li=document.createElement('li'),a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent;li.appendChild(a);list.appendChild(li);});
 var src=article.querySelector('.src');if(src){if(!src.id)src.id='sources';var li=document.createElement('li'),a=document.createElement('a');a.href='#'+src.id;a.textContent='Sources';li.appendChild(a);list.appendChild(li);}box.appendChild(list);var lead=article.querySelector('.lead');if(lead)lead.insertAdjacentElement('afterend',box);else article.insertBefore(box,hs[0]);
 }
 function init(){enrich();var b=document.getElementById('theme-toggle');if(!b){var nav=document.querySelector('header nav');if(nav){b=document.createElement('button');b.id='theme-toggle';b.type='button';nav.appendChild(b);}}if(!b||b.dataset.ready)return;b.dataset.ready='true';apply(root.dataset.theme);b.addEventListener('click',function(){var theme=root.dataset.theme==='dark'?'light':'dark';saved=theme;try{localStorage.setItem(key,theme);}catch(e){}apply(theme);});}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
 if(!window.aiconThemeListening){window.aiconThemeListening=true;media.addEventListener('change',function(e){var choice=null;try{choice=localStorage.getItem(key);}catch(err){}if(choice!=='dark'&&choice!=='light')apply(e.matches?'dark':'light');});}
})();
