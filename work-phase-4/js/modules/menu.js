document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.style.display === "flex";
    mobileMenu.style.display = isOpen ? "none" : "flex";
    menuToggle.setAttribute("aria-expanded", !isOpen);
  });

  // Optional: Dropdown toggle
  const dropdown = document.querySelector("#nav-mobile .dropdown");
  if (dropdown) {
    dropdown.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.classList.toggle("open");
    });
  }
});

export function initDropdown() {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".dropbtn");
    const menu = dropdown.querySelector(".dropdown-content");

    button.addEventListener("click", (e) => {
      e.preventDefault();
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", !expanded);
      menu.style.display = expanded ? "none" : "block";
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown-content").forEach((menu) => {
        menu.style.display = "none";
      });
      document.querySelectorAll(".dropbtn").forEach((btn) => {
        btn.setAttribute("aria-expanded", "false");
      });
    }
  });
}

