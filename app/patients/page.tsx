"use client";
import { useState, useMemo } from "react";
import { mockPatients, getMissingItems, getRiskLevel, getDaysUntilSurgery } from "@/data/mockPatients";
import type { KanbanColumn } from "@/data/mockPatients";
import PatientCard from "@/components/PatientCard";
import Disclaimer from "@/components/Disclaimer";

const COLUMNS: KanbanColumn[] = ["Not Ready", "Needs Review", "Ready for Surgery", "Post-Op Follow-Up"];

const columnStyles: Record<KanbanColumn, { header: string; dot: string }> = {
  "Not Ready": { header: "bg-red-50 border-red-200 text-red-800", dot: "bg-red-500" },
  "Needs Review": { header: "bg-amber-50 border-amber-200 text-amber-800", dot: "bg-amber-400" },
  "Ready for Surgery": { header: "bg-green-50 border-green-200 text-green-800", dot: "bg-green-500" },
  "Post-Op Follow-Up": { header: "bg-purple-50 border-purple-200 text-purple-800", dot: "bg-purple-500" },
};

type Filter = "all" | "within7" | "missingTransport" | "missingClearance" | "missingCall";

const filterLabels: Record<Filter, string> = {
  all: "All Patients",
  within7: "Surgery ≤ 7 Days",
  missingTransport: "Missing Transport",
  missingClearance: "Missing Clearance",
  missingCall: "Missing Pre-Op Call",
};

export default function PatientsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    return mockPatients.filter((p) => {
      if (activeFilter === "within7") return getDaysUntilSurgery(p.surgeryDate) <= 7 && getDaysUntilSurgery(p.surgeryDate) >= 0;
      if (activeFilter === "missingTransport") return getMissingItems(p).some((m) => m.key === "transportationConfirmed");
      if (activeFilter === "missingClearance") return getMissingItems(p).some((m) => m.key === "preadmissionTestingComplete");
      if (activeFilter === "missingCall") return getMissingItems(p).some((m) => m.key === "preOpCallCompleted");
      return true;
    });
  }, [activeFilter]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Patient Readiness Board</h1>
        <p className="text-gray-500 text-sm mt-1">Kanban view of surgical workflow readiness</p>
      </div>

      <Disclaimer />

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(filterLabels) as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`text-sm px-3 py-1.5 rounded-full border font-medium transition-colors ${
              activeFilter === f
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {filterLabels[f]}
            {f !== "all" && (
              <span className="ml-1.5 text-xs opacity-75">
                (
                {mockPatients.filter((p) => {
                  if (f === "within7") return getDaysUntilSurgery(p.surgeryDate) <= 7 && getDaysUntilSurgery(p.surgeryDate) >= 0;
                  if (f === "missingTransport") return getMissingItems(p).some((m) => m.key === "transportationConfirmed");
                  if (f === "missingClearance") return getMissingItems(p).some((m) => m.key === "preadmissionTestingComplete");
                  if (f === "missingCall") return getMissingItems(p).some((m) => m.key === "preOpCallCompleted");
                  return false;
                }).length}
                )
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Kanban board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const colPatients = filtered.filter((p) => p.column === col);
          const style = columnStyles[col];
          return (
            <div key={col} className="flex flex-col gap-3">
              <div className={`rounded-lg border px-3 py-2 flex items-center gap-2 ${style.header}`}>
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${style.dot}`} />
                <span className="font-semibold text-sm">{col}</span>
                <span className="ml-auto text-xs font-medium opacity-70">{colPatients.length}</span>
              </div>
              {colPatients.length === 0 ? (
                <div className="bg-white border border-dashed border-gray-200 rounded-lg p-4 text-center text-sm text-gray-400">
                  No patients
                </div>
              ) : (
                colPatients
                  .sort((a, b) => {
                    const riskOrder = { High: 0, Moderate: 1, Low: 2 };
                    return riskOrder[getRiskLevel(a)] - riskOrder[getRiskLevel(b)];
                  })
                  .map((p) => <PatientCard key={p.id} patient={p} />)
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
