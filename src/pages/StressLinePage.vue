<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const width = 680
const height = 320
const padding = 24
const warningStartRatio = 0.8

const stressData = [
  46, 47, 48, 49, 50, 51, 52, 53, 54, 56, 58, 60, 66, 78, 94,
]

const progress = ref(0)
let frameId = null

const plotWidth = width - padding * 2
const plotHeight = height - padding * 2
const warningStartX = padding + plotWidth * warningStartRatio
const warningWidth = plotWidth * (1 - warningStartRatio)

const points = computed(() => {
  return stressData.map((value, index) => {
    const x = padding + (index / (stressData.length - 1)) * plotWidth
    const y = padding + (1 - value / 100) * plotHeight
    return { x, y }
  })
})

const visiblePointsText = computed(() => {
  const rawIndex = progress.value * (points.value.length - 1)
  const endIndex = Math.floor(rawIndex)
  const segmentRate = rawIndex - endIndex

  const visible = points.value.slice(0, endIndex + 1)

  if (endIndex < points.value.length - 1) {
    const current = points.value[endIndex]
    const next = points.value[endIndex + 1]
    visible.push({
      x: current.x + (next.x - current.x) * segmentRate,
      y: current.y + (next.y - current.y) * segmentRate,
    })
  }

  return visible.map((p) => `${p.x},${p.y}`).join(' ')
})

const tipPoint = computed(() => {
  const visible = visiblePointsText.value.trim().split(' ')
  const last = visible[visible.length - 1]
  if (!last) {
    return { x: padding, y: height - padding }
  }

  const [x, y] = last.split(',').map(Number)
  return { x, y }
})

onMounted(() => {
  const duration = 900
  let startTime = 0

  const animate = (time) => {
    if (!startTime) {
      startTime = time
    }

    const elapsed = time - startTime
    progress.value = Math.min(elapsed / duration, 1)

    if (progress.value < 1) {
      frameId = window.requestAnimationFrame(animate)
    }
  }

  frameId = window.requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  if (frameId) {
    window.cancelAnimationFrame(frameId)
    frameId = null
  }
})
</script>

<template>
  <main class="line-page">
    <section class="chart-wrap">
      <h2 class="chart-title">压力变化折线</h2>

      <svg class="chart" :viewBox="`0 0 ${width} ${height}`" role="img" aria-label="压力折线图">
        <line :x1="padding" :y1="height - padding" :x2="width - padding" :y2="height - padding" class="axis" />
        <line :x1="padding" :y1="padding" :x2="padding" :y2="height - padding" class="axis" />

        <rect
          :x="warningStartX"
          :y="padding"
          :width="warningWidth"
          :height="plotHeight"
          class="warning-zone"
        />

        <line
          v-for="grid in 4"
          :key="grid"
          :x1="padding"
          :y1="padding + (plotHeight / 4) * grid"
          :x2="width - padding"
          :y2="padding + (plotHeight / 4) * grid"
          class="grid"
        />

        <polyline :points="visiblePointsText" class="stress-line" />
        <circle :cx="tipPoint.x" :cy="tipPoint.y" r="7" class="tip-dot" />
        <!-- <text :x="warningStartX + 10" :y="padding + 18" class="warning-label">预警区</text> -->
      </svg>

      <p class="chart-note">前半段维持中等压力，最后20%区间斜率翻倍并进入红色预警区。</p>
    </section>
  </main>
</template>

<style scoped>
.line-page {
  max-width: 740px;
  margin: 0 auto;
}

.chart-wrap {
  padding: 8px 8px 2px;
}

.chart-title {
  margin: 0 0 10px;
  font-size: 20px;
  color: #ffffff;
  font-weight: 700;
}

.chart {
  width: 100%;
  height: auto;
  display: block;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 14px;
}

.axis {
  stroke: rgba(255, 255, 255, 0.85);
  stroke-width: 2;
}

.grid {
  stroke: rgba(255, 255, 255, 0.22);
  stroke-width: 1;
  stroke-dasharray: 6 6;
}

.warning-zone {
  fill: rgba(255, 64, 64, 0.2);
}

.warning-label {
  fill: #ffdbdb;
  font-size: 28px;
  font-weight: 700;
}

.stress-line {
  fill: none;
  stroke: #2f67ff;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.tip-dot {
  fill: #dbe8ff;
  stroke: #2f67ff;
  stroke-width: 3;
}

.chart-note {
  margin: 10px 0 0;
  color: #ffffff;
  font-size: 14px;
}

@media (max-width: 480px) {
  .chart-title {
    font-size: 18px;
  }
}
</style>
