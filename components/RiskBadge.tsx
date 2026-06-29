import type { RiskLevel } from "@/data/mockPatients";

export default function RiskBadge({ level }: { level: RiskLevel }) {
  const styles: Record<RiskLevel, string> = {
    Low: "bg-green-100 text-green-800 border-green-200",
    Moderate: "bg-amber-100 text-amber-800 border-amber-200",
    High: "bg-red-100 text-red-800 border-red-200",
  };
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded border ${styles[level]}`}>
      {level}
    </span>
  );
}
