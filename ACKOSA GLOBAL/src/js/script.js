document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 600,
        once: true,
        offset: 100
    });
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
