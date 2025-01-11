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
const jarMaskCssClass = computed(() => (!showJarImage.value ? 'scale-0' : 'scale-1'));
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
					<strong>ATOMY</strong> - это крутая компания по производству косметики (здесь нужен
					какой-то текст на 4-5 предложений) Lorem ipsum dolor sit amet consectetur, adipisicing
					elit. Fugiat perspiciatis et earum voluptate nemo repudiandae alias similique harum quas
					adipisci itaque, laudantium libero, assumenda fugit quos, debitis doloremque excepturi
					nihil natus quod vitae maiores fuga tempora. Asperiores possimus voluptatem impedit.
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

.scale-0 {
	transform: rotate(25deg) scale(0);
	transition: transform 0.45s ease-out;
}

.scale-1 {
	transform: rotate(25deg) scale(1);
	transition: transform 0.45s ease-out;
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
