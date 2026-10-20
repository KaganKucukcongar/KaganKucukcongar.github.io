"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useRef } from "react";
import { Group, MathUtils } from "three";

function Sculpture({ paused }: { paused: boolean }) {
  const group = useRef<Group>(null);
  useFrame(({ clock, pointer }, delta) => {
    if (!group.current || paused) return;
    const time = clock.getElapsedTime();
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      Math.sin(time * 0.18) * 0.22 + pointer.x * 0.22,
      2,
      delta,
    );
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      0.18 + pointer.y * 0.12,
      2,
      delta,
    );
    group.current.position.y = Math.sin(time * 0.45) * 0.08;
  });
  return (
    <group ref={group} rotation={[0.18, 0, -0.4]}>
      {Array.from({ length: 9 }, (_, index) => {
        const offset = index - 4;
        return (
          <mesh
            key={index}
            position={[Math.sin(index * 0.47) * 0.3 - 0.12, offset * 0.39, 0]}
            rotation={[Math.PI / 2 + offset * 0.025, 0, offset * 0.04]}
          >
            <torusGeometry
              args={[1.12 - Math.abs(offset) * 0.06, 0.095, 16, 80]}
            />
            <meshStandardMaterial
              color="#d8dce5"
              metalness={1}
              roughness={0.21}
            />
          </mesh>
        );
      })}
      <mesh rotation={[0.25, 0.85, 0.4]} scale={[1, 1.5, 1]}>
        <torusGeometry args={[1.35, 0.055, 12, 100]} />
        <meshStandardMaterial
          color="#9276ff"
          metalness={0.65}
          roughness={0.24}
        />
      </mesh>
      <mesh rotation={[-0.2, -0.85, -0.3]} scale={[1, 1.5, 1]}>
        <torusGeometry args={[1.35, 0.035, 12, 100]} />
        <meshPhysicalMaterial
          color="#c8cbd4"
          metalness={0.5}
          roughness={0.18}
          transparent
          opacity={0.72}
        />
      </mesh>
      <mesh position={[1.18, 0.8, 0.55]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#d7ff72"
          roughness={0.25}
          metalness={0.25}
        />
      </mesh>
      <mesh position={[-1.2, -1.12, 0.3]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial color="#9276ff" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
}

export default function SculptureScene({
  paused,
  onReady,
  onFailure,
}: {
  paused: boolean;
  onReady: () => void;
  onFailure: () => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 6.8], fov: 39 }}
      dpr={[1, 1.5]}
      frameloop={paused ? "demand" : "always"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", onFailure, {
          once: true,
        });
        onReady();
      }}
      fallback={null}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 4]} intensity={3} color="#f4f1eb" />
      <directionalLight position={[-3, -1, 2]} intensity={2} color="#9276ff" />
      <Environment resolution={128}>
        <Lightformer position={[0, 4, 2]} scale={[5, 2, 1]} intensity={4} />
        <Lightformer
          position={[-4, 0, 2]}
          rotation={[0, Math.PI / 3, 0]}
          scale={[2, 5, 1]}
          intensity={3}
        />
        <Lightformer
          position={[3, -2, 1]}
          rotation={[0, -Math.PI / 3, 0]}
          scale={[2, 4, 1]}
          color="#9276ff"
          intensity={2}
        />
      </Environment>
      <Sculpture paused={paused} />
    </Canvas>
  );
}
