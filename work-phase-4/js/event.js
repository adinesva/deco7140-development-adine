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
          uqcloud_zone_id: "f70865f8"
        }
      }
    );

    const text = await response.text();
    console.log("Server said:", text);

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const events = JSON.parse(text);
    console.log("Fetched events:", events);

    const eventList = document.getElementById("event-list");
    eventList.innerHTML = "";

    events.forEach((event) => {
      const card = document.createElement("div");
      card.classList.add("event-card");

      const imageURL =
        event.genericevent_photo ||
        "https://via.placeholder.com/400x200?text=No+Image";

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
    const eventList = document.getElementById("event-list");
    eventList.innerHTML =
      "<p style='color:red;'>Failed to load events. Please try again later.</p>";
  }
}

  // Call function when the page loads
  fetchEvents();

  // ======== SUBMIT EVENT FORM (POST) ========
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.textContent = "Submitting...";

    // Ensure datetime format matches API requirement
    const dateInput = document.getElementById("date_time");
    if (dateInput && dateInput.value.includes("T")) {
      dateInput.value = dateInput.value.replace("T", " ");
    }

    // Required API headers

    // Submit data using the helper function
    const { success, data } = await postFormData(
      form,
      "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/"
    );

    // Handle response feedback
    if (success) {
      feedback.textContent = data.message || "✅ Event added successfully!";
      feedback.style.color = "green";
      form.reset();
      fetchEvents(); // Refresh event list after new event is added
    } else {
      console.log("Error response:", data);
      feedback.textContent =
        "❌ Something went wrong. Check required fields or format.";
      feedback.style.color = "red";
    }
  });
});
