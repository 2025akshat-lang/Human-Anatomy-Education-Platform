#!/usr/bin/env python3
"""Eye patch v7: nested eye atlas (Light toggle + cross-section + 11 nested nodes).
Usage: python3 apply_eye_patch.py human-atlas-3d.html -> human-atlas-3d.eye.html (original untouched).
Run AFTER male + spine patches. Adds code only: parts/05..08 are inserted before '/* ---- CAPTION + DRAG ---- */'."""
import sys, os
src = sys.argv[1] if len(sys.argv) > 1 else 'human-atlas-3d.html'
here = os.path.dirname(os.path.abspath(__file__))
code = '\n'.join(open(os.path.join(here, 'parts', f), encoding='utf-8').read().rstrip('\n') for f in ['05-eye-core-root.js','06-eye-anterior.js','07-eye-retina.js','08-eye-orbit.js'])
out = open(src, encoding='utf-8').read()
anchor = "})();\n/* ---- CAPTION + DRAG ---- */"
assert out.count(anchor) == 1, 'IIFE end anchor not found'
out = out.replace(anchor, code + "\n" + anchor)
dst = os.path.join(os.path.dirname(os.path.abspath(src)), 'human-atlas-3d.eye.html')
open(dst, 'w', encoding='utf-8').write(out); print('written', dst)
