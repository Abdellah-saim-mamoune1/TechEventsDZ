import { useEffect, useState } from "react";
import { ResourceItem } from "./Interfaces";
import {
  GetItemsBySection,
  DeleteItem,
  DeleteSection,
  AddItem,
  UpdateItem,
  UpdateSection,
} from "./APIs";
import {
  ChevronDown,
  ChevronUp,
  Settings,
} from "lucide-react";
import { useParams } from "react-router-dom";

export function Section() {
  const [items, setItems] = useState<ResourceItem[] | null>(null);
  const [filteredItems, setFilteredItems] = useState<ResourceItem[]>([]);
  const [search, setSearch] = useState("");
  const [fromDate] = useState("");
  const [toDate] = useState("");
  const [showVideos, setShowVideos] = useState<Record<number, boolean>>({});
  const [showGithub, setShowGithub] = useState<Record<number, boolean>>({});
  const [sectionSettingsOpen, setSectionSettingsOpen] = useState(false);
  const [itemSettingsOpen, setItemSettingsOpen] = useState<number | null>(null);
  const [editSectionName, setEditSectionName] = useState("");
  const [addItemMode, setAddItemMode] = useState(false);
  const [updateItemMode, setUpdateItemMode] = useState<number | null>(null);
  const [itemForm, setItemForm] = useState({ title: "", description: "", file: null as File | null, type: "Cours" });
  const IsAdmin = localStorage.getItem("IsAdmin") === "true";
  const { id } = useParams();

  useEffect(() => {
    if (id) fetchItems();
  }, [id]);

  const fetchItems = async () => {
    const data = await GetItemsBySection(Number(id));
    if (data !== false) {
      setItems([...data].reverse());
    //  setFilteredItems(data);
    }
  };

  useEffect(() => {
    if (!items) return;
    const lowerSearch = search.toLowerCase();
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    const filtered = items.filter((item) => {
      const title = item.title.toLowerCase();
      const desc = item.description?.toLowerCase() || "";
      const inText = title.includes(lowerSearch) || desc.includes(lowerSearch);
      const createdAt = new Date(item.createdAt);
      const inRange = (!from || createdAt >= from) && (!to || createdAt <= to);
      return inText && inRange;
    });
    setFilteredItems(filtered);
  }, [search, fromDate, toDate, items]);

  const handleDownload = (url: string) => window.open(url, "_blank");
  const toggleShowVideos = (id: number) => setShowVideos(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleShowGithub = (id: number) => setShowGithub(prev => ({ ...prev, [id]: !prev[id] }));

  const handleDeleteItem = async (itemId: number) => {
    if (confirm("Delete this item?")) {
      const success = await DeleteItem(itemId);
      if (success && items) setItems(items.filter(item => item.id !== itemId));
    }
  };

  const handleDeleteSection = async () => {
    if (confirm("Delete section?") && id) {
      const success = await DeleteSection(Number(id));
      if (success) window.location.href = "/";
    }
  };

  const handleUpdateSection = async () => {
    if (!editSectionName.trim() || !id) return;
    const success = await UpdateSection(Number(id), editSectionName);
    if (success) {
      alert("Section updated");
      setSectionSettingsOpen(false);
    }
  };

  const handleAddItem = async () => {
    if (!itemForm.title || !itemForm.file || !id) return;
    const form = new FormData();
    form.append("title", itemForm.title);
    form.append("description", itemForm.description);
    form.append("type", itemForm.type);
    form.append("sectionId", id.toString());
    form.append("file", itemForm.file);

    const result = await AddItem(form as any);
    if (result) {
      await fetchItems();
      setAddItemMode(false);
      setItemForm({ title: "", description: "", file: null, type: "" });
    }
  };

  const handleUpdateItem = async (itemId: number) => {
    if (!itemForm.title || !itemForm.file) return;
    const form = new FormData();
    form.append("id", itemId.toString());
    form.append("title", itemForm.title);
    form.append("description", itemForm.description);
    form.append("file", itemForm.file);

    const result = await UpdateItem(form as any);
    if (result) {
      await fetchItems();
      setUpdateItemMode(null);
      setItemForm({ title: "", description: "", file: null, type: "Lesson" });
    }
  };

  return (
    <div className="py-3 space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 shadow rounded flex flex-col md:flex-row gap-3 items-center justify-between">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />
       
      </div>

      {/* Admin Section Settings */}
      {IsAdmin && (
        <div className="flex justify-end relative">
          <button onClick={() => setSectionSettingsOpen(!sectionSettingsOpen)} className="text-gray-600 hover:text-black">
            <Settings size={24} />
          </button>
          {sectionSettingsOpen && (
            <div className="absolute right-0 bg-white border rounded shadow z-10 p-3 mt-8 w-64">
              <input
                type="text"
                placeholder="New Section Name"
                value={editSectionName}
                onChange={(e) => setEditSectionName(e.target.value)}
                className="border w-full px-2 py-1 mb-2 rounded"
              />
              <button onClick={handleUpdateSection} className="block w-full py-1 bg-blue-500 text-white rounded mb-2">Update Section</button>
              <button onClick={handleDeleteSection} className="block w-full py-1 bg-red-500 text-white rounded mb-2">Delete Section</button>
              <button onClick={() =>{ setAddItemMode(true),setSectionSettingsOpen(false)}} className="block w-full py-1 bg-green-600 text-white rounded">Add New Item</button>
            </div>
          )}
        </div>
      )}

      {/* Add New Item */}
      {addItemMode && (
        <div className="border p-4 bg-gray-50 rounded space-y-2">
          <input type="text" placeholder="Title" className="border px-2 py-1 rounded w-full" value={itemForm.title} onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })} />
          <div className="space-y-2">
           <select
           value={itemForm.type}
           onChange={(e) => setItemForm({ ...itemForm, type: e.target.value })}
           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            >
          <option value="Cours">Cours</option>
          <option value="TD">TD</option>
          <option value="TP">TP</option>
          </select>
          </div>
          <textarea placeholder="Description" className="border px-2 py-1 rounded w-full" value={itemForm.description} onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })} />
          <input type="file" onChange={(e) => setItemForm({ ...itemForm, file: e.target.files?.[0] || null })} />
          <button onClick={handleAddItem} className="bg-blue-600 text-white px-3 py-1 rounded">Add Item</button>
        </div>
      )}

      {/* Resource Items */}
      {filteredItems.length > 0 ? filteredItems.map((item) => (
        <div key={item.id} className="border rounded-lg p-4 bg-white shadow-sm relative">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-black">{item.title}</h2>
           <div className={`relative ${item.type==="Cours"?"bg-green-600":item.type==="TD"?"bg-blue-600":"bg-violet-600"} p-1 px-2 rounded-lg`}>   <p className="font-semibold text-white">{item.type}</p></div>
            {IsAdmin && (
              <div className="relative">
                <button onClick={() => setItemSettingsOpen(itemSettingsOpen === item.id ? null : item.id)} className="text-gray-600 hover:text-black">
                  <Settings size={20} />
                </button>
               
                {itemSettingsOpen === item.id && (
                  <div className="absolute right-0 mt-2 bg-white border rounded shadow z-10">
                    <button onClick={() => { setUpdateItemMode(item.id); setItemForm({ title: item.title, description: item.description || "", file: null, type: item.type }); }} className="block px-3 py-1 text-sm hover:bg-gray-100">Update</button>
                    <button onClick={() => handleDeleteItem(item.id)} className="block px-3 py-1 text-sm hover:bg-gray-100 text-red-600">Delete</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {updateItemMode === item.id ? (
            <div className="space-y-2 mb-3">
              <input type="text" className="border px-2 py-1 rounded w-full" value={itemForm.title} onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })} />
              <textarea className="border px-2 py-1 rounded w-full" value={itemForm.description} onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })} />
              <input type="file" onChange={(e) => setItemForm({ ...itemForm, file: e.target.files?.[0] || null })} />
              <button onClick={() => handleUpdateItem(item.id)} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-xs text-gray-400 mb-2">Date: {new Date(item.createdAt).toLocaleDateString()}</p>
              <button onClick={() => handleDownload(item.file)} className="text-blue-600 underline mb-3">📄 Open File</button>
            </>
          )}




{/* YouTube */}
            {item.youTubeVideos.length > 0 && (
              <div className="mb-4">
                <button
                  onClick={() => toggleShowVideos(item.id)}
                  className="flex items-center gap-2 text-gray-800 font-medium hover:text-teal-700 md:hidden"
                >
                  {showVideos[item.id] ? (
                    <>
                      Hide Videos <ChevronUp size={18} />
                    </>
                  ) : (
                    <>
                      Show Videos <ChevronDown size={18} />
                    </>
                  )}
                </button>
                <div
                  className={`mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${
                    showVideos[item.id] ? "block" : "hidden"
                  } md:grid`}
                >
                  {item.youTubeVideos.map((video, index) => (
                    <a
                      key={index}
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition"
                    >
                      <img src={video.imageUrl} alt={video.title} className="w-full" />
                      <div className="p-2 text-sm font-medium">{video.title}</div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* GitHub */}
            {item.gthub.filter((gh) => gh.title && gh.url).length > 0 && (
              <div>
                <button
                  onClick={() => toggleShowGithub(item.id)}
                  className="flex items-center gap-2 text-gray-800 font-medium hover:text-indigo-700 md:hidden"
                >
                  {showGithub[item.id] ? (
                    <>
                      Hide GitHub Links <ChevronUp size={18} />
                    </>
                  ) : (
                    <>
                      Show GitHub Links <ChevronDown size={18} />
                    </>
                  )}
                </button>
                <ul
                  className={`mt-2 list-disc pl-6 text-sm text-gray-700 ${
                    showGithub[item.id] ? "block" : "hidden"
                  } md:block`}
                >
                  {item.gthub
                    .filter((g) => g.title && g.url)
                    .map((gh, index) => (
                      <li key={index}>
                        <a
                          href={gh.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline"
                        >
                          {gh.title}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            )}
            {/* AI Text*/}
{item.aiText?.trim() && (
  <div className="mt-4">
    <details className="group md:block">
      <summary className="md:hidden flex items-center gap-2 text-gray-800 font-medium hover:text-emerald-700 cursor-pointer">
        <span>Show AI {item.type==="Cours"?"Course":"Exercices"}</span>
        <ChevronDown
          className="group-open:hidden"
          size={18}
        />
        <ChevronUp
          className="hidden group-open:inline"
          size={18}
        />
      </summary>
      <div className="whitespace-pre-wrap text-gray-700 mt-2 border-l-4 border-emerald-400 pl-4 bg-gray-50 p-3 rounded md:block">
        {item.aiText}
      </div>
    </details>
  </div>
)}
        </div>
      )) : (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
}
