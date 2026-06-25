/* ==========================================
   PRATIKSHA KHOBRAGADE — PORTFOLIO SCRIPT
========================================== */

// ---- 1. TYPEWRITER EFFECT ----
const phrases = [
  "Frontend Development",
  "Backend Development",
  "Full Stack Web Development",
  "Problem Solving"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typewriter");

function typeWriter() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    // Typing forward
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      // Pause at end before deleting
      isDeleting = true;
      setTimeout(typeWriter, 1600);
      return;
    }
    // Human-like speed: slightly random
    setTimeout(typeWriter, 70 + Math.random() * 40);

  } else {
    // Deleting
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      // Small pause before typing next phrase
      setTimeout(typeWriter, 400);
      return;
    }
    // Delete a bit faster
    setTimeout(typeWriter, 40 + Math.random() * 20);
  }
}

// Start after hero animations settle
setTimeout(typeWriter, 1400);


// ---- 2. NAVBAR SCROLL EFFECT + ACTIVE LINK ----
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  // Sticky shadow
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active link highlight based on scroll position
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});


// ---- 3. HAMBURGER MENU ----
const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinksContainer.classList.toggle("open");
  hamburger.classList.toggle("active");
});

// Close menu when a link is clicked
navLinksContainer.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("open");
    hamburger.classList.remove("active");
  });
});


// ---- 4. SCROLL REVEAL (fade-in elements) ----
const fadeEls = document.querySelectorAll(".fade-in");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Once visible, stop observing
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: "0px 0px -40px 0px"
});

fadeEls.forEach(el => revealObserver.observe(el));


// ---- 5. ANIMATED DOTS CANVAS (hero background) ----
const canvas = document.getElementById("dotsCanvas");
const ctx = canvas.getContext("2d");

let dots = [];
const DOT_COUNT = 75;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function createDots() {
  dots = [];
  for (let i = 0; i < DOT_COUNT; i++) {
    dots.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.9,
      r: Math.random() * 4 + 3,
    });
  }
}

function drawDots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw connecting lines
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 130) {
        const alpha = (1 - dist / 130) * 0.5;
        ctx.strokeStyle = `rgba(68, 87, 109, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.stroke();
      }
    }
  }

  // Draw dots
  dots.forEach(dot => {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(22, 203, 239, 0.5)";
    ctx.fill();

    // Move
    dot.x += dot.vx;
    dot.y += dot.vy;

    // Bounce off edges
    if (dot.x < 0 || dot.x > canvas.width)  dot.vx *= -1;
    if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
  });

  requestAnimationFrame(drawDots);
}

resizeCanvas();
createDots();
drawDots();

window.addEventListener("resize", () => {
  resizeCanvas();
  createDots();
});


// ---- 6. PROFILE PHOTO FALLBACK ----
// If the photo fails to load, show the fallback icon
const profilePhoto = document.getElementById("profilePhoto");
const profileFallback = document.getElementById("profileFallback");

if (profilePhoto) {
  profilePhoto.addEventListener("error", () => {
    profilePhoto.style.display = "none";
    profileFallback.style.display = "flex";
  });
}


// ---- 7. CONTACT FORM HANDLER ----
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector("button[type='submit']");
  const originalText = btn.innerHTML;

  btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
  btn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = "";
    btn.disabled = false;
    e.target.reset();
  }, 3000);
}


// ---- 8. SMOOTH SCROLL for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});