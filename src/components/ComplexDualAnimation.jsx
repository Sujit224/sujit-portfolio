import React, { useEffect, useRef } from 'react';

const COLORS = {
  bg: '#05050A',
  cyan: '#00f2ff',
  purple: '#7000ff',
  magenta: '#ff00ff',
  gold: '#ffb700',
  white: '#ffffff'
};

const nodesConfig = [
  { id: 'ingest', label: 'DATA INGESTION', sub: 'AGENT TRIGGER', icon: 'fas fa-bolt', color: COLORS.gold, col: 3, row: 2 },
  { id: 'llm', label: 'LLM CORE', sub: '(REASONING)', icon: 'fas fa-brain', color: COLORS.cyan, col: 2, row: 2 },
  { id: 'vdb', label: 'VECTOR DB', sub: 'DATABASE', icon: 'fas fa-database', color: COLORS.magenta, col: 1, row: 1 },
  { id: 'clean', label: 'DATA CLEANING', sub: 'SERVICE', icon: 'fas fa-broom', color: COLORS.cyan, col: 2, row: 0 },
  { id: 'api', label: 'API GATEWAY', sub: '(TOOL CALLS)', icon: 'fas fa-network-wired', color: COLORS.purple, col: 1, row: 2 },
  { id: 'pay', label: 'PAYMENT TOOL', sub: 'PROCESSING', icon: 'fas fa-dollar-sign', color: COLORS.purple, col: 0, row: 2 },
  { id: 'task', label: 'SCHEDULER', sub: 'SYSTEM', icon: 'fas fa-clock', color: COLORS.cyan, col: 1, row: 3 },
  { id: 'action', label: 'TRIGGER', sub: 'EXECUTION', icon: 'fas fa-paper-plane', color: COLORS.cyan, col: 0, row: 3 },
];

const pathsConfig = [
  { from: 'ingest', to: 'llm', color: COLORS.gold },
  { from: 'llm', to: 'vdb', color: COLORS.magenta },
  { from: 'vdb', to: 'llm', color: COLORS.magenta }, // Flow back to LLM
  { from: 'llm', to: 'clean', color: COLORS.cyan },
  { from: 'llm', to: 'api', color: COLORS.purple },
  { from: 'api', to: 'pay', color: COLORS.purple },
  { from: 'llm', to: 'task', color: COLORS.cyan },
  { from: 'task', to: 'action', color: COLORS.cyan },
];

