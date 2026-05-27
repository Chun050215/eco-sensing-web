<script setup>
import { ref, computed } from 'vue'

const categories = ['全部', '交通', '廢棄物', '能源', '飲食', '辦公']
const activeCategory = ref('全部')

const actions = ref([
  { id: 1, icon: 'directions_bus', category: '交通', title: '搭乘大眾運輸', desc: '上班途中使用捷運、公車或火車', exp: 10, coins: 5, co2: 2.4, difficulty: '簡單' },
  { id: 2, icon: 'directions_bike', category: '交通', title: '騎乘自行車', desc: '短途通勤改以自行車代步', exp: 15, coins: 8, co2: 3.2, difficulty: '中等' },
  { id: 3, icon: 'directions_walk', category: '交通', title: '步行通勤', desc: '1公里內選擇步行取代搭車', exp: 10, coins: 5, co2: 2.0, difficulty: '簡單' },
  { id: 4, icon: 'stairs', category: '能源', title: '爬樓梯', desc: '5層樓以內選擇爬樓梯', exp: 8, coins: 4, co2: 0.5, difficulty: '簡單' },
  { id: 5, icon: 'power_settings_new', category: '能源', title: '關閉待機電源', desc: '離開辦公室前確認關閉所有電源', exp: 10, coins: 5, co2: 1.0, difficulty: '簡單' },
  { id: 6, icon: 'light_mode', category: '能源', title: '善用自然光', desc: '白天盡量減少開燈，利用自然採光', exp: 8, coins: 4, co2: 0.8, difficulty: '簡單' },
  { id: 7, icon: 'delete', category: '廢棄物', title: '資源回收分類', desc: '確實做好垃圾分類與資源回收', exp: 12, coins: 6, co2: 1.8, difficulty: '簡單' },
  { id: 8, icon: 'shopping_bag', category: '廢棄物', title: '自帶購物袋', desc: '外出購物不使用一次性塑膠袋', exp: 8, coins: 4, co2: 0.6, difficulty: '簡單' },
  { id: 9, icon: 'local_cafe', category: '飲食', title: '自帶環保杯', desc: '購買飲料時使用自備容器', exp: 8, coins: 4, co2: 0.8, difficulty: '簡單' },
  { id: 10, icon: 'lunch_dining', category: '飲食', title: '選擇蔬食餐點', desc: '午餐選擇植物性蛋白質餐點', exp: 15, coins: 7, co2: 2.0, difficulty: '中等' },
  { id: 11, icon: 'print_disabled', category: '辦公', title: '減少紙張使用', desc: '改用數位文件，減少列印', exp: 10, coins: 5, co2: 1.2, difficulty: '簡單' },
  { id: 12, icon: 'videocam', category: '辦公', title: '以視訊取代出差', desc: '短程商務會議使用線上視訊', exp: 20, coins: 10, co2: 5.0, difficulty: '中等' },
])

const completedIds = ref(new Set([]))

const filteredActions = computed(() =>
  activeCategory.value === '全部'
    ? actions.value
    : actions.value.filter(a => a.category === activeCategory.value)
)

const difficultyStyle = (d) => {
  if (d === '簡單') return { color: '#389e0d', background: '#f6ffed' }
  if (d === '中等') return { color: '#d46b08', background: '#fff7e6' }
  return { color: '#cf1322', background: '#fff1f0' }
}

const completeAction = (action) => {
  if (completedIds.value.has(action.id)) return
  completedIds.value = new Set([...completedIds.value, action.id])
}
</script>

