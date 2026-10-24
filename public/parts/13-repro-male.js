/* ---- v9: MALE reproductive: root (sagittal body, erection, sperm path) > testis > spermatogenesis > sperm | penis | prostate ---- */
{
const {SMC,ELL,SYM,SCL,SHP}=EYX.h,lerp=(a,b,u)=>a+(b-a)*u,k01=x=>Math.max(0,Math.min(1,x));
const STR=(m,a,b,z)=>{const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy)||.001;m.position.set((a[0]+b[0])/2,(a[1]+b[1])/2,z||0);m.scale.set(1,L,1);m.rotation.z=Math.atan2(-dx,dy)};
EYX.er=false;EYX.sp=true;

/* ---------- ROOT: midsagittal pelvis, face to the LEFT ---------- */
EYX.N.mrepro=['Male reproductive',c=>{
 const {ad,tb,sp,bx,cy,dc,lb,txt}=c,
  PB=part('Urinary bladder','Muscular reservoir (~400-600 mL). Its neck sits on the prostate.',1),
  PP=part('Prostate','Chestnut-sized gland (~20 g) around the first part of the urethra, just below the bladder, in FRONT of the rectum (felt on rectal examination). Tap for zones, BPH + TURP.',1,'E:prostate'),
  PS=part('Seminal vesicle + ejaculatory duct','Paired glands behind the bladder: make ~60% of semen (fructose + alkaline fluid). Their duct joins the vas deferens to form the ejaculatory duct through the prostate.',1),
  PV=part('Vas deferens','Muscular tube from the epididymis tail through the inguinal canal, over the pubis and behind the bladder to the ampulla. Cut in vasectomy: sperm no longer reach the semen, hormones + ejaculate volume stay almost the same.',1),
  PT=part('Testis + scrotum','Lie outside the body (~2-3 degrees C cooler, needed for sperm). Tap for the testis cross-section.',1,'E:testis'),
  PE=part('Epididymis','Coiled tube (~6 m uncoiled) on the back of the testis: sperm mature + become motile here (2-12 days) and are stored in the tail.',1),
  PU=part('Urethra','Prostatic > membranous > spongy (penile) urethra: carries BOTH urine + semen (never together: the bladder neck closes during ejaculation).',1),
  PPn=part('Penis (corpora)','Two corpora cavernosa (dorsal) + corpus spongiosum (ventral, holds the urethra). Erection = blood filling. Tap for the cross-section.',1,'E:penis'),
  PG=part('Bulbourethral gland','Pea-sized gland below the prostate: clear pre-ejaculate (lubricates, neutralises acidic urethra). Pre-ejaculate can carry sperm + HIV.',1),
  PR=part('Rectum + anus','Behind the prostate + seminal vesicles. Internal (involuntary) + external (voluntary) anal sphincters.',1),
  PY=part('Pubic symphysis + sacrum','Bony pelvic landmarks (front + back).',1),
  PH=part('Myths + facts (sex education)','I-pill, HIV/AIDS, masturbation, sperm formation, menstrual cycle. Tap to open.',1,'E:sexed');
 EYX.btn.eyer=b=>{EYX.er=!EYX.er;b.textContent=EYX.er?'Penis: erect':'Penis: flaccid';b.classList.toggle('on',EYX.er)};
 EYX.btn.eysp=b=>{EYX.sp=!EYX.sp;b.textContent=EYX.sp?'Sperm path: ON':'Sperm path: OFF';b.classList.toggle('on',EYX.sp)};
 EYX.btn.eybk=()=>{const o=EYX.old;if(o&&EYX.curM)o(EYX.curM,false)};
 bx(-1.15,-.05,0,.22,.75,.2,0xe9e2cf,PY,.95);tb([[1.3,1.9,0],[1.55,.9,0],[1.45,-.2,0],[1.1,-.9,0]],.13,0xe9e2cf,PY,.95);tb([[-1.45,1.9,0],[-1.3,.6,0],[-1.2,.0,0]],.05,0xe3b79b,PY,.7);
 sp(-.7,.6,0,.5,.45,.3,0xd9736b,PB,.45);sp(-.7,.6,0,.4,.35,.24,0xf0a0a0,PB,.5);
 sp(-.55,-.1,0,.28,.24,.25,0xd89a82,PP,.95);sp(-.15,.3,0,.14,.3,.1,0xe3b064,PS,.95);tb([[-.3,.2,0],[-.5,-.05,0]],.025,0xf0d9a6,PS,.95);
 tb([[-.45,-1.45,0],[-.45,-.9,0],[-.95,-.3,0],[-1.0,.25,0],[-.55,.6,0],[-.15,.45,0],[-.2,.2,0]],.025,0xe7d29b,PV,.95);sp(-.22,.15,0,.06,.1,.05,0xe8d6a4,PV,.95);
 sp(-.5,-1.3,0,.36,.48,.3,0xd69a91,PT,.2);sp(-.5,-1.3,0,.28,.38,.22,0xe8c998,PT,.95);tb([[-.3,-1.0,0],[-.22,-1.3,0],[-.32,-1.6,0]],.05,0xd9a76f,PE,.95);
 sp(-.65,-.55,0,.05,.05,.05,0xe5b870,PG,.95);tb([[.7,1.1,0],[.85,.3,0],[.8,-.5,0],[.55,-1.0,0]],.24,0xb86a5a,PR,.85);tb([[.55,-1.0,0],[.45,-1.5,0]],.15,0xb86a5a,PR,.9);ad(new T.TorusGeometry(.16,.04,8,16),0xd8a090,.45,-1.5,0,{op:.95},PR);
 tb([[-.62,.2,0],[-.58,-.1,0],[-.58,-.4,0],[-.75,-.55,0]],.035,0xf2e08a,PU,.95);
 const NS=9,cav=[0,1].map(()=>[]),spg=[],ur=[];for(let i=0;i<NS;i++){cav[0].push(cy(0,0,0,1,1,0xc05a64,PPn,.95));cav[1].push(cy(0,0,0,1,1,0xc05a64,PPn,.95));spg.push(cy(0,0,0,1,1,0xb96568,PPn,.95));ur.push(cy(0,0,0,1,1,0xf2e08a,PU,.95))}
 const gl=sp(0,0,0,.14,.12,.1,0xe1b0a6,PPn,.95);
 const bez=(t,u)=>{const e=[lerp(-1.7,-2.7,u),lerp(-1.25,-.1,u)],m=[lerp(-1.3,-1.8,u),lerp(-.6,-.45,u)],a=[-.8,-.5],q=1-t;return [q*q*a[0]+2*q*t*m[0]+t*t*e[0],q*q*a[1]+2*q*t*m[1]+t*t*e[1]]};
 const D=[];for(let i=0;i<9;i++)D.push(dc(new T.SphereGeometry(.035,8,6),0x9fe0ff,0,0,0,{op:1}));
 const fixed=[[-.45,-1.45],[-.45,-.9],[-.95,-.3],[-1.0,.25],[-.55,.6],[-.15,.45],[-.2,.2],[-.3,.2],[-.5,-.05],[-.58,-.1],[-.58,-.4],[-.75,-.55]];let uu=0,tm=0;
 fx.push(s=>{uu+=((EYX.er?1:0)-uu)*.04;const u=uu,P=[];for(let i=0;i<=NS;i++)P.push(bez(i/NS,u));
  const col=[lerp(.75,.85,u),lerp(.35,.14,u),lerp(.39,.18,u)];
  for(let i=0;i<NS;i++){const a=P[i],b=P[i+1],dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy)||.01,nx=-dy/L,ny=dx/L,sg=ny<0?-1:1,o=.1*(1+.3*u);
   const set=(m,r,off,z)=>{m.position.set((a[0]+b[0])/2+nx*sg*off,(a[1]+b[1])/2+ny*sg*off,z);m.scale.set(r,L*1.05,r);m.rotation.z=Math.atan2(-dx,dy)};
   set(cav[0][i],.085*(1+.25*u),o,.06);set(cav[1][i],.085*(1+.25*u),o,-.06);set(spg[i],.05,-o*.7,0);set(ur[i],.02,-o*.7,0);cav[0][i].material.color.setRGB(...col);cav[1][i].material.color.setRGB(...col)}
  gl.position.set(P[NS][0]+(P[NS][0]-P[NS-1][0])*.5,P[NS][1]+(P[NS][1]-P[NS-1][1])*.5,0);
  const path=fixed.concat(P.map(p=>[p[0],p[1]])).reverse().reverse();let tot=0;const cum=[0];for(let i=1;i<path.length;i++){tot+=Math.hypot(path[i][0]-path[i-1][0],path[i][1]-path[i-1][1]);cum.push(tot)}
  D.forEach((d,k)=>{d.visible=EYX.sp;const w=((s*.08+k/9)%1)*tot;let j=1;while(j<cum.length-1&&cum[j]<w)j++;const f=(w-cum[j-1])/Math.max(1e-6,cum[j]-cum[j-1]);d.position.set(lerp(path[j-1][0],path[j][0],f),lerp(path[j-1][1],path[j][1],f),.1)});
  txt(EYX.er?'ERECT: parasympathetic (S2-S4) > NO > cGMP > smooth muscle relaxes > corpora cavernosa fill with blood, veins squeezed shut':'Flaccid. Sperm path: testis > epididymis > vas deferens > behind bladder > ejaculatory duct > urethra > out')});
 lb([['Bladder',[-.7,1.15,0]],['Prostate',[-.15,-.45,0]],['Seminal vesicle',[.35,.55,0]],['Vas deferens',[-1.35,.45,0]],['Testis',[-1.3,-1.45,0]],['Epididymis',[.05,-1.6,0]],['Pubic symphysis',[-1.6,-.2,0]],['Rectum',[1.25,.5,0]],['Anus',[.95,-1.55,0]],['Penis',[-1.8,-.8,0]],['Urethra',[-.2,-.7,0]]],'#ffd29a');
 return {t:'Male reproductive: real body (side view)',s:'Flaccid/Erect + Sperm path + Book diagram | part par tap karein',rd:8.2,rm:12.5,cam:[0,.05],tg:[-.55,0,0],ex:'<button id="eyer">Penis: flaccid</button><button id="eysp" class="on">Sperm path: ON</button><button id="eybk">Book diagram</button>'}}];

