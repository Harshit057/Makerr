import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const filters = [
    { id: 'all', label: 'All Services' },
    { id: 'development', label: 'Development' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'design', label: 'Design' },
    { id: 'security', label: 'Security' }
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, activeFilter]);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data.services);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
    }
  };

  const filterServices = () => {
    if (activeFilter === 'all') {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(service => service.category === activeFilter));
    }
  };

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  if (loading) {
    return (
      <div className="services-loading">
        <div className="container">
          <div className="loading-spinner">Loading services...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <div className="services-hero-content">
            <h1>Our Services</h1>
            <p>
              Comprehensive software and business solutions tailored to your needs. 
              From development to marketing, we provide end-to-end services to help your business thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-content section">
        <div className="container">
          {/* Filter Buttons */}
          <div className="services-filters">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => handleFilterChange(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="services-grid grid grid-3">
            {filteredServices.map((service) => (
              <div key={service.id} className="service-card card">
                <div className="service-header">
                  <div className="service-icon">
                    <i className="material-icons">{service.icon}</i>
                  </div>
                  <div className="service-category">
                    {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                  </div>
                </div>
                
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <div className="service-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {service.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="service-actions">
                  <Link to="/contact" className="btn btn-primary">
                    Get Quote
                  </Link>
                  <button className="btn btn-secondary learn-more-btn">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="no-services">
              <p>No services found for the selected category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="process section section-bg">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Process</h2>
            <p className="section-subtitle">
              We follow a proven methodology to ensure successful project delivery
            </p>
          </div>
          
          <div className="process-steps">
            <div className="step">
              <div className="step-number">01</div>
              <h3>Discovery</h3>
              <p>We analyze your business needs and objectives to create a tailored solution strategy.</p>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <h3>Planning</h3>
              <p>Detailed project planning with timelines, milestones, and resource allocation.</p>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <h3>Development</h3>
              <p>Our expert team implements the solution using best practices and latest technologies.</p>
            </div>
            <div className="step">
              <div className="step-number">04</div>
              <h3>Testing</h3>
              <p>Rigorous testing to ensure quality, performance, and security standards are met.</p>
            </div>
            <div className="step">
              <div className="step-number">05</div>
              <h3>Launch</h3>
              <p>Smooth deployment and launch with comprehensive support and documentation.</p>
            </div>
            <div className="step">
              <div className="step-number">06</div>
              <h3>Support</h3>
              <p>Ongoing maintenance and support to ensure continued success and growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Let's discuss your project and how we can help bring your vision to life.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Start Your Project
              </Link>
              <a href="mailto:info@makerr.com" className="btn btn-secondary">
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
