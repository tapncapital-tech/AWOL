"use client";

import React, { useEffect, useState } from "react";
import { RepProfile } from "@/lib/repRoster";
import { resolveAttributedRep } from "@/lib/repAttribution";
import { Phone, Mail } from "lucide-react";

interface SleekBusinessCardProps {
  initialRep?: RepProfile;
  onRepChange?: (rep: RepProfile) => void;
}

export function SleekBusinessCard({ initialRep, onRepChange }: SleekBusinessCardProps) {
  const [rep, setRep] = useState<RepProfile>(initialRep || resolveAttributedRep());

  useEffect(() => {
    const active = resolveAttributedRep();
    setRep(active);
    if (onRepChange) {
      onRepChange(active);
    }
  }, [onRepChange]);

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-2">
      <div className="relative rounded-2xl border border-sky-100 bg-white/95 backdrop-blur-md shadow-[0_4px_25px_rgba(2,132,199,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-2 sm:gap-3 p-3 sm:p-3.5 transition-all">
        {/* Left: Rep Identity & Sleek Value Proposition */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Avatar Square with glowing status dot */}
          <div className="relative flex-shrink-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-[#0c2340] to-[#1d4ed8] text-white flex items-center justify-center font-sans font-bold text-sm shadow-sm">
              {rep.avatar_initials}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#14e7c7] border-2 border-white shadow-[0_0_8px_#14e7c7]" />
          </div>

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                {rep.rep_name}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-sky-800 bg-sky-50 border border-sky-200/60 px-2 py-0.5 rounded-full">
                {rep.rep_title}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-normal text-slate-600 leading-snug break-words">
              I build custom AI agents, web apps, and automated business solutions engineered to scale your operations.
            </p>
          </div>
        </div>

        {/* Right: Direct Rep Contact */}
        <div className="flex items-center flex-wrap sm:flex-nowrap gap-3 sm:gap-4 text-xs font-sans self-stretch md:self-auto border-t md:border-t-0 md:border-l border-slate-100 pt-2 md:pt-0 md:pl-5 justify-between sm:justify-end flex-shrink-0">
          <a
            href={`tel:${rep.rep_number.replace(/[^0-9+]/g, "")}`}
            className="inline-flex items-center gap-1.5 text-slate-800 hover:text-blue-600 font-semibold transition-colors whitespace-nowrap"
          >
            <div className="h-6 w-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Phone className="h-3.5 w-3.5" />
            </div>
            <span>{rep.rep_number}</span>
          </a>
          <span className="hidden sm:inline text-slate-200">|</span>
          <a
            href={`mailto:${rep.rep_email}`}
            className="inline-flex items-center gap-1.5 text-slate-800 hover:text-cyan-600 font-semibold transition-colors whitespace-nowrap"
          >
            <div className="h-6 w-6 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Mail className="h-3.5 w-3.5" />
            </div>
            <span>{rep.rep_email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
