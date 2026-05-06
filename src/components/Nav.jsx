import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PURPLE } from "../data/constants";

export function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => { const fn = () => setSolid(window.scrollY>50); window.addEventListener("scroll",fn); return () => window.removeEventListener("scroll",fn); }, []);
  const links = [["About","#about"],["Stack","#stack"],["Skills","#skills"],["Projects","#projects"],["Achievements","#achievements"],["Connect","#connect"]];
  return (
    <motion.nav initial={{ y:-80, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.8, delay:0.2 }}
      className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500"
      style={solid 
        ? { background:"rgba(6,6,8,0.95)", backdropFilter:"blur(24px)", borderBottom:`1px solid ${PURPLE}33` } 
        : { background:"rgba(6,6,8,0.4)", backdropFilter:"blur(12px)", borderBottom:`1px solid transparent` }}>
      <div className={`w-full px-8 md:px-16 flex items-center justify-between transition-all duration-500 ${solid ? 'py-5' : 'py-7'}`}>
        <motion.span whileHover={{ textShadow:`0 0 20px ${PURPLE}` }} className="font-mono font-bold text-2xl tracking-widest cursor-pointer" style={{ color:PURPLE }} onClick={() => window.scrollTo(0,0)}>
          {"<C·SS />"}
        </motion.span>
        <div className="hidden md:flex gap-12 items-center">
          {links.map(([l,h]) => (
            <a key={l} href={h} className="font-mono text-[16px] tracking-widest uppercase text-white/60 hover:text-white transition-colors relative group">
              {l}<span className="absolute -bottom-1.5 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ background:PURPLE }} />
            </a>
          ))}
          <motion.a href="#connect" whileHover={{ boxShadow:`0 0 25px ${PURPLE}99`, scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full font-mono text-[15px] tracking-widest uppercase font-bold text-white transition-all duration-300"
            style={{ background:`linear-gradient(135deg, ${PURPLE}, #6633cc)` }}>
            Hire Me
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
