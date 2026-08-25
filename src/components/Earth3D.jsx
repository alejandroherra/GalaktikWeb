import React, {
  useRef,
  Suspense,
  useState,
  memo,
  useEffect,
} from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader, Color, AdditiveBlending } from "three";
import EarthDayMap from "../assets/textures/2k_neptune.jpg";

const emissiveColor = new Color("#0a1a3a");


// Renders (and rotates) only while the planet is on screen and the tab is
// visible. Off-screen = zero GPU / main-thread work.
function useActive(ref) {
  const supportsIO = typeof IntersectionObserver !== "undefined";
  const [inView, setInView] = useState(!supportsIO);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const node = ref.current;
    let io = null;
    if (node && supportsIO) {
      io = new IntersectionObserver(
        ([entry]) => setInView(entry.isIntersecting),
        { rootMargin: "120px 0px", threshold: 0.05 },
      );
      io.observe(node);
    }
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      if (io) io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ref, supportsIO]);

  return inView && !hidden;
}

const ParticleField = memo(function ParticleField({ color, pausedRef }) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (pausedRef.current || !ref.current) return;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x += delta * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[PARTICLE_POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color={color}
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
});

const EarthMesh = memo(function EarthMesh({ hovered, active }) {
  const colorMap = useLoader(TextureLoader, EarthDayMap);
  const earthRef = useRef();
  const activeRef = useRef(active);
  const setFrameloop = useThree((s) => s.setFrameloop);
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Stop the render loop entirely when the planet is not visible.
  useEffect(() => {
    setFrameloop(active ? "always" : "never");
    if (active) invalidate();
  }, [active, setFrameloop, invalidate]);

  useFrame((_, delta) => {
    if (activeRef.current && earthRef.current) {
      earthRef.current.rotation.y += delta * 0.12;
    }
  });

  const emissiveIntensity = hovered ? 0.25 : 0.08;

  return (
    <>
      <directionalLight color="#fff8e7" position={[5, 3, 5]} intensity={3.5} />
      <pointLight color="#1a3a6b" position={[-5, -2, -3]} intensity={1.2} />
      <ambientLight intensity={0.15} />

      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial
          map={colorMap}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          roughness={0.65}
          metalness={0.05}
        />
      </mesh>
    </>
  );
});

const Scene = memo(function Scene({ hovered, active, glowColor }) {
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  return (
    <>
      <EarthMesh hovered={hovered} active={active} />
    </>
  );
});

export default function Earth3D({
  label,
  sublabel,
  onClick,
  glowColor = "#6366f1",
}) {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);
  const active = useActive(containerRef);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        cursor: "pointer",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        boxShadow: hovered
          ? `0 0 60px ${glowColor}55, 0 0 120px ${glowColor}22`
          : "0 0 20px rgba(0,0,0,0.4)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 45 }}
        dpr={[1, 1]}
        style={{
          background: "transparent",
          display: "block",
          width: "100%",
          height: "100%",
        }}
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          alpha: true,
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <Scene hovered={hovered} active={active} glowColor={glowColor} />
        </Suspense>
      </Canvas>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "24px 20px 20px",
          background:
            "linear-gradient(to top, rgba(5,5,15,0.95) 0%, rgba(5,5,15,0.6) 60%, transparent 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: "clamp(14px, 2vw, 18px)",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#ffffff",
            textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}88`,
            marginBottom: 6,
          }}
        >
          {label}
        </span>

        <span
          style={{
            fontSize: "clamp(10px, 1.4vw, 13px)",
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.15em",
          }}
        >
          {sublabel}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "16px",
          border: `1.5px solid ${hovered ? glowColor + "88" : "rgba(255,255,255,0.05)"}`,
          transition: "border-color 0.3s ease",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}