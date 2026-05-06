import React from 'react';
import { motion } from 'framer-motion';

const COLORS = {
  bg: '#0B0B1A',
  cyan: '#00f2ff',
  purple: '#7000ff',
  magenta: '#ff00ff'
};

const AgentWorkflow = () => {
  const nodes = [
    { id: 'user', label: 'USER', icon: 'fas fa-user', x: 20, y: 20 },
    { id: 'llm', label: 'LLM CORE', icon: 'fas fa-brain', x: 50, y: 50 },
    { id: 'db', label: 'VECTOR DB', icon: 'fas fa-database', x: 20, y: 80 },
    { id: 'api', label: 'API TOOL', icon: 'fas fa-cogs', x: 80, y: 80 },
  ];

  return (
    <div className="w-full h-full relative flex items-center justify-center bg-[#0B0B1A]/80">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
         <defs>
           <filter id="glow-agent">
             <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
             <feMerge>
               <feMergeNode in="coloredBlur"/>
               <feMergeNode in="SourceGraphic"/>
             </feMerge>
           </filter>
         </defs>
         
         {/* Curved Paths */}
         <path d="M 20 20 Q 50 20 50 50" fill="none" stroke={`${COLORS.cyan}33`} strokeWidth="0.3" />
         <path d="M 50 50 Q 20 50 20 80" fill="none" stroke={`${COLORS.purple}33`} strokeWidth="0.3" />
         <path d="M 50 50 Q 80 50 80 80" fill="none" stroke={`${COLORS.magenta}33`} strokeWidth="0.3" />
         
         {/* Animated Data Packets (Trails) */}
         <circle r="1" fill={COLORS.cyan} filter="url(#glow-agent)">
           <animateMotion dur="2s" repeatCount="indefinite" path="M 20 20 Q 50 20 50 50" />
         </circle>
         <circle r="1" fill={COLORS.purple} filter="url(#glow-agent)">
           <animateMotion dur="2s" begin="1s" repeatCount="indefinite" path="M 50 50 Q 20 50 20 80" />
         </circle>
         <circle r="1" fill={COLORS.magenta} filter="url(#glow-agent)">
           <animateMotion dur="2s" begin="0.5s" repeatCount="indefinite" path="M 50 50 Q 80 50 80 80" />
         </circle>
      </svg>
      
      {/* Glassmorphic Nodes */}
      {nodes.map((n, i) => (
        <div key={n.id} className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
           <motion.div 
             animate={{ 
               boxShadow: [
                 `0 0 10px ${COLORS.cyan}22`, 
                 `0 0 25px ${COLORS.cyan}66`, 
                 `0 0 10px ${COLORS.cyan}22`
               ],
               borderColor: [
                 `rgba(255,255,255,0.1)`, 
                 `rgba(0,242,255,0.5)`, 
                 `rgba(255,255,255,0.1)`
               ]
             }}
             transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
             className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center backdrop-blur-xl bg-white/5 border"
           >
             <i className={`${n.icon} text-lg md:text-xl`} style={{ color: COLORS.cyan, textShadow: `0 0 10px ${COLORS.cyan}` }} />
           </motion.div>
           <span className="mt-3 text-[9px] md:text-[11px] font-mono text-white/80 tracking-widest bg-black/40 px-2 py-1 rounded-md border border-white/10">{n.label}</span>
        </div>
      ))}
    </div>
  );
};

const NeuralNetwork = () => {
  const layersData = [
    [20, 40, 60, 80],               // Input
    [10, 26, 42, 58, 74, 90],       // Hidden 1
    [10, 26, 42, 58, 74, 90],       // Hidden 2
    [20, 40, 60, 80],               // Hidden 3
    [35, 65]                        // Output
  ];
  const layerXs = [10, 30, 50, 70, 90];
  
  const nodes = [];
  const lines = [];

  layersData.forEach((layer, i) => {
    layer.forEach((y, j) => {
      nodes.push({ id: `n-${i}-${j}`, x: layerXs[i], y, layer: i });
      if (i < layersData.length - 1) {
        layersData[i+1].forEach((nextY, k) => {
          lines.push({ id: `l-${i}-${j}-${k}`, x1: layerXs[i], y1: y, x2: layerXs[i+1], y2: nextY, layer: i });
        });
      }
    });
  });

  return (
    <div className="w-full h-full relative bg-[#0B0B1A]/80">
       <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
         <defs>
           <filter id="nn-glow">
             <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
             <feMerge>
               <feMergeNode in="coloredBlur"/>
               <feMergeNode in="SourceGraphic"/>
             </feMerge>
           </filter>
         </defs>
         
         {/* Synaptic Connections */}
         {lines.map(line => (
           <motion.line
             key={line.id}
             x1={`${line.x1}%`} y1={`${line.y1}%`}
             x2={`${line.x2}%`} y2={`${line.y2}%`}
             stroke={COLORS.purple}
             strokeWidth="0.2"
             initial={{ opacity: 0.1, stroke: `${COLORS.purple}33` }}
             animate={{ 
               opacity: [0.1, 0.9, 0.1],
               stroke: [`${COLORS.purple}33`, COLORS.magenta, `${COLORS.purple}33`]
             }}
             transition={{ duration: 2.5, repeat: Infinity, delay: line.layer * 0.5, ease: "easeInOut" }}
           />
         ))}
         
         {/* Neurons */}
         {nodes.map(node => (
           <motion.circle
             key={node.id}
             cx={`${node.x}%`} cy={`${node.y}%`} 
             fill={COLORS.cyan}
             initial={{ opacity: 0.2, r: 1.2 }}
             animate={{ 
               opacity: [0.2, 1, 0.2], 
               r: [1.2, 2.5, 1.2],
               fill: [COLORS.cyan, '#ffffff', COLORS.cyan]
             }}
             transition={{ duration: 2.5, repeat: Infinity, delay: node.layer * 0.5, ease: "easeInOut" }}
             filter="url(#nn-glow)"
           />
         ))}
       </svg>
    </div>
  );
};

export const DualAnimationVisual = () => {
  return (
    <div className="w-full h-full min-h-[500px] flex flex-col md:flex-row bg-[#0B0B1A] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,242,255,0.1)] border border-white/10">
      {/* Left Panel */}
      <div className="flex-1 relative border-b md:border-b-0 md:border-r border-white/10 overflow-hidden min-h-[300px]">
        <div className="absolute top-4 left-4 z-10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/70 border border-cyan-400/20 px-2 py-1 rounded bg-black/40 backdrop-blur-md">
            Agent Workflow
          </span>
        </div>
        <AgentWorkflow />
      </div>

      {/* Right Panel */}
      <div className="flex-1 relative overflow-hidden min-h-[300px]">
        <div className="absolute top-4 left-4 z-10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-purple-400/70 border border-purple-400/20 px-2 py-1 rounded bg-black/40 backdrop-blur-md">
            Forward Propagation
          </span>
        </div>
        <NeuralNetwork />
      </div>
    </div>
  );
};

export default DualAnimationVisual;
