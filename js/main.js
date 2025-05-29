// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScrollPosition = window.scrollY;

window.addEventListener('scroll', () => {
    // Background change
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 15, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 15, 15, 0.8)';
    }

    // Show/hide on scroll
    const currentScroll = window.scrollY;
    
    if (currentScroll > lastScrollPosition && currentScroll > 200) {
        // Scrolling down & past threshold - hide navbar
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up or at top - show navbar
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollPosition = currentScroll;
});

// Section highlighting for navigation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    if (sections.length > 0 && navLinks.length > 0) {
        // Initial check to highlight the correct section on page load
        highlightActiveSection();
        
        // Add scroll event listener for continuous tracking
        window.addEventListener('scroll', highlightActiveSection);
        
        // Function to highlight active section
        function highlightActiveSection() {
            let current = '';
            const scrollPosition = window.scrollY + 100; // Offset for navbar height
            
            // Find the current section based on scroll position
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.id;
                }
            });
            
            // Remove active class from all navigation links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to the current section's link
            if (current) {
                const currentLink = document.querySelector(`#${current}-link`) || 
                                    document.querySelector(`a[href="#${current}"]`);
                if (currentLink) {
                    currentLink.classList.add('active');
                }            } else {
                // If at the top of the page, highlight home by default
                const homeLink = document.querySelector('#home-link');
                if (homeLink && window.scrollY < 100) {
                    homeLink.classList.add('active');
                }
            }
        }
        
    }
});

// Add animation class when elements come into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// Simple form validation (to be expanded)
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
};

// Login Modal Functions
const loginModal = document.getElementById('loginModal');
let otpSent = false;
let timerInterval;

function openLoginModal() {
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetLoginForm();
}

function resetLoginForm() {
    const form = document.getElementById('loginForm');
    form.reset();
    document.querySelector('.otp-group').style.display = 'none';
    document.querySelector('button[type="submit"]').textContent = 'Send OTP';
    otpSent = false;
    if (timerInterval) clearInterval(timerInterval);
}

function startOTPTimer() {
    let timeLeft = 60;
    const timerSpan = document.getElementById('timer');
    
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerSpan.textContent = '60';
        }
    }, 1000);
}

function handleLogin(event) {
    event.preventDefault();
    const phone = document.getElementById('phone').value;
    const otpInput = document.getElementById('otp');
    const submitBtn = event.target.querySelector('button[type="submit"]');
    
    if (!otpSent) {
        // Simulate sending OTP
        document.querySelector('.otp-group').style.display = 'block';
        submitBtn.textContent = 'Verify OTP';
        otpSent = true;
        startOTPTimer();
    } else {
        // Verify OTP
        if (otpInput.value.length === 6) {            // Simulate OTP verification
            showNotification('Login successful!', 'success');
            closeLoginModal();
        } else {
            showNotification('Please enter a valid OTP', 'error');
        }
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === loginModal) {
        closeLoginModal();
    }
};

// Services tabs functionality
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Here we would normally show/hide different service content
    });
});

// Testimonial carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.carousel-dots .dot');

function showTestimonial(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
}

// Auto-advance testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(index);
    });
});

// Phone mockup interactions
function initAppInteractions() {
    // Update time in status bar
    function updateTime() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: false 
        });
        document.querySelector('.time').textContent = timeStr;
    }
    updateTime();
    setInterval(updateTime, 60000);

    // Service selector interaction
    const serviceButtons = document.querySelectorAll('.service-selector button');
    serviceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            serviceButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update ride options based on service
            updateRideOptions(btn.dataset.service);
        });
    });

    // Ride options interaction
    const rideOptions = document.querySelectorAll('.ride-option');
    rideOptions.forEach(option => {
        option.addEventListener('click', () => {
            rideOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
        });
    });

    // Location input interaction
    const locationInputs = document.querySelectorAll('.location-inputs input');
    locationInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        input.addEventListener('blur', () => {
            input.parentElement.style.background = 'rgba(255, 255, 255, 0.05)';
        });
    });

    // Quick action buttons interaction
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const location = btn.querySelector('span:last-child').textContent;
            document.querySelector('.input-group.dropoff input').value = location;
        });
    });
}

// Update ride options based on selected service
function updateRideOptions(service) {
    const options = {
        cab: [
            { icon: '🚗', name: 'Economy', price: '₹99', time: '2 min' },
            { icon: '🚙', name: 'Premium', price: '₹149', time: '4 min' }
        ],
        bike: [
            { icon: '🏍️', name: 'Regular', price: '₹49', time: '1 min' },
            { icon: '🛵', name: 'Comfort', price: '₹79', time: '3 min' }
        ],
        ambulance: [
            { icon: '🚑', name: 'Emergency', price: '₹299', time: '4 min' },
            { icon: '🚑', name: 'ICU', price: '₹499', time: '6 min' }
        ]
    };

    const optionsHtml = options[service]?.map((opt, index) => `
        <div class="ride-option ${index === 0 ? 'active' : ''}">
            <span class="icon">${opt.icon}</span>
            <div class="details">
                <h5>${opt.name}</h5>
                <p>${opt.price}</p>
            </div>
            <span class="time">${opt.time}</span>
        </div>
    `).join('') || '';

    document.querySelector('.options-scroll').innerHTML = optionsHtml;
}

