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
EYE PATCH v7 (male + spine patch ke upar; final html me teeno included)

Option A (easy): human-atlas-3d.html ko public/ aur gh-pages dono me replace karo.
Option B (split): python3 apply_eye_patch.py public/human-atlas-3d.html -> human-atlas-3d.eye.html
  (sirf code ADD hota hai, purana eye code same rehta hai; Eye mesh par openDV ko wrap karta hai)

Files:
 05-eye-core-root.js : nested navigation (EYX), Light toggle, root scene (OFF = bahar se aankh, ON = cross-section + rays)
 06-eye-anterior.js  : cornea > stroma | iris > light reflex | lens > aqueous (glaucoma)
 07-eye-retina.js    : retina > rod > cascade | retina > ON/OFF | fundus (blind spot) > visual pathway
 08-eye-orbit.js     : extraocular muscles + nerves > orbit bones

Kaise chalta hai: part select karo, info card me "Open inside" dabao -> next level. X button ek level peeche.
JAW + BRAIN PATCH v8 (male + spine + eye + ye; final html me sab included)

Option A: human-atlas-3d.html ko public/ aur gh-pages dono me replace karo.
Option B: python3 apply_jaw_brain_patch.py public/human-atlas-3d.html -> human-atlas-3d.v8.html

1. 09-jaw-gross.js : proper mandible (body, alveolar process, angle, ramus, coronoid, condyle, chin). TMJ hotspot ab dono condyles par (chhota).
2. 10-jaw-detail.js: Mandible par tap = Kenhub-style landmarks (13 parts). TMJ par tap = sagittal cross-section:
   fossa + eminence, condyle, disc (3 regions), 2 compartments, bilaminar zone, capsule, ligaments, lateral pterygoid, muscles, nerve.
   Buttons: Mouth open/closed, Disc normal/displaced (click).
3. 11-brain-slices.js: Cerebrum/Cerebellum/Brainstem par tap = brain cross-section: Axial (2 levels), Sagittal, Coronal + MRI(T1) toggle.
