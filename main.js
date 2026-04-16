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

// Contact form — mailto fallback (no backend needed)
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name    = form.name.value.trim();
  const company = form.company.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  const subject = encodeURIComponent(`IguanAI inquiry from ${name}${company ? ' @ ' + company : ''}`);
  const body    = encodeURIComponent(
    `Name: ${name}\nCompany: ${company || 'N/A'}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  // Open mailto — replace with your email address
  window.location.href = `mailto:hello@iguanai.com?subject=${subject}&body=${body}`;

  // Show success state
  form.reset();
  const success = document.getElementById('formSuccess');
  success.style.display = 'block';
  setTimeout(() => { success.style.display = 'none'; }, 5000);
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
