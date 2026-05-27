<script setup>
import { ref, computed, watch } from 'vue'

const reportSummary = ref([
  { title: '可下載報告', value: '8', unit: '份' },
  { title: '年度 ESG 報告', value: '2024', unit: '版本' },
  { title: '本月生成報告', value: '12', unit: '份' },
  { title: '最後更新', value: '3', unit: '天前' }
])

const reports = ref([
  { name: '年度 ESG 碳排放報告', type: 'ESG 報告', date: '2024-12-31', format: 'PDF' },
  { name: '範疇排放分析報告', type: '排放分析', date: '2024-11-20', format: 'PDF' },
  { name: '部門碳排放報告', type: '部門排放', date: '2024-10-15', format: 'CSV' },
  { name: '能源使用分析', type: '能源報告', date: '2024-10-01', format: 'PDF' },
  { name: '廢棄物排放統計', type: '廢棄物報告', date: '2024-09-18', format: 'CSV' }
])

// ===== 排行榜功能 =====
const sortMode = ref('department')
const rankingView = ref('emission') // emission | employee

const employeeEnergyRaw = ref([
  { name: '林雅婷', department: '研發部', score: 2840, savedKg: 128, actions: 42 },
  { name: '陳志豪', department: '行銷部', score: 2650, savedKg: 115, actions: 38 },
  { name: '張美玲', department: '人資部', score: 2480, savedKg: 102, actions: 35 },
  { name: '王俊傑', department: '製造部', score: 2310, savedKg: 96, actions: 31 },
  { name: '李佩君', department: '物流部', score: 2180, savedKg: 88, actions: 29 },
  { name: '黃冠宇', department: '行政部', score: 1950, savedKg: 76, actions: 24 },
])

const generatingReport = ref(false)
const generateMessage = ref('')
const years = [2020, 2021, 2022, 2023, 2024]
const yearFrom = ref(2022)
const yearTo = ref(2024)

watch(yearFrom, (v) => { if (yearTo.value < v) yearTo.value = v })

const departmentRaw = ref([
  { name: '製造部', data: { 2020: 450, 2021: 435, 2022: 428, 2023: 415, 2024: 420 } },
  { name: '物流部', data: { 2020: 280, 2021: 270, 2022: 265, 2023: 258, 2024: 260 } },
  { name: '研發部', data: { 2020: 200, 2021: 205, 2022: 212, 2023: 208, 2024: 210 } },
  { name: '行銷部', data: { 2020: 145, 2021: 148, 2022: 150, 2023: 149, 2024: 150 } },
  { name: '行政部', data: { 2020: 125, 2021: 122, 2022: 120, 2023: 121, 2024: 120 } },
  { name: '人資部', data: { 2020: 88, 2021: 86, 2022: 85, 2023: 84, 2024: 85 } }
])

const emissionRaw = ref([
  { name: '範疇二用電排放', data: { 2020: 750, 2021: 738, 2022: 730, 2023: 725, 2024: 720 } },
  { name: '範疇三間接排放', data: { 2020: 380, 2021: 392, 2022: 400, 2023: 402, 2024: 405 } },
  { name: '商務差旅', data: { 2020: 160, 2021: 165, 2022: 172, 2023: 175, 2024: 180 } },
  { name: '物流運輸', data: { 2020: 128, 2021: 132, 2022: 136, 2023: 138, 2024: 140 } },
  { name: '廢棄物處理', data: { 2020: 88, 2021: 90, 2022: 92, 2023: 94, 2024: 95 } },
  { name: '範疇一直接排放', data: { 2020: 135, 2021: 128, 2022: 123, 2023: 122, 2024: 120 } }
])

const rankingData = computed(() => {
  if (rankingView.value === 'employee') {
    return employeeEnergyRaw.value
      .map((item) => ({ name: item.name, value: item.score, department: item.department, savedKg: item.savedKg, actions: item.actions }))
      .sort((a, b) => b.value - a.value)
  }
  const source = sortMode.value === 'department' ? departmentRaw.value : emissionRaw.value
  const from = Number(yearFrom.value)
  const to = Number(yearTo.value)
  return source
    .map(item => {
      let total = 0
      for (let y = from; y <= to; y++) total += item.data[y] || 0
      return { name: item.name, value: total }
    })
    .sort((a, b) => b.value - a.value)
})

const rankingTotal = computed(() => rankingData.value.reduce((s, d) => s + d.value, 0))
const chartMax = computed(() => Math.max(...rankingData.value.map(d => d.value), 1) * 1.12)
const chartH = computed(() => rankingData.value.length * 28 + 16)
const rankingTitle = computed(() => {
  if (rankingView.value === 'employee') return '員工節能排行'
  return sortMode.value === 'department' ? '年度碳排放排行（部門）' : '年度碳排放排行（排放別）'
})
const barColors = ['#00754a', '#006241', '#cba258', '#2b5148', '#1e3932', '#d4e9e2']

