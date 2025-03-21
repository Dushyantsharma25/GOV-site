document.addEventListener('DOMContentLoaded', function() {
    // Initialize the carousel with auto-sliding
    const carousel = new bootstrap.Carousel(document.getElementById('mainCarousel'), {
        interval: 3000,        // Change slide every 3 seconds
        wrap: true,           // Continue from first slide after last
        keyboard: true,       // Allow keyboard navigation
        pause: false,         // Don't pause on hover
        ride: 'carousel',     // Start sliding automatically
        touch: true          // Allow touch/swipe
    });

    // Ensure auto-sliding starts immediately
    carousel.cycle();

    // Add fade effect to captions when slides change
    const mainCarousel = document.getElementById('mainCarousel');
    mainCarousel.addEventListener('slide.bs.carousel', function () {
        const captions = document.querySelectorAll('.carousel-caption');
        captions.forEach(caption => {
            caption.style.opacity = '0';
            caption.style.transform = 'translateY(20px)';
        });
    });

    mainCarousel.addEventListener('slid.bs.carousel', function () {
        const activeCaption = document.querySelector('.carousel-item.active .carousel-caption');
        if (activeCaption) {
            activeCaption.style.opacity = '1';
            activeCaption.style.transform = 'translateY(0)';
        }
    });

    // Prevent manual navigation from stopping auto-sliding
    document.querySelectorAll('.carousel-control-prev, .carousel-control-next, .carousel-indicators button')
        .forEach(control => {
            control.addEventListener('click', () => {
                carousel.cycle();
            });
        });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Animation speed - lower is faster

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        
        const updateCount = () => {
            const increment = target / speed;
            if (count < target) {
                count = Math.ceil(count + increment);
                counter.innerText = count.toLocaleString();
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };

        updateCount();
    };

    // Intersection Observer for counters
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                counter.closest('.counter-box').classList.add('animate');
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}); 