"use client";

import { AlertCircle, ShieldAlert } from "lucide-react";

interface RateLimiterUIProps {
  retryAfter?: number;
}

const RateLimiterUI = ({ retryAfter = 60 }: RateLimiterUIProps) => {
  return (
    <div className="max-w-md mx-auto paper-card border-(--primary)/30 bg-(--primary)/5 mt-16 shadow-[10px_10px_0px_0px_rgba(217,119,87,0.1)]">
      <div className="flex items-center gap-5 mb-6">
        <div className="p-4 bg-(--primary)/10 rounded-sm transform -rotate-3 border border-(--primary)/20">
          <ShieldAlert className="w-10 h-10 text-(--primary)" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-(--primary) italic uppercase tracking-tighter">Pace Your Thoughts</h3>
          <p className="text-[10px] text-(--primary)/60 uppercase tracking-[0.4em] font-bold">The Scribe is Overwhelmed</p>
        </div>
      </div>
      
      <p className="text-(--tertiary)/80 font-serif italic text-lg mb-8 leading-relaxed">
        The archive's inkwells are currently being refilled. Please allow a brief moment of silence before recording more fragments of time.
      </p>
      
      <div className="bg-white/40 border-2 border-dashed border-(--primary)/20 p-5 rounded-sm flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-(--primary) animate-spin-slow" />
            <span className="text-sm font-bold text-(--primary) uppercase tracking-widest">
              Cooldown in Progress
            </span>
        </div>
        <div className="text-3xl font-mono text-(--primary)/80 tabular-nums">
            {retryAfter}s
        </div>
      </div>

      <div className="mt-8 text-center opacity-30">
          <div className="w-12 h-px bg-(--primary) mx-auto mb-2"></div>
          <p className="text-[10px] uppercase font-bold tracking-widest">Digital Registry Division</p>
      </div>
    </div>
  );
};

export default RateLimiterUI;