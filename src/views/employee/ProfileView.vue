<script setup>
import { ref } from 'vue'

// 個人資料
const profile = ref({
  displayName: '王小明',
  name: '王小明',
  account: 'wangxm',
  email: 'wangxm@tanai-demo.com',
  phone: '0912-345-678',
  company: 'Eco Sensing',
  department: '業務部',
})

// 密碼
const passwordForm = ref({ current: '', newPwd: '', confirm: '' })
const showPasswordForm = ref(false)

// 經驗 / 貨幣
const exp = ref(1240)
const expToNext = ref(2000)
const level = ref(7)
const coins = ref(380)

// 成就
const achievements = ref([
  { id: 1, icon: 'train', title: '大眾運輸達人', desc: '搭乘大眾運輸 30 次', earned: true, displayed: true },
  { id: 2, icon: 'eco', title: '蔬食鬥士', desc: '選擇蔬食餐點 10 次', earned: true, displayed: false },
  { id: 3, icon: 'recycling', title: '回收先鋒', desc: '資源回收分類 20 次', earned: true, displayed: true },
  { id: 4, icon: 'directions_bike', title: '自行車騎士', desc: '騎乘自行車通勤 15 次', earned: false, displayed: false },
  { id: 5, icon: 'lightbulb', title: '節電守衛', desc: '關閉待機電源 25 次', earned: false, displayed: false },
  { id: 6, icon: 'emoji_events', title: '減碳冠軍', desc: '部門排行榜第一名', earned: false, displayed: false },
])

const toggleDisplay = (ach) => {
  if (ach.earned) ach.displayed = !ach.displayed
}

// 系統設定
const settings = ref({
  theme: 'light',
  language: 'zh-TW',
  notification: true,
  weeklyReport: true,
})

const activeTab = ref('info') // info | achievements | settings

const shareProfile = () => {
  const text = `我是 Eco Sensing 碳排查平台的減碳勇士\nLv.${level.value}  EXP ${exp.value}  幣 ${coins.value}`
  if (navigator.share) {
    navigator.share({ title: '我的減碳檔案', text })
  } else {
    navigator.clipboard?.writeText(text)
    alert('已複製分享內容！')
  }
}
</script>

