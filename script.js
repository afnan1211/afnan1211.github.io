/**
 * ========================================
 * PORTFOLIO SCRIPT
 * Muhammad Afnan Zainal Mutaqin
 * ========================================
 */

// ========================================
// 1. PRELOADER
// ========================================

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 800);
});

// ========================================
// 2. AOS INIT
// ========================================

AOS.init({
  duration: 800,
  once: true,
  offset: 80,
});

// ========================================
// 3. NAVBAR
// ========================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Sticky navbar with blur
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Close menu on link click
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ========================================
// 4. DARK MODE
// ========================================

const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');

// Check saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateIcon(newTheme);
});

function updateIcon(theme) {
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// ========================================
// 5. TYPING EFFECT
// ========================================

const typingText = document.getElementById('typingText');
const words = ['Frontend Developer', 'Backend Developer', 'Web Developer', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);

  typingText.textContent = currentChar;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 80);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 40);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(typeEffect, 1200);
  }
}

typeEffect();

// ========================================
// 6. STATISTICS COUNTER
// ========================================

const statNumbers = document.querySelectorAll('.stat-number');

const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'));
      animateCounter(el, target);
      observer.unobserve(el);
    }
  });
}, observerOptions);

statNumbers.forEach((el) => observer.observe(el));

function animateCounter(el, target) {
  let current = 0;
  const increment = Math.ceil(target / 40);
  const duration = 1500;
  const stepTime = Math.floor(duration / 40);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = current;
    }
  }, stepTime);
}

// ========================================
// 7. SKILLS BAR ANIMATION
// ========================================

const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
        skillObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.3 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));

// ========================================
// 8. CONTACT FORM VALIDATION
// ========================================
const form = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
        "service_hte9hbm",
        "template_i9e80y4",
        this
    )
    .then(() => {

        alert("Pesan berhasil dikirim!");

        form.reset();

    })
    .catch((error) => {

        console.log(error);

        alert("Pesan gagal dikirim!");

    });

});
// ========================================
// 9. SMOOTH SCROLL (optional enhancement)
// ========================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  });
});

// ========================================
// 10. PARALLAX EFFECT ON HERO
// ========================================

const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  if (hero) {
    hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
  }
});

console.log('🚀 Portfolio Muhammad Afnan loaded successfully!');
