# Excel Joint Model Implementation Audit

Source checked: `MBBS_MD_Anatomy_1000plus_Audit_Checklist.xlsx`, attached in
the current task. This audit only marks geometry that is routed to a dedicated
3D detail scene; text-only mentions are not counted.

## Workbook P1 joint rows

| Feature | Workbook requirement | Implementation status |
| --- | --- | --- |
| ANAT-5139 | Synovial joint capsule | Implemented across dedicated joint scenes as selectable capsule/synovium components |
| ANAT-5140 | Synovial joint cavity | Implemented across dedicated synovial-joint scenes as a distinct selectable component |
| ANAT-5141 | Hinge joint | Implemented through elbow, knee and ankle assemblies |
| ANAT-5142 | Pivot joint | Implemented through atlanto-axial and proximal-radioulnar components |
| ANAT-5143 | Condyloid joint | Implemented through atlanto-occipital and wrist assemblies |
| ANAT-5144 | Saddle joint | Dedicated first carpometacarpal assembly implemented |
| ANAT-5145 | Ball-and-socket joint | Implemented through shoulder and hip assemblies |
| ANAT-5146 | Plane joint | Implemented through sacroiliac, intercarpal and lateral atlanto-axial components |
| ANAT-5147 | Temporomandibular joint | Dedicated selectable cross-section implemented |
| ANAT-5148 | Shoulder joint | Dedicated selectable cross-section implemented |
| ANAT-5149 | Elbow complex | Dedicated selectable cross-section implemented |
| ANAT-5150 | Wrist joint complex | Dedicated selectable cross-section implemented |
| ANAT-5151 | Hip joint | Dedicated selectable cross-section implemented |
| ANAT-5152 | Knee joint | Dedicated selectable cross-section plus cartilage and enthesis micro scenes implemented |
| ANAT-5153 | Ankle joint | Dedicated selectable cross-section implemented |
| ANAT-5154 | Sacroiliac joint | Dedicated selectable cross-section implemented |
| ANAT-5155 | Atlanto-occipital joint | Dedicated selectable cross-section implemented |
| ANAT-5156 | Atlanto-axial joint | Dedicated selectable cross-section implemented |
| ANAT-5157 | Intervertebral symphysis | Dedicated selectable motion-segment cross-section implemented |
| ANAT-5158 | Pubic symphysis | Dedicated selectable cross-section implemented |

## Selection and routing

The gross body scene now contains selectable joint landmarks for TMJ,
shoulder, elbow, wrist, hip, knee, ankle, sacroiliac, atlanto-occipital,
atlanto-axial, intervertebral and pubic-symphysis detail scenes. Bilateral
landmarks are present where applicable.

Each dedicated scene separates the region-appropriate subset of:

- articulating bones and articular surfaces;
- cartilage, disc, labrum or menisci;
- capsule, synovium and cavity;
- named stabilising ligaments;
- crossing tendons and bursae;
- selected neurovascular relations.

## Scientific status

These models are procedural educational geometry and remain pending anatomical
surface validation. They are not segmented CT/MRI reconstructions, do not
simulate tissue material properties and do not claim validated biomechanics.
The first carpometacarpal saddle-joint scene separates reciprocal articular
surfaces, cartilage/cavity, capsule, named stabilising ligaments, thenar
muscles and radial neurovascular relations.

The General/Female/Male control now changes comparative procedural skeletal
morphology in the pelvis, shoulder girdle and cranial proportions. It is
explicitly disclosed as a non-reviewed morphology mode, not a sex-specific
scan or a representation of every normal variation.
