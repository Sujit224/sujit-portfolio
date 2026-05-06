import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHead } from "./SectionHead";
import { skillData, PURPLE, CYAN, glass } from "../data/constants";

function SkillPill({ name, inView, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:bg-white/10 cursor-default shadow-sm"
      style={{ 
        background: "rgba(255,255,255,0.03)", 
        borderColor: "rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.85)"
      }}
    >
      {name}
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, amount:0.2 });
  return (
    <section id="skills" className="relative py-24 px-6 max-w-6xl mx-auto">
      <SectionHead label="Capabilities" title="Skills" />
      <div ref={ref} className="grid md:grid-cols-2 gap-6">
        {Object.entries(skillData).map(([cat, skills], ci) => (
          <motion.div key={cat} initial={{ opacity:0, y:40 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.7, delay:ci*0.15 }}
            className="rounded-2xl p-8" style={glass}>
            <h3 className="font-mono text-xs tracking-[0.3em] uppercase mb-6 flex items-center gap-2" style={{ color:PURPLE }}>
              <span className="w-2 h-2 rounded-full" style={{ background:PURPLE }} />{cat}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((s,si) => <SkillPill key={s.name} name={s.name} inView={inView} delay={0.3+ci*0.1+si*0.05} />)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
