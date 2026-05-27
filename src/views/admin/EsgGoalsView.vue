<script setup>
import { ref } from 'vue'

const goalSummary = ref([
  { title: '年度減碳目標', value: '30', unit: '%' },
  { title: '目前達成率', value: '68', unit: '%' },
  { title: '淨零目標年', value: '2050', unit: '' },
  { title: '追蹤中目標', value: '6', unit: '項' }
])

const goals = ref([
  {
    title: '降低範疇一排放',
    description: '透過設備汰換與燃料優化，降低直接排放量。',
    progress: 72,
    status: '進行中'
  },
  {
    title: '降低範疇二用電排放',
    description: '提升能源效率並導入再生能源使用比例。',
    progress: 64,
    status: '進行中'
  },
  {
    title: '控管範疇三供應鏈排放',
    description: '建立供應鏈碳排放資料蒐集與管理制度。',
    progress: 51,
    status: '進行中'
  },
  {
    title: '提升廢棄物回收率',
    description: '增加智慧垃圾桶與分類管理，提升回收效率。',
    progress: 83,
    status: '穩定達成'
  }
])

const milestones = ref([
  { year: '2025', target: '完成全公司範疇一、二、三盤查建置' },
  { year: '2030', target: '整體碳排放較基準年降低 30%' },
  { year: '2040', target: '主要營運據點全面導入綠電' },
  { year: '2050', target: '達成企業淨零排放目標' }
])
</script>

<template>
  <div class="goals-page admin-page">

    <div class="page-header">
      <h1>ESG 目標</h1>
      <p>企業永續目標與減碳進度管理</p>
    </div>

    <!-- Summary -->
    <div class="summary-grid">
      <div
        v-for="item in goalSummary"
        :key="item.title"
        class="summary-card"
      >
        <div class="summary-title">{{ item.title }}</div>
        <div class="summary-value">
          {{ item.value }}
          <span>{{ item.unit }}</span>
        </div>
      </div>
    </div>

    <!-- Goals Progress -->
    <div class="card">
      <h3 class="card-title">永續目標進度</h3>

      <div class="goal-list">
        <div
          v-for="goal in goals"
          :key="goal.title"
          class="goal-item"
        >
          <div class="goal-top">
            <div>
              <div class="goal-title">{{ goal.title }}</div>
              <div class="goal-desc">{{ goal.description }}</div>
            </div>
            <span class="goal-status">{{ goal.status }}</span>
          </div>

          <div class="progress-row">
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: goal.progress + '%' }"
              ></div>
            </div>
            <span class="progress-text">{{ goal.progress }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Milestones -->
    <div class="card">
      <h3 class="card-title">ESG 里程碑</h3>

      <div class="timeline">
        <div
          v-for="item in milestones"
          :key="item.year"
          class="timeline-item"
        >
          <div class="timeline-year">{{ item.year }}</div>
          <div class="timeline-content">{{ item.target }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.goals-page {
  padding: 28px 32px;
}

.page-header h1 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 6px;
}

.page-header p {
  color: #8c8c8c;
  margin-bottom: 24px;
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
}

.summary-title {
  font-size: 13px;
  color: #8c8c8c;
  margin-bottom: 8px;
}

.summary-value {
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

.summary-value span {
  font-size: 12px;
  color: #8c8c8c;
}

.card {
  background: #fff;
  border-radius: var(--sb-radius-card);
  padding: 20px;
  box-shadow: var(--sb-shadow-card);
  margin-bottom: 20px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.goal-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.goal-item {
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.goal-item:last-child {
  border-bottom: none;
}

.goal-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
}

.goal-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.goal-desc {
  font-size: 13px;
  color: #8c8c8c;
  line-height: 1.6;
}

.goal-status {
  font-size: 12px;
  font-weight: 600;
  color: #00754a;
  background: #f5f7fb;
  padding: 6px 10px;
  border-radius: 999px;
  white-space: nowrap;
}

.progress-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  height: 10px;
  background: #f0f0f0;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00754a, #006241);
  border-radius: 999px;
}

.progress-text {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  min-width: 42px;
  text-align: right;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 16px;
  align-items: start;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.timeline-item:last-child {
  border-bottom: none;
}

.timeline-year {
  font-size: 14px;
  font-weight: 700;
  color: #00754a;
}

.timeline-content {
  font-size: 14px;
  color: #555;
  line-height: 1.6;
}

@media (max-width: 1000px) {
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .goals-page {
    padding: 20px;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .goal-top {
    flex-direction: column;
  }

  .timeline-item {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}
</style>