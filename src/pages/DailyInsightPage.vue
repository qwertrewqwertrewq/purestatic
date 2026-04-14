<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const fullText = `昨晚深睡2.8小时，HRV恢复良好。今日状态评分92，适合挑战。`

const streamedText = ref('')
let timer = null

onMounted(() => {
  let index = 0
  timer = window.setInterval(() => {
    if (index >= fullText.length) {
      window.clearInterval(timer)
      timer = null
      return
    }

    streamedText.value += fullText[index]
    index += 1
  }, 24)
})

onBeforeUnmount(() => {
  if (timer) {
    window.clearInterval(timer)
    timer = null
  }
})
</script>

<template>
  <main class="daily-page">
    <section class="insight-box">
      <h1 class="insight-title">.   灵犀晓伴每日健康洞察</h1>
      <p class="insight-text">{{ streamedText }}</p>
      <p class="insight-footnote">以上内容由灵犀.晓伴AI智能体生成</p>
    </section>
  </main>
</template>

<style scoped>
.daily-page {
  max-width: 760px;
  margin: 0 auto;
}

.insight-box {
  background: #ffffff;
  border-radius: 18px;
  padding: 18px 18px 14px;
  min-height: 20px;
  display: flex;
  flex-direction: column;
}

.insight-title {
  margin: 0;
  color: #12203a;
  font-size: 64px;
  font-weight: 700;
  text-align: center;
}

.insight-text {
  margin: 12px 0 0;
  color: #27364c;
  font-size: 242px;
  line-height: 1.8;
  white-space: pre-wrap;
  min-height: 20px;
}

.insight-footnote {
  text-align: center;
  color: #8a93a2;
  font-size: 12px;
}

@media (max-width: 640px) {
  .insight-box {
    border-radius: 14px;
    padding: 14px 14px 12px;
  }

  .insight-title {
    font-size: 20px;
  }

  .insight-text {
    font-size: 15px;
    min-height: 20px;
  }
}
</style>
