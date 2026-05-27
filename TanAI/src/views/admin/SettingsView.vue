<script setup>
import { ref } from 'vue'

const organizationSettings = ref({
  companyName: 'Eco Sensing 綠能解決方案',
  adminName: 'ESG 平台管理員',
  email: 'admin@tanai-demo.com',
  timezone: 'Asia/Taipei（台北）'
})

const esgSettings = ref({
  baselineYear: '2024',
  reductionTarget: '30',
  netZeroYear: '2050',
  scope3Enabled: true
})

const sensorSettings = ref({
  syncFrequency: '5 分鐘',
  alertThreshold: '900 ppm',
  retentionDays: '90',
  anomalyNotify: true
})

const reportSettings = ref({
  exportFormat: 'PDF',
  reportFrequency: '每月',
  reportLanguage: '繁體中文',
  autoSend: true
})

const uiSettings = ref({
  theme: '淺色',
  language: '繁體中文',
  defaultPage: '總覽儀表板'
})
</script>

<template>
  <div class="settings-page admin-page">
    <div class="page-header">
      <h1>ESG 與系統設定</h1>
      <p>平台參數、ESG 設定與 IoT 管理偏好</p>
    </div>

    <div class="settings-grid">
      <!-- Organization -->
      <div class="card">
        <div class="card-head">
          <h3 class="card-title">組織資訊</h3>
        </div>

        <div class="form-list">
          <div class="form-item">
            <label>公司名稱</label>
            <input v-model="organizationSettings.companyName" type="text" />
          </div>
          <div class="form-item">
            <label>管理者名稱</label>
            <input v-model="organizationSettings.adminName" type="text" />
          </div>
          <div class="form-item">
            <label>電子郵件</label>
            <input v-model="organizationSettings.email" type="email" />
          </div>
          <div class="form-item">
            <label>時區</label>
            <input v-model="organizationSettings.timezone" type="text" />
          </div>
        </div>
      </div>

      <!-- ESG -->
      <div class="card">
        <div class="card-head">
          <h3 class="card-title">ESG 參數設定</h3>
        </div>

        <div class="form-list">
          <div class="form-item">
            <label>基準年</label>
            <input v-model="esgSettings.baselineYear" type="text" />
          </div>
          <div class="form-item">
            <label>年度減碳目標 (%)</label>
            <input v-model="esgSettings.reductionTarget" type="text" />
          </div>
          <div class="form-item">
            <label>淨零目標年</label>
            <input v-model="esgSettings.netZeroYear" type="text" />
          </div>

          <div class="switch-row">
            <div>
              <div class="switch-title">啟用範疇三追蹤</div>
              <div class="switch-desc">納入供應鏈與差旅等間接排放分析</div>
            </div>
            <input v-model="esgSettings.scope3Enabled" type="checkbox" />
          </div>
        </div>
      </div>

      <!-- Sensors -->
      <div class="card">
        <div class="card-head">
          <h3 class="card-title">IoT 感測器設定</h3>
        </div>

        <div class="form-list">
          <div class="form-item">
            <label>資料同步頻率</label>
            <input v-model="sensorSettings.syncFrequency" type="text" />
          </div>
          <div class="form-item">
            <label>CO₂ 警示門檻</label>
            <input v-model="sensorSettings.alertThreshold" type="text" />
          </div>
          <div class="form-item">
            <label>資料保留天數</label>
            <input v-model="sensorSettings.retentionDays" type="text" />
          </div>

          <div class="switch-row">
            <div>
              <div class="switch-title">異常即時通知</div>
              <div class="switch-desc">設備離線或數值異常時立即通知</div>
            </div>
            <input v-model="sensorSettings.anomalyNotify" type="checkbox" />
          </div>
        </div>
      </div>

      <!-- Reports -->
      <div class="card">
        <div class="card-head">
          <h3 class="card-title">報告與匯出設定</h3>
        </div>

        <div class="form-list">
          <div class="form-item">
            <label>預設匯出格式</label>
            <input v-model="reportSettings.exportFormat" type="text" />
          </div>
          <div class="form-item">
            <label>報告週期</label>
            <input v-model="reportSettings.reportFrequency" type="text" />
          </div>
          <div class="form-item">
            <label>報告語言</label>
            <input v-model="reportSettings.reportLanguage" type="text" />
          </div>

          <div class="switch-row">
            <div>
              <div class="switch-title">自動寄送報告</div>
              <div class="switch-desc">依照週期自動寄送 ESG 報告</div>
            </div>
            <input v-model="reportSettings.autoSend" type="checkbox" />
          </div>
        </div>
      </div>

      <!-- UI -->
      <div class="card full-width">
        <div class="card-head">
          <h3 class="card-title">介面偏好設定</h3>
        </div>

        <div class="form-grid">
          <div class="form-item">
            <label>主題模式</label>
            <input v-model="uiSettings.theme" type="text" />
          </div>
          <div class="form-item">
            <label>系統語言</label>
            <input v-model="uiSettings.language" type="text" />
          </div>
          <div class="form-item">
            <label>預設首頁</label>
            <input v-model="uiSettings.defaultPage" type="text" />
          </div>
        </div>

        <div class="actions">
          <button class="btn btn-secondary">重設設定</button>
          <button class="btn btn-primary">儲存變更</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-page {
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

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.card {
  background: #fff;
  border-radius: var(--sb-radius-card);
  padding: 20px;
  box-shadow: var(--sb-shadow-card);
}

.full-width {
  grid-column: span 2;
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
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

.form-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-item label {
  font-size: 13px;
  color: #666;
  font-weight: 600;
}

.form-item input {
  height: 42px;
  border: 1px solid #e6eaf0;
  border-radius: 10px;
  padding: 0 12px;
  font-size: 14px;
  color: #333;
  background: #fcfdff;
  outline: none;
}

.form-item input:focus {
  border-color: #00754a;
  box-shadow: 0 0 0 3px rgba(91, 143, 249, 0.12);
}

.switch-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  padding: 14px 0 4px;
}

.switch-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.switch-desc {
  font-size: 12px;
  color: #8c8c8c;
  line-height: 1.5;
}

.switch-row input[type='checkbox'] {
  width: 18px;
  height: 18px;
  accent-color: #00754a;
  flex-shrink: 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 22px;
}

.btn {
  height: 42px;
  padding: 0 16px;
  border-radius: 10px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.btn-secondary {
  background: #f3f5f9;
  color: #555;
}

.btn-primary {
  background: #00754a;
  color: #fff;
}

@media (max-width: 1000px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: span 1;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .settings-page {
    padding: 20px;
  }

  .card-head,
  .switch-row,
  .actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .actions {
    width: 100%;
  }

  .btn {
    width: 100%;
  }
}
</style>