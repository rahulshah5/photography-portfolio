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

// Image Dialog Functionality
const imageDialog = document.getElementById('imageDialog');
const dialogImage = document.getElementById('dialogImage');
const dialogClose = document.getElementById('dialogClose');
const prevButton = document.getElementById('prevImage');
const nextButton = document.getElementById('nextImage');

let currentImageIndex = 0;
const galleryImages = document.querySelectorAll('.gallery-item img');
const imageSources = Array.from(galleryImages).map(img => img.src);

// Open dialog
galleryImages.forEach((img, index) => {
    img.addEventListener('click', (e) => {
        e.preventDefault();
        currentImageIndex = index;
        showImage(currentImageIndex);
        imageDialog.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close dialog
dialogClose.addEventListener('click', () => {
    imageDialog.classList.remove('active');
    document.body.style.overflow = '';
});

// Close on background click
imageDialog.addEventListener('click', (e) => {
    if (e.target === imageDialog) {
        imageDialog.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Previous image
prevButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
    showImage(currentImageIndex);
});

// Next image
nextButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % imageSources.length;
    showImage(currentImageIndex);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!imageDialog.classList.contains('active')) return;

    if (e.key === 'Escape') {
        imageDialog.classList.remove('active');
        document.body.style.overflow = '';
    }
    if (e.key === 'ArrowLeft') {
        currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
        showImage(currentImageIndex);
    }
    if (e.key === 'ArrowRight') {
        currentImageIndex = (currentImageIndex + 1) % imageSources.length;
        showImage(currentImageIndex);
    }
});

function showImage(index) {
    dialogImage.src = imageSources[index];
} 