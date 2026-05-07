import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHead } from "./SectionHead";
import { techStack, PURPLE, glass } from "../data/constants";

export function TechStack() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="stack" className="relative py-24 px-6 max-w-7xl mx-auto">
      <SectionHead 
        label="Technologies" 
        title="Tech Stack" 
        sub="The complete arsenal of tools, frameworks, and languages I use to build intelligent systems." 
      />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-16">
        {techStack.map((t, i) => (
          <motion.div 
            key={t.name}
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: i * 0.03, duration: 0.5 }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative group flex flex-col items-center justify-center p-8 rounded-3xl transition-all duration-500 cursor-help overflow-hidden h-[240px]"
            style={{ 
              ...glass, 
              borderColor: hoveredIndex === i ? (t.color || PURPLE) + "66" : "rgba(255,255,255,0.08)",
              background: hoveredIndex === i ? `${t.color || PURPLE}08` : "rgba(255,255,255,0.03)"
            }}
          >
            {/* Background Glow */}
            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{ 
                    background: `radial-gradient(circle at 50% 50%, ${t.color || PURPLE}15 0%, transparent 70%)` 
                  }}
                />
              )}
            </AnimatePresence>

            {/* Icon/Logo Container */}
            <motion.div 
              animate={{ 
                y: hoveredIndex === i ? -40 : 0,
                scale: hoveredIndex === i ? 0.8 : 1
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="z-10 flex flex-col items-center gap-4"
            >
              {t.logo ? (
                <img 
                  src={t.logo} 
                  alt={t.name} 
                  className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-2xl transition-all" 
                  style={t.invert ? { filter: "invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.2))" } : { filter: "drop-shadow(0 0 10px rgba(255,255,255,0.1))" }} 
                />
              ) : (
                <span className="text-6xl md:text-7xl leading-none drop-shadow-2xl select-none">{t.symbol}</span>
              )}
              <span className="font-mono text-xs tracking-widest text-center text-white/40 group-hover:text-white transition-colors font-bold uppercase">
                {t.name}
              </span>
            </motion.div>

            {/* Description Overlay */}
            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute inset-x-0 bottom-0 p-6 text-center z-20"
                >
                  <p className="text-[11px] md:text-xs text-white/70 leading-relaxed font-medium">
                    {t.desc}
                  </p>
                  {/* Category Accent Line */}
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "40%" }}
                    className="h-0.5 mx-auto mt-4 rounded-full"
                    style={{ background: t.color || PURPLE }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Animated Marquee Strip */}
      <div className="relative py-8 overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)" }}>
        <motion.div className="flex gap-6 w-max" animate={{ x: [0, -1200] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
          {[...techStack, ...techStack].map((t, i) => (
            <span key={i} className="font-mono text-[10px] tracking-[0.2em] uppercase px-5 py-2 rounded-full border border-white/5 bg-white/[0.02]"
              style={{ color: (t.color || PURPLE) + "cc" }}>
              {t.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
