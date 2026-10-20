/* ---- v8: mandible landmarks (Kenhub-style) + TMJ sagittal cross-section with Open/Close ---- */
{
const IPL=(S,x)=>{if(x<=S[0].x)return S[0].y;for(let i=1;i<S.length;i++)if(S[i].x>=x){const a=S[i-1],b=S[i],t=(x-a.x)/Math.max(1e-6,b.x-a.x);return a.y+(b.y-a.y)*t}return S[S.length-1].y};
const SM=(pts,n)=>new T.CatmullRomCurve3(pts.map(p=>V3([p[0],p[1],0])),true,'catmullrom',.5).getPoints(n).map(p=>[p.x,p.y]);
const EXG=(pts,d)=>{const g=new T.ExtrudeGeometry(new T.Shape(pts.map(p=>new T.Vector2(p[0],p[1]))),{depth:d,bevelEnabled:false});g.translate(0,0,-d/2);return g};
const STRIP=(m,a,b,z)=>{const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy)||.001;m.position.set((a[0]+b[0])/2,(a[1]+b[1])/2,z||0);m.scale.set(1,L,1);m.rotation.z=Math.atan2(-dx,dy)};

/* ---------- MANDIBLE: landmarks ---------- */
EYX.N.mandible=['Mandible',c=>{
 const {ad,tb,sp,bx,cy,lb,txt}=c,B=0xe9e2cf,
  PB=part('Body','Horseshoe-shaped; lower border = base, upper border = alveolar process with 16 tooth sockets. Strongest at the symphysis and canine region.',1),
  PM=part('Mental protuberance + tubercles','Chin: triangular protuberance with a mental tubercle at each lower corner (attachment of depressor labii inferioris and depressor anguli oris).',1),
  PF=part('Mental foramen','Below the 2nd premolar: exit of the mental nerve + vessels (from the inferior alveolar nerve, V3). Lower lip + chin numbness after a fracture.',1),
  PA=part('Alveolar process + interalveolar septa','Tooth-bearing upper part: bony septa separate the sockets. Resorbs after tooth loss.',1),
  PO=part('Oblique line','Ridge from the mental tubercle up to the anterior border of the ramus: attachment of depressor labii inferioris, depressor anguli oris and platysma.',1),
  PY=part('Mylohyoid line + groove','Medial ridge for the mylohyoid muscle (floor of the mouth); the groove below it carries the mylohyoid nerve + vessels.',1),
  PR=part('Ramus','Vertical plate behind the molars; medial pterygoid inserts on its inner surface, masseter on the outer surface.',1),
  PG=part('Angle + masseteric tuberosity','Junction of body and ramus (~120-130 degrees, flatter in adults). Masseter (outer) + medial pterygoid (inner) form a sling. Common fracture site.',1),
  PI=part('Pterygoid fovea','Pit on the front of the condylar neck: insertion of the lateral pterygoid (inferior head).',1),
  PC=part('Coronoid process','Triangular tip that receives the temporalis tendon. Mandibular notch separates it from the condyle.',1),
  PL=part('Mandibular foramen + lingula','Entry of the inferior alveolar nerve + artery into the mandibular canal; the lingula (small spike) anchors the sphenomandibular ligament. Dentists block the nerve here.',1),
  PD=part('Condylar process (TMJ)','Head + neck: the head (covered by fibrocartilage) articulates with the temporal bone. Tap to open the joint cross-section.',1,'E:tmj'),
  PT=part('Lower teeth (16)','2 incisors, 1 canine, 2 premolars, 3 molars per side.',1);
 const arch=(q,r)=>[r*Math.sin(q),1.5-1.8*(1-Math.cos(q))],Q=[0,.35,.7,1.05,1.4];
 [-1,1].forEach(s=>{
  tb(Q.map(q=>{const p=arch(q,1.4);return [s*p[0],.35,p[1]]}).concat([[s*1.7,.3,-.35],[s*1.8,.2,-.62]]),.26,B,PB,.97);
  tb(Q.map(q=>{const p=arch(q,1.25);return [s*p[0],.74,p[1]]}),.13,0xf0e8d4,PA,.97);
  const T8=[.1,.3,.5,.7,.9,1.1,1.25,1.4];T8.forEach((q,k)=>{const p=arch(q,1.25),w=k<2?.16:k<5?.2:.3;bx(s*p[0],.98,p[1],w,.34,.22,0xfbf8ee,PT,.97,[0,s*q*.9,0])});
  bx(s*1.85,1.05,-.45,.14,1.8,1.15,B,PR,.97);ad(new T.SphereGeometry(.24,16,12),B,s*1.8,-.05,-.7,{op:.97},PG);
  [[.2,.1],[.05,-.1],[-.1,.12]].forEach(o=>sp(s*2.0,.15+o[0],-.7+o[1],.06,.06,.06,0xd8cfb4,PG,.97));
  ad(new T.ConeGeometry(.26,.75,10),B,s*1.85,2.0,-.05,{op:.97,s:[.4,1,1]},PC);
  tb([[s*1.85,1.6,-.68],[s*1.85,2.0,-.72]],.15,B,PD,.97);sp(s*1.85,2.15,-.72,.2,.14,.2,0xd8d2bc,PD,.97);
  const mf=arch(.75,1.4);sp(s*(mf[0]+.18),.38,mf[1]+.12,.06,.06,.06,0x2a2a2a,PF,1);
  tb([[s*1.2,.5,.8],[s*1.5,.75,.3],[s*1.78,1.05,-.1]],.03,0xfff6dc,PO,.97);tb([[s*.9,.5,.85],[s*1.3,.42,.3],[s*1.65,.3,-.35]],.03,0xfff6dc,PY,.97);
  sp(s*1.75,1.0,-.35,.07,.07,.07,0x2a2a2a,PL,1);ad(new T.ConeGeometry(.05,.15,8),0xf0e8d4,s*1.74,1.12,-.3,{op:1},PL);
  sp(s*1.74,1.75,-.7,.07,.07,.05,0x2a2a2a,PI,1);
  });
 [-.3,.3].forEach(x=>sp(x,.1,1.52,.1,.07,.08,0xd8cfb4,PM,.97));
 sp(0,.2,1.58,.24,.2,.16,0xe0d8c0,PM,.97);
 lb([['Mental protuberance',[0,-.2,1.9]],['Mental foramen',[1.3,.12,1.5]],['Oblique line',[1.9,1.2,.6]],['Alveolar process',[-.8,1.35,1.6]],['Mylohyoid line',[-1.5,.1,.2]],['Angle',[2.35,-.15,-.9]],['Ramus',[2.4,1.0,-.2]],['Coronoid process',[2.0,2.55,0]],['Condylar process (TMJ)',[2.1,2.6,-1.0]],['Mandibular foramen + lingula',[-2.35,1.2,-.35]],['Lower teeth',[0,1.5,1.7]]]);
 txt('Mandible: Kenhub-style landmarks. Condylar process par tap > TMJ cross-section');
 return {t:'Mandible: landmarks',s:'Body, ramus, angle, foramina, lines | condylar process > TMJ',rd:8.5,rm:12,cam:[.7,.4],tg:[0,.9,.3]}}];