// Initialize app interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAppInteractions();
    initVehicleSection();
});

// Vehicle section interactions
function initVehicleSection() {
    // Vehicle filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter vehicles
            const type = btn.dataset.type;
            vehicleCards.forEach(card => {
                if (type === 'all' || card.dataset.type === type) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // EMI Graph animation
    const graphBars = document.querySelectorAll('.graph-bar');
    graphBars.forEach(bar => {
        bar.style.height = '0%';
        setTimeout(() => {
            bar.style.height = bar.style.getPropertyValue('--height') || '60%';
        }, 100);
    });

    // Enquire button interaction
    const enquireBtns = document.querySelectorAll('.enquire-btn');
    enquireBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Show login modal if not logged in
            openLoginModal();
        });
    });    // Calculate EMI button functionality removed since we now have a dedicated EMI calculator page
}

// Newsletter Form Handler
function handleNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Simulate newsletter subscription
    const button = event.target.querySelector('.subscribe-btn');
    const originalText = button.textContent;
    
    button.style.width = button.offsetWidth + 'px'; // Prevent button width from changing
    button.textContent = '✓ Subscribed!';
    button.style.background = 'var(--neon-teal)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        event.target.reset();
    }, 2000);
}

// Service Tabs and Carousel
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const serviceCarousels = document.querySelectorAll('.service-carousel');

    // Service tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceType = btn.dataset.service;
            
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show corresponding carousel
            serviceCarousels.forEach(carousel => {
                carousel.classList.remove('active');
                if (carousel.id === `${serviceType}-service`) {
                    carousel.classList.add('active');
                }
            });
        });
    });

    // Carousel functionality
    serviceCarousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const cards = track.querySelectorAll('.service-card');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        let currentIndex = 0;
        let cardWidth = 300; // Default width
        let cardsToShow = 3; // Default cards to show

        function updateCardWidth() {
            const containerWidth = carousel.offsetWidth;
            if (containerWidth <= 480) {
                cardWidth = 200;
                cardsToShow = 1;
            } else if (containerWidth <= 768) {
                cardWidth = 250;
                cardsToShow = 2;
            } else {
                cardWidth = 300;
                cardsToShow = 3;
            }
        }

        function updateCarousel() {
            const offset = -currentIndex * cardWidth;
            track.style.transform = `translateX(${offset}px)`;
            
            // Update button states
            prevBtn.style.opacity = currentIndex <= 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentIndex >= cards.length - cardsToShow ? '0.5' : '1';
        }

        // Initialize carousel
        updateCardWidth();
        updateCarousel();

        // Event listeners for buttons
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - cardsToShow) {
                currentIndex++;
                updateCarousel();
            }
        });

        // Update on resize
        window.addEventListener('resize', () => {
            updateCardWidth();
            currentIndex = Math.min(currentIndex, cards.length - cardsToShow);
            updateCarousel();
        });
        
        // Add touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        track.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0 && currentIndex < cards.length - cardsToShow) {
                    currentIndex++;
                } else if (diff < 0 && currentIndex > 0) {
                    currentIndex--;
                }
                updateCarousel();
            }
        });
    });
});

// Mockup Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    setupMockupCarousel();
});

function setupMockupCarousel() {
    const slides = document.querySelectorAll('.mockup-slide');
    const dots = document.querySelectorAll('.mockup-dot');
    const prevBtn = document.querySelector('.mockup-nav.prev');
    const nextBtn = document.querySelector('.mockup-nav.next');
    
    if (!slides.length || !dots.length) return;
    console.log("Mockup carousel initialized with", slides.length, "slides");
    
    let currentIndex = 0;
    
    function showSlide(index) {
        console.log("Showing slide", index);
        // Hide all slides and remove active class from dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show the selected slide and activate corresponding dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // Add click events to navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = slides.length - 1;
            showSlide(newIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            let newIndex = currentIndex + 1;
            if (newIndex >= slides.length) newIndex = 0;
            showSlide(newIndex);
        });
    }
    
    // Add click events to indicator dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto-advance slides
    let slideInterval = setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= slides.length) newIndex = 0;
        showSlide(newIndex);
    }, 4000);
    
    // Pause auto-advance when hovering over carousel
    const carousel = document.querySelector('.mockup-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                let newIndex = currentIndex + 1;
                if (newIndex >= slides.length) newIndex = 0;
                showSlide(newIndex);
            }, 4000);
        });
    }
}

