import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

const PURPLE = "#9966FF";
const CYAN = "#00FFEE";
const DARK = "#060608";

// ───────────────────────── DATA ─────────────────────────

const techStack = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Three.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg", invert: true },
  { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
  { name: "Scikit-Learn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "OpenCV", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg" },
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "SQLAlchemy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlalchemy/sqlalchemy-original.svg" },
  { name: "LangChain", symbol: "🔗", color: "#1C9955" },
  { name: "LangGraph", symbol: "⬡", color: PURPLE },
  { name: "Hugging Face", symbol: "🤗", color: "#FFD21E" },
  { name: "YOLOv8", symbol: "👁", color: CYAN },
  { name: "Groq LLM", symbol: "⚡", color: "#F55036" },
];

const projects = [
  {
    id: "aria", title: "ARIA", subtitle: "AI-Powered Hotel Emergency Response System",
    desc: "Hybrid AI detection pipeline combining Qwen3-32B + YOLOv8 for real-time threat identification. Features a React + Three.js immersive 3D dashboard with zero-latency Firebase sync for instant emergency alerts across hotel floors.",
    tech: ["Python", "FastAPI", "LangGraph", "YOLOv8", "React", "Three.js", "Firebase"],
    accent: PURPLE, icon: "🛡️",
    bgGrad: `radial-gradient(ellipse at top left, ${PURPLE}22 0%, transparent 60%), radial-gradient(ellipse at bottom right, ${CYAN}12 0%, transparent 60%)`,
    github: "https://github.com/",
  },
  {
    id: "securebank", title: "Secure Bank", subtitle: "AI-Powered Banking Application",
    desc: "Full-stack financial platform with an LLM-powered assistant leveraging tool-calling for deep contextual queries. Delivers real-time insights across accounts, transactions, and market data with enterprise-grade security.",
    tech: ["React", "FastAPI", "SQLAlchemy", "MySQL", "LangChain", "Groq LLM"],
    accent: CYAN, icon: "🏦",
    bgGrad: `radial-gradient(ellipse at top right, ${CYAN}22 0%, transparent 60%), radial-gradient(ellipse at bottom left, ${PURPLE}12 0%, transparent 60%)`,
    github: "https://github.com/",
  },
];

const skillData = {
  "Core CS": [
    { name: "Data Structures & Algorithms", level: 92 },
    { name: "Object-Oriented Programming", level: 90 },
    { name: "Operating Systems", level: 82 },
    { name: "Database Management Systems", level: 85 },
  ],
  "AI & ML": [
    { name: "Deep Learning", level: 88 },
    { name: "Generative AI", level: 92 },
    { name: "RAG Pipelines", level: 90 },
    { name: "NLP", level: 85 },
    { name: "MCP Protocol", level: 80 },
  ],
};

// ───────────────────────── UTILS ─────────────────────────

const glass = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.09)",
  backdropFilter: "blur(20px)",
  borderRadius: 20,
};

// ───────────────────────── PARTICLE FIELD ─────────────────────────

