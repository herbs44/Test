// Mobile-Navigation umschalten
const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector(".nav__menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  // Menü nach Klick auf einen Link schließen
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Abschnitte beim Scrollen sanft einblenden
const revealTargets = document.querySelectorAll(
  ".section__head, .prose, .card-grid, .species-list, .ocean-grid, .extinct-row, .ocean-note, .quote, .stats__item"
);
revealTargets.forEach((el) => el.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}

// Zahlen in den Fakten hochzählen
const counters = document.querySelectorAll(".stats__num[data-count]");
const formatNum = (n) => n.toLocaleString("de-DE");

const runCounter = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.textContent.includes("+") ? "+" : "";
  const duration = 1400;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatNum(Math.round(target * eased)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

if ("IntersectionObserver" in window) {
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => statObserver.observe(el));
}

/* ---------- 3D-Effekte ---------- */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (!reduceMotion && finePointer) {
  // Maus-gesteuerter 3D-Tilt der Karten
  const MAX_TILT = 9; // Grad
  const tiltCards = document.querySelectorAll(
    ".island-card, .bird-card, .ocean-card, .extinct-card, .species"
  );

  tiltCards.forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotY = (px - 0.5) * 2 * MAX_TILT;
      const rotX = (0.5 - py) * 2 * MAX_TILT;
      card.classList.add("tilt--active");
      card.style.transform =
        `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
    });

    const reset = () => {
      card.classList.remove("tilt--active");
      card.style.transform = "";
    };
    card.addEventListener("pointerleave", reset);
    card.addEventListener("blur", reset, true);
  });

  // Parallax der Hero-Ebenen anhand der Mausposition
  const layers = document.querySelectorAll(".hero__layer");
  const hero = document.querySelector(".hero");
  if (hero && layers.length) {
    hero.addEventListener("pointermove", (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth || "30");
        layer.style.transform =
          `translate3d(${-cx * depth}px, ${-cy * depth}px, 0)`;
      });
    });
    hero.addEventListener("pointerleave", () => {
      layers.forEach((layer) => (layer.style.transform = ""));
    });
  }
}
