"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Volume2, Radio } from "lucide-react";

interface VoiceVisualizerProps {
  isActive: boolean;
}

export function VoiceVisualizer({ isActive }: VoiceVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isListening, setIsListening] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw glowing background orb
      const grad = ctx.createRadialGradient(
        width / 2,
        centerY,
        10,
        width / 2,
        centerY,
        width / 2
      );
      grad.addColorStop(0, isListening ? "rgba(52, 211, 153, 0.25)" : "rgba(34, 211, 238, 0.15)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw multi-layered sine waveforms
      const waves = [
        { amplitude: isListening ? 38 : 18, freq: 0.02, color: "#10b981", speed: 0.08 },
        { amplitude: isListening ? 28 : 12, freq: 0.035, color: "#06b6d4", speed: -0.06 },
        { amplitude: isListening ? 20 : 8, freq: 0.05, color: "#3b82f6", speed: 0.05 },
      ];

      waves.forEach((w) => {
        ctx.beginPath();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = w.color;
        ctx.shadowColor = w.color;
        ctx.shadowBlur = 10;

        for (let x = 0; x < width; x++) {
          const y =
            centerY +
            Math.sin(x * w.freq + phase * w.speed) *
              w.amplitude *
              Math.sin((x / width) * Math.PI); // Taper edges
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      phase += 1;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isActive, isListening]);

  if (!isActive) return null;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-950/90 rounded-2xl border border-emerald-500/30 backdrop-blur-md">
      <div className="flex items-center justify-between w-full mb-3 px-2">
        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold text-emerald-300">
            GEMINI LIVE / VOICE STREAM
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <Volume2 className="h-3.5 w-3.5 text-cyan-400" />
          <span>Sub-second Neural Voice</span>
        </div>
      </div>

      <div className="relative w-full flex items-center justify-center py-4">
        <canvas
          ref={canvasRef}
          width={600}
          height={160}
          className="w-full max-w-lg rounded-xl border border-emerald-950 bg-black/60 shadow-inner"
        />
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => setIsListening(!isListening)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all shadow-lg ${
            isListening
              ? "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/50"
              : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-950/50"
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="h-4 w-4" />
              <span>Simulating Live Speaking...</span>
            </>
          ) : (
            <>
              <Mic className="h-4 w-4 animate-pulse" />
              <span>Simulate Voice Interaction</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
