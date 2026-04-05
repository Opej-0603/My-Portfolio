// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Active navigation link highlighting
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
});

// Form validation
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const successMessage = document.getElementById('successMessage');

  let isValid = true;

  // Reset errors
  nameError.classList.add('d-none');
  emailError.classList.add('d-none');
  messageError.classList.add('d-none');
  successMessage.classList.add('d-none');

  // Validate name
  if (name.value.trim().length < 2) {
    nameError.textContent = 'Name must be at least 2 characters';
    nameError.classList.remove('d-none');
    isValid = false;
  }

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    emailError.textContent = 'Please enter a valid email address';
    emailError.classList.remove('d-none');
    isValid = false;
  }

  // Validate message
  if (message.value.trim().length < 10) {
    messageError.textContent = 'Message must be at least 10 characters';
    messageError.classList.remove('d-none');
    isValid = false;
  }

  // If valid, show success message
  if (isValid) {
    successMessage.classList.remove('d-none');
    name.value = '';
    email.value = '';
    message.value = '';

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.classList.add('d-none');
    }, 5000);
  }
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all project cards and skill cards
document.querySelectorAll('.project-card, .skill-card').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});
