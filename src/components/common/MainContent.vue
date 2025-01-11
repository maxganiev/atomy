<script setup>
import AdaptiveContainer from '@components/common/containers/AdaptiveContainer.vue';
import WhatIsAtomy from '@page-sections/WhatIsAtomy.vue';
import HowItWorks from '@page-sections/HowItWorks.vue';
import AboutUs from '@page-sections/AboutUs.vue';
import JoinUs from '@page-sections/JoinUs.vue';
import { pages } from '@static_data/pages';
import { ref, computed, inject, watch, onMounted } from 'vue';
import { Debounce } from 'src/utils';

const activePageIdx = inject('activePageIdx');
const isMobile = inject('isMobile');

const mainContentEl = ref(null);
const mainContentElHovered = ref(false);
const debounce = new Debounce(250);
const emits = defineEmits({
	onScroll: null
});

onMounted(() => scrollContentBySectionIdx());

watch(activePageIdx, () => scrollContentBySectionIdx());

function scrollContentBySectionIdx() {
	if (!mainContentEl.value) return;

	const mainContentElHeight = mainContentEl.value.getBoundingClientRect().height,
		scrollToValue = activePageIdx.value * mainContentElHeight;

	mainContentEl.value.scrollTo(0, scrollToValue);
}

const contentScrolledPercentage = ref(0);
function getContentScrolledPercentage() {
	if (!mainContentEl.value) return;

	debounce.start(() => onScroll());
}

function onScroll() {
	const contentScrollHeight = mainContentEl.value.scrollHeight,
		contentScrollTop = mainContentEl.value.scrollTop;

	contentScrolledPercentage.value = parseInt((contentScrollTop / contentScrollHeight) * 100);

	/**@type {Number} */
	let pageIdx;

	/**4 секции, 100%/4 - высота одной секции - 25%, минус 5% запаса
	 * 25 -> 20, 50 -> 45, 75 -> 70
	 */

	if (contentScrolledPercentage.value < 20) pageIdx = 0;
	else if (contentScrolledPercentage.value >= 20 && contentScrolledPercentage.value < 45) pageIdx = 1;
	else if (contentScrolledPercentage.value >= 45 && contentScrolledPercentage.value < 70) pageIdx = 2;
	else pageIdx = 3;

	window.location.hash = pages[pageIdx].hash;
	emits('onScroll', pageIdx);
}
</script>

<template>
	<adaptive-container :full-width="false">
		<div
			class="relative h-full overflow-y-auto scroll-smooth main-content"
			data-role="main-content"
			ref="mainContentEl"
			@scroll="getContentScrolledPercentage"
		>
			<what-is-atomy :id="pages[0].hash" />
			<how-it-works :id="pages[1].hash" />
			<about-us :id="pages[2].hash" />
			<join-us :id="pages[3].hash" />
		</div>
	</adaptive-container>
</template>

<style lang="scss" scoped>
.main-content div {
	&:nth-child(odd) {
		background-color: theme('colors.gray.50');
		border-radius: 20px;
	}

	&:nth-child(even) {
		background-color: theme('colors.gray.100');
		border-radius: 20px;
	}
}
</style>
