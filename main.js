document.addEventListener("DOMContentLoaded", () => {
  // Initial variables
  let lastScrollPosition = window.scrollY;
  let isScrolling = false;
  let stopScrollTimeout;
  let previousDirection = "none";
  let scrollAction = "none"; // Track current scroll action

  // Function to initialize the navbar in the default state
  function defaultNav() {
    console.log("defaultNav function is run");
    let nav_center = document.querySelector(".navbar-navigation_main");
    let navbar_logo_container = document.querySelector(
      ".navbar-logo-container"
    );

    if (
      navbar_logo_container &&
      navbar_logo_container.classList.contains("expand_center")
    ) {
      console.log("Class 'expand_center' is already added");
    }

    if (nav_center) {
      nav_center.classList.add("expand_main-navigation");
    }
    if (navbar_logo_container) {
      navbar_logo_container.classList.add("expand_center");
    }
  }
  defaultNav(); // Call defaultNav to initialize the navbar

  // Function to handle the animation when scrolling stops
  function startAnimation(lastDirection) {
    let navbar_left = document.querySelector(".navbar-left-content");
    let navbar_right = document.querySelector(".navbar-right-content");
    let nav_logo_container = document.querySelector(".navbar-logo-container");
    let nav_center = document.querySelector(".navbar-navigation_main");
    let currentScrollPosition = window.scrollY;

    if (navbar_left && navbar_right && nav_logo_container && nav_center) {
      // Ensure scroll position is non-negative
      if (currentScrollPosition < 0) {
        currentScrollPosition = 0;
      }

      let newScrollAction;

      // Determine the scroll action based on direction and position
      if (
        lastDirection === "up" &&
        currentScrollPosition >= -40 &&
        currentScrollPosition <= 40
      ) {
        newScrollAction = "scrolled to top up";
      } else if (
        lastDirection === "down" &&
        currentScrollPosition >= -40 &&
        currentScrollPosition <= 40
      ) {
        newScrollAction = "scrolled from top down";
      } else if (lastDirection === "up") {
        newScrollAction = "scrolled up in middle";
      } else if (lastDirection === "down") {
        newScrollAction = "scrolled down in middle";
      }

      // Check if the new action is the same as the current action
      if (newScrollAction === scrollAction) {
        console.log("Same scroll action detected, skipping animation.");
        return; // Skip animation if the action hasn't changed
      }

      // Update the scroll action
      scrollAction = newScrollAction;

      // Clear any existing animations by removing classes
      navbar_left.classList.remove(
        "slideIn-vertical_navside",
        "slideOut-vertical_navside"
      );
      navbar_right.classList.remove(
        "slideIn-vertical_navside",
        "slideOut-vertical_navside"
      );
      nav_center.classList.remove(
        "slideIn_center-text",
        "slideOut_center-text"
      );
      nav_logo_container.classList.remove(
        "slideIn_center",
        "slideOut_center",
        "shrink_center",
        "expand_center"
      );
      nav_center.classList.remove(
        "shrink_main-navigation",
        "expand_main-navigation"
      );

      // Use setTimeout to ensure the class changes are rendered correctly
      setTimeout(() => {
        if (scrollAction === "scrolled to top up") {
          navbar_left.classList.add("slideOut-vertical_navside");
          navbar_right.classList.add("slideOut-vertical_navside");
          nav_center.classList.add("slideOut_center-text");
          nav_logo_container.classList.add("expand_center");
          nav_center.classList.add("expand_main-navigation");
          console.log("1: Scrolled to top and up");
        } else if (scrollAction === "scrolled from top down") {
          navbar_left.classList.add("slideIn-vertical_navside");
          navbar_right.classList.add("slideIn-vertical_navside");
          nav_center.classList.add("slideIn_center", "slideIn_center-text");
          nav_logo_container.classList.add("shrink_center");
          nav_center.classList.add("shrink_main-navigation");
          console.log("2: Scrolled from top and down");
        } else if (scrollAction === "scrolled up in middle") {
          navbar_left.classList.add("slideOut-vertical_navside");
          navbar_right.classList.add("slideOut-vertical_navside");
          nav_center.classList.add("slideOut_center-text");
          console.log("3: Scrolled up in the middle");
        } else if (scrollAction === "scrolled down in middle") {
          navbar_left.classList.add("slideIn-vertical_navside");
          navbar_right.classList.add("slideIn-vertical_navside");
          nav_center.classList.add("slideIn_center");
          console.log("4: Scrolled down in the middle");
        }
      }, 0); // Using a delay of 0 to ensure the browser renders the initial state before animating
    } else {
      console.log("One or more navbar elements are not found in the DOM.");
    }
  }

  // Function to track the scroll direction
  function getScrollDirection() {
    const currentScrollPosition = window.scrollY;
    let direction = "none";

    if (currentScrollPosition > lastScrollPosition) {
      direction = "down";
    } else if (currentScrollPosition < lastScrollPosition) {
      direction = "up";
    }

    lastScrollPosition = currentScrollPosition;
    return direction;
  }

  // Function to start scroll tracking
  function startScrollTracking() {
    clearTimeout(stopScrollTimeout);

    const direction = getScrollDirection();

    if (direction !== previousDirection) {
      previousDirection = direction;
      isScrolling = true;
      console.log("Scroll direction changed to:", direction);
    } else {
      console.log("Scroll direction remains the same:", direction);
    }

    stopScrollTimeout = setTimeout(() => {
      isScrolling = false;
      console.log(
        "No scroll activity detected for 400ms. Triggering animation."
      );
      startAnimation(previousDirection);
    }, 200);
  }

  window.addEventListener("scroll", () => {
    startScrollTracking();
  });

  // intersection listeners

  function default_Hero_text() {
    let hero_header = document.querySelector(".hero-header");
    let hero_promotion = documnet.querySelector(".hero-promotion");

    hero_promotion.classList.add("slideIn_hero_sub_text");
    hero_header.classList.add("slideIn_vertical_text");
  }
  default_Hero_text();
  const teaser_tile_container_one = document.querySelector('.innovation-small__container');
  const teaser_tile_container_two = document.querySelector('.vehicles-small__container');
  const teaser_tile_container_three = document.querySelector('.innovation-large__container');
  const teaser_tile_container_four = document.querySelector('.art-extra-large__container');
  const teaser_tile_container_five = document.querySelector('.zeitgeist-medium__container');
  
  // Intersection Observer options
  const teaser_tile_options = {
    root: null, // Using null to observe relative to the viewport
    rootMargin: "0px",
    threshold: 0 // Trigger when any part of the element is visible
  };
  
  // Callback function for intersection
  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("Element is in view:", entry.target);
        // Add any actions you want to perform when the element is in view
        entry.target.classList.add("in-view"); // Example: Add a class for animation
  
        // Select child elements and add the class
        const image_wrappers = entry.target.querySelectorAll('.teaser-tile-image-wrapper');
        image_wrappers.forEach(image => {
          image.classList.add('imageReveal_image');
        });
      }
    });
  }
  
  // Create the Intersection Observer
  const observer = new IntersectionObserver(handleIntersection, teaser_tile_options);
  
  // Observe each teaser tile container
  const teaserTiles = [
    teaser_tile_container_one,
    teaser_tile_container_two,
    teaser_tile_container_three,
    teaser_tile_container_four,
    teaser_tile_container_five
  ];
  
  teaserTiles.forEach(tile => {
    if (tile) {
      observer.observe(tile);
    }
  });
});  