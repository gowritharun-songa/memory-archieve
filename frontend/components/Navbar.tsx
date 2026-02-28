"use client";

import { Feather, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="w-full flex justify-between items-center p-4 sm:p-6 lg:px-24 sticky top-0 z-40 bg-(--secondary)/80 backdrop-blur-md border-b-2 border-(--border) shadow-sm">
      <div
        className="group text-xl sm:text-2xl font-bold cursor-pointer flex items-center gap-2 sm:gap-3 transition-transform active:scale-95"
        onClick={() => router.push("/")}
      >
        <div className="bg-(--primary) p-2 sm:p-2.5 rounded-sm text-(--secondary) shadow-[3px_3px_0px_0px_rgba(140,93,75,0.4)] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 ease-out">
          <Feather className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="flex flex-col -space-y-1 sm:-space-y-1.5">
          <span className="text-xl sm:text-3xl font-serif font-black text-(--tertiary) tracking-tighter uppercase leading-none">
            Memory <span className="text-(--primary) italic lowercase font-normal ml-0.5">Archive</span>
          </span>
          <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.4em] sm:tracking-[0.5em] text-(--tertiary)/40 font-bold font-serif italic">
            Registry of <span className="text-(--primary)/60">Souls</span>
          </span>
        </div>
      </div>

      <div>
        <button
          className="btn-primary flex items-center gap-2 px-3 sm:px-6 py-2 text-sm sm:text-base group"
          onClick={() => router.push("/create")}
        >
          <PlusIcon className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
          <span className="hidden xs:block">New Entry</span>
          <span className="xs:hidden">New</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;