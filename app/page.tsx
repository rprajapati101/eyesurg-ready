import Link from "next/link";
import { mockPatients, mockPostOpPatients, getMissingItems, getRiskLevel, getDaysUntilSurgery } from "@/data/mockPatients";
import Disclaimer from "@/components/Disclaimer";

export default function DashboardPage() {
  const total = mockPatients.length;
  const ready = mockPatients.filter((p) => p.column === "Ready for Surgery").length;
  const needsReview = mockPatients.filter((p) => p.column === "Needs Review").length;
  const notReady = mockPatients.filter((p) => p.column === "Not Ready").length;
  const highRisk = mockPatients.filter((p) => getRiskLevel(p) === "High").length;
  const postOpDue = mockPostOpPatients.filter((p) => {
    const days = getDaysUntilSurgery(p.followUpDate);
    return days >= 0 && days <= 3;
  }).length;

  const surgeryWithin7 = mockPatients.filter(
    (p) => getDaysUntilSurgery(p.surgeryDate) <= 7 && getDaysUntilSurgery(p.surgeryDate) >= 0
  );

  // Readiness breakdown for bar chart (native)
  const breakdown = [
    { label: "Ready", count: ready, color: "bg-green-500", textColor: "text-green-700" },
    { label: "Needs Review", count: needsReview, color: "bg-amber-400", textColor: "text-amber-700" },
    { label: "Not Ready", count: notReady, color: "bg-red-500", textColor: "text-red-700" },
  ];
  const maxCount = Math.max(...breakdown.map((b) => b.count));

  // Missing item frequency
  const missingFreq: Record<string, number> = {};
  mockPatients.forEach((p) => {
    getMissingItems(p).forEach((m) => {
      missingFreq[m.label] = (missingFreq[m.label] ?? 0) + 1;
    });
  });
  const topMissing = Object.entries(missingFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const summaryCards = [
    {
      label: "Total Scheduled",
      value: total,
      sub: "upcoming surgeries",
      color: "bg-blue-600",
      link: "/patients",
    },
    {
      label: "Ready",
      value: ready,
      sub: "all items complete",
      color: "bg-green-600",
      link: "/patients",
    },
    {
      label: "Needs Review",
      value: needsReview,
      sub: "1–3 items missing",
      color: "bg-amber-500",
      link: "/patients",
    },
    {
      label: "High Workflow Risk",
      value: highRisk,
      sub: "4+ items or urgent",
      color: "bg-red-600",
      link: "/patients",
    },
    {
      label: "Post-Op Follow-Ups",
      value: postOpDue,
      sub: "due within 3 days",
      color: "bg-purple-600",
      link: "/postop",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Surgical Readiness Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Cataract surgery coordination — workflow overview</p>
        </div>
        <Link
          href="/patients"
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View All Patients →
        </Link>
      </div>

      <Disclaimer />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {summaryCards.map((card) => (
          <Link key={card.label} href={card.link}>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className={`w-8 h-1 rounded-full ${card.color} mb-3`} />
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm font-medium text-gray-700 mt-0.5">{card.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Readiness bar chart */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Readiness Breakdown</h2>
          <div className="space-y-3">
            {breakdown.map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className={`font-medium ${b.textColor}`}>{b.label}</span>
                  <span className="text-gray-600">{b.count} patients</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${b.color} rounded-full transition-all`}
                    style={{ width: maxCount > 0 ? `${(b.count / maxCount) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Workflow prioritization score reflects administrative readiness, not clinical risk.
            </p>
          </div>
        </div>

        {/* Top missing items */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Most Common Missing Items</h2>
          {topMissing.length > 0 ? (
            <div className="space-y-2">
              {topMissing.map(([label, count]) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                    <span className="text-gray-700">{label}</span>
                  </div>
                  <span className="font-semibold text-red-600 ml-2">{count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No missing items — all patients ready!</p>
          )}
        </div>
      </div>

      {/* Urgent patients */}
      {surgeryWithin7.length > 0 && (
        <div className="bg-white rounded-xl border border-red-200 shadow-sm p-5">
          <h2 className="text-base font-semibold text-red-700 mb-3">
            ⚠ Surgery Within 7 Days ({surgeryWithin7.length} patients)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {surgeryWithin7.map((p) => {
              const missing = getMissingItems(p);
              const risk = getRiskLevel(p);
              const days = getDaysUntilSurgery(p.surgeryDate);
              return (
                <Link key={p.id} href={`/patients/${p.id}`}>
                  <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm text-gray-900">{p.name}</span>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded font-semibold ${
                          risk === "High"
                            ? "bg-red-100 text-red-700"
                            : risk === "Moderate"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {risk}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {days === 0 ? "TODAY" : days === 1 ? "Tomorrow" : `In ${days} days`} · {p.eye} eye
                    </p>
                    <p className="text-xs mt-1">
                      {missing.length === 0 ? (
                        <span className="text-green-600">✓ Ready</span>
                      ) : (
                        <span className="text-red-600">{missing.length} item{missing.length > 1 ? "s" : ""} missing</span>
                      )}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
