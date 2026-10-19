#!/usr/bin/env python3
"""Spine patch: natural curvature + tilted vertebrae + golden vertebra zoom view.
Usage: python3 apply_spine_patch.py human-atlas-3d.html   -> writes human-atlas-3d.spine.html (original untouched)
Touches ONLY: vertebra loop, cordPath array, intervertebral-disc line, and adds openVT() before '/* ---- CAPTION + DRAG ---- */'."""
import sys, os
src = sys.argv[1] if len(sys.argv) > 1 else 'human-atlas-3d.html'
here = os.path.dirname(os.path.abspath(__file__))
rd = lambda p: open(os.path.join(here, 'parts', p), encoding='utf-8').read().rstrip('\n')
L = open(src, encoding='utf-8').read().split('\n')

# 1) vertebra loop
a = next(i for i, l in enumerate(L) if l == 'for(let i=0;i<24;i++){' and L[i+1].startswith(' const y=i<7?7.75-i*.12'))
b = next(i for i in range(a, a+10) if L[i].startswith(' bn(cy(r,.1),0,y,-.12,n,inf)}'))
L[a:b+1] = rd('03-spine-gross.js').split('\n')
out = '\n'.join(L)

# 2) spinal cord follows the canal
old = "const cordPath=[[0,8.18,-.1],[0,7.7,-.18],[0,7.05,-.28],[0,6.35,-.25],[0,5.65,-.17],[0,5.05,-.22]],cordZ="
assert out.count(old) == 1, 'cordPath not found'
out = out.replace(old, "const cordPath=[[0,8.18,-.1]].concat([7.7,7.05,6.35,5.65,5.05].map(y=>[0,y,canalZ(y)])),cordZ=")

# 3) discs follow the curve
pre = "for(let i=1;i<24;i++)mk(G.bones,cy((i<7?.1:i<19?.13:.17)*1.12,.035),0x8fb8d0,0,i<23?(xY(i)+xY(i+1))/2:4.12,-.12,'Intervertebral disc',"
M = out.split('\n'); k = next(i for i, l in enumerate(M) if l.startswith(pre)); line = M[k]
assert line.endswith("');"), 'disc line ending'
M[k] = "for(let i=1;i<24;i++){const ym=i<23?(xY(i)+xY(i+1))/2:4.12;mk(G.bones,cy((i<7?.1:i<19?.13:.17)*1.12,.035),0x8fb8d0,0,ym,spZ(ym),'Intervertebral disc'," + line[len(pre):-2] + ",{s:[1.1,1,.8],r:[spTilt(ym),0,0]})}"
out = '\n'.join(M)

# 4) vertebra zoom view inside the detail IIFE
anchor = "})();\n/* ---- CAPTION + DRAG ---- */"
assert out.count(anchor) == 1, 'IIFE end anchor not found'
out = out.replace(anchor, rd('04-vertebra-detail.js') + "\n" + anchor)

dst = os.path.join(os.path.dirname(os.path.abspath(src)), 'human-atlas-3d.spine.html')
open(dst, 'w', encoding='utf-8').write(out); print('written', dst)
