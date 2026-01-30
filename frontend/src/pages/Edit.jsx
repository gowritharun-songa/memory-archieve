import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const Edit = () => {
  const [memory, setMemory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchMemory = async () => {
      try {
        const res = await api.get(`/memories/${id}`);
        setMemory(res.data);
      } catch (error) {
        console.error("Error fetching memory:", error);
        toast.error("Failed to load memory");
      } finally {
        setLoading(false);
      }
    };

    fetchMemory();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this memory?")) return;

    try {
      await api.delete(`/memories/${id}`);
      toast.success("Memory deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting memory:", error);
      toast.error("Failed to delete memory");
    }
  };

  const handleSave = async () => {
    if (!memory?.title?.trim() || !memory?.content?.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/memories/${id}`, memory);
      toast.success("Memory updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating memory:", error);
      toast.error("Failed to update memory");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoaderIcon className="h-10 w-10 text-gray-500 animate-spin" />
      </div>
    );
  }

  if (!memory) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Memory not found</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header with actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon size={18} />
            <span>Back to memories</span>
          </Link>

          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
          >
            <Trash2Icon size={18} />
            Delete Memory
          </button>
        </div>

        {/* Main card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-7 sm:p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Edit Memory</h1>

            {/* Title */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                placeholder="Give your memory a title..."
                value={memory.title}
                onChange={(e) => setMemory({ ...memory, title: e.target.value })}
              />
            </div>

            {/* Content */}
            <div className="mb-8">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1.5">
                Your Memory
              </label>
              <textarea
                id="content"
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all resize-y min-h-[140px]"
                placeholder="Write your memory here..."
                value={memory.content}
                onChange={(e) => setMemory({ ...memory, content: e.target.value })}
              />
            </div>

            {/* Save button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className={`
                  px-6 py-2.5 bg-gray-800 text-white font-medium rounded-lg
                  hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                  disabled:opacity-60 disabled:cursor-not-allowed
                  transition-all duration-200
                `}
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <LoaderIcon className="h-4 w-4 animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;