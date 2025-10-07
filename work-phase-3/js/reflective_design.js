/**
 * IMPORTS
 * Keep track of external modules being used
 */
import { initAccordion } from "./modules/accordion.js";
import { fetchGetData } from "./modules/getData.js";
import { postFormData } from "./modules/postFormData.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ reflective_design.js loaded");
    initAccordion(".accordion");

    /**
   * CONSTANTS
   * Define values that don't change e.g. page titles, URLs, etc.
   */
const container = document.getElementById("community-list");

fetchGetData(
    "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/",
    {
        student_number: "s4984748",
        uqcloud_zone_id: "f70865f8",
    }
).then((data) => {
    console.log("Fetched data:", data);
    if (!data) {
        container.innerHTML =
        '<p class="text-danger">Unable to load community members.</p>';
        return;
    }

    data.forEach((member) => {
        const card = document.createElement("div");
        card.className = "card mb-3";
        card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${member.name}</h5>
          <p class="card-text">${member.message || "No message provided."}</p>
        </div>
        `;
        container.appendChild(card);
    });
});
});
