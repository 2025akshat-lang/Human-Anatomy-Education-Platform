/* ---- v9: FEMALE reproductive: root (Book <-> Real body morph) > uterus | ovary | tube ---- */
{
const SMC=(pts,n)=>new T.CatmullRomCurve3(pts.map(p=>V3([p[0],p[1],0])),true,'catmullrom',.5).getPoints(n).map(p=>[p.x,p.y]);
const ELL=(cx,cy,rx,ry,rot,n)=>{const p=[];n=n||28;for(let i=0;i<n;i++){const t=i/n*6.2832,x=rx*Math.cos(t),y=ry*Math.sin(t);p.push([cx+x*Math.cos(rot||0)-y*Math.sin(rot||0),cy+x*Math.sin(rot||0)+y*Math.cos(rot||0)])}return p};
const SYM=R=>R.concat(R.slice(1,-1).reverse().map(p=>[-p[0],p[1]]));
const SCL=(pts,cx,cy,k)=>pts.map(p=>[cx+(p[0]-cx)*k,cy+(p[1]-cy)*k]);
let RO=1;
const SHP=(c,pts,col,P,op,smooth)=>{const q=smooth?SMC(pts,pts.length*6):pts,m=c.ad(new T.ShapeGeometry(new T.Shape(q.map(p=>new T.Vector2(p[0],p[1])))),col,0,0,0,{op:op||.95},P);m.renderOrder=RO++;return m};
EYX.h={SMC,ELL,SYM,SCL,SHP};
const lerp=(a,b,u)=>a+(b-a)*u,grow=(m,u)=>{const b=m.userData.b0||(m.userData.b0=m.scale.clone());m.scale.set(b.x*u,b.y*u,b.z*u);m.visible=u>.02};
EYX.fu=0;EYX.fb=false;

/* ---------- ROOT: textbook (coronal, flat) <-> real body (sagittal, tilted) ---------- */
EYX.N.frepro=['Female reproductive',c=>{
 const {ad,tb,sp,bx,cy,lb,txt,EG}=c,tgt=EYX.fb?1:0,
  PU=part('Uterus','Pear-shaped muscular organ (~7.5 x 5 x 2.5 cm). In the real body it is ANTEVERTED + ANTEFLEXED: it leans forward over the bladder. Tap to open the cross-section (3 layers + cycle).',1,'E:uterus'),
  PX=part('Cervix','Lower neck of the uterus (~3 cm) projecting into the vagina; endocervical canal with mucus. Pap smear samples the transformation zone.',1,'E:uterus'),
  PV=part('Vagina','Muscular tube (~8-10 cm). In the body it slopes DOWN + FORWARD (about 60-70 degrees to the horizontal), not straight down as in the textbook.',1),
  PT=part('Fallopian (uterine) tubes','~10-12 cm tubes: fimbriae > ampulla (FERTILISATION site) > isthmus > intramural part. Book: spread sideways. Body: they arch backwards over the ovary. Tap for the egg journey.',1,'E:tube'),
  PO=part('Ovaries','Almond-sized (~3 x 2 x 1 cm): store eggs, make oestrogen + progesterone. Book: beside the uterus. Body: in the ovarian fossa on the lateral pelvic wall, behind + below the tubes. Tap for follicle stages.',1,'E:ovary'),
  PB=part('Urinary bladder','In FRONT of the uterus (the uterus rests on its top). Full bladder pushes the uterus back.',1),
  PUr=part('Urethra','Only ~4 cm in females (shorter than in males), opening in front of the vagina: why UTIs are commoner in females.',1),
  PR=part('Rectum + anus','BEHIND the vagina/uterus. The rectouterine pouch (of Douglas) lies between uterus and rectum: lowest point of the peritoneal cavity.',1),
  PD=part('Pouch of Douglas','Peritoneal pocket between uterus and rectum; fluid/pus/blood collects here (culdocentesis).',1),
  PS=part('Pubic symphysis + sacrum','Bony landmarks of the pelvis: symphysis in front, sacrum + coccyx behind. Pelvic inlet shape differs from males (wider, rounder).',1),
  PCl=part('Clitoris + labia (vulva)','External genital organs: clitoral glans + body, labia minora + majora, vestibule with urethral + vaginal openings.',1),
  PBk=part('Book vs body: how to read it','A textbook picture is a FRONT (coronal) slice with everything laid flat and symmetric. In the real body the organs are tilted, stacked front-to-back (bladder, uterus, rectum) and the ovaries sit behind the tubes. Use the View button to morph one into the other.',1),
  PH=part('Myths + facts (sex education)','I-pill, HIV/AIDS, masturbation, sperm formation, menstrual cycle. Tap to open.',1,'E:sexed');
 EYX.btn.eyfb=()=>{EYX.fb=!EYX.fb;EYX.show('frepro')};
 const mkG=()=>{const g=new T.Group();EG.add(g);return g},GU=mkG(),GV=mkG(),add2=(g,geo,col,x,y,z,o,P)=>add(geo,col,x,y,z,Object.assign({},o||{},{g}),P);
 add2(GU,new T.SphereGeometry(1,24,18),0xd9737f,0,.32,0,{s:[.36,.52,.22],op:.9},PU);add2(GU,new T.SphereGeometry(1,20,14),0xff9aa8,0,.3,0,{s:[.17,.34,.07],op:.85},PU);
 add2(GU,new T.CylinderGeometry(.13,.15,.42,20),0xcf6a78,0,-.1,0,{op:.95},PX);add2(GU,new T.CylinderGeometry(.03,.03,.44,8),0x5a1a24,0,-.1,0,{op:1},PX);
 add2(GV,new T.CylinderGeometry(.19,.19,1.0,22,1,true),0xe59aa4,0,-.5,0,{op:.5},PV);add2(GV,new T.CylinderGeometry(.09,.09,1.0,16),0x8a3a46,0,-.5,0,{op:.8},PV);add2(GV,new T.TorusGeometry(.2,.04,8,20),0xe59aa4,0,0,0,{r:[1.5708,0,0],op:.9},PV);
 const pose={u:EYX.fu};
 const BODY=[],bo=(m)=>{BODY.push(m);return m};
 const page=bo(bx(0,0,-.3,3.4,3.0,.02,0xffffff,PBk,.18));
 bo(sp(0,-.45,.85,.34,.3,.3,0xe6c15a,PB,.55));bo(tb([[0,-.72,.82],[0,-1.0,.84],[0,-1.25,.82]],.035,0xf2e08a,PUr,.95));
 bo(tb([[0,.3,-.9],[0,-.3,-.9],[0,-1.0,-.7],[0,-1.6,-.4]],.17,0xb86a5a,PR,.85));bo(ad(new T.TorusGeometry(.17,.05,8,16),0xd8a090,0,-1.62,-.38,{r:[1.5708,0,0],op:.95},PR));
 bo(sp(0,-.35,-.35,.1,.2,.1,0xff8f8f,PD,.4));
 bo(bx(0,-.85,1.32,.2,.55,.16,0xe9e2cf,PS,.95));bo(tb([[0,1.0,-1.35],[0,.3,-1.4],[0,-.5,-1.2],[0,-1.1,-.85]],.12,0xe9e2cf,PS,.95));
 bo(sp(0,-1.3,1.05,.05,.05,.05,0xf0a0a8,PCl,.98));[-1,1].forEach(s=>bo(sp(s*.14,-1.4,.8,.07,.3,.12,0xe8909a,PCl,.9)));
 const NT=12,tubes=[-1,1].map(s=>{const bk=new T.CatmullRomCurve3([[s*.22,.58,0],[s*.45,.8,0],[s*.7,.84,0],[s*.9,.64,0],[s*.98,.4,0]].map(V3)).getPoints(NT-1),by=new T.CatmullRomCurve3([[s*.25,-.12,.42],[s*.45,.12,.3],[s*.68,.1,0],[s*.8,-.1,-.12],[s*.78,-.2,-.2]].map(V3)).getPoints(NT-1),
  ch=[];for(let i=0;i<NT;i++)ch.push(ad(new T.SphereGeometry(1,10,8),0xf0a0b0,0,0,0,{s:[.03+.03*Math.sin(i/NT*3.1),.03+.03*Math.sin(i/NT*3.1),.03+.03*Math.sin(i/NT*3.1)],op:.95},PT));
  const fim=[0,1,2].map(k=>ad(new T.ConeGeometry(.03,.12,6),0xf5b8c4,0,0,0,{op:.95},PT)),ov=sp(0,0,0,.17,.11,.1,0xf0d98a,PO,.95),lg=ad(new T.CylinderGeometry(.012,.012,1,6),0xe8d49a,0,0,0,{op:.9},PO);
  return {s,bk,by,ch,fim,ov,lg}});
 const OB=[[1.02,.22,0],[.78,-.2,-.2]];
 fx.push(s=>{const tu=tgt;pose.u+=(tu-pose.u)*.045;const u=pose.u;EYX.fu=u;
  GU.position.set(0,lerp(-.45,-.5,u),lerp(0,.05,u));GU.rotation.x=lerp(0,.97,u);GV.position.copy(GU.position);GV.rotation.x=lerp(0,-.6,u);
  BODY.forEach(m=>grow(m,u));page.visible=u<.98;page.scale.set(1,1,1);page.material.opacity=.18*(1-u);
  tubes.forEach(t=>{t.ch.forEach((m,i)=>{const a=t.bk[i],b=t.by[i];m.position.set(lerp(a.x,b.x,u),lerp(a.y,b.y,u),lerp(a.z,b.z,u))});const e=t.ch[NT-1].position;t.fim.forEach((m,k)=>m.position.set(e.x+t.s*.04,e.y+(k-1)*.05,e.z+(k-1)*.03));
   const o=[lerp(OB[0][0]*t.s,OB[1][0]*t.s,u),lerp(OB[0][1],OB[1][1],u),lerp(OB[0][2],OB[1][2],u)];t.ov.position.set(o[0],o[1],o[2]);
   const h=t.ch[0].position,dx=o[0]-h.x,dy=o[1]-h.y,L=Math.hypot(dx,dy)||.01;t.lg.position.set((h.x+o[0])/2,(h.y+o[1])/2,(h.z+o[2])/2);t.lg.scale.set(1,L,1);t.lg.rotation.z=Math.atan2(-dx,dy)});
  txt(u<.3?'BOOK view: flat front (coronal) slice: uterus upright, tubes spread out, ovaries beside it, no bladder/rectum shown':u>.7?'REAL BODY (side view): uterus tilts FORWARD over the bladder, vagina slopes down + forward, rectum behind, ovaries behind the tubes':'Morphing: the book layout folds into the real pelvis')});
 tth=tgt?1.45:0;
 const L0=tgt?[['Uterus',[0,.15,.9]],['Cervix',[.0,-.55,.3]],['Vagina',[0,-1.2,-.2]],['Bladder',[0,-.4,1.2]],['Rectum',[0,-.2,-1.15]],['Symphysis',[0,-1.0,1.55]],['Ovary + tube',[.8,.1,-.2]],['Pouch of Douglas',[0,-.35,-.6]],['Urethra',[0,-1.3,1.05]],['Sacrum',[0,.8,-1.6]]]:[['Uterus',[0,.5,.3]],['Cervix',[.45,-.25,.1]],['Vagina',[.45,-.9,.1]],['Fallopian tube',[.6,1.05,.1]],['Ovary',[1.1,.0,.1]],['Fimbriae',[1.3,.55,.1]]];
 lb(L0,'#ffb0c0');
 return {t:'Female reproductive: book vs body',s:'View button: textbook diagram <-> real pelvis | part par tap karein',rd:6.5,rm:9.5,cam:[tgt?1.45:0,.12],tg:[0,-.1,0],ex:'<button id="eyfb" class="on">View: '+(tgt?'Real body':'Book')+'</button>'}}];

/* ---------- UTERUS: coronal cross-section, 3 layers, cycle phase ---------- */
EYX.N.uterus=['Uterus: cross-section',c=>{
 const {ad,tb,sp,lb,txt}=c,PH=EYX.ph||0,k=[.38,.66,1][PH],ec=[0xb33a3a,0xe58a9a,0xf2a0a8][PH],
  PP=part('Perimetrium (serosa)','Outer peritoneal covering of the uterus; continuous with the broad ligament.',1),
  PM=part('Myometrium (3 muscle layers)','Thick smooth muscle (outer longitudinal, middle interlacing "living ligature", inner circular). Contracts in labour, menstrual cramps (prostaglandins) + after delivery to stop bleeding. Fibroids arise here.',1),
  PE=part('Endometrium','Inner lining: basal layer (stays) + functional layer (built each cycle under oestrogen/progesterone, shed in menstruation). Implantation happens here ~day 6-10 after ovulation. Thickness changes with the button.',1),
  PC=part('Uterine cavity','Triangular slit space (inverted triangle) when seen from the front.',1),
  PO=part('Tubal openings (ostia)','Openings of the fallopian tubes at the upper corners (cornua). Intramural part runs through the wall.',1),
  PX=part('Cervix + endocervical canal','Fibrous neck (~3 cm): internal os (top) to external os (bottom). Mucus changes: thin + stretchy near ovulation (sperm-friendly), thick plug otherwise. Squamocolumnar junction = HPV/cancer site (Pap smear).',1),
  PV=part('Vaginal wall + fornices','The vagina surrounds the cervix: recesses = anterior, posterior (deepest) and lateral fornices.',1);
 EYX.btn.eyph=b=>{EYX.ph=((EYX.ph||0)+1)%3;EYX.show('uterus')};
 const R=[[0,1.04],[.32,1.0],[.55,.9],[.62,.62],[.5,.25],[.3,-.05],[.22,-.3],[.22,-.8],[.18,-1.0],[0,-1.04]],O=SYM(R);
 SHP(c,SYM([[0,-.55],[.45,-.62],[.58,-.9],[.52,-1.5],[0,-1.5]]),0xd98a92,PV,.95,true);SHP(c,SYM([[0,-.7],[.3,-.72],[.36,-1.0],[.32,-1.5],[0,-1.5]]),0x5a1a24,PV,.95,true);
 SHP(c,SCL(O,0,0,1.03),0xe8a0a8,PP,.95,true);SHP(c,O,0xd9737f,PM,.97,true);SHP(c,SCL(O,0,.5,.86),0xc0606e,PM,.9,true);SHP(c,SCL(O,0,.5,.72),0xa84a58,PM,.9,true);
 const EN=SYM([[0,.86],[.2,.84],[.36,.78],[.44,.62],[.36,.4],[.2,.15],[.1,-.05],[.08,-.2],[0,-.2]]);
 SHP(c,SCL(EN,0,.45,k+.12),0xd88a96,PE,.95,true);SHP(c,SCL(EN,0,.45,k),ec,PE,.97,true);SHP(c,SCL(EN,0,.45,Math.max(.2,k-.45)),0x5a1a24,PC,.9,true);
 SHP(c,[[-.03,-.15],[.03,-.15],[.04,-1.0],[-.04,-1.0]],0x3a0f18,PX,.95,false);SHP(c,[[-.17,-.35],[.17,-.35],[.2,-.9],[.12,-1.0],[-.12,-1.0],[-.2,-.9]],0xcf6a78,PX,.35,false);
 if(PH==2){const rn=RN(4);for(let i=0;i<9;i++){const y=.7-i*.07,x=.06+rn()*.05;[-1,1].forEach(sg=>tb([[sg*x,y],[sg*(x+.04),y-.025],[sg*(x),y-.05],[sg*(x+.04),y-.075]].map(p=>[p[0],p[1],0]),.007,0xffc0c8,PE,.9))}}
 if(PH==0){const rn=RN(8);for(let i=0;i<10;i++)sp((rn()-.5)*.3,.2+rn()*.5,0,.02,.02,.01,0x8a0f1a,PC,1)}
 [-1,1].forEach(s=>{sp(s*.5,.82,0,.03,.03,.02,0x1a0508,PO,1);tb([[s*.55,.86,0],[s*.8,.95,0],[s*1.0,.98,0]],.035,0xf0a0b0,PO,.95)});
 lb([['Perimetrium',[-.85,.5,0]],['Myometrium',[.85,.45,0]],['Endometrium',[.6,.7,0]],['Cavity',[-.6,.2,0]],['Tubal opening',[.75,1.15,0]],['Internal os',[.5,-.15,0]],['Cervical canal',[-.55,-.6,0]],['Fornix',[.8,-.7,0]]],'#ffb0c0');
 txt(['Menstrual phase (days 1-5): functional layer shed with blood','Proliferative phase: oestrogen rebuilds a thick lining (days 6-14)','Secretory phase: progesterone makes it rich, coiled glands: ready for implantation (days 15-28)'][PH]);
 return {t:'Uterus: layers + cycle',s:'Cycle button: lining thickness | part par tap karein',rd:5.5,rm:8,cam:[0,.05],tg:[0,.1,0],ex:'<button id="eyph" class="on">Phase: '+['Menstrual','Proliferative','Secretory'][PH]+'</button>'}}];

/* ---------- OVARY: follicle stages + ovulation ---------- */
EYX.N.ovary=['Ovary: follicles',c=>{
 const {ad,tb,sp,lb,txt}=c,
  P0=part('Ovary (cortex + medulla)','Cortex: follicles in connective tissue (stroma) under the germinal epithelium; medulla: vessels + nerves entering at the hilum. Contains ~1-2 million follicles at birth, ~300-400 thousand at puberty, only ~400-500 ovulate in a lifetime.',1),
  P1=part('Primordial follicles','Oocyte (arrested in prophase I) + one flat layer of granulosa cells. Dormant for years; thousands activate each cycle without hormones.',1),
  P2=part('Primary follicle','Oocyte + one layer of CUBOIDAL granulosa cells. Starts to grow (FSH-independent at first).',1),
  P3=part('Secondary follicle','Multilayered granulosa, zona pellucida around the oocyte, theca interna (makes androgens) + externa. FSH receptors appear.',1),
  P4=part('Antral follicle','Fluid-filled space (antrum) appears. Under FSH, one DOMINANT follicle is selected (day ~7); the rest become atretic.',1),
  P5=part('Graafian (mature) follicle','~20 mm, bulging from the surface. Oocyte in the cumulus oophorus with corona radiata. High oestradiol triggers the LH SURGE; ovulation follows ~24-36 h after the surge begins.',1),
  P6=part('Ovulation (stigma)','Follicle wall ruptures (LH, prostaglandins, proteases): the oocyte + corona radiata are released and swept into the tube by the fimbriae. The egg lives only ~12-24 h.',1),
  P7=part('Corpus luteum','Collapsed follicle turns yellow (lutein cells): makes PROGESTERONE + oestrogen for ~14 days. If no pregnancy it regresses; with hCG it is kept alive.',1),
  P8=part('Corpus albicans','White scar left after the corpus luteum regresses.',1),
  P9=part('Hilum vessels','Ovarian artery + vein, lymphatics and nerves enter through the mesovarium.',1);
 EYX.ov=false;EYX.btn.eyov=b=>{EYX.ov=!EYX.ov;b.textContent=EYX.ov?'Ovulation: ON':'Ovulation: OFF';b.classList.toggle('on',EYX.ov)};
 SHP(c,ELL(0,0,1.0,.66,0,48),0xe6b0a8,P0,.95);SHP(c,ELL(.0,-.02,.7,.4,0,40),0xf4c8c0,P0,.95);
 tb([[-1.0,-.1,0],[-.6,-.05,0],[-.2,-.02,0]],.03,0xd8232f,P9,.95);tb([[-1.0,.05,0],[-.55,.05,0],[-.15,.0,0]],.03,0x2f6fe0,P9,.95);
 [[-.7,.42],[-.78,.3],[-.62,.3]].forEach(p=>{sp(p[0],p[1],0,.03,.03,.01,0xfff0d8,P1,1)});
 const fol=(x,y,r,P,gran,ant,col)=>{sp(x,y,0,r,r,.02,0xe8a090,P,.95);sp(x,y,0,r*.85,r*.85,.02,col||0xf5d0b8,P,.95);if(ant)sp(x,y,0,r*.55,r*.55,.02,0xbfe8ff,P,.9);sp(x-(ant?r*.25:0),y+(ant?r*.2:0),0,r*.2,r*.2,.02,0xfff6e0,P,1)};
 fol(-.45,.0,.09,P2);fol(-.2,-.22,.15,P3);fol(.08,-.3,.18,P4,1,1);
 const G=sp(.5,-.12,0,.32,.32,.02,0xe8a090,P5,.95);sp(.5,-.12,0,.28,.28,.02,0xf5d0b8,P5,.95);const GA=sp(.5,-.12,0,.2,.2,.02,0xbfe8ff,P5,.92);sp(.58,-.2,0,.06,.06,.02,0xfff6e0,P5,1);
 const cl=sp(.4,.28,0,.2,.16,.02,0xf2c84a,P7,.97);sp(.4,.28,0,.08,.06,.02,0xd8232f,P7,1);sp(-.05,.3,0,.07,.06,.02,0xf4f0e8,P8,1);
 const egg=sp(.5,-.12,0,.06,.06,.03,0xfff6e0,P6,1),corona=sp(.5,-.12,0,.1,.1,.02,0xffe0c0,P6,.7);let u=0;
 fx.push(s=>{u+=((EYX.ov?1:0)-u)*.03;G.scale.set(.32*(1+.08*u),.32*(1+.08*u),.02);const px=lerp(.58,1.25,u),py=lerp(-.2,.5,u);egg.visible=u>.15;corona.visible=u>.15;egg.position.set(px,py,0);corona.position.set(px,py,0);GA.scale.setScalar(.2*(1-.5*u));txt(EYX.ov?'LH surge > follicle ruptures > oocyte + corona radiata released toward the fimbriae (egg lives ~12-24 h)':'Follicle stages around the ovary: primordial > primary > secondary > antral > Graafian > ovulation > corpus luteum > corpus albicans')});
 lb([['Primordial',[-.78,.6,0]],['Primary',[-.5,-.2,0]],['Secondary',[-.35,-.5,0]],['Antral',[.0,-.58,0]],['Graafian',[.62,-.55,0]],['Corpus luteum',[.3,.55,0]],['Corpus albicans',[-.2,.55,0]],['Hilum',[-1.15,0,0]]],'#ffb0c0');
 return {t:'Ovary: follicle stages',s:'Ovulation button | har stage par tap karein',rd:5.2,rm:7.5,cam:[0,.05],tg:[0,0,0],ex:'<button id="eyov">Ovulation: OFF</button>'}}];

/* ---------- TUBE: egg + sperm journey, fertilisation, implantation ---------- */
EYX.N.tube=['Fallopian tube',c=>{
 const {ad,tb,sp,cy,dc,lb,txt,EG,por}=c,
  P1=part('Fimbriae + infundibulum','Finger-like fringe sweeps over the ovary and catches the oocyte. Cilia + peristalsis move it inward.',1),
  P2=part('Ampulla (fertilisation site)','Widest part (~2/3 of the tube). Sperm meet the egg here within ~12-24 h of ovulation. Ectopic pregnancy usually implants here.',1),
  P3=part('Isthmus','Narrow part near the uterus; the embryo travels slowly to reach the cavity at ~day 3-4.',1),
  P4=part('Mucosal folds + cilia','Ciliated + secretory cells: cilia beat toward the uterus; secretions nourish sperm, egg and the early embryo.',1),
  P5=part('Ovary + follicle','Source of the egg.',1),
  P6=part('Uterine cavity + endometrium','Implantation ~day 6-10 after ovulation (blastocyst). hCG from the embryo keeps the corpus luteum alive.',1),
  P7=part('Sperm','~50-60 um; only a few hundred reach the ampulla out of millions deposited; they survive up to ~5 days in cervical mucus.',1),
  P8=part('Egg > zygote > embryo','Fertilisation (day 0) > 2 cells (day 1) > 4 cells (day 2) > morula (day 3-4, enters uterus) > blastocyst (day 5-6) > implantation (day 6-10).',1);
 EG.rotation.z=por?-1.5708:0;EYX.tp=false;EYX.btn.eytp=b=>{EYX.tp=!EYX.tp;b.textContent=EYX.tp?'Paused':'Playing';b.classList.toggle('on',!EYX.tp)};
 const X0=-2.2,rad=x=>x<-1.8?.1:x<.4?.22:x<1.6?.08:.1,pth=x=>.18*Math.sin((x+2.2)*.8);
 for(let i=0;i<20;i++){const x=-1.8+i*.2,P=x<.4?P2:P3,r=rad(x);cy(x,pth(x),0,r,.22,0xf0a0b0,P,.45,[0,0,1.5708]);cy(x,pth(x),0,r*.55,.22,0x7a2a36,P,.6,[0,0,1.5708]);if(x<.4&&i%2==0)ad(new T.TorusGeometry(r*.8,.02,6,14),0xffc0c8,x,pth(x),0,{r:[0,1.5708,0],op:.9},P4)}
 for(let k=0;k<7;k++)ad(new T.ConeGeometry(.035,.3,6),0xf5b8c4,-2.0,pth(-1.9)+(k-3)*.07,(k-3)*.03,{op:.95,r:[0,0,1.5708+(k-3)*.22]},P1);
 sp(-2.5,.7,0,.35,.3,.1,0xf0d98a,P5,.9);sp(-2.45,.55,0,.17,.17,.1,0xbfe8ff,P5,.9);
 ad(new T.BoxGeometry(1.0,1.1,.3),0xf2a0a8,2.75,.05,0,{op:.9},P6);ad(new T.BoxGeometry(.6,.7,.2),0x5a1a24,2.5,.05,0,{op:.9},P6);
 const egg=sp(0,0,0,.09,.09,.09,0xfff6e0,P8,1),cell=[];for(let i=0;i<16;i++)cell.push(dc(new T.SphereGeometry(.035,8,6),0xfff0d0,0,0,0,{op:1}));
 const SPM=[];for(let i=0;i<10;i++)SPM.push({h:dc(new T.SphereGeometry(.025,8,6),0xdfe8ff,0,0,0,{op:1}),tl:dc(new T.CylinderGeometry(.004,.004,.12,4),0xdfe8ff,0,0,0,{op:.9,r:[0,0,1.5708]}),o:i/10});
 let tt=0,t0=0;const ST=['Ovulation: egg released + caught by the fimbriae','Egg in the ampulla; sperm swim up the tube (survive ~5 days)','FERTILISATION in the ampulla (day 0)','Zygote: 1 cell > 2 cells (day 1) > 4 cells (day 2)','Morula (day 3-4): ~16 cells, enters the uterine cavity','Blastocyst (day 5-6): hatches, then implants in the endometrium (day 6-10)'];
 fx.push(s=>{const dt=Math.min(.1,s-t0);t0=s;if(!EYX.tp)tt=(tt+dt)%18;const p=tt,ph=p<3?0:p<6?1:p<8?2:p<11?3:p<14?4:5;
  let ex=-2.45,ey=.55;if(p<3){const u=p/3;ex=lerp(-2.45,-1.7,u);ey=lerp(.55,pth(-1.7),u)}else if(p<8){ex=-1.0;ey=pth(-1.0)}else if(p<14){const u=(p-8)/6;ex=lerp(-1.0,2.3,u);ey=lerp(pth(-1.0),.05,Math.max(0,u-.6)/.4)}else{ex=2.55;ey=lerp(.05,.2,Math.min(1,(p-14)/4))}
  const n=p<8?1:p<9.5?2:p<11?4:p<14?16:16;egg.visible=p<8;
  cell.forEach((m,i)=>{m.visible=p>=8&&i<n;const a=i/n*6.2832,r=n>4?.1:.05;m.position.set(ex+Math.cos(a)*r,ey+Math.sin(a)*r,0)});
  SPM.forEach(q=>{const u=((p*.15+q.o)%1),x=lerp(2.0,-1.0,u),y=pth(x)+Math.sin(p*6+q.o*9)*.04,vis=p>=2&&p<7&&u>0&&(p<6||q.o<.2);q.h.visible=vis;q.tl.visible=vis;q.h.position.set(x,y,0);q.tl.position.set(x+.07,y,0)});
  if(p<8)egg.position.set(ex,ey,0);txt(ST[ph])});
 lb([['Fimbriae',[-2.0,.55,0]],['Ovary',[-2.7,1.1,0]],['Ampulla',[-.7,.5,0]],['Isthmus',[1.0,.3,0]],['Uterine cavity',[2.6,.9,0]],['Fertilisation here',[-1.0,-.45,0]]],'#ffb0c0');
 return {t:'Fallopian tube: fertilisation to implantation',s:'Egg + sperm journey, day 0 to day 10 | Pause button',rd:7.5,rm:8.5,cam:[0,.05],tg:por?[0,.1,0]:[.2,.1,0],ex:'<button id="eytp" class="on">Playing</button>'}}];
}
