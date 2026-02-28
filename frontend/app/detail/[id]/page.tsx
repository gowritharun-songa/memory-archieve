"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import RateLimiterUI from "@/components/RateLimiterUI";
import { Calendar, User, ArrowLeft, Edit3, Trash2, Quote } from "lucide-react";
import api from "@/lib/api";

interface Memory {
  _id: string;
  title: string;
  content: string;
  creator: string;
  createdAt: string;
}

const Detail = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params);
  const [memory, setMemory] = useState<Memory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);

  useEffect(() => {
    const fetchMemory = async () => {
      try {
        setRateLimited(false);
        const response = await api.get(`/${id}`);
        setMemory(response.data.memory);
      } catch (err: any) {
        if (err.response?.status === 429) {
          setRateLimited(true);
        } else {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMemory();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this memory forever?")) return;

    try {
      const response = await api.delete(`/${id}`);
      if (response.status === 200) {
        router.push("/");
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) return <main><Loading /></main>;
  if (rateLimited) return <main className="pt-20"><RateLimiterUI /></main>;
  if (error || !memory) return <main><NotFound /></main>;

  const date = new Date(memory.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen pb-20 no-scrollbar overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        <div className="flex justify-between items-center mb-6 sm:mb-10">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-(--primary) hover:underline font-serif italic text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:block">Back to Archive</span>
            <span className="xs:hidden">Back</span>
          </button>

          <div className="flex gap-2 sm:gap-4">
            <button
              onClick={() => router.push(`/edit/${id}`)}
              className="p-1.5 sm:p-2 text-(--tertiary)/60 hover:text-(--primary) border border-(--border) rounded-sm hover:bg-(--card) transition-all"
              title="Edit Entry"
            >
              <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 sm:p-2 text-(--tertiary)/60 hover:text-red-600 border border-(--border) rounded-sm hover:bg-red-50 transition-all"
              title="Delete Forever"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <article className="paper-card p-6 sm:p-8 md:p-12 shadow-md">
          <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-5 select-none pointer-events-none">
            <Quote className="w-16 h-16 sm:w-24 sm:h-24" />
          </div>

          <header className="mb-6 sm:mb-10 relative">
            <div className="flex items-center gap-4 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-(--primary)/60 mb-4">
              <span className="bg-(--primary)/10 px-2 py-1 rounded-sm border border-(--primary)/20 line-clamp-1">Archive No. {id.slice(-6).toUpperCase()}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-(--tertiary) leading-tight break-words">
              {memory.title}
            </h1>
          </header>

          <div className="prose prose-stone max-w-none">
            <p className="text-lg sm:text-xl md:text-2xl text-(--tertiary)/90 font-serif italic leading-relaxed first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-bold first-letter:mr-2 sm:first-letter:mr-3 first-letter:float-left first-letter:text-(--primary)">
              {memory.content}
            </p>
          </div>

          <footer className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-(--border) flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-(--primary) rounded-sm flex items-center justify-center text-(--secondary) font-bold text-lg sm:text-xl shadow-inner flex-shrink-0">
                {memory.creator.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-(--tertiary)/40 mb-0.5 sm:mb-1">Authenticated By</p>
                <p className="text-xl sm:text-2xl font-cursive text-(--primary) leading-none pt-1 break-all">{memory.creator}</p>
              </div>
            </div>

            <div className="sm:text-right">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-(--tertiary)/40 mb-0.5 sm:mb-1">Documented On</p>
              <div className="flex items-center sm:justify-end gap-2 text-(--tertiary)/70 font-serif italic text-base sm:text-lg">
                <Calendar className="w-3.5 h-3.5 sm:w-4 h-4 text-(--primary)/40" />
                <span>{date}</span>
              </div>
            </div>
          </footer>
        </article>
        
        <div className="mt-12 text-center">
            <div className="inline-block w-24 h-px bg-(--border)"></div>
            <p className="text-(--tertiary)/30 font-serif italic text-sm mt-4 italic">
              "The past is a foreign country; they do things differently there."
            </p>
        </div>
      </div>
    </main>
  );
};

export default Detail;