<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
	fullWidth: {
		default: true
	}
});

const isMobile = inject('isMobile');
const containerCssClass = computed(() => {
	let widthClass;

	if (props.fullWidth) widthClass = 'w-full';
	else widthClass = isMobile.value ? 'w-full' : 'w-3/4';

	const heightClass = isMobile.value ? 'full-height-compact' : 'full-height';

	return `${widthClass} ${heightClass}`;
});
</script>

<template>
	<div :class="containerCssClass" data-role="adaptive-wrapper">
		<slot />
	</div>
</template>

<style scoped>
/**см. src/components/gutters/MainGutter.vue
  py-6 - 48px
  py-4 - 32px
*/
.full-height {
	height: calc(100vh - 48px);
}

.full-height-compact {
	height: calc(100vh - 32px);
}
</style>
