import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [services, setServices] = useState([]);
  const [stats] = useState([
    { number: '50+', label: 'Projects Completed' },
    { number: '25+', label: 'Happy Clients' },
    { number: '3+', label: 'Years Experience' },
    { number: '24/7', label: 'Support' }
  ]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data.services.slice(0, 6)); // Show first 6 services
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Transform Your Business with 
                <span className="gradient-text"> Makerr</span>
              </h1>
              <p className="hero-subtitle">
                We provide comprehensive software and business solutions to help your company thrive in the digital age. From app development to cyber security, we've got you covered.
              </p>
              <div className="hero-buttons">
                <Link to="/services" className="btn btn-primary btn-large">
                  <span>Explore Services</span>
                </Link>
                <Link to="/contact" className="btn btn-secondary btn-large">
                  <span>Get Started</span>
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-graphic">
                <div className="floating-card card-1">
                  <i className="fas fa-mobile-alt"></i>
                  <span>App Dev</span>
                </div>
                <div className="floating-card card-2">
                  <i className="fas fa-globe"></i>
                  <span>Web Dev</span>
                </div>
                <div className="floating-card card-3">
                  <i className="fas fa-shield-alt"></i>
                  <span>Security</span>
                </div>
                <div className="floating-card card-4">
                  <i className="fas fa-chart-line"></i>
                  <span>SEO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services section section-bg-gradient">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              We offer a comprehensive range of services to help your business succeed in the digital world
            </p>
          </div>
          <div className="services-grid grid grid-3">
            {services.map((service) => (
              <div key={service.id} className="service-card card">
                <div className="service-icon">
                  <i className={`material-icons`}>{service.icon}</i>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <Link to="/contact" className="service-link">
                  Learn More <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
          <div className="services-cta">
            <Link to="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about section section-bg">
        <div className="container">
          <div className="about-content grid grid-2">
            <div className="about-text">
              <h2>Why Choose Makerr?</h2>
              <p>
                At Makerr, we combine technical expertise with business acumen to deliver solutions that drive real results. Our team of experienced professionals is committed to helping your business grow and succeed.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <h4>Expert Team</h4>
                    <p>Skilled professionals with years of industry experience</p>
                  </div>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <h4>Custom Solutions</h4>
                    <p>Tailored services that meet your specific business needs</p>
                  </div>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <h4>24/7 Support</h4>
                    <p>Round-the-clock support to ensure your success</p>
                  </div>
                </div>
              </div>
              <Link to="/about" className="btn btn-secondary">
                Learn More About Us
              </Link>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <i className="fas fa-users"></i>
                <span>Professional Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>Get in touch with us today and let's discuss how we can help you achieve your goals.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Start Your Project
              </Link>
              <a href="tel:+918957688223" className="btn btn-secondary">
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
