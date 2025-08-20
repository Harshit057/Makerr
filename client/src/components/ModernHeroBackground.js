import React, { useEffect, useRef, useState } from 'react';
import './ModernHeroBackground.css';

const ModernHeroBackground = ({ children, animationType = "geometric", height = "100vh" }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        setDimensions({
          width: canvasRef.current.offsetWidth,
          height: canvasRef.current.offsetHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let particles = [];
    let mouseX = 0;
    let mouseY = 0;

    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // Initialize particles based on animation type
    const initParticles = () => {
      particles = [];
      
      if (animationType === 'geometric') {
        // Geometric floating shapes
        for (let i = 0; i < 15; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 40 + 20,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            rotation: 0,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            shape: Math.floor(Math.random() * 3), // 0: triangle, 1: square, 2: hexagon
            opacity: Math.random() * 0.3 + 0.1
          });
        }
      } else if (animationType === 'neural') {
        // Neural network nodes
        const gridSize = 8;
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            particles.push({
              x: (canvas.width / (gridSize - 1)) * i,
              y: (canvas.height / (gridSize - 1)) * j,
              originalX: (canvas.width / (gridSize - 1)) * i,
              originalY: (canvas.height / (gridSize - 1)) * j,
              size: 3,
              connections: [],
              pulse: Math.random() * Math.PI * 2
            });
          }
        }
      } else if (animationType === 'matrix') {
        // Matrix-style digital rain
        const columns = Math.floor(canvas.width / 20);
        for (let i = 0; i < columns; i++) {
          particles.push({
            x: i * 20,
            y: Math.random() * canvas.height,
            speed: Math.random() * 3 + 1,
            chars: [],
            opacity: Math.random() * 0.5 + 0.3
          });
          
          // Initialize characters for this column
          particles[i].chars = Array.from({length: 20}, () => 
            String.fromCharCode(Math.random() * 94 + 33)
          );
        }
      }
    };

    const drawGeometric = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = particle.opacity;
        
        // Gradient fill
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
        gradient.addColorStop(0, 'rgba(17, 65, 152, 0.8)');
        gradient.addColorStop(1, 'rgba(13, 215, 116, 0.3)');
        ctx.fillStyle = gradient;
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        
        if (particle.shape === 0) {
          // Triangle
          ctx.moveTo(0, -particle.size/2);
          ctx.lineTo(-particle.size/2, particle.size/2);
          ctx.lineTo(particle.size/2, particle.size/2);
          ctx.closePath();
        } else if (particle.shape === 1) {
          // Square
          ctx.rect(-particle.size/2, -particle.size/2, particle.size, particle.size);
        } else {
          // Hexagon
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = Math.cos(angle) * particle.size/2;
            const y = Math.sin(angle) * particle.size/2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
        }
        
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;
        
        // Wrap around screen
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
      });
    };

    const drawNeural = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update particle positions based on mouse
      particles.forEach(particle => {
        const dx = mouseX - particle.originalX;
        const dy = mouseY - particle.originalY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.x = particle.originalX + dx * force * 0.1;
          particle.y = particle.originalY + dy * force * 0.1;
        } else {
          particle.x += (particle.originalX - particle.x) * 0.05;
          particle.y += (particle.originalY - particle.y) * 0.05;
        }
        
        particle.pulse += 0.1;
      });
      
      // Draw connections
      ctx.strokeStyle = 'rgba(17, 65, 152, 0.3)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = (100 - distance) / 100;
            ctx.globalAlpha = opacity * 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Draw nodes
      particles.forEach(particle => {
        const pulseSize = particle.size + Math.sin(particle.pulse) * 2;
        
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = `rgba(13, 215, 116, ${0.6 + Math.sin(particle.pulse) * 0.4})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Outer glow
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = 'rgba(17, 65, 152, 0.5)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize * 2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.fillStyle = `rgba(13, 215, 116, ${particle.opacity})`;
        ctx.font = '14px monospace';
        
        // Draw falling characters
        for (let i = 0; i < particle.chars.length; i++) {
          const y = particle.y + i * 20;
          if (y > 0 && y < canvas.height) {
            const opacity = particle.opacity * (1 - i / particle.chars.length);
            ctx.fillStyle = `rgba(13, 215, 116, ${opacity})`;
            ctx.fillText(particle.chars[i], particle.x, y);
          }
        }
        
        // Update position
        particle.y += particle.speed;
        
        // Reset when off screen
        if (particle.y > canvas.height + particle.chars.length * 20) {
          particle.y = -particle.chars.length * 20;
          // Randomize characters
          particle.chars = Array.from({length: 20}, () => 
            String.fromCharCode(Math.random() * 94 + 33)
          );
        }
      });
    };

    const animate = () => {
      if (animationType === 'geometric') {
        drawGeometric();
      } else if (animationType === 'neural') {
        drawNeural();
      } else if (animationType === 'matrix') {
        drawMatrix();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [dimensions, animationType]);

  return (
    <div className="modern-hero-background" style={{ height }}>
      <canvas
        ref={canvasRef}
        className="hero-canvas"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      />
      <div className="hero-content-overlay">
        {children}
      </div>
    </div>
  );
};

export default ModernHeroBackground;
