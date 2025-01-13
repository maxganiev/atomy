<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
	x: {
		type: Boolean
	},
	y: {
		type: Boolean
	},
	xy: {
		type: Boolean,
		default: true
	}
});

const isMobile = inject('isMobile');

const gutterCssClass = computed(() => {
	const { x, y } = props;

	if (x) return isMobile.value ? 'px-1' : 'px-6';
	if (y) return isMobile.value ? 'py-1' : 'py-6';
	return isMobile.value ? 'p-1' : 'p-6';
});
</script>

<template>
	<div :class="gutterCssClass" data-role="main-gutter">
		<slot></slot>
	</div>
</template>
