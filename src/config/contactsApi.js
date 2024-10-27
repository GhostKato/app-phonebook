import axios from "axios";

export const contactsApi = axios.create({
  baseURL: "https://nodejs-hw-mongodb-nls0.onrender.com",
});

