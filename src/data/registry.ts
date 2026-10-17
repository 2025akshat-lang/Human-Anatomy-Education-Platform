export type VerificationStatus = "reviewed" | "pending" | "conceptual"

export type Structure = {
  structureId: string
  preferredName: string
  anatomicalScale: "organ" | "tissue" | "cell"
  parentStructureId?: string
  organSystem: string
  laterality?: "left" | "right"
  educationalSummary: string
  relevantFunction?: string
  relatedStructures: string[]
  geometryStatus: "schematic" | "unavailable"
  verificationStatus: VerificationStatus
}

export const structures: Structure[] = [
  {
    structureId: "HA-ANAT-000001",
    preferredName: "Heart",
    anatomicalScale: "organ",
    organSystem: "Cardiovascular",
    educationalSummary:
      "A muscular organ organized into four chambers. This workspace currently uses an interactive schematic, not a validated anatomical 3D model.",
    relevantFunction:
      "Generates pressure to move blood through pulmonary and systemic circuits.",
    relatedStructures: ["HA-ANAT-000002", "HA-ANAT-000003"],
    geometryStatus: "schematic",
    verificationStatus: "pending",
  },
  {
    structureId: "HA-ANAT-000002",
    preferredName: "Left ventricle",
    anatomicalScale: "organ",
    parentStructureId: "HA-ANAT-000001",
    organSystem: "Cardiovascular",
    laterality: "left",
    educationalSummary:
      "The left inferior cardiac chamber. Its wall includes endocardial, myocardial and epicardial layers.",
    relevantFunction: "Ejects blood into the aorta during ventricular systole.",
    relatedStructures: ["HA-ANAT-000003", "HA-TISS-000001"],
    geometryStatus: "schematic",
    verificationStatus: "pending",
  },
  {
    structureId: "HA-ANAT-000003",
    preferredName: "Mitral valve",
    anatomicalScale: "organ",
    parentStructureId: "HA-ANAT-000001",
    organSystem: "Cardiovascular",
    laterality: "left",
    educationalSummary:
      "The left atrioventricular valve, represented here as an annotation-only structure.",
    relevantFunction:
      "Supports unidirectional flow from the left atrium to the left ventricle.",
    relatedStructures: ["HA-ANAT-000002"],
    geometryStatus: "unavailable",
    verificationStatus: "pending",
  },
  {
    structureId: "HA-TISS-000001",
    preferredName: "Myocardium",
    anatomicalScale: "tissue",
    parentStructureId: "HA-ANAT-000002",
    organSystem: "Cardiovascular",
    educationalSummary:
      "The muscular middle layer of the cardiac wall. A dedicated microscopic asset has not yet been integrated.",
    relevantFunction: "Produces the force of cardiac contraction.",
    relatedStructures: ["HA-CELL-000001"],
    geometryStatus: "unavailable",
    verificationStatus: "pending",
  },
  {
    structureId: "HA-CELL-000001",
    preferredName: "Cardiomyocyte",
    anatomicalScale: "cell",
    parentStructureId: "HA-TISS-000001",
    organSystem: "Cardiovascular",
    educationalSummary:
      "A cardiac muscle cell. This registry entry establishes a cross-scale relationship; no cell model is currently available.",
    relatedStructures: [],
    geometryStatus: "unavailable",
    verificationStatus: "pending",
  },
]

export const systems = [
  { name: "Skeletal", short: "Sk", status: "planned" },
  { name: "Muscular", short: "Mu", status: "planned" },
  { name: "Cardiovascular", short: "Cv", status: "schematic" },
  { name: "Nervous", short: "Ne", status: "planned" },
  { name: "Respiratory", short: "Rs", status: "planned" },
  { name: "Digestive", short: "Di", status: "planned" },
  { name: "Urinary", short: "Ur", status: "planned" },
  { name: "Endocrine", short: "En", status: "planned" },
]
