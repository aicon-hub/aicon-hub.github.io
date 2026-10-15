"""Prepare existing supplied raster covers as actual PNG preview files."""
from pathlib import Path
from html import escape,unescape
import re,base64,json

def prepare(out):
 mapping={}
 for svg in (out/'assets/og').glob('*.svg'):
  text=svg.read_text();m=re.search(r'data:image/png;base64,([A-Za-z0-9+/=\s]+)',text)
  if not m:
   import cairosvg
   safe=re.sub(r'font-family="[^"]*"','font-family="Poppins,Inter,sans-serif"',text)
   png=svg.with_suffix('.png');cairosvg.svg2png(bytestring=safe.encode(),write_to=str(png),output_width=1200,output_height=630)
   mapping[svg.name]=png.name;continue
  data=base64.b64decode(m[1]);
  if not data.startswith(b'\x89PNG\r\n\x1a\n'):raise ValueError(svg)
  png=svg.with_suffix('.png');png.write_bytes(data);mapping[svg.name]=png.name
 for page in (out/'posts').glob('*.html'):
  text=page.read_text()
  for match in list(re.finditer(r'<meta\b[^>]*(?:og:image|twitter:image)[^>]*>',text)):
   tag=match[0]
   for old,new in mapping.items():
    if old in tag:text=text.replace(tag,tag.replace(old,new));break
  page.write_text(text)
 # Reuse unchanged, already-credited official artwork where it is embedded in the guide.
 brand={}
 for page in (out/'posts').glob('*.html'):
  if not any(x in page.name for x in ['f-droid-free','linux-mint-free']):continue
  text=page.read_text();m=re.search(r'<img\b[^>]*alt="Official[^>]*src="(data:image/svg\+xml;base64,[^"]+)"',text)
  if not m:continue
  svg=base64.b64decode(m[1].split(',',1)[1]);name=page.stem+'-official.png'
  import cairosvg
  cairosvg.svg2png(bytestring=svg,write_to=str(out/'assets/og'/name),output_width=600,output_height=315,background_color='#171717')
  brand[page.stem]=name
 # Listings can show existing artwork now; official-brand replacement is a separately checked backlog.
 home=out/'index.html';text=home.read_text()
 def add(m):
  card=m[0];a=re.search(r'href="posts/([^"]+)"',card)
  if not a:return card
  slug=Path(a[1]).stem;preview=brand.get(slug,slug+'.png');img=out/'assets/og'/preview
  if img.exists():card=card.replace('<div class="guide-meta">','<a class="preview-link" href="posts/'+escape(a[1])+'" tabindex="-1" aria-hidden="true"><img class="guide-preview" src="assets/og/'+preview+'" alt="" width="1200" height="630" loading="lazy"/></a><div class="guide-meta">',1)
  if slug in brand:
   credit='F-Droid logo: Theaker, Martinez, Nayenko · CC BY-SA 3.0' if slug.startswith('f-droid') else 'Linux Mint logo · used under its FAQ permission'
   card=card.replace('</article>','<small class="preview-credit">'+credit+' · <a href="posts/'+escape(a[1])+'">Source and credit</a></small></article>')
  return card
 text=re.sub(r'<article class="guide-card">.*?</article>',add,text,flags=re.S);home.write_text(text)
 index=out/'posts/index.html';text=index.read_text()
 def thumb(m):
  li=m[0];a=re.search(r'<a[^>]*href="([^"]+)"',li)
  if not a:return li
  slug=Path(a[1]).stem;preview=brand.get(slug,slug+'.png')
  if not (out/'assets/og'/preview).exists():return li
  image='<img class="archive-preview" src="../assets/og/'+preview+'" alt="" width="1200" height="630" loading="lazy"/>'
  li=li.replace(a[0],image+a[0],1)
  if slug in brand:
   credit='F-Droid logo: Theaker, Martinez, Nayenko · CC BY-SA 3.0' if slug.startswith('f-droid') else 'Linux Mint logo · FAQ permission'
   li=li.replace('</li>','<small class="preview-credit">'+credit+' · <a href="'+escape(a[1])+'">Source and credit</a></small></li>')
  return li
 text=re.sub(r'<li\b[^>]*>.*?</li>',thumb,text,flags=re.S);index.write_text(text)

 ledger=out/'share-metadata-audit.json'
 if ledger.exists():
  rows=json.loads(ledger.read_text())
  for row in rows:
   old=Path(row.get('image') or '').name
   if old in mapping:row['image']=row['image'].replace(old,mapping[old])
  ledger.write_text(json.dumps(rows,ensure_ascii=False,indent=2))
 return mapping
