const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const themeToggle = document.getElementById('themeToggle');
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

navToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light');
  themeToggle.textContent = '☀️';
} else {
  themeToggle.textContent = '🌙';
}

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const lightMode = document.body.classList.contains('light');
  localStorage.setItem('theme', lightMode ? 'light' : 'dark');
  themeToggle.textContent = lightMode ? '☀️' : '🌙';
});

function setError(field, message) {
  const error = document.querySelector(`[data-error-for="${field}"]`);
  if (error) error.textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.error').forEach(el => {
    el.textContent = '';
  });
  formStatus.textContent = '';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  clearErrors();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  let valid = true;

  if (!name) {
    setError('name', 'Please enter your name.');
    valid = false;
  }

  if (!email) {
    setError('email', 'Please enter your email.');
    valid = false;
  } else if (!validateEmail(email)) {
    setError('email', 'Please enter a valid email address.');
    valid = false;
  }

  if (!message) {
    setError('message', 'Please enter a message.');
    valid = false;
  } else if (message.length < 10) {
    setError('message', 'Message should be at least 10 characters.');
    valid = false;
  }

  if (!valid) {
    formStatus.textContent = 'Please fix the highlighted fields and try again.';
    return;
  }

  formStatus.textContent = 'Form submitted successfully. Connect a backend or form service to receive messages live.';
  form.reset();
});
