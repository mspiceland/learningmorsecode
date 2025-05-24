// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
    
    // Close mobile menu when a nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.resource-card, .step, .cta-box, .video-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    document.querySelectorAll('.resource-card, .step, .cta-box, .video-container').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Morse code animation for the hero section
function createMorseCodeAnimation() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const morseCode = ['.-- .... -.-- / -- --- .-. ... . / -.-. --- -.. .', 
                      '.... .- -- / .-. .- -.. .. --- / .. ... / .- .-- . ... --- -- .'];
    
    const morseElement = document.createElement('div');
    morseElement.className = 'morse-code-animation';
    morseElement.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: monospace;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.1);
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
        white-space: nowrap;
    `;
    
    const randomMorse = morseCode[Math.floor(Math.random() * morseCode.length)];
    morseElement.textContent = randomMorse.repeat(50);
    
    hero.style.position = 'relative';
    hero.style.overflow = 'hidden';
    hero.appendChild(morseElement);
    
    // Animate the morse code
    let position = 0;
    setInterval(() => {
        position--;
        morseElement.style.transform = `translateX(${position}px)`;
        
        if (position < -500) {
            position = 0;
        }
    }, 50);
}

// Initialize the animation when the page loads
window.addEventListener('load', createMorseCodeAnimation);
