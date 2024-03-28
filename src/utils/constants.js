export const rolesDescription = {
  auditor: 'Auditor',
  sm: 'Station Manager',
  viewer: 'Viewer',
  admin: 'Admin',
};

export const footerText = `Copyright \u00A9 ${new Date().getFullYear()} Audit Automation || Shifali x Ammar`;

export const tagLine = 'Ensuring Excellence, One Station at a Time';

export const regionSelectOptions = [
  { value: 'Southern', label: 'Southern' },
  { value: 'CR-East', label: 'CR-East' },
  { value: 'CR-North', label: 'CR-North' },
  { value: 'CR-South', label: 'CR-South' },
  { value: 'ER-North', label: 'ER-North' },
  { value: 'ER-South', label: 'ER-South' },
  { value: 'WR-North', label: 'WR-North' },
  { value: 'WR-South', label: 'WR-South' },
];

export const issueTypeOptions = [
  { value: 'Customer Experience', label: 'Customer Experience' },
  { value: 'Housekeeping', label: 'Housekeeping' },
  { value: 'Customer Mistreatment', label: 'Customer Mistreatment' },
  { value: 'Initiative', label: 'Initiative' },
  { value: 'Admin Issues', label: 'Admin Issues' },
  { value: 'Maintenance Issues', label: 'Maintenance Issues' },
  { value: 'IT Issues', label: 'IT Issues' },
  { value: 'Inventory Issues', label: 'Inventory Issues' },
  { value: 'Violation', label: 'Violation' },
  { value: 'Safety', label: 'Safety' },
  { value: 'Others', label: 'Others' },
];

export const issuePriorityOptions = [
  { value: 'Observation', label: 'Observation' },
  { value: 'Priority', label: 'Priority' },
];

export const issueStatusOptions = [
  {
    value: 'Pending',
    label: 'Pending',
  },
  {
    value: 'Resolved',
    label: 'Resolved',
  },
  {
    value: 'Maintenance',
    label: 'Maintenance',
  },
];
