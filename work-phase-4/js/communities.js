import { postFormData } from "./modules/postFormData.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("community-form");
  const feedback = document.getElementById("form-feedback");
  const communityList = document.getElementById("community-list");

  // ======== FETCH COMMUNITY MEMBERS (GET) ========
  async function fetchCommunity() {
    try {
      const response = await fetch(
        "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/",
        {
          method: "GET",
          headers: {
            student_number: "s4984748",
            uqcloud_zone_id: "f70865f8",
          },
        }
      );

      const text = await response.text();
      console.log("Server said:", text);

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const members = JSON.parse(text);
      console.log("Fetched community members:", members);

      communityList.innerHTML = "";

      // Loop through and render member cards
      members.forEach((member) => {
        const card = document.createElement("div");
        card.classList.add("community-card");

        const imageURL =
          member.photo ||
          "./assets/event-placeholder.svg";

        card.innerHTML = `
          <div class="community-photo" 
               style="background-image: url('${imageURL}');
                      background-size: cover;
                      background-position: center;">
          </div>
          <div class="community-info">
            <h3>${member.name}</h3>
            <p><strong>Email:</strong> ${member.email}</p>
            <p>${member.message || "No message provided."}</p>
          </div>
        `;

        communityList.appendChild(card);
      });
    } catch (err) {
      console.error("Error fetching community:", err);
      communityList.innerHTML =
        "<p style='color:red;'>Failed to load community members. Please try again later.</p>";
    }
  }

  // Fetch members when page loads
  fetchCommunity();

  // ======== SUBMIT COMMUNITY FORM (POST) ========
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.textContent = "Submitting...";

    const { success, data } = await postFormData(
      form,
      "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/",
      {
        student_number: "s4984748",
        uqcloud_zone_id: "f70865f8",
      }
    );

    if (success) {
      feedback.textContent = data.message || "✅ Joined successfully!";
      feedback.style.color = "green";
      form.reset();
      fetchCommunity(); // refresh member list
    } else {
      console.log("Error response:", data);
      feedback.textContent =
        data.message || "❌ Something went wrong. Please try again.";
      feedback.style.color = "red";
    }
  });
});
