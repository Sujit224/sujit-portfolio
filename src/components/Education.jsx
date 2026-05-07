import { motion } from "framer-motion";
import { SectionHead } from "./SectionHead";
import { TiltCard } from "./TiltCard";
import { PURPLE, glass } from "../data/constants";

export function Education() {
  const items = [
    { degree:"B.Tech — Information Technology", school:"Indian Institute of Information Technology, Lucknow", score:"CGPA: 8.75", year:"2024 – Current", icon:"🎓" },
    { degree:"CBSE Class XII", school:"Sri Chaitanya Techno School", score:"95.8%", year:"2022 – 2024", icon:"🏫" },
  ];
  const docBtns = [
    { label:"Download Resume", icon:"fas fa-download", href:"https://drive.google.com/uc?export=download&id=16FzZGXH9WpYlrbTrFQ0ojlBU9gnl-RD3", primary:true, ext:true },
    { label:"GitHub", icon:"fab fa-github", href:"https://github.com/Sujit224", ext:true },
    { label:"LinkedIn", icon:"fab fa-linkedin", href:"https://www.linkedin.com/in/sai-sujit-86965420a/", ext:true },
  ];
  return (
    <section id="education" className="relative py-24 px-6 max-w-6xl mx-auto">
      <SectionHead label="Academia" title="Education & Resume" />
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {items.map((item,i) => (
          <TiltCard key={i} style={glass} className="p-8 rounded-2xl">
            <motion.div initial={{ opacity:0, x:i===0?-40:40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:i*0.15 }}>
              <div className="flex items-start gap-4">
                <div className="text-4xl">{item.icon}</div>
                <div>
                  <h3 className="text-white font-black text-lg">{item.degree}</h3>
                  <p className="text-white/40 text-sm mt-1">{item.school}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="font-mono text-xs px-3 py-1 rounded-full font-bold" style={{ color:PURPLE, background:`${PURPLE}18`, border:`1px solid ${PURPLE}33` }}>{item.score}</span>
                    <span className="font-mono text-xs text-white/30">{item.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {docBtns.map((b) => (
          <motion.a key={b.label} href={b.href} target={b.ext?"_blank":"_self"} rel="noopener noreferrer"
            whileHover={{ scale:1.05, y:-3, boxShadow:b.primary?`0 0 40px ${PURPLE}88`:"0 0 20px rgba(255,255,255,0.1)" }}
            whileTap={{ scale:0.96 }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm tracking-wider"
            style={b.primary ? { background:`linear-gradient(135deg, ${PURPLE}, #6633cc)`, color:"#fff", boxShadow:`0 0 24px ${PURPLE}55` } : { ...glass, color:"rgba(255,255,255,0.7)" }}>
            <i className={`${b.icon} text-sm`} />{b.label}
          </motion.a>
        ))}
      </div>
    </section>
  );
}
