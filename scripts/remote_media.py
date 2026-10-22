"""Use source-checked publisher-hosted media without copying it to this site."""
from pathlib import Path
from html import escape
import json,re

def apply(out):
 registry=Path(__file__).with_name('official-remote-media.json')
 records=json.loads(registry.read_text()) if registry.exists() else {}
 # Source-checked asset repairs. Keep the registry's remaining records untouched.
 records.get("drawio-diagrams-net-free-diagram-maker-no-signup-privacy-guide", {}).update(logo_url="https://www.drawio.com/img/logo.svg", logo_width=48, logo_height=48)
 records.get("syncthing-keep-folders-in-sync-between-your-devices-open-source-guide", {}).update(logo_url="https://syncthing.net/img/logo-horizontal.svg", logo_width=300, logo_height=82)
 records.get("antennapod-free-ad-free-podcast-player-android-guide", {}).update(logo_url="https://antennapod.org/assets/branding/logos/logo-icon.png", logo_width=512, logo_height=512)
 records.get("gparted-free-disk-partition-editor-resize-partitions-bootable-usb-guide", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.get("darebee-free-ad-free-home-workouts-no-signup-2821-guide", {}).update(logo_url="https://darebee.com/images/content/press/darebee-logo.png?v=1784360397", logo_width=2579, logo_height=1029)
 records.get("jet-programme-2027-alt-teach-english-japan-india-guide", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.setdefault("musicbrainz-picard-free-music-tagger-organize-mp3-flac-guide", {}).update(logo_url="https://picard.musicbrainz.org/static/img/picard-icon-large.svg?v=dd59b67b", logo_width=154, logo_height=154, poster_url=None, under_chip_only=True, source_page="https://picard.musicbrainz.org/")
 records.get("digikam-free-photo-manager-organize-tag-search-photos-guide", {}).update(logo_url="https://www.digikam.org/img/digikam_oxygen.svg", logo_width=128, logo_height=128, poster_url=None, under_chip_only=True)
 records.setdefault("eartrumpet-free-volume-mixer-windows-microsoft-store-guide", {}).update(logo_url="https://raw.githubusercontent.com/File-New-Project/EarTrumpet/master/EarTrumpet/Assets/Icon-Light.ico", logo_width=256, logo_height=256, poster_url=None, under_chip_only=True)
 records.setdefault("fxsound-free-open-source-sound-booster-equalizer-windows-guide", {}).update(logo_url="https://raw.githubusercontent.com/fxsound2/fxsound-app/main/fxsound/Images/FxSound%20Black%20Bars.svg", logo_width=256, logo_height=256, poster_url=None, under_chip_only=True)
 records.setdefault("ninite-install-many-windows-programs-at-once-home-use-guide", {}).update(logo_url="https://ninite.com/static/img/brand-8a2e7c6ad769d6bc457c5c2b1a9743e8.png", logo_width=312, logo_height=116, poster_url=None, under_chip_only=True)
 records.get("sharex-free-screenshot-screen-recorder-windows-no-ads-guide", {}).update(logo_url="https://raw.githubusercontent.com/ShareX/ShareX/master/ShareX.HelpersLib/Resources/ShareX_Logo.png", logo_width=256, logo_height=256)
 records.get("jasp-free-statistics-software-no-coding-windows-mac-linux-guide", {}).update(logo_width=300, logo_height=300, poster_url=None, under_chip_only=True)
 records.get("thonny-python-ide-beginners-step-by-step-debugger-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("foobar2000-free-music-player-windows-mac-android-ios-guide", {}).update(logo_width=324, logo_height=49, poster_url=None, under_chip_only=True)
 records.setdefault("auto-dark-mode-free-automatic-windows-theme-switcher-guide", {}).update(logo_url="https://raw.githubusercontent.com/AutoDarkMode/Windows-Auto-Night-Mode/master/adm_new.ico", logo_width=256, logo_height=256, poster_url=None, under_chip_only=True)
 records.get("bhashini-indian-language-translation-guide", {}).update(logo_url="https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/50/61/e7/5061e73a-ee46-7bee-cb27-a27b5a85cc36/Placeholder.mill/400x400Icon.ApSiOS01-75.webp", logo_width=400, logo_height=400)
 records.get("common-fellowships-portal-phd-postdoc-fellowships-eligibility-calculator-guide", {}).update(logo_url="https://www.fellowships.gov.in/images/mst-logo.png", logo_width=800, logo_height=447, poster_url=None, under_chip_only=False, width=800, height=447, background="#fff", display_max_width="320px")
 records.get("mediainfo-free-video-audio-file-details-checker-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("fontforge-free-font-editor-design-typefaces-windows-mac-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("winscp-free-ftp-sftp-file-transfer-client-windows-guide", {}).update(logo_url="https://winscp-static-746341.c.cdn77.org/assets/images/logos/logo.png?v=146", logo_width=55, logo_height=54)
 # Official hosts that failed repeated real article loads stay text-only.
 unavailable=['cadence-chipstack-rtl-agent-early-access-limits-guide', 'glasp-free-highlights-youtube-summaries-public-by-default-guide', 'pm-svanidhi-street-vendor-loan-guide', 'aadhaar-biometric-lock-unlock', 'pm-mudra-loan-shishu-tarun-plus-guide', 'lg-thinq-claw-beta-india-availability-guide', 'national-frontier-ai-compute-fund-proposal-status-guide', 'digital-arrest-scam-india-report-guide', 'online-fraud-1930-first-hour-reporting-guide', 'abha-health-id-create-free', 'sanchar-saathi-check-sim-block-lost-phone', 'hdfc-bank-eva-ai-chatbot-free-banking-questions-guide', 'cybercrime-suspect-repository-check-before-paying', 'pm-vishwakarma-artisan-scheme-guide', 'pm-internship-scheme-paid-internships-guide', 'myupi-npci-fimi-support-safety-controls-guide', 'rbi-ombudsman-complaint-guide-2026', 'adobe-premiere-mobile-free-video-editor-guide', 'youth-entrepreneurs-challenge-2027-vbyld-age-18-35-cash-prizes-up-to-rs-1-5-lakh-guide', 'apprenticeship-india-registration-stipend-guide', 'esanjeevani-free-online-doctor-kerala-guide', 'prismor-ai-agent-security-free-runtime-policy-guide', 'undp-internships-how-they-work-how-to-apply-guide', 'adobe-scan-free-ai-document-scanner-guide', 'adobe-gemini-claude-creative-acrobat-access-guide']
 records={s:x for s,x in records.items() if s not in unavailable}
 applied={}
 # Articles without a usable official hotlink are intentionally text-only.
 for page in (out/'posts').glob('*.html'):
  slug=page.stem;text=page.read_text()
  text=re.sub(r'<img\b[^>]*class=["\x27][^"\x27]*\btool-logo\b[^"\x27]*["\x27][^>]*>','',text,flags=re.I)
  text=re.sub(r'<figure\b[^>]*>.*?</figure>',lambda m:'' if re.search(r'<img[^>]*src=["\x27](?:data:image|(?:\.\./)?assets/og/)',m[0],re.I) else m[0],text,flags=re.S)
  text=re.sub(r'<img\b[^>]*>',lambda m:'' if re.search(r'src=["\x27](?:data:image|(?:\.\./)?assets/og/|https://aicon-hub.github.io/assets/og/)',m[0],re.I) and not re.search(r'class=["\x27][^"\x27]*\bcover\b',m[0],re.I) else m[0],text)
  if slug not in records:
   text=re.sub(r'<img\b[^>]*class=["\x27][^"\x27]*\bcover\b[^"\x27]*["\x27][^>]*>','',text,flags=re.I)
   text=re.sub(r'<meta\b(?=[^>]*(?:name|property)=["\x27](?:og:image(?::(?:width|height))?|twitter:image)["\x27])[^>]*>','',text,flags=re.I)
   text=re.sub(r'("image"\s*:\s*)"https://aicon-hub.github.io/assets/og/[^"<>]+"\s*,?', '',text)
   text=re.sub(r'<p\b[^>]*class=["\x27][^"\x27]*media-credit[^"\x27]*["\x27][^>]*>.*?</p>','',text,flags=re.S)
   text=re.sub(r'(<meta[^>]*(?:name|property)=["\x27]twitter:card["\x27][^>]*content=["\x27])summary_large_image',r'\1summary',text)
  page.write_text(text)
 for slug,x in records.items():
  p=out/'posts'/(slug+'.html')
  if not p.exists():continue
  source=x.get('source_page','');text=p.read_text();old=[]
  lurl=x.get('logo_url','')
  if lurl.startswith('https://'):
   lw=x.get('logo_width');lh=x.get('logo_height')
   dim=(' width="'+str(lw)+'" height="'+str(lh)+'"') if lw and lh else ''
   limg='<img class="tool-logo" src="'+escape(lurl,quote=True)+'" alt="Official publisher logo; independent guide, not sponsored" referrerpolicy="no-referrer"'+dim+' decoding="async"/>'
   cm=re.search(r'<span\b[^>]*class=["\x27][^"\x27]*\bchip\b[^"\x27]*["\x27][^>]*>.*?</span>',text,re.I|re.S)
   if cm:text=text[:cm.end()]+limg+text[cm.end():]
   else:text=re.sub(r'<h1\b',lambda _:limg+'<h1',text,count=1,flags=re.I)
  if x.get('under_chip_only'):
   # Remove only obsolete locally generated covers, never authored tutorial media.
   text=re.sub(r'<img\b[^>]*>',lambda m:'' if re.search(r'class=["\x27][^"\x27]*\bcover\b',m[0],re.I) and re.search(r'src=["\x27](?:\.\./)?assets/og/',m[0],re.I) else m[0],text,flags=re.I)
   p.write_text(text);continue
  u=x.get('poster_url') or x.get('logo_url')
  if not u or not u.startswith('https://'):continue
  for m in re.finditer(r'<img\b[^>]*class=["\x27][^"\x27]*\bcover\b[^"\x27]*["\x27][^>]*>',text,re.I):
   sm=re.search(r'src=["\x27]([^"\x27]+)',m[0]);old.extend([sm[1]] if sm else [])
  logo=not x.get('poster_url');w=x.get('width',1200);h=x.get('height',630)
  label='Official publisher logo' if logo else 'Official publisher artwork'
  img='<img class="cover official-remote-media" src="'+escape(u,quote=True)+'" alt="'+label+'; independent guide, not sponsored" referrerpolicy="no-referrer" width="'+str(w)+'" height="'+str(h)+'" style="object-fit:contain;width:100%;max-width:'+(str(x.get('display_max_width','240px')) if logo else '100%')+';height:auto;max-height:460px;border-radius:0;background:'+escape(x.get('background','#fff' if logo else 'transparent'),quote=True)+'"/>'
  if re.search(r'<img\b[^>]*class=["\x27][^"\x27]*\bcover\b',text,re.I):text=re.sub(r'<img\b[^>]*class=["\x27][^"\x27]*\bcover\b[^"\x27]*["\x27][^>]*>',lambda _:img,text,count=1,flags=re.I)
  else:text=text.replace('</h1>','</h1>'+img,1)
  text=re.sub(r'<p\b[^>]*class=["\x27][^"\x27]*media-credit[^"\x27]*["\x27][^>]*>.*?</p>','',text,flags=re.S)
  notice=x.get('credit_notice')
  if notice:
   nurl=x.get('credit_url') or source
   credit='<p class="src media-credit">'+escape(notice).replace('{url}','<a href="'+escape(nurl,quote=True)+'">'+escape(nurl)+'</a>')+'</p>'
  else:
   credit='<p class="src media-credit">'+label+' hosted by its publisher. <a href="'+escape(source,quote=True)+'">Official source</a>. Independent guide, not affiliated or sponsored. Artwork and trademarks belong to their owners.</p>'
  text=text.replace(img,img+credit,1)
  video=x.get('embed_url','');watch=x.get('video_url','')
  if video.startswith('https://www.youtube.com/embed/') and watch.startswith('https://'):
   title=x.get('video_title','Official publisher video');video=video.replace('www.youtube.com/embed/','www.youtube-nocookie.com/embed/')
   panel='<figure class="official-video" style="margin:24px 0"><iframe src="'+escape(video,quote=True)+'" title="'+escape(title,quote=True)+'" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen style="width:100%;aspect-ratio:16/9;border:0;border-radius:12px"></iframe><figcaption class="src">Official publisher video: '+escape(title)+'. <a href="'+escape(watch,quote=True)+'">Watch on YouTube</a>. Published by <a href="'+escape(x.get('video_channel_url',''),quote=True)+'">'+escape(x.get('video_channel','publisher'))+'</a>. Independent guide, not sponsored.</figcaption></figure>'
   text=text.replace(credit,credit+panel,1)

  # Do not label a generic homepage asset as a picture of the feature discussed.
  for oldurl in old[:1]:
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
   row['image']=applied[slug]['image'] if slug in applied else None
  ledger.write_text(json.dumps(rows,ensure_ascii=False,indent=2))
 return applied
