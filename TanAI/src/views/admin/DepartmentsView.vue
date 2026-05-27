<script setup>
import { ref } from 'vue'

const summary = ref([
  { title: '部門數量', value: '6', unit: '個' },
  { title: '最高排放部門', value: '製造部', unit: '' },
  { title: '最低排放部門', value: '行政部', unit: '' },
  { title: '年度總排放', value: '1245', unit: 'tCO₂e' }
])

const departments = ref([
  {
    name: '製造部',
    emissions: 420,
    change: '+3.2%',
    employees: 120
  },
  {
    name: '物流部',
    emissions: 260,
    change: '+2.1%',
    employees: 80
  },
  {
    name: '研發部',
    emissions: 210,
    change: '-1.5%',
    employees: 60
  },
  {
    name: '行銷部',
    emissions: 150,
    change: '+0.8%',
    employees: 45
  },
  {
    name: '行政部',
    emissions: 120,
    change: '-2.4%',
    employees: 30
  },
  {
    name: '人資部',
    emissions: 85,
    change: '-1.1%',
    employees: 20
  }
])
</script>

<template>
  <div class="departments-page admin-page">

    <div class="page-header">
      <h1>部門碳排放</h1>
      <p>各部門碳排放分析與管理</p>
    </div>

    <!-- KPI -->
    <div class="summary-grid">
      <div
        v-for="item in summary"
        :key="item.title"
        class="summary-card"
      >
        <div class="summary-title">{{ item.title }}</div>
        <div class="summary-value">
          {{ item.value }}
          <span>{{ item.unit }}</span>
        </div>
      </div>
    </div>

    <!-- Department Ranking -->
    <div class="card">
      <h3 class="card-title">部門碳排放排行</h3>

      <div class="ranking-list">
        <div
          v-for="dept in departments"
          :key="dept.name"
          class="ranking-row"
        >
          <span class="dept-name">
            {{ dept.name }}
          </span>

          <div class="bar-wrap">
            <div
              class="bar"
              :style="{ width: dept.emissions / 5 + 'px' }"
            ></div>
          </div>

          <span class="dept-value">
            {{ dept.emissions }} tCO₂e
          </span>
        </div>
      </div>
    </div>

    <!-- Department Table -->
    <div class="card">
      <h3 class="card-title">部門排放明細表</h3>

      <table class="dept-table">
        <thead>
          <tr>
            <th>部門</th>
            <th>員工數</th>
            <th>排放量</th>
            <th>年度變化</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="dept in departments"
            :key="dept.name"
          >
            <td>{{ dept.name }}</td>
            <td>{{ dept.employees }}</td>
            <td>{{ dept.emissions }} tCO₂e</td>
            <td>{{ dept.change }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<style scoped>

.departments-page {
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

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 20px;
  margin-bottom: 20px;
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
}

.summary-value span {
  font-size: 12px;
  color: #8c8c8c;
}

.card {
  background: #fff;
  border-radius: var(--sb-radius-card);
  padding: 20px;
  box-shadow: var(--sb-shadow-card);
  margin-bottom: 20px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.ranking-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}

.dept-name {
  width: 80px;
}

.bar-wrap {
  flex: 1;
  height: 10px;
  background: #f0f0f0;
  border-radius: 6px;
}

.bar {
  height: 10px;
  background: #00754a;
  border-radius: 6px;
}

.dept-value {
  width: 100px;
  text-align: right;
}

.dept-table {
  width: 100%;
  border-collapse: collapse;
}

.dept-table th,
.dept-table td {
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.dept-table th {
  color: #8c8c8c;
  font-weight: 600;
}

</style>