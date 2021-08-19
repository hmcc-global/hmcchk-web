import axios from "axios";

export let customAxios;

export let updateAxiosClient = (token) => {
  customAxios = axios.create({
    headers: { Authorization: "Bearer " + token },
  });

  customAxios.interceptors.response.use(
    (response) => response,
    (err) => Promise.reject(err)
  );
};

updateAxiosClient();
