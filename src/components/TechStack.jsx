import { motion } from "framer-motion";
import { SectionHead } from "./SectionHead";
import { techStack, PURPLE, glass } from "../data/constants";

export function TechStack() {
  return (
    <section id="stack" className="relative py-24 px-6 max-w-6xl mx-auto">
      <SectionHead label="Technologies" title="Tech Stack" sub="Every tool I wield — all logos visible" />
      {/* Full grid — all 16 logos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-16">
        {techStack.map((t,i) => (
          <motion.div key={t.name}
            initial={{ opacity:0, y:24, scale:0.85 }} whileInView={{ opacity:1, y:0, scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.04, duration:0.5, ease:[0.22,1,0.36,1] }}
            whileHover={{ y:-12, scale:1.1, boxShadow:`0 0 60px ${t.color||PURPLE}44, 0 20px 50px rgba(0,0,0,0.5)`, borderColor:(t.color||PURPLE)+"88" }}
            className="flex flex-col items-center gap-6 p-8 rounded-3xl transition-all cursor-default"
            style={{ ...glass, borderColor:`rgba(255,255,255,0.12)`, background:"rgba(255,255,255,0.05)" }}>
            {t.logo ? (
              <img src={t.logo} alt={t.name} className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-xl" style={t.invert?{ filter:"invert(1)" }:{}} />
            ) : (
              <span className="text-7xl leading-none drop-shadow-xl">{t.symbol}</span>
            )}
            <span className="font-mono text-sm tracking-widest text-center text-white font-bold leading-tight uppercase">{t.name}</span>
          </motion.div>
        ))}
      </div>
      {/* Scrolling name strip */}
      <div className="relative overflow-hidden" style={{ maskImage:"linear-gradient(90deg, transparent, black 15%, black 85%, transparent)", WebkitMaskImage:"linear-gradient(90deg, transparent, black 15%, black 85%, transparent)" }}>
        <motion.div className="flex gap-4 w-max" animate={{ x:[0,-950] }} transition={{ duration:22, repeat:Infinity, ease:"linear" }}>
          {[...techStack,...techStack,...techStack].map((t,i) => (
            <span key={i} className="font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-full whitespace-nowrap"
              style={{ color:(t.color||PURPLE)+"aa", border:`1px solid ${t.color||PURPLE}22`, background:`${t.color||PURPLE}0A` }}>
              {t.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
