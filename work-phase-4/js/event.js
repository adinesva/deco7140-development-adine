import { postFormData } from "./modules/postFormData.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("event-form");
    const feedback = document.getElementById("form-feedback");
    
    form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.textContent = "Submitting...";

    form.student_number = "s4984748";
    form.uqcloud_zone_id = "f70865f8";

    // Submit data to the API
    const { success, data } = await postFormData(
        form,
        "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/"
    );

    if (success) {
        feedback.textContent = data.message || "✅ Event added successfully!";
        feedback.style.color = "green";
        form.reset();
    } else {
        console.error("Error response:", data);
        feedback.textContent =
        "❌ Something went wrong. Check required fields or format.";
        feedback.style.color = "red";
    }
});
});
