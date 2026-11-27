/* ---- v7 EYE: nested atlas (core + root) ----
   Tree:  Eye(root) -> cornea -> stroma | iris -> plr | lens -> aqueous | retina -> photo -> cascade | onoff
                    -> fundus(optic disc) -> nerve(visual pathway) | muscles -> orbit
   A part with micro-code 'E:<id>' opens node <id>. The X button walks back up the stack. */
const EYX={N:{},st:[],on:false,br:true,lt:true,vert:false,btn:{}};
{
EYX.ctx=()=>{const EG=new T.Group();G2.add(EG);const por=innerWidth/innerHeight<.8;
 const ad=(g,col,x,y,z,o,P)=>add(g,col,x,y,z,Object.assign({},o||{},{g:EG}),P),
  tb=(pts,r,col,P,op)=>add(new T.TubeGeometry(new T.CatmullRomCurve3(pts.map(V3)),Math.max(10,pts.length*8),r,8),col,0,0,0,{op:op||.9,g:EG},P),
  sp=(x,y,z,sx,sy,sz,col,P,op)=>ad(new T.SphereGeometry(1,22,16),col,x,y,z,{s:[sx,sy||sx,sz||sx],op:op||.92},P),
  bx=(x,y,z,w,h,d,col,P,op,r)=>ad(new T.BoxGeometry(w,h,d),col,x,y,z,{op:op||.9,r},P),
  cy=(x,y,z,r,h,col,P,op,rot)=>ad(new T.CylinderGeometry(r,r,h,22),col,x,y,z,{op:op||.9,r:rot},P),
  dc=(geo,col,x,y,z,o)=>{o=o||{};const m=new T.Mesh(geo,new T.MeshStandardMaterial({color:col,roughness:.45,transparent:true,opacity:o.op||.8,side:T.DoubleSide,depthWrite:false}));m.position.set(x,y,z);if(o.s)m.scale.set(...o.s);if(o.r)m.rotation.set(...o.r);EG.add(m);return m},
  lb=(arr,col)=>{EG.updateMatrixWorld(true);lab(arr.map(a=>[a[0],EG.localToWorld(new T.Vector3(a[1][0],a[1][1],a[1][2])).toArray()]),col||'#ffe36a')},
  poly=pts=>{const cp=new T.CurvePath();for(let i=0;i<pts.length-1;i++)cp.add(new T.LineCurve3(V3(pts[i]),V3(pts[i+1])));return cp},
  txt=s=>{if(txt.l!==s){txt.l=s;const e=$('#ph');if(e)e.textContent=s}};
 return {EG,por,ad,tb,sp,bx,cy,dc,lb,poly,txt}};
EYX.show=id=>{init();reset();ret=null;live=false;kind='ey_'+id;EYX.btn={};EYX.lp='';const c=EYX.ctx(),o=EYX.N[id][1](c);
 fin(o.t,o.s,o.rd||5,o.rm||8);tg.set(...(o.tg||[0,0,0]));const cm=o.cam||[0,.12];tth=th=cm[0];tel=el=cm[1];
 if(o.ex)$('#dl').insertAdjacentHTML('afterbegin',o.ex);
 const s0=$('#scalePath');if(s0)s0.textContent='BODY / '+EYX.st.map(k=>EYX.N[k][0]).join(' / ').toUpperCase();
 curV=()=>EYX.show(id);ret=EYX.st.length>1?EYX.back:null};
EYX.go=id=>{EYX.st.push(id);EYX.show(id)};EYX.back=()=>{EYX.st.pop();EYX.show(EYX.st[EYX.st.length-1])};
$('#dl').addEventListener('click',e=>{const b=e.target.closest('button');if(b&&EYX.btn[b.id]){e.stopPropagation();EYX.btn[b.id](b)}},true);
{const dn=$('#dn'),_dn=dn.onclick;dn.onclick=e=>{if(e.target&&e.target.id=='mv'&&selP&&/^E:/.test(selP.v||'')){EYX.go(selP.v.slice(2));return}if(_dn)_dn(e)}}/* the floating red 'Micro view' button calls #dn.onclick directly, so wrap the handler itself */
new MutationObserver(()=>{if(!selP||!/^E:/.test(selP.v||''))return;const b=$('#mv'),f=document.getElementById('mvf');if(b)b.textContent='Open inside \u25B8';if(f)f.textContent='Open inside \u25B6'}).observe($('#dn'),{childList:true});
{const _o4=window.openDV;window.openDV=(m,lv)=>{if(m.userData.name!=='Eye')return _o4(m,lv);init();cur=m;EYX.st=['root'];EYX.on=!!lv;EYX.br=true;EYX.show('root')}}

/* ---------- ROOT: external eye (light OFF)  /  cross-section + light rays (light ON) ---------- */
EYX.N.root=['Eye',c=>{
 const {ad,tb,sp,bx,dc,lb,poly,txt,EG}=c,on=EYX.on,
  ex='<button id="eylt" class="'+(on?'on':'')+'">Light: '+(on?'ON':'OFF')+'</button>'+(on?'<button id="eybr" class="on">'+(EYX.br?'Bright':'Dim')+'</button><button id="eyvw" class="on">'+(EYX.vert?'Vertical':'Horizontal')+'</button>':'');
 EYX.btn.eylt=()=>{EYX.on=!EYX.on;EYX.show('root')};
 EYX.btn.eybr=b=>{EYX.br=!EYX.br;b.textContent=EYX.br?'Bright':'Dim'};EYX.btn.eyvw=()=>{EYX.vert=!EYX.vert;EYX.show('root')};
 const PM=part('Extraocular muscles (6)','Four recti + two obliques rotate the globe (LR6 SO4 AO3: lateral rectus CN VI, superior oblique CN IV, all others CN III). Tap to open muscles, nerves and orbit.',1,'E:muscles');
 if(!on){
  const PS=part('Sclera','White fibrous coat (collagen): keeps the shape, anchors the six extraocular muscles; continuous with the cornea at the limbus.',1);sp(0,0,0,1,1,1,0xf2eee6,PS,.98);
  const PC=part('Cornea','Clear avascular dome (~43 D, two thirds of focusing power), most sensitive tissue of the body (CN V1). Tap to open its 5 layers.',1,'E:cornea');
  ad(new T.SphereGeometry(.62,32,16,0,6.2832,0,.9),0xcfe8ff,0,0,.5,{op:.3,r:[Math.PI/2,0,0]},PC);
  const PI=part('Iris + pupil','Coloured muscular diaphragm: sphincter pupillae (constricts, CN III) and dilator pupillae (dilates, sympathetic). Pupil 2 mm bright / 8 mm dark. Tap to open.',1,'E:iris');
  ad(new T.CircleGeometry(.47,48),0x4aa3a8,0,0,.8,{op:.97},PI);
  const go=ad(new T.RingGeometry(1,1.45,48),0xd9a441,0,0,.805,{op:.97},PI),pu=ad(new T.CircleGeometry(1,40),0x050507,0,0,.81,{op:1},PI);
  go.scale.set(.28,.28,1);pu.scale.set(.28,.28,1);
  for(let k=0;k<28;k++){const a=k/28*6.283;ad(new T.BoxGeometry(.006,.2,.002),0x2f7f86,Math.cos(a)*.34,Math.sin(a)*.34,.802,{op:.8,r:[0,0,a-1.5708]},PI)}
  const PN=part('Optic nerve (CN II)','Bundle of ~1.2 million ganglion-cell axons leaving the back of the eye; carries vision to the brain. Tap to follow the visual pathway.',1,'E:nerve');
  tb([[0,0,-.98],[0,-.05,-1.6],[0,-.1,-2.3]],.1,0xf2e08a,PN,.95);
  [0,1.5708,3.1416,4.7124].forEach(m=>{const p=[];for(let a=2.3;a>=.95;a-=.2)p.push([1.06*Math.sin(a)*Math.cos(m),1.06*Math.sin(a)*Math.sin(m),1.06*Math.cos(a)]);tb(p,.07,0xc0504a,PM,.92)});
  lb([['Sclera',[.95,.55,.3]],['Cornea',[-.55,.62,1.1]],['Iris + pupil',[0,-.58,.9]],['Optic nerve',[.15,.4,-1.8]],['Rectus muscle',[.9,-.2,-.6]]]);
  txt('Roshni OFF: bahar se aankh. "Light" dabao: cross-section + roshni ka raasta');
  return {t:'Eye: external view',s:'Light button: cross-section + light | part par tap karein',rd:3.4,rm:5.2,cam:[0,.1],tg:[0,0,.2],ex}}
 /* ---- light ON: horizontal cross-section, axis along x (rotated to vertical on phones) ---- */
 EG.rotation.z=EYX.vert?-1.5708:0;const SX=-2.4,TT=(-.93-SX)/(-.5-SX);
 const arc=(R,a0,a1,n)=>{const p=[];for(let i=0;i<=n;i++){const t=(a0+(a1-a0)*i/n)*Math.PI/180;p.push([R*Math.cos(t),R*Math.sin(t),0])}return p},
  PS=part('Sclera','White collagen coat; muscles insert here. Continues as the cornea in front.',1),
  PCH=part('Choroid (vascular layer)','Dark vessel-rich layer: nourishes the outer retina, absorbs stray light. With ciliary body + iris = uvea.',1),
  PR=part('Retina','Neural layer: ~120 million rods + ~6 million cones. Light passes through ALL layers to reach the photoreceptors at the back. Tap to open the layers.',1,'E:retina'),
  PC=part('Cornea','Transparent dome, ~43 D: bends light most. Tap for the 5 layers.',1,'E:cornea'),
  PI=part('Iris + pupil','Pupil 2 mm (bright) to 8 mm (dim): see the rays get blocked by the iris. Tap for the muscles.',1,'E:iris'),
  PL=part('Lens','Biconvex, elastic (~17 D); changes shape for near vision. Tap for accommodation.',1,'E:lens'),
  PCB=part('Ciliary body + zonules','Ciliary muscle + processes: make aqueous humour and pull on the zonules to reshape the lens. Tap for aqueous drainage.',1,'E:aqueous'),
  PAQ=part('Aqueous humour','Clear fluid in the anterior + posterior chambers; drains through the trabecular meshwork. Blocked drainage = glaucoma.',1,'E:aqueous'),
  PV=part('Vitreous humour','Clear gel (~80% of the globe) holding the retina against the choroid. Floaters = drifting clumps.',1),
  PF=part('Fovea (macula)','Central pit: only cones, sharpest vision (visual axis). Macular degeneration = loss of central vision.',1,'E:fundus'),
  PD=part('Optic disc (blind spot)','Axons leave and vessels enter here; NO photoreceptors = blind spot ~15 degrees temporal to fixation. Tap for the fundus view.',1,'E:fundus'),
  PO=part('Object + light rays','Each object point sends rays; cornea + lens bend them to ONE point on the retina: a real, inverted, reversed image (the brain re-inverts it).',1);
 tb(arc(1,-146,146,40),.035,0xf2eee6,PS,.98);tb(arc(.955,-128,128,36),.025,0x6a2f2a,PCH,.85);tb(arc(.915,-118,118,36),.03,0xe8a0a0,PR,.92);
 tb([[-.829,.559,0],[-.915,.3,0],[-.96,0,0],[-.915,-.3,0],[-.829,-.559,0]],.03,0xbfe6ff,PC,.65);
 sp(.08,0,0,.86,.86,.55,0xdff0ff,PV,.14);sp(-.74,0,0,.2,.5,.3,0xbfe8ff,PAQ,.25);sp(-.45,0,0,.13,.27,.22,0xf5e8b0,PL,.8);
 [1,-1].forEach(s=>{sp(-.46,s*.64,0,.14,.1,.1,0x9a6a4a,PCB,.95);tb([[-.46,s*.58,0],[-.45,s*.27,0]],.006,0xe8e0c8,PCB,.9)});
 const iu=bx(-.6,.3,0,.04,1,.12,0x4aa3a8,PI,.96),idn=bx(-.6,-.3,0,.04,1,.12,0x4aa3a8,PI,.96);
 sp(.915,0,0,.03,.03,.03,0xf2d65a,PF,1);sp(.875,-.267,0,.05,.05,.05,0xf2e08a,PD,1);
 tb([[.88,-.27,0],[1.35,-.4,0],[1.95,-.5,0]],.1,0xf2e08a,PD,.95);
 const PN=part('Optic nerve (CN II)','Leaves the globe nasal to the fovea; ~1.2 million axons. Tap to follow the visual pathway.',1,'E:nerve');tb([[1.5,-.43,0],[1.95,-.5,0],[2.3,-.55,0]],.11,0xf2e08a,PN,.95);
 tb([[1.7,.62,0],[1.0,.98,0],[.3,1.1,0],[-.2,1.03,0],[-.55,.86,0]],.07,0xc0504a,PM,.9);tb([[1.7,-.85,0],[1.0,-1.0,0],[.3,-1.08,0],[-.2,-1.0,0],[-.5,-.87,0]],.07,0xc0504a,PM,.9);
 tb([[SX,-.35,0],[SX,.35,0]],.02,0xffe36a,PO,1);ad(new T.ConeGeometry(.07,.16,12),0xffe36a,SX,.43,0,{op:1},PO);
 /* rays: 2 source points x 6 aperture heights; rays outside the pupil stop at the iris */
 const SRC=[[.35,0xffe36a],[-.35,0xff9f43]],HL=[-.5,-.3,-.1,.1,.3,.5],rays=[],img=[];
 SRC.forEach(([sy,col])=>{const Iy=-sy*.45,Ix=Math.sqrt(.915*.915-Iy*Iy);img.push([Ix,Iy,col]);
  HL.forEach(h=>{const C=[-.93,sy+(h-sy)*TT],L=[-.5,h*.8],yIr=Math.abs(C[1]+(L[1]-C[1])*.767),
   fp=poly([[SX,sy,0],[C[0],C[1],0],[L[0],L[1],0],[Ix,Iy,0]]),cp=poly([[SX,sy,0],[C[0],C[1],0],[-.6,C[1]+(L[1]-C[1])*.767,0]]),
   mat=g=>dc(new T.TubeGeometry(g,30,.007,5),col,0,0,0,{op:.7}),dots=[];
   for(let k=0;k<5;k++)dots.push(dc(new T.SphereGeometry(.022,8,6),col,0,0,0,{op:1}));
   rays.push({yIr,fp,cp,full:mat(fp),cut:mat(cp),dots})})});
 const gl=img.map(a=>dc(new T.SphereGeometry(.05,12,10),a[2],a[0],a[1],0,{op:.95}));tb([[img[0][0],img[0][1],0],[img[1][0],img[1][1],0]],.012,0xfff3a0,PO,.9);
 let pr=EYX.br?.09:.33;
 fx.push(s=>{const tp=EYX.br?.09:.33;pr+=(tp-pr)*.08;const len=.58-pr;iu.scale.y=len;iu.position.y=pr+len/2;idn.scale.y=len;idn.position.y=-(pr+len/2);
  rays.forEach(r=>{const ok=r.yIr<pr;r.full.visible=ok;r.cut.visible=!ok;const q=ok?r.fp:r.cp;r.dots.forEach((d,i)=>d.position.copy(q.getPointAt((s*.35+i/5)%1)))});
  gl.forEach((g,i)=>g.scale.setScalar(1+.35*Math.sin(s*5+i)));
  txt(EYX.br?'Bright light: pupil ~2 mm, thin beam, sharper image, less light':'Dim light: pupil up to 8 mm, wide beam, more light, blurrier edges')});
 lb([['Cornea',[-1.12,.5,0]],['Pupil',[-.72,.18,0]],['Lens',[-.35,-.4,0]],['Retina',[.78,.66,0]],['Fovea',[1.02,.14,0]],['Optic disc',[.95,-.55,0]],['Object',[SX,.66,0]],['Inverted image',[1.25,.3,0]]]);
 return {t:'Eye: light ON, cross-section',s:'Roshni cornea + lens se bend hoke retina par ulti image banati hai | Bright/Dim = pupil',rd:6.6,rm:EYX.vert?7.6:14,cam:[0,.1],tg:EYX.vert?[0,.5,0]:[-.5,0,0],ex}}];
}
