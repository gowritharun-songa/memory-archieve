import { useEffect, useState } from "react";
import { Link } from "react-router";

import Navbar from "../components/Navbar";
import MemoryCard from "../components/MemoryCard";
import Loading from "../components/Loading";
import RateLimit from "../components/RateLimit";

import api from "../lib/axios";
import toast from "react-hot-toast";

const Home = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const { data } = await api.get("/memories");
        setMemories(data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Failed to fetch memories:", error);

        if (error.response?.status === 429) {
          setIsRateLimited(true);
          toast.error("Rate limit reached. Please wait a moment.");
        } else {
          toast.error("Failed to load memories");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[70vh]">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {isRateLimited && <RateLimit />}

      {!isRateLimited && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Empty state */}
          {memories.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 md:py-32 text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 mb-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <svg
                  className="w-10 h-10 md:w-12 md:h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                No Memories Yet
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md">
                Start capturing your precious moments by creating your first memory.
              </p>

              <Link
                to="/create"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Your First Memory
              </Link>
            </div>
          )}

          {memories.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {memories.map((memo) => (
                <MemoryCard key={memo._id} memo={memo} setMemories={setMemories} />
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default Home;