# Human Atlas — Human Anatomy Education Platform

> **READ THIS FIRST (for humans and AI assistants).**
> This file is the single source of context for the repo. It tells you what every
> folder/file is, where each feature lives inside the big viewer file, how to add
> or fix something, and what is dead code. Follow the **Task → Location** table
> instead of searching the whole repo.
> `AGENTS.md` / `CLAUDE.md` must point here (see §3.4).

Repo: `Human-Anatomy-Education-Platform` (GitHub, branch `main`). Hosted as a static site (GitHub Pages, base path `/Human-Anatomy-Education-Platform/`).
Owner explains science/anatomy to students; chat language is **Hinglish** (Hindi in Roman script), UI strings in the viewer are mixed English + Hinglish.

---

## 1. One-paragraph summary

A **procedural (code-generated, not scanned) interactive 3D human anatomy atlas**.
The real product is **one huge standalone file: `public/human-atlas-3d.html`** (three.js r128, plain JS, no build step for it).
A thin **Vite + React + TypeScript shell** (`src/`) only wraps it in an `<iframe>`, adds a header (Model set: General / Female / Male / Pregnancy, Clean view) and talks to it through `postMessage`.
All anatomy, cutaways, microscopic scenes, quiz, animations and UI of the atlas are inside that single HTML file.

Everything is **educational schematic geometry, validation pending** — never claim CT/MRI accuracy.

---

## 2. Architecture

```
Browser
└─ index.html ─► src/main.tsx ─► src/App.tsx            (React shell)
      │            • header: Model set buttons, Clean view, scale-route text
      │            • <iframe src={BASE_URL + "human-atlas-3d.html"}>
      │            • postMessage({type:"human-atlas:set-sex", sex}) ──┐
      ▼                                                               │
public/human-atlas-3d.html   (THE VIEWER, ~all logic)  ◄─────────────┘
   ├─ loads ./vendor/three.min.js   (three r128, local copy)
   ├─ Scene 1: "gross" body scene  (canvas #c, renderer R, scene S, camera C)
   └─ Scene 2: "detail" overlay    (#dv, canvas #dc, renderer R2, scene S2, camera C2)
                 = cutaways + microscopic scenes, opened by tapping a structure
```

Key rules:
- **Two completely separate three.js scenes.** Gross scene = whole body (`S`). Detail overlay = one organ/structure at a time (`S2`), rebuilt from scratch every time it opens (`reset()` then a builder function).
- **Iframe message security:** viewer only accepts messages where `e.origin === location.origin` and `e.data.type === 'human-atlas:set-sex'`, `sex ∈ general|female|male|pregnancy`.
- **three.js is r128.** Do NOT use APIs newer than r128 (e.g. `CapsuleGeometry` is r142+, `THREE.OrbitControls` is not bundled). The npm `three` dependency in `package.json` (pinned `0.128.0`) is **unused** (viewer uses `vendor/three.min.js`).
- Coordinate system (gross scene): units ≈ body height 9.4 (feet y≈0, head top y≈9.35). `y` up, `+z` toward the viewer (front), midline `x=0`. In the code `s=-1` is **anatomical right**, `s=+1` is **left** (names built as `s<0?'Right':'Left'`).

---

## 3. Repository map

