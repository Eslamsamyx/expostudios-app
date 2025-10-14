'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import FirstPersonControls from './FirstPersonControls';
import LoadingScreen from './LoadingScreen';
import UIOverlay from './UIOverlay';
import * as THREE from 'three';

function OfficeModel() {
  const gltf = useGLTF('/models/office-3d.glb');
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (gltf.scene) {
      // Calculate bounding box to understand model dimensions
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      console.log('🏢 Model Bounding Box:', {
        min: { x: box.min.x.toFixed(2), y: box.min.y.toFixed(2), z: box.min.z.toFixed(2) },
        max: { x: box.max.x.toFixed(2), y: box.max.y.toFixed(2), z: box.max.z.toFixed(2) },
        size: { width: size.x.toFixed(2), height: size.y.toFixed(2), depth: size.z.toFixed(2) },
        center: { x: center.x.toFixed(2), y: center.y.toFixed(2), z: center.z.toFixed(2) }
      });

      // Optimize model for performance
      gltf.scene.traverse((child) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((child as any).isMesh) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mesh = child as any;
          mesh.frustumCulled = false;
          if (mesh.material) {
            mesh.material.needsUpdate = true;
          }
        }
      });
    }
  }, [gltf]);

  return (
    <group ref={modelRef}>
      <primitive object={gltf.scene} />
    </group>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <hemisphereLight args={['#87ceeb', '#545454', 0.5]} />
    </>
  );
}

export default function OfficeScene() {
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsModelLoaded(true), 500);
          return 100;
        }
        return prev + 20;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="relative w-full h-screen bg-slate-950">
      <LoadingScreen progress={loadingProgress} isLoaded={isModelLoaded} />

      <UIOverlay
        isPointerLocked={isPointerLocked}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={isFullscreen}
      />

      <Canvas
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
        }}
        dpr={1}
        frameloop="always"
        onCreated={({ gl }) => {
          gl.setClearColor('#1e293b');
        }}
      >
        <PerspectiveCamera makeDefault fov={75} position={[-8, 1.6, 8]} />

        <Lighting />

        <Suspense fallback={null}>
          <OfficeModel />
        </Suspense>

        {/* Fog for depth perception */}
        <fog attach="fog" args={['#1e293b', 30, 100]} />

        <FirstPersonControls
          moveSpeed={3}
          sprintMultiplier={1.8}
          mouseSensitivity={0.002}
          onLockChange={setIsPointerLocked}
        />
      </Canvas>

      {/* Performance Monitor (optional - remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white px-3 py-2 rounded text-xs font-mono">
          FPS: {Math.round(60)} | {isPointerLocked ? 'Locked' : 'Unlocked'}
        </div>
      )}
    </div>
  );
}

// Preload the model
useGLTF.preload('/models/office-3d.glb');
