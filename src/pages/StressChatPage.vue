<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const userText = '如何在工作期间缓解压力'

const assistantFullText = `在繁忙的工作间隙，不妨抽出几分钟进行简单的肢体拉伸与深呼吸，这不仅能有效缓解因久坐带来的肌肉僵硬，更能通过规律的呼气吐纳调节植物神经，从而迅速排解职场压力，让身心在短时间内重获能量与专注力。`

const streamedText = ref('')
let timer = null

onMounted(() => {
  let index = 0
  timer = window.setInterval(() => {
    if (index >= assistantFullText.length) {
      window.clearInterval(timer)
      timer = null
      return
    }
    streamedText.value += assistantFullText[index]
    index += 1
  }, 22)
})

onBeforeUnmount(() => {
  if (timer) {
    window.clearInterval(timer)
    timer = null
  }
})
</script>

<template>
  <main class="chat-page">
    <section class="chat-card">
      <div class="message-list">
        <article class="bubble bubble-user">
          <p>{{ userText }}</p>
        </article>

        <article class="bubble bubble-assistant">
          <p>{{ streamedText }}</p>
        </article>
      </div>
    </section>
  </main>
</template>
