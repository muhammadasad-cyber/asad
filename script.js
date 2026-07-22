const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const typedTextEl = document.getElementById('typed-text');
const contactForm = document.querySelector('.contact-form');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));

const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
    themeToggle.setAttribute('aria-label', 'Toggle light mode');
  } else {
    body.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
  }
};

const toggleTheme = () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-label', isDark ? 'Toggle light mode' : 'Toggle dark mode');
};

if (typedTextEl) {
  typedTextEl.textContent = 'I am a cybersecurity student.';
}

menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('active');
});

themeToggle?.addEventListener('click', toggleTheme);

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameInput = contactForm.querySelector('input[name="name"]');
  const emailInput = contactForm.querySelector('input[name="email"]');
  const messageInput = contactForm.querySelector('textarea[name="message"]');
  const name = nameInput?.value?.trim() || 'there';
  const email = emailInput?.value?.trim() || '';
  const message = messageInput?.value?.trim() || '';
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  window.location.href = `mailto:muhammadasadmohana@gmail.com?subject=${subject}&body=${body}`;
});

initializeTheme();
