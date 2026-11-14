import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Award,
  ExternalLink,
  BadgeCheck,
  GraduationCap,
  X,
  ZoomIn,
} from "lucide-react";
import GlitchHeading from "./GlitchHeading";
import cyberpunkRaccoon from "../assets/gifs/cyberpunk_raccoon.gif";
import cyberpunkRaccoonStatic from "../assets/gifs/cyberpunk_raccoon-static.png";

// ---------------------------------------------------------------------------
// Drop your certificate images into src/assets/certs/ and import them here.
// Using PDF page exports (converted to jpg) works fine for display.
// ---------------------------------------------------------------------------
import oracleImg from "../assets/certs/oracle-java-se-21.jpg";
import iotImg from "../assets/certs/nptel-iot.jpg";
import cloudImg from "../assets/certs/nptel-cloud-computing.jpg";
import ibmImg from "../assets/certs/ibm-java-basics.jpg";
import pythonImg from "../assets/certs/uom-python-basics.jpg";

const FEATURED = {
  title: "Oracle Certified Professional",
  subtitle: "Java SE 21 Developer",
  issuer: "Oracle University",
  date: "December 01, 2025",
  certId: "103291549JSE21OCP",
  image: oracleImg,
};

const CERTS = [
  {
    title: "Introduction To Internet Of Things",
    issuer: "NPTEL · IIT Kharagpur",
    date: "Jan – Apr 2025",
    meta: "Elite · Top 5% · Score 91%",
    verifyUrl: null,
    icon: GraduationCap,
    image: iotImg,
  },
  {
    title: "Cloud Computing",
    issuer: "NPTEL · IIT Kharagpur",
    date: "Jan – Apr 2025",
    meta: "Elite · Score 67%",
    verifyUrl: null,
    icon: GraduationCap,
    image: cloudImg,
  },
  {
    title: "Java Programming for Beginners",
    issuer: "IBM Skills Network · Coursera",
    date: "Apr 2025",
    meta: "Course Certificate",
    verifyUrl: "https://coursera.org/verify/9Q332NPUU564",
    icon: BadgeCheck,
    image: ibmImg,
  },
  {
    title: "Python Basics",
    issuer: "University of Michigan · Coursera",
    date: "Sep 2024",
    meta: "Course Certificate",
    verifyUrl: "https://coursera.org/verify/3JC2QHAI0MC7",
    icon: BadgeCheck,
    image: pythonImg,
  },
];

function TechPill({ children }) {
  return (
    <span className="px-3.5 py-1.5 text-xs font-bold rounded-full border border-[var(--circuit)]/50 bg-black/40 text-[var(--circuit)]">
      {children}
    </span>
  );
}

// Animated scan-line sweep — plays on loop over an image, classic CRT/hack vibe
function ScanSweep({ color = "var(--circuit)" }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 h-1/3"
      style={{
        background: `linear-gradient(to bottom, transparent, ${color}33, transparent)`,
      }}
      initial={{ top: "-40%" }}
      animate={{ top: "110%" }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
    />
  );
}

// Animated corner brackets that pulse — reads as a "scanning / verifying" state
function ScanCorners({ color = "var(--circuit)" }) {
  const base = "absolute w-6 h-6 border-[3px]";
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className={`${base} -top-[2px] -left-[2px] border-t-[3px] border-l-[3px] border-r-0 border-b-0`} style={{ borderColor: color }} />
      <span className={`${base} -top-[2px] -right-[2px] border-t-[3px] border-r-[3px] border-l-0 border-b-0`} style={{ borderColor: color }} />
      <span className={`${base} -bottom-[2px] -left-[2px] border-b-[3px] border-l-[3px] border-r-0 border-t-0`} style={{ borderColor: color }} />
      <span className={`${base} -bottom-[2px] -right-[2px] border-b-[3px] border-r-[3px] border-l-0 border-t-0`} style={{ borderColor: color }} />
    </motion.div>
  );
}

// Fullscreen lightbox for viewing a certificate image at full size
function Lightbox({ src, title, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full cursor-default"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-mono font-bold text-[var(--circuit)]">
            {title}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 border border-[var(--line)] text-[var(--ink)] hover:border-[var(--circuit)] hover:text-[var(--circuit)] transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <img
          src={src}
          alt={title}
          className="w-full h-auto border-2 border-[var(--circuit)] shadow-[0_0_50px_-10px_rgba(47,230,217,0.5)]"
        />
      </motion.div>
    </motion.div>
  );
}

