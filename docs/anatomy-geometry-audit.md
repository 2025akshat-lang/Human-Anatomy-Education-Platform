# HUMAN ATLAS — Code-Derived Geometry Audit

## Scope

This audit examines the implemented WebGL source in
`public/human-atlas-3d.html`. It does not use the 5,158-row curriculum
catalogue as evidence of implementation.

The audit distinguishes:

1. **Selectable gross geometry** — registered for raycasting in the main scene.
2. **Dedicated cutaway geometry** — a structure-specific internal scene.
3. **Micro geometry** — a further tissue, cellular or molecular scene.
4. **Simplified procedural geometry** — selectable, but built from generic
   spheres, cylinders, tubes, lathed profiles or endpoint sweeps.
5. **Grouped/name-only coverage** — one selectable object represents multiple
   distinct structures, or detail exists only in text.

Static TypeScript-AST analysis found a lower bound of:

- **143 unique literal selectable names** created through the main mesh helpers.
- **297 unique literal detail-part names** created inside cutaway and micro
  scenes.

These are lower bounds because vertebrae, ribs, vessels, nerves and repeated
structures are also generated dynamically. They are not counts of validated
anatomical models.

## Implemented multiscale families

The following families have dedicated internal geometry rather than only a
label:

| Family | Gross selection | Dedicated cutaway | Deeper scale |
| --- | --- | --- | --- |
| Bone | Yes | Cortical/trabecular/marrow cutaway | Osteon, marrow niche, canaliculi, remodelling surfaces |
| Heart | Yes | Chambers, valves, chordae and vessels | No validated myocardial histology |
| Lung | Yes | Bronchial and pulmonary components | Alveolus and blood-air barrier |
| Kidney | Yes | Cortex, pyramids, calyces and vessels | Nephron |
| Liver | Yes | Lobes, portal and biliary structures | Hepatic lobule |
| Stomach | Yes | Wall, rugae and regional structures | No validated gastric-gland micro model |
| Intestine | Yes | Wall layers, villi, vessels and lacteals | Conceptual villus scale |
| Brain | Yes | Sagittal/deep-component scene | Selected synapse and ion-channel scenes |
| Peripheral nerve | Yes | Neuron and nerve cross-section | Synapse, ion channels and neuromuscular junction |
| Tooth | Yes | Enamel, dentine, pulp and periodontium | Enamel rods and dentinal tubules |
| Vessel | Yes | Artery/vein wall and blood cells | Conceptual cellular scale |
| Skin | Layer | Epidermis, dermis, glands and receptors | No validated cellular epidermal model |

Additional dedicated cutaways exist for the eye, pancreas, spleen, urinary
bladder, thyroid, thymus, tongue, ear, upper airway, spinal cord, adrenal gland
and gallbladder.

Sex-specific anatomy is now separated into Female and Male gross-scene groups.
Female mode exposes independently selectable mammary glands, uterus, cervix,
vagina, uterine tubes, ovaries and external-genital region. Male mode exposes
penis/glans, testes, epididymides, ductus deferentes, seminal vesicles and
prostate. Dedicated procedural cross-sections cover breast architecture,
female reproductive anatomy and male reproductive anatomy. General mode hides
both groups rather than superimposing incompatible structures.

## Geometry that is selectable but still requires replacement

### Bones

Many named bones are independently raycastable, but their forms are generated
from generic lathed, cylindrical, spherical or box geometry.

Examples:

- Humerus, radius, ulna, femur, tibia and fibula share a generic long-bone
  construction pattern.
- Carpal, tarsal and phalangeal geometry is highly simplified.
- Vertebrae are assembled from cylinders and boxes rather than
  region-specific meshes.
- Scapula and pelvis remain simplified. The skull now has a dedicated
  selectable cranial-base scene separating vault bones, cranial fossae,
  sphenoid/ethmoid components, major foramina, orbital walls, sutures, dura
  relation and calvarial layers; its surfaces remain procedural rather than
  scan-derived.

The current cutaway router also sends every recognised bone to the same
long-bone-style cutaway. That is inappropriate for flat, short, sesamoid and
irregular bones.

**Required replacement:** separately reviewed meshes for each bone class and
each individual bone, with structure-specific cortical distribution,
trabecular orientation, marrow spaces, articular surfaces and landmarks.

### Joints

The viewer now has dedicated, independently selectable procedural assemblies
for the workbook's P1 joint set: TMJ, shoulder, elbow, wrist, hip, knee, ankle,
sacroiliac, atlanto-occipital, atlanto-axial, intervertebral symphysis and
pubic symphysis. Their detail scenes separate the applicable bones, cartilage,
disc/labrum/menisci, capsule or synovial cavity, major ligaments, crossing
tendons or bursae, and selected neurovascular relations.

