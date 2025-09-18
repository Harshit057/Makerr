import React from 'react';
import './TechMarquee.css';

const TechMarquee = () => {
  const technologies = [
    // Web Development
    { name: 'React', icon: 'fab fa-react', color: '#61DAFB' },
    { name: 'HTML5', icon: 'fab fa-html5', color: '#E34F26' },
    { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#1572B6' },
    { name: 'JavaScript', icon: 'fab fa-js-square', color: '#F7DF1E' },
    { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933' },
    { name: 'Python', icon: 'fab fa-python', color: '#3776AB' },
    
    // App Development
    { name: 'Android', icon: 'fab fa-android', color: '#3DDC84' },
    { name: 'Apple', icon: 'fab fa-apple', color: '#000000' },
    { name: 'Flutter', icon: 'fas fa-mobile-alt', color: '#02569B' },
    { name: 'React Native', icon: 'fab fa-react', color: '#61DAFB' },
    
    // Design & Content
    { name: 'Figma', icon: 'fab fa-figma', color: '#F24E1E' },
    { name: 'Adobe', icon: 'fab fa-adobe', color: '#FF0000' },
    { name: 'Photoshop', icon: 'fas fa-image', color: '#31A8FF' },
    { name: 'Video Editing', icon: 'fas fa-video', color: '#FF6B6B' },
    { name: 'Content Writing', icon: 'fas fa-pen-fancy', color: '#4ECDC4' },
    
    // Social Media & Marketing
    { name: 'Instagram', icon: 'fab fa-instagram', color: '#E4405F' },
    { name: 'Facebook', icon: 'fab fa-facebook', color: '#1877F2' },
    { name: 'Twitter', icon: 'fab fa-twitter', color: '#1DA1F2' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin', color: '#0A66C2' },
    { name: 'YouTube', icon: 'fab fa-youtube', color: '#FF0000' },
    { name: 'TikTok', icon: 'fab fa-tiktok', color: '#000000' },
    
    // Database & Backend
    { name: 'MongoDB', icon: 'fas fa-database', color: '#47A248' },
    { name: 'MySQL', icon: 'fas fa-database', color: '#4479A1' },
    { name: 'Firebase', icon: 'fas fa-fire', color: '#FFCA28' },
    { name: 'AWS', icon: 'fab fa-aws', color: '#232F3E' },
    
    // Additional Technologies
    { name: 'WordPress', icon: 'fab fa-wordpress', color: '#21759B' },
    { name: 'Shopify', icon: 'fab fa-shopify', color: '#7AB55C' },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
    { name: 'Docker', icon: 'fab fa-docker', color: '#2496ED' },
    { name: 'API', icon: 'fas fa-plug', color: '#6C5CE7' },
    { name: 'SEO', icon: 'fas fa-search', color: '#00BFA6' },
    { name: 'Analytics', icon: 'fas fa-chart-line', color: '#FD79A8' },
    { name: 'Security', icon: 'fas fa-shield-alt', color: '#74B9FF' }
  ];

  return (
    <section className="tech-marquee-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Technologies We Master</h2>
          <p className="section-subtitle">
            Cutting-edge tools and platforms we use to bring your ideas to life
          </p>
        </div>
        
        <div className="marquee-container">
          <div className="marquee-track">
            {/* First set of technologies */}
            {technologies.map((tech, index) => (
              <div key={`first-${index}`} className="tech-item" style={{'--tech-color': tech.color}}>
                <div className="tech-icon">
                  <i className={tech.icon}></i>
                </div>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {technologies.map((tech, index) => (
              <div key={`second-${index}`} className="tech-item" style={{'--tech-color': tech.color}}>
                <div className="tech-icon">
                  <i className={tech.icon}></i>
                </div>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Second row moving in opposite direction */}
        <div className="marquee-container reverse">
          <div className="marquee-track">
            {/* First set of technologies (reversed array) */}
            {[...technologies].reverse().map((tech, index) => (
              <div key={`reverse-first-${index}`} className="tech-item" style={{'--tech-color': tech.color}}>
                <div className="tech-icon">
                  <i className={tech.icon}></i>
                </div>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {[...technologies].reverse().map((tech, index) => (
              <div key={`reverse-second-${index}`} className="tech-item" style={{'--tech-color': tech.color}}>
                <div className="tech-icon">
                  <i className={tech.icon}></i>
                </div>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;