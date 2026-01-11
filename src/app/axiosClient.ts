// src/app/axiosClient.ts
import axios from 'axios'

// Create an Axios instance
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000', // set your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
})

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Example: attach auth token if exists
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response.data, // return only data
  (error) => {
    // Global error handling
    console.error('Axios Error:', error.response || error.message)
    return Promise.reject(error)
  }
)

export default axiosClient
