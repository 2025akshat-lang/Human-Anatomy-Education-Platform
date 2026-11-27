/* ---- v11: KIDNEY PHYSIOLOGY: hub > rtrans | rtypes | rvasa | rjga | rhorm | rgfr | rsecr | rgf | rreab | rcounter | rinnerv | rflow | rtime ----
   Shared schematic nephron (cortex top, medulla bottom). Numbers are standard textbook values (approximate, they vary between people). */
{
const lerp=(a,b,u)=>a+(b-a)*u,k01=x=>Math.max(0,Math.min(1,x));
const PATH=pts=>{const cum=[0];for(let i=1;i<pts.length;i++)cum.push(cum[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));const L=cum[cum.length-1];return {L,cum,at:u=>{const w=k01(u)*L;let j=1;while(j<cum.length-1&&cum[j]<w)j++;const f=(w-cum[j-1])/Math.max(1e-6,cum[j]-cum[j-1]);return [lerp(pts[j-1][0],pts[j][0],f),lerp(pts[j-1][1],pts[j][1],f)]}}};
const SEG={pct:[[-.3,1.15],[-.5,1.2],[-.7,1.05],[-.5,.9],[-.7,.75],[-.5,.6],[-.62,.4]],dtl:[[-.62,.4],[-.62,-1.2],[-.52,-1.4]],atl:[[-.52,-1.4],[-.4,-1.4],[-.3,-1.2],[-.3,-.7]],tal:[[-.3,-.7],[-.3,.45],[-.1,.75],[.12,.95]],dct:[[.12,.95],[.4,.8],[.6,.98],[.78,.8],[.95,.88]],cd:[[.95,.88],[.95,-1.9]]};
const ORDER=['pct','dtl','atl','tal','dct','cd'],FULL=PATH([].concat(...ORDER.map(k=>SEG[k])));
const INFO={
 gl:['Glomerulus + Bowman capsule','Capillary tuft (fenestrated endothelium) inside Bowman capsule: filters ~125 mL/min (~180 L/day) of plasma. Afferent arteriole (wide) in, efferent (narrow) out keeps the capillary pressure high (~55 mmHg).'],
 pct:['Proximal convoluted tubule (PCT)','Cuboidal cells with brush border + many mitochondria. Reabsorbs ~65% of filtered Na+ + water, ~100% of glucose + amino acids (SGLT2/SGLT1, Na+-amino-acid symporters), most HCO3- (NHE3 + carbonic anhydrase), ~65% K+, phosphate (PTH inhibits), small proteins (endocytosis). Fluid stays ISOTONIC (~300 mOsm/L). Also secretes organic acids/bases + H+.'],
 dtl:['Descending thin limb','Thin squamous cells, aquaporin-1: very permeable to WATER, little solute permeability. Water leaves into the hyperosmotic medulla so the fluid becomes more and more concentrated (up to ~1200 mOsm/L at the tip in juxtamedullary nephrons). ~15% of filtered water.'],
 atl:['Thin ascending limb','Impermeable to water but permeable to NaCl: Na+/Cl- leave passively down their gradient (also urea enters). Fluid becomes progressively more dilute.'],
 tal:['Thick ascending limb (TAL)','NKCC2 (Na+/K+/2Cl-) on the lumen side + Na+/K+-ATPase basolaterally. Impermeable to water: reabsorbs ~25% of filtered Na+ and dilutes the fluid to ~100 mOsm/L ("diluting segment"). Ca2+/Mg2+ follow paracellularly (K+ recycling through ROMK). Loop diuretics (furosemide) block NKCC2. Ends at the macula densa.'],
 dct:['Distal convoluted tubule (DCT)','NCC (Na+/Cl- cotransporter) takes ~5% of filtered Na+. Ca2+ reabsorption through TRPV5, stimulated by PTH. Impermeable to water (still dilute). Thiazide diuretics block NCC (and so lower urinary Ca2+ loss).'],
 cd:['Collecting duct (CD)','Principal cells: ENaC (Na+ in) + ROMK (K+ out), stimulated by ALDOSTERONE; aquaporin-2 water channels inserted by ADH. Intercalated cells: H+-ATPase secrete acid (alpha) or HCO3- (beta). The inner medullary CD is permeable to UREA (ADH), feeding the medullary gradient. Final urine 50-1200 mOsm/L, ~1-2 L/day.'],
 aff:['Afferent arteriole','Wide, thick-walled arteriole delivering blood to the glomerulus: its tone (myogenic + tubuloglomerular feedback) sets glomerular pressure. Contains the juxtaglomerular (renin) cells.'],
 eff:['Efferent arteriole','Narrow arteriole leaving the glomerulus: constricted by angiotensin II (raises glomerular pressure + GFR when mild). Feeds the peritubular capillaries + vasa recta (2nd capillary bed in series).'],
 pcap:['Peritubular capillaries','Low hydrostatic + HIGH oncotic pressure (after filtration the plasma protein is more concentrated): favour reabsorption of fluid from the interstitium.'],
 vasa:['Vasa recta','Long hairpin capillaries beside the loops of Henle (juxtamedullary nephrons): countercurrent EXCHANGERS that carry away reabsorbed water without washing out the medullary gradient. Only ~1-2% of renal blood flow.'],
 md:['Macula densa','Specialised cells at the end of the TAL touching the afferent arteriole: sense NaCl delivery (via NKCC2). High NaCl: signals the afferent arteriole to constrict (tubuloglomerular feedback). Low NaCl: stimulates renin release.'],
 jg:['Juxtaglomerular (JG) cells','Modified smooth-muscle cells in the afferent arteriole wall: store + release RENIN when pressure falls, NaCl delivery falls, or sympathetic nerves fire (beta-1).']};
const NEPH=c=>{const {ad,tb,sp,bx,lb}=c,P={};Object.keys(INFO).forEach(k=>{P[k]=part(INFO[k][0],INFO[k][1],1)});
 bx(.05,1.2,-.1,2.9,1.1,.02,0xffb0b8,P.gl,.1);bx(.05,-.1,-.1,2.9,1.0,.02,0xc87870,P.gl,.1);bx(.05,-1.2,-.1,2.9,1.2,.02,0x883838,P.gl,.1);
 sp(0,1.15,0,.3,.3,.05,0xbfe0ff,P.gl,.32);sp(0,1.15,0,.2,.2,.05,0xd8232f,P.gl,.95);
 const W={pct:.05,dtl:.028,atl:.028,tal:.045,dct:.04,cd:.05},COL={pct:0xf0a040,dtl:0x8fc8ff,atl:0xb8a8ff,tal:0x6fd08a,dct:0xe8d070,cd:0xd9a0d0},M={};
 ORDER.forEach(k=>{M[k]=tb(SEG[k].map(p=>[p[0],p[1],0]),W[k],COL[k],P[k],.95)});
 tb([[1.0,1.6,0],[.55,1.35,0],[.3,1.22,0]],.04,0xd8232f,P.aff,.97);tb([[.3,1.05,0],[.45,.7,0],[.35,.3,0]],.025,0xb02030,P.eff,.97);
 tb([[.35,.3,0],[.1,.5,0],[-.4,.55,0]].concat([[-.8,.8,0]]),.014,0x8a4a9a,P.pcap,.9);tb([[-.8,.5,0],[-.85,1.05,0]],.012,0x8a4a9a,P.pcap,.9);
 tb([[.35,.3,0],[-.5,.1,0],[-.5,-1.25,0]],.018,0xe04a4a,P.vasa,.95);tb([[-.5,-1.25,0],[-.44,-1.3,0],[-.42,-1.2,0],[-.42,.15,0],[.1,.3,0]],.018,0x5a6ad8,P.vasa,.95);
 sp(.12,.99,0,.04,.04,.03,0x1a6a3a,P.md,1);[0,1,2].forEach(i=>sp(.36+i*.03,1.18+i*.04,0,.025,.025,.02,0xf2c84a,P.jg,1));
 return {P,M,ORDER};};
/* dots crossing the tubule wall (lumen -> interstitium: dir=1, interstitium -> lumen: dir=-1) */
const XFER=(c,seg,n,col,dir,r)=>{const pa=PATH(SEG[seg]),D=[];for(let i=0;i<n;i++)D.push({m:c.dc(new T.SphereGeometry(r||.025,8,6),col,0,0,0,{op:1}),u:.05+.9*i/Math.max(1,n-1),o:i/Math.max(1,n)});
 return on=>{const s=performance.now()/1000;D.forEach(d=>{d.m.visible=on;const ph=(s*.6+d.o)%1,p=pa.at(d.u),off=dir>0?(.03+.2*ph):(.23-.2*ph);d.m.position.set(p[0]+off,p[1],.06)})}};
const stateBtn=(id,key,names,node)=>{EYX.btn[id]=b=>{EYX[key]=((EYX[key]||0)+1)%names.length;EYX.show(node)};return '<button id="'+id+'" class="on">'+names[EYX[key]||0]+'</button>'};

/* ---------- HUB ---------- */
EYX.N.renal=['Kidney physiology',c=>{
 const H=[['Glomerular filtration','rgf',0xd8232f,'Filtration barrier: endothelium, GBM, podocytes'],['GFR + Starling forces','rgfr',0xff7a5a,'Pressures, autoregulation'],['Renal blood flow','rflow',0xe04a4a,'Aorta to renal vein'],['Transport mechanism','rtrans',0xf0a040,'Segment-wise Na+, glucose, AA, water'],['Tubular reabsorption','rreab',0xe8c070,'PCT, loop, DCT + glucose Tm'],['Tubular secretion','rsecr',0x6fd08a,'H+, K+, organic anions/cations'],['Countercurrent mechanism','rcounter',0x6fa8e8,'Loop multiplier + gradient'],['Vasa recta explorer','rvasa',0x8a7ad8,'Countercurrent exchange'],['Juxtaglomerular apparatus','rjga',0xb890ff,'Macula densa, JG cells, renin'],['Hormonal regulation','rhorm',0xff8aa0,'ADH, aldosterone, ANP, Ang II'],['Nephron types','rtypes',0x8fc8ff,'Cortical vs juxtamedullary'],['Renal innervation','rinnerv',0xf2e08a,'Sympathetic supply'],['Urine formation timeline','rtime',0xffb060,'Filtration > reabsorption > secretion > excretion']];
 H.forEach((h,i)=>{const P=part(h[0],h[3],1,'E:'+h[1]);c.bx(i%2?.9:-.9,(6-Math.floor(i/2))*.55-.0,0,1.7,.45,.06,h[2],P,.95)});
 c.lb(H.map((h,i)=>[h[0],[i%2?.9:-.9,(6-Math.floor(i/2))*.55,.1]]),'#ffffff');c.txt('Kidney physiology: 13 scenes, ek nephron schematic par');
 return {t:'Kidney physiology',s:'13 topics | card par tap karein',rd:8,rm:11,cam:[0,.05],tg:[0,1.65,0]}}];EYX.libAdd&&EYX.libAdd('Kidney physiology (13 scenes)','renal',0xe04a4a,'Filtration, GFR, transport, countercurrent, JGA, hormones, flow');

/* ---------- 1 GLOMERULAR FILTRATION (barrier cross-section) ---------- */
EYX.N.rgf=['Glomerular filtration',c=>{
 const {ad,tb,sp,bx,dc,lb,txt}=c,ST=EYX.gfS||0,
  P1=part('Capillary lumen (blood)','Blood in the glomerular capillary: RBCs, platelets, plasma proteins + water + small solutes.',1),
  P2=part('Fenestrated endothelium','Endothelial cells with large pores (fenestrae, 70-100 nm, no diaphragm): block blood cells, not proteins. Covered by a negative glycocalyx.',1),
  P3=part('Glomerular basement membrane (GBM)','Gel of type IV collagen, laminin + heparan sulfate (NEGATIVE charge): size + CHARGE barrier. Albumin (negative, ~3.6 nm) is repelled. Alport syndrome = type IV collagen defect.',1),
  P4=part('Podocyte foot processes + slit diaphragm','Interdigitating foot processes; the slit diaphragm (nephrin, podocin; ~4 nm pores) is the last barrier. Minimal-change disease: foot-process effacement > nephrotic syndrome.',1),
  P5=part('Bowman space (filtrate)','Protein-free ultrafiltrate: same composition as plasma without proteins/cells. ~20% of the plasma that enters is filtered (filtration fraction).',1),
  P6=part('Mesangial cells','Support the capillary loops, phagocytose debris, contract to regulate surface area (Kf). IgA nephropathy deposits here.',1),
  P7=part('Podocyte cell body','Glomerular visceral epithelial cell: wraps the capillaries with its foot processes.',1);
 EYX.btn.eygf=b=>{EYX.gfS=((EYX.gfS||0)+1)%3;EYX.show('rgf')};
 bx(-.8,0,-.05,.9,2.4,.02,0xd8232f,P1,.25);bx(-.4,0,0,.07,2.4,.05,0xffd0d8,P2,.9);for(let i=0;i<9;i++)bx(-.4,-1.0+i*.25,.0,.09,.1,.07,0x0a0a14,P2,1);
 bx(-.27,0,0,.18,2.4,.06,0xf2d070,P3,.95);for(let i=0;i<10;i++){bx(-.12,-1.1+i*.24,0,.14,.14,.07,0xb890ff,P4,.95);bx(-.03,-1.1+i*.24+.12,0,.04,.1,.05,0x2f9a5a,P4,.9)}
 sp(.55,0,0,.35,1.0,.1,0xd8b0ff,P7,.7);bx(.75,0,-.05,.9,2.4,.02,0xbfe8ff,P5,.18);sp(-.2,-.55,.0,.16,.14,.05,0x9fd0e8,P6,.6);
 const T0=[[0x6fa8ff,.025,0,'w'],[0xf2c84a,.03,0,'g'],[0xff9a40,.02,0,'u'],[0xb060ff,.055,1,'a'],[0xd8232f,.1,2,'r']],Q=[];for(let i=0;i<22;i++){const t=T0[i%5];Q.push({m:dc(new T.SphereGeometry(t[1],t[3]=='r'?12:8,6),t[0],0,0,0,{op:1,s:t[3]=='r'?[1,1,.4]:undefined}),x:-1.2+Math.random()*.8,y:-1.0+Math.random()*2.0,k:t[3],vy:.15*(Math.random()-.5),sp:.3+.3*Math.random()})}
 let t0=0;fx.push(s=>{const dt=Math.min(.1,s-t0);t0=s;Q.forEach(q=>{q.y+=q.vy*dt;if(q.y>1.15||q.y<-1.15)q.vy*=-1;let pass=q.k=='w'||q.k=='g'||q.k=='u'||(q.k=='a'&&ST==1)||(q.k=='r'&&ST==2);
   if(q.x<-.45)q.x+=dt*q.sp;else if(pass){q.x+=dt*q.sp}else{q.x=-1.2+Math.random()*.3;q.y=-1.0+Math.random()*2}
   if(q.x>1.1){q.x=-1.2;q.y=-1.0+Math.random()*2}q.m.position.set(q.x,q.y,.1)});
  txt(['NORMAL: water + small solutes pass; albumin (large + negative) and RBCs are held back by the 3-layer barrier','NEPHROTIC pattern (loss of charge/foot processes): ALBUMIN leaks > proteinuria (> 3.5 g/day), oedema, foamy urine','NEPHRITIC pattern (barrier ruptured): RBCs leak > haematuria (cola-coloured urine), RBC casts, hypertension'][ST])});
 lb([['Blood',[-1.2,1.3,0]],['Endothelium + fenestrae',[-.45,1.35,0]],['GBM',[-.2,-1.35,0]],['Podocyte feet + slit',[.1,1.35,0]],['Bowman space',[1.0,-1.35,0]],['Water / glucose / urea',[-1.2,-1.35,0]],['Albumin',[-.9,.6,0]],['RBC',[-.9,-.2,0]]],'#ffffff');
 return {t:'Glomerular filtration barrier',s:'State button: normal / nephrotic / nephritic',rd:6,rm:9.5,cam:[0,.05],tg:[0,0,0],ex:'<button id="eygf" class="on">'+['Normal','Nephrotic (albumin leaks)','Nephritic (RBC leak)'][ST]+'</button>'}}];

/* ---------- 2 GFR + Starling forces + autoregulation ---------- */
EYX.N.rgfr=['GFR + Starling forces',c=>{
 const {ad,tb,bx,sp,dc,lb,txt}=c,S=EYX.grS||0,MP=[60,100,150,200][EYX.mapS||0],
  ST=[['Normal',55,30,15],['Afferent constriction',48,30,15],['Efferent constriction (mild)',62,30,15],['Ureteric obstruction (stone)',55,30,30],['Low plasma protein',55,20,15],['Dehydration (high oncotic)',55,38,15]][S],
  P1=part('Glomerular capillary pressure (PGC ~55 mmHg)','Pushes fluid OUT of the capillary: the main driving force. Raised by efferent constriction, lowered by afferent constriction or low blood pressure.',1),
  P2=part('Capillary oncotic pressure (piGC ~30 mmHg)','Plasma proteins hold water IN. It rises along the capillary as protein-free fluid is filtered (filtration equilibrium may be reached).',1),
  P3=part('Bowman capsule pressure (PBC ~15 mmHg)','Back-pressure from the filtrate in Bowman space. Rises with ureteric obstruction (stone, prostate enlargement).',1),
  P4=part('Net filtration pressure (NFP ~10 mmHg)','NFP = PGC - piGC - PBC = 55 - 30 - 15 = 10 mmHg. GFR = Kf x NFP (Kf = filtration coefficient: surface area x permeability).',1),
  P5=part('GFR (normal ~125 mL/min)','~180 L/day. Estimated clinically from creatinine (eGFR); below 60 mL/min for 3 months = chronic kidney disease. Autoregulation keeps GFR + RBF constant for a mean arterial pressure of ~80-180 mmHg (myogenic response + tubuloglomerular feedback).',1),
  P6=part('Autoregulation curve','GFR stays flat between MAP ~80 and ~180 mmHg; below ~60-70 mmHg it falls steeply (shock > acute kidney injury). Drugs (ACE inhibitors, NSAIDs) can impair it.',1);
 EYX.btn.eygs=b=>{EYX.grS=(S+1)%6;EYX.show('rgfr')};EYX.btn.eymp=b=>{EYX.mapS=((EYX.mapS||0)+1)%4;EYX.show('rgfr')};
 const nfp=ST[1]-ST[2]-ST[3],gfr=Math.max(0,Math.round(nfp*12.5)),h=v=>v*.026;
 bx(-1.2,h(ST[1])/2+.3,0,.35,h(ST[1]),.05,0xd8232f,P1,.97);bx(-.7,h(ST[2])/2+.3,0,.35,h(ST[2]),.05,0x2f6fe0,P2,.97);bx(-.2,h(ST[3])/2+.3,0,.35,h(ST[3]),.05,0x2fb060,P3,.97);bx(.45,Math.max(.02,h(Math.abs(nfp)))/2+.3,0,.35,Math.max(.02,h(Math.abs(nfp))),.05,nfp>0?0xffd24a:0x888888,P4,.97);
 bx(.45,.15,0,.9,.05,.04,0xffffff,P4,.5);
 const gb=bx(1.15,Math.min(1.5,gfr/125*.5)/2+.3,0,.3,Math.min(1.5,gfr/125*.5),.05,gfr<60?0xe8453a:0x6fe08a,P5,.97);
 const X=m=>-1.3+(m-30)/200*2.6,Y=g=>-1.6+g/250*1.0,curve=[];for(let m=30;m<=230;m+=5){const g=m<80?(m-30)/50*125:m<=180?125:125+(m-180)*1.8;curve.push([X(m),Y(g),0])}
 tb(curve,.02,0x6fd0ff,P6,.97);tb([[-1.3,-1.6,0],[1.3,-1.6,0]],.01,0xffffff,P6,.7);tb([[-1.3,-1.6,0],[-1.3,-.5,0]],.01,0xffffff,P6,.7);
 const mg=Math.round(MP<80?(MP-30)/50*125:MP<=180?125:125+(MP-180)*1.8);sp(X(MP),Y(mg),0,.06,.06,.03,0xffd24a,P6,1);
 lb([['PGC',[-1.2,.15,0]],['pi GC',[-.7,.15,0]],['PBC',[-.2,.15,0]],['NFP '+nfp,[.45,.1,0]],['GFR '+gfr,[1.15,.1,0]],['MAP '+MP,[X(MP),Y(mg)+.25,0]],['Autoregulation',[0,-.55,0]],['MAP 80',[X(80),-1.75,0]],['MAP 180',[X(180),-1.75,0]]],'#ffffff');
 txt(ST[0]+': NFP = '+ST[1]+' - '+ST[2]+' - '+ST[3]+' = '+nfp+' mmHg > GFR ~ '+gfr+' mL/min. MAP '+MP+(MP>=80&&MP<=180?': autoregulated, GFR stays ~125':': outside the autoregulatory range'));
 return {t:'GFR: Starling forces + autoregulation',s:'State + MAP buttons | bars: forces, curve: autoregulation',rd:6,rm:10,cam:[0,.05],tg:[0,-.3,0],ex:'<button id="eygs" class="on">'+ST[0]+'</button><button id="eymp" class="on">MAP '+MP+'</button>'}}];

/* ---------- 3 RENAL BLOOD FLOW ---------- */
EYX.N.rflow=['Renal blood flow',c=>{
 const {ad,tb,sp,dc,lb,txt}=c,Pn=[['Renal artery','Direct branch of the abdominal aorta (L1-L2). Kidneys receive ~20-25% of cardiac output (~1.1-1.2 L/min = renal blood flow; renal PLASMA flow ~625 mL/min).',0xd8232f],['Segmental + interlobar arteries','Segmental arteries (5 end arteries: a segmental infarct is wedge-shaped) > interlobar arteries run between the medullary pyramids in the renal columns.',0xd8232f],['Arcuate arteries','Arch over the base of each pyramid at the corticomedullary junction.',0xd8232f],['Interlobular (cortical radiate) arteries','Run outward in the cortex.',0xd8232f],['Afferent arteriole + glomerulus (1st capillary bed)','High-pressure capillary bed (~55 mmHg): filtration.',0xff7a5a],['Efferent arteriole','Resistance vessel between the two capillary beds.',0xb02030],['Peritubular capillaries + vasa recta (2nd capillary bed)','Low-pressure bed (~10-15 mmHg): reabsorption. Cortex gets >90% of RBF; medulla only ~5-10% (low flow protects the concentration gradient but makes it vulnerable to hypoxia).',0x8a4a9a],['Interlobular > arcuate > interlobar veins','Veins follow the arteries back (no segmental veins; they anastomose).',0x2f6fe0],['Renal vein','Leaves at the hilum in FRONT of the artery: left renal vein is longer and crosses in front of the aorta to the IVC (nutcracker + left gonadal vein drains into it).',0x2f6fe0]],P=Pn.map(q=>part(q[0],q[1],1)),T3=a=>a.map(p=>[p[0],p[1],0]);
 SHPk(c);function SHPk(c){const {SHP,ELL}=EYX.h;SHP(c,ELL(0,0,1.35,1.6,0,48),0xf2b0a8,P[3],.6);SHP(c,ELL(-.05,0,1.05,1.3,0,48),0xc87870,P[3],.6);[[-1,.55],[-.2,.1],[-.8,-.7]].forEach(q=>SHP(c,ELL(q[0]+.25,q[1],.35,.3,0,20),0x883838,P[3],.7))}
 const route=[[-2.2,.1],[-1.4,.1],[-.9,.15],[-.55,.45],[-.2,.7],[.05,.85],[.35,.7],[.65,.75],[.95,.55],[1.15,.4],[1.2,.3],[1.05,.1],[.8,.0],[.55,.05],[.2,-.1],[-.1,-.2],[-.35,-.1],[-.6,-.05],[-.95,-.1],[-1.4,-.15],[-2.2,-.15]],idx=[0,3,5,7,9,10,11,13,15,20];
 const seg=(a,b,i,col)=>tb(T3(route.slice(a,b+1)),i==0?.07:i<4?.045:.03,col,P[i],.95);
 seg(0,2,0,0xd8232f);seg(2,4,1,0xd8232f);seg(4,6,2,0xd8232f);seg(6,8,3,0xd8232f);seg(8,9,4,0xff7a5a);seg(9,10,5,0xb02030);seg(10,12,6,0x8a4a9a);seg(12,15,7,0x2f6fe0);seg(15,20,8,0x2f6fe0);
 sp(1.2,.33,0,.1,.1,.04,0xd8232f,P[4],.95);tb(T3([[1.2,.3],[1.4,.15],[1.3,-.05],[1.1,.05]]),.02,0x8a4a9a,P[6],.9);
 [[-.1,1.1],[.3,1.3],[-.6,-1.0],[0,-1.3]].forEach(q=>tb(T3([[-.8,.1],[q[0],q[1]]]),.02,0xd8232f,P[1],.9));
 const cp=PATH(route),D=[];for(let i=0;i<14;i++)D.push(dc(new T.SphereGeometry(.035,8,6),0xd8232f,0,0,0,{op:1}));
 fx.push(s=>{D.forEach((d,i)=>{const u=(s*.07+i/14)%1,p=cp.at(u),ox=u<.4?0xd8232f:u<.55?0xb02030:u<.65?0x8a4a9a:0x3f5fd8;d.material.color.setHex(ox);d.position.set(p[0],p[1],.08)});
  const u0=(s*.07)%1;txt(u0<.35?'Renal artery > segmental > interlobar > arcuate > interlobular arteries':u0<.5?'Afferent arteriole > glomerulus (1st capillary bed: FILTRATION) > efferent arteriole':u0<.65?'2nd capillary bed (peritubular + vasa recta): REABSORPTION. Blood is still oxygenated (O2 extraction only ~10%)':'Venous return: interlobular > arcuate > interlobar veins > renal vein > IVC')});
 lb([['Renal artery',[-1.9,.35,0]],['Interlobar',[-.5,.8,0]],['Arcuate',[.5,1.05,0]],['Interlobular',[1.2,.75,0]],['Glomerulus',[1.5,.4,0]],['Peritubular + vasa recta',[1.4,-.2,0]],['Veins',[.2,-.5,0]],['Renal vein',[-1.9,-.4,0]]],'#ffffff');
 return {t:'Renal blood flow pathway',s:'Aorta > kidney > two capillary beds > IVC | tap each generation',rd:6,rm:9.5,cam:[0,.05],tg:[-.3,0,0]}}];

/* ---------- 4 TRANSPORT MECHANISM (segment-wise) ---------- */
const TR=[['pct','PCT: ~65% of Na+ + water, 100% glucose + amino acids, HCO3-: SGLT2, Na+-AA symporters, NHE3, Na+/K+-ATPase; aquaporin-1',[[0xf2c84a,1],[0xffffff,1],[0x6fa8ff,1]]],['dtl','Descending thin limb: WATER leaves (AQP1), solutes stay > fluid becomes concentrated',[[0x6fa8ff,1]]],['atl','Thin ascending limb: NaCl leaves passively, no water',[[0xffffff,1]]],['tal','Thick ascending limb: NKCC2 takes Na+/K+/2Cl- (~25%), no water > dilute fluid (loop diuretic target)',[[0xffffff,1],[0xff7a9a,1]]],['dct','DCT: NCC takes Na+/Cl- (~5%), Ca2+ (PTH): thiazide target; no water',[[0xffffff,1],[0xb8e0ff,1]]],['cd','Collecting duct: Na+ in (ENaC) + K+ out (aldosterone), water via AQP2 (ADH), H+ secretion (intercalated cells), urea',[[0xffffff,1],[0x6fa8ff,1],[0xff7a9a,-1]]]];
EYX.N.rtrans=['Transport mechanism',c=>{
 const NE=NEPH(c),S=EYX.trS||0,t=TR[S];NE.ORDER.forEach(k=>NE.M[k].material.opacity=k==t[0]?1:.3);
 const X=t[2].map((q,i)=>XFER(c,t[0],5,q[0],q[1],.03));
 fx.push(s=>{X.forEach(f=>f(true));c.txt(t[1])});
 c.lb([['Glomerulus',[0,1.62,0]],['PCT',[-.9,1.0,0]],['Descending limb',[-.95,-.3,0]],['Thin ascending',[-.05,-1.5,0]],['TAL',[.05,-.2,0]],['DCT',[.7,1.2,0]],['Collecting duct',[1.3,-.3,0]]],'#ffffff');
 return {t:'Transport mechanism: segment by segment',s:'Segment button | white = Na+/Cl-, yellow = glucose, blue = water',rd:6,rm:9.5,cam:[0,.05],tg:[.1,-.2,0],ex:stateBtn('eytr','trS',['PCT','Descending limb','Thin ascending','Thick ascending','DCT','Collecting duct'],'rtrans')}}];

/* ---------- 5 TUBULAR REABSORPTION: fractions + glucose titration ---------- */
EYX.N.rreab=['Tubular reabsorption',c=>{
 const {ad,tb,bx,sp,lb,txt}=c,V=EYX.rbS||0,
  P1=part('PCT: ~65% Na+ and water','Bulk, isotonic reabsorption; all glucose + amino acids.',1),P2=part('Loop of Henle','Descending limb: ~15% of water. Thick ascending limb: ~25% of Na+ (no water).',1),P3=part('DCT: ~5% Na+','Fine-tuned (thiazide-sensitive).',1),P4=part('Collecting duct: ~4% Na+, variable water','Hormone-controlled: aldosterone (Na+), ADH (water). Final adjustment of urine volume + concentration.',1),P5=part('Excreted: ~1% Na+, ~1% water','Less than 1% of filtered Na+ + water appears in the urine: tiny errors in reabsorption = big changes in excretion.',1),
  P6=part('Glucose filtered load','= GFR x plasma glucose. Rises linearly with plasma glucose.',1),P7=part('Glucose reabsorbed (Tm ~375 mg/min)','SGLT2 (S1, ~90%) + SGLT1 (S3, ~10%) are saturable: transport maximum (Tm) ~375 mg/min; the "splay" (rounded corner) is because nephrons differ.',1),P8=part('Glucose excreted (renal threshold ~180-200 mg/dL)','Glucose appears in the urine above ~180-200 mg/dL plasma (diabetes mellitus > glycosuria + osmotic diuresis). SGLT2 inhibitors (empagliflozin, dapagliflozin) lower the threshold on purpose.',1);
 EYX.btn.eyrb=b=>{EYX.rbS=1-(EYX.rbS||0);EYX.show('rreab')};
 if(V==0){const rows=[['Na+',[65,25,5,4,1],0xf0a040],['Water',[65,15,0,19,1],0x6fa8ff]],Ps=[P1,P2,P3,P4,P5],cols=[0xf0a040,0x6fd08a,0xe8d070,0xd9a0d0,0xff7a7a];
  rows.forEach((r,ri)=>{let x=-1.3;r[1].forEach((v,i)=>{const w=v/100*2.6;if(w>0)bx(x+w/2,.9-ri*.8,0,w-.01,.45,.05,cols[i],Ps[i],.97);x+=w})});
  lb([['Na+',[-1.75,.9,0]],['Water',[-1.75,.1,0]],['PCT 65%',[-.45,1.45,0]],['Loop',[.95,1.45,0]],['DCT + CD',[1.05,.55,0]],['Excreted ~1%',[1.0,-.45,0]]],'#ffffff');
  txt('Fractions of the FILTERED load reabsorbed in each segment (approximate; water in the collecting duct depends on ADH). The loop reabsorbs ~25% Na+ but ~15% water.')}
 else{const X=p=>-1.3+p/600*2.6,Y=m=>-.8+m/750*1.8,F=[],R=[],E=[];for(let p=0;p<=600;p+=15){const f=1.25*p,r=f*375/Math.pow(Math.pow(f,4)+Math.pow(375,4),.25),e=f-r;F.push([X(p),Y(f),0]);R.push([X(p),Y(r),0]);E.push([X(p),Y(e),0])}
  tb(F,.02,0xf2c84a,P6,.97);tb(R,.025,0x6fd08a,P7,.97);tb(E,.025,0xff7a7a,P8,.97);tb([[X(0),Y(0),0],[X(600),Y(0),0]],.01,0xffffff,P6,.6);tb([[X(0),Y(0),0],[X(0),Y(750),0]],.01,0xffffff,P6,.6);
  tb([[X(200),Y(0),0],[X(200),Y(750),0]],.008,0xffffff,P8,.35);
  lb([['Filtered',[X(380),Y(600)+.1,0]],['Reabsorbed (Tm)',[X(520),Y(330),0]],['Excreted',[X(540),Y(190),0]],['Threshold ~200 mg/dL',[X(200),Y(750)+.12,0]],['Plasma glucose >',[0,-1.0,0]]],'#ffffff');
  txt('Glucose titration curve: reabsorption saturates at Tm ~375 mg/min; above plasma glucose ~200 mg/dL glucose spills into the urine (glycosuria)')}
 return {t:'Tubular reabsorption',s:'View button: segment fractions / glucose Tm',rd:6,rm:9.5,cam:[0,.05],tg:[0,.2,0],ex:'<button id="eyrb" class="on">'+(V?'View: glucose Tm':'View: fractions')+'</button>'}}];

/* ---------- 6 TUBULAR SECRETION ---------- */
const SC=[['H+ (acid)','pct',[0xff7a9a],'H+ secreted by NHE3 (PCT) and H+-ATPase of intercalated alpha cells (collecting duct): regulates blood pH; titratable acid + NH4+ carry H+ in the urine.'],['K+','cd',[0xff9a40],'K+ secreted by principal cells (ROMK), driven by ALDOSTERONE + high flow: hyperkalaemia is treated by increasing this (diuretics); K+-sparing drugs block ENaC/aldosterone.'],['Organic anions (PAH, penicillin, uric acid, diuretics)','pct',[0x6fd08a],'OAT1/OAT3 on the basolateral side move them from the peritubular capillary into the cell, then into the lumen. Probenecid competes: prolongs penicillin action. PAH clearance ~ renal plasma flow (~625 mL/min).'],['Organic cations (creatinine part, cimetidine, morphine)','pct',[0xb890ff],'OCT2 (in) + MATE (out) in the PCT. Creatinine is mainly filtered but ~10-15% is secreted: so creatinine clearance slightly overestimates GFR.'],['Ammonium (NH4+)','pct',[0xffd24a],'Made from glutamine in the PCT and secreted: the main way new bicarbonate is generated in chronic acidosis.']];
EYX.N.rsecr=['Tubular secretion',c=>{
 const NE=NEPH(c),S=EYX.scS||0,t=SC[S];NE.ORDER.forEach(k=>NE.M[k].material.opacity=k==t[1]?1:.3);
 const X=XFER(c,t[1],7,t[2][0],-1,.03);fx.push(s=>{X(true);c.txt(t[0]+': '+t[3])});
 const P=part('Secretion: why it matters','Secretion moves substances from the peritubular blood INTO the tubule lumen, adding to filtration: it clears substances bound to protein (so not filtered), drugs + toxins, and fine-tunes K+ and acid-base balance.',1);c.sp(1.3,1.4,0,.12,.12,.05,0x6fd08a,P,1);
 c.lb([['PCT',[-.9,1.0,0]],['Collecting duct',[1.3,-.3,0]],['Peritubular capillary',[-.2,.4,0]]],'#ffffff');
 return {t:'Tubular secretion',s:'Substance button | dots move capillary > lumen',rd:6,rm:9.5,cam:[0,.05],tg:[.1,-.2,0],ex:stateBtn('eysc','scS',SC.map(q=>q[0].split(' (')[0]),'rsecr')}}];

/* ---------- 7 COUNTERCURRENT MECHANISM ---------- */
EYX.N.rcounter=['Countercurrent mechanism',c=>{
 const NE=NEPH(c),S=EYX.ccS||0,Pm=part('Medullary osmotic gradient','Interstitial osmolarity rises from ~300 mOsm/L in the cortex to ~1200 mOsm/L at the papilla tip. It is built by the loop of Henle (countercurrent MULTIPLIER) + urea recycling, and kept by the vasa recta (countercurrent EXCHANGER).',1);c.bx(1.5,-.4,0,.12,3.2,.04,0xffd24a,Pm,.9);
 const steps=[['Step 1: SINGLE EFFECT. The thick ascending limb pumps NaCl out (NKCC2 + Na+/K+-ATPase) but is water-tight: the interstitium becomes hyperosmotic (~+200 mOsm/L over the tubule fluid)','tal',[0xffffff,1]],['Step 2: The descending limb (AQP1) equilibrates with the hyperosmotic interstitium: water leaves, the fluid inside gets concentrated','dtl',[0x6fa8ff,1]],['Step 3: The concentrated fluid flows round the bend; more NaCl is pumped out of the ascending limb: the gradient is MULTIPLIED down the medulla (to ~1200 mOsm/L)','atl',[0xffffff,1]],['Step 4: ADH: collecting duct becomes water-permeable (AQP2): water leaves down the gradient > small volume of concentrated urine; urea (UT-A1) leaves the inner CD and recycles into the thin limbs','cd',[0x6fa8ff,1]]],q=steps[S];
 NE.ORDER.forEach(k=>NE.M[k].material.opacity=k==q[1]?1:.35);const X=XFER(c,q[1],6,q[2][0],q[2][1],.03);
 fx.push(s=>{X(true);c.txt(q[0])});
 c.lb([['300',[1.5,1.0,0]],['500',[1.5,.1,0]],['700',[1.5,-.5,0]],['900',[1.5,-1.0,0]],['1200 mOsm/L',[1.5,-1.55,0]],['Fluid: 300',[-.9,.5,0]],['Fluid: 1200 (tip)',[-.4,-1.65,0]],['Fluid: 100 (dilute)',[.2,.45,0]]],'#ffe9a0');
 return {t:'Countercurrent mechanism',s:'Step button | gradient 300 > 1200 mOsm/L',rd:6,rm:9.5,cam:[0,.05],tg:[.2,-.2,0],ex:stateBtn('eycc','ccS',['Step 1','Step 2','Step 3','ADH + urea'],'rcounter')}}];

/* ---------- 8 VASA RECTA ---------- */
EYX.N.rvasa=['Vasa recta explorer',c=>{
 const NE=NEPH(c),Pm=part('Countercurrent exchange','Blood flows DOWN the descending vasa recta (solutes enter, water leaves) and UP the ascending vasa recta (solutes leave, water enters): the two flows are opposite and close, so the salt is trapped in the medulla instead of being washed away. Slow flow (1-2% of RBF) helps. High flow (e.g. diuretics, vasodilation) washes the gradient out and weakens concentrating ability.',1);
 NE.ORDER.forEach(k=>NE.M[k].material.opacity=.4);c.bx(-.46,-.55,.05,.3,1.8,.02,0xffd24a,Pm,.18);
 const D=[0,1,2,3,4,5,6,7].map(i=>({s:c.dc(new T.SphereGeometry(.03,8,6),0xffffff,0,0,0,{op:1}),w:c.dc(new T.SphereGeometry(.026,8,6),0x6fa8ff,0,0,0,{op:1}),o:i/8}));
 fx.push(s=>{D.forEach(d=>{const u=(s*.25+d.o)%1;d.s.position.set(u<.5?lerp(-.6,-.5,u*2):lerp(-.4,-.3,(u-.5)*2),u<.5?lerp(.2,-1.3,u*2):lerp(-1.3,.2,(u-.5)*2),.07);d.s.material.color.setHex(u<.5?0xffffff:0xff7a7a);
  d.w.position.set(u<.5?-.56+.28*u:-.35,u<.5?lerp(.0,-1.2,u*2):lerp(-1.2,.0,(u-.5)*2),.07)});
  c.txt('Descending vasa recta (red): picks up NaCl + urea, loses water. Ascending (blue): loses NaCl + urea back to the medulla, gains water: the gradient survives')});
 c.lb([['Descending vasa recta',[-1.35,-.4,0]],['Ascending vasa recta',[.45,-.7,0]],['Loop of Henle',[-1.2,.2,0]],['Gradient kept',[-.45,-1.7,0]]],'#ffffff');
 return {t:'Vasa recta: countercurrent exchange',s:'White = NaCl/urea, blue = water',rd:5.5,rm:9,cam:[0,.05],tg:[-.4,-.6,0]}}];

/* ---------- 9 JUXTAGLOMERULAR APPARATUS ---------- */
EYX.N.rjga=['Juxtaglomerular apparatus',c=>{
 const {ad,tb,sp,bx,dc,lb,txt}=c,S=EYX.jaS||0,
  P1=part('Juxtaglomerular (granular) cells','Modified smooth-muscle cells in the AFFERENT arteriole wall with renin granules. Release renin when: (1) perfusion pressure falls (baroreceptor), (2) macula densa senses low NaCl, (3) sympathetic beta-1 activation.',1),
  P2=part('Macula densa','Dense, tall cells of the TAL/DCT wall facing the arterioles; sense NaCl delivery (NKCC2). High NaCl: ATP/adenosine > afferent constriction. Low NaCl: PGE2 + NO > renin release.',1),
  P3=part('Extraglomerular mesangial (lacis) cells','Cells in the triangle between afferent + efferent arterioles + macula densa: pass the signal on (gap junctions).',1),
  P4=part('Afferent arteriole','Constricts in tubuloglomerular feedback or sympathetic activity (alpha-1): GFR falls.',1),P5=part('Efferent arteriole','Constricted by angiotensin II: raises glomerular pressure.',1),
  P6=part('Glomerulus','The filtering unit next to the vascular pole.',1),P7=part('Distal tubule (TAL end) in contact','The same nephron\'s tubule loops back to touch its own glomerulus: that is what makes the feedback loop possible.',1),
  P8=part('Sympathetic nerve fibre','Renal sympathetic nerves end on JG cells (beta-1 > renin) and arterioles (alpha-1 > constriction).',1),
  P9=part('RAAS chain','Renin cleaves angiotensinogen (liver) > angiotensin I > ACE (lung/endothelium) > ANGIOTENSIN II: efferent constriction, PCT Na+ reabsorption, aldosterone, ADH, thirst, vasoconstriction. ACE inhibitors + ARBs block this: lower BP + protect the kidney.',1);
 EYX.btn.eyja=b=>{EYX.jaS=((EYX.jaS||0)+1)%3;EYX.show('rjga')};
 sp(-1.4,0,0,.9,1.1,.1,0xd8232f,P6,.9);sp(-1.4,0,0,1.15,1.35,.08,0xbfe0ff,P6,.25);
 const A=tb([[-.6,.45,0],[.2,.55,0],[1.6,.65,0]],.17*(S==1?.65:1),0xd85a60,P4,.9),E=tb([[-.6,-.45,0],[.2,-.55,0],[1.6,-.65,0]],.1,0xa02030,P5,.92);
 tb([[.55,-1.8,0],[.55,-.4,0],[.5,.0,0],[.55,1.8,0]],.2,0x6fd08a,P7,.9);
 [0,1,2,3].forEach(i=>sp(.3,-.3+i*.2,.05,.07,.1,.06,0x1a6a3a,P2,1));[0,1,2,3,4].forEach(i=>sp(-.1+i*.2,.62,.1,.07,.07,.07,0xf2c84a,P1,1));[0,1,2].forEach(i=>sp(.0+i*.12,.08-.04*i,.0,.07,.07,.05,0x9aa8d8,P3,.95));
 tb([[1.7,1.2,0],[.9,.95,0],[.45,.75,0]],.018,0xf2e08a,P8,.95);ad(new T.BoxGeometry(.5,.14,.05),0xffe36a,-.4,1.65,0,{op:.95},P9);
 const R=Array.from({length:10},(_,i)=>({m:dc(new T.SphereGeometry(.035,8,6),0xffe36a,0,0,0,{op:1}),o:i/10}));
 fx.push(s=>{R.forEach(r=>{const u=(s*.2+r.o)%1;r.m.visible=S==2;r.m.position.set(.2+u*1.5,.62+.1*Math.sin(u*9),.12)});
  txt(['Normal: the macula densa samples tubular NaCl and keeps GFR + renin matched to need','HIGH NaCl delivery (GFR too high): the macula densa signals: adenosine > AFFERENT arteriole constricts (narrower) > GFR falls = tubuloglomerular feedback','LOW BP or low NaCl: JG cells release RENIN (yellow) > angiotensin II > efferent constriction + aldosterone: restores BP and GFR'][S])});
 lb([['Glomerulus',[-1.4,-1.35,0]],['Afferent',[1.4,.95,0]],['Efferent',[1.4,-.95,0]],['JG cells',[.35,.9,0]],['Macula densa',[.9,-.2,0]],['Lacis cells',[-.05,-.15,0]],['Distal tubule',[.9,-1.6,0]],['Sympathetic',[1.4,1.35,0]]],'#ffffff');
 return {t:'Juxtaglomerular apparatus',s:'State button: normal / high NaCl / low BP',rd:6,rm:9.5,cam:[0,.05],tg:[0,0,0],ex:'<button id="eyja" class="on">'+['Normal','High NaCl (feedback)','Low BP (renin)'][S]+'</button>'}}];

/* ---------- 10 HORMONAL REGULATION ---------- */
const HO=[['Baseline','Normal tubular handling.'],['ADH (vasopressin)','From the posterior pituitary (osmolarity up or volume down): V2 receptors insert AQUAPORIN-2 into the collecting-duct principal cells > water follows the medullary gradient out > small volume of concentrated urine. No ADH (diabetes insipidus) = large dilute urine.'],['Aldosterone','From the adrenal zona glomerulosa (angiotensin II, high K+): principal cells make more ENaC + Na+/K+-ATPase > Na+ retained, K+ (and H+) secreted > volume + BP up.'],['ANP','From atrial myocytes (stretch): dilates the afferent + constricts the efferent arteriole (GFR up), inhibits Na+ reabsorption (ENaC) in the collecting duct, and renin, aldosterone + ADH release: natriuresis + diuresis, BP down.'],['Angiotensin II','Efferent constriction (GFR kept), PCT Na+/H+ exchange up, aldosterone + ADH release, thirst, systemic vasoconstriction.']];
EYX.N.rhorm=['Hormonal regulation',c=>{
 const NE=NEPH(c),S=EYX.hoS||0,q=HO[S];NE.ORDER.forEach(k=>NE.M[k].material.opacity=(S==1||S==2||S==3)&&(k=='cd'||k=='dct')?1:S==4&&k=='pct'?1:.45);
 const X1=XFER(c,'cd',S==1?8:S==3?2:3,0x6fa8ff,1,.03),X2=XFER(c,'cd',S==2?8:S==3?1:2,0xffffff,1,.03),X3=XFER(c,'cd',S==2?6:0,0xff7a9a,-1,.03);
 const urine=c.sp(1.3,-2.0,0,S==1?.12:S==3?.3:.2,S==1?.12:S==3?.3:.2,.05,S==1?0xe8c040:0xf2e08a,part('Urine','ADH: small volume, concentrated (up to ~1200 mOsm/L). ANP/no ADH: large volume, dilute (down to ~50 mOsm/L).',1),.95);
 fx.push(s=>{X1(S>0);X2(S>0);X3(S==2);c.txt(q[0]+': '+q[1])});
 c.lb([['Glomerulus',[0,1.62,0]],['Collecting duct',[1.45,.0,0]],['Urine',[1.3,-2.3,0]],['Aquaporin-2',[1.55,.5,0]]],'#ffffff');
 return {t:'Hormonal regulation of the nephron',s:'Hormone button: ADH, aldosterone, ANP, angiotensin II',rd:6,rm:9.5,cam:[0,.05],tg:[.2,-.3,0],ex:stateBtn('eyho','hoS',HO.map(h=>h[0]),'rhorm')}}];

/* ---------- 11 NEPHRON TYPES ---------- */
EYX.N.rtypes=['Nephron types',c=>{
 const {tb,sp,bx,lb,txt}=c,S=EYX.ntS||0,
  P1=part('Cortical nephron (~85%)','Glomerulus in the outer/mid cortex, SHORT loop of Henle that barely enters the outer medulla; efferent arteriole feeds peritubular capillaries (no long vasa recta). Mainly filtration + reabsorption.',1),
  P2=part('Juxtamedullary nephron (~15%)','Glomerulus at the corticomedullary border, LONG loop deep into the inner medulla, long vasa recta: generates the medullary osmotic gradient: essential for CONCENTRATING urine (desert animals have more).',1),
  P3=part('Vasa recta (juxtamedullary only)','Long hairpin capillaries running with the long loops (countercurrent exchange).',1),
  P4=part('Peritubular capillaries (cortical)','Capillary network around the cortical tubules.',1),
  P5=part('Cortex / medulla zones','Cortex: glomeruli, PCT, DCT, cortical collecting duct. Medulla: loops, vasa recta, medullary collecting ducts, papilla.',1);
  bx(0,.95,-.1,3.0,1.1,.02,0xffb0b8,P5,.15);bx(0,-.9,-.1,3.0,2.5,.02,0xc87870,P5,.15);
 const nephron=(x0,gy,depth,col,P,Pv,vasa)=>{sp(x0,gy,0,.15,.15,.04,0xd8232f,P,.95);const loop=[[x0-.2,gy],[x0-.35,gy-.25],[x0-.25,gy-.45],[x0-.3,gy-.7],[x0-.3,depth],[x0-.15,depth-.1],[x0,depth],[x0,gy-.55],[x0+.15,gy-.3],[x0+.3,gy-.2]];tb(loop.map(p=>[p[0],p[1],0]),.035,col,P,.95);tb([[x0+.3,gy-.2,0],[x0+.4,gy-.35,0],[x0+.5,gy-.2,0],[x0+.65,gy-.3,0]],.03,0xe8d070,P,.95);
  if(vasa)tb([[x0-.12,gy-.7,0],[x0-.12,depth+.05,0],[x0+.02,depth+.02,0],[x0+.12,gy-.7,0]],.014,0x8a4a9a,Pv,.9);else tb([[x0-.3,gy-.3,0],[x0+.1,gy-.5,0],[x0+.35,gy-.35,0]],.012,0x8a4a9a,Pv,.9)};
 nephron(-.9,1.35,-.15,0xf0a040,P1,P4,false);nephron(.9,.6,-1.7,0x6fd08a,P2,P3,true);
 tb([[1.6,.2,0],[1.6,-1.9,0]],.05,0xd9a0d0,P2,.9);tb([[-.3,1.1,0],[-.3,-1.0,0]],.04,0xd9a0d0,P1,.9);
lb([['Cortical nephron',[-.9,1.78,0]],['Short loop',[-.9,-.55,0]],['Juxtamedullary nephron',[.9,.95,0]],['LONG loop',[1.2,-1.75,0]],['Vasa recta',[.5,-1.2,0]],['Peritubular capillaries',[-.4,.3,0]],['Cortex',[-1.65,1.0,0]],['Medulla',[-1.65,-.8,0]]],'#ffffff');
 txt('Cortical (85%): short loop, filtration + reabsorption. Juxtamedullary (15%): long loop + vasa recta, builds the medullary gradient for concentrated urine');
 return {t:'Nephron types',s:'Cortical vs juxtamedullary',rd:6,rm:9.5,cam:[0,.05],tg:[0,-.2,0]}}];

/* ---------- 12 RENAL INNERVATION ---------- */
EYX.N.rinnerv=['Renal innervation',c=>{
 const {ad,tb,sp,dc,lb,txt}=c,S=EYX.inS||0,
  P1=part('Spinal cord T10-L1 (lateral horn)','Preganglionic sympathetic neurons for the kidney (about T10-L1) in the intermediolateral cell column; their axons leave in the ventral root.',1),
  P2=part('Sympathetic chain + splanchnic nerves','Fibres pass THROUGH the chain (no synapse) as the lesser (T10-T11) and least (T12) splanchnic nerves.',1),
  P3=part('Celiac / aorticorenal ganglia','Prevertebral ganglia where they synapse (postganglionic neurons).',1),
  P4=part('Renal plexus (along the renal artery)','Postganglionic sympathetic fibres follow the renal artery into the kidney (ends on arterioles, JG cells, tubules).',1),
  P5=part('Effects of sympathetic activation','Alpha-1: vasoconstriction of afferent + efferent arterioles (RBF + GFR fall, as in haemorrhage, exercise, stress). Beta-1: renin release from JG cells. Alpha-1 on tubules: more Na+ and water reabsorption. Renal denervation is an experimental treatment for resistant hypertension.',1),
  P6=part('Sensory (afferent) fibres + pain','Capsule + pelvis/ureter pain (renal colic) travels with the sympathetic nerves to T10-L1: pain radiates from the loin to the groin. Mechano- and chemoreceptor afferents also reflexly regulate blood pressure.',1),
  P7=part('Parasympathetic','The kidney has no important parasympathetic supply (the vagus reaches it only indirectly). A TRANSPLANTED kidney (denervated) still works normally: nerves modulate but are not essential.',1),
  P8=part('Kidney vessels','Renal artery + vein with the arterioles that the nerves constrict.',1);
 EYX.btn.eyin=b=>{EYX.inS=1-(EYX.inS||0);EYX.show('rinnerv')};
 ad(new T.CylinderGeometry(.13,.13,3.2,14),0xe8d8b0,-1.5,.2,0,{op:.95},P1);[0,1,2,3,4,5].forEach(i=>sp(-1.5,1.3-i*.45,0,.2,.07,.12,0x9aa0a8,P1,.9));
 tb([[-1.25,1.4,0],[-1.05,1.0,0],[-1.05,-.6,0]],.03,0xf2e08a,P2,.95);tb([[-1.05,.8,0],[-.7,.3,0],[-.4,.0,0]],.035,0xf2e08a,P2,.95);sp(-.35,-.05,0,.14,.1,.08,0xb8a860,P3,.95);
 const Ar=tb([[-.35,-.1,0],[.3,-.1,0],[.9,-.05,0]],S?.05:.075,0xd8232f,P8,.95);tb([[-.3,-.05,0],[.3,-.02,0],[.85,.0,0]],.02,0xf2e08a,P4,.98);
 SHPx(c);function SHPx(c){const {SHP,ELL}=EYX.h;SHP(c,ELL(1.35,-.05,.65,1.05,0,36),0xd9736b,P8,.85);SHP(c,ELL(1.35,-.05,.45,.8,0,36),0xa04a48,P8,.85);}
 tb([[.9,-.05,0],[1.1,.1,0],[1.35,.3,0]],S?.035:.05,0xd8232f,P8,.95);ad(new T.BoxGeometry(.5,.14,.05),0xffe36a,1.7,1.4,0,{op:.95},P5);
 tb([[.5,-.4,0],[-.3,-.7,0],[-1.0,-.5,0]],.012,0x7fb2ff,P6,.9);
 const D=Array.from({length:10},(_,i)=>({m:dc(new T.SphereGeometry(.03,8,6),0xffe36a,0,0,0,{op:1}),o:i/10})),RN2=Array.from({length:8},(_,i)=>({m:dc(new T.SphereGeometry(.03,8,6),0xffd24a,0,0,0,{op:1}),o:i/8})),pa=PATH([[-1.5,1.1],[-1.05,.8],[-.7,.3],[-.35,-.05],[.3,-.05],[.9,0],[1.3,.1]]);
 fx.push(s=>{D.forEach(d=>{const u=(s*(S?.25:.08)+d.o)%1,p=pa.at(u);d.m.visible=true;d.m.position.set(p[0],p[1],.1)});RN2.forEach(d=>{const u=(s*.3+d.o)%1;d.m.visible=S==1;d.m.position.set(1.0+.5*u,.1+.5*u,.1)});
  txt(S?'SYMPATHETIC ACTIVATION: arterioles constrict (alpha-1) > RBF + GFR fall; renin up (beta-1); more Na+ + water reabsorbed (alpha-1)':'Resting: low-frequency sympathetic tone, arterioles open, GFR + RBF autoregulated')});
 lb([['Spinal cord T10-L1',[-1.9,1.25,0]],['Splanchnic nerves',[-.7,.9,0]],['Aorticorenal ganglion',[-.7,-.35,0]],['Renal plexus',[.3,.15,0]],['Kidney',[1.4,.95,0]],['Renal artery',[.3,-.4,0]],['Renin',[1.7,.45,0]],['Sensory (pain) fibres',[-.2,-.85,0]]],'#ffffff');
 return {t:'Renal innervation (sympathetic)',s:'Activation button | T10-L1 > splanchnic > renal plexus',rd:6,rm:9.5,cam:[0,.05],tg:[-.1,.2,0],ex:'<button id="eyin" class="on">'+(S?'Sympathetic: ACTIVE':'Sympathetic: resting')+'</button>'}}];

/* ---------- 13 URINE FORMATION TIMELINE ---------- */
EYX.N.rtime=['Urine formation timeline',c=>{
 const {sp,dc,lb,txt}=c,NE=NEPH(c),Pm=part('Daily balance','Filtered ~180 L plasma water per day; ~99% reabsorbed; excreted ~1-2 L. Na+: ~25,000 mmol filtered, ~150 mmol excreted. Glucose + amino acids: ~100% reabsorbed. Urea: ~50% reabsorbed. Creatinine: filtered + a little secreted: concentrated in the urine.',1);c.sp(1.5,1.5,0,.1,.1,.05,0xffe36a,Pm,1);
 EYX.tp2=true;EYX.btn.eytm=b=>{EYX.tp2=!EYX.tp2;b.textContent=EYX.tp2?'Playing':'Paused';b.classList.toggle('on',EYX.tp2)};
 const drop=dc(new T.SphereGeometry(.07,12,10),0xffe36a,0,0,0,{op:1}),bar=c.bx(-1.65,0,0,.18,1,.04,0x6fd0ff,part('Volume remaining','Volume of the filtrate left at each point (approximate, with normal ADH).',1),.9);
 const FR=[[0,'Filtration (glomerulus)',180],[.12,'Reabsorption: PCT removes ~65%',63],[.46,'Loop: water out in the descending limb, salt out in the ascending',36],[.62,'DCT: fine-tuning of Na+ + Ca2+',33],[.72,'Secretion: K+, H+, drugs added (PCT + CD)',33],[.9,'Collecting duct (ADH): water reabsorbed, urine concentrated',2],[1,'Excretion: ~1-2 L/day of urine',1.5]];
 let tt=0,t0=0;fx.push(s=>{const dt=Math.min(.1,s-t0);t0=s;if(EYX.tp2)tt=(tt+dt*.06)%1;const p=FULL.at(tt);drop.position.set(p[0],p[1],.1);let j=0;while(j<FR.length-1&&tt>=FR[j+1][0])j++;const v=lerp(FR[j][2],FR[Math.min(j+1,FR.length-1)][2],(tt-FR[j][0])/Math.max(.01,(FR[Math.min(j+1,FR.length-1)][0]-FR[j][0])));
  bar.scale.set(1,Math.max(.03,Math.log10(v+1)/2.3*2.2),1);bar.position.y=-1.1+bar.scale.y/2;txt(FR[j][1]+'  |  filtrate left ~'+(v>=10?Math.round(v):v.toFixed(1))+' L/day')});
 lb([['Filtration',[0,1.62,0]],['Reabsorption',[-.9,1.0,0]],['Loop',[-.95,-.4,0]],['Secretion',[.7,1.2,0]],['Excretion',[1.3,-2.2,0]],['Volume',[-1.65,1.25,0]]],'#ffffff');
 return {t:'Urine formation: timeline',s:'Filtration > reabsorption > secretion > excretion | Play/Pause',rd:6,rm:9.5,cam:[0,.05],tg:[0,-.2,0],ex:'<button id="eytm" class="on">Playing</button>'}}];
}
