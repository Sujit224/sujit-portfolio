import { motion } from "framer-motion";
import { SectionHead } from "./SectionHead";
import { PURPLE, CYAN, glass } from "../data/constants";

export function GithubActivity() {
  const username = "Sujit224";
  const themeColor = PURPLE.replace("#", "");

  return (
    <section id="activity" className="relative py-24 px-6 max-w-6xl mx-auto overflow-hidden">
      <SectionHead label="Open Source" title="GitHub Activity" sub="Tracking the pulse of my code contributions and project evolution" />
      
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
        className="rounded-3xl p-8 md:p-12 relative"
        style={{ ...glass, border:`1px solid ${PURPLE}22` }}>
        
        {/* Glow behind the graph */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ background:`radial-gradient(circle at 50% 50%, ${PURPLE} 0%, transparent 70%)` }} />

        <div className="relative z-10 flex flex-col items-center">
          {/* Main Contribution Graph */}
          <div className="w-full overflow-x-auto no-scrollbar mb-10 pb-4">
            <div className="min-w-[800px] flex justify-center">
              <img 
                src={`https://ghchart.rshah.org/${themeColor}/${username}`} 
                alt={`${username}'s GitHub Contributions`}
                className="w-full h-auto rounded-lg filter brightness-125 contrast-125"
                style={{ minHeight: "120px" }}
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <motion.div whileHover={{ y:-5 }} className="rounded-2xl p-6 bg-white/5 border border-white/10 flex flex-col items-center">
              <img 
                src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&title_color=${themeColor}&text_color=ffffff&icon_color=${themeColor}&hide_border=true&bg_color=00000000`} 
                alt="GitHub Stats"
                className="max-w-full h-auto"
              />
            </motion.div>
            
            <motion.div whileHover={{ y:-5 }} className="rounded-2xl p-6 bg-white/5 border border-white/10 flex flex-col items-center">
              <img 
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&title_color=${themeColor}&text_color=ffffff&hide_border=true&bg_color=00000000`} 
                alt="Top Languages"
                className="max-w-full h-auto"
              />
            </motion.div>
          </div>

          <motion.a 
            href={`https://github.com/${username}`} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale:1.05, boxShadow:`0 0 30px ${PURPLE}44` }}
            whileTap={{ scale:0.95 }}
            className="mt-12 px-8 py-3 rounded-full font-bold text-sm tracking-wider flex items-center gap-3 transition-all"
            style={{ background:`linear-gradient(135deg, ${PURPLE}, #6633cc)`, color:"#fff" }}
          >
            <i className="fab fa-github text-lg" />
            Explore Full Profile
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
