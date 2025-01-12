<script setup>
import { ref, watch, onMounted, computed } from 'vue';

const phoneParts = ref([
	{
		value: '',
		maxLength: '2',
		disabled: true,
		mask: '+7'
	},

	{
		value: '',
		maxLength: '3',
		disabled: false,
		mask: '999'
	},

	{
		value: '',
		maxLength: '3',
		disabled: false,
		mask: '999'
	},

	{
		value: '',
		maxLength: '2',
		disabled: false,
		mask: '99'
	},

	{
		value: '',
		maxLength: '2',
		disabled: false,
		mask: '99'
	}
]);

const DOMPhoneMask = ref(null);

const emits = defineEmits({
	onInput: null
});

defineExpose({ onReset });

onMounted(() => onInput());

watch(phoneParts.value, () => {
	onInput();
});

const phoneValue = computed(() => '+7' + phoneParts.value.map((n) => n.value).join(''));

function onInput() {
	if (!DOMPhoneMask.value) return;

	let partIdxToFocus = phoneParts.value.findIndex((n) => !n.disabled && n.value.length < n.maxLength);
	if (partIdxToFocus < 0) partIdxToFocus = phoneParts.value.length - 1;

	const currentInputValue = phoneParts.value[partIdxToFocus],
		prevInputValue = phoneParts.value[partIdxToFocus - 1];

	const inputIsValid = validateInput(currentInputValue) && validateInput(prevInputValue);

	if (inputIsValid) moveAutoFocus(partIdxToFocus);

	emits('onInput', phoneValue);
}

function validateInput(item) {
	const inputIsValid = /^[0-9]*$/.test(item.value);
	if (!inputIsValid) item.value = '';

	return inputIsValid;
}

function moveAutoFocus(/**@type {Number*/ partIdxToFocus) {
	DOMPhoneMask.value.children[partIdxToFocus].focus();
}

function onReset() {
	phoneParts.value.forEach((obj) => (obj.value = ''));
}
</script>

<template>
	<div
		class="grid grid-cols-[minmax(3rem,_5%)_20%_20%_minmax(3rem,_8%)_minmax(3rem,_8%)] gap-1 w-full min-h-14 max-h-20"
		ref="DOMPhoneMask"
	>
		<input
			type="text"
			v-for="(part, idx) in phoneParts"
			:key="idx"
			:disabled="part.disabled"
			:placeholder="part.mask"
			:maxlength="part.maxLength"
			v-model="part.value"
			class="form-item"
		/>
	</div>
</template>
