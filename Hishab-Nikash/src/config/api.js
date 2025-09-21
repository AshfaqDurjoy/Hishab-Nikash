// In your API configuration file (e.g., src/config/api.js)
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-render-service.onrender.com/api'
  : 'http://localhost:8000/api';

export default API_BASE_URL;