document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section");
  const parallaxBg = document.querySelector(".parallax-bg");

  // Create stars for hero section
  createHeroStars();
  createStarfield();

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
  setupScrollAnimations();
  setupFactCards();

  // Set up event listeners
  window.addEventListener("scroll", checkVisibility);
  window.addEventListener("resize", checkVisibility);

  function createHeroStars() {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const starCount = 30;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "hero-star";

      // Random positioning
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = 1 + Math.random() * 3;
      const delay = Math.random() * 5;
      const duration = 3 + Math.random() * 7;

      star.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
      `;

      hero.appendChild(star);
    }
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

  function setupSliders() {
    const sliders = document.querySelectorAll(".slider-container");

    sliders.forEach((slider) => {
      const track = slider.querySelector(".slider-track");
      const items = Array.from(track.querySelectorAll(".slider-item"));
      const textSlides = Array.from(
        slider.closest(".section-content").querySelectorAll(".text-slide")
      );
      let currentIndex = 0;

      // Initialize
      items.forEach((item, index) => {
        if (index === currentIndex) {
          item.classList.add("active");
          item.classList.remove("inactive");
          if (textSlides[index]) {
            textSlides[index].classList.add("active");
            textSlides[index].classList.remove("inactive");
          }
        } else {
          item.classList.add("inactive");
          item.classList.remove("active");
          if (textSlides[index]) {
            textSlides[index].classList.add("inactive");
            textSlides[index].classList.remove("active");
          }
        }
      });

      // Auto-rotate every 5 seconds
      setInterval(() => {
        items[currentIndex].classList.remove("active");
        items[currentIndex].classList.add("inactive");
        if (textSlides[currentIndex]) {
          textSlides[currentIndex].classList.remove("active");
          textSlides[currentIndex].classList.add("inactive");
        }

        currentIndex = (currentIndex + 1) % items.length;

        items[currentIndex].classList.remove("inactive");
        items[currentIndex].classList.add("active");
        if (textSlides[currentIndex]) {
          textSlides[currentIndex].classList.remove("inactive");
          textSlides[currentIndex].classList.add("active");
        }
      }, 5000);
    });
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
        // Reset animation state
        resetSectionAnimation(section);
      }
    });
  }

  function resetSectionAnimation(section) {
    // Remove and re-add classes to trigger animations
    section.classList.remove("show");
    void section.offsetWidth; // Trigger reflow
    section.classList.add("show");

    // Reset specific elements
    const items = section.querySelectorAll(
      ".importance-item, .credit-card, .fact-card"
    );
    items.forEach((item) => {
      item.classList.remove("show");
      void item.offsetWidth;
      setTimeout(() => {
        item.classList.add("show");
      }, 100);
    });
  }
  function setupFactCards() {
    document.querySelectorAll(".fact-card").forEach((card) => {
      card.addEventListener("click", function () {
        // First flip back all other cards
        document.querySelectorAll(".fact-card").forEach((otherCard) => {
          if (otherCard !== this) otherCard.classList.remove("flipped");
        });

        // Then toggle this card
        this.classList.toggle("flipped");
      });
    });
  }

  // Helper function to handle card click
  function handleCardClick() {
    this.classList.toggle("flipped");
  }

  // Add hover effect for sections
  document.querySelectorAll("section.spiral-3d").forEach((section) => {
    section.addEventListener("mouseenter", function () {
      this.style.transform = "rotateY(1deg) rotateZ(0deg) translateZ(10px)";
      this.style.boxShadow = "0 50px 80px rgba(36, 80, 54, 0.3)";
      this.style.zIndex = "4";
    });

    section.addEventListener("mouseleave", function () {
      if (this.classList.contains("show")) {
        this.style.transform = "rotateY(0) rotateZ(0) translateZ(0)";
        this.style.boxShadow = "0 30px 60px rgba(36, 80, 54, 0.12)";
        this.style.zIndex = "1";
      }
    });
  });
});
