"use client";

import React, { useState } from "react";
import { RepBusinessCard } from "@/components/RepBusinessCard";
import { DemoSelector, DemoMode } from "@/components/DemoSelector";
import { RetroTerminal } from "@/components/RetroTerminal";
import { VoiceVisualizer } from "@/components/VoiceVisualizer";
import { TelephonyModal } from "@/components/TelephonyModal";
import { SyncGMPreview } from "@/components/SyncGMPreview";
import { RoiDashboard } from "@/components/RoiDashboard";
import { RepProfile, REP_ROSTER, DEFAULT_REP_ID } from "@/lib/repRoster";
import { PhoneCall, Radio, Terminal as TerminalIcon, ChevronRight } from "lucide-react";

export default function Home() {
  const [activeRep, setActiveRep] = useState<RepProfile>(REP_ROSTER[DEFAULT_REP_ID]);
  const [activeDemo, setActiveDemo] = useState<DemoMode>("hvac");
  const [mode, setMode] = useState<"terminal" | "voice">("terminal");
  const [isTelephonyOpen, setIsTelephonyOpen] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | undefined>(undefined);

  const emergencyScenarios = [
    "Emergency AC repair",
    "Low Air Flow",
    "HVAC system leaking fluid",
  ];

  const handleScenarioClick = (scenario: string) => {
    setActiveDemo("hvac");
    setMode("terminal");
    setSelectedScenario(scenario);
  };

  return (
    <div className="min-h-screen text-slate-900 flex flex-col justify-between selection:bg-[#14e7c7] selection:text-[#071322]">
      {/* Upper Navigation & Demonstration Layer */}
      <div className="relative w-full">
        {/* 1. Persistent Top Floating Business Info Bar */}
        <header className="sticky top-0 z-50 w-full bg-[#f8f7f2]/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
          <RepBusinessCard
            initialRep={activeRep}
            onRepChange={(rep) => setActiveRep(rep)}
          />
        </header>

        {/* 2. Demonstration System Switcher (HVAC Agent vs SyncGM) */}
        <div className="w-full pt-2 pb-1">
          <DemoSelector
            activeDemo={activeDemo}
            onSelectDemo={(demo) => setActiveDemo(demo)}
          />
        </div>
      </div>

      {/* 3. Main Demonstration Stage */}
      <main className="flex-1 w-full mx-auto">
        {/* Layer 1: HVAC Agent Side-by-Side (Desktop) & Clean Stack (Mobile) */}
        {activeDemo === "hvac" && (
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Heading, Stat, 3 Scenario Pills & Call Voice Dispatch Button */}
              <div className="lg:col-span-5 flex flex-col space-y-5 sm:space-y-6 text-left">
                <div className="space-y-2">
                  <span className="text-sm sm:text-base font-black tracking-wider uppercase text-slate-900">
                    COMMERCIAL &amp; RESIDENTIAL HVAC
                  </span>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0c2340] tracking-tight leading-[1.08] break-words">
                    24/7 Scheduler &amp; Dispatch
                  </h1>
                </div>

                <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
                  78% of customers hire the first HVAC company that answers. Our auto AI dispatcher answers on the 1st ring and books on-call technicians 24/7.
                </p>

                {/* Clean, Full-Width Scenario Prompts (Zero Truncation, Smooth Flow) */}
                <div className="space-y-2 pt-1 w-full max-w-xl">
                  {emergencyScenarios.map((scenario) => (
                    <button
                      key={scenario}
                      onClick={() => handleScenarioClick(scenario)}
                      className="w-full group flex items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white/95 hover:bg-slate-50 px-4 py-3 text-xs sm:text-sm font-bold text-slate-800 shadow-xs hover:shadow-md hover:border-[#14e7c7] transition-all cursor-pointer text-left"
                    >
                      <span className="font-semibold text-slate-900 group-hover:text-cyan-900 transition-colors">
                        {scenario}
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#14e7c7] text-[#071322] shadow-[0_0_12px_rgba(20,231,199,0.35)] group-hover:scale-110 transition-transform flex-shrink-0">
                        <ChevronRight className="h-4 w-4 stroke-[3]" />
                      </span>
                    </button>
                  ))}
                </div>

                {/* Unified Control Station: Prominent Call Voice Dispatch & Clean Mode Switcher */}
                <div className="pt-2 w-full max-w-xl space-y-2">
                  <button
                    onClick={() => setIsTelephonyOpen(true)}
                    className="w-full rounded-2xl bg-[#14e7c7] hover:bg-[#0fd6b7] active:bg-[#0bbd9f] text-[#071322] font-black py-3.5 px-6 text-xs sm:text-sm shadow-[0_0_25px_rgba(20,231,199,0.45)] hover:shadow-[0_0_35px_rgba(20,231,199,0.65)] hover:translate-y-[-1px] active:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-2.5"
                    title="Call Voice Line (Live 4-Digit Proof)"
                    aria-label="Call Voice Line (Live 4-Digit Proof)"
                  >
                    <PhoneCall className="h-4 w-4 text-[#071322] flex-shrink-0" />
                    <span className="tracking-wide uppercase font-extrabold">CALL VOICE DISPATCH</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2.5 w-full">
                    <button
                      onClick={() => setMode("terminal")}
                      className={`flex items-center justify-center gap-2 rounded-2xl py-3 px-4 font-sans text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                        mode === "terminal"
                          ? "bg-[#0c2340] text-white shadow-md shadow-slate-950/20 border border-cyan-500/40"
                          : "bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50"
                      }`}
                    >
                      <TerminalIcon className={`h-4 w-4 flex-shrink-0 transition-colors ${mode === "terminal" ? "text-[#14e7c7]" : "text-slate-500"}`} />
                      <span>TERMINAL CHAT</span>
                    </button>

                    <button
                      onClick={() => setMode("voice")}
                      className={`flex items-center justify-center gap-2 rounded-2xl py-3 px-4 font-sans text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                        mode === "voice"
                          ? "bg-[#0c2340] text-white shadow-md shadow-slate-950/20 border border-emerald-500/40"
                          : "bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50"
                      }`}
                    >
                      <Radio className={`h-4 w-4 flex-shrink-0 transition-all ${
                        mode === "voice"
                          ? "text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-pulse"
                          : "text-emerald-600"
                      }`} />
                      <span>VOICE AVATAR</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Terminal Chat / Voice Window (Desktop Side-View) */}
              <div className="lg:col-span-7 w-full">
                {mode === "terminal" ? (
                  <RetroTerminal
                    rep={activeRep}
                    onOpenTelephonyModal={() => setIsTelephonyOpen(true)}
                    selectedScenarioPrompt={selectedScenario}
                    onClearScenarioPrompt={() => setSelectedScenario(undefined)}
                  />
                ) : (
                  <div className="max-w-4xl mx-auto rounded-3xl border border-cyan-500/30 bg-[#071322] p-6 shadow-[0_20px_50px_rgba(2,132,199,0.15)]">
                    <VoiceVisualizer isActive={mode === "voice"} />
                  </div>
                )}
              </div>
            </div>

            {/* Admin Control Panel (Uniform Color & Schematic with Terminal Above) */}
            <div className="w-full mt-10">
              <RoiDashboard />
            </div>
          </div>
        )}

        {/* Layer 2: SyncGM (Clean direct frame without bottom clutter) */}
        {activeDemo === "syncgm" && <SyncGMPreview rep={activeRep} />}
      </main>

      {/* 4. Ephemeral Telephony Modal */}
      <TelephonyModal
        isOpen={isTelephonyOpen}
        onClose={() => setIsTelephonyOpen(false)}
      />

      {/* 5. Platform Footer (Standard www.agentworkforce.online copyright info) */}
      <footer className="border-t border-slate-200/80 bg-white/95 backdrop-blur-md py-6 px-4 text-center text-xs text-slate-500 font-sans mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">&copy; {new Date().getFullYear()} www.agentworkforce.online</span>
            <span>&bull;</span>
            <span>All rights reserved.</span>
          </div>
          {activeDemo === "hvac" && (
            <div className="text-slate-500">
              Assigned Representative:{" "}
              <span className="text-slate-900 font-bold">{activeRep.rep_name}</span>{" "}
              ({activeRep.rep_title})
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
