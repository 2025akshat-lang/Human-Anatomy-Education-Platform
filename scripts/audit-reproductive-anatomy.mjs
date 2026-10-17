import { readFileSync, writeFileSync } from "node:fs"

const catalogue = JSON.parse(
  readFileSync("public/data/feature-catalogue.json", "utf8"),
)
const rows = catalogue.features.filter(
  (feature) => feature.domain === "Reproductive system",
)

const evidence = {
  "Broad ligament": {
    gross: "independent",
    detail: "independent",
    relationships: "partial",
    evidence: "Combined broad/round/ovarian/suspensory-ligament detail part",
  },
  "Bulbourethral glands": {
    gross: "independent",
    detail: "independent",
    evidence: "Two meshes share a combined gland and pelvic-floor detail part",
  },
  Cervix: {
    gross: "independent",
    detail: "independent",
    relationships: "partial",
    evidence: "Gross cervix mesh plus canal/fornix detail geometry",
  },
  Clitoris: {
    gross: "independent",
    detail: "independent",
    relationships: "partial",
    neurovascular: "partial",
    evidence: "Gross glans plus separate clitoral body/crura detail geometry",
  },
  "Corpora cavernosa": {
    gross: "independent",
    detail: "independent",
    relationships: "partial",
    neurovascular: "partial",
    evidence: "Separated paired erectile cylinders in male detail scene",
  },
  "Corpus spongiosum": {
    gross: "independent",
    detail: "independent",
    relationships: "partial",
    evidence: "Dedicated spongiosum/urethra mesh in male detail scene",
  },
  "Ductus deferens": {
    gross: "independent",
    detail: "grouped",
    relationships: "partial",
    evidence: "Bilateral gross tubes; combined cord/duct detail part",
  },
  "Ejaculatory ducts": {
    detail: "independent",
    relationships: "partial",
    evidence: "Combined with seminal-vesicle detail part",
  },
  Endometrium: {
    detail: "independent",
    micro: "independent",
    evidence: "Selectable endometrial volume and uterine cavity",
  },
  Epididymis: {
    gross: "independent",
    detail: "independent",
    relationships: "partial",
    evidence: "Bilateral gross path and dedicated detail part",
  },
  Fimbriae: {
    gross: "grouped",
    detail: "grouped",
    relationships: "partial",
    evidence: "Multiple fimbrial tubes share uterine-tube parent part",
  },
  "Mammary gland": {
    gross: "independent",
    detail: "independent",
    micro: "independent",
    relationships: "partial",
    neurovascular: "partial",
    lymphatics: "partial",
    evidence: "Bilateral gross glands and dedicated breast cross-section",
  },
  Myometrium: {
    detail: "independent",
    micro: "missing",
    evidence: "Selectable myometrial shell in uterine detail scene",
  },
  "Ovarian cortex and medulla": {
    detail: "grouped",
    micro: "independent",
    evidence: "Follicles are meshes but cortex and medulla are not separated",
  },
  "Ovarian ligament": {
    gross: "independent",
    detail: "independent",
    relationships: "partial",
    evidence: "Shares combined uterine-support ligament part",
  },
  Ovary: {
    gross: "independent",
    detail: "independent",
    micro: "independent",
    relationships: "partial",
    neurovascular: "partial",
    evidence: "Bilateral gross ovaries and follicle-bearing detail meshes",
  },
  "Pelvic fascia": {
    gross: "independent",
    detail: "independent",
    relationships: "partial",
    evidence: "Bilateral gross fascial sheets plus paracervical detail plane",
  },
  "Penile erectile bodies": {
    gross: "independent",
    detail: "independent",
    relationships: "partial",
    neurovascular: "partial",
    evidence: "Cavernosa and spongiosum separated in male detail scene",
  },
  Placenta: {
    gross: "independent",
    detail: "independent",
    micro: "independent",
    relationships: "partial",
    neurovascular: "partial",
    evidence: "Separate pregnancy-state placenta with plates and villous-tree geometry",
  },
  "Prostate zones": {
    gross: "independent",
    detail: "independent",
    micro: "independent",
    relationships: "partial",
    evidence: "Concentric zone volumes share one prostate-zones part",
  },
  "Rete testis": {
    detail: "independent",
    micro: "conceptual-embedded",
    evidence: "Grouped with seminiferous-tubule detail part",
  },
  "Round ligament of uterus": {
    gross: "independent",
    detail: "independent",
    relationships: "partial",
    evidence: "Shares combined uterine-support ligament part",
  },
  "Scrotal layers": {
    gross: "independent",
    detail: "independent",
    evidence: "Concentric gross and dedicated-detail scrotal wall layers",
  },
  "Seminal vesicles": {
    gross: "independent",
    detail: "grouped",
    relationships: "partial",
    evidence: "Bilateral gross meshes; detail grouped with ejaculatory ducts",
  },
  "Seminiferous tubules": {
    detail: "independent",
    micro: "independent",
    evidence: "Multiple selectable-detail tubes share seminiferous parent part",
  },
  "Spermatic cord": {
    detail: "independent",
    relationships: "partial",
    evidence: "Combined with ductus deferens; cord contents not separated",
  },
  "Suspensory ligament of ovary": {
    gross: "independent",
    detail: "independent",
    relationships: "partial",
    neurovascular: "partial",
    evidence: "Ligament and ovarian-vessel relation shown but share grouped parts",
  },
  Testis: {
    gross: "independent",
    detail: "independent",
    micro: "independent",
    relationships: "partial",
    evidence: "Bilateral gross testes and dedicated testicular detail volumes",
  },
  "Tunica albuginea": {
    gross: "independent",
    detail: "independent",
    evidence: "Mentioned and represented within combined tunica/testis or penis parts",
  },
  "Tunica vaginalis": {
    gross: "independent",
    detail: "independent",
    evidence: "Represented within combined testis-and-tunica part",
  },
  "Umbilical cord": {
    gross: "independent",
    detail: "independent",
    relationships: "partial",
    neurovascular: "partial",
    evidence: "Separate pregnancy-state cord with Wharton-jelly sheath and three vessels",
  },
  "Uterine tube": {
    gross: "independent",
    detail: "independent",
    relationships: "partial",
    evidence: "Bilateral gross and dedicated tube/fimbria detail geometry",
  },
  Uterus: {
    gross: "independent",
    detail: "independent",
    relationships: "partial",
    neurovascular: "partial",
    evidence: "Gross uterine mesh and layered dedicated uterine detail scene",
  },
  Vagina: {
    gross: "independent",
    detail: "independent",
    relationships: "partial",
    evidence: "Gross canal and dedicated vaginal/fornix detail geometry",
  },
  Vulva: {
    gross: "independent",
    detail: "independent",
    relationships: "partial",
    evidence: "Labia majora/minora, vestibule, clitoris, bulbs and greater vestibular glands are separated",
  },
}

