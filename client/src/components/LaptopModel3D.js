import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import './LaptopModel3D.css';

// Component to load and display the laptop model
function LaptopModel({ scale, ...props }) {
  const { scene } = useGLTF('/images/services/laptop.glb');
  return <primitive object={scene} scale={scale} {...props} />;
}

// Loading fallback component
function LoadingSpinner() {
  return (
    <div className="laptop-loading">
      <div className="loading-spinner"></div>
      <p>Loading 3D Model...</p>
    </div>
  );
}

const LaptopModel3D = () => {
  const [modelScale, setModelScale] = useState([3.6, 3.6, 3.6]);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width <= 420) {
        setModelScale([2.4, 2.4, 2.4]);
      } else if (width <= 480) {
        setModelScale([2.8, 2.8, 2.8]);
      } else if (width <= 768) {
        setModelScale([3.2, 3.2, 3.2]);
      } else if (width <= 1024) {
        setModelScale([3.4, 3.4, 3.4]);
      } else {
        setModelScale([3.6, 3.6, 3.6]);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div className="laptop-model-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={1} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.5} 
        />
        <directionalLight 
          position={[-5, -5, -5]} 
          intensity={0.3} 
        />
        
        {/* 3D Model */}
        <Suspense fallback={null}>
          <LaptopModel 
            scale={modelScale}
            position={[0, -1, 0]}
            rotation={[0, Math.PI / 4, 0]}
          />
        </Suspense>
        
        {/* Interactive controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2.5}
          autoRotate={true}
          autoRotateSpeed={2}
        />
      </Canvas>
      
      {/* Fallback content for loading */}
      <Suspense fallback={<LoadingSpinner />}>
        <div style={{ display: 'none' }}>
          <LaptopModel scale={modelScale} />
        </div>
      </Suspense>
    </div>
  );
};

// Preload the model for better performance
useGLTF.preload('/images/services/laptop.glb');

export default LaptopModel3D;
