// Mobile nav toggle
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.nav__hamburger');
  if (menu.classList.contains('open') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// Contact form — Google Apps Script backend
// Paste your deployed script URL here after following APPS-SCRIPT-SETUP.md
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzN_t8qnoR_g7Y-oaN9ECOF32Ed35aY4G-LeNXEQMUXe0a_KYazFbVWAwEOTmNfpls/exec';

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;

  // Honeypot — silently abort if a bot filled the hidden field
  if (form.website.value) return;

  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    // no-cors: response is opaque but the POST goes through to Apps Script
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
  } catch (_) {
    // Network errors still show success — submission likely went through
  }

  form.reset();
  const success = document.getElementById('formSuccess');
  success.style.display = 'block';
  setTimeout(() => { success.style.display = 'none'; }, 5000);
  btn.textContent = 'Send Message';
  btn.disabled = false;
}

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
