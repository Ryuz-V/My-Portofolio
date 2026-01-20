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

// Initialize Lenis for smooth scrolling - LEBIH CEPAT
function initLenis() {
  const lenis = new Lenis({
    duration: 0.8, // DURASI DIKURANGI (lebih cepat) - sebelumnya 1.5
    easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    wheelMultiplier: 1.1, // DITAMBAH (lebih responsif)
    touchMultiplier: 1.5, // DITAMBAH (lebih responsif di touch)
    smoothWheel: true, // Tambahkan ini untuk smooth scroll wheel
  });

  // Animation frame
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Handle anchor links dengan durasi yang lebih cepat
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, {
          offset: -80,
          duration: 0.5, // DURASI DIKURANGI (lebih cepat) - sebelumnya 1.4
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

// Ganti script terminal loading dengan yang ini
document.addEventListener('DOMContentLoaded', function() {
  const terminal = document.getElementById('terminal-output');
  const loader = document.getElementById('terminal-loader');
  const body = document.body;
  
  // Teks awal seperti command prompt Windows
  let output = "Microsoft Windows [Version 10.0.26200.7623]\n";
  output += "(c) Microsoft Corporation. All rights reserved.\n\n";
  output += "C:\\Users\\jathniel> ";
  
  terminal.textContent = output;
  
  // Tambahkan sedikit delay sebelum mengetik command
  setTimeout(() => {
    typeCommand();
  }, 800);
  
  let charIndex = 0;
  const command = "sudo pacman -S crow";
  
  function typeCommand() {
    if (charIndex < command.length) {
      output += command[charIndex];
      terminal.textContent = output;
      charIndex++;
      setTimeout(typeCommand, 50); // Kecepatan mengetik
    } else {
      // Command selesai diketik, tambahkan newline
      output += "\n\n";
      terminal.textContent = output;
      
      // Tunggu sebentar lalu mulai loading sequence
      setTimeout(() => {
        typeLogs();
      }, 300);
    }
  }
  
  const logs = [
    "Initializing portfolio system...",
    "Loading components...",
    "Rendering interface...",
    "Connecting to database...",
    "Mounting assets directory...",
    "Starting network services..."
  ];
  
  let logIndex = 0;
  let progress = 0;
  
  function typeLogs() {
    if (logIndex < logs.length) {
      output += logs[logIndex] + "\n";
      terminal.textContent = output;
      logIndex++;
      setTimeout(typeLogs, 250);
    } else {
      startProgress();
    }
  }
  
  function startProgress() {
    if (progress < 100) {
      progress += Math.floor(Math.random() * 6) + 4;
      if (progress > 100) progress = 100;
      
      const barLength = 20;
      const filled = Math.floor((progress / 100) * barLength);
      const empty = barLength - filled;
      const bar = "█".repeat(filled) + "░".repeat(empty);
      
      terminal.innerHTML = output + `Loading assets [${bar}] ${progress}%<span class="cursor">▌</span>`;
      setTimeout(startProgress, 120);
    } else {
      output += "Loading assets [████████████████████] 100%\n";
      output += "Verifying dependencies...\n";
      output += "System ready ✔\n";
      output += "Launching portfolio...\n";
      
      terminal.textContent = output;
      
      setTimeout(() => {
        // Fade out loader
        loader.classList.add('hidden');
        body.classList.remove('loading');
        
        // Initialize AOS AFTER loading is complete
        setTimeout(() => {
          if (typeof AOS !== 'undefined') {
            // Inisialisasi AOS hanya setelah loading selesai
            AOS.init({
              duration: 1000,
              once: false,
              mirror: true
            });
            
            console.log('AOS initialized after loading complete');
          }
        }, 300);
        
        // Remove loader from DOM after fade out
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }, 700);
    }
  }
});