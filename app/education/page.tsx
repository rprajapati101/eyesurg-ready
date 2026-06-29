import Disclaimer from "@/components/Disclaimer";

const recoverySteps = [
  {
    day: "Day of Surgery",
    items: [
      "Rest when you get home — you may feel drowsy from sedation",
      "A responsible adult must drive you home and stay with you",
      "Begin your eye drops as instructed — do not skip doses",
      "Wear your eye shield as directed",
      "Do not rub or press on the operated eye",
    ],
  },
  {
    day: "First Week",
    items: [
      "Use all prescribed eye drops on schedule",
      "Wear the eye shield while sleeping for the first week",
      "Avoid swimming, hot tubs, and dusty environments",
      "No strenuous activity or heavy lifting (over 10 lbs)",
      "Keep water and soap out of the eye",
      "Attend your 1-day and 1-week follow-up appointments",
      "Blurry vision, mild irritation, and light sensitivity are normal",
    ],
  },
  {
    day: "First Month",
    items: [
      "Continue tapering drops as directed by your surgeon",
      "Glasses or contact lenses may need updating after healing",
      "Vision will continue to improve — final result at 4–6 weeks",
      "Attend your 1-month follow-up appointment",
      "Resume normal activity as cleared by your surgeon",
    ],
  },
];

const redFlags = [
  {
    label: "Sudden severe eye pain",
    detail: "Sharp or intense pain that comes on suddenly — especially after the first day",
  },
  {
    label: "Sudden vision loss or significant worsening",
    detail: "Vision dramatically worse compared to the day after surgery",
  },
  {
    label: "Increasing redness",
    detail: "Eye gets more red over time rather than improving",
  },
  {
    label: "Significant eyelid swelling",
    detail: "Marked puffiness or swelling of the eyelid that is getting worse",
  },
  {
    label: "Sticky or purulent (pus-like) discharge",
    detail: "Yellow or green discharge from the eye — not just normal watering",
  },
  {
    label: "New flashes of light or floaters",
    detail: "Sudden onset of flashes, new floating spots, or a curtain/shadow in vision",
  },
  {
    label: "Distorted or wavy vision",
    detail: "Straight lines appear wavy or distorted",
  },
  {
    label: "Halos or glare that are worsening",
    detail: "Mild halos around lights are common early on — worsening halos are not",
  },
];

export default function EducationPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Patient Education</h1>
        <p className="text-gray-500 text-sm mt-1">Plain-language cataract surgery recovery information</p>
      </div>

      <Disclaimer />

      {/* Recovery timeline */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">What to Expect After Surgery</h2>
        <div className="space-y-6">
          {recoverySteps.map((phase) => (
            <div key={phase.day}>
              <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-2">{phase.day}</h3>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Red flags */}
      <div className="bg-white rounded-xl border border-red-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">!</span>
          <h2 className="text-lg font-semibold text-red-700">Warning Signs — Contact Us Immediately</h2>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-sm text-red-800 font-medium">
          If you experience any of the following symptoms, contact your surgical team right away or go to the nearest emergency room. Do not wait.
        </div>

        <div className="space-y-3">
          {redFlags.map((flag) => (
            <div key={flag.label} className="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
              <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✕</span>
              <div>
                <p className="font-semibold text-red-800 text-sm">{flag.label}</p>
                <p className="text-xs text-red-700 mt-0.5 opacity-90">{flag.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drop reminder */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h2 className="font-semibold text-blue-800 mb-2">Eye Drop Reminders</h2>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            Use drops exactly as prescribed — spacing and frequency matter
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            Wash hands before instilling drops
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            Wait 5 minutes between different types of drops
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            Do not discontinue drops early without asking your surgeon
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            If you miss a dose, use it as soon as you remember — do not double up
          </li>
        </ul>
      </div>

      {/* General restrictions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="font-semibold text-gray-800 mb-3">General Restrictions (First 4 Weeks)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "No swimming or hot tubs",
            "No rubbing or pressing the eye",
            "No heavy lifting (over 10 lbs)",
            "No strenuous exercise",
            "No dusty or dirty environments",
            "No eye makeup for 2 weeks",
            "Avoid getting soap or shampoo in the eye",
            "Do not drive until cleared by your surgeon",
          ].map((r) => (
            <div key={r} className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded px-3 py-2">
              <span className="text-red-400 font-bold flex-shrink-0">✕</span>
              {r}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-500">
        <p className="font-medium text-gray-600 mb-1">Important</p>
        <p>This educational content is for demonstration purposes only and is not a substitute for instructions provided by your surgeon or clinical care team. Always follow the specific instructions given to you at your surgical facility.</p>
      </div>
    </div>
  );
}
