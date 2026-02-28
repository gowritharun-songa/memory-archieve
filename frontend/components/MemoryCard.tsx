
"use client";

import { Calendar, User, ArrowRight, Trash2, Edit3, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface MemoryCardProps {
  id: string;
  title: string;
  content: string;
  creator: string;
  createdAt: string;
  image?: string;
  onDelete?: (id: string) => void;
}

const MemoryCard = ({ id, title, content, creator, createdAt, image, onDelete }: MemoryCardProps) => {
  const router = useRouter();
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div 
      onClick={() => router.push(`/detail/${id}`)}
      className="group relative flex flex-col h-full bg-(--card) rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl border border-(--border) cursor-pointer"
    >
      {/* ── Tape strips (Scrapbook Aesthetic) ── */}
      <div className="absolute -top-[6px] left-[18px] w-[40px] h-[14px] z-30 rounded-sm -rotate-[3deg] border border-(--primary)/20 bg-amber-200/60 backdrop-blur-[2px] pointer-events-none shadow-sm" />
      <div className="absolute -top-[6px] right-[18px] w-[40px] h-[14px] z-30 rounded-sm rotate-[3.5deg] border border-(--primary)/20 bg-amber-200/60 backdrop-blur-[2px] pointer-events-none shadow-sm" />

      {/* Background Pattern Overlay (subtle paper texture) */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none z-0"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
      />

      {/* Image Section */}
      <div className="relative w-full h-56 overflow-hidden z-10">
        <img
          src={image || "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=793&q=80"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 sepia-filter brightness-95"
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-(--tertiary)/40 to-transparent opacity-40" />

        {/* Floating Date Badge */}
        <div className="absolute bottom-3 left-4 bg-(--secondary)/90 backdrop-blur-sm px-3 py-1 rounded-full border border-(--border) shadow-sm">
          <div className="flex items-center gap-1.5 text-(--tertiary)/80">
            <Calendar className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{date}</span>
          </div>
        </div>

        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/edit/${id}`);
            }}
            className="p-2 bg-(--secondary)/90 backdrop-blur-md hover:bg-(--primary) hover:text-(--secondary) text-(--tertiary) rounded-xl transition-all border border-(--border) shadow-md group/icon"
            title="Edit"
          >
            <Edit3 className="w-4 h-4 transition-transform group-hover/icon:scale-110" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(id);
            }}
            className="p-2 bg-(--secondary)/90 backdrop-blur-md hover:bg-red-500 hover:text-white text-(--tertiary) rounded-xl transition-all border border-(--border) shadow-md group/icon"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 transition-transform group-hover/icon:scale-110" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6 relative z-10">
        <div className="flex flex-col mb-4">
          <div className="flex items-center gap-2 mb-1">
             <User className="w-3.5 h-3.5 text-(--primary)" />
             <span className="text-sm font-cursive text-(--primary) text-lg font-medium">{creator}</span>
          </div>
          <h3 className="text-xl font-bold text-(--tertiary) tracking-tight line-clamp-2 hover:text-(--primary) transition-colors duration-300 font-serif leading-snug">
            {title}
          </h3>
          <div className="w-8 h-1 bg-(--primary)/40 mt-3 rounded-full group-hover:w-16 transition-all duration-500" />
        </div>

        <p className="text-(--tertiary)/80 text-sm leading-relaxed line-clamp-3 font-serif italic flex-grow">
          "{content}"
        </p>
      </div>
    </div>
  );
};

export default MemoryCard;