<script setup>
import StickyContainer from '@containers/StickyContainer.vue';
import AdaptiveContainer from '@containers/AdaptiveContainer.vue';
import { computed } from 'vue';

const props = defineProps({
	pageId: {
		type: String
	}
});
</script>

<template>
	<sticky-container :id="pageId">
		<adaptive-container>
			<slot />
		</adaptive-container>
	</sticky-container>
</template>
