import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Object3D, Vector3 } from 'three';
import * as THREE from 'three';
import gsap from 'gsap';
import { Line, Billboard, Text } from '@react-three/drei';

const COLORS = {
  bg: '#050505',
  cyan: '#00f2ff',
  purple: '#7000ff',
  magenta: '#ff00ff'
};

// Track 1: The Langchain Connector
const LangchainConnector = ({ rippleActive }) => {
  // A horizontal chain of glowing hexagonal nodes
  const nodes = [
    [-3, 1, 0], [-1.5, 0.5, 0.5], [0, 1.5, -0.5], [1.5, 0.5, 0.5], [3, 1, 0]
  ];
  
  return (
    <group>
      {nodes.map((pos, i) => (
        <group key={i} position={pos}>
           <mesh>
             <cylinderGeometry args={[0.2, 0.2, 0.1, 6]} />
             <meshStandardMaterial 
               color={rippleActive ? COLORS.magenta : COLORS.cyan} 
               emissive={rippleActive ? COLORS.magenta : COLORS.cyan} 
               emissiveIntensity={0.8} 
               wireframe
             />
           </mesh>
           <pointLight color={rippleActive ? COLORS.magenta : COLORS.cyan} distance={1.5} intensity={2} />
        </group>
      ))}
      <Line 
        points={nodes} 
        color={rippleActive ? COLORS.magenta : COLORS.cyan} 
        lineWidth={2} 
        dashed 
        dashSize={0.2} 
        gapSize={0.1} 
      />
      {/* Data shuttles zipping between nodes */}
      <DataShuttle nodes={nodes} rippleActive={rippleActive} />
      <DataShuttle nodes={nodes} rippleActive={rippleActive} offset={0.5} />
    </group>
  );
};

const DataShuttle = ({ nodes, rippleActive, offset = 0 }) => {
  const meshRef = useRef();
  const [progress, setProgress] = useState(offset * (nodes.length - 1));

  useFrame((state, delta) => {
    // Speed up shuttle when ripple is active
    const speed = rippleActive ? 2.0 : 0.8;
    setProgress(p => (p + delta * speed) % (nodes.length - 1));
    
    const idx = Math.floor(progress);
    const nextIdx = (idx + 1) % nodes.length;
    const t = progress - idx;
    
    if (meshRef.current && nodes[idx] && nodes[nextIdx]) {
      const p1 = new Vector3(...nodes[idx]);
      const p2 = new Vector3(...nodes[nextIdx]);
      meshRef.current.position.lerpVectors(p1, p2, t);
      
      // Pulse scale
      const scale = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.2;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color={rippleActive ? COLORS.magenta : '#ffffff'} />
    </mesh>
  );
};

// Track 2: The Synapse Forge
const SynapseForge = ({ scrollY, rippleActive }) => {
  const meshRef = useRef();
  const count = 300; // grid size
  const dummy = useMemo(() => new Object3D(), []);
  
  // Chaos level can be adjusted here by changing the random factors
  const initialPositions = useMemo(() => new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 6), []);
  const speeds = useMemo(() => new Float32Array(count).map(() => Math.random() * 0.05 + 0.02), []);

  useFrame((state) => {
    let t = state.clock.getElapsedTime();
    // Rain speeds up on ripple or scroll
    let speedMult = rippleActive ? 4 : 1;
    speedMult += scrollY * 0.005;

    for (let i = 0; i < count; i++) {
      const x = initialPositions[i * 3];
      const z = initialPositions[i * 3 + 2];
      
      // Data rain falling down
      let y = 2 - ((t * speeds[i] * speedMult * 10) % 4);
      
      dummy.position.set(x, y, z);
      // Pulse based on height to simulate synapses glowing
      const scale = y > -0.5 && y < 0.5 ? 0.08 : 0.03;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Calculate simulated accuracy for the meter
  const accuracy = Math.min(99, 85 + (rippleActive ? 14 : (scrollY * 0.05)));

  return (
    <group position={[0, -1.5, 0]}>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={COLORS.purple} transparent opacity={0.8} />
      </instancedMesh>
      
      {/* Circular Accuracy Meter */}
      <Billboard position={[2, 0, 0]}>
        <mesh>
           <ringGeometry args={[0.4, 0.5, 32]} />
           <meshBasicMaterial color={rippleActive ? COLORS.cyan : COLORS.purple} side={THREE.DoubleSide}/>
        </mesh>
        <Text fontSize={0.2} color="white" position={[0,0,0]} anchorX="center" anchorY="middle">
           {Math.floor(accuracy)}%
        </Text>
      </Billboard>
    </group>
  );
};

// Track 3: The Architect's Scaffolding
const ArchitectScaffolding = ({ setRippleActive }) => {
  const groupRef = useRef();
  
  useEffect(() => {
    // Ghostly wireframe block slides in periodically
    const interval = setInterval(() => {
      // Slide in
      gsap.to(groupRef.current.position, { x: 0, duration: 1.5, ease: "power2.out", onComplete: () => {
        // Trigger Ripple Effect
        setRippleActive(true);
        setTimeout(() => setRippleActive(false), 2000);
        // Slide out
        gsap.to(groupRef.current.position, { x: 8, duration: 1.5, delay: 2, ease: "power2.in" });
      }});
    }, 6000);
    return () => clearInterval(interval);
  }, [setRippleActive]);

  return (
    <group ref={groupRef} position={[8, 1.5, -1]}>
      <mesh>
        <boxGeometry args={[2, 1, 2]} />
        <meshBasicMaterial color={COLORS.cyan} wireframe transparent opacity={0.3} />
      </mesh>
      {/* Translucent holographic grid */}
      <gridHelper args={[6, 6, COLORS.magenta, COLORS.purple]} position={[0, -0.5, 0]} />
    </group>
  );
};

// Mouse interaction for parallax
const SceneControl = () => {
  const { camera } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    // Subtle tilt based on mouse position
    gsap.to(camera.position, {
      x: mouse.x * 1.5,
      y: mouse.y * 1.5 + 1,
      duration: 1
    });
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export const ParallelWorkflowLoom = () => {
  const [rippleActive, setRippleActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full h-full relative" style={{ minHeight: '500px' }}>
      <Canvas camera={{ position: [0, 1, 6], fov: 60 }}>
        {/* Background color as requested */}
        <color attach="background" args={[COLORS.bg]} />
        <ambientLight intensity={0.5} />
        
        <LangchainConnector rippleActive={rippleActive} />
        <SynapseForge scrollY={scrollY} rippleActive={rippleActive} />
        <ArchitectScaffolding setRippleActive={setRippleActive} />
        
        <SceneControl />
      </Canvas>
    </div>
  );
};

export default ParallelWorkflowLoom;
