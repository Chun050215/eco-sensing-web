<script setup>
defineProps({
  report: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="esg-report-doc">
    <header class="esg-report-doc-head">
      <h2 class="esg-report-doc-title">{{ report.title }}</h2>
      <p class="esg-report-doc-sub">{{ report.subtitle }}</p>
      <dl class="esg-report-doc-meta">
        <div><dt>企業名稱</dt><dd>{{ report.company }}</dd></div>
        <div><dt>報告編號</dt><dd>{{ report.reportNo }}</dd></div>
        <div><dt>統計期間</dt><dd>{{ report.period }} 年度</dd></div>
        <div><dt>生成時間</dt><dd>{{ report.generatedAt }}</dd></div>
      </dl>
    </header>

    <section class="esg-report-doc-section">
      <h3>一、執行摘要</h3>
      <div class="esg-kpi-grid">
        <div v-for="kpi in report.kpis" :key="kpi.label" class="esg-kpi">
          <span class="esg-kpi-label">{{ kpi.label }}</span>
          <span class="esg-kpi-value">{{ kpi.value }} <small>{{ kpi.unit }}</small></span>
          <span class="esg-kpi-trend" :class="{ up: kpi.trendUp }">{{ kpi.trend }}</span>
        </div>
      </div>
    </section>

    <section class="esg-report-doc-section">
      <h3>二、溫室氣體排放（範疇一～三）</h3>
      <table class="esg-table">
        <thead>
          <tr>
            <th>範疇</th>
            <th>類別</th>
            <th>排放量</th>
            <th>占比</th>
            <th>年增減</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in report.scopes" :key="s.scope">
            <td>{{ s.scope }}</td>
            <td>{{ s.name }}</td>
            <td class="num">{{ s.value.toLocaleString() }} tCO₂e</td>
            <td class="num">{{ s.share }}%</td>
            <td class="num" :class="s.yoy > 0 ? 'bad' : 'good'">{{ s.yoy > 0 ? '+' : '' }}{{ s.yoy }}%</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="esg-report-doc-section">
      <h3>三、部門碳排放排行</h3>
      <table class="esg-table">
        <thead>
          <tr>
            <th>#</th>
            <th>部門</th>
            <th>累計排放</th>
            <th>占比</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in report.departments" :key="d.name">
            <td>{{ d.rank }}</td>
            <td>{{ d.name }}</td>
            <td class="num">{{ d.emission.toLocaleString() }} tCO₂e</td>
            <td class="num">{{ d.share }}%</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="esg-report-doc-section">
      <h3>四、ESG 目標進度</h3>
      <div v-for="g in report.goals" :key="g.name" class="esg-goal">
        <div class="esg-goal-head">
          <span class="esg-goal-name">{{ g.name }}</span>
          <span class="esg-goal-status">{{ g.status }}</span>
        </div>
        <p class="esg-goal-target">{{ g.target }}</p>
        <div class="esg-goal-bar">
          <div class="esg-goal-fill" :style="{ width: g.progress + '%' }"></div>
        </div>
        <span class="esg-goal-pct">{{ g.progress }}%</span>
      </div>
    </section>

    <section class="esg-report-doc-section">
      <h3>五、感測器即時狀態</h3>
      <table class="esg-table">
        <thead>
          <tr>
            <th>設備</th>
            <th>讀值</th>
            <th>最後同步</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in report.sensors" :key="s.name">
            <td>{{ s.name }}</td>
            <td>{{ s.value }}</td>
            <td>{{ s.lastSync }}</td>
            <td>
              <span class="esg-sensor-tag" :class="s.status === '正常' ? 'ok' : 'warn'">{{ s.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="esg-report-doc-section">
      <h3>六、管理層結論與建議</h3>
      <ul class="esg-highlights">
        <li v-for="(h, i) in report.highlights" :key="i">{{ h }}</li>
      </ul>
    </section>

    <p class="esg-disclaimer">{{ report.disclaimer }}</p>
  </article>
</template>

<style scoped>
.esg-report-doc {
  color: #1e3932;
  font-size: 14px;
  line-height: 1.5;
}
.esg-report-doc-head {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 2px solid #d4e9e2;
}
.esg-report-doc-title {
  font-size: 22px;
  font-weight: 700;
  color: #006241;
  margin: 0 0 6px;
}
.esg-report-doc-sub {
  font-size: 14px;
  color: #666;
  margin: 0 0 16px;
}
.esg-report-doc-meta {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 24px;
  margin: 0;
}
.esg-report-doc-meta div {
  display: flex;
  gap: 8px;
  font-size: 13px;
}
.esg-report-doc-meta dt {
  color: #888;
  font-weight: 500;
  min-width: 72px;
}
.esg-report-doc-meta dd {
  margin: 0;
  color: #333;
  font-weight: 600;
}
.esg-report-doc-section {
  margin-bottom: 28px;
}
.esg-report-doc-section h3 {
  font-size: 16px;
  font-weight: 700;
  color: #006241;
  margin: 0 0 14px;
}
.esg-kpi-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
.esg-kpi {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 14px 16px;
  border-left: 4px solid #00754a;
}
.esg-kpi-label {
  display: block;
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
}
.esg-kpi-value {
  display: block;
  font-size: 22px;
  font-weight: 700;
  color: #1e3932;
}
.esg-kpi-value small {
  font-size: 13px;
  font-weight: 500;
  color: #888;
}
.esg-kpi-trend {
  font-size: 12px;
  color: #2b9f6b;
  font-weight: 600;
}
.esg-kpi-trend.up {
  color: #c82014;
}
.esg-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.esg-table th {
  text-align: left;
  padding: 10px 12px;
  background: #fafbfc;
  color: #666;
  font-weight: 600;
  border-bottom: 1px solid #eef0f4;
}
.esg-table td {
  padding: 10px 12px;
  border-bottom: 1px solid #f5f7fa;
  color: #333;
}
.esg-table td.num {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.esg-table td.good {
  color: #2b9f6b;
  font-weight: 600;
}
.esg-table td.bad {
  color: #c82014;
  font-weight: 600;
}
.esg-goal {
  margin-bottom: 16px;
}
.esg-goal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.esg-goal-name {
  font-weight: 600;
}
.esg-goal-status {
  font-size: 12px;
  color: #00754a;
  font-weight: 600;
}
.esg-goal-target {
  font-size: 12px;
  color: #888;
  margin: 0 0 8px;
}
.esg-goal-bar {
  height: 8px;
  background: #eef0f4;
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 4px;
}
.esg-goal-fill {
  height: 100%;
  background: linear-gradient(90deg, #00754a, #006241);
  border-radius: 999px;
}
.esg-goal-pct {
  font-size: 12px;
  font-weight: 700;
  color: #006241;
}
.esg-sensor-tag {
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 6px;
}
.esg-sensor-tag.ok {
  background: #e8f5ee;
  color: #2b9f6b;
}
.esg-sensor-tag.warn {
  background: #fff8e6;
  color: #b88200;
}
.esg-highlights {
  margin: 0;
  padding-left: 20px;
  line-height: 1.8;
  color: #444;
}
.esg-disclaimer {
  margin: 0;
  padding: 14px 16px;
  background: #fff8e6;
  border-radius: 10px;
  font-size: 12px;
  color: #666;
  line-height: 1.6;
}
@media (max-width: 640px) {
  .esg-report-doc-meta {
    grid-template-columns: 1fr;
  }
  .esg-kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>
