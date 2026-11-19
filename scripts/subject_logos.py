"""Use each article's verified subject logo in cards, not generic category drawings."""
from pathlib import Path
from html import escape,unescape
import re,json

def apply(out):
 approved=json.loads(Path(__file__).with_name("subject-logo-checks.json").read_text())
 logos={}
 for page in (out/'posts').glob('*.html'):
  text=page.read_text()
  tags=re.findall(r'<img\b[^>]*>',text)
  tag=next((t for t in tags if re.search(r'class=["\x27][^"\x27]*\btool-logo\b',t)),None)
  if tag:
   m=re.search(r'src=["\x27]([^"\x27]+)',tag)
   if m and approved.get(page.stem)==unescape(m[1]):logos[page.stem]=unescape(m[1])
 count=0
 for rel in ['posts/index.html','index.html']:
  p=out/rel;text=p.read_text()
  def card(m):
   nonlocal count
   body=m[0]
   h=re.search(r'<h3[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>(.*?)</a>',body,re.S)
   if not h:return body
   slug=Path(h[1]).stem;src=logos.get(slug)
   # Government emblems need individual clearance; do not promote them automatically.
   cats=re.search(r'data-categories="([^"]*)"',body)
   if cats and set(cats[1].split()) & {'government','jobs','scholarships'} and slug!='trai-network-anubhav-user-speed-map-guide':return body
   if not src:return body
   alt=escape(unescape(re.sub('<[^>]+>','',h[2])),quote=True)
   image='<a class="guide-media subject-logo" href="'+escape(h[1],quote=True)+'"><img src="'+escape(src,quote=True)+'" alt="'+alt+' logo" loading="lazy" referrerpolicy="no-referrer"/></a>'
   old=re.search(r'<a[^>]*class="guide-media[^"]*"[^>]*>.*?</a>',body,re.S)
   # Older app releases cannot decode SVG. Preserve an existing raster fallback.
   if old and '.svg' in src.split('?')[0].lower():
    fallback=re.search(r'<img[^>]*src="([^"]+)"',old[0])
    if fallback and not any(ext in fallback[1].split('?')[0].lower() for ext in ['.svg','.ico']):
     image=image.replace('<img src="'+escape(src,quote=True)+'"','<picture><source srcset="'+escape(src,quote=True)+'" type="image/svg+xml"/><img src="'+fallback[1]+'"').replace('/></a>','/></picture></a>')
   if old:body=body[:old.start()]+image+body[old.end():]
   else:body=body.replace('>','>'+image,1)
   body=body.replace('<article class="guide-card"','<article class="guide-card" data-subject-logo="'+escape(src,quote=True)+'"',1)
   count+=1
   return body
  text=re.sub(r'<article class="guide-card"[^>]*>.*?</article>',card,text,flags=re.S)
  p.write_text(text)
 (out/'subject-logos.json').write_text(json.dumps(logos,ensure_ascii=False,indent=2))
 print('subject logos',len(logos),'card uses',count)
