# Eco Sensing - 企業自動化碳排查平台

企業碳排放管理平台，提供企業端管理後台。

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
    LoginView.vue           # 登入頁
    admin/
      AdminLayout.vue       # 企業後台共用側欄版型
      DashboardView.vue     # 總覽儀錶板
      EmissionsView.vue     # 碳排放管理
      SensorsView.vue       # 感測器管理
      DepartmentsView.vue   # 部門管理
      ReportsView.vue       # 報告與排行
      EsgGoalsView.vue      # ESG 目標
      SettingsView.vue      # 系統設定
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

登入後進入管理後台，提供完整的碳排放監控與管理功能，包含感測器即時數據、部門碳排排行、ESG 目標追蹤與可下載報告。
