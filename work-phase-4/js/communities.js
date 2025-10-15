import { fetchGetData } from "./modules/getData.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ communities.js loaded");

  const container = document.getElementById("community-list");
  const form = document.getElementById("addCommunityForm");

  // ✅ Fetch community data from your API
  fetchGetData(
  "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/",
  {
    student_number: "s4984748",
    uqcloud_zone_id: "f70865f8",
  }
).then((data) => {
  console.log("Fetched communities:", data);

  // ✅ Access the array inside the object
  if (!data || !Array.isArray(data.data)) {
    container.innerHTML = "<p>⚠️ No communities found.</p>";
    return;
  }

  // ✅ Render each community
  data.data.forEach((community) => {
    const card = document.createElement("div");
    card.classList.add("community-card");
    card.innerHTML = `
      <div class="community-img"></div>
      <h3>${community.name || "Unnamed Community"}</h3>
    `;
    container.appendChild(card);
  });
});


  // ✅ Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const category = document.getElementById("category").value;
  const message = document.getElementById("form-message");

  // Simple validation
  if (!name || !email || !category) {
    message.textContent = "⚠️ Please fill out all fields.";
    message.className = "form-message error";
    return;
  }

  // Simulate submission (or connect to API later)
  message.textContent = "⏳ Submitting...";
  message.className = "form-message loading";

  setTimeout(() => {
    message.textContent = "✅ Thank you! Your community has been submitted successfully.";
    message.className = "form-message success";
    form.reset();
  }, 1000);
});
});