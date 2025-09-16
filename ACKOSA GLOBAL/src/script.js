document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Elements
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const nav = document.getElementById('mainNav');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('.nav-list a');
    const body = document.body;

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open');
    });

    // Close Menu Functions
    function closeMenu() {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Close Menu Events
    mobileMenuClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Close menu when clicking on nav links (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
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
    
    // Your other JavaScript functions...
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