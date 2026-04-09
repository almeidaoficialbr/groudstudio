// ==========================================
// SMOOTH SCROLL BEHAVIOR & PARALLAX
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initIntersectionObserver();
    initInteractiveElements();
});

// PARALLAX EFFECT
function initParallax() {
    const parallaxElements = document.querySelectorAll('[class*="element"], .floating-3d, .gradient-orbs');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        parallaxElements.forEach((element) => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = scrollPosition * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// INTERSECTION OBSERVER - TRIGGER ANIMATIONS ON SCROLL
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll(
        '.service-card, .about-card, .cta-text, .diff-title'
    ).forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// INTERACTIVE ELEMENTS
function initInteractiveElements() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach((button) => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Smooth scroll to contact
            const phoneNumber = document.querySelector('.phone').textContent;
            
            // WhatsApp integration
            const whatsappUrl = `https://wa.me/558899999999?text=Olá%20GROUD%20STUDIO%2C%20gostaria%20de%20iniciar%20um%20projeto`;
            window.open(whatsappUrl, '_blank');
        });
    });
}

// MOUSE FOLLOW EFFECT FOR HERO ELEMENTS
document.addEventListener('mousemove', (e) => {
    const floatingElement = document.querySelector('.floating-3d');
    if (!floatingElement) return;
    
    const rect = floatingElement.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const distance = Math.sqrt(x * x + y * y);
    
    if (distance < 300) {
        const tiltX = (y / 300) * 5;
        const tiltY = (x / 300) * 5;
        floatingElement.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }
});

// LIGHT CURSOR EFFECT
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0, 255, 221, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: screen;
    transition: width 0.3s, height 0.3s;
`;
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    targetX += (mouseX - targetX) * 0.2;
    targetY += (mouseY - targetY) * 0.2;
    
cursor.style.left = targetX - 10 + 'px';
    cursor.style.top = targetY - 10 + 'px';
    
    requestAnimationFrame(updateCursor);
}

updateCursor();

// HOVER EFFECTS ON INTERACTIVE ELEMENTS
document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.borderColor = 'rgba(0, 255, 221, 0.8)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderColor = 'rgba(0, 255, 221, 0.5)';
    }
});

// PROGRESSIVE LOAD ANIMATIONS
window.addEventListener('load', () => {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.animation = 'slideIn 0.8s ease-out';
    }
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 1s ease-out 0.2s both';
    }
};