/* ---------- TMJ: sagittal cross-section, anterior = LEFT ---------- */
EYX.N.tmj=['Temporomandibular joint',c=>{
 const {ad,tb,sp,bx,cy,dc,lb,txt,EG}=c,
  PT=part('Temporal bone: fossa + eminence','Mandibular (glenoid) fossa behind and the articular eminence in front, covered by FIBROCARTILAGE (not hyaline). The fossa roof is very thin; the postglenoid tubercle stops the condyle going backwards.',1),
  PC=part('Mandibular condyle','Head of the condylar process (cancellous bone + cortical shell + fibrocartilage cap). Rotates in the LOWER compartment, translates forward with the disc.',1),
  PD=part('Articular disc','Biconcave fibrocartilage: anterior band (~2 mm), thin intermediate zone (~1 mm, weight-bearing) and posterior band (~3 mm). Avascular + aneural centrally; divides the joint into two compartments.',1),
  PS=part('Superior compartment (translation)','Between the temporal surface and the disc: GLIDING (translation) movement. Larger and looser. Synovial fluid (cyan).',1),
  PI=part('Inferior compartment (rotation)','Between the disc and the condyle: HINGE (rotation) movement for the first ~20 mm of opening. Synovial fluid (cyan).',1),
  PR=part('Bilaminar zone (retrodiscal tissue)','Vascular + innervated tissue behind the disc: superior lamina (elastic, to temporal bone) pulls the disc back on closing; inferior lamina (collagen, to condylar neck) limits translation. Pain source in disc displacement.',1),
  PK=part('Capsule','Thin fibrous capsule attached above to the eminence + postglenoid region and below to the condylar neck; lined by synovium. Lax anteriorly to allow translation.',1),
  PL=part('Lateral (temporomandibular) ligament','Thickened lateral capsule: oblique fibres from the zygomatic arch tubercle to the condylar neck; limits posterior + inferior displacement and protects the retrodiscal tissue.',1),
  PX=part('Sphenomandibular + stylomandibular ligaments','Accessory ligaments on the medial side: sphenomandibular (spine of sphenoid to lingula) and stylomandibular (styloid process to angle). They do not limit opening much.',1),
  PP=part('Lateral pterygoid','Superior head blends with the disc + capsule, inferior head inserts on the condylar neck (pterygoid fovea). Pulls the condyle + disc FORWARD (opening, protrusion). Nerve: V3.',1),
  PM=part('Temporalis + masseter','Elevators of the mandible (closing): temporalis to the coronoid process, masseter from the zygomatic arch to the angle + ramus. Nerve: V3.',1),
  PN=part('Auriculotemporal nerve + vessels','V3 branch running behind the condyle (sensory to the joint, ear, temple); superficial temporal artery + maxillary artery are close relations. Why the joint is tender behind the tragus.',1);
 EYX.op=false;EYX.dsp=false;
 EYX.btn.eyop=b=>{EYX.op=!EYX.op;b.textContent=EYX.op?'Mouth: open':'Mouth: closed';b.classList.toggle('on',EYX.op)};
 EYX.btn.eydk=b=>{EYX.dsp=!EYX.dsp;b.textContent=EYX.dsp?'Disc: displaced':'Disc: normal';b.classList.toggle('on',EYX.dsp)};
 const TC=[[-1.6,1.18],[-1.3,1.15],[-1.1,1.0],[-.9,.95],[-.7,1.05],[-.5,1.25],[-.25,1.4],[.15,1.42],[.4,1.3],[.58,1.02],[.72,1.1],[.9,1.25],[1.3,1.25]],
  S=new T.SplineCurve(TC.map(p=>new T.Vector2(p[0],p[1]))).getPoints(160),yt=x=>IPL(S,x);
 add(EXG([[-1.6,2.6]].concat(S.map(p=>[p.x,p.y]),[[1.3,2.6]]),.5),0xe9e2cf,0,0,0,{op:.97,g:EG},PT);
 add(EXG([[-1.5,2.5]].concat(S.filter(p=>p.x>-1.5&&p.x<1.2).map(p=>[p.x,p.y+.09]),[[1.2,2.5]]),.46),0xe3a98a,0,0,0.0,{op:.55,g:EG},PT);
 const rn=RN(9);for(let k=0;k<34;k++){const x=-1.4+rn()*2.5,y=yt(x)+.16+rn()*(2.3-yt(x)-.16);ad(new T.SphereGeometry(1,8,6),0xf5dcc8,x,y,.0,{s:[.06,.015,.1],op:.6,r:[0,0,rn()*3]},PT)}
 tb(S.filter(p=>p.x>-1.2&&p.x<.75).map(p=>[p.x,p.y-.012,0]),.022,0x9fd7e2,PT,.95);
 /* moving mandible group (origin = condyle centre) */
 const GM=new T.Group();EG.add(GM);
 const ML=[[.34,-1.3],[.34,-.45],[.36,-.2],[.45,0],[.45,.16],[.32,.3],[.1,.34],[-.1,.34],[-.3,.3],[-.45,.12],[-.42,-.05],[-.3,-.25],[-.32,-.4],[-.6,-.35],[-.85,-.15],[-1.0,.1],[-1.2,.55],[-1.35,.4],[-1.4,-.2],[-1.45,-1.3],[-.55,-1.3],[-.05,-1.3]],
  MS=SM(ML,140),mar=SM(ML.map(p=>[-.45+(p[0]+.45)*.72,-.4+(p[1]+.4)*.78]),120);
 add(EXG(MS,.46),0xe9e2cf,0,0,0,{op:.97,g:GM},PC);add(EXG(mar,.42),0xe3a98a,0,0,.0,{op:.55,g:GM},PC);
 for(let k=0;k<24;k++)add(new T.SphereGeometry(1,8,6),0xf5dcc8,-.9+rn()*1.1,-1.0+rn()*1.2,0,{s:[.05,.018,.09],op:.6,r:[0,0,rn()*3],g:GM},PC);
 add(new T.TubeGeometry(new T.CatmullRomCurve3([[.45,.08],[.4,.22],[.25,.33],[0,.36],[-.25,.33],[-.4,.22],[-.44,.08]].map(p=>V3([p[0],p[1],0]))),24,.032,6),0x9fd7e2,0,0,0,{op:.95,g:GM},PC);
 const rot=(p,th,xc,yc)=>[xc+p[0]*Math.cos(th)-p[1]*Math.sin(th),yc+p[0]*Math.sin(th)+p[1]*Math.cos(th)];
 /* disc segments + joint spaces */
 const TH=[.08,.15,.16,.10,.065,.06,.07,.12,.20,.22,.18,.10,.06,.04],DS=[],SU=[];
 TH.forEach((t,i)=>{DS.push(ad(new T.BoxGeometry(.14,1,.46),0xf0e6c0,0,0,0,{op:.97},PD));SU.push(ad(new T.BoxGeometry(.13,.03,.44),0x70d6df,0,0,0,{op:.4},PS))});
 const inf=ad(new T.SphereGeometry(1,16,10),0x70d6df,0,0,0,{s:[.5,.04,.22],op:.45},PI);
 const cyl=(col,r,P,op)=>ad(new T.CylinderGeometry(r,r,1,10),col,0,0,0,{op:op||.9},P);
 const sLam=cyl(0xf0d070,.03,PR),iLam=cyl(0xe8dcc8,.03,PR),cAnt=cyl(0xf5ecd0,.022,PK),cPost=cyl(0xf5ecd0,.022,PK),
  pSup=cyl(0xc0504a,.07,PP),pInf=cyl(0xc0504a,.085,PP),lig=cyl(0xe8d49a,.03,PL),tem=cyl(0xb04a44,.09,PM),mas=cyl(0xc0504a,.09,PM),sph=cyl(0xe8d49a,.025,PX),sty=cyl(0xe8d49a,.025,PX);
 tb([[1.0,-.6,0],[.85,0,0],[.78,.6,0],[.74,1.0,0]],.03,0xf2e08a,PN,.95);tb([[1.12,-.5,.05],[.98,.2,.05],[.9,.9,.05]],.018,0xd8232f,PN,.95);
 let u=0,xi0=-.22,t0=0,prevU=0,clickT=-9;
 fx.push(s=>{u+=((EYX.op?1:0)-u)*.04;const th=.38*u,xc=.15-.93*u,yc=yt(xc)-.09-.34;GM.position.set(xc,yc,0);GM.rotation.z=th;
  const tgt=EYX.dsp&&u<.55?-.55:-.22*(1-u);xi0+=(tgt-xi0)*.2;if(EYX.dsp&&prevU<.55&&u>=.55)clickT=s;prevU=u;
  const xi=xc+xi0,P=[];
  TH.forEach((t,i)=>{const x=xi+(i-5)*.12,y=yt(x),a=Math.atan((yt(x+.05)-yt(x-.05))/.1);DS[i].position.set(x,y-.03-t/2,0);DS[i].scale.set(1,t,1);DS[i].rotation.z=a;SU[i].position.set(x,y-.015,0);SU[i].rotation.z=a;P.push([x,y-.03-t/2])});
  const ap=rot([0,.36],th,xc,yc);inf.position.set(ap[0],ap[1]-.02,0);inf.rotation.z=th;
  const nA=rot([-.32,-.4],th,xc,yc),nP=rot([.34,-.3],th,xc,yc),cor=rot([-1.2,.55],th,xc,yc),ang=rot([-.5,-1.2],th,xc,yc),ang2=rot([.2,-1.25],th,xc,yc),lin=rot([-.3,-.7],th,xc,yc),neckL=rot([.3,-.5],th,xc,yc),neckF=rot([-.32,-.35],th,xc,yc);
  STRIP(sLam,P[13],[.66,yt(.66)]);STRIP(iLam,[P[13][0],P[13][1]-.04],nP);STRIP(cAnt,[-1.15,yt(-1.15)],nA);STRIP(cPost,[.66,yt(.66)+.02],[nP[0]+.02,nP[1]+.05],.1);
  STRIP(pSup,[-2.2,.55],P[0]);STRIP(pInf,[-2.2,.2],neckF);STRIP(lig,[-.85,.92],neckL,.3);STRIP(tem,[-1.4,2.5],cor,.05);STRIP(mas,[-1.4,1.18],ang,.33);STRIP(sph,[-.5,1.2],lin,-.3);STRIP(sty,[.9,.75],ang2,-.3);
  const clk=s-clickT<1.2;
  txt(EYX.dsp?(clk?'CLICK: the condyle recaptures the displaced disc (anterior disc displacement with reduction)':u<.55?'Disc DISPLACED forward: posterior band in front of the condyle; opening is silent until the condyle jumps back onto it (click)':'Disc recaptured: condyle sits on the intermediate zone again'):(u<.15?'Closed: condyle in the fossa, posterior band of the disc at its top':u<.75?'Opening: hinge in the lower compartment first, then condyle + disc TRANSLATE forward down the eminence (upper compartment)':'Wide open (40-50 mm): condyle under the articular eminence crest, disc intermediate zone on top'))});
 lb([['Articular eminence',[-.95,.62,0]],['Mandibular fossa',[-.1,1.8,0]],['Postglenoid tubercle',[.95,.8,0]],['Capsule (anterior)',[-1.85,1.4,0]],['Lat. pterygoid',[-2.2,.35,.1]],['Temporalis',[-1.9,2.3,0]],['Masseter',[-1.9,.2,.3]],['Retrodiscal',[1.25,.45,0]],['Auriculotemporal n.',[1.45,-.4,0]]]);
 return {t:'TMJ: sagittal cross-section',s:'Open/Close + Disc button | disc, compartments, capsule, ligaments',rd:7.2,rm:12,cam:[0,.08],tg:[-.35,.9,0],ex:'<button id="eyop">Mouth: closed</button><button id="eydk">Disc: normal</button>'}}];

/* ---------- routing: TMJ hotspots + Mandible bone ---------- */
{const _oj=window.openDV;window.openDV=(m,lv)=>{const n=m.userData.name;if(n==='Temporomandibular joint'){init();cur=m;EYX.st=['tmj'];EYX.op=false;EYX.dsp=false;EYX.show('tmj');return}
 if(n==='Mandible'){init();cur=m;EYX.st=['mandible'];EYX.show('mandible');return}return _oj(m,lv)}}
}
