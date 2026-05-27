<script setup>
import { computed, ref } from 'vue'

const sensorSummary = ref([
  { title: '感測設備總數', value: '30', unit: '台', tone: 'blue' },
  { title: '在線設備', value: '27', unit: '台', tone: 'green' },
  { title: '異常設備', value: '3', unit: '台', tone: 'orange' },
  { title: '今日資料筆數', value: '14,260', unit: '筆', tone: 'purple' }
])

const sensors = ref([
  {
    id: 'S-101',
    name: '智慧垃圾桶 A',
    location: '總部 1F 大廳',
    type: '廢棄物感測器',
    status: 'online',
    statusLabel: '正常運作',
    lastUpdate: '2 分鐘前',
    metric: '今日回收重量 42 kg'
  },
  {
    id: 'S-102',
    name: '智慧垃圾桶 B',
    location: '研發辦公區',
    type: '廢棄物感測器',
    status: 'warning',
    statusLabel: '電量偏低',
    lastUpdate: '5 分鐘前',
    metric: '剩餘電量 18%'
  },
  {
    id: 'S-201',
    name: '用電監測器 A',
    location: '行政樓層',
    type: '能源監測器',
    status: 'online',
    statusLabel: '正常運作',
    lastUpdate: '1 分鐘前',
    metric: '即時功率 18.6 kWh'
  },
  {
    id: 'S-202',
    name: '用電監測器 B',
    location: '會議室區域',
    type: '能源監測器',
    status: 'offline',
    statusLabel: '離線',
    lastUpdate: '36 分鐘前',
    metric: '資料中斷待檢查'
  },
  {
    id: 'S-301',
    name: '環境感測器 A',
    location: '物流倉儲區',
    type: '環境感測器',
    status: 'online',
    statusLabel: '正常運作',
    lastUpdate: '3 分鐘前',
    metric: 'CO₂ 濃度 612 ppm'
  },
  {
    id: 'S-302',
    name: '環境感測器 B',
    location: '地下停車場',
    type: '環境感測器',
    status: 'warning',
    statusLabel: '數值偏高',
    lastUpdate: '1 分鐘前',
    metric: 'CO₂ 濃度 945 ppm'
  },
  {
    id: 'S-401',
    name: '電梯 NFC 標籤 A',
    location: '總部 3F 電梯廳',
    type: 'NFC 電梯標籤',
    status: 'online',
    statusLabel: '正常運作',
    lastUpdate: '30 秒前',
    metric: '今日搭乘 186 次'
  },
  {
    id: 'S-402',
    name: '電梯 NFC 標籤 B',
    location: '研發大樓 5F',
    type: 'NFC 電梯標籤',
    status: 'online',
    statusLabel: '正常運作',
    lastUpdate: '1 分鐘前',
    metric: '今日搭乘 124 次'
  },
  {
    id: 'S-403',
    name: '電梯 NFC 標籤 C',
    location: '行政大樓 2F',
    type: 'NFC 電梯標籤',
    status: 'offline',
    statusLabel: '離線',
    lastUpdate: '42 分鐘前',
    metric: 'NFC 讀取中斷'
  }
])

const realtimeCards = ref([
  { title: '廢棄物回收量', value: '142', unit: 'kg', change: '+12% 較昨日', tone: 'blue' },
  { title: '即時用電監測', value: '286', unit: 'kWh', change: '-4% 較昨日', tone: 'green' },
  { title: '電梯 NFC 搭乘', value: '310', unit: '次', change: '+8% 較昨日', tone: 'purple' },
  { title: '平均 CO₂ 濃度', value: '684', unit: 'ppm', change: '+6% 較昨日', tone: 'orange' }
])

const facilityZones = ref([
  { name: '總部辦公區', total: 8, online: 7, status: '穩定' },
  { name: '研發中心', total: 6, online: 6, status: '正常' },
  { name: '物流倉儲區', total: 7, online: 6, status: '注意' },
  { name: '公共設施區', total: 6, online: 5, status: '注意' }
])

