function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const body = document.body;
  const isOpen = menu.classList.contains("open");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
  body.classList.toggle("scroll-lock");
  let overlay = document.getElementById("hamburgerOverlay");
  if (!isOpen) {
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "hamburgerOverlay";
      document.body.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add("active"));
    } else {
      overlay.classList.add("active");
    }
    overlay.onclick = function () {
      toggleMenu();
    };
  } else {
    if (overlay) overlay.classList.remove("active");
  }
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
document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  const filename = path.split("/").pop() || "index.html";
  document.querySelectorAll("#desktop-nav .nav-links a, .menu-links a").forEach(function (link) {
    const href = link.getAttribute("href").replace("./", "");
    if (filename === href || (!filename && href === "index.html")) {
      link.classList.add("nav-active");
    }
  });
});

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

// Back-to-top button with progress ring
(function () {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  const size = 44, stroke = 2.5;
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 " + size + " " + size);
  svg.setAttribute("class", "btt-ring");
  const bg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  bg.setAttribute("cx", size / 2);
  bg.setAttribute("cy", size / 2);
  bg.setAttribute("r", r);
  bg.setAttribute("fill", "none");
  bg.setAttribute("stroke", "currentColor");
  bg.setAttribute("stroke-width", stroke * 0.6 + "");
  bg.setAttribute("opacity", "0.15");
  const fg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  fg.setAttribute("id", "bttRingFg");
  fg.setAttribute("cx", size / 2);
  fg.setAttribute("cy", size / 2);
  fg.setAttribute("r", r);
  fg.setAttribute("fill", "none");
  fg.setAttribute("stroke", "currentColor");
  fg.setAttribute("stroke-width", stroke + "");
  fg.setAttribute("stroke-linecap", "round");
  fg.setAttribute("stroke-dasharray", circ + "");
  fg.setAttribute("stroke-dashoffset", circ + "");
  fg.setAttribute("transform", "rotate(-90 " + size / 2 + " " + size / 2 + ")");
  svg.appendChild(bg);
  svg.appendChild(fg);
  btn.insertBefore(svg, btn.firstChild);
  function update() {
    var scrollTop = window.scrollY;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docH > 0 ? scrollTop / docH : 0;
    btn.classList.toggle("visible", scrollTop > 300);
    fg.setAttribute("stroke-dashoffset", circ - pct * circ + "");
  }
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

// Neural links effect for Lab hero
(function () {
  const canvas = document.getElementById("neuralCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let particles = [];
  const particleCount = window.innerWidth < 700 ? 40 : 100;
  const connectionDistance = 150;
  const mouse = { x: null, y: null, radius: 150 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }
    draw() {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(38, 66, 139, 0.5)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
      p.update();
      p.draw();

      for (let j = index; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
          var baseColor = isDark ? "255, 255, 255" : "38, 66, 139";
          ctx.strokeStyle = `rgba(${baseColor}, ${1 - distance / connectionDistance})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(animate);
  }

  resize();
  init();
  animate();
  window.addEventListener("resize", () => {
    resize();
    init();
  });
})();

// ── Event Listener Wiring ──
(function () {
  document.addEventListener('DOMContentLoaded', function () {

    // Hamburger toggle
    document.querySelectorAll('.hamburger-icon').forEach(function (el) {
      el.addEventListener('click', toggleMenu);
    });

    // Menu links close on click
    document.querySelectorAll('.menu-links a').forEach(function (el) {
      el.addEventListener('click', toggleMenu);
    });

    // Experience toggle
    var expBtn = document.getElementById('experienceToggleBtn');
    if (expBtn) {
      expBtn.addEventListener('click', function () {
        var extra = document.getElementById('experienceExtra');
        var btn = document.getElementById('experienceToggleBtn');
        var isOpen = extra.classList.toggle('open');
        btn.classList.toggle('open');
        btn.innerHTML = isOpen
          ? 'Show less <i class="fa-solid fa-chevron-down"></i>'
          : 'View all experiences <i class="fa-solid fa-chevron-down"></i>';
      });
    }

    // Hero buttons — View Profile, Get in Touch
    document.querySelectorAll('.hero-btn').forEach(function (el) {
      el.addEventListener('click', function () {
        var href = el.getAttribute('data-href');
        if (href) window.location.href = href;
      });
    });

    // Lab CTA buttons
    document.querySelectorAll('.btn-cta').forEach(function (el) {
      el.addEventListener('click', function () {
        var href = el.getAttribute('data-href');
        if (href) window.location.href = href;
      });
    });
  });
})();
