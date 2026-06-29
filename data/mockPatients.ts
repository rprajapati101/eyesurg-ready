export type ChecklistKey =
  | "transportationConfirmed"
  | "preadmissionTestingComplete"
  | "medicationListReviewed"
  | "allergiesRecorded"
  | "consentConfirmed"
  | "insuranceAuthConfirmed"
  | "preOpCallCompleted"
  | "patientReceivedInstructions"
  | "interpreterNeeded"
  | "caregiverSupportConfirmed";

export type ChecklistItem = {
  key: ChecklistKey;
  label: string;
  complete: boolean;
};

export type RiskLevel = "Low" | "Moderate" | "High";
export type KanbanColumn = "Not Ready" | "Needs Review" | "Ready for Surgery" | "Post-Op Follow-Up";

export type Patient = {
  id: string;
  name: string;
  ageRange: string;
  procedure: string;
  eye: "Right" | "Left" | "Both";
  surgeryDate: string; // ISO date string
  surgeon: string;
  checklist: ChecklistItem[];
  nextBestAction: string;
  column: KanbanColumn;
  notes?: string;
};

export type PostOpPatient = {
  id: string;
  name: string;
  ageRange: string;
  procedure: string;
  eye: "Right" | "Left" | "Both";
  surgeryDate: string;
  surgeon: string;
  followUpDate: string;
  drops: DropSchedule[];
  eyeShieldReminder: boolean;
  redFlagChecklist: RedFlagItem[];
  notes?: string;
};

export type DropSchedule = {
  name: string;
  frequency: string;
  duration: string;
  color: string;
};

export type RedFlagItem = {
  label: string;
  educated: boolean;
};

