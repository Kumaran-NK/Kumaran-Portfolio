import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Code2, Link2, Send } from "lucide-react";
import GlitchHeading from "./GlitchHeading";
import SignOff from "./SignOff";

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
    <section id="contact" className="max-w-7xl mx-auto px-6 py-28 scroll-mt-20">
      {/* Heading */}
      <div className="mb-12">
        <GlitchHeading text="CONTACT" />
      </div>

      <div className="grid xl:grid-cols-[minmax(0,470px)_1fr] lg:grid-cols-[minmax(0,440px)_1fr] gap-8 xl:gap-12 items-start">
        {/* ─── Left column: Terminal form (portrait-oriented) ─── */}
        <div className="relative w-full max-w-[470px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-black rounded-xl overflow-hidden"
            style={{
              border: "2px solid #000000",
              boxShadow: "8px 8px 0px 0px #00f5ff",
            }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b-2 border-black bg-[#1e1e24]">
              <span className="w-3 h-3 rounded-full bg-[#ff006e]" />
              <span className="w-3 h-3 rounded-full bg-[#ffe600]" />
              <span className="w-3 h-3 rounded-full bg-[#00f5ff]" />
              <span className="flex-1 text-center text-xs font-mono font-bold text-[#a3a3a3] tracking-wide pr-12">
                contact.sh
              </span>
            </div>

            <form onSubmit={onSubmit} className="p-6 sm:p-8 font-mono text-sm">
              {/* Prompt line: cyan username, white ~$ and script */}
              <p className="mb-6 text-sm font-bold">
                <span className="text-[#00f5ff]">kumaran@terminal:</span>
                <span className="text-white">~$ </span>
                <span className="text-white">./initiate_contact.sh</span>
              </p>

              {/* Name */}
              <label className="group flex items-center gap-2.5 border-b border-[#2e2e2e] focus-within:border-[#00f5ff]/60 py-4 transition-colors duration-200">
                <span className="text-[#ff006e] font-bold text-base">&gt;</span>
                <span className="text-[#a3a3a3] font-bold text-sm shrink-0">Name=</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  autoComplete="off"
                  spellCheck="false"
                  className="flex-1 bg-transparent outline-none border-none text-[#00f5ff] font-bold text-sm placeholder:text-[#a3a3a3]/30 caret-[#00f5ff] selection:bg-[#00f5ff]/20 selection:text-white"
                  placeholder=""
                />
              </label>

              {/* Email */}
              <label className="group flex items-center gap-2.5 border-b border-[#2e2e2e] focus-within:border-[#00f5ff]/60 py-4 transition-colors duration-200">
                <span className="text-[#ff006e] font-bold text-base">&gt;</span>
                <span className="text-[#a3a3a3] font-bold text-sm shrink-0">Email=</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  autoComplete="off"
                  spellCheck="false"
                  className="flex-1 bg-transparent outline-none border-none text-[#00f5ff] font-bold text-sm placeholder:text-[#a3a3a3]/30 caret-[#00f5ff] selection:bg-[#00f5ff]/20 selection:text-white"
                  placeholder=""
                />
              </label>

              {/* Message */}
              <label className="group flex gap-2.5 border-b border-[#2e2e2e] focus-within:border-[#00f5ff]/60 py-4 items-start transition-colors duration-200">
                <span className="text-[#ff006e] font-bold text-base mt-0.5">&gt;</span>
                <span className="text-[#a3a3a3] font-bold text-sm shrink-0 mt-0.5">Message=</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={4}
                  autoComplete="off"
                  spellCheck="false"
                  className="flex-1 bg-transparent outline-none border-none resize-none text-[#00f5ff] font-bold text-sm placeholder:text-[#a3a3a3]/30 caret-[#00f5ff] selection:bg-[#00f5ff]/20 selection:text-white"
                  placeholder=""
                />
              </label>

              {/* Send button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-7 inline-flex items-center gap-2.5 px-4 py-2 font-mono text-sm font-extrabold bg-black text-[#00f5ff] hover:bg-[#00f5ff] hover:text-black transition-colors duration-200 disabled:opacity-50 cursor-pointer"
                style={{
                  border: "1.8px solid #00f5ff",
                  borderRadius: 2,
                  boxShadow: "4px 4px 0px 0px #ff006e",
                }}
              >
                <span>{status === "sending" ? "[SENDING...]" : "[EXECUTE_SEND]"}</span>
                <Send size={14} className="fill-current" />
              </button>

              {status === "sent" && (
                <p className="mt-3 text-sm font-bold text-[#00f5ff]">&gt; STATUS: MESSAGE_SENT ✓ — thanks, I&apos;ll reply soon.</p>
              )}
              {status === "error" && (
                <p className="mt-3 text-sm font-bold text-[#ff006e]">&gt; STATUS: SEND_FAILED — try the email link instead.</p>
              )}

              {/* Blinking cyan block cursor */}
              <p className="mt-5">
                <span className="inline-block w-2.5 h-4.5 bg-[#00f5ff] animate-pulse" />
              </p>
            </form>
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
                className="absolute -top-1 -right-1 w-32 h-26 text-[#ff006e] opacity-20 pointer-events-none select-none"
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

            {/* Social link cards */}
            <div className="grid grid-cols-2 gap-4">
              <motion.a
                href="https://github.com/Kumaran-NK"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                whileHover={{ y: -3 }}
                className="group flex flex-col items-center justify-center gap-2.5 py-6 bg-[#222222] text-[#e8e8e8] rounded-xl hover:border-[#00f5ff] transition-colors duration-200"
                style={{
                  border: "3.5px solid #2e2e2e",
                  boxShadow: "6px 6px 0px 0px #000000",
                }}
              >
                <Code2 size={24} className="text-[#888888] group-hover:text-[#00f5ff] transition-colors" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#a3a3a3] group-hover:text-[#00f5ff] transition-colors">
                  GITHUB
                </span>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/kumaran-n-184b87339"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -3 }}
                className="group flex flex-col items-center justify-center gap-2.5 py-6 bg-[#222222] text-[#e8e8e8] rounded-xl hover:border-[#ff006e] transition-colors duration-200"
                style={{
                  border: "3.5px solid #2e2e2e",
                  boxShadow: "6px 6px 0px 0px #000000",
                }}
              >
                <Link2 size={24} className="text-[#888888] group-hover:text-[#ff006e] transition-colors" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#a3a3a3] group-hover:text-[#ff006e] transition-colors">
                  LINKEDIN
                </span>
              </motion.a>
            </div>
          </div>

          {/* ─── Two Sticky Notes on the right side of Direct Connect ─── */}
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
          </div>
        </div>
      </div>

      <SignOff />
    </section>
  );
}
