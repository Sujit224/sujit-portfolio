import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHead } from "./SectionHead";
import { projects, glass } from "../data/constants";

function ProjectCard({ project, index }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div initial={{ opacity:0, y:60 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay:index*0.15 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      whileHover={{ y:-12 }}
      className="rounded-2xl overflow-hidden flex flex-col transition-all duration-400"
      style={{ ...glass, border:`1px solid ${hov?project.accent+"50":"rgba(255,255,255,0.09)"}`, boxShadow:hov?`0 0 60px ${project.accent}25, 0 30px 60px rgba(0,0,0,0.5)`:"none", transition:"border-color .3s, box-shadow .3s" }}>
      {/* Hero */}
      <div className="relative h-52 flex items-center justify-center overflow-hidden" style={{ background:project.bgGrad }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage:`linear-gradient(${project.accent}33 1px, transparent 1px), linear-gradient(90deg, ${project.accent}33 1px, transparent 1px)`, backgroundSize:"28px 28px" }} />
        <motion.span className="text-6xl relative z-10" animate={hov?{ scale:[1,1.12,1.06], rotate:[0,-4,4,0] }:{ scale:1, rotate:0 }} transition={{ duration:0.5 }}>{project.icon}</motion.span>
        <div className="absolute top-3 right-3"><span className="font-mono text-xs px-2 py-1 rounded-full" style={{ color:project.accent, background:`${project.accent}18`, border:`1px solid ${project.accent}33` }}>Featured</span></div>
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background:"linear-gradient(to top, rgba(6,6,8,0.9), transparent)" }} />
      </div>
      {/* Body */}
      <div className="flex flex-col flex-1 p-7">
        <h3 className="text-white font-black text-2xl">{project.title}</h3>
        <p className="text-sm mt-0.5 mb-4" style={{ color:project.accent+"bb" }}>{project.subtitle}</p>
        <p className="text-white/55 text-sm leading-relaxed flex-1 mb-5">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map(t => (
            <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-full"
              style={{ color:project.accent+"cc", background:`${project.accent}12`, border:`1px solid ${project.accent}25` }}>{t}</span>
          ))}
        </div>
        <div className="flex gap-3">
          <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.05, boxShadow:`0 0 20px ${project.accent}44` }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider flex-1 justify-center"
            style={{ background:`${project.accent}1A`, color:project.accent, border:`1px solid ${project.accent}33` }}>
            <i className="fab fa-github" /> GitHub
          </motion.a>
          <motion.a href="#" whileHover={{ scale:1.05 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider flex-1 justify-center text-white"
            style={{ background:`linear-gradient(135deg, ${project.accent}, ${project.accent}bb)` }}>
            <i className="fas fa-external-link-alt" /> Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 max-w-6xl mx-auto">
      <SectionHead label="Featured Work" title="Projects" sub="Systems built to solve real problems with AI" />
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p,i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </section>
  );
}
