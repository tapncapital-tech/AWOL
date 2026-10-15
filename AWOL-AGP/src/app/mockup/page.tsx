"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SleekBusinessCard } from "@/components/SleekBusinessCard";
import { SleekDemoSelector } from "@/components/SleekDemoSelector";
import { SleekTerminal } from "@/components/SleekTerminal";
import { VoiceVisualizer } from "@/components/VoiceVisualizer";
import { TelephonyModal } from "@/components/TelephonyModal";
import { SyncGMPreview } from "@/components/SyncGMPreview";
import { RoiDashboard } from "@/components/RoiDashboard";
import { DemoMode } from "@/components/DemoSelector";
import { RepProfile, REP_ROSTER, DEFAULT_REP_ID } from "@/lib/repRoster";
import { PhoneCall, Radio, Terminal as TerminalIcon, Sparkles, ArrowLeft } from "lucide-react";

export default function MockupPage() {
  const [activeRep, setActiveRep] = useState<RepProfile>(REP_ROSTER[DEFAULT_REP_ID]);
  const [activeDemo, setActiveDemo] = useState<DemoMode>("hvac");
  const [mode, setMode] = useState<"terminal" | "voice">("terminal");
  const [isTelephonyOpen, setIsTelephonyOpen] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | undefined>(undefined);

  const emergencyScenarios = [
    "AC blowing hot air & leaking through ceiling",
    "Furnace won't ignite and temperatures dropping",
    "Server room / walk-in cooler cooling unit failed",
  ];

  const handleScenarioClick = (scenario: string) => {
    setActiveDemo("hvac");
    setMode("terminal");
    setSelectedScenario(scenario);
  };

  return (
    <div className="min-h-screen text-slate-900 flex flex-col justify-between selection:bg-[#14e7c7] selection:text-[#05192d]">
      {/* Top Banner Notice: Mockup Mode */}
      <div className="bg-[#0b1c33] text-white py-1.5 px-4 text-xs font-medium flex items-center justify-between border-b border-cyan-500/20">
        <div className="flex items-center gap-2 max-w-6xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#14e7c7] animate-pulse shadow-[0_0_8px_#14e7c7]" />
            <span className="font-bold text-[#14e7c7]">AESTHETIC MOCKUP PREVIEW</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline text-slate-300">
              Sleek Modern Palette &amp; Luminous Robot-Eye Cyan (#14e7c7)
            </span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-slate-300 hover:text-white font-semibold transition-colors text-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Current Live Site</span>
          </Link>
        </div>
      </div>

      {/* Upper Hero Stage (Contains Business Header and Scrolling Marketing Copy) */}
      <div className="relative w-full">
        {/* 1. Persistent Top Business Header (Locked in place at top while content scrolls behind it) */}
        <header className="sticky top-0 z-50 w-full bg-[#f8f7f2]/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
          <SleekBusinessCard
            initialRep={activeRep}
            onRepChange={(rep) => setActiveRep(rep)}
          />
        </header>

        {/* 2. Demonstration Selection Layer */}
        <div className="w-full pt-2 pb-1">
          <SleekDemoSelector
            activeDemo={activeDemo}
            onSelectDemo={(demo) => setActiveDemo(demo)}
          />
        </div>

        {/* Headline, Subtitle, Paragraph, and Scenario Pills */}
        <div className="max-w-6xl w-full mx-auto px-4 pt-4 sm:pt-6 space-y-4 sm:space-y-5 text-center">
          {activeDemo === "hvac" && (
            <div className="space-y-4 sm:space-y-5">
              {/* High Impact Headline - Pure HVAC Sleek Styling */}
              <div className="space-y-2 sm:space-y-3 px-1">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase max-w-4xl mx-auto leading-tight break-words">
                  COMMERCIAL &amp; RESIDENTIAL HVAC
                  <span className="block bg-gradient-to-r from-blue-700 via-sky-600 to-[#0eb59e] bg-clip-text text-transparent font-extrabold normal-case tracking-normal mt-1.5 sm:mt-2 text-lg sm:text-2xl md:text-3xl break-words">
                    24/7 Scheduler &amp; Dispatch (No more missed Calls!)
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal break-words">
                  78% of customers hire the first HVAC company that answers. Our auto AI dispatcher answers on the 1st ring and books on-call technicians 24/7.
                </p>
              </div>

              {/* Sleek Scenario Pills (Luminous turquoise dot + soft modern card) */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto flex-wrap sm:flex-nowrap px-1">
                {emergencyScenarios.map((scenario) => (
                  <button
                    key={scenario}
                    onClick={() => handleScenarioClick(scenario)}
                    className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/95 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-800 shadow-sm hover:shadow-md hover:border-cyan-400 hover:text-blue-900 hover:translate-y-[-1px] transition-all cursor-pointer whitespace-nowrap max-w-full"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#14e7c7] ring-4 ring-[#14e7c7]/25 animate-pulse inline-block flex-shrink-0" />
                    <span>{scenario}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Main Demonstration Stage - The HVAC AGENT Cluster */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-8 sm:pt-12 pb-8 space-y-5 text-center">
        {/* Layer 1: HVAC Agent Terminal / Voice Canvas */}
        {activeDemo === "hvac" && (
          <div className="space-y-3 animate-in fade-in duration-200">
            {/* The Call Action Button: Vibrant Glowing Turquoise/Cyan Pill */}
            <div className="flex justify-center pb-0.5">
              <button
                onClick={() => setIsTelephonyOpen(true)}
                className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#14e7c7] via-[#0284c7] to-[#1d4ed8] hover:brightness-110 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white shadow-[0_10px_30px_rgba(20,231,199,0.3)] hover:shadow-[0_12px_35px_rgba(20,231,199,0.45)] hover:translate-y-[-1px] active:translate-y-[1px] transition-all cursor-pointer max-w-full"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs text-white flex-shrink-0 shadow-xs">
                  <PhoneCall className="h-4 w-4" />
                </span>
                <span className="break-words tracking-wide">
                  Call Voice Line (Live 4-Digit Proof)
                </span>
              </button>
            </div>

            {/* Mode Switcher: Terminal Chat vs Voice Avatar */}
            <div className="flex justify-center items-center gap-2 pt-1">
              <button
                onClick={() => setMode("terminal")}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  mode === "terminal"
                    ? "bg-[#0b1c33] text-white shadow-md shadow-blue-950/20"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <TerminalIcon className="h-3.5 w-3.5 text-[#14e7c7]" />
                <span>TERMINAL CHAT</span>
              </button>

              <button
                onClick={() => setMode("voice")}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  mode === "voice"
                    ? "bg-[#0b1c33] text-white shadow-md shadow-blue-950/20"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Radio className="h-3.5 w-3.5 text-sky-400" />
                <span>VOICE AVATAR</span>
              </button>
            </div>

            {/* Interactive Sleek Terminal or Voice Canvas */}
            <div className="pt-2">
              {mode === "terminal" ? (
                <SleekTerminal
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
        )}

        {/* Layer 2: SyncGM Preview */}
        {activeDemo === "syncgm" && <SyncGMPreview rep={activeRep} />}

        {/* Section 5: Live ROI & Performance Dashboard */}
        <RoiDashboard />
      </main>

      {/* 4. Ephemeral Telephony Modal */}
      <TelephonyModal
        isOpen={isTelephonyOpen}
        onClose={() => setIsTelephonyOpen(false)}
      />

      {/* 5. Platform Footer */}
      <footer className="border-t border-slate-200 bg-white/90 backdrop-blur-md py-6 px-4 text-center text-xs text-slate-500 font-sans mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">AgentWorkforce.online</span>
            <span>&bull;</span>
            <span>Autonomous AI Workforce Demonstration Platform</span>
          </div>
          <div>
            Assigned Representative:{" "}
            <span className="text-slate-900 font-bold">{activeRep.rep_name}</span>{" "}
            ({activeRep.rep_title})
          </div>
        </div>
      </footer>
    </div>
  );
}
