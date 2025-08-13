
export function Home() {
  const today = new Date();
  const events = [
    {
      id: 1,
      name: "Hackathon 2025",
      type: "Online",
      organizer: "Tech Innovators",
      region: "Global",
      date: "2025-10-15",
      url: "https://hackathon2025.com",
    },
    {
      id: 2,
      name: "AI Summit",
      type: "In-Person",
      organizer: "AI Corp",
      region: "USA",
      date: "2025-12-01",
      url: "https://aisummit.com",
    },
    {
      id: 3,
      name: "Developer Fest",
      type: "Hybrid",
      organizer: "CodeWorld",
      region: "Europe",
      date: "2025-08-10",
      url: "https://devfest.com",
    },
  ];

  const getStatus = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    if (eventDate.toDateString() === today.toDateString()) return "Ongoing";
    return eventDate < today ? "Completed" : "Upcoming";
  };

  const statusColors: Record<string, string> = {
    Completed: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    Upcoming: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
    Ongoing: "bg-green-500/20 text-green-300 border-green-400/30",
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden p-4">
  
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-3xl ml-[-10px] lg-text-4xl font-bold mb-8">🌌 Events</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {events.map((event) => {
            const status = getStatus(event.date);
            return (
              <div
                key={event.id}
                className="bg-gray-900/70 border border-gray-700 rounded-xl p-5 shadow-lg backdrop-blur-sm hover:scale-105 transition-transform"
              >
                <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                <p className="text-sm text-gray-400 mb-1">
                  <span className="font-bold">Type:</span> {event.type}
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  <span className="font-bold">Organizer:</span> {event.organizer}
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  <span className="font-bold">Region:</span> {event.region}
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  <span className="font-bold">Date:</span> {event.date}
                </p>
                <a
                  href={event.url}
                  className="block mt-3 text-cyan-300 hover:text-cyan-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔗 Visit Website
                </a>
                <span
                  className={`inline-block mt-4 px-3 py-1 text-xs rounded-full border ${statusColors[status]}`}
                >
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
