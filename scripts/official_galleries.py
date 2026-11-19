"""Source-checked publisher photographs. No website screenshots or social posters."""
from pathlib import Path
from html import escape
import json

def apply(out):
 records=json.loads(Path(__file__).with_name('official-galleries.json').read_text())
 for slug,g in records.items():
  p=out/'posts'/(slug+'.html')
  if not p.exists():continue
  text=p.read_text()
  gallery='<section class="official-gallery"><h2>'+escape(g['heading'])+'</h2><p>'+escape(g['intro'])+'</p><p>Full-resolution originals, about 5 to 7 MB per photo. Load only the photos you want to see.</p>'
  for x in g['images']:
   gallery+='<figure><button type="button" class="button" style="padding:12px 18px;border:1px solid var(--orange);background:var(--orange-soft);color:var(--link);border-radius:24px;min-height:44px;font:inherit;cursor:pointer" data-load-official-photo>Load official photo</button><img class="official-photo" data-official-photo="'+escape(x['url'],quote=True)+'" alt="'+escape(x['caption'],quote=True)+'" hidden referrerpolicy="no-referrer" style="max-width:100%;height:auto;margin:0 auto"/><figcaption>'+escape(x['caption'])+' <a href="'+escape(g['source'],quote=True)+'">Official TRAI gallery</a>.</figcaption></figure>'
  gallery+='<p>TRAI hosts these full-resolution originals, about 5 to 7 MB per photo. Load only the photos you want to see.</p></section><script>document.querySelectorAll("[data-load-official-photo]").forEach(function(b){b.addEventListener("click",function(){var i=b.nextElementSibling;b.textContent="Loading official photo...";b.disabled=true;i.onload=function(){b.hidden=true;};i.onerror=function(){b.disabled=false;b.textContent="Could not load. Tap to retry.";i.hidden=true;};i.src=i.dataset.officialPhoto;i.hidden=false;});});</script>'
  text=text.replace('</article>',gallery+'</article>',1)
  p.write_text(text)
