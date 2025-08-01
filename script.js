document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section");
  const parallaxBg = document.querySelector(".parallax-bg");

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Initialize all components
  setupSliders();
  createStarfield();
  setupScrollAnimations();

  // Initial check in case some elements are already visible
  checkVisibility();

  // Set up event listeners
  window.addEventListener("scroll", checkVisibility);
  window.addEventListener("resize", checkVisibility);

  function setupSliders() {
    const sliders = document.querySelectorAll(".slider-track");

    sliders.forEach((slider) => {
      const items = Array.from(slider.querySelectorAll(".slider-item"));
      let currentIndex = 0;

      // Show first item
      if (items.length > 0) {
        items[0].classList.add("active");
        items[0].classList.remove("inactive");
      }

      // Hide other items
      for (let i = 1; i < items.length; i++) {
        items[i].classList.add("inactive");
        items[i].classList.remove("active");
      }

      // Auto-rotate every 5 seconds
      setInterval(() => {
        items[currentIndex].classList.remove("active");
        items[currentIndex].classList.add("inactive");

        currentIndex = (currentIndex + 1) % items.length;

        items[currentIndex].classList.remove("inactive");
        items[currentIndex].classList.add("active");
      }, 5000);
    });
  }

  function createStarfield() {
    const starLayer = document.querySelector(".thankyou-bg-starfield");
    if (!starLayer) return;

    let html = "";
    const starCount = 75;

    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 110;
      const size = 1 + Math.random() * 2.2;
      const duration = 2 + Math.random() * 6;
      const delay = Math.random() * 6;

      html += `
        <div class="star" style="
          left:${x}vw;
          top:${y}vh;
          width:${size}px;
          height:${size}px;
          animation-delay:${delay}s;
          animation-duration:${duration}s;
        "></div>
      `;
    }

    starLayer.innerHTML = html;
  }

  function setupScrollAnimations() {
    // Hero section is always visible
    document.getElementById("hero").classList.add("show");
  }

  function checkVisibility() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    // Parallax background effect
    if (parallaxBg) {
      parallaxBg.style.transform = `translateY(${scrollY * 0.19}px)`;
    }

    // Check section visibility
    sections.forEach((section) => {
      if (section.id === "hero") return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const triggerPoint = windowHeight * 0.75;

      if (
        scrollY > sectionTop - triggerPoint &&
        scrollY < sectionTop + sectionHeight - triggerPoint
      ) {
        section.classList.add("show");

        // Special handling for importance items
        if (section.id === "importance") {
          const items = section.querySelectorAll(".importance-item");
          items.forEach((item, index) => {
            setTimeout(() => {
              if (isElementInViewport(item)) {
                item.classList.add("show");
              }
            }, index * 150);
          });
        }

        // Special handling for credit cards
        if (section.id === "credits") {
          const cards = section.querySelectorAll(".credit-card");
          cards.forEach((card, index) => {
            setTimeout(() => {
              if (isElementInViewport(card)) {
                card.classList.add("show");
              }
            }, index * 200);
          });
        }

        // Special handling for fact cards
        if (section.id === "fun-facts") {
          const cards = section.querySelectorAll(".fact-card");
          cards.forEach((card, index) => {
            setTimeout(() => {
              if (isElementInViewport(card)) {
                card.classList.add("show");
              }
            }, index * 200);
          });
        }
      }
    });
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
});
