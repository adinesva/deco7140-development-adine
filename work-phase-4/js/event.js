import { postFormData } from "./modules/postFormData.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("event-form");
    const feedback = document.getElementById("form-feedback");
    const eventList = document.getElementById("event-list");

    async function fetchEvents() {
        try {
            const response = await fetch(
                "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/"
            );
            const events = await response.json();

            eventList.innerHTML = "";

            events.forEach((event) => {
                const card = document.createElement("div");
                card.classList.add("event-card");
                card.innerHTML = `
                    <h3>${event.event_name}</h3>
                    <p><strong>Type:</strong> ${event.event_type}</p>
                    <p><strong>When:</strong> ${new Date(event.date_time).toLocaleString()}</p>
                    <p><strong>Where:</strong> ${event.location}</p>
                    <p>${event.description}</p>
                `;
                eventList.appendChild(card);
            });
    } catch (err) {
        console.error("Error fetching events:", err);
        eventList.innerHTML =
            "<p style='color:red;'>Failed to load events. Please try again later.</p>";
    }
}

fetchEvents();

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
        etchEvents();
    } else {
        console.error("Error response:", data);
        feedback.textContent =
            "❌ Something went wrong. Check required fields or format.";
        feedback.style.color = "red";
    }
});
});
