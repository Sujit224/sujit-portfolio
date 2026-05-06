import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function TiltCard({ children, style, className }) {
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
