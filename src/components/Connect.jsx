import { motion } from "framer-motion";
import { PURPLE, CYAN, glass } from "../data/constants";

export function Connect() {
  const socials = [
    { icon:"fas fa-phone", label:"+91 8105626006", href:"tel:+918105626006", accent:PURPLE },
    { icon:"fas fa-envelope", label:"saisujit300@gmail.com", href:"mailto:saisujit300@gmail.com", accent:CYAN },
    { icon:"fab fa-github", label:"GitHub", href:"https://github.com/Sujit224", accent:"#ffffff" },
    { icon:"fab fa-linkedin", label:"LinkedIn", href:"https://www.linkedin.com/in/sai-sujit-86965420a/", accent:"#0A66C2" },
    { icon:"fas fa-code", label:"LeetCode", href:"https://leetcode.com/u/sai-sujit/", accent:"#FFA116" },
  ];

  return (
    <section id="connect" className="relative py-24 px-6 max-w-6xl mx-auto">
      <motion.div className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
        style={{ ...glass, border:`1px solid ${PURPLE}22`, boxShadow:`0 0 100px ${PURPLE}0C, inset 0 0 100px ${PURPLE}06` }}>
        {/* top accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px" style={{ background:`linear-gradient(90deg, transparent, ${PURPLE}, transparent)` }} />

        <motion.span initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          className="inline-block font-mono text-xs tracking-[0.35em] uppercase px-4 py-1.5 rounded-full mb-6"
          style={{ color:PURPLE, border:`1px solid ${PURPLE}44`, background:`${PURPLE}0F` }}>
          Let's Connect
        </motion.span>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
          Build Something{" "}
          <motion.span animate={{ textShadow:[`0 0 20px ${PURPLE}`,`0 0 60px ${PURPLE}`,`0 0 20px ${PURPLE}`] }}
            transition={{ duration:2, repeat:Infinity }} style={{ color:PURPLE }}>
            Extraordinary
          </motion.span>
        </h2>

        <p className="text-white/40 max-w-lg mx-auto mb-10 text-sm leading-relaxed">
          Open to collaborations, research opportunities, and building the future of intelligent systems.
        </p>

        {/* Socials */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {socials.map((s,i) => (
            <motion.a key={i} href={s.href} target={s.href.startsWith("http")?"_blank":"_self"} rel="noopener noreferrer"
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
              whileHover={{ y:-5, borderColor:s.accent+"88", scale:1.04, boxShadow:`0 0 28px ${s.accent}44` }}
              className="flex items-center gap-2 px-5 py-3 rounded-full transition-all"
              style={{ border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.6)", fontSize:13, fontFamily:"monospace" }}>
              <i className={s.icon} style={{ color:s.accent }} />{s.label}
            </motion.a>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-white/20 text-xs font-mono">
          <span>© 2025 C Sai Sujit</span>
          <span>React · Framer Motion · TailwindCSS</span>
          <span>IIIT Lucknow</span>
        </div>
      </motion.div>
    </section>
  );
}
