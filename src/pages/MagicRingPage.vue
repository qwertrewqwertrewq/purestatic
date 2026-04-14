<script setup>
import { ref } from 'vue'

const playSeed = ref(0)

const replay = () => {
  playSeed.value += 1
}
</script>

<template>
  <main class="magic-page" @click="replay">
    <section class="scene" :key="playSeed">
      <svg class="heart-draw" viewBox="0 0 420 360" role="img" aria-label="爱心绘制动画">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path id="leftArc" d="M210 118 C156 50 66 92 66 166 C66 222 130 268 210 308" class="draw-line" pathLength="1">
          <animate attributeName="stroke-dasharray" from="0 1" to="1 0" dur="1.8s" fill="freeze" />
          <animate attributeName="stroke-dashoffset" from="1" to="0" dur="1.8s" fill="freeze" />
        </path>

        <path id="rightArc" d="M210 118 C264 50 354 92 354 166 C354 222 290 268 210 308" class="draw-line" pathLength="1">
          <animate attributeName="stroke-dasharray" from="0 1" to="1 0" dur="1.8s" fill="freeze" />
          <animate attributeName="stroke-dashoffset" from="1" to="0" dur="1.8s" fill="freeze" />
        </path>

        <circle class="dot" r="6" filter="url(#glow)">
          <animateMotion dur="1.8s" fill="freeze" path="M210 118 C156 50 66 92 66 166 C66 222 130 268 210 308" />
        </circle>
        <circle class="dot" r="6" filter="url(#glow)">
          <animateMotion dur="1.8s" fill="freeze" path="M210 118 C264 50 354 92 354 166 C354 222 290 268 210 308" />
        </circle>
      </svg>

      <div class="green-burst" aria-hidden="true">
        <span class="burst burst-a"></span>
        <span class="burst burst-b"></span>
        <span class="burst burst-c"></span>
      </div>

      <div class="copy">
        <h1>灵犀AI魔戒</h1>
        <p>心有灵犀，爱有回响</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.magic-page {
  min-height: calc(100vh - 86px);
  display: grid;
  place-items: center;
  background: #000000;
  cursor: pointer;
}

.scene {
  position: relative;
  width: min(92vw, 560px);
  aspect-ratio: 1 / 1.06;
}

.heart-draw {
  width: 100%;
  height: auto;
  display: block;
}

.draw-line {
  fill: none;
  stroke: #5dff96;
  stroke-width: 5.5;
  stroke-linecap: round;
  filter: drop-shadow(0 0 10px rgba(64, 255, 130, 0.95));
  stroke-dasharray: 0 1;
  stroke-dashoffset: 1;
  animation: line-color 0.35s linear 1.8s forwards;
}

.dot {
  fill: #8cffad;
  filter: drop-shadow(0 0 8px #49ff83);
}

.green-burst {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.burst {
  position: absolute;
  left: 50%;
  top: 39%;
  width: 9px;
  height: 9px;
  background: #7fffab;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0.2);
  opacity: 0;
  box-shadow:
    0 -72px 0 rgba(127, 255, 171, 0.96),
    50px -50px 0 rgba(104, 255, 166, 0.9),
    72px 0 0 rgba(88, 255, 155, 0.95),
    50px 50px 0 rgba(104, 255, 166, 0.9),
    0 72px 0 rgba(127, 255, 171, 0.96),
    -50px 50px 0 rgba(104, 255, 166, 0.9),
    -72px 0 0 rgba(88, 255, 155, 0.95),
    -50px -50px 0 rgba(104, 255, 166, 0.9);
  filter: drop-shadow(0 0 10px rgba(63, 255, 140, 0.85));
}

.burst-a {
  animation: burst 1.1s ease-out 1.85s forwards;
}

.burst-b {
  animation: burst 1.1s ease-out 2.05s forwards;
}

.burst-c {
  animation: burst 1.1s ease-out 2.25s forwards;
}

.copy {
  position: absolute;
  left: 50%;
  bottom: 2%;
  width: 100%;
  transform: translateX(-50%);
  text-align: center;
  opacity: 0;
  animation: text-in 0.7s ease 2.65s forwards;
}

.copy h1 {
  margin: 0;
  color: #ffffff;
  font-size: clamp(30px, 6.2vw, 44px);
  font-weight: 700;
}

.copy p {
  margin: 8px 0 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(16px, 3.6vw, 24px);
  font-weight: 500;
}

@keyframes line-color {
  from {
    stroke: #5dff96;
    filter: drop-shadow(0 0 10px rgba(64, 255, 130, 0.95));
  }
  to {
    stroke: #ff3b4f;
    filter: drop-shadow(0 0 10px rgba(255, 74, 96, 0.95));
  }
}

@keyframes burst {
  0% {
    opacity: 0.95;
    transform: translate(-50%, -50%) scale(0.15);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(3.2);
  }
}

@keyframes text-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@media (max-width: 768px) {
  .magic-page {
    min-height: calc(100vh - 120px);
  }

  .scene {
    width: min(96vw, 460px);
  }
}
</style>