/* ---------- TESTIS: cross-section ---------- */
EYX.N.testis=['Testis: cross-section',c=>{
 const {ad,tb,sp,lb,txt}=c,
  PT=part('Tunica albuginea','Tough white fibrous capsule (grey-blue in the diagram); thickens posteriorly as the mediastinum testis. Cannot stretch: swelling (torsion, infection) is very painful.',1),
  PS=part('Septa','Fibrous partitions from the mediastinum to the capsule dividing the testis into ~250 lobules.',1),
  PL=part('Lobules + seminiferous tubules','Each lobule holds 1-4 highly coiled seminiferous tubules (~80 cm each) where sperm are made. Tap for spermatogenesis.',1,'E:sgenesis'),
  PR=part('Rete testis + mediastinum','Network of channels collecting sperm from the straight tubules.',1),
  PEf=part('Efferent ductules','6-12 small ducts carrying sperm from the rete testis to the head of the epididymis.',1),
  PEH=part('Epididymis (head, body, tail)','Single coiled tube (~6 m): head receives sperm, body = maturation (motility + fertilising ability), tail = storage. Transit 2-12 days.',1),
  PV=part('Vas deferens','Continues from the tail upward in the spermatic cord.',1),
  PP=part('Pampiniform plexus + testicular artery','Venous network around the artery: counter-current heat exchange keeps the testis ~2-3 degrees C below body temperature. Varicocele = dilated plexus (infertility cause).',1),
  PY=part('Interstitium (Leydig cells)','Between the tubules: Leydig cells make TESTOSTERONE under LH.',1);
 const rot=.35,E=(x,y,rx,ry,n)=>ELL(x,y,rx,ry,rot,n);
 SHP(c,E(0,-.2,.9,1.05,48),0x6c7a8a,PT,.97);SHP(c,E(0,-.2,.82,.97,48),0xe8a090,PY,.97);
 const rn=RN(3);for(let i=0;i<55;i++){const a=rn()*6.28,r=Math.sqrt(rn())*.78,x=Math.cos(a)*r*.82,y=Math.sin(a)*r*.97;sp(x*Math.cos(rot)-y*Math.sin(rot),-.2+x*Math.sin(rot)+y*Math.cos(rot),0,.03,.03,.01,0xf0b090,PL,.95)}
 const M=[-.3,.35];for(let k=0;k<8;k++){const a=1.2+k*.75,px=Math.cos(a)*.82,py=Math.sin(a)*.97,X=px*Math.cos(rot)-py*Math.sin(rot),Y=-.2+px*Math.sin(rot)+py*Math.cos(rot);tb([[M[0],M[1],0],[(M[0]+X)/2,(M[1]+Y)/2,0],[X,Y,0]],.009,0x6c7a8a,PS,.95);
  const mx=(M[0]+X)/2,my=(M[1]+Y)/2;tb([[mx,my,0],[mx+.07,my+.05,0],[mx+.02,my+.1,0],[mx+.1,my+.15,0],[mx+.05,my+.2,0]].map(p=>[p[0]-.1*Math.cos(a+.4),p[1]-.1*Math.sin(a+.4),0]),.012,0xf5c8a8,PL,.95)}
 for(let i=0;i<7;i++)tb([[-.35+i*.025,.3,0],[-.3+i*.03,.38+i*.01,0],[-.2+i*.03,.35,0]],.014,0xa02030,PR,.95);
 for(let i=0;i<7;i++)tb([[-.25+i*.02,.4,0],[-.2+i*.04,.62+(i%2)*.06,0],[-.1+i*.07,.78,0],[.05+i*.07,.88,0]],.011,0xe86a60,PEf,.95);
 tb([[.6,1.0,0],[.1,1.07,0],[-.4,.92,0],[-.8,.62,0],[-.97,.12,0],[-.97,-.42,0],[-.85,-.92,0]],.1,0xf0a890,PEH,.95);
 for(let i=0;i<9;i++){const t=i/8;sp(lerp(.55,-.85,Math.min(1,t*1.4))*.95,lerp(1.0,-.9,t*t),0,.11,.11,.08,0xf0a890,PEH,.9)}
 tb([[-.85,-.95,0],[-1.05,-.4,0],[-1.15,.3,0],[-.9,1.3,0],[-.7,1.9,0]],.05,0xf0a890,PV,.95);
 for(let k=0;k<4;k++)tb([[-.15+k*.05,.9,0],[-.3+k*.1,1.3,0],[-.2+k*.06,1.6,0],[-.35+k*.08,1.95,0]],.02,0x2f6fe0,PP,.9);tb([[-.1,.9,0],[-.25,1.3,0],[-.3,1.95,0]],.02,0xd8232f,PP,.95);
 lb([['Tunica albuginea',[1.2,-.8,0]],['Septa',[1.15,.0,0]],['Lobules',[1.0,.5,0]],['Rete testis',[.55,.35,0]],['Efferent ductules',[.9,1.05,0]],['Epididymis head',[.5,1.3,0]],['Epididymis body',[-1.5,.5,0]],['Epididymis tail',[-1.5,-1.0,0]],['Vas deferens',[-1.5,1.3,0]],['Pampiniform plexus',[.6,1.8,0]]],'#ffd29a');
 txt('Testis cross-section: lobules + coiled seminiferous tubules > rete testis > efferent ductules > epididymis > vas');
 return {t:'Testis + epididymis',s:'Lobules par tap = sperm formation | like your reference',rd:6,rm:10,cam:[0,.05],tg:[-.1,.45,0]}}];

