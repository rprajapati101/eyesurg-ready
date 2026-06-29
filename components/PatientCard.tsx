import Link from "next/link";
import type { Patient } from "@/data/mockPatients";
import { getMissingItems, getRiskLevel, getDaysUntilSurgery, formatSurgeryDate } from "@/data/mockPatients";
import RiskBadge from "./RiskBadge";

export default function PatientCard({ patient }: { patient: Patient }) {
  const missing = getMissingItems(patient);
  const risk = getRiskLevel(patient);
  const daysUntil = getDaysUntilSurgery(patient.surgeryDate);
  const urgent = daysUntil <= 7 && daysUntil >= 0;

  return (
    <Link href={`/patients/${patient.id}`}>
      <div
        className={`bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer ${
          urgent && missing.length > 0 ? "border-red-300" : "border-gray-200"
        }`}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="font-semibold text-gray-900 text-sm">{patient.name}</p>
            <p className="text-xs text-gray-500">{patient.id} · Age {patient.ageRange}</p>
          </div>
          <RiskBadge level={risk} />
        </div>

        <div className="text-xs text-gray-600 mb-2 space-y-0.5">
          <p>
            <span className="font-medium">{patient.eye} eye</span> · {patient.procedure.split(" with ")[0]}
          </p>
          <p className={`font-medium ${urgent ? "text-red-600" : "text-gray-700"}`}>
            {formatSurgeryDate(patient.surgeryDate)}
            {urgent && daysUntil === 0
              ? " · TODAY"
              : urgent && daysUntil === 1
              ? " · TOMORROW"
              : urgent
              ? ` · ${daysUntil}d away`
              : ""}
          </p>
        </div>

        {missing.length > 0 ? (
          <div className="mt-2">
            <p className="text-xs text-red-600 font-medium mb-1">{missing.length} missing item{missing.length > 1 ? "s" : ""}:</p>
            <ul className="space-y-0.5">
              {missing.slice(0, 2).map((m) => (
                <li key={m.key} className="text-xs text-gray-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  {m.label}
                </li>
              ))}
              {missing.length > 2 && (
                <li className="text-xs text-gray-400">+{missing.length - 2} more…</li>
              )}
            </ul>
          </div>
        ) : (
          <p className="text-xs text-green-600 font-medium mt-2">✓ All items complete</p>
        )}

        <p className="text-xs text-blue-700 mt-2 italic truncate">{patient.nextBestAction}</p>
      </div>
    </Link>
  );
}
