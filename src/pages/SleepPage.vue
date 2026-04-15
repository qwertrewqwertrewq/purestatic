<script setup>
const chartWidth = 760
const chartHeight = 330
const paddingX = 18
const paddingY = 20

const stageMeta = {
  wake: {
    label: '清醒',
    colorA: '#f8d53b',
    colorB: '#f4c423',
    y: 16,
    h: 86,
  },
  rem: {
    label: '快速眼动',
    colorA: '#f13ad5',
    colorB: '#d92ac1',
    y: 102,
    h: 86,
  },
  light: {
    label: '浅睡',
    colorA: '#b27be3',
    colorB: '#9a64d7',
    y: 188,
    h: 86,
  },
  deep: {
    label: '深睡',
    colorA: '#9d3be6',
    colorB: '#7d27d8',
    y: 274,
    h: 86,
  },
}

const segments = [
  { start: 0.01, len: 0.05, stage: 'wake' },
  { start: 0.06, len: 0.02, stage: 'light' },
  { start: 0.08, len: 0.05, stage: 'deep' },
  { start: 0.13, len: 0.02, stage: 'light' },
  { start: 0.15, len: 0.04, stage: 'rem' },
  { start: 0.19, len: 0.09, stage: 'wake' },
  { start: 0.28, len: 0.02, stage: 'light' },
  { start: 0.30, len: 0.06, stage: 'deep' },
  { start: 0.36, len: 0.02, stage: 'light' },
  { start: 0.38, len: 0.03, stage: 'deep' },
  { start: 0.41, len: 0.04, stage: 'rem' },
  { start: 0.45, len: 0.05, stage: 'light' },
  { start: 0.50, len: 0.06, stage: 'wake' },
  { start: 0.56, len: 0.02, stage: 'light' },
  { start: 0.58, len: 0.11,stage: 'deep' },
  { start: 0.69, len: 0.04, stage: 'rem' },
  { start: 0.73, len: 0.09, stage: 'light' },
  { start: 0.82, len: 0.04, stage: 'rem' },
  { start: 0.86, len: 0.02, stage: 'light' },
  { start: 0.88, len: 0.03, stage: 'deep' },
  { start: 0.91, len: 0.02, stage: 'light' },
  { start: 0.93, len: 0.03, stage: 'deep' },
  { start: 0.96, len: 0.02, stage: 'light' },
  { start: 0.98, len: 0.06, stage: 'wake' },
]

const plotWidth = chartWidth - paddingX * 2
const plotHeight = chartHeight - paddingY * 2

const bars = segments.map((item, index) => {
  const meta = stageMeta[item.stage]
  return {
    ...item,
    id: `${item.stage}-${index}`,
    x: paddingX + item.start * plotWidth,
    w: Math.max(4, item.len * plotWidth),
    y: paddingY + (meta.y / 360) * plotHeight,
    h: (meta.h / 360) * plotHeight,
    colorA: meta.colorA,
    colorB: meta.colorB,
    delay: `${index * 0.03}s`,
  }
})

const legends = [
  { key: 'wake', label: '清醒', color: '#f4c423' },
  { key: 'rem', label: '快速眼动', color: '#d92ac1' },
  { key: 'light', label: '浅睡', color: '#9a64d7' },
  { key: 'deep', label: '深睡', color: '#7d27d8' },
]
</script>

<template>
  <main class="sleep-page">
    <header class="duration-row">
      <strong>7</strong>
      <span>小时</span>
      <strong>10</strong>
      <span>分钟</span>
    </header>

    <section class="sleep-card">
      <div class="card-title-row">
        <h2>睡眠分期</h2>
        <span class="help">?</span>
      </div>

      <svg class="sleep-chart" :viewBox="`0 0 ${chartWidth} ${chartHeight}`" role="img" aria-label="睡眠分期图">
        <line
          v-for="index in 4"
          :key="`h-${index}`"
          :x1="paddingX"
          :y1="paddingY + (plotHeight / 4) * index"
          :x2="chartWidth - paddingX"
          :y2="paddingY + (plotHeight / 4) * index"
          class="grid"
        />

        <line
          v-for="index in 4"
          :key="`v-${index}`"
          :x1="paddingX + (plotWidth / 4) * index"
          :y1="paddingY"
          :x2="paddingX + (plotWidth / 4) * index"
          :y2="chartHeight - paddingY"
          class="grid"
        />

        <g v-for="bar in bars" :key="bar.id" class="bar-group" :style="{ animationDelay: bar.delay }">
          <defs>
            <linearGradient :id="`grad-${bar.id}`" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" :stop-color="bar.colorA" />
              <stop offset="100%" :stop-color="bar.colorB" />
            </linearGradient>
          </defs>
          <rect :x="bar.x" :y="bar.y" :width="bar.w" :height="bar.h" :fill="`url(#grad-${bar.id})`" opacity="0.95" />
        </g>

        <line :x1="paddingX" :y1="chartHeight - paddingY" :x2="chartWidth - paddingX" :y2="chartHeight - paddingY" class="axis" />
      </svg>

      <div class="time-row">
        <span>22:24</span>
        <span>07:49</span>
      </div>

      <div class="legend-row">
        <div v-for="item in legends" :key="item.key" class="legend-item">
          <span class="legend-dot" :style="{ background: item.color }"></span>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.sleep-page {
  max-width: 920px;
  margin: 0 auto;
}

.duration-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
  color: #ffffff;
  margin-bottom: 10px;
}

.duration-row strong {
  font-size: clamp(52px, 8vw, 86px);
  line-height: 1;
  font-weight: 800;
}

.duration-row span {
  font-size: clamp(24px, 4.2vw, 52px);
  font-weight: 700;
}

.sleep-card {
  border-radius: 24px;
  background: rgba(75, 75, 75, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.84);
  padding: 18px 16px 14px;
}

.card-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-title-row h2 {
  margin: 0;
  font-size: clamp(30px, 5vw, 58px);
  color: #ffffff;
  font-weight: 800;
}

.help {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 3px solid rgba(255, 255, 255, 0.55);
  color: rgba(255, 255, 255, 0.82);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 700;
}

.sleep-chart {
  width: 100%;
  display: block;
  margin-top: 12px;
}

.grid {
  stroke: #d8d8de;
  stroke-width: 1;
  stroke-dasharray: 2 4;
}

.axis {
  stroke: #c3c4cc;
  stroke-width: 2;
}

.bar-group {
  transform-origin: center;
  animation: bar-in 0.55s ease both;
}

.time-row {
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  font-size: clamp(26px, 3.8vw, 52px);
  font-weight: 500;
}

.legend-row {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 18px 30px;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-size: clamp(20px, 3vw, 44px);
  font-weight: 700;
}

.legend-dot {
  width: 44px;
  height: 44px;
  border-radius: 0;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.3);
}

@keyframes bar-in {
  from {
    opacity: 0;
    transform: translateY(8px) scaleY(0.45);
  }
  to {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
}

@media (max-width: 700px) {
  .sleep-card {
    border-radius: 16px;
    padding: 12px 10px 12px;
  }

  .help {
    width: 24px;
    height: 24px;
    font-size: 15px;
    border-width: 2px;
  }

  .legend-dot {
    width: 20px;
    height: 20px;
  }
}
</style>
