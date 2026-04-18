// Mobile nav toggle
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.nav__hamburger');
  const isOpen = menu.classList.toggle('open');
  if (hamburger) {
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  }
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.nav__hamburger');
  if (menu && menu.classList.contains('open') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('open');
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    }
  }
});

// Contact form — Google Apps Script backend
// Paste your deployed script URL here after following APPS-SCRIPT-SETUP.md
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzN_t8qnoR_g7Y-oaN9ECOF32Ed35aY4G-LeNXEQMUXe0a_KYazFbVWAwEOTmNfpls/exec';

function setFieldError(field, errorId, hasError) {
  field.setAttribute('aria-invalid', hasError ? 'true' : 'false');
  const err = document.getElementById(errorId);
  if (err) err.classList.toggle('visible', hasError);
}

function validateContactForm(form) {
  const name = form.name;
  const email = form.email;
  const message = form.message;
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const nameBad = !name.value.trim();
  const emailBad = !emailRe.test(email.value.trim());
  const messageBad = !message.value.trim();

  setFieldError(name, 'nameError', nameBad);
  setFieldError(email, 'emailError', emailBad);
  setFieldError(message, 'messageError', messageBad);

  const firstBad = [nameBad && name, emailBad && email, messageBad && message].find(Boolean);
  if (firstBad) firstBad.focus();
  return !(nameBad || emailBad || messageBad);
}

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;

  // Honeypot — silently abort if a bot filled the hidden field
  if (form.website.value) return;

  const success = document.getElementById('formSuccess');
  const fail = document.getElementById('formFail');
  if (success) success.style.display = 'none';
  if (fail) fail.classList.remove('visible');

  if (!validateContactForm(form)) return;

  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    // no-cors: response is opaque but the POST goes through to Apps Script.
    // fetch() only rejects on network failure here, so a thrown error means the request never left.
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode:   'no-cors',
      body:   JSON.stringify({
        name:    form.name.value.trim(),
        company: form.company.value.trim(),
        email:   form.email.value.trim(),
        message: form.message.value.trim()
      })
    });

    form.reset();
    if (success) {
      success.style.display = 'block';
      setTimeout(() => { success.style.display = 'none'; }, 5000);
    }
  } catch (_) {
    if (fail) fail.classList.add('visible');
  } finally {
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }
}

// Testimonial carousel
(function () {
  const carousel = document.getElementById('testimonialCarousel');
  if (!carousel) return;
  const slides = carousel.querySelectorAll('.testimonial-slide');
  const dots   = carousel.querySelectorAll('.dot');
  let current  = 0;
  let timer;

  function goToSlide(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goToSlide(current + 1), 5000);
  }

  window.goToSlide = goToSlide;
  resetTimer();
})();

// Smooth reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .stat, .gap__quote, .gap__body').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.addEventListener('animationend', () => {}, { once: true });

// Polyfill for the visible class
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .visible { opacity: 1 !important; transform: translateY(0) !important; }
  </style>
`);
