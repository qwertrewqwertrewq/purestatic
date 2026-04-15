<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const width = 320
const height = 300
const padding = 16

const stressData = [
  46, 41, 37, 72, 45, 44, 40, 36, 31, 26, 21, 18, 14, 12, 15, 17, 16, 17, 16, 17,
  31, 52, 61, 58, 54, 56, 50, 45, 47, 44, 49, 66, 52, 61, 50, 58, 49, 50, 54, 57,
  62, 45, 59, 64, 55, 45, 49, 60, 82,
]

const heartData = [
  34, 34, 34, 68, 34, 34, 33, 33, 33, 33, 32, 34, 31, 33, 35, 32, 33, 31, 34, 32,
  36, 42, 44, 40, 48, 52, 41, 46, 42, 47, 48, 43, 57, 50, 54, 47, 48, 49, 46, 52,
  45, 46, 47, 58, 34, 49, 60, 49, 34, 46, 34, 58, 68,
]

const progress = ref(0)
let frameId = null

const plotWidth = width - padding * 2
const plotHeight = height - padding * 2

const createPoints = (source) => {
  return source.map((value, index) => {
    const x = padding + (index / (source.length - 1)) * plotWidth
    const y = padding + (1 - value / 100) * plotHeight
    return { x, y }
  })
}

const stressPoints = computed(() => createPoints(stressData))
const heartPoints = computed(() => createPoints(heartData))

const getVisiblePath = (points) => {
  const list = points.value
  const rawIndex = progress.value * (list.length - 1)
  const endIndex = Math.floor(rawIndex)
  const segmentRate = rawIndex - endIndex

  const visible = list.slice(0, endIndex + 1)

  if (endIndex < list.length - 1) {
    const current = list[endIndex]
    const next = list[endIndex + 1]
    visible.push({
      x: current.x + (next.x - current.x) * segmentRate,
      y: current.y + (next.y - current.y) * segmentRate,
    })
  }

  return visible.map((p) => `${p.x},${p.y}`).join(' ')
}

const stressPath = computed(() => getVisiblePath(stressPoints))
const heartPath = computed(() => getVisiblePath(heartPoints))

const getTip = (pathText) => {
  const visible = pathText.trim().split(' ')
  const last = visible[visible.length - 1]
  if (!last) {
    return { x: padding, y: height - padding }
  }

  const [x, y] = last.split(',').map(Number)
  return { x, y }
}

const stressTip = computed(() => getTip(stressPath.value))
const heartTip = computed(() => getTip(heartPath.value))

const gridLines = computed(() => {
  return Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    x: padding + (plotWidth / 4) * (index + 1),
    y: padding + (plotHeight / 4) * (index + 1),
  }))
})

onMounted(() => {
  const duration = 1100
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
    <section class="cards-grid">
      <article class="metric-card">
        <header class="card-top">
          <!-- <h3>压力</h3> -->
          <!-- <span class="chevron">›</span> -->
        </header>

        <div class="value-row">
          <strong style="color: white;">90</strong>
          <span class="desc">偏高</span>
        </div>

        <svg class="chart" :viewBox="`0 0 ${width} ${height}`" role="img" aria-label="压力折线图">
          <line :x1="padding" :y1="height - padding" :x2="width - padding" :y2="height - padding" class="axis" />

          <line
            v-for="line in gridLines"
            :key="`sx-${line.id}`"
            :x1="line.x"
            :y1="padding"
            :x2="line.x"
            :y2="height - padding"
            class="grid"
          />
          <line
            v-for="line in gridLines"
            :key="`sy-${line.id}`"
            :x1="padding"
            :y1="line.y"
            :x2="width - padding"
            :y2="line.y"
            class="grid"
          />

          <polyline :points="stressPath" class="stress-line" />
          <circle :cx="stressTip.x" :cy="stressTip.y" r="4.5" class="tip-dot stress-dot" />
        </svg>
      </article>

      <article class="metric-card">
        <header class="card-top">
          <!-- <h3>心率</h3> -->
          <!-- <span class="chevron">›</span> -->
        </header>

        <div class="value-row">
          <strong style="color: white;">98</strong>
          <span class="desc">次/分</span>
        </div>

        <svg class="chart" :viewBox="`0 0 ${width} ${height}`" role="img" aria-label="心率折线图">
          <line :x1="padding" :y1="height - padding" :x2="width - padding" :y2="height - padding" class="axis" />

          <line
            v-for="line in gridLines"
            :key="`hx-${line.id}`"
            :x1="line.x"
            :y1="padding"
            :x2="line.x"
            :y2="height - padding"
            class="grid"
          />
          <line
            v-for="line in gridLines"
            :key="`hy-${line.id}`"
            :x1="padding"
            :y1="line.y"
            :x2="width - padding"
            :y2="line.y"
            class="grid"
          />

          <polyline :points="heartPath" class="heart-line" />
          <circle :cx="heartTip.x" :cy="heartTip.y" r="4.5" class="tip-dot heart-dot" />
        </svg>
      </article>
    </section>
  </main>
</template>

<style scoped>
.line-page {
  max-width: 1380px;
  margin: 0 auto;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.metric-card {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.36);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 16px;
}

.card-top {
  display: flex;
  height: 70px;
  align-items: center;
  justify-content: space-between;
}

.card-top h3 {
  margin: 0;
  color: #111111;
  font-size: clamp(24px, 3.2vw, 64px);
  font-weight: 700;
}

.chevron {
  color: #c5c8cf;
  font-size: clamp(34px, 3.6vw, 74px);
  line-height: 1;
}

.value-row {
  margin-top: 8px;
  display: flex;
  align-items: baseline;
  gap: 14px;
}

.value-row strong {
  font-size: clamp(54px, 8vw, 98px);
  font-weight: 700;
  color: #0d0d0d;
  line-height: 1;
}

.desc {
  color: #c4c7ce;
  font-size: 64px;
  font-weight: 600;
  line-height: 1;
}

.chart {
  width: 100%;
  display: block;
  margin-top: 8px;
  background: transparent;
  border-radius: 14px;
}

.axis {
  stroke: rgba(157, 164, 177, 0.68);
  stroke-width: 2.2;
}

.grid {
  stroke: rgba(177, 182, 196, 0.62);
  stroke-width: 1;
  stroke-dasharray: 4 4;
}

.stress-line,
.heart-line {
  fill: none;
  stroke-width: 3.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.stress-line {
  stroke: #3659dd;
}

.heart-line {
  stroke: #ea2a35;
}

.tip-dot {
  stroke-width: 2.2;
}

.stress-dot {
  fill: #edf2ff;
  stroke: #3659dd;
}

.heart-dot {
  fill: #ffeef0;
  stroke: #ea2a35;
}

@media (max-width: 900px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
