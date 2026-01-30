import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-1.5 group"
          >
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              <span className="text-gray-900">Memory</span>
              <span className="text-indigo-600 group-hover:text-indigo-700 transition-colors">
                HUB
              </span>
            </h1>
          </Link>

          {/* Create Button */}
          <Link
            to="/create"
            className={`
              inline-flex items-center gap-2 px-5 py-2.5 
              bg-indigo-600 text-white font-medium rounded-lg 
              shadow-sm hover:bg-indigo-700 hover:shadow-md 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
              active:scale-95 transition-all duration-200
            `}
          >
            <PlusIcon className="w-5 h-5" strokeWidth={2.5} />
            <span className="hidden sm:inline">New Memory</span>
            <span className="sm:hidden">Create</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;