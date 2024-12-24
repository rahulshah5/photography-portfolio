// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Portfolio image loading animation
window.addEventListener('load', () => {
    document.querySelectorAll('.portfolio-item').forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
        }, index * 200);
    });
});

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const counter = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Start counter animation when element is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter-number');
            counters.forEach(counter => animateCounter(counter));
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stats-counter').forEach(counter => {
    observer.observe(counter);
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Circular progress animation
function setProgress(element) {
    const value = element.dataset.value;
    element.style.setProperty('--progress', `${value}%`);
}

// Animate progress when in view
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const circles = entry.target.querySelectorAll('.progress-circle');
            circles.forEach(circle => setProgress(circle));
            progressObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.expertise-section').forEach(section => {
    progressObserver.observe(section);
});

// Gallery filter functionality
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function () {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to clicked button
        this.classList.add('active');

        // Get filter value
        const filterValue = this.getAttribute('data-filter');

        // Filter gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Image Dialog functionality
document.addEventListener('DOMContentLoaded', function() {
    const dialog = document.getElementById('imageDialog');
    const dialogImage = document.getElementById('dialogImage');
    const closeBtn = document.getElementById('dialogClose');
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    let currentIndex = 0;
    const images = Array.from(galleryItems);

    // Open dialog
    galleryItems.forEach((img, index) => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = index;
            openDialog(img.src);
        });
    });

    // Close dialog
    closeBtn.addEventListener('click', closeDialog);
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog || e.target.classList.contains('dialog-overlay')) {
            closeDialog();
        }
    });

    // Navigation
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!dialog.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeDialog();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    function openDialog(imageSrc) {
        dialogImage.src = imageSrc;
        dialog.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDialog() {
        dialog.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        dialogImage.src = images[currentIndex].src;
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        dialogImage.src = images[currentIndex].src;
    }
}); 