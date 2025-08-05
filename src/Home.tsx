import { useEffect, useRef } from "react";

export function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 20; // Increased spacing
    const columns = Math.floor(canvas.width / (fontSize * 2)); // Fewer columns
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.07)"; // Slightly stronger fade for cleaner look
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0"; // Green text
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? "1" : "0";
        const x = i * fontSize * 2; // More space between columns
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 70); // Slightly slower
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-black text-white overflow-hidden">
      {/* Matrix background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <div className="mb-27">
        <h1 className="text-3xl font-bold mb-4">Welcome</h1>
        <p className="text-gray-100 mb-2">
          This is a simple platform for sharing second-year computer science university files.
        </p>
        <p className="text-gray-100 mb-2">Developer: Abdellah Saim Mamoune.</p>
        <p className="text-gray-100">All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

