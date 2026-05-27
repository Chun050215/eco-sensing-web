<script setup>
import { ref, computed } from 'vue'

const currentUser = '王小明'

const departments = ['業務部', '研發部', '人資部', '行銷部', '物流部']
const activeDept = ref('業務部')

const metricsMap = {
  '業務部': { label: '差旅減碳量', unit: 'kg', icon: 'flight' },
  '研發部': { label: '用電節省量', unit: 'kWh', icon: 'bolt' },
  '人資部': { label: '用紙減少量', unit: '張', icon: 'description' },
  '行銷部': { label: '廢棄物減量', unit: 'kg', icon: 'delete' },
  '物流部': { label: '車輛碳減量', unit: 'kg', icon: 'local_shipping' },
}

const rankingsMap = {
  '業務部': [
    { name: '陳大同', value: 18.4, avatar: 'CD' },
    { name: '林美華', value: 15.2, avatar: 'LM' },
    { name: '王小明', value: 12.6, avatar: 'WX' },
    { name: '張志遠', value: 11.0, avatar: 'ZZ' },
    { name: '劉雅婷', value: 9.8, avatar: 'LY' },
    { name: '吳建國', value: 8.3, avatar: 'WJ' },
    { name: '黃淑慧', value: 7.1, avatar: 'HS' },
  ],
  '研發部': [
    { name: '李宗翰', value: 42, avatar: 'LZ' },
    { name: '周思妤', value: 38, avatar: 'ZS' },
    { name: '蔡明達', value: 35, avatar: 'CM' },
    { name: '鄭雅文', value: 31, avatar: 'ZY' },
    { name: '許文華', value: 28, avatar: 'XW' },
  ],
  '人資部': [
    { name: '吳秀玲', value: 320, avatar: 'WX' },
    { name: '謝宗憲', value: 280, avatar: 'XZ' },
    { name: '楊雅雯', value: 245, avatar: 'YY' },
    { name: '蘇明哲', value: 210, avatar: 'SM' },
    { name: '高翠玲', value: 180, avatar: 'GC' },
  ],
  '行銷部': [
    { name: '廖玉珍', value: 5.8, avatar: 'LY' },
    { name: '余俊傑', value: 4.9, avatar: 'YJ' },
    { name: '潘建安', value: 4.2, avatar: 'PJ' },
    { name: '顏雅琪', value: 3.8, avatar: 'YY' },
    { name: '葉宗明', value: 3.1, avatar: 'YZ' },
  ],
  '物流部': [
    { name: '邱志豪', value: 22.0, avatar: 'QZ' },
    { name: '范淑芬', value: 19.5, avatar: 'FS' },
    { name: '羅建中', value: 16.8, avatar: 'LJ' },
    { name: '徐美玲', value: 14.2, avatar: 'XM' },
    { name: '孫志成', value: 11.6, avatar: 'SZ' },
  ],
}

const rankings = computed(() => rankingsMap[activeDept.value] || [])
const metric = computed(() => metricsMap[activeDept.value])
const myRank = computed(() =>
  rankings.value.findIndex(r => r.name === currentUser) + 1
)

const rewardMap = { 1: { coins: 200, label: '冠軍獎勵', icon: 'emoji_events', color: '#f6bd16' }, 2: { coins: 120, label: '亞軍獎勵', icon: 'emoji_events', color: '#b0b7c3' }, 3: { coins: 80, label: '季軍獎勵', icon: 'military_tech', color: '#cd7f32' } }
const medalMap = { 1: { icon: 'emoji_events', color: '#f6bd16' }, 2: { icon: 'emoji_events', color: '#b0b7c3' }, 3: { icon: 'military_tech', color: '#cd7f32' } }
const barMax = computed(() => Math.max(...rankings.value.map(r => r.value)))

const shareRank = () => {
  const rank = myRank.value
  const text = rank > 0
    ? `我在部門排行榜中名列第 ${rank} 名！一起為減碳努力 🌱`
    : '快來參加部門減碳排行榜！'
  if (navigator.share) {
    navigator.share({ title: '部門碳排行榜', text })
  } else {
    navigator.clipboard?.writeText(text)
    alert('已複製分享內容！')
  }
}
</script>

