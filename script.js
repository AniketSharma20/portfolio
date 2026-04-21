// Brittany Chiang Portfolio - script.js

/**
 * Loading screen handler - faster for instant content visibility
 */
function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      // Trigger hero animations immediately after loader hides
      setTimeout(() => {
        const hero = document.querySelector('.hero');
        if (hero) {
          hero.classList.add('visible', 'fade-in-up');
        }
        
        // Trigger h1, h2, h3, p, btn-group animations
        document.querySelectorAll('.hero h1, .hero h2, .hero h3, .hero p, .hero .btn-group').forEach(el => {
          el.classList.add('fade-in-up');
        });
        
        // Trigger scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
          scrollIndicator.classList.add('animate');
        }
      }, 100);
    }, 300); // Fast loading time for better UX
  }
  
  // Ensure body is visible immediately
  document.body.style.opacity = '1';
  document.body.style.visibility = 'visible';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hideLoader);
} else {
  hideLoader();
}

/**
 * Smooth scrolling for navigation links
 */
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for nav links
  const navLinks = document.querySelectorAll('a[href^=\"#\"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' 
        });
      }
    });
  });

  // Active nav highlighting
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});

/**
 * Mobile menu toggle with accessibility
 */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  if (hamburger && mobileMenu && mobileOverlay) {
    // Toggle menu function
    const toggleMenu = () => {
      const isOpen = mobileMenu.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      
      // Update ARIA attributes
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
    };
    
    hamburger.addEventListener('click', toggleMenu);
    
    // Handle keyboard accessibility for hamburger
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    mobileOverlay.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }
});

/**
 * Intersection Observer for scroll animations
 */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add visible class to trigger animation
      entry.target.classList.add('visible');
      
      // Fade in up animation
      entry.target.classList.add('fade-in-up');
      
      // Stagger children
      const children = entry.target.querySelectorAll('.fade-in-up');
      children.forEach((child, i) => {
        child.style.animationDelay = `${i * 0.1}s`;
      });

      // Skill progress bars
      if (entry.target.classList.contains('skills')) {
        setTimeout(() => {
          const progressBars = entry.target.querySelectorAll('.skill-progress');
          progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
          });
        }, 200);
      }

      // Project stagger
      if (entry.target.classList.contains('work')) {
        const projects = entry.target.querySelectorAll('.work-item');
        projects.forEach((project, i) => {
          project.style.animationDelay = `${i * 0.2}s`;
        });
      }
    }
  });
}, observerOptions);

// Observe all sections and elements
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('section, .hero, .about-text, .about-image, .job, .skill-category, .work-item, .contact-info, .contact-form-wrapper, .contact-header').forEach(el => {
    observer.observe(el);
  });
});

/**
 * Typing effect for hero subtitle
 */
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Run typing effect
const heroSubtitle = document.querySelector('.typing-subtitle');
if (heroSubtitle) {
  // Trigger after hero visible
  const heroObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        typeWriter(heroSubtitle, 'I build things for the web.');
      }, 500);
      heroObserver.disconnect();
    }
  }, { threshold: 0.1 });
  
  const heroSection = document.querySelector('#hero');
  if (heroSection) {
    heroObserver.observe(heroSection);
  } else {
    // Fallback - just run it
    setTimeout(() => {
      typeWriter(heroSubtitle, 'I build things for the web.');
    }, 500);
  }
}

/**
 * Back to top button
 */
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 1000) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Contact form handling — sends a real email via Formsubmit.co
 */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn  = contactForm.querySelector('button[type="submit"]');
    const btnSpan    = submitBtn.querySelector('span');
    const originalText = btnSpan ? btnSpan.innerHTML : submitBtn.innerHTML;

    // Collect form data
    const name    = contactForm.querySelector('#name').value.trim();
    const email   = contactForm.querySelector('#email').value.trim();
    const subject = contactForm.querySelector('#subject').value.trim();
    const message = contactForm.querySelector('#message').value.trim();

    // Loading state
    submitBtn.disabled = true;
    if (btnSpan) btnSpan.innerHTML = 'Sending...';
    else submitBtn.innerHTML = 'Sending...';

    try {
      // Use Formsubmit.co AJAX API
      const response = await fetch('https://formsubmit.co/ajax/as1557258@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message,
          _template: "table" // Nicely formatted email template
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      if(data.success) {
        // ✅ Success
        if (btnSpan) btnSpan.innerHTML = 'Sent! 🎉';
        else submitBtn.innerHTML = 'Sent! 🎉';
        submitBtn.style.background = 'linear-gradient(135deg, #00d4aa, #00a882)';
        contactForm.reset();

        // Show success toast
        showToast('Message sent successfully! I\'ll get back to you soon. 🚀');
      } else {
        throw new Error('Formsubmit API returned error');
      }

    } catch (error) {
      console.error('Email error:', error);
      if (btnSpan) btnSpan.innerHTML = 'Failed ❌ Try Again';
      else submitBtn.innerHTML = 'Failed ❌ Try Again';
      submitBtn.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
      showToast('Oops! Something went wrong. Please email me directly at as1557258@gmail.com', 'error');
    }

    setTimeout(() => {
      if (btnSpan) btnSpan.innerHTML = originalText;
      else submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.style.background = '';
    }, 4000);
  });

  // Input focus effects
  contactForm.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });
}

/**
 * Toast notification helper
 */
function showToast(message, type = 'success') {
  const existing = document.querySelector('.portfolio-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'portfolio-toast';
  toast.innerHTML = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: ${type === 'success' ? 'linear-gradient(135deg, #00d4aa, #00a882)' : 'linear-gradient(135deg, #ff4444, #cc0000)'};
    color: #fff;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: 0.95rem;
    font-weight: 500;
    z-index: 9999;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    max-width: 90vw;
    text-align: center;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}


/**
 * Email copy to clipboard
 */
const emailLink = document.querySelector('#email-link');
if (emailLink) {
  emailLink.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText('hello@example.com');
      // Show tooltip or feedback
      const originalText = emailLink.innerHTML;
      emailLink.innerHTML = 'Copied!';
      setTimeout(() => {
        emailLink.innerHTML = originalText;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email');
    }
  });
}

/**
 * Canvas floating shapes in hero
 */
function createHeroParticles() {
  const canvas = document.querySelector('.hero-shapes canvas');
  if (!canvas) {
    console.log('No canvas found, skipping particles');
    return;
  }

  try {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('Could not get 2D context');
      return;
    }
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 30; // Reduced for better performance

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.4 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#00d4aa';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  } catch (e) {
    console.log('Canvas error:', e);
  }
}

// Initialize particles after load
window.addEventListener('load', createHeroParticles);

/**
 * Custom cursor
 */
(function() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(updateCursor);
  }

  updateCursor();
})();

/**
 * Preload fonts and ensure visibility immediately
 */
document.addEventListener('DOMContentLoaded', () => {
  // Immediate visibility - no waiting for fonts
  document.body.style.opacity = '1';
  document.body.style.visibility = 'visible';
  
  // Ensure fonts are ready
  if (document.fonts) {
    document.fonts.ready.then(() => {
      console.log('Fonts loaded');
    });
  }
});
