import { useState } from "react";
import { Calendar, Link as LinkIcon, MapPin, Type as TypeIcon, User, Users } from "lucide-react";
import { AddEventRequestAPI } from "../Utilities/APIs";
import { IEventRequestAdd } from "../Utilities/Interfaces";

export function RequestEvent() {
  const [formData, setFormData] = useState<IEventRequestAdd>({
    name: "",
    organizer: "",
    type: "",
    region: "",
    date: "",
    url: ""
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const response = await AddEventRequestAPI(formData);
      if (response) {
        setStatusType("success");
        setStatusMessage("✅ Your event request has been submitted successfully!");
        setFormData({
          name: "",
          organizer: "",
          type: "",
          region: "",
          date: "",
          url: ""
        });
      } else {
        setStatusType("error");
        setStatusMessage("❌ Something went wrong. Please try again later.");
      }
    } catch (error) {
      setStatusType("error");
      setStatusMessage("❌ Could not submit request. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Galaxy background */}

       
      <div className="absolute inset-0 bg-black overflow-hidden">
        
        <canvas id="stars" className="absolute inset-0"></canvas>
      </div>
    
      <form
        onSubmit={handleSubmit}
        className="relative bg-blue-900/30 border border-blue-500/20 backdrop-blur-xl p-5 rounded-2xl shadow-lg w-full max-w-lg space-y-5"
      >
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Request an Event
        </h2>
          {statusMessage && (
            <p
              className={`text-center text-sm mt-5 mb-8 ${
                statusType === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {statusMessage}
            </p>
          )}
        {/* Name */}
        <div className="flex items-center gap-3 border-b border-blue-500/30 pb-2">
          <User className="text-blue-300" size={20} />
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
            required
          />
        </div>

        {/* Organizer */}
        <div className="flex items-center gap-3 border-b border-blue-500/30 pb-2">
          <Users className="text-blue-300" size={20} />
          <input
            type="text"
            name="organizer"
            placeholder="Organizer"
            value={formData.organizer}
            onChange={handleChange}
            className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
            required
          />
        </div>

        {/* Type */}
        <div className="flex items-center gap-3 border-b border-blue-500/30 pb-2">
          <TypeIcon className="text-blue-300" size={20} />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-transparent text-white outline-none placeholder-gray-400 appearance-none"
            required
          >
            <option value="" disabled className="bg-black text-gray-400">
              Type
            </option>
            <option value="Conference" className="bg-black text-white">Conference</option>
            <option value="Hackathone" className="bg-black text-white">Hackathone</option>
            <option value="Startup Festival" className="bg-black text-white">Startup Festival</option>
            <option value="Awards" className="bg-black text-white">Awards</option>
          </select>
        </div>

        {/* Region */}
        <div className="flex items-center gap-3 border-b border-blue-500/30 pb-2">
          <MapPin className="text-blue-300" size={20} />
          <input
            type="text"
            name="region"
            placeholder="Region"
            value={formData.region}
            onChange={handleChange}
            className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
            required
          />
        </div>

        {/* Date */}
        <div className="flex items-center gap-3 border-b border-blue-500/30 pb-2">
          <Calendar className="text-blue-300" size={20} />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
            required
          />
        </div>

        {/* URL */}
        <div className="flex items-center gap-3 border-b border-blue-500/30 pb-2">
          <LinkIcon className="text-blue-300" size={20} />
          <input
            type="url"
            name="url"
            placeholder="Event URL"
            value={formData.url}
            onChange={handleChange}
            className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
            required
          />
        </div>

        <div className="w-full flex flex-col items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="w-40 lg:w-70 px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold hover:from-teal-300 hover:to-blue-400 transition-colors disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>

          
        </div>
      </form>
    </div>
  );
}
