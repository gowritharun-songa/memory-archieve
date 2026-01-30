import { OrbitProgress } from "react-loading-indicators";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center gap-3 py-6">
      <OrbitProgress 
        color="#6B7280"      
        size="small"
        text=""
      />
      <span className="text-sm text-gray-600 font-medium">{message}</span>
    </div>
  );
};

export default Loading;