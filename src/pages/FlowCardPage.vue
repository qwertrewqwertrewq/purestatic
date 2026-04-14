<script setup>
import {
	BadgeDollarSign,
	Bell,
	Compass,
	Image,
	Mountain,
	Music2,
	Presentation,
	Search,
	ShieldCheck,
	Smartphone,
} from 'lucide-vue-next'

const rowOne = [
	{ icon: Mountain, title: '美景Claw', iconBg: '#d7f8f5', iconColor: '#00b8b2' },
	{ icon: Search, title: '查流量', iconBg: '#fff3d5', iconColor: '#ef9f00' },
	{ icon: Smartphone, title: '查话费', iconBg: '#d9e8ff', iconColor: '#3f72ea' },
	{ icon: ShieldCheck, title: '安全守护', iconBg: '#d9f0ff', iconColor: '#17a3ea' },
]

const rowTwo = [
	{ icon: Music2, title: '办理视频彩铃', iconBg: '#ece2ff', iconColor: '#8f5de5' },
	{ icon: Image, title: '一键解锁创意图像', iconBg: '#e2e9ff', iconColor: '#5c82f0' },
	{ icon: BadgeDollarSign, title: '趣味探索领晓伴值', iconBg: '#ffe2e4', iconColor: '#f15a64' },
	{ icon: Compass, title: '探索服务地图', iconBg: '#dff7ff', iconColor: '#1f9cd8' },
]

const rowThree = [
	{ icon: BadgeDollarSign, title: '趣味探索领晓伴值', iconBg: '#ffe2e4', iconColor: '#f15a64' },
	{ icon: Presentation, title: 'PPT 一键速造', iconBg: '#ffe3dc', iconColor: '#e14a24' },
	{ icon: Bell, title: '消息提醒服务', iconBg: '#fff1d6', iconColor: '#ef9b00' },
	{ icon: Search, title: '智能搜索助手', iconBg: '#d8f4e5', iconColor: '#19a96b' },
]
</script>

<template>
	<main class="flow-page">
		<section class="flow-wrap">
			<div class="flow-row">
				<div class="flow-track speed-a">
					<div class="chip-group" v-for="copy in 2" :key="`a-${copy}`">
						<article class="chip" v-for="item in rowOne" :key="`${copy}-${item.title}`">
							<span class="chip-icon" :style="{ background: item.iconBg, color: item.iconColor }">
								<component :is="item.icon" :size="18" :stroke-width="2.4" />
							</span>
							<span class="chip-text">{{ item.title }}</span>
						</article>
					</div>
				</div>
			</div>

			<div class="flow-row">
				<div class="flow-track speed-b reverse">
					<div class="chip-group" v-for="copy in 2" :key="`b-${copy}`">
						<article class="chip" v-for="item in rowTwo" :key="`${copy}-${item.title}`">
							<span class="chip-icon" :style="{ background: item.iconBg, color: item.iconColor }">
								<component :is="item.icon" :size="18" :stroke-width="2.4" />
							</span>
							<span class="chip-text">{{ item.title }}</span>
						</article>
					</div>
				</div>
			</div>

			<div class="flow-row">
				<div class="flow-track speed-c">
					<div class="chip-group" v-for="copy in 2" :key="`c-${copy}`">
						<article class="chip" v-for="item in rowThree" :key="`${copy}-${item.title}`">
							<span class="chip-icon" :style="{ background: item.iconBg, color: item.iconColor }">
								<component :is="item.icon" :size="18" :stroke-width="2.4" />
							</span>
							<span class="chip-text">{{ item.title }}</span>
						</article>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<style scoped>
.flow-page {
	max-width: 980px;
	margin: 0 auto;
}

.flow-wrap {
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 4px 0;
}

.flow-row {
	overflow: hidden;
	border-radius: 20px;
}

.flow-track {
	display: flex;
	width: max-content;
	will-change: transform;
	animation: flow-left 20s linear infinite;
}

.flow-track.reverse {
	animation-name: flow-right;
}

.speed-a {
	animation-duration: 20s;
}

.speed-b {
	animation-duration: 17s;
}

.speed-c {
	animation-duration: 22s;
}

.chip-group {
	display: flex;
	gap: 18px;
	padding-right: 18px;
}

.chip {
	min-width: 300px;
	max-width: 520px;
	height: 78px;
	border-radius: 40px;
	display: inline-flex;
	align-items: center;
	gap: 14px;
	padding: 0 24px;
	overflow: hidden;
	background: rgba(255, 255, 255, 0.62);
	border: 1px solid rgba(255, 255, 255, 0.66);
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45);
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
}

.chip-icon {
	width: 28px;
	height: 28px;
	border-radius: 8px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex: 0 0 auto;
}

.chip-text {
	flex: 1;
	min-width: 0;
	color: #ffffff;
	font-size: 28px;
	font-weight: 700;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

@keyframes flow-left {
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(-50%);
	}
}

@keyframes flow-right {
	0% {
		transform: translateX(-50%);
	}
	100% {
		transform: translateX(0);
	}
}

@media (max-width: 768px) {
	.chip {
		min-width: 220px;
		max-width: 360px;
		height: 54px;
		border-radius: 28px;
		gap: 10px;
		padding: 0 16px;
	}

	.chip-icon {
		width: 22px;
		height: 22px;
	}

	.chip-text {
		font-size: 18px;
	}
}
</style>
