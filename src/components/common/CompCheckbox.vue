<script setup>
import { ref, computed, watchEffect } from 'vue';

const props = defineProps({
	checkIn: {
		default: false
	}
});

const emits = defineEmits({ onChange: null });
const checked = ref(false);

watchEffect(() => (checked.value = props.checkIn));

const bgCssClassName = computed(() => {
	if (!checked.value) return 'opacity-80 bg-gray-400';
	else return 'opacity-100 bg-green-400';
});

const DOMCheckbox = ref(null);

function onChange(e) {
	checked.value = !checked.value;
	DOMCheckbox.value.checked = checked.value;
	emits('onChange', checked.value);
}
</script>

<template>
	<div
		class="relative w-8 aspect-square cursor-pointer rounded-lg focus:outline focus:outline-1 focus:outline-offset-1 focus:outline-sky-400 overflow-hidden select-none"
		@click="onChange"
		role="checkbox"
		tabindex="0"
	>
		<input type="checkbox" class="w-full h-full absolute top-0 left-0 invisible z-10" ref="DOMCheckbox" />
		<div class="w-full h-full absolute top-0 left-0 -z-10" :class="bgCssClassName"></div>
	</div>
</template>
