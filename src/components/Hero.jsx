import { motion } from "framer-motion";
import { PURPLE, CYAN, DARK } from "../data/constants";
import { ComplexDualAnimation } from "./ComplexDualAnimation";

export function Hero() {
  const ctaBtns = [
    { label:"View Projects", href:"#projects", primary:true },
    { label:"GitHub", href:"https://github.com/Sujit224", icon:"fab fa-github", ext:true },
    { label:"Resume", href:"https://drive.google.com/uc?export=download&id=16FzZGXH9WpYlrbTrFQ0ojlBU9gnl-RD3", icon:"fas fa-file-alt", ext:true },
  ];
  
  const aiTokens = ["LLMs", "Transformers", "RAG", "GenAI", "PyTorch", "Agents", "Diffusers", "NLP"];
  
  return (
    <section id="about" className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-24 pt-28 pb-12 overflow-hidden max-w-[1400px] mx-auto">
      {/* Removed BIG ghost text per request */}

      {/* Left Content Column */}
      <div className="w-full md:w-1/2 flex flex-col items-start text-left z-10 mt-10 md:mt-0">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.3 }}
          className="mb-3 flex items-center gap-4">
          <span className="font-mono text-lg tracking-widest font-bold" style={{ color:CYAN }}>Hello, I'm</span>
          <div className="h-px w-12" style={{ background:`linear-gradient(to right, ${CYAN}, transparent)` }} />
        </motion.div>
        
        <motion.h1 initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.5 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-7xl font-black tracking-tight leading-none mb-2 text-white whitespace-nowrap"
          style={{ textShadow:`0 0 80px ${PURPLE}44` }}>
          C Sai&nbsp;&nbsp;Sujit
        </motion.h1>

        <motion.h2 initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.6 }}
          className="text-4xl sm:text-5xl md:text-5xl xl:text-6xl font-black tracking-tight mb-8 whitespace-nowrap pb-2"
          style={{ 
            background: `linear-gradient(to right, ${CYAN}, ${PURPLE}, #fff)`, 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            textShadow: `0 0 40px ${CYAN}44`
          }}>
          AI & ML Engineer
        </motion.h2>
        

        
        <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.9 }}
          className="max-w-xl text-white/50 text-lg leading-relaxed mb-12">
          Passionate about building intelligent systems. Specializing in{" "}
          <span className="font-semibold text-white">Machine Learning</span>, <span className="font-semibold text-white">NLP</span>, <span className="font-semibold text-white">Large Language Models</span>, <span className="font-semibold text-white">Generative AI</span>, and <span className="font-semibold" style={{ color:PURPLE }}>Agentic Workflows</span> that enable machines to perceive, reason, and create.
        </motion.p>
        
        {/* CTAs */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:1.1 }}
          className="flex flex-wrap gap-4">
          {ctaBtns.map((b) => (
            <motion.a key={b.label} href={b.href} target={b.ext?"_blank":"_self"} rel="noopener noreferrer"
              whileHover={{ scale:1.06, y:-4 }} whileTap={{ scale:0.96 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-wider transition-all"
              style={b.primary ? { background:`linear-gradient(135deg, ${PURPLE}, #6633cc)`, boxShadow:`0 0 24px ${PURPLE}55`, color:"#fff" } : { border:"1px solid rgba(255,255,255,0.14)", background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.7)", backdropFilter:"blur(12px)" }}>
              {b.icon && <i className={`${b.icon} text-xs`} />}{b.label}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Right AI Animation Column */}
      <div className="w-full md:w-[55%] min-h-[600px] flex items-center justify-center relative mt-16 md:mt-0 z-10 flex-1">
        <ComplexDualAnimation />
      </div>
      
      {/* Scroll Indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        animate={{ y:[0,10,0] }} transition={{ duration:2.5, repeat:Infinity }}>
        <span className="font-mono text-[10px] tracking-widest uppercase text-white/20">scroll</span>
        <i className="fas fa-chevron-down text-white/20 text-sm" />
      </motion.div>
    </section>
  );
}
