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
