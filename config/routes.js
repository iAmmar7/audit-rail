export default [
  {
    path: '/',
    redirect: '/auth',
  },
  {
    path: '/auth',
    component: '../layouts/AuthLayout',
    routes: [
      {
        path: '/auth',
        name: 'auth',
        icon: 'smile',
        component: './auth',
      },
    ],
  },
  {
    path: '/user',
    component: '../layouts/UserSecuredLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['user'],
        routes: [
          {
            path: '/user/',
            name: 'Dashboard',
            icon: 'dashboard',
            component: './user/Landing',
          },
          {
            path: '/user/audit-form',
            name: 'Audit',
            icon: 'form',
            component: './user/AuditFormPage',
          },
          {
            path: '/user/initiative-form',
            name: 'Initiatives',
            icon: 'edit',
            component: './user/InitiativeFormPage',
          },
          {
            path: '/user/reports',
            name: 'Reports',
            icon: 'tablet',
            routes: [
              {
                path: '/user/reports/audit-reports',
                name: 'Audit',
                component: './user/AuditReportsPage',
              },
              {
                path: '/user/reports/initiative-reports',
                name: 'Initiatives',
                component: './user/InitiativeReportsPage',
              },
            ],
          },
          {
            path: '/user/settings',
            name: 'Settings',
            icon: 'setting',
            hideInMenu: true,
            component: './user/Settings',
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
