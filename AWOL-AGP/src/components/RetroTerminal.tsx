"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Zap, ShieldCheck } from "lucide-react";
import { RepProfile } from "@/lib/repRoster";

interface RetroTerminalProps {
  rep: RepProfile;
  onOpenTelephonyModal: () => void;
  selectedScenarioPrompt?: string;
  onClearScenarioPrompt?: () => void;
}

interface Message {
  sender: "user" | "bot" | "system";
  text: string;
  timestamp: string;
}

export function RetroTerminal({
  rep,
  onOpenTelephonyModal,
  selectedScenarioPrompt,
  onClearScenarioPrompt,
}: RetroTerminalProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  const [sessionId] = useState(() => {
    if (typeof window !== "undefined") {
      let saved = localStorage.getItem("awol_chat_session_id");
      if (!saved) {
        saved = "session-" + Math.random().toString(36).substring(2, 11) + "-" + Date.now();
        localStorage.setItem("awol_chat_session_id", saved);
      }
      return saved;
    }
    return "session-" + Date.now();
  });

  const [input, setInput] = useState("");
  const [hasTypedFirstPrompt, setHasTypedFirstPrompt] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const streamContainerRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        if (localStorage.getItem("awol_has_typed_first_prompt") === "true") {
          setHasTypedFirstPrompt(true);
        }
      } catch (e) {
        // ignore localStorage access issues
      }
    }
  }, []);

  const markPromptTyped = () => {
    setHasTypedFirstPrompt(true);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("awol_has_typed_first_prompt", "true");
      } catch (e) {
        // ignore localStorage access issues
      }
    }
  };

  useEffect(() => {
    if (streamContainerRef.current) {
      streamContainerRef.current.scrollTo({
        top: streamContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (selectedScenarioPrompt) {
      handleSend(selectedScenarioPrompt);
      if (onClearScenarioPrompt) {
        onClearScenarioPrompt();
      }
    }
  }, [selectedScenarioPrompt]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    terminalRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = {
      sender: "user",
      text: query,
      timestamp: time,
    };

    setMessages((prev) => [...prev, userMsg]);
    markPromptTyped();
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          sessionId,
          rep,
        }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        throw new Error(data.error || "Failed to reach live agent");
      }
    } catch {
      // Local fallback for offline connectivity
      let botReply = "";
      const lower = query.toLowerCase();

      if (lower.includes("emergency ac") || lower.includes("ac") || lower.includes("breakdown") || lower.includes("chiller")) {
        botReply = `[DISPATCH PRIORITY 1: EMERGENCY AC REPAIR] Emergency HVAC technician paged. Standby window: 28 mins.\nConsultation credited to ${rep.rep_name} (${rep.rep_number}). Address qualified. Would you like technician SMS tracking?`;
      } else if (lower.includes("air flow") || lower.includes("airflow") || lower.includes("low air")) {
        botReply = `[DISPATCH PRIORITY 2: RESTRICTED AIR FLOW] Airflow diagnostics ticket generated. Inspecting blower motor, evaporator coil, and duct restriction.\nAssigned to on-call tech under ${rep.rep_name}. Dispatch confirmation sent to ${rep.rep_email}.`;
      } else if (lower.includes("leak") || lower.includes("fluid") || lower.includes("dripping")) {
        botReply = `[DISPATCH PRIORITY 1: HVAC SYSTEM LEAKING FLUID] Fluid containment technician dispatched with condensate & refrigerant isolation kit (ETA 24 mins).\nAlert sent to ${rep.rep_name} (${rep.rep_number}).`;
      } else if (lower.includes("furnace") || lower.includes("no-heat") || lower.includes("boiler") || lower.includes("heat")) {
        botReply = `[DISPATCH PRIORITY 1: HEATING OUTAGE] Midnight emergency heating call scheduled. Diagnostics tech en route with ignition/burner parts.\nPriority account created under ${rep.rep_name}. Dispatch receipt sent to ${rep.rep_email}.`;
      } else if (lower.includes("compressor") || lower.includes("rooftop") || lower.includes("rtu")) {
        botReply = `[DISPATCH PRIORITY 1: ROOFTOP RTU FAILURE] Commercial rooftop package unit crew alerted. Crane & replacement motor standby engaged.\nAssigned to Lead Architect ${rep.rep_name}.`;
      } else if (lower.includes("server") || lower.includes("cooling") || lower.includes("data center")) {
        botReply = `[DISPATCH PRIORITY 1: MISSION-CRITICAL COOLING] Server room environmental alarm acknowledged. Precision cooling specialist dispatched immediately (ETA 22 mins).\nAlert sent to ${rep.rep_name}.`;
      } else if (lower.includes("refrigerant") || lower.includes("heat pump") || lower.includes("freon")) {
        botReply = `[DISPATCH PRIORITY 1: HEAT PUMP / REFRIGERANT LEAK] EPA-certified HVAC technician dispatched with leak detector & reclaim equipment.\nAccount logged under ${rep.rep_name} (${rep.rep_number}).`;
      } else {
        botReply = `HVAC Dispatch Received: "${query}". On-call technician notified. Consultation attributed to ${rep.rep_name} (${rep.rep_email}). Please confirm your service address or call ${rep.rep_number}.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div ref={terminalRef} className="w-full max-w-4xl mx-auto px-0 sm:px-1">
      {/* Sleek Deep Midnight Navy Container with Cyan Border */}
      <div className="rounded-3xl border border-cyan-500/30 bg-[#071322] shadow-[0_20px_50px_rgba(2,132,199,0.15)] overflow-hidden font-sans w-full">
        {/* Sleek Minimalist Top Header Bar */}
        <div className="flex items-center justify-between gap-2 bg-[#0b1c33] px-4 sm:px-6 py-3 border-b border-cyan-500/20 text-xs sm:text-sm">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-white font-bold tracking-wide text-xs sm:text-base truncate">
              HVAC AUTOPILOT DISPATCH
            </span>
            {/* Simple clean LIVE in glowing green, no bubble */}
            <span className="flex items-center gap-1.5 font-sans text-xs sm:text-sm font-extrabold text-emerald-400 select-none tracking-wide">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] animate-pulse" />
              <span>LIVE</span>
            </span>
          </div>

          {/* Subtle Terminal Window Controls (_ [] X) */}
          <div className="flex items-center gap-2.5 text-slate-400 font-mono text-xs select-none">
            <span className="hover:text-[#14e7c7] cursor-pointer transition-colors">&mdash;</span>
            <span className="hover:text-[#14e7c7] cursor-pointer transition-colors">&#9633;</span>
            <span className="hover:text-rose-400 cursor-pointer transition-colors">&#10005;</span>
          </div>
        </div>

        {/* Message Stream Area - Bot is the focal point with comfortably large, readable text */}
        <div
          ref={streamContainerRef}
          className="relative p-4 sm:p-6 h-[370px] sm:h-[450px] min-h-[300px] sm:min-h-[400px] overflow-y-auto space-y-4 sm:space-y-5 text-left overscroll-contain bg-[#071322]"
          style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }}
        >
          {messages.length === 0 && (
            <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-center p-4 text-slate-400">
              <div className="h-12 w-12 rounded-2xl bg-cyan-950/70 border border-[#14e7c7]/40 flex items-center justify-center text-[#14e7c7] mb-3 shadow-[0_0_20px_rgba(20,231,199,0.25)]">
                <Zap className="h-6 w-6" />
              </div>
              <p className="text-white font-bold text-base sm:text-xl">
                Ready for Live HVAC Emergency Dispatch
              </p>
              <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-lg leading-relaxed">
                Click one of the scenario buttons or type an emergency below to test instantaneous call qualification &amp; on-call booking.
              </p>
            </div>
          )}

          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                m.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              {m.sender === "user" ? (
                /* User Message: Clean Deep Navy with Cyan Border & White Text */
                <div className="max-w-[90%] sm:max-w-[80%] rounded-2xl rounded-tr-xs bg-[#0c2340] border border-cyan-500/40 text-white px-4 sm:px-5 py-3 text-sm sm:text-base font-medium shadow-md">
                  <p className="whitespace-pre-wrap leading-relaxed break-words text-white">{m.text}</p>
                  <span className="text-[11px] text-slate-400 mt-1 block text-right font-mono">
                    {m.timestamp}
                  </span>
                </div>
              ) : (
                /* Bot Message: Luminous Greenish-Blue (Robot Eyes #14e7c7), Large & Clear */
                <div className="max-w-[92%] sm:max-w-[85%] rounded-2xl rounded-tl-xs bg-[#0b213d] border border-[#14e7c7]/30 px-4 sm:px-5 py-3.5 shadow-md">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#14e7c7] shadow-[0_0_8px_#14e7c7]" />
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#14e7c7]">
                      AI Auto-Dispatcher
                    </span>
                    <span className="text-xs text-slate-400 font-mono ml-auto">
                      {m.timestamp}
                    </span>
                  </div>
                  {/* Robot-Eye Glowing Greenish-Blue Text, Generously Sized (text-sm sm:text-lg) */}
                  <p className="text-sm sm:text-lg text-[#14e7c7] font-mono leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                    {m.text}
                  </p>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-[#14e7c7] text-sm sm:text-base font-mono py-1 px-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#14e7c7] animate-ping" />
              <span>Qualifying emergency &amp; routing to on-call tech...</span>
            </div>
          )}
        </div>

        {/* Input Bar: Themed with Cyan Accent & Contrast Send Button */}
        <div className="p-3 sm:p-4 bg-[#09182d] border-t border-cyan-500/20">
          <div className="flex items-center gap-2 rounded-2xl bg-[#050e18] border border-cyan-500/30 px-3.5 py-2 focus-within:border-[#14e7c7] focus-within:ring-2 focus-within:ring-[#14e7c7]/20 transition-all">
            <span className="text-[#14e7c7] font-bold text-base sm:text-lg select-none pl-1">&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => {
                if (!hasTypedFirstPrompt && e.target.value.length > 0) {
                  markPromptTyped();
                }
                setInput(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder={!hasTypedFirstPrompt && messages.filter((m) => m.sender === "user").length === 0 ? "WHAT IS YOUR HVAC ISSUE" : ""}
              className="flex-1 min-w-0 bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-hidden py-1 tracking-wide"
            />
            {/* Theme-Aligned Cyan Send Button */}
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="rounded-xl bg-[#14e7c7] hover:bg-[#0fd6b7] disabled:opacity-30 disabled:hover:bg-[#14e7c7] text-[#071322] px-4 py-2 font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md cursor-pointer flex-shrink-0"
            >
              <span>SEND</span>
              <Send className="h-3.5 w-3.5 text-[#071322]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
