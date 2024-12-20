import axios from "axios";
import Cookies from 'js-cookie';

export const contactsApi = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://server-phonebook.onrender.com",
  withCredentials: true,
});

export const setToken = (token) => {  
   Cookies.set('accessToken', token, { expires: 7, secure: true, sameSite: 'Strict' });
  contactsApi.defaults.headers.common.Authorization = `Bearer ${token}`; 
};

export const clearToken = () => { 
  Cookies.remove('accessToken');
  contactsApi.defaults.headers.common.Authorization = '';
};

export const getToken = () => {
  return Cookies.get('accessToken'); 
};
