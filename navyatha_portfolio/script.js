// Portfolio interactions: mobile navigation, reveal-on-scroll, and current year.
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}


// Contact form opens the visitor's email app with the entered details.
const contactForm = document.querySelector("#contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const note = document.querySelector("#formNote");
    if (note) note.textContent = "Opening your email app… Please send the email from there.";
    window.location.href = `mailto:navyatharameswarapu4@gmail.com?subject=${subject}&body=${body}`;
  });
}


// Flip certificate cards to show the uploaded certificate image on the reverse.
document.querySelectorAll(".certificate-flip").forEach((card) => {
  card.addEventListener("click", () => {
    const flipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(flipped));
  });
});


// Optional light/dark theme switch; no saved preference is required.
const themeToggle = document.querySelector('#themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    themeToggle.textContent = isLight ? '☾' : '☼';
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  });
}

// Click a certificate image on the reverse to view it at full size.
const certificateLightbox = document.querySelector('#certificateLightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxClose = document.querySelector('#lightboxClose');
function closeCertificateLightbox() {
  if (!certificateLightbox) return;
  certificateLightbox.hidden = true;
  if (lightboxImage) lightboxImage.src = '';
  document.body.style.overflow = '';
}
document.querySelectorAll('.certificate-back img').forEach((image) => {
  image.addEventListener('click', (event) => {
    event.stopPropagation();
    if (!certificateLightbox || !lightboxImage) return;
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    certificateLightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});
if (lightboxClose) lightboxClose.addEventListener('click', closeCertificateLightbox);
if (certificateLightbox) certificateLightbox.addEventListener('click', (event) => {
  if (event.target === certificateLightbox) closeCertificateLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeCertificateLightbox();
});
