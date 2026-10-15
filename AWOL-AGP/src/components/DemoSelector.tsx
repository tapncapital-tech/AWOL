"use client";

import React from "react";
import { Terminal, Cpu, Truck, Sparkles } from "lucide-react";

export type DemoMode = "hvac" | "syncgm";

interface DemoSelectorProps {
  activeDemo: DemoMode;
  onSelectDemo: (demo: DemoMode) => void;
}

export function DemoSelector({ activeDemo, onSelectDemo }: DemoSelectorProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-1 pb-1 flex justify-center">
      {/* Unified Segmented Options Bar */}
      <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-slate-100/90 border border-slate-200/80 shadow-xs">
          {/* Demo 1: HVAC Agent */}
          <button
            onClick={() => onSelectDemo("hvac")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeDemo === "hvac"
                ? "bg-[#0c2340] text-white shadow-md shadow-slate-950/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            <Terminal className="h-4 w-4 text-[#14e7c7] flex-shrink-0" />
            <span>HVAC Agent</span>
            <span
              className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-sans font-extrabold uppercase tracking-wide transition-all ${
                activeDemo === "hvac"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </button>

          {/* Demo 2: SyncGM */}
          <button
            onClick={() => onSelectDemo("syncgm")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeDemo === "syncgm"
                ? "bg-[#0c2340] text-white shadow-md shadow-slate-950/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            <Cpu
              className={`h-4 w-4 transition-all flex-shrink-0 ${
                activeDemo === "syncgm"
                  ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                  : "text-emerald-600"
              }`}
            />
            <span>SyncGM</span>
          </button>
        </div>
      </div>
    );
  }
