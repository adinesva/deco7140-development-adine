// js/behavioural_design.js
import { initViewer } from "./modules/viewer.js";
import { postFormData } from "./modules/postFormData.js";

console.log("🔥 behavioural_design.js is running");

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ behavioural_design.js loaded");

    // Init gallery viewer
    initViewer(".gallery", "#viewer");

    // Handle form submission (if form exists on this page)
    const form = document.getElementById("community-form");
    const feedback = document.getElementById("form-feedback");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            feedback.textContent = "Submitting...";

            const { success, data } = await postFormData(form, 'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/', {
                student_number: "s4984748",
                uqcloud_zone_id: "f70865f8",
            });

            if (success) {
                feedback.textContent = data.message;
                form.reset();
            } else {
                feedback.textContent = data.message || "Something went wrong.";
            }
        });
    }
});