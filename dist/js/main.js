// Main JavaScript file
document.addEventListener("DOMContentLoaded", () => {
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

  // Video Modal functionality - Multiple modals support with accessibility enhancements
  // Get all play buttons with data-modal-target attribute
  const playButtons = document.querySelectorAll("button[data-modal-target]");

  // Keep track of last focused element before modal opened
  let lastFocusedElement = null;

  // Set up each modal
  playButtons.forEach((button) => {
    // Get the target modal ID from the button's data-modal-target attribute
    const modalId = button.getAttribute("data-modal-target");
    const modal = document.getElementById(modalId);

    if (!modal) return;

    // Add proper ARIA role and label
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");

    // Get modal title for aria-labelledby
    const modalTitle = modal.querySelector("h2");
    if (modalTitle) {
      const titleId = `${modalId}-title`;
      modalTitle.id = titleId;
      modal.setAttribute("aria-labelledby", titleId);
    }

    // Pre-position the dialog (even before opening)
    if (!modal.hasAttribute("open")) {
      modal.style.opacity = "0";
      modal.showModal();
      modal.close();
      modal.style.opacity = "1";
    }

    // Open modal when clicking the button
    button.addEventListener("click", () => {
      lastFocusedElement = document.activeElement;
      modal.showModal();

      // Focus the close button when modal opens
      const closeBtn = modal.querySelector("[data-close-modal]");
      if (closeBtn) {
        setTimeout(() => closeBtn.focus(), 50);
      }
    });

    // Set up close button functionality
    const closeBtn = modal.querySelector("[data-close-modal]");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.close();
        // Return focus to trigger button when modal closes
        if (lastFocusedElement) {
          lastFocusedElement.focus();
        }
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
        // Return focus to the button that opened the modal
        if (lastFocusedElement) {
          lastFocusedElement.focus();
        }
      }
    });

    // Handle escape key (native dialog behavior already supports this,
    // but we need to add focus management)
    modal.addEventListener("cancel", () => {
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    });

    // Note: The dialog element has some built-in focus management,
    // but we add this to ensure consistent behavior across browsers
    // This is a simplified version that just handles the edge cases
    modal.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // If shift+tab on first element, move to last
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
        // If tab on last element, move to first
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
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