### 3.1 Files that matter
| Path | What it is |
|---|---|
| `public/human-atlas-3d.html` | **THE viewer. Source of truth. Edit only this copy.** |
| `public/vendor/three.min.js` | three.js r128 (keep) |
| `public/404.html` | GitHub Pages SPA fallback (keep) |
| `public/favicon.svg` | favicon (currently the **generic Figma-Make placeholder icon**: dark rounded square + white sparkle — replace with an anatomy icon) |
| `public/data/feature-catalogue.json` | 2.51 MB curriculum catalogue (≈5,158 feature rows). **Only read by the audit scripts**, not by the viewer or the React app. Consider moving out of `public/`. |
| `public/data/MBBS_MD_Anatomy_Audit_*` | source audit workbook (Excel) behind the catalogue |
| `index.html` (repo root) | **Vite HTML source** (loads `./src/main.tsx`, `#root`, title/description/robots meta, `./favicon.svg`). Required. NOT build output. |
| `src/main.tsx` | React entry |
| `src/App.tsx` | React shell: iframe + header + sex-mode postMessage |
| `src/index.css` | Shell styling (dark theme, Tailwind v4 import) |
| `src/components/ui.tsx` | `Button` (used), `IconButton`, `SearchInput`, `StatusBadge` (**last three unused**) |
| `src/components/icons.tsx` | `Icon` component (names used: `chevron`, `focus`, `menu`) |
| `src/data/registry.ts` | `structures[]`, `systems[]` typed registry (5 heart entries). **Not imported anywhere (dead code)** |
| `vite.config.ts` | Vite config, base path, plus Figma-Make plugins (see §9) |
| `package.json` | scripts + deps (see §8). `name` is still `figma-make-app` |
| `tsconfig.json` | `include: ["src","vite.config.ts"]`, strict, `@/*` → `src/*`, `types:["node"]`. The viewer HTML is not type-checked |
| `.mise.toml` | toolchain: **Node 22, pnpm 10.34.3** (so pnpm is the intended package manager) |
| `.gitignore` | ignores `node_modules/`, `dist/`, `build/`, `.env*`, logs, `.figma/design-context/`, `.plugins/`, `.opencode-skills/` (see §3.2 about `dist/`) |
| `scripts/audit-feature-coverage.mjs` | regex-based coverage audit → `docs/excel-feature-coverage*.{json,md}` |
| `scripts/audit-reproductive-anatomy.mjs` | **hand-written evidence table** for reproductive structures → `docs/reproductive-anatomy-audit.{json,md}` |
| `docs/anatomy-geometry-audit.md` | honest list of what is generic/simplified/missing + P0/P1/P2 backlog |
| `docs/reproductive-anatomy-audit.*`, `docs/excel-feature-coverage*.*`, `docs/excel-joint-implementation-*` | generated audit outputs |
| `AGENTS.md`, `CLAUDE.md` | agent instruction files — **stale, see §3.4** |

### 3.2 Build output / duplicates (do not edit)
Repo root also contains `assets/`, `data/`, `vendor/`, `human-atlas-3d.html`, `robots.txt`, `favicon.svg` and `dist/`. These look like **deployed build output / copies committed to git**. Editing them changes nothing in `npm run dev` / `pnpm dev` and they get overwritten on rebuild.
**Always edit `public/human-atlas-3d.html` and `src/*`, then rebuild.**

Facts found in the files:
- `.gitignore` already lists `dist/`, yet `dist/` is visible on GitHub → it was committed before being ignored. Fix: `git rm -r --cached dist` and commit.
- Root `index.html` is the **source** (references `./src/main.tsx`), so do not delete it. A deployed/built `index.html` would reference `assets/index-*.js` instead. If GitHub Pages serves from the repo root of `main`, the site would try to load `./src/main.tsx` and break; so check Settings → Pages and `.github/workflows` (not reviewed yet) to see what is actually deployed.
- **`robots.txt` contains `User-agent: *` / `Disallow: /`** → blocks all search engines, while `index.html` says `index, follow`. Origin: Figma site config (`robots.index=false`). Decide which you want. If the site should be discoverable, put a permissive `public/robots.txt` and remove the root/dist copies.
- Recommended end state: GitHub Actions builds with pnpm and deploys `dist/` to Pages; root copies (`assets/`, `data/`, `vendor/`, `human-atlas-3d.html`, `robots.txt`, root `favicon.svg` if duplicate of `public/`) and `dist/` are removed from git and ignored.

### 3.3 Safe-to-delete candidates (verify first, one commit each)
- `dist/` → `git rm -r --cached dist` (already in `.gitignore`).
- Root build copies (`assets/`, `data/`, `vendor/`, `human-atlas-3d.html`, `robots.txt`) → only after Pages deploy is confirmed to build in CI.
- `src/data/registry.ts`, unused exports in `ui.tsx` → dead code.
- `three` in `package.json` dependencies → unused.
- **`package-lock.json`** → `.mise.toml` pins pnpm, so keep `pnpm-lock.yaml` and delete `package-lock.json`. Use `pnpm install` / `pnpm dev` / `pnpm build`.
- `.figma/` (if present) + Figma plugins in `vite.config.ts` → see §9.
- Unused CSS in `src/index.css`: `.feature-registry*`, `.registry-*`, `.domain-filter*`, `.feature-row*`, `.feature-expanded*`, `.load-more`, `.model-disclosure`, `.interaction-hint`, `.registry-button` (leftovers of a removed feature-registry panel; `App.tsx` no longer renders them).
- `scripts/`, `docs/` → only audit tooling; keep while fixing errors, remove later.

**Never delete:** `public/human-atlas-3d.html`, `public/vendor/three.min.js`, `public/404.html`, `src/App.tsx`, `src/main.tsx`, `src/index.css`, `src/components/icons.tsx`, `vite.config.ts`, `index.html`, `.mise.toml`.

