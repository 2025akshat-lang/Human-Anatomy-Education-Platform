/* ---- MALE gross anatomy (v6 rewrite) ----
   Relations: prostate under bladder neck; seminal vesicle + ampulla behind bladder;
   vas runs up the cord, over the ureter, down to the ampulla; ejaculatory duct pierces prostate;
   penis = bulb + 2 crura + 2 corpora cavernosa (dorsal) + spongiosum (ventral) + glans.
   NOTE: opacity must be stored in userData.op, otherwise paint() resets it to 1. */
const so=(m,o)=>{m.userData.op=o;m.material.opacity=o;return m};
so(sexm(G.male,sp(.09),0xd89a82,0,3.06,.255,'Prostate gland','Chestnut-sized fibromuscular gland just below the bladder neck, surrounding the prostatic urethra; peripheral, central and transition zones.',{s:[1.1,.78,.85]}),.9);
[-1,1].forEach(s=>{
 const side=s<0?'Right':'Left';
 const sv=sexm(G.male,bump(new T.SphereGeometry(.045,22,16),.22,38),0xe3b064,s*.115,3.21,.07,side+' seminal vesicle','Coiled, sacculated gland lying on the posterior bladder base, lateral to the ampulla; adds fructose-rich alkaline fluid (~60% of semen).',{s:[.72,2.1,.62],r:[0,0,-s*.62]});
 sexm(G.male,new T.SphereGeometry(.03,16,12),0xe8d6a4,s*.062,3.15,.075,'Ampulla of ductus deferens (' +side.toLowerCase()+')','Dilated terminal part of the vas, medial to the seminal vesicle; joins the vesicle duct to form the ejaculatory duct.',{s:[.8,1.9,.7],r:[0,0,-s*.85]});
 tb(G.male,[[s*.045,3.13,.1],[s*.03,3.08,.19],[s*.011,3.04,.255]],0xf0d9a6,.007,side+' Ejaculatory duct','Formed by ductus deferens + seminal vesicle duct; passes through the prostate to open on the seminal colliculus of the prostatic urethra.');
 sexm(G.male,sp(.09),0xe8c998,s*.11,2.68,.34,side+' testis','Testis contains seminiferous tubules, rete testis and Leydig cells inside the tunica albuginea.',{s:[.75,1.2,.7]});
 tb(G.male,[[s*.125,2.6,.3],[s*.14,2.78,.31],[s*.145,3.05,.32],[s*.15,3.3,.34],[s*.19,3.43,.27],[s*.21,3.4,.12],[s*.17,3.3,.05],[s*.09,3.2,.05],[s*.065,3.16,.07]],0xe7d29b,.014,side+' ductus deferens','Muscular duct: tail of epididymis → spermatic cord → inguinal canal → crosses over the ureter → behind the bladder → ampulla → ejaculatory duct.');
 sexm(G.male,sp(.032),0xd9a76f,s*.14,2.79,.3,side+' epididymis (head)','Head of epididymis crowns the superior pole of the testis.',{s:[1.15,.8,.9]});
 tb(G.male,[[s*.14,2.79,.3],[s*.175,2.7,.28],[s*.13,2.6,.29]],0xd9a76f,.022,side+' epididymis','Head, body and tail on the posterolateral testis; sperm mature and are stored in the tail.');
 const tv=sexm(G.male,sp(.105),0xcfe8ef,s*.11,2.68,.34,side+' tunica vaginalis','Serous parietal and visceral layers surrounding the anterolateral testis.',{s:[.78,1.25,.74]});so(tv,.24);
 const ta=sexm(G.male,sp(.097),0xeee4cf,s*.11,2.68,.34,side+' tunica albuginea','Dense fibrous capsule sending septa into the testis.',{s:[.77,1.22,.72]});so(ta,.38);
 so(sexm(G.male,sp(.12),0xd69a91,s*.11,2.68,.34,side+' scrotal layers','Conceptual concentric scrotal wall: skin, dartos, external spermatic, cremasteric and internal spermatic fasciae.',{s:[.9,1.38,.84]}),.18);
 tb(G.male,[[s*.13,2.78,.3],[s*.145,3.05,.31],[s*.15,3.3,.33],[s*.17,3.45,.26]],0xd8232f,.008,side+' testicular artery','Aortic branch descending in the spermatic cord to the testis.');
 tb(G.male,[[s*.1,2.78,.28],[s*.125,3.05,.28],[s*.135,3.3,.3],[s*.16,3.44,.22]],0x2f6fe0,.012,side+' pampiniform plexus','Venous network cooling arterial blood before testicular entry.');
 tb(G.male,[[s*.075,3.04,.14],[s*.045,3.0,.22],[s*.02,2.97,.29]],0x9f4f55,.018,'Crus of penis ('+side.toLowerCase()+')','Posterior end of the corpus cavernosum, anchored to the ischiopubic ramus; covered by ischiocavernosus.');
 sexm(G.male,sp(.014),0xe5b870,s*.03,2.93,.24,side+' bulbourethral gland','Pea-sized gland in the deep perineal pouch; duct opens into the proximal spongy urethra.');
});
so(sexm(G.male,sp(.082),0xb66c5b,0,3.06,.245,'Peripheral prostate zone','Posterolateral glandular zone; most prostate carcinomas arise here.',{s:[1.02,.78,.8]}),.35);
sexm(G.male,sp(.045),0xe2a080,0,3.06,.27,'Transition prostate zone','Periurethral zone enlarged in benign prostatic hyperplasia.',{s:[.75,.8,.7]});
sexm(G.male,sp(.035),0xb96568,0,2.955,.27,'Bulb of penis','Expanded proximal corpus spongiosum below the perineal membrane; covered by bulbospongiosus.',{s:[1,1.25,1]});
so(tb(G.male,[[0,2.98,.3],[0,2.82,.4],[0,2.62,.52],[0,2.5,.6]],0xd6a19a,.055,'Penis','Root (bulb + crura), body and glans in dependent position; two dorsal corpora cavernosa and a ventral corpus spongiosum with the urethra.'),.4);
[-.026,.026].forEach(x=>tb(G.male,[[x,2.97,.3],[x,2.82,.4],[x,2.62,.52],[x,2.54,.58]],0x9f4f55,.02,'Corpus cavernosum','Paired dorsal erectile body enclosed by tunica albuginea.'));
tb(G.male,[[0,2.95,.29],[0,2.81,.39],[0,2.62,.51],[0,2.52,.59]],0xb96568,.016,'Corpus spongiosum','Ventral erectile body surrounding the spongy urethra and expanding as the glans.');
sexm(G.male,sp(.06),0xe1b0a6,0,2.5,.6,'Glans penis','Expanded distal corpus spongiosum containing the external urethral meatus.',{s:[.85,1.05,.85],r:[-.56,0,0]});
