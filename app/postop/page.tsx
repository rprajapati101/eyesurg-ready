import { mockPostOpPatients, getDaysUntilSurgery, formatSurgeryDate } from "@/data/mockPatients";
import Disclaimer from "@/components/Disclaimer";

export default function PostOpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Post-Op Tracker</h1>
        <p className="text-gray-500 text-sm mt-1">Drop schedules, follow-up reminders, and red-flag education status</p>
      </div>

      <Disclaimer />

      <div className="space-y-6">
        {mockPostOpPatients.map((patient) => {
          const daysToFollowUp = getDaysUntilSurgery(patient.followUpDate);
          const daysSinceSurgery = -getDaysUntilSurgery(patient.surgeryDate);
          const followUpUrgent = daysToFollowUp >= 0 && daysToFollowUp <= 1;
          const notEducated = patient.redFlagChecklist.filter((r) => !r.educated);

          return (
            <div key={patient.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Patient header */}
              <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-gray-900">{patient.name}</h2>
                  <p className="text-sm text-gray-500">
                    {patient.id} · Age {patient.ageRange} · {patient.eye} eye · {patient.procedure.split(" with ")[0]}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Surgery: {formatSurgeryDate(patient.surgeryDate)} ({daysSinceSurgery} day{daysSinceSurgery !== 1 ? "s" : ""} ago) · {patient.surgeon}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Follow-Up</p>
                  <p className={`font-semibold text-sm ${followUpUrgent ? "text-red-600" : "text-gray-800"}`}>
                    {daysToFollowUp === 0
                      ? "TODAY"
                      : daysToFollowUp === 1
                      ? "Tomorrow"
                      : daysToFollowUp < 0
                      ? `${Math.abs(daysToFollowUp)}d overdue`
                      : `In ${daysToFollowUp} days`}
                  </p>
                  <p className="text-xs text-gray-400">{formatSurgeryDate(patient.followUpDate)}</p>
                </div>
              </div>

              <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Drop schedule */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Drop Schedule</h3>
                  <div className="space-y-2">
                    {patient.drops.map((drop) => (
                      <div key={drop.name} className={`rounded-lg px-3 py-2 text-xs ${drop.color}`}>
                        <p className="font-semibold">{drop.name}</p>
                        <p className="opacity-80 mt-0.5">{drop.frequency} · {drop.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Eye shield & notes */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Reminders</h3>
                  <div className="space-y-2">
                    <div className={`rounded-lg px-3 py-2 text-xs border ${patient.eyeShieldReminder ? "bg-blue-50 border-blue-200 text-blue-800" : "bg-gray-50 border-gray-200 text-gray-500"}`}>
                      <span className="font-semibold">Eye shield at night: </span>
                      {patient.eyeShieldReminder ? "Required — reinforce at visit" : "No longer required"}
                    </div>
                    <div className={`rounded-lg px-3 py-2 text-xs border ${followUpUrgent ? "bg-red-50 border-red-200 text-red-700" : "bg-gray-50 border-gray-200 text-gray-600"}`}>
                      <span className="font-semibold">Next visit: </span>
                      {daysToFollowUp === 0 ? "TODAY" : daysToFollowUp === 1 ? "Tomorrow" : `${daysToFollowUp}d`}
                    </div>
                    {patient.notes && (
                      <div className="rounded-lg px-3 py-2 text-xs bg-yellow-50 border border-yellow-200 text-yellow-800">
                        {patient.notes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Red flag education */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Red-Flag Education</h3>
                  <div className="space-y-1">
                    {patient.redFlagChecklist.map((flag) => (
                      <div
                        key={flag.label}
                        className={`flex items-center gap-2 text-xs px-2 py-1.5 rounded ${
                          flag.educated ? "text-green-700" : "text-red-600 bg-red-50"
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${flag.educated ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                          {flag.educated ? "✓" : "!"}
                        </span>
                        {flag.label}
                      </div>
                    ))}
                  </div>
                  {notEducated.length > 0 && (
                    <p className="text-xs text-red-600 font-medium mt-2">
                      {notEducated.length} item{notEducated.length > 1 ? "s" : ""} not yet covered
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <p className="font-semibold mb-1">Clinical Note</p>
        <p>All drop schedules, follow-up intervals, and red-flag criteria shown here are for demonstration only. Actual post-operative instructions are determined by the operating surgeon and clinical team.</p>
      </div>
    </div>
  );
}
