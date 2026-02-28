"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import MemoryCard from "@/components/MemoryCard";
import Loading from "@/components/Loading";
import RateLimiterUI from "@/components/RateLimiterUI";
import { BookOpen } from "lucide-react";
import api from "@/lib/api";

interface Memory {
  _id: string;
  title: string;
  content: string;
  creator: string;
  createdAt: string;
  image?: string;
}

export default function Home() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);

  const fetchMemories = async () => {
    try {
      setLoading(true);
      setRateLimited(false);
      const response = await api.get("/");
      setMemories(response.data);
    } catch (err: any) {
      if (err.response?.status === 429) {
        setRateLimited(true);
      } else {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this memory forever?")) return;

    try {
      const response = await api.delete(`/${id}`);
      if (response.status === 200) {
        setMemories(memories.filter((m) => m._id !== id));
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  return (
    <main className="min-h-screen pb-20 no-scrollbar overflow-y-auto">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        <header className="mb-8 md:mb-12 border-b-2 border-double border-(--border) pb-8 md:pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3 text-(--primary) animate-pulse">
              <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em]">The Digital Repository</span>
            </div>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-(--tertiary) leading-none">
              Memory <span className="text-(--primary) italic font-serif">Archive</span>
            </h1>
            <p className="text-(--tertiary)/70 font-serif italic text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
              A curated collection of moments, thoughts, and fragments of time, meticulously preserved for the generations yet to come.
            </p>
          </div>
          
          <div className="text-right hidden sm:block">
            <div className="border-4 border-(--primary)/10 p-3 sm:p-4 inline-block transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-serif text-(--primary)/20 italic select-none font-bold">EST. 2026</span>
            </div>
          </div>
        </header>

        {loading ? (
          <Loading />
        ) : rateLimited ? (
          <RateLimiterUI />
        ) : error ? (
          <div className="paper-card border-red-200 bg-red-50 text-red-800 text-center py-10">
            <p className="font-bold">Error loading records</p>
            <p className="text-sm opacity-80">{error}</p>
            <button 
              onClick={fetchMemories}
              className="mt-4 px-4 py-2 border border-red-300 rounded-sm hover:bg-red-100 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : memories.length === 0 ? (
          <div className="text-center py-16 md:py-20 border-2 border-dashed border-(--border) rounded-sm">
            <p className="font-serif italic text-(--tertiary)/50 text-xl">The archives are currently empty.</p>
            <p className="text-sm mt-2 text-(--tertiary)/40 uppercase tracking-widest font-medium">Be the first to record a memory</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {memories.map((memory) => (
              <MemoryCard
                key={memory._id}
                id={memory._id}
                title={memory.title}
                content={memory.content}
                creator={memory.creator}
                createdAt={memory.createdAt}
                image={memory.image}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}