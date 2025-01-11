<script setup>
import BurgerIcon from './assets/BurgerIcon.vue';
import CloseIcon from '../common/assets/CloseIcon.vue';

const props = defineProps({
	showBurger: {
		default: true
	}
});

const emit = defineEmits({
	onClick: null
});

function onClick() {
	emit('onClick');
}
</script>

<template>
	<button class="px-2 py-1 w-10 text-atomy-blue-primary absolute top-2.5 right-2.5" @click="onClick">
		<Transition name="bounce">
			<burger-icon v-if="showBurger" fill="currentColor" width="30px" height="30px" />
			<close-icon v-else fill="currentColor" width="30px" height="30px" />
		</Transition>
	</button>
</template>

<style lang="scss" scoped>
.bounce-enter-from {
	opacity: 0;
	animation: bounce-in 0.5s;
}
.bounce-leave-from {
	opacity: 0;
	animation: bounce-in 0.5s;
}
.bounce-enter-active {
	animation: bounce-in 0.5s;
}
.bounce-leave-to {
	opacity: 0;
	animation: bounce-in 0.5s;
}

.bounce-leave-active {
	animation: bounce-in 0.5s;
}
@keyframes bounce-in {
	0% {
		transform: translateY(-30px) scale(0);
		transform-origin: top right;
	}
	50% {
		transform: translateY(-30px) scale(1.25);
		transform-origin: top right;
	}
	100% {
		transform: translateY(-30px) scale(1);
		transform-origin: top right;
	}
}
</style>
