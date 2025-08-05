import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Section } from "./Interfaces";
import { GetAllSections } from "./APIs";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const Navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [sections, setSections] = useState<Section[] | null>(null);
  const IsAdmin=localStorage.getItem("IsAdmin");
  useEffect(() => {
    async function GetSections() {
      const data: Section[] | false = await GetAllSections();
      if (data !== false) setSections(data);
    }
    GetSections();
  }, []);

  const handleClick = (id: number) => {
    setIsOpen(false); 
   Navigate(`/section/${id}`);
  };

  return (
    <div className="">
     
      {!isOpen && (
        <button
          className="fixed top-3 left-4 z-50 bg-balck  rounded shadow"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={40} color="white"/>
        </button>
      )}

      
      <aside
        className={`fixed top-0 left-0 h-full w-64 text-white bg-black shadow-md z-40 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
       
        <div className=" absolute top-2 right-2">
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
  className="p-6 text-2xl font-bold  cursor-pointer border-b border-gray-700 hover:bg-gray-900 flex items-center gap-3"
>
  🏠 Home
</div>

<nav className="p-4  space-y-2">
  {sections?.map((item) => (
    <p
      key={item.id}
      onClick={() => handleClick(item.id)}
      className="flex items-center cursor-pointer gap-3 px-4 py-2 text-lg font-medium rounded-lg hover:bg-gray-900 transition-colors"
    >
      <span className="w-2.5 h-2.5 rounded-full bg-gray-500 flex-shrink-0"></span>
      <span className="truncate">{item.name}</span>
    </p>
  ))}
</nav>


{IsAdmin==="true"&&<nav className="p-4 border-t  border-gray-500 mt-8 ">
    <p
      onClick={() => {Navigate("/addsection"), setIsOpen(false)}}
      className="flex items-center cursor-pointer gap-3 px-4 py-2 text-lg font-medium rounded-lg hover:bg-gray-900 transition-colors"
    > 
      <span className="truncate">Add Section</span>
    </p>
  
</nav>}


      </aside>
    </div>
  );
}
