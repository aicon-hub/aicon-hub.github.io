#!/usr/bin/env python3
"""Create crawler-readable article cards without changing authored article text."""
from pathlib import Path
from html.parser import HTMLParser
from html import escape,unescape
import shutil,re,json,sys
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'_site'
class Page(HTMLParser):
 def __init__(self):super().__init__(convert_charrefs=True);self.meta={};self.links={};self.in_h=False;self.h=[];self.in_p=False;self.ps=[];self.cur=[];self.article=False;self.image=''
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='article':self.article=True
  if t=='meta':self.meta[a.get('property') or a.get('name')]=a.get('content','')
  if t=='link':self.links[a.get('rel')]=a.get('href','')
  if t=='h1':self.in_h=True
  if t=='p':self.in_p=True;self.cur=[]
  if t=='img' and 'cover' in a.get('class',''):self.image=a.get('src','')
 def handle_endtag(self,t):
  if t=='h1':self.in_h=False
  if t=='p' and self.in_p:self.ps.append(' '.join(''.join(self.cur).split()));self.in_p=False
 def handle_data(self,d):
  if self.in_h:self.h.append(d)
  if self.in_p:self.cur.append(d)
def short(s,n=220):
 s=' '.join(s.split());return s if len(s)<=n else s[:n-1].rsplit(' ',1)[0]+'…'
def setmeta(text,name,value):
 pat=r'<meta\b(?=[^>]*(?:name|property)\s*=\s*[\"\x27]'+re.escape(name)+r'[\"\x27])[^>]*>'
 text=re.sub(pat,'',text,flags=re.I);attr='property' if name.startswith('og:') else 'name';return text.replace('</head>','<meta '+attr+'="'+name+'" content="'+escape(value,quote=True)+'"/>\n</head>',1)
def transform(text,path):
 p=Page();p.feed(text)
 if not p.article or not p.h:return text,None
 title=' '.join(''.join(p.h).split());generic='AiCoN: your safe space for tech and AI.'
 desc=p.meta.get('og:description') or p.meta.get('description') or next((x for x in p.ps if x),title)
 if desc.startswith(generic):desc=next((x for x in p.ps if x),title)
 desc=short(desc);url=p.links.get('canonical') or 'https://aicon-hub.github.io/'+path
 image=p.meta.get('og:image')
 if not image and p.image:
  from urllib.parse import urljoin
  image=urljoin(url,p.image)
 for n,v in [('description',desc),('og:type','article'),('og:site_name','AiCoN'),('og:title',title),('og:description',desc),('og:url',url),('twitter:card','summary_large_image' if image else 'summary'),('twitter:title',title),('twitter:description',desc)]:text=setmeta(text,n,v)
 if image:
  for n in ['og:image','twitter:image']:text=setmeta(text,n,image)
 if 'assets/theme.js' not in text:text=text.replace('</head>','<script defer src="../assets/theme.js?v=20261008share1"></script></head>',1)
 if 'assets/theme.css' not in text:text=text.replace('</head>','<link rel="stylesheet" href="../assets/theme.css?v=20261008share1"/></head>',1)
 return text,dict(path=path,title=title,description=desc,url=url,image=image)
def replace_inner(text, marker, inner):
 start=text.index(marker);a=text.index('>',start)+1;depth=1
 for m in re.finditer(r'</?div\b[^>]*>',text[a:]):
  depth+= -1 if m[0].startswith('</') else 1
  if depth==0:return text[:a]+inner+text[a+m.start():]
 raise ValueError(marker)