// Helper: days from today
function daysFromToday(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function daysAgo(days: number): string {
  return daysFromToday(-days);
}

function buildChecklist(overrides: Partial<Record<ChecklistKey, boolean>> = {}): ChecklistItem[] {
  const defaults: { key: ChecklistKey; label: string }[] = [
    { key: "transportationConfirmed", label: "Transportation confirmed" },
    { key: "preadmissionTestingComplete", label: "Preadmission testing / medical clearance complete" },
    { key: "medicationListReviewed", label: "Medication list reviewed" },
    { key: "allergiesRecorded", label: "Allergies recorded" },
    { key: "consentConfirmed", label: "Consent confirmed" },
    { key: "insuranceAuthConfirmed", label: "Insurance authorization confirmed" },
    { key: "preOpCallCompleted", label: "Pre-op phone call completed" },
    { key: "patientReceivedInstructions", label: "Patient received instructions" },
    { key: "interpreterNeeded", label: "Interpreter arranged (if needed)" },
    { key: "caregiverSupportConfirmed", label: "Caregiver support confirmed" },
  ];
  return defaults.map((d) => ({
    ...d,
    complete: overrides[d.key] ?? true,
  }));
}

export const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "Margaret T.",
    ageRange: "70–75",
    procedure: "Phacoemulsification with IOL implant",
    eye: "Right",
    surgeryDate: daysFromToday(3),
    surgeon: "Dr. Chen",
    column: "Not Ready",
    nextBestAction: "Confirm transportation — no ride arranged yet",
    checklist: buildChecklist({
      transportationConfirmed: false,
      preadmissionTestingComplete: false,
      preOpCallCompleted: false,
      insuranceAuthConfirmed: false,
    }),
    notes: "Patient lives alone. Interpreter not needed.",
  },
  {
    id: "P002",
    name: "Harold K.",
    ageRange: "65–70",
    procedure: "Phacoemulsification with IOL implant",
    eye: "Left",
    surgeryDate: daysFromToday(5),
    surgeon: "Dr. Patel",
    column: "Needs Review",
    nextBestAction: "Request medical clearance from PCP",
    checklist: buildChecklist({
      preadmissionTestingComplete: false,
      consentConfirmed: false,
    }),
  },
  {
    id: "P003",
    name: "Linda M.",
    ageRange: "60–65",
    procedure: "Femtosecond laser-assisted cataract surgery",
    eye: "Right",
    surgeryDate: daysFromToday(14),
    surgeon: "Dr. Chen",
    column: "Ready for Surgery",
    nextBestAction: "No action needed — all items complete",
    checklist: buildChecklist(),
  },
  {
    id: "P004",
    name: "Robert J.",
    ageRange: "75–80",
    procedure: "Phacoemulsification with premium toric IOL",
    eye: "Both",
    surgeryDate: daysFromToday(2),
    surgeon: "Dr. Nguyen",
    column: "Not Ready",
    nextBestAction: "Complete pre-op call and confirm caregiver",
    checklist: buildChecklist({
      transportationConfirmed: false,
      caregiverSupportConfirmed: false,
      preOpCallCompleted: false,
      patientReceivedInstructions: false,
      insuranceAuthConfirmed: false,
    }),
    notes: "Requires interpreter (Spanish). Surgery in 2 days — urgent.",
  },
  {
    id: "P005",
    name: "Dorothy A.",
    ageRange: "68–73",
    procedure: "Phacoemulsification with IOL implant",
    eye: "Left",
    surgeryDate: daysFromToday(10),
    surgeon: "Dr. Patel",
    column: "Needs Review",
    nextBestAction: "Confirm insurance authorization",
    checklist: buildChecklist({
      insuranceAuthConfirmed: false,
      preOpCallCompleted: false,
    }),
  },
  {
    id: "P006",
    name: "James W.",
    ageRange: "55–60",
    procedure: "Femtosecond laser-assisted cataract surgery",
    eye: "Right",
    surgeryDate: daysFromToday(21),
    surgeon: "Dr. Chen",
    column: "Ready for Surgery",
    nextBestAction: "No action needed — all items complete",
    checklist: buildChecklist(),
  },
  {
    id: "P007",
    name: "Patricia L.",
    ageRange: "80–85",
    procedure: "Phacoemulsification with IOL implant",
    eye: "Left",
    surgeryDate: daysFromToday(6),
    surgeon: "Dr. Nguyen",
    column: "Needs Review",
    nextBestAction: "Arrange interpreter (Mandarin) and call patient",
    checklist: buildChecklist({
      interpreterNeeded: false,
      preOpCallCompleted: false,
      patientReceivedInstructions: false,
    }),
    notes: "Mandarin interpreter required.",
  },
  {
    id: "P008",
    name: "Thomas B.",
    ageRange: "62–67",
    procedure: "Phacoemulsification with IOL implant",
    eye: "Right",
    surgeryDate: daysFromToday(18),
    surgeon: "Dr. Patel",
    column: "Ready for Surgery",
    nextBestAction: "No action needed — all items complete",
    checklist: buildChecklist(),
  },
  {
    id: "P009",
    name: "Barbara H.",
    ageRange: "72–77",
    procedure: "Phacoemulsification with premium multifocal IOL",
    eye: "Right",
    surgeryDate: daysFromToday(4),
    surgeon: "Dr. Chen",
    column: "Not Ready",
    nextBestAction: "Obtain signed consent and confirm ride",
    checklist: buildChecklist({
      consentConfirmed: false,
      transportationConfirmed: false,
      caregiverSupportConfirmed: false,
    }),
  },
  {
    id: "P010",
    name: "Charles R.",
    ageRange: "58–63",
    procedure: "Femtosecond laser-assisted cataract surgery",
    eye: "Left",
    surgeryDate: daysFromToday(30),
    surgeon: "Dr. Nguyen",
    column: "Needs Review",
    nextBestAction: "Complete medication review with pharmacist",
    checklist: buildChecklist({
      medicationListReviewed: false,
      insuranceAuthConfirmed: false,
    }),
  },
  {
    id: "P011",
    name: "Susan F.",
    ageRange: "65–70",
    procedure: "Phacoemulsification with IOL implant",
    eye: "Both",
    surgeryDate: daysFromToday(45),
    surgeon: "Dr. Patel",
    column: "Ready for Surgery",
    nextBestAction: "No action needed — all items complete",
    checklist: buildChecklist(),
  },
  {
    id: "P012",
    name: "William N.",
    ageRange: "78–83",
    procedure: "Phacoemulsification with IOL implant",
    eye: "Right",
    surgeryDate: daysFromToday(1),
    surgeon: "Dr. Chen",
    column: "Not Ready",
    nextBestAction: "URGENT: Surgery tomorrow — call patient immediately",
    checklist: buildChecklist({
      preOpCallCompleted: false,
      patientReceivedInstructions: false,
      transportationConfirmed: false,
      caregiverSupportConfirmed: false,
      consentConfirmed: false,
    }),
    notes: "Surgery tomorrow. Multiple items unresolved. Escalate.",
  },
  {
    id: "P013",
    name: "Helen C.",
    ageRange: "69–74",
    procedure: "Phacoemulsification with toric IOL",
    eye: "Left",
    surgeryDate: daysFromToday(12),
    surgeon: "Dr. Nguyen",
    column: "Needs Review",
    nextBestAction: "Verify allergy documentation in chart",
    checklist: buildChecklist({
      allergiesRecorded: false,
    }),
  },
];

