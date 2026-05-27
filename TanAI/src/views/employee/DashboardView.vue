<script setup>
import { ref, computed } from 'vue'

const userName = ref('王小明')
const exp = ref(1240)
const expToNext = ref(2000)
const coins = ref(380)
const level = ref(7)

// 圓餅圖資料
const emissions = ref([
  { label: '差旅', value: 42, color: '#5b8ff9' },
  { label: '廢棄物', value: 28, color: '#5ad8a6' },
])
const totalEmissions = computed(() => emissions.value.reduce((s, e) => s + e.value, 0))
const pieGradient = computed(() => {
  let offset = 0
  const parts = emissions.value.map(e => {
    const pct = (e.value / totalEmissions.value) * 100
    const start = offset
    offset += pct
    return `${e.color} ${start.toFixed(1)}% ${offset.toFixed(1)}%`
  })
  return `conic-gradient(${parts.join(', ')})`
})

// 日常任務
const tasks = ref([
  { id: 1, icon: 'directions_bus', label: '搭乘大眾運輸', exp: 10, coins: 5, done: false },
  { id: 2, icon: 'stairs', label: '爬樓梯取代電梯', exp: 8, coins: 4, done: true },
  { id: 3, icon: 'delete', label: '資源回收分類', exp: 12, coins: 6, done: false },
  { id: 4, icon: 'local_cafe', label: '自帶環保杯', exp: 8, coins: 4, done: false },
])
const completedTasks = computed(() => tasks.value.filter(t => t.done).length)

const toggleTask = (task) => {
  if (!task.done) {
    task.done = true
    exp.value += task.exp
    coins.value += task.coins
  }
}

const shareData = () => {
  const text = `我本月碳排放 ${totalEmissions.value} kg，一起為地球努力！ 🌱`
  if (navigator.share) {
    navigator.share({ title: '我的碳排放紀錄', text })
  } else {
    navigator.clipboard?.writeText(text)
    alert('已複製分享內容！')
  }
}
</script>

<template>
  <div class="dashboard">
    <!-- Header -->
    <div class="header">
      <div class="greeting">
        <div class="greeting-sub"><span class="material-icons-outlined" style="font-size:15px;vertical-align:middle">waving_hand</span> 早安</div>
        <div class="greeting-hi">{{ userName }}</div>
      </div>
      <div class="header-right">
        <div class="badge-chip">
          <span class="material-icons-outlined" style="color:#f6bd16;font-size:16px">star</span>
          <span>Lv.{{ level }}</span>
        </div>
        <div class="badge-chip">
          <span class="material-icons-outlined" style="color:#5ad8a6;font-size:16px">toll</span>
          <span>{{ coins }} 幣</span>
        </div>
      </div>
    </div>

    <!-- EXP Bar -->
    <div class="exp-card">
      <div class="exp-row">
        <span class="exp-label"><span class="material-icons-outlined" style="font-size:15px;vertical-align:middle">bolt</span> 經驗值</span>
        <span class="exp-num">{{ exp.toLocaleString() }} / {{ expToNext.toLocaleString() }}</span>
      </div>
      <div class="exp-track">
        <div class="exp-fill" :style="{ width: (exp / expToNext * 100) + '%' }"></div>
      </div>
      <div class="exp-hint">再獲得 {{ (expToNext - exp).toLocaleString() }} EXP 即可升級</div>
    </div>

    <!-- 月度碳排圓餅圖 -->
    <div class="card">
      <div class="card-head">
        <div>
          <div class="card-title">月度碳排組成</div>
          <div class="card-sub">2026年 3月</div>
        </div>
        <button class="share-btn" @click="shareData">
          <span class="material-icons-outlined">share</span>
        </button>
      </div>
      <div class="pie-row">
        <div class="donut-wrap">
          <div class="donut" :style="{ background: pieGradient }">
            <div class="donut-center">
              <strong>{{ totalEmissions }}</strong>
              <span>公斤</span>
            </div>
          </div>
        </div>
        <div class="pie-legend">
          <div v-for="e in emissions" :key="e.label" class="legend-row">
            <span class="legend-dot" :style="{ background: e.color }"></span>
            <span class="legend-name">{{ e.label }}</span>
            <span class="legend-val">{{ e.value }} kg</span>
            <span class="legend-pct">{{ (e.value / totalEmissions * 100).toFixed(0) }}%</span>
          </div>
          <div class="legend-total">
            <span>合計</span>
            <span class="total-val">{{ totalEmissions }} kg CO₂e</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 未來開發佔位卡片 -->
    <div class="card coming-soon">
      <div class="cs-icon">
        <span class="material-icons-outlined">directions_run</span>
      </div>
      <div class="cs-info">
        <div class="cs-title">月度減碳活動統計</div>
        <div class="cs-sub">減碳量（公斤）追蹤</div>
      </div>
      <span class="cs-badge">即將推出</span>
    </div>

    <div class="card coming-soon">
      <div class="cs-icon">
        <span class="material-icons-outlined">bolt</span>
      </div>
      <div class="cs-info">
        <div class="cs-title">能源活動統計</div>
        <div class="cs-sub">電梯搭乘、數位碳足跡</div>
      </div>
      <span class="cs-badge">即將推出</span>
    </div>

    <!-- 日常任務 -->
    <div class="card">
      <div class="card-head">
        <div class="card-title">今日任務</div>
        <span class="task-badge">{{ completedTasks }}/{{ tasks.length }} 完成</span>
      </div>
      <div class="task-list">
        <div
          v-for="task in tasks" :key="task.id"
          class="task-row"
          :class="{ done: task.done }"
          @click="toggleTask(task)"
        >
          <span class="material-icons-outlined task-check">
            {{ task.done ? 'check_circle' : 'radio_button_unchecked' }}
          </span>
          <span class="material-icons-outlined task-icon">{{ task.icon }}</span>
          <span class="task-label">{{ task.label }}</span>
          <div class="task-rewards">
            <span class="reward exp-r">+{{ task.exp }} EXP</span>
            <span class="reward coin-r">+{{ task.coins }}幣</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard { padding-bottom: 8px; }

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 52px 20px 56px;
  background: linear-gradient(145deg, #4a7cf7 0%, #3060d8 100%);
  color: #fff;
}
.greeting-sub { font-size: 13px; opacity: 0.75; }
.greeting-hi { font-size: 22px; font-weight: 800; margin-top: 2px; }
.header-right { display: flex; gap: 8px; flex-direction: column; align-items: flex-end; }
.badge-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(255,255,255,0.2);
  border-radius: 20px;
  padding: 5px 11px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  backdrop-filter: blur(4px);
}

