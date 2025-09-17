import React, { useState, useEffect } from 'react';
import './ServiceCarousel3D.css';

const ServiceCarousel3D = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const services = [
    {
      id: 1,
      title: 'App Development',
      description: 'Custom mobile applications for iOS and Android platforms using React Native, Flutter, and native technologies.',
      image: '/images/services/app-development.svg',
      features: ['Cross-platform development', 'Native performance', 'App store optimization']
    },
    {
      id: 2,
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
      image: '/images/services/web-development.svg',
      features: ['Responsive design', 'Modern frameworks', 'SEO optimized']
    },
    {
      id: 3,
      title: 'SEO & Marketing',
      description: 'Comprehensive digital marketing strategies to boost your online presence and drive growth.',
      image: '/images/services/seo-marketing.svg',
      features: ['Search engine optimization', 'Content marketing', 'Analytics tracking']
    },
    {
      id: 4,
      title: 'Poster Making',
      description: 'Professional graphic design services for marketing materials, branding, and promotional content.',
      image: '/images/services/poster-making.svg',
      features: ['Creative design', 'Brand consistency', 'Print & digital ready']
    },
    {
      id: 5,
      title: 'Cyber Security',
      description: 'Comprehensive security solutions to protect your business from digital threats and vulnerabilities.',
      image: '/images/services/cyber-security.svg',
      features: ['Threat assessment', 'Security audits', '24/7 monitoring']
    },
    {
      id: 6,
      title: 'Business Consulting',
      description: 'Strategic business consulting to help your company grow and optimize operations.',
      image: '/images/services/business-consulting.svg',
      features: ['Strategy development', 'Process optimization', 'Growth planning']
    },
    {
      id: 7,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and services to modernize your business operations.',
      image: '/images/services/cloud-solutions.svg',
      features: ['Cloud migration', 'Infrastructure management', 'Cost optimization']
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [services.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const getItemClass = (index) => {
    const diff = (index - currentIndex + services.length) % services.length;
    
    if (diff === 0) return 'carousel-item active';
    if (diff === 1 || diff === services.length - 1) return 'carousel-item adjacent';
    if (diff === 2 || diff === services.length - 2) return 'carousel-item distant';
    return 'carousel-item hidden';
  };

  return (
    <div className="carousel-3d-container">
      <div className="carousel-3d">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={getItemClass(index)}
            style={{ '--item-index': index }}
          >
            <div className="service-card-3d">
              <div className="service-image">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="carousel-dots">
        {services.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCarousel3D;
