import { useRef, useEffect } from "react";

export function ParticleField() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    const N = 40;
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
