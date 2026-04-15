<script setup>
import { CircleHelp, PencilLine, PersonStanding } from 'lucide-vue-next'

const chartWidth = 760
const chartHeight = 340
const pad = 18

const bars = [
  40, 55, 0, 0, 12, 0, 0, 0, 0, 620, 840, 380, 520, 2515, 210, 190, 70, 85, 180, 0,
  30, 170, 1780, 820,
]

const maxY = 2515
const plotW = chartWidth - pad * 2 - 86
const plotH = chartHeight - pad * 2 - 44
const barGap = 6
const barWidth = (plotW - barGap * (bars.length - 1)) / bars.length
const baseX = pad
const baseY = pad + 10

const axisTicks = [0, 503, 1006, 1509, 2012, 2515]

const barsMeta = bars.map((value, index) => {
  const h = (value / maxY) * plotH
  return {
    id: `bar-${index}`,
    x: baseX + index * (barWidth + barGap),
    y: baseY + (plotH - h),
    w: barWidth,
    h,
  }
})
</script>

<template>
  <main class="steps-page">
    <section class="panel score-panel">
      <div class="score-left">
        <div class="score-main">
          <strong>98</strong>
          <span>分</span>
          <CircleHelp :size="24" class="hint" />
        </div>
      </div>

      <div class="score-ring" aria-label="分数进度">
        <svg viewBox="0 0 120 120" role="img">
          <circle cx="60" cy="60" r="44" class="ring-bg" />
          <circle cx="60" cy="60" r="28" class="ring-inner" />
          <circle cx="60" cy="60" r="28" class="ring-progress" pathLength="100" stroke-dasharray="78 22" />
        </svg>
      </div>
    </section>

    <section class="panel chart-panel">
      <header class="card-head">
        <div class="left-title">
          <span class="title-icon"><PersonStanding :size="18" /></span>
          <h2>步数</h2>
        </div>

        <div class="head-value">
          <strong>8347</strong>
          <span>/ 2500步</span>
          <PencilLine :size="26" class="edit" />
        </div>
      </header>

      <svg class="chart" :viewBox="`0 0 ${chartWidth} ${chartHeight}`" role="img" aria-label="步数柱状图">
        <rect x="0" y="0" :width="chartWidth" :height="chartHeight" fill="transparent" />

        <line
          v-for="tick in axisTicks"
          :key="`h-${tick}`"
          :x1="pad"
          :y1="baseY + plotH - (tick / maxY) * plotH"
          :x2="pad + plotW"
          :y2="baseY + plotH - (tick / maxY) * plotH"
          class="grid"
        />

        <line
          v-for="index in 4"
          :key="`v-${index}`"
          :x1="pad + (plotW / 4) * index"
          :y1="baseY"
          :x2="pad + (plotW / 4) * index"
          :y2="baseY + plotH"
          class="grid"
        />

        <rect
          v-for="(bar, index) in barsMeta"
          :key="bar.id"
          :x="bar.x"
          :y="bar.y"
          :width="bar.w"
          :height="bar.h"
          class="bar"
          :style="{ animationDelay: `${index * 0.035}s` }"
        />

        <line :x1="pad" :y1="baseY + plotH" :x2="pad + plotW" :y2="baseY + plotH" class="axis" />

        <g class="y-labels">
          <text v-for="tick in axisTicks" :key="`y-${tick}`" :x="pad + plotW + 10" :y="baseY + plotH - (tick / maxY) * plotH + 7">{{ tick }}</text>
        </g>
      </svg>

      <div class="x-times">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
      </div>
    </section>
  </main>
</template>

<style scoped>
.steps-page {
  max-width: 920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.panel {
  background: rgba(75, 75, 75, 0.8);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.score-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
}

.score-main {
  display: flex;
  align-items: baseline;
  gap: 4px;
  color: #ffffff;
}

.score-main strong {
  font-size: 82px;
  line-height: 1;
  font-weight: 800;
}

.score-main span {
  font-size: 54px;
  font-weight: 700;
}

.hint {
  color: rgba(255, 255, 255, 0.5);
  margin-left: 4px;
}

.score-ring {
  width: 120px;
  height: 120px;
}

.score-ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-bg {
  fill: none;
  stroke: #f6c511;
  stroke-width: 12;
}

.ring-inner {
  fill: #f2ebeb;
}

.ring-progress {
  fill: none;
  stroke: #ea5163;
  stroke-width: 10;
  stroke-linecap: round;
}

.chart-panel {
  padding: 16px 14px 12px;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.left-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.title-icon {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: #f4c611;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.left-title h2 {
  margin: 0;
  color: #ffffff;
  font-size: 52px;
  font-weight: 700;
}

.head-value {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.head-value strong {
  color: #ffffff;
  font-size: 62px;
  line-height: 1;
}

.head-value span {
  color: #f4c611;
  font-size: 56px;
  line-height: 1;
  font-weight: 700;
}

.edit {
  color: #f4c611;
  margin-left: 2px;
}

.chart {
  width: 100%;
  display: block;
}

.grid {
  stroke: rgba(222, 222, 227, 0.55);
  stroke-width: 1;
  stroke-dasharray: 2 4;
}

.axis {
  stroke: rgba(184, 185, 194, 0.8);
  stroke-width: 2;
}

.bar {
  fill: #f4c611;
  rx: 5;
  transform-origin: bottom;
  animation: grow 0.5s ease both;
}

.y-labels text {
  fill: rgba(255, 255, 255, 0.78);
  font-size: 16px;
  font-weight: 500;
}

.x-times {
  margin-top: 2px;
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.82);
  font-size: 22px;
  font-weight: 500;
  padding: 0 6px 2px 2px;
}

@keyframes grow {
  from {
    opacity: 0;
    transform: scaleY(0.2);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}

@media (max-width: 700px) {
  .score-main strong {
    font-size: 56px;
  }

  .score-main span {
    font-size: 36px;
  }

  .score-ring {
    width: 84px;
    height: 84px;
  }

  .left-title h2 {
    font-size: 34px;
  }

  .head-value strong {
    font-size: 44px;
  }

  .head-value span {
    font-size: 34px;
  }

  .x-times {
    font-size: 16px;
  }
}
</style>