def refresh_home():
 from datetime import datetime
 from zoneinfo import ZoneInfo
 from html import escape as esc
 today=datetime.now(ZoneInfo('Asia/Kolkata')).date().isoformat()
 index=(OUT/'posts/index.html').read_text();rows=[];dates=[];events=[]
 for li in re.findall(r'<li\b[^>]*>.*?</li>',index,re.S):
  am=re.search(r'<a\b[^>]*href=["\x27]([^"\x27]+)["\x27][^>]*>(.*?)</a>',li,re.S)
  if not am:continue
  title=unescape(re.sub('<[^>]+>','',am[2]));href='posts/'+am[1]
  tagm=re.search(r'<small[^>]*class=["\x27]tag["\x27][^>]*>(.*?)</small>',li,re.S)
  tag=unescape(re.sub('<[^>]+>','',tagm[1])) if tagm else 'GUIDE'
  smalls=re.findall(r'<small\b[^>]*>(.*?)</small>',li,re.S);summary=unescape(re.sub('<[^>]+>','',smalls[-1])) if smalls else ''
  date,_,desc=summary.partition(' | ');row=dict(title=title,href=href,tag=tag,date=date,description=desc);rows.append(row)
  if re.search('hackathon|contest|challenge|events',tag,re.I):events.append(row)
  dm=re.search(r'data-deadlines=(["\x27])(.*?)\1',li,re.S)
  if dm:
   try:
    for dt in json.loads(unescape(dm[2])):
     label=dt.get('label','Listed deadline').replace('closes23:45IST','closes 23:45 IST').replace('SFIC institution submission','Seva First institution submission')
     if dt.get('date','')>=today:dates.append(dict(date=dt['date'],label=label,title=title,href=href))
   except (ValueError,KeyError):pass
 dates.sort(key=lambda x:(x['date'],x['title']));dates=dates[:6]
 home=(OUT/'index.html').read_text()
 cards=''.join('<article class="guide-card"><div class="guide-meta"><span>'+esc(x['tag'])+'</span><small>'+esc(x['date'])+'</small></div><h3><a href="'+esc(x['href'])+'">'+esc(x['title'])+'</a></h3><p>'+esc(x['description'])+'</p><a class="read-link" href="'+esc(x['href'])+'">Read guide →</a></article>' for x in rows[:6])
 home=replace_inner(home,'<div class="latest-grid"',cards)
 home=re.sub(r'Browse all \d+ guides on this page','Browse all '+str(len(rows))+' guides',home)
 # Full archive belongs on its own page, not duplicated behind a disclosure.
 home=re.sub(r'(<details class="archive">.*?)<ul class="posts">.*?</ul>',lambda m:m[1]+'<p><a href="posts/index.html">Open the full guide library →</a></p>',home,flags=re.S)
 deadlines=''
 for x in dates:
  day=x['date'][8:];month=datetime.fromisoformat(x['date']).strftime('%b').upper()
  deadlines+='<a class="deadline" data-date="'+x['date']+'" href="'+esc(x['href'])+'"><span class="date-box"><b>'+str(int(day))+'</b><small>'+month+'</small></span><span><strong>'+esc(x['title'])+'</strong><small>'+esc(x['label'])+': '+day+' '+month+' '+x['date'][:4]+'</small></span></a>'
 home=re.sub(r'<a class="deadline"[^>]*>.*?</a>','',home,flags=re.S)
 home=home.replace('<a class="panel-end"',deadlines+'<a class="panel-end"',1)
 eventcards=''.join('<a class="event-guide" href="'+esc(x['href'])+'"><span class="event-tag">'+esc(x['tag'])+'</span><h3>'+esc(x['title'])+'</h3><p>'+esc(x['date']+' | '+x['description'])+'</p></a>' for x in events[:4])
 home=replace_inner(home,'<div class="events-grid" id="events-list"',eventcards)
 (OUT/'index.html').write_text(home)
 (OUT/'assets/deadlines-data.json').write_text(json.dumps(dates,ensure_ascii=False))

def main():
 if OUT.exists():shutil.rmtree(OUT)
 OUT.mkdir();audit=[]
 for name in ['index.html','robots.txt','sitemap.xml','assets','posts']:
  src=ROOT/name
  if src.is_dir():shutil.copytree(src,OUT/name)
  elif src.is_file():shutil.copy2(src,OUT/name)
 # Apply theme before paint and version shared assets on every generated page.
 for page in [OUT/'index.html',*(OUT/'posts').glob('*.html')]:
  text=page.read_text()
  text=re.sub(r'(assets/(?:theme|style|article|home)\.(?:css|js))(?:\?[^\"\'<>\s]*)?',r'\1?v=20261015smooth1',text)
  text=re.sub(r'<script\b[^>]*src=[\"\'][^\"\']*assets/theme.js[^\"\']*[\"\'][^>]*></script>', '', text, flags=re.I)
  prefix='assets/' if page.parent==OUT else '../assets/'
  text=text.replace('<head>','<head><script src=\"'+prefix+'theme.js?v=20261015smooth1\"></script>',1)
  text=text.replace('</head>','<link rel="stylesheet" href="'+prefix+'cinema.css?v=20261015smooth1"/><script defer src="'+prefix+'cinema.js?v=20261015smooth1"></script></head>',1) if 'cinema.css' not in text else text
  page.write_text(text)
 for path in (OUT/'posts').glob('*.html'):
  text,rec=transform(path.read_text(),str(path.relative_to(OUT)))
  if rec:
   path.write_text(text)
   if 'template' not in path.name:audit.append(rec)
 (OUT/'share-metadata-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2))
 refresh_home()
 print('Built',len(audit),'article cards')
if __name__=='__main__':main()
