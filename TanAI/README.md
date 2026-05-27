# Eco Sensing - 企業自動化碳排查平台

企業碳排放管理與員工減碳激勵平台，提供企業端管理後台與員工端行動網頁應用程式。

---

## 技術棧

- **框架**: Vue 3 (Composition API / `<script setup>`)
- **路由**: Vue Router 5
- **建置工具**: Vite
- **圖示**: Material Icons Outlined (Google CDN)
- **字體**: Inter (Google Fonts)
- **圖表**: 純 SVG / CSS conic-gradient（無外部圖表庫）

---

## 專案結構

```
src/
  views/
    LoginView.vue           # 登入頁（企業端 / 員工端切換）
    admin/
      AdminLayout.vue       # 企業後台共用側欄版型
      DashboardView.vue     # 總覽儀錶板
      EmissionsView.vue     # 碳排放管理
      SensorsView.vue       # 感測器管理
      DepartmentsView.vue   # 部門管理
      ReportsView.vue       # 報告與排行
      EsgGoalsView.vue      # ESG 目標
      SettingsView.vue      # 系統設定
    employee/
      EmployeeLayout.vue    # 員工端手機版型（底部導覽列）
      DashboardView.vue     # 碳排儀錶板
      ActionsView.vue       # i 減碳行動
      LeaderboardView.vue   # 部門排行榜
      ProfileView.vue       # 個人資料
  components/
    KpiCard.vue             # KPI 指標卡片
    SensorCard.vue          # 感測器卡片
  router/
    index.js                # 路由配置
  App.vue
  main.js
```

---

## 路由規則

| 路徑 | 說明 |
|---|---|
| `/` | 重導向至 `/login` |
| `/login` | 登入頁 |
| `/admin/dashboard` | 企業後台總覽 |
| `/admin/emissions` | 碳排放管理 |
| `/admin/sensors` | 感測器管理 |
| `/admin/departments` | 部門管理 |
| `/admin/reports` | 報告與排行 |
| `/admin/esg-goals` | ESG 目標 |
| `/admin/settings` | 系統設定 |
| `/employee/dashboard` | 員工碳排儀錶板 |
| `/employee/actions` | i 減碳行動 |
| `/employee/leaderboard` | 部門排行榜 |
| `/employee/profile` | 個人資料 |

---

## 安裝與啟動

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 建置生產版本
npm run build

# 預覽生產版本
npm run preview
```

---

## 頁面說明

### 企業後台

登入時選擇「企業端」進入，提供完整的碳排放監控與管理功能，包含感測器即時數據、部門碳排排行、ESG 目標追蹤與可下載報告。

### 員工端

登入時選擇「員工端」進入，以手機介面為主（max-width 430px），提供員工個人碳排儀錶板、每日減碳行動、部門排行榜及個人成就管理。員工完成減碳行動可獲得 EXP 與獎勵貨幣。
