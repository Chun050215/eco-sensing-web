<script setup>
import { computed, ref } from 'vue'

// Scope summary
const scopes = ref([
  {
    name: '範疇一',
    desc: '直接排放',
    value: 120,
    unit: 'tCO₂e',
    color: '#00754a',
    share: 10,
    note: '主要來自燃料燃燒與公務車'
  },
  {
    name: '範疇二',
    desc: '能源間接排放',
    value: 720,
    unit: 'tCO₂e',
    color: '#006241',
    share: 58,
    note: '主要來自外購電力使用'
  },
  {
    name: '範疇三',
    desc: '其他間接排放',
    value: 405,
    unit: 'tCO₂e',
    color: '#cba258',
    share: 32,
    note: '主要來自差旅、物流與供應鏈'
  }
])

// emission categories
const categories = ref([
  { name: '商務差旅', value: 180 },
  { name: '廢棄物', value: 95 },
  { name: '物流運輸', value: 140 },
  { name: '供應鏈', value: 210 }
])

// monthly emissions mock data
const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
const monthlyData = [80, 95, 110, 120, 105, 98, 102, 115, 130, 140, 135, 150]

// scope detail table
const scopeDetails = ref([
  { scope: '範疇一', category: '燃料燃燒', value: 68, change: '-2.1%', changeType: 'down' },
  { scope: '範疇一', category: '公務車', value: 32, change: '+1.3%', changeType: 'up' },
  { scope: '範疇一', category: '冷媒逸散', value: 20, change: '-0.6%', changeType: 'down' },
  { scope: '範疇二', category: '辦公室用電', value: 210, change: '-0.8%', changeType: 'down' },
  { scope: '範疇二', category: '設備用電', value: 360, change: '+2.4%', changeType: 'up' },
  { scope: '範疇二', category: '空調照明', value: 150, change: '+0.9%', changeType: 'up' },
  { scope: '範疇三', category: '商務差旅', value: 180, change: '+6.2%', changeType: 'up' },
  { scope: '範疇三', category: '物流運輸', value: 140, change: '+3.4%', changeType: 'up' },
  { scope: '範疇三', category: '供應鏈採購', value: 210, change: '+4.8%', changeType: 'up' }
])

const totalEmissions = computed(() =>
  scopes.value.reduce((sum, item) => sum + item.value, 0)
)

const pieGradient = computed(() => {
  const current = scopes.value
  let offset = 0
  const parts = current.map((item) => {
    const start = offset
    offset += item.share
    return `${item.color} ${start}% ${offset}%`
  })
  return `conic-gradient(${parts.join(', ')})`
})
</script>

