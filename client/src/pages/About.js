import React from 'react';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      position: 'CEO & Founder',
      image: '/api/placeholder/300/300',
      bio: 'Experienced entrepreneur with 10+ years in software development and business strategy.'
    },
    {
      name: 'Jane Smith',
      position: 'CTO',
      image: '/api/placeholder/300/300',
      bio: 'Full-stack developer and tech architect with expertise in modern web technologies.'
    },
    {
      name: 'Mike Johnson',
      position: 'Lead Designer',
      image: '/api/placeholder/300/300',
      bio: 'Creative designer specializing in UI/UX and brand identity with 8+ years experience.'
    },
    {
      name: 'Sarah Wilson',
      position: 'Marketing Director',
      image: '/api/placeholder/300/300',
      bio: 'Digital marketing expert with proven track record in SEO, social media, and content strategy.'
    }
  ];

  const values = [
    {
      icon: 'fas fa-star',
      title: 'Excellence',
      description: 'We strive for excellence in every project, delivering solutions that exceed expectations.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Partnership',
      description: 'We build long-term partnerships with our clients, becoming an extension of their team.'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and innovative approaches to solve complex problems.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Reliability',
      description: 'Our clients can count on us for dependable, secure, and scalable solutions.'
    }
  ];

  const milestones = [
    {
      year: '2019',
      title: 'Company Founded',
      description: 'Makerr was founded with a vision to help businesses succeed in the digital age.'
    },
    {
      year: '2020',
      title: 'First Major Client',
      description: 'Secured our first enterprise client and delivered a successful e-commerce platform.'
    },
    {
      year: '2021',
      title: 'Team Expansion',
      description: 'Expanded our team to include specialists in cybersecurity and digital marketing.'
    },
    {
      year: '2022',
      title: '50+ Projects',
      description: 'Completed over 50 successful projects across various industries.'
    },
    {
      year: '2023',
      title: 'Industry Recognition',
      description: 'Received industry awards for innovation and client satisfaction.'
    },
    {
      year: '2024',
      title: 'Global Reach',
      description: 'Expanded services globally, serving clients across multiple continents.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About Makerr</h1>
            <p>
              We are a passionate team of innovators, developers, and strategists 
              dedicated to transforming businesses through technology and creative solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission section">
        <div className="container">
          <div className="mission-content grid grid-2">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At Makerr, our mission is to empower businesses with innovative software solutions 
                and strategic services that drive growth, efficiency, and success in the digital landscape.
              </p>
              <p>
                We believe that every business, regardless of size, deserves access to world-class 
                technology solutions. Our team combines technical expertise with deep business 
                understanding to deliver results that matter.
              </p>
              <div className="mission-stats">
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Projects Delivered</span>
                </div>
                <div className="stat">
                  <span className="stat-number">25+</span>
                  <span className="stat-label">Happy Clients</span>
                </div>
                <div className="stat">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
              </div>
            </div>
            <div className="mission-image">
              <div className="image-placeholder">
                <i className="fas fa-rocket"></i>
                <span>Innovation & Growth</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values section section-bg">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The core principles that guide everything we do
            </p>
          </div>
          <div className="values-grid grid grid-4">
            {values.map((value, index) => (
              <div key={index} className="value-item card">
                <div className="value-icon">
                  <i className={value.icon}></i>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              The talented individuals behind Makerr's success
            </p>
          </div>
          <div className="team-grid grid grid-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member card">
                <div className="member-image">
                  <div className="image-placeholder">
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="member-position">{member.position}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline section section-bg">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">
              Key milestones in our company's growth and evolution
            </p>
          </div>
          <div className="timeline-container">
            {milestones.map((milestone, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose section">
        <div className="container">
          <div className="why-choose-content grid grid-2">
            <div className="why-choose-text">
              <h2>Why Choose Makerr?</h2>
              <div className="features-list">
                <div className="feature">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <h4>Proven Track Record</h4>
                    <p>5+ years of delivering successful projects across various industries</p>
                  </div>
                </div>
                <div className="feature">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <h4>Full-Service Solutions</h4>
                    <p>From development to marketing, we provide comprehensive business solutions</p>
                  </div>
                </div>
                <div className="feature">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <h4>Client-Centric Approach</h4>
                    <p>We prioritize your needs and work closely with you throughout the project</p>
                  </div>
                </div>
                <div className="feature">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <h4>Latest Technologies</h4>
                    <p>We use cutting-edge tools and frameworks to build future-ready solutions</p>
                  </div>
                </div>
                <div className="feature">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <h4>Ongoing Support</h4>
                    <p>We provide continuous support and maintenance for all our solutions</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="why-choose-image">
              <div className="image-placeholder">
                <i className="fas fa-trophy"></i>
                <span>Excellence Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta section section-bg">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Work with Us?</h2>
            <p>Let's discuss how we can help transform your business with our innovative solutions.</p>
            <div className="cta-buttons">
              <a href="/contact" className="btn btn-primary">
                Get in Touch
              </a>
              <a href="/services" className="btn btn-secondary">
                View Our Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
