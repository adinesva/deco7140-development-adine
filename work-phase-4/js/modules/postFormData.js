// ✅ postFormData.js
export async function postFormData(form, url) {
    const formData = new FormData(form);
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
        // Required custom headers for DECO7140 API
        student_number: "s4984748",
        uqcloud_zone_id: "f70865f8"
    },
    body: formData
    });

    const data = await response.json();

    // Return standardized success flag
    return {
        success: response.ok,
        data
    };
} catch (err) {
    console.error("Error submitting form:", err);
    return {
        success: false,
        data: { message: "Network or server error." }
    };
}
}
