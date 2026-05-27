<script setup>
defineProps({
  name: { type: String, required: true },
  status: { type: String, required: true },
  lastUpdate: { type: String, default: '' }
})

const getStatusInfo = (status) => {
  const map = {
    online: { text: '正常', color: '#52c41a' },
    offline: { text: '離線', color: '#f5222d' },
    warning: { text: '警告', color: '#faad14' }
  }
  return map[status] || map.online
}
</script>

<template>
  <div class="sensor-card" :class="`sensor-${status}`">
    <div class="sensor-header">
      <div class="sensor-name-row">
        <span class="status-dot" :style="{ background: getStatusInfo(status).color }"></span>
        <h4 class="sensor-name">{{ name }}</h4>
      </div>
      <span class="sensor-badge" :class="`badge-${status}`">{{ getStatusInfo(status).text }}</span>
    </div>
    <div class="sensor-footer">
      <span class="material-icons-outlined footer-icon">schedule</span>
      <span class="sensor-time">{{ lastUpdate }}</span>
    </div>
  </div>
</template>

<style scoped>
.sensor-card {
  background: var(--sb-white);
  border: 1px solid var(--sb-ceramic);
  border-radius: var(--sb-radius-card);
  padding: 16px;
  box-shadow: var(--sb-shadow-card);
  transition: all 0.2s ease;
}
.sensor-card:hover {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.08), 0 8px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}
.sensor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.sensor-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.sensor-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
.sensor-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 10px;
}
.badge-online {
  background: #f6ffed;
  color: #52c41a;
}
.badge-offline {
  background: #fff1f0;
  color: #f5222d;
}
.badge-warning {
  background: #fffbe6;
  color: #faad14;
}
.sensor-footer {
  display: flex;
  align-items: center;
  gap: 4px;
}
.footer-icon {
  font-size: 14px;
  color: #b0b7c3;
}
.sensor-time {
  font-size: 12px;
  color: #8c8c8c;
}
</style>
