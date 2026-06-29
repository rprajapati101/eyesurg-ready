import Link from "next/link";

const demonstrates = [
  {
    title: "Clinical Workflow Thinking",
    description:
      "The system models a real administrative coordination gap in ophthalmology: surgical readiness tracking for cataract surgery. It reflects the multi-step pre-op clearance process, the day-of logistics that frequently cause cancellations, and the post-op adherence challenges that impact outcomes.",
    icon: "🔄",
  },
  {
    title: "Ophthalmology Operations Awareness",
    description:
      "Content is grounded in cataract surgery care pathways — including the specific pre-op steps (PAT, consent, insurance auth), the typical drop regimen structure, and post-op red flags relevant to complications like endophthalmitis, TASS, and retinal detachment.",
    icon: "👁",
  },
  {
    title: "Safe Healthcare Software Boundaries",
    description:
      "The application is deliberately scoped to administrative workflow coordination only. It uses a 'workflow prioritization score' rather than a clinical risk score, avoids any diagnosis or treatment language, and includes clear disclaimers throughout.",
    icon: "🛡",
  },
  {
    title: "Human-Centered Design for Surgical Coordination",
    description:
      "The UX is designed around the tasks of clinical support staff: quickly identifying patients at risk of day-of cancellation, surfacing the single most important next action per patient, and providing post-op staff with an at-a-glance view of drop schedules and follow-up urgency.",
    icon: "🧑‍⚕️",
  },
];

const techStack = [
  { label: "Framework", value: "Next.js 15 (App Router)" },
  { label: "Language", value: "TypeScript" },
  { label: "Styling", value: "Tailwind CSS" },
  { label: "Data", value: "Local mock data — no database" },
  { label: "Auth", value: "None (demo only)" },
  { label: "Backend", value: "None (static rendering)" },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">About EyeSurg Ready</h1>
        <p className="text-gray-500 text-sm mt-1">Project background and what it demonstrates</p>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-xl px-5 py-4">
        <p className="font-bold text-amber-800 text-sm mb-1">Educational Prototype Disclaimer</p>
        <p className="text-amber-800 text-sm">
          This is an educational prototype using mock data. It is not medical software and should not be used for patient care. All patient names, dates, and clinical details are entirely fictional.
        </p>
      </div>

      {/* Problem statement */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Problem Statement</h2>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>
            Cataract surgery is one of the most common and impactful elective procedures in ophthalmology — yet it is also prone to preventable day-of cancellations and post-operative adherence failures.
          </p>
          <p>
            Common causes of cancellation include missing transportation, incomplete medical clearance, unsigned consent, unresolved insurance authorization, and patients who were never reached by phone before surgery. These are not clinical failures — they are coordination failures.
          </p>
          <p>
            On the post-op side, patients — often elderly with low health literacy — struggle to maintain complex multi-drop regimens, remember follow-up appointments, and recognize red-flag symptoms that require urgent attention.
          </p>
          <p>
            EyeSurg Ready demonstrates what a purpose-built administrative coordination tool for a cataract surgery program might look like: surfacing the right information to the right staff member at the right time, without overstepping into clinical decision-making.
          </p>
        </div>
      </div>

      {/* What this project demonstrates */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">What This Project Demonstrates</h2>
        <div className="space-y-4">
          {demonstrates.map((d) => (
            <div key={d.title} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl flex-shrink-0">{d.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{d.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{d.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {techStack.map((t) => (
            <div key={t.label} className="bg-gray-50 rounded-lg px-3 py-2">
              <p className="text-xs text-gray-400 uppercase tracking-wide">{t.label}</p>
              <p className="text-sm font-medium text-gray-800 mt-0.5">{t.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scope boundaries */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Intentional Scope Boundaries</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            ["✗ No diagnosis or clinical assessment", "The checklist is administrative, not clinical"],
            ["✗ No treatment recommendations", "Drop schedules shown are illustrative only"],
            ["✗ No real patient data", "All data is mock/generated"],
            ["✗ No medical risk scoring", "Score reflects workflow readiness only"],
            ["✓ Clear disclaimers throughout", "Every page communicates demo status"],
            ["✓ Plain-language education only", "Education is general, not prescriptive"],
          ].map(([label, detail]) => (
            <div key={label} className="text-sm bg-gray-50 rounded-lg px-3 py-2">
              <p className="font-medium text-gray-800">{label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Future improvements */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Potential Future Improvements</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          {[
            "Role-based access (scheduler, nurse, coordinator views)",
            "EHR integration via FHIR for real workflow data",
            "SMS/email reminders to patients for pre-op calls",
            "Surgeon-specific dashboards and case volumes",
            "Multi-facility / multi-OR scheduling coordination",
            "Spanish, Mandarin, and other language support",
            "Mobile-optimized view for staff rounding",
            "Audit log for checklist completions and timestamps",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-3 pb-4">
        <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
          ← Back to Dashboard
        </Link>
        <Link href="/patients" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
          View Patient Board
        </Link>
      </div>
    </div>
  );
}
