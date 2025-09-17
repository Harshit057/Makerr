import React from 'react';
import { Link } from 'react-router-dom';
import ModernHeroBackground from '../components/ModernHeroBackground';
import TechMarquee from '../components/TechMarquee';
import ServiceCarousel3D from '../components/ServiceCarousel3D';
import LaptopModel3D from '../components/LaptopModel3D';
import OfficeDesk3D from '../components/OfficeDesk3D';
import '../components/ModernHeroBackground.css';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <ModernHeroBackground height="100vh" animationType="geometric">
        <section className="hero-content-wrapper">
          <div className="container">
            <div className="hero-content vanta-content">
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
                <div className="hero-3d-model">
                  <OfficeDesk3D />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ModernHeroBackground>

      {/* Tech Marquee Section */}
      <TechMarquee />

      {/* Services Section */}
      <section className="services section section-bg-gradient">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              We offer a comprehensive range of services to help your business succeed in the digital world
            </p>
          </div>
          <div className="services-carousel-wrapper">
            <div className="cta-banner cta-banner-left">
              <div className="cta-banner-content">
                <h3>Need a Website?</h3>
                <p>Get a professional, responsive website that drives results</p>
                <Link to="/contact" className="btn btn-outline-primary">
                  Get Quote
                </Link>
              </div>
            </div>
            <ServiceCarousel3D />
            <div className="cta-banner cta-banner-right">
              <div className="cta-banner-content">
                <h3>Looking for an App?</h3>
                <p>Build powerful mobile apps for iOS and Android platforms</p>
                <Link to="/contact" className="btn btn-outline-primary">
                  Get Quote
                </Link>
              </div>
            </div>
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
          <div className="about-content flex items-center justify-between">
            <div className="about-text w-1/2">
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
            <div className="about-model w-1/2 h-[400px]">
              <LaptopModel3D />
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
