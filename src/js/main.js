// Main JavaScript file
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

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

  // Video Modal functionality
  const openModalBtn = document.getElementById("openModal");
  const closeModalBtn = document.getElementById("closeModal");
  const modal = document.getElementById("myModal");

  if (openModalBtn && closeModalBtn && modal) {
    // Pre-position the dialog (even before opening)
    if (!modal.hasAttribute("open")) {
      modal.style.opacity = "0";
      modal.showModal();
      modal.close();
      modal.style.opacity = "1";
    }

    openModalBtn.addEventListener("click", () => {
      modal.showModal();
    });

    closeModalBtn.addEventListener("click", () => {
      modal.close();
    });

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
  }
});