// Section Observer for Active Navigation State
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const activeId = entry.target.id;
                const activeLink = document.querySelector(`.nav-links a[href="#${activeId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    },
    {
        threshold: 0.5,
        rootMargin: '-50px 0px'
    }
);

// Observe all sections
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Set active state on page load
function setInitialActiveState() {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', setInitialActiveState);
// Update on scroll (debounced)
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(setInitialActiveState, 100);
});

// Handle navigation section highlighting based on scroll position
document.addEventListener('DOMContentLoaded', function() {
    // Map IDs that differ from nav text to their corresponding link
    const idMappings = {
        'stats': 'about-link'
    };
    
    // Updated section observer for navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    function setActiveNavLink() {
        const scrollPosition = window.scrollY + 100; // Offset to trigger earlier
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Check if this section has a special mapping
                const targetSelector = idMappings[sectionId] 
                    ? `#${idMappings[sectionId]}` 
                    : `a[href="#${sectionId}"]`;
                
                const activeLink = document.querySelector(targetSelector);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Initial state
    setActiveNavLink();
    
    // Update on scroll (debounced)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(setActiveNavLink, 100);
    });
});

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.classList.toggle('menu-open'); // Prevent scrolling when menu is open
        });
        
        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-links a, .login-btn').forEach(element => {
            element.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !e.target.closest('.nav-links') && 
                !e.target.closest('.hamburger-menu')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
});