export const ComplexDualAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let time = 0;
    
    let pathParticles = [];
    let goldenStream = [];
    
    let nnNodes = [];
    let nnLines = [];
    
    // Resize and generate dynamic positions
    const resizeAndMap = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      
      const bounds = getNNBounds(dpr);
      if (bounds) generateNN(bounds);
    };

    const getNNBounds = (dpr) => {
      const el = document.getElementById('nn-container');
      if (el) {
        const rect = el.getBoundingClientRect();
        const parentRect = canvas.getBoundingClientRect();
        if (rect.width > 50 && rect.height > 50) {
          return {
            x: (rect.left - parentRect.left) * dpr,
            y: (rect.top - parentRect.top) * dpr,
            w: rect.width * dpr,
            h: rect.height * dpr,
          };
        }
      }
      // Fallback right side
      return {
        x: canvas.width * 0.6,
        y: 0,
        w: canvas.width * 0.4,
        h: canvas.height,
      };
    };

    const getNodePos = (id, dpr) => {
      const el = document.getElementById(`node-${id}`);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const parentRect = canvas.getBoundingClientRect();
      return {
        x: (rect.left - parentRect.left + rect.width / 2) * dpr,
        y: (rect.top - parentRect.top + rect.height / 2) * dpr,
      };
    };

    const generateNN = (bounds) => {
      nnNodes = [];
      nnLines = [];
      if (!bounds || bounds.w === 0) return;
      
      const layers = [2, 3, 2]; // Simplified: Output to Input
      const isMobile = bounds.h < bounds.w * 0.8;
      
      layers.forEach((nodeCount, i) => {
        if (!isMobile) {
          // Desktop: Input at right, Output at left
          const lx = bounds.x + bounds.w * (0.1 + i * 0.25); 
          const spacing = bounds.h / (nodeCount + 1);
          for(let j=0; j<nodeCount; j++){
            nnNodes.push({x: lx, y: bounds.y + spacing * (j+1), layer: i});
          }
        } else {
          // Mobile: Input at top, Output at bottom
          const ly = bounds.y + bounds.h * (0.9 - i * 0.25);
          const spacing = bounds.w / (nodeCount + 1);
          for(let j=0; j<nodeCount; j++){
            nnNodes.push({x: bounds.x + spacing * (j+1), y: ly, layer: i});
          }
        }
      });
      
      for(let i=0; i<layers.length-1; i++){
        const cur = nnNodes.filter(n => n.layer === i);
        const nxt = nnNodes.filter(n => n.layer === i+1);
        cur.forEach(n1 => nxt.forEach(n2 => nnLines.push({n1, n2})));
      }
    };

    window.addEventListener('resize', resizeAndMap);
    const RED = '#ff0033';
    let glowState = {
      phase: 'NN',
      progress: 0,
      speed: 0.005,
      n1: null,
      n2: null,
      layer: 2,
      path: null
    };
    const nodeGlows = {}; // { nodeId: activeUntilTimestamp }

    const pickNNNode = (layerIdx) => {
      if (nnNodes.length === 0) return null;
      const nodesInLayer = nnNodes.filter(n => n.layer === layerIdx);
      return nodesInLayer[Math.floor(Math.random() * nodesInLayer.length)];
    };

    const resetGlow = () => {
      const startNode = pickNNNode(2); // New Input layer is index 2
      const nextNode = pickNNNode(1);
      if (!startNode || !nextNode) return;
      glowState = {
        phase: 'NN',
        progress: 0,
        speed: 0.006, 
        n1: startNode,
        n2: nextNode,
        layer: 2,
        path: null
      };
    };

    const advanceGlow = (dpr) => {
      if (!glowState.n1 && glowState.phase === 'NN') {
        resetGlow();
        return;
      }

      glowState.progress += glowState.speed;
      
      if (glowState.progress >= 1) {
        glowState.progress = 0;
        
        if (glowState.phase === 'NN') {
          const currentLayer = glowState.layer - 1;
          if (currentLayer === 0) {
            // Reached NN output, jump gap to workflow Ingest
            const ingestPos = getNodePos('ingest', dpr);
            if (!ingestPos) { resetGlow(); return; }
            glowState.phase = 'GAP';
            glowState.n1 = glowState.n2;
            glowState.n2 = ingestPos;
            glowState.speed = 0.004; 
          } else {
            const nextNode = pickNNNode(currentLayer - 1);
            glowState.n1 = glowState.n2;
            glowState.n2 = nextNode;
            glowState.layer = currentLayer;
          }
        } 
        else if (glowState.phase === 'GAP') {
          // Hit the first workflow node
          nodeGlows['ingest'] = time + 1.5; 
          const nextPaths = pathsConfig.filter(p => p.from === 'ingest');
          if (nextPaths.length === 0) { resetGlow(); return; }
          const path = nextPaths[Math.floor(Math.random() * nextPaths.length)];
          
          glowState.phase = 'WORKFLOW';
          glowState.path = path;
          glowState.speed = 0.005;
        }
        else if (glowState.phase === 'WORKFLOW') {
          // Hit a workflow node
          const reachedNode = glowState.path.to;
          nodeGlows[reachedNode] = time + 1.5;
          
          const nextPaths = pathsConfig.filter(p => p.from === reachedNode);
          if (nextPaths.length === 0) {
            // End of branch, reset to start
            resetGlow();
          } else {
            const path = nextPaths[Math.floor(Math.random() * nextPaths.length)];
            glowState.path = path;
          }
        }
      }
    };

    const render = () => {
      time += 0.016;
      const dpr = window.devicePixelRatio || 1;
      
      if (nnNodes.length === 0 || nnLines.length === 0) {
        resizeAndMap();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      advanceGlow(dpr);

      // 1. Draw static NN lines visibly
      ctx.lineWidth = 1.5 * dpr;
      ctx.strokeStyle = COLORS.cyan; // Changed from purple to highly visible cyan
      ctx.globalAlpha = 0.5;
      nnLines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.n1.x, line.n1.y);
        ctx.lineTo(line.n2.x, line.n2.y);
        ctx.stroke();
      });

      // Draw static NN nodes brightly
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = COLORS.cyan;
      ctx.shadowBlur = 4 * dpr;
      ctx.shadowColor = COLORS.cyan;
      nnNodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5 * dpr, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // 2. Draw static Workflow paths clearly
      pathsConfig.forEach(pData => {
        const fromPos = getNodePos(pData.from, dpr);
        const toPos = getNodePos(pData.to, dpr);
        if (!fromPos || !toPos) return;
        const cx = (fromPos.x + toPos.x) / 2;
        const cy = Math.min(fromPos.y, toPos.y) - (Math.abs(fromPos.x - toPos.x) * 0.2);
        
        ctx.strokeStyle = pData.color;
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = 2 * dpr;
        ctx.beginPath();
        ctx.moveTo(fromPos.x, fromPos.y);
        ctx.quadraticCurveTo(cx, cy, toPos.x, toPos.y);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // 3. Draw single RED glow
      let gx = 0, gy = 0;
      
      if (glowState.phase === 'NN' || glowState.phase === 'GAP') {
        if (glowState.n1 && glowState.n2) {
          gx = glowState.n1.x + (glowState.n2.x - glowState.n1.x) * glowState.progress;
          gy = glowState.n1.y + (glowState.n2.y - glowState.n1.y) * glowState.progress;
        }
      } else if (glowState.phase === 'WORKFLOW' && glowState.path) {
        const fromPos = getNodePos(glowState.path.from, dpr);
        const toPos = getNodePos(glowState.path.to, dpr);
        if (fromPos && toPos) {
          const cx = (fromPos.x + toPos.x) / 2;
          const cy = Math.min(fromPos.y, toPos.y) - (Math.abs(fromPos.x - toPos.x) * 0.2);
          const t = glowState.progress;
          const inv = 1 - t;
          gx = inv * inv * fromPos.x + 2 * inv * t * cx + t * t * toPos.x;
          gy = inv * inv * fromPos.y + 2 * inv * t * cy + t * t * toPos.y;
        }
      }

      if (gx !== 0 && gy !== 0) {
        ctx.fillStyle = RED;
        ctx.shadowBlur = 25 * dpr;
        ctx.shadowColor = RED;
        ctx.beginPath();
        ctx.arc(gx, gy, 4 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Draw Active Node Auras (Activation Effect)
      Object.entries(nodeGlows).forEach(([nodeId, activeUntil]) => {
        if (time < activeUntil) {
          const pos = getNodePos(nodeId, dpr);
          if (pos) {
            const intensity = (activeUntil - time) / 1.5; // Fades out over 1.5s
            
            ctx.shadowBlur = 40 * dpr;
            ctx.shadowColor = RED;
            ctx.fillStyle = `${RED}55`; // Translucent red aura
            ctx.globalAlpha = intensity;
            
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 35 * dpr, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeAndMap);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full flex flex-col-reverse md:flex-row relative bg-transparent min-h-[600px]">
      
      {/* Absolute Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Left Half: Workflow UI Nodes */}
      <div className="w-full md:w-[60%] p-2 md:p-4 relative z-10 grid grid-cols-4 grid-rows-5 gap-2 md:gap-4 min-h-[600px] items-center justify-items-center">
         {nodesConfig.map(n => (
           <div 
             key={n.id} 
             id={`node-${n.id}`} 
             className="relative group cursor-default"
             style={{ gridColumn: n.col + 1, gridRow: n.row + 1 }}
           >
             {/* Circular Node */}
             <div className="flex flex-col items-center justify-center relative">
               <div 
                 className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center backdrop-blur-md bg-[#13131a]/90 border transition-all duration-300 hover:scale-110"
                 style={{ borderColor: `${n.color}55`, boxShadow: `0 0 15px ${n.color}22` }}
               >
                 <i className={`${n.icon} text-sm md:text-lg`} style={{ color: n.color, textShadow: `0 0 10px ${n.color}` }} />
               </div>
               {/* Small Name Below */}
               <div className="mt-2 flex flex-col items-center text-center absolute top-full w-24">
                 <span className="text-[7px] md:text-[8px] font-bold text-white/80 tracking-widest leading-tight">
                   {n.label}
                 </span>
                 {n.sub && (
                   <span className="text-[6px] md:text-[7px] font-mono text-white/40 tracking-wider mt-0.5">
                     {n.sub}
                   </span>
                 )}
               </div>
             </div>
           </div>
         ))}
      </div>
      
      {/* Right Half: Neural Network Container (Canvas draws inside this bound) */}
      <div id="nn-container" className="w-full md:w-[40%] h-[300px] md:h-[600px] relative z-10">
        <div className="absolute top-12 md:top-24 right-4 md:right-8 font-mono text-[9px] md:text-xs text-white/40 tracking-widest text-right leading-relaxed border-r-2 border-purple-500/30 pr-3">
           NEURAL NETWORK<br/>
           <span className="text-white/70">DATA GENERATION</span>
        </div>
      </div>
      
    </div>
  );
};

export default ComplexDualAnimation;
