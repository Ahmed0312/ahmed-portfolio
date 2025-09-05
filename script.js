// Modern Portfolio JavaScript with Dark Mode Support

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contactForm');

// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    this.applyTheme();
    this.setupEventListeners();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    const icon = themeToggle.querySelector('i');
    
    if (this.theme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  setupEventListeners() {
    themeToggle.addEventListener('click', () => this.toggleTheme());
  }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Mobile Navigation
class MobileNavigation {
  constructor() {
    this.hamburger = hamburger;
    this.navMenu = navMenu;
    this.navLinks = navLinks;
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.hamburger.addEventListener('click', () => this.toggleMenu());
    
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    this.hamburger.classList.toggle('active');
    this.navMenu.classList.toggle('active');
  }

  closeMenu() {
    this.hamburger.classList.remove('active');
    this.navMenu.classList.remove('active');
  }
}

// Initialize mobile navigation
const mobileNav = new MobileNavigation();

// Smooth Scrolling
class SmoothScrolling {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Initialize smooth scrolling
const smoothScrolling = new SmoothScrolling();

// Active Navigation Link Highlighting
class NavigationHighlighter {
  constructor() {
    this.navLinks = navLinks;
    this.sections = document.querySelectorAll('section');
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener('scroll', () => this.highlightActiveLink());
  }

  highlightActiveLink() {
    const scrollPosition = window.scrollY + 100;

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }
}

// Initialize navigation highlighter
const navHighlighter = new NavigationHighlighter();


// Intersection Observer for Animations
class AnimationObserver {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    this.setupObserver();
    this.observeElements();
  }

  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          this.observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);
  }

  observeElements() {
    const animateElements = document.querySelectorAll(
      '.skill-category, .timeline-item, .cert-card, .project-card, .highlight'
    );
    
    animateElements.forEach(el => {
      this.observer.observe(el);
    });
  }
}

// Initialize animation observer
const animationObserver = new AnimationObserver();

// Navbar Background on Scroll
class NavbarScrollEffect {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    if (window.scrollY > 50) {
      this.navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      this.navbar.style.backdropFilter = 'blur(20px)';
    } else {
      this.navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      this.navbar.style.backdropFilter = 'blur(20px)';
    }

    // Dark mode adjustments
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      if (window.scrollY > 50) {
        this.navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
      } else {
        this.navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
      }
    }
  }
}

// Initialize navbar scroll effect
const navbarScrollEffect = new NavbarScrollEffect();

// Typing Effect for Hero Subtitle
class TypingEffect {
  constructor() {
    this.heroSubtitle = document.querySelector('.hero-subtitle');
    this.init();
  }

  init() {
    if (this.heroSubtitle) {
      this.startTyping();
    }
  }

  startTyping() {
    const originalText = this.heroSubtitle.textContent;
    this.heroSubtitle.textContent = '';
    
    setTimeout(() => {
      this.typeWriter(this.heroSubtitle, originalText, 100);
    }, 1000);
  }

  typeWriter(element, text, speed) {
    let i = 0;
    
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };
    
    type();
  }
}

// Initialize typing effect
const typingEffect = new TypingEffect();

// Skill Bars Animation
class SkillBarsAnimation {
  constructor() {
    this.skillsSection = document.getElementById('skills');
    this.init();
  }

  init() {
    if (this.skillsSection) {
      this.setupObserver();
    }
  }

  setupObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(this.skillsSection);
  }

  animateSkillBars() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach((category, categoryIndex) => {
      const skills = category.querySelectorAll('li');
      
      skills.forEach((skill, skillIndex) => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateX(-20px)';
        skill.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
          skill.style.opacity = '1';
          skill.style.transform = 'translateX(0)';
        }, (categoryIndex * 200) + (skillIndex * 100));
      });
    });
  }
}

// Initialize skill bars animation
const skillBarsAnimation = new SkillBarsAnimation();

// Back to Top Button
class BackToTopButton {
  constructor() {
    this.button = null;
    this.init();
  }

  init() {
    this.createButton();
    this.setupEventListeners();
  }

  createButton() {
    this.button = document.createElement('button');
    this.button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    this.button.className = 'back-to-top';
    this.button.setAttribute('aria-label', 'Back to top');
    
    this.button.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      border: none;
      cursor: pointer;
      font-size: 1.2rem;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    document.body.appendChild(this.button);
  }

  setupEventListeners() {
    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    if (window.scrollY > 300) {
      this.button.style.opacity = '1';
      this.button.style.visibility = 'visible';
    } else {
      this.button.style.opacity = '0';
      this.button.style.visibility = 'hidden';
    }
  }
}

// Initialize back to top button
const backToTopButton = new BackToTopButton();

// Parallax Effect for Hero Shapes
class ParallaxEffect {
  constructor() {
    this.shapes = document.querySelectorAll('.shape');
    this.init();
  }

  init() {
    if (this.shapes.length > 0) {
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    this.shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.1;
      shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
  }
}

// Initialize parallax effect
const parallaxEffect = new ParallaxEffect();

// Add CSS for active nav link and other dynamic styles
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
  .nav-link.active {
    color: var(--accent-primary) !important;
    font-weight: 600;
  }
  
  .back-to-top:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .notification-content i {
    font-size: 1.2rem;
  }
  
  /* Loading animation for buttons */
  .btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  /* Enhanced hover effects */
  .project-card:hover .project-icon {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }
  
  .blog-card:hover .blog-category {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
  
  /* Smooth transitions for theme changes */
  * {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  }
`;

document.head.appendChild(dynamicStyles);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio loaded successfully!');
  
  // Add a subtle entrance animation to the entire page
  document.body.style.opacity = '0';
  document.body.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    document.body.style.transition = 'all 0.6s ease';
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
  }, 100);
});