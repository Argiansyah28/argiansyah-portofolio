/* ============================================================================
   Argiansyah Galih Permata — personal site
   No dependencies. Every animation runs on transform/opacity only, so the
   browser can keep it on the compositor and the page stays smooth on phones.
   ========================================================================== */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------ Reveal on scroll ---- */
  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    items.forEach(function (item) {
      stagger(item);
      observer.observe(item);
    });
  }

  /* Siblings inside the same grid fade in one after another. */
  function stagger(item) {
    var parent = item.parentElement;
    if (!parent) return;

    var siblings = Array.prototype.filter.call(parent.children, function (child) {
      return child.hasAttribute("data-reveal");
    });

    var index = siblings.indexOf(item);
    if (index > 0) item.style.setProperty("--delay", (index * 0.09).toFixed(2) + "s");
  }

  /* -------------------------------------------------- Hero entrance ----- */
  function initHeroEntrance() {
    var items = document.querySelectorAll("[data-enter]");

    items.forEach(function (item, index) {
      item.style.setProperty("--delay", (0.1 + index * 0.09).toFixed(2) + "s");
    });

    requestAnimationFrame(function () {
      items.forEach(function (item) { item.classList.add("is-visible"); });
    });
  }

  /* ------------------------------------- Progress bar + sticky header --- */
  function initScrollChrome() {
    var progress = document.getElementById("progress");
    var header = document.getElementById("header");
    var portrait = document.getElementById("portrait");
    var ticking = false;

    function update() {
      var scrolled = window.scrollY;
      var travel = document.documentElement.scrollHeight - window.innerHeight;

      progress.style.transform = "scaleX(" + (travel > 0 ? scrolled / travel : 0) + ")";
      header.classList.toggle("is-stuck", scrolled > 24);

      /* A little depth in the hero — desktop only, where there is room for it. */
      if (portrait && !prefersReducedMotion && window.innerWidth >= 1000) {
        var shift = Math.min(scrolled, window.innerHeight) * 0.07;
        portrait.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0)";
      } else if (portrait) {
        portrait.style.transform = "";
      }

      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });

    update();
  }

  /* ------------------------------------------------ Active nav link ----- */
  function initActiveLink() {
    var links = document.querySelectorAll(".nav__link");
    var sections = [];

    links.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      if (section) sections.push({ link: link, section: section });
    });
    if (!sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var match = sections.find(function (pair) { return pair.section === entry.target; });
        if (match) match.link.classList.toggle("is-active", entry.isIntersecting);
      });
    }, { rootMargin: "-45% 0px -45% 0px" });

    sections.forEach(function (pair) { observer.observe(pair.section); });
  }

  /* ---------------------------------------------------- Mobile menu ----- */
  function initMenu() {
    var burger = document.getElementById("burger");
    var nav = document.getElementById("nav");
    if (!burger || !nav) return;

    function close() {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }

    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.classList.contains("nav__link")) close();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });
  }

  /* ------------------------------------------------ Experience tabs ----- */
  function initExperience() {
    var tabs = document.querySelectorAll(".xp__tab");
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var panelId = tab.getAttribute("aria-controls");

        tabs.forEach(function (other) {
          var isMatch = other === tab;
          other.classList.toggle("is-active", isMatch);
          other.setAttribute("aria-selected", String(isMatch));

          var panel = document.getElementById(other.getAttribute("aria-controls"));
          if (panel) {
            panel.classList.toggle("is-active", isMatch);
            panel.hidden = !isMatch;
          }
        });

        /* Re-trigger the entrance animation on the panel that just opened. */
        var opened = document.getElementById(panelId);
        if (opened) {
          opened.style.animation = "none";
          void opened.offsetWidth;
          opened.style.animation = "";
        }
      });
    });
  }

  /* ------------------------------------------------------------ Boot ---- */
  document.getElementById("year").textContent = String(new Date().getFullYear());

  initMenu();
  initExperience();
  initActiveLink();
  initScrollChrome();
  initHeroEntrance();
  initReveal();
})();
