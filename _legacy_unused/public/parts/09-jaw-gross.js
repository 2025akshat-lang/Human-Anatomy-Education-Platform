/* ---- MANDIBLE v8 (gross scene): body + alveolar process + angle + ramus + coronoid + condyle + mental protuberance ----
   Teeth arch is x=.21*sin(q), z=.49-.3*(1-cos q) at y=7.985, so the body runs just under it (y=7.925).
   All pieces share the name 'Mandible' so quiz / routing keep working. */
{const NM='Mandible',IM='Only movable skull bone: body (holds the 16 lower teeth), angle, ramus, coronoid process and condylar process (TMJ), mental protuberance (chin). Tap the TMJ hotspot for the joint cross-section.',
 tube3=(pts,r,n)=>new T.TubeGeometry(new T.CatmullRomCurve3(pts.map(V3)),n,r,8);
 [-1,1].forEach(s=>{
  const A=[0,.35,.7,1.05,1.4].map(q=>[s*.235*Math.sin(q),7.925,.51-.3*(1-Math.cos(q))]).concat([[s*.29,7.91,.1],[s*.315,7.9,.055],[s*.315,8.0,.04],[s*.315,8.12,.035],[s*.315,8.215,.04]]);
  bn(tube3(A,.03,70),0,0,0,NM,IM);
  bn(tube3([0,.4,.8,1.2,1.5].map(q=>[s*.215*Math.sin(q),7.955,.495-.3*(1-Math.cos(q))]),.022,30),0,0,0,NM,IM);
  bn(bx(.016,.19,.12),s*.315,8.11,.075,NM,IM);
  bn(new T.ConeGeometry(.032,.1,8),s*.315,8.2,.125,NM,IM,{s:[.35,1,1]});
  bn(sp(.034),s*.318,8.255,.038,NM,IM,{s:[1.3,.75,.9]});
  bn(sp(.035),s*.31,7.905,.07,NM,IM)});
 bn(sp(.032),0,7.905,.53,NM,IM,{s:[1.3,.8,.7]})}
