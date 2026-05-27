export function buildMockEsgReport({ departmentRaw, yearFrom, yearTo }) {
  const today = new Date()
  const dateStr = today.toISOString().slice(0, 10)
  const year = today.getFullYear()
  const period = `${yearFrom}–${yearTo}`

  const deptRanking = departmentRaw
    .map((item) => {
      let total = 0
      for (let y = yearFrom; y <= yearTo; y++) total += item.data[y] || 0
      return { name: item.name, value: total }
    })
    .sort((a, b) => b.value - a.value)

  const totalEmission = deptRanking.reduce((s, d) => s + d.value, 0) || 1
  const prevTotal = deptRanking.reduce((s, d) => {
    let t = 0
    for (let y = yearFrom - 1; y <= yearTo - 1; y++) {
      const row = departmentRaw.find((x) => x.name === d.name)
      t += row?.data[y] || 0
    }
    return s + t
  }, 0)
  const yoyChange = prevTotal > 0 ? (((totalEmission - prevTotal) / prevTotal) * 100).toFixed(1) : '0.0'

  return {
    id: `esg-${Date.now()}`,
    title: `ESG 永續報告（自動生成）${year}`,
    subtitle: '企業碳排放與永續績效綜合報告',
    type: 'ESG 報告',
    date: dateStr,
    year,
    period,
    company: '示範科技股份有限公司',
    reportNo: `ESG-${year}-${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`,
    generatedAt: today.toLocaleString('zh-TW', { hour12: false }),
    kpis: [
      { label: '總碳排放量', value: totalEmission.toLocaleString(), unit: 'tCO₂e', trend: `${yoyChange}%`, trendUp: Number(yoyChange) > 0 },
      { label: '較前期變化', value: yoyChange, unit: '%', trend: Number(yoyChange) <= 0 ? '改善' : '待改善', trendUp: Number(yoyChange) > 0 },
      { label: '感測器覆蓋', value: '24', unit: '台', trend: '98% 在線', trendUp: false },
      { label: 'ESG 目標達成', value: '78', unit: '%', trend: '較 Q3 +5%', trendUp: false },
    ],
    scopes: [
      { scope: '範疇一', name: '直接排放', value: 120, share: 6.2, yoy: -2.1 },
      { scope: '範疇二', name: '外購電力', value: 720, share: 37.1, yoy: -1.8 },
      { scope: '範疇三', name: '其他間接排放', value: 1100, share: 56.7, yoy: 3.2 },
    ],
    departments: deptRanking.map((d, i) => ({
      rank: i + 1,
      name: d.name,
      emission: d.value,
      share: ((d.value / totalEmission) * 100).toFixed(1),
    })),
    goals: [
      { name: '2030 淨零路徑', progress: 22, target: '較 2019 基準年減碳 50%', status: '進行中' },
      { name: '再生能源占比', progress: 35, target: '2025 達 40%', status: '進行中' },
      { name: '供應鏈碳盤查', progress: 68, target: 'Tier-1 供應商 100% 揭露', status: '達標中' },
      { name: '廢棄物零填埋', progress: 91, target: '2024 達 95%', status: '接近達標' },
    ],
    sensors: [
      { name: '總部大樓電表', status: '正常', lastSync: '2 分鐘前', value: '1,240 kWh' },
      { name: '製造一廠燃氣', status: '正常', lastSync: '5 分鐘前', value: '86 m³' },
      { name: '物流倉庫溫控', status: '正常', lastSync: '1 分鐘前', value: '18.2 °C' },
      { name: '研發中心空調', status: '警示', lastSync: '12 分鐘前', value: '偏高 +8%' },
    ],
    highlights: [
      '本期總排放量較前期下降，主因為範疇二綠電採購比例提升。',
      '製造部為最大排放來源，已啟動設備汰換與排程優化專案。',
      '感測器資料覆蓋率達 98%，僅 1 台設備需維護校準。',
      'ESG 委員會已核准 2025 年度減碳行動預算，預計 Q2 完成細部 KPI 拆解。',
    ],
    disclaimer: '本報告由 Eco Sensing 平台自動彙整示範資料產生，僅供內部評估與系統展示，不具法定申報效力。',
  }
}

