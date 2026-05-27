<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  unit: { type: String, default: '' },
  iconType: { type: String, default: 'emission' },
  trend: { type: String, default: '' },
  trendType: { type: String, default: 'neutral' },
  percentage: { type: Number, default: 0 },
  index: { type: Number, default: 0 }
})

const circleColor = computed(() => {
  const colors = ['#00754a', '#006241', '#2b5148', '#cba258']
  return colors[props.index % colors.length]
})

const dashArray = computed(() => {
  const circumference = 2 * Math.PI * 36
  const filled = (props.percentage / 100) * circumference
  return `${filled} ${circumference - filled}`
})

const displayNumber = computed(() => {
  return String(props.index + 1).padStart(2, '0')
})
</script>

<template>
  <div class="kpi-card">
    <div class="kpi-top">
      <h3 class="kpi-title">{{ title }}</h3>
      <span class="material-icons-outlined kpi-more">more_horiz</span>
    </div>
    <div class="kpi-body">
      <div class="circle-wrap">
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r="36" fill="none" stroke="#eef0f4" stroke-width="6"/>
          <circle cx="44" cy="44" r="36" fill="none"
            :stroke="circleColor" stroke-width="6" stroke-linecap="round"
            :stroke-dasharray="dashArray"
            stroke-dashoffset="0"
            transform="rotate(-90 44 44)"
            style="transition: stroke-dasharray .6s ease;"
          />
        </svg>
        <span class="circle-pct">{{ percentage }}%</span>
      </div>
      <div class="kpi-info">
        <span class="kpi-number">{{ displayNumber }}</span>
        <div class="kpi-value-row">
          <span class="kpi-value">{{ value }}</span>
          <span class="kpi-unit">{{ unit }}</span>
        </div>
        <div class="kpi-slider">
          <input type="range" min="0" max="100" :value="percentage" disabled class="mini-range" :style="{ '--range-color': circleColor }">
          <span class="kpi-slider-max">100</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kpi-card {
  background: var(--sb-white);
  border-radius: var(--sb-radius-card);
  padding: 20px;
  box-shadow: var(--sb-shadow-card);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.08), 0 8px 12px rgba(0, 0, 0, 0.1);
}
.kpi-card:active {
  transform: scale(0.99);
}
.kpi-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.kpi-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--sb-text);
}
.kpi-more {
  font-size: 18px;
  color: #b0b7c3;
  cursor: pointer;
}
.kpi-body {
  display: flex;
  align-items: center;
  gap: 18px;
}
.circle-wrap {
  position: relative;
  flex-shrink: 0;
  width: 88px;
  height: 88px;
}
.circle-pct {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #333;
}
.kpi-info {
  flex: 1;
  min-width: 0;
}
.kpi-number {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  line-height: 1;
}
.kpi-value-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-top: 2px;
}
.kpi-value {
  font-size: 13px;
  color: #8c8c8c;
  font-weight: 500;
}
.kpi-unit {
  font-size: 12px;
  color: #aaa;
}
.kpi-slider {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}
.mini-range {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 2px;
  background: #eef0f4;
  outline: none;
}
.mini-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  height: 0;
}
.mini-range {
  background: linear-gradient(to right, var(--range-color) 0%, var(--range-color) var(--pct, 50%), #eef0f4 var(--pct, 50%));
}
.kpi-slider-max {
  font-size: 12px;
  color: #b0b7c3;
  font-weight: 500;
}
</style>
