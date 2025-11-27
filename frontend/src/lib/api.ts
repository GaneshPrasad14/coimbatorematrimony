// API configuration for frontend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const api = {
  baseURL: API_BASE_URL,

  // Helper function to build full API URLs
  buildUrl: (endpoint: string): string => {
    // Remove leading slash from endpoint if present
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

    if (API_BASE_URL) {
      // Production: use full URL
      return `${API_BASE_URL}/${cleanEndpoint}`;
    } else {
      // Development: use relative URLs (proxied by Vite)
      return `/${cleanEndpoint}`;
    }
  },

  // Common API endpoints
  endpoints: {
    auth: {
      adminLogin: '/api/auth/admin/login',
      verify: '/api/auth/verify'
    },
    profiles: '/api/profiles',
    health: '/api/health'
  }
};