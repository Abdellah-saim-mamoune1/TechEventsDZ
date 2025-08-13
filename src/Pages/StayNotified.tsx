import { useState } from "react";
import { Mail, CheckCircle, AlertCircle, User } from "lucide-react";
import { IStayNotified } from "../Utilities/Interfaces";
import { StayNotifiedAPI } from "../Utilities/APIs";

export function StayNotified() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    const data: IStayNotified = {
      name: name,
      account: email,
    };

    try {
      const response = await StayNotifiedAPI(data);
      if (!response) {
        setStatus("error");
      } else {
        setStatus("success");
        setEmail("");
        setName("");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex justify-center items-center px-4 bg-black min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="relative bg-blue-900/30 border border-blue-500/20 backdrop-blur-xl p-5 rounded-2xl shadow-lg w-full max-w-lg space-y-5"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 text-white text-center">
          Stay Notified
        </h2>
        <p className="text-sm text-gray-400 mb-4 text-center max-w-sm mx-auto">
          Subscribe to get the latest updates on events, announcements, and more.
        </p>

        {/* Status Messages */}
        {status === "success" && (
          <div className="flex items-center gap-2 justify-center text-green-400 text-sm">
            <CheckCircle size={16} />
            You have successfully subscribed!
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 justify-center text-red-400 text-sm">
            <AlertCircle size={16} />
            Something went wrong. Please try again.
          </div>
        )}

        {/* Name */}
        <div className="flex items-center gap-3 border-b border-blue-500/30 pb-2">
          <User className="text-blue-300" size={20} />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
            required
          />
        </div>

        {/* Submit */}
        <div className="w-full flex flex-col items-center gap-3">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-40 lg:w-70 px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold hover:from-teal-300 hover:to-blue-400 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </form>
    </div>
  );
}
