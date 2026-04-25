/* ============================================================
   main.js  —  Portfolio interactivity
   ============================================================ */

// ─── Navbar: add .scrolled class on scroll ──────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ─── Mobile nav burger ──────────────────────────────────────
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');

burger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ─── Active nav link on scroll ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => observer.observe(s));

// ─── Contact form — POST to /api/contact ────────────────────
const form = document.getElementById('contact-form');
const btnText = document.getElementById('btn-text');
const btnLoader = document.getElementById('btn-loader');
const submitBtn = document.getElementById('submit-btn');
const feedback = document.getElementById('form-feedback');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  // Basic client-side validation
  if (!name || !email || !message) {
    showFeedback('Please fill in all fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showFeedback('Please enter a valid email address.', 'error');
    return;
  }

  // Loading state
  submitBtn.disabled = true;
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline';
  feedback.textContent = '';

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (res.ok) {
      showFeedback('Message sent! I\'ll get back to you soon 🙌', 'success');
      form.reset();
    } else {
      showFeedback(data.detail || 'Something went wrong. Try emailing me directly.', 'error');
    }
  } catch {
    showFeedback('Network error. Please try again or email me directly.', 'error');
  } finally {
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
  }
});

function showFeedback(msg, type) {
  feedback.textContent = msg;
  feedback.className = `form-feedback ${type}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── Subtle entrance animations via IntersectionObserver ────
const fadeEls = document.querySelectorAll(
  '.project-card, .interest-card, .timeline-item, .about-card'
);

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  fadeObserver.observe(el);
});