### 3.4 AGENTS.md / CLAUDE.md (reviewed)
- `CLAUDE.md` contains only one line: `@AGENTS.md` (an import). So **`AGENTS.md` is the only real agent file.**
- `AGENTS.md` is the untouched **Figma Make scaffold text**: title `figma-make-app`, "running inside Figma Make", "dev server already running on `$PORT` (default 8443)", a project structure listing only `src/main.tsx`, `src/App.tsx`, `src/index.css`, `index.html`, `package.json`, `vite.config.ts`, `.mise.toml`.
- Problems: (1) it never mentions `public/human-atlas-3d.html`, which is 95% of the product, so an AI will edit the React shell and miss the real code; (2) it says the server is already running, false outside Figma; (3) it mentions Figma plugins; (4) it has no rules about three.js r128, mesh-name routing, or "procedural, validation pending".
- Fix: replace `AGENTS.md` with the short version below (keep `CLAUDE.md` as `@AGENTS.md`).

```md
# Human Atlas — agent instructions
Read README.md first (architecture, Task → Location table, recipes).
- The product is `public/human-atlas-3d.html` (plain JS, three.js r128). `src/` is only an iframe shell.
- Edit only `public/human-atlas-3d.html` and `src/*`. Never edit `dist/` or root build copies.
- Use three.js r128 APIs only. Keep mesh `name` strings stable (they route cutaways, quiz, JD lookup).
- New micro-view codes must NOT start with `r`.
- Content is procedural educational geometry, validation pending. Never claim scan accuracy.
- Package manager: pnpm (Node 22, see .mise.toml). Commands: pnpm dev / build / preview.
- Viewer UI language: English anatomy terms + Hinglish helper text.
- If you add a builder/section, update README §5 and §6 in the same commit.
```

---

## 4. React shell details (`src/App.tsx`)
- State: `loaded` (hide loading overlay on iframe `onLoad`), `cleanView` (hides header; shows "Dashboard" restore button), `modelSex`.
- `updateModelSex(sex)` → `iframe.contentWindow.postMessage({type:"human-atlas:set-sex", sex}, window.location.origin)`; also re-sent on iframe load.
- Iframe URL: `` `${import.meta.env.BASE_URL}human-atlas-3d.html` `` → depends on `base` in `vite.config.ts`. If you rename the repo, change `base`.
- Styling classes: `.webgl-shell`, `.lab-header`, `.model-set`, `.viewer-frame`, `.viewer-loading` in `src/index.css`.
- Code-quality rules from the old scaffold that still matter: use double quotes for strings with apostrophes, close JSX tags, default-export components.

---

## 5. The viewer file: `public/human-atlas-3d.html`

It is one `<style>` + one `<script>`. Sections appear in this order (search for the quoted anchor text):

### 5.1 Gross scene (the whole body)
| Anchor in file | Purpose |
|---|---|
| `const T=THREE,$=...` | globals: renderer `R`, scene `S`, camera `C`, `G` = layer groups |
| `G={bones,organs,vessels,skin,muscles,female,male,pregnancy}` | layer groups. `G.nerves` is created later (`/* ---- v3: nerves + signals`). Female/male/pregnancy hidden by default |
| `pick=[]` | **array of every raycastable mesh.** A mesh must be in `pick` to be tappable |
| `mk(g,geo,col,x,y,z,name,info,o)` | **core gross-mesh factory.** `o`: `s` scale `[x,y,z]`, `r` rotation, `p` parent, `op` opacity. Stores `userData={name,info,bs}` |
| `cy sp bx LB bump tb V3` | helpers: cylinder, sphere, box, lathe long-bone, noise-bump, tube along points (`tb(group,pts,col,r,name,info)`) |
| `bn()`, `on()` | `mk` shortcuts for bones (group bones) / organs (group organs) |
| `/* ---- BONES ---- */` | skull, vertebrae loop, sacrum, ribs (`RG` group, rib breathing), sternum, limb bones, hands (`digits`), feet (tarsals/metatarsals/phalanges), teeth (`TT`/FDI numbers), skull plates via `sh()` |
| `jointHotspot` + array | 13 joint hotspot spheres (names **must equal keys of `JD`**) |
| `/* ---- ORGANS ---- */` | brain (`brainLobe`), lungs (two lobes loop + bronchial tree `br`), heart `HM` + chambers `hc` + coronaries, liver, gallbladder, duodenum, `sweep()` stomach, spleen, kidneys, small intestine, colon, bladder, urethra |
| `const sk=new T.Mesh(new T.LatheGeometry` | translucent skin shell + limb cylinders (`G.skin`) |
| vessels block (`AR`,`VN`, `vt()` recursive branching) | aorta, vena cavae, limb/neck vessels, pulmonary trees, mesenteric, portal |
| `/* skull details */` | orbit, zygomatic arch, ear, cochlea, nose, sutures; then cranial-base bones (ethmoid, sphenoid, vomer, foramina) |
| `/* ===== MUSCLES / CARTILAGE / NERVES / LABELS ===== */` | muscle textures `XT`, `xms()` (endpoint-based lathe muscle), `xa()`, `xt()`, `xsh()`; knee menisci/ligaments; thyroid, parotid; median/sciatic/vagus; thymus, tongue |
| `/* sex-specific gross anatomy */` | `sexm(G.female…)` breast, uterus, tubes, ovaries, vulva, ligaments, pelvic fascia; `sexm(G.male…)` prostate, seminal vesicles, testes, tunicae, penis, cords, glands; **pregnancy** (`G.pregnancy`) |
| `const cordPath=` | spinal cord (`SCM`), cauda equina, intervertebral discs |
| `CM=new T.Mesh(HM.geometry…)` + `xsh(...)` | myocardium and smooth-muscle layers |
| `XB` / `SY` regex arrays + `pick.forEach(...)` | auto-prefixes info with `[Bone type]` / `[System]` (skipped if info already starts with `[`) |
| `xanim()` | 4D muscle/heart animation |
| `V`/`W`, `view()`, `sel()`, `clr()`, `paint()`, `applyL()`, `setMode()` | camera smoothing, selection highlight, layer toggles, mode switch |
| `/* ---- INPUT ---- */` + `tap()` | pointer handling, raycast pick, tap logic (see §5.4) |
| `/* ---- UI ---- */` | button bindings, **206-bone tracker** (`GR`, localStorage key `a206`) |
| `/* ---- ORGAN DETAIL VIEW ---- */ (()=>{` | **the detail overlay IIFE** — see §5.2 |
| `/* ---- CAPTION + DRAG ---- */` | `CAP`, draggable card, `zm()` zoom-to-point |
| `/* ---- v3: nerves + signals ... */` | `G.nerves`, nerve tubes with moving pulses, spinal nerves C1–Co, sympathetic chain, spinal motor neurons, fine vessels |
| `(function loop(){` | main render loop (heart beat, lungs breathe, rib scale) |
| `const sexBase=...; function setSexMorphology(sex)` + `addEventListener('message'…)` | sex mode: show/hide groups, dimorphism tweaks, camera focus |

### 5.2 Detail overlay IIFE (cutaways + micro scenes)
Overlay DOM: `#dv` (container), `#dc` (canvas), `#dh` header `#dtt`, `#dn` info panel, `#dl` bottom chip bar, `.tg` floating labels.

**Builder toolkit (inside the IIFE):**
| Function | Meaning |
|---|---|
| `init()` | one-time renderer/scene/lights creation |
| `reset()` | clears scene, parts, flows, labels, `fx`, selection — call at the start of every builder |
| `part(name, info, chip, v)` | creates a selectable *part*. `chip=1` → button in bottom bar; `chip=0` → only tappable in 3D. **`v` = micro-view code** (shows "Micro view" button) |
| `add(geo,col,x,y,z,o,P)` | adds a mesh to a part. `o`: `s`, `r`, `op`, `g` (parent group) |
| `tube(pts,rad,col,P,op)` | tube along points as part of `P` |
| `fw(pts,col)` | flow particles along a curve (blood/air/urine flow) |
| `lab([[text,[x,y,z]],…],color)` | floating HTML labels (skipped in non-live unless builder calls it) |
| `cl2(mesh)` / `ad2(...)` | same as `add` but **clipped by cutaway plane `clip`** |
| `RN(seed)` | seeded random generator |
| `fx.push(s=>{...})` | per-frame animation callback (`s` = seconds) |
| `live` | `true` when opened from 4D mode (labels + animations) |
| `fin(title, subtitle, camDistDesktop, camDistMobile)` | **standard ending for micro scenes** (sets title, chips, camera, opens overlay) |
| `kind` | string id of the current scene (used by `anim()`) |
| `curV` | function to re-open the current scene when returning from a sub-view |
| `ret` | return callback for the ✕ button when you came from a parent view |
| `shell`, `shellM` | "outer layer" + material for the Outer layer / Cutaway toggle chips |

**Scene builders (name → what it draws):**
`heart()`, `openMV(name,'a'|'v')` (vessel wall micro), `lungs()`, `openAV()` (alveolus), `kidney()`+`nephX()`, `openNP()` (nephron), `liver()`, `openLB()` (hepatic lobule), `stomach()`, `sint()`, `colon()`, `brain()` (+ hippocampus/BG/ventricles added by wrapper), `eye()`, `panc()`, `spleen()`, `bladder()`, `thyroid()`, `thymus()`, `tongue()`, `ear()`, `upair()`, `cord()`, `nerve()`, `adrenal()`, `gall()`, `knee()`, `breastDV()`, `femaleRepDV()`, `maleRepDV()`, `pregnancyDV()`, `skullDV()`, `jointDV(name)` driven by data table `JD`, `boneDV2(m)`, `generic(m)` fallback.
`NXB = {s,si,li,br,ey,pa,sp,bl,th,ty,to,ea,ua,sc,nv,ad,gb}` maps short key → builder.

**Micro-scene builders (window.*):** `openSK` (skin), `openReproMicro(code)` (rb re ro rt rp rpl), `openBM` (bone microarchitecture), `openJC` (articular cartilage), `openLG` (ligament/enthesis), `openSN` (GABA synapse), `openIC` (ion channels), `openGM` (GABA molecule + receptor), `openCa` (Ca²⁺ channel), `openNM` (neuromuscular junction), `openTT` (dental chart), `openTC` (tooth cross-section), `openTM` (tooth micro).

**ROUTING — the most important thing to understand:**
1. **Gross → detail:** `window.openDV(mesh, live)` picks a builder by testing `mesh.userData.name` against regexes (`h`, `lg`, `kd`, `lv2`, `kj`, `jn=JD[name]`, `sk`, `brt`, `prg`, `fr`, `mr`, then `NX2(name)`/`nxk`, then `isB` → `boneDV2`, else `generic`). It is wrapped again at `/* ---- v5 ---- */` so names starting with `Tooth` go to `openTT`.
   ➜ **Mesh names are an API.** Renaming a mesh in the gross scene changes which cutaway opens, breaks the 5D quiz match, and breaks `JD` lookup.
2. **Detail → micro:** the `$('#dn').onclick` handler dispatches on `P.v`:
   `r*`→`openReproMicro` · `tc`→`openTC` · `tm`→`openTM` · `gm`→`openGM` · `ca`→`openCa` · `nm`→`openNM` · `sy`→`openSN` · `ic`→`openIC` · `x`→`openAV` · `n`→`openNP` · `bm`→`openBM` · `jc`→`openJC` · `lg`→`openLG` · `b`→`openLB` · `a`/`v`→`openMV(name,…)`.
   ➜ **Gotcha:** the first test is `P.v.startsWith('r')`, so **any new micro code must NOT start with `r`** (`rb re ro rt rp rpl` are taken by reproductive micro scenes).
3. **Patching pattern used in v3–v5:** later sections wrap earlier builders (`const _br=NXB.br; NXB.br=()=>{_br(); …add parts…}`) and set `p.v` codes after the fact (`parts.forEach(p=>{if(/regex/.test(p.n))p.v='sy'})`). Prefer editing the original builder when possible; use the wrapper pattern for small additions.

### 5.3 Modes and layers
- Modes (`mode`): `3D` (normal), `4D` (live: heartbeat 72 bpm, breathing, biceps/triceps animation, labels), `5D` (quiz "Dhundo: <name>", score, only bones visible).
- Layers (`L`): bones, organs, vessels, nerves, muscles, skin (chips at the bottom). `applyL()` toggles `G[k].visible`; female/male/pregnancy groups additionally depend on `currentSex` and `L.organs`.
- Sex mode: `setSexMorphology()`; General hides both sex groups.

### 5.4 Tap behaviour (`tap()`)
- First tap → `sel(mesh)` (select, camera focus, info card). Second tap on same mesh (or in 4D, or when `CAP` false) → `openDV` (or `openMV` for vessels).
- "Details" button (`#cp`) or "Open cutaway" (`#detail`) → `openDV(selm)`.
- Gallbladder is prioritised in raycast hits (it hides behind liver).
- In 5D, tap compares `userData.name` with the question `q`.

---

## 6. Task → Location (use this table)

| I want to… | Go to (search text) in `public/human-atlas-3d.html` |
|---|---|
| Fix/modify **eye external model** | `on(sp(.085),0xffffff,s*.18,8.5,.5,'Eye'` |
| Fix/modify **eye cutaway** (sclera, retina, lens…) | `const eye=()=>` (uses `cap()` helper; globe axis is along **x**; cornea at x≈−0.35, retina radius .93, fovea/optic disc at +x) |
| Add **eye microscopic detail** (light → cells, retina layers, rods/cones, photoreceptor discs, RPE) | New `window.openEM=()=>{…}` + tag a part (e.g. Retina/Cornea/Lens) with `.v='em'` + new branch in `$('#dn').onclick` (recipe §7.1). Eye is routed by `n=='Eye'`→`NXB.ey` in `openDV` |
| Fix **male reproductive gross** | lines `sexm(G.male,` (prostate, seminal vesicles, testis, tunicae, scrotal layers, ductus, epididymis, penis, glands) |
| Fix **male cutaway** | `const maleRepDV=()=>` |
| Fix **male micro** | `openReproMicro` branches `t==='rt'` (seminiferous) and `t==='rp'` (prostate) |
| Fix **female gross / cutaway / micro** | `sexm(G.female,` · `const femaleRepDV=()=>` · `openReproMicro` `rb re ro` |
| Pregnancy | `sexm(G.pregnancy,` · `const pregnancyDV=()=>` · `openReproMicro` `rpl` |
| Wrong cutaway opens when tapping X | regexes in `window.openDV=(m,lv)=>{` (`h`, `lg`, `kd`, `lv2`, `kj`, `sk`, `brt`, `prg`, `fr`, `mr`, `NX2`) |
| "Micro view" button opens wrong scene / missing | `$('#dn').onclick=` dispatch chain and the `v` argument of `part(...)` |
| Heart | gross: `const HM=on(` + `hc(` chambers; cutaway: `const heart=()=>` (note: variable `heart` inside IIFE is the builder, outside it is the gross mesh) |
| Lungs / alveolus | gross lung loop (`'Right lung'`); `const lungs=()=>`; `window.openAV` |
| Kidney / nephron | `const kidney=()=>`, `const nephX=()=>`, `window.openNP` |
| Liver / lobule / gallbladder | `const liver=()=>`, `window.openLB`, `const gall=()=>` |
| Brain | `brainLobe(`, `const brain=()=>`, wrapper `NXB.br=()=>{_br();` (hippocampus, basal ganglia, ventricles) |
| Neuron / synapse / channels | `const nerve=()=>`, `window.openSN`, `openIC`, `openGM`, `openCa`, `openNM` |
| Joints (non-knee) | hotspot array `jointHotspot`, data table `const JD={`, builder `const jointDV=` |
| Knee | `const knee=()=>`, `window.openJC`, `window.openLG`; gross menisci/ligaments in muscles section (`' medial meniscus'`) |
| Bones | gross: `/* ---- BONES ---- */`; cutaway: `const boneDV2=`; micro: `window.openBM` |
| Skull / cranial base | `sh(` plates, `/* cranial-base and facial-bone landmarks */`, `const skullDV=` |
| Teeth | `TT` array (gross), `window.openTT/openTC/openTM` |
| Muscles | `xms(` calls in `xLR(s=>{…})`; textures `XT`; animation `xanim` |
| Nerves/pulses (gross) | `/* ---- v3: nerves + signals` |
| Skin | `const sk=new T.Mesh(new T.LatheGeometry`, micro `window.openSK` |
| Layer chips / modes / 5D quiz | `applyL`, `setMode`, `nextQ`, `tap` |
| 206-bone tracker | `const GR=[`, localStorage `a206` |
| Camera / zoom / pinch | `view()`, `zm()`, pointer handlers; detail overlay: `$('#dc')` handlers |
| Colours/transparency of selection | `paint()` |
| Header buttons, Clean view, loading screen | `src/App.tsx`, `src/index.css` |
| Rename project / base path | `vite.config.ts` → `base`, `package.json` → `name`, `<title>` in `index.html` and the viewer HTML |
| Search-engine visibility | `robots.txt` (currently `Disallow: /`) and `<meta name="robots">` in `index.html` |

---

## 7. Recipes

### 7.1 Add a new microscopic scene (example: eye retina)
1. Write the builder next to the other `window.open*` functions (e.g. after `openNM`):
   ```js
   window.openEM=()=>{init();reset();ret=null;live=false;kind='em';curV=()=>openEM();
     const P1=part('Photoreceptor layer','Rods (dim light) and cones (colour)…',1);
     add(new T.CylinderGeometry(.05,.05,.6,10),0xe8a0a0,0,0,0,{op:.95},P1);
     tube([[0,-1,0],[0,1,0]],.03,0xffe36a,P1,1);
     lab([['Photoreceptors',[1,0,0]]],'#ffe36a');
     fin('Retina microanatomy','layers · rods · cones | part par tap karein',8,16)};
   ```
   Use `ad2`/`cl2` instead of `add` if the object should be cut by the cutaway plane. Use `fx.push(s=>…)` for animation.
2. Make a part of the parent scene open it: either pass the 4th arg `part(name,info,1,'em')` inside `eye()`, or use the wrapper pattern: `const _ey=NXB.ey;NXB.ey=()=>{_ey();parts.forEach(p=>{if(/^Retina/.test(p.n))p.v='em'})}`.
3. Add a branch in the dispatch chain of `$('#dn').onclick`: `P.v=='em'?openEM():` (**code must not start with `r`**, and must be unique).
4. Test: gross eye → Open cutaway → tap the part → "Micro view ▶" → ✕ should return to the eye cutaway (`curV` handles return).

### 7.2 Add a new gross structure
`mk(G.organs, sp(.1), 0xcolor, x, y, z, 'Exact Name', 'Info text', {s:[1,1,1]})` (or `on(...)`, `bn(...)`, `sexm(G.male,…)`). Then decide its cutaway: add a regex in `openDV` or let it fall to `generic()`. If the name should open a joint cross-section, add an entry to `JD` and a hotspot with the **same name**.

### 7.3 Fix overlapping transparent shells (e.g. male testis/tunicae/scrotum)
Testis, tunica vaginalis, tunica albuginea and scrotal layers are separate spheres at the **same centre** with slightly different scales and opacities (`.24`, `.38`, `.18`). Raycast hits the outermost; they are hard to select individually. Fix by: larger scale gaps, separate depth/offset, or splitting into a dedicated cutaway where each layer is clipped (`ad2`) like in `maleRepDV`.

### 7.4 Add an info-text-only fix
Info strings are the 9th argument of `mk` / 2nd of `part`. Do not start a gross-mesh info string with `[` unless you want to skip the auto `[System]` tag.

---

## 8. Commands
The repo pins **pnpm 10.34.3 and Node 22** through `.mise.toml`; use pnpm and keep only `pnpm-lock.yaml`.
```bash
pnpm install
pnpm dev               # Vite dev server (config currently forces port 8443, host 0.0.0.0 — Figma leftover)
pnpm build             # outputs dist/
pnpm preview
pnpm audit:features    # reads public/data/feature-catalogue.json → docs/excel-feature-coverage*.{json,md}
pnpm audit:reproductive  # reads catalogue → docs/reproductive-anatomy-audit.{json,md}
pnpm format            # oxfmt
```
(`npm run …` works too, but then you create/maintain a second lockfile.) There is no `typecheck` script; `npx tsc --noEmit` checks `src/` only, never the viewer HTML.

Audit notes: `audit-reproductive-anatomy.mjs` contains a **manually maintained** `evidence` object. After changing male/female anatomy in the viewer, update that table or the generated audit becomes false. Do not delete `public/data/feature-catalogue.json` until these scripts are removed or the file is relocated and the path updated.

Stack: Vite 8, React 19, TypeScript 5.7, Tailwind CSS v4 (`@tailwindcss/vite`, no tailwind/postcss config file needed), `@vitejs/plugin-react` 6. Viewer: plain JS + three.js r128 (no bundler).

---

## 9. Removing the Figma dependency
`vite.config.ts` currently imports `./.figma/make/site.json` and defines 4 Figma plugins (`figmaSiteConfiguration`, `figmaErrorOverlayReplay`, `figmaReactRefreshBoundaryFallback`, `figmaMakeKitPlugin`) plus Figma-specific env vars. None are needed for production. Replace the whole file with:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  base: '/Human-Anatomy-Education-Platform/',
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
})
```
Checklist:
1. Replace `vite.config.ts` as above; delete `.figma/` (the `.gitignore` line `/.figma/design-context/` can stay or go).
2. `package.json`: `"name": "figma-make-app"` → `"human-atlas"`; remove `three`; then `pnpm install` to refresh `pnpm-lock.yaml`; delete `package-lock.json`.
3. Rewrite `AGENTS.md` (§3.4); `CLAUDE.md` stays `@AGENTS.md`.
4. `index.html` already has title/description/robots meta, so nothing was lost; the Figma plugin used to inject them.
5. Replace `favicon.svg` (Figma-Make placeholder) with your own icon.
6. Fix `robots.txt` (currently blocks all crawlers) to match what you want.
7. Dev port becomes Vite default (5173) unless you add `server.port`.
8. The `.gitignore` comment/entries about `.plugins/` and `.opencode-skills/` are platform-managed; harmless.

---

## 10. Known problems / things to verify (found by reading the code and config)
1. **Reproductive anatomy is incomplete/misleading** (user-reported). Per audit: no gross model for ejaculatory ducts, spermatic cord, rete testis, endometrium/myometrium as gross; tunicae/scrotal layers are coincident spheres; many micro scenes missing (epididymis, tube, cervix, vagina, erectile tissue, accessory glands).
2. **Possible regex bug in `openDV`:** the pregnancy test contains `Fetus \\(conceptual context\\)` inside a regex literal. Double backslashes make it match a literal backslash, so tapping the fetus may not route to `pregnancyDV`. Verify in the real file (may be an artefact of copy/paste escaping); the correct literal is `/Fetus \(conceptual context\)/`.
3. **Duplicate mesh names:** many bones share the same name (several meshes named `Femur`, `Humerus`, `Ulna`…), so 5D quiz and `XB` tagging treat them as one name; also all carpals/tarsals/ribs are generic.
4. **Generic cutaway reuse:** every recognised bone opens the same long-bone cutaway (`boneDV2`), wrong for flat/irregular/sesamoid bones.
5. **Single 3,000+ line file:** all content is mixed with logic (see `docs/anatomy-geometry-audit.md` "Architecture finding"). Planned split: structure registry, asset registry, gross renderer, detail renderer, relationship graph, selection/camera controller, animation registry, content/references, QA records.
6. **Dead/unused:** `src/data/registry.ts`, `StatusBadge/IconButton/SearchInput`, npm `three`, feature-registry CSS, 2.5 MB catalogue shipped inside `public/`.
7. **Eye needs micro-level detail** (planned): light passing through cornea → lens → vitreous → retina; retinal layers, rods/cones, RPE, optic disc. Currently `eye()` is a gross horizontal section only.
8. Everything is `validation: pending`. Keep the disclaimer wording: procedural educational geometry, not scan-derived.
9. **`dist/` is tracked despite being in `.gitignore`** → needs `git rm -r --cached dist`.
10. **Two lockfiles** (`package-lock.json` and `pnpm-lock.yaml`) while `.mise.toml` pins pnpm.
11. **`robots.txt` is `Disallow: /`** while `index.html` says `index, follow` → site is hidden from Google.
12. **`AGENTS.md` is a stale Figma-Make scaffold** that does not mention the viewer (§3.4).
13. **`favicon.svg` and `package.json` name are still Figma-Make defaults.**
14. `.github/workflows` and `src/components/icons.tsx` have not been reviewed yet; deploy method is unconfirmed.

---

## 11. Conventions for contributors / AI assistants
- **Edit only `public/human-atlas-3d.html` and `src/*`.** Never hand-edit `dist/` or root build copies.
- When asked to change something, locate it with §6, change the **smallest scope**, and keep the exact `name` strings stable (routing depends on them).
- After editing, check: (a) no syntax error (the whole viewer breaks on one), (b) tap → cutaway → micro → ✕ return path, (c) mobile layout (the app is mostly used on phones; camera distances have separate desktop/mobile values).
- Use three.js r128 APIs only. Avoid `localStorage` assumptions beyond the existing `a206` key (wrapped in try/catch).
- UI language of the viewer: English anatomy terms + Hinglish helper text (`part par tap karein`, `Dhundo:`). Keep that style.
- When adding a structure, also decide its audit status (`scripts/audit-reproductive-anatomy.mjs` for reproductive items) and keep wording honest: *procedural, validation pending*.
- If you change architecture or add a section/builder, **update this README** (§5, §6) in the same commit.

---

## 12. Suggested roadmap
1. Cleanup (one commit each): `git rm -r --cached dist`; delete `package-lock.json`; confirm deploy method (`.github/workflows`, Settings → Pages) → remove root build copies; remove Figma (§9); rewrite `AGENTS.md`; fix `robots.txt`; new favicon; drop dead code; relocate catalogue.
2. Male reproductive fixes (§10.1) + audit table update.
3. Eye microscopic detailing (§7.1).
4. Fix the possible fetus regex bug; unique names for bones; per-class bone cutaways.
5. Split the viewer into modules (registry / renderers / content) once features stabilise.
