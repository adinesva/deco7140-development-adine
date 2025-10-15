import { initAccordion } from "./modules/accordion.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ reflective_design.js loaded");
    initAccordion(".accordion");

    const container = document.getElementById("community-list");

    fetch("https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            student_number: "s4984748",
            uqcloud_zone_id: "f70865f8",
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("Fetched data:", data);
            if (!Array.isArray(data)) {
                container.innerHTML =
                    '<p class="text-danger">Unable to load community members.</p>';
                return;
            }

            data.forEach((member) => {
                const card = document.createElement("div");
                card.className = "card mb-3";
                card.innerHTML = `
                    <div class="card-body">
                        <h5>${member.name}</h5>
                        <p>${member.message || "No message provided."}</p>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch((err) => {
            console.error("Error fetching data:", err);
            container.innerHTML =
                '<p class="text-danger">Error loading community members.</p>';
        });
});