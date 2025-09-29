// Custom Cursor
const cursor = document.querySelector('.custom-cursor');

// Gerakan cursor
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Efek hover
document.querySelectorAll('a, button, input, [data-cursor-hover]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
});

if ('ontouchstart' in window) {
  cursor.style.display = 'none';
}

// Effek click
document.addEventListener('mousedown', () => {
  cursor.classList.add('cursor-click');
});
document.addEventListener('mouseup', () => {
  cursor.classList.remove('cursor-click');
});

// End of Point mouse

// Navbar Hide/Show on Scroll
let lastScrollY = window.scrollY;
const header = document.querySelector('header');

function handleScroll() {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 10) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
  
  lastScrollY = currentScrollY;
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

window.addEventListener('scroll', throttle(handleScroll, 10));

window.addEventListener('scroll', () => {
  if (window.scrollY <= 100) {
    header.classList.remove('hidden');
  }
});

// Initialize Lenis for smooth scrolling - SEDIKIT LEBIH LAMBAT
function initLenis() {
const lenis = new Lenis({
  duration: 1.5,
  easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.3,
});

  // Animation frame
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Handle anchor links dengan durasi yang pas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, {
          offset: -80,
          duration: 1.4, // Sedikit lebih lambat untuk anchor links
          easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t, // Smooth easing
        });
      }
    });
  });

  return lenis;
}

// Inisialisasi Lenis
if (typeof Lenis !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    initLenis();
  });
} else {
  // Fallback ke smooth scroll native
  document.addEventListener('DOMContentLoaded', function() {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  });
}