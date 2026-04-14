<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const sleepMinutes = 7 * 60 + 10
const sleepGoalMinutes = 7 * 60

const stepValue = 13434
const stepGoal = 1000
const kcalValue = 567
const kcalGoal = 500

const sleepProgress = ref(0)
const stepProgress = ref(0)
const kcalProgress = ref(0)

let frameId = null

const clamp01 = (value) => Math.min(Math.max(value, 0), 1)

const sleepTarget = clamp01(sleepMinutes / sleepGoalMinutes)
const stepTarget = clamp01(stepValue / stepGoal)
const kcalTarget = clamp01(kcalValue / kcalGoal)

const sleepRadius = 46
const outerRadius = 46
const innerRadius = 33

const sleepCircumference = 2 * Math.PI * sleepRadius
const outerCircumference = 2 * Math.PI * outerRadius
const innerCircumference = 2 * Math.PI * innerRadius

const sleepOffset = computed(() => sleepCircumference * (1 - sleepProgress.value))
const outerOffset = computed(() => outerCircumference * (1 - stepProgress.value))
const innerOffset = computed(() => innerCircumference * (1 - kcalProgress.value))

onMounted(() => {
  const duration = 1200
  let startTime = 0

  const animate = (timestamp) => {
    if (!startTime) {
      startTime = timestamp
    }

    const elapsed = timestamp - startTime
    const t = clamp01(elapsed / duration)

    sleepProgress.value = sleepTarget * t
    stepProgress.value = stepTarget * t
    kcalProgress.value = kcalTarget * t

    if (t < 1) {
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
  <main class="circle-page">
    <section class="circle-card">
      <div class="text-side">
        <p class="value-main">7小时10分钟</p>
      </div>

      <div class="ring-side">
        <svg class="ring-svg" viewBox="0 0 120 120" role="img" aria-label="睡眠进度">
          <g transform="rotate(-90 60 60)">
            <circle cx="60" cy="60" :r="sleepRadius" class="ring-track" />
            <circle
              cx="60"
              cy="60"
              :r="sleepRadius"
              class="ring-purple"
              :stroke-dasharray="sleepCircumference"
              :stroke-dashoffset="sleepOffset"
            />
          </g>
        </svg>
      </div>
    </section>

    <section class="circle-card">
      <div class="text-side">
        <p class="value-line">13434/1000 步</p>
        <p class="value-line">567/500 千卡</p>
      </div>

      <div class="ring-side">
        <svg class="ring-svg" viewBox="0 0 120 120" role="img" aria-label="步数和卡路里进度">
          <g transform="rotate(-90 60 60)">
            <circle cx="60" cy="60" :r="outerRadius" class="ring-track" />
            <circle
              cx="60"
              cy="60"
              :r="outerRadius"
              class="ring-yellow"
              :stroke-dasharray="outerCircumference"
              :stroke-dashoffset="outerOffset"
            />

            <circle cx="60" cy="60" :r="innerRadius" class="ring-track inner-track" />
            <circle
              cx="60"
              cy="60"
              :r="innerRadius"
              class="ring-orange"
              :stroke-dasharray="innerCircumference"
              :stroke-dashoffset="innerOffset"
            />
          </g>
        </svg>
      </div>
    </section>
  </main>
</template>

<style scoped>
.circle-page {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.circle-card {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 18px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text-side {
  min-width: 0;
}

.value-main {
  margin: 0;
  font-size: 42px;
  font-weight: 700;
  color: #ffffff;
}

.value-line {
  margin: 0;
  font-size: 32px;
  line-height: 1.24;
  font-weight: 700;
  color: #ffffff;
}

.value-line + .value-line {
  margin-top: 8px;
}

.ring-side {
  width: 120px;
  height: 120px;
  flex: 0 0 auto;
}

.ring-svg {
  width: 100%;
  height: 100%;
}

.ring-track {
  fill: none;
  stroke: rgba(255, 255, 255, 0.18);
  stroke-width: 10;
}

.inner-track {
  stroke-width: 8;
}

.ring-purple,
.ring-yellow,
.ring-orange {
  fill: none;
  stroke-width: 10;
  stroke-linecap: round;
}

.ring-purple {
  stroke: #a55cff;
}

.ring-yellow {
  stroke: #f3d54e;
}

.ring-orange {
  stroke: #ff9b3f;
  stroke-width: 8;
}

@media (max-width: 640px) {
  .circle-card {
    padding: 14px;
  }

  .value-main {
    font-size: 30px;
  }

  .value-line {
    font-size: 24px;
  }

  .ring-side {
    width: 96px;
    height: 96px;
  }
}
</style>
