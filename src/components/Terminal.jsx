import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

// --- CUSTOM ANIMATED COMPONENTS FOR COMMANDS ---

// 1. The Virus Simulation Component
const VirusSimulation = ({ onEnd }) => {
  const [lines, setLines] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    const corruptedText = [
      "> CRITICAL_ERROR: Unhandled exception in cyber-interface.",
      "> [SYSTEM] Security protocols overridden. Root access achieved.",
      "> [VIRUS] Initializing 'NEON_DECAY.exe'...",
      "> [#####################] (100%) - PAYLOAD DEPLOYED",
      "> ",
      "> [ENCRYPTING FILES...] /home/user/portfolio/src",
      "> [ENCRYPTING FILES...] /home/user/personal/logs",
      "> [DELETING BACKUPS...] /mnt/sys/backups/latest.bak",
      "> ",
      "> SYSTEM CORE ACCESS: GRANTED",
      "> DATA_EXFIL_TO: arachnid_net.onion",
      "> ",
      "> [FILE_#122_CORRUPTED] /usr/config/auth.sys",
      "> [FILE_#123_CORRUPTED] /var/www/index.html",
      "> [FILE_#124_CORRUPTED] /bin/bash",
      "> [FILE_#125_CORRUPTED] /etc/sudoers",
      "> ",
      "> WARNING: KERNEL INTEGRITY FAILURE",
      "> ",
      "> All authentication protocols terminated.",
      "> ",
      "> SYSTEM STATUS: TOTAL_COMPROMISE",
      "> ",
      "> Connection terminated by hostile entity.",
      "> ",
      "> (Press any key to reboot... oh wait, you can't.)",
    ];

    let count = 0;
    const interval = setInterval(() => {
      setLines((prev) => [...prev, corruptedText[count]]);
      count++;
      if (count === corruptedText.length) {
        clearInterval(interval);
        setTimeout(onEnd, 2000); 
      }
    }, 200);

    return () => clearInterval(interval);
  }, [onEnd]);

  return (
    <div className="h-full overflow-y-auto text-red-500 font-bold font-mono">
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

// 2. The Breach Sequence Component 
const BreachSequence = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Bypassing ICE...");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStatus("ACCESS GRANTED - MAINFRAME COMPROMISED");
          return 100;
        }
        if (p === 40) setStatus("Decrypting localized nodes...");
        if (p === 80) setStatus("Extracting payload...");
        return p + Math.floor(Math.random() * 15);
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const bar = `[${"|".repeat(Math.floor(progress / 5))}${".".repeat(20 - Math.floor(progress / 5))}]`;

  return (
    <div className="text-red-400 font-mono flex flex-col gap-1">
      <div>{status}</div>
      <div>{bar} {progress > 100 ? 100 : progress}%</div>
    </div>
  );
};

// 3. The Neofetch Component
const Neofetch = () => (
  <div className="flex flex-col md:flex-row gap-4 my-2 text-[var(--circuit,cyan)]">
    <pre className="text-xs leading-none">
{`   ,_,
  (o,o)
  {` + "`" + `"}` + `}
  -"-"-`}
    </pre>
    <div className="flex flex-col gap-1">
      <div className="font-bold text-white">kumaran@cyber-deck</div>
      <div>------------------</div>
      <div><span className="font-bold">OS:</span> NightCity v2.0</div>
      <div><span className="font-bold">Host:</span> Human/Cyborg Hybrid</div>
      <div><span className="font-bold">Kernel:</span> React.js & Tailwind</div>
      <div><span className="font-bold">Uptime:</span> Unknown</div>
      <div><span className="font-bold">Class:</span> Netrunner (Front-end)</div>
    </div>
  </div>
);

// 4. The NEW Matrix Rain Component (Canvas Based)
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Set fixed height, but dynamic width based on parent container
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 250;

    // Mix of Katakana, Latin, and numeric characters for that authentic look
    const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const alphabet = katakana + latin + nums;

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array to track the Y coordinate of each column of rain
    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // Black background with slight opacity creates the fading trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0"; // Classic Matrix Green
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to the top randomly to create the staggered falling effect
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40); // 40ms = ~25fps

    // Handle resizing so the canvas doesn't stretch weirdly if the user resizes the window
    const handleResize = () => {
      canvas.width = canvas.parentElement.clientWidth;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden border border-green-500/30 my-2 rounded-sm bg-black">
      <canvas ref={canvasRef} className="w-full block" />
    </div>
  );
};