/* ---------- SPERMATOGENESIS: seminiferous tubule cross-section ---------- */
EYX.N.sgenesis=['Spermatogenesis',c=>{
 const {ad,tb,sp,cy,dc,lb,txt}=c,
  P1=part('Basement membrane + myoid cells','Tubule wall: contractile myoid cells squeeze sperm toward the rete testis.',1),
  P2=part('Spermatogonia (2n)','Stem cells at the base: divide by MITOSIS (some stay as stem cells, some become primary spermatocytes). Diploid, 46 chromosomes.',1),
  P3=part('Primary spermatocytes','Large cells that enter MEIOSIS I (~24 days: long prophase with crossing over): 46 duplicated chromosomes > 2 secondary spermatocytes.',1),
  P4=part('Secondary spermatocytes (n)','Short-lived (hours); MEIOSIS II separates sister chromatids: 23 chromosomes each > 2 spermatids.',1),
  P5=part('Spermatids (n)','Round haploid cells that undergo SPERMIOGENESIS: nucleus condenses, acrosome forms, flagellum grows, extra cytoplasm shed (residual body). No more division.',1),
  P6=part('Spermatozoa in the lumen','Released (spermiation) into the lumen: still immotile; matured in the epididymis. Tap for sperm structure.',1,'E:sperm'),
  P7=part('Sertoli cells + blood-testis barrier','Tall "nurse" cells from base to lumen: support + feed germ cells, tight junctions (orange ring) form the blood-testis barrier (protects haploid cells from the immune system), secrete inhibin + ABP. Controlled by FSH.',1),
  P8=part('Leydig cells (interstitium)','Between the tubules: LH makes them produce TESTOSTERONE (needed for spermatogenesis + male characteristics).',1),
  P9=part('Hormonal control','Hypothalamus GnRH > anterior pituitary: FSH (Sertoli cells) + LH (Leydig cells > testosterone). Inhibin (Sertoli) + testosterone feed back negatively on the brain. Whole process ~64-74 days (about 2.5 months) + 2-12 days in the epididymis; ~100 million or more sperm per day.',1);
 const R=(r,a)=>[Math.cos(a)*r,Math.sin(a)*r,0];
 tb(Array.from({length:25},(_,i)=>R(1.25,i/24*6.2832)),.025,0xe8d49a,P1,.95);for(let i=0;i<16;i++){const p=R(1.31,i/16*6.2832);sp(p[0],p[1],0,.08,.04,.03,0xd8a0a0,P1,.9)}
 const RINGS=[[1.12,.09,12,0x6fa8e8,P2],[.92,.14,9,0xe8a0d0,P3],[.76,.1,5,0xd08ae8,P4],[.6,.075,13,0x9ad0a0,P5]];
 RINGS.forEach(q=>{for(let i=0;i<q[2];i++){const a=(i+.5)/q[2]*6.2832+(q[0]*3),p=R(q[0],a);sp(p[0],p[1],0,q[1],q[1],q[1],q[3],q[4],.95)}});
 for(let i=0;i<16;i++){const a=i/16*6.2832+.2,p=R(.5,a),t=R(.3,a+.15);sp(p[0],p[1],0,.045,.03,.03,0xf5f0b0,P6,1);tb([[p[0],p[1],0],[(p[0]+t[0])/2+.02,(p[1]+t[1])/2,0],[t[0],t[1],0]],.006,0xf5f0b0,P6,.95)}
 for(let i=0;i<8;i++){const a=i/8*6.2832+.4;ad(new T.ConeGeometry(.1,.9,8),0xfff2d0,.85*Math.cos(a),.85*Math.sin(a),0,{op:.28,r:[0,0,a-1.5708],s:[1,1.0,1]},P7)}
 tb(Array.from({length:25},(_,i)=>R(.98,i/24*6.2832)),.012,0xf2a040,P7,.95);
 for(let i=0;i<4;i++){const a=.8+i*1.57;[0,1,2].forEach(k=>{const p=R(1.72+.04*k,a+k*.08);sp(p[0],p[1],0,.1,.08,.06,0xf2c070,P8,.95)})}tb(Array.from({length:12},(_,i)=>R(1.9,.2+i*.12)),.03,0xd8232f,P8,.9);
 const hb=ad(new T.BoxGeometry(.9,.18,.05),0x7cc4ff,-1.35,-1.95,0,{op:.9},P9);
 const cell=dc(new T.SphereGeometry(1,14,10),0xffffff,0,0,0,{op:1}),ST=['Spermatogonium (2n): mitosis at the base of the tubule','Primary spermatocyte: meiosis I (46 duplicated chromosomes), crosses the blood-testis barrier','Secondary spermatocyte (n=23): meiosis II','Spermatid (n): spermiogenesis: acrosome + flagellum form','Spermatozoon released into the lumen (spermiation): total ~74 days'];let tt=0,t0=0;
 fx.push(s=>{const dt=Math.min(.1,s-t0);t0=s;tt=(tt+dt)%15;const u=tt/15,st=u<.2?0:u<.45?1:u<.6?2:u<.82?3:4,r=lerp(1.12,.45,u),a=.6+u*1.2,p=R(r,a),size=[.09,.14,.1,.075,.05][st],col=[0x6fa8e8,0xe8a0d0,0xd08ae8,0x9ad0a0,0xf5f0b0][st];
  cell.position.set(p[0],p[1],.05);cell.scale.setScalar(size*1.4);cell.material.color.setHex(col);cell.renderOrder=9;
  txt(ST[st]+'   (day ~'+Math.round(u*74)+')')});
 lb([['Spermatogonia',[1.2,.55,0]],['Primary spermatocyte',[-1.55,.6,0]],['Spermatid',[.15,-.9,0]],['Sperm in lumen',[0,0,0]],['Sertoli cell',[-.2,1.1,0]],['Blood-testis barrier',[1.35,-.6,0]],['Leydig cells',[-1.5,-1.4,0]],['Basement membrane',[.9,1.55,0]]],'#ffd29a');
 return {t:'Sperm formation (spermatogenesis)',s:'Seminiferous tubule cross-section | tracer cell: base to lumen ~74 din',rd:6.5,rm:8.5,cam:[0,.05],tg:[0,0,0]}}];

