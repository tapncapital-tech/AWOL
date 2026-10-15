"use client";

import React from "react";
import { Terminal, Cpu, Truck, Sparkles } from "lucide-react";
import { DemoMode } from "./DemoSelector";

interface SleekDemoSelectorProps {
  activeDemo: DemoMode;
  onSelectDemo: (demo: DemoMode) => void;
}

export function SleekDemoSelector({ activeDemo, onSelectDemo }: SleekDemoSelectorProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-2 pb-1">
      <div className="rounded-2xl border border-sky-100 bg-white/90 backdrop-blur-md p-2.5 sm:p-3 shadow-[0_4px_20px_rgba(2,132,199,0.05)] flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Header Label */}
        <div className="flex items-center gap-2 px-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#14e7c7] shadow-[0_0_8px_#14e7c7] inline-block" />
          <span className="text-xs sm:text-sm font-bold tracking-wide uppercase text-slate-800">
            SELECT DEMONSTRATION LAYER:
          </span>
        </div>

        {/* Unified Segmented Options Bar */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-50 border border-slate-200/60 w-full md:w-auto justify-center flex-wrap sm:flex-nowrap">
          {/* Demo 1: HVAC (Default / Live) */}
          <button
            onClick={() => onSelectDemo("hvac")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeDemo === "hvac"
                ? "bg-[#0c2340] text-white shadow-md shadow-blue-950/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            <Terminal className="h-3.5 w-3.5 text-[#14e7c7]" />
            <span>HVAC Agent</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                activeDemo === "hvac"
                  ? "bg-[#14e7c7] text-[#05192d] shadow-[0_0_8px_rgba(20,231,199,0.5)]"
                  : "bg-cyan-50 text-cyan-700"
              }`}
            >
              LIVE
            </span>
          </button>

          {/* Demo 2: SyncGM */}
          <button
            onClick={() => onSelectDemo("syncgm")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeDemo === "syncgm"
                ? "bg-[#0c2340] text-white shadow-md shadow-blue-950/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            <Cpu className="h-3.5 w-3.5 text-sky-400" />
            <span>SyncGM</span>
          </button>
        </div>
      </div>
    </div>
  );
}
