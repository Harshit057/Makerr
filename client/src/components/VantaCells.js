import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VantaCells = ({ children, height = "100vh", className = "" }) => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    // Dynamically import VANTA
    const loadVanta = async () => {
      try {
        // Load VANTA CELLS
        const VANTA = await import('vanta/dist/vanta.cells.min');
        
        if (vantaRef.current && !vantaEffect.current) {
          vantaEffect.current = VANTA.default({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            color1: 0x36bfd6,
            color2: 0x5791ae,
            size: 1.30
          });
        }
      } catch (error) {
        console.error('Error loading VANTA effect:', error);
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={vantaRef} 
      className={`vanta-background ${className}`}
      style={{ 
        height: height,
        position: 'relative',
        width: '100%'
      }}
    >
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {children}
      </div>
    </div>
  );
};

export default VantaCells;