const stdDrops: DropSchedule[] = [
  { name: "Prednisolone acetate 1%", frequency: "4x daily", duration: "4 weeks", color: "bg-blue-100 text-blue-800" },
  { name: "Ketorolac 0.5%", frequency: "4x daily", duration: "4 weeks", color: "bg-amber-100 text-amber-800" },
  { name: "Moxifloxacin 0.5%", frequency: "4x daily", duration: "1 week", color: "bg-green-100 text-green-800" },
];

const stdRedFlags: RedFlagItem[] = [
  { label: "Sudden severe eye pain", educated: true },
  { label: "Sudden vision loss or major worsening", educated: true },
  { label: "Increasing redness or irritation", educated: true },
  { label: "Significant eyelid swelling", educated: true },
  { label: "Sticky or purulent discharge", educated: true },
  { label: "New floaters or flashes of light", educated: true },
  { label: "Distorted or wavy vision", educated: true },
  { label: "Halos around lights (beyond expected glare)", educated: false },
];

export const mockPostOpPatients: PostOpPatient[] = [
  {
    id: "PO001",
    name: "Eleanor V.",
    ageRange: "71–76",
    procedure: "Phacoemulsification with IOL implant",
    eye: "Right",
    surgeryDate: daysAgo(3),
    surgeon: "Dr. Chen",
    followUpDate: daysFromToday(4),
    drops: stdDrops,
    eyeShieldReminder: true,
    redFlagChecklist: stdRedFlags,
    notes: "Routine recovery. Day 1 visit done.",
  },
  {
    id: "PO002",
    name: "Frank D.",
    ageRange: "66–71",
    procedure: "Phacoemulsification with toric IOL",
    eye: "Left",
    surgeryDate: daysAgo(7),
    surgeon: "Dr. Patel",
    followUpDate: daysFromToday(1),
    drops: stdDrops,
    eyeShieldReminder: false,
    redFlagChecklist: stdRedFlags.map((r) =>
      r.label === "Halos around lights (beyond expected glare)" ? { ...r, educated: true } : r
    ),
    notes: "Reported mild light sensitivity — normal post-op finding at day 7.",
  },
  {
    id: "PO003",
    name: "Alice P.",
    ageRange: "76–81",
    procedure: "Femtosecond laser-assisted cataract surgery",
    eye: "Right",
    surgeryDate: daysAgo(14),
    surgeon: "Dr. Nguyen",
    followUpDate: daysFromToday(14),
    drops: [
      { name: "Prednisolone acetate 1%", frequency: "2x daily", duration: "tapering", color: "bg-blue-100 text-blue-800" },
      { name: "Ketorolac 0.5%", frequency: "2x daily", duration: "tapering", color: "bg-amber-100 text-amber-800" },
    ],
    eyeShieldReminder: false,
    redFlagChecklist: stdRedFlags,
    notes: "Progressing well. Week 2 taper in progress.",
  },
  {
    id: "PO004",
    name: "George T.",
    ageRange: "63–68",
    procedure: "Phacoemulsification with multifocal IOL",
    eye: "Both",
    surgeryDate: daysAgo(1),
    surgeon: "Dr. Chen",
    followUpDate: daysFromToday(0),
    drops: stdDrops,
    eyeShieldReminder: true,
    redFlagChecklist: stdRedFlags,
    notes: "Day 1 post-op visit TODAY. Confirm drop compliance.",
  },
];

// Computed helpers

export function getMissingItems(patient: Patient): ChecklistItem[] {
  return patient.checklist.filter((c) => !c.complete);
}

export function getRiskLevel(patient: Patient): RiskLevel {
  const missing = getMissingItems(patient).length;
  const today = new Date();
  const surgery = new Date(patient.surgeryDate);
  const daysUntil = Math.ceil((surgery.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const urgentMissing =
    daysUntil <= 7 &&
    patient.checklist.some(
      (c) =>
        !c.complete &&
        (c.key === "transportationConfirmed" ||
          c.key === "consentConfirmed" ||
          c.key === "preadmissionTestingComplete")
    );

  if (missing >= 4 || urgentMissing) return "High";
  if (missing >= 2) return "Moderate";
  return "Low";
}

export function getDaysUntilSurgery(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const surgery = new Date(dateStr);
  surgery.setHours(0, 0, 0, 0);
  return Math.ceil((surgery.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatSurgeryDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
