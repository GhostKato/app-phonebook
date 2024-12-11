import axios from "axios";

export const contactsApi = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://server-phonebook.onrender.com",  
});

export const setToken = (token) => {
  localStorage.setItem('accessToken', token);
  contactsApi.defaults.headers.common.Authorization = `Bearer ${token}`;  
};

export const clearToken = () => {
  localStorage.removeItem('accessToken');
  contactsApi.defaults.headers.common.Authorization = '';
};

export const getToken = () => {
  return localStorage.getItem('accessToken'); 
};
