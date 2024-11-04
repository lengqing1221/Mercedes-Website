document.addEventListener("DOMContentLoaded", () => {
    // Initial variables
    let lastScrollPosition = window.scrollY;
    let isScrolling = false;
    let stopScrollTimeout;
    let previousDirection = "none";
  
    // Function to initialize the navbar in the default state
    function defaultNav() {
      console.log("defaultNav function is run");
      let nav_center = document.querySelector(".navbar-navigation_main");
      let navbar_logo_container = document.querySelector(".navbar-logo-container");
  
      // Check if the class 'expand_center' is already added
      if (navbar_logo_container.classList.contains("expand_center")) {
        console.log("Class 'expand_center' is already added");
      }
  
      // Add in the default navbar animations
      if (nav_center) {
        nav_center.classList.add("expand_main-navigation");
      }
      if (navbar_logo_container) {
        navbar_logo_container.classList.add("expand_center");
      }
    }

    function startAnimation() {
        let navbar_left = document.querySelector(".navbar-left-content");
        let navbar_right = document.querySelector(".navbar-right-content");
        let nav_logo_container = document.querySelector(".navbar-logo-container");
        let nav_center = document.querySelector(".navbar-navigation_main");
        let currentScrollPosition = window.scrollY; // Fix: Do not use 'const' if you plan to reassig
  
  
        // Set scroll always to positive
        if (currentScrollPosition < 0) {
          currentScrollPosition = 0;
        }
        
        
        navbar_left.classList.remove("slideOut-vertical_navside");
        navbar_right.classList.remove("slideOut-vertical_navside");
        nav_center.classList.remove("slideIn_center");
  
        navbar_left.classList.add("slideIn-vertical_navside");
        navbar_right.classList.add("slideIn-vertical_navside");
        nav_center.classList.add("slideOut_center");
        if (nav_center.classList.contains('slideOut_center')) {
            console.log('this class is added');
        }
    }
    startAnimation();
    });