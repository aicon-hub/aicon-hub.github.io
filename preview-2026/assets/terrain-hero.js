/* AiCoN home hero: mounts the Hairline Terrain figure. First-party, no third-party calls.
   Capture hook must exist before hairline-terrain.js runs. */
(function(){
  window.hairline=function(f){window.__aiconTerrain=f;};
  function boot(){
    var host=document.getElementById('terrain-hero');
    var fig=window.__aiconTerrain;
    if(!fig&&document.readyState!=='complete'&&!boot.retried){boot.retried=1;document.addEventListener('DOMContentLoaded',boot);return;}
    if(!host||!fig||!window.HL)return;
    var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    HL.inject(document);
    host.setAttribute('data-hairline','terrain');
    host.setAttribute('role','img');
    host.setAttribute('aria-label',fig.means);
    var svg=HL.mk('svg',{viewBox:'0 0 400 320','aria-hidden':'true'},host);
    var readEl=document.createElement('span');readEl.className='terrain-read';readEl.setAttribute('aria-hidden','true');
    host.appendChild(readEl);
    var text=null;
    var read={get textContent(){return text;},set textContent(v){text=v==null?'':String(v);readEl.textContent=text;}};
    var handle=fig.mount({stage:host,svg:svg,read:read},fig.range[1]);
    if(text===null)read.textContent='';
    window.__aiconTerrainHandle=handle;
    if(reduce)return; /* reduced motion: static rest pose, no autoplay */
    /* phones/tablets: play the tour while the hero is on screen; a real touch ends it */
    if(window.matchMedia('(hover: none)').matches&&HL.tour){
      var playing=null;
      function start(){if(!playing)playing=HL.tour(host,fig.tour||HL.LAP,function(){playing=null;});}
      function stop(){if(playing){playing.stop();playing=null;}}
      if('IntersectionObserver' in window){
        var io=new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?start():stop();});},{threshold:0.25});
        io.observe(host);
        host.addEventListener('pointerdown',function(){stop();io.disconnect();},{once:true});
      }
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
