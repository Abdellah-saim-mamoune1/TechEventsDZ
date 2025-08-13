import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Section } from "./Interfaces";
import { GetAllSections } from "./APIs";
import { useNavigate } from "react-router-dom";
import { Calendar, Bell, Info, Mail } from "lucide-react";

export default function Sidebar() {
  const Navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [sections, setSections] = useState<Section[] | null>(null);
  const IsAdmin = localStorage.getItem("IsAdmin");

  useEffect(() => {
    async function GetSections() {
      const data: Section[] | false = await GetAllSections();
      if (data !== false) setSections(data);
    }
    GetSections();
  }, []);



  return (
    <div>
      {!isOpen && (
        <button
          className="fixed top-3 left-4 z-50 p-2 rounded bg-gray-900/80 border border-gray-700 hover:border-cyan-400"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} color="white" />
        </button>
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 sm:w-70 lg:w-74 text-white 
        bg-gradient-to-b from-gray-900 via-blue-900 to-black
        shadow-xl z-40 transition-transform duration-300 border-r border-blue-900
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded hover:bg-gray-800"
          >
            <X size={24} color="white" />
          </button>
        </div>

        <div
          onClick={() => {
            Navigate("/");
            setIsOpen(false);
          }}
          className="p-6 text-2xl font-bold cursor-pointer border-b border-gray-700 hover:bg-gray-800 flex items-center gap-3"
        >
          🌌 Events
        </div>

    <nav className="p-4 space-y-2">
  {!sections && (
    <div className="w-full flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-gray-800 border-l-teal-300 border-r-teal-300 rounded-full animate-spin"></div>
    </div>
  )}

  <p onClick={()=>Navigate("/request-event")}className="flex items-center cursor-pointer gap-3 px-4 py-2 text-lg font-medium rounded-lg hover:bg-blue-800/40 transition-colors">
    <Calendar size={20} className="text-teal-300" />
    <span className="truncate">Request Event</span>
  </p>

  <p onClick={()=>{Navigate("/stay-notified")}} className="flex items-center cursor-pointer gap-3 px-4 py-2 text-lg font-medium rounded-lg hover:bg-blue-800/40 transition-colors">
    <Bell size={20} className="text-yellow-300" />
    <span className="truncate">Stay Notified</span>
  </p>

  <p onClick={()=>{Navigate("/about")}} className="flex items-center cursor-pointer gap-3 px-4 py-2 text-lg font-medium rounded-lg hover:bg-blue-800/40 transition-colors">
    <Info size={20} className="text-blue-300" />
    <span className="truncate">About</span>
  </p>

  <p onClick={()=>{Navigate("/contact-us")}} className="flex items-center cursor-pointer gap-3 px-4 py-2 text-lg font-medium rounded-lg hover:bg-blue-800/40 transition-colors">
    <Mail size={20} className="text-pink-300" />
    <span className="truncate">Contact Us</span>
  </p>
</nav>

     {IsAdmin === "true" && (
        <nav className="p-4 border-t border-gray-500 mt-8">
           <p
             onClick={() => {
             Navigate("/addsection");
             setIsOpen(false);
            }}
            className="flex items-center cursor-pointer gap-3 px-4 py-2 text-lg font-medium rounded-lg hover:bg-purple-800/40 transition-colors"
            >
            <span className="truncate">Requests</span>
            </p>
        </nav>
        )}
   
      </aside>
    </div>
  );
}
