// Main JavaScript file
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  // Function to create overlay for images with data-overlay="true"
  const createImageOverlays = () => {
    const imagesWithOverlay = document.querySelectorAll(
      '.background-image[data-overlay="true"]'
    );

    imagesWithOverlay.forEach((img) => {
      // Create the overlay element
      const overlay = document.createElement("div");
      overlay.classList.add("image-overlay");

      // Get the parent element of the image
      const parent = img.parentElement;

      // Insert the overlay after the image
      parent.insertBefore(overlay, img.nextSibling);
    });
  };

  // Run the overlay function
  createImageOverlays();

  // Function to set ::before element width and position to match bar3
  const adjustTrayTitleBeforeElement = () => {
    // Get all bar elements that have a third div (representing bar3)
    const barElements = document.querySelectorAll(".bar");
    const trayTitles = document.querySelectorAll(".tray-title");

    if (!barElements.length || !trayTitles.length) return;

    // For each tray section, find the corresponding bar3 element and adjust the ::before width
    trayTitles.forEach((trayTitle) => {
      // Find the closest bar element in the same tray
      const trayContainer = trayTitle.closest(".tray");
      if (!trayContainer) return;

      const bar = trayContainer.querySelector(".bar");
      if (!bar) return;

      const bar3 = bar.querySelector("div:nth-child(3)");
      if (!bar3) return;

      // Get the dimensions and position of bar3
      const bar3Rect = bar3.getBoundingClientRect();
      const barRect = bar.getBoundingClientRect();

      // Calculate the width of bar3
      const bar3Width = bar3Rect.width;

      // Apply the styles using CSS custom properties
      trayTitle.style.setProperty("--bar3-width", `${bar3Width}px`);

      // Update on resize
      window.addEventListener("resize", () => {
        const updatedBar3Rect = bar3.getBoundingClientRect();
        const updatedBarRect = bar.getBoundingClientRect();

        trayTitle.style.setProperty(
          "--bar3-width",
          `${updatedBar3Rect.width}px`
        );
      });
    });
  };

  // Run the function on load and during resize
  adjustTrayTitleBeforeElement();
  window.addEventListener("resize", adjustTrayTitleBeforeElement);

  // Video Modal functionality - Multiple modals support
  // Get all play buttons with data-modal-target attribute
  const playButtons = document.querySelectorAll("button[data-modal-target]");

  // Set up each modal
  playButtons.forEach((button) => {
    // Get the target modal ID from the button's data-modal-target attribute
    const modalId = button.getAttribute("data-modal-target");
    const modal = document.getElementById(modalId);

    if (!modal) return;

    // Pre-position the dialog (even before opening)
    if (!modal.hasAttribute("open")) {
      modal.style.opacity = "0";
      modal.showModal();
      modal.close();
      modal.style.opacity = "1";
    }

    // Open modal when clicking the button
    button.addEventListener("click", () => {
      modal.showModal();
    });

    // Set up close button functionality
    const closeBtn = modal.querySelector("[data-close-modal]");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.close();
      });
    }

    // Close modal when clicking on backdrop (outside the modal content)
    modal.addEventListener("click", (e) => {
      const modalDimensions = modal.getBoundingClientRect();
      if (
        e.clientX < modalDimensions.left ||
        e.clientX > modalDimensions.right ||
        e.clientY < modalDimensions.top ||
        e.clientY > modalDimensions.bottom
      ) {
        modal.close();
      }
    });

    // Prevent clicks inside the modal from closing the modal
    const modalContent = modal.querySelector(".modal-content");
    if (modalContent) {
      modalContent.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  });
});
