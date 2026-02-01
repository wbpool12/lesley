/* ================================================================
   LESLEY POOL REAL ESTATE — Main JavaScript
   ================================================================ */

(function () {
  'use strict';

  // ===== Scroll header effect =====
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  // ===== Mobile hamburger toggle =====
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      // Prevent body scroll when mobile nav is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // ===== Dropdown toggle on mobile =====
  document.querySelectorAll('.dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', e => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        e.stopPropagation();
        const dd = btn.closest('.dropdown');
        // Close other open dropdowns
        document.querySelectorAll('.dropdown').forEach(d => {
          if (d !== dd) d.classList.remove('open');
        });
        dd.classList.toggle('open');
      }
    });
  });

  // ===== Close mobile nav on link click =====
  document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      if (toggle) toggle.classList.remove('open');
      if (navLinks) navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ===== Active page highlighting =====
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const currentHref = window.location.href;

  // Check top-level nav links
  document.querySelectorAll('.nav-links > a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || currentHref.endsWith(href)) {
      link.classList.add('active');
    }
  });

  // Check dropdown items and mark parent toggle active if child matches
  document.querySelectorAll('.dropdown-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || currentHref.endsWith(href)) {
      link.classList.add('active');
      const parentToggle = link.closest('.dropdown')?.querySelector('.dropdown-toggle');
      if (parentToggle) parentToggle.classList.add('active');
    }
  });

  // ===== Reveal on scroll =====
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    reveals.forEach(el => io.observe(el));
  }

  // ===== Accordion toggle (area pages) =====
  document.querySelectorAll('.accordion-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!wasOpen) item.classList.add('open');
    });
  });

})();