<template>
  <div class="emissions-page admin-page">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1>碳排放管理</h1>
        <p>企業碳排放分析與範疇盤查</p>
      </div>
      <div class="header-meta">
        <span class="meta-label">年度總排放</span>
        <span class="meta-value">{{ totalEmissions }} tCO₂e</span>
      </div>
    </div>

    <!-- Scope Cards -->
    <div class="scope-grid">
      <div
        v-for="s in scopes"
        :key="s.name"
        class="scope-card"
      >
        <div class="scope-top">
          <div>
            <div class="scope-title">{{ s.name }}</div>
            <div class="scope-desc">{{ s.desc }}</div>
          </div>
          <span class="scope-share">{{ s.share }}%</span>
        </div>

        <div class="scope-value">
          {{ s.value }} <span>{{ s.unit }}</span>
        </div>

        <div class="scope-note">{{ s.note }}</div>

        <div
          class="scope-bar"
          :style="{ background: s.color }"
        ></div>
      </div>
    </div>

    <!-- Analysis Row -->
    <div class="analysis-row">
      <!-- Monthly Trend -->
      <div class="card trend-card">
        <div class="card-head">
          <h3 class="card-title">月度碳排放趨勢</h3>
        </div>

        <div class="trend-chart">
          <div
            v-for="(v, i) in monthlyData"
            :key="i"
            class="trend-bar"
          >
            <div
              class="trend-fill"
              :style="{ height: v + 'px' }"
            ></div>

            <span class="trend-label">
              {{ months[i] }}
            </span>
          </div>
        </div>
      </div>

      <!-- Scope Breakdown -->
      <div class="card breakdown-card">
        <div class="card-head">
          <h3 class="card-title">範疇排放占比</h3>
        </div>

        <div class="pie-wrap">
          <div
            class="pie-chart"
            :style="{ background: pieGradient }"
          >
            <div class="pie-center">
              <strong>{{ totalEmissions }}</strong>
              <span>tCO₂e</span>
            </div>
          </div>
        </div>

        <div class="legend-list">
          <div
            v-for="s in scopes"
            :key="s.name"
            class="legend-row"
          >
            <div class="legend-left">
              <span
                class="legend-dot"
                :style="{ background: s.color }"
              ></span>
              <span>{{ s.name }}</span>
            </div>
            <span class="legend-value">{{ s.share }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Category + Notes -->
    <div class="bottom-row">
      <div class="card category-card">
        <div class="card-head">
          <h3 class="card-title">主要排放來源</h3>
        </div>

        <div class="category-list">
          <div
            v-for="c in categories"
            :key="c.name"
            class="category-row"
          >
            <span class="category-name">{{ c.name }}</span>
            <span class="category-value">{{ c.value }} tCO₂e</span>
          </div>
        </div>
      </div>

      <div class="card notes-card">
        <div class="card-head">
          <h3 class="card-title">範疇說明</h3>
        </div>

        <div class="note-item">
          <strong>範疇一</strong>
          <p>企業自有或可控制來源所產生的直接溫室氣體排放。</p>
        </div>

        <div class="note-item">
          <strong>範疇二</strong>
          <p>外購電力、蒸氣、熱能或冷能所造成的間接排放。</p>
        </div>

        <div class="note-item">
          <strong>範疇三</strong>
          <p>供應鏈、商務差旅、廢棄物、物流等其他間接排放。</p>
        </div>
      </div>
    </div>

    <!-- Detail Table -->
    <div class="card detail-card">
      <div class="card-head">
        <h3 class="card-title">範疇排放明細</h3>
      </div>

      <div class="table-wrap">
        <table class="detail-table">
          <thead>
            <tr>
              <th>範疇</th>
              <th>類別</th>
              <th>排放量</th>
              <th>變化</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in scopeDetails"
              :key="`${row.scope}-${row.category}`"
            >
              <td>{{ row.scope }}</td>
              <td>{{ row.category }}</td>
              <td>{{ row.value }} tCO₂e</td>
              <td>
                <span :class="row.changeType === 'up' ? 'change-up' : 'change-down'">
                  {{ row.change }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.emissions-page {
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

.header-meta {
  background: #ffffff;
  border-radius: var(--sb-radius-card);
  padding: 14px 18px;
  box-shadow: var(--sb-shadow-card);
  min-width: 160px;
}

.meta-label {
  display: block;
  font-size: 12px;
  color: #8c8c8c;
  margin-bottom: 4px;
}

.meta-value {
  font-size: 22px;
  font-weight: 700;
  color: #333;
}

/* Scope Cards */
.scope-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 28px;
}

.scope-card {
  background: white;
  border-radius: var(--sb-radius-card);
  padding: 20px;
  box-shadow: var(--sb-shadow-card);
}

.scope-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.scope-title {
  font-size: 15px;
  font-weight: 600;
}

.scope-desc {
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 2px;
}

.scope-share {
  font-size: 13px;
  font-weight: 700;
  color: #666;
  background: #f5f7fb;
  border-radius: 999px;
  padding: 4px 10px;
}

.scope-value {
  font-size: 24px;
  font-weight: 700;
  margin-top: 14px;
}

.scope-value span {
  font-size: 13px;
  color: #8c8c8c;
}

.scope-note {
  margin-top: 10px;
  font-size: 12px;
  color: #8c8c8c;
  line-height: 1.6;
  min-height: 38px;
}

.scope-bar {
  height: 6px;
  border-radius: 3px;
  margin-top: 14px;
}

/* Shared cards */
.card {
  background: white;
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
}

.card-subtitle {
  font-size: 12px;
  color: #8c8c8c;
}

/* Analysis Row */
.analysis-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

/* Trend Chart */
.trend-chart {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  height: 220px;
}

.trend-bar {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.trend-fill {
  width: 100%;
  background: linear-gradient(180deg, #4a9b6e 0%, #00754a 100%);
  border-radius: 6px 6px 0 0;
}

.trend-label {
  font-size: 11px;
  margin-top: 8px;
  color: #8c8c8c;
}

/* Pie */
.pie-wrap {
  display: flex;
  justify-content: center;
  margin: 8px 0 18px;
}

.pie-chart {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  position: relative;
}

.pie-center {
  position: absolute;
  inset: 22px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: inset 0 0 0 1px #f0f0f0;
}

.pie-center strong {
  font-size: 24px;
  line-height: 1;
}

.pie-center span {
  margin-top: 4px;
  font-size: 12px;
  color: #8c8c8c;
}

.legend-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.legend-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.legend-left {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #555;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.legend-value {
  font-weight: 600;
  color: #333;
}

/* Bottom row */
.bottom-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

/* Category */
.category-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.category-row:last-child {
  border-bottom: none;
}

.category-name {
  font-weight: 500;
}

.category-value {
  color: #00754a;
  font-weight: 600;
}

/* Notes */
.note-item + .note-item {
  margin-top: 16px;
}

.note-item strong {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
}

.note-item p {
  font-size: 13px;
  color: #8c8c8c;
  line-height: 1.7;
}

/* Table */
.table-wrap {
  overflow-x: auto;
}

.detail-table {
  width: 100%;
  border-collapse: collapse;
}

.detail-table th,
.detail-table td {
  text-align: left;
  padding: 12px 10px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
}

.detail-table th {
  color: #8c8c8c;
  font-weight: 600;
  background: #fafbfc;
}

.change-up {
  color: #e25555;
  font-weight: 600;
}

.change-down {
  color: #2b9f6b;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 1100px) {
  .scope-grid {
    grid-template-columns: 1fr;
  }

  .analysis-row,
  .bottom-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .emissions-page {
    padding: 20px;
  }

  .page-header {
    flex-direction: column;
  }

  .trend-chart {
    gap: 6px;
    height: 180px;
  }

  .card-head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>