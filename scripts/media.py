"""Prepare existing supplied raster covers as actual PNG preview files."""
from pathlib import Path
from html import escape,unescape
import re,base64,json

def prepare(out):
 # Exact authored how-to PNGs travel as text through the repository editor.
 for encoded in (out/'assets/howto').glob('*.png.b64'):
  raw=base64.b64decode(encoded.read_text().strip(),validate=True)
  if not raw.startswith(b'\x89PNG\r\n\x1a\n'):raise ValueError(encoded)
  encoded.with_suffix('').write_bytes(raw);encoded.unlink()
 mapping={};brand={};rights={}
 # Generated covers and locally copied publisher art are not deployed.
 import shutil
 shutil.rmtree(out/'assets/og',ignore_errors=True)
 (out/'assets/og').mkdir(parents=True,exist_ok=True)
 # Official artwork hosted by its publisher remains remote, including list previews.
 registry=json.loads(Path(__file__).with_name('official-remote-media.json').read_text())
 remote_previews={}
 for page in (out/'posts').glob('*.html'):
  text=page.read_text()
  for tag in re.findall(r'<img\b[^>]*>',text):
   if not re.search(r'class="[^"]*\bcover\b[^"]*"',tag):continue
   m=re.search(r'src="(https://[^"<>]+)"',tag)
   if m:remote_previews[page.stem]=unescape(m[1])
 # Remove obsolete generated/local Freesound artwork from the deployed site.
 for obsolete in [out/'assets/og/freesound-free-sound-effects-recordings-creative-commons-guide.svg',out/'assets/og/freesound-free-sound-effects-recordings-creative-commons-guide.png',out/'assets/howto/freesound-official-icon.png']:
  obsolete.unlink(missing_ok=True)
 # Listings can use official remote artwork or existing supplied covers.

 home=out/'index.html';text=home.read_text()
 def add(m):
  card=m[0];a=re.search(r'href="posts/([^"]+)"',card)
  if not a:return card
  slug=Path(a[1]).stem;preview=brand.get(slug,slug+'.png');img=out/'assets/og'/preview
  background=registry.get(slug,{}).get('background','#fff' if registry.get(slug,{}).get('logo_url') and not registry.get(slug,{}).get('poster_url') else 'transparent')
  if slug in remote_previews or img.exists():card=card.replace('<div class="guide-meta">','<a class="preview-link" href="posts/'+escape(a[1])+'" tabindex="-1" aria-hidden="true"><img class="guide-preview" style="background:'+escape(background,quote=True)+'" src="'+escape(remote_previews.get(slug,'assets/og/'+preview),quote=True)+'" alt="" width="1200" height="630" loading="lazy"/></a><div class="guide-meta">',1)
  if slug in brand:
   credit=rights[slug].get('short',rights[slug]['credit'])
   card=card.replace('</article>','<small class="preview-credit">'+credit+' · <a href="posts/'+escape(a[1])+'">Source and credit</a></small></article>')
  return card
 text=re.sub(r'<article class="guide-card">.*?</article>',add,text,flags=re.S);home.write_text(text)
 index=out/'posts/index.html';text=index.read_text()
 def thumb(m):
  li=m[0];a=re.search(r'<a[^>]*href="([^"]+)"',li)
  if not a:return li
  slug=Path(a[1]).stem;preview=brand.get(slug,slug+'.png')
  if slug not in remote_previews and not (out/'assets/og'/preview).exists():return li
  background=registry.get(slug,{}).get('background','#fff' if registry.get(slug,{}).get('logo_url') and not registry.get(slug,{}).get('poster_url') else 'transparent')
  image='<img class="archive-preview" style="background:'+escape(background,quote=True)+'" src="'+escape(remote_previews.get(slug,'../assets/og/'+preview),quote=True)+'" alt="" width="1200" height="630" loading="lazy"/>'
  li=li.replace(a[0],image+a[0],1)
  if slug in brand:
   credit=rights[slug].get('short',rights[slug]['credit'])
   li=li.replace('</li>','<small class="preview-credit">'+credit+' · <a href="'+escape(a[1])+'">Source and credit</a></small></li>')
  return li
 text=re.sub(r'<li\b[^>]*>.*?</li>',thumb,text,flags=re.S);index.write_text(text)

 ledger=out/'share-metadata-audit.json'
 if ledger.exists():
  rows=json.loads(ledger.read_text())
  for row in rows:
   old=Path(row.get('image') or '').name
   if old in mapping:row['image']=row['image'].replace(old,mapping[old])
   slug=Path(row.get('path','')).stem
   if slug in brand:row['image']=row['image'].replace(slug+'.png',brand[slug])
  ledger.write_text(json.dumps(rows,ensure_ascii=False,indent=2))
 return mapping
