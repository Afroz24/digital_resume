// ====================================
// Page Loading Animation
// ====================================
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

// ====================================
// Scroll Animations
// ====================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all animated sections
    const sections = document.querySelectorAll('[data-aos]');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'all 0.8s ease-out';
        
        const delay = section.getAttribute('data-aos-delay');
        if (delay) {
            section.style.transitionDelay = delay + 'ms';
        }
        
        const animation = section.getAttribute('data-aos');
        switch(animation) {
            case 'fade-up':
                section.style.transform = 'translateY(30px)';
                break;
            case 'fade-left':
                section.style.transform = 'translateX(30px)';
                break;
            case 'fade-right':
                section.style.transform = 'translateX(-30px)';
                break;
            case 'zoom-in':
                section.style.transform = 'scale(0.9)';
                break;
        }
        
        observer.observe(section);
    });
}

// ====================================
// Dark Mode Toggle
// ====================================
function initDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

// ====================================
// Scroll to Top Button
// ====================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 900) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ====================================
// Skill Bars Animation
// ====================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ====================================
// Skill Item Interactions
// ====================================
function initSkillInteractions() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
        
        // Add click animation
        item.addEventListener('click', function() {
            this.style.transform = 'translateX(10px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translateX(10px) scale(1.02)';
            }, 150);
        });
    });
}

// ====================================
// Project Cards Interaction
// ====================================
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle pulse animation on click
            this.style.transform = 'translateY(-10px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px)';
            }, 200);
        });
    });
}

// ====================================
// Experience Cards Hover Effect
// ====================================
function initExperienceCards() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const dot = this.previousElementSibling;
            if (dot && dot.classList.contains('experience-dot')) {
                dot.style.transform = 'scale(1.3)';
                dot.style.boxShadow = '0 0 0 6px var(--bg-white), 0 0 0 10px var(--primary-color)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const dot = this.previousElementSibling;
            if (dot && dot.classList.contains('experience-dot')) {
                dot.style.transform = 'scale(1)';
                dot.style.boxShadow = '0 0 0 4px var(--bg-white), 0 0 0 8px var(--primary-color)';
            }
        });
    });
}

// ====================================
// Profile Image Error Handling
// ====================================
function initProfileImage() {
    const profileImg = document.getElementById('profileImg');
    
    profileImg.addEventListener('error', function() {
        // If image fails to load, create a placeholder with initials
        this.style.display = 'none';
        const container = this.parentElement;
        
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            font-weight: 700;
            color: white;
            border: 6px solid white;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        `;
        placeholder.textContent = 'MA';
        container.insertBefore(placeholder, this);
    });
}

// ====================================
// Typing Animation for Title
// ====================================
function initTypingAnimation() {
    const title = document.querySelector('.name-title h2');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = '1';
    
    let index = 0;
    const speed = 100; // milliseconds per character
    
    function type() {
        if (index < text.length) {
            title.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 1500);
}

// ====================================
// Smooth Scroll for Internal Links
// ====================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ====================================
// Print Functionality
// ====================================
function initPrintFunctionality() {
    window.addEventListener('beforeprint', function() {
        console.log('Preparing resume for printing...');
        document.title = 'Mohammed_Afroz_Resume';
    });
    
    window.addEventListener('afterprint', function() {
        console.log('Print completed!');
        document.title = 'Mohammed Afroz - Digital Resume';
    });
}

// ====================================
// Contact Item Click to Copy
// ====================================
function initContactCopy() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && (link.href.includes('tel:') || link.href.includes('mailto:'))) {
            item.style.cursor = 'pointer';
            item.title = 'Click to copy';
            
            item.addEventListener('click', function(e) {
                if (e.target.tagName !== 'A') {
                    const text = link.textContent;
                    navigator.clipboard.writeText(text).then(() => {
                        // Show feedback
                        const originalBg = this.style.background;
                        this.style.background = 'rgba(72, 187, 120, 0.3)';
                        setTimeout(() => {
                            this.style.background = originalBg;
                        }, 500);
                    }).catch(err => {
                        console.error('Failed to copy:', err);
                    });
                }
            });
        }
    });
}

// ====================================
// Add Particles Effect to Header
// ====================================
function createParticles() {
    const header = document.querySelector('.header-section');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        header.appendChild(particle);
    }
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ====================================
// Interest Items Interaction
// ====================================
function initInterestItems() {
    const interestItems = document.querySelectorAll('.interest-item');
    
    interestItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(102, 126, 234, 0.5);
                width: 20px;
                height: 20px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ====================================
// Initialize Everything on DOM Ready
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initScrollAnimations();
    initDarkMode();
    initScrollToTop();
    animateSkillBars();
    initSkillInteractions();
    initProjectCards();
    initExperienceCards();
    initProfileImage();
    // initTypingAnimation(); // Uncomment if you want typing animation
    initSmoothScroll();
    initPrintFunctionality();
    initContactCopy();
    createParticles();
    initInterestItems();
    
    console.log('✨ Digital Resume Loaded Successfully!');
});

// ====================================
// Add Keyboard Shortcuts
// ====================================
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
    
    // Ctrl/Cmd + D for dark mode toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        document.getElementById('themeToggle').click();
    }
    
    // Escape to scroll to top
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ====================================
// Performance Monitoring
// ====================================
if (window.performance) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`📊 Page loaded in: ${pageLoadTime}ms`);
        }, 0);
    });
}

// ====================================
// Print Preview Modal
// ====================================
function showPrintPreview() {
    const modal = new bootstrap.Modal(document.getElementById('printPreviewModal'));
    modal.show();
}