/* EXP Card */
.exp-card {
  background: #fff;
  margin: -40px 16px 16px;
  border-radius: 16px;
  padding: 16px 18px;
  box-shadow: 0 6px 24px rgba(74,124,247,0.18);
}
.exp-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.exp-label { font-size: 13px; font-weight: 700; color: #555; }
.exp-num { font-size: 12px; color: #5b8ff9; font-weight: 700; }
.exp-track { height: 10px; background: #eef0f4; border-radius: 999px; overflow: hidden; }
.exp-fill {
  height: 100%;
  background: linear-gradient(90deg, #5b8ff9, #7dd3fc);
  border-radius: 999px;
  transition: width 0.4s ease;
}
.exp-hint { font-size: 11px; color: #8c8c8c; margin-top: 8px; }

/* Cards */
.card {
  background: #fff;
  border-radius: 16px;
  padding: 18px 16px;
  margin: 0 16px 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.card-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
.card-title { font-size: 15px; font-weight: 700; color: #1a1a2e; }
.card-sub { font-size: 12px; color: #8c8c8c; margin-top: 3px; }
.share-btn {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: #f0f4ff;
  border: none;
  color: #5b8ff9;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}
.share-btn .material-icons-outlined { font-size: 18px; }

/* Donut */
.pie-row { display: flex; align-items: center; gap: 16px; }
.donut-wrap { flex-shrink: 0; }
.donut {
  width: 130px; height: 130px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.donut-center {
  width: 84px; height: 84px;
  border-radius: 50%;
  background: #fff;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  box-shadow: 0 0 0 1px #f0f0f0;
}
.donut-center strong { font-size: 24px; font-weight: 800; color: #1a1a2e; line-height: 1; }
.donut-center span { font-size: 11px; color: #8c8c8c; margin-top: 2px; }

.pie-legend { flex: 1; display: flex; flex-direction: column; gap: 10px; }
.legend-row { display: flex; align-items: center; gap: 7px; }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.legend-name { flex: 1; font-size: 13px; color: #555; }
.legend-val { font-size: 13px; font-weight: 700; color: #333; }
.legend-pct { font-size: 11px; color: #8c8c8c; min-width: 32px; text-align: right; }
.legend-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
  font-size: 12px;
  color: #8c8c8c;
}
.total-val { font-weight: 700; color: #333; font-size: 12px; }

/* Coming Soon */
.coming-soon { display: flex; align-items: center; gap: 12px; }
.cs-icon {
  width: 42px; height: 42px;
  border-radius: 12px;
  background: #f0f4ff;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.cs-icon .material-icons-outlined { font-size: 22px; color: #5b8ff9; }
.cs-info { flex: 1; }
.cs-title { font-size: 14px; font-weight: 600; color: #333; }
.cs-sub { font-size: 12px; color: #8c8c8c; margin-top: 2px; }
.cs-badge {
  font-size: 10px;
  font-weight: 600;
  color: #8c8c8c;
  background: #f5f7fa;
  padding: 4px 10px;
  border-radius: 999px;
  white-space: nowrap;
  border: 1px solid #eef0f4;
}

/* Tasks */
.task-badge {
  font-size: 12px;
  font-weight: 700;
  color: #5b8ff9;
  background: #f0f4ff;
  padding: 4px 12px;
  border-radius: 999px;
}
.task-list { display: flex; flex-direction: column; gap: 8px; }
.task-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: #f9fbff;
  border-radius: 12px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  user-select: none;
}
.task-row:active { transform: scale(0.98); }
.task-row.done { opacity: 0.45; }
.task-check { font-size: 22px; color: #c8d6f8; flex-shrink: 0; }
.task-row.done .task-check { color: #5ad8a6; }
.task-icon { font-size: 18px; color: #8c8c8c; }
.task-label { flex: 1; font-size: 13px; color: #333; font-weight: 500; }
.task-rewards { display: flex; flex-direction: column; gap: 3px; align-items: flex-end; }
.reward { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 6px; white-space: nowrap; }
.exp-r { background: #fff7e6; color: #d48806; }
.coin-r { background: #f6ffed; color: #389e0d; }
</style>
