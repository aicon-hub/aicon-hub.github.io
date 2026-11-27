from pathlib import Path
import re
def apply(out):
 for p in out.rglob('*.html'):
  rel=str(p.relative_to(out))
  if rel.startswith(('assets/','ml/','preview-2026/')):continue
  t=p.read_text()
  if '<head' not in t or 'http-equiv="refresh"' in t:continue
  t=t.replace('</head>','<link rel="stylesheet" href="/assets/funded-discovery.css?v=20261127preview"/></head>',1)
  m=re.search(r'<nav\b[^>]*aria-label="Main"[^>]*>',t)
  if m and 'href="/funded/"' not in t[m.end():t.find('</nav>',m.end())]:t=t[:m.end()]+'<a href="/funded/">Funded Abroad</a>'+t[m.end():]
  if '</footer>' in t:t=t.replace('</footer>','<div class="fd-footer"><a href="/funded/">Funded Abroad</a> · Official programmes for Indians</div></footer>',1)
  p.write_text(t)
