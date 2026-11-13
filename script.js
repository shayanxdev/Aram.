
const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");
const mainContent = document.getElementById("mainContent");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");
const progressBar = document.querySelector(".scroll-progress");
const cursorGlow = document.querySelector(".cursor-glow");

let isPlaying = false;

/* Enter the website */
enterBtn.addEventListener("click", () => {
  intro.classList.add("is-leaving");
  mainContent.classList.remove("is-hidden");

  setTimeout(() => {
    intro.style.display = "none";
    revealObserver.observeAll?.();
    document.querySelectorAll(".reveal").forEach(el => {
      revealObserver.observe(el);
    });
  }, 900);

  createParticles(window.innerWidth / 2, window.innerHeight / 2, 28);
});

/* Scroll reveal */
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(el => {
  revealObserver.observe(el);
});

/* Cursor glow */
window.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

/* Scroll progress */
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
});

/* Music */
musicBtn.addEventListener("click", async () => {
  if (!isPlaying) {
    try {
      await music.play();
      isPlaying = true;
      musicBtn.classList.add("is-playing");
      musicLabel.textContent = "در حال پخش";
    } catch (error) {
      showToast("فایل موسیقی رو داخل پوشه assets قرار بده 🎵");
    }
  } else {
    music.pause();
    isPlaying = false;
    musicBtn.classList.remove("is-playing");
    musicLabel.textContent = "موسیقی";
  }
});

/* Memory cards */
const memoryModal = document.getElementById("memoryModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

document.querySelectorAll(".memory-card").forEach(card => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modalText.textContent = card.dataset.text;
    openModal(memoryModal);
  });
});

/* Letter */
const letterModal = document.getElementById("letterModal");

document.getElementById("openLetter").addEventListener("click", () => {
  openModal(letterModal);
});

/* Modal controls */
function openModal(modal) {
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
}

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", (event) => {
    if (event.target.dataset.close === "true") {
      closeModal(modal);
    }
  });
});

document.querySelectorAll(".modal-close").forEach(button => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal.is-open").forEach(closeModal);
  }
});

/* Wish button */
document.getElementById("wishBtn").addEventListener("click", (event) => {
  createParticles(event.clientX || window.innerWidth / 2,
                  event.clientY || window.innerHeight / 2, 65);
  showToast("آرزوت رو به دنیا بسپار، آرام ✨");
});

/* Particle effect */
function createParticles(x, y, amount = 20) {
  const symbols = ["♥", "♡", "✦", "✧", "✳"];

  for (let i = 0; i < amount; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 220;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.fontSize = `${10 + Math.random() * 20}px`;
    particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 3000);
  }
}

/* Toast message */
let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

/* Tiny floating hearts */
function createAmbientHeart() {
  if (document.hidden || intro.style.display !== "none") return;

  const heart = document.createElement("span");
  heart.className = "particle";
  heart.textContent = Math.random() > .5 ? "♡" : "✦";
  heart.style.left = `${Math.random() * window.innerWidth}px`;
  heart.style.top = `${window.innerHeight + 10}px`;
  heart.style.setProperty("--x", `${Math.random() * 100 - 50}px`);
  heart.style.setProperty("--y", `${-window.innerHeight - 100}px`);
  heart.style.opacity = ".5";

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 3000);
}

setInterval(createAmbientHeart, 1800);
