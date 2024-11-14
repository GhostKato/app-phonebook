import axios from "axios";

export const contactsApi = axios.create({
  baseURL: "https://connections-api.goit.global/",
});

export const setToken = (token) => {
  contactsApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  contactsApi.defaults.headers.common.Authorization = ``;
};