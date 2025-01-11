<script setup>
import CloseIcon from '@components/common/assets/CloseIcon.vue';
import { ref, watchEffect } from 'vue';

const props = defineProps({
	show: {
		default: false
	}
});

const emits = defineEmits({
	onClose: null
});

function onClose() {
	emits('onClose');
}

const showState = ref(false);

const modalBodyTransisionCssClass = ref('transition-out');
function toggleShowState() {
	const mS = 450;

	if (props.show) {
		showState.value = true;
		setTimeout(() => {
			modalBodyTransisionCssClass.value = 'transition-in';
		}, mS);
	} else {
		modalBodyTransisionCssClass.value = 'transition-out';
		setTimeout(() => {
			showState.value = false;
		}, mS);
	}
}

watchEffect(() => toggleShowState());
</script>

<template>
	<div
		v-if="showState"
		class="w-full h-full fixed top-0 left-0 z-10 bg-[rgba(0,0,0,0.65)] flex items-center justify-center"
		@click.self="onClose"
	>
		<div
			class="w-11/12 h-[90%] overflow-y-scroll overscroll-contain flex flex-col px-6 py-4 bg-gray-200 rounded-xl modal-body relative"
			:class="modalBodyTransisionCssClass"
		>
			<button class="self-end text-gray-700 min-h-4 aspect-square sticky top-0 right-0" @click="onClose">
				<close-icon fill-color="currentColor" />
			</button>

			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.modal-body {
	&.transition-out {
		transition: transform 0.25s ease-out;
		transform: translateY(-100vh);
	}

	&.transition-in {
		transition: transform 0.25s ease-in;
		transform: translateY(0);
	}
}
</style>
