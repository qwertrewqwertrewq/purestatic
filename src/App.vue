<script setup>
import { onMounted, ref } from 'vue'

const THEME_STORAGE_KEY = 'bg-theme'
const isGreen = ref(false)

const applyTheme = () => {
  const nextColor = isGreen.value ? '#01a939' : '#000000'
  document.documentElement.style.setProperty('--green-bg', nextColor)
}

const toggleTheme = () => {
  isGreen.value = !isGreen.value
  applyTheme()
  window.localStorage.setItem(THEME_STORAGE_KEY, isGreen.value ? 'green' : 'black')
}

onMounted(() => {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  isGreen.value = savedTheme === 'green'
  applyTheme()
})
</script>

<template>
  <div class="app-shell">
    <button class="theme-switch" type="button" @click="toggleTheme">
      {{ isGreen ? '黑色背景' : '绿色背景' }}
    </button>

    <nav class="page-nav">
      <RouterLink to="/" class="nav-link" exact-active-class="is-active">页面1 对话</RouterLink>
      <RouterLink to="/pressure-line" class="nav-link" active-class="is-active">页面2 压力折线</RouterLink>
      <RouterLink to="/heart-rate-line" class="nav-link" active-class="is-active">页面3 心率折线</RouterLink>
      <RouterLink to="/lingxi-bubble" class="nav-link" active-class="is-active">页面4 灵犀气泡</RouterLink>
      <RouterLink to="/music-player" class="nav-link" active-class="is-active">页面5 音乐播放器</RouterLink>
      <RouterLink to="/circle" class="nav-link" active-class="is-active">页面6 Circle</RouterLink>
      <RouterLink to="/daily-insight" class="nav-link" active-class="is-active">页面7 每日观察</RouterLink>
      <RouterLink to="/flow-cards" class="nav-link" active-class="is-active">页面8 流动卡片</RouterLink>
      <RouterLink to="/family-care" class="nav-link" active-class="is-active">页面9 亲友关怀</RouterLink>
      <RouterLink to="/magic-ring" class="nav-link" active-class="is-active">页面10 灵犀魔戒</RouterLink>
      <RouterLink to="/empty-page" class="nav-link" active-class="is-active">页面11 空页面</RouterLink>
      <RouterLink to="/sleep-page" class="nav-link" active-class="is-active">页面12 睡眠</RouterLink>
      <RouterLink to="/step-card" class="nav-link" active-class="is-active">页面13 步数</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
.theme-switch {
  position: fixed;
  top: 14px;
  right: 14px;
  z-index: 20;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.45);
  color: #ffffff;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
}

.theme-switch:hover {
  background: rgba(0, 0, 0, 0.62);
}

.page-nav {
  max-width: 980px;
  margin: 36px auto 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.nav-link {
  text-decoration: none;
  font-size: 13px;
  color: #1a4dc2;
  background: rgba(255, 255, 255, 0.72);
  border-radius: 999px;
  padding: 6px 12px;
}

.is-active {
  color: #ffffff;
  background: #2b69ff;
}
</style>
