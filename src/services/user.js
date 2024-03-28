import { apiClient } from './apiClient';

export function getCurrentUser() {
  return apiClient.get('/user');
}

export function getUserByRole(role) {
  return apiClient.get('/user/roles', {
    params: {
      role,
    },
  });
}

export function updateActivity() {
  return apiClient.patch('/user/activity');
}

export function getReportChart(query) {
  return apiClient.get(`/user/report-chart?month=${query}`);
}

export function getAuditReports(filters) {
  return apiClient.post('/user/audit-reports', filters);
}

export function getInitiativeReports(filters) {
  return apiClient.post('/user/initiative-reports', filters);
}

export function deleteReportImage(filters) {
  return apiClient.patch('/user/delete-image', filters);
}

export function auditReportCSV(filters) {
  return apiClient.post('/user/csv/audit-reports', filters);
}

export function initiativeReportCSV(filters) {
  return apiClient.post('/user/csv/initiatives-reports', filters);
}
