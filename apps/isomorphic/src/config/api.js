import axios from 'axios';
import { useSession } from 'next-auth/next';

const BASE_URL = process.env.API_URL;
// const session = useSession();
// console.log('in api function', session?.data);
// const token = session?.data?.user?.token;
const token = '';

// Initialize Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Add request interceptor to dynamically set Authorization header
api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // localStorage.removeItem("ftmUserData");
      // localStorage.removeItem("ltmsCompanyData");
      // localStorage.removeItem("loginToken");
      // Optionally redirect to login
      // window.location.href = "/login";
    }
    return Promise.reject(
      error.response ? error.response.data.message : error.message
    );
  }
);

// API helper functions
export const get = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch data');
  }
};

export const post = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to post data');
  }
};

export const put = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to update data');
  }
};

export const deleteApi = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to delete data');
  }
};

export default api;