/* ---------- SPERM structure ---------- */
EYX.N.sperm=['Sperm cell',c=>{
 const {ad,tb,sp,cy,lb,txt,EG,por}=c,
  P1=part('Acrosome','Cap of digestive enzymes (hyaluronidase, acrosin) from the Golgi: released in the ACROSOME REACTION to penetrate the corona radiata + zona pellucida.',1),
  P2=part('Nucleus (head)','Tightly packed haploid DNA: 23 chromosomes, either X or Y (decides the baby\'s sex). Head ~5 um.',1),
  P3=part('Neck + centriole','Connects head and tail; centrioles organise the flagellum + later the first cell divisions.',1),
  P4=part('Midpiece (mitochondrial spiral)','Helix of mitochondria: ATP for swimming (~50 um/s).',1),
  P5=part('Principal piece (flagellum)','Axoneme (9+2 microtubules) + fibrous sheath: whip-like beating. Defects = asthenozoospermia (poor motility).',1),
  P6=part('End piece','Thin tip of the tail. Total length ~55 um; normal count >= 15 million/mL, >= 40% motile (WHO reference).',1);
 EG.rotation.z=por?-1.5708:0;
 sp(-2.5,0,0,.4,.27,.12,0xcfd8f0,P2,.95);sp(-2.45,0,0,.26,.2,.1,0x4a5a98,P2,.97);sp(-2.75,0,0,.2,.25,.13,0xf0f4ff,P1,.95);sp(-2.05,0,0,.07,.07,.07,0xe8c070,P3,.97);
 for(let i=0;i<14;i++)ad(new T.TorusGeometry(.09,.025,6,12),0xffb060,-1.95+i*.075,0,0,{r:[0,1.5708,0],op:.97},P4);cy(-1.45,0,0,.07,1.1,0xd88a40,P4,.9,[0,0,1.5708]);
 const seg=[];for(let i=0;i<34;i++){const m=sp(0,0,0,.07*(1-i/60),.07*(1-i/60),.07*(1-i/60),i<22?0xdfe8ff:0xbfd0ff,i<22?P5:P6,.97);seg.push(m)}
 fx.push(s=>{seg.forEach((m,i)=>{const x=-.9+i*.1,A=.05+.12*(i/34);m.position.set(x,A*Math.sin(i*.45-s*7),0)});txt('Sperm: head (acrosome + nucleus) | neck | midpiece (energy) | tail (motor). Total ~55 um')});
 lb([['Acrosome',[-2.95,.55,0]],['Nucleus (23 chromosomes)',[-2.3,-.6,0]],['Neck',[-2.05,.5,0]],['Midpiece',[-1.4,-.5,0]],['Principal piece',[.3,.6,0]],['End piece',[2.1,-.5,0]]],'#ffd29a');
 return {t:'Sperm structure',s:'Head, midpiece, tail | tail ki wave live',rd:7,rm:8.5,cam:[0,.05],tg:por?[0,-.3,0]:[-.2,0,0]}}];

