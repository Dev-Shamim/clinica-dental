// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

if (btn && menu) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link (that isn't a dropdown trigger)
    menu.querySelectorAll('a:not(.mobile-dropdown-trigger)').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
}

// Mobile Dropdown Toggle
const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-trigger');
mobileDropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const subMenu = trigger.nextElementSibling;
        subMenu.classList.toggle('active');
        const icon = trigger.querySelector('i.fa-chevron-down');
        if (icon) {
            icon.classList.toggle('rotate-180');
        }
    });
});

// Form Handler
function handleSubmit(event) {
    event.preventDefault();
    const btn = event.target.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = 'Enviando...';
    btn.disabled = true;
    btn.classList.add('opacity-75');

    // Simulate server request
    setTimeout(() => {
        alert('¡Gracias! Hemos recibido tu solicitud. Te contactaremos en breve para confirmar la cita.');
        event.target.reset();
        btn.innerText = 'Mensaje Enviado';
        btn.classList.remove('bg-primary');
        btn.classList.add('bg-green-600');
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
            btn.classList.remove('opacity-75', 'bg-green-600');
            btn.classList.add('bg-primary');
        }, 3000);
    }, 1500);
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    }
});

// Testimonial Slider Logic
const track = document.getElementById('testimonial-track');
if (track) {
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const dotsContainer = document.getElementById('testimonial-dots');
    const slides = Array.from(track.children);
    
    let currentIndex = 0;
    let autoPlayInterval;
    const intervalTime = 5000;

    function getVisibleSlides() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function updateSlider() {
        const visibleSlides = getVisibleSlides();
        const maxIndex = slides.length - visibleSlides;
        
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const slideWidth = 100 / visibleSlides;
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

        // Update Dots
        updateDots();
    }

    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const visibleSlides = getVisibleSlides();
        const dotCount = slides.length - visibleSlides + 1;
        
        if (dotCount <= 1) return;

        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('button');
            dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-secondary w-8' : 'bg-white/30'}`;
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        if (!dotsContainer) return;
        const dots = dotsContainer.children;
        for (let i = 0; i < dots.length; i++) {
            if (i === currentIndex) {
                dots[i].classList.add('bg-secondary', 'w-8');
                dots[i].classList.remove('bg-white/30');
            } else {
                dots[i].classList.remove('bg-secondary', 'w-8');
                dots[i].classList.add('bg-white/30');
            }
        }
    }

    function nextSlide() {
        const visibleSlides = getVisibleSlides();
        if (currentIndex < slides.length - visibleSlides) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            const visibleSlides = getVisibleSlides();
            currentIndex = slides.length - visibleSlides;
        }
        updateSlider();
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, intervalTime);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }

    // Responsive handling
    window.addEventListener('resize', () => {
        createDots();
        updateSlider();
    });

    // Initialize
    createDots();
    updateSlider();
    startAutoPlay();
}
