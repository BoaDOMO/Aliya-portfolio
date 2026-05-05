function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const body = document.body;
  menu.classList.toggle("open");
  icon.classList.toggle("open");
  body.classList.toggle("scroll-lock");
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Scroll-aware nav
(function () {
  const nav = document.getElementById("nav");
  if (!nav) return;
  function onScroll() {
    if (window.scrollY > 50) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// Nav active dot — mark current page link
(function () {
  const path = window.location.pathname;
  const filename = path.split("/").pop() || "index.html";
  document.querySelectorAll("#desktop-nav .nav-links a").forEach((link) => {
    const href = link.getAttribute("href").replace("./", "");
    if (filename === href || (!filename && href === "index.html")) {
      link.classList.add("nav-active");
    }
  });
})();

// Index hero — split name into animated letter spans
(function () {
  const heroName = document.querySelector(".page-hero .hero-name");
  if (!heroName) return;
  const text = heroName.textContent;
  heroName.textContent = "";
  let delay = 0.4;
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    if (char === " ") {
      span.className = "letter-span is-space";
      span.innerHTML = "&nbsp;";
    } else {
      span.className = "letter-span";
      span.textContent = char;
    }
    span.style.animationDelay = delay + "s";
    delay += 0.05;
    heroName.appendChild(span);
  });
})();

// Profile page — scroll-triggered animations
(function () {
  if (!document.querySelector("#skills")) return;

  // Section title headers
  const headerObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("scroll-visible");
          headerObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document
    .querySelectorAll(".profile-anim-header")
    .forEach((el) => headerObs.observe(el));

  // Skill items — stagger within each category card
  const skillObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll("li").forEach((li, i) => {
          li.classList.add("profile-anim-skill");
          li.style.transitionDelay = i * 50 + "ms";
          setTimeout(() => li.classList.add("scroll-visible"), i * 50);
        });
        skillObs.unobserve(e.target);
      });
    },
    { threshold: 0.2 }
  );
  document
    .querySelectorAll(".skill-category")
    .forEach((el) => skillObs.observe(el));

  // Timeline entries — stagger within each timeline block
  const timelineObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll(".profile-anim-entry").forEach((entry, i) => {
          setTimeout(() => entry.classList.add("scroll-visible"), i * 100);
        });
        timelineObs.unobserve(e.target);
      });
    },
    { threshold: 0.1 }
  );
  document
    .querySelectorAll(".experience-timeline")
    .forEach((el) => timelineObs.observe(el));
})();
