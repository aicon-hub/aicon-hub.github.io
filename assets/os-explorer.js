/* AiCoN OS Explorer: data-driven nested tiles. All names/details come from assets/os-catalog.json. */
(function(){
"use strict";
var DATA_URL="assets/os-catalog.json";
var PAGE_SIZE=9;
var LEVEL_ORDER=["beginner","intermediate","advanced"];
var LEVEL_LABEL={beginner:"Beginner",intermediate:"Intermediate",advanced:"Advanced","n/a":"Windows"};
var root=document.getElementById("os-explorer-app");
if(!root)return;
var state={type:"linux",sub:null,query:"",page:1,expanded:null,data:[]};

function el(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e;}

function subTabsFor(type){
  var seen=[],i,it,key;
  for(i=0;i<state.data.length;i++){it=state.data[i];if(it.type!==type)continue;
    key=type==="linux"?it.level:it.category;
    if(key&&seen.indexOf(key)===-1)seen.push(key);}
  if(type==="linux"){seen.sort(function(a,b){return LEVEL_ORDER.indexOf(a)-LEVEL_ORDER.indexOf(b);});}
  return seen;
}
function subLabel(type,key){
  if(type==="linux")return LEVEL_LABEL[key]||key;
  return key;
}
function filtered(){
  var q=state.query.toLowerCase(),out=[],i,it,hay;
  for(i=0;i<state.data.length;i++){it=state.data[i];
    if(it.type!==state.type)continue;
    var key=state.type==="linux"?it.level:it.category;
    if(state.sub&&key!==state.sub)continue;
    if(q){hay=(it.name+" "+it.summary+" "+(it.family||"")+" "+(it.category||"")+" "+(it.level||"")).toLowerCase();
      if(hay.indexOf(q)===-1)continue;}
    out.push(it);}
  return out;
}
function badgeFor(it){
  if(it.type==="linux")return {text:LEVEL_LABEL[it.level]||it.level,cls:"lvl-"+it.level};
  return {text:it.category,cls:"cat"};
}
function makeTab(label,id,controls,selected){
  var b=el("button","os-tab",label);
  b.setAttribute("role","tab");b.id=id;b.setAttribute("aria-controls",controls);
  b.setAttribute("aria-selected",selected?"true":"false");b.tabIndex=selected?0:-1;
  return b;
}
function wireTabKeys(list){
  list.addEventListener("keydown",function(e){
    var tabs=list.querySelectorAll('[role="tab"]'),i,cur=-1;
    for(i=0;i<tabs.length;i++)if(tabs[i]===document.activeElement)cur=i;
    if(cur<0)return;
    var n=null;
    if(e.key==="ArrowRight"||e.key==="ArrowDown")n=(cur+1)%tabs.length;
    else if(e.key==="ArrowLeft"||e.key==="ArrowUp")n=(cur-1+tabs.length)%tabs.length;
    else if(e.key==="Home")n=0;
    else if(e.key==="End")n=tabs.length-1;
    if(n!==null){e.preventDefault();tabs[n].focus();tabs[n].click();}
  });
}
function render(){
  root.innerHTML="";
  var head=el("div","os-head");
  var searchWrap=el("div","os-search");
  var label=el("label","sr","Search operating systems");label.setAttribute("for","os-q");
  var q=document.createElement("input");q.id="os-q";q.type="search";q.placeholder="Search by name, family or keyword";q.value=state.query;
  q.addEventListener("input",function(){state.query=q.value;state.page=1;state.expanded=null;renderBody();});
  searchWrap.appendChild(label);searchWrap.appendChild(q);head.appendChild(searchWrap);root.appendChild(head);

  var top=el("div","os-tabs");top.setAttribute("role","tablist");top.setAttribute("aria-label","Operating system type");
  var linuxTab=makeTab("Linux Distributions","os-tab-linux","os-panel",state.type==="linux");
  var winTab=makeTab("Debloated Windows","os-tab-windows","os-panel",state.type==="windows");
  linuxTab.addEventListener("click",function(){if(state.type!=="linux"){state.type="linux";state.sub=null;state.page=1;state.expanded=null;render();root.querySelector(".os-tabs [aria-selected='true']").focus();}});
  winTab.addEventListener("click",function(){if(state.type!=="windows"){state.type="windows";state.sub=null;state.page=1;state.expanded=null;render();root.querySelector(".os-tabs [aria-selected='true']").focus();}});
  top.appendChild(linuxTab);top.appendChild(winTab);wireTabKeys(top);root.appendChild(top);

  var subs=subTabsFor(state.type);
  if(!state.sub||subs.indexOf(state.sub)===-1)state.sub=subs[0]||null;
  var subBar=el("div","os-subtabs");subBar.setAttribute("role","tablist");subBar.setAttribute("aria-label",state.type==="linux"?"Experience level":"Windows categories");
  subs.forEach(function(key,i){
    var t=makeTab(subLabel(state.type,key),"os-sub-"+i,"os-panel",state.sub===key);
    t.addEventListener("click",function(){if(state.sub!==key){state.sub=key;state.page=1;state.expanded=null;renderBody();syncSubSel();}});
    subBar.appendChild(t);
  });
  wireTabKeys(subBar);root.appendChild(subBar);

  if(state.type==="windows"){
    var note=el("p","os-note","Unofficial and pirated builds are listed for awareness, not recommendation. No download links are provided for pirated items. Stick to official Microsoft sources or your own licensed ISO.");
    root.appendChild(note);
  }

  var panel=el("div","os-panel");panel.id="os-panel";panel.setAttribute("role","tabpanel");
  panel.setAttribute("aria-labelledby",state.type==="linux"?"os-tab-linux":"os-tab-windows");
  root.appendChild(panel);
  var pager=el("nav","os-pager");pager.setAttribute("aria-label","Pages");root.appendChild(pager);
  renderBody();
}
function syncSubSel(){
  var tabs=root.querySelectorAll(".os-subtabs [role='tab']"),subs=subTabsFor(state.type);
  for(var i=0;i<tabs.length;i++){var sel=subs[i]===state.sub;
    tabs[i].setAttribute("aria-selected",sel?"true":"false");tabs[i].tabIndex=sel?0:-1;}
}
function renderBody(){
  var panel=root.querySelector(".os-panel");if(!panel)return;
  panel.innerHTML="";
  var items=filtered();
  var pages=Math.max(1,Math.ceil(items.length/PAGE_SIZE));
  if(state.page>pages)state.page=pages;
  var start=(state.page-1)*PAGE_SIZE,slice=items.slice(start,start+PAGE_SIZE);
  if(!slice.length){panel.appendChild(el("p","os-empty","No entries match. Try another search."));}
  var grid=el("div","os-grid");
  slice.forEach(function(it){grid.appendChild(card(it));});
  panel.appendChild(grid);
  var pager=root.querySelector(".os-pager");pager.innerHTML="";
  if(pages>1){
    var prev=el("button","os-page-btn","Previous");prev.disabled=state.page===1;
    prev.addEventListener("click",function(){state.page--;renderBody();});
    var info=el("span","os-page-info","Page "+state.page+" of "+pages+" ("+items.length+" entries)");
    var next=el("button","os-page-btn","Next");next.disabled=state.page===pages;
    next.addEventListener("click",function(){state.page++;renderBody();});
    pager.appendChild(prev);pager.appendChild(info);pager.appendChild(next);
  }
}
function card(it){
  var c=el("article","os-card");
  var b=badgeFor(it);
  var top=el("div","os-card-top");
  top.appendChild(el("h3","os-name",it.name));
  var badges=el("div","os-badges");
  badges.appendChild(el("span","os-badge "+b.cls,b.text));
  if(it.status==="unofficial")badges.appendChild(el("span","os-badge st-unofficial","Unofficial"));
  if(it.status==="pirated")badges.appendChild(el("span","os-badge st-pirated","Pirated"));
  top.appendChild(badges);c.appendChild(top);
  c.appendChild(el("p","os-summary",it.summary));
  var btn=el("button","os-details-btn","View details");
  var det=el("div","os-details");
  var open=state.expanded===it.name;
  btn.setAttribute("aria-expanded",open?"true":"false");
  if(!open)det.hidden=true;
  btn.addEventListener("click",function(){
    state.expanded=state.expanded===it.name?null:it.name;
    var cards=panelCards();
    cards.forEach(function(pair){
      var isOpen=pair.item.name===state.expanded;
      pair.btn.setAttribute("aria-expanded",isOpen?"true":"false");
      pair.det.hidden=!isOpen;
    });
  });
  det.appendChild(section("Base / Family",[it.family||"—"]));
  det.appendChild(section("Specs",it.specs));
  det.appendChild(section("Advantages",it.advantages));
  det.appendChild(section("Disadvantages",it.disadvantages));
  det.appendChild(section("Requirements",it.requirements));
  var src=el("div","os-src");
  var a=document.createElement("a");a.href=it.source;a.target="_blank";a.rel="noopener noreferrer";
  a.textContent=it.source.indexOf("microsoft.com/howtotell")!==-1?"Microsoft safety reference (no download links)":it.status==="pirated"?"Safety reference (no download links)":"Official project source";
  src.appendChild(a);det.appendChild(src);
  c.appendChild(btn);c.appendChild(det);
  c._item=it;c._btn=btn;c._det=det;
  return c;
}
function panelCards(){
  var out=[],nodes=root.querySelectorAll(".os-card");
  for(var i=0;i<nodes.length;i++)out.push({item:nodes[i]._item,btn:nodes[i]._btn,det:nodes[i]._det});
  return out;
}
function section(title,arr){
  var s=el("div","os-sec");
  s.appendChild(el("h4",null,title));
  var ul=document.createElement("ul");
  (arr||[]).forEach(function(x){ul.appendChild(el("li",null,x));});
  s.appendChild(ul);return s;
}
fetch(DATA_URL).then(function(r){return r.json();}).then(function(d){
  state.data=d;render();
}).catch(function(){
  root.appendChild(el("p","os-empty","Could not load the OS catalog. Please try again later."));
});
})();
