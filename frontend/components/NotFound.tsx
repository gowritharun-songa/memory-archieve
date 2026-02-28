"use client";

import { Ghost, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 text-center p-6 relative overflow-hidden">
      <div className="relative group">
        <div className="bg-(--border)/20 p-12 rounded-full border-2 border-dashed border-(--border)/40 transform group-hover:rotate-12 transition-transform duration-700">
          <Ghost className="w-24 h-24 text-(--primary)/30" />
        </div>
        <div className="absolute -top-2 -right-2 bg-(--accent) text-(--secondary) text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm rotate-12">
            LOST RECORD
        </div>
      </div>

      <div className="space-y-4 max-w-md relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-(--primary) tracking-tighter uppercase italic">Missing Fragment</h2>
        <div className="w-16 h-1 bg-(--primary)/20 mx-auto"></div>
        <p className="text-(--tertiary)/70 font-serif italic text-xl leading-relaxed">
          The memory you seek has dissolved into the mists of time. It remains unrecorded, or perhaps, intentionally forgotten.
        </p>
      </div>

      <button 
        onClick={() => router.push('/')}
        className="btn-primary flex items-center gap-3 mt-6 px-10 py-4 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="uppercase tracking-[0.2em] font-bold text-sm">Return to Repository</span>
      </button>

      <div className="absolute bottom-10 left-0 w-full flex justify-center opacity-5 pointer-events-none">
          <span className="text-9xl font-serif italic select-none">404</span>
      </div>
    </div>
  );
};

export default NotFound;