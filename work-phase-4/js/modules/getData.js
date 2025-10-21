const fetchGetData = (url, headers = {}) => {
  return fetch(url, {
    method: "GET",
    headers,
  }).then((res) => res.json());
};