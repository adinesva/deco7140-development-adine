export async function postFormData(form, url, extraHeaders = {}) {
    const formData = new FormData(form);
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                ...extraHeaders,
            },
            body: formData,
        });

    const data = await response.json();

    return {
        success: response.ok,
        data,
    };
} catch (err) {
    console.error("Error submitting form:", err);
    return {
        success: false,
        data: { message: "Network or server error." },
    };
}
}
