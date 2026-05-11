import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';

// ----------------------------------------------------
// SCENE ENVIORNMENT SETUP
// ----------------------------------------------------
function SceneEnvironment() {
  const { scene } = useThree();
  useMemo(() => {
    scene.background = new THREE.Color('#0A0F1E');
    scene.fog = new THREE.Fog('#0A0F1E', 30, 100);
  }, [scene]);

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} fade />
      <ambientLight color="#0A1535" intensity={0.4} />
      <directionalLight color="#8899CC" intensity={0.6} position={[10, 20, 5]} castShadow />
      <hemisphereLight args={['#0F1E3D', '#000000', 0.5]} />
      <pointLight color="#1133AA" intensity={0.2} position={[0, 5, -10]} />
    </>
  );
}

// ----------------------------------------------------
// MOUNTAIN LAYERS (Parallax)
// ----------------------------------------------------
function MountainLayer({ points, zOffset, color, speed, metalness = 0 }) {
  const meshRef = useRef();
  
  // Custom geometry for a mountain ridge
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], -10);
    points.forEach(p => shape.lineTo(p[0], p[1]));
    shape.lineTo(points[points.length - 1][0], -10);
    shape.lineTo(points[0][0], -10);
    return new THREE.ShapeGeometry(shape);
  }, [points]);

  useFrame(() => {
    meshRef.current.position.x -= speed;
    if (meshRef.current.position.x < -30) {
      meshRef.current.position.x = 0;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -2, zOffset]} geometry={geometry}>
      <meshStandardMaterial color={color} metalness={metalness} roughness={1} fog={true} />
    </mesh>
  );
}

function Mountains() {
  const layer1 = [[-60,0], [-45,18], [-30,8], [-15,22], [0,12], [15,25], [30,10], [45,20], [60,0], [75,15], [90,0]];
  const layer2 = [[-60,0], [-50,15], [-40,5], [-30,22], [-20,10], [-10,18], [0,28], [10,15], [20,25], [30,8], [40,20], [50,12], [60,0], [75,22], [90,0]];
  const layer3 = [[-60,0], [-55,10], [-45,25], [-35,15], [-25,30], [-15,12], [-5,22], [5,10], [15,35], [25,18], [35,28], [45,15], [55,25], [65,10], [75,20], [85,5], [95,0]];

  return (
    <>
      <MountainLayer points={layer1} zOffset={-80} color="#0D1525" speed={0.003} />
      <MountainLayer points={layer2} zOffset={-50} color="#0F1E35" speed={0.006} />
      <MountainLayer points={layer3} zOffset={-25} color="#152440" speed={0.012} metalness={0.05} />
    </>
  );
}

