#!/usr/bin/env python3
"""v8 patch: proper mandible (gross) + TMJ cross-section + mandible landmarks + brain cross-sections (axial/sagittal/coronal + MRI toggle).
Usage: python3 apply_jaw_brain_patch.py human-atlas-3d.html -> human-atlas-3d.v8.html  (run AFTER male + spine + eye patches).
Touches: crude 'Mandible' pieces (3 places), TMJ hotspot (1 entry -> 2, smaller), and ADDS parts 10 + 11 before '/* ---- CAPTION + DRAG ---- */'."""
import sys, os, re
src = sys.argv[1] if len(sys.argv) > 1 else 'human-atlas-3d.html'
here = os.path.dirname(os.path.abspath(__file__))
rd = lambda f: open(os.path.join(here, 'parts', f), encoding='utf-8').read().rstrip('\n')
out = open(src, encoding='utf-8').read()

def sub1(old, new):
    global out
    assert out.count(old) == 1, ('not found / not unique', old[:70], out.count(old))
    out = out.replace(old, new)

# 1) old crude mandible pieces
sub1("bn(bx(.5,.12,.4),0,8.0,.28,'Mandible','Only movable skull bone. Largest and strongest facial bone.');\n", "")
sub1(" bn(bx(.04,.28,.1),s*.24,8.12,.12,'Mandible','Only movable skull bone; ramus, angle, condyle (TMJ).')});", " });")
old = "bn(new T.TorusGeometry(.3,.03,8,16,Math.PI),0,7.97,.15,'Mandible','Only movable skull bone; strongest facial bone; body + 2 rami.',{s:[.8,1,1],r:[Math.PI/2,0,0]});"
sub1(old, rd('09-jaw-gross.js'))

# 2) TMJ hotspots: one entry at the midline -> one on each condyle, smaller spheres
m = re.search(r" \[0,8\.15,\.42,'Temporomandibular joint',('(?:[^'\\]|\\.)*')\],\n", out)
assert m, 'TMJ hotspot entry'
info = m.group(1)
out = out.replace(m.group(0), " [-.32,8.25,.05,'Temporomandibular joint'," + info + "],\n [.32,8.25,.05,'Temporomandibular joint'," + info + "],\n")
sub1("const jointHotspot=(x,y,z,n,i)=>{const m=mk(G.bones,sp(.085),0x55dce5,x,y,z,n,i);",
     "const jointHotspot=(x,y,z,n,i)=>{const m=mk(G.bones,sp(.085),0x55dce5,x,y,z,n,i,/^Temporomandibular/.test(n)?{s:[.6,.6,.6]}:{});")

# 3) new detail nodes
anchor = "})();\n/* ---- CAPTION + DRAG ---- */"
assert out.count(anchor) == 1, 'IIFE end anchor'
out = out.replace(anchor, rd('10-jaw-detail.js') + "\n" + rd('11-brain-slices.js') + "\n" + anchor)

dst = os.path.join(os.path.dirname(os.path.abspath(src)), 'human-atlas-3d.v8.html')
open(dst, 'w', encoding='utf-8').write(out); print('written', dst)
