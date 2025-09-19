function initAccordion(containerSelector) {
    console.log("✅ initAccordion called with:", containerSelector);
    const accordions = document.querySelectorAll(containerSelector);
    console.log("Found accordions:", accordions.length);

    accordions.forEach((container) => {
        const headers = container.querySelectorAll(".accordion-header");
        console.log("Headers inside accordion:", headers.length);

        headers.forEach((header) => {
            header.addEventListener("click", () => {
                console.log("Clicked:", header.textContent);
                const item = header.parentElement;
                item.classList.toggle("open");
            });
        });
    });
}

export { initAccordion };