/* ---------- PENIS: axial cross-section + erection ---------- */
EYX.N.penis=['Penis: cross-section',c=>{
 const {ad,tb,sp,bx,lb,txt}=c,
  PS=part('Skin, dartos fascia + Buck fascia','Thin skin + loose dartos layer let the shaft expand; deep Buck fascia surrounds all three corpora and the deep vessels.',1),
  PT=part('Tunica albuginea','White bilayered fibrous sheath around each corpus cavernosum: it is what makes the erect penis RIGID (and why a penile fracture is an emergency).',1),
  PC=part('Corpora cavernosa (cavernous spaces)','Two dorsal cylinders of sponge-like tissue: trabeculae (smooth muscle + collagen) around blood-filled cavernous spaces. Relaxed trabeculae = spaces fill = erection.',1),
  PA=part('Central (helicine) arteries','Branches of the deep penile arteries (from the internal pudendal): flow into the spaces when their smooth muscle relaxes.',1),
  PZ=part('Corpus spongiosum + urethra','Ventral cylinder with the urethra: stays softer in erection so that semen can pass; expands into the glans at the tip.',1),
  PV=part('Deep dorsal vein','Midline vein draining the penis; compressed between the tunica + the swollen corpora in erection (veno-occlusion), trapping blood.',1),
  PD=part('Dorsal arteries','Paired arteries beside the deep dorsal vein: supply the glans + skin.',1),
  PN=part('Dorsal nerves','Sensory nerves (pudendal): lateral to the dorsal arteries.',1),
  PW=part('Superficial dorsal + circumflex veins','Drain the skin; join the saphenous vein system.',1),
  PE=part('Erection physiology','Sexual stimulation > parasympathetic (S2-S4) nitric oxide > cGMP > smooth-muscle relaxation > arterial inflow up + venous outflow down. PDE5 inhibitors (sildenafil) keep cGMP high but still need stimulation. Sympathetic fibres cause detumescence/ejaculation.',1);
 EYX.btn.eyer=b=>{EYX.er=!EYX.er;b.textContent=EYX.er?'Penis: erect':'Penis: flaccid';b.classList.toggle('on',EYX.er)};
 SHP(c,ELL(0,.5,1.3,1.15,0,40),0xe8b79b,PS,.97);SHP(c,ELL(0,.5,1.2,1.05,0,40),0xf3d9c0,PS,.97);
 const lobes=[-1,1].map(s=>{SHP(c,ELL(s*.52,.55,.62,.62,0,36),0xfff0f0,PT,.97);const g=SHP(c,ELL(s*.52,.55,.54,.54,0,36),0xe88a90,PC,.97);return g}),rn=RN(6),SPC=[];
 [-1,1].forEach(s=>{for(let i=0;i<34;i++){const a=rn()*6.28,r=Math.sqrt(rn())*.46,x=s*.52+Math.cos(a)*r,y=.55+Math.sin(a)*r,m=ad(new T.CircleGeometry(1,10),0xb06a70,x,y,0,{s:[.045,.045,1],op:.95},PC);SPC.push({m,x,y,s0:.03+rn()*.03})}ad(new T.CircleGeometry(.05,12),0xd8232f,s*.52,.55,0,{op:1},PA)});
 tb([[0,.1,0],[0,1.0,0]],.008,0xfff0f0,PT,.9);
 SHP(c,ELL(0,-.3,.42,.32,0,30),0xfff0f0,PZ,.97);SHP(c,ELL(0,-.3,.36,.27,0,30),0xe8908a,PZ,.97);SHP(c,ELL(0,-.3,.12,.045,0,20),0x5a1a24,PZ,.97);
 const dv=ad(new T.CircleGeometry(1,20),0x2f6fe0,0,1.18,.01,{s:[.1,.1,1],op:1},PV);[-1,1].forEach(s=>{ad(new T.CircleGeometry(.05,12),0xd8232f,s*.22,1.14,.01,{op:1},PD);ad(new T.CircleGeometry(.045,12),0xf2e08a,s*.4,1.1,.01,{op:1},PN);ad(new T.CircleGeometry(.04,12),0x2f6fe0,s*.95,.85,.01,{op:1},PW)});ad(new T.CircleGeometry(.04,12),0x2f6fe0,0,1.4,.01,{op:1},PW);
 sp(1.75,-1.3,0,.1,.1,.1,0xffe36a,PE,.95);let u=0;
 fx.push(s=>{u+=((EYX.er?1:0)-u)*.04;lobes.forEach(g=>g.scale.set(1+.1*u,1+.1*u,1));SPC.forEach(q=>{q.m.scale.set(q.s0*(1+1.2*u),q.s0*(1+1.2*u),1);q.m.material.color.setRGB(lerp(.69,.85,u),lerp(.42,.14,u),lerp(.44,.18,u))});dv.scale.set(.1*(1-.55*u),.1*(1-.7*u),1);
  txt(EYX.er?'ERECT: cavernous spaces swell with blood, trabeculae stretch, the deep dorsal vein is squeezed (veno-occlusion)':'FLACCID: contracted smooth muscle, small spaces, veins open: blood flows through')});
 lb([['Deep dorsal vein',[-1.1,1.55,0]],['Dorsal arteries',[1.15,1.5,0]],['Dorsal nerve',[1.5,1.15,0]],['Corpus cavernosum',[-1.45,.2,0]],['Tunica albuginea',[1.5,.1,0]],['Septum',[0,1.25,0]],['Corpus spongiosum',[-1.1,-.75,0]],['Urethra',[.85,-.7,0]]],'#ffd29a');
 return {t:'Penis: cross-section + erection',s:'Flaccid/Erect button | image jaisa | part par tap karein',rd:5.8,rm:8.5,cam:[0,.05],tg:[0,.5,0],ex:'<button id="eyer">Penis: flaccid</button>'}}];

