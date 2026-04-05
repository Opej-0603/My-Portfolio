// ===== Form Validation =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Reset error messages
            document.getElementById('nameError').classList.add('d-none');
            document.getElementById('emailError').classList.add('d-none');
            document.getElementById('messageError').classList.add('d-none');
            
            let isValid = true;
            
            // Validate name
            if (name.length < 2) {
                showError('nameError', 'Name must be at least 2 characters long');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (message.length < 10) {
                showError('messageError', 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            // If valid, show success message
            if (isValid) {
                showSuccessMessage();
                contactForm.reset();
            }
        });
    }
    
    // Animate elements on scroll
    observeElements();
});

// ===== Error Display Function =====
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.remove('d-none');
}

// ===== Success Message =====
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('d-none');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.add('d-none');
    }, 5000);
}

// ===== Intersection Observer for Scroll Animations =====
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all project and skill cards
    const cards = document.querySelectorAll('.project-card, .skill-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for internal links
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile navbar if open
            const navbar = document.querySelector('.navbar-collapse');
            if (navbar.classList.contains('show')) {
                const toggler = document.querySelector('.navbar-toggler');
                toggler.click();
            }
        }
    });
});

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// ===== Input Validation on Change =====
document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (this.value.trim().length < 2 && this.value.trim().length > 0) {
                showError('nameError', 'Name must be at least 2 characters long');
            } else {
                document.getElementById('nameError').classList.add('d-none');
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value) && this.value.length > 0) {
                showError('emailError', 'Please enter a valid email address');
            } else {
                document.getElementById('emailError').classList.add('d-none');
            }
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            if (this.value.trim().length < 10 && this.value.trim().length > 0) {
                showError('messageError', 'Message must be at least 10 characters long');
            } else {
                document.getElementById('messageError').classList.add('d-none');
            }
        });
    }
});

// ===== Project Links Handler =====
document.addEventListener('DOMContentLoaded', function() {
    const projectLinks = document.querySelectorAll('.project-links a');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // This prevents navigation on placeholder links
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    });
});

// ===== Active Navigation Link Highlighting =====
window.addEventListener('scroll', function() {
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// ===== Typing Effect for Hero Title (Optional Enhancement) =====
function typeWriterEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== Page Load Animation =====
document.addEventListener('DOMContentLoaded', function() {
    // Add slight delay to stagger animations
    const cards = document.querySelectorAll('.project-card, .skill-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// ===== Prevent Form Submit (for demo purposes) =====
// In a real application, you would send this data to a backend service
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Form submission is already handled by the validateForm function
    }
});
