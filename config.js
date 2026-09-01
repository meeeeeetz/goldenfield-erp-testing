// API Configuration
// Uses relative URLs for same-origin API calls, or falls back to localhost for development
const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
