/* ---- v8: brain cross-sections (axial L1/L2, midsagittal, coronal) with an MRI (T1 grey) toggle ----
   Flat shapes painted back-to-front with renderOrder, like a real MRI slice. */
{
const SMC=(pts,n)=>new T.CatmullRomCurve3(pts.map(p=>V3([p[0],p[1],0])),true,'catmullrom',.5).getPoints(n).map(p=>[p.x,p.y]);
const ELL=(cx,cy,rx,ry,rot,n)=>{const p=[];n=n||28;for(let i=0;i<n;i++){const t=i/n*6.2832,x=rx*Math.cos(t),y=ry*Math.sin(t);p.push([cx+x*Math.cos(rot||0)-y*Math.sin(rot||0),cy+x*Math.sin(rot||0)+y*Math.cos(rot||0)])}return p};
const SYM=R=>R.concat(R.slice(1,-1).reverse().map(p=>[-p[0],p[1]]));
const SCL=(pts,cx,cy,k)=>pts.map(p=>[cx+(p[0]-cx)*k,cy+(p[1]-cy)*k]);
const HEX=g=>{const v=Math.round(Math.max(0,Math.min(1,g))*255);return (v<<16)|(v<<8)|v};
EYX.bp=0;EYX.bl=0;EYX.mri=false;
EYX.N.brain=['Brain: cross-section',c=>{
 const {ad,tb,sp,lb,txt}=c,GR=[];let RO=1;
 const LY=(pts,col,g,P,op)=>{const m=ad(new T.ShapeGeometry(new T.Shape(pts.map(p=>new T.Vector2(p[0],p[1])))),col,0,0,0,{op:op||.97},P);m.renderOrder=RO++;GR.push([m,col,g]);return m},
  TB=(pts,r,col,g,P,op)=>{const m=tb(pts.map(p=>[p[0],p[1],0]),r,col,P,op||.97);m.renderOrder=RO++;GR.push([m,col,g]);return m},
  SUL=(outer,cx,cy,n,seed,P)=>{const rn=RN(seed);for(let k=0;k<n;k++){const p=outer[Math.floor(rn()*outer.length)],d=.05+rn()*.1,q=[];for(let j=0;j<4;j++){const f=1-d*j/3,w=(rn()-.5)*.03*j;q.push([cx+(p[0]-cx)*f+w,cy+(p[1]-cy)*f+w])}TB(q,.005,0x1d2f55,.1,P,.9)}},
  PL=EYX.bp,CS=0x1d2f55,CX=0xc9a6a0,WM=0xf3ece0,BN=0xf3eedd,SK=0xe3b79b,GM2=0xb9a0a8;
 EYX.btn.eybp=()=>{EYX.bp=(EYX.bp+1)%3;EYX.show('brain')};EYX.btn.eybl=()=>{EYX.bl=1-EYX.bl;EYX.show('brain')};
 EYX.btn.eymr=b=>{EYX.mri=!EYX.mri;b.textContent=EYX.mri?'View: MRI (T1)':'View: Colour';b.classList.toggle('on',EYX.mri);GR.forEach(a=>a[0].material.color.setHex(EYX.mri?HEX(a[2]):a[1]))};
 const P0=part('Scalp + skin','Skin, fat and galea: the bright layer on a T1 MRI (fat = high signal).',1),
  P1=part('Skull (bone)','Outer + inner tables with spongy diploe between: dark on MRI (little water), bright marrow fat in the diploe.',1),
  P2=part('Subarachnoid CSF + dura','CSF (dark on T1) cushions the brain; dura mater lines the skull and forms the falx cerebri + tentorium cerebelli.',1),
  P3=part('Cortex (grey matter)','2-4 mm ribbon of neuron cell bodies on the surface, folded into gyri (ridges) and sulci (grooves). Mid-grey on T1.',1),
  P4=part('White matter','Myelinated axons (association, commissural, projection fibres). Brighter than grey matter on T1 because of the lipid-rich myelin.',1);
 let o;
 if(PL==0){
  /* ---------------- AXIAL ---------------- */
  const a=.8,b=1.0,OUT=(aa,bb,amp,ph)=>{const p=[];for(let i=0;i<96;i++){const t=i/96*6.2832,m=1+amp*(.6*Math.sin(15*t+ph)+.4*Math.sin(23*t+1+ph)+.3*Math.sin(37*t+2));p.push([aa*m*Math.cos(t)*(1-.09*Math.sin(t)),bb*m*Math.sin(t)])}return p};
  const cortexO=OUT(a,b,.03,0);
  LY(OUT(a+.15,b+.15,0,0),SK,.8,P0);LY(OUT(a+.09,b+.09,0,0),BN,.9,P1);LY(OUT(a+.04,b+.04,0,0),CS,.1,P2);LY(cortexO,CX,.55,P3);LY(OUT(a-.08,b-.08,.05,.7),WM,.88,P4);
  const PS=part('Sulci + gyri','Sulci (dark CSF lines) between gyri. Lateral (Sylvian) sulcus separates frontal + parietal from temporal; central sulcus (Rolandic) separates motor (precentral) from sensory (postcentral) gyrus.',1);SUL(cortexO,0,0,26,5,PS);
  const PF=part('Interhemispheric fissure + falx','Midline cleft holding the falx cerebri (dura) + anterior cerebral arteries.',1);TB([[0,b-.01],[0,-b+.01]],.008,CS,.1,PF);
  if(EYX.bl==0){
   const V=part('Lateral ventricles (bodies)','C-shaped CSF cavities in the centrum semiovale: frontal horns in front, bodies, atria + occipital horns behind; they form a butterfly shape. Choroid plexus makes CSF (~500 mL/day). Dark on T1.',1),
    VR=[[.025,.28],[.09,.34],[.16,.3],[.17,.2],[.12,.12],[.14,.0],[.2,-.1],[.24,-.25],[.22,-.42],[.17,-.4],[.15,-.26],[.1,-.12],[.07,.02],[.045,.12]];
   LY(SMC(VR,70),CS,.08,V);LY(SMC(VR.map(p=>[-p[0],p[1]]),70),CS,.08,V);
   const SP=part('Septum pellucidum','Thin double membrane between the frontal horns/bodies. Cavum septi pellucidi is a common normal variant.',1);TB([[0,.3],[0,.04]],.007,0xd8d0c0,.6,SP);
   const CP=part('Choroid plexus (glomus)','Vascular tufts in the atria: often calcified (bright on CT, a common normal finding after age 30).',1);[-1,1].forEach(s=>sp(s*.19,-.3,0,.025,.025,.01,0xffffff,CP,1));
   const CR=part('Corona radiata / centrum semiovale','Fan of projection + association fibres lateral to the ventricles; the white-matter core of the hemisphere at this level.',1);
   const CS2=part('Central sulcus','Runs from near the midline backward-laterally between the precentral (motor) and postcentral (sensory) gyri.',1);[-1,1].forEach(s=>TB([[s*.12,.0],[s*.3,.08],[s*.5,.2]],.007,0x0f1a3a,.05,CS2,.95));
   lb([['Frontal horn',[-.55,.3,0]],['Ventricle body',[.55,-.1,0]],['Falx',[0,1.12,0]],['Cortex',[-.95,0,0]],['White matter',[-.6,-.55,0]],['Skull',[.95,.8,0]],['Choroid plexus',[.55,-.45,0]]]);
   txt('Axial, level of the lateral-ventricle bodies: butterfly ventricles, falx, centrum semiovale (like your MRI)');
   o={s:'Axial: ventricle-body level | MRI toggle + Level button',lv:'Level 1: ventricle bodies'}}
  else{
   const V=part('Lateral ventricles (frontal + occipital horns)','Frontal horns in front of the foramen of Monro; atria + occipital horns behind the thalami. Septum pellucidum separates the frontal horns.',1);
   [-1,1].forEach(s=>{LY([[.025,.52],[.1,.54],[.17,.47],[.165,.34],[.11,.29],[.05,.32]].map(p=>[s*p[0],p[1]]),CS,.08,V);LY([[.13,-.3],[.19,-.32],[.25,-.47],[.22,-.62],[.15,-.58],[.12,-.45]].map(p=>[s*p[0],p[1]]),CS,.08,V)});
   const V3P=part('Third ventricle','Midline slit between the thalami, hypothalamus below; connects to the lateral ventricles via the foramina of Monro and to the 4th via the aqueduct.',1);LY([[-.012,.14],[.012,.14],[.014,0],[.012,-.14],[-.012,-.14],[-.014,0]],CS,.08,V3P);
   const CA=part('Caudate nucleus (head)','C-shaped nucleus hugging the lateral wall of the frontal horn; with the putamen forms the striatum (input of the basal ganglia). Cognition + motor loops. Huntington disease = caudate atrophy.',1);
   const TH=part('Thalamus','Egg-shaped relay nuclei either side of the third ventricle: all sensory input (except smell) goes through here. Thalamic stroke = contralateral sensory loss.',1);
   const PU=part('Putamen','Lateral part of the lentiform nucleus; with the globus pallidus it is the motor part of the basal ganglia.',1);
   const GP=part('Globus pallidus','Medial part of the lentiform nucleus: main output of the basal ganglia (GPi). Slightly brighter on T1 (iron, myelinated fibres).',1);
   const IC=part('Internal capsule (anterior limb, genu, posterior limb)','White-matter V between caudate/thalamus (medial) and lentiform nucleus (lateral). Posterior limb carries corticospinal fibres: a small stroke here causes dense contralateral hemiplegia.',1);
   const IN=part('Insula + lateral (Sylvian) fissure','Insular cortex buried in the lateral sulcus (taste, interoception); the fissure holds the middle cerebral artery branches.',1);
   const CC=part('Corpus callosum (genu + splenium)','Genu (front) + splenium (back) of the large commissure joining the two hemispheres.',1);
   const PI=part('Pineal gland (calcified)','Midline gland behind the third ventricle (melatonin); a calcified pineal is a landmark on CT/X-ray.',1);
   const CP=part('Choroid plexus (glomus)','Tufts in the atria: often calcified.',1);
   [-1,1].forEach(s=>{LY(ELL(s*.17,.38,.055,.1,s*.3).map(p=>p),GM2,.55,CA);LY(ELL(s*.12,-.07,.09,.16,-s*.15),GM2,.6,TH);LY(ELL(s*.4,.14,.055,.17,-s*.15),0xcfa080,.55,PU);LY(ELL(s*.31,.1,.04,.09,-s*.1),0xe0c090,.7,GP);
    TB([[s*.25,.34],[s*.235,.22],[s*.23,.1],[s*.24,-.05],[s*.26,-.2]],.028,0xfffaf0,.97,IC);TB([[s*.5,.3],[s*.52,.12],[s*.5,-.06]],.018,CX,.5,IN);TB([[s*.76,.08],[s*.62,.1],[s*.54,.12]],.012,0x0f1a3a,.05,IN);sp(s*.19,-.38,0,.022,.022,.01,0xffffff,CP,1)});
   TB([[-.12,.6],[0,.68],[.12,.6]],.035,0xfffaf0,.97,CC);TB([[-.12,-.55],[0,-.66],[.12,-.55]],.035,0xfffaf0,.97,CC);sp(0,-.22,0,.02,.02,.01,0xffffff,PI,1);
   const SP=part('Septum pellucidum','Thin membrane between the frontal horns.',1);TB([[0,.52],[0,.3]],.007,0xd8d0c0,.6,SP);
   lb([['Caudate head',[-.55,.45,0]],['Thalamus',[-.45,-.1,0]],['Putamen',[.78,.3,0]],['Globus pallidus',[.62,-.05,0]],['Internal capsule',[-.72,.18,0]],['Insula',[.9,.0,0]],['Genu',[0,.82,0]],['Splenium',[0,-.82,0]],['3rd ventricle',[.28,.0,0]]]);
   txt('Axial, level of the basal ganglia + thalami: internal capsule is the V-shaped white matter between them');
   o={s:'Axial: basal ganglia + thalamus level | MRI toggle',lv:'Level 2: basal ganglia'}}
  o.cam=[0,.06];o.rm=9;o.rd=5.2;o.tg=[0,0,0]}
 else if(PL==1){
  /* ---------------- MIDSAGITTAL (face to the LEFT) ---------------- */
  const HEAD=[[-1.08,.2],[-1.1,.5],[-.92,.88],[-.55,1.1],[.05,1.16],[.68,1.06],[1.1,.72],[1.22,.25],[1.18,-.2],[1.05,-.55],[.8,-.8],[.9,-1.25],[.35,-1.3],[.1,-1.0],[-.2,-.6],[-.7,-.5],[-1.0,-.35],[-1.12,-.1]],
   VAULT=[[-1.0,.15],[-1.02,.48],[-.86,.84],[-.5,1.04],[.05,1.09],[.64,1.0],[1.03,.68],[1.14,.25],[1.1,-.18],[.98,-.48],[.75,-.58],[.4,-.5],[.2,-.45],[-.2,-.3],[-.5,-.28],[-.8,-.2],[-.98,0]],
   CER=[[-.92,.12],[-.94,.42],[-.78,.74],[-.44,.92],[.05,.97],[.58,.88],[.93,.58],[1.03,.2],[.97,-.08],[.72,-.16],[.4,-.14],[.1,-.2],[-.15,-.22],[-.45,-.2],[-.8,-.1]];
  LY(SMC(HEAD,120),SK,.78,P0,.9);LY(SMC(VAULT,120),BN,.9,P1);LY(SMC(SCL(VAULT,.05,.3,.95),120),CS,.1,P2);LY(SMC(CER,120),CX,.55,P3);LY(SMC(SCL(CER,.05,.4,.88),120),WM,.88,P4);
  const CCp=part('Corpus callosum','Largest commissure (~200 million axons): rostrum, genu, body, splenium. Bright arch on T1. Agenesis or section (split-brain) disconnects the hemispheres.',1);
  TB([[-.62,.12],[-.7,.3],[-.55,.45],[-.2,.5],[.15,.5],[.42,.38],[.5,.2]],.035,0xfffaf0,.98,CCp);sp(-.66,.33,0,.06,.06,.02,0xfffaf0,CCp,.98);sp(.48,.25,0,.06,.06,.02,0xfffaf0,CCp,.98);
  const SPp=part('Septum pellucidum + fornix','Septum pellucidum: thin membrane under the callosal body. Fornix: arching memory tract from the hippocampus to the mammillary bodies (Papez circuit).',1);
  LY(SMC([[-.55,.38],[-.2,.44],[.15,.44],[.3,.3],[.15,.35],[-.2,.32],[-.45,.28]],40),0xd8d0c0,.7,SPp,.8);TB([[-.25,-.02],[-.35,.2],[-.2,.38],[.15,.4],[.34,.22],[.36,.08]],.015,0xe8e0d0,.8,SPp);
  const THp=part('Thalamus (medial surface)','Relay nuclei either side of the third ventricle; the interthalamic adhesion (massa intermedia) bridges them.',1);LY(ELL(.03,.12,.27,.14,.05),GM2,.6,THp);
  const V3p=part('Third ventricle','Slit between the thalami and hypothalamus; drains via the cerebral aqueduct. Colloid cyst at the foramen of Monro can block it.',1);LY(ELL(0,.0,.2,.035,.15),CS,.1,V3p);
  const HYp=part('Hypothalamus + pituitary','Hypothalamus (temperature, hunger, thirst, hormones) above the optic chiasm; pituitary in the sella turcica below, joined by the infundibulum.',1);
  LY(ELL(-.08,-.1,.15,.07,0),0xd9a5a5,.65,HYp);sp(0,-.2,0,.03,.03,.02,0xf0d0d0,HYp,.98);LY(ELL(-.12,-.34,.07,.055,0),0xe8c07a,.7,HYp);TB([[-.3,-.18],[-.2,-.22]],.02,0xfffaf0,.95,HYp);
  const BS=part('Brainstem (midbrain, pons, medulla)','Midbrain (tectum with colliculi, cerebral peduncles), pons (bulge), medulla (continues as the spinal cord): vital centres + all long tracts.',1);
  LY(SMC([[.08,-.12],[.28,-.1],[.36,-.3],[.38,-.55],[.46,-.8],[.54,-1.15],[.4,-1.15],[.28,-.88],[.12,-.7],[0,-.5],[.05,-.3]],60),0xe0b090,.55,BS);LY(ELL(.17,-.5,.15,.17,.3),0xe6b99a,.58,BS);sp(.36,-.17,0,.04,.04,.02,0xd0a080,BS,.98);sp(.4,-.2,0,.035,.035,.02,0xd0a080,BS,.98);sp(.42,.0,0,.025,.025,.02,0xffffff,BS,1);
  const AQ=part('Cerebral aqueduct + fourth ventricle','Aqueduct of Sylvius (narrow, ~15 mm) joins the 3rd and 4th ventricles; the 4th ventricle drains CSF into the subarachnoid space through the foramina of Magendie + Luschka. Aqueduct stenosis = hydrocephalus.',1);
  TB([[.3,-.12],[.32,-.32],[.36,-.46]],.012,CS,.1,AQ);LY(ELL(.42,-.5,.035,.07,.2),CS,.1,AQ);
  const CB=part('Cerebellum + arbor vitae','Coordination + balance, ~half of all neurons. White-matter branches (arbor vitae, "tree of life") inside the folia; the vermis lies on the midline.',1);
  LY(SMC([[.52,-.3],[.7,-.22],[.95,-.25],[1.05,-.42],[.98,-.62],[.78,-.76],[.58,-.74],[.48,-.6],[.5,-.45]],60),0xd98f9f,.6,CB);[[[.55,-.5],[.7,-.5],[.88,-.45]],[[.72,-.5],[.8,-.62]],[[.72,-.5],[.78,-.38]]].forEach(q=>TB(q,.012,0xfffaf0,.95,CB));
  const SIN=part('Dura, tentorium + clivus','Tentorium cerebelli roofs the posterior fossa; the clivus (bone) lies in front of the pons.',1);TB([[1.0,-.22],[.7,-.25],[.45,-.2]],.008,CS,.1,SIN);TB([[-.2,-.38],[.1,-.55],[.32,-.75]],.03,BN,.9,SIN);
  const SC=part('Spinal cord (cut)','Continues from the medulla through the foramen magnum.',1);TB([[.54,-1.15],[.6,-1.3]],.07,0xf3e8c8,.8,SC);
  const AIR=part('Frontal + sphenoid sinuses','Air-filled spaces (black on MRI). The sphenoid sinus lies just below the pituitary: the route for transsphenoidal surgery.',1);LY(ELL(-.98,.22,.05,.1,0),0x050505,.02,AIR);LY(ELL(-.33,-.42,.1,.07,0),0x050505,.02,AIR);
  const SU=part('Sulci (cingulate, parieto-occipital, calcarine)','Cingulate sulcus above the callosum; parieto-occipital sulcus separates parietal from occipital lobe; calcarine sulcus = primary visual cortex (V1).',1);TB([[-.6,.62],[-.2,.66],[.2,.62],[.5,.5]],.007,CS,.1,SU);TB([[.78,.7],[.62,.4]],.007,CS,.1,SU);TB([[1.0,.2],[.75,.12]],.008,CS,.1,SU);
  lb([['Corpus callosum',[-.2,.7,0]],['Thalamus',[-.35,.12,0]],['Third ventricle',[-.05,-.12,0]],['Pituitary',[-.75,-.36,0]],['Midbrain',[.12,-.15,0]],['Pons',[-.2,-.55,0]],['Medulla',[.2,-1.1,0]],['4th ventricle',[.75,-.9,0]],['Cerebellum',[1.0,-.8,0]],['Aqueduct',[.2,-.35,0]],['Frontal sinus',[-1.05,.45,0]],['Spinal cord',[.95,-1.25,0]]]);
  txt('Midsagittal: callosum arch, thalamus, 3rd ventricle, brainstem, 4th ventricle, cerebellum (like your MRI)');
  o={s:'Midsagittal | MRI toggle',lv:''};o.cam=[0,.05];o.rm=11.5;o.rd=6.2;o.tg=[.05,-.05,0]}
 else{
  /* ---------------- CORONAL (through the thalami) ---------------- */
  const R0=[[0,1.28],[.55,1.22],[.95,.9],[1.1,.5],[1.12,.05],[1.0,-.3],[.7,-.55],[.3,-.62],[0,-.6]],RB=[[0,.98],[.5,.93],[.82,.62],[.92,.2],[.9,-.12],[.78,-.34],[.55,-.4],[.3,-.34],[.14,-.3],[0,-.3]];
  const BO=SMC(SYM(RB),120);
  LY(SMC(SYM(R0),120),SK,.8,P0,.9);LY(SMC(SCL(SYM(R0),0,.3,.93),120),BN,.9,P1);LY(SMC(SCL(SYM(R0),0,.3,.88),120),CS,.1,P2);LY(BO,CX,.55,P3);LY(SMC(SCL(SYM(RB),0,.35,.9),120),WM,.88,P4);
  SUL(BO,0,.35,22,3,part('Sulci + gyri','Cortical folds seen in cross-section; the lateral sulcus is the deep cleft on each side.',1));
  const FA=part('Interhemispheric fissure + falx','Midline cleft with the falx cerebri.',1);TB([[0,.98],[0,.66]],.008,CS,.1,FA);
  const CCp=part('Corpus callosum (body)','Roof of the lateral ventricles; fibres fan out into both hemispheres.',1);TB([[-.42,.56],[-.2,.63],[0,.65],[.2,.63],[.42,.56]],.03,0xfffaf0,.98,CCp);
  const V=part('Lateral ventricles (butterfly) + temporal horns','Mirror-image CSF spaces under the callosum; the temporal horns lie next to the hippocampi. Dilated in hydrocephalus + atrophy.',1);
  const V3P=part('Third ventricle','Midline slit between the thalami.',1);LY(ELL(0,.2,.014,.2),CS,.08,V3P);
  const SPp=part('Septum pellucidum','Thin membrane between the lateral ventricles.',1);TB([[0,.56],[0,.42]],.006,0xd8d0c0,.6,SPp);
  const TH=part('Thalamus','Sensory relay: each thalamus lies beside the third ventricle.',1),CA=part('Caudate (body)','Bulges into the lateral wall of the lateral ventricle.',1),PU=part('Putamen','Lateral lentiform nucleus (motor basal ganglia).',1),GP=part('Globus pallidus','Medial lentiform nucleus: basal-ganglia output.',1),IC=part('Internal capsule','White-matter pathway between thalamus/caudate and lentiform nucleus: continues down as the cerebral peduncle. Lacunar strokes here cause pure motor hemiparesis.',1),IN=part('Insula + Sylvian fissure','Insular cortex buried in the lateral sulcus, with the middle cerebral artery in the fissure.',1),HI=part('Hippocampus + temporal horn','Curled medial temporal cortex (memory) beside the temporal horn of the lateral ventricle. First site of Alzheimer atrophy.',1),MB=part('Midbrain (cerebral peduncles)','Brainstem at the base: cerebral peduncles carry the descending motor fibres; substantia nigra lies behind them.',1);
  [-1,1].forEach(s=>{LY([[.04,.56],[.15,.6],[.3,.56],[.4,.44],[.38,.35],[.28,.4],[.17,.41],[.07,.41]].map(p=>[s*p[0],p[1]]),CS,.08,V);LY(ELL(s*.56,-.02,.025,.06,0),CS,.08,V);
   LY(ELL(s*.14,.2,.11,.17,s*.1),GM2,.6,TH);LY(ELL(s*.41,.47,.04,.06,0),GM2,.55,CA);LY(ELL(s*.42,.18,.07,.15,-s*.1),0xcfa080,.55,PU);LY(ELL(s*.31,.17,.045,.1,0),0xe0c090,.7,GP);
   TB([[s*.37,.38],[s*.27,.28],[s*.23,.12],[s*.24,-.08],[s*.2,-.22]],.03,0xfffaf0,.97,IC);TB([[s*.56,.38],[s*.58,.2],[s*.56,.02]],.016,CX,.5,IN);TB([[s*.93,.15],[s*.75,.2],[s*.62,.24]],.012,0x0f1a3a,.05,IN);LY(ELL(s*.5,-.12,.07,.045,0),0xb99ad0,.7,HI)});
  LY(ELL(0,-.28,.14,.2,0),0xe0b090,.55,MB);
  lb([['Corpus callosum',[0,.82,0]],['Lateral ventricle',[-.62,.55,0]],['Thalamus',[-.42,.05,0]],['Putamen',[.85,.3,0]],['Internal capsule',[.55,.5,0]],['Insula',[1.0,.02,0]],['Hippocampus',[-.95,-.18,0]],['Midbrain',[0,-.55,0]],['3rd ventricle',[0,.0,0]],['Falx',[0,1.1,0]]]);
  txt('Coronal through the thalami: butterfly ventricles, basal ganglia, internal capsule, insula, hippocampus');
  o={s:'Coronal | MRI toggle',lv:''};o.cam=[0,.05];o.rm=10;o.rd=5.6;o.tg=[0,.35,0]}
 const NM=['Axial','Sagittal','Coronal'][PL],ex='<button id="eybp" class="on">Plane: '+NM+'</button>'+(PL==0?'<button id="eybl">'+(EYX.bl?'Level 2: basal ganglia':'Level 1: ventricles')+'</button>':'')+'<button id="eymr" class="'+(EYX.mri?'on':'')+'">'+(EYX.mri?'View: MRI (T1)':'View: Colour')+'</button>';
 if(EYX.mri)GR.forEach(a=>a[0].material.color.setHex(HEX(a[2])));
 return {t:'Brain: '+NM+' cross-section',s:o.s,rd:o.rd,rm:o.rm,cam:o.cam,tg:o.tg,ex}}];

/* ---------- routing: any brain structure opens the cross-section ---------- */
{const _ob=window.openDV;window.openDV=(m,lv)=>{if(/^(Cerebrum|Cerebellum|Brainstem)/.test(m.userData.name)){init();cur=m;EYX.st=['brain'];EYX.show('brain');return}return _ob(m,lv)}}
}
