// src/api/axiosInstance.js
// const axios = require('axios')

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:4000/api/auth", // adjust if your API runs elsewhere
//   withCredentials: true, // if you're using cookies or need CORS
// });

// export default axiosInstance;

// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api", // adjust path if needed
  withCredentials: true, // only if you're using cookies / sessions
});

export default axiosInstance;