function CertCard({ cert, onZoom }) {
  const Icon = cert.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col h-full
        bg-[var(--bg-panel)]/60 border-2 border-[var(--line)]
        transition-all duration-300
        hover:border-[var(--circuit)]
        hover:shadow-[0_0_28px_-6px_rgba(47,230,217,0.5)]"
    >
      {/* Thumbnail with animated scan sweep on hover */}
      <button
        onClick={() => onZoom(cert.image, cert.title)}
        className="relative overflow-hidden border-b-2 border-[var(--line)] group-hover:border-[var(--circuit)] transition-colors"
      >
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-44 object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-300"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <ScanSweep />
        </div>
        <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <ZoomIn
            size={26}
            className="text-[var(--circuit)] opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(47,230,217,0.8)]"
          />
        </span>
      </button>

      <div className="flex flex-col justify-between flex-1 p-6">
        <div>
          <div className="flex items-start justify-between mb-3 gap-2">
            <h4 className="text-lg font-extrabold tracking-tight text-[var(--ink)] leading-snug">
              {cert.title}
            </h4>
            <Icon className="text-[var(--circuit)] shrink-0 mt-1" size={22} />
          </div>
          <p className="text-sm font-semibold text-[var(--circuit)] mb-1">
            {cert.issuer}
          </p>
          <p className="text-xs font-mono text-[var(--ink-dim)] mb-4">
            {cert.date}
          </p>
          <TechPill>{cert.meta}</TechPill>
        </div>

        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[var(--circuit)] hover:underline"
          >
            VERIFY <ExternalLink size={13} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

// Cyberpunk Raccoon mascot aligned to the heading's baseline
const CyberRaccoon = () => (
  <motion.div 
    className="cursor-pointer drop-shadow-[0_0_12px_rgba(0,245,255,0.35)] shrink-0 select-none self-baseline"
    whileHover={{ scale: 1.15, y: -4 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
    title="Cyberpunk Raccoon"
  >
    <picture>
      <source
        srcSet={cyberpunkRaccoonStatic}
        media="(prefers-reduced-motion: reduce)"
      />
      <img
        src={cyberpunkRaccoon}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={443}
        height={394}
        className="h-[52px] sm:h-[64px] lg:h-[74px] w-auto object-contain pointer-events-none block translate-y-[8px] sm:translate-y-[10px]"
        style={{ imageRendering: "pixelated" }}
      />
    </picture>
  </motion.div>
);

export default function Certifications() {
  const [lightbox, setLightbox] = useState(null); // { src, title } | null

  const openZoom = (src, title) => setLightbox({ src, title });
  const closeZoom = () => setLightbox(null);

  return (
    <section id="certifications" className="max-w-7xl mx-auto px-6 py-28 scroll-mt-20">
      <div className="flex flex-wrap items-baseline gap-3 sm:gap-5 mb-4">
        <div className="ml-6" style={{ fontFamily: "Impact, sans-serif" }}>
          <GlitchHeading text="CERTIFICATIONS" />
        </div>
        <CyberRaccoon />
        <span className="hidden sm:block flex-1 border-t-2 border-dashed border-[var(--line)] self-baseline mb-1.5" />
      </div>
      <br />

      {/* Featured: Oracle Certified Professional */}
      <div className="relative mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden p-8 bg-[var(--bg-panel)]/70
            border-2 border-[var(--solder)]
            shadow-[0_0_50px_-8px_rgba(255,193,7,0.4)]"
        >
          <ScanCorners color="var(--solder)" />

          {/* faint animated scanline wash across the whole card */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <ScanSweep color="var(--solder)" />
          </div>

          <div className="relative flex flex-wrap items-center justify-between gap-3 mb-6">
            <motion.span
              className="inline-flex items-center gap-2 text-xs font-extrabold tracking-widest px-4 py-1.5 bg-[var(--solder)] text-black"
              animate={{ boxShadow: [
                "0 0 0px rgba(255,193,7,0.0)",
                "0 0 18px rgba(255,193,7,0.75)",
                "0 0 0px rgba(255,193,7,0.0)",
              ] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Award size={15} /> FEATURED CREDENTIAL
            </motion.span>
            <span className="text-xs font-mono font-bold text-[var(--solder)]">
              cert_id :: {FEATURED.certId}
            </span>
          </div>

          <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="text-[var(--solder)]" size={32} />
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight cyber-title">
                  {FEATURED.title.toUpperCase()}
                </h3>
              </div>
              <p className="text-lg font-bold text-[var(--circuit)] mb-2">
                {FEATURED.subtitle}
              </p>
              <p className="text-sm font-mono text-[var(--ink-dim)] mb-6">
                Issued by {FEATURED.issuer} · {FEATURED.date}
              </p>

              <p className="text-base text-[var(--ink)]/95 leading-relaxed mb-7 max-w-xl">
                Industry-recognized certification validating advanced
                proficiency in modern Java — core language features, records,
                pattern matching, concurrency, and the Java SE 21 platform.
              </p>

              <div className="flex flex-wrap gap-2.5">
                <TechPill>Java SE 21</TechPill>
                <TechPill>Oracle Certified</TechPill>
                <TechPill>Professional Level</TechPill>
              </div>
            </div>

            {/* Actual certificate image, click to zoom */}
            <button
              onClick={() => openZoom(FEATURED.image, FEATURED.title)}
              className="group relative border-2 border-[var(--solder)]/70 overflow-hidden"
            >
              <img
                src={FEATURED.image}
                alt={FEATURED.title}
                className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-300"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <ScanSweep color="var(--solder)" />
              </div>
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-2 text-xs font-extrabold px-4 py-2 bg-[var(--solder)] text-black">
                  <ZoomIn size={16} /> VIEW FULL CERTIFICATE
                </span>
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Secondary certifications grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CERTS.map((cert) => (
          <CertCard key={cert.title} cert={cert} onZoom={openZoom} />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={lightbox.src}
            title={lightbox.title}
            onClose={closeZoom}
          />
        )}
      </AnimatePresence>
    </section>
  );
}