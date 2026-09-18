/**
 * MAIN.JS
 * Primary UI interaction, Mobile Menu logic (Click-Only), Form handling, Back to Top
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initBackToTop();
  initContactForm();
});

/**
 * Mobile Navigation Handler - Strictly Click/Tap Activated
 * Prevents accidental swipe reveals & manages accessibility ARIA states
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const menuOverlay = document.getElementById('mobile-nav-menu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !menuOverlay) return;

  function openMenu() {
    menuOverlay.classList.add('is-active');
    menuOverlay.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  function closeMenu() {
    menuOverlay.classList.remove('is-active');
    menuOverlay.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // Restore background scroll
  }

  // Click Trigger
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Close on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('is-active')) {
      closeMenu();
    }
  });

  // Close when clicking outside of nav inner container
  menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
      closeMenu();
    }
  });
}

/**
 * Back To Top Button Behavior
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Static Contact Form Submission Handler (UI Fallback)
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('full-name').value.trim();
    const phone = document.getElementById('phone-number').value.trim();

    if (!name || !phone) {
      if (statusMsg) {
        statusMsg.style.color = '#e74c3c';
        statusMsg.textContent = 'Please complete all required fields.';
      }
      return;
    }

    // UI Confirmation for static site
    if (statusMsg) {
      statusMsg.style.color = '#00a887';
      statusMsg.textContent = 'Thank you. Your inquiry placeholder has been received. For immediate support, please call +92 327 2112277.';
    }

    form.reset();
  });
}