function ParticleField() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    const N = 80;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.3, hue: Math.random() > 0.55 ? 270 : 180,
    }));
    let mouse = { x: -999, y: -999 };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMove);
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},80%,70%,0.75)`; ctx.fill();
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.sqrt(dx*dx+dy*dy);
        if (d < 160) { ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(mouse.x,mouse.y); ctx.strokeStyle=`hsla(${p.hue},80%,70%,${0.18*(1-d/160)})`; ctx.lineWidth=0.5; ctx.stroke(); }
        pts.forEach(q => {
          const qd = Math.sqrt((p.x-q.x)**2+(p.y-q.y)**2);
          if (qd < 100) { ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.strokeStyle=`hsla(270,60%,60%,${0.12*(1-qd/100)})`; ctx.lineWidth=0.4; ctx.stroke(); }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none" />;
}

// ───────────────────────── CURSOR GLOW ─────────────────────────

function CursorGlow() {
  const [p, setP] = useState({ x: -400, y: -400 });
  useEffect(() => { const fn = e => setP({ x: e.clientX, y: e.clientY }); window.addEventListener("mousemove", fn); return () => window.removeEventListener("mousemove", fn); }, []);
  return (
    <div className="fixed pointer-events-none z-10" style={{ left: p.x-220, top: p.y-220, width: 440, height: 440, background: "radial-gradient(circle, rgba(153,102,255,0.09) 0%, transparent 70%)", borderRadius: "50%", transition: "left 0.12s ease, top 0.12s ease" }} />
  );
}

// ───────────────────────── SECTION HEAD ─────────────────────────

function SectionHead({ label, title, sub }) {
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

// ───────────────────────── JIGGLE ENTRY ─────────────────────────

const CHARS = "C SAI SUJIT".split("");

function JigEntry({ onDone }) {
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

// ───────────────────────── NAV ─────────────────────────

function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => { const fn = () => setSolid(window.scrollY>50); window.addEventListener("scroll",fn); return () => window.removeEventListener("scroll",fn); }, []);
  const links = [["About","#about"],["Stack","#stack"],["Skills","#skills"],["Projects","#projects"],["Achievements","#achievements"],["Connect","#connect"]];
  return (
    <motion.nav initial={{ y:-80, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.8, delay:0.2 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={solid ? { background:"rgba(6,6,8,0.88)", backdropFilter:"blur(24px)", borderBottom:`1px solid ${PURPLE}22` } : {}}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between py-4">
        <motion.span whileHover={{ textShadow:`0 0 20px ${PURPLE}` }} className="font-mono font-bold text-sm tracking-widest" style={{ color:PURPLE }}>
          {"<C·SS />"}
        </motion.span>
        <div className="hidden md:flex gap-8 items-center">
          {links.map(([l,h]) => (
            <a key={l} href={h} className="font-mono text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors relative group">
              {l}<span className="absolute -bottom-0.5 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ background:PURPLE }} />
            </a>
          ))}
          <motion.a href="#connect" whileHover={{ boxShadow:`0 0 20px ${PURPLE}99` }}
            className="px-4 py-1.5 rounded-full font-mono text-xs tracking-widest uppercase font-bold text-white"
            style={{ background:`linear-gradient(135deg, ${PURPLE}, #6633cc)` }}>
            Hire Me
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}

// ───────────────────────── TILT CARD ─────────────────────────