<template>
  <div class="actions-page">
    <!-- Header -->
    <div class="header">
      <div class="header-title">i 減碳</div>
      <div class="header-sub">選擇今日減碳行動，累積獎勵</div>
    </div>

    <!-- 統計列 -->
    <div class="stats-row">
      <div class="stat-item">
        <span class="stat-num">{{ completedIds.size }}</span>
        <span class="stat-lbl">已完成</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-num">
          {{ [...completedIds].reduce((s, id) => s + (actions.find(a => a.id === id)?.exp || 0), 0) }}
        </span>
        <span class="stat-lbl">EXP 獲得</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-num">
          {{ [...completedIds].reduce((s, id) => s + (actions.find(a => a.id === id)?.co2 || 0), 0).toFixed(1) }}
        </span>
        <span class="stat-lbl">kg CO₂ 減少</span>
      </div>
    </div>

    <!-- 分類篩選 -->
    <div class="category-scroll">
      <button
        v-for="cat in categories" :key="cat"
        class="cat-chip"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <!-- 活動列表 -->
    <div class="action-list">
      <div
        v-for="action in filteredActions" :key="action.id"
        class="action-card"
        :class="{ completed: completedIds.has(action.id) }"
      >
        <div class="action-icon-wrap">
          <span class="material-icons-outlined action-icon">{{ action.icon }}</span>
        </div>
        <div class="action-body">
          <div class="action-top">
            <span class="action-title">{{ action.title }}</span>
            <span class="difficulty-badge" :style="difficultyStyle(action.difficulty)">
              {{ action.difficulty }}
            </span>
          </div>
          <div class="action-desc">{{ action.desc }}</div>
          <div class="action-rewards">
            <div class="reward-chips">
              <span class="rchip exp-chip"><span class="material-icons-outlined" style="font-size:11px;vertical-align:middle">bolt</span> {{ action.exp }} EXP</span>
              <span class="rchip coin-chip"><span class="material-icons-outlined" style="font-size:11px;vertical-align:middle">monetization_on</span> {{ action.coins }} 幣</span>
              <span class="rchip co2-chip"><span class="material-icons-outlined" style="font-size:11px;vertical-align:middle">eco</span> -{{ action.co2 }} kg</span>
            </div>
            <button
              class="complete-btn"
              :class="{ done: completedIds.has(action.id) }"
              @click="completeAction(action)"
            >
              <span class="material-icons-outlined" style="font-size:16px">
                {{ completedIds.has(action.id) ? 'check_circle' : 'add_circle_outline' }}
              </span>
              {{ completedIds.has(action.id) ? '已完成' : '完成' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.actions-page { padding-bottom: 8px; }

/* Header */
.header {
  padding: 52px 20px 56px;
  background: linear-gradient(145deg, #3dbf8a 0%, #1a9e6a 100%);
  color: #fff;
}
.header-title { font-size: 24px; font-weight: 800; }
.header-sub { font-size: 13px; opacity: 0.8; margin-top: 4px; }

/* Stats Row */
.stats-row {
  display: flex;
  align-items: center;
  background: #fff;
  margin: -40px 16px 16px;
  border-radius: 16px;
  padding: 16px 0;
  box-shadow: 0 6px 24px rgba(61,191,138,0.15);
}
.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.stat-num { font-size: 22px; font-weight: 800; color: #1a1a2e; }
.stat-lbl { font-size: 11px; color: #8c8c8c; font-weight: 500; }
.stat-divider { width: 1px; height: 32px; background: #eef0f4; }

/* Category Scroll */
.category-scroll {
  display: flex;
  gap: 8px;
  padding: 0 16px 14px;
  overflow-x: auto;
  scrollbar-width: none;
}
.category-scroll::-webkit-scrollbar { display: none; }
.cat-chip {
  flex-shrink: 0;
  padding: 7px 16px;
  border-radius: 999px;
  border: 1.5px solid #eef0f4;
  background: #fff;
  color: #8c8c8c;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.18s;
}
.cat-chip.active {
  background: #3dbf8a;
  color: #fff;
  border-color: #3dbf8a;
  font-weight: 700;
}

/* Action List */
.action-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 16px;
}
.action-card {
  display: flex;
  gap: 14px;
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: opacity 0.2s;
}
.action-card.completed { opacity: 0.5; }
.action-icon-wrap {
  width: 46px; height: 46px;
  border-radius: 14px;
  background: #f0faf6;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.action-icon { font-size: 24px; color: #3dbf8a; }
.action-body { flex: 1; min-width: 0; }
.action-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px; }
.action-title { font-size: 14px; font-weight: 700; color: #1a1a2e; }
.difficulty-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
  flex-shrink: 0;
}
.action-desc { font-size: 12px; color: #8c8c8c; line-height: 1.5; margin-bottom: 10px; }
.action-rewards { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.reward-chips { display: flex; gap: 5px; flex-wrap: wrap; }
.rchip {
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 6px;
}
.exp-chip { background: #fff7e6; color: #d48806; }
.coin-chip { background: #f6ffed; color: #389e0d; }
.co2-chip { background: #f0faf6; color: #1a9e6a; }
.complete-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 7px 13px;
  border-radius: 999px;
  border: none;
  background: #3dbf8a;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.18s;
  flex-shrink: 0;
}
.complete-btn.done { background: #eef0f4; color: #8c8c8c; cursor: default; }
</style>
