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
def main():
 if OUT.exists():shutil.rmtree(OUT)
 OUT.mkdir();audit=[]
 for name in ['index.html','robots.txt','sitemap.xml','assets','posts']:
  src=ROOT/name
  if src.is_dir():shutil.copytree(src,OUT/name)
  elif src.is_file():shutil.copy2(src,OUT/name)
 for path in (OUT/'posts').glob('*.html'):
  text,rec=transform(path.read_text(),str(path.relative_to(OUT)))
  if rec:
   path.write_text(text)
   if 'template' not in path.name:audit.append(rec)
 (OUT/'share-metadata-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2))
 print('Built',len(audit),'article cards')
if __name__=='__main__':main()
