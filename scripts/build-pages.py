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
def render_funded():
 from datetime import datetime,timezone
 from zoneinfo import ZoneInfo
 from html import escape as esc
 ist=ZoneInfo('Asia/Kolkata');now=datetime.now(ist)
 page=OUT/'funded/index.html'
 if not page.exists():return
 data=json.loads((ROOT/'assets/funded-abroad.json').read_text())
 progs=data['programs']
 def parsedl(v):
  if not v:return None
  if 'T' in v:return datetime.fromisoformat(v.replace('Z','+00:00')).astimezone(ist)
  return datetime.fromisoformat(v+'T23:59:59').replace(tzinfo=ist)
 def box(t):
  if not t:return '<span class="date-box"><b>~</b><small>TBA</small></span>'
  return '<span class="date-box"><b>'+str(t.day)+'</b><small>'+t.strftime('%b').upper()+'</small></span>'
 def count(t,status):
  if not t:return 'Watch this space'
  ms=(t-now).total_seconds();days=int(ms//86400)+ (1 if ms%86400>0 else 0)
  if ms<=0:return 'Applications closed'
  return 'Closes today' if days<=1 else str(days)+' days left'
 typelabel={'study':'Study','teach':'Teach & work','research':'Research'}
 statuslabel={'open':'Open now','expected':'Expected soon','closed':'Closed this cycle'}
 cards=[]
 for pr in progs:
  t=parsedl(pr.get('deadline'));st=pr['status']
  if t and (t-now).total_seconds()<=0:st='closed'
  attrs='data-status="'+st+'" data-type="'+pr['type']+'"'+((' data-deadline="'+pr['deadline']+'"') if pr.get('deadline') else '')
  c='<article class="ff-card" '+attrs+'>'
  c+='<div class="ff-top"><span class="ff-country">'+esc(pr['country'])+'</span><span class="ff-type">'+typelabel.get(pr['type'],pr['type'])+'</span><span class="ff-status ff-'+st+'">'+statuslabel[st]+'</span></div>'
  c+='<h3>'+esc(pr['name'])+'</h3>'
  c+='<p><b>Funding.</b> '+esc(pr['funding'])+'</p>'
  c+='<p><b>Who can apply.</b> '+esc(pr['eligibility'])+'</p>'
  c+='<div class="ff-deadline">'+box(t)+'<span class="ff-dl-text"><b class="ff-count">'+count(t,st)+'</b><small>'+esc(pr['deadlineLabel'])+'</small></span></div>'
  if pr.get('note'):c+='<p class="ff-note">'+esc(pr['note'])+'</p>'
  c+='<div class="ff-actions"><a class="button primary" href="'+esc(pr['url'])+'" rel="noopener">'+esc(pr.get('cta','Official page'))+'</a>'
  if pr.get('guide'):c+='<a class="ff-guide" href="../'+esc(pr['guide'])+'">Read the AiCoN guide</a>'
  c+='</div><small class="ff-verified">Checked on '+esc(pr['verified'])+' against the official page.</small></article>'
  cards.append(c)
 text=page.read_text()
 def swap(txt,marker,inner):
  open_m='<!--'+marker+'-->';close_m='<!--/'+marker+'-->'
  a=txt.index(open_m)+len(open_m);b=txt.index(close_m);return txt[:a]+inner+txt[b:]
 text=swap(text,'FF-CARDS','\n'.join(cards))
 open_n=sum(1 for pr in progs if pr['status']=='open');exp_n=sum(1 for pr in progs if pr['status']=='expected')
 upd=datetime.fromisoformat(data['updated']).strftime('%-d %B %Y')
 summary=('<div class="ff-stat"><b>'+str(len(progs))+'</b>programmes tracked</div>'
  '<div class="ff-stat"><b>'+str(open_n)+'</b>open now</div>'
  '<div class="ff-stat"><b>'+str(exp_n)+'</b>expected soon</div>'
  '<div class="ff-stat"><b>'+upd+'</b>last verified</div>')
 text=swap(text,'FF-SUMMARY',summary)
 ne='\n'.join('<li><b>'+esc(x['name'])+'.</b> '+esc(x['why'])+'</li>' for x in data.get('notEligible',[]))
 text=swap(text,'FF-NOTELIGIBLE',ne)
 page.write_text(text)


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
  guide=OUT/'posts'/am[1]
  gm=re.search(r'<script\b[^>]*id=["\x27]aicon-deadlines["\x27][^>]*>(.*?)</script>',guide.read_text(),re.S) if guide.exists() else None
  dm=re.search(r'data-deadlines=(["\x27])(.*?)\1',li,re.S)
  if gm or dm:
   try:
    for dt in json.loads(gm[1] if gm else unescape(dm[2])):
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
  days=(datetime.fromisoformat(x['date']).date()-datetime.fromisoformat(today).date()).days
  badge='Closes today' if days==0 else ('1 day left' if days==1 else str(days)+' days left')
  deadlines+='<a class="deadline" data-date="'+x['date']+'" href="'+esc(x['href'])+'"><span class="date-box"><b>'+str(int(day))+'</b><small>'+month+'</small></span><span><strong>'+esc(x['title'])+'</strong><small>'+esc(x['label'])+': '+day+' '+month+' '+x['date'][:4]+'</small><b class="days-left">'+badge+'</b><span class="deadline-action">How to apply →</span></span></a>'
 home=re.sub(r'<a class="deadline"[^>]*>.*?</a>','',home,flags=re.S)
 home=home.replace('<a class="panel-end"',deadlines+'<a class="panel-end"',1)
 eventcards=''.join('<a class="event-guide" href="'+esc(x['href'])+'"><span class="event-tag">'+esc(x['tag'])+'</span><h3>'+esc(x['title'])+'</h3><p>'+esc(x['date']+' | '+x['description'])+'</p></a>' for x in events[:4])
 home=replace_inner(home,'<div class="events-grid" id="events-list"',eventcards)
 (OUT/'index.html').write_text(home)
 (OUT/'assets/deadlines-data.json').write_text(json.dumps(dates,ensure_ascii=False))


def seo_pass():
 import json,re
 from datetime import date
 base='https://aicon-hub.github.io/'
 title='AiCoN | Verified Tech, AI, Scholarship and Govt Service Guides for India'
 desc='Plain-language, source-checked guides to AI tools, apps, digital safety, scholarships, government services and student events for readers in Kerala and across India.'
 ld=json.dumps([{"@context":"https://schema.org","@type":"Organization","name":"AiCoN","url":base,"logo":base+"assets/aicon-icon.svg","sameAs":["https://whatsapp.com/channel/0029VawGIGTD38CRJde0fl1c","https://t.me/AiCoN4tech"],"email":"aicon4tech@gmail.com"},{"@context":"https://schema.org","@type":"WebSite","name":"AiCoN","url":base,"inLanguage":"en-IN","potentialAction":{"@type":"SearchAction","target":base+"posts/index.html?q={search_term_string}","query-input":"required name=search_term_string"}}],ensure_ascii=False)
 page=OUT/'index.html';t=page.read_text()
 t=re.sub(r'<title>.*?</title>','<title>'+title+'</title>',t,count=1,flags=re.S)
 t=setmeta(t,'description',desc)
 for n,v in [('og:type','website'),('og:site_name','AiCoN'),('og:title',title),('og:description',desc),('og:url',base),('twitter:card','summary'),('twitter:title',title),('twitter:description',desc)]:t=setmeta(t,n,v)
 if 'rel="canonical"' not in t:t=t.replace('</head>','<link rel="canonical" href="'+base+'"/></head>',1)
 if 'application/ld+json' not in t:t=t.replace('</head>','<script type="application/ld+json">'+ld+'</script></head>',1)
 t=t.replace('<a href="#posts">Latest guides</a><a href="#checks">How we check</a>','<a href="#posts">Latest guides</a><a href="#checks">How we check</a><a href="posts/about-aicon.html">About</a><a href="#contact">Contact</a>',1)
 page.write_text(t)
 # sitemap: every built page
 urls=[base,base+'posts/',base+'funded/']+[base+'posts/'+f.name for f in sorted((OUT/'posts').glob('*.html')) if f.name!='index.html']
 today=date.today().isoformat()
 (OUT/'sitemap.xml').write_text('<?xml version="1.0" encoding="utf-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+'\n'.join('<url><loc>'+u+'</loc><lastmod>'+today+'</lastmod></url>' for u in dict.fromkeys(urls))+'\n</urlset>\n')

def write_llms():
 base='https://aicon-hub.github.io/'
 n=len([f for f in (OUT/'posts').glob('*.html') if f.name not in ('index.html','about-aicon.html') and 'template' not in f.name])
 lines=['# AiCoN','',
 '> AiCoN is a source-checked guide site for readers in Kerala and across India: verified tech and AI tool guides, scholarship and government service guides, and student events. It was founded by Muhammed Salman CC, runs without ads or affiliate links, and is published at '+base+'.','',
 '## Key sections','',
 '- [Guides index]('+base+'posts/): every guide on the site, each a plain-language article',
 '- [Funded abroad]('+base+'funded/): funded study and opportunity listings abroad',
 '- [About AiCoN]('+base+'posts/about-aicon.html): what AiCoN is and how it works',
 '- [Sitemap]('+base+'sitemap.xml): every page on the site','',
 '## How content is verified','',
 '- Tools, apps and links are checked against official sources before they are shared.',
 '- Scholarship, government and event details come from the organiser or government site.',
 '- No referral or affiliate links.','',
 '## Contact','',
 '- Email: aicon4tech@gmail.com',
 '- WhatsApp channel: https://whatsapp.com/channel/0029VawGIGTD38CRJde0fl1c',
 '- Telegram: https://t.me/AiCoN4tech','']
 (OUT/'llms.txt').write_text('\n'.join(lines),encoding='utf-8')

def preserve_search_console_verification():
 # Google rechecks ownership. Retain this permanent root file in every Pages artifact.
 name='google5c239e66451d43a6.html'
 expected='google-site-verification: '+name+'\n'
 source=ROOT/name
 if source.read_text(encoding='utf-8')!=expected:
  raise ValueError('Search Console verification file is missing or changed')
 shutil.copy2(source,OUT/name)
 if (OUT/name).read_bytes()!=source.read_bytes():
  raise ValueError('Search Console verification file was not preserved')

def main():
 if OUT.exists():shutil.rmtree(OUT)
 OUT.mkdir();audit=[]
 for name in ['index.html','robots.txt','sitemap.xml','assets','posts','funded','favicon.ico','favicon-192.png','favicon-512.png','apple-touch-icon.png']:
  src=ROOT/name
  if src.is_dir():shutil.copytree(src,OUT/name)
  elif src.is_file():shutil.copy2(src,OUT/name)
 for draft in ['_template.html','article-template.html']:
  (OUT/'posts'/draft).unlink(missing_ok=True)
 # Standalone AGPL avatar guide: decode corresponding source, load independent host.
 import base64
 (OUT/'assets/avatar-guide-source.tar.gz').write_bytes(base64.b64decode((ROOT/'assets/avatar-guide-source.tar.gz.b64').read_text()))
 (OUT/'assets/avatar-guide-source.tar.gz.b64').unlink(missing_ok=True)
 # Apply theme before paint and version shared assets on every generated page.
 for page in [OUT/'index.html',OUT/'funded/index.html',*(OUT/'posts').glob('*.html')]:
  text=page.read_text()
  text=re.sub(r'(assets/(?:theme|style|article|home)\.(?:css|js))(?:\?[^\"\'<>\s]*)?',r'\1?v=20261015smooth1',text)
  text=re.sub(r'<script\b[^>]*src=[\"\'][^\"\']*assets/theme.js[^\"\']*[\"\'][^>]*></script>', '', text, flags=re.I)
  prefix='assets/' if page.parent==OUT else '../assets/'
  text=text.replace('<head>','<head><script src=\"'+prefix+'theme.js?v=20261015smooth1\"></script>',1)
  text=text.replace('</head>','<link rel="stylesheet" href="'+prefix+'cinema.css?v=20261015smooth1"/><script defer src="'+prefix+'cinema.js?v=20261015smooth1"></script></head>',1) if 'cinema.css' not in text else text
  text=text.replace('</body>','<script defer src="'+prefix+'avatar-loader.js?v=20261016guide1"></script></body>',1)
  page.write_text(text)
 for path in (OUT/'posts').glob('*.html'):
  text,rec=transform(path.read_text(),str(path.relative_to(OUT)))
  if rec:
   path.write_text(text)
   if 'template' not in path.name and path.name!='about-aicon.html':audit.append(rec)
 (OUT/'share-metadata-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2))
 # Remove old local-logo panels before the contents list is generated.
 for page in (OUT/'posts').glob('*.html'):
  text=page.read_text()
  text=re.sub(r'<section\b[^>]*class=["\x27]official-media["\x27][^>]*>.*?</section>',lambda m:'' if re.search(r'<img[^>]*src=["\x27](?:data:image|(?:\.\./)?assets/og/)',m[0],re.I) else m[0],text,flags=re.S)
  page.write_text(text)
 from editorial import enrich
 enrich(OUT)
 render_funded()
 refresh_home()
 from remote_media import apply
 apply(OUT)
 from media import prepare
 prepare(OUT)
 seo_pass()
 write_llms()
 preserve_search_console_verification()
 print('Built',len(audit),'article cards')
if __name__=='__main__':main()
