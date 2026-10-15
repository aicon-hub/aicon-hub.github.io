"""Build-time navigation metadata and beginner-friendly AiCoN introduction."""
from pathlib import Path
import re,json
from html import escape,unescape

def enrich(out):
 index=out/'posts/index.html';text=index.read_text()
 def classify(m):
  li=m[0];a=re.search(r'<a[^>]*href=["\x27]([^"\x27]+)["\x27][^>]*>(.*?)</a>',li,re.S)
  if not a:return li
  title=unescape(re.sub('<[^>]+>','',a[2])).lower();tagm=re.search(r'<small[^>]*class=["\x27]tag["\x27][^>]*>(.*?)</small>',li,re.S);tag=unescape(tagm[1]).lower() if tagm else '';keys=[]
  assigned=re.search(r'data-categories=["\x27](.*?)["\x27]',li)
  if assigned:keys.extend(assigned[1].split())
  mapping={'ai':r'ai|coding|developer|open model|data science|design tools|cloud tools|creator tools','apps':r'app|music|video editing|wellbeing|productivity|meal planning|travel planning|accessibility|nature|learning|study|voice|browser|photo editing|meetings|writing|android','safety':r'safety|security|privacy','scholarships':r'scholarship','government':r'govt|government|public service|insurance scheme|pension scheme|banking scheme|business loans|kerala jobs|student challenge','events':r'hackathon|contest|challenge|events','pc-tools':r'pc tools|pc software|desktop software','linux':r'linux distro|linux distribution'}
  for k,pat in mapping.items():
   if re.search(pat,tag):keys.append(k)
  if a[1] in ['resourify-student-digital-deals-check-guide.html','zoho-catalyst-students-free-cloud-project-guide.html','zoho-notebook-ai-student-plan-guide.html','elevenlabs-students-free-elevenreader-ultra-guide.html']:keys.append('offers')
  # New generic badges carry no platform, so read the guide's own text.
  p=out/'posts'/a[1];body=p.read_text().lower() if p.exists() else ''
  if re.search(r'linux mint|ubuntu|zorin|fedora|debian|linux distribution',title):keys.extend(['linux','pc-tools'])
  if re.search(r'gimp|joplin|typst|musescore|qgis|handbrake|notepad|gnucash|7-zip|kstars|calibre|libreoffice|vlc|blender|krita|inkscape|obs studio|audacity|desktop|windows|pc ',title):keys.append('pc-tools')
  if re.search(r'f-droid|scratch|kde connect|tux paint|organic maps|kiwix|bitwarden|android|phone|app\b',title):keys.append('apps')
  if 'free resource' in tag or 'free learning' in tag:keys.append('learning')
  if not keys:keys.append('other')
  li=re.sub(r'\sdata-categories=["\x27].*?["\x27]','',li);return li.replace('<li','<li data-categories="'+' '.join(sorted(set(keys)))+'"',1)
 text=re.sub(r'<li\b[^>]*>.*?</li>',classify,text,flags=re.S)
 text=text.replace('<option value="">All posts</option>','<option value="">All posts</option><option value="learning">Learning &amp; resources</option><option value="other">More guides</option>')
 text=text.replace('PC Tools &amp; Softwares','PC tools &amp; software');index.write_text(text)
 # Visible search and beginner introduction, while preserving existing wordmark.
 home=out/'index.html';text=home.read_text();text=text.replace('<h1>Tech, AI and government help,<br/>checked before you click</h1>','<h1>Useful tech. Clear answers.</h1>')
 search='<form class="hero-search" action="posts/index.html" method="get"><label for="discover">Find a guide</label><div><input id="discover" name="q" type="search" placeholder="Try GIMP, scholarships or privacy"/><button class="button primary" type="submit">Search</button></div></form>'
 text=text.replace('<div class="actions">',search+'<div class="actions">',1)
 text=text.replace('href="#about">About','href="posts/about-aicon.html">About')
 text=text.replace('href="index.html#about">About','href="posts/about-aicon.html">About')
 text=text.replace('PC Tools &amp; Softwares','PC tools &amp; software')
 text=text.replace('<section class="shell policy-section" id="verification">','<section class="shell policy-section" id="meet-aicon"><h2>New to AiCoN?</h2><p>AiCoN is a free guide to useful tech, AI tools, apps, scholarships and government services for people in India and Kerala. We explain what a tool does, what it costs, how to start and what to watch out for.</p><a class="text-link" href="posts/about-aicon.html">What is AiCoN? →</a></section><section class="shell policy-section" id="verification">')
 home.write_text(text)
 for p in (out/'posts').glob('*.html'):
  text=p.read_text().replace('Every tool and link verified before sharing.','Every guide shows what we checked.')
  if p.name not in ['about-aicon.html','_template.html','article-template.html']:
   text=text.replace('</nav>','<a href="about-aicon.html">About AiCoN</a></nav>',1)
  p.write_text(text)
