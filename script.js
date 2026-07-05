const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const typedTextEl = document.getElementById('typed-text');
const phrases = [
  'Cybersecurity Professional.',
  'Ethical Hacking Advocate.',
  'Security-conscious Developer.'
];
let phraseIndex = 0;
let charIndex = 0;

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

const typeText = () => {
  const currentPhrase = phrases[phraseIndex];
  if (charIndex < currentPhrase.length) {
    typedTextEl.textContent += currentPhrase.charAt(charIndex);
    charIndex += 1;
    setTimeout(typeText, 90);
  } else {
    setTimeout(eraseText, 1500);
  }
};

const eraseText = () => {
  const currentPhrase = phrases[phraseIndex];
  if (charIndex > 0) {
    typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex -= 1;
    setTimeout(eraseText, 40);
  } else {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeText, 500);
  }
};

menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('active');
});

themeToggle?.addEventListener('click', toggleTheme);

initializeTheme();
setTimeout(typeText, 800);
