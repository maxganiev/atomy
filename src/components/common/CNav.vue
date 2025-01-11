<script setup>
import { ref, inject, computed } from 'vue';
import BurgerButton from '../common/BurgerButton.vue';
import { pages } from '@static_data/pages';
import AdaptiveContainer from '@components/common/containers/AdaptiveContainer.vue';

const isMobile = inject('isMobile');
const hash = inject('hash');

const emits = defineEmits({
	onHashChange: null
});

const navIsCollapsed = ref(true);

function activeItem(/**@type {import('src/types').page} */ page, /**@type {Number} */ pageIdx) {
	const isCurrentPage = page.hash === hash.value;
	return isCurrentPage;
}

function onHashChange(pageIdx) {
	emits('onHashChange', pageIdx);

	if (!isMobile.value) return;
	navIsCollapsed.value = true;
}

const positionClassName = computed(() => (!navIsCollapsed.value ? 'fixed' : 'static'));
</script>

<template>
	<nav v-if="isMobile">
		<div class="left-0 w-full" :class="positionClassName">
			<adaptive-container>
				<burger-button @click="navIsCollapsed = !navIsCollapsed" :show-burger="navIsCollapsed" />

				<ul
					v-if="!navIsCollapsed"
					class="list-none fs-md mt-12 flex flex-col items-center justify-evenly bg-gray-200 nav-menu"
				>
					<li
						v-for="(page, pdx) in pages"
						:key="pdx"
						:class="{ 'active-breadcrumb': activeItem(page, pdx) }"
						@click="onHashChange(pdx)"
					>
						<a :href="page.hash">{{ page.title }}</a>
					</li>
				</ul>
			</adaptive-container>
		</div>
	</nav>

	<nav v-else class="w-1/4 max-w-80 pl-8">
		<adaptive-container>
			<ul class="list-none fs-md flex flex-col justify-evenly h-2/3 break-words overflow-x-hidden">
				<li
					v-for="(page, pdx) in pages"
					:key="pdx"
					:class="{ 'active-breadcrumb': activeItem(page, pdx) }"
					@click="onHashChange(pdx)"
				>
					<a :href="page.hash">{{ page.title }}</a>
				</li>
			</ul>
		</adaptive-container>
	</nav>
</template>

<style scoped>
.nav-menu {
	/**100% - mt  (mt-12 = 3rem)*/
	height: calc(100% - 3rem);
}
</style>
