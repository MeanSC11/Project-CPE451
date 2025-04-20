import axios from 'axios';

const API_URL = 'http://20.244.46.72/api/auth'; // Ensure this matches the BackEnd's base URL

// Set a global timeout for Axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Set timeout to 10 seconds
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
