import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios.js";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creator, setCreator] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title.trim() || !content.trim() || !creator.trim()) {
      toast.error("Faild to create!");
      return;
    }

    setLoading(true);
    
    try {
      await api.post("/memories", {
        title, 
        creator,
        content
      })
      toast.success("Memory Created !!");
      navigate("/");
    } catch (error) {
      console.log("Error", error.message);
      if(error.response.status === 429) {
        toast.error("Slow down", {
          duration: 3000,
          icon:"🐢"
        });
      } else {
        toast.error("Faild to create");
      }
      } finally {
      setLoading(false);
    }

  };


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeftIcon size={16} className="mr-1.5" />
          Back to memories
        </Link>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-6 sm:p-7">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Create New Memory
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Capture your moment
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Memory Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="A perfect rainy evening..."
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  // required
                />
              </div>

              <div>
                <label htmlFor="creator" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  id="creator"
                  type="text"
                  placeholder="How should we call you?"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                  // required
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Memory
                </label>
                <textarea
                  id="content"
                  rows={5}
                  placeholder="I still remember the smell of wet soil..."
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-y"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  // required
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    px-5 py-2 bg-gray-800 text-white text-sm font-medium 
                    rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 
                    focus:ring-gray-500 focus:ring-offset-2 transition-colors
                    disabled:opacity-60 disabled:cursor-not-allowed
                  `}
                >
                  {loading ? "Saving..." : "Save Memory"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;