export function ContactUs() {
  return (
    <div className="p-4 sm:p-10 lg:p-12 bg-black rounded-lg shadow-lg border border-blue-500/30 mx-auto h-full w-full">
      <h2 className="text-2xl text-center font-bold text-white mb-4">Contact Us</h2>
    <div className="max-w-lg mx-auto">
      <p className="text-gray-300 leading-relaxed mb-3 text-center">
        Have questions, suggestions, or partnership inquiries?  
        We’d love to hear from you!
      </p>
    </div>
      <form className="space-y-4 max-w-lg mx-auto">
        <div>
          <label className="block text-gray-300 mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your full name"
            className="w-full px-4 py-2 bg-gray-900 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 bg-gray-900 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Write your message..."
            className="w-full px-4 py-2 bg-gray-900 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full flex items-center justify-center">
        <button
          type="submit"
          className="w-40 lg:w-70 px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold hover:from-teal-300 hover:to-blue-400 transition-colors"
        >
          Send Message
        </button>
        </div>
      </form>
    </div>
  );
}
