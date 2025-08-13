import { useState } from "react";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

export function StayNotified() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus("error");
      return;
    }
    setStatus("loading");

    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="p-6 bg-black flex flex-col items-center justify-center rounded-lg shadow-lg h-full w-full border border-purple-500/30">
      
      <div className="flex flex-col items-center justify-center mb-30">
      <h2 className="text-2xl font-bold text-white mb-2">
        Stay Notified
      </h2>
      <p className="text-sm text-gray-400 mb-5 text-center max-w-sm">
        Subscribe to get the latest updates on events, special announcements, and more.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
        <div className="flex items-center gap-3 border-b border-purple-500/30 pb-2 w-full focus-within:border-purple-400 transition-colors">
          <Mail className="text-purple-300" size={20} />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent text-white outline-none placeholder-gray-400"
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className={` px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold hover:from-teal-300 hover:to-blue-400 transition-colors ${
            status === "loading" && "opacity-70 cursor-not-allowed"
          }`}
        >
          {status === "loading" ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>

      {status === "success" && (
        <div className="flex items-center gap-2 mt-3 text-green-400 text-sm">
          <CheckCircle size={16} />
          You have successfully subscribed!
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 mt-3 text-red-400 text-sm">
          <AlertCircle size={16} />
          Please enter a valid email.
        </div>
      )}
      </div>
    </div>
  );
}
