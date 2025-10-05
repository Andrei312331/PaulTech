// Paul Tech - Futuristic Website JavaScript

let currentSection = 0;
const totalSections = 6; // Updated for new About section
let isScrolling = false;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
    createFloatingParticles();
    setupScrollSpy();
});

// Initialize website
function initializeWebsite() {
    // Update indicators based on current scroll position
    updateIndicators();
}

// Setup event listeners
function setupEventListeners() {
    // Navigation links
    const navigationLinks = document.querySelectorAll('.nav-links a');
    navigationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Section indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            const sections = ['#hero', '#about', '#microsoft', '#cloud', '#support', '#contact'];
            const targetElement = document.querySelector(sections[index]);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowDown':
                scrollToNextSection();
                break;
            case 'ArrowUp':
                scrollToPrevSection();
                break;
            case 'Home':
                document.querySelector('#hero').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'End':
                document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                break;
        }
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
        });
    }
}

// Scroll to next section
function scrollToNextSection() {
    const sections = document.querySelectorAll('.section');
    const currentScroll = window.pageYOffset;
    
    for (let i = 0; i < sections.length; i++) {
        const sectionTop = sections[i].offsetTop;
        if (sectionTop > currentScroll + 100) {
            sections[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
        }
    }
}

// Scroll to previous section
function scrollToPrevSection() {
    const sections = document.querySelectorAll('.section');
    const currentScroll = window.pageYOffset;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const sectionTop = sections[i].offsetTop;
        if (sectionTop < currentScroll - 100) {
            sections[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
        }
    }
}

// Setup scroll spy for indicators
function setupScrollSpy() {
    const sections = document.querySelectorAll('.section');
    const indicators = document.querySelectorAll('.indicator');
    
    window.addEventListener('scroll', debounce(() => {
        const scrollPos = window.pageYOffset + window.innerHeight / 2;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                // Update indicators
                indicators.forEach(indicator => indicator.classList.remove('active'));
                if (indicators[index]) {
                    indicators[index].classList.add('active');
                }
                currentSection = index;
            }
        });
        
        // Update navigation arrows
        updateNavigation();
    }, 100));
}

// Update section indicators
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSection);
    });
}

// Update navigation arrows based on scroll position
function updateNavigation() {
    const prevArrow = document.querySelector('.nav-arrow.prev');
    const nextArrow = document.querySelector('.nav-arrow.next');
    
    if (prevArrow && nextArrow) {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        
        prevArrow.style.opacity = scrollTop <= 100 ? '0.5' : '1';
        nextArrow.style.opacity = scrollTop >= documentHeight - windowHeight - 100 ? '0.5' : '1';
    }
}

// Next section function for buttons
function nextSection() {
    scrollToNextSection();
}

// Previous section function for buttons  
function prevSection() {
    scrollToPrevSection();
}

// Create floating particles animation
function createFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;

    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: var(--accent-cyan);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 4}s;
            box-shadow: 0 0 10px var(--accent-cyan);
            opacity: ${Math.random() * 0.8 + 0.2};
        `;
        particlesContainer.appendChild(particle);
    }
}

// Smooth scroll for anchor links
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Glitch effect removed for professional appearance

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized wheel handler
const optimizedWheelHandler = debounce(function(e) {
    if (isTransitioning) return;
    
    if (e.deltaY > 0) {
        nextSection();
    } else {
        prevSection();
    }
}, 300);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    setTimeout(() => {
        const heroElements = document.querySelectorAll('#hero .hero-content > *');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// Initialize service card animations
function initServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', initServiceCards);

// Add resize handler for responsive behavior
window.addEventListener('resize', debounce(function() {
    updateNavigation();
}, 250));

// Handle contact form submission
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const phone = contactForm.querySelector('input[type="tel"]').value;
            const service = contactForm.querySelector('select').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !phone || !service || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span>';
                showNotification('Thank you! We\'ll contact you within 15 minutes.', 'success');
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #00d2d3, #01a3a4)' : 
                     type === 'error' ? 'linear-gradient(45deg, #ff6b6b, #ee5a24)' : 
                     'linear-gradient(45deg, var(--accent-blue), var(--accent-purple))'};
        color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.5s ease;
        transform: translateX(100%);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }
    }, 5000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .notification-icon {
        font-size: 1.2rem;
    }
    
    .notification-message {
        flex: 1;
        line-height: 1.4;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
`;
document.head.appendChild(notificationStyles);

// Initialize CEO image upload functionality
function initCEOImageUpload() {
    const imageContainer = document.querySelector('.ceo-image-placeholder');
    if (imageContainer) {
        // Create hidden file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);
        
        // Add click handler to image container
        imageContainer.addEventListener('click', function() {
            fileInput.click();
        });
        
        // Handle file selection
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Create image element
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.cssText = `
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 50%;
                    `;
                    
                    // Replace placeholder content
                    imageContainer.innerHTML = '';
                    imageContainer.appendChild(img);
                    
                    // Add hover effect to change image
                    const changeOverlay = document.createElement('div');
                    changeOverlay.innerHTML = `
                        <div style=\"
                            position: absolute;
                            top: 0; left: 0; right: 0; bottom: 0;
                            background: rgba(0, 0, 0, 0.7);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            opacity: 0;
                            transition: opacity 0.3s ease;
                            border-radius: 50%;
                            cursor: pointer;
                        \">
                            <div style=\"text-align: center;\">
                                <div style=\"font-size: 2rem; margin-bottom: 10px;\">📷</div>
                                <div>Change Photo</div>
                            </div>
                        </div>
                    `;
                    
                    imageContainer.appendChild(changeOverlay);
                    
                    // Show overlay on hover
                    imageContainer.addEventListener('mouseenter', function() {
                        changeOverlay.firstElementChild.style.opacity = '1';
                    });
                    
                    imageContainer.addEventListener('mouseleave', function() {
                        changeOverlay.firstElementChild.style.opacity = '0';
                    });
                    
                    // Show success notification
                    showNotification('CEO photo updated successfully!', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Add cursor pointer style
        imageContainer.style.cursor = 'pointer';
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initCEOImageUpload();
});

// Add smooth scrolling for anchor links within sections
function smoothScrollToElement(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// Add intersection observer for service cards animation
function initServiceCardAnimations() {
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .tier-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Initialize animations after DOM load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initServiceCardAnimations, 1000);
});

// Export functions for global access (if needed)
window.PaulTech = {
    nextSection,
    prevSection,
    navigateToSection,
    currentSection: () => currentSection,
    showNotification
};