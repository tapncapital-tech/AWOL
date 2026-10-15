"use client";

import React, { useState } from "react";
import { RotateCw } from "lucide-react";
import { RepProfile } from "@/lib/repRoster";

interface SyncGMPreviewProps {
  rep: RepProfile;
}

export function SyncGMPreview({ rep }: SyncGMPreviewProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SYNCGM_URL || "https://syncgm-wjhwxrjbeq-uc.a.run.app";
  const syncgmLiveUrl = baseUrl.includes("?") ? `${baseUrl}&embed=true` : `${baseUrl}?embed=true`;

  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 animate-in fade-in duration-200">
      {/* Sleek Deep Midnight Navy Container with Cyan Border */}
      <div className="rounded-3xl border border-cyan-500/30 bg-[#071322] shadow-[0_20px_50px_rgba(20,231,199,0.12)] overflow-hidden font-sans w-full">
        {/* Sleek Minimalist Top Header Bar (Matching RetroTerminal style) */}
        <div className="flex items-center justify-between gap-2 bg-[#0b1c33] px-4 sm:px-6 py-3 border-b border-cyan-500/20 text-xs sm:text-sm">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-white font-bold tracking-wide text-xs sm:text-base truncate">
              SYNCGM &bull; LIVE ENTERPRISE DEMO
            </span>
            {/* Simple clean LIVE in green, no bubble */}
            <span className="flex items-center gap-1.5 font-sans text-xs sm:text-sm font-extrabold text-emerald-400 select-none tracking-wide">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] animate-pulse" />
              <span>LIVE</span>
            </span>
          </div>

          {/* Action & Window Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={handleReload}
              className="p-1.5 sm:p-2 rounded-xl bg-[#0c2340] hover:bg-[#122e54] text-slate-300 hover:text-white transition-colors cursor-pointer border border-cyan-500/30"
              title="Reload live app"
              aria-label="Reload live app"
            >
              <RotateCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#14e7c7]" />
            </button>
          </div>
        </div>

        {/* Embedded Web App Frame (Basic clean direct load) */}
        <div className="relative w-full h-[700px] sm:h-[800px] lg:h-[860px] bg-slate-900">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#071322] text-slate-300 gap-3">
              <span className="h-8 w-8 rounded-full border-2 border-[#14e7c7] border-t-transparent animate-spin" />
              <p className="text-xs sm:text-sm font-sans font-bold text-[#14e7c7] tracking-wide">
                Loading live SyncGM application...
              </p>
            </div>
          )}
          <iframe
            key={iframeKey}
            src={syncgmLiveUrl}
            title="SyncGM Live Application"
            className="w-full h-full border-0 bg-white"
            onLoad={() => setIsLoading(false)}
            allow="clipboard-read; clipboard-write"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
          />
        </div>
      </div>
    </div>
  );
}
