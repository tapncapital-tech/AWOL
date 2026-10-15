"use client";

import React, { useState, useEffect } from "react";
import { PhoneCall, X, Copy, Check, Clock, ShieldAlert } from "lucide-react";

interface TelephonyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TelephonyModal({ isOpen, onClose }: TelephonyModalProps) {
  const [pin, setPin] = useState("4821");
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  const dispatchNumber =
    process.env.NEXT_PUBLIC_DISPATCH_PHONE_NUMBER || "1(800) 555-AWOL";

  useEffect(() => {
    if (isOpen) {
      const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
      setPin(randomPin);
      setTimeLeft(300);
      setCopied(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const copyPin = () => {
    navigator.clipboard.writeText(pin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-11 w-11 rounded-2xl bg-[#0c2340] text-[#14e7c7] border border-cyan-500/30 flex items-center justify-center shadow-md shadow-cyan-950/20">
            <PhoneCall className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-sans">
              Live Telephony Proof Handoff
            </h3>
            <p className="text-xs text-emerald-600 font-semibold font-sans">
              Web-to-Phone Ephemeral Bridge
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-sans">
          Call the emergency dispatch line and enter your 4-digit PIN to
          seamlessly bridge your web conversation to live phone audio.
        </p>

        {/* 4-Digit PIN Card: Styled to match sleek dark terminal */}
        <div className="rounded-2xl bg-[#071322] border border-cyan-500/40 p-4 text-center mb-5 shadow-inner">
          <div className="text-[11px] font-sans tracking-wider text-slate-300 font-bold uppercase mb-1.5">
            Your Ephemeral Session PIN
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-4xl font-black tracking-widest text-[#14e7c7] drop-shadow-[0_0_12px_rgba(20,231,199,0.5)]">
              {pin}
            </span>
            <button
              onClick={copyPin}
              className="p-2 rounded-xl bg-[#0c2340] border border-cyan-500/30 text-slate-200 hover:text-white hover:border-[#14e7c7] shadow-xs active:translate-y-[1px] transition-all cursor-pointer"
              title="Copy PIN"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4 text-[#14e7c7]" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-[11px] font-sans text-slate-400 font-medium">
            <Clock className="h-3 w-3 text-emerald-400" />
            <span>
              Expires in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </div>
        </div>

        {/* Telephony Dispatch Call Action: Styled with site's glowing cyan Call Button */}
        <div className="space-y-3">
          <a
            href={`tel:${dispatchNumber.replace(/[^0-9+]/g, "")}`}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#14e7c7] hover:bg-[#0fd6b7] py-3.5 px-4 font-black text-sm text-[#071322] shadow-[0_0_25px_rgba(20,231,199,0.45)] hover:shadow-[0_0_35px_rgba(20,231,199,0.65)] transition-all text-center cursor-pointer uppercase tracking-wide font-sans"
          >
            <PhoneCall className="h-4 w-4 text-[#071322] flex-shrink-0" />
            <span>Call Live Dispatch ({dispatchNumber})</span>
          </a>

          <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 text-slate-600 text-xs leading-relaxed flex items-start gap-2.5 font-sans">
            <ShieldAlert className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>
              When the automated voice prompt answers, enter PIN <strong className="text-slate-900 font-bold">{pin}</strong> on your keypad. The bot will automatically inject your web dispatch ticket.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