export function buildReportHtml(report) {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const scopeRows = report.scopes
    .map(
      (s) =>
        `<tr><td>${esc(s.scope)}</td><td>${esc(s.name)}</td><td style="text-align:right">${s.value.toLocaleString()}</td><td style="text-align:right">${s.share}%</td><td style="text-align:right;color:${s.yoy > 0 ? '#c82014' : '#2b9f6b'}">${s.yoy > 0 ? '+' : ''}${s.yoy}%</td></tr>`
    )
    .join('')
  const deptRows = report.departments
    .map(
      (d) =>
        `<tr><td>${d.rank}</td><td>${esc(d.name)}</td><td style="text-align:right">${d.emission.toLocaleString()}</td><td style="text-align:right">${d.share}%</td></tr>`
    )
    .join('')
  const goalRows = report.goals
    .map(
      (g) =>
        `<tr><td>${esc(g.name)}</td><td>${esc(g.target)}</td><td style="text-align:right">${g.progress}%</td><td>${esc(g.status)}</td></tr>`
    )
    .join('')
  const sensorRows = report.sensors
    .map(
      (s) =>
        `<tr><td>${esc(s.name)}</td><td>${esc(s.value)}</td><td>${esc(s.lastSync)}</td><td style="color:${s.status === '正常' ? '#2b9f6b' : '#b88200'}">${esc(s.status)}</td></tr>`
    )
    .join('')
  const highlightList = report.highlights.map((h) => `<li>${esc(h)}</li>`).join('')
  const kpiBlocks = report.kpis
    .map(
      (k) =>
        `<div class="kpi"><div class="kpi-label">${esc(k.label)}</div><div class="kpi-value">${esc(k.value)} <span style="font-size:14px">${esc(k.unit)}</span></div><div style="font-size:12px;color:${k.trendUp ? '#c82014' : '#2b9f6b'}">${esc(k.trend)}</div></div>`
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(report.title)}</title>
<style>
  body { font-family: "PingFang TC", "Microsoft JhengHei", "Noto Sans TC", sans-serif; color: #1e3932; margin: 0; padding: 40px; background: #f2f0eb; }
  .page { max-width: 800px; margin: 0 auto; background: #fff; padding: 48px; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,.08); }
  h1 { font-size: 28px; color: #006241; margin: 0 0 8px; }
  h2 { font-size: 18px; color: #00754a; margin: 32px 0 12px; border-bottom: 2px solid #d4e9e2; padding-bottom: 8px; }
  .meta { color: #666; font-size: 13px; line-height: 1.8; margin-bottom: 24px; }
  .kpi-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 20px 0; }
  .kpi { background: #f9f9f9; border-radius: 10px; padding: 16px; border-left: 4px solid #00754a; }
  .kpi-label { font-size: 12px; color: #888; }
  .kpi-value { font-size: 24px; font-weight: 700; margin: 4px 0; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; margin: 12px 0; }
  th, td { padding: 10px 12px; border-bottom: 1px solid #eef0f4; text-align: left; }
  th { background: #fafbfc; color: #666; font-weight: 600; }
  ul { padding-left: 20px; line-height: 1.8; }
  .disclaimer { margin-top: 32px; padding: 16px; background: #fff8e6; border-radius: 8px; font-size: 12px; color: #666; }
  @media print { body { background: #fff; padding: 0; } .page { box-shadow: none; } }
</style>
</head>
<body>
<div class="page">
  <h1>${esc(report.title)}</h1>
  <p style="font-size:16px;color:#555;margin:0 0 20px">${esc(report.subtitle)}</p>
  <div class="meta">
    <div>企業名稱：${esc(report.company)}</div>
    <div>報告編號：${esc(report.reportNo)}</div>
    <div>統計期間：${esc(report.period)} 年度</div>
    <div>生成時間：${esc(report.generatedAt)}</div>
  </div>
  <h2>一、執行摘要</h2>
  <div class="kpi-grid">${kpiBlocks}</div>
  <h2>二、溫室氣體排放（範疇一～三）</h2>
  <table><thead><tr><th>範疇</th><th>類別</th><th>排放量 (tCO₂e)</th><th>占比</th><th>年增減</th></tr></thead><tbody>${scopeRows}</tbody></table>
  <h2>三、部門碳排放排行</h2>
  <table><thead><tr><th>排名</th><th>部門</th><th>累計排放 (tCO₂e)</th><th>占比</th></tr></thead><tbody>${deptRows}</tbody></table>
  <h2>四、ESG 目標進度</h2>
  <table><thead><tr><th>目標項目</th><th>目標說明</th><th>達成率</th><th>狀態</th></tr></thead><tbody>${goalRows}</tbody></table>
  <h2>五、感測器即時狀態</h2>
  <table><thead><tr><th>設備</th><th>讀值</th><th>最後同步</th><th>狀態</th></tr></thead><tbody>${sensorRows}</tbody></table>
  <h2>六、管理層結論與建議</h2>
  <ul>${highlightList}</ul>
  <div class="disclaimer">${esc(report.disclaimer)}</div>
</div>
</body>
</html>`
}

export function openReportPreviewTab(report) {
  const html = buildReportHtml(report)
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const tab = window.open(url, '_blank')
  if (!tab) {
    URL.revokeObjectURL(url)
    return false
  }
  tab.addEventListener?.('load', () => {
    setTimeout(() => URL.revokeObjectURL(url), 60000)
  })
  setTimeout(() => URL.revokeObjectURL(url), 60000)
  return true
}

export function downloadReportHtml(report) {
  const html = buildReportHtml(report)
  const blob = new Blob([`\uFEFF${html}`], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `EcoSensing_ESG_Report_${report.year}_${report.date}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 3000)
}

export function printReportHtml(report) {
  const opened = openReportPreviewTab(report)
  if (!opened) {
    downloadReportHtml(report)
    return 'download'
  }
  return 'tab'
}
