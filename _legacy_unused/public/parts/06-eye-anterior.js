/* ---- v7 EYE: anterior segment nodes (cornea > stroma, iris > plr, lens > aqueous) ---- */
{
/* ---------- CORNEA: 5 layers ---------- */
EYX.N.cornea=['Cornea',c=>{
 const {ad,tb,sp,bx,cy,lb}=c,
  P1=part('Tear film','Lipid + aqueous + mucin layer (~7 um): smooth optical surface, oxygen supply, lubrication. Dry eye = unstable film.',1),
  P2=part('Epithelium','5-6 cell layers (surface squamous, wing, basal columnar). Very rich in free nerve endings (CN V1); regenerates in ~7 days, so abrasions heal fast.',1),
  P3=part('Bowman layer','Acellular condensed collagen (~12 um). Does NOT regenerate: scars here leave permanent haze.',1),
  P4=part('Stroma (lamellae)','~90% of thickness (~500 um): 200+ stacked collagen lamellae kept at regular spacing by proteoglycans = transparency. Tap to see why it is clear.',1,'E:stroma'),
  P5=part('Descemet membrane','Thick basement membrane of the endothelium (thickens with age). Breaks here cause acute hydrops.',1),
  P6=part('Endothelium','Single layer of hexagonal cells with Na+/K+ pumps: keeps the stroma dehydrated (clear). Cells do NOT regenerate: Fuchs dystrophy / transplant (DMEK).',1),
  P7=part('Corneal nerves','Ophthalmic division of trigeminal (CN V1): stromal trunks > sub-basal plexus > epithelium. Source of the blink + tearing reflex.',1);
 bx(0,2.04,0,3,.08,1.2,0x9ad7ff,P1,.4);
 for(let i=0;i<6;i++){const x=-1.25+i*.5;bx(x,1.88,0,.46,.08,.4,0xd8f0ff,P2,.8);sp(x,1.7,0,.2,.1,.18,0xbfe3f5,P2,.85);bx(x,1.54,0,.3,.2,.3,0x9fd0ea,P2,.85)}
 bx(0,1.4,0,3,.1,1.2,0xf3eac2,P3,.9);
 for(let k=0;k<12;k++){const y=1.28-k*.1,odd=k%2;bx(0,y,0,3,.07,1.2,odd?0xe8dcb0:0xd9cc98,P4,.55);for(let j=0;j<5;j++){if(odd)cy(-1.2+j*.6,y,0,.014,1.2,0x8a7a4a,P4,.9,[1.5708,0,0]);else cy(0,y,-.45+j*.22,.014,3,0x8a7a4a,P4,.9,[0,0,1.5708])}}
 [-.8,.2,1.1].forEach(x=>sp(x,.72,0,.14,.03,.1,0xffffff,P4,.9));
 bx(0,.05,0,3,.1,1.2,0xf2e6a0,P5,.95);
 for(let i=0;i<7;i++)cy(-1.35+i*.45,-.1,0,.19,.16,0xd9a0a0,P6,.92);
 bx(0,-.35,0,3,.34,1.2,0xbfe8ff,P1,.18);
 tb([[1.7,.8,.1],[.9,.9,.1],[.2,1.2,.1]],.025,0xf2e08a,P7,.95);tb([[.2,1.2,.1],[.2,1.5,.1],[.2,1.85,.1]],.02,0xf2e08a,P7,.95);tb([[-1.4,1.47,.1],[1.4,1.47,.1]],.015,0xf2e08a,P7,.9);
 lb([['Tear film',[-1.9,2.05,0]],['Epithelium',[-1.9,1.7,0]],['Bowman',[-1.9,1.4,0]],['Stroma',[-1.9,.8,0]],['Descemet',[-1.9,.05,0]],['Endothelium',[-1.9,-.12,.3]],['Aqueous',[-1.9,-.45,0]]]);
 return {t:'Cornea: 5 layers',s:'Epithelium > Bowman > Stroma > Descemet > Endothelium | Stroma par tap = transparency',rd:5.6,rm:9,cam:[.35,.2],tg:[0,.9,0]}}];

/* ---------- STROMA: collagen lattice, why it is transparent ---------- */
EYX.N.stroma=['Stroma',c=>{
 const {cy,sp,dc}=c,ed=()=>EYX.ed,
  P1=part('Collagen fibrils (~30 nm)','Type I/V collagen fibrils of uniform diameter, packed in a near-crystalline lattice (~60 nm apart): scattered waves cancel each other, only forward light survives.',1),
  P2=part('Proteoglycans (keratan sulfate)','Hold the fibrils at a fixed spacing and bind water. Lose the spacing and light scatters.',1),
  P3=part('Keratocytes','Flat stromal cells packed with transparent crystallin proteins; they also repair the matrix.',1),
  P4=part('Light + scatter','Normal: regular lattice (spacing < half the wavelength) gives destructive interference of scattered light = clear. Oedema (endothelial pump failure): lakes of fluid, irregular spacing = scatter = cloudy cornea, halos around lights.',1);
 EYX.ed=false;EYX.btn.eyed=b=>{EYX.ed=!EYX.ed;b.textContent=EYX.ed?'Oedema: ON':'Oedema: OFF';b.classList.toggle('on',EYX.ed)};
 const F=[],rn=RN(5);for(let i=0;i<9;i++)for(let j=0;j<7;j++){const x=-1.6+i*.4+(j%2)*.2,y=-1.2+j*.4,m=cy(x,y,0,.07,1,0xc9b36a,P1,.95,[1.5708,0,0]);F.push({m,x,y,jx:(rn()-.5)*.28,jy:(rn()-.5)*.28})}
 [[-.9,.0],[.9,-.2]].forEach(a=>sp(a[0],a[1],0,.1,.1,.1,0xcfe0ff,P3,.8));
 for(let k=0;k<4;k++)sp(-1.3+k*.85,-1.45,0,.28,.07,.1,0x8fb8d0,P2,.7);
 const D=[];for(let k=0;k<26;k++)D.push({m:dc(new T.SphereGeometry(.035,8,6),0xffe36a,0,0,0,{op:1}),x:-2.2-rn()*3,y:-1.3+rn()*2.6,vy:0,sp:.9+rn()*.4});
 let u=0,t0=0;fx.push(s=>{const dt=Math.min(.1,s-t0);t0=s;u+=((ed()?1:0)-u)*.06;
  F.forEach(f=>f.m.position.set(f.x*(1+.12*u)+f.jx*u,f.y*(1+.12*u)+f.jy*u,0));
  D.forEach(d=>{d.x+=dt*d.sp;if(d.x>2.3){d.x=-2.4;d.y=-1.3+Math.random()*2.6;d.vy=0}if(u>.5&&Math.abs(d.x%.8)<.04)d.vy+=(Math.random()-.5)*.6;d.y+=d.vy*dt;d.m.position.set(d.x,d.y,.15)});
  c.txt(ed()?'Oedema: lattice disordered, light scatters in all directions = cloudy cornea':'Regular lattice: scattered waves cancel, light passes straight = transparent')});
 c.lb([['Collagen fibril (end-on)',[-1.5,1.65,0]],['Keratocyte',[-.9,.35,0]],['Proteoglycan',[-1.3,-1.7,0]],['Light',[-2.1,1.1,0]]]);
 return {t:'Stroma: why the cornea is clear',s:'Collagen lattice end-on | Oedema button se scatter dekhein',rd:5.6,rm:9,cam:[0,.05],tg:[0,0,0],ex:'<button id="eyed">Oedema: OFF</button>'}}];

/* ---------- IRIS: muscles + pupil size ---------- */
EYX.N.iris=['Iris + pupil',c=>{
 const {ad,tb,lb,txt}=c,
  PPu=part('Pupil (2-8 mm)','Hole in the iris: 2 mm in bright light (less light, deeper focus) to 8 mm in the dark. Size is set by two opposing muscles.',1),
  PSp=part('Sphincter pupillae','Circular smooth muscle at the pupil margin. Parasympathetic (CN III > ciliary ganglion > short ciliary nerves, M3 receptors): contracts = MIOSIS.',1,'E:plr'),
  PDi=part('Dilator pupillae','Radial smooth muscle fibres (myoepithelial). Sympathetic (T1 > superior cervical ganglion > long ciliary nerves, alpha-1): contracts = MYDRIASIS.',1),
  PSt=part('Iris stroma','Pigmented connective tissue with vessels; melanin amount sets eye colour (blue = little melanin, brown = a lot). Gold ring = collarette.',1),
  PPe=part('Posterior pigment epithelium','Always dark brown, blocks stray light. Transillumination defects show iris damage.',1),
  PNp=part('Parasympathetic nerves (CN III)','Edinger-Westphal nucleus > CN III > ciliary ganglion > short ciliary nerves. Tap for the light-reflex pathway.',1,'E:plr'),
  PNs=part('Sympathetic nerves','Hypothalamus > spinal cord T1 > superior cervical ganglion > long ciliary nerves. Interruption = Horner syndrome (small pupil, ptosis).',1),
  PLm=part('Limbus + sclera','Junction of cornea and sclera; houses stem cells + the drainage angle.',1);
 ad(new T.RingGeometry(1,1.5,64),0xf2eee6,0,0,0,{op:.97},PLm);ad(new T.CircleGeometry(1,64),0x1a1210,0,0,-.01,{op:1},PPe);ad(new T.CircleGeometry(1,64),0x4aa3a8,0,0,.02,{op:.97},PSt);
 const go=ad(new T.RingGeometry(1,1.45,56),0xd9a441,0,0,.03,{op:.97},PSt),pu=ad(new T.CircleGeometry(1,44),0x050507,0,0,.045,{op:1},PPu),sph=ad(new T.TorusGeometry(1,.05,10,56),0xb5483a,0,0,.05,{op:.97},PSp),SP=[];
 for(let k=0;k<40;k++)SP.push(ad(new T.BoxGeometry(.012,1,.01),0x1f6f78,0,0,.035,{op:.85},PDi));
 [-.5,0,.5].forEach(a=>tb([[Math.sin(a)*1.45,Math.cos(a)*1.45,.05],[Math.sin(a)*1.1,Math.cos(a)*1.1,.06],[Math.sin(a)*.75,Math.cos(a)*.75,.06]],.025,0xf2e08a,PNp,.95));
 [2.2,3.4,4.3].forEach(a=>tb([[Math.sin(a)*1.45,Math.cos(a)*1.45,.05],[Math.sin(a)*1.05,Math.cos(a)*1.05,.06],[Math.sin(a)*.95,Math.cos(a)*.95,.06]],.022,0x7fb2ff,PNs,.95));
 let pr=EYX.br?.167:.667;
 fx.push(s=>{const tp=EYX.br?.167:.667;pr+=(tp-pr)*.07;go.scale.set(pr,pr,1);pu.scale.set(pr,pr,1);sph.scale.set(pr*1.1,pr*1.1,1);
  SP.forEach((m,k)=>{const a=k/40*6.2832,r0=pr*1.2,L=.97-r0,r=r0+L/2;m.position.set(Math.cos(a)*r,Math.sin(a)*r,.035);m.scale.y=L;m.rotation.z=a-1.5708});
  txt(EYX.br?'Bright light: sphincter contracts (CN III) > pupil ~2 mm (miosis)':'Dark: dilator contracts (sympathetic) > pupil up to 8 mm (mydriasis)')});
 EYX.btn.eybr=b=>{EYX.br=!EYX.br;b.textContent=EYX.br?'Bright':'Dark'};
 lb([['Pupil',[0,0,.2]],['Sphincter',[.0,.95,.1]],['Dilator (radial)',[-1.0,-.4,.1]],['Collarette',[.95,-.3,.1]],['Sclera',[1.25,-.95,0]],['Parasympathetic',[-.55,1.45,0]],['Sympathetic',[.9,-1.2,0]]]);
 return {t:'Iris + pupil muscles',s:'Bright/Dark button: sphincter vs dilator | part par tap karein',rd:3.4,rm:5.4,cam:[0,.08],tg:[0,0,0],ex:'<button id="eybr" class="on">'+(EYX.br?'Bright':'Dark')+'</button>'}}];

/* ---------- PLR: pupillary light reflex pathway ---------- */
EYX.N.plr=['Light reflex',c=>{
 const {ad,tb,sp,dc,poly,lb,txt}=c,
  PA=part('Afferent limb: retina > CN II','Ganglion cells (melanopsin RGCs + others) > optic nerve > chiasma > optic tract > pretectal nucleus (NOT the lateral geniculate).',1),
  PP=part('Pretectal nucleus','Midbrain relay: sends signals to BOTH Edinger-Westphal nuclei (via the posterior commissure), so both pupils react.',1),
  PE=part('Edinger-Westphal nucleus','Parasympathetic nucleus of CN III in the midbrain.',1),
  PF=part('Efferent limb: CN III > ciliary ganglion','Preganglionic fibres > ciliary ganglion (in the orbit) > short ciliary nerves > sphincter pupillae. Compressed CN III (uncal herniation, aneurysm) = fixed dilated pupil.',1),
  PD=part('Direct vs consensual reflex','Light in ONE eye constricts BOTH pupils: direct = same eye, consensual = other eye.',1),
  PR=part('Swinging-flashlight test (RAPD)','Alternate the light between eyes: an eye with optic-nerve damage dilates when lit (relative afferent pupillary defect).',1);
 EYX.side=1;EYX.btn.eysd=b=>{EYX.side=-EYX.side;b.textContent='Light on: '+(EYX.side>0?'right':'left')+' eye'};
 const eyes=[-1,1].map(s=>({s,sp:sp(s*1.3,-1.9,0,.55,.55,.2,0xf2eee6,PA,.95),pu:null}));
 eyes.forEach(e=>{e.pu=ad(new T.CircleGeometry(1,24),0x0a0a0c,e.s*1.3,-2.12,.22,{op:1,s:[.2,.2,1]},PA)});
 [-1,1].forEach(s=>{tb([[s*1.15,-1.4,0],[s*.7,-1.0,0],[0,-.6,0]],.07,0x8fc8ff,PA,.95);tb([[0,-.6,0],[s*.4,-.1,0],[s*.45,.7,0]],.07,0x8fc8ff,PA,.95);
  sp(s*.45,.7,0,.2,.2,.2,0x7cc4ff,PP,.95);tb([[s*.45,.7,0],[s*.3,1.1,0],[s*.2,1.5,0]],.03,0xf2e08a,PP,.9);tb([[s*.45,.7,0],[0,1.15,0],[-s*.2,1.5,0]],.03,0xf2e08a,PP,.9);
  sp(s*.2,1.5,0,.17,.17,.17,0xffd15a,PE,.95);tb([[s*.2,1.5,0],[s*1.4,.9,0],[s*1.75,-.3,0],[s*1.6,-1.0,0]],.04,0xf2e08a,PF,.95);sp(s*1.6,-1.0,0,.1,.1,.1,0xffd15a,PF,.95);tb([[s*1.6,-1.0,0],[s*1.45,-1.55,0]],.03,0xf2e08a,PF,.95)});
 tb([[-.45,.7,0],[0,.85,0],[.45,.7,0]],.03,0x7cc4ff,PP,.9);
 const mk2=(pts,col)=>({cp:poly(pts),d:[0,1,2,3,4].map(()=>dc(new T.SphereGeometry(.04,8,6),col,0,0,0,{op:1}))}),
  aff=[1,-1].map(s=>mk2([[s*1.15,-1.4,0],[s*.7,-1.0,0],[0,-.6,0],[s*.4,-.1,0],[s*.45,.7,0]].map(a=>[a[0],a[1],.08]),0x8fe0ff)),
  eff=[1,-1].map(s=>mk2([[s*.45,.7,.08],[s*.3,1.1,.08],[s*.2,1.5,.08],[s*1.4,.9,.08],[s*1.75,-.3,.08],[s*1.6,-1.0,.08],[s*1.45,-1.55,.08]],0xffe36a));
 let p=.9;fx.push(s=>{const k=EYX.side>0?0:1;aff.forEach((a,i)=>a.d.forEach((d,j)=>{d.visible=i==k;d.position.copy(a.cp.getPointAt((s*.25+j/5)%1))}));
  eff.forEach(a=>a.d.forEach((d,j)=>d.position.copy(a.cp.getPointAt((s*.25+j/5)%1))));p+=(.2-p)*.04;eyes.forEach(e=>e.pu.scale.set(.2,.2,1));
  txt('Light in '+(EYX.side>0?'right':'left')+' eye > afferent CN II > both pretectal nuclei > both E-W nuclei > CN III > BOTH pupils constrict')});
 lb([['Retina / CN II',[-2.0,-1.0,0]],['Optic chiasma',[0,-.9,0]],['Pretectal nucleus',[-1.05,.45,0]],['Edinger-Westphal',[0,1.85,0]],['CN III',[2.15,.5,0]],['Ciliary ganglion',[2.1,-1.05,0]],['Pupil (both)',[0,-2.5,0]]]);
 return {t:'Pupillary light reflex',s:'Ek aankh me roshni > dono pupils sikudte hain (direct + consensual)',rd:7,rm:11,cam:[0,.05],tg:[0,-.2,0],ex:'<button id="eysd" class="on">Light on: right eye</button>'}}];

/* ---------- LENS: accommodation ---------- */
EYX.N.lens=['Lens',c=>{
 const {ad,tb,sp,bx,cy,dc,lb,txt}=c,
  PCp=part('Lens capsule','Elastic basement-membrane bag (type IV collagen); the zonules pull on it. Cataract surgery keeps the capsule to hold the new lens.',1),
  PCo=part('Cortex','Newer, softer, transparent lens fibres; added throughout life.',1),
  PNu=part('Nucleus','Oldest, densest fibres (embryonic core); yellows and hardens with age = nuclear cataract + presbyopia.',1),
  PEp=part('Anterior epithelium + fibres','Cuboidal cells under the anterior capsule elongate at the equator into fibres which lose their nuclei = transparent. No blood vessels; fed by aqueous.',1),
  PZ=part('Zonular fibres (suspensory ligament)','Fibrillin strands from the ciliary processes to the lens equator. Taut when the ciliary muscle is relaxed.',1),
  PCm=part('Ciliary muscle','Smooth muscle ring (parasympathetic CN III, M3). Contracts = ring narrows = zonules slacken. Tap for aqueous production + drainage.',1,'E:aqueous');
 EYX.near=false;EYX.btn.eyne=b=>{EYX.near=!EYX.near;b.textContent=EYX.near?'Near vision':'Far vision'};
 const cap=sp(0,0,0,.32,.93,.5,0xe8d890,PCp,.35),cor=sp(0,0,0,.27,.84,.45,0xf5e8b0,PCo,.6),nuc=sp(0,0,0,.15,.5,.3,0xe6c75a,PNu,.85);
 const ep=[];for(let k=-5;k<=5;k++)ep.push(sp(-.3,k*.12,0,.03,.03,.03,0xffffff,PEp,.95));
 const zs=[],cb=[];[1,-1].forEach(s=>{cb.push(sp(-.1,s*1.95,0,.3,.28,.4,0x9a6a4a,PCm,.95));[-.12,0,.12].forEach(o=>zs.push({s,o,m:cy(0,0,0,.012,1,0xe8e0c8,PZ,.9)}))});
 tb([[-.35,.3,0],[-.5,0,0],[-.35,-.3,0]],.01,0xffffff,PEp,.5);
 let u=0;fx.push(s=>{u+=((EYX.near?1:0)-u)*.06;const ax=.3+.15*u,ay=.93-.1*u;cap.scale.set(ax+.02,ay,.5);cor.scale.set(ax-.03,ay-.09,.45);nuc.scale.set(.15+.06*u,.5,.3);
  ep.forEach((m,i)=>{const y=(i-5)*.12*(ay/.93),x=-(ax+.02)*Math.sqrt(Math.max(0,1-(y/ay)*(y/ay)));m.position.set(x,y,0)});
  cb.forEach((m,i)=>{const sg=i?-1:1;m.position.set(-.1-.15*u,sg*(1.95-.5*u),0)});
  zs.forEach(z=>{const a=[0,z.s*ay*.97+z.o*.3,0],b=[-.1-.15*u+z.o*.5,z.s*(1.95-.5*u)-z.s*.1,0],L=Math.hypot(b[0]-a[0],b[1]-a[1]);z.m.position.set((a[0]+b[0])/2,(a[1]+b[1])/2,0);z.m.scale.set(1,L,1);z.m.rotation.z=Math.atan2(b[0]-a[0],a[1]-b[1])+(b[1]<a[1]?0:0);z.m.material.opacity=.95-.5*u});
  txt(EYX.near?'Near: ciliary muscle contracts (CN III), zonules slack, lens ROUNDS (up to ~30 D in youth)':'Far: ciliary muscle relaxed, zonules TAUT, lens flat (~15 D). Presbyopia = lens too stiff to round')});
 lb([['Capsule',[.55,.75,0]],['Cortex',[.5,.2,0]],['Nucleus',[.35,-.25,0]],['Epithelium',[-.8,.4,0]],['Zonules',[-.75,1.5,0]],['Ciliary muscle',[-.6,2.3,0]]]);
 return {t:'Lens + accommodation',s:'Near/Far button: ciliary muscle + zonules + lens shape',rd:6,rm:10,cam:[.3,.12],tg:[0,0,0],ex:'<button id="eyne">Far vision</button>'}}];

/* ---------- AQUEOUS: production, drainage, glaucoma ---------- */
EYX.N.aqueous=['Aqueous flow',c=>{
 const {ad,tb,sp,bx,dc,poly,lb,txt}=c,
  P1=part('Ciliary processes (production)','Epithelium of the ciliary processes secretes aqueous humour (~2.5 uL/min) from plasma: carbonic anhydrase + Na+/K+ ATPase. Drugs (timolol, dorzolamide) lower this.',1),
  P2=part('Posterior chamber','Narrow space between the iris and lens, filled with fresh aqueous.',1),
  P3=part('Pupil (flow bottleneck)','Aqueous squeezes between pupil margin and lens. Pupil block pushes the iris forward = acute angle-closure glaucoma (eye emergency).',1),
  P4=part('Anterior chamber','Between cornea and iris; aqueous nourishes the avascular cornea + lens.',1),
  P5=part('Trabecular meshwork','Sieve at the iridocorneal angle: ~90% of outflow (conventional route), pressure-dependent. Clogging = primary open-angle glaucoma.',1),
  P6=part('Canal of Schlemm','Ring canal collecting aqueous > collector channels > episcleral veins.',1),
  P7=part('IOP gauge (10-21 mmHg)','Intraocular pressure balances production against outflow. Raised IOP damages optic-nerve axons (cupping) = glaucoma, the leading cause of irreversible blindness.',1);
 EYX.blk=false;EYX.btn.eybk=b=>{EYX.blk=!EYX.blk;b.textContent=EYX.blk?'Outflow: BLOCKED':'Outflow: normal';b.classList.toggle('on',EYX.blk)};
 tb([[-1.55,0,0],[-1.45,1.0,0],[-1.0,1.7,0]],.05,0xbfe6ff,P4,.7);tb([[-1.0,1.7,0],[-.4,2.05,0]],.07,0xf2eee6,P4,.95);
 sp(-1.05,.8,0,.5,.95,.5,0xbfe8ff,P4,.2);sp(-.3,0,0,.3,.95,.45,0xf5e8b0,P2,.7);
 tb([[-.7,1.4,0],[-.75,.8,0],[-.76,.38,0]],.05,0x4aa3a8,P3,.95);sp(-.45,1.55,0,.22,.2,.25,0x9a6a4a,P1,.95);
 bx(-.88,1.6,0,.1,.22,.2,0xd9a441,P5,.95);sp(-.78,1.78,0,.1,.07,.1,0x2f6fe0,P6,.95);tb([[-.78,1.8,0],[-.55,2.15,0],[-.2,2.5,0]],.04,0x2f6fe0,P6,.95);
 const path=[[-.45,1.45,.05],[-.55,1.05,.05],[-.68,.55,.05],[-.75,.34,.05],[-.95,.6,.05],[-1.02,1.1,.05],[-.92,1.5,.05],[-.86,1.62,.05],[-.78,1.78,.05],[-.55,2.15,.05]],cp=poly(path),D=[];
 for(let k=0;k<16;k++)D.push({m:dc(new T.SphereGeometry(.035,8,6),0x9fe0ff,0,0,0,{op:1}),u:k/16});
 const gauge=bx(1.5,.0,0,.28,1,.2,0x4fb060,P7,.95),base=bx(1.5,-.0,0,.4,.05,.3,0x888888,P7,.9);
 let p=0,t0=0;fx.push(s=>{const dt=Math.min(.1,s-t0);t0=s;p+=((EYX.blk?1:0)-p)*.03;
  D.forEach(d=>{const slow=d.u>.6?1-.95*p:1;d.u=(d.u+dt*.12*slow)%1;if(EYX.blk&&d.u>.58&&d.u<.62)d.u=.58;d.m.position.copy(cp.getPointAt(Math.min(.999,d.u)))});
  const iop=15+25*p,h=.4+iop/40*1.8;gauge.scale.y=h;gauge.position.y=-.2+h/2;gauge.material.color.setHex(p>.5?0xe0402f:0x4fb060);
  txt(EYX.blk?'Outflow BLOCKED: IOP up to ~40 mmHg > optic-nerve cupping > peripheral field loss (glaucoma)':'Normal outflow: production = drainage, IOP ~15 mmHg')});
 lb([['Ciliary processes',[-.2,1.15,0]],['Posterior chamber',[.45,.7,0]],['Pupil',[-.5,.0,0]],['Anterior chamber',[-1.9,.5,0]],['Trabecular meshwork',[-1.95,1.7,0]],['Schlemm canal',[-.2,1.95,0]],['IOP',[1.5,-.5,0]]]);
 return {t:'Aqueous humour: flow + glaucoma',s:'Ciliary body > pupil > angle > trabecular meshwork > Schlemm > veins',rd:6,rm:10,cam:[0,.05],tg:[0,1.0,0],ex:'<button id="eybk">Outflow: normal</button>'}}];
}
