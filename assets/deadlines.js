(function(){
 var panel=document.querySelector('.deadline-panel');if(!panel)return;
 var months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
 function render(rows){
  var today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  rows=rows.filter(function(x){return /^\d{4}-\d{2}-\d{2}$/.test(x.date)&&x.date>=today;}).sort(function(a,b){return a.date.localeCompare(b.date)||a.title.localeCompare(b.title);}).slice(0,6);
  panel.querySelectorAll('.deadline,.deadline-empty').forEach(function(x){x.remove();});var end=panel.querySelector('.panel-end');
  rows.forEach(function(x){var a=document.createElement('a');a.className='deadline';a.href=x.href;var box=document.createElement('span');box.className='date-box';var b=document.createElement('b');b.textContent=String(Number(x.date.slice(8)));var m=document.createElement('small');m.textContent=months[Number(x.date.slice(5,7))-1];box.append(b,m);var text=document.createElement('span');var title=document.createElement('strong');title.textContent=x.title;var label=document.createElement('small');label.textContent=x.label+': '+x.date.slice(8)+' '+months[Number(x.date.slice(5,7))-1]+' '+x.date.slice(0,4);text.append(title,label);a.append(box,text);panel.insertBefore(a,end);});
  if(!rows.length){var p=document.createElement('p');p.className='deadline-empty';p.textContent='No upcoming dates listed. Check the guides and official notices.';panel.insertBefore(p,end);}
 }
 function load(){fetch('posts/index.html',{cache:'no-cache'}).then(function(r){if(!r.ok)throw Error('index');return r.text();}).then(function(text){var d=new DOMParser().parseFromString(text,'text/html'),rows=[];d.querySelectorAll('#postlist > li[data-deadlines]').forEach(function(li){var a=li.querySelector('a');if(!a)return;try{JSON.parse(li.getAttribute('data-deadlines')).forEach(function(x){var u=new URL(a.getAttribute('href'),new URL('posts/index.html',location.href));if(u.origin===location.origin)rows.push({date:x.date,label:x.label||'Listed deadline',title:a.textContent,href:u.href});});}catch(e){}});render(rows);}).catch(function(){panel.querySelectorAll('.deadline[data-date]').forEach(function(a){var today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());if(a.dataset.date<today)a.remove();});});}
 load();setInterval(load,3600000);document.addEventListener('visibilitychange',function(){if(!document.hidden)load();});
})();
