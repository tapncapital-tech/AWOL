"use client";

import React, { useState } from "react";
import {
  Phone,
  MessageSquare,
  Calendar,
  DollarSign,
  PhoneCall,
  CheckCircle2,
  Clock,
  UserCheck,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

interface Tech {
  id: string;
  name: string;
  role: string;
  available: boolean;
  phone: string;
  statusText: string;
}

interface CallRecord {
  id: string;
  time: string;
  issue: string;
  revenue: string;
  techAssigned: string;
  status: "dispatched" | "booked";
}

const ON_CALL_TECHS: Tech[] = [
  {
    id: "tech-1",
    name: "Marcus Vance",
    role: "Lead Commercial HVAC Tech",
    available: true,
    phone: "(202) 618-1204",
    statusText: "YES — On-Call & Ready",
  },
  {
    id: "tech-2",
    name: "Dave Kowalski",
    role: "Master Diagnostic Tech",
    available: true,
    phone: "(202) 618-1204",
    statusText: "YES — Standby Unit 4",
  },
  {
    id: "tech-3",
    name: "Elena Rodriguez",
    role: "Emergency AC & Chiller Specialist",
    available: true,
    phone: "(202) 618-1204",
    statusText: "YES — On-Call & Ready",
  },
];

const INITIAL_CALLS: CallRecord[] = [
  {
    id: "CALL-104",
    time: "2 mins ago",
    issue: "Emergency AC repair",
    revenue: "$2,450",
    techAssigned: "Marcus Vance",
    status: "dispatched",
  },
  {
    id: "CALL-103",
    time: "38 mins ago",
    issue: "Low Air Flow",
    revenue: "$1,350",
    techAssigned: "Elena Rodriguez",
    status: "booked",
  },
  {
    id: "CALL-102",
    time: "1 hour ago",
    issue: "HVAC system leaking fluid",
    revenue: "$1,850",
    techAssigned: "Dave Kowalski",
    status: "dispatched",
  },
  {
    id: "CALL-101",
    time: "3 hours ago",
    issue: "Rooftop RTU Compressor Alert",
    revenue: "$2,800",
    techAssigned: "Marcus Vance",
    status: "dispatched",
  },
];

export function RoiDashboard() {
  const [revenuePeriod, setRevenuePeriod] = useState<"today" | "week">("today");
  const [techList] = useState<Tech[]>(ON_CALL_TECHS);
  const [calls] = useState<CallRecord[]>(INITIAL_CALLS);
  const [scheduleNotice, setScheduleNotice] = useState<string | null>(null);

  const revenueToday = "$8,450";
  const revenueWeek = "$42,600";
  const callsTodayCount = 14;
  const callsWeekCount = 68;

  const handleOpenSchedule = (techName?: string) => {
    const msg = techName
      ? `Schedule sync connected for ${techName}. Dispatch slots synced to on-call calendar.`
      : "Fleet Schedule: All 3 on-call HVAC technicians synced to live calendar.";
    setScheduleNotice(msg);
    setTimeout(() => setScheduleNotice(null), 4000);
  };

  return (
    <section
      aria-label="HVAC Owner Control Panel"
      className="w-full text-left font-sans"
    >
      {/* Unified Deep Midnight Navy Container with Cyan Border matching RetroTerminal */}
      <div className="rounded-3xl border border-cyan-500/30 bg-[#071322] shadow-[0_20px_50px_rgba(20,231,199,0.12)] overflow-hidden font-sans w-full">
        {/* Sleek Top Header Bar (Matching RetroTerminal Style Exactly) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0b1c33] px-4 sm:px-6 py-3.5 border-b border-cyan-500/20 text-xs sm:text-sm">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-white font-bold tracking-wide text-xs sm:text-sm truncate">
              HVAC OWNER CONTROL PANEL &bull; FLEET OPERATIONS
            </span>
            {/* Glowing Green LIVE Indicator */}
            <span className="flex items-center gap-1.5 font-sans text-xs sm:text-sm font-extrabold text-emerald-400 select-none tracking-wide">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] animate-pulse" />
              <span>LIVE</span>
            </span>
          </div>

          {/* Quick Schedule Sync Action */}
          <button
            onClick={() => handleOpenSchedule()}
            className="inline-flex items-center gap-2 rounded-xl bg-[#14e7c7] hover:bg-[#0fd6b7] text-[#071322] px-3.5 py-1.5 text-xs font-black shadow-[0_0_15px_rgba(20,231,199,0.35)] transition-all cursor-pointer flex-shrink-0 self-start sm:self-auto"
          >
            <Calendar className="h-3.5 w-3.5 text-[#071322]" />
            <span className="tracking-wide uppercase">Connect Fleet Schedule</span>
          </button>
        </div>

        {/* Dashboard Body */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {scheduleNotice && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>{scheduleNotice}</span>
              </div>
              <button
                onClick={() => setScheduleNotice(null)}
                className="text-xs text-emerald-400 hover:text-white font-bold cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* 3 Core Metric Cards (Navy, Cyan Borders, High-Contrast Sleek Readouts) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Card 1: Techs Availability (YES / NO) */}
            <div className="p-5 rounded-2xl bg-[#0b1c33]/90 border border-cyan-500/20 shadow-sm flex flex-col justify-between hover:border-cyan-500/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black tracking-wider uppercase text-cyan-400/90">
                    HVAC Techs Availability
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-extrabold text-[11px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
                    3 READY
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight flex items-baseline gap-2 drop-shadow-[0_0_15px_rgba(16,185,129,0.35)]">
                  <span>YES</span>
                  <span className="text-xs font-bold text-slate-400 font-sans">
                    (On-Call Active)
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Emergency dispatch crew is fully staffed. Incoming after-hours calls auto-qualify and page available techs.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-4 mt-4 border-t border-cyan-500/15">
                <a
                  href="tel:2026181204"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#071322] hover:bg-[#0d223d] border border-emerald-500/30 py-2 px-3 text-xs font-bold text-emerald-400 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Call Fleet</span>
                </a>
                <a
                  href="sms:2026181204"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#071322] hover:bg-[#0d223d] border border-cyan-500/30 py-2 px-3 text-xs font-bold text-[#14e7c7] transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-[#14e7c7]" />
                  <span>Message</span>
                </a>
              </div>
            </div>

            {/* Card 2: Money Generated from Calls */}
            <div className="p-5 rounded-2xl bg-[#0b1c33]/90 border border-cyan-500/20 shadow-sm flex flex-col justify-between hover:border-cyan-500/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black tracking-wider uppercase text-cyan-400/90">
                    Revenue From Calls
                  </span>
                  <div className="inline-flex rounded-lg bg-[#071322] p-0.5 text-[11px] font-bold border border-cyan-500/20">
                    <button
                      onClick={() => setRevenuePeriod("today")}
                      className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                        revenuePeriod === "today"
                          ? "bg-[#14e7c7] text-[#071322] font-black shadow-xs"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Today
                    </button>
                    <button
                      onClick={() => setRevenuePeriod("week")}
                      className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                        revenuePeriod === "week"
                          ? "bg-[#14e7c7] text-[#071322] font-black shadow-xs"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Week
                    </button>
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono">
                  {revenuePeriod === "today" ? revenueToday : revenueWeek}
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {revenuePeriod === "today"
                    ? "Generated from 14 captured after-hours and emergency calls today."
                    : "Captured across 68 booked jobs this week without a missed call."}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-cyan-500/15 flex items-center justify-between text-xs text-slate-400">
                <span>Avg Emergency Ticket:</span>
                <span className="font-extrabold text-[#14e7c7] font-mono">$1,850</span>
              </div>
            </div>

            {/* Card 3: After-Hours Calls Captured */}
            <div className="p-5 rounded-2xl bg-[#0b1c33]/90 border border-cyan-500/20 shadow-sm flex flex-col justify-between hover:border-cyan-500/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black tracking-wider uppercase text-cyan-400/90">
                    Calls Answered (1st Ring)
                  </span>
                  <span className="text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-emerald-500/40">
                    0 Missed
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-2">
                  <span className="font-mono">
                    {revenuePeriod === "today" ? callsTodayCount : callsWeekCount}
                  </span>
                  <span className="text-xs font-bold text-slate-400 font-sans">
                    / {revenuePeriod === "today" ? callsTodayCount : callsWeekCount} Calls
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  100% first-ring pickup rate. Automated AI qualification books technicians directly to prevent caller drop-off.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-cyan-500/15 flex items-center justify-between text-xs text-slate-400">
                <span>Speed to Dispatch:</span>
                <span className="font-extrabold text-emerald-400 font-mono">&lt; 1.8s</span>
              </div>
            </div>
          </div>

          {/* 2-Column Operational Grid: Tech Roster + Recent Calls Log */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Left Column (7 cols): On-Call Technician Fleet & Fast Actions */}
            <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-[#0b1c33]/90 border border-cyan-500/20 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-[#14e7c7]" />
                    <span>On-Call HVAC Technicians</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Direct dispatch status and instant communication with on-call personnel.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 rounded-full">
                  All Available
                </span>
              </div>

              <div className="space-y-3">
                {techList.map((tech) => (
                  <div
                    key={tech.id}
                    className="p-3.5 rounded-xl bg-[#071322] border border-cyan-500/15 hover:border-cyan-500/35 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white text-sm">
                          {tech.name}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981] animate-pulse" />
                          AVAILABLE: YES
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {tech.role} &bull; Direct: {tech.phone}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <a
                        href={`tel:${tech.phone.replace(/[^0-9]/g, "")}`}
                        className="p-2 rounded-lg bg-[#0c2340] hover:bg-[#122e54] border border-emerald-500/30 text-emerald-400 hover:text-white transition-colors flex items-center gap-1"
                        title={`Call ${tech.name}`}
                      >
                        <Phone className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="font-bold text-[11px]">Call</span>
                      </a>
                      <a
                        href={`sms:${tech.phone.replace(/[^0-9]/g, "")}`}
                        className="p-2 rounded-lg bg-[#0c2340] hover:bg-[#122e54] border border-cyan-500/30 text-[#14e7c7] hover:text-white transition-colors flex items-center gap-1"
                        title={`Message ${tech.name}`}
                      >
                        <MessageSquare className="h-3.5 w-3.5 text-[#14e7c7]" />
                        <span className="font-bold text-[11px]">Message</span>
                      </a>
                      <button
                        onClick={() => handleOpenSchedule(tech.name)}
                        className="p-2 rounded-lg bg-[#0c2340] hover:bg-[#122e54] border border-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                        title={`Schedule ${tech.name}`}
                      >
                        <Calendar className="h-3.5 w-3.5 text-slate-300" />
                        <span className="font-bold text-[11px]">Schedule</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column (5 cols): Recent Calls Captured & Money Booked */}
            <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-[#0b1c33]/90 border border-cyan-500/20 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#14e7c7]" />
                    <span>Recent Calls Handled</span>
                  </h3>
                  <span className="text-[11px] font-mono text-cyan-400/80">REALTIME</span>
                </div>

                <div className="space-y-2.5">
                  {calls.map((c) => (
                    <div
                      key={c.id}
                      className="p-3 rounded-xl bg-[#071322] border border-cyan-500/15 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate">
                          {c.issue}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {c.time} &bull; Tech: {c.techAssigned}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-extrabold text-white font-mono text-sm">
                          {c.revenue}
                        </div>
                        <span className="inline-block text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded-full mt-0.5">
                          {c.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-cyan-500/15 flex items-center justify-between text-xs text-slate-400">
                <span>Today&apos;s Booked Calls:</span>
                <span className="font-extrabold text-emerald-400 font-mono">
                  14 Calls ($8,450)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
