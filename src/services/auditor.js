import { apiClient } from './apiClient';

export function submitAuditReport(data, fileList) {
  const formData = new FormData();
  Object.keys(data).forEach((item) => {
    // Don't append images
    if (item !== 'evidences') formData.append(item, data[item]);
  });

  for (let i = 0; i < fileList.length; i += 1) {
    formData.append('evidences', fileList[i]);
  }

  return apiClient.post('/auditor/report', formData);
}

export function editAuditReport(data, { id, evidenceBeforeFileList }) {
  const formData = new FormData();
  Object.keys(data).forEach((value) => {
    // Don't append images
    if (value !== 'evidencesBefore') formData.append(value, data[value]);
  });

  for (let i = 0; i < evidenceBeforeFileList.length; i += 1) {
    formData.append('evidencesBefore', evidenceBeforeFileList[i]);
  }

  return apiClient.patch(`/auditor/report/${id}`, formData);
}

export function submitInitiative(data, { evidenceBeforeFileList, evidenceAfterFileList }) {
  const formData = new FormData();

  Object.keys(data).forEach((item) => {
    // Don't append images
    if (item !== 'evidencesBefore' && item !== 'evidencesAfter') formData.append(item, data[item]);
  });

  for (let i = 0; i < evidenceBeforeFileList.length; i += 1) {
    formData.append('evidencesBefore', evidenceBeforeFileList[i]);
  }

  for (let i = 0; i < evidenceAfterFileList.length; i += 1) {
    formData.append('evidencesAfter', evidenceAfterFileList[i]);
  }

  return apiClient.post('/auditor/initiative', formData);
}

export function editInitiative(data, { id, evidenceBeforeFileList, evidenceAfterFileList }) {
  const formData = new FormData();
  Object.keys(data).forEach((value) => {
    // Don't append images
    if (value !== 'evidencesBefore' && value !== 'evidencesAfter')
      formData.append(value, data[value]);
  });

  for (let i = 0; i < evidenceBeforeFileList.length; i += 1) {
    formData.append('evidencesBefore', evidenceBeforeFileList[i]);
  }

  for (let i = 0; i < evidenceAfterFileList.length; i += 1) {
    formData.append('evidencesAfter', evidenceAfterFileList[i]);
  }

  return apiClient.patch(`/auditor/initiative/${id}`, formData);
}
