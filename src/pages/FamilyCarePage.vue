<script setup>
import { onMounted, ref } from 'vue'
import {
  Activity,
  CircleHelp,
  Droplets,
  Gauge,
  HeartPulse,
  MoonStar,
  PersonStanding,
  Thermometer,
  Timer,
} from 'lucide-vue-next'

const showRows = ref(false)

const items = [
  {
    key: 'sleep',
    icon: MoonStar,
    color: '#9147ff',
    label: '睡眠',
    value: '7小时10分',
    tagText: '正常',
    tagType: 'good',
  },
  {
    key: 'sport',
    icon: PersonStanding,
    color: '#f4bf16',
    label: '运动',
    value: '82分',
    tagText: '正常',
    tagType: 'good',
  },
  {
    key: 'stress',
    icon: Gauge,
    color: '#3f63e0',
    label: '压力',
    value: '42',
    tagText: '正常',
    tagType: 'good',
  },
  {
    key: 'heart-rate',
    icon: HeartPulse,
    color: '#ff2d3b',
    label: '心率',
    value: '85次/分',
    tagText: '正常',
    tagType: 'good',
  },
  {
    key: 'spo2',
    icon: Droplets,
    color: '#32d2db',
    label: '血氧饱和度',
    value: '97%',
    tagText: '正常',
    tagType: 'good',
  },
  {
    key: 'hrv',
    icon: Activity,
    color: '#f31597',
    label: '心率变异性',
    value: '34毫秒',
    tagText: '正常',
    tagType: 'good',
  },
  {
    key: 'temp',
    icon: Thermometer,
    color: '#31cf4c',
    label: '体温',
    value: '36.4℃',
    tagText: '正常',
    tagType: 'good',
  },
]

onMounted(() => {
  window.requestAnimationFrame(() => {
    showRows.value = true
  })
})
</script>

<template>
  <main class="care-page">
    <section class="care-panel">
      <header class="care-header">亲友关爱共享</header>

      <div class="cycle-row row-divider">
        <div class="left-block">
          <span class="icon-wrap icon-cycle">
            <Timer :size="20" :stroke-width="2.4" />
          </span>
          <span class="label">数据周期</span>
        </div>
        <span class="value cycle-value">2026.04.06~2026.04.12</span>
      </div>

      <div
        v-for="(item, index) in items"
        :key="item.key"
        class="metric-row"
        :class="{ 'is-visible': showRows }"
        :style="{ animationDelay: `${0.08 + index * 0.06}s` }"
      >
        <div class="left-block">
          <span class="icon-wrap" :style="{ backgroundColor: item.color }">
            <component :is="item.icon" :size="18" :stroke-width="2.4" />
          </span>
          <span class="label">{{ item.label }}</span>
          <span v-if="item.value !== '--'" class="hint-wrap">
            <CircleHelp :size="18" />
          </span>
        </div>

        <div class="right-block">
          <span class="value">{{ item.value }}</span>
          <span v-if="item.tagText" class="tag" :class="`tag-${item.tagType}`">{{ item.tagText }}</span>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.care-page {
  max-width: 860px;
  margin: 0 auto;
}

.care-panel {
  background: rgba(248, 250, 255, 0.78);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.75);
  padding: 8px 12px 10px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.care-header {
  text-align: center;
  color: #3f4955;
  font-size: 24px;
  font-weight: 700;
  padding: 8px 0 6px;
}

.row-divider {
  border-bottom: 1px solid rgba(172, 177, 188, 0.32);
}

.cycle-row,
.metric-row {
  min-height: 66px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.left-block {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-wrap {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.icon-cycle {
  background: #f4b211;
}

.label {
  color: #59606a;
  font-size: 24px;
  font-weight: 700;
  white-space: nowrap;
}

.hint-wrap {
  color: #b9bec5;
  display: inline-flex;
  align-items: center;
}

.right-block {
  display: flex;
  align-items: center;
  gap: 10px;
}

.value {
  color: #12151d;
  font-size: 26px;
  font-weight: 800;
  white-space: nowrap;
}

.cycle-value {
  font-size: 20px;
  color: #151821;
}

.tag {
  min-width: 56px;
  height: 34px;
  padding: 0 10px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
}

.tag-warning {
  color: #e5954a;
  background: #f7ede5;
}

.tag-good {
  color: #54aa2c;
  background: #def4d4;
}

.metric-row {
  opacity: 0;
  transform: translateY(14px);
}

.metric-row.is-visible {
  animation: row-in 0.54s ease forwards;
}

@keyframes row-in {
  0% {
    opacity: 0;
    transform: translateY(14px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .care-panel {
    padding: 6px 8px 8px;
  }

  .care-header {
    font-size: 20px;
  }

  .cycle-row,
  .metric-row {
    min-height: 56px;
  }

  .icon-wrap {
    width: 28px;
    height: 28px;
  }

  .label {
    font-size: 17px;
  }

  .value {
    font-size: 20px;
  }

  .cycle-value {
    font-size: 15px;
  }

  .tag {
    min-width: 46px;
    height: 28px;
    font-size: 14px;
    border-radius: 8px;
  }
}
</style>
