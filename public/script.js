// ===== Sales Banner =====
const salesBanner = document.getElementById('salesBanner');
const inquiryBtn = document.getElementById('inquiryBtn');
const closeBanner = document.getElementById('closeBanner');
const popupOverlay = document.getElementById('popupOverlay');
const popupClose = document.getElementById('popupClose');

// Show banner class on body
document.body.classList.add('has-banner');

// Close banner
closeBanner.addEventListener('click', () => {
  salesBanner.classList.add('sales-banner--hidden');
  document.body.classList.remove('has-banner');
});

const popupForm = document.getElementById('popupForm');
const popupSuccess = document.getElementById('popupSuccess');
const popupFormClose = document.getElementById('popupFormClose');
const inquiryForm = document.getElementById('inquiryForm');
const sendInquiry = document.getElementById('sendInquiry');

// Open contact form popup
inquiryBtn.addEventListener('click', () => {
  popupForm.classList.remove('popup--hidden');
  popupSuccess.classList.add('popup--hidden');
  popupOverlay.classList.add('popup-overlay--visible');
});

// Close form popup
popupFormClose.addEventListener('click', () => {
  popupOverlay.classList.remove('popup-overlay--visible');
});

// Submit inquiry form
inquiryForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('inqName').value.trim();
  const phone = document.getElementById('inqPhone').value.trim();
  const email = document.getElementById('inqEmail').value.trim();

  if (!name || !email) return;

  sendInquiry.disabled = true;
  sendInquiry.textContent = 'Wird gesendet...';

  try {
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email })
    });
    if (res.ok) {
      popupForm.classList.add('popup--hidden');
      popupSuccess.classList.remove('popup--hidden');
      inquiryForm.reset();
    } else {
      sendInquiry.textContent = 'Fehler – nochmal versuchen';
    }
  } catch {
    sendInquiry.textContent = 'Fehler – nochmal versuchen';
  } finally {
    sendInquiry.disabled = false;
    sendInquiry.textContent = 'Anfrage senden';
  }
});

// Close success popup
popupClose.addEventListener('click', () => {
  popupOverlay.classList.remove('popup-overlay--visible');
  inquiryBtn.textContent = 'Anfrage gesendet';
});

popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.classList.remove('popup-overlay--visible');
  }
});

// ===== Header scroll effect =====
const header = document.getElementById('header');

function handleScroll() {
  if (window.scrollY > 60) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
}

window.addEventListener('scroll', handleScroll, { passive: true });

// ===== Mobile navigation =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('nav__menu--open');
  navToggle.classList.toggle('nav__toggle--active');
});

// Close menu on link click
navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('nav__menu--open');
    navToggle.classList.remove('nav__toggle--active');
  });
});

// ===== Scroll reveal animation =====
const revealElements = document.querySelectorAll(
  '.section__header, .about__text, .about__stats, .stat, .service-card, .philosophy__content, .value, .contact__info, .contact__form-wrapper'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ===== Contact form handling =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Simple validation
  if (!data.name || !data.email || !data.message) return;

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Wird gesendet...';
  btn.disabled = true;

  // Simulate sending (replace with real endpoint)
  setTimeout(() => {
    btn.textContent = 'Nachricht gesendet!';
    btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
    contactForm.reset();

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1000);
});

// ===== Active nav link highlight =====
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

    if (navLink && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav__link').forEach(l => l.style.color = '');
      navLink.style.color = 'var(--clr-gold)';
    }
  });
}

window.addEventListener('scroll', highlightNav, { passive: true });
