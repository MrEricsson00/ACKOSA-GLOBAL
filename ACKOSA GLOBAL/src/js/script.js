document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Elements
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const nav = document.getElementById('mainNav');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('.nav-list a');
    const body = document.body;

    // Mobile Menu Toggle
    function toggleMenu() {
        nav.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open');
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileMenuBtn.addEventListener('touchstart', toggleMenu);

    // Close Menu Functions
    function closeMenu() {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Close Menu Events
    mobileMenuClose.addEventListener('click', closeMenu);
    mobileMenuClose.addEventListener('touchstart', closeMenu);
    overlay.addEventListener('click', closeMenu);
    overlay.addEventListener('touchstart', closeMenu);

    // Close menu when clicking on nav links (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
        link.addEventListener('touchstart', function() {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Rest of your existing JavaScript (sticky header, smooth scroll, etc.)
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Modal functionality
    const readMoreLinks = document.querySelectorAll('.read-more[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Open modal
    readMoreLinks.forEach(link => {
        function openModal(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
            }
        }
        link.addEventListener('click', openModal);
        link.addEventListener('touchstart', openModal);
    });

    // Close modal on close button
    closeButtons.forEach(button => {
        function closeModal() {
            this.closest('.modal').style.display = 'none';
        }
        button.addEventListener('click', closeModal);
        button.addEventListener('touchstart', closeModal);
    });

    // Close modal on outside click
    modals.forEach(modal => {
        function closeModalOutside(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        }
        modal.addEventListener('click', closeModalOutside);
        modal.addEventListener('touchstart', closeModalOutside);
    });
});
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Show loading state
    submitBtn.style.display = 'none';
    loading.style.display = 'block';
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    // Create a FormData object from the form
    const formData = new FormData(this);
    
    // Submit using Fetch API
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Show success message
            successMessage.style.display = 'block';
            // Reset form
            this.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessage.style.display = 'block';
    })
    .finally(() => {
        loading.style.display = 'none';
        submitBtn.style.display = 'flex';
    });
});

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        galleryItems.forEach(item => {
            const wasVisible = item.style.display !== 'none';
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                console.log('Gallery filter: showing item', item, 'was visible:', wasVisible, 'has active:', item.classList.contains('active'));
            } else {
                item.style.display = 'none';
                console.log('Gallery filter: hiding item', item, 'was visible:', wasVisible, 'has active:', item.classList.contains('active'));
            }
        });
    });
});

// Image Reveal Animations
document.addEventListener('DOMContentLoaded', function() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const revealElements = document.querySelectorAll('.reveal');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px 0px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                console.log('IntersectionObserver entry:', entry.target, 'isIntersecting:', entry.isIntersecting, 'index:', index, 'boundingClientRect:', entry.boundingClientRect, 'intersectionRatio:', entry.intersectionRatio);
                if (entry.isIntersecting) {
                    console.log('Adding active to:', entry.target, 'current classes:', entry.target.className);
                    // Add staggered delay for gallery items
                    const delay = entry.target.classList.contains('gallery-item') ? index * 100 : 0;
                    setTimeout(() => {
                        entry.target.classList.add('active');
                        console.log('Active class added to:', entry.target, 'now classes:', entry.target.className);
                    }, delay);
                    observer.unobserve(entry.target);
                    console.log('Unobserved:', entry.target);
                } else {
                    console.log('Not intersecting:', entry.target, 'has active:', entry.target.classList.contains('active'));
                }
            });
        }, observerOptions);

        // Function to check if element is in viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        revealElements.forEach((element, index) => {
            if (isElementInViewport(element)) {
                console.log('Element already in viewport on load:', element);
                // Add staggered delay for gallery items
                const delay = element.classList.contains('gallery-item') ? index * 100 : 0;
                setTimeout(() => {
                    element.classList.add('active');
                    console.log('Active class added on load to:', element);
                }, delay);
            } else {
                observer.observe(element);
            }
        });
    } else {
        // If reduced motion is preferred, just show all elements
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(element => {
            element.classList.add('active');
        });
    }

    // Log image loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            console.log('Image loaded:', img.src);
        });
        img.addEventListener('error', () => {
            console.log('Image failed to load:', img.src);
        });
    });
});