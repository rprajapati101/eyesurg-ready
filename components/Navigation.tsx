"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/patients", label: "Patient Board" },
  { href: "/postop", label: "Post-Op Tracker" },
  { href: "/education", label: "Patient Education" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
              ES
            </div>
            <span className="font-semibold text-lg tracking-tight">EyeSurg Ready</span>
            <span className="hidden sm:inline text-blue-300 text-xs border border-blue-600 rounded px-2 py-0.5">
              Demo
            </span>
          </div>
          <div className="flex gap-1 overflow-x-auto">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 rounded text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href))
                    ? "bg-blue-600 text-white"
                    : "text-blue-100 hover:bg-blue-700 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
