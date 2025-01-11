<script setup>
import PageSectionWrapper from '@page-sections/PageSectionWrapper.vue';
import { ref } from 'vue';
import { tips } from '@static_data/tips';

/**@type {HTMLDivElement}*/
const sliderEl = ref(null),
	currentSlideIdx = ref(0),
	isScrolling = ref(false),
	scrollLeftwards = ref(true),
	scrollLeftVal = ref(0);

function onScroll() {
	scrollLeftwards.value = scrollLeftVal.value < sliderEl.value.scrollLeft;
	scrollLeftVal.value = sliderEl.value.scrollLeft;

	const scrolledWidth = Number((sliderEl.value.getBoundingClientRect().width * currentSlideIdx.value).toFixed(0)),
		scrollLeft = Number(sliderEl.value.scrollLeft.toFixed(0));

	isScrolling.value = scrolledWidth !== scrollLeft && scrolledWidth !== scrollLeft - 1;
}

function scrollRight() {
	sliderEl.value.scrollBy({
		left: sliderEl.value.getBoundingClientRect().width,
		top: 0,
		behavior: 'smooth'
	});
	currentSlideIdx.value++;
}

function scrollLeft() {
	sliderEl.value.scrollBy({
		left: -sliderEl.value.getBoundingClientRect().width,
		top: 0,
		behavior: 'smooth'
	});
	currentSlideIdx.value--;
}
</script>

<template>
	<page-section-wrapper>
		<div class="flex flex-col h-full relative how-works-wrapper">
			<div
				class="w-full relative slider-body pointer-events-none grid"
				:style="{ 'grid-template-columns': `repeat(${tips.length}, 100%)` }"
				ref="sliderEl"
				@scroll="onScroll"
			>
				<div
					v-for="tip in tips"
					:key="tip.id"
					class="w-full slide flex flex-col items-center gap-y-8 xs-height:gap-y-4"
				>
					<h4 class="text-center fs-md text-gray pt-8 font-bold">{{ tip.title }}</h4>

					<img
						v-if="tip.icon"
						:src="tip.icon"
						alt="icon of instruction tip"
						class="w-1/3 h-1/2 max-h-20 md:max-h-40 xs-height:hidden"
					/>

					<div class="fs-sm-md text-gray w-11/12 md:w-4/5" v-html="tip.description"></div>
				</div>
			</div>

			<div class="w-11/12 mx-auto flex items-end justify-between grow pb-8 scroll-actions">
				<button
					class="btn btn-primary"
					:class="{ invisible: currentSlideIdx === 0 }"
					:disabled="isScrolling"
					@click="scrollLeft"
				>
					Назад
				</button>

				<button
					class="btn btn-primary"
					:class="{ invisible: currentSlideIdx === tips.length - 1 }"
					:disabled="isScrolling"
					@click="scrollRight"
					>Далее
				</button>
			</div>
		</div>
	</page-section-wrapper>
</template>

<style lang="scss" scoped>
.how-works-wrapper::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0.45;
	background: url('/assets/images/jars.png') center center/cover no-repeat;
	pointer-events: none;
	z-index: -1;
}

.slider-body {
	overflow-x: scroll;
	overflow-y: hidden;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;

	.slide {
		scroll-snap-align: start;
	}
}

@media (min-width: 150px) and (max-width: 750px) {
	.scroll-actions {
		padding-bottom: 3rem;
	}
}

@media (max-height: 450px) and (min-height: 150px) {
	.scroll-actions {
		padding-bottom: 2rem;
	}
}
</style>