// Enhanced navigation between pages with proper section targeting
document.addEventListener('DOMContentLoaded', function() {
    // Get the current page path
    const currentPath = window.location.pathname;
    
    /**
     * Handle navigation from EMI calculator page to index.html sections
     */
    if (currentPath.includes('emi_calculator.html')) {
        document.querySelectorAll('a[href^="../html/index.html#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                // Store the target section ID in sessionStorage
                const targetSection = this.getAttribute('href').split('#')[1];
                sessionStorage.setItem('scrollToSection', targetSection);
                
                // Store which nav link was clicked to highlight it on the target page
                const linkId = this.id;
                if (linkId) {
                    sessionStorage.setItem('activeNavLink', linkId);
                }
            });
        });
    }
    
    /**
     * Handle section scrolling on index.html
     */
    if (currentPath.includes('index.html') || currentPath.endsWith('/') || currentPath.endsWith('html')) {
        const scrollToSection = sessionStorage.getItem('scrollToSection');
        const activeNavLink = sessionStorage.getItem('activeNavLink');
        
        if (scrollToSection) {
            // Clear the stored values
            sessionStorage.removeItem('scrollToSection');
            sessionStorage.removeItem('activeNavLink');
            
            // Wait for the page to fully load, then scroll
            setTimeout(() => {
                const targetElement = document.getElementById(scrollToSection);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active state in navigation
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Try to find the corresponding link in different ways
                    let activeLink = null;
                    
                    if (activeNavLink) {
                        activeLink = document.getElementById(activeNavLink);
                    }
                    
                    if (!activeLink) {
                        activeLink = document.querySelector(`a[href="#${scrollToSection}"]`);
                    }
                    
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            }, 300);
        }
        
        // Add additional behavior for hash changes within the same page
        window.addEventListener('hashchange', function() {
            const hash = window.location.hash.substring(1);
            if (hash) {
                const targetElement = document.getElementById(hash);
                if (targetElement) {
                    // Small delay to ensure smooth transition
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Update active nav link
                        document.querySelectorAll('.nav-links a').forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${hash}`) {
                                link.classList.add('active');
                            }
                        });
                    }, 100);
                }
            }
        });
    }
});

// Fix CSS compatibility issues with background-clip
document.addEventListener('DOMContentLoaded', function() {
    // Find all elements with -webkit-background-clip: text but missing standard background-clip
    const stylesheets = document.styleSheets;
    
    try {
        for (let i = 0; i < stylesheets.length; i++) {
            const stylesheet = stylesheets[i];
            
            // Skip if stylesheet is from a different origin (CORS restriction)
            if (!stylesheet.href || 
                (stylesheet.href && 
                 stylesheet.href.startsWith(window.location.origin))) {
                
                try {
                    const rules = stylesheet.cssRules || stylesheet.rules;
                    
                    for (let j = 0; j < rules.length; j++) {
                        const rule = rules[j];
                        
                        if (rule.style && rule.style['-webkit-background-clip'] === 'text' && 
                            (!rule.style['background-clip'] || rule.style['background-clip'] === '')) {
                            rule.style.setProperty('background-clip', 'text', 'important');
                        }
                    }
                } catch (e) {
                    console.warn('Could not access CSS rules:', e);
                }
            }
        }
    } catch (e) {
        console.warn('Error fixing background-clip:', e);
    }
});

// Create scroll progress indicator
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            scrollIndicator.style.width = scrolled + '%';
            
            // Add glow effect when scrolling more than 30%
            if (scrolled > 30) {
                scrollIndicator.style.boxShadow = '0 0 15px rgba(0, 195, 255, 0.7)';
            } else {
                scrollIndicator.style.boxShadow = '0 0 10px rgba(0, 195, 255, 0.5)';
            }
        });
    }
});

// Handle app-related buttons
function handleAppAction(action) {
    let message = 'Our application is coming soon! Stay tuned for the launch.';
      switch(action) {
        case 'book':
            message = 'Our ride booking service is coming soon! Stay tuned for the launch.';
            break;
        case 'download':
            message = 'Our mobile application is coming soon! Stay tuned for the launch.';
            break;
        case 'careers':
            message = 'Our careers portal is coming soon! Check back for exciting opportunities.';
            break;
        case 'blog':
            message = 'Our blog is coming soon! Stay tuned for updates and insights.';
            break;
        case 'press':
            message = 'Our press section is coming soon! Check back for latest news and updates.';
            break;
        case 'corporate':
            message = 'Our corporate services portal is coming soon! Stay tuned for business solutions.';
            break;
        case 'chat':
            message = 'Live chat support is coming soon! Please check back later.';
            break;
    }
    
    showNotification(message, 'info');
}

// Add event listeners for app-related buttons
document.addEventListener('DOMContentLoaded', function() {
    // Hero section buttons
    const bookRideBtn = document.querySelector('.cta-buttons .btn.primary');
    const downloadAppBtn = document.querySelector('.cta-buttons .btn.secondary');
    
    if (bookRideBtn) {
        bookRideBtn.addEventListener('click', () => handleAppAction('book'));
    }
    if (downloadAppBtn) {
        downloadAppBtn.addEventListener('click', () => handleAppAction('download'));
    }

    // Footer app store buttons
    const appStoreBtns = document.querySelectorAll('.app-store-btn');
    appStoreBtns.forEach(btn => {
        btn.addEventListener('click', () => handleAppAction('download'));
    });
    
    // Footer action links
    const footerActionLinks = document.querySelectorAll('.footer-action-link');
    footerActionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const action = link.dataset.action;
            handleAppAction(action);
        });
    });
});

// Notification System
function showNotification(message, type = 'info') {
    // Create notification container if it doesn't exist
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Create message element
    const messageEl = document.createElement('span');
    messageEl.className = 'notification-message';
    messageEl.textContent = message;

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'notification-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    };

    // Assemble notification
    notification.appendChild(messageEl);
    notification.appendChild(closeBtn);
    container.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Ecosystem Carousel - Single Row with 4 Cards Per Slide
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the ecosystem carousel when DOM is loaded
    const initEcosystemCarousel = function() {
        // Get carousel elements
        const track = document.querySelector('.ecosystem-track');
        const slides = document.querySelectorAll('.ecosystem-slide');
        const prevBtn = document.querySelector('.ecosystem-carousel .prev-btn');
        const nextBtn = document.querySelector('.ecosystem-carousel .next-btn');
        const dotsContainer = document.querySelector('.ecosystem-carousel .carousel-dots');
        
        // Exit if elements don't exist
        if (!track || !slides.length) return;
        
        let currentSlide = 0;
        
        // Clear and recreate dots for navigation
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }
        
        // Initialize - show first slide
        slides.forEach(slide => slide.classList.remove('active'));
        if (slides[0]) slides[0].classList.add('active');
        
        // Update dot indicators
        function updateDots() {
            if (!dotsContainer) return;
            document.querySelectorAll('.carousel-dots .dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Navigate to specific slide
        function goToSlide(index) {
            if (!slides[currentSlide] || !slides[index]) return;
            slides[currentSlide].classList.remove('active');
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            updateDots();
        }
        
        // Go to next slide
        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            goToSlide(next);
        }
        
        // Go to previous slide
        function prevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prev);
        }
        
        // Add click event listeners to navigation buttons
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Set up keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
          // Ensure proper layout with single row
        slides.forEach(slide => {
            if (window.innerWidth >= 1200) {
                slide.style.gridTemplateColumns = 'repeat(4, 1fr)';
            } else if (window.innerWidth >= 992) {
                slide.style.gridTemplateColumns = 'repeat(2, 1fr)';
            } else {
                slide.style.gridTemplateColumns = '1fr';
            }
            
            // Make sure the grid is properly aligned
            slide.style.gridGap = '20px';
            slide.style.width = '100%';
        });
    };
      // Initialize carousel
    initEcosystemCarousel();
    
    // Add debounced resize handler for better performance
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            initEcosystemCarousel();
        }, 250);
    });
});
