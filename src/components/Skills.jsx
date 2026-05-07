import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SectionHead } from "./SectionHead";
import { skillData, PURPLE, CYAN, glass } from "../data/constants";

function SkillCard({ name, icon, level, delay, categoryColor }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 flex items-center gap-4"
      style={{ boxShadow: hovered ? `0 10px 40px -10px ${categoryColor}33` : "none" }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white/5 border border-white/10 transition-transform group-hover:scale-110 group-hover:rotate-6 shadow-lg"
        style={{ color: categoryColor }}>
        <i className={icon || "fas fa-code"} />
      </div>
      
      <div className="flex flex-col">
        <span className="text-base font-bold text-white/90 group-hover:text-white transition-colors">{name}</span>
        <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-1 h-1 rounded-full" style={{ background: categoryColor }} />
          <div className="w-1 h-1 rounded-full opacity-50" style={{ background: categoryColor }} />
          <div className="w-1 h-1 rounded-full opacity-20" style={{ background: categoryColor }} />
        </div>
      </div>

      {/* Decorative hover glow */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ 
              background: `radial-gradient(circle at 50% 50%, ${categoryColor}11 0%, transparent 70%)`,
              border: `1px solid ${categoryColor}44`
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Skills() {
  const skillIcons = {
    "Python": "fab fa-python",
    "JavaScript": "fab fa-js",
    "C++": "fas fa-terminal",
    "React": "fab fa-react",
    "Node.js": "fab fa-node-js",
    "Express": "fas fa-server",
    "Tailwind": "fab fa-css3-alt",
    "PyTorch": "fas fa-brain",
    "TensorFlow": "fas fa-microchip",
    "Scikit-learn": "fas fa-chart-line",
    "NLP": "fas fa-comment-dots",
    "MongoDB": "fas fa-database",
    "PostgreSQL": "fas fa-database",
    "Redis": "fas fa-bolt",
    "Git": "fab fa-git-alt",
    "Docker": "fab fa-docker",
    "AWS": "fab fa-aws",
    "LangChain": "fas fa-link"
  };

  const categories = [
    { title: "Languages", color: CYAN, icon: "fas fa-code" },
    { title: "Frontend", color: PURPLE, icon: "fas fa-desktop" },
    { title: "Backend", color: "#FF3366", icon: "fas fa-server" },
    { title: "AI / ML", color: "#FFD700", icon: "fas fa-brain" },
    { title: "DevOps & Tools", color: "#00FFAB", icon: "fas fa-tools" }
  ];

  return (
    <section id="skills" className="relative py-32 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <SectionHead 
        label="Technical Arsenal" 
        title="Core Capabilities" 
        sub="A comprehensive overview of my technical expertise across the full-stack and AI landscape."
      />

      <div className="space-y-16">
        {Object.entries(skillData).map(([catName, skills], ci) => {
          const category = categories.find(c => c.title === catName) || categories[0];
          
          return (
            <div key={catName} className="relative">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 shadow-lg"
                  style={{ color: category.color }}>
                  <i className={category.icon} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">{catName}</h3>
                  <div className="h-0.5 w-12 rounded-full mt-1" style={{ background: category.color }} />
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {skills.map((s, si) => (
                  <SkillCard 
                    key={s.name} 
                    name={s.name} 
                    level={s.level || 85} 
                    icon={skillIcons[s.name]} 
                    delay={si * 0.05}
                    categoryColor={category.color}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