const onlineCount = computed(() => sensors.value.filter((item) => item.status === 'online').length)
const warningCount = computed(() => sensors.value.filter((item) => item.status === 'warning').length)
const offlineCount = computed(() => sensors.value.filter((item) => item.status === 'offline').length)

const statusClass = (status) => {
  if (status === 'online') return 'status-online'
  if (status === 'warning') return 'status-warning'
  return 'status-offline'
}
</script>

<template>
  <div class="sensors-page admin-page">
    <div class="page-header">
      <div>
        <h1>感測器監控</h1>
        <p>智慧垃圾桶、NFC 電梯標籤、能源與環境感測設備即時監控</p>
      </div>
      <div class="header-chip">
        <span class="chip-label">設備健康度</span>
        <strong>{{ onlineCount }}/{{ sensors.length }}</strong>
      </div>
    </div>

    <div class="summary-grid">
      <div
        v-for="item in sensorSummary"
        :key="item.title"
        class="summary-card"
        :class="`tone-${item.tone}`"
      >
        <div class="summary-title">{{ item.title }}</div>
        <div class="summary-value">
          {{ item.value }} <span>{{ item.unit }}</span>
        </div>
      </div>
    </div>

    <div class="top-row">
      <div class="card status-overview-card">
        <div class="card-head">
          <h3 class="card-title">設備狀態分布</h3>
        </div>

        <div class="status-overview">
          <div class="status-ring">
            <div class="ring-center">
              <strong>{{ sensors.length }}</strong>
              <span>總設備數</span>
            </div>
          </div>

          <div class="status-stats">
            <div class="status-row">
              <div class="status-left">
                <span class="dot online"></span>
                <span>在線設備</span>
              </div>
              <strong>{{ onlineCount }}</strong>
            </div>

            <div class="status-row">
              <div class="status-left">
                <span class="dot warning"></span>
                <span>警示設備</span>
              </div>
              <strong>{{ warningCount }}</strong>
            </div>

            <div class="status-row">
              <div class="status-left">
                <span class="dot offline"></span>
                <span>離線設備</span>
              </div>
              <strong>{{ offlineCount }}</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="card realtime-card">
        <div class="card-head">
          <h3 class="card-title">即時監測摘要</h3>
        </div>

        <div class="realtime-list">
          <div
            v-for="item in realtimeCards"
            :key="item.title"
            class="realtime-row"
          >
            <div>
              <div class="realtime-title">{{ item.title }}</div>
              <div class="realtime-change">{{ item.change }}</div>
            </div>
            <div class="realtime-value">
              {{ item.value }} <span>{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="middle-row">
      <div class="card table-card">
        <div class="card-head">
          <h3 class="card-title">感測設備清單</h3>
        </div>

        <div class="table-wrap">
          <table class="sensor-table">
            <thead>
              <tr>
                <th>設備編號</th>
                <th>設備名稱</th>
                <th>位置</th>
                <th>類型</th>
                <th>狀態</th>
                <th>最後更新</th>
                <th>即時指標</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="sensor in sensors"
                :key="sensor.id"
              >
                <td>{{ sensor.id }}</td>
                <td>{{ sensor.name }}</td>
                <td>{{ sensor.location }}</td>
                <td>{{ sensor.type }}</td>
                <td>
                  <span
                    class="status-pill"
                    :class="statusClass(sensor.status)"
                  >
                    {{ sensor.statusLabel }}
                  </span>
                </td>
                <td>{{ sensor.lastUpdate }}</td>
                <td>{{ sensor.metric }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card zone-card">
        <div class="card-head">
          <h3 class="card-title">場域監控區域</h3>
        </div>

        <div class="zone-list">
          <div
            v-for="zone in facilityZones"
            :key="zone.name"
            class="zone-row"
          >
            <div>
              <div class="zone-name">{{ zone.name }}</div>
              <div class="zone-meta">{{ zone.online }}/{{ zone.total }} 台設備在線</div>
            </div>
            <span class="zone-status">{{ zone.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sensors-page {
  padding: 28px 32px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 6px;
}

.page-header p {
  color: #8c8c8c;
}

.header-chip {
  background: #fff;
  border-radius: var(--sb-radius-card);
  padding: 14px 18px;
  box-shadow: var(--sb-shadow-card);
  min-width: 140px;
}

.chip-label {
  display: block;
  font-size: 12px;
  color: #8c8c8c;
  margin-bottom: 4px;
}

.header-chip strong {
  font-size: 22px;
  color: #333;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.summary-card {
  background: #fff;
  border-radius: var(--sb-radius-card);
  padding: 18px 20px;
  box-shadow: var(--sb-shadow-card);
  border-top: 4px solid transparent;
}

.tone-blue {
  border-top-color: #00754a;
}

.tone-green {
  border-top-color: #006241;
}

.tone-orange {
  border-top-color: #f6bd16;
}

.tone-purple {
  border-top-color: #9270ca;
}

.summary-title {
  font-size: 13px;
  color: #8c8c8c;
  margin-bottom: 10px;
}

.summary-value {
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

.summary-value span {
  font-size: 13px;
  font-weight: 500;
  color: #8c8c8c;
}

.card {
  background: #fff;
  border-radius: var(--sb-radius-card);
  padding: 20px;
  box-shadow: var(--sb-shadow-card);
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.card-subtitle {
  font-size: 12px;
  color: #8c8c8c;
}

.top-row {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.status-overview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.status-ring {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background: conic-gradient(
    #006241 0% 70%,
    #f6bd16 70% 88%,
    #e8684a 88% 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ring-center {
  width: 118px;
  height: 118px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ring-center strong {
  font-size: 28px;
  color: #333;
}

.ring-center span {
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 4px;
}

.status-stats {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-left {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #555;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.online {
  background: #006241;
}

.dot.warning {
  background: #f6bd16;
}

.dot.offline {
  background: #e8684a;
}

.realtime-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.realtime-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #f0f0f0;
}

.realtime-row:last-child {
  border-bottom: none;
}

.realtime-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.realtime-change {
  font-size: 12px;
  color: #8c8c8c;
}

.realtime-value {
  font-size: 22px;
  font-weight: 700;
  color: #333;
}

.realtime-value span {
  font-size: 12px;
  font-weight: 500;
  color: #8c8c8c;
}

.middle-row {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 20px;
}

.table-wrap {
  overflow-x: auto;
}

.sensor-table {
  width: 100%;
  border-collapse: collapse;
}

.sensor-table th,
.sensor-table td {
  text-align: left;
  padding: 12px 10px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
  white-space: nowrap;
}

.sensor-table th {
  color: #8c8c8c;
  font-weight: 600;
  background: #fafbfc;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 600;
}

.status-online {
  background: rgba(90, 216, 166, 0.14);
  color: #2b9f6b;
}

.status-warning {
  background: rgba(246, 189, 22, 0.16);
  color: #b88200;
}

.status-offline {
  background: rgba(232, 104, 74, 0.14);
  color: #cc4e2f;
}

.zone-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.zone-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #f0f0f0;
}

.zone-row:last-child {
  border-bottom: none;
}

.zone-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.zone-meta {
  font-size: 12px;
  color: #8c8c8c;
}

.zone-status {
  font-size: 12px;
  font-weight: 600;
  color: #00754a;
  background: #f5f7fb;
  padding: 6px 10px;
  border-radius: 999px;
}

@media (max-width: 1200px) {
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .top-row,
  .middle-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .sensors-page {
    padding: 20px;
  }

  .page-header,
  .card-head,
  .status-overview {
    flex-direction: column;
    align-items: flex-start;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .status-ring {
    width: 150px;
    height: 150px;
  }

  .ring-center {
    width: 104px;
    height: 104px;
  }
}
</style>