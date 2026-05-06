import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { DARK } from "./data/constants";

import { JigEntry } from "./components/JigEntry";
import { ParticleField } from "./components/ParticleField";
import { CursorGlow } from "./components/CursorGlow";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { TechStack } from "./components/TechStack";
import { Education } from "./components/Education";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Achievements } from "./components/Achievements";
import { Connect } from "./components/Connect";

function App() {
  const [entered, setEntered] = useState(false);
  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background:DARK }}>
      <AnimatePresence>
        {!entered && <JigEntry key="entry" onDone={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && (
        <>
          <ParticleField />
          <CursorGlow />
          <Nav />
          <Hero />
          <TechStack />
          <Education />
          <Skills />
          <Projects />
          <Achievements />
          <Connect />
        </>
      )}
    </div>
  );
}

export default App;
