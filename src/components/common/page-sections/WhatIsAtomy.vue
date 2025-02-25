<script setup>
import { onMounted, ref, computed } from 'vue';
import StickyContainer from '@containers/StickyContainer.vue';
import AdaptiveContainer from '@containers/AdaptiveContainer.vue';
import PageSectionWrapper from '@page-sections/PageSectionWrapper.vue';

const showLogo = ref(false),
	showDescription = ref(false),
	showJarImage = ref(false);

onMounted(async () => {
	await Promise.all([setShowLogo(), setShowJarImage()]);
	setShowDescription();
});

const timeoutMs = 500;

function setShowLogo() {
	return new Promise((resolve) =>
		setTimeout(() => {
			showLogo.value = true;
			resolve(showLogo.value);
		}, timeoutMs)
	);
}

function setShowJarImage() {
	return new Promise((resolve) =>
		setTimeout(() => {
			showJarImage.value = true;
			resolve(showJarImage.value);
		}, timeoutMs)
	);
}

function setShowDescription() {
	setTimeout(() => {
		showDescription.value = true;
	}, timeoutMs);
}

const logoCssClass = computed(() => 'atomy-transition-view ' + (!showLogo.value ? 'out-of-view-y' : 'in-view-y'));
const jarMaskCssClass = computed(() => 'atomy-transition-view ' + (!showJarImage.value ? 'unscaled' : 'scaled'));
const descriptionCssClass = computed(
	() => 'atomy-transition-view ' + (!showDescription.value ? 'out-of-view-x' : 'in-view-x')
);
</script>

<template>
	<page-section-wrapper>
		<div class="w-full h-full flex flex-col items-center justify-evenly relative overflow-hidden">
			<div
				class="absolute w-full h-full pointer-events-none opacity-45 origin-center jar-mask"
				:class="jarMaskCssClass"
			></div>

			<div
				class="w-full pointer-events-none flex justify-center items-center atomy-logo"
				:class="logoCssClass"
			>
				<img
					src="/assets/images/atomy_logo_blue.svg"
					alt="atomy main logo"
					class="w-1/2 h-full max-w-lg"
				/>
			</div>

			<div class="relative atomy-description" :class="descriptionCssClass">
				<p class="text-gray-900 fs-sm-md">
					<strong>ATOMY</strong> - это Южнокорейский бренд, занимающийся выпуском уходовой
					косметики, бытовой химии для дома и биоактивных добавок (БАД) высочайшего качества. Свою
					историю ведет с 2009 года, в России первое представительство появилось в 2018 году.
					Компания выбрала для себя способ реализации товаров посредством
					<a
						href="http://www.sberbank.ru/ru/s_m_business/pro_business/chto-takoe-mlm-biznes-otvechaem-prostymi-slovami/"
						target="_blank"
						class="font-bold"
						>MLM</a
					>, что Позволяет покупателю не только преобретать первоклассную продукцию, но и
					зарабатывать на этом (причем выйти на стабильный, постоянно растущий доход более чем
					реально за короткое время). Ниже пошагово расскажем, как это работает и что нужно делать.
					Листай! 🤗
				</p>

				<a href="https://www.atomy.ru/ru/Home" target="_blank" class="btn btn-info link mt-8"
					>Узнать больше</a
				>
			</div>
		</div>
	</page-section-wrapper>
</template>

<style scoped>
.atomy-transition-view {
	transition: transform 0.45s ease-out;
	transform-origin: 0 0;
}

.out-of-view-y {
	transform: translateY(-100vh);
}

.in-view-y {
	transform: translateY(0);
}

.out-of-view-x {
	transform: translateX(-100vw);
}

.in-view-x {
	transform: translateX(0);
}

.unscaled {
	transform: rotate(25deg) scale(0);
}

.scaled {
	transform: rotate(25deg) scale(1);
}

.atomy-description {
	width: 75%;
}

.jar-mask {
	background: url('/assets/images/jar.png') center center/contain no-repeat;
}

@media (max-width: 750px) and (min-width: 150px) {
	.atomy-description {
		width: 100%;
	}

	.atomy-logo {
		height: 25%;
	}
}
</style>
