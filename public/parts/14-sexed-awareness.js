/* ---- v9: sex-education awareness: hub > cycle | ipill | hiv > hivlife | mmyth | spermatogenesis ----
   Educational content only. Facts follow WHO / standard medical references; the text always says "see a doctor" where needed. */
{
const {SMC,ELL,SYM,SCL,SHP}=EYX.h,lerp=(a,b,u)=>a+(b-a)*u,k01=x=>Math.max(0,Math.min(1,x));
const MY=t=>'<span style="color:#ff8a7a;font-weight:700">MYTH</span> ',FA=t=>'<br><span style="color:#7affb0;font-weight:700">FACT</span> ';

/* ---------- HUB ---------- */
EYX.N.sexed=['Myths + facts',c=>{
 const {lb,txt}=c,H=[['I-pill (emergency contraception)',.9,'E:ipill',0xff8a9a,'How it works, when it works + when it does NOT. Not an abortion pill.'],['HIV / AIDS',.45,'E:hiv',0xe8453a,'How it spreads, how it does NOT, prevention, U=U.'],['Masturbation: myths + hormones',0,'E:mmyth',0xb890ff,'No hair loss or weakness: the "relaxed" feeling is hormones.'],['Sperm formation',-.45,'E:sgenesis',0x6fa8e8,'Spermatogenesis in the seminiferous tubule.'],['Menstrual cycle + ovulation',-.9,'E:cycle',0xffb060,'Hormones, endometrium, fertile window.']];
 H.forEach(h=>{const P=part(h[0],h[4],1,h[2]);c.bx(0,h[1]*1.2,0,1.7,.7,.08,h[3],P,.95)});
 lb(H.map(h=>[h[0],[0,h[1]*1.2,.1]]),'#ffffff');txt('Sex education: sahi jankari, bina sharm ke. Card par tap > "Open inside"');
 return {t:'Sex education: myths + facts',s:'Cards: I-pill, HIV, masturbation, sperm formation, cycle',rd:6,rm:9,cam:[0,.05],tg:[0,.0,0]}}];

/* ---------- shared hormone-cycle chart ---------- */
const CV={E2:[[1,.12],[7,.2],[10,.5],[13,1.0],[14,.7],[16,.35],[21,.55],[25,.35],[28,.12]],P4:[[1,.05],[14,.06],[16,.3],[21,1.0],[25,.45],[28,.08]],LH:[[1,.1],[11,.12],[12,.35],[13,1.0],[14,.35],[15,.12],[28,.1]],FSH:[[1,.45],[4,.55],[8,.25],[12,.3],[13,.6],[15,.2],[21,.12],[28,.35]]};
const at=(pts,d)=>{if(d<=pts[0][0])return pts[0][1];for(let i=1;i<pts.length;i++)if(d<=pts[i][0]){const a=pts[i-1],b=pts[i],t=(d-a[0])/(b[0]-a[0]),s=t*t*(3-2*t);return a[1]+(b[1]-a[1])*s}return pts[pts.length-1][1]};
const XD=d=>-1.5+(d-1)/27*3,YV=v=>v*1.4;
const CHART=(c,Ps)=>{const {tb,bx,dc,lb}=c,M={},cols={E2:0xff7a9a,P4:0xb890ff,LH:0xffd24a,FSH:0x6fe0e8};
 tb([[-1.55,0,0],[1.55,0,0]],.01,0xffffff,Ps.AX,.8);tb([[-1.55,0,0],[-1.55,1.55,0]],.01,0xffffff,Ps.AX,.8);
 Object.keys(CV).forEach(k=>{const pts=[];for(let d=1;d<=28;d+=.5)pts.push([XD(d),YV(at(CV[k],d)),0]);M[k]=tb(pts,.022,cols[k],Ps[k],.97)});
 [[1,5,0xb33a3a],[5,14,0xe58a9a],[14,28.4,0xf2a0a8]].forEach(a=>bx((XD(a[0])+XD(a[1]))/2,-.45,0,XD(a[1])-XD(a[0]),.12,.04,a[2],Ps.UT,.95));
 [[1,13.5,0x6fa8e8],[13.5,14.5,0xffd24a],[14.5,28.4,0xf2c84a]].forEach(a=>bx((XD(a[0])+XD(a[1]))/2,-.25,0,XD(a[1])-XD(a[0]),.12,.04,a[2],Ps.OV,.95));
 bx((XD(9)+XD(14.5))/2,.75,-.02,XD(14.5)-XD(9),1.5,.02,0x6fe08a,Ps.FW,.18);
 const cur=dc(new T.BoxGeometry(.012,1.6,.02),0xffffff,0,.8,.03,{op:.95}),dots={};Object.keys(CV).forEach(k=>dots[k]=dc(new T.SphereGeometry(.045,10,8),cols[k],0,0,.04,{op:1}));
 lb([['Day 1',[-1.5,-.7,0]],['7',[XD(7),-.7,0]],['14',[XD(14),-.7,0]],['21',[XD(21),-.7,0]],['28',[XD(28),-.7,0]],['Ovary',[-1.95,-.25,0]],['Uterus',[-1.95,-.45,0]]],'#ffffff');
 return {set(d,show){cur.position.x=XD(d);Object.keys(dots).forEach(k=>{dots[k].position.set(XD(d),YV(at(CV[k],d)),.04);dots[k].visible=show!==false})}}};
const CPARTS=()=>({AX:part('Axes','Cycle day (1-28) horizontal; hormone level (relative) vertical.',0),E2:part('Oestradiol (E2)','From the growing follicle: builds the endometrium (proliferative phase), peaks ~day 13 and TRIGGERS the LH surge (positive feedback). Small second rise from the corpus luteum.',1),P4:part('Progesterone','From the corpus luteum after ovulation: makes the lining secretory + stable, thick cervical mucus, raises body temperature ~0.3-0.5 C. Fall = menstruation.',1),LH:part('LH (surge)','Pituitary spike ~day 13: ovulation ~24-36 h after the surge begins (about 10-12 h after the peak). Ovulation kits detect this surge in urine.',1),FSH:part('FSH','Early cycle FSH recruits a cohort of follicles (one dominant follicle selected); inhibin B + oestradiol then lower it.',1),OV:part('Ovarian cycle bar','Follicular phase (variable length, ~13 days) > ovulation > luteal phase (fairly constant ~14 days).',1),UT:part('Uterine (endometrial) cycle bar','Menstrual (days 1-5) > proliferative (oestrogen) > secretory (progesterone). Cycle lengths of 21-35 days are normal.',1),FW:part('Fertile window','~6 days: the 5 days BEFORE ovulation + ovulation day (sperm live up to ~5 days, the egg only ~12-24 h). Ovulation happens ~14 days before the NEXT period, not always on day 14.',1)});

EYX.N.cycle=['Menstrual cycle',c=>{
 const {txt}=c,Ps=CPARTS(),ch=CHART(c,Ps);EYX.cp=true;EYX.btn.eycp=b=>{EYX.cp=!EYX.cp;b.textContent=EYX.cp?'Playing':'Paused';b.classList.toggle('on',EYX.cp)};
 let d=1,t0=0;fx.push(s=>{const dt=Math.min(.1,s-t0);t0=s;if(EYX.cp)d=d+dt*2;if(d>=29)d=1;ch.set(d);
  txt('Day '+Math.floor(d)+': '+(d<6?'menstruation (progesterone + oestrogen low)':d<12?'follicles grow (FSH), lining rebuilds (oestrogen)':d<15?'LH SURGE > OVULATION (fertile window ends)':d<25?'corpus luteum: progesterone high, lining secretory':'corpus luteum regresses > hormones fall > next period'))});
 return {t:'Menstrual cycle: hormones',s:'28-din cycle | fertile window green | Play/Pause',rd:6.5,rm:9.5,cam:[0,.05],tg:[-.1,.6,0],ex:'<button id="eycp" class="on">Playing</button>'}}];

/* ---------- I-PILL simulator ---------- */
EYX.N.ipill=['I-pill: kab kaam karti hai',c=>{
 const {tb,sp,bx,dc,lb,txt}=c,Ps=CPARTS();Ps.AX=part('Axes','Cycle day vs hormone level.',0);
 const PI=EYX.pd||0,DAYS=[9,12,15,21],D=DAYS[PI];
 const ST=[{ok:1,t:'Pill on day 9 (BEFORE the LH surge): works. Levonorgestrel blocks/delays the LH surge, so ovulation is postponed (the sperm die within ~5 days).'},{ok:0,t:'Pill on day 12 (LH surge already starting): usually TOO LATE: ovulation is no longer stopped. Reliability falls sharply.'},{ok:0,t:'Pill on day 15 (AFTER ovulation): the egg is already out: the pill does NOT prevent fertilisation or implantation.'},{ok:0,t:'Pill on day 21 (after implantation): it does NOT end an existing pregnancy. It is not an abortion pill.'}][PI];
 EYX.btn.eypd=b=>{EYX.pd=((EYX.pd||0)+1)%4;EYX.show('ipill')};
 const ch=CHART(c,Ps),cards=[['How it works','<b>Levonorgestrel 1.5 mg</b> (I-pill, Unwanted-72 etc.): mainly DELAYS OVULATION (blocks the LH surge). There is no good evidence that it stops implantation. It mostly works only if taken BEFORE ovulation.',0x6fe08a],['When it does NOT work','If ovulation has already happened or the LH surge has begun; if taken late; if vomiting within ~2-3 h (take another dose, check label); higher body weight (BMI over 30) may reduce effect; some medicines (e.g. certain anti-epileptics, rifampicin, St John\'s wort) reduce effect. It is NOT 100%.',0xe8453a],['It is NOT an abortion pill','It does not end or harm an established pregnancy and does not cause birth defects. It does not affect future fertility.',0xffb060],['Time matters','Take it as soon as possible: labels say within 72 hours (3 days); effect falls with every hour; a little effect may remain up to 5 days. Ulipristal works up to 120 h; the copper IUD (within 5 days) is the MOST effective emergency option.',0x6fa8e8],['Not for regular use + no STI protection','Emergency use only; irregular periods, nausea, spotting, headache, tiredness can follow; next period may come early or up to a week late (do a pregnancy test if more than 7 days late). It does NOT protect against HIV/STIs: use a condom, and regular contraception afterwards.',0xb890ff],['When to see a doctor','Severe lower-abdominal pain (ectopic pregnancy is rare but serious), allergy, unclear timing, rape/assault (also needs PEP + counselling), or repeated need: ask about regular contraception.',0xff8a9a]];
 cards.forEach((q,i)=>{const P=part(q[0],q[1],1);bx(-1.2+(i%3)*1.2,-1.45-Math.floor(i/3)*.5,0,1.05,.4,.05,q[2],P,.95)});
 const ghost=dc(new T.TubeGeometry(new T.CatmullRomCurve3(Array.from({length:40},(_,i)=>{const d=1+i*.7;return V3([XD(d),YV(at(CV.LH,d-(PI==0?5:0))*(PI==0?.35:1)+0),0])})),60,.018,6),0xffd24a,0,0,.02,{op:.45});
 const pill=sp(XD(D),1.75,0,.07,.04,.04,0xffffff,part('Pill taken here','The cursor marks the day the pill is swallowed.',0),1),eff=dc(new T.CircleGeometry(.16,24),ST.ok?0x2fd06a:0xe8453a,XD(D),1.45,.05,{op:.95});
 ch.set(D);let t0=0;fx.push(s=>{const w=.5+.5*Math.sin(s*4);eff.scale.setScalar(.9+.2*w);ghost.visible=PI==0;txt(ST.t+(ST.ok?'  [WORKS]':'  [DOES NOT WORK]'))});
 lb([['LH surge',[XD(13),1.55,0]],['Ovulation',[XD(14.5),.35,0]],['Pill',[XD(D),1.95,0]],[ST.ok?'Works':'No effect',[XD(D)+.0,1.2,0]]].concat(PI==0?[['LH surge delayed',[XD(19),.6,0]]]:[]),'#ffffff');
 return {t:'I-pill: kab kaam, kab nahi',s:'Day button: pill kis din li | cards par tap karein',rd:6.5,rm:9.5,cam:[0,.05],tg:[-.05,.1,0],ex:'<button id="eypd" class="on">Pill on day '+D+'</button>'}}];

/* ---------- HIV: mucosal cross-section ---------- */
EYX.N.hiv=['HIV / AIDS',c=>{
 const {ad,tb,sp,bx,cy,dc,lb,txt}=c,PR=EYX.hp||0,
  P1=part('Lumen: infected fluids','HIV is carried in blood, semen + pre-ejaculate, vaginal + rectal fluids and breast milk.',1),
  P2=part('Epithelium (the barrier)','Intact stratified squamous skin/mucosa is a good barrier; single-layer columnar epithelium (endocervix, rectum) and micro-tears, ulcers or other STIs make entry easier.',1),
  P3=part('Dendritic / Langerhans cell','Immune cells that sample the surface and carry virus to CD4 cells (DC-SIGN).',1),
  P4=part('CD4 T cell (target cell)','HIV binds CD4 + CCR5/CXCR4 and destroys these helper T cells: immunity falls. Tap for the virus life cycle inside the cell.',1,'E:hivlife'),
  P5=part('HIV virus particle (virion)','~120 nm: lipid envelope with gp120/gp41 spikes, 2 copies of RNA + reverse transcriptase, integrase, protease.',1),
  P6=part('Lymph vessel > body','Infected cells carry virus to lymph nodes within days: the systemic infection starts.',1),
  P7=part('HIV vs AIDS','HIV = the virus. AIDS = late stage (CD4 count below 200 cells/uL or AIDS-defining illnesses such as TB, PCP, Kaposi sarcoma). With treatment most people never reach AIDS.',1),
  P8=part('How it does NOT spread','Hugging, handshakes, casual kissing, sharing food/utensils/toilets/swimming pools, coughs + sneezes, mosquito or other insect bites, living/working with a person with HIV. (Also not through unbroken skin.)',1),
  P9=part('How it spreads','Unprotected vaginal or anal sex (oral: much lower risk), sharing needles/syringes, unscreened blood transfusion, and mother-to-child (pregnancy, delivery, breastfeeding) when untreated.',1),
  PA=part('Prevention + treatment','Condoms (every time, correctly), PrEP (daily pill or injection before exposure), PEP (start within 72 h after exposure, 28 days), ART (lifelong tablets), safe needles, treating other STIs, mother-to-child programmes. U=U: sustained UNDETECTABLE viral load = cannot pass HIV sexually.',1),
  PB=part('Testing + window period','Tests can miss a very recent infection (window period of a few weeks): test again as advised after high-risk exposure. Rapid, ELISA (4th generation) and NAT/PCR tests exist; free confidential testing (ICTC/VCT) is available in India. Everyone with HIV can live a long, healthy life with ART.',1);
 EYX.btn.eyhp=b=>{EYX.hp=((EYX.hp||0)+1)%4;EYX.show('hiv')};
 bx(0,1.55,0,2.8,.9,.02,0xf5f0e0,P1,.15);SHP(c,[[-1.4,.9],[1.4,.9],[1.4,.35],[-1.4,.35]],0xe8b79b,P2,.95);for(let i=0;i<5;i++)bx(0,.85-i*.1,0,2.8,.02,.02,0xc98a68,P2,.8);
 SHP(c,[[-1.4,.35],[1.4,.35],[1.4,-.6],[-1.4,-.6]],0xf3d9c0,P3,.9);tb([[-1.4,-1.2,0],[1.4,-1.2,0]],.12,0x90e0a0,P6,.8);
 bx(-.5,.62,0,.18,.3,.03,0x3a1a14,P2,.98);
 sp(.9,.1,0,.14,.14,.01,0xf2c84a,P3,.97);const CD=[-.9,-.3,.4,1.0].map((x,i)=>sp(x,-.1-(i%2)*.25,0,.16,.16,.01,0x6fa8e8,P4,.97)),SH=CD.map(m=>ad(new T.TorusGeometry(.2,.015,6,20),0x2f6fe0,m.position.x,m.position.y,.01,{op:.95},P4));
 if(PR==1){bx(0,1.0,.1,2.8,.05,.1,0xeef8ff,PA,.9)}
 sp(1.2,1.75,0,.1,.1,.1,0xe8453a,P5,.97);
 const V=[],nV=PR==3?2:10;for(let i=0;i<nV;i++)V.push({m:dc(new T.SphereGeometry(.06,10,8),0xe8453a,0,0,0,{op:PR==3?.35:1}),x:-1.2+i*.25,y:1.6+(i%3)*.15,st:0,t:i*.4});
 const inf=[0,0,0,0];let t0=0;
 fx.push(s=>{const dt=Math.min(.1,s-t0);t0=s;
  V.forEach((v,i)=>{const stop=PR==1?1.14:.93,tear=Math.abs(v.x+.45)<.15;
   if(v.st==0){v.y-=dt*(.25+.05*(i%3));if(v.y<=stop&&!(tear&&PR!=1)){v.y=stop;v.t+=dt;if(v.t>3.5){v.y=1.75;v.t=0}}else if(v.y<.35)v.st=1}
   else if(v.st==1){const j=i%4,dx=CD[j].position.x-v.x,dy=CD[j].position.y-v.y,L=Math.hypot(dx,dy)||1;v.x+=dx/L*dt*.35;v.y+=dy/L*dt*.35;if(L<.2){v.st=2;if(PR!=2)inf[j]=1}}
   else{v.y=-1.2;v.x+=dt*.4;if(v.x>1.4){v.x=-1.2+(i%4)*.1;v.y=1.75;v.st=0;v.t=0}}
   v.m.position.set(v.x,v.y,.05)});
  CD.forEach((m,j)=>{m.material.color.setHex(inf[j]?0xe8453a:0x6fa8e8);SH[j].visible=PR==2});
  txt(['No protection: virions reach CD4 cells through the thin/torn epithelium and dendritic cells: infection starts','CONDOM: a physical barrier stops semen/fluids reaching the mucosa: prevents HIV + most STIs + pregnancy','PrEP: the drug in the CD4 cells (blue shield) stops the virus from establishing infection','ART / U=U: with treatment the viral load becomes undetectable: very few virions, cannot be transmitted sexually'][PR])});
 lb([['Infected fluid',[-1.0,1.95,0]],['Epithelium',[1.1,.65,0]],['Tear / abrasion',[-.5,1.0,0]],['Dendritic cell',[.9,.3,0]],['CD4 T cell',[-.9,.1,0]],['Lymph vessel',[1.0,-1.2,0]]].concat(PR==1?[['Condom',[0,1.2,0]]]:[]),'#ffffff');
 return {t:'HIV: how it enters, how it does not',s:'Protection button: none / condom / PrEP / ART | cell par tap = virus life cycle',rd:6.5,rm:9.5,cam:[0,.05],tg:[0,.4,0],ex:'<button id="eyhp" class="on">'+['No protection','Condom','PrEP','ART (U=U)'][PR]+'</button>'}}];

/* ---------- HIV life cycle inside the CD4 T cell ---------- */
EYX.N.hivlife=['HIV life cycle',c=>{
 const {ad,tb,sp,dc,lb,txt}=c,
  P1=part('1. Binding','gp120 binds CD4, then the co-receptor CCR5 (or CXCR4). Blocked by entry inhibitors (maraviroc).',1),
  P2=part('2. Fusion + entry','gp41 pulls the envelope into the cell membrane: the capsid enters. Blocked by fusion inhibitors (enfuvirtide).',1),
  P3=part('3. Reverse transcription','Viral reverse transcriptase copies the RNA into DNA. Blocked by NRTIs (tenofovir, lamivudine) + NNRTIs (efavirenz).',1),
  P4=part('4. Integration','Integrase inserts the viral DNA into the host chromosome: a permanent provirus. Blocked by INSTIs (dolutegravir).',1),
  P5=part('5. Transcription + translation','Host machinery makes viral RNA + long protein chains.',1),
  P6=part('6. Assembly','New RNA + proteins gather under the membrane.',1),
  P7=part('7. Budding + maturation','The virion buds out; protease cuts the long proteins so the virus matures. Blocked by protease inhibitors (darunavir).',1);
 EYX.hl=true;EYX.btn.eyhl=b=>{EYX.hl=!EYX.hl;b.textContent=EYX.hl?'Playing':'Paused';b.classList.toggle('on',EYX.hl)};
 SHP(c,ELL(0,0,1.45,1.3,0,48),0xb8d0f0,P1,.55);SHP(c,ELL(.1,.1,.55,.5,0,40),0x5a6aa0,P4,.9);tb([[-.35,.1,0],[.0,.0,0],[.4,.12,0]],.02,0x9fe0ff,P4,.95);
 for(let i=0;i<14;i++){const a=2.6+i*.18;sp(Math.cos(a)*1.42,Math.sin(a)*1.27,0,.05,.05,.02,0x2f6fe0,P1,.97)}
 const vi=sp(-2.2,.5,0,.2,.2,.1,0xe8453a,P1,.97),rna=dc(new T.TorusGeometry(.07,.015,6,16),0xffb060,0,0,0,{op:1}),dna=dc(new T.TorusGeometry(.07,.015,6,16),0x6fe0e8,0,0,0,{op:1}),nv=[0,1,2].map(()=>dc(new T.SphereGeometry(.12,12,8),0xe8453a,0,0,0,{op:1}));
 const ST=['Binding: gp120 sticks to CD4 + CCR5','Fusion: the envelope merges with the cell, capsid enters','Reverse transcription: RNA is copied to DNA','Integration: the viral DNA enters the host chromosome (permanent)','Transcription + translation: the cell is forced to make viral parts','Assembly + budding: new virions leave; protease matures them'];let tt=0,t0=0;
 fx.push(s=>{const dt=Math.min(.1,s-t0);t0=s;if(EYX.hl)tt=(tt+dt)%24;const p=tt,st=p<4?0:p<8?1:p<12?2:p<15?3:p<19?4:5;
  vi.visible=p<8;vi.position.set(p<4?lerp(-2.2,-1.4,p/4):lerp(-1.4,-1.0,k01((p-4)/4)),p<4?lerp(.5,.35,p/4):.3,0);rna.visible=p>=8&&p<12;rna.position.set(lerp(-.9,-.3,k01((p-8)/4)),lerp(.25,.2,k01((p-8)/4)),0);
  dna.visible=p>=12&&p<19;dna.position.set(p<15?lerp(-.3,.1,k01((p-12)/3)):.1,p<15?.15:.1,0);nv.forEach((m,i)=>{m.visible=p>=15;const u=k01((p-15-i*1.2)/5);m.position.set(lerp(.5,1.9,u),lerp(-.3,-.1+i*.4,u),0);m.material.opacity=p>=15?1:0});
  txt(ST[st]+' ('+(st+1)+'/6)')});
 lb([['HIV virion',[-2.2,.9,0]],['CD4 + CCR5',[-1.0,-.9,0]],['Nucleus',[.1,.85,0]],['Host DNA',[.1,-.7,0]],['New virions',[1.8,.75,0]]],'#ffffff');
 return {t:'HIV life cycle in a CD4 T cell',s:'7 steps + drug classes | Play/Pause | steps par tap karein',rd:6.5,rm:9.5,cam:[0,.05],tg:[-.2,0,0],ex:'<button id="eyhl" class="on">Playing</button>'}}];

/* ---------- MASTURBATION: myths + hormones ---------- */
EYX.N.mmyth=['Masturbation: myths + hormones',c=>{
 const {tb,sp,bx,dc,lb,txt}=c,PH=['Arousal','Plateau','Orgasm','Resolution','Refractory/relax'],
  HC={DA:{n:'Dopamine (reward)',c:0xffd24a,v:[.2,.55,1.0,.35,.15],i:'Rises with anticipation and peaks at orgasm: the pleasure/reward signal (nucleus accumbens). Then falls: that dip is part of the "calm".'},EP:{n:'Endorphins',c:0x6fe0e8,v:[.1,.3,.8,.9,.5],i:'Natural opioids: pain relief + a relaxed, good mood after orgasm.'},OX:{n:'Oxytocin',c:0xff7a9a,v:[.15,.4,1.0,.7,.4],i:'Released from the hypothalamus/posterior pituitary at orgasm: bonding, calm, muscle relaxation.'},PL:{n:'Prolactin',c:0xb890ff,v:[.1,.1,.4,1.0,.9],i:'Rises AFTER orgasm and stays high for a while: drowsiness, satiety and the refractory period. THIS is the "tired / weak" feeling people notice: it is hormonal relaxation, not loss of strength.'},TE:{n:'Testosterone',c:0xe8453a,v:[.5,.5,.5,.5,.5],i:'Stays essentially in the normal range: ejaculation does not meaningfully lower it. (Frequent ejaculation is not linked to hair loss, weakness or low testosterone.)'}},
  XP=i=>-1.3+i*.65;
 const Ps={};Object.keys(HC).forEach(k=>Ps[k]=part(HC[k].n,HC[k].i,1));
 tb([[-1.55,0,0],[1.55,0,0]],.01,0xffffff,part('Axes','Phase of the sexual response vs hormone level.',0),.8);
 Object.keys(HC).forEach(k=>{const h=HC[k];tb(h.v.map((v,i)=>[XP(i),v*1.1,0]),.02,h.c,Ps[k],.97)});
 sp(0,2.05,0,.55,.4,.05,0x5a6aa0,part('Brain: reward + hormone centres','Ventral tegmental area > nucleus accumbens (dopamine reward), hypothalamus (oxytocin) + pituitary (prolactin) are the same circuits that react to food, music, exercise and hugs.',1),.5);
 const M=[['Hair loss?',MY()+'Masturbation / ejaculation causes hair loss.'+FA()+'Pattern hair loss (androgenetic alopecia) comes from GENES + hair follicles being sensitive to DHT. Ejaculation frequency does not change it. Real causes: genetics, iron/thyroid problems, stress, drugs.',0xe8453a],
  ['Weakness / tiredness?',MY()+'It drains energy, makes the body weak and the face dull.'+FA()+'It uses about as much energy as a short walk. The relaxed, sleepy feeling = prolactin + oxytocin + endorphins (see the chart). Real weakness comes from poor sleep, diet, anaemia, depression, illness.',0xff8a5a],
  ['"Sperm finishes"?',MY()+'Semen is limited: sperm get used up, it makes you infertile or "thin".'+FA()+'Sperm are made continuously: ~100 million or more per day in the testes (about 2.5 months to mature). Semen is mostly fluid from the seminal vesicles + prostate, replaced within hours to a day or two. Tap "Sperm formation".',0xffd24a],
  ['Impotence / infertility?',MY()+'It causes erectile dysfunction, small penis or infertility.'+FA()+'It does not. Erectile problems come from blood-vessel disease, diabetes, smoking, drugs, anxiety. Infertility comes from sperm/egg/tube problems, not from masturbation. Penis size + height are set by genes + hormones.',0xb890ff],
  ['Skin, eyes, memory?',MY()+'It causes pimples, weak eyesight, poor memory or exam failure.'+FA()+'No scientific evidence. Acne is hormonal (puberty); eyesight and memory depend on genes, sleep and screen/study habits.',0x6fa8e8],
  ['Females + hymen?',MY()+'Only males do it; it "spoils virginity"; the hymen proves virginity.'+FA()+'Females masturbate too and it is normal. The hymen is a thin tissue that varies a lot and can stretch or tear in sports, tampons or by itself: it is NOT a reliable sign of anything.',0xff7a9a],
  ['Is it normal? When to worry',FA().slice(4)+'It is a normal, common, safe part of sexual health at all ages. It becomes a concern only if it is compulsive, interferes with school/work/relationships, causes pain or injury, or causes severe guilt or distress: then talk to a doctor/counsellor. Keep it private, clean and consensual; personal, cultural and religious views differ and deserve respect.',0x6fe08a]];
 M.forEach((q,i)=>{const P=part(q[0],q[1],1,i==2?'E:sgenesis':undefined);bx(-1.25+(i%4)*.83,-.65-Math.floor(i/4)*.5,0,.78,.4,.05,q[2],P,.95)});
 const cur=dc(new T.BoxGeometry(.012,1.5,.02),0xffffff,0,.6,.03,{op:.9});let t0=0;fx.push(s=>{const u=(s*.25)%1,x=-1.3+u*2.6;cur.position.x=x;const i=Math.min(4,Math.floor(u*5));txt('Phase: '+PH[i]+': dopamine, endorphin, oxytocin peak at orgasm, PROLACTIN rises after: relaxation, not weakness. Testosterone stays flat.')});
 lb(PH.map((p,i)=>[p,[XP(i),-.15,0]]).concat([['Prolactin',[1.55,1.0,0]],['Testosterone',[1.6,.6,0]]]),'#ffffff');
 return {t:'Masturbation: myths vs facts + hormones',s:'Chart + 7 myth cards | card par tap = fact',rd:6.5,rm:9.5,cam:[0,.05],tg:[0,.7,0]}}];

/* ---------- routing: male + female reproductive structures open the new nested atlas ---------- */
{const _o5=window.openDV;EYX.old=_o5;
 const MR=/Prostate|seminal vesicle|testis|epididymis|ductus deferens|Penis|Glans penis|tunica|scrotal|Corpus cavern|Corpus spongiosum|bulbourethral|pampiniform|Ejaculatory|testicular artery|Crus of penis|Bulb of penis/i,
  FR=/Uterus|Cervix|Vagina|uterine tube|ovary|External female genitalia|Clitoris|pelvic fascia|ovarian ligament|round ligament|suspensory ligament|broad ligament|labium|vestibular|Vaginal vestibule/i,
  NOT=/Pregnan|gravid|fetus|fetal|placent|amnio|umbilic/i;
 window.openDV=(m,lv)=>{const n=m.userData.name;EYX.curM=m;if(NOT.test(n))return _o5(m,lv);
  if(MR.test(n)){init();cur=m;EYX.st=/testis|epididymis|tunica|scrotal|pampiniform|testicular/i.test(n)?['mrepro','testis']:/Penis|Glans|Corpus|Crus|Bulb of/i.test(n)?['mrepro','penis']:/Prostate/i.test(n)?['mrepro','prostate']:['mrepro'];EYX.er=false;EYX.show(EYX.st[EYX.st.length-1]);return}
  if(FR.test(n)){init();cur=m;EYX.st=/ovary|ovarian ligament|suspensory/i.test(n)?['frepro','ovary']:/uterine tube/i.test(n)?['frepro','tube']:/Uterus|Cervix/i.test(n)?['frepro','uterus']:['frepro'];EYX.show(EYX.st[EYX.st.length-1]);return}
  return _o5(m,lv)}}
}
