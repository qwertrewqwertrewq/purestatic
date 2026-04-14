<template>
  <div class="app-shell">
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
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
.page-nav {
  max-width: 980px;
  margin: 0 auto 10px;
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
