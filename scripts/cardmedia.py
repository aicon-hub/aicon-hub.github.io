"""Official hotlinked images for library and home cards that still show the icon tile.

Reads scripts/card-media.json (slug -> official image URL, checked to load, at least 800 px wide).
Swaps the tile of a mono card for the hotlinked image. Cards that already have an image are left alone.
Any problem leaves the tile as it was."""
import json,re
from pathlib import Path
from html import escape,unescape
CARD=re.compile(r'<article class="guide-card"(?P<attrs>[^>]*)>(?P<body>.*?)</article>',re.S)
MONO=re.compile(r'<a class="guide-media mono[^"]*"[^>]*href="(?P<href>[^"]+)"[^>]*>.*?</a>',re.S)
def make(out,pages=('posts/index.html','index.html')):
 M=json.loads(Path(__file__).with_name('card-media.json').read_text());n=0
 for rel in pages:
  p=out/rel
  if not p.exists():continue
  text=p.read_text()
  def sub(m):
   nonlocal n
   mm=MONO.search(m['body'])
   if not mm:return m[0]
   s=re.search(r'/([^/]+)\.html$',mm['href'])
   if not s or s[1] not in M:return m[0]
   h3=re.search(r'<h3[^>]*>\s*<a[^>]*>(.*?)</a>',m['body'],re.S)
   alt=escape(unescape(re.sub(r'<[^>]+>','',h3[1])).strip(),quote=True) if h3 else ''
   img='<a class="guide-media" href="'+mm['href']+'"><img src="'+escape(M[s[1]],quote=True)+'" alt="'+alt+'" loading="lazy" referrerpolicy="no-referrer"/></a>'
   n+=1
   return m[0].replace(mm[0],img,1)
  new=CARD.sub(sub,text)
  if new!=text:p.write_text(new)
 print('cardmedia',n,'cards')
 return n
