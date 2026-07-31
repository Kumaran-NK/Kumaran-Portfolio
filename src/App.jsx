import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import SkillsInnovation from "./components/Skillsinnovation";
import Contact from "./components/contact";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience/>
        <SkillsInnovation/>
        <Contact/>
      </main>
    </div>
  );
}