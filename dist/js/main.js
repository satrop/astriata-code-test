// Main JavaScript file
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  // Example function
  const updateDateTime = () => {
    const now = new Date();
    const dateTimeElement = document.createElement("div");
    dateTimeElement.classList.add("datetime");
    dateTimeElement.textContent = `Current time: ${now.toLocaleString()}`;

    // Check if element already exists and update or append
    const existing = document.querySelector(".datetime");
    if (existing) {
      existing.textContent = dateTimeElement.textContent;
    } else {
      document.querySelector("footer").prepend(dateTimeElement);
    }
  };

  // Update date/time immediately and then every second
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // Example of event listener
  document.querySelectorAll("section h2").forEach((heading) => {
    heading.addEventListener("click", () => {
      heading.classList.toggle("active");
      console.log(`Section "${heading.textContent}" was clicked`);
    });
  });
});
