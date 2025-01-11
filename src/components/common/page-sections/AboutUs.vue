<script setup>
import PageSectionWrapper from '@page-sections/PageSectionWrapper.vue';
import { members } from '@static_data/members';
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { Debounce } from 'src/utils';
import { store } from 'src/store';

//#region Функционал слайдера
const startIdx = 0,
	endIdx = 3;

const activeShowMembers = ref(members.slice(startIdx, endIdx));

function prependSlide() {
	activeShowMembers.value.pop();

	const firstActiveSlide = activeShowMembers.value[0];

	let slideToPrepend;
	if (firstActiveSlide.id === members[0].id) slideToPrepend = members[members.length - 1];
	else {
		const slideIdxBeforeFirstActive = members.findIndex((m) => m.id === firstActiveSlide.id) - 1;
		slideToPrepend = members[slideIdxBeforeFirstActive];
	}

	activeShowMembers.value.unshift(slideToPrepend);
}

function appendSlide() {
	activeShowMembers.value.shift();

	const lastActiveSlide = activeShowMembers.value[activeShowMembers.value.length - 1];

	let slideToAppend;
	if (lastActiveSlide.id === members[members.length - 1].id) slideToAppend = members[0];
	else {
		const slideIdxAfterLastActive = members.findIndex((m) => m.id === lastActiveSlide.id) + 1;
		slideToAppend = members[slideIdxAfterLastActive];
	}

	activeShowMembers.value.push(slideToAppend);
}

const activeMember = computed(() => activeShowMembers.value[1]);
//#endregion

//#region Адаптивность обертки слайдера
const debounce = new Debounce(450);
const onResize = () => debounce.start(() => setActiveSlideHeight());

const DOMSliderWrapper = ref(null);
onMounted(() => {
	onResize();
	window.addEventListener('resize', onResize);
});
onBeforeUnmount(() => window.removeEventListener('resize', onResize));

const activeSlideHeight = ref(0);
function setActiveSlideHeight() {
	activeSlideHeight.value = `${Math.floor(DOMSliderWrapper.value.children[1].getBoundingClientRect().height)}px`;
}
//#endregion

function showActiveMemberInfo() {
	store.setShowMemberInfo(true);
	store.setActiveMember(activeMember);
}
</script>

<template>
	<page-section-wrapper>
		<div class="w-full h-full relative wrapper">
			<h4 class="text-center fs-md text-gray py-8 font-bold w-full block">Наша команда мечты 😌</h4>
			<div class="relative content-height px-0 md:px-4">
				<div
					class="w-full flex relative transition-height"
					:style="{ height: activeSlideHeight }"
					data-role="slider"
				>
					<button
						class="rounded h-fit w-1/2 max-w-8 flex items-center justify-center self-center pl-3 hover:opacity-50"
						@click="prependSlide"
					>
						<img
							src="/assets/images/svg/caret-left.svg"
							alt="left carret"
							class="w-full h-full"
						/>
					</button>

					<div class="flex grow" ref="DOMSliderWrapper">
						<div
							v-for="activeMember in activeShowMembers"
							:key="activeMember.id"
							class="rounded-3xl absolute slide"
							:style="{
								background: `white url(${activeMember.avatar})center center/contain no-repeat`
							}"
						>
						</div>
					</div>

					<button
						class="rounded h-fit w-1/2 max-w-8 flex items-center justify-center self-center pr-3 hover:opacity-50"
						@click="appendSlide"
					>
						<img
							src="/assets/images/svg/caret-right.svg"
							alt="right carret"
							class="w-full h-full"
						/>
					</button>
				</div>

				<div class="text-gray fs-sm-md gap-y-4 w-full pt-6 md:pt-10 px-3 grid grid-cols-1">
					<div class="grid grid-cols-2 md:grid-cols-4 xs-height:grid-cols-4 gap-y-4 fs-sm">
						<div>
							<strong>ФИО</strong>
							<p>{{ activeMember.fullName }}</p>
						</div>

						<div>
							<strong>В команде с</strong>
							<p>{{ activeMember.inTeamSince }}</p>
						</div>

						<div>
							<strong>Роль</strong>
							<p>{{ activeMember.role }}</p>
						</div>

						<div>
							<strong> Личные достижения</strong>
							<ul
								v-if="activeMember.personalAchievements.length"
								class="list list-none text-gray-600 fs-sm list-achievements"
							>
								<li
									v-for="(achievement, idx) in activeMember.personalAchievements"
									:key="idx"
									>{{ achievement }}</li
								>
							</ul>

							<span v-else class="block text-gray-600 fs-sm"
								>У нас еще все впереди! 🤗</span
							>
						</div>
					</div>

					<div class="relative about-wrapper hidden md:block fs-sm">
						<strong>Об Участнике</strong>
						<p class="text-gray-600 fs-sm">{{ activeMember.about.slice(0, 100) + '...' }}</p>
					</div>

					<button class="btn btn-info mt-2 xs-height:mt-0" @click="showActiveMemberInfo"
						>Узнать больше</button
					>
				</div>
			</div>
		</div>
	</page-section-wrapper>
</template>

<style lang="scss" scoped>
$slide-width: calc(25% - 0.5rem);
$slide-pos-fix: 15%;

.wrapper::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0.45;
	background: url('/assets/images/bottle.png') center center/cover no-repeat;
	pointer-events: none;
	z-index: -1;
	transform: rotate(15deg);
}

.content-height {
	//h4 padding (2rem x 2) + fs-md (size) + fs-md (line height)
	height: calc(100% - (4rem + 1.45rem + 2.32rem));
}

.slide {
	aspect-ratio: 1;
	width: calc($slide-width);
	transition: all 0.4s ease-out;

	&:nth-child(1) {
		transform: scale(0.75);
		left: $slide-pos-fix;
		opacity: 0.5;
		z-index: 0;
	}

	&:nth-child(2) {
		transform: scale(1);
		left: calc($slide-width + $slide-pos-fix);
		z-index: 1;
	}

	&:nth-child(3) {
		transform: scale(0.75);
		left: calc($slide-width * 2 + $slide-pos-fix);
		opacity: 0.5;
		z-index: 0;
	}
}

.list-achievements li::before {
	content: '\2022';
	margin-right: 5px;
	color: theme('colors.atomy-blue-primary');
	font-size: 2rem;
}

@media (min-width: 150px) and (max-width: 750px) {
	.slide {
		&:nth-child(odd) {
			display: none;
		}
		&:nth-child(even) {
			width: 50%;
			left: 25%;
		}
	}
}

@media (min-height: 150px) and (max-height: 400px) {
	.slide {
		&:nth-child(even) {
			width: 15%;
			left: 42.5%;
		}
	}
}
</style>
