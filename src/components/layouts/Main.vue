<script setup>
import { ref, watch, onMounted, onBeforeUnmount, provide } from 'vue';
import CNav from '@components/common/CNav.vue';
import MainContent from '@components/common/MainContent.vue';
import MainGutter from '@components/gutters/MainGutter.vue';
import { pages } from '@static_data/pages';
import CModal from '@components/common/CModal.vue';
import { store } from '../../store';

onMounted(() => {
	if (!window) return;

	checkScreenSize();
	window.addEventListener('resize', checkScreenSize);

	setTitle();
	window.addEventListener('hashchange', setTitle);

	activePageIdx.value = findActivePageIdx();
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', checkScreenSize);
	window.removeEventListener('hashchange', setTitle);
});

const isMobile = ref(false);
function checkScreenSize() {
	isMobile.value = window.innerWidth < 750;
}

const title = ref(pages[0].title);
function setTitle() {
	if (!document || !window) return;

	hash.value = window.location?.hash || pages[0].hash;

	const _activePageIdx = pages.findIndex((page) => page.hash === hash.value),
		pageTitle = pages[_activePageIdx]?.title || pages[0].title;

	title.value = pageTitle;
	document.title = title.value;
}

const hash = ref(0);
function getHash() {
	hash.value = window.location?.hash || pages[0].hash;
}

const activePageIdx = ref(0);
function setActivePageIdx(/**@type {Number} */ pageIdx) {
	activePageIdx.value = pageIdx;
}
function findActivePageIdx() {
	const idx = pages.findIndex((page) => page.hash === hash.value);

	return Math.max(0, idx);
}

/**@desc {Это нужно для синхрона индексов активной страницы при нативном скролле, чтобы корректно срабатывал вотчер в MainContent} */
function onScroll(/**@type {Number} */ pdx) {
	if (pdx !== activePageIdx.value) activePageIdx.value = pdx;
}

provide('isMobile', isMobile);
provide('activePageIdx', activePageIdx);
provide('hash', hash);
</script>

<template>
	<main>
		<main-gutter y>
			<div class="w-11/12 flex m-auto" data-role="page-content">
				<main-content @onScroll="(pdx) => onScroll(pdx)" />
				<c-nav @onHashChange="(pdx) => setActivePageIdx(pdx)" />
			</div>
		</main-gutter>

		<!--Модальные окна-->
		<c-modal :show="store.showMemberInfo" @onClose="() => store.setShowMemberInfo(false)">
			<div class="pt-6">
				<p class="fs-md color-gray-500">{{ store.activeMember.about }}</p>
			</div>
		</c-modal>

		<c-modal :show="store.showSendMsgResultModal" @onClose="() => store.setShowSendMsgResultModal(false)">
			<div class="pt-6 w-100 flex items-center justify-center">
				<p class="fs-md color-gray-500 text-center">{{ store.sendMsgText }}</p>
			</div>
		</c-modal>
	</main>
</template>
