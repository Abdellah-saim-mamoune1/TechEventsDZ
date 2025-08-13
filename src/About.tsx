export function About() {
  return (
    <div className="p-4 sm:p-10 lg:p-26 bg-black rounded-lg shadow-lg border border-blue-500/30 mx-auto h-full w-full">
      <h2 className="text-2xl text-center font-bold text-white mb-4">About Us</h2>

      <p className="text-gray-300 leading-relaxed mb-4">
        Welcome to{" "}
        <a
          href="/"
          className="text-blue-300 font-medium hover:underline hover:text-blue-400 transition-colors"
        >
          TechEvents DZ
        </a>{" "}
        — a platform dedicated to showcasing{" "}
        <span className="text-blue-400 font-medium">technology-related events</span>{" "}
        happening across Algeria.
      </p>

      <p className="text-gray-300 leading-relaxed mb-4">
        Whether it’s conferences, hackathons, workshops, or community meetups, our
        goal is to make it easy for tech enthusiasts, students, and professionals
        to stay informed and connected.
      </p>

      <p className="text-gray-300 leading-relaxed mb-6">
        Know an upcoming event that’s not listed here? Use our{" "}
        <a
          href="/request-event"
          className="text-blue-300 font-medium hover:underline hover:text-blue-400 transition-colors"
        >
          Request Event
        </a>{" "}
        feature to share the details, and we’ll add it so the community can
        benefit.
      </p>

      <div className="flex items-center gap-3 mt-4">
        <a
          href="/"
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold hover:from-teal-300 hover:to-blue-400 transition-colors"
        >
          Browse Events
        </a>
      </div>
    </div>
  );
}