// ----------------------------------------------------
// HIGHWAY AND TREES
// ----------------------------------------------------
function Highway() {
  const dashesRef = useRef();
  const treesRef = useRef();
  
  const speed = 0.3;
  const dashCount = 20;
  const treeCount = 20;

  useFrame(() => {
    // Animate dashes
    dashesRef.current.children.forEach(c => {
      c.position.z += speed;
      if (c.position.z > 10) c.position.z -= 150;
    });
    // Animate trees
    treesRef.current.children.forEach(c => {
      c.position.z += speed;
      if (c.position.z > 15) c.position.z -= 150;
    });
  });

  return (
    <group>
      {/* Main road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -40]}>
        <planeGeometry args={[20, 200]} />
        <meshStandardMaterial color="#1A1A2E" roughness={0.8} />
      </mesh>
      
      {/* Ground sides */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -40]}>
        <planeGeometry args={[100, 200]} />
        <meshStandardMaterial color="#0D1117" />
      </mesh>

      {/* Center Dashes */}
      <group ref={dashesRef}>
        {[...Array(dashCount)].map((_, i) => (
          <mesh key={`dash-${i}`} position={[0, 0.01, -140 + i * 8]}>
            <boxGeometry args={[0.15, 0.02, 3]} />
            <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
          </mesh>
        ))}
      </group>

      {/* Edge lines */}
      <mesh position={[3.5, 0.01, -40]}>
        <boxGeometry args={[0.05, 0.02, 200]} />
        <meshBasicMaterial color="#ffffff" opacity={0.6} transparent />
      </mesh>
      <mesh position={[-3.5, 0.01, -40]}>
        <boxGeometry args={[0.05, 0.02, 200]} />
        <meshBasicMaterial color="#ffffff" opacity={0.6} transparent />
      </mesh>

      {/* Roadside Trees */}
      <group ref={treesRef}>
        {[...Array(treeCount)].map((_, i) => (
          <group key={`tree-${i}`} position={[i % 2 === 0 ? 5 : -5, 1, -140 + i * 8]}>
            <mesh position={[0, 0.5, 0]}>
              <coneGeometry args={[0.4, 2, 6]} />
              <meshStandardMaterial color="#0A1520" />
            </mesh>
            <mesh position={[0, -0.6, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.8]} />
              <meshStandardMaterial color="#050A0F" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// ----------------------------------------------------
// EXHAUST SMOKE PARTICLES
// ----------------------------------------------------
function SmokeParticles() {
  const particlesRef = useRef();
  const count = 20;

  useMemo(() => {
    // setup initial states manually if needed, or rely on frame loop
  }, []);

  useFrame(() => {
    particlesRef.current.children.forEach(p => {
      p.position.y += 0.02;     // rise
      p.position.x -= 0.01;     // drift left
      p.position.z += 0.02;     // drift back faster
      p.scale.setScalar(p.scale.x + 0.015);
      p.material.opacity -= 0.01;
      
      if (p.material.opacity <= 0) {
        // Reset to exhaust pipe position
        p.position.set(-1.8 + (Math.random()*0.1), 0.35, 1.4);
        p.scale.setScalar(1);
        p.material.opacity = 0.3 + Math.random() * 0.3;
      }
    });
  });

  return (
    <group ref={particlesRef}>
      {[...Array(count)].map((_, i) => (
        <mesh key={`smoke-${i}`} position={[-1.8, 0.35, 1.4]}>
          <sphereGeometry args={[0.08 + Math.random() * 0.12, 8, 8]} />
          <meshStandardMaterial color="#AAAAAA" transparent opacity={0.5} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

// ----------------------------------------------------
// REALISTIC CAR MODEL
// ----------------------------------------------------
function CarModel() {
  const carRef = useRef();
  const wheelsRef = useRef([]);

  useFrame(() => {
    // Gentle suspension bounce
    carRef.current.position.y = 0.6 + Math.sin(Date.now() * 0.003) * 0.015;
    // Body roll
    carRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.008;

    // Rotate wheels
    wheelsRef.current.forEach(w => {
      if (w) w.rotation.x -= 0.15;
    });
  });

  const carMat = <meshStandardMaterial color="#C0C8D8" metalness={0.85} roughness={0.15} envMapIntensity={1.5} />;
  const glassMat = <meshPhysicalMaterial color="#1A2A3A" transparent opacity={0.7} metalness={0.1} roughness={0} />;
  const bumperMat = <meshStandardMaterial color="#8090A8" metalness={0.6} />;

  const Wheel = ({ pos }) => (
    <group position={pos} ref={(el) => wheelsRef.current.push(el)}>
      <mesh rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[0.38, 0.16, 16, 32]} /><meshStandardMaterial color="#151515" roughness={0.9} metalness={0.1} /></mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.28, 0.28, 0.12, 32]} /><meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} /></mesh>
      {[0, 1, 2, 3, 4].map(i => (
        <mesh key={i} rotation={[-Math.PI/2, (i * 72 * Math.PI) / 180, 0]} position={[0, 0, 0]}>
          <boxGeometry args={[0.06, 0.5, 0.06]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} />
        </mesh>
      ))}
      <mesh><sphereGeometry args={[0.06, 8, 8]} /><meshStandardMaterial color="#888" metalness={1} /></mesh>
    </group>
  );

  return (
    <group position={[0, 0.6, 2]}>
      {/* Car Group (bouncing part) */}
      <group ref={carRef}>
        {/* Chassis */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.6, 0.7, 1.8]} />
          {carMat}
        </mesh>
        
        {/* Cabin */}
        <mesh position={[0, 0.67, 0]}>
          <boxGeometry args={[2.2, 0.65, 1.65]} />
          {carMat}
        </mesh>
        
        {/* Windshields */}
        <mesh position={[1.3, 0.67, 0]} rotation={[0, 0, -25 * Math.PI/180]}>
          <boxGeometry args={[0.8, 0.6, 1.6]} />{glassMat}
        </mesh>
        <mesh position={[-1.3, 0.67, 0]} rotation={[0, 0, 20 * Math.PI/180]}>
          <boxGeometry args={[0.8, 0.6, 1.6]} />{glassMat}
        </mesh>

        {/* Hood */}
        <mesh position={[1.4, 0.36, 0]} rotation={[0, 0, 5 * Math.PI/180]}>
          <boxGeometry args={[1.2, 0.12, 1.75]} />{carMat}
        </mesh>

        {/* Trunk */}
        <mesh position={[-1.3, 0.36, 0]}>
          <boxGeometry args={[0.8, 0.18, 1.75]} />{carMat}
        </mesh>

        {/* Bumpers */}
        <mesh position={[1.85, -0.1, 0]}><boxGeometry args={[0.25, 0.35, 1.8]} />{bumperMat}</mesh>
        <mesh position={[-1.85, -0.1, 0]}><boxGeometry args={[0.25, 0.35, 1.8]} />{bumperMat}</mesh>

        {/* Exhaust */}
        <mesh position={[-1.8, -0.25, -0.6]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.3]} />
          <meshStandardMaterial metalness={0.7} />
        </mesh>

        {/* Headlights & Beams */}
        {[0.65, -0.65].map((z, idx) => (
          <group key={`front-light-${idx}`}>
            <mesh position={[1.82, 0.05, z]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
            </mesh>
            <mesh position={[1.82, -0.12, z]}>
              <boxGeometry args={[0.6, 0.04, 0.04]} />
              <meshStandardMaterial color="#88AAFF" emissive="#88AAFF" emissiveIntensity={2} />
            </mesh>
            <spotLight color="#ffffff" intensity={8} distance={30} angle={0.25} penumbra={0.4} position={[1.82, 0.05, z]} target-position={[10, -2, z]} castShadow />
            <object3D position={[10, -2, z]} />
          </group>
        ))}

        {/* Taillights */}
        {[0.65, -0.65].map((z, idx) => (
          <group key={`rear-light-${idx}`}>
            <mesh position={[-1.85, 0.05, z]}>
              <boxGeometry args={[0.06, 0.15, 0.6]} />
              <meshStandardMaterial color="#FF2200" emissive="#FF2200" emissiveIntensity={2} />
            </mesh>
            <pointLight position={[-2.0, 0.05, z]} color="#FF2200" intensity={2} distance={3} />
          </group>
        ))}

        {/* Underglow Reflection */}
        <pointLight position={[0, -0.8, 0]} color="#4466FF" intensity={0.3} distance={4} />

      </group>

      {/* Wheels */}
      <Wheel pos={[1.2, -0.34, -0.95]} />
      <Wheel pos={[1.2, -0.34, 0.95]} />
      <Wheel pos={[-1.1, -0.34, -0.95]} />
      <Wheel pos={[-1.1, -0.34, 0.95]} />
      
      {/* Smoke */}
      <SmokeParticles />
    </group>
  );
}

// ----------------------------------------------------
// MAIN BANNER COMPONENT
// ----------------------------------------------------
export default function CarBanner3D() {
  return (
    <div className="w-full h-screen relative bg-brand-dark overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 3, 12]} fov={60} />
        <SceneEnvironment />
        <Mountains />
        <Highway />
        <CarModel />
      </Canvas>

      {/* HTML OVERLAY */}
      <div className="absolute inset-y-0 left-[8%] flex flex-col justify-center pointer-events-none w-full max-w-3xl">
        <h2 className="font-display italic text-6xl md:text-[88px] text-white/90 leading-none animation-delay-200 animate-slide-up">
          Premium
        </h2>
        <h1 className="font-sans font-extrabold text-5xl md:text-[64px] text-brand-secondary leading-none animation-delay-400 animate-slide-up mt-2">
          Car Rentals
        </h1>
        <div className="w-[60px] h-[3px] bg-brand-secondary my-6 animation-delay-400 animate-slide-up"></div>
        <p className="font-sans text-[15px] text-white/80 mb-8 tracking-wide animation-delay-600 animate-slide-up">
          Swift Dzire · Toyota Innova · Tempo Traveller
        </p>
        <div className="animation-delay-600 animate-slide-up pointer-events-auto">
          <button className="bg-brand-secondary hover:brightness-110 text-brand-dark font-sans font-bold text-[15px] tracking-wide rounded-lg px-9 py-4 shadow-lg shadow-brand-secondary/30 transition-all motion-safe:hover:-translate-y-1 pointer-events-auto">
            Book Now &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
