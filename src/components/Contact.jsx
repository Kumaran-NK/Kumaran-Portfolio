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
    <section id="contact" className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex items-center gap-4 mb-4">
        <GlitchHeading text="CONTACT" />
        <span className="hidden sm:block flex-1 border-t-2 border-dashed border-[var(--line)]" />
      </div>

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
        {/* Terminal form */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="brutal-border bg-black rounded-xl overflow-hidden"
            style={{ boxShadow: "6px 6px 0px 0px var(--circuit)" }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-black bg-[var(--bg-panel-2)]">
              <span className="w-3 h-3 rounded-full bg-[var(--signal)]" />
              <span className="w-3 h-3 rounded-full bg-[var(--solder)]" />
              <span className="w-3 h-3 rounded-full bg-[var(--circuit)]" />
              <span className="ml-3 text-xs font-bold text-[var(--ink)]">contact.sh</span>
            </div>

            <form onSubmit={onSubmit} className="p-6 sm:p-8 font-mono text-lg font-bold" style={{ fontFamily: "'Fira Code', 'Courier New', monospace" }}>
              <p className="mb-6">
                <span className="text-white">kumaran@terminal</span>
                <span className="text-white">:</span>
                <span className="text-[var(--circuit)]">~$</span>{" "}
                <span className="text-[var(--circuit)]">./initiate_contact.sh</span>
              </p>

              <label className="group flex items-center gap-2 border-b-2 border-[var(--line)] focus-within:border-[var(--circuit)] py-4 transition-colors">
                <span className="text-[var(--signal)] group-focus-within:text-[var(--circuit)] transition-colors">&gt;</span>
                <span className="text-[var(--ink-dim)] shrink-0">Name=</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  autoComplete="off"
                  spellCheck="false"
                  className="flex-1 bg-transparent outline-none border-none px-2 text-[var(--circuit)] placeholder:text-[var(--ink-dim)] placeholder:font-bold caret-[var(--circuit)] selection:bg-white selection:text-black"
                  placeholder="jane_doe"
                />
              </label>

              <label className="group flex items-center gap-2 border-b-2 border-[var(--line)] focus-within:border-[var(--circuit)] py-4 transition-colors">
                <span className="text-[var(--signal)] group-focus-within:text-[var(--circuit)] transition-colors">&gt;</span>
                <span className="text-[var(--ink-dim)] shrink-0">Email=</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  autoComplete="off"
                  spellCheck="false"
                  className="flex-1 bg-transparent outline-none border-none px-2 text-[var(--circuit)] placeholder:text-[var(--ink-dim)] placeholder:font-bold caret-[var(--circuit)] selection:bg-white selection:text-black"
                  placeholder="jane@company.com"
                />
              </label>

              <label className="group flex gap-2 border-b-2 border-[var(--line)] focus-within:border-[var(--circuit)] py-4 items-start transition-colors">
                <span className="text-[var(--signal)] group-focus-within:text-[var(--circuit)] transition-colors mt-0.5">&gt;</span>
                <span className="text-[var(--ink-dim)] shrink-0 mt-0.5">Message=</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={3}
                  autoComplete="off"
                  spellCheck="false"
                  className="flex-1 bg-transparent outline-none border-none resize-none px-2 text-[var(--circuit)] placeholder:text-[var(--ink-dim)] placeholder:font-bold caret-[var(--circuit)] selection:bg-white selection:text-black"
                  placeholder="let's talk about..."
                />
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-8 inline-flex items-center gap-2 px-5 py-3 text-sm font-bold border-2 border-[var(--circuit)] text-[var(--circuit)] hover:bg-[var(--circuit)] hover:text-black transition-colors disabled:opacity-50 rounded-lg"
                style={{ boxShadow: "4px 4px 0px 0px var(--signal)" }}
              >
                {status === "sending" ? "SENDING..." : "[EXECUTE_SEND]"}
                <Send size={14} />
              </button>

              {status === "sent" && (
                <p className="mt-4 text-[var(--circuit)]">&gt; STATUS: MESSAGE_SENT ✓ — thanks, I'll reply soon.</p>
              )}
              {status === "error" && (
                <p className="mt-4 text-[var(--signal)]">&gt; STATUS: SEND_FAILED — try the email link instead.</p>
              )}

              <p className="mt-6 text-[var(--ink-dim)]">
                <span className="inline-block w-2 h-4 bg-white animate-pulse align-middle" />
              </p>
            </form>
          </motion.div>
        </div>

        {/* Direct connect + socials */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="brutal-border bg-[var(--bg-panel)] p-6 rounded-xl"
          >
            <h3 className="cyber-title text-lg font-bold tracking-tight mb-4">DIRECT CONNECT</h3>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-3 mb-3 text-sm text-[var(--ink)] hover:text-[var(--circuit)] transition-colors"
            >
              <Mail size={16} className="text-[var(--signal)] shrink-0" />
              {EMAIL}
            </a>
            <p className="flex items-center gap-3 text-sm text-[var(--ink)]">
              <MapPin size={16} className="text-[var(--signal)] shrink-0" />
              Saveetha Engineering College, Chennai
            </p>
          </motion.div>

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
              className="flex flex-col items-center gap-2 py-6 brutal-border bg-[var(--bg-panel)] text-[var(--ink)] rounded-xl"
            >
              <Code2 size={20} className="text-[var(--circuit)]" />
              <span className="text-xs font-bold tracking-wide">GITHUB</span>
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
              className="flex flex-col items-center gap-2 py-6 brutal-border bg-[var(--bg-panel)] text-[var(--ink)] rounded-xl"
            >
              <Link2 size={20} className="text-[var(--signal)]" />
              <span className="text-xs font-bold tracking-wide">LINKEDIN</span>
            </motion.a>
          </div>
        </div>
      </div>

      <SignOff />
    </section>
  );
}