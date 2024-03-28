import { apiClient } from './apiClient';

export function updateAuditReport(data, { id, evidenceAfterFileList }) {
  const formData = new FormData();
  Object.keys(data).forEach((value) => {
    // Don't append images
    if (value !== 'evidencesAfter') formData.append(value, data[value]);
  });

  for (let i = 0; i < evidenceAfterFileList.length; i += 1) {
    formData.append('evidencesAfter', evidenceAfterFileList[i]);
  }

  return apiClient.patch(`/sm/report/${id}`, formData);
}
