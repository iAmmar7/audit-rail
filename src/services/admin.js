import { apiClient } from './apiClient';

export function deleteAuditReport(id) {
  return apiClient.delete(`/admin/audit-report/${id}`);
}

export function deleteInitiativeReport(id) {
  return apiClient.delete(`/admin/initiative/${id}`);
}

export function getAllUsers(filters) {
  return apiClient.post('/admin/users', filters);
}

export function deleteUser(id) {
  return apiClient.delete(`/admin/user/${id}`);
}

export function addUser(data) {
  return apiClient.post('/admin/user', data);
}

export function updateUser(id, data) {
  return apiClient.patch(`/admin/user/${id}`, data);
}
