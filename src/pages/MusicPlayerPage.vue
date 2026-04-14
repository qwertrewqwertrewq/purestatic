<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const tracks = [
  {
    coverUrl: 'https://picsum.photos/seed/music-cover-01/180/180',
    name: 'Companion silence',
    artist: 'uAIta',
    duration: 281,
  },
  {
    coverUrl: 'https://picsum.photos/seed/music-cover-02/180/180',
    name: 'Speedy Runner',
    artist: 'uAIta',
    duration: 246,
  },
]

const currentIndex = ref(0)
const elapsedSeconds = ref(0)
const volumeRatio = ref(0.5)
const isPlaying = ref(true)

let frameId = null
let lastTimestamp = 0
let volumeClock = 0

const currentTrack = computed(() => tracks[currentIndex.value])

const progressRatio = computed(() => {
  const ratio = elapsedSeconds.value / currentTrack.value.duration
  return Math.min(Math.max(ratio, 0), 1)
})

const progressPercent = computed(() => `${Math.round(progressRatio.value * 100)}%`)
const volumePercent = computed(() => `${Math.round(volumeRatio.value * 100)}%`)
const volumeStyle = computed(() => ({ '--volume-level': volumePercent.value }))

const formatSeconds = (value) => {
  const total = Math.max(0, Math.floor(value))
  const minutes = Math.floor(total / 60)
  const seconds = String(total % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

const currentTimeText = computed(() => formatSeconds(elapsedSeconds.value))
const durationText = computed(() => formatSeconds(currentTrack.value.duration))

const nextTrack = () => {
  currentIndex.value = (currentIndex.value + 1) % tracks.length
  elapsedSeconds.value = 0
}

const prevTrack = () => {
  currentIndex.value = (currentIndex.value - 1 + tracks.length) % tracks.length
  elapsedSeconds.value = 0
}

const togglePlayState = () => {
  isPlaying.value = !isPlaying.value
}

onMounted(() => {
  const tick = (timestamp) => {
    if (!lastTimestamp) {
      lastTimestamp = timestamp
    }

    const deltaMs = timestamp - lastTimestamp
    lastTimestamp = timestamp

    if (isPlaying.value) {
      elapsedSeconds.value += deltaMs / 1000
      if (elapsedSeconds.value >= currentTrack.value.duration) {
        nextTrack()
      }
    }

    volumeClock += deltaMs
    volumeRatio.value = 0.5 + 0.42 * Math.sin(volumeClock / 900)

    frameId = window.requestAnimationFrame(tick)
  }

  frameId = window.requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  if (frameId) {
    window.cancelAnimationFrame(frameId)
    frameId = null
  }
})
</script>

<template>
  <main class="music-page">
    <section class="player-layout">
      <article class="player-card">
        <header class="song-header">
          <img class="cover" :src="currentTrack.coverUrl" :alt="currentTrack.name" />

          <div class="song-meta">
            <h2 class="song-name">{{ currentTrack.name }}</h2>
            <p class="song-artist">{{ currentTrack.artist }}</p>
          </div>
        </header>

        <section class="progress-area" aria-label="播放进度展示">
          <div class="time-row">
            <span>{{ currentTimeText }}</span>
            <span>{{ durationText }}</span>
          </div>

          <div class="track-bar">
            <div class="track-fill" :style="{ width: progressPercent }"></div>
          </div>
        </section>

        <footer class="control-row">
          <button class="control-btn" type="button" aria-label="上一首" @click="prevTrack">◀◀</button>
          <button class="play-btn" type="button" :aria-label="isPlaying ? '暂停' : '播放'" @click="togglePlayState">
            {{ isPlaying ? '❚❚' : '▶' }}
          </button>
          <button class="control-btn" type="button" aria-label="下一首" @click="nextTrack">▶▶</button>
        </footer>
      </article>

      <aside class="volume-panel" aria-label="自动音量过渡">
        <div class="volume-head" aria-hidden="true">
          <svg class="volume-icon" viewBox="0 0 24 24" focusable="false">
            <path d="M3 10v4h4l5 4V6L7 10H3z" fill="currentColor" />
            <path d="M16 8.5a5.5 5.5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <path d="M18.8 6a9 9 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
          <span class="volume-label">VOL</span>
        </div>
        <div class="volume-bar">
          <div class="volume-fill" :style="volumeStyle"></div>
        </div>
      </aside>
    </section>
  </main>
</template>

<style scoped>
.music-page {
  max-width: 980px;
  margin: 0 auto;
  min-height: calc(100vh - 84px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.player-layout {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

.player-card {
  width: min(100%, 860px);
  border-radius: 36px;
  padding: 24px 26px 22px;
  background: linear-gradient(120deg, rgba(205, 218, 228, 0.36), rgba(186, 208, 223, 0.2));
  border: 1px solid rgba(234, 243, 251, 0.65);
  box-shadow: 0 14px 44px rgba(8, 20, 32, 0.36);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.song-header {
  display: flex;
  align-items: center;
  gap: 22px;
}

.cover {
  width: 104px;
  height: 104px;
  border-radius: 18px;
  object-fit: cover;
}

.song-meta {
  min-width: 0;
}

.song-name {
  margin: 0;
  color: #f2f6f9;
  font-size: 50px;
  line-height: 1.05;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-artist {
  margin: 6px 0 0;
  color: rgba(219, 229, 238, 0.95);
  font-size: 33px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.progress-area {
  margin-top: 24px;
}

.time-row {
  display: flex;
  justify-content: space-between;
  color: rgba(221, 229, 238, 0.95);
  font-size: 17px;
}

.track-bar {
  margin-top: 8px;
  width: 100%;
  height: 14px;
  border-radius: 999px;
  background: rgba(196, 211, 224, 0.58);
  overflow: hidden;
}

.track-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #f1f7fb 0%, #e8f0f6 100%);
}

.control-row {
  margin-top: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 34px;
}

.control-btn,
.play-btn {
  border: 0;
  color: #f6f9fb;
  background: transparent;
  cursor: pointer;
  line-height: 1;
}

.control-btn {
  font-size: 44px;
}

.play-btn {
  font-size: 72px;
}

.volume-panel {
  width: 62px;
  height: 226px;
  border-radius: 20px;
  padding: 10px 12px;
  background: rgba(209, 220, 229, 0.32);
  border: 1px solid rgba(233, 241, 248, 0.72);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.volume-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #e6eef4;
}

.volume-icon {
  width: 24px;
  height: 24px;
}

.volume-label {
  font-size: 11px;
  letter-spacing: 1px;
}

.volume-bar {
  width: 12px;
  height: 168px;
  border-radius: 999px;
  background: rgba(191, 206, 220, 0.58);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.volume-fill {
  width: 100%;
  height: var(--volume-level);
  background: linear-gradient(180deg, #f6fcff 0%, #d8ecff 100%);
  border-radius: 999px;
  transition: height 0.18s linear;
}

@media (max-width: 1024px) {
  .song-name {
    font-size: 40px;
  }

  .song-artist {
    font-size: 28px;
  }
}

@media (max-width: 768px) {
  .music-page {
    min-height: calc(100vh - 82px);
  }

  .player-layout {
    flex-direction: column;
    gap: 10px;
  }

  .player-card {
    border-radius: 28px;
    padding: 18px 16px 18px;
  }

  .song-header {
    gap: 14px;
  }

  .cover {
    width: 84px;
    height: 84px;
    border-radius: 14px;
  }

  .song-name {
    font-size: 30px;
  }

  .song-artist {
    font-size: 22px;
  }

  .control-row {
    gap: 24px;
  }

  .control-btn {
    font-size: 38px;
  }

  .play-btn {
    font-size: 62px;
  }

  .volume-panel {
    width: min(100%, 320px);
    height: 56px;
    padding: 8px 10px;
    flex-direction: row;
    justify-content: center;
    gap: 12px;
    border-radius: 14px;
  }

  .volume-head {
    flex-direction: row;
    gap: 6px;
  }

  .volume-bar {
    width: 220px;
    max-width: 100%;
    height: 12px;
    align-items: center;
  }

  .volume-fill {
    height: 100%;
    width: var(--volume-level);
    transition: width 0.18s linear;
  }
}
</style>
