// js/modules/viewer.js
function initViewer(gallerySelector, viewerSelector) {
    const gallery = document.querySelector(gallerySelector);
    const viewer = document.querySelector(viewerSelector);
    const viewerImg = document.getElementById("viewer-img");
    const viewerCaption = document.getElementById("viewer-caption");
    const closeBtn = document.getElementById("close-viewer");

    if (!gallery || !viewer) {
        console.warn("Gallery or viewer not found!");
        return;
    }

    // Open viewer when clicking gallery image
    gallery.querySelectorAll("img").forEach((img) => {
        img.addEventListener("click", () => {
            viewerImg.src = img.src;
            viewerCaption.textContent = img.alt;
            viewer.classList.add("open");
            viewer.setAttribute("aria-hidden", "false");
        });
    });

    // Close viewer
    closeBtn.addEventListener("click", () => {
        viewer.classList.remove("open");
        viewer.setAttribute("aria-hidden", "true");
    });
}

export { initViewer };