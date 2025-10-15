const postFormData = async (formEl, endpointUrl, customHeaders = {}) => {
    const formData = new FormData(formEl);

    try {
        const response = await fetch(endpointUrl, {
            method: 'POST',
            headers: customHeaders,
            body: formData
        });

        const data = await response.json();

        return {
            success: response.ok && data.status === 'success',
            data,
        };
    } catch (error) {
        return {
            success: false,
            data: { message: 'Network or server error.', error },
        };
    }
};

export { postFormData };

const fetchGetData = (url, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${url}?${queryString}`;
    
    return fetch(fullUrl, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        mode: "cors", // helps with local testing
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Server returned an error: ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            return null;
        });
    };

export { fetchGetData };
