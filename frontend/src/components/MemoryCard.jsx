import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router";
import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const MemoryCard = ({ memo, setMemories }) => {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // don't trigger card navigation
    if (!window.confirm("Sure delete?")) return;

    try {
      await api.delete(`/memories/${id}`);
      setMemories(prev => prev.filter(m => m._id !== id));
      toast.success("Successfully deleted");
    } catch (error) {
      toast.error("Unable to delete");
      console.error("Failed to delete", error.message);
    }
  };

  const handleOpenDetail = () => {
    navigate(`/memory/${memo._id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // prevent card click
    navigate(`/memory-edit/${memo._id}`);
  };

  return (
    <div
      className="group"
      onClick={handleOpenDetail}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleOpenDetail();
      }}
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1 cursor-pointer">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
          {memo.title}
        </h3>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
          {memo.content}
        </p>

        <p className="text-black-600 font-semibold text-sm md:text-base leading-relaxed text-right mb-4 line-clamp-3">
          - {memo.creator}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs md:text-sm text-gray-500 font-medium">
            {formatDate(new Date(memo.createdAt))}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="Edit memory"
            >
              <PenSquareIcon className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <button
              onClick={(e) => handleDelete(e, memo._id)}
              className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="Delete memory"
            >
              <Trash2Icon className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
