import { useState, useEffect } from "react";

export function CursorGlow() {
  const [p, setP] = useState({ x: -400, y: -400 });
  useEffect(() => { const fn = e => setP({ x: e.clientX, y: e.clientY }); window.addEventListener("mousemove", fn); return () => window.removeEventListener("mousemove", fn); }, []);
  return (
    <div className="fixed pointer-events-none z-10" style={{ left: p.x-220, top: p.y-220, width: 440, height: 440, background: "radial-gradient(circle, rgba(153,102,255,0.09) 0%, transparent 70%)", borderRadius: "50%", transition: "left 0.12s ease, top 0.12s ease" }} />
  );
}
