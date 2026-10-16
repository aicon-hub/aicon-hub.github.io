"""Use source-checked publisher-hosted media without copying it to this site."""
from pathlib import Path
from html import escape
import json,re

def apply(out):
 registry=Path(__file__).with_name('official-remote-media.json')
 records=json.loads(registry.read_text()) if registry.exists() else {}
 applied={}
 for slug,x in records.items():
  p=out/'posts'/(slug+'.html')
  if not p.exists():continue
  u=x.get('poster_url') or x.get('logo_url')
  if not u or not u.startswith('https://'):continue
  source=x.get('source_page','');text=p.read_text();old=[]
  for m in re.finditer(r'<img\b[^>]*class=["\x27][^"\x27]*\bcover\b[^"\x27]*["\x27][^>]*>',text,re.I):
   sm=re.search(r'src=["\x27]([^"\x27]+)',m[0]);old.extend([sm[1]] if sm else [])
  logo=not x.get('poster_url');w=x.get('width',1200);h=x.get('height',630)
  label='Official publisher logo' if logo else 'Official publisher artwork'
  img='<img class="cover official-remote-media" src="'+escape(u,quote=True)+'" alt="'+label+'; independent guide, not sponsored" referrerpolicy="no-referrer" width="'+str(w)+'" height="'+str(h)+'" style="object-fit:contain;width:100%;max-width:'+('240px' if logo else '100%')+';height:auto;max-height:460px;border-radius:0;background:transparent"/>'
  if re.search(r'<img\b[^>]*class=["\x27][^"\x27]*\bcover\b',text,re.I):text=re.sub(r'<img\b[^>]*class=["\x27][^"\x27]*\bcover\b[^"\x27]*["\x27][^>]*>',lambda _:img,text,count=1,flags=re.I)
  else:text=text.replace('</h1>','</h1>'+img,1)
  text=re.sub(r'<p\b[^>]*class=["\x27][^"\x27]*media-credit[^"\x27]*["\x27][^>]*>.*?</p>','',text,flags=re.S)
  credit='<p class="src media-credit">'+label+' hosted by its publisher. <a href="'+escape(source,quote=True)+'">Official source</a>. Independent guide, not affiliated or sponsored. Artwork and trademarks belong to their owners.</p>'
  text=text.replace(img,img+credit,1)
  video=x.get('embed_url','');watch=x.get('video_url','')
  if video.startswith('https://www.youtube.com/embed/') and watch.startswith('https://'):
   title=x.get('video_title','Official publisher video');video=video.replace('www.youtube.com/embed/','www.youtube-nocookie.com/embed/')
   panel='<figure class="official-video" style="margin:24px 0"><iframe src="'+escape(video,quote=True)+'" title="'+escape(title,quote=True)+'" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen style="width:100%;aspect-ratio:16/9;border:0;border-radius:12px"></iframe><figcaption class="src">Official publisher video: '+escape(title)+'. <a href="'+escape(watch,quote=True)+'">Watch on YouTube</a>. Published by <a href="'+escape(x.get('video_channel_url',''),quote=True)+'">'+escape(x.get('video_channel','publisher'))+'</a>. Independent guide, not sponsored.</figcaption></figure>'
   text=text.replace(credit,credit+panel,1)

  # Do not label a generic homepage asset as a picture of the feature discussed.
  for oldurl in old:
   text=text.replace(oldurl,u)
   full='https://aicon-hub.github.io/'+oldurl.replace('../','')
   text=text.replace(full,u)
  for key in ['og:image','twitter:image']:
   pat=r'<meta\b(?=[^>]*(?:name|property)=["\x27]'+key+r'["\x27])[^>]*>'
   text=re.sub(pat,'',text);text=text.replace('</head>','<meta '+('property' if key=='og:image' else 'name')+'="'+key+'" content="'+escape(u,quote=True)+'"/></head>',1)
  text=re.sub(r'<meta\b(?=[^>]*property=["\x27]og:image:(?:width|height)["\x27])[^>]*>','',text)
  # Any Article schema image must also remain on the publisher's hosting.
  text=re.sub(r'("image"\s*:\s*)"https://aicon-hub.github.io/assets/og/[^"<>]+"',lambda m:m[1]+json.dumps(u),text)
  for oldurl in old:
   if '/assets/' in oldurl:
    target=(out/oldurl.replace('../','')).resolve()
    if target.is_relative_to(out.resolve()) and target.is_file():target.unlink()
  for ext in ['.svg','.png','.jpg','.webp','.svg.b64','.png.b64']:(out/'assets/og'/(slug+ext)).unlink(missing_ok=True)
  (out/'assets/og'/(slug+'-official.png')).unlink(missing_ok=True)
  p.write_text(text);applied[slug]=dict(x,image=u)
 ledger=out/'share-metadata-audit.json'
 if ledger.exists():
  rows=json.loads(ledger.read_text())
  for row in rows:
   slug=Path(row.get('path','')).stem
   if slug in applied:row['image']=applied[slug]['image']
  ledger.write_text(json.dumps(rows,ensure_ascii=False,indent=2))
 return applied
