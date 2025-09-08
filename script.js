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
  let cardsPerView = 3; // default

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
