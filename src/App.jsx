import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion"; // Required for the exit animation

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import SkillsInnovation from "./components/Skillsinnovation";
import Contact from "./components/contact";
import IntroScene from "./components/Introscene";
import Certifications from "./components/Certifications";

export default function App() {
  const [showIntro, setShowIntro] = useState(
    () => !sessionStorage.getItem("introSeen")
  );
 
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowIntro(false);
    }
  }, []);
 
  const finishIntro = () => {
    sessionStorage.setItem("introSeen", "true");
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen">
      {/* AnimatePresence allows IntroScene to play its exit animation before unmounting */}
      <AnimatePresence>
        {showIntro && <IntroScene onDone={finishIntro} />}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Certifications />
        <SkillsInnovation />
        <Contact />
      </main>
    </div>
  );
}