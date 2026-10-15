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
   png=svg.with_suffix('.png');cairosvg.svg2png(bytestring=safe.encode(),write_to=str(png),output_width=600,output_height=315)
   from PIL import Image
   with Image.open(png) as image:
    image.convert("RGB").quantize(colors=128).save(png,optimize=True)
   mapping[svg.name]=png.name;continue
  data=base64.b64decode(m[1]);
  if not data.startswith(b'\x89PNG\r\n\x1a\n'):raise ValueError(svg)
  png=svg.with_suffix('.png');png.write_bytes(data);mapping[svg.name]=png.name
 # Rewrite every cover reference, including the visible article cover.
 for page in (out/'posts').glob('*.html'):
  text=page.read_text()
  text=re.sub(r'(?P<prefix>assets/og/)(?P<name>[^\s"\'<>/]+\.svg)',lambda m:m['prefix']+mapping.get(m['name'],m['name']),text)
  page.write_text(text)
 # Originals stay in source; avoid duplicating their data-URI payload in the public build.
 for name in mapping:
  (out/'assets/og'/name).unlink()
 # A source-grounded registry, not a blanket software-licence assumption.
 rights=json.loads((Path(__file__).parent/'media-rights.json').read_text())
 brand={}
 from PIL import Image,ImageOps
 import io,cairosvg
 for slug,record in rights.items():
  page=out/'posts'/(slug+'.html');text=page.read_text()
  if 'remote' in record:
   import urllib.request,hashlib
   data=urllib.request.urlopen(record['remote']).read()
   if hashlib.sha256(data).hexdigest()!=record['sha256']:raise ValueError('Artwork changed: '+slug)
   image=Image.open(io.BytesIO(data)).convert('RGBA')
  elif 'asset' in record:
   original=Path(__file__).parents[1]/'assets/og'/record['asset']
   data=cairosvg.svg2png(url=str(original)) if original.suffix=='.svg' else original.read_bytes()
   image=Image.open(io.BytesIO(data)).convert('RGBA')
  else:
   mime='svg\+xml' if record['selector']=='data-svg' else 'png'
   m=re.search(r'src="data:image/'+mime+r';base64,([^"\s]+)"',text)
   if not m:raise ValueError('Missing approved artwork: '+slug)
   data=base64.b64decode(m[1])
   if record['selector']=='data-svg':data=cairosvg.svg2png(bytestring=data)
   image=Image.open(io.BytesIO(data)).convert('RGBA')
  canvas=Image.new('RGBA',(1200,630),'#171717');image=ImageOps.contain(image,(1000,490),Image.Resampling.LANCZOS);canvas.alpha_composite(image,((1200-image.width)//2,(630-image.height)//2))
  name=slug+'-official.png';canvas.convert('RGB').save(out/'assets/og'/name,optimize=True);brand[slug]=name
  text=text.replace('assets/og/'+slug+'.png','assets/og/'+name)
  notice='<p class="src media-credit">'+escape(record['credit'])+' <a href="'+record['policy']+'">Artwork source and permission</a>'
  if record.get('licence'):notice+=' · <a href="'+record['licence']+'">Licence</a>'
  notice+='</p>'
  cover=re.search(r'<img\b[^>]*class="cover"[^>]*>',text)
  if cover:text=text.replace(cover[0],cover[0]+notice,1)
  page.write_text(text)
 # Listings can show existing artwork now; official-brand replacement is a separately checked backlog.
 home=out/'index.html';text=home.read_text()
 def add(m):
  card=m[0];a=re.search(r'href="posts/([^"]+)"',card)
  if not a:return card
  slug=Path(a[1]).stem;preview=brand.get(slug,slug+'.png');img=out/'assets/og'/preview
  if img.exists():card=card.replace('<div class="guide-meta">','<a class="preview-link" href="posts/'+escape(a[1])+'" tabindex="-1" aria-hidden="true"><img class="guide-preview" src="assets/og/'+preview+'" alt="" width="1200" height="630" loading="lazy"/></a><div class="guide-meta">',1)
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
  if not (out/'assets/og'/preview).exists():return li
  image='<img class="archive-preview" src="../assets/og/'+preview+'" alt="" width="1200" height="630" loading="lazy"/>'
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
