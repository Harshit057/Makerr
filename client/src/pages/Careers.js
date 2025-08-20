import React, { useState } from 'react';
import VantaCells from '../components/VantaCells';
import '../components/VantaCells.css';
import './Careers.css';

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const jobOpenings = [
    {
      id: 1,
      title: "Full Stack Developer",
      department: "Development",
      type: "Full-time",
      experience: "2-4 years",
      location: "Lucknow, Uttar Pradesh",
      description: "We're looking for a skilled Full Stack Developer to join our development team. You'll be working on cutting-edge web applications using modern technologies.",
      requirements: [
        "2+ years of experience in web development",
        "Proficiency in JavaScript, React, Node.js",
        "Experience with MongoDB and SQL databases",
        "Knowledge of RESTful APIs and GraphQL",
        "Understanding of version control (Git)",
        "Strong problem-solving skills"
      ],
      responsibilities: [
        "Develop and maintain web applications",
        "Collaborate with design and product teams",
        "Write clean, maintainable code",
        "Participate in code reviews",
        "Troubleshoot and debug applications"
      ]
    },
    {
      id: 2,
      title: "Frontend Developer",
      department: "Development",
      type: "Full-time",
      experience: "1-3 years",
      location: "Lucknow, Uttar Pradesh",
      description: "Join our frontend team to create beautiful, responsive user interfaces that provide exceptional user experiences.",
      requirements: [
        "1+ years of frontend development experience",
        "Expertise in HTML5, CSS3, JavaScript",
        "Proficiency in React or Vue.js",
        "Experience with responsive design",
        "Knowledge of CSS preprocessors (Sass/Less)",
        "Understanding of modern build tools"
      ],
      responsibilities: [
        "Build responsive web interfaces",
        "Implement UI/UX designs",
        "Optimize applications for performance",
        "Ensure cross-browser compatibility",
        "Collaborate with backend developers"
      ]
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      type: "Full-time",
      experience: "2-5 years",
      location: "Lucknow, Uttar Pradesh",
      description: "We're seeking a creative UI/UX Designer to design intuitive and engaging digital experiences for our clients.",
      requirements: [
        "2+ years of UI/UX design experience",
        "Proficiency in Figma, Adobe XD, or Sketch",
        "Strong understanding of design principles",
        "Experience with user research and testing",
        "Knowledge of accessibility standards",
        "Portfolio showcasing previous work"
      ],
      responsibilities: [
        "Create wireframes and prototypes",
        "Design user interfaces and experiences",
        "Conduct user research and testing",
        "Collaborate with development teams",
        "Maintain design systems and guidelines"
      ]
    },
    {
      id: 4,
      title: "Video Editor",
      department: "Creative",
      type: "Full-time",
      experience: "1-3 years",
      location: "Lucknow, Uttar Pradesh",
      description: "Join our creative team as a Video Editor to produce engaging video content for our clients' marketing campaigns.",
      requirements: [
        "1+ years of video editing experience",
        "Proficiency in Adobe Premiere Pro, After Effects",
        "Knowledge of color grading and audio editing",
        "Understanding of video formats and compression",
        "Creative storytelling abilities",
        "Attention to detail"
      ],
      responsibilities: [
        "Edit and produce video content",
        "Create motion graphics and animations",
        "Color grade and audio sync videos",
        "Collaborate with creative team",
        "Meet project deadlines"
      ]
    },
    {
      id: 5,
      title: "Cyber Security Expert",
      department: "Security",
      type: "Full-time",
      experience: "3-6 years",
      location: "Lucknow, Uttar Pradesh",
      description: "We're looking for a Cyber Security Expert to help protect our clients' digital assets and implement robust security measures.",
      requirements: [
        "3+ years of cybersecurity experience",
        "Knowledge of security frameworks (NIST, ISO 27001)",
        "Experience with penetration testing",
        "Understanding of network security",
        "Familiarity with security tools and technologies",
        "Relevant certifications (CISSP, CEH, CISM preferred)"
      ],
      responsibilities: [
        "Conduct security assessments",
        "Implement security policies and procedures",
        "Monitor and respond to security incidents",
        "Provide security training and awareness",
        "Stay updated with latest security threats"
      ]
    },
    {
      id: 6,
      title: "Digital Marketing Specialist",
      department: "Marketing",
      type: "Full-time",
      experience: "2-4 years",
      location: "Lucknow, Uttar Pradesh",
      description: "Join our marketing team to develop and execute digital marketing strategies that drive business growth for our clients.",
      requirements: [
        "2+ years of digital marketing experience",
        "Knowledge of SEO, SEM, and social media marketing",
        "Experience with Google Analytics and Ads",
        "Understanding of content marketing",
        "Familiarity with marketing automation tools",
        "Strong analytical and communication skills"
      ],
      responsibilities: [
        "Develop digital marketing strategies",
        "Manage SEO and PPC campaigns",
        "Create and manage social media content",
        "Analyze campaign performance",
        "Generate marketing reports"
      ]
    }
  ];

  const internshipOpenings = [
    {
      id: 7,
      title: "Web Development Intern",
      department: "Development",
      type: "Internship",
      duration: "3-6 months",
      location: "Lucknow, Uttar Pradesh",
      description: "Gain hands-on experience in web development and work on real projects with our development team.",
      requirements: [
        "Currently pursuing Computer Science or related field",
        "Basic knowledge of HTML, CSS, JavaScript",
        "Familiarity with any frontend framework",
        "Eagerness to learn and grow",
        "Good communication skills"
      ]
    },
    {
      id: 8,
      title: "Graphic Design Intern",
      department: "Design",
      type: "Internship",
      duration: "3-6 months",
      location: "Lucknow, Uttar Pradesh",
      description: "Work with our design team to create visual content and learn professional design practices.",
      requirements: [
        "Currently pursuing Design or related field",
        "Basic knowledge of Adobe Creative Suite",
        "Creative thinking and attention to detail",
        "Portfolio of personal or academic projects",
        "Passion for visual design"
      ]
    },
    {
      id: 9,
      title: "Digital Marketing Intern",
      department: "Marketing",
      type: "Internship",
      duration: "3-6 months",
      location: "Lucknow, Uttar Pradesh",
      description: "Learn digital marketing strategies and assist in managing marketing campaigns for our clients.",
      requirements: [
        "Currently pursuing Marketing, Business, or related field",
        "Basic understanding of social media platforms",
        "Interest in digital marketing trends",
        "Good writing and communication skills",
        "Analytical mindset"
      ]
    }
  ];

  const benefits = [
    {
      title: "Flexible Hours",
      description: "Work-life balance with flexible working hours",
      icon: "fas fa-clock"
    },
    {
      title: "Remote Work",
      description: "Hybrid work model with remote work options",
      icon: "fas fa-home"
    },
    {
      title: "Learning & Development",
      description: "Continuous learning opportunities and skill development",
      icon: "fas fa-graduation-cap"
    },
    {
      title: "Team Events",
      description: "Regular team building activities and celebrations",
      icon: "fas fa-users"
    }
  ];

  const openJobModal = (job) => {
    setSelectedJob(job);
  };

  const closeJobModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="careers">
      {/* Hero Section */}
      <VantaCells height="60vh" className="careers-hero">
        <section className="careers-hero-content-wrapper">
          <div className="container">
            <div className="hero-content vanta-content">
              <h1>Join Our Team</h1>
              <p>Build your career with Makerr and be part of an innovative team that's shaping the future of technology.</p>
              <a href="#openings" className="btn btn-primary">View Open Positions</a>
            </div>
          </div>
        </section>
      </VantaCells>

      {/* Why Work With Us */}
      <section className="why-work section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Work With Us?</h2>
            <p className="section-subtitle">
              At Makerr, we believe in creating an environment where innovation thrives and careers flourish.
            </p>
          </div>
          <div className="benefits-grid grid grid-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card card">
                <div className="benefit-icon">
                  <i className={benefit.icon}></i>
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="job-openings section section-bg">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Current Openings</h2>
            <p className="section-subtitle">
              Explore our current job opportunities and find your perfect role.
            </p>
          </div>
          
          <div className="jobs-section">
            <h3>Full-time Positions</h3>
            <div className="jobs-grid">
              {jobOpenings.map((job) => (
                <div key={job.id} className="job-card card">
                  <div className="job-header">
                    <h4>{job.title}</h4>
                    <span className="job-type">{job.type}</span>
                  </div>
                  <div className="job-details">
                    <p><i className="fas fa-building"></i> {job.department}</p>
                    <p><i className="fas fa-clock"></i> {job.experience}</p>
                    <p><i className="fas fa-map-marker-alt"></i> {job.location}</p>
                  </div>
                  <p className="job-description">{job.description}</p>
                  <div className="job-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => openJobModal(job)}
                    >
                      View Details
                    </button>
                    <a 
                      href={`mailto:info.makerr@gmail.com?subject=Application for ${job.title}`}
                      className="btn btn-secondary"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="jobs-section">
            <h3>Internship Opportunities</h3>
            <div className="jobs-grid">
              {internshipOpenings.map((job) => (
                <div key={job.id} className="job-card card">
                  <div className="job-header">
                    <h4>{job.title}</h4>
                    <span className="job-type internship">{job.type}</span>
                  </div>
                  <div className="job-details">
                    <p><i className="fas fa-building"></i> {job.department}</p>
                    <p><i className="fas fa-clock"></i> {job.duration}</p>
                    <p><i className="fas fa-map-marker-alt"></i> {job.location}</p>
                  </div>
                  <p className="job-description">{job.description}</p>
                  <div className="job-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => openJobModal(job)}
                    >
                      View Details
                    </button>
                    <a 
                      href={`mailto:info.makerr@gmail.com?subject=Application for ${job.title} Internship`}
                      className="btn btn-secondary"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="careers-cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Don't See Your Role?</h2>
            <p>We're always looking for talented individuals to join our team. Send us your resume and let's talk!</p>
            <a 
              href="mailto:info.makerr@gmail.com?subject=General Application"
              className="btn btn-primary"
            >
              Send Your Resume
            </a>
          </div>
        </div>
      </section>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="job-modal-overlay" onClick={closeJobModal}>
          <div className="job-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeJobModal}>
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-header">
              <h3>{selectedJob.title}</h3>
              <span className={`job-type ${selectedJob.type.toLowerCase()}`}>
                {selectedJob.type}
              </span>
            </div>
            <div className="modal-content">
              <div className="job-info">
                <p><i className="fas fa-building"></i> {selectedJob.department}</p>
                <p><i className="fas fa-clock"></i> {selectedJob.experience || selectedJob.duration}</p>
                <p><i className="fas fa-map-marker-alt"></i> {selectedJob.location}</p>
              </div>
              <div className="job-section">
                <h4>Job Description</h4>
                <p>{selectedJob.description}</p>
              </div>
              {selectedJob.responsibilities && (
                <div className="job-section">
                  <h4>Responsibilities</h4>
                  <ul>
                    {selectedJob.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="job-section">
                <h4>Requirements</h4>
                <ul>
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-actions">
                <a 
                  href={`mailto:info.makerr@gmail.com?subject=Application for ${selectedJob.title}`}
                  className="btn btn-primary"
                >
                  Apply for This Position
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
