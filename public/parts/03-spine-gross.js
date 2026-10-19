/* ---- SPINE v6: natural sagittal curvature + tilted vertebrae ----
   spZ(y)   = z of vertebral-body centre (cervical lordosis, thoracic kyphosis, lumbar lordosis)
   spTilt   = body/endplate tilt following the curve (x2.2 so it is visible)
   canalZ   = z of the vertebral canal centre (spinal cord + arch rings follow it)
   Every piece of one vertebra shares the SAME name, so quiz / routing / detail view still work. */
const spZ=y=>-.12+.08*Math.exp(-Math.pow((y-7.4)/.55,2))-.06*Math.exp(-Math.pow((y-5.9)/.9,2))+.09*Math.exp(-Math.pow((y-4.6)/.5,2));
const spTilt=y=>Math.atan((spZ(y+.05)-spZ(y-.05))/.1)*2.2;
const spR=y=>{const c=t=>Math.max(0,Math.min(1,t));return .1+.03*c((7.0-y)/.4)+.04*c((5.1-y)/.4)};
const canalZ=y=>spZ(y)-(.8*spR(y)+.055);
for(let i=0;i<24;i++){
 const y=i<7?7.75-i*.12:i<19?6.85-(i-7)*.15:4.95-(i-19)*.17,r=i<7?.1:i<19?.13:.17;
 const n=i<7?'Cervical C'+(i+1):i<19?'Thoracic T'+(i-6):'Lumbar L'+(i-18);
 const inf=i==0?'Atlas: no body, no spinous process; carries the skull.':i==1?'Axis: has dens (odontoid process); head rotates here.':i==6?'Vertebra prominens (C7), palpable at neck base.':i<7?'Cervical: 7 vertebrae, transverse foramen present.':i<19?'Thoracic: 12 vertebrae, costal facets for ribs.':'Lumbar: 5 vertebrae, largest bodies, no costal facets.';
 const z=spZ(y),th=spTilt(y),zc=canalZ(y),cer=i<7,tho=i>=7&&i<19;
 /* body (wider than deep, tilted with the curve) */
 bn(new T.CylinderGeometry(r,r*.95,.1,18),0,y,z,n,inf,{s:[1.1,1,.8],r:[th,0,0]});
 /* neural arch ring around the canal (cord passes through it) */
 bn(new T.TorusGeometry(.075,.02,6,16),0,y,zc,n,inf,{r:[Math.PI/2+th,0,0]});
 /* spinous process: short/horizontal cervical, long + steeply down thoracic, stout horizontal lumbar */
 if(i>0){const L=cer?(i==6?.2:i==1?.16:.12):tho?.2:.14,ph=cer?(i==6?1.15:1.3):tho?(i<10?.75:i<16?.3:.6):1.4;
  bn(new T.CylinderGeometry(.022,.012,L,8),0,y-Math.cos(ph)*L/2,zc-.095-Math.sin(ph)*L/2,n,inf,{r:[ph,0,0]})}
 /* transverse processes */
 const lt=cer?.13:tho?.22:.24;
 [-1,1].forEach(s=>bn(new T.CylinderGeometry(.014,.02,lt,8),s*(.08+lt/2),y,zc+.02,n,inf,{r:[0,0,Math.PI/2]}));
}
