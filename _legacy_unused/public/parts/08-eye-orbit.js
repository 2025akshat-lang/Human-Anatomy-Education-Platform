/* ---- v7 EYE: muscles, nerves and orbit bones (muscles > orbit) ---- */
{
const SPH=(a,m,r)=>[r*Math.sin(a)*Math.cos(m),r*Math.sin(a)*Math.sin(m),r*Math.cos(a)];
/* ---------- MUSCLES (right eye, oblique view) ---------- */
EYX.N.muscles=['Extraocular muscles',c=>{
 const {ad,tb,sp,bx,lb,txt}=c,M={},
  PG=part('Globe','Eyeball (right eye, seen from the front-lateral side).',1),
  mu=(key,name,info,pts,col,r)=>{const P=part(name,info,1);M[key]={P,m:tb(pts,r||.1,col,P,.95),col};return P},
  RD=0xc0504a,OR=0xd9803a;
 sp(0,0,0,1,1,1,0xf2eee6,PG,.92);sp(0,0,.97,.3,.3,.05,0x4aa3a8,PG,.98);
 mu('sr','Superior rectus','Origin: annulus of Zinn. Insertion: superior sclera. Action: ELEVATES (+ adducts, intorts). Nerve: CN III (superior division).',[[0,.22,-2.8],[0,.5,-1.8],SPH(2.5,1.5708,1.1),SPH(1.8,1.5708,1.08),SPH(1.0,1.5708,1.05)],RD);
 mu('ir','Inferior rectus','Origin: annulus of Zinn. Insertion: inferior sclera. Action: DEPRESSES (+ adducts, extorts). Nerve: CN III (inferior division). Trapped in blow-out fractures.',[[0,-.22,-2.8],[0,-.5,-1.8],SPH(2.5,-1.5708,1.1),SPH(1.8,-1.5708,1.08),SPH(1.0,-1.5708,1.05)],RD);
 mu('lr','Lateral rectus','Origin: annulus of Zinn. Insertion: lateral sclera. Action: ABDUCTS. Nerve: CN VI (abducens): LR6.',[[.22,0,-2.8],[.5,0,-1.8],SPH(2.5,0,1.1),SPH(1.8,0,1.08),SPH(1.0,0,1.05)],RD);
 mu('mr','Medial rectus','Origin: annulus of Zinn. Insertion: medial sclera. Action: ADDUCTS (strongest rectus). Nerve: CN III (inferior division).',[[-.22,0,-2.8],[-.5,0,-1.8],SPH(2.5,3.1416,1.1),SPH(1.8,3.1416,1.08),SPH(1.0,3.1416,1.05)],RD);
 mu('so','Superior oblique','Origin: sphenoid (near the annulus). Runs forward through the TROCHLEA (pulley), then back-laterally under the superior rectus. Action: INTORTS, depresses (when adducted), abducts. Nerve: CN IV (trochlear): SO4.',[[-.2,.2,-2.8],[-.45,.75,-1.4],[-.6,.98,.2],[-.62,1.0,.78],[-.2,1.06,.3],[.4,.95,-.05],[.81,.56,-.34]],OR,.075);
 mu('io','Inferior oblique','Origin: maxilla (orbital floor, anterior-medial). Passes under the globe to the posterior-lateral sclera. Action: EXTORTS, elevates (when adducted), abducts. Nerve: CN III (inferior division).',[[-.62,-.95,.7],[-.2,-1.12,.05],[.35,-1.0,-.3],[.59,-.74,-.43]],OR,.075);
 mu('lv','Levator palpebrae superioris','Origin: lesser wing of sphenoid. Inserts into the upper eyelid tarsus. Elevates the upper lid. Nerve: CN III (superior division). Palsy = ptosis.',[[0,.45,-2.6],[0,1.25,-.8],[0,1.45,.7],[0,1.1,1.25]],0xe8a0a0,.07);
 sp(-.62,1.0,.78,.07,.07,.04,0xf2e08a,PG,.95);
 const PZ=part('Annulus of Zinn','Fibrous ring at the orbital apex: origin of the four recti. Optic nerve + CN III, VI + nasociliary pass through it.',1);ad(new T.TorusGeometry(.3,.05,8,24),0xe8dcc0,0,0,-2.8,{op:.95},PZ);
 const PO=part('Optic nerve (CN II)','Passes through the optic canal and the annulus of Zinn. Tap for the visual pathway.',1,'E:nerve');tb([[0,0,-.98],[0,0,-1.8],[0,0,-3.7]],.11,0xf2e08a,PO,.95);
 const P3=part('Oculomotor nerve (CN III)','Superior division: SR + levator. Inferior division: MR, IR, IO + parasympathetic to the ciliary ganglion (pupil + accommodation). Palsy = "down and out" eye + ptosis + dilated pupil.',1);
 const P4=part('Trochlear nerve (CN IV)','Thinnest, longest intracranial course; the only nerve leaving the brainstem dorsally. Supplies the superior oblique.',1);
 const P6=part('Abducens nerve (CN VI)','Supplies the lateral rectus; long course = vulnerable to raised intracranial pressure. Palsy = cannot abduct, convergent squint.',1);
 const J=[0,0,-3.3];
 tb([J,[0,.3,-2.2],[0,.66,-.9]],.02,0xf2e08a,P3,.95);tb([J,[0,-.3,-2.2],[0,-.66,-.9]],.02,0xf2e08a,P3,.95);tb([J,[-.3,0,-2.2],[-.66,0,-.9]],.02,0xf2e08a,P3,.95);tb([[0,-.5,-2.3],[-.3,-.9,-.2],[-.4,-1.02,.3]],.02,0xf2e08a,P3,.95);
 tb([[-.1,.3,-3.4],[-.4,.8,-1.8],[-.5,.98,-.3]],.02,0x8bd28b,P4,.95);tb([[.1,0,-3.4],[.5,0,-2.4],[.75,0,-1.4]],.02,0x7fb2ff,P6,.95);
 const PB=part('Orbital walls (bones)','Bony pyramid: roof = frontal, floor = maxilla + zygomatic + palatine, medial = ethmoid + lacrimal, lateral = zygomatic + greater wing of sphenoid. Tap for bones + foramina.',1,'E:orbit');
 bx(0,1.6,-1.2,2.4,.06,3.8,0xe9dfa8,PB,.13);bx(0,-1.6,-1.2,2.4,.06,3.8,0xd8c3a0,PB,.13);bx(1.5,0,-1.2,.06,3.2,3.8,0xe0d0c0,PB,.13);bx(-1.5,0,-1.2,.06,3.2,3.8,0xd0e0d0,PB,.13);
 EYX.gz=0;const GZ=[['Look RIGHT: right LR + left MR (yoked pair)',['lr']],['Look LEFT: right MR + left LR',['mr']],['Look UP: SR + IO (both eyes elevate)',['sr','io']],['Look DOWN: IR + SO (both eyes depress)',['ir','so']]];
 EYX.btn.eygz=b=>{EYX.gz=(EYX.gz+1)%4;b.textContent=GZ[EYX.gz][0].split(':')[0]};
 fx.push(s=>{const a=GZ[EYX.gz][1],w=.5+.5*Math.sin(s*5);Object.keys(M).forEach(k=>M[k].m.material.color.setHex(a.includes(k)?(w>.5?0xff9a8a:0xff5a4a):M[k].col));txt(GZ[EYX.gz][0]+' (button se badlein)')});
 lb([['SR',[0,1.05,-1.3]],['IR',[0,-1.05,-1.3]],['LR',[1.0,0,-1.8]],['MR',[-1.0,0,-1.8]],['SO',[-.35,1.25,.0]],['IO',[-.2,-1.3,.2]],['Trochlea',[-.9,1.2,.8]],['Optic nerve',[.4,.3,-3.4]],['Annulus of Zinn',[.7,.5,-2.8]],['Levator',[.5,1.5,.7]]]);
 return {t:'Extraocular muscles + nerves',s:'Gaze button: kaun si muscle kaam karti hai | LR6 SO4 AO3',rd:8,rm:12.5,cam:[.6,.25],tg:[0,0,-1],ex:'<button id="eygz" class="on">Look RIGHT</button>'}}];

/* ---------- ORBIT: bones + foramina ---------- */
EYX.N.orbit=['Orbit bones',c=>{
 const {ad,tb,sp,bx,lb,txt}=c,
  PF=part('Frontal bone (roof)','Orbital roof + supraorbital margin; holds the lacrimal gland fossa and the trochlear pit. Supraorbital notch/foramen: supraorbital nerve (V1).',1),
  PZ=part('Zygomatic bone (lateral wall + rim)','Strong lateral rim + part of the lateral wall (with the greater wing of sphenoid). Zygomatic fracture can flatten the cheek and cause diplopia.',1),
  PM=part('Maxilla + palatine (floor)','Thin floor over the maxillary sinus: "blow-out" fracture lets the inferior rectus/orbital fat herniate = diplopia on up-gaze, infraorbital numbness.',1),
  PE=part('Ethmoid + lacrimal (medial wall)','Lamina papyracea (paper-thin ethmoid) = easy spread of sinus infection (orbital cellulitis). Lacrimal bone holds the lacrimal sac fossa.',1),
  PS=part('Sphenoid (apex + lesser/greater wings)','Forms the apex with the optic canal (lesser wing) and the superior orbital fissure between the two wings.',1),
  PA=part('Optic canal','CN II + ophthalmic artery (in the lesser wing of sphenoid).',1),
  PB=part('Superior orbital fissure','CN III, IV, VI, ophthalmic division V1 (lacrimal, frontal, nasociliary) + superior ophthalmic vein. Injury = ophthalmoplegia + ptosis + dilated pupil.',1),
  PI=part('Inferior orbital fissure','Maxillary nerve V2 (zygomatic branch), infraorbital vessels, inferior ophthalmic vein tributaries; continues as the infraorbital canal.',1),
  PN=part('Infraorbital foramen','Exit of the infraorbital nerve (V2) on the maxilla ~1 cm below the rim: sensation of cheek + upper lip.',1),
  PL=part('Nasolacrimal canal','Tears drain: puncta > canaliculi > lacrimal sac > nasolacrimal duct > inferior meatus of the nose. Blocked duct = watering eye (epiphora).',1),
  plate=(a,b,w,col,P,vert)=>{const m=ad(new T.BoxGeometry(w,.08,1),col,(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2,{op:.55},P);m.lookAt(V3(b));if(vert)m.rotateZ(Math.PI/2);m.scale.z=Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2]);return m};
 plate([0,.95,1.2],[0,.15,-2.8],1.7,0xe9dfa8,PF);plate([0,-.8,1.2],[0,-.15,-2.8],1.5,0xd8b890,PM);plate([-.85,0,1.2],[-.2,0,-2.8],1.4,0xb8e0c0,PE,1);plate([.9,0,1.2],[.25,0,-2.8],1.4,0xd8b8e8,PZ,1);
 bx(0,0,-2.9,.9,.9,.1,0xf0b0a0,PS,.6);
 ad(new T.TorusGeometry(.1,.025,8,20),0xffd24a,-.15,.2,-2.84,{op:1},PA);ad(new T.TorusGeometry(.1,.025,8,20),0x6fe0a0,.15,-.05,-2.84,{op:1,s:[2.2,.6,1]},PB);
 tb([[.55,-.5,-1.2],[.35,-.35,-2.0],[.25,-.25,-2.8]],.035,0x6fb0ff,PI,.95);ad(new T.TorusGeometry(.07,.02,8,16),0xff9f60,0,-1.0,1.25,{op:1},PN);ad(new T.TorusGeometry(.07,.02,8,16),0xffe36a,-.3,.97,1.25,{op:1},PF);
 tb([[-.75,-.35,1.0],[-.75,-.8,.9],[-.7,-1.5,.5]],.04,0x6fe0e8,PL,.95);
 lb([['Frontal',[0,1.2,.0]],['Zygomatic',[1.35,0,.2]],['Maxilla (floor)',[0,-1.2,.2]],['Ethmoid + lacrimal',[-1.5,.35,.3]],['Sphenoid',[0,.8,-2.9]],['Optic canal',[-.6,.5,-2.9]],['SOF',[.7,-.35,-2.9]],['IOF',[.8,-.65,-1.8]],['Infraorbital foramen',[0,-1.3,1.3]],['Nasolacrimal canal',[-1.1,-1.0,.9]]]);
 txt('Orbit = 7 bones: frontal, zygomatic, maxilla, sphenoid, ethmoid, lacrimal, palatine');
 return {t:'Orbit: 7 bones + openings',s:'Bony pyramid + foramina | part par tap karein',rd:8,rm:12.5,cam:[.5,.3],tg:[0,0,-.8]}}];
}