const structures = [...new Set(rows.map((row) => row.structure))]
  .sort()
  .map((structure) => {
    const featureRows = rows.filter((row) => row.structure === structure)
    const record = evidence[structure] ?? {}
    return {
      structure,
      featureIds: featureRows.map((row) => row.featureId),
      gross: record.gross ?? "missing",
      detail: record.detail ?? "missing",
      micro: record.micro ?? "missing",
      relationships: record.relationships ?? "missing",
      neurovascular: record.neurovascular ?? "missing",
      lymphatics: record.lymphatics ?? "missing",
      validation: "pending",
      evidence: record.evidence ?? "No reviewed implementation evidence recorded",
    }
  })

const dimensions = [
  "gross",
  "detail",
  "micro",
  "relationships",
  "neurovascular",
  "lymphatics",
]
const counts = Object.fromEntries(
  dimensions.map((dimension) => [
    dimension,
    structures.reduce((result, structure) => {
      result[structure[dimension]] = (result[structure[dimension]] ?? 0) + 1
      return result
    }, {}),
  ]),
)

const output = {
  sourceRows: rows.length,
  structures: structures.length,
  method:
    "Manual code-evidence audit. Shared labels and shared parent parts are grouped, not independent. Conceptual embedded cell-like meshes are not dedicated micro scenes. All validation remains pending.",
  counts,
  records: structures,
}
writeFileSync(
  "docs/reproductive-anatomy-audit.json",
  `${JSON.stringify(output, null, 2)}\n`,
)

const icon = {
  independent: "Independent",
  grouped: "Grouped",
  partial: "Partial",
  "conceptual-embedded": "Embedded concept",
  missing: "Missing",
}
const table = structures
  .map(
    (item) =>
      `| ${item.structure} | ${icon[item.gross]} | ${icon[item.detail]} | ${icon[item.micro]} | ${icon[item.relationships]} | ${icon[item.neurovascular]} | ${icon[item.lymphatics]} | Pending |`,
  )
  .join("\n")

const missing = structures
  .filter(
    (item) =>
      item.gross === "missing" &&
      item.detail === "missing" &&
      item.micro === "missing",
  )
  .map((item) => item.structure)

const markdown = `# Reproductive Anatomy Geometry Audit

## Scope and rules

This audit checks all **${rows.length} reproductive-system feature rows** and
all **${structures.length} unique reproductive structures** from the Excel
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
${table}

## Current result

- Independent gross meshes: **${counts.gross.independent ?? 0}/${structures.length}**
- Independent dedicated-detail structures: **${counts.detail.independent ?? 0}/${structures.length}**
- Dedicated microscopic scenes: **${counts.micro.independent ?? 0}/${structures.length}**
- Embedded conceptual micro coverage: **${counts.micro["conceptual-embedded"] ?? 0}/${structures.length}**
- Partial explicit spatial relationships: **${counts.relationships.partial ?? 0}/${structures.length}**
- Partial neurovascular coverage: **${counts.neurovascular.partial ?? 0}/${structures.length}**
- Partial lymphatic coverage: **${counts.lymphatics.partial ?? 0}/${structures.length}**
- Anatomically validated structures: **0/${structures.length}**

Completely unevidenced structures: **${missing.length ? missing.join(", ") : "None"}**.

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
\`docs/reproductive-anatomy-audit.json\`.
`

writeFileSync("docs/reproductive-anatomy-audit.md", markdown)
