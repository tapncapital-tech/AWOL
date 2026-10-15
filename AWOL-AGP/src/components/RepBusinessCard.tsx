"use client";

import React, { useEffect, useState } from "react";
import { RepProfile } from "@/lib/repRoster";
import { resolveAttributedRep } from "@/lib/repAttribution";
import { Phone, Mail } from "lucide-react";

interface RepBusinessCardProps {
  initialRep?: RepProfile;
  onRepChange?: (rep: RepProfile) => void;
  isScrolled?: boolean;
}

export function RepBusinessCard({ initialRep, onRepChange }: RepBusinessCardProps) {
  const [rep, setRep] = useState<RepProfile>(initialRep || resolveAttributedRep());

  useEffect(() => {
    const active = resolveAttributedRep();
    setRep(active);
    if (onRepChange) {
      onRepChange(active);
    }
  }, [onRepChange]);

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-2.5">
      <div className="relative rounded-2xl md:rounded-full border border-slate-200/90 bg-white/95 backdrop-blur-md shadow-[0_6px_30px_rgba(15,23,42,0.06)] flex flex-col md:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-2.5 sm:py-3 transition-all">
        {/* Left: Rep Avatar & Name */}
        <div className="flex items-center gap-3 min-w-0 self-start md:self-auto">
          {/* Avatar circle */}
          <div className="relative flex-shrink-0">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#0c2340] text-white flex items-center justify-center font-sans font-bold text-sm shadow-sm ring-2 ring-slate-100">
              {rep.avatar_initials}
            </div>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#14e7c7] border-2 border-white shadow-[0_0_8px_#14e7c7]" />
          </div>

          <div className="min-w-0">
            <div className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
              {rep.rep_name}
            </div>
            <div className="text-xs text-slate-500 font-medium whitespace-nowrap">
              {rep.rep_title}
            </div>
          </div>
        </div>

        {/* Right: Sleek Info Capsule */}
        <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 sm:gap-3 rounded-full bg-slate-100/90 border border-slate-200/60 px-4 py-1.5 text-xs sm:text-sm text-slate-700 font-medium self-stretch sm:self-auto justify-center sm:justify-end">
          <a
            href={`mailto:${rep.rep_email}`}
            className="hover:text-cyan-700 transition-colors"
          >
            Direct: <span className="font-semibold text-slate-900">{rep.rep_email}</span>
          </a>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <a
            href={`tel:${rep.rep_number.replace(/[^0-9+]/g, "")}`}
            className="hover:text-cyan-700 transition-colors font-semibold text-slate-900"
          >
            {rep.rep_number}
          </a>
        </div>
      </div>
    </div>
  );
}
