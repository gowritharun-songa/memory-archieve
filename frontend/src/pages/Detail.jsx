import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import { ArrowLeft, CloudDownload } from "lucide-react";
import { formatDate } from "../lib/utils";

const Detail = () => {
  const { id } = useParams();
  const [memory, setMemory] = useState(null);
  const [rateLimited, setRateLimited] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchById = async () => {
      try {
        const response = await api.get(`/memories/${id}`);
        const data = response.data.memory; 
        setMemory(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch memory:", error);
        if (error.response?.status === 429) {
          setRateLimited(true);
          toast.error("Rate limit reached. Please wait a moment.");
        } else {
          toast.error("Memory not found");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchById();
  }, [id]);

  if (loading) {
    return <Loading message="Loading your memory..." />;
  }

  if (!memory || rateLimited) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-10 transition-colors group text-lg font-medium"
        >
          <ArrowLeft className="w-5 h-5 text-blue-500 group-hover:-translate-x-1 transition-transform" />
          <span>Back to memories</span>
        </button>

        <article className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-8 md:p-12 space-y-8">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-blue-900 leading-tight tracking-tight">
              {memory.title}
            </h1>

            <div className="prose prose-lg prose-gray max-w-none">
              <p className="whitespace-pre-wrap leading-relaxed text-gray-700 text-lg">
                {memory.content}
              </p>
            </div>

            <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium">
                  {memory.creator?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{memory.creator}</p>
                  <p>{formatDate(new Date(memory.createdAt))}</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Detail;