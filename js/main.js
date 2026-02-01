// Scroll effect
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// Mobile toggle
const toggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

// Mobile dropdown
document.querySelectorAll('.dropdown-toggle').forEach(btn => {
  btn.addEventListener('click', e => {
    if (window.innerWidth <= 920) {
      e.preventDefault();
      const dd = btn.closest('.dropdown');
      document.querySelectorAll('.dropdown').forEach(d => {
        if (d !== dd) d.classList.remove('open');
      });
      dd.classList.toggle('open');
    }
  });
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(link => {
  link.addEventListener('click', () => {
    if (toggle) toggle.classList.remove('open');
    if (navLinks) navLinks.classList.remove('open');
  });
});

// Active page
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links > a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === path) link.classList.add('active');
});
