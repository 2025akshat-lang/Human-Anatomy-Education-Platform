#!/usr/bin/env python3
"""v11: Kidney physiology module (hub + 13 scenes). Usage: python3 apply_renal_patch.py human-atlas-3d.html -> human-atlas-3d.v11.html
Run AFTER the Batch 1 (v10) patch. Only ADDS code."""
import sys, os
src = sys.argv[1] if len(sys.argv) > 1 else 'human-atlas-3d.html'
here = os.path.dirname(os.path.abspath(__file__))
code = open(os.path.join(here, 'parts', '16-renal.js'), encoding='utf-8').read().rstrip('\n')
out = open(src, encoding='utf-8').read()
anchor = "})();\n/* ---- CAPTION + DRAG ---- */"
assert out.count(anchor) == 1, 'IIFE end anchor not found'
assert 'EYX.libAdd=' in out, 'run the Batch 1 (v10) patch first'
out = out.replace(anchor, code + "\n" + anchor)
dst = os.path.join(os.path.dirname(os.path.abspath(src)), 'human-atlas-3d.v11.html')
open(dst, 'w', encoding='utf-8').write(out); print('written', dst)
