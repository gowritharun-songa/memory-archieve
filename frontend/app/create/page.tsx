"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PenLine, Save, ArrowLeft, Image as ImageIcon, X } from "lucide-react";
import RateLimiterUI from "@/components/RateLimiterUI";
import api from "@/lib/api";

const Create = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    creator: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rateLimited, setRateLimited] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRateLimited(false);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("creator", formData.creator);
      if (image) {
        data.append("image", image);
      }

      await api.post("/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/");
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

  return (
    <main className="min-h-screen pb-20 no-scrollbar overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-(--primary) hover:underline mb-8 font-serif italic"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Archive
        </button>

        <header className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 text-(--primary) mb-2">
            <PenLine className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-[0.2em]">New Entry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-(--tertiary)">Record a New Memory</h1>
          <p className="text-(--tertiary)/60 font-serif italic mt-2 text-sm sm:text-base">
            Put your thoughts onto paper. Let them be remembered.
          </p>
        </header>

        {rateLimited ? (
          <RateLimiterUI />
        ) : (
          <form onSubmit={handleSubmit} className="paper-card p-5 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-700 text-sm rounded-sm italic">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="title" className="block text-xs uppercase tracking-widest font-bold text-(--tertiary)/70">
              Title of the Moment
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              maxLength={50}
              value={formData.title}
              onChange={handleChange}
              placeholder="A summer afternoon..."
              className="input-field w-full text-base sm:text-lg"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="creator" className="block text-xs uppercase tracking-[0.2em] font-bold text-(--tertiary)/70">
              The Chronicler
            </label>
            <input
              type="text"
              id="creator"
              name="creator"
              required
              maxLength={32}
              value={formData.creator}
              onChange={handleChange}
              placeholder="Your name"
              className="input-field w-full font-cursive text-xl sm:text-2xl text-(--primary) placeholder:text-gray-300 placeholder:text-base placeholder:font-sans"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest font-bold text-(--tertiary)/70">
              Visual Fragment (Optional)
            </label>
            <div className="flex flex-col items-center gap-4">
              {preview ? (
                <div className="relative w-full aspect-video sm:aspect-square max-h-64 overflow-hidden border border-(--border) group">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="w-full h-32 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-(--border) hover:border-(--primary)/40 hover:bg-(--primary)/5 transition-all cursor-pointer group">
                  <ImageIcon className="w-8 h-8 text-(--tertiary)/30 group-hover:text-(--primary)/50 transition-colors" />
                  <span className="text-xs text-(--tertiary)/40 font-serif italic">Attach a visual memory</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="block text-xs uppercase tracking-widest font-bold text-(--tertiary)/70">
              The Narrative
            </label>
            <textarea
              id="content"
              name="content"
              required
              maxLength={500}
              rows={6}
              value={formData.content}
              onChange={handleChange}
              placeholder="Describe the memory in detail..."
              className="input-field w-full resize-none text-base sm:text-lg"
            />
            <div className="text-right text-[10px] text-(--tertiary)/40 font-mono">
              {formData.content.length} / 500
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-base sm:text-lg"
            >
              <Save className="w-5 h-5" />
              {loading ? "Preserving..." : "Preserve Memory"}
            </button>
          </div>
        </form>
        )}
        
        <p className="text-center mt-8 text-(--tertiary)/30 font-serif italic text-sm">
          "Memory is the scribe of the soul."
        </p>
      </div>
    </main>
  );
};

export default Create;