import React, { useRef, Suspense, useState, useMemo, memo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Color } from "three";
import EarthDayMap from "../assets/textures/2k_neptune.jpg";

const emissiveColor = new Color("#0a1a3a");

const EarthMesh = memo(function EarthMesh({ hovered }) {
  const colorMap = useLoader(TextureLoader, EarthDayMap);
  const earthRef = useRef();

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  const emissiveIntensity = hovered ? 0.25 : 0.08;

  return (
    <>
      <directionalLight color="#fff8e7" position={[5, 3, 5]} intensity={3.5} />
      <pointLight color="#1a3a6b" position={[-5, -2, -3]} intensity={1.2} />
      <ambientLight intensity={0.15} />

      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 48, 24]} />
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

export default function Earth3D({
  label,
  sublabel,
  onClick,
  glowColor = "#6366f1",
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
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
        dpr={[1, 1.5]}
        style={{
          background: "transparent",
          display: "block",
          width: "100%",
          height: "100%",
        }}
        gl={{ powerPreference: "high-performance", antialias: false, alpha: true, failIfMajorPerformanceCaveat: false }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <EarthMesh hovered={hovered} />
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
