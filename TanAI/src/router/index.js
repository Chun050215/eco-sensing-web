import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { title: '登入' }
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('@/views/admin/DashboardView.vue'),
          meta: { title: '總覽儀表板' }
        },
        {
          path: 'emissions',
          name: 'admin-emissions',
          component: () => import('@/views/admin/EmissionsView.vue'),
          meta: { title: '碳排放管理' }
        },
        {
          path: 'sensors',
          name: 'admin-sensors',
          component: () => import('@/views/admin/SensorsView.vue'),
          meta: { title: '感測器管理' }
        },
        {
          path: 'departments',
          name: 'admin-departments',
          component: () => import('@/views/admin/DepartmentsView.vue'),
          meta: { title: '部門管理' }
        },
        {
          path: 'reports',
          name: 'admin-reports',
          component: () => import('@/views/admin/ReportsView.vue'),
          meta: { title: '報告與排行' }
        },
        {
          path: 'esg-goals',
          name: 'admin-esg-goals',
          component: () => import('@/views/admin/EsgGoalsView.vue'),
          meta: { title: 'ESG 目標' }
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('@/views/admin/SettingsView.vue'),
          meta: { title: '系統設定' }
        },
      ]
    },
    {
      path: '/employee',
      component: () => import('@/views/employee/EmployeeLayout.vue'),
      redirect: '/employee/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'employee-dashboard',
          component: () => import('@/views/employee/DashboardView.vue'),
          meta: { title: '碳排儀錶板' }
        },
        {
          path: 'actions',
          name: 'employee-actions',
          component: () => import('@/views/employee/ActionsView.vue'),
          meta: { title: 'i減碳' }
        },
        {
          path: 'leaderboard',
          name: 'employee-leaderboard',
          component: () => import('@/views/employee/LeaderboardView.vue'),
          meta: { title: '部門排行榜' }
        },
        {
          path: 'profile',
          name: 'employee-profile',
          component: () => import('@/views/employee/ProfileView.vue'),
          meta: { title: '個人資料' }
        },
      ]
    },
  ],
})

export default router
