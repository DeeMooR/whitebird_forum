import axios from "axios";

const baseURL = 'https://jsonplaceholder.typicode.com/';

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});