/* ---------- PROSTATE: zones, BPH, TURP ---------- */
EYX.N.prostate=['Prostate',c=>{
 const {ad,tb,sp,cy,lb,txt}=c,ST=EYX.ps||0,
  PB=part('Bladder (detrusor)','In BPH the bladder wall thickens + becomes trabeculated, and residual urine stays after voiding.',1),
  PZ=part('Peripheral zone (~70%)','Posterior + lateral: largest zone and the site of most prostate CANCERS; felt on digital rectal examination (DRE). PSA blood test screens.',1),
  PT=part('Transition zone (BPH)','Small zone around the urethra: it ENLARGES with age (benign prostatic hyperplasia), squeezing the urethra: weak stream, hesitancy, nocturia, retention. TURP removes this tissue.',1),
  PC=part('Central zone','Wedge around the ejaculatory ducts.',1),
  PA=part('Anterior fibromuscular stroma','Non-glandular smooth muscle in front.',1),
  PU=part('Prostatic urethra','Passes straight through the gland: opens at the seminal colliculus where the ejaculatory ducts enter.',1),
  PS=part('Seminal vesicle + ejaculatory duct','Behind the bladder; the duct pierces the prostate.',1),
  PR=part('Rectum (DRE)','Directly behind the prostate: the examining finger feels the peripheral zone.',1),
  PL=part('Resectoscope + wire loop (TURP)','Transurethral resection: a scope with a heated wire loop passes up the urethra and shaves away the obstructing transition zone from inside; no cut on the skin.',1);
 EYX.btn.eyps=b=>{EYX.ps=((EYX.ps||0)+1)%3;EYX.show('prostate')};
 const tz=[1,1.9,.55][ST],ur=[.06,.02,.11][ST];
 sp(-.1,1.15,0,.75,.6,.4,0xd9736b,PB,.35);if(ST==1)sp(-.1,1.15,0,.7,.55,.36,0xb34f4a,PB,.5);sp(-.1,1.15,0,.55,.42,.3,0xf0a0a0,PB,.35);
 sp(0,-.25,0,.62,.55,.4,0xd89a82,PA,.5);sp(.12,-.3,0,.44,.44,.3,0xb66c5b,PZ,.75);sp(.1,-.05,0,.2,.3,.2,0xc98a68,PC,.85);sp(-.05,.0,0,.2*tz,.22*tz,.2*tz,0xe2a080,PT,.9);
 tb([[-.05,.6,0],[-.05,.1,0],[-.06,-.3,0],[-.1,-.7,0],[-.2,-1.25,0],[-.45,-1.7,0]],ur,0xf2e08a,PU,.97);
 sp(.55,.5,0,.2,.45,.14,0xe3b064,PS,.9);tb([[.45,.3,0],[.2,.0,0]],.025,0xf0d9a6,PS,.95);tb([[1.0,1.2,0],[1.2,.2,0],[1.1,-.6,0],[.8,-1.2,0]],.28,0xb86a5a,PR,.8);
 if(ST==2){tb([[-.45,-2.0,0],[-.35,-1.7,0],[-.2,-1.25,0],[-.1,-.7,0],[-.06,-.3,0]],.06,0xbfc8d8,PL,.95);ad(new T.TorusGeometry(.09,.012,6,16),0xff8a3a,-.04,-.12,0,{r:[0,1.5708,0],op:1},PL)}
 let t=0;fx.push(s=>{txt(ST==0?'Normal prostate: urethra open, strong stream':ST==1?'BPH: transition zone swells and squeezes the urethra: weak stream, nocturia, residual urine':'TURP: resectoscope shaves away the transition zone; the channel is wide again (retrograde ejaculation is a common side effect)')});
 lb([['Bladder',[-.9,1.5,0]],['Transition zone',[-.8,.15,0]],['Peripheral zone',[.85,-.7,0]],['Urethra',[-.75,-.8,0]],['Seminal vesicle',[1.0,.7,0]],['Rectum',[1.45,.5,0]]].concat(ST==2?[['Resectoscope',[-.9,-1.9,0]]]:[]),'#ffd29a');
 return {t:'Prostate: zones, BPH, TURP',s:'State button: Normal > BPH > TURP | part par tap karein',rd:6.5,rm:9,cam:[0,.05],tg:[.1,0,0],ex:'<button id="eyps" class="on">State: '+['Normal','BPH','After TURP'][ST]+'</button>'}}];
}
