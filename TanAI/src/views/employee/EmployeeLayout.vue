<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const tabs = [
  { icon: 'donut_large', label: '儀錶板', route: '/employee/dashboard' },
  { icon: 'eco', label: 'i減碳', route: '/employee/actions' },
  { icon: 'leaderboard', label: '排行榜', route: '/employee/leaderboard' },
  { icon: 'person', label: '個人', route: '/employee/profile' },
]
</script>

<template>
  <div class="app-shell">
    <div class="app-body">
      <RouterView />
    </div>
    <nav class="bottom-nav">
      <RouterLink
        v-for="tab in tabs" :key="tab.route"
        :to="tab.route"
        class="tab-item"
        :class="{ active: route.path === tab.route }"
      >
        <span class="material-icons-outlined tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  background: #f3f5f9;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(0,0,0,0.08);
}

.app-body {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
}

.bottom-nav {
  flex-shrink: 0;
  height: calc(64px + env(safe-area-inset-bottom));
  background: #fff;
  border-top: 1px solid #eef0f4;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -4px 20px rgba(0,0,0,0.08);
  z-index: 100;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  color: #b0b7c3;
  flex: 1;
  padding: 8px 0;
  transition: color 0.18s;
}

.tab-icon { font-size: 22px; }
.tab-label { font-size: 10px; font-weight: 500; }

.tab-item.active { color: #5b8ff9; }
.tab-item.active .tab-icon {
  font-variation-settings: 'FILL' 1;
}
</style>
