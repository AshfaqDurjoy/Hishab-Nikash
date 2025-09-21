// In your API configuration file (e.g., src/config/api.js)
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://hishab-nikash-1.onrender.com/api'
  : 'https://hishab-nikash-1.onrender.com/api';

export default API_BASE_URL;