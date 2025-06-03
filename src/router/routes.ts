import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: { showBackButton: false, title: 'Главная' },
      },
    ],
  },
  {
    path: '/new',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/EditNotePage.vue'),
        meta: { showBackButton: true, title: 'Новая заметка' },
      },
    ],
  },
  {
    path: '/edit',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/EditNotePage.vue'),
        meta: { showBackButton: true, title: 'Редактировать заметку' },
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/ErrorNotFound.vue'),
        meta: { showBackButton: true, title: 'Страница не найдена' },
      },
    ],
  },
];

export default routes;