<template>
  <div class="profile-page">
    <!-- Header -->
    <div class="header">
      <div class="avatar-wrap">
        <div class="avatar">{{ profile.displayName.slice(0, 1) }}</div>
        <div class="level-badge">Lv.{{ level }}</div>
      </div>
      <div class="header-info">
        <div class="display-name">{{ profile.displayName }}</div>
        <div class="dept-tag">{{ profile.company }} · {{ profile.department }}</div>
        <div class="ach-row">
          <span
            v-for="a in achievements.filter(a => a.displayed && a.earned)" :key="a.id"
            class="material-icons-outlined ach-icon" :title="a.title"
          >{{ a.icon }}</span>
        </div>
      </div>
      <button class="share-btn" @click="shareProfile">
        <span class="material-icons-outlined" style="font-size:18px">share</span>
      </button>
    </div>

    <!-- 經驗 / 貨幣 -->
    <div class="stat-card">
      <div class="stat-col">
        <span class="stat-num">{{ exp.toLocaleString() }}</span>
        <span class="stat-lbl"><span class="material-icons-outlined" style="font-size:14px;vertical-align:middle">bolt</span> 經驗值</span>
        <div class="stat-track">
          <div class="stat-fill" :style="{ width: (exp / expToNext * 100) + '%' }"></div>
        </div>
        <span class="stat-hint">距升級還差 {{ (expToNext - exp).toLocaleString() }}</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-col">
        <span class="stat-num">{{ coins }}</span>
        <span class="stat-lbl"><span class="material-icons-outlined" style="font-size:14px;vertical-align:middle">monetization_on</span> 獎勵貨幣</span>
        <span class="stat-hint">可兌換獎品</span>
      </div>
    </div>

    <!-- Tab 切換 -->
    <div class="tab-bar">
      <button
        v-for="t in [{ key: 'info', label: '個人資料' }, { key: 'achievements', label: '成就' }, { key: 'settings', label: '系統設定' }]"
        :key="t.key"
        class="tab-btn"
        :class="{ active: activeTab === t.key }"
        @click="activeTab = t.key"
      >
        {{ t.label }}
      </button>
    </div>

    <!-- === 個人資料 === -->
    <div v-if="activeTab === 'info'" class="tab-content">
      <div class="card">
        <div class="form-title">基本資料</div>
        <div class="form-list">
          <div class="form-item">
            <label>顯示名稱</label>
            <input v-model="profile.displayName" type="text" />
          </div>
          <div class="form-item">
            <label>姓名</label>
            <input v-model="profile.name" type="text" />
          </div>
          <div class="form-item">
            <label>帳號</label>
            <input v-model="profile.account" type="text" />
          </div>
          <div class="form-item">
            <label>Email</label>
            <input v-model="profile.email" type="email" />
          </div>
          <div class="form-item">
            <label>電話</label>
            <input v-model="profile.phone" type="tel" />
          </div>
          <div class="form-item locked">
            <label>所屬公司 <span class="material-icons-outlined lock-icon">lock</span></label>
            <input :value="profile.company" type="text" disabled />
          </div>
          <div class="form-item locked">
            <label>所屬部門 <span class="material-icons-outlined lock-icon">lock</span></label>
            <input :value="profile.department" type="text" disabled />
          </div>
        </div>

        <!-- 更改密碼 -->
        <button class="expand-btn" @click="showPasswordForm = !showPasswordForm">
          <span class="material-icons-outlined" style="font-size:16px">lock</span>
          更改密碼
          <span class="material-icons-outlined" style="font-size:16px;margin-left:auto">
            {{ showPasswordForm ? 'expand_less' : 'expand_more' }}
          </span>
        </button>
        <div v-if="showPasswordForm" class="form-list pwd-form">
          <div class="form-item">
            <label>目前密碼</label>
            <input v-model="passwordForm.current" type="password" placeholder="請輸入目前密碼" />
          </div>
          <div class="form-item">
            <label>新密碼</label>
            <input v-model="passwordForm.newPwd" type="password" placeholder="至少 8 個字元" />
          </div>
          <div class="form-item">
            <label>確認新密碼</label>
            <input v-model="passwordForm.confirm" type="password" placeholder="再次輸入新密碼" />
          </div>
        </div>

        <button class="save-btn">儲存變更</button>
      </div>
    </div>

    <!-- === 成就 === -->
    <div v-if="activeTab === 'achievements'" class="tab-content">
      <div class="card">
        <div class="form-title">成就展示櫃</div>
        <div class="display-shelf">
          <div
            v-for="a in achievements.filter(a => a.displayed && a.earned)" :key="a.id"
            class="shelf-item"
          >
            <span class="material-icons-outlined shelf-icon">{{ a.icon }}</span>
            <span class="shelf-name">{{ a.title }}</span>
          </div>
          <div v-if="!achievements.some(a => a.displayed && a.earned)" class="shelf-empty">
            尚未設定展示成就
          </div>
        </div>
      </div>
      <div class="card">
        <div class="form-title">所有成就</div>
        <div class="ach-list">
          <div
            v-for="a in achievements" :key="a.id"
            class="ach-item"
            :class="{ locked: !a.earned }"
            @click="toggleDisplay(a)"
          >
            <div class="ach-main-icon" :class="{ greyed: !a.earned }"><span class="material-icons-outlined">{{ a.icon }}</span></div>
            <div class="ach-body">
              <div class="ach-title-row">
                <span class="ach-name">{{ a.title }}</span>
                <span v-if="a.earned && a.displayed" class="display-tag">展示中</span>
              </div>
              <div class="ach-desc">{{ a.desc }}</div>
            </div>
            <div class="ach-status">
              <span v-if="a.earned" class="earned-check material-icons-outlined">check_circle</span>
              <span v-else class="lock-check material-icons-outlined">lock</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- === 系統設定 === -->
    <div v-if="activeTab === 'settings'" class="tab-content">
      <div class="card">
        <div class="form-title">介面設定</div>
        <div class="setting-list">
          <div class="setting-row">
            <div>
              <div class="setting-title">主題模式</div>
            </div>
            <select v-model="settings.theme" class="setting-select">
              <option value="light">淺色</option>
              <option value="dark">深色</option>
              <option value="auto">跟隨系統</option>
            </select>
          </div>
          <div class="setting-row">
            <div>
              <div class="setting-title">語言</div>
            </div>
            <select v-model="settings.language" class="setting-select">
              <option value="zh-TW">繁體中文</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="form-title">通知設定</div>
        <div class="setting-list">
          <div class="setting-row">
            <div>
              <div class="setting-title">推播通知</div>
              <div class="setting-sub">任務提醒與獎勵通知</div>
            </div>
            <label class="toggle">
              <input v-model="settings.notification" type="checkbox" />
              <span class="toggle-track"></span>
            </label>
          </div>
          <div class="setting-row">
            <div>
              <div class="setting-title">每週報告</div>
              <div class="setting-sub">每週發送個人碳排摘要</div>
            </div>
            <label class="toggle">
              <input v-model="settings.weeklyReport" type="checkbox" />
              <span class="toggle-track"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page { padding-bottom: 8px; }