function TiltCard({ children, style, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const rotX = useSpring(useTransform(y,[-0.5,0.5],[8,-8]),{ stiffness:200, damping:22 });
  const rotY = useSpring(useTransform(x,[-0.5,0.5],[-8,8]),{ stiffness:200, damping:22 });
  return (
    <motion.div ref={ref} style={{ rotateX:rotX, rotateY:rotY, transformStyle:"preserve-3d", ...style }} className={className}
      onMouseMove={e => { const r=ref.current.getBoundingClientRect(); x.set((e.clientX-r.left)/r.width-0.5); y.set((e.clientY-r.top)/r.height-0.5); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

// ───────────────────────── HERO ─────────────────────────

function Hero() {
  const ctaBtns = [
    { label:"View Projects", href:"#projects", primary:true },
    { label:"GitHub", href:"https://github.com/", icon:"fab fa-github", ext:true },
    { label:"Resume", href:"#", icon:"fas fa-file-alt" },
    { label:"Hackathon Certificate", href:"#achievements", icon:"fas fa-certificate" },
  ];
  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 overflow-hidden">
      {/* BIG ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ zIndex:0 }}>
        <span className="font-black leading-none" style={{ fontSize:"18vw", color:"transparent", WebkitTextStroke:`1px ${PURPLE}14` }}>AI/ML</span>
      </div>
      {/* Animated rings */}
      {[200,280,360,450].map((s,i) => (
        <motion.div key={s} className="absolute rounded-full pointer-events-none"
          style={{ width:s, height:s, border:`1px solid ${[PURPLE,CYAN,PURPLE,CYAN][i]}${["30","18","12","08"][i]}`, left:"50%", top:"50%", marginLeft:-s/2, marginTop:-s/2 }}
          animate={{ rotate:i%2===0?360:-360, scale:[1,1.015,1] }}
          transition={{ duration:10+i*4, repeat:Infinity, ease:"linear" }} />
      ))}
      {/* Avatar */}
      <motion.div initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.8, delay:0.3, type:"spring", stiffness:100 }}
        className="relative mb-8 z-10">
        <div className="w-36 h-36 rounded-full flex items-center justify-center text-5xl"
          style={{ background:`linear-gradient(135deg, ${PURPLE}33, ${DARK})`, boxShadow:`0 0 0 3px ${PURPLE}, 0 0 60px ${PURPLE}77, 0 0 130px ${PURPLE}22` }}>
          <motion.span animate={{ scale:[1,1.08,1] }} transition={{ duration:3, repeat:Infinity }}>🧠</motion.span>
        </div>
        {/* Orbits */}
        {[[6, CYAN, 6, 5.5, "100%", "100%"], [5, PURPLE, 9, 5, "130%", "130%"]].map(([dotSize,color,dur,offset,w,h],i) => (
          <motion.div key={i} className="absolute" style={{ width:w, height:h, top:`${-(parseFloat(w)-100)/2}%`, left:`${-(parseFloat(w)-100)/2}%` }}
            animate={{ rotate:i===0?360:-360 }} transition={{ duration:dur, repeat:Infinity, ease:"linear" }}>
            <div className="absolute rounded-full" style={{ width:dotSize, height:dotSize, top:-dotSize/2, left:"50%", marginLeft:-dotSize/2, background:color, boxShadow:`0 0 12px ${color}` }} />
          </motion.div>
        ))}
      </motion.div>
      {/* Name */}
      <motion.h1 initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.5 }}
        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4 z-10 text-white"
        style={{ textShadow:`0 0 80px ${PURPLE}44` }}>
        C Sai Sujit
      </motion.h1>
      <motion.div initial={{ opacity:0, scaleX:0 }} animate={{ opacity:1, scaleX:1 }} transition={{ duration:0.6, delay:0.7 }}
        className="flex items-center gap-4 mb-5 z-10">
        <div className="h-px w-20" style={{ background:`linear-gradient(to right, transparent, ${PURPLE})` }} />
        <span className="font-mono text-sm tracking-widest uppercase" style={{ color:PURPLE }}>AI + ML Developer</span>
        <div className="h-px w-20" style={{ background:`linear-gradient(to left, transparent, ${PURPLE})` }} />
      </motion.div>
      <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.9 }}
        className="max-w-2xl text-white/50 text-lg leading-relaxed mb-12 z-10">
        Passionate AI+ML Developer specializing in{" "}
        <span className="font-semibold" style={{ color:PURPLE }}>Agentic Workflows</span> — building intelligent systems that perceive, reason, and act.
      </motion.p>
      {/* CTAs */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:1.1 }}
        className="flex flex-wrap gap-3 justify-center z-10">
        {ctaBtns.map((b) => (
          <motion.a key={b.label} href={b.href} target={b.ext?"_blank":"_self"} rel="noopener noreferrer"
            whileHover={{ scale:1.06, y:-4 }} whileTap={{ scale:0.96 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-wider transition-all"
            style={b.primary ? { background:`linear-gradient(135deg, ${PURPLE}, #6633cc)`, boxShadow:`0 0 24px ${PURPLE}55`, color:"#fff" } : { border:"1px solid rgba(255,255,255,0.14)", background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.7)", backdropFilter:"blur(12px)" }}>
            {b.icon && <i className={`${b.icon} text-xs`} />}{b.label}
          </motion.a>
        ))}
      </motion.div>
      {/* Scroll */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        animate={{ y:[0,10,0] }} transition={{ duration:2.5, repeat:Infinity }}>
        <span className="font-mono text-[10px] tracking-widest uppercase text-white/20">scroll</span>
        <i className="fas fa-chevron-down text-white/20 text-sm" />
      </motion.div>
    </section>
  );
}

// ───────────────────────── TECH STACK ─────────────────────────

function TechStack() {
  return (
    <section id="stack" className="relative py-24 px-6 max-w-6xl mx-auto">
      <SectionHead label="Technologies" title="Tech Stack" sub="Every tool I wield — all logos visible" />
      {/* Full grid — all 16 logos */}
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 mb-10">
        {techStack.map((t,i) => (
          <motion.div key={t.name}
            initial={{ opacity:0, y:24, scale:0.85 }} whileInView={{ opacity:1, y:0, scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.04, duration:0.5, ease:[0.22,1,0.36,1] }}
            whileHover={{ y:-8, scale:1.08, boxShadow:`0 0 40px ${t.color||PURPLE}55, 0 16px 40px rgba(0,0,0,0.4)`, borderColor:(t.color||PURPLE)+"66" }}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl transition-all cursor-default"
            style={{ ...glass, borderColor:`rgba(255,255,255,0.09)` }}>
            {t.logo ? (
              <img src={t.logo} alt={t.name} className="w-9 h-9 object-contain" style={t.invert?{ filter:"invert(1)" }:{}} />
            ) : (
              <span className="text-3xl leading-none">{t.symbol}</span>
            )}
            <span className="font-mono text-[10px] tracking-wide text-center text-white/45 leading-tight">{t.name}</span>
          </motion.div>
        ))}
      </div>
      {/* Scrolling name strip */}
      <div className="relative overflow-hidden" style={{ maskImage:"linear-gradient(90deg, transparent, black 15%, black 85%, transparent)" }}>
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

// ───────────────────────── EDUCATION ─────────────────────────

function Education() {
  const items = [
    { degree:"B.Tech — Information Technology", school:"Indian Institute of Information Technology, Lucknow", score:"CGPA: 8.75", year:"2022 – 2026", icon:"🎓" },
    { degree:"CBSE Class XII", school:"Sri Chaitanya Techno School", score:"95.8%", year:"2020 – 2022", icon:"🏫" },
  ];
  const docBtns = [
    { label:"Download Resume", icon:"fas fa-download", href:"#", primary:true },
    { label:"GitHub", icon:"fab fa-github", href:"https://github.com/", ext:true },
    { label:"LinkedIn", icon:"fab fa-linkedin", href:"https://linkedin.com/", ext:true },
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

// ───────────────────────── SKILLS ─────────────────────────

function SkillBar({ name, level, inView, delay }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-white/65 text-sm font-medium">{name}</span>
        <span className="font-mono text-xs" style={{ color:PURPLE }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background:"rgba(255,255,255,0.07)" }}>
        <motion.div className="h-full rounded-full" initial={{ width:0 }} animate={inView?{ width:`${level}%` }:{}}
          transition={{ duration:1.3, delay, ease:[0.22,1,0.36,1] }}
          style={{ background:`linear-gradient(90deg, ${PURPLE}, ${CYAN})` }} />
      </div>
    </div>
  );
}

function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, amount:0.2 });
  return (
    <section id="skills" className="relative py-24 px-6 max-w-6xl mx-auto">
      <SectionHead label="Capabilities" title="Skills" />
      <div ref={ref} className="grid md:grid-cols-2 gap-6">
        {Object.entries(skillData).map(([cat, skills], ci) => (
          <motion.div key={cat} initial={{ opacity:0, y:40 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.7, delay:ci*0.15 }}
            className="rounded-2xl p-8" style={glass}>
            <h3 className="font-mono text-xs tracking-[0.3em] uppercase mb-6 flex items-center gap-2" style={{ color:PURPLE }}>
              <span className="w-2 h-2 rounded-full" style={{ background:PURPLE }} />{cat}
            </h3>
            {skills.map((s,si) => <SkillBar key={s.name} name={s.name} level={s.level} inView={inView} delay={0.3+ci*0.1+si*0.09} />)}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ───────────────────────── POSITION ─────────────────────────

function Position() {
  return (
    <section id="position" className="relative py-24 px-6 max-w-6xl mx-auto">
      <SectionHead label="Leadership" title="Position of Responsibility" />
      <TiltCard style={glass} className="rounded-2xl p-10">
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          <motion.div initial={{ scale:0, rotate:-20 }} whileInView={{ scale:1, rotate:0 }} viewport={{ once:true }} transition={{ duration:0.6, type:"spring" }}
            className="shrink-0 flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)" }}>
              <span className="font-black text-xl leading-none">
                <span style={{ color:"#4285F4" }}>G</span><span style={{ color:"#EA4335" }}>o</span><span style={{ color:"#FBBC05" }}>o</span>
                <span style={{ color:"#4285F4" }}>g</span><span style={{ color:"#34A853" }}>l</span><span style={{ color:"#EA4335" }}>e</span>
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/30">GDG</span>
          </motion.div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h3 className="text-white font-black text-xl md:text-2xl">Lead Member</h3>
              <span className="font-mono text-xs px-3 py-1 rounded-full" style={{ color:PURPLE, background:`${PURPLE}18`, border:`1px solid ${PURPLE}33` }}>Machine Learning Wing</span>
            </div>
            <p className="text-white/40 text-sm mb-6">Google Developer Groups, IIIT Lucknow</p>
            {[
              { icon:"🎤", text:'Conducted technical sessions on Generative AI and AI Agents for the developer community, covering cutting-edge agentic frameworks.' },
              { icon:"🏆", text:'Planned and coordinated "Ragathon 2026" — a flagship RAG-focused hackathon bringing together top AI practitioners.' },
            ].map((item,i) => (
              <motion.div key={i} initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:0.2+i*0.15 }}
                className="flex items-start gap-3 mb-4">
                <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </TiltCard>
    </section>
  );
}

// ───────────────────────── PROJECTS ─────────────────────────

function ProjectCard({ project, index }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div initial={{ opacity:0, y:60 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay:index*0.15 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      whileHover={{ y:-12 }}
      className="rounded-2xl overflow-hidden flex flex-col transition-all duration-400"
      style={{ ...glass, border:`1px solid ${hov?project.accent+"50":"rgba(255,255,255,0.09)"}`, boxShadow:hov?`0 0 60px ${project.accent}25, 0 30px 60px rgba(0,0,0,0.5)`:"none", transition:"border-color .3s, box-shadow .3s" }}>
      {/* Hero */}
      <div className="relative h-52 flex items-center justify-center overflow-hidden" style={{ background:project.bgGrad }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage:`linear-gradient(${project.accent}33 1px, transparent 1px), linear-gradient(90deg, ${project.accent}33 1px, transparent 1px)`, backgroundSize:"28px 28px" }} />
        <motion.span className="text-6xl relative z-10" animate={hov?{ scale:[1,1.12,1.06], rotate:[0,-4,4,0] }:{ scale:1, rotate:0 }} transition={{ duration:0.5 }}>{project.icon}</motion.span>
        <div className="absolute top-3 right-3"><span className="font-mono text-xs px-2 py-1 rounded-full" style={{ color:project.accent, background:`${project.accent}18`, border:`1px solid ${project.accent}33` }}>Featured</span></div>
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background:"linear-gradient(to top, rgba(6,6,8,0.9), transparent)" }} />
      </div>
      {/* Body */}
      <div className="flex flex-col flex-1 p-7">
        <h3 className="text-white font-black text-2xl">{project.title}</h3>
        <p className="text-sm mt-0.5 mb-4" style={{ color:project.accent+"bb" }}>{project.subtitle}</p>
        <p className="text-white/55 text-sm leading-relaxed flex-1 mb-5">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map(t => (
            <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-full"
              style={{ color:project.accent+"cc", background:`${project.accent}12`, border:`1px solid ${project.accent}25` }}>{t}</span>
          ))}
        </div>
        <div className="flex gap-3">
          <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.05, boxShadow:`0 0 20px ${project.accent}44` }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider flex-1 justify-center"
            style={{ background:`${project.accent}1A`, color:project.accent, border:`1px solid ${project.accent}33` }}>
            <i className="fab fa-github" /> GitHub
          </motion.a>
          <motion.a href="#" whileHover={{ scale:1.05 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider flex-1 justify-center text-white"
            style={{ background:`linear-gradient(135deg, ${project.accent}, ${project.accent}bb)` }}>
            <i className="fas fa-external-link-alt" /> Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 max-w-6xl mx-auto">
      <SectionHead label="Featured Work" title="Projects" sub="Systems built to solve real problems with AI" />
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p,i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </section>
  );
}

// ───────────────────────── ACHIEVEMENTS ─────────────────────────

function Achievements() {
  const [metaHov, setMetaHov] = useState(false);
  const [dsaHov, setDsaHov] = useState(false);
  const dsaRef = useRef(null);
  const dsaInView = useInView(dsaRef, { once:true, amount:0.4 });

  return (
    <section id="achievements" className="relative py-24 px-6 max-w-6xl mx-auto">
      <SectionHead label="Milestones" title="Achievements" sub="Moments that define the journey" />
      <div className="grid md:grid-cols-2 gap-6">
        {/* META */}
        <motion.div initial={{ opacity:0, y:50 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
          onMouseEnter={() => setMetaHov(true)} onMouseLeave={() => setMetaHov(false)}
          animate={metaHov ? { y:-10 } : { y:[0,-6,0] }}
          style={{ ...glass, borderRadius:20, border:`1px solid ${metaHov?"#0082fb44":"rgba(255,255,255,0.09)"}`, boxShadow:metaHov?"0 0 80px #0082fb25, 0 30px 60px rgba(0,0,0,0.5)":"none", padding:"2rem", transition:"border-color .3s, box-shadow .3s" }}
          transition={metaHov?{ duration:0.3 }:{ y:{ duration:3, repeat:Infinity, ease:"easeInOut" } }}>
          <div className="flex items-center gap-4 mb-5">
            <motion.div whileHover={{ rotate:[0,-12,12,0] }} transition={{ duration:0.4 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background:"linear-gradient(135deg, #0082fb22, #0082fb0A)", border:"1px solid #0082fb44" }}>
              <i className="fab fa-meta text-3xl" style={{ color:"#0082fb" }} />
            </motion.div>
            <div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/30 block">Meta</span>
              <h3 className="text-white font-black text-xl leading-tight">Finalist</h3>
              <p className="text-sm" style={{ color:"#0082fbaa" }}>PyTorch Hackathon</p>
            </div>
          </div>
          <p className="text-white/55 text-sm leading-relaxed mb-5">
            Selected as a global finalist in the prestigious Meta PyTorch Hackathon — competing against the world's top AI developers.
          </p>
          <motion.div animate={{ opacity:[0.6,1,0.6] }} transition={{ duration:2, repeat:Infinity }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs font-bold mb-5"
            style={{ color:"#0082fb", background:"#0082fb15", border:"1px solid #0082fb33" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background:"#0082fb" }} />Global Finalist
          </motion.div>
          {/* Certificate button */}
          <div>
            <motion.a href="#" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.04, boxShadow:"0 0 24px #0082fb44" }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold tracking-wider w-full justify-center"
              style={{ background:"#0082fb1A", color:"#0082fb", border:"1px solid #0082fb33" }}>
              <i className="fas fa-certificate" /> View Hackathon Certificate
            </motion.a>
          </div>
        </motion.div>

        {/* DSA */}
        <motion.div ref={dsaRef} initial={{ opacity:0, y:50 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay:0.15 }}
          onMouseEnter={() => setDsaHov(true)} onMouseLeave={() => setDsaHov(false)}
          animate={dsaHov ? { y:-10 } : { y:[0,-5,0] }}
          style={{ ...glass, borderRadius:20, border:`1px solid ${dsaHov?PURPLE+"50":"rgba(255,255,255,0.09)"}`, boxShadow:dsaHov?`0 0 80px ${PURPLE}25, 0 30px 60px rgba(0,0,0,0.5)`:"none", padding:"2rem", transition:"border-color .3s, box-shadow .3s" }}
          transition={dsaHov?{ duration:0.3 }:{ y:{ duration:3.5, repeat:Infinity, ease:"easeInOut" } }}>
          <div className="flex items-center gap-4 mb-5">
            <motion.div animate={{ rotate:[0,5,-5,0] }} transition={{ duration:4, repeat:Infinity }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-3xl"
              style={{ background:`${PURPLE}1A`, border:`1px solid ${PURPLE}44` }}>⚡</motion.div>
            <div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/30 block">Problem Solving</span>
              <h3 className="text-white font-black text-xl">500+ DSA Problems</h3>
              <p className="text-sm" style={{ color:PURPLE+"aa" }}>LeetCode & Codeforces</p>
            </div>
          </div>
          <div className="flex items-end gap-2 mb-5">
            <motion.span className="font-black leading-none" style={{ fontSize:"3.8rem", color:PURPLE }}
              animate={{ opacity:[0.7,1,0.7] }} transition={{ duration:3, repeat:Infinity }}>500</motion.span>
            <span className="font-black text-3xl mb-2" style={{ color:CYAN }}>+</span>
            <span className="text-white/30 text-sm mb-3 font-mono">solved</span>
          </div>
          <div className="flex gap-2 flex-wrap mb-5">
            {["LeetCode","Codeforces"].map(p => (
              <span key={p} className="font-mono text-xs px-3 py-1 rounded-full" style={{ color:PURPLE+"cc", background:`${PURPLE}12`, border:`1px solid ${PURPLE}25` }}>{p}</span>
            ))}
          </div>
          {[{ label:"Arrays & DP", val:88 },{ label:"Graphs & Trees", val:78 },{ label:"Competitive", val:82 }].map(s => (
            <div key={s.label} className="mb-3">
              <div className="flex justify-between text-[11px] mb-1 font-mono">
                <span className="text-white/40">{s.label}</span>
                <span style={{ color:PURPLE }}>{s.val}%</span>
              </div>
              <div className="h-1 rounded-full" style={{ background:"rgba(255,255,255,0.07)" }}>
                <motion.div className="h-full rounded-full" initial={{ width:0 }} animate={dsaInView?{ width:`${s.val}%` }:{}}
                  transition={{ duration:1.2, ease:[0.22,1,0.36,1] }}
                  style={{ background:`linear-gradient(90deg, ${PURPLE}, ${CYAN})` }} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ───────────────────────── CONNECT ─────────────────────────

function Connect() {
  const socials = [
    { icon:"fas fa-phone", label:"+91 8105626006", href:"tel:+918105626006", accent:PURPLE },
    { icon:"fas fa-envelope", label:"saisujit300@gmail.com", href:"mailto:saisujit300@gmail.com", accent:CYAN },
    { icon:"fab fa-github", label:"GitHub", href:"https://github.com/", accent:"#ffffff" },
    { icon:"fab fa-linkedin", label:"LinkedIn", href:"https://linkedin.com/", accent:"#0A66C2" },
    { icon:"fas fa-code", label:"LeetCode", href:"https://leetcode.com/", accent:"#FFA116" },
  ];
  const quickLinks = [
    { label:"Resume", icon:"fas fa-file-alt", href:"#", accent:PURPLE },
    { label:"GitHub", icon:"fab fa-github", href:"https://github.com/", accent:"#ffffff", ext:true },
    { label:"PyTorch Certificate", icon:"fas fa-certificate", href:"#", accent:"#0082fb" },
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

        {/* Quick doc links */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {quickLinks.map((b) => (
            <motion.a key={b.label} href={b.href} target={b.ext?"_blank":"_self"} rel="noopener noreferrer"
              whileHover={{ scale:1.07, y:-4, boxShadow:`0 0 30px ${b.accent}55` }} whileTap={{ scale:0.96 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-wider"
              style={{ color:b.accent, border:`1px solid ${b.accent}33`, background:`${b.accent}0E` }}>
              <i className={b.icon} />{b.label}
            </motion.a>
          ))}
        </div>

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

// ───────────────────────── APP ─────────────────────────

export default function App() {
  const [entered, setEntered] = useState(false);
  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background:DARK }}>
      <style>{`
        *{box-sizing:border-box}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#060608}
        ::-webkit-scrollbar-thumb{background:#9966FF44;border-radius:99px}
        ::-webkit-scrollbar-thumb:hover{background:#9966FF88}
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        body{font-family:'Inter',system-ui,sans-serif}
      `}</style>

      <AnimatePresence>
        {!entered && <JigEntry key="entry" onDone={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && (
        <>
          <ParticleField />
          <CursorGlow />
          <Nav />
          <Hero />
          <TechStack />
          <Education />
          <Skills />
          <Position />
          <Projects />
          <Achievements />
          <Connect />
        </>
      )}
    </div>
  );
}