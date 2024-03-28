import axios from 'axios';

export const apiClient = axios.create({
  baseURL: `${process.env.SERVER_URL}/api`,
});

// Set the AUTH token for any request
apiClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem('userToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});
