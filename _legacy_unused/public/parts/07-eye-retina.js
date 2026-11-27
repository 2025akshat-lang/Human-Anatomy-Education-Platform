/* ---- v7 EYE: retina branch (retina > rod > cascade, retina > on/off, fundus > visual pathway) ---- */
{
const k01=x=>Math.max(0,Math.min(1,x));
/* ---------- RETINA: layers (light enters from the TOP, goes through everything) ---------- */
EYX.N.retina=['Retina',c=>{
 const {ad,tb,sp,bx,cy,dc,lb,txt}=c,
  PV=part('Vitreous + ILM','Vitreous gel sits on the inner limiting membrane (Muller-cell end-feet). Light enters the retina from here.',1),
  PN=part('RNFL (nerve fibre layer)','Unmyelinated ganglion-cell axons run along the surface to the optic disc, then myelinate behind the lamina cribrosa.',1,'E:fundus'),
  PG=part('GCL: ganglion cells','Output neurons (~1.2 million): fire action potentials. ON and OFF types. Tap for the ON/OFF circuit.',1,'E:onoff'),
  PI=part('IPL (inner plexiform)','Synapses of bipolar, amacrine and ganglion cells. Sublamina b = ON (inner), sublamina a = OFF (outer).',1),
  PB=part('INL: bipolar, horizontal, amacrine, Muller','Bipolar cells relay photoreceptor > ganglion; horizontal cells give lateral inhibition (centre-surround); amacrine cells modulate; Muller glia span the whole retina. Tap for ON/OFF processing.',1,'E:onoff'),
  PO=part('OPL (outer plexiform)','Photoreceptor terminals synapse onto bipolar + horizontal cells (glutamate).',1),
  PNL=part('ONL: photoreceptor nuclei','Cell bodies of rods and cones.',1),
  PRd=part('Rods','~120 million: dim light, black-white, very sensitive (single photon), absent from the fovea. Tap for the rod cell.',1,'E:photo'),
  PCn=part('Cones','~6 million (L, M, S): colour + fine detail, dense in the fovea. Tap for the photoreceptor.',1,'E:photo'),
  PRp=part('RPE + Bruch + choroid','Retinal pigment epithelium: absorbs light, recycles retinoid (visual cycle), phagocytoses shed disc tips daily, forms the outer blood-retina barrier. Detachment separates retina from the RPE.',1),
  PM=part('Muller glia','Radial glial cells: K+ buffering, structural support from ILM to ELM.',1);
 const L=[['VITREOUS',3.2,.5,0x9fd0ff,PV],['RNFL',2.82,.14,0x6fa8e8,PN],['GCL',2.55,.3,0x4a78c8,PG],['IPL',2.0,.7,0x2f4f98,PI],['INL',1.3,.5,0x2a4a8a,PB],['OPL',.85,.14,0x3a5aa8,PO],['ONL',.45,.6,0x243a78,PNL],['ELM',.1,.05,0x8fb8ff,PNL],['IS',-.15,.4,0x2a5a98,PRd],['OS',-.7,.7,0x1f4a88,PRd],['RPE',-1.2,.2,0x8a5a3a,PRp],['CHOROID',-1.55,.4,0x7a2a2a,PRp]];
 L.forEach(a=>bx(0,a[1],-.15,2.7,a[2],.05,a[3],a[4],.35));
 const RX=[-1.2,-.96,-.48,-.24,.24,.48,.96,1.2],CX=[-.72,0,.72];
 RX.forEach(x=>{cy(x,-.15,0,.045,.4,0x6fc4ff,PRd,.9);cy(x,-.7,0,.045,.7,0x4aa8f0,PRd,.9);sp(x,.45,0,.06,.1,.06,0x2b3f7a,PRd,.95);cy(x,.68,0,.008,.4,0x6fa8e8,PRd,.8);sp(x,.88,0,.05,.04,.05,0x6fc4ff,PRd,.95)});
 CX.forEach(x=>{sp(x,-.1,0,.09,.2,.09,0xa78bfa,PCn,.95);ad(new T.CylinderGeometry(.01,.075,.7,16),0x8f6df0,x,-.7,0,{op:.95},PCn);sp(x,.5,0,.09,.13,.09,0x4a3a98,PCn,.95);sp(x,.88,0,.1,.04,.1,0xa78bfa,PCn,.95)});
 [-1.0,-.3,.4,1.0].forEach(x=>{sp(x,1.3,0,.09,.14,.09,0x7fb2ff,PB,.95);tb([[x,1.2,0],[x+(x<0?.1:-.1),.98,0]],.012,0x7fb2ff,PB,.8);tb([[x,1.42,0],[x,2.1,0]],.012,0x7fb2ff,PB,.8)});
 [-.7,.7].forEach(x=>sp(x,.98,0,.2,.04,.07,0x40c8c0,PB,.95));[-.4,.9].forEach(x=>sp(x,1.62,0,.06,.06,.06,0xc890ff,PB,.95));
 [-1.2,-.6,0,.6,1.2].forEach(x=>{sp(x,2.55,0,.13,.13,.1,0x8aa0d0,PG,.95);tb([[x,2.62,0],[x,2.82,0],[1.35,2.82,0]],.012,0x8aa0d0,PN,.8);tb([[x,2.45,0],[x,2.1,0]],.01,0x8aa0d0,PG,.7)});
 tb([[-1.1,2.95,0],[-1.1,.1,0]],.02,0xff9fbf,PM,.6);
 for(let i=0;i<8;i++){bx(-1.15+i*.33,-1.2,0,.31,.2,.4,0x8a5a3a,PRp,.92);sp(-1.15+i*.33,-1.12,.2,.025,.025,.025,0x2b1a10,PRp,1)}
 bx(0,-1.2,0,2.7,.02,.3,0xd0c0a0,PRp,.9);
 const D=[];for(let k=0;k<14;k++)D.push(dc(new T.SphereGeometry(.04,8,6),0xffe36a,-1.2+(k%7)*.4,0,0,{op:1}));
 fx.push(s=>{D.forEach((d,k)=>{const u=((s*.25+k/14)%1);d.position.y=3.5-u*4.3;d.position.x=-1.2+(k%7)*.4+Math.sin(s*2+k)*.04});txt('Light neeche se nahi, UPAR se aata hai: sab layers cross karke rods/cones tak (inverted retina)')});
 lb(L.filter((a,i)=>i!=7).map(a=>[a[0],[-1.55,a[1],.05]]));
 return {t:'Retina: 10 layers',s:'Rod/Cone > Bipolar > Ganglion | part par tap karein',rd:6.5,rm:10.5,cam:[0,.03],tg:[0,.9,0]}}];

/* ---------- PHOTO: rod cell, dark vs light ---------- */
EYX.N.photo=['Rod cell',c=>{
 const {ad,tb,sp,cy,dc,lb,txt}=c,
  P1=part('Synaptic spherule','Releases glutamate continuously in the dark (tonic); less in light. Synapses onto ON/OFF bipolar + horizontal cells.',1,'E:onoff'),
  P2=part('Nucleus (ONL)','Cell body region of the rod.',1),
  P3=part('Inner segment','Mitochondria (ATP), ER, Na+/K+ ATPase: pumps Na+ out and K+ in; K+ leaves through leak channels.',1),
  P4=part('Connecting cilium','Modified 9+0 cilium: only route for proteins from inner to outer segment.',1),
  P5=part('Outer segment: stacked discs','~1000 discs, each packed with RHODOPSIN (~10^8 molecules). New discs form at the base; tips are shed and eaten by the RPE (renewed ~10 days). Tap for the molecular cascade.',1,'E:cascade'),
  P6=part('Dark current','In the dark cGMP keeps CNG channels open: Na+ + Ca2+ enter the outer segment, K+ leaves the inner segment. Vm ~ -40 mV (partly depolarised).',1,'E:cascade'),
  P7=part('Voltage gauge','Light HYPERPOLARISES the rod to ~ -65 mV (graded, no spikes), which REDUCES glutamate release. Photoreceptors are the only sensory cells that hyperpolarise to their stimulus.',1);
 EYX.pl=false;EYX.btn.eypl=b=>{EYX.pl=!EYX.pl;b.textContent=EYX.pl?'Light: ON':'Dark state';b.classList.toggle('on',EYX.pl)};
 sp(0,3.1,0,.28,.22,.28,0x6fc4ff,P1,.95);tb([[0,2.9,0],[0,2.4,0]],.025,0x6fc4ff,P1,.9);sp(0,2.0,0,.3,.4,.3,0x2b3f7a,P2,.95);tb([[0,1.6,0],[0,1.4,0]],.03,0x6fc4ff,P2,.9);
 sp(0,.8,0,.36,.62,.36,0x4a9fe8,P3,.9);for(let k=0;k<6;k++)sp(Math.sin(k*1.1)*.16,.4+k*.18,Math.cos(k*1.1)*.16,.05,.03,.03,0xffb86a,P3,.95);
 tb([[0,.2,0],[0,-.05,0]],.035,0xdfefff,P4,.95);cy(0,-1.15,0,.33,2.2,0x3d7fd8,P5,.35);
 for(let k=0;k<13;k++)cy(0,-.25-k*.16,0,.3,.05,0x6fc4ff,P5,.95);
 const gauge=ad(new T.BoxGeometry(.3,1,.2),0xffb060,1.5,0,0,{op:.95},P7);
 const Na=[],K=[],G=[];for(let k=0;k<14;k++)Na.push({m:dc(new T.SphereGeometry(.045,8,6),0xffd24a,0,0,0,{op:1}),u:k/14,y:-.4-(k%7)*.28,s:k%2?1:-1});
 for(let k=0;k<8;k++)K.push({m:dc(new T.SphereGeometry(.045,8,6),0xc890ff,0,0,0,{op:1}),u:k/8,s:k%2?1:-1});
 for(let k=0;k<10;k++)G.push({m:dc(new T.SphereGeometry(.035,8,6),0x9fffd0,0,0,0,{op:1}),u:k/10,s:k%2?1:-1});
 const ph=dc(new T.SphereGeometry(.09,12,10),0xffffff,0,0,0,{op:1});let v=0,t0=0;
 fx.push(s=>{const dt=Math.min(.1,s-t0);t0=s;v+=((EYX.pl?1:0)-v)*.05;const dark=1-v;
  Na.forEach(a=>{a.u=(a.u+dt*.35)%1;a.m.visible=dark>.35;a.m.position.set(a.s*(1.1-.75*a.u),a.y,0)});
  K.forEach(a=>{a.u=(a.u+dt*.3)%1;a.m.position.set(a.s*(.4+.9*a.u),.8,0)});
  G.forEach(a=>{a.u=(a.u+dt*(.15+.35*dark))%1;a.m.visible=a.u<dark+.15;a.m.position.set(a.s*(.3+.7*a.u),3.1-.5*a.u,0)});
  ph.visible=v>.5;ph.position.set(0,3.6-((s*1.2)%1)*4.5,0);
  const h=.5+.95*v;gauge.scale.y=h;gauge.position.y=-.3+h/2;gauge.material.color.setHex(v>.5?0x4a9fe8:0xffb060);
  txt(EYX.pl?'LIGHT: rhodopsin > transducin > PDE6, cGMP falls, channels close, Vm -65 mV, glutamate DOWN':'DARK: cGMP high, CNG open, Na+/Ca2+ IN (dark current), Vm -40 mV, glutamate released continuously')});
 lb([['Synaptic spherule',[1.0,3.1,0]],['Nucleus',[.9,2.0,0]],['Inner segment',[.95,.8,0]],['Connecting cilium',[1.2,.1,0]],['Outer segment',[-1.05,-1.2,0]],['Dark current',[-1.15,-.5,0]],['Vm',[1.5,-1.0,0]]]);
 return {t:'Rod photoreceptor',s:'Dark / Light button: dark current + glutamate | part par tap karein',rd:8.5,rm:13,cam:[0,.03],tg:[.2,.55,0],ex:'<button id="eypl">Dark state</button>'}}];

/* ---------- CASCADE: rhodopsin > transducin > PDE6 ---------- */
EYX.N.cascade=['Phototransduction',c=>{
 const {ad,tb,sp,bx,cy,dc,lb,txt}=c,
  P1=part('Disc membrane (bilayer)','Stacked membrane discs: the huge surface area holds ~10^8 rhodopsin molecules, so a single photon can be detected.',1),
  P2=part('Rhodopsin (opsin + 11-cis retinal)','7-transmembrane GPCR. A photon isomerises 11-cis to all-trans retinal = R* (metarhodopsin II). Rhodopsin kinase + arrestin switch it off.',1),
  P3=part('Transducin (Gt)','G protein: R* swaps GDP for GTP on Galpha-t; each R* activates ~100s of transducins = AMPLIFICATION.',1),
  P4=part('PDE6 (phosphodiesterase)','Activated when Galpha-t-GTP removes its inhibitory gamma subunit. Hydrolyses cGMP to 5\u2032-GMP extremely fast.',1),
  P5=part('cGMP','Second messenger kept high in the dark by guanylate cyclase; holds CNG channels OPEN. Light makes it fall.',1),
  P6=part('CNG channel','Cyclic-nucleotide-gated cation channel in the plasma membrane: open with cGMP (Na+/Ca2+ in); closes when cGMP drops = hyperpolarisation.',1),
  P7=part('Plasma membrane','Outer segment surface, separate from the discs; carries the CNG channels + Na+/Ca2+ exchanger.',1);
 EYX.pa=false;EYX.btn.eypa=b=>{EYX.pa=!EYX.pa;b.textContent=EYX.pa?'Paused':'Playing';b.classList.toggle('on',!EYX.pa)};
 [1.1,-.4].forEach(y=>{bx(-.05,y,0,2.6,.07,.6,0x3d7fd8,P1,.9);bx(-.05,y-.12,0,2.6,.07,.6,0x3d7fd8,P1,.9);bx(-.05,y-.06,0,2.6,.05,.58,0x16306a,P1,.5)});
 bx(1.45,.3,0,.1,3,.6,0x3d7fd8,P7,.85);
 const ch=[.9,.2,-.5].map(y=>cy(1.45,y,0,.11,.3,0x6fe0a0,P6,.95,[0,0,1.5708]));
 const rho=[-.9,-.3,.4].map(x=>{const g=[-.06,0,.06].map(o=>cy(x+o,1.0,0,.03,.22,0x5a8fe0,P2,.95));const r=sp(x,1.0,.0,.04,.04,.04,0xffa040,P2,1);return {g,r,x}});
 const gt=sp(-.3,.72,0,.1,.1,.1,0x9fd0ff,P3,.95),gta=sp(-.3,.72,.12,.07,.07,.07,0xffb060,P3,1),gb=sp(-.2,.68,-.05,.06,.05,.06,0x7fb2ff,P3,.95);
 const pd=[.45,.62].map(x=>sp(x,.5,0,.09,.09,.09,0x7a8aa8,P4,.95));
 const cg=[];const rn=RN(11);for(let k=0;k<16;k++)cg.push({m:sp(-1.1+rn()*2.2,-.3+rn()*1.1,0,.045,.045,.045,0x6fe0a0,P5,.95),x:-1.1+rn()*2.2,y:-.3+rn()*1.1,r:rn(),p:rn()*6});
 const Na=[];for(let k=0;k<8;k++)Na.push({m:dc(new T.SphereGeometry(.04,8,6),0xffd24a,0,0,0,{op:1}),u:k/8,y:[.9,.2,-.5][k%3]});
 const ph=dc(new T.SphereGeometry(.1,12,10),0xffffff,-.3,3,0,{op:1});let tt=0,t0=0;
 const ST=['Dark: cGMP high, CNG channels open, Na+/Ca2+ flow in (-40 mV)','Photon hits rhodopsin: 11-cis to all-trans retinal = R* (metarhodopsin II)','R* activates transducin: GDP to GTP, Galpha-t-GTP is released','Galpha-t-GTP binds PDE6 > PDE6 ACTIVE','PDE6 hydrolyses cGMP to 5\u2032-GMP: cGMP level falls','CNG channels CLOSE: Na+/Ca2+ stop > hyperpolarisation (-65 mV) > less glutamate','Recovery: rhodopsin kinase + arrestin quench R*; guanylate cyclase rebuilds cGMP'];
 fx.push(s=>{const dt=Math.min(.1,s-t0);t0=s;if(!EYX.pa)tt=(tt+dt)%14;const p=tt;
  const act=p>3&&p<12.5,gm=act?k01((p-3.6)/1.6):0,pdeOn=p>6.8&&p<12.8,cf=p<7.2?1:p<9.5?1-.85*k01((p-7.2)/2.3):p<12.5?.15:.15+.85*k01((p-12.5)/1.5),open=cf>.45;
  ph.visible=p>2&&p<3.2;ph.position.set(-.3,3-(p-2)/1.2*1.9,0);
  rho[1].r.material.color.setHex(act?0xff5a20:0xffa040);rho[1].r.scale.setScalar(act?.065:.04);
  gt.position.set(-.3+.75*gm*0,.72-.0,0);gta.visible=act;gta.position.set(-.3+(.75*gm),.72-.2*gm,.12);gta.scale.setScalar(.07);
  pd.forEach(m=>m.material.color.setHex(pdeOn?0xff9a30:0x7a8aa8));
  cg.forEach(g=>{const x=g.m.userData.on;g.m.position.set(g.x+Math.sin(s*.8+g.p)*.05,g.y+Math.cos(s*.7+g.p)*.05,0);const dead=g.r>cf;g.m.material.color.setHex(dead?0x777777:0x6fe0a0);g.m.material.opacity=dead?.5:.95});
  ch.forEach(m=>m.material.color.setHex(open?0x6fe0a0:0xd84a4a));
  Na.forEach(a=>{a.u=(a.u+dt*.5)%1;a.m.visible=open;a.m.position.set(2.0-.7*a.u,a.y,0)});
  txt(ST[p<2?0:p<3.2?1:p<5.2?2:p<7.2?3:p<9.5?4:p<12.5?5:6])});
 lb([['Rhodopsin',[-.9,1.45,0]],['Transducin',[-.95,.55,0]],['PDE6',[.55,.15,0]],['cGMP',[-1.0,-.1,0]],['CNG channel',[1.9,.55,0]],['Disc',[-1.4,1.3,0]],['Na+ Ca2+',[2.0,-.2,0]]]);
 return {t:'Phototransduction cascade',s:'Rhodopsin > Transducin > PDE6 > cGMP down > channels close',rd:6.5,rm:10.5,cam:[0,.03],tg:[.3,.5,0],ex:'<button id="eypa" class="on">Playing</button>'}}];

/* ---------- ON/OFF bipolar processing ---------- */
EYX.N.onoff=['ON/OFF circuit',c=>{
 const {ad,tb,sp,bx,dc,poly,lb,txt}=c,
  P1=part('Cone terminal (glutamate)','Releases glutamate in the DARK; light hyperpolarises the cone, so glutamate release DROPS.',1),
  P2=part('ON bipolar cell','Receptor: mGluR6 (metabotropic) > TRPM1 channel. Glutamate CLOSES TRPM1, so light (less glutamate) DEPOLARISES the cell = sign-inverting. Axon ends in IPL sublamina b (inner).',1),
  P3=part('OFF bipolar cell','Receptors: AMPA/kainate (ionotropic, excitatory). Glutamate DEPOLARISES it, so light HYPERPOLARISES it = sign-conserving. Axon ends in sublamina a (outer).',1),
  P4=part('Horizontal cell','Lateral inhibition (feedback to photoreceptors) gives centre-surround receptive fields and contrast enhancement.',1),
  P5=part('IPL sublaminae a / b','Sublamina a (outer) = OFF; sublamina b (inner) = ON. Two parallel pathways code light increments and decrements.',1),
  P6=part('ON ganglion cell','Fires faster when light turns ON in its centre.',1),
  P7=part('OFF ganglion cell','Fires faster when light turns OFF (dark spot / light decrement).',1),
  P8=part('Optic nerve fibres','Ganglion-cell axons converge at the optic disc. Tap to see the fundus + disc.',1,'E:fundus');
 EYX.ls=false;EYX.btn.eyls=b=>{EYX.ls=!EYX.ls;b.textContent=EYX.ls?'Light: ON':'Light: OFF';b.classList.toggle('on',EYX.ls)};
 const cone=sp(0,-1.5,0,.5,.18,.2,0xa78bfa,P1,.95);tb([[0,-1.65,0],[0,-2.4,0]],.08,0xa78bfa,P1,.9);
 [-1.2,1.2].forEach(x=>sp(x,-1.5,0,.3,.12,.15,0x6a58a8,P1,.6));
 sp(0,-1.15,0,1.0,.05,.1,0x40c8c0,P4,.9);
 const onb=sp(-.45,0,0,.15,.22,.15,0x40e0d0,P2,.95),ofb=sp(.45,0,0,.15,.22,.15,0xff9f60,P3,.95);
 tb([[-.45,-.2,0],[-.3,-.9,0],[-.05,-1.4,0]],.02,0x40e0d0,P2,.9);sp(-.05,-1.42,0,.07,.07,.07,0x40e0d0,P2,1);tb([[-.45,.2,0],[-.45,1.0,0],[-.45,1.85,0]],.02,0x40e0d0,P2,.9);sp(-.45,1.9,0,.09,.07,.09,0x40e0d0,P2,1);
 tb([[.45,-.2,0],[.4,-.9,0],[.25,-1.4,0]],.02,0xff9f60,P3,.9);bx(.25,-1.4,0,.3,.04,.1,0xff9f60,P3,.95);tb([[.45,.2,0],[.45,.8,0],[.45,1.3,0]],.02,0xff9f60,P3,.9);sp(.45,1.35,0,.09,.07,.09,0xff9f60,P3,1);
 bx(0,1.35,-.1,1.6,.03,.1,0xffb890,P5,.7);bx(0,1.9,-.1,1.6,.03,.1,0x90f0e8,P5,.7);
 const gon=sp(-.45,2.6,0,.18,.18,.12,0x40e0d0,P6,.95),gof=sp(.45,2.6,0,.18,.18,.12,0xff9f60,P7,.95);
 tb([[-.45,2.45,0],[-.45,1.9,0]],.015,0x40e0d0,P6,.8);tb([[.45,2.45,0],[.45,1.35,0]],.015,0xff9f60,P7,.8);
 const ax=poly([[-.45,2.7,0],[-.45,3.3,0],[-.2,3.7,0]]),ax2=poly([[.45,2.7,0],[.45,3.3,0],[.2,3.7,0]]);tb([[-.45,2.7,0],[-.45,3.3,0],[-.2,3.7,0]],.02,0xf2e08a,P8,.9);tb([[.45,2.7,0],[.45,3.3,0],[.2,3.7,0]],.02,0xf2e08a,P8,.9);
 const gl=[];for(let k=0;k<14;k++)gl.push({m:dc(new T.SphereGeometry(.03,8,6),0x9fffd0,0,0,0,{op:1}),u:k/14,s:k%2?1:-1});
 const sk=[0,1,2].map(k=>({a:dc(new T.SphereGeometry(.05,8,6),0x40ffe0,0,0,0,{op:1}),b:dc(new T.SphereGeometry(.05,8,6),0xffb060,0,0,0,{op:1}),o:k/3}));
 let v=0,t0=0;fx.push(s=>{const dt=Math.min(.1,s-t0);t0=s;v+=((EYX.ls?1:0)-v)*.06;const dark=1-v;
  cone.material.opacity=.45+.5*dark;onb.material.opacity=.4+.55*v;ofb.material.opacity=.4+.55*dark;gon.material.opacity=.4+.55*v;gof.material.opacity=.4+.55*dark;
  gl.forEach(g=>{g.u=(g.u+dt*(.15+.45*dark))%1;g.m.visible=g.u<dark+.1;g.m.position.set(g.s*.5*g.u,-1.4+.9*g.u,0)});
  sk.forEach(k=>{const u=((s*.7+k.o)%1);k.a.visible=v>.5;k.b.visible=v<.5;k.a.position.copy(ax.getPointAt(u));k.b.position.copy(ax2.getPointAt(u))});
  txt(EYX.ls?'LIGHT: cone hyperpolarised, less glutamate > ON bipolar DEPOLARISES > ON ganglion FIRES; OFF bipolar hyperpolarises, OFF ganglion quiet':'DARK: cone releases glutamate > ON bipolar hyperpolarised (mGluR6), OFF bipolar depolarised (AMPA) > OFF ganglion fires')});
 lb([['Cone terminal',[-1.2,-1.8,0]],['Horizontal cell',[1.0,-1.0,0]],['ON bipolar (mGluR6)',[-1.1,.1,0]],['OFF bipolar (AMPA)',[1.1,.1,0]],['Sublamina a (OFF)',[1.3,1.4,0]],['Sublamina b (ON)',[-1.3,1.95,0]],['ON ganglion',[-1.15,2.65,0]],['OFF ganglion',[1.15,2.65,0]]]);
 return {t:'ON / OFF signal processing',s:'Light button: ON pathway vs OFF pathway | part par tap karein',rd:9,rm:14,cam:[0,.03],tg:[0,.7,0],ex:'<button id="eyls">Light: OFF</button>'}}];

/* ---------- FUNDUS: optic disc, macula, blind spot ---------- */
EYX.N.fundus=['Fundus + optic disc',c=>{
 const {ad,tb,sp,bx,lb,txt}=c,
  P1=part('Optic disc (blind spot)','Ganglion-cell axons leave and vessels enter here. NO rods/cones = blind spot, ~15 degrees temporal to fixation (~5x7 degrees). The brain fills the gap in. Tap for the visual pathway.',1,'E:nerve'),
  P2=part('Cup + rim','Central pale cup (cup:disc ratio ~0.3 normal). Glaucoma loses rim tissue: cup enlarges (0.8 = advanced). Use the button.',1),
  P3=part('Macula + fovea','Macula (~5.5 mm) with the foveal pit at the centre: only cones, no vessels = sharpest vision. Dark/reddish because of RPE + xanthophyll pigment.',1),
  P4=part('Retinal arteries','Central retinal artery (end artery of the ophthalmic artery) branches on the disc: superior + inferior temporal and nasal arcades. Occlusion (CRAO) = sudden painless blindness, cherry-red spot.',1),
  P5=part('Retinal veins','Darker, wider than arteries; accompany them. Papilloedema = swollen disc from raised intracranial pressure.',1),
  P6=part('Retina (periphery)','Orange-red due to choroidal blood seen through the thin retina + RPE.',1),
  P7=part('Blind spot test','Close your LEFT eye, stare at the +, move the page closer/further (~25 cm): the dot vanishes when its image falls on the optic disc. Your brain fills the hole with the background.',1);
 EYX.cup=false;EYX.btn.eycp=b=>{EYX.cup=!EYX.cup;b.textContent=EYX.cup?'Cup:disc 0.8':'Cup:disc 0.3';b.classList.toggle('on',EYX.cup)};
 ad(new T.CircleGeometry(1.6,64),0xd9603b,0,0,0,{op:.97},P6);ad(new T.RingGeometry(1.5,1.6,64),0x7a2a1a,0,0,.01,{op:.9},P6);
 const D=[.75,-.1];ad(new T.CircleGeometry(.3,40),0xf2c9a0,D[0],D[1],.02,{op:1},P1);
 const cup=ad(new T.CircleGeometry(1,32),0xfff0cf,D[0],D[1],.03,{op:1,s:[.14,.14,1]},P2);
 ad(new T.CircleGeometry(.34,40),0xb8452c,-.5,-.05,.02,{op:.9},P3);sp(-.5,-.05,.03,.06,.06,.01,0x7a2a14,P3,1);
 const arc=(sg,dy,o)=>[[D[0],D[1],.04],[D[0]-.3,D[1]+sg*(.5+o),.04],[D[0]-1.0,D[1]+sg*(.95+o),.04],[-.45,D[1]+sg*(.55+o*.4),.04],[-1.2,D[1]+sg*(.5+o),.04]];
 [1,-1].forEach(sg=>{tb(arc(sg,0,0),.025,0xb71c1c,P4,.98);tb(arc(sg,0,.07),.035,0x6a1020,P5,.98);tb([[D[0],D[1],.04],[D[0]+.45,D[1]+sg*.35,.04],[D[0]+.8,D[1]+sg*.5,.04]],.022,0xb71c1c,P4,.98);tb([[D[0],D[1],.04],[D[0]+.4,D[1]+sg*.45,.04],[D[0]+.7,D[1]+sg*.7,.04]],.03,0x6a1020,P5,.98)});
 bx(0,-2.6,0,2.8,.55,.02,0xf8f8f8,P7,.98);bx(-1.05,-2.6,.02,.3,.04,.01,0x111111,P7,1);bx(-1.05,-2.6,.02,.04,.3,.01,0x111111,P7,1);ad(new T.CircleGeometry(.12,24),0x111111,.9,-2.6,.02,{op:1},P7);
 fx.push(s=>{const u=EYX.cup?.24:.14;cup.scale.x+=(u-cup.scale.x)*.08;cup.scale.y=cup.scale.x;txt(EYX.cup?'Glaucomatous cupping: cup:disc ~0.8, rim thinned, vessels bayonet over the edge':'Normal disc: cup:disc ~0.3. No photoreceptors on the disc = blind spot')});
 lb([['Optic disc',[1.2,.45,0]],['Cup',[.75,-.55,0]],['Macula / fovea',[-.5,-.55,0]],['Artery',[-.4,1.2,0]],['Vein',[.1,-1.2,0]],['Blind-spot test',[0,-3.0,0]]]);
 return {t:'Fundus: disc, macula, blind spot',s:'Left-eye fundus | cup button = glaucoma | disc par tap = visual pathway',rd:5.8,rm:10,cam:[0,.03],tg:[0,-.5,0],ex:'<button id="eycp">Cup:disc 0.3</button>'}}];

/* ---------- NERVE: visual pathway ---------- */
EYX.N.nerve=['Visual pathway',c=>{
 const {tb,sp,bx,dc,poly,lb,txt}=c,
  P1=part('Optic nerve (CN II)','Retina to chiasma (~50 mm). Damage = total blindness in that eye + RAPD. Optic neuritis (multiple sclerosis).',1),
  P2=part('Optic chiasma','NASAL retinal fibres (red) cross; TEMPORAL fibres (blue) stay. Pituitary tumour compresses it = bitemporal hemianopia.',1),
  P3=part('Optic tract','Carries fibres for the OPPOSITE visual field of both eyes. Lesion = contralateral homonymous hemianopia.',1),
  P4=part('Lateral geniculate nucleus','Thalamic relay with 6 layers (magno + parvo + konio cells); input is retinotopic.',1),
  P5=part('Optic radiations','Upper fibres (parietal) = inferior field; lower fibres loop through the temporal lobe (Meyer loop) = superior field: temporal lesion = "pie in the sky".',1),
  P6=part('Primary visual cortex (V1)','Calcarine sulcus of the occipital lobe; macula has a huge representation. Occipital infarct = homonymous hemianopia with macular sparing.',1),
  P7=part('Pituitary (relation)','Sits just below the chiasma in the sella turcica.',1);
 const RED=0xff7a6a,BLU=0x6fb0ff,paths=[];
 [-1,1].forEach(s=>{sp(s*.9,-2.0,0,.4,.4,.25,0xf2eee6,P1,.95);
  const nas=[[s*.8,-1.65,0],[s*.35,-1.1,0],[0,-.9,0],[-s*.35,-.4,0],[-s*.75,.6,0]],tem=[[s*1.0,-1.65,0],[s*.95,-1.0,0],[s*.85,-.1,0],[s*.75,.6,0]];
  tb(nas.slice(0,3),.045,RED,P1,.95);tb(nas.slice(2),.045,RED,P3,.95);tb(tem.slice(0,2),.045,BLU,P1,.95);tb(tem.slice(1),.045,BLU,P3,.95);
  sp(s*.75,.6,0,.2,.2,.2,0xc8a0ff,P4,.95);
  const rad=[[s*.75,.7,0],[s*1.4,1.1,0],[s*1.2,1.8,0],[s*.7,2.3,0]];tb(rad,.06,0xc8a0ff,P5,.95);sp(s*.55,2.4,0,.4,.2,.2,0xffb86a,P6,.95);
  paths.push({cp:poly([...nas,[-s*.75,.7,0],[-s*1.4,1.1,0],[-s*1.2,1.8,0],[-s*.55,2.35,0]]),c:RED},{cp:poly([...tem,[s*1.4,1.1,0],[s*1.2,1.8,0],[s*.55,2.35,0]]),c:BLU})});
 sp(0,-.9,0,.16,.08,.1,0xffffff,P2,.8);sp(0,-.6,0,.22,.14,.14,0xffb0c0,P7,.9);
 const D=paths.map(p=>[0,1,2,3,4,5].map(()=>dc(new T.SphereGeometry(.035,8,6),p.c,0,0,0,{op:1})));
 fx.push(s=>{paths.forEach((p,i)=>D[i].forEach((d,j)=>d.position.copy(p.cp.getPointAt((s*.12+j/6)%1))));txt('Left visual field > right brain, right field > left brain: nasal fibres cross at the chiasma')});
 lb([['Eye',[-1.8,-2.0,0]],['Optic nerve',[-1.7,-1.2,0]],['Chiasma',[0,-1.25,0]],['Pituitary',[.1,-.4,0]],['Optic tract',[-1.1,0,0]],['LGN',[-1.35,.6,0]],['Radiations',[-1.9,1.35,0]],['V1',[0,2.8,0]]]);
 return {t:'Visual pathway',s:'Eye > chiasma > tract > LGN > radiations > V1 (nasal fibres cross)',rd:7,rm:11.5,cam:[0,.03],tg:[0,.4,0]}}];
}
