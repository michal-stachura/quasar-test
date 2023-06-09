/* eslint-disable */
// @ts-nocheck

import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'HomePage',
        component: () => import('src/pages/PageTodo.vue')
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('src/pages/PageSettings.vue')
      },
      {
        path: '/settings/help',
        name: 'Help',
        component: () => import('src/pages/PageHelp.vue')
      },
      {
        path: '/auth',
        name: 'Auth',
        component: () => import('src/pages/PageAuth.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ErrorNotFound.vue')
  }
];

export default routes;
