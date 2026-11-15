import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaReddit } from "react-icons/fa6";
import GlitchHeading from "./GlitchHeading";
import SignOff from "./Signoff";
import cyberpunkPigeon from "../assets/gifs/cyberpunk_pigeon.gif";

const EMAIL = "kumarannk95@gmail.com";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          time: new Date().toLocaleString(),
        },
        PUBLIC_KEY
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 pt-2 sm:pt-4 pb-28 scroll-mt-20">
      {/* Heading + Pigeon mascot */}
      <div className="flex flex-wrap items-baseline gap-0 mb-12">
        <GlitchHeading text="CONTACT" />
        <motion.div
          className="cursor-pointer drop-shadow-[0_0_12px_rgba(2,243,246,0.35)] shrink-0 select-none self-baseline -ml-6 sm:-ml-8"
          whileHover={{ scale: 1.15, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          title="Cyberpunk Pigeon"
        >
          <img
            src={cyberpunkPigeon}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={723}
            height={241}
            className="h-[52px] sm:h-[64px] lg:h-[74px] w-auto object-contain pointer-events-none block translate-y-[7px] sm:translate-y-[9px]"
            style={{ imageRendering: "pixelated" }}
          />
        </motion.div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,490px)_1fr] lg:grid-cols-[minmax(0,460px)_1fr] gap-8 xl:gap-12 items-start">
        {/* ─── Left column: Terminal form (portrait-oriented) ─── */}
        <div className="relative w-full max-w-[490px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-black rounded-xl overflow-hidden flex flex-col"
            style={{
              border: "2px solid #000000",
              boxShadow: "8px 8px 0px 0px #00f5ff",
            }}
          >
            {/* Title bar */}
            <div className="relative flex items-center px-4 py-2.5 border-b-2 border-black bg-[#1e1e24]">
              <div className="flex items-center gap-2 z-10">
                <span className="w-3 h-3 rounded-full bg-[#ff006e]" />
                <span className="w-3 h-3 rounded-full bg-[#ffe600]" />
                <span className="w-3 h-3 rounded-full bg-[#00f5ff]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center font-code-sm text-white font-bold text-xs pointer-events-none">
                contact.sh
              </div>
            </div>

            <div className="p-6 font-code-sm text-code-sm text-white flex-grow flex flex-col gap-4">
              <div>
                <span className="text-spider-cyan font-bold">kumaran@terminal</span>:
                <span className="text-[#ffe600] font-bold">~</span>$ ./initiate_contact.sh
              </div>

              <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-2">
                {/* Name */}
                <div className="flex items-center gap-2 border-b-2 border-white/20 pb-1 focus-within:border-spider-cyan transition-colors">
                  <span className="text-spider-magenta font-bold">&gt;</span>
                  <label className="sr-only" htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={onChange}
                    placeholder="Name="
                    autoComplete="off"
                    spellCheck="false"
                    className="bg-transparent border-none text-spider-cyan placeholder-white/30 focus:ring-0 w-full p-0 font-code-sm font-bold outline-none"
                  />
                </div>

                {/* Email */}
                <div className="flex items-center gap-2 border-b-2 border-white/20 pb-1 focus-within:border-spider-cyan transition-colors">
                  <span className="text-spider-magenta font-bold">&gt;</span>
                  <label className="sr-only" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={onChange}
                    placeholder="Email="
                    autoComplete="off"
                    spellCheck="false"
                    className="bg-transparent border-none text-spider-cyan placeholder-white/30 focus:ring-0 w-full p-0 font-code-sm font-bold outline-none"
                  />
                </div>

                {/* Message */}
                <div className="flex items-start gap-2 border-b-2 border-white/20 pb-1 h-24 focus-within:border-spider-cyan transition-colors">
                  <span className="text-spider-magenta font-bold mt-1">&gt;</span>
                  <label className="sr-only" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={form.message}
                    onChange={onChange}
                    placeholder="Message="
                    autoComplete="off"
                    spellCheck="false"
                    className="bg-transparent border-none text-spider-cyan placeholder-white/30 focus:ring-0 w-full p-0 font-code-sm font-bold resize-none h-full outline-none"
                  />
                </div>

                {/* Send button */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-4 bg-black text-spider-cyan border-2 border-spider-cyan hover:bg-spider-cyan hover:text-black hover:border-black font-extrabold py-2 px-4 rounded-sm shadow-[4px_4px_0_0_#ff006e] transition-all self-start flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{status === "sending" ? "[SENDING...]" : "[EXECUTE_SEND]"}</span>
                  <span className="material-symbols-outlined text-sm font-bold">send</span>
                </button>
              </form>

              {status === "sent" && (
                <p className="mt-2 text-sm font-bold text-spider-cyan">&gt; STATUS: MESSAGE_SENT ✓ — thanks, I&apos;ll reply soon.</p>
              )}
              {status === "error" && (
                <p className="mt-2 text-sm font-bold text-spider-magenta">&gt; STATUS: SEND_FAILED — try emailing directly.</p>
              )}

              {/* Blinking cyan block cursor */}
              <div className="mt-auto pt-4 flex gap-2 items-center opacity-50">
                <div className="w-2 h-4 bg-spider-cyan animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Right side: Direct Connect + Two Sticky Notes to its right ─── */}
        <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 xl:gap-10 items-start w-full">
          {/* Direct Connect panel + Socials */}
          <div className="w-full sm:max-w-[360px] md:max-w-[380px] space-y-6 shrink-0">
            {/* Direct connect panel */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative overflow-hidden bg-[#222222] p-6 sm:p-7 rounded-xl"
              style={{
                border: "3.5px solid #2e2e2e",
                boxShadow: "6px 6px 0px 0px #000000",
              }}
            >
              {/* Watermark in top right matching reference */}
              <svg
                viewBox="0 0 100 80"
                fill="none"
                className="absolute top-1 right-1 w-20 h-16 text-[#ff006e] opacity-20 pointer-events-none select-none"
              >
                <rect x="2" y="2" width="96" height="76" rx="14" stroke="currentColor" strokeWidth="4" />
                <circle cx="34" cy="30" r="12" fill="currentColor" />
                <path d="M 16 64 C 16 48, 52 48, 52 64" fill="currentColor" />
                <rect x="56" y="20" width="30" height="20" rx="3" stroke="currentColor" strokeWidth="3" />
                <path d="M 58 22 L 71 32 L 84 22" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>

              <h3 className="text-xl font-extrabold tracking-wider text-white mb-6 uppercase">
                DIRECT CONNECT
              </h3>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3.5 mb-4 text-sm sm:text-base font-semibold text-white/90 hover:text-[#00f5ff] transition-colors duration-200"
              >
                <Mail size={18} className="text-[#ff006e] shrink-0" />
                <span>{EMAIL}</span>
              </a>

              <p className="flex items-center gap-3.5 text-sm sm:text-base font-semibold text-white/90">
                <MapPin size={18} className="text-[#ff006e] shrink-0" />
                <span>Saveetha Engineering College, Chennai</span>
              </p>
            </motion.div>

            {/* Social link cards (4 cards: 2x2 grid) */}
            <div className="grid grid-cols-2 gap-4">
              {/* GitHub */}
              <motion.a
                href="https://github.com/Kumaran-NK"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                whileHover={{ y: -3 }}
                className="group flex flex-col items-center justify-center gap-2.5 py-5 bg-[#222222] text-[#e8e8e8] rounded-xl hover:border-[#00f5ff] transition-colors duration-200 cursor-pointer"
                style={{
                  border: "3.5px solid #2e2e2e",
                  boxShadow: "6px 6px 0px 0px #000000",
                }}
              >
                <FaGithub size={24} className="text-[#888888] group-hover:text-[#00f5ff] transition-colors" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#a3a3a3] group-hover:text-[#00f5ff] transition-colors">
                  GITHUB
                </span>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/kumaran-n-184b87339"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -3 }}
                className="group flex flex-col items-center justify-center gap-2.5 py-5 bg-[#222222] text-[#e8e8e8] rounded-xl hover:border-[#ff006e] transition-colors duration-200 cursor-pointer"
                style={{
                  border: "3.5px solid #2e2e2e",
                  boxShadow: "6px 6px 0px 0px #000000",
                }}
              >
                <FaLinkedin size={24} className="text-[#888888] group-hover:text-[#ff006e] transition-colors" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#a3a3a3] group-hover:text-[#ff006e] transition-colors">
                  LINKEDIN
                </span>
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                whileHover={{ y: -3 }}
                className="group flex flex-col items-center justify-center gap-2.5 py-5 bg-[#222222] text-[#e8e8e8] rounded-xl hover:border-[#ff006e] transition-colors duration-200 cursor-pointer"
                style={{
                  border: "3.5px solid #2e2e2e",
                  boxShadow: "6px 6px 0px 0px #000000",
                }}
              >
                <FaInstagram size={24} className="text-[#888888] group-hover:text-[#ff006e] transition-colors" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#a3a3a3] group-hover:text-[#ff006e] transition-colors">
                  INSTAGRAM
                </span>
              </motion.a>

              {/* Reddit */}
              <motion.a
                href="https://reddit.com/"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -3 }}
                className="group flex flex-col items-center justify-center gap-2.5 py-5 bg-[#222222] text-[#e8e8e8] rounded-xl hover:border-[#00f5ff] transition-colors duration-200 cursor-pointer"
                style={{
                  border: "3.5px solid #2e2e2e",
                  boxShadow: "6px 6px 0px 0px #000000",
                }}
              >
                <FaReddit size={24} className="text-[#888888] group-hover:text-[#00f5ff] transition-colors" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#a3a3a3] group-hover:text-[#00f5ff] transition-colors">
                  REDDIT
                </span>
              </motion.a>
            </div>
          </div>

          {/* ─── Sticky Notes on the right side of Direct Connect ─── */}
          <div className="flex flex-row sm:flex-col gap-6 justify-center sm:justify-start items-center sm:items-start pt-2 shrink-0">
            {/* Sticky Note 1: Reach Me! */}
            <motion.div
              initial={{ opacity: 0, rotate: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, rotate: 3, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 220, damping: 15, delay: 0.2 }}
              whileHover={{ rotate: 0, scale: 1.04 }}
              className="relative text-black p-4 rounded shadow-[6px_6px_0_0_#000000] w-48 border-4 border-black select-none cursor-default"
              style={{ backgroundColor: "var(--spider-yellow, #ffe600)" }}
            >
              {/* Tape strip */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-white/50 border border-black/10 shadow-sm rotate-[-2deg]" />
              <h3 className="font-hand font-bold text-2xl mb-1 text-black leading-tight">Reach Me!</h3>
              <p className="font-mono text-xs font-bold text-black leading-snug">Let&apos;s build something cool.</p>
            </motion.div>

            {/* Sticky Note 2: Open to Work! */}
            <motion.div
              initial={{ opacity: 0, rotate: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, rotate: -2, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 220, damping: 15, delay: 0.3 }}
              whileHover={{ rotate: 0, scale: 1.04 }}
              className="relative text-black p-4 rounded shadow-[6px_6px_0_0_#000000] w-48 border-4 border-black select-none cursor-default"
              style={{ backgroundColor: "var(--spider-yellow, #ffe600)" }}
            >
              {/* Tape strip */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-white/50 border border-black/10 shadow-sm rotate-[2deg]" />
              <h3 className="font-hand font-bold text-2xl mb-1 text-black leading-tight">Open to Work!</h3>
              <p className="font-mono text-xs font-bold text-black leading-snug">Available for roles &amp; projects.</p>
            </motion.div>

            {/* Sticky Note 3: Coffee Chat! */}
            <motion.div
              initial={{ opacity: 0, rotate: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, rotate: 2, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 220, damping: 15, delay: 0.4 }}
              whileHover={{ rotate: 0, scale: 1.04 }}
              className="relative text-black p-4 rounded shadow-[6px_6px_0_0_#000000] w-48 border-4 border-black select-none cursor-default"
              style={{ backgroundColor: "var(--spider-yellow, #ffe600)" }}
            >
              {/* Tape strip */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-white/50 border border-black/10 shadow-sm rotate-[-1deg]" />
              <h3 className="font-hand font-bold text-2xl mb-1 text-black leading-tight">Coffee Chat!</h3>
              <p className="font-mono text-xs font-bold text-black leading-snug">Always up for tech &amp; AI talk.</p>
            </motion.div>
          </div>
        </div>
      </div>

      <SignOff />
    </section>
  );
}
