'use client';

import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAnchorClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  useEffect(() => {
    // Active navigation link highlighting
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = 'home';

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop - 200 <= 0) {
          current = section.getAttribute('id') || 'home';
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.project-card, .skill-card');
    elements.forEach((el) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    // Validate name
    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate message
    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#home">
            <span className="brand-accent">OO</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-2">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAnchorClick('#about');
                  }}
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                  href="#skills"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAnchorClick('#skills');
                  }}
                >
                  Skills
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAnchorClick('#projects');
                  }}
                >
                  Projects
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAnchorClick('#contact');
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-8">
              <h1 className="display-3 fw-bold mb-3">Opeyemi Oyediran</h1>
              <p className="lead text-muted mb-4">Fullstack Developer</p>
              <p className="subtitle mb-5">
                Building scalable web applications from frontend to backend
              </p>
              <a href="#projects" className="btn btn-primary btn-lg">
                View My Work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section py-5">
        <div className="container py-5">
          <h2 className="section-title mb-5">About Me</h2>
          <div className="row">
            <div className="col-lg-8">
              <p className="about-text mb-4">
                I&apos;m a passionate fullstack developer with expertise in both
                frontend and backend technologies. I specialize in building
                complete web solutions that are scalable, maintainable, and
                user-centric. My approach combines problem-solving skills with a
                deep understanding of modern web development practices.
              </p>
              <p className="about-text mb-4">
                With experience across the entire development stack, I&apos;m
                comfortable architecting databases, building robust APIs, and
                creating responsive user interfaces. I&apos;m driven by the
                challenge of solving complex problems and delivering
                applications that make a real impact.
              </p>
              <p className="about-text">
                When I&apos;m not coding, you&apos;ll find me exploring new
                technologies, contributing to open-source projects, or sharing
                knowledge with the developer community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section py-5">
        <div className="container py-5">
          <h2 className="section-title mb-5">Skills</h2>
          <div className="row">
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="skill-card">
                <h5 className="skill-category mb-3">
                  <i className="fas fa-code me-2"></i>Frontend
                </h5>
                <ul className="skill-list">
                  <li>HTML5 & CSS3</li>
                  <li>JavaScript (ES6+)</li>
                  <li>Bootstrap & Responsive Design</li>
                  <li>jQuery</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="skill-card">
                <h5 className="skill-category mb-3">
                  <i className="fas fa-server me-2"></i>Backend
                </h5>
                <ul className="skill-list">
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>RESTful APIs</li>
                  <li>Database Design</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="skill-card">
                <h5 className="skill-category mb-3">
                  <i className="fas fa-tools me-2"></i>Tools & Version Control
                </h5>
                <ul className="skill-list">
                  <li>Git & GitHub</li>
                  <li>npm & Package Management</li>
                  <li>Deployment & Hosting</li>
                  <li>Debugging & Testing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section py-5">
        <div className="container py-5">
          <h2 className="section-title mb-5">Featured Projects</h2>
          <div className="row">
            {/* Project 1 */}
            <div className="col-lg-6 mb-4">
              <div className="project-card">
                <div
                  className="project-image"
                  style={{
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                ></div>
                <div className="project-content">
                  <h4 className="project-title">Task Manager App</h4>
                  <p className="project-description">
                    A full-featured task management application with CRUD
                    functionality. Users can create, read, update, and delete
                    tasks with a clean, intuitive interface.
                  </p>
                  <div className="project-tech mb-3">
                    <span className="tech-badge">JavaScript</span>
                    <span className="tech-badge">Bootstrap</span>
                    <span className="tech-badge">Express</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="btn btn-sm btn-outline-primary me-2">
                      Live Demo
                    </a>
                    <a href="#" className="btn btn-sm btn-outline-secondary">
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="col-lg-6 mb-4">
              <div className="project-card">
                <div
                  className="project-image"
                  style={{
                    background:
                      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  }}
                ></div>
                <div className="project-content">
                  <h4 className="project-title">Authentication System</h4>
                  <p className="project-description">
                    Secure user authentication system with login and
                    registration functionality. Features password hashing,
                    session management, and user validation.
                  </p>
                  <div className="project-tech mb-3">
                    <span className="tech-badge">Node.js</span>
                    <span className="tech-badge">Express</span>
                    <span className="tech-badge">JWT</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="btn btn-sm btn-outline-primary me-2">
                      Live Demo
                    </a>
                    <a href="#" className="btn btn-sm btn-outline-secondary">
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="col-lg-6 mb-4">
              <div className="project-card">
                <div
                  className="project-image"
                  style={{
                    background:
                      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  }}
                ></div>
                <div className="project-content">
                  <h4 className="project-title">Weather API App</h4>
                  <p className="project-description">
                    Real-time weather application that fetches data from a
                    public API. Displays current conditions and forecast with a
                    responsive, user-friendly design.
                  </p>
                  <div className="project-tech mb-3">
                    <span className="tech-badge">JavaScript</span>
                    <span className="tech-badge">API Integration</span>
                    <span className="tech-badge">Bootstrap</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="btn btn-sm btn-outline-primary me-2">
                      Live Demo
                    </a>
                    <a href="#" className="btn btn-sm btn-outline-secondary">
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="col-lg-6 mb-4">
              <div className="project-card">
                <div
                  className="project-image"
                  style={{
                    background:
                      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  }}
                ></div>
                <div className="project-content">
                  <h4 className="project-title">E-commerce Store</h4>
                  <p className="project-description">
                    Full-stack e-commerce platform with product catalog,
                    shopping cart, and checkout functionality. Includes
                    inventory management and order tracking.
                  </p>
                  <div className="project-tech mb-3">
                    <span className="tech-badge">Node.js</span>
                    <span className="tech-badge">Express</span>
                    <span className="tech-badge">Database</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="btn btn-sm btn-outline-primary me-2">
                      Live Demo
                    </a>
                    <a href="#" className="btn btn-sm btn-outline-secondary">
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section py-5">
        <div className="container py-5">
          <h2 className="section-title mb-5">Get In Touch</h2>
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <p className="text-center text-muted mb-5">
                Have a project in mind or want to collaborate? Feel free to
                reach out!
              </p>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                  {errors.name && (
                    <small className="text-danger d-block">{errors.name}</small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                  {errors.email && (
                    <small className="text-danger d-block">{errors.email}</small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleFormChange}
                  ></textarea>
                  {errors.message && (
                    <small className="text-danger d-block">{errors.message}</small>
                  )}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Send Message
                </button>
                {showSuccess && (
                  <div
                    className="alert alert-success mt-3"
                    role="alert"
                  >
                    Message sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <h5 className="mb-3">Opeyemi Oyediran</h5>
              <p className="text-muted">
                Fullstack Developer | Problem Solver | Tech Enthusiast
              </p>
            </div>
            <div className="col-md-6">
              <h5 className="mb-3">Follow Me</h5>
              <div className="social-links">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
          <hr className="bg-secondary opacity-25" />
          <div className="text-center text-muted">
            <p>&copy; 2024 Opeyemi Oyediran. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
