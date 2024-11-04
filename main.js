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
    let hero_promotion = document.querySelector(".hero-promotion");

    hero_promotion.classList.add("slideIn_hero_sub_text");
    hero_header.classList.add("slideIn_vertical_text");
  }
  default_Hero_text();


  const teaser_tile_container_one = document.querySelector('.innovation-small__container');
  const teaser_tile_container_two = document.querySelector('.vehicles-small__container');
  const teaser_tile_container_three = document.querySelector('.innovation-large__container');
  const teaser_tile_container_four = document.querySelector('.art-extra-large__container');
  const teaser_tile_container_five = document.querySelector('.zeitgeist-medium__container');
  const magazine_image_container = document.querySelector('.editorial-magazine-image-wrapper');
  
  const teaserTiles = [
    teaser_tile_container_one,
    teaser_tile_container_two,
    teaser_tile_container_three,
    teaser_tile_container_four,
    teaser_tile_container_five
  ];
  
  // Intersection Observer options
  const teaser_tile_Image_options = {
    root: null, // Using null to observe relative to the viewport
    rootMargin: "0px",
    threshold: 0 // Trigger when any part of the element is visible
  };
  
//  Intersection Observer option for magazine image
  const magazineImage_option = {
    root: null,
    rootMargin: '0px',
    threshold: 0
  };

  // Callback function for intersection
  function handle_teaserTiles_Intersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image_wrapper = entry.target.querySelector('.teaser-tile-image-wrapper');
        const header_text_container = entry.target.querySelector('.teaser-tiles-header');
        const header_text = header_text_container.querySelector('span');
        const sub_text = entry.target.querySelector('.teaser-tiles-subtext');
        sub_text.classList.add('teaser_tiles_sub_text');
        header_text_container.classList.add('teaser_tiles_header_text');
        if (image_wrapper) {
            console.log('this is not found');
        }
        image_wrapper.classList.add('imageReveal_image');
      }
    });
  }
  
  function handle_magazineImage_Intersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
          magazine_image_container.classList.add('imageReveal_image');
        }
      });
  }

  const magazine_text_wrapper = document.querySelector('.editorial-text-wrapper');

  function handle_magazineText_Intersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
          const editorial_magazine = entry.target.querySelector('.editorial-magazine');
          const editorial_magazine_header = entry.target.querySelector('.editorial-header-text');
          const editorial_magazine_information = entry.target.querySelector('.editorial-more-information-wrapper');
          editorial_magazine.classList.add('teaser_tiles_sub_text');
          editorial_magazine_header.classList.add('teaser_tiles_header_text');
          editorial_magazine_information.classList.add('slideIn_hero_sub_text');
        }
      });
  }


  // Create the Intersection Observer
  const teaserTiles_observer = new IntersectionObserver(handle_teaserTiles_Intersection, teaser_tile_Image_options);
  const magazineImage_observer = new IntersectionObserver(handle_magazineImage_Intersection, magazineImage_option);
  const magazineText_observer = new IntersectionObserver(handle_magazineText_Intersection, magazineImage_option);
//   Observe each teaser tile container
  teaserTiles.forEach(tile => {
    if (tile) {
        teaserTiles_observer.observe(tile);
    }
  });
  magazineImage_observer.observe(magazine_image_container);
  magazineText_observer.observe(magazine_text_wrapper);

  const social_media_content_wrapper = document.querySelector('.social-media-box-content-wrapper');
  function handle_socialMedia_Intersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
          const social_media_header = entry.target.querySelector('.social-media-header');
            if (social_media_header) {
                console.log('this recorded');
            }
          const social_media_icons = entry.target.querySelector('.social-media-icons');
          if (social_media_icons) {
            console.log('this recorded');
        }
          social_media_header.classList.add('slideIn-vertical_text');
          social_media_icons.classList.add('fadeIn_icon');
        }
      });
  }
  const socialMedia_observer = new IntersectionObserver(handle_socialMedia_Intersection, magazineImage_option);
  socialMedia_observer.observe(social_media_content_wrapper);
});

  