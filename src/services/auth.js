import { apiClient } from './apiClient';

export function signup(data) {
  return apiClient.post('/auth/signup', {
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
  });
}

export function login(data) {
  return apiClient.post('/auth/login', {
    email: data.email,
    password: data.password,
  });
}
