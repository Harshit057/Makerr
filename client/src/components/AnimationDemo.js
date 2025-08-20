import React, { useState } from 'react';
import ModernHeroBackground from './ModernHeroBackground';
import './AnimationDemo.css';

const AnimationDemo = () => {
  const [currentAnimation, setCurrentAnimation] = useState('geometric');

  const animations = [
    { 
      type: 'geometric', 
      name: 'Geometric Shapes',
      description: 'Floating geometric shapes with rotation and smooth movement'
    },
    { 
      type: 'neural', 
      name: 'Neural Network',
      description: 'Interactive nodes that respond to mouse movement with connections'
    },
    { 
      type: 'matrix', 
      name: 'Digital Matrix',
      description: 'Matrix-style digital rain effect with falling characters'
    }
  ];

  return (
    <div className="animation-demo">
      <div className="demo-controls">
        <h3>Choose Your Hero Animation</h3>
        <div className="animation-buttons">
          {animations.map(animation => (
            <button
              key={animation.type}
              className={`demo-btn ${currentAnimation === animation.type ? 'active' : ''}`}
              onClick={() => setCurrentAnimation(animation.type)}
            >
              <span className="btn-title">{animation.name}</span>
              <span className="btn-desc">{animation.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="demo-preview">
        <ModernHeroBackground height="400px" animationType={currentAnimation}>
          <div className="demo-content">
            <h2>Transform Your Business with <span className="highlight">Makerr</span></h2>
            <p>Experience the power of modern animations</p>
            <div className="demo-buttons">
              <button className="btn-primary">Get Started</button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>
        </ModernHeroBackground>
      </div>
    </div>
  );
};

export default AnimationDemo;
