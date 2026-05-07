import { useEffect } from "react";
import { motion } from "framer-motion";
import { PURPLE, CYAN, DARK } from "../data/constants";

const CHARS = "C   SAI   SUJIT".split("");

export function JigEntry({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden" style={{ background: DARK }}
      exit={{ opacity:0, scale:1.04, filter:"blur(12px)" }} transition={{ duration:0.6, ease:"easeIn" }}>
      {/* BG radial */}
      <motion.div className="absolute inset-0 pointer-events-none"
        initial={{ opacity:0 }} animate={{ opacity:[0,0.6,0.3] }} transition={{ duration:1.8 }}
        style={{ background:`radial-gradient(circle at 50% 50%, ${PURPLE}28 0%, transparent 65%)` }} />

      {/* Grid lines */}
      {[...Array(7)].map((_,i) => (
        <motion.div key={i} className="absolute left-0 right-0" style={{ top:`${(i+1)*12.5}%`, height:1, background:`${PURPLE}18` }}
          initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:0.7, delay:0.05*i }} />
      ))}

      {/* Letters */}
      <div className="flex items-end justify-center mb-6" style={{ gap:2 }}>
        {CHARS.map((ch, i) => (
          <motion.span key={i} className="font-black text-white select-none"
            style={{ fontSize:"clamp(2.8rem,9vw,6.5rem)", display:"inline-block", textShadow:`0 0 50px ${PURPLE}`, letterSpacing:"-0.02em" }}
            initial={{ y:250, rotate:35, opacity:0, scale:1.3 }}
            animate={{ y:[250,-28,12,-7,3,0], rotate:[35,-7,3,-1.5,0], opacity:1, scale:[1.3,0.94,1.02,0.99,1] }}
            transition={{ duration:1.0, delay:0.06*i, ease:[0.17,0.67,0.35,1.25] }}>
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </div>

      {/* Line */}
      <motion.div initial={{ scaleX:0, opacity:0 }} animate={{ scaleX:1, opacity:1 }} transition={{ duration:0.55, delay:0.9 }}
        style={{ height:3, width:"55vw", maxWidth:480, background:`linear-gradient(90deg, transparent, ${PURPLE}, ${CYAN}, ${PURPLE}, transparent)`, borderRadius:99, transformOrigin:"center" }} />

      {/* Tag */}
      <motion.p initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:1.15 }}
        className="mt-5 font-mono text-sm tracking-[0.3em] uppercase" style={{ color:PURPLE }}>
        AI · ML · Agentic Workflows
      </motion.p>

      {/* Glitch flashes */}
      {[0.45, 0.48, 0.62].map((t,i) => (
        <motion.div key={i} className="absolute inset-0 pointer-events-none"
          initial={{ opacity:0 }} animate={{ opacity:[0,0.18,0] }} transition={{ duration:0.08, delay:t }}
          style={{ background:`${PURPLE}33` }} />
      ))}
    </motion.div>
  );
}
