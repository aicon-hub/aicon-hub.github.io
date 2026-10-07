(function(){
 var root=document.documentElement,key='aicon-theme',saved=null;
 try{saved=localStorage.getItem(key);}catch(e){}
 var media=window.matchMedia('(prefers-color-scheme: dark)');
 function apply(theme){root.dataset.theme=theme;root.style.colorScheme=theme;var b=document.getElementById('theme-toggle');if(b){b.textContent=theme==='dark'?'☀ Light mode':'☾ Dark mode';b.setAttribute('aria-label',theme==='dark'?'Switch to light theme':'Switch to dark theme');b.setAttribute('aria-pressed',theme==='dark'?'true':'false');}}
 apply(saved==='dark'||saved==='light'?saved:(media.matches?'dark':'light'));
 function init(){var b=document.getElementById('theme-toggle');if(!b||b.dataset.ready)return;b.dataset.ready='true';apply(root.dataset.theme);b.addEventListener('click',function(){var theme=root.dataset.theme==='dark'?'light':'dark';saved=theme;try{localStorage.setItem(key,theme);}catch(e){}apply(theme);});}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
 if(!window.aiconThemeListening){window.aiconThemeListening=true;media.addEventListener('change',function(e){var choice=null;try{choice=localStorage.getItem(key);}catch(err){}if(choice!=='dark'&&choice!=='light')apply(e.matches?'dark':'light');});}
})();
