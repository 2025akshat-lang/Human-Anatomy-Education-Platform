#!/usr/bin/env python3
"""v9 patch: male + female reproductive (cross-sections, Book<->Body morph), sex-education awareness nodes.
Usage: python3 apply_repro_patch.py human-atlas-3d.html -> human-atlas-3d.v9.html  (run AFTER the eye + jaw/brain patches).
Only ADDS code (parts 12-14) before '/* ---- CAPTION + DRAG ---- */' and wraps window.openDV for male/female reproductive names."""
import sys, os
src = sys.argv[1] if len(sys.argv) > 1 else 'human-atlas-3d.html'
here = os.path.dirname(os.path.abspath(__file__))
code = '\n'.join(open(os.path.join(here, 'parts', f), encoding='utf-8').read().rstrip('\n') for f in ['12-repro-female.js', '13-repro-male.js', '14-sexed-awareness.js'])
out = open(src, encoding='utf-8').read()
anchor = "})();\n/* ---- CAPTION + DRAG ---- */"
assert out.count(anchor) == 1, 'IIFE end anchor not found'
assert 'EYX.N.brain' in out, 'run the eye + jaw/brain patches first'
out = out.replace(anchor, code + "\n" + anchor)
dst = os.path.join(os.path.dirname(os.path.abspath(src)), 'human-atlas-3d.v9.html')
open(dst, 'w', encoding='utf-8').write(out); print('written', dst)
