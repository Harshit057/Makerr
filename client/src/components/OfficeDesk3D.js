import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import './OfficeDesk3D.css';

// Component to load and display the office desk model
function OfficeDeskModel({ ...props }) {
  const { scene } = useGLTF('/images/services/office_desk.glb');
  return <primitive object={scene} {...props} />;
}

// Loading fallback component
function LoadingSpinner() {
  return (
    <div className="office-desk-loading">
      <div className="loading-spinner"></div>
      <p>Loading 3D Model...</p>
    </div>
  );
}

const OfficeDesk3D = () => {
  return (
    <div className="office-desk-container">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 30 }}
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
          <OfficeDeskModel 
            scale={[0.046, 0.046, 0.046]}
            position={[0, -0.5, 0]}
            rotation={[0, Math.PI / 6, 0]}
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
          autoRotateSpeed={1.5}
        />
      </Canvas>
      
      {/* Fallback content for loading */}
      <Suspense fallback={<LoadingSpinner />}>
        <div style={{ display: 'none' }}>
          <OfficeDeskModel />
        </div>
      </Suspense>
    </div>
  );
};

// Preload the model for better performance
useGLTF.preload('/images/services/office_desk.glb');

export default OfficeDesk3D;