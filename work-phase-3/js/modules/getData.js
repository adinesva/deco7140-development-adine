const fetchGetData = (url, body = {}) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    .then((response) => {
        if (!response.ok) {
        throw new Error("Server returned an error.");
    }
    return response.json();
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
        return null;
    });
};

export { fetchGetData };