#!/usr/bin/env python3
"""Male reproductive anatomy patch for human-atlas-3d.html
Usage: python3 apply_patch.py path/to/human-atlas-3d.html   (writes human-atlas-3d.patched.html, original untouched)
Replaces ONLY: (1) gross male block, (2) maleRepDV() cutaway, (3) mr regex (+Ejaculatory), (4) cutaway title."""
import sys, os
src = sys.argv[1] if len(sys.argv) > 1 else 'human-atlas-3d.html'
here = os.path.dirname(os.path.abspath(__file__))
rd = lambda p: open(os.path.join(here, 'parts', p), encoding='utf-8').read()
L = open(src, encoding='utf-8').read().split('\n')

def find(prefix, start=0):
    for i in range(start, len(L)):
        if L[i].startswith(prefix): return i
    raise SystemExit('marker not found: ' + prefix)

# 1) gross block: from Prostate line to last bulbourethral line
a = find("sexm(G.male,sp(.11),0xd89a82,0,3.36,.08,'Prostate gland'")
b = find("[-1,1].forEach(s=>sexm(G.male,sp(.026),0xe5b870", a)
L[a:b+1] = rd('01-male-gross.js').rstrip('\n').split('\n')

# 2) cutaway builder
a = find("const maleRepDV=()=>")
b = find("const pregnancyDV=()=>", a)
L[a:b] = rd('02-male-cutaway.js').rstrip('\n').split('\n')

out = '\n'.join(L)
# 3) routing regex + 4) title
old = "bulbourethral|pampiniform/i.test(n)"
assert out.count(old) == 1, 'routing regex not found'
out = out.replace(old, "bulbourethral|pampiniform|Ejaculatory|testicular artery/i.test(n)")
old = "Male pelvis — sagittal educational plate<small>Procedural geometry · anatomical relationships, not a diagnostic model</small>"
assert out.count(old) == 1, 'title not found'
out = out.replace(old, "Male reproductive system — anterior educational plate<small>Bladder · ureters · accessory glands · testis · penis | procedural geometry, not diagnostic</small>")
dst = os.path.join(os.path.dirname(os.path.abspath(src)), 'human-atlas-3d.patched.html')
open(dst, 'w', encoding='utf-8').write(out)
print('written', dst)
