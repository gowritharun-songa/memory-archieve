"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import RateLimiterUI from "@/components/RateLimiterUI";
import { Edit3, Save, ArrowLeft, Image as ImageIcon, X } from "lucide-react";
import api from "@/lib/api";

const Edit = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    creator: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [rateLimited, setRateLimited] = useState(false);

  useEffect(() => {
    const fetchMemory = async () => {
      try {
        setRateLimited(false);
        const response = await api.get(`/${id}`);
        // The API returns { message, memory }
        const memory = response.data.memory;
        setFormData({
          title: memory.title,
          content: memory.content,
          creator: memory.creator,
        });
        if (memory.image) {
          setPreview(memory.image);
        }
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

    fetchMemory();
  }, [id]);

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
    setSaving(true);
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

      await api.put(`/${id}`, data, {
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
      setSaving(false);
    }
  };

  if (loading) return <main><Loading /></main>;
  if (rateLimited && !formData.title) return <main className="pt-20"><RateLimiterUI /></main>;

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
            <Edit3 className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-[0.2em]">Amend Records</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-(--tertiary)">Revise Entry</h1>
          <p className="text-(--tertiary)/60 font-serif italic mt-2 text-sm sm:text-base">
            History can be rewritten, if only to be more accurate.
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
              className="input-field w-full font-cursive text-xl sm:text-2xl text-(--primary)"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest font-bold text-(--tertiary)/70">
              Visual Fragment
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
                  <span className="text-xs text-(--tertiary)/40 font-serif italic">Update visual memory</span>
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
              className="input-field w-full resize-none text-base sm:text-lg"
            />
            <div className="text-right text-[10px] text-(--tertiary)/40 font-mono">
              {formData.content.length} / 500
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-base sm:text-lg"
            >
              <Save className="w-5 h-5" />
              {saving ? "Updating..." : "Update Archive"}
            </button>
          </div>
        </form>
        )}
      </div>
    </main>
  );
};

export default Edit;