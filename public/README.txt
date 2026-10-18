MALE REPRODUCTIVE PATCH (baaki code untouched)

Option A (easy): human-atlas-3d.html ko repo ki public/human-atlas-3d.html se replace karo.
Option B (split): python3 apply_patch.py public/human-atlas-3d.html
  -> human-atlas-3d.patched.html banegi, original wahi rehti hai.

Kya badla (sirf 4 jagah):
 1. parts/01-male-gross.js: gross scene ka male block (prostate, seminal vesicle, ampulla,
    ejaculatory duct, vas ka sahi raasta, epididymis, bulb + crura, translucent penis, glans).
    Bug fix: tunica/scrotal opacity ko paint() reset kar deta tha (bade solid gole);
    ab userData.op me save hota hai.
 2. parts/02-male-cutaway.js: maleRepDV() naya - anterior plate (reference image jaisa):
    bladder + ureters, SV, ampulla, ejaculatory duct, prostate zones, bulbourethral glands,
    perineal membrane, bulb, crura, 2 corpora cavernosa + spongiosum + urethra + glans,
    testis + epididymis + vas + cord, 15 labels.
 3. routing regex me |Ejaculatory|testicular artery add (1 line).
 4. cutaway title: sagittal -> anterior educational plate (1 line).
Mesh names purane hi rakhe (quiz/routing na toote). Micro codes rt, rp same.
