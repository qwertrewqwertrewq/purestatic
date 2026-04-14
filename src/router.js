import { createRouter, createWebHistory } from 'vue-router'
import StressChatPage from './pages/StressChatPage.vue'
import StressLinePage from './pages/StressLinePage.vue'
import HeartRateLinePage from './pages/HeartRateLinePage.vue'
import LingxiBubblePage from './pages/LingxiBubblePage.vue'
import MusicPlayerPage from './pages/MusicPlayerPage.vue'
import CirclePage from './pages/CirclePage.vue'
import DailyInsightPage from './pages/DailyInsightPage.vue'
import FlowCardPage from './pages/FlowCardPage.vue'
import FamilyCarePage from './pages/FamilyCarePage.vue'
import MagicRingPage from './pages/MagicRingPage.vue'
import EmptyPage from './pages/EmptyPage.vue'

const routes = [
  {
    path: '/',
    component: StressChatPage,
  },
  {
    path: '/pressure-line',
    component: StressLinePage,
  },
  {
    path: '/heart-rate-line',
    component: HeartRateLinePage,
  },
  {
    path: '/lingxi-bubble',
    component: LingxiBubblePage,
  },
  {
    path: '/music-player',
    component: MusicPlayerPage,
  },
  {
    path: '/circle',
    component: CirclePage,
  },
  {
    path: '/daily-insight',
    component: DailyInsightPage,
  },
  {
    path: '/flow-cards',
    component: FlowCardPage,
  },
  {
    path: '/family-care',
    component: FamilyCarePage,
  },
  {
    path: '/magic-ring',
    component: MagicRingPage,
  },
  {
    path: '/empty-page',
    component: EmptyPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
