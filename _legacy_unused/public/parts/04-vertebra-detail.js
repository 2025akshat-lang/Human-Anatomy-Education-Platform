/* ---- v6: vertebra zoom view (golden bone, tilted superior view, cord ring in the canal) ---- */
window.openVT=m=>{init();cur=m;live=false;ret=null;reset();kind='vt';curV=()=>openVT(m);
const n=m.userData.name,ty=n[0]=='C'?'c':n[0]=='T'?'t':'l',num=+n.replace(/\D+/g,''),sp0=$('#scalePath');if(sp0)sp0.textContent='BODY / VERTEBRAL COLUMN / '+n.toUpperCase();
const GOLD=0xdcc58a,GOLD2=0xd2b978,FAC=0xf5f2e6,
 D={c:{rx:.5,rz:.38,h:.3,cr:.36,sl:.5,sd:.08,tp:.5},t:{rx:.62,rz:.52,h:.4,cr:.3,sl:.85,sd:.55,tp:.75},l:{rx:.85,rz:.62,h:.52,cr:.34,sl:.55,sd:.04,tp:.85}}[ty],
 {rx,rz,h,cr,sl,sd,tp}=D,bz=cr+rz*.85,tz=-cr*.35,jx=cr+.08,
 T_={c:['Small, wide body; uncinate processes form uncovertebral joints. Carries head + neck load.','Short and bifid (C2-C6); C7 is long and palpable (vertebra prominens).','Facets lie ~45 degrees: allow flexion, extension, lateral flexion and rotation (most mobile region).','Large triangular canal: houses the cervical enlargement of the cord (C4-T1).'],
  t:['Heart-shaped, medium body with demi-facets for rib heads; wedging adds to thoracic kyphosis.','Long and steeply angled downward, overlapping the vertebra below like roof tiles; limits extension.','Facets are nearly coronal: favour rotation and lateral flexion, limit flexion/extension.','Small round canal, the narrowest region: cord injury risk is highest here.'],
  l:['Largest, kidney-shaped body: bears most body weight; discs L4-L5 and L5-S1 herniate most often.','Short, thick and horizontal (hatchet-shaped); gap between them is used for lumbar puncture.','Facets are sagittal and interlocking: allow flexion/extension, strongly resist rotation.','Triangular canal: below L1-L2 it holds the cauda equina, not the cord.']}[ty],
 PB=part('Vertebral body',T_[0],1),PP=part('Pedicles','Short bars joining body to the arch; the notches above and below them form the intervertebral foramen for the spinal nerve.',1),
 PL=part('Laminae','Flat plates that roof the canal; ligamentum flavum joins adjacent laminae. Removed in laminectomy.',1),
 PS=part('Spinous process',T_[1],1),PT=part('Transverse processes','Lever arms for muscles and ligaments'+(ty=='t'?'; carry costal facets for rib tubercles.':ty=='c'?'; contain the transverse foramen for the vertebral artery.':'; thick and long for psoas and erector spinae attachment.'),1),
 PF=part('Articular processes (facets)',T_[2],1),PC=part('Vertebral canal, cord and meninges',(ty=='l'&&num>2?'Lumbar canal: cauda equina roots float in CSF inside the dural sac (red ring).':T_[3]+' Red ring = dura mater; cream centre = spinal cord.'),1),
 PN=part('Spinal nerve root','Dorsal (sensory) + ventral (motor) roots fuse and leave through the intervertebral foramen. Disc herniation or foraminal narrowing compresses it.',1),
 PD=part('Intervertebral disc','Annulus fibrosus (tough rings) around a gel-like nucleus pulposus; shock absorber that joins this body to the next.',1);
let PCF=null,PTF=null;if(ty=='t')PCF=part('Costal facets (rib articulation)','Demi-facets on the body and a facet on each transverse process articulate with rib head and rib tubercle.',1);if(ty=='c')PTF=part('Transverse foramen + vertebral artery','Cervical vertebrae (C1-C6) have a foramen in each transverse process; the vertebral artery (red) ascends through them to the brain.',1);
/* body + rims + disc */
add(new T.CylinderGeometry(1,1,h,44),GOLD,0,0,bz,{s:[rx,1,rz],op:.97},PB);
[1,-1].forEach(k=>add(new T.TorusGeometry(1,.07,10,44),GOLD2,0,k*h/2,bz,{s:[rx,rz,1],r:[Math.PI/2,0,0],op:.97},PB));
add(new T.CylinderGeometry(1,1,.14,44),0x8fb8d0,0,-h/2-.09,bz,{s:[rx*1.04,1,rz*1.04],op:.5},PD);add(new T.SphereGeometry(1,24,16),0xe7f1f6,0,-h/2-.09,bz,{s:[rx*.5,.07,rz*.5],op:.55},PD);
/* arch */
[-1,1].forEach(s=>{
 tube([[s*cr*.8,0,cr*.8],[s*(cr*.95),0,cr*.3],[s*jx,0,tz]],.09,GOLD,PP,.97);
 tube([[s*jx,0,tz],[s*cr*.75,0,-cr*.9],[s*.06,0,-cr-.1]],.085,GOLD,PL,.97);
 tube([[s*jx,0,tz],[s*(jx+tp*.5),.02,tz-.15],[s*(jx+tp),.04,tz-.3]],.075,GOLD2,PT,.97);add(new T.SphereGeometry(.1,14,10),GOLD2,s*(jx+tp),.04,tz-.3,{op:.97},PT);
 add(new T.SphereGeometry(1,16,12),GOLD,s*cr*.78,.14,-cr*.62,{s:[.12,.1,.13],op:.97},PF);add(new T.SphereGeometry(1,18,12),FAC,s*cr*.78,.23,-cr*.62,{s:[.14,.03,.17],r:[ty=='t'?-.5:0,0,s*(ty=='l'?.5:.1)],op:.97},PF);
 add(new T.SphereGeometry(1,18,12),FAC,s*.17,-.2,-cr-.05,{s:[.12,.03,.14],op:.97},PF);
 tube([[s*cr*.5,.0,0],[s*(cr+.3),-.12,.05],[s*(cr+.8),-.3,.25]],.04,0xe0d870,PN,.96);for(let k=-1;k<2;k++)tube([[s*cr*.4,0,k*.05],[s*(cr+.2),-.08,k*.06],[s*(cr+.45),-.18,.1+k*.05]],.012,0xe8e48a,PN,.9);
 if(ty=='t'){add(new T.SphereGeometry(1,16,12),FAC,s*(rx*.92),.06,bz-rz*.4,{s:[.05,.1,.12],op:.98},PCF);add(new T.SphereGeometry(1,16,12),FAC,s*(jx+tp),.04,tz-.4,{s:[.07,.05,.07],op:.98},PCF)}
 if(ty=='c'){add(new T.TorusGeometry(.07,.02,8,14),0x7a6a3a,s*(jx+tp*.55),-.0,tz-.06,{r:[Math.PI/2,0,0],op:.9},PTF);add(new T.CylinderGeometry(.045,.045,.55,12),0xd8232f,s*(jx+tp*.55),.05,tz-.06,{op:.92},PTF)}
});
/* spinous process: down and back */
tube([[0,0,-cr-.1],[0,-sd*.5,-cr-.1-sl*.5],[0,-sd,-cr-.1-sl]],.07,GOLD2,PS,.97);add(new T.SphereGeometry(.09,14,10),GOLD2,0,-sd,-cr-.1-sl,{op:.97},PS);
if(ty=='c'){add(new T.SphereGeometry(.07,12,8),GOLD2,.07,-sd,-cr-.1-sl,{op:.97},PS);add(new T.SphereGeometry(.07,12,8),GOLD2,-.07,-sd,-cr-.1-sl,{op:.97},PS)}
/* canal: black lumen, red dura ring, cord (or cauda equina) */
add(new T.CylinderGeometry(cr*.97,cr*.97,.04,40),0x0a0a10,0,-.09,0,{op:.97},PC);
add(new T.TorusGeometry(cr*.68,.05,12,44),0xe8353d,0,.0,0,{r:[Math.PI/2,0,0],op:.97},PC);
if(ty=='l'&&num>2){const rn=RN(7);for(let k=0;k<9;k++){const a=k/9*6.28,rr=cr*.3*(.4+rn()*.6);add(new T.SphereGeometry(.05,10,8),0xf3e8c8,Math.cos(a)*rr,.0,Math.sin(a)*rr*.9,{op:.97},PC)}}
else add(new T.CylinderGeometry(cr*.5,cr*.5,.12,36),0xf3e8c8,0,.0,0,{s:[ty=='c'?1.15:1,1,ty=='c'?.8:1],op:.97},PC);
lab([['Body',[0,h/2+.15,bz+rz*.5]],['Spinal cord + dura',[0,.3,0]],['Pedicle',[-cr-.1,.2,cr*.5]],['Lamina',[-cr*.8,.2,-cr-.05]],['Spinous process',[0,.2,-cr-.1-sl]],['Transverse process',[jx+tp,.3,tz-.3]],['Facet',[cr*.78+.15,.35,-cr*.62]],['Nerve root',[-(cr+.55),-.45,.2]]].concat(ty=='c'?[['Transverse foramen',[-(jx+tp*.55),.35,tz]]]:ty=='t'?[['Costal facet',[rx+.2,.3,bz-rz*.4]]]:[]),'#e8d28a');
fin(n+': zoomed vertebra','Superior view, tilted | golden bone, red dura ring, cord, nerve roots | part par tap karein',3.6,5.8);
tg.set(0,-.1,.2);tth=th=.4;tel=el=.85};
{const _o3=window.openDV;window.openDV=(m,lv)=>/^(Cervical C|Thoracic T|Lumbar L)\d+$/.test(m.userData.name)?openVT(m):_o3(m,lv)}
