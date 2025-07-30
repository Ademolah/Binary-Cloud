import React, { useEffect, useRef, useState } from "react";

const mockLogs = [
  "🔧 Initializing deployment...",
  "📦 Installing dependencies...",
  "⚙️  Running build script...",
  "✅ Build complete.",
  "🚀 Deploying to Spectra cloud...",
  "🌐 Deployment successful at https://your-project.spectra.app"
];

const BuildTerminal = () => {
  const [logs, setLogs] = useState([]);
  const terminalRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < mockLogs.length) {
        setLogs((prev) => [...prev, mockLogs[index++]]);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: "smooth" });
  }, [logs]);

  return (
    <div className="bg-[#111827] text-green-400 font-mono text-sm p-4 rounded-md h-60 overflow-y-auto shadow-inner" ref={terminalRef}>
      {logs.map((line, idx) => (
        <div key={idx} className="whitespace-pre-wrap">{line}</div>
      ))}
    </div>
  );
};

export default BuildTerminal;