These are **educational procedural cross-sections**, not validated
reconstructions. The generic primitives communicate topology and selection
relationships but do not establish landmark-level surface fidelity,
biomechanical material behaviour, calibrated joint spacing or validated
range-of-motion constraints.

**Required replacement:** reviewed region-specific surface meshes, attachment
maps and measured kinematic constraints for every joint assembly.

### Muscles

Twenty-eight literal muscle names are statically identifiable, with additional
bilateral and repeated objects generated at runtime. Most are endpoint-based
procedural sweeps.

Grouped or simplified examples:

- Forearm flexors
- Forearm extensors
- Adductor group
- Erector spinae
- Abdominal wall components

These do not yet provide accurate origins, insertions, heads, aponeuroses,
fascial compartments or fibre architecture.

The posterior hip now includes broader selectable gluteus maximus, medius and
minimus volumes, piriformis, levator ani and coccygeus components. They improve
regional coverage but remain procedural surfaces rather than reviewed
attachment-mapped muscle assets.

**Required replacement:** anatomically shaped meshes with independent heads,
tendons and attachment regions. Movement must be driven by structure-specific
joint constraints, not only mesh scaling.

### Neuroanatomy

The code contains selectable nerves, spinal roots, selected plexus paths,
neurons, synapses and ion-channel scenes. Gross neural paths are mostly tube
geometry and the brain is assembled from procedural volumes.

Insufficiently represented:

- Cortical gyri and sulci
- Lobar boundaries
- Thalamic and hypothalamic nuclei
- Basal nuclei segmentation
- Brainstem nuclei
- Cerebellar lobules and deep nuclei
- Ventricular topology
- White-matter tracts
- Cranial-nerve nuclei and complete trajectories
- Peripheral branching topology tied to muscles and dermatomes

**Required replacement:** reviewed surface meshes, deep-nuclei segmentation and
explicit tract/pathway datasets.

### Cardiovascular and respiratory systems

The current viewer has selectable major vessels, cardiac cutaway geometry,
bronchial branches, alveoli and animated flow particles. Vessel trees and
airways are mainly procedural tubes.

Needed for higher fidelity:

- Named arterial and venous branch topology with stable IDs
- Coronary territories and cardiac venous drainage
- Chamber-specific myocardial geometry
- Valve leaflets with realistic attachments and motion
- Lobar and segmental pulmonary anatomy
- Bronchopulmonary segments
- Pulmonary acinus topology
- Calibrated vessel and airway diameters

Animations remain conceptual and must not be interpreted as haemodynamic or
respiratory simulation.

### Histology and microanatomy

The micro scenes contain independently selectable educational components.
They are procedural diagrams in 3D space, not reconstructions from histological
datasets.

They require:

- Explicit physical scale
- Tissue-specific cell density and spatial variation
- Histological image correlation
- Provenance and review records
- Separation of normal morphology from conceptual process animation

## Name-only or grouped coverage

The following patterns must not be counted as complete anatomy:

- A group label standing in for multiple structures, such as “carpals,”
  “tarsals,” “forearm flexors” or “adductor group.”
- A textual mention of an attachment, vessel, nerve or layer without an
  independently selectable object.
- A detail-scene label with no corresponding gross-scene relationship ID.
- A generic cutaway reused for an anatomically different structure.
- Repeated procedural tubes without a documented branch registry.
- A motion or flow particle effect without a validated physiological model.

## Priority geometry backlog

### P0 — foundation-quality anatomy

1. Replace generic bones with individually reviewed bone meshes.
2. Build complete knee and shoulder assemblies as the first joint reference
   implementations.
3. Replace brain volumes with segmented cortical, ventricular and deep-nuclei
   geometry.
4. Replace endpoint muscles with anatomically shaped muscle, tendon and
   aponeurosis meshes.
5. Establish stable IDs and parent-child relations for every rendered object.

### P1 — organ-system fidelity

1. Heart chambers, septa, valves, papillary muscles and coronary vessels.
2. Lobar/segmental lungs and a named bronchial tree.
3. Renal cortex, pyramids, calyces and nephron relationship mapping.
4. GI wall layers tied to organ-specific histology.
5. Named arterial, venous, lymphatic and peripheral-nerve trees.

### P2 — validated cross-scale learning

1. Organ-to-tissue transition records.
2. Tissue-to-cell transitions only where biologically supported.
3. Physical-scale metadata for every micro scene.
4. Histology and imaging correlations with provenance.
5. Scientific-review and model-QA records.

## Architecture finding

The viewer currently concentrates gross anatomy, cutaways, micro scenes,
interaction logic, content text and animations in one large HTML script. Before
adding major asset families, split it into:

- Structure registry
- Asset registry
- Gross-scene renderer
- Detail-scene renderer
- Cross-scale relationship graph
- Selection and camera controller
- Animation registry
- Scientific content and references
- Model QA records

This separation is required to audit whether a named structure has real
geometry, a generic proxy, annotation-only coverage or no implementation.
