import Link from "next/link";
import { notFound } from "next/navigation";
import { mockPatients, getMissingItems, getRiskLevel, getDaysUntilSurgery, formatSurgeryDate } from "@/data/mockPatients";
import RiskBadge from "@/components/RiskBadge";
import Disclaimer from "@/components/Disclaimer";

export function generateStaticParams() {
  return mockPatients.map((p) => ({ id: p.id }));
}

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const patient = mockPatients.find((p) => p.id === params.id);
  if (!patient) notFound();

  const missing = getMissingItems(patient);
  const risk = getRiskLevel(patient);
  const daysUntil = getDaysUntilSurgery(patient.surgeryDate);
  const complete = patient.checklist.filter((c) => c.complete);
  const pct = Math.round((complete.length / patient.checklist.length) * 100);

  const riskColors = {
    Low: "bg-green-50 border-green-200 text-green-800",
    Moderate: "bg-amber-50 border-amber-200 text-amber-800",
    High: "bg-red-50 border-red-200 text-red-800",
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/patients" className="hover:text-blue-600">Patient Board</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{patient.name}</span>
      </div>

      <Disclaimer />

      {/* Header card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-gray-900">{patient.name}</h1>
              <RiskBadge level={risk} />
            </div>
            <p className="text-sm text-gray-500">{patient.id} · Age range {patient.ageRange}</p>
          </div>
          <div className="text-right">
            <p className={`text-sm font-semibold ${daysUntil <= 7 && daysUntil >= 0 ? "text-red-600" : "text-gray-700"}`}>
              {daysUntil < 0
                ? `Surgery was ${Math.abs(daysUntil)}d ago`
                : daysUntil === 0
                ? "Surgery TODAY"
                : daysUntil === 1
                ? "Surgery TOMORROW"
                : `Surgery in ${daysUntil} days`}
            </p>
            <p className="text-sm text-gray-500">{formatSurgeryDate(patient.surgeryDate)}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          {[
            { label: "Procedure", value: patient.procedure },
            { label: "Eye", value: `${patient.eye} eye` },
            { label: "Surgeon", value: patient.surgeon },
            { label: "Column", value: patient.column },
          ].map((f) => (
            <div key={f.label} className="bg-gray-50 rounded-lg px-3 py-2">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{f.label}</p>
              <p className="font-medium text-gray-800 text-sm leading-tight">{f.value}</p>
            </div>
          ))}
        </div>

        {patient.notes && (
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-sm text-blue-800">
            <span className="font-medium">Note: </span>{patient.notes}
          </div>
        )}
      </div>

      {/* Workflow risk score */}
      <div className={`rounded-xl border p-4 ${riskColors[risk]}`}>
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-semibold text-sm">Workflow Prioritization Score</h2>
          <span className="font-bold">{risk} Priority</span>
        </div>
        <p className="text-xs opacity-80 mb-2">
          {risk === "Low" && "0–1 items missing. Patient is on track."}
          {risk === "Moderate" && "2–3 items missing. Review and resolve soon."}
          {risk === "High" && "4+ items missing or urgent surgery with unresolved barriers."}
        </p>
        <p className="text-xs opacity-60">
          This is a workflow prioritization score for administrative coordination — not a medical or clinical risk assessment.
        </p>
      </div>

      {/* Next best action */}
      <div className="bg-blue-600 text-white rounded-xl p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide opacity-75 mb-1">Next Best Admin Action</p>
        <p className="font-semibold text-base">{patient.nextBestAction}</p>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Readiness Checklist</h2>
          <div className="flex items-center gap-3">
            <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{pct}%</span>
          </div>
        </div>

        <div className="space-y-2">
          {patient.checklist.map((item) => (
            <div
              key={item.key}
              className={`flex items-center gap-3 p-3 rounded-lg border text-sm ${
                item.complete
                  ? "bg-green-50 border-green-100 text-green-800"
                  : "bg-red-50 border-red-100 text-red-800"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  item.complete ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
              >
                {item.complete ? "✓" : "✗"}
              </div>
              <span className="font-medium">{item.label}</span>
              {!item.complete && (
                <span className="ml-auto text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-semibold">
                  Missing
                </span>
              )}
            </div>
          ))}
        </div>

        {missing.length === 0 && (
          <div className="mt-4 text-center text-green-700 font-semibold text-sm py-2 bg-green-50 rounded-lg">
            ✓ All readiness items complete — patient is ready for surgery coordination
          </div>
        )}
      </div>

      {/* Missing items summary */}
      {missing.length > 0 && (
        <div className="bg-white rounded-xl border border-red-200 shadow-sm p-5">
          <h2 className="text-base font-semibold text-red-700 mb-3">Outstanding Items ({missing.length})</h2>
          <ul className="space-y-2">
            {missing.map((m) => (
              <li key={m.key} className="flex items-center gap-3 text-sm text-gray-700">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs flex-shrink-0 font-bold">
                  !
                </span>
                {m.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-3 pb-4">
        <Link
          href="/patients"
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
        >
          ← Back to Board
        </Link>
        <Link
          href="/education"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          View Patient Education →
        </Link>
      </div>
    </div>
  );
}
