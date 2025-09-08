// export function setupMenu() {
  //const toggleBtn = document.querySelector(".menu-toggle");
  //const navMenu = document.querySelector(".nav-menu");

  //if (toggleBtn && navMenu) {
    //toggleBtn.addEventListener("click", () => {
      //navMenu.classList.toggle("active");
    //});
  //}
//}

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav ul"); // grabs <ul> inside <nav>

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  } else {
    console.error("Menu toggle or navMenu not found!");
  }
});