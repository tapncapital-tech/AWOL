"use client";

import React from "react";
import { Truck, Navigation, Activity, CheckSquare } from "lucide-react";

export function FieldOpsPreview() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 animate-in fade-in duration-200">
      <div className="relative rounded-2xl border-2 border-black bg-white p-8 shadow-[6px_6px_0px_0px_#000] text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#f3e8ff] px-4 py-1.5 text-xs font-black text-purple-900 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
          <Truck className="h-3.5 w-3.5 text-purple-700" />
          <span>AWOL LABS • EXPERIMENTAL SANDBOX</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
          Field Ops 3.0 Autonomous Logistics &amp; Fleet Routing
        </h2>

        <p className="text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
          Dynamic automated route optimization, smart job-density dispatching, and automated parts procurement for mobile service fleets.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left pt-4">
          <div className="p-4 rounded-xl bg-[#f8f7f2] border-2 border-black shadow-[3px_3px_0px_0px_#000]">
            <Navigation className="h-5 w-5 text-purple-700 mb-2" />
            <h3 className="text-xs font-black text-black uppercase tracking-wider">Predictive Telematics</h3>
            <p className="text-[11px] text-slate-600 mt-1">Autonomous rerouting around traffic incidents and weather anomalies.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#f8f7f2] border-2 border-black shadow-[3px_3px_0px_0px_#000]">
            <Activity className="h-5 w-5 text-pink-700 mb-2" />
            <h3 className="text-xs font-black text-black uppercase tracking-wider">Inventory AI</h3>
            <p className="text-[11px] text-slate-600 mt-1">Truck inventory monitoring with auto-reordering at wholesale supply depots.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#f8f7f2] border-2 border-black shadow-[3px_3px_0px_0px_#000]">
            <CheckSquare className="h-5 w-5 text-emerald-700 mb-2" />
            <h3 className="text-xs font-black text-black uppercase tracking-wider">Automated Invoicing</h3>
            <p className="text-[11px] text-slate-600 mt-1">Instant digital signature capture, parts deduction, and payment gateway settlement.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