// 5. The Ping Arasaka Component
const PingArasaka = () => {
  const [lines, setLines] = useState(["Pinging arasaka.corp [192.168.66.6] with 32 bytes of data:"]);
  
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setLines((prev) => {
        if (count === 3) return [...prev, "Request timed out - ICE INTERVENTION DETECTED."];
        if (count > 4) {
          clearInterval(interval);
          return [...prev, "Ping statistics: Packets: Sent = 4, Received = 2, Lost = 2 (50% loss)"];
        }
        return [...prev, "Reply from 192.168.66.6: bytes=32 time=41ms TTL=112"];
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      {lines.map((line, i) => (
        <span key={i} className={line.includes("ICE") ? "text-red-500 font-bold" : ""}>{line}</span>
      ))}
    </div>
  );
};


// --- MAIN TERMINAL COMPONENT ---

export default function Terminal({ onClose }) {
  const [input, setInput] = useState("");
  const [isGlitching, setIsGlitching] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [virusActive, setVirusActive] = useState(false);
  
  const [history, setHistory] = useState([
    { type: "output", text: "Welcome to KUMARAN_S_TERMINAL v2.0.0 (Cyberpunk Edition)" },
    { type: "output", text: 'Type "help" for a list of commands.' },
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, input]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = input.trim();
      const lowerCmd = cmd.toLowerCase();
      const newHistory = [...history, { type: "command", text: cmd }];

      if (lowerCmd === "") {
        // Do nothing
      } else if (lowerCmd === "clear") {
        setHistory([]);
        setInput("");
        return;
      } else if (lowerCmd === "help") {
        newHistory.push({
          type: "output",
          text: "Commands: help, whoami, clear, hack, virus, glitch, matrix, neofetch, theme <color>, ping arasaka, sudo rm -rf /",
        });
      } else if (lowerCmd === "whoami") {
        newHistory.push({ type: "output", text: "Kumaran - Netrunner trying to build some cool stuff." });
      } else if (lowerCmd === "hack" || lowerCmd === "breach") {
        newHistory.push({ type: "output", component: <BreachSequence /> });
      } else if (lowerCmd === "virus" || lowerCmd === "run virus.exe") {
        setVirusActive(true);
        newHistory.push({ type: "output", component: <VirusSimulation onEnd={() => setVirusActive(false)} /> });
      } else if (lowerCmd === "neofetch" || lowerCmd === "sysinfo") {
        newHistory.push({ type: "output", component: <Neofetch /> });
      } else if (lowerCmd === "matrix") {
        newHistory.push({ type: "output", component: <MatrixRain /> });
      } else if (lowerCmd === "ping arasaka" || lowerCmd === "ping militech") {
        newHistory.push({ type: "output", component: <PingArasaka /> });
      } else if (lowerCmd.startsWith("theme ")) {
        const color = lowerCmd.split(" ")[1];
        document.documentElement.style.setProperty('--circuit', color);
        newHistory.push({ type: "output", text: `Theme color overridden to: ${color}` });
      } else if (lowerCmd === "glitch") {
        setIsGlitching(true);
        newHistory.push({ type: "output", text: "Initiating localized UI glitch..." });
        setTimeout(() => setIsGlitching(false), 2500); 
      } else if (lowerCmd === "sudo rm -rf /") {
        newHistory.push({ type: "output", text: "CRITICAL SYSTEM OVERLOAD. INITIATING SHUTDOWN...", className: "text-red-500 font-bold animate-pulse" });
        setTimeout(() => {
          setIsShuttingDown(true);
          setTimeout(onClose, 600); 
        }, 1500);
      } else {
        newHistory.push({ type: "output", text: `bash: ${cmd}: command not found` });
      }

      setHistory(newHistory);
      setInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      
      <div 
        className={`w-full max-w-2xl bg-black rounded-lg overflow-hidden flex flex-col font-mono text-sm shadow-[8px_8px_0px_0px_var(--circuit,rgba(47,230,217,1))] border-2 border-[var(--circuit,rgba(47,230,217,0.5))] transition-all duration-300
          ${isGlitching ? 'glitch-active' : ''} 
          ${isShuttingDown ? 'animate-crt-off' : ''}
          ${virusActive ? 'border-red-500 shadow-red-500/50' : ''}
        `}
        onClick={() => document.getElementById("terminal-input").focus()}
      >
        <div className={`bg-[#1a1a1a] flex items-center justify-between px-4 py-2 relative border-b border-[var(--circuit,cyan)]/30 ${virusActive ? 'border-red-500' : ''}`}>
          <div className="flex gap-2 z-10">
            <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer shadow-[0_0_5px_red]" onClick={onClose}></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_5px_yellow]"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_green]"></div>
          </div>
          <div className={`absolute inset-0 flex items-center justify-center text-[var(--circuit,cyan)] text-xs font-semibold pointer-events-none opacity-70 ${virusActive ? 'text-red-500 font-bold' : ''}`}>
            {virusActive ? 'SYSTEM_COMPROMISED - bash - kumaran@cyber-deck' : 'bash - kumaran@cyber-deck'}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white z-10 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="p-4 h-96 overflow-y-auto text-gray-100 flex flex-col gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {history.map((line, index) => (
            <div key={index} className="break-words w-full">
              {line.type === "command" ? (
                <div>
                  <span className="text-[var(--circuit,cyan)] font-bold">kumaran@cyber-deck:~$</span>{" "}
                  {line.text}
                </div>
              ) : (
                <div className={`text-gray-300 w-full ${line.className || ""}`}>
                  {line.component ? line.component : line.text}
                </div>
              )}
            </div>
          ))}
          
          {!isShuttingDown && !virusActive && (
            <div className="flex items-center mt-1">
              <span className="text-[var(--circuit,cyan)] font-bold shrink-0">
                kumaran@cyber-deck:~$
              </span>
              <input
                id="terminal-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="flex-1 bg-transparent border-none outline-none text-gray-100 ml-2"
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          )}
          {virusActive && (
            <div className="flex items-center mt-1 text-red-500 font-bold animate-pulse shrink-0">
              [FILE_CORRUPTION_IN_PROGRESS...] DO NOT TERMINATE SESSION
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}