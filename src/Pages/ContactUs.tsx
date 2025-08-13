import { useState } from "react";
import { User, Mail, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { ContactUsAPI } from "../Utilities/APIs";

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [statusType, setStatusType] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");
    setStatusType("idle");

    try {
      // Example: Call your backend API
      const res = await ContactUsAPI(formData);

      if (!res) throw new Error("Failed to send message");

      setStatusType("success");
      setStatusMessage("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatusType("error");
      setStatusMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 bg-black min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="relative bg-blue-900/30 border border-blue-500/20 backdrop-blur-xl p-5 rounded-2xl shadow-lg w-full max-w-lg space-y-5"
      >
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Contact Us
        </h2>

        {statusMessage && (
          <div
            className={`flex items-center gap-2 justify-center text-sm mt-3 mb-3 ${
              statusType === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {statusType === "success" ? (
              <CheckCircle size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            {statusMessage}
          </div>
        )}

        {/* Name */}
        <div className="flex items-center gap-3 border-b border-blue-500/30 pb-2">
          <User className="text-blue-300" size={20} />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 border-b border-blue-500/30 pb-2">
          <Mail className="text-blue-300" size={20} />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
            required
          />
        </div>

        {/* Message */}
        <div className="flex items-start gap-3 border-b border-blue-500/30 pb-2">
          <MessageSquare className="text-blue-300 mt-2" size={20} />
          <textarea
            name="message"
            placeholder="Write your message..."
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-transparent text-white placeholder-gray-400 outline-none resize-none"
            required
          />
        </div>

        {/* Submit */}
        <div className="w-full flex flex-col items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="w-40 lg:w-70 px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold hover:from-teal-300 hover:to-blue-400 transition-colors disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}
