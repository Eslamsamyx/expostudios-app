'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

function OfficeModel() {
  const { scene } = useGLTF('/models/office-3d.glb');
  return <primitive object={scene} />;
}

export default function SimpleOfficeViewer() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-slate-800 to-slate-900">
      <Canvas
        camera={{ position: [10, 8, 10], fov: 60 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#1e293b']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <Suspense fallback={null}>
          <OfficeModel />
        </Suspense>
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={50}
        />
      </Canvas>

      <div className="fixed bottom-4 left-4 bg-black/80 text-white px-4 py-2 rounded-lg text-sm">
        🖱️ Drag to rotate • Scroll to zoom • Right-click to pan
      </div>
    </div>
  );
}

useGLTF.preload('/models/office-3d.glb');
