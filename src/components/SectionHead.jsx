import { motion } from "framer-motion";
import { PURPLE } from "../data/constants";

export function SectionHead({ label, title, sub }) {
  return (
    <div className="text-center mb-16">
      <motion.span initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:0.5 }}
        className="inline-block font-mono text-xs tracking-[0.35em] uppercase px-4 py-1.5 rounded-full mb-4"
        style={{ color:PURPLE, border:`1px solid ${PURPLE}44`, background:`${PURPLE}0F` }}>
        {label}
      </motion.span>
      <motion.h2 initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.1 }}
        className="text-4xl md:text-6xl font-black text-white mt-2 leading-tight">
        {title}
      </motion.h2>
      {sub && <p className="text-white/35 mt-4 max-w-xl mx-auto text-base">{sub}</p>}
    </div>
  );
}
