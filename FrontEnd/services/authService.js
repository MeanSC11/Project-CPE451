import axios from 'axios';

const API_URL = 'http://20.244.46.72/api/auth'; // Updated base URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// ฟังก์ชันสำหรับสมัครสมาชิก
export const register = async (username, email, phone, password) => {
  try {
    const response = await axiosInstance.post('/signup', { name: username, email, phone, password });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Register Error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Registration failed' }; // Throw a meaningful error
  }
};

// ฟังก์ชันสำหรับเข้าสู่ระบบ
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/login', { email, password });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Login failed' }; // Throw a meaningful error
  }
};

export { API_URL, axiosInstance }; // Export API_URL for use in other files
