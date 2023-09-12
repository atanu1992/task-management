import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

api.interceptors.request.use((req) => {
  let userToken = localStorage.getItem('userToken');
  req.headers['Content-Type'] = 'application/json';
  if (userToken) {
    const { token, refreshToken } = JSON.parse(userToken);
    req.headers.Authorization = `Bearer ${token}`;
    req.headers['x-refresh-token'] = refreshToken;
  }
  return req;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && [401].includes(error.response.status)) {
      localStorage.removeItem('userToken');
      // Handle unauthorized error (e.g., redirect to login)
    }
    if (error.response && [403].includes(error.response.status)) {
      try {
        const response = await api.get('users/refresh-token');
        if (response.data.details) {
          localStorage.setItem(
            'userToken',
            JSON.stringify(response.data.details)
          );

          // Retry the original request with the new token
          return api(error.config);
        } else {
          // Handle invalid or missing refresh token response
          localStorage.removeItem('userToken');
        }
      } catch (refreshError) {
        // Handle errors during token refresh (e.g., log or redirect to login)
        localStorage.removeItem('userToken');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
