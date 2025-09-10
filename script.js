/* ========================
   Navbar Toggle
======================== */
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });
}

/* ========================
   Scroll Reveal
======================== */
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 50) {
      el.classList.add('show');
    }
  });
}

revealOnScroll();
window.addEventListener('scroll', revealOnScroll);

/* ========================
   Contact Form Submission (demo)
======================== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you! Your message has been sent.');
    contactForm.reset();
  });
}

/* ========================
   Services Slider (Responsive)
======================== */
const track = document.querySelector('.services-track');
const cards = Array.from(document.querySelectorAll('.services-track .service-card'));
const dotsContainer = document.querySelector('.slider-dots');

if (track && cards.length && dotsContainer) {
  let currentSlide = 0;
  let cardsPerView = 3;

  function updateCardsPerView() {
    const width = window.innerWidth;
    if (width <= 600) {
      cardsPerView = 1;
    } else if (width <= 992) {
      cardsPerView = 2;
    } else {
      cardsPerView = 3;
    }
    updateCardWidths();
    createDots();
    moveToSlide(0);
  }

  function updateCardWidths() {
    const trackWidth = track.offsetWidth;
    const cardWidth = trackWidth / cardsPerView - 20; // 20px gap
    cards.forEach(card => {
      card.style.flex = `0 0 ${cardWidth}px`;
    });
  }

  function createDots() {
    dotsContainer.innerHTML = '';
    const totalSlides = Math.ceil(cards.length / cardsPerView);
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => moveToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function moveToSlide(index) {
    currentSlide = index;
    const cardWidth = cards[0].getBoundingClientRect().width + 20; // include gap
    track.style.transform = `translateX(-${currentSlide * cardWidth * cardsPerView}px)`;
    updateDots();
  }

  function updateDots() {
    dotsContainer.querySelectorAll('button').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  window.addEventListener('resize', updateCardsPerView);
  updateCardsPerView();
}

/* ========================
   Accessories Slider
======================== */
const slides = document.querySelectorAll('.accessories-item');
const dotsContainerAcc = document.querySelector('.accessories-nav');
let currentAccessory = 0;

// Create navigation dots dynamically
if (slides.length && dotsContainerAcc) {
  dotsContainerAcc.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showAccessorySlide(i));
    dotsContainerAcc.appendChild(dot);
  });
}

const dotsAcc = dotsContainerAcc.querySelectorAll('.dot');

// Show specific accessory slide
function showAccessorySlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dotsAcc.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentAccessory = index;
  adjustAccessoryImageHeight();
}

// Adjust image height to match content
function adjustAccessoryImageHeight() {
  const activeSlide = document.querySelector('.accessories-item.active');
  if (!activeSlide) return;

  const left = activeSlide.querySelector('.accessories-left');
  const img = activeSlide.querySelector('.accessories-right img');

  if (left && img && window.innerWidth > 992) {
    img.style.height = `${left.offsetHeight}px`;
  } else if (img) {
    img.style.height = 'auto';
  }
}

// Show first slide on load
window.addEventListener('load', () => {
  showAccessorySlide(0);
});

// Adjust on resize
window.addEventListener('resize', adjustAccessoryImageHeight);

/* ========================
   Swiper Slider (optional)
======================== */
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 40,
  loop: true,
  centeredSlides: true,
  pagination: { el: ".swiper-pagination", clickable: true },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  breakpoints: {
    992: { slidesPerView: 3, spaceBetween: 30 },
    600: { slidesPerView: 2, spaceBetween: 20 },
    0: { slidesPerView: 1, spaceBetween: 10 },
  },
  on: {
    slideChangeTransitionStart: function () {
      this.slides.forEach(slide => {
        slide.style.transform = "scale(0.9)";
        slide.style.opacity = "0.6";
        slide.style.zIndex = "1";
      });
      const active = this.slides[this.activeIndex];
      active.style.transform = "scale(1.2)";
      active.style.opacity = "1";
      active.style.zIndex = "3";

      const prev = this.slides[this.activeIndex - 1];
      const next = this.slides[this.activeIndex + 1];
      if (prev) { prev.style.transform = "scale(0.95)"; prev.style.opacity = "0.8"; prev.style.zIndex = "2"; }
      if (next) { next.style.transform = "scale(0.95)"; next.style.opacity = "0.8"; next.style.zIndex = "2"; }
    }
  }
});