/* Header */
.header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 52px 20px 56px;
  background: linear-gradient(145deg, #9270ca 0%, #6a48b8 100%);
  color: #fff;
  position: relative;
}
.avatar-wrap { position: relative; flex-shrink: 0; }
.avatar {
  width: 64px; height: 64px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; font-weight: 800;
  color: #fff;
  border: 3px solid rgba(255,255,255,0.5);
}
.level-badge {
  position: absolute;
  bottom: -4px; right: -4px;
  background: #f6bd16;
  color: #fff;
  font-size: 10px; font-weight: 800;
  padding: 2px 7px;
  border-radius: 10px;
  border: 2px solid #fff;
}
.header-info { flex: 1; }
.display-name { font-size: 20px; font-weight: 800; }
.dept-tag { font-size: 12px; opacity: 0.8; margin-top: 3px; }
.ach-row { display: flex; gap: 4px; margin-top: 8px; }
.ach-icon { cursor: default; font-size: 18px !important; }
.share-btn {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  border: none;
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

/* Stat Card */
.stat-card {
  display: flex;
  align-items: stretch;
  background: #fff;
  margin: -40px 16px 16px;
  border-radius: 16px;
  padding: 18px 0;
  box-shadow: 0 6px 24px rgba(146,112,202,0.25);
  position: relative;
  z-index: 2;
}
.stat-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.stat-num { font-size: 24px; font-weight: 800; color: #1a1a2e; }
.stat-lbl { font-size: 12px; color: #8c8c8c; }
.stat-track {
  width: 80%;
  height: 6px;
  background: #eef0f4;
  border-radius: 999px;
  overflow: hidden;
  margin-top: 2px;
}
.stat-fill { height: 100%; background: linear-gradient(90deg, #9270ca, #b694f7); border-radius: 999px; }
.stat-hint { font-size: 10px; color: #b0b7c3; }
.stat-divider { width: 1px; background: #eef0f4; margin: 4px 0; }

/* Tabs */
.tab-bar {
  display: flex;
  padding: 0 16px 14px;
  gap: 8px;
}
.tab-btn {
  flex: 1;
  padding: 9px 0;
  border-radius: 10px;
  border: 1.5px solid #eef0f4;
  background: #fff;
  color: #8c8c8c;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.18s;
}
.tab-btn.active {
  background: #9270ca;
  color: #fff;
  border-color: #9270ca;
  font-weight: 700;
}

/* Tab Content */
.tab-content { padding: 0 16px; }
.card {
  background: #fff;
  border-radius: 16px;
  padding: 18px 16px;
  margin-bottom: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.form-title {
  font-size: 14px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

/* Form */
.form-list { display: flex; flex-direction: column; gap: 12px; }
.form-item { display: flex; flex-direction: column; gap: 5px; }
.form-item label { font-size: 12px; color: #8c8c8c; font-weight: 600; display: flex; align-items: center; gap: 4px; }
.form-item input {
  height: 42px;
  border: 1.5px solid #e6eaf0;
  border-radius: 10px;
  padding: 0 12px;
  font-size: 14px;
  color: #333;
  background: #fcfdff;
  outline: none;
  font-family: inherit;
}
.form-item input:focus { border-color: #9270ca; box-shadow: 0 0 0 3px rgba(146,112,202,0.1); }
.form-item.locked input { background: #f9f9f9; color: #b0b7c3; cursor: not-allowed; }
.lock-icon { font-size: 13px !important; color: #b0b7c3; vertical-align: middle; }

.expand-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 14px 0 4px;
  background: none;
  border: none;
  border-top: 1px solid #f0f0f0;
  margin-top: 14px;
  font-size: 13px;
  font-weight: 700;
  color: #555;
  cursor: pointer;
}
.pwd-form { margin-top: 14px; }

.save-btn {
  width: 100%;
  height: 46px;
  background: #9270ca;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 18px;
  transition: background 0.18s;
}
.save-btn:hover { background: #7a56b5; }

/* Achievements */
.display-shelf {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-height: 50px;
}
.shelf-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.shelf-icon { font-size: 28px !important; }
.shelf-name { font-size: 10px; color: #8c8c8c; text-align: center; max-width: 54px; line-height: 1.3; }
.shelf-empty { font-size: 13px; color: #b0b7c3; }

.ach-list { display: flex; flex-direction: column; gap: 10px; }
.ach-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f9fbff;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.15s;
}
.ach-item.locked { opacity: 0.45; cursor: default; }
.ach-main-icon { font-size: 28px; flex-shrink: 0; display: flex; align-items: center; }
.ach-main-icon .material-icons-outlined { font-size: 28px !important; }
.ach-main-icon.greyed { filter: grayscale(1); }
.ach-body { flex: 1; }
.ach-title-row { display: flex; align-items: center; gap: 8px; margin-bottom: 2px; }
.ach-name { font-size: 14px; font-weight: 700; color: #1a1a2e; }
.display-tag { font-size: 10px; font-weight: 700; background: #f0ebff; color: #9270ca; padding: 2px 7px; border-radius: 6px; }
.ach-desc { font-size: 12px; color: #8c8c8c; }
.earned-check { font-size: 20px; color: #5ad8a6; }
.lock-check { font-size: 20px; color: #d0d0d0; }

/* Settings */
.setting-list { display: flex; flex-direction: column; gap: 0; }
.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #f5f5f5;
}
.setting-row:last-child { border-bottom: none; }
.setting-title { font-size: 14px; font-weight: 600; color: #333; }
.setting-sub { font-size: 12px; color: #8c8c8c; margin-top: 2px; }
.setting-select {
  height: 36px;
  padding: 0 10px;
  border: 1.5px solid #e6eaf0;
  border-radius: 8px;
  font-size: 13px;
  color: #333;
  background: #fff;
  outline: none;
  cursor: pointer;
}

/* Toggle Switch */
.toggle { position: relative; display: inline-block; cursor: pointer; }
.toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
.toggle-track {
  display: block;
  width: 44px; height: 24px;
  background: #ddd;
  border-radius: 999px;
  transition: background 0.2s;
  position: relative;
}
.toggle-track::after {
  content: '';
  position: absolute;
  top: 3px; left: 3px;
  width: 18px; height: 18px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.2s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}
.toggle input:checked + .toggle-track { background: #9270ca; }
.toggle input:checked + .toggle-track::after { transform: translateX(20px); }
</style>
