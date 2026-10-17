# Reproductive Anatomy Geometry Audit

## Scope and rules

This audit checks all **245 reproductive-system feature rows** and
all **35 unique reproductive structures** from the Excel
catalogue against actual viewer code.

- A label is not geometry.
- Several meshes sharing one parent detail part are **Grouped**, not independent.
- Cell-like objects embedded in an organ scene are **Embedded concept**, not a
  dedicated microscopic scale.
- Text about a vessel, nerve, lymphatic or ligament does not count unless a
  selectable mesh/path exists.
- No structure is validated until provenance and anatomical review records exist.

## Matrix

| Structure | Gross mesh | Dedicated detail | Micro scale | Spatial relations | Nerves/vessels | Lymphatics | Validation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Broad ligament | Independent | Independent | Missing | Partial | Missing | Missing | Pending |
| Bulbourethral glands | Independent | Independent | Missing | Missing | Missing | Missing | Pending |
| Cervix | Independent | Independent | Missing | Partial | Missing | Missing | Pending |
| Clitoris | Independent | Independent | Missing | Partial | Partial | Missing | Pending |
| Corpora cavernosa | Independent | Independent | Missing | Partial | Partial | Missing | Pending |
| Corpus spongiosum | Independent | Independent | Missing | Partial | Missing | Missing | Pending |
| Ductus deferens | Independent | Grouped | Missing | Partial | Missing | Missing | Pending |
| Ejaculatory ducts | Missing | Independent | Missing | Partial | Missing | Missing | Pending |
| Endometrium | Missing | Independent | Independent | Missing | Missing | Missing | Pending |
| Epididymis | Independent | Independent | Missing | Partial | Missing | Missing | Pending |
| Fimbriae | Grouped | Grouped | Missing | Partial | Missing | Missing | Pending |
| Mammary gland | Independent | Independent | Independent | Partial | Partial | Partial | Pending |
| Myometrium | Missing | Independent | Missing | Missing | Missing | Missing | Pending |
| Ovarian cortex and medulla | Missing | Grouped | Independent | Missing | Missing | Missing | Pending |
| Ovarian ligament | Independent | Independent | Missing | Partial | Missing | Missing | Pending |
| Ovary | Independent | Independent | Independent | Partial | Partial | Missing | Pending |
| Pelvic fascia | Independent | Independent | Missing | Partial | Missing | Missing | Pending |
| Penile erectile bodies | Independent | Independent | Missing | Partial | Partial | Missing | Pending |
| Placenta | Independent | Independent | Independent | Partial | Partial | Missing | Pending |
| Prostate zones | Independent | Independent | Independent | Partial | Missing | Missing | Pending |
| Rete testis | Missing | Independent | Embedded concept | Missing | Missing | Missing | Pending |
| Round ligament of uterus | Independent | Independent | Missing | Partial | Missing | Missing | Pending |
| Scrotal layers | Independent | Independent | Missing | Missing | Missing | Missing | Pending |
| Seminal vesicles | Independent | Grouped | Missing | Partial | Missing | Missing | Pending |
| Seminiferous tubules | Missing | Independent | Independent | Missing | Missing | Missing | Pending |
| Spermatic cord | Missing | Independent | Missing | Partial | Missing | Missing | Pending |
| Suspensory ligament of ovary | Independent | Independent | Missing | Partial | Partial | Missing | Pending |
| Testis | Independent | Independent | Independent | Partial | Missing | Missing | Pending |
| Tunica albuginea | Independent | Independent | Missing | Missing | Missing | Missing | Pending |
| Tunica vaginalis | Independent | Independent | Missing | Missing | Missing | Missing | Pending |
| Umbilical cord | Independent | Independent | Missing | Partial | Partial | Missing | Pending |
| Uterine tube | Independent | Independent | Missing | Partial | Missing | Missing | Pending |
| Uterus | Independent | Independent | Missing | Partial | Partial | Missing | Pending |
| Vagina | Independent | Independent | Missing | Partial | Missing | Missing | Pending |
| Vulva | Independent | Independent | Missing | Partial | Missing | Missing | Pending |

## Current result

- Independent gross meshes: **27/35**
- Independent dedicated-detail structures: **31/35**
- Dedicated microscopic scenes: **8/35**
- Embedded conceptual micro coverage: **1/35**
- Partial explicit spatial relationships: **26/35**
- Partial neurovascular coverage: **9/35**
- Partial lymphatic coverage: **1/35**
- Anatomically validated structures: **0/35**

Completely unevidenced structures: **None**.

## P0 implementation backlog

1. Add remaining dedicated histology-scale scenes for epididymis, uterine
   tube, cervix, vagina, erectile tissue and accessory glands.
2. Add named arterial, venous, autonomic/somatic nerve and lymphatic paths with
   stable IDs and selectable drainage territories.
3. Add complete organ-to-organ fascial spaces and surgical planes, including
   vesicouterine, rectouterine, retropubic and perineal compartments.
4. Add provenance, physical scale, reviewer, review date and validation status
   to every reproductive mesh and interaction.

The machine-readable evidence ledger is
`docs/reproductive-anatomy-audit.json`.
