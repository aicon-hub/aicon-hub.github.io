"""Official-logo thumbnails for library and home cards that still show the icon tile.

Reads scripts/logo-thumbs.json (slug -> official logo URL, optional crop/trim, optional name text).
For each mono card with an entry, downloads the logo, draws a clean white 1200x630 card
(logo large, product name beside icon-only marks, small AiCoN badge), saves it to
assets/thumbs/<slug>.png and swaps the tile for an image. Any failure leaves the tile as it was."""
import io,json,re,subprocess,tempfile,urllib.request
from pathlib import Path
from html import escape,unescape
from PIL import Image,ImageDraw,ImageFont,ImageChops
W,H=1200,630
FB=['/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf','/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf','/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf']
def font(sz):
 for p in FB:
  if Path(p).exists():return ImageFont.truetype(p,sz)
 return ImageFont.load_default()
def fetch(url):
 req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (AiCoN site build; +https://aicon-hub.github.io)'})
 with urllib.request.urlopen(req,timeout=20) as r:return r.read()
def load(url):
 data=fetch(url)
 if url.split('?')[0].lower().endswith('.svg') or data[:200].lstrip().startswith((b'<?xml',b'<svg')):
  try:
   import cairosvg
   data=cairosvg.svg2png(bytestring=data,output_width=1200)
  except Exception:
   with tempfile.TemporaryDirectory() as d:
    sv=Path(d)/'a.svg';sv.write_bytes(data);out=Path(d)/'a.png'
    subprocess.run(['convert','-background','none','-density','300',str(sv),'-resize','1400x1400',str(out)],check=True,timeout=40)
    data=out.read_bytes()
 return Image.open(io.BytesIO(data)).convert('RGBA')
def trim(im,white=False):
 if white:
  d=ImageChops.difference(im.convert('RGB'),Image.new('RGB',im.size,(255,255,255)))
  bb=d.point(lambda p:255 if p>24 else 0).getbbox()
 else:
  bb=im.getchannel('A').getbbox()
 return im.crop(bb) if bb else im
def card(logo,name=None,top=110,bot=540):
 im=Image.new('RGB',(W,H),'#FFFFFF');d=ImageDraw.Draw(im)
 if name:
  nf=font(110)
  while d.textlength(name,font=nf)>560 and nf.size>44:nf=font(nf.size-4)
  nw=int(d.textlength(name,font=nf));gap=44;box=(min(W-120-nw-gap,430),bot-top)
 else:box=(1040,bot-top)
 sc=min(box[0]/logo.width,box[1]/logo.height)
 if logo.width<400 and logo.height<400:sc=min(sc,2.0)
 lg=logo.resize((max(1,int(logo.width*sc)),max(1,int(logo.height*sc))),Image.LANCZOS);cy=(top+bot)//2
 if name:
  x0=(W-(lg.width+gap+nw))//2;im.paste(lg,(x0,cy-lg.height//2),lg);d.text((x0+lg.width+gap,cy),name,font=nf,fill='#111111',anchor='lm')
 else:im.paste(lg,((W-lg.width)//2,cy-lg.height//2),lg)
 d.rounded_rectangle((W-48-150,34,W-48,86),radius=12,fill='#F97316');d.text((W-48-75,60),'AiCoN',font=font(32),fill='white',anchor='mm')
 return im
CARD=re.compile(r'<article class="guide-card"(?P<attrs>[^>]*)>(?P<body>.*?)</article>',re.S)
MONO=re.compile(r'<a class="guide-media mono[^"]*"[^>]*href="(?P<href>[^"]+)"[^>]*>.*?</a>',re.S)
def make(out,pages=('posts/index.html','index.html'),cfg=None):
 cfg=cfg or Path(__file__).with_name('logo-thumbs.json')
 M=json.loads(Path(cfg).read_text());made={};n=0;site='https://aicon-hub.github.io'
 def build(slug):
  if slug in made:return made[slug]
  e=M.get(slug);res=None
  if e:
   try:
    lg=load(e['url'])
    if e.get('crop'):lg=lg.crop(tuple(e['crop']))
    if e.get('trim')=='white':lg=trim(lg.convert('RGB'),True).convert('RGBA')
    else:lg=trim(lg)
    if max(lg.size)>=200:
     p=out/'assets'/'thumbs'/(slug+'.png');p.parent.mkdir(parents=True,exist_ok=True)
     card(lg,e.get('name')).save(p,optimize=True);res='assets/thumbs/'+slug+'.png'
   except Exception as ex:print('logothumb skip',slug,repr(ex)[:80])
  made[slug]=res;return res
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
   path=build(s[1])
   if not path:return m[0]
   h3=re.search(r'<h3[^>]*>\s*<a[^>]*>(.*?)</a>',m['body'],re.S)
   alt=escape(unescape(re.sub(r'<[^>]+>','',h3[1])).strip(),quote=True) if h3 else ''
   img='<a class="guide-media" href="'+mm['href']+'"><img src="'+site+'/'+path+'" alt="'+alt+'" width="1200" height="630" loading="lazy"/></a>'
   n+=1
   return m[0].replace(mm[0],img,1)
  new=CARD.sub(sub,text)
  if new!=text:p.write_text(new)
 print('logothumbs',n,'cards')
 return n
