import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ModernHeroBackground from '../components/ModernHeroBackground';
import '../components/ModernHeroBackground.css';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [servicesPerRow] = useState(3); // Number of services per row
  const [initialRows] = useState(2); // Number of rows to show initially
  const [isShuffled, setIsShuffled] = useState(true); // Track if services are shuffled
  
  const { addService, removeService, isServiceInCart } = useCart();

  // Utility function to shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const filters = [
    { id: 'all', label: 'All Services' },
    { id: 'development', label: 'Development' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'design', label: 'Design' },
    { id: 'creator', label: 'Creator Services' }
  ];

  const fetchServices = async () => {
    setLoading(true);
    try {
      // For now, use static fallback data since backend is having issues
      const staticServices = [
        // Design Services
        {
          id: 1,
          title: "Logo Design",
          category: "design",
          description: "Professional logo design that represents your brand identity and values.",
          features: ["Custom logo concepts", "Vector files", "Brand guidelines", "Multiple revisions"],
          icon: "palette"
        },
        {
          id: 2,
          title: "Poster Design",
          category: "design",
          description: "Eye-catching poster designs for events, promotions, and marketing campaigns.",
          features: ["Print-ready designs", "High-resolution files", "Creative concepts", "Fast turnaround"],
          icon: "image"
        },
        {
          id: 3,
          title: "Thumbnail Design",
          category: "design",
          description: "Compelling thumbnails for YouTube videos, social media, and digital content.",
          features: ["Click-worthy designs", "A/B testing variants", "Platform optimization", "Brand consistency"],
          icon: "photo"
        },
        {
          id: 4,
          title: "Video Editing",
          category: "design",
          description: "Professional video editing services for marketing, training, and entertainment.",
          features: ["Professional editing", "Color correction", "Audio enhancement", "Motion graphics"],
          icon: "videocam"
        },
        {
          id: 5,
          title: "UI/UX Design",
          category: "design",
          description: "User-centered design for websites and mobile applications.",
          features: ["User research", "Wireframing", "Prototyping", "Design systems"],
          icon: "design_services"
        },
        {
          id: 6,
          title: "Brand Identity",
          category: "design",
          description: "Complete brand identity packages including logos, colors, and guidelines.",
          features: ["Logo design", "Color palette", "Typography", "Brand guidelines"],
          icon: "brush"
        },

        // Development Services
        {
          id: 7,
          title: "Web Development",
          category: "development",
          description: "Custom websites and web applications built with modern technologies.",
          features: ["Responsive design", "SEO optimization", "Performance optimization", "Content management"],
          icon: "web"
        },
        {
          id: 8,
          title: "Mobile App Development",
          category: "development",
          description: "Native and cross-platform mobile applications for iOS and Android.",
          features: ["Native performance", "Cross-platform compatibility", "App store optimization", "Backend integration"],
          icon: "phone_android"
        },
        {
          id: 9,
          title: "AI Assistants",
          category: "development",
          description: "Custom AI chatbots and virtual assistants for customer service and automation.",
          features: ["Natural language processing", "Machine learning", "Integration APIs", "Custom training"],
          icon: "smart_toy"
        },
        {
          id: 10,
          title: "Software Development",
          category: "development",
          description: "Custom software solutions for business process automation and productivity.",
          features: ["Custom solutions", "Database design", "API development", "System integration"],
          icon: "computer"
        },
        {
          id: 11,
          title: "E-commerce Solutions",
          category: "development",
          description: "Complete e-commerce platforms with payment integration and inventory management.",
          features: ["Payment gateway", "Inventory management", "Order tracking", "Customer portal"],
          icon: "shopping_cart"
        },
        {
          id: 12,
          title: "API Development",
          category: "development",
          description: "RESTful APIs and microservices for seamless system integration.",
          features: ["RESTful architecture", "Documentation", "Authentication", "Rate limiting"],
          icon: "api"
        },

        // Creator Services
        {
          id: 13,
          title: "Script Writing",
          category: "creator",
          description: "Professional script writing for YouTube videos, podcasts, and social media content.",
          features: ["Engaging storylines", "Hook-driven openings", "Call-to-action integration", "Platform optimization"],
          icon: "edit"
        },
        {
          id: 14,
          title: "Sponsor Finding",
          category: "creator",
          description: "Connect with relevant brands and sponsors that align with your content and audience.",
          features: ["Brand matching", "Pitch preparation", "Contract negotiation", "Relationship management"],
          icon: "business_center"
        },
        {
          id: 15,
          title: "Content Strategy",
          category: "creator",
          description: "Comprehensive content planning to maximize engagement and growth across platforms.",
          features: ["Content calendar", "Trend analysis", "Audience insights", "Growth strategies"],
          icon: "timeline"
        },
        {
          id: 16,
          title: "Thumbnail & Graphics",
          category: "creator",
          description: "Eye-catching thumbnails and graphics optimized for maximum click-through rates.",
          features: ["A/B tested designs", "Platform specific sizing", "Brand consistency", "High CTR optimization"],
          icon: "image"
        },
        {
          id: 17,
          title: "Video Editing",
          category: "creator",
          description: "Professional video editing services tailored for content creators and influencers.",
          features: ["Fast turnaround", "Engaging cuts", "Sound design", "Color grading"],
          icon: "movie_creation"
        },
        {
          id: 18,
          title: "Influencer Marketing",
          category: "creator",
          description: "End-to-end influencer marketing campaigns to grow your brand partnerships.",
          features: ["Campaign strategy", "Brand outreach", "Performance tracking", "ROI optimization"],
          icon: "trending_up"
        },
        {
          id: 19,
          title: "Channel/Profile Optimization",
          category: "creator",
          description: "Optimize your social media profiles and channels for maximum discoverability and growth.",
          features: ["SEO optimization", "Bio optimization", "Channel art design", "Analytics setup"],
          icon: "tune"
        },
        {
          id: 20,
          title: "Audience Analytics",
          category: "creator",
          description: "Deep audience analysis to understand your viewers and optimize content strategy.",
          features: ["Demographic analysis", "Engagement patterns", "Growth metrics", "Content performance"],
          icon: "analytics"
        },

        // Marketing Services
        {
          id: 21,
          title: "Digital Marketing Strategy",
          category: "marketing",
          description: "Comprehensive digital marketing strategies to grow your online presence.",
          features: ["Strategy development", "Market analysis", "Competitor research", "ROI tracking"],
          icon: "trending_up"
        },
        {
          id: 22,
          title: "Social Media Marketing",
          category: "marketing",
          description: "Engaging social media campaigns across all major platforms.",
          features: ["Content creation", "Community management", "Paid advertising", "Analytics reporting"],
          icon: "share"
        },
        {
          id: 23,
          title: "Search Engine Optimization",
          category: "marketing",
          description: "Improve your website's visibility and ranking in search engine results.",
          features: ["Keyword research", "On-page optimization", "Link building", "Technical SEO"],
          icon: "search"
        },
        {
          id: 24,
          title: "Content Marketing",
          category: "marketing",
          description: "Strategic content creation to attract and engage your target audience.",
          features: ["Content strategy", "Blog writing", "Video content", "Content calendar"],
          icon: "article"
        },
        {
          id: 25,
          title: "Email Marketing",
          category: "marketing",
          description: "Targeted email campaigns to nurture leads and retain customers.",
          features: ["Campaign design", "List segmentation", "Automation", "Performance tracking"],
          icon: "email"
        },
        {
          id: 26,
          title: "Pay-Per-Click Advertising",
          category: "marketing",
          description: "Targeted PPC campaigns on Google Ads, Facebook, and other platforms.",
          features: ["Campaign setup", "Keyword bidding", "Ad optimization", "Conversion tracking"],
          icon: "ads_click"
        }
      ];

      setServices(staticServices);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
    }
  };

  const filterServices = useCallback(() => {
    let filtered;
    if (activeFilter === 'all') {
      // For 'all' services, shuffle them to show variety
      filtered = isShuffled ? shuffleArray(services) : services;
      setIsShuffled(true); // Mark as shuffled when showing all
    } else {
      // For specific categories, don't shuffle
      filtered = services.filter(service => service.category === activeFilter);
      setIsShuffled(false); // Mark as not shuffled for specific categories
    }
    setFilteredServices(filtered);
    // Reset show all when changing filters
    setShowAll(false);
  }, [activeFilter, services, isShuffled]);

  // Calculate displayed services based on showAll state
  const getDisplayedServices = () => {
    if (activeFilter === 'all' && !showAll) {
      const maxInitialServices = servicesPerRow * initialRows;
      return filteredServices.slice(0, maxInitialServices);
    }
    return filteredServices;
  };

  const displayedServices = getDisplayedServices();
  const hasMoreServices = activeFilter === 'all' && filteredServices.length > (servicesPerRow * initialRows);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [filterServices]);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    // Trigger re-shuffle when switching to 'all' services
    if (filterId === 'all') {
      setIsShuffled(true);
    }
  };

  const handleAddToCart = (service) => {
    addService(service);
  };

  const handleRemoveFromCart = (serviceId) => {
    removeService(serviceId);
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
      <ModernHeroBackground height="60vh" animationType="geometric">
        <section className="services-hero-content-wrapper">
          <div className="container">
            <div className="services-hero-content vanta-content">
              <h1>Our Services</h1>
              <p>
                Comprehensive solutions for creators, influencers, and businesses. 
                From content creation to development and marketing, we provide end-to-end services to help you grow and thrive.
              </p>
            </div>
          </div>
        </section>
      </ModernHeroBackground>

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
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="services-grid grid grid-3">
            {displayedServices.map((service) => (
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
                  <Link to="/contact" className="btn btn-secondary">
                    Get Quote
                  </Link>
                  
                  {isServiceInCart(service.id) ? (
                    <button 
                      className="btn btn-success cart-btn added"
                      onClick={() => handleRemoveFromCart(service.id)}
                    >
                      <i className="fas fa-check"></i>
                      <span>Added</span>
                    </button>
                  ) : (
                    <button 
                      className="btn btn-primary cart-btn"
                      onClick={() => handleAddToCart(service)}
                    >
                      <i className="fas fa-plus"></i>
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {hasMoreServices && (
            <div className="show-more-section">
              <button 
                className="btn btn-secondary show-more-btn"
                onClick={toggleShowAll}
              >
                {showAll ? (
                  <>
                    <span>Show Less</span>
                    <i className="fas fa-chevron-up"></i>
                  </>
                ) : (
                  <>
                    <span>Show More Services</span>
                    <i className="fas fa-chevron-down"></i>
                  </>
                )}
              </button>
            </div>
          )}

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
              <a href="mailto:info.makerr@gmail.com" className="btn btn-secondary">
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