const svgRef = ref(null)

const downloadChart = () => {
  const svg = svgRef.value
  if (!svg) return
  const { width, height } = svg.getBoundingClientRect()
  const scale = 2
  const canvas = document.createElement('canvas')
  canvas.width = width * scale
  canvas.height = height * scale
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const svgStr = new XMLSerializer().serializeToString(svg)
  const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const img = new Image()
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    URL.revokeObjectURL(url)
    const a = document.createElement('a')
    a.download = `碳排放排行_${yearFrom.value}-${yearTo.value}.png`
    a.href = canvas.toDataURL('image/png')
    a.click()
  }
  img.src = url
}

const downloadMockPdf = (filename, lines) => {
  const escapePdf = (s) => s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
  const textOps = lines.map((line, i) => `1 0 0 1 72 ${720 - i * 28} Tm (${escapePdf(line)}) Tj`).join('\n')
  const stream = `BT\n/F1 14 Tf\n${textOps}\nET`
  const streamLen = stream.length
  const pdf = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<</Font<</F1<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>>>>>>>/Contents 4 0 R>>endobj
4 0 obj<</Length ${streamLen}>>stream
${stream}
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000300 00000 n 
trailer<</Size 5/Root 1 0 R>>
startxref
400
%%EOF`
  const blob = new Blob([pdf], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

const generateEsgReport = async () => {
  if (generatingReport.value) return
  generatingReport.value = true
  generateMessage.value = ''
  await new Promise((r) => setTimeout(r, 1500))
  const today = new Date().toISOString().slice(0, 10)
  const year = new Date().getFullYear()
  reports.value.unshift({
    name: `ESG 永續報告（自動生成）${year}`,
    type: 'ESG 報告',
    date: today,
    format: 'PDF'
  })
  const summary = reportSummary.value.find((i) => i.title === '本月生成報告')
  if (summary) summary.value = String(Number(summary.value) + 1)
  const downloadable = reportSummary.value.find((i) => i.title === '可下載報告')
  if (downloadable) downloadable.value = String(Number(downloadable.value) + 1)
  downloadMockPdf(`EcoSensing_ESG_Report_${year}.pdf`, [
    'Eco Sensing ESG Sustainability Report',
    `Generated: ${today}`,
    'Scope 1-3 emissions summary (demo)',
    'Department ranking & sensor status included',
    'Compliant format preview - mock data'
  ])
  generatingReport.value = false
  generateMessage.value = `已生成 ${today} 版 ESG 永續報告並開始下載 PDF`
  setTimeout(() => { generateMessage.value = '' }, 5000)
}
</script>

<template>
  <div class="reports-page admin-page">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1>報告與排行</h1>
        <p>ESG 碳排放與企業永續報告管理</p>
      </div>
      <button
        class="generate-btn"
        :disabled="generatingReport"
        @click="generateEsgReport"
      >
        <span class="material-icons-outlined">{{ generatingReport ? 'hourglass_top' : 'auto_awesome' }}</span>
        {{ generatingReport ? '報告生成中…' : '一鍵生成 ESG 報告' }}
      </button>
    </div>
    <p v-if="generateMessage" class="generate-msg">{{ generateMessage }}</p>

    <!-- KPI Summary -->
    <div class="summary-grid">
      <div v-for="item in reportSummary" :key="item.title" class="summary-card">
        <div class="summary-title">{{ item.title }}</div>
        <div class="summary-value">{{ item.value }}<span>{{ item.unit }}</span></div>
      </div>
    </div>

    <!-- ===== 排行榜 ===== -->
    <div class="card ranking-card">
      <div class="card-head">
        <div>
          <h3 class="card-title">{{ rankingTitle }}</h3>
          <p v-if="rankingView === 'employee'" class="card-subtitle">依減碳積分、節能量與 i 減碳行動次數綜合評分</p>
        </div>
        <button v-if="rankingView !== 'employee'" class="icon-btn" @click="downloadChart">
          <span class="material-icons-outlined">download</span>
          下載圖表
        </button>
      </div>

      <!-- 篩選列 -->
      <div class="filter-bar">
        <div class="sort-toggle">
          <button
            :class="['toggle-btn', rankingView === 'emission' && sortMode === 'department' ? 'active' : '']"
            @click="rankingView = 'emission'; sortMode = 'department'"
          >
            <span class="material-icons-outlined">corporate_fare</span>
            部門碳排
          </button>
          <button
            :class="['toggle-btn', rankingView === 'emission' && sortMode === 'emission' ? 'active' : '']"
            @click="rankingView = 'emission'; sortMode = 'emission'"
          >
            <span class="material-icons-outlined">bolt</span>
            排放別
          </button>
          <button
            :class="['toggle-btn', rankingView === 'employee' ? 'active' : '']"
            @click="rankingView = 'employee'"
          >
            <span class="material-icons-outlined">emoji_events</span>
            員工節能
          </button>
        </div>

        <div v-if="rankingView !== 'employee'" class="year-range">
          <span class="range-label">統計期間</span>
          <select v-model="yearFrom" class="year-select">
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
          <span class="range-sep">至</span>
          <select v-model="yearTo" class="year-select">
            <option v-for="y in years.filter(y => y >= yearFrom)" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
      </div>

      <!-- SVG 水平長條圖 -->
      <div class="chart-wrap">
        <svg
          ref="svgRef"
          class="rank-svg"
          :viewBox="`0 0 580 ${chartH}`"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- 背景格線 -->
          <line
            v-for="n in 5" :key="n"
            :x1="140 + (n - 1) * 88" y1="8"
            :x2="140 + (n - 1) * 88" :y2="chartH - 8"
            stroke="#eef0f4" stroke-width="1"
          />
          <!-- 長條 -->
          <g
            v-for="(item, i) in rankingData"
            :key="item.name"
            :transform="`translate(0, ${i * 28 + 8})`"
          >
            <text x="134" y="13" text-anchor="end" font-size="10" fill="#555" font-family="'Inter', sans-serif">
              {{ rankingView === 'employee' ? item.name.slice(0, 6) : item.name }}
            </text>
            <!-- 背景條 -->
            <rect x="140" y="4" width="352" height="10" fill="#f5f7fb" rx="3" />
            <!-- 數值條 -->
            <rect
              x="140" y="4"
              :width="(item.value / chartMax) * 352"
              height="10"
              :fill="barColors[i % barColors.length]"
              rx="3"
              opacity="0.88"
            />
            <!-- 數值標籤 -->
            <text
              :x="140 + (item.value / chartMax) * 352 + 8"
              y="13"
              font-size="9"
              fill="#555"
              font-weight="600"
              font-family="'Inter', sans-serif"
            >
              {{ rankingView === 'employee' ? item.value.toLocaleString() + ' 分' : item.value.toLocaleString() + ' tCO₂e' }}
            </text>
          </g>
        </svg>
      </div>

      <!-- 排行表格 -->
      <table class="rank-table">
        <thead>
          <tr v-if="rankingView === 'employee'">
            <th>#</th>
            <th>員工</th>
            <th>部門</th>
            <th>節能積分</th>
            <th>節碳量</th>
            <th>減碳行動</th>
            <th>表現</th>
          </tr>
          <tr v-else>
            <th>#</th>
            <th>{{ sortMode === 'department' ? '部門' : '排放類型' }}</th>
            <th>累計排放量</th>
            <th>佔總排放</th>
            <th>排放比例</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in rankingData" :key="item.name + i">
            <td>
              <span
                class="rank-num"
                :style="{ background: barColors[i % barColors.length] + '22', color: barColors[i % barColors.length] }"
              >{{ i + 1 }}</span>
            </td>
            <template v-if="rankingView === 'employee'">
              <td class="name-cell">{{ item.name }}</td>
              <td>{{ item.department }}</td>
              <td><strong>{{ item.value.toLocaleString() }}</strong> 分</td>
              <td>{{ item.savedKg }} kg CO₂e</td>
              <td>{{ item.actions }} 次</td>
              <td>
                <div class="mini-bar-row">
                  <div class="mini-track">
                    <div
                      class="mini-fill"
                      :style="{
                        width: (item.value / rankingData[0].value * 100) + '%',
                        background: barColors[i % barColors.length]
                      }"
                    ></div>
                  </div>
                </div>
              </td>
            </template>
            <template v-else>
              <td class="name-cell">{{ item.name }}</td>
              <td><strong>{{ item.value.toLocaleString() }}</strong> tCO₂e</td>
              <td>{{ (item.value / rankingTotal * 100).toFixed(1) }}%</td>
              <td>
                <div class="mini-bar-row">
                  <div class="mini-track">
                    <div
                      class="mini-fill"
                      :style="{
                        width: (item.value / rankingData[0].value * 100) + '%',
                        background: barColors[i % barColors.length]
                      }"
                    ></div>
                  </div>
                </div>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 可下載報告 -->
    <div class="card">
      <h3 class="card-title">可下載報告</h3>
      <table class="report-table">
        <thead>
          <tr>
            <th>報告名稱</th>
            <th>類型</th>
            <th>生成日期</th>
            <th>格式</th>
            <th>下載</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reports" :key="report.name">
            <td>{{ report.name }}</td>
            <td>{{ report.type }}</td>
            <td>{{ report.date }}</td>
            <td><span class="format-badge" :class="report.format.toLowerCase()">{{ report.format }}</span></td>
            <td>
              <button class="download-btn">
                <span class="material-icons-outlined" style="font-size:15px;vertical-align:middle;">download</span>
                下載
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.reports-page {
  padding: 28px 32px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 8px;
}
.page-header h1 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 6px;
}
.page-header p {
  color: #8c8c8c;
  margin-bottom: 0;
}

.generate-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--sb-green-house);
  color: #fff;
  border: none;
  border-radius: var(--sb-radius-pill);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  flex-shrink: 0;
}
.generate-btn:hover:not(:disabled) {
  background: var(--sb-green-brand);
}
.generate-btn:active:not(:disabled) {
  transform: scale(0.95);
}
.generate-btn:disabled {
  opacity: 0.75;
  cursor: wait;
}
.generate-btn .material-icons-outlined {
  font-size: 20px;
}

.generate-msg {
  font-size: 13px;
  color: var(--sb-green-accent);
  font-weight: 600;
  margin-bottom: 16px;
  padding: 10px 14px;
  background: var(--sb-green-light);
  border-radius: 10px;
}

/* KPI */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  margin-top: 8px;
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
  margin-left: 4px;
}

/* Card */
.card {
  background: #fff;
  border-radius: var(--sb-radius-card);
  padding: 20px;
  box-shadow: var(--sb-shadow-card);
  margin-bottom: 20px;
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 18px;
}
.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px;
}
.card-subtitle {
  font-size: 12px;
  color: #8c8c8c;
}

/* Download icon button */
.icon-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #00754a;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
}
.icon-btn:hover { background: #006241; }
.icon-btn .material-icons-outlined { font-size: 18px; }

/* Filter bar */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding: 14px 16px;
  background: #f9fbff;
  border-radius: 12px;
  border: 1px solid #eef0f4;
}
.sort-toggle {
  display: flex;
  gap: 6px;
  background: #eef0f4;
  padding: 4px;
  border-radius: 10px;
}
.toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 14px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  background: transparent;
  color: #8c8c8c;
  transition: all 0.18s;
}
.toggle-btn .material-icons-outlined { font-size: 16px; }
.toggle-btn.active {
  background: #fff;
  color: #00754a;
  font-weight: 600;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
}
.year-range {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}
.range-label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}
.range-sep {
  font-size: 13px;
  color: #8c8c8c;
}
.year-select {
  height: 36px;
  padding: 0 10px;
  border: 1px solid #e0e4f0;
  border-radius: 8px;
  font-size: 13px;
  color: #333;
  background: #fff;
  cursor: pointer;
  outline: none;
}
.year-select:focus { border-color: #00754a; }

/* SVG Chart */
.chart-wrap {
  margin-bottom: 12px;
  overflow: hidden;
  /* max-height: 210px; */
}
.rank-svg {
  width: 100%;
  height: auto;
  display: block;
}

/* Rank Table */
.rank-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.rank-table th {
  text-align: left;
  padding: 10px 12px;
  color: #8c8c8c;
  font-weight: 600;
  font-size: 12px;
  border-bottom: 1px solid #eef0f4;
  background: #fafbfc;
}
.rank-table td {
  padding: 12px 12px;
  color: #333;
  border-bottom: 1px solid #f5f7fa;
  vertical-align: middle;
}
.rank-table tbody tr:hover { background: #f9fbff; }
.rank-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
}
.name-cell { font-weight: 500; }
.mini-bar-row { display: flex; align-items: center; gap: 8px; }
.mini-track {
  width: 120px;
  height: 8px;
  background: #eef0f4;
  border-radius: 999px;
  overflow: hidden;
}
.mini-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.4s ease;
}

/* Report Table */
.report-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.report-table th {
  text-align: left;
  padding: 10px 12px;
  color: #8c8c8c;
  font-weight: 600;
  font-size: 12px;
  border-bottom: 1px solid #eef0f4;
  background: #fafbfc;
}
.report-table td {
  padding: 12px 12px;
  color: #333;
  border-bottom: 1px solid #f5f7fa;
}
.report-table tbody tr:hover { background: #f9fbff; }

.format-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: #d4e9e2;
  color: #00754a;
}
.format-badge.csv {
  background: #f6fff8;
  color: #2b9f6b;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: #00754a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.download-btn:hover { background: #006241; }

@media (max-width: 1100px) {
  .summary-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .reports-page { padding: 20px; }
  .page-header { flex-direction: column; }
  .generate-btn { width: 100%; justify-content: center; }
  .filter-bar { flex-direction: column; align-items: flex-start; }
  .year-range { margin-left: 0; }
  .summary-grid { grid-template-columns: 1fr; }
  .mini-track { width: 80px; }
}
</style>