<template>
  <div class="leaderboard-page">
    <!-- Header -->
    <div class="header">
      <div class="header-title">部門排行榜</div>
      <div class="header-sub">本月減碳個人貢獻排名</div>
      <button class="share-btn" @click="shareRank">
        <span class="material-icons-outlined" style="font-size:18px">share</span>
        分享排名
      </button>
    </div>

    <!-- 我的排名 -->
    <div class="my-rank-card">
      <div class="my-rank-left">
        <div class="my-avatar">{{ currentUser.slice(0, 1) }}</div>
        <div class="my-info">
          <div class="my-name">{{ currentUser }}</div>
          <div class="my-dept">{{ activeDept }}</div>
        </div>
      </div>
      <div class="my-rank-right">
        <template v-if="myRank > 0">
          <div class="rank-big">
            <span v-if="medalMap[myRank]" class="material-icons-outlined" :style="{ color: medalMap[myRank].color, fontSize: '36px' }">{{ medalMap[myRank].icon }}</span>
            <span v-else class="rank-num">#{{ myRank }}</span>
          </div>
          <div class="rank-lbl">本月排名</div>
        </template>
        <template v-else>
          <div class="rank-big">
            <span class="material-icons-outlined" style="font-size:30px;color:#d0d0d0">person_off</span>
          </div>
          <div class="rank-lbl no-rank">非本部門</div>
        </template>
      </div>
    </div>

    <!-- 部門切換 -->
    <div class="dept-scroll">
      <button
        v-for="dept in departments" :key="dept"
        class="dept-chip"
        :class="{ active: activeDept === dept }"
        @click="activeDept = dept"
      >
        {{ dept }}
      </button>
    </div>

    <!-- 指標說明 -->
    <div class="metric-banner">
      <span class="material-icons-outlined" style="font-size:18px;color:#5b8ff9">{{ metric.icon }}</span>
      <span>本月排名指標：<strong>{{ metric.label }}</strong>（{{ metric.unit }}）</span>
    </div>

    <!-- 獎勵說明 -->
    <div class="reward-row">
      <div v-for="(r, rank) in rewardMap" :key="rank" class="reward-chip">
        <div class="reward-chip-title">
          <span class="material-icons-outlined" :style="{ color: r.color, fontSize: '16px' }">{{ r.icon }}</span>
          <span>{{ r.label }}</span>
        </div>
        <span class="reward-coins">
          <span class="material-icons-outlined" style="font-size:14px;vertical-align:middle;color:#d48806">monetization_on</span>
          {{ r.coins }} 幣
        </span>
      </div>
    </div>

    <!-- 排行清單 -->
    <div class="rank-list">
      <div
        v-for="(item, index) in rankings" :key="item.name"
        class="rank-row"
        :class="{ 'is-me': item.name === currentUser, 'is-top3': index < 3 }"
      >
        <div class="rank-pos">
          <span v-if="index < 3" class="medal">
            <span class="material-icons-outlined" :style="{ color: medalMap[index + 1].color, fontSize: '24px' }">{{ medalMap[index + 1].icon }}</span>
          </span>
          <span v-else class="rank-num-plain">#{{ index + 1 }}</span>
        </div>

        <div class="rank-avatar" :class="`color-${index % 5}`">{{ item.avatar }}</div>

        <div class="rank-info">
          <div class="rank-name">
            {{ item.name }}
            <span v-if="item.name === currentUser" class="me-badge">我</span>
          </div>
          <div class="rank-bar-wrap">
            <div class="rank-bar">
              <div
                class="rank-bar-fill"
                :class="`fill-${index % 5}`"
                :style="{ width: (item.value / barMax * 100) + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <div class="rank-value">
          <strong>{{ item.value }}</strong>
          <span>{{ metric.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.leaderboard-page { padding-bottom: 8px; }

/* Header */
.header {
  padding: 52px 20px 56px;
  background: linear-gradient(145deg, #f6bd16 0%, #e0a010 100%);
  color: #fff;
  position: relative;
}
.header-title { font-size: 24px; font-weight: 800; }
.header-sub { font-size: 13px; opacity: 0.85; margin-top: 4px; }
.share-btn {
  position: absolute;
  top: 52px; right: 20px;
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(255,255,255,0.25);
  border: none;
  border-radius: 20px;
  padding: 7px 14px;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  backdrop-filter: blur(4px);
}

/* My Rank Card */
.my-rank-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  margin: -40px 16px 16px;
  border-radius: 16px;
  padding: 16px 20px;
  box-shadow: 0 6px 24px rgba(246,189,22,0.25);
  position: relative;
  z-index: 2;
}
.my-rank-left { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
.my-info { min-width: 0; }
.my-avatar {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f6bd16, #e0a010);
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; font-weight: 800;
}
.my-name { font-size: 15px; font-weight: 700; color: #1a1a2e; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.my-dept { font-size: 12px; color: #8c8c8c; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.my-rank-right { text-align: center; flex-shrink: 0; }
.rank-big { line-height: 1; display: flex; align-items: center; justify-content: center; }
.rank-num { font-size: 22px; font-weight: 800; color: #555; }
.rank-lbl { font-size: 11px; color: #8c8c8c; margin-top: 3px; }
.rank-lbl.no-rank { color: #b0b7c3; }

/* Dept Scroll */
.dept-scroll {
  display: flex;
  gap: 8px;
  padding: 0 16px 14px;
  overflow-x: auto;
  scrollbar-width: none;
}
.dept-scroll::-webkit-scrollbar { display: none; }
.dept-chip {
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
.dept-chip.active {
  background: #f6bd16;
  color: #fff;
  border-color: #f6bd16;
  font-weight: 700;
}

/* Metric Banner */
.metric-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 16px 12px;
  padding: 10px 14px;
  background: #f0f4ff;
  border-radius: 10px;
  font-size: 13px;
  color: #555;
}

/* Reward Row */
.reward-row {
  display: flex;
  gap: 8px;
  padding: 0 16px 14px;
  overflow-x: auto;
  scrollbar-width: none;
}
.reward-row::-webkit-scrollbar { display: none; }
.reward-chip {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: #fff;
  border-radius: 12px;
  padding: 10px 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  font-size: 12px;
  color: #555;
  font-weight: 600;
}
.reward-chip-title { display: flex; align-items: center; gap: 4px; font-weight: 600; }
.reward-coins { font-size: 13px; color: #d48806; font-weight: 700; display: flex; align-items: center; gap: 3px; }

/* Rank List */
.rank-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
}
.rank-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border-radius: 14px;
  padding: 12px 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: transform 0.15s;
}
.rank-row.is-me {
  border: 2px solid #f6bd16;
  background: #fffef0;
}
.rank-pos { width: 28px; text-align: center; flex-shrink: 0; }
.medal { display: flex; align-items: center; justify-content: center; }
.rank-num-plain { font-size: 13px; font-weight: 700; color: #b0b7c3; }
.rank-avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 800; color: #fff;
  flex-shrink: 0;
}
.color-0 { background: #5b8ff9; }
.color-1 { background: #5ad8a6; }
.color-2 { background: #f6bd16; }
.color-3 { background: #ff7875; }
.color-4 { background: #9270ca; }
.rank-info { flex: 1; min-width: 0; }
.rank-name { font-size: 13px; font-weight: 700; color: #1a1a2e; display: flex; align-items: center; gap: 5px; margin-bottom: 5px; }
.me-badge {
  font-size: 10px; font-weight: 700;
  background: #f6bd16; color: #fff;
  padding: 1px 6px; border-radius: 6px;
}
.rank-bar-wrap { width: 100%; }
.rank-bar {
  height: 6px;
  background: #f0f0f0;
  border-radius: 999px;
  overflow: hidden;
}
.rank-bar-fill { height: 100%; border-radius: 999px; transition: width 0.4s; }
.fill-0 { background: #5b8ff9; }
.fill-1 { background: #5ad8a6; }
.fill-2 { background: #f6bd16; }
.fill-3 { background: #ff7875; }
.fill-4 { background: #9270ca; }
.rank-value { text-align: right; flex-shrink: 0; }
.rank-value strong { display: block; font-size: 16px; font-weight: 800; color: #1a1a2e; }
.rank-value span { font-size: 10px; color: #8c8c8c; }
</style>
