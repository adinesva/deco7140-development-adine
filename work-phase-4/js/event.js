import { postFormData } from "./modules/postFormData.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("event-form");
  const feedback = document.getElementById("form-feedback");
  const eventList = document.getElementById("event-list");

  // ======== FETCH EVENTS (GET) ========
  async function fetchEvents() {
    try {
      const response = await fetch(
        "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/",
        {
          method: "GET",
          headers: {
            student_number: "s4984748",
            uqcloud_zone_id: "f70865f8",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch events");
      const events = await response.json();

      eventList.innerHTML = "";

      events.forEach((event) => {
        const card = document.createElement("div");
        card.classList.add("event-card");

        const imageURL =
          event.genericevent_photo || "./assets/event-placeholder.svg";

        card.innerHTML = `
          <div class="event-img" 
               style="background-image: url('${imageURL}');
                      background-size: cover;
                      background-position: center;">
          </div>
          <div class="event-info">
            <h3>${event.event_name}</h3>
            <p class="event-date"><strong>${new Date(
              event.date_time
            ).toLocaleString()}</strong></p>
            <p class="event-location">${event.location}</p>
            <p>${event.description}</p>
          </div>
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

  // ======== SUBMIT EVENT FORM (POST) ========
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.textContent = "Submitting...";
    feedback.style.color = "black";

    try {
      // Ensure date format: "YYYY-MM-DD HH:MM"
      const dateInput = document.getElementById("date_time");
      const rawDate = dateInput.value;
      const formattedDate = rawDate.replace("T", " ").slice(0, 16);

      const formData = new FormData(form);
      formData.set("date_time", formattedDate);

      console.log("🟦 Form data being sent:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      // === Use postFormData helper ===
      const { success, data } = await postFormData(
        form,
        "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/",
        {
          student_number: "s4984748",
          uqcloud_zone_id: "f70865f8",
        }
      );

      if (success) {
        feedback.textContent = "✅ Event added successfully!";
        feedback.style.color = "green";
        form.reset();
        fetchEvents();
      } else {
        console.error("Error response:", data);
        feedback.textContent =
          JSON.stringify(data) ||
          "❌ Something went wrong. Check required fields or format.";
        feedback.style.color = "red";
      }
    } catch (err) {
      console.error("Error submitting event:", err);
      feedback.textContent = "❌ Server error. Check console for details.";
      feedback.style.color = "red";
    }
  });
});