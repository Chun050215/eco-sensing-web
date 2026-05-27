<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const logout = () => router.push('/login')

const navItems = [
  { icon: 'dashboard', label: '總覽儀表板', route: '/admin/dashboard' },
  { icon: 'bolt', label: '碳排放管理', route: '/admin/emissions' },
  { icon: 'sensors', label: '感測器管理', route: '/admin/sensors' },
  { icon: 'corporate_fare', label: '部門管理', route: '/admin/departments' },
  { icon: 'bar_chart', label: '報告與排行', route: '/admin/reports' },
  { icon: 'eco', label: 'ESG 目標', route: '/admin/esg-goals' },
  { icon: 'settings', label: '系統設定', route: '/admin/settings' },
]
</script>

<template>
  <div class="layout admin-shell">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <span class="material-icons-outlined brand-icon">eco</span>
        <div class="brand-text">
          <strong>Eco Sensing</strong>
          <span>企業自動化碳排查平台</span>
        </div>
      </div>

      <div class="sidebar-top">
        <nav class="sidebar-nav">
          <RouterLink
            v-for="item in navItems"
            :key="item.label"
            :to="item.route"
            class="nav-item"
            :class="{ active: route.path === item.route }"
          >
            <span class="material-icons-outlined">{{ item.icon }}</span>
            <span class="nav-label">{{ item.label }}</span>
          </RouterLink>
        </nav>
      </div>

      <a href="#" class="nav-item logout-item" @click.prevent="logout">
        <span class="material-icons-outlined">logout</span>
        <span class="nav-label">登出</span>
      </a>
    </aside>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: var(--sb-canvas-warm);
}

.sidebar {
  width: 236px;
  background: var(--sb-white);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 16px 24px;
  box-shadow: var(--sb-shadow-nav);
  position: sticky;
  top: 0;
  height: 100vh;
  flex-shrink: 0;
  overflow: visible;
}

.sidebar-top {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: visible;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px 20px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--sb-ceramic);
}

.brand-icon {
  font-size: 28px;
  color: var(--sb-green-accent);
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brand-text strong {
  font-size: 16px;
  font-weight: 700;
  color: var(--sb-green-brand);
  letter-spacing: -0.16px;
}

.brand-text span {
  font-size: 11px;
  color: var(--sb-text-soft);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid transparent;
  text-decoration: none;
  color: var(--sb-text-soft);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.35;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  outline: none;
}

.nav-item .material-icons-outlined {
  font-size: 20px;
  flex-shrink: 0;
}

.nav-label {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
}

.nav-item:hover {
  background: var(--sb-green-light);
  color: var(--sb-green-brand);
}

.nav-item.active {
  background: var(--sb-green-light);
  color: var(--sb-green-accent);
  border-color: var(--sb-green-accent);
  font-weight: 600;
}

.nav-item:focus-visible {
  border-color: var(--sb-green-accent);
  box-shadow: 0 0 0 2px rgba(0, 117, 74, 0.2);
}

.logout-item {
  color: var(--sb-text-soft);
  margin-top: 8px;
  flex-shrink: 0;
}

.logout-item:hover {
  color: var(--sb-red);
  background: rgba(200, 32, 20, 0.08);
}

.content {
  flex: 1;
  overflow-y: auto;
  min-width: 0;
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
