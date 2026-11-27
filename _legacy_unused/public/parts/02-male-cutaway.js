const maleRepDV=()=>{kind='male';const K=.8,q=a=>a.map(v=>v*K),
 ad=(g,c,x,y,z,o,P)=>{o=o||{};return add(g,c,x*K,y*K,z*K,Object.assign({},o,{s:o.s?q(o.s):[K,K,K]}),P)},
 tu=(pts,r,c,P,op)=>tube(pts.map(q),r*K,c,P,op),
 SG=()=>new T.SphereGeometry(1,28,20),CG=(r,h,open)=>new T.CylinderGeometry(r,r,h,28,1,!!open),
 PUR=part('Urinary bladder and ureters (context)','Ureters enter the posterior bladder wall obliquely; the trigone lies between the ureteric orifices and the internal urethral opening; the bladder neck rests on the prostate.',1),
 PP=part('Penis: paired corpora cavernosa','Dorsal erectile cylinders enclosed by tunica albuginea and Buck fascia; helicine arteries fill cavernous sinusoids.',1),
 PCR=part('Crura of penis','Posterior ends of the corpora cavernosa diverge as two crura, attached to the ischiopubic rami and covered by ischiocavernosus.',1),
 PBU=part('Bulb of penis','Expanded proximal corpus spongiosum in the perineum below the perineal membrane; covered by bulbospongiosus and pierced by the urethra.',1),
 PS=part('Corpus spongiosum, urethra and glans','Ventral erectile body surrounds the spongy urethra and expands distally as the glans.',1),
 PT=part('Tunica albuginea, dorsal vessels and nerves','Dense tunica limits expansion; deep dorsal vein, dorsal arteries and nerves run in the dorsal neurovascular bundle under Buck fascia and skin.',1),
 PX=part('Testicular parenchyma','Testicular lobules contain seminiferous tubules and interstitial Leydig cells.',1),
 PTV=part('Tunica vaginalis','Parietal and visceral serous layers surround the anterolateral testis.',1),
 PTA=part('Tunica albuginea and septa','Dense capsule thickens posteriorly as mediastinum testis and sends septa between lobules.',1),
 PSL=part('Scrotal wall layers','Skin, dartos, external spermatic fascia, cremasteric layer and internal spermatic fascia are separated conceptually.',1),
 PR=part('Seminiferous tubules','Spermatogenesis proceeds from spermatogonia to spermatozoa with Sertoli-cell support; Leydig cells produce testosterone.',1,'rt'),
 PRT=part('Rete testis and efferent ductules','Tubules drain to straight tubules, rete testis and efferent ductules before entering the epididymal head.',1),
 PE=part('Epididymis','Head, body and tail contain a highly coiled duct where sperm mature and are stored.',1),
 PD=part('Ductus deferens','Thick muscular duct: ascends in the spermatic cord, passes through the inguinal canal, loops over the ureter and descends behind the bladder.',1),
 PAM=part('Ampulla of ductus deferens','Dilated terminal vas on the bladder base, medial to the seminal vesicle; unites with the vesicle duct to form the ejaculatory duct.',1),
 PSC=part('Spermatic cord contents','Ductus, testicular artery, pampiniform plexus, genital branch and fascial coverings pass through the inguinal canal.',1),
 PV=part('Seminal vesicles','Paired coiled glands behind the bladder contribute fructose-rich alkaline seminal fluid.',1),
 PED=part('Ejaculatory ducts','Union of seminal-vesicle duct and ductus ampulla traverses the prostate to open into the prostatic urethra.',1),
 PPER=part('Peripheral prostate zone','Posterolateral glandular zone and common origin of prostate carcinoma.',1,'rp'),
 PTR=part('Transition prostate zone','Periurethral zone enlarged in benign prostatic hyperplasia.',1),
 PCEN=part('Central prostate zone and prostatic urethra','Central zone surrounds the ejaculatory ducts; the prostatic urethra traverses the gland.',1),
 PB=part('Bulbourethral glands','Small glands in the deep perineal pouch secrete pre-ejaculate into the proximal spongy urethra.',1),
 PFM=part('Perineal membrane and external urethral sphincter','Perineal membrane anchors the penile root; the external urethral sphincter surrounds the membranous urethra; levator ani and perineal muscles support continence and sexual function.',1),
 PN=part('Pudendal neurovascular supply','Internal pudendal branches supply erectile tissues; autonomic cavernous nerves mediate erection.',1);
 const VP=s=>[[s*1.05,-1.9,-.22],[s*1.12,-1.35,-.25],[s*1.1,-.5,-.2],[s*1.12,.4,-.12],[s*1.2,1.3,-.1],[s*1.15,2.05,-.15],[s*.9,2.2,-.3],[s*.8,1.8,-.5],[s*.68,1.5,-.55],[s*.5,1.3,-.48]];
 /* bladder + ureters */
 ad(SG(),0xd9736b,0,1.6,0,{s:[.8,.72,.62],op:.38},PUR);ad(SG(),0xb34f4a,0,1.15,-.1,{s:[.3,.2,.2],op:.55},PUR);
 [-1,1].forEach(s=>tu([[s*1.0,2.6,-.4],[s*.98,2.1,-.45],[s*.62,1.65,-.5],[s*.32,1.25,-.38]],.045,0xe6c15a,PUR,.95));
 /* urethra: prostatic part (PCEN) + membranous/spongy part (PS) */
 tu([[0,.98,-.05],[0,.45,-.05],[0,.08,-.05]],.045,0xf0d6bb,PCEN,.96);tu([[0,.08,-.05],[0,-.4,-.06],[0,-1.4,-.06],[0,-2.3,-.06]],.04,0xf3dfc8,PS,.98);
 /* prostate zones */
 ad(SG(),0xb46d5b,0,.5,-.1,{s:[.62,.45,.42],op:.5},PPER);ad(SG(),0xe1a07f,0,.5,0,{s:[.38,.3,.28],op:.75},PTR);ad(SG(),0xc98a68,0,.64,-.17,{s:[.3,.24,.22],op:.75},PCEN);
 /* penis: shaft, crura, bulb, glans */
 [-1,1].forEach(s=>{ad(CG(.12,1.75),0x9f4f55,s*.15,-1.225,0,{op:.86},PP);ad(CG(.135,1.77,true),0xe8d8c0,s*.15,-1.225,0,{op:.28},PT);
  tu([[s*.15,-.4,0],[s*.32,-.15,0],[s*.55,.12,0]],.095,0x9f4f55,PCR,.88);
  tu([[s*.07,-1.0,.17],[s*.07,-2.1,.17]],.014,0xd8232f,PT,.96);tu([[s*.13,-.6,.15],[s*.13,-2.1,.15]],.012,0xf2e08a,PT,.96);
  ad(SG(),0xe5b870,s*.26,-.03,-.05,{s:[.1,.1,.1],op:.95},PB);tu([[s*.2,-.05,-.05],[s*.08,-.2,-.06]],.015,0xe5b870,PB,.9);
  tu([[s*.75,.3,.1],[s*.5,-.15,.1],[s*.2,-.5,.1],[s*.1,-.9,.12]],.022,0xd8232f,PN,.96);tu([[s*.78,.25,.14],[s*.52,-.2,.14],[s*.22,-.55,.14],[s*.12,-.95,.16]],.016,0xf2e08a,PN,.96)});
 ad(CG(.085,1.9),0xb96568,0,-1.3,-.06,{op:.88},PS);ad(SG(),0xd99c94,0,-2.4,-.04,{s:[.3,.28,.26],op:.94},PS);ad(SG(),0xb96568,0,-.38,-.05,{s:[.19,.3,.17],op:.9},PBU);
 ad(CG(.37,1.8,true),0xe8c7b5,0,-1.225,0,{op:.1},PT);tu([[0,-.4,.17],[0,-2.15,.17]],.022,0x2f6fe0,PT,.96);
 ad(CG(.95,.035),0xa85358,0,-.1,0,{op:.5},PFM);ad(new T.TorusGeometry(.11,.04,12,24),0xd8c0a0,0,.0,-.05,{r:[1.57,0,0],op:.85},PFM);
 /* seminal vesicle, ampulla, ejaculatory duct, vas, cord */
 [-1,1].forEach(s=>{
  tu([[s*.85,1.3,-.65],[s*.65,1.08,-.65],[s*.45,.85,-.65]],.055,0xc88b68,PV,.95);for(let k=0;k<7;k++){const t=k/6;ad(SG(),0xc88b68,s*(.85-.4*t),1.3-.45*t,-.65,{s:[.12,.1,.1+.02*(k%2)],op:.92},PV)}
  tu([[s*.45,.85,-.65],[s*.3,.78,-.55],[s*.15,.74,-.45]],.03,0xc88b68,PV,.95);
  tu([[s*.5,1.3,-.48],[s*.32,1.02,-.46],[s*.15,.74,-.45]],.055,0xe8d4a0,PAM,.95);ad(SG(),0xe8d4a0,s*.3,1.0,-.46,{s:[.1,.1,.08],op:.9},PAM);
  tu([[s*.15,.74,-.45],[s*.07,.58,-.25],[s*.025,.35,-.07],[0,.2,-.05]],.032,0xf0d9a6,PED,.97);
  tu(VP(s),.035,0xe1c58f,PD,.96);tu(VP(s).slice(1,5),.16,0xe9dcc0,PSC,.18);
  tu([[s*1.0,-1.0,0],[s*1.15,-.5,0],[s*1.16,.4,0],[s*1.22,1.2,0]],.05,0x2f6fe0,PSC,.75);tu([[s*.95,-1.0,.05],[s*1.08,-.4,.04],[s*1.1,.5,.04],[s*1.2,1.2,0]],.02,0xd8232f,PSC,.95);
  /* testis + coverings + tubules + epididymis */
  const cx=s*.88,cy=-1.45;
  ad(SG(),0xe8c998,cx,cy,0,{s:[.4,.56,.36],op:.92},PX);ad(SG(),0xcfe8ef,cx,cy,0,{s:[.45,.62,.41],op:.2},PTV);ad(SG(),0xeee4cf,cx,cy,0,{s:[.42,.59,.38],op:.32},PTA);ad(SG(),0xd58f91,cx,cy,0,{s:[.52,.72,.48],op:.14},PSL);
  for(let k=0;k<18;k++){const a=k/18*12.56,r=.25*(1-k/28);tu([[cx+Math.cos(a)*r,cy+Math.sin(a)*r*1.3,.33],[cx+Math.cos(a+.45)*r,cy+Math.sin(a+.45)*r*1.3,.33]],.018,0xf2dfad,PR,.95)}
  ad(SG(),0xd5a96b,s*1.08,-1.35,-.1,{s:[.05,.3,.05],op:.92},PRT);tu([[s*1.08,-1.15,-.1],[s*1.0,-1.0,-.14]],.025,0xd5a96b,PRT,.95);
  tu([[s*.98,-.95,-.14],[s*1.22,-1.25,-.2],[s*1.12,-1.7,-.2],[s*1.05,-1.9,-.22]],.06,0xd7a45f,PE,.95)});
 const FL=[[.9,-1.2,.3],[1.0,-.95,-.1],[1.22,-1.25,-.2],[1.05,-1.9,-.22],[1.12,-1.35,-.25],[1.1,-.5,-.2],[1.12,.4,-.12],[1.2,1.3,-.1],[1.15,2.05,-.15],[.9,2.2,-.3],[.8,1.8,-.5],[.68,1.5,-.55],[.5,1.3,-.48],[.15,.74,-.45],[.07,.58,-.25],[0,.2,-.05],[0,-.5,-.06],[0,-2.3,-.06]];
 fw(FL.map(q),0x9fe0ff);
 lab([['Ureter',[1.15,2.5,-.3]],['Urinary bladder',[-.2,1.95,.3]],['Seminal vesicle',[-.95,1.15,-.65]],['Ampulla',[-.25,1.0,-.5]],['Ejaculatory duct',[.6,.55,-.3]],['Prostate',[0,.25,.3]],['Bulbourethral gland',[.6,-.05,-.05]],['Crus of penis',[-.8,.0,0]],['Bulb of penis',[-.45,-.5,.1]],['Corpus cavernosum',[-.6,-1.1,.1]],['Corpus spongiosum',[.55,-1.3,0]],['Glans',[0,-2.8,0]],['Testis',[-.95,-1.45,.4]],['Epididymis',[1.4,-1.4,-.2]],['Vas deferens',[1.45,.4,-.1]]].map(a=>[a[0],q(a[1])]),'#e5b870')};
