"use client";

import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 py-20 relative overflow-hidden">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-(--primary)/10 rounded-full animate-spin border-t-(--primary)"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-(--primary) animate-pulse" />
        </div>
      </div>
      
      <div className="space-y-2 text-center">
        <p className="font-serif italic text-(--primary) text-2xl tracking-wide">
          Consulting the Archives...
        </p>
        <div className="flex justify-center gap-1">
            <div className="w-1.5 h-1.5 bg-(--primary)/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1.5 h-1.5 bg-(--primary)/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-(--primary)/40 rounded-full animate-bounce"></div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5">
          <span className="text-[15rem] font-serif italic select-none">M</span>
      </div>
    </div>
  );
};

export default Loading;