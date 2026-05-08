import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHead } from "./SectionHead";
import { PURPLE, CYAN, glass } from "../data/constants";
import { Mic, Trophy, Zap, Target } from "lucide-react";

// Import Assets
import metaCert from "../assets/MetaPytorch.jpeg";
import googleBadge from "../assets/badge.png";

export function Achievements() {
  const [metaHov, setMetaHov] = useState(false);
  const [dsaHov, setDsaHov] = useState(false);
  const [gdgHov, setGdgHov] = useState(false);
  
  const dsaRef = useRef(null);
  
  const cardStyle = (isHovered, color) => ({
    ...glass,
    borderRadius: 20,
    border: `1px solid ${isHovered ? color + "50" : "rgba(255,255,255,0.09)"}`,
    boxShadow: isHovered ? `0 0 80px ${color}25, 0 30px 60px rgba(0,0,0,0.5)` : "none",
    padding: "2rem",
    transition: "border-color .3s, box-shadow .3s",
    minHeight: "220px",
    display: "flex",
    alignItems: "center"
  });

  return (
    <section id="achievements" className="relative py-24 px-6 max-w-7xl mx-auto">
      <SectionHead label="Milestones & Leadership" title="Achievements & Roles" sub="Defining the professional journey through impact and excellence" />
      
      <div className="flex flex-col gap-8">
        {/* GDG ROLE */}
        <motion.div initial={{ opacity:0, y:50 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          onMouseEnter={() => setGdgHov(true)} onMouseLeave={() => setGdgHov(false)}
          animate={gdgHov ? { y:-10 } : { y:[0,-4,0] }}
          style={cardStyle(gdgHov, CYAN)}
          transition={{ duration: 0.8, ...(gdgHov ? { duration: 0.3 } : { y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" } }) }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 w-full">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 bg-white/5 border border-white/10 p-4 shadow-inner">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
               </div>
               <div>
                 <span className="font-mono text-xs tracking-widest uppercase text-white/30 block mb-1">Lead Member</span>
                 <h3 className="text-white font-black text-2xl md:text-3xl leading-tight">Machine Learning Wing</h3>
                 <p className="text-sm md:text-base mt-1" style={{ color:CYAN+"aa" }}>GDG IIIT Lucknow</p>
               </div>
            </div>
            <div className="space-y-6 max-w-md">
              <div className="space-y-4">
                {[
                  { icon:<Mic size={20} color={CYAN} />, text:'Conducted technical sessions on Generative AI for the developer community.' },
                  { icon:<Trophy size={20} color={CYAN} />, text:'Planned and coordinated "Ragathon 2026" — a flagship RAG hackathon.' },
                ].map((item,i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                    <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
              <motion.a href="https://github.com/Sujit224/GDG-RAGATHON-2026" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.05, boxShadow:`0 0 20px ${CYAN}44` }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider"
                style={{ background:`${CYAN}15`, color:CYAN, border:`1px solid ${CYAN}33` }}>
                <i className="fab fa-github" /> View Repo
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* META */}
        <motion.div initial={{ opacity:0, y:50 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          onMouseEnter={() => setMetaHov(true)} onMouseLeave={() => setMetaHov(false)}
          animate={metaHov ? { y:-10 } : { y:[0,-6,0] }}
          style={cardStyle(metaHov, "#0082fb")}
          transition={{ duration: 0.8, delay:0.1, ...(metaHov ? { duration: 0.3 } : { y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }) }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 w-full">
            <div className="flex items-center gap-6">
              <motion.div whileHover={{ rotate:[0,-12,12,0] }} transition={{ duration:0.4 }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background:"linear-gradient(135deg, #0082fb22, #0082fb0A)", border:"1px solid #0082fb44" }}>
                <i className="fab fa-meta text-4xl" style={{ color:"#0082fb" }} />
              </motion.div>
              <div>
                <span className="font-mono text-xs tracking-widest uppercase text-white/30 block mb-1">Hackathon</span>
                <h3 className="text-white font-black text-2xl md:text-3xl leading-tight">Global Finalist</h3>
                <p className="text-sm md:text-base mt-1" style={{ color:"#0082fbaa" }}>Meta PyTorch Hackathon</p>
              </div>
            </div>
            <div className="max-w-md flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <p className="text-white/55 text-sm md:text-base leading-relaxed mb-6">
                  Selected as a global finalist in the prestigious Meta PyTorch Hackathon.
                </p>
                <motion.a href={metaCert} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale:1.04, boxShadow:"0 0 24px #0082fb44" }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider"
                  style={{ background:"#0082fb1A", color:"#0082fb", border:"1px solid #0082fb33" }}>
                  <i className="fas fa-certificate" /> View Certificate
                </motion.a>
              </div>
              {/* Compact Preview */}
              <motion.a href={metaCert} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.1 }} className="w-32 h-20 rounded-lg overflow-hidden border border-white/10 bg-white/5 shrink-0 shadow-2xl">
                <img src={metaCert} className="w-full h-full object-cover" alt="Meta Certificate" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* DSA */}
        <motion.div ref={dsaRef} initial={{ opacity:0, y:50 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          onMouseEnter={() => setDsaHov(true)} onMouseLeave={() => setDsaHov(false)}
          animate={dsaHov ? { y:-10 } : { y:[0,-5,0] }}
          style={cardStyle(dsaHov, PURPLE)}
          transition={{ duration: 0.8, delay: 0.2, ...(dsaHov ? { duration: 0.3 } : { y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" } }) }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 w-full">
            <div className="flex items-center gap-6">
              <motion.div animate={{ rotate:[0,5,-5,0] }} transition={{ duration:4, repeat:Infinity }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background:`${PURPLE}1A`, border:`1px solid ${PURPLE}44`, color: PURPLE }}><Zap size={36} /></motion.div>
              <div>
                <span className="font-mono text-xs tracking-widest uppercase text-white/30 block mb-1">Problem Solving</span>
                <h3 className="text-white font-black text-2xl md:text-3xl leading-tight">300+ Problems</h3>
                <p className="text-sm md:text-base mt-1" style={{ color:PURPLE+"aa" }}>LeetCode & GFG</p>
              </div>
            </div>
            <div className="max-w-md">
               <div className="flex items-end gap-2 mb-4">
                  <span className="font-black text-5xl" style={{ color:PURPLE }}>300+</span>
                  <span className="text-white/30 text-xs mb-1 font-mono uppercase tracking-widest">solved</span>
               </div>
               <motion.a href="https://codolio.com/profile/SaiSujit" target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale:1.05, boxShadow:`0 0 20px ${PURPLE}44` }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider"
                  style={{ background:`${PURPLE}15`, color:PURPLE, border:`1px solid ${PURPLE}33` }}>
                  <i className="fas fa-external-link-alt" /> View Profile
                </motion.a>
            </div>
          </div>
        </motion.div>

        {/* BASKETBALL */}
        <motion.div initial={{ opacity:0, y:50 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={cardStyle(false, "#F59E0B")}
          whileHover={{ y:-10, border:`1px solid #F59E0B55`, boxShadow:`0 0 80px #F59E0B25, 0 30px 60px rgba(0,0,0,0.5)` }}
          transition={{ duration: 0.8 }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 w-full">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 bg-white/5 border border-white/10 p-3 shadow-inner">
                  <Target size={36} color="#F59E0B" />
               </div>
               <div>
                 <span className="font-mono text-xs tracking-widest uppercase text-white/30 block mb-1">Sports Leadership</span>
                 <h3 className="text-white font-black text-2xl md:text-3xl leading-tight">Basketball Lead</h3>
                 <p className="text-sm md:text-base mt-1" style={{ color:"#F59E0Baa" }}>Eifer Sports Club</p>
               </div>
            </div>
            <div className="max-w-md">
              <p className="text-white/60 text-sm leading-relaxed">
                Spearheaded the basketball wing of IIIT Lucknow, organizing tournaments and fostering sports culture.
              </p>
            </div>
          </div>
        </motion.div>

        {/* GOOGLE SOLUTION CHALLENGE */}
        <motion.div initial={{ opacity:0, y:50 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={cardStyle(false, "#4285F4")}
          whileHover={{ y:-10, border:`1px solid #4285F455`, boxShadow:`0 0 80px #4285F425, 0 30px 60px rgba(0,0,0,0.5)` }}
          transition={{ duration: 0.8 }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 w-full">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 bg-white/5 border border-white/10 p-4 shadow-inner">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
               </div>
               <div>
                 <span className="font-mono text-xs tracking-widest uppercase text-white/30 block mb-1">Global Competition</span>
                 <h3 className="text-white font-black text-2xl md:text-3xl leading-tight">Team Leader</h3>
                 <p className="text-sm md:text-base mt-1" style={{ color:"#4285F4aa" }}>Google Solution Challenge</p>
               </div>
            </div>
            <div className="max-w-md flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3" style={{ background:"#EA43351A", color:"#EA4335", border:"1px solid #EA433533" }}>Rapid Crisis Response</div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">Led a team to engineer a tech-driven solution for emergency situations.</p>
                <motion.a href={googleBadge} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale:1.05, boxShadow:`0 0 20px #4285F444` }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider"
                  style={{ background:`#4285F415`, color:"#4285F4", border:`1px solid #4285F433` }}>
                  <i className="fas fa-award" /> View Badge
                </motion.a>
              </div>
              {/* Compact Preview */}
              <motion.a href={googleBadge} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.1 }} className="w-32 h-20 rounded-lg overflow-hidden border border-white/10 bg-white/5 shrink-0 shadow-2xl">
                <img src={googleBadge} className="w-full h-full object-cover" alt="Google Badge" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
