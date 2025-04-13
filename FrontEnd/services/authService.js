import axios from 'axios';

const API_URL = 'http://20.244.46.72/api/auth'; // Updated to use the provided IP address

// Set a global timeout for Axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Set timeout to 10 seconds
});

// ฟังก์ชันสำหรับสมัครสมาชิก
export const register = async (username, email, phone, password) => {
  return axiosInstance.post('/signup', { name: username, email, phone, password });
};

// ฟังก์ชันสำหรับเข้าสู่ระบบ
export const login = async (email, password) => {
  return axiosInstance.post('/login', { email, password });
};
