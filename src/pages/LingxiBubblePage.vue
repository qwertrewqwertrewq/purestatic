<script setup>
import { onMounted, ref } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  window.requestAnimationFrame(() => {
    isVisible.value = true
  })
})
</script>

<template>
  <main class="lingxi-page">
    <section class="stage">
      <article class="search-bubble" :class="{ 'is-visible': isVisible }">
        <p>Hi，我是灵犀·小伴</p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.lingxi-page {
  max-width: 740px;
  margin: 0 auto;
  min-height: calc(100vh - 84px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stage {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 12px;
}

.search-bubble {
  position: relative;
  width: min(92%, 560px);
  padding: 14px 22px;
  color: #113273;
  background: #dce9ff;
  border: 2px solid #7ca3ff;
  border-radius: 64px / 72px;
  text-align: center;
  overflow: hidden;
  opacity: 0;
  transform: translateY(96px) scale(0.96);
  box-shadow: 0 10px 24px rgba(16, 53, 126, 0.2);
}

.search-bubble.is-visible {
  animation: pop-up 560ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.search-bubble::before {
  content: '';
  position: absolute;
  top: -35%;
  left: -38%;
  width: 36%;
  height: 170%;
  background: linear-gradient(
    100deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.62) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: translateX(-180%) rotate(12deg);
  pointer-events: none;
}

.search-bubble.is-visible::before {
  animation: light-sweep 2.4s ease-in-out infinite;
}

.search-bubble p {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.2px;
}

@keyframes pop-up {
  0% {
    opacity: 0;
    transform: translateY(96px) scale(0.96);
  }
  70% {
    opacity: 1;
    transform: translateY(-8px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes light-sweep {
  0% {
    transform: translateX(-180%) rotate(12deg);
  }
  100% {
    transform: translateX(560%) rotate(12deg);
  }
}

@media (max-width: 480px) {
  .lingxi-page {
    min-height: calc(100vh - 72px);
  }

  .search-bubble {
    padding: 12px 18px;
    border-radius: 14px / 28px;
  }

  .search-bubble p {
    font-size: 20px;
  }
}
</style>
