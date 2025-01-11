<script setup>
import PageSectionWrapper from '@page-sections/PageSectionWrapper.vue';
import PhoneInput from '@components/common/PhoneInput.vue';
import CompCheckbox from '@components/common/CompCheckbox.vue';
import { reactive, computed, ref } from 'vue';
import { store } from '@/store';

const newMember = reactive({
	name: '',
	city: '',
	phone: ''
});

const isValidPhoneLength = 16;

const agreedToTerms = ref(false);
const submitDisabled = computed(
	() =>
		Object.values(newMember).some((val) => !val || !val.length) ||
		!agreedToTerms.value ||
		newMember.phone.length < isValidPhoneLength
);

const showSuccessModal = ref(false);

async function onSubmit(e) {
	e.preventDefault();

	if (submitDisabled.value) return;

	const botId = 'bot6174426843:AAEUXfNe_EwNqhGeT4z-vcQhNcXZjSs4MQ0';
	const chatId = 882272567;

	try {
		const date = new Date();
		let month = date.getMonth() + 1;
		month = month < 10 ? '0' + month : month;

		const postData = `
		<pre>
			Заявка от ${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}.
			
			ФИО: ${newMember.name};
			Откуда: ${newMember.city};
			Контактный номер: ${newMember.phone}
		</pre>
`;

		const req = await fetch(`https://api.telegram.org/${botId}/sendMessage`, {
			method: 'POST',
			async: true,
			crossDomain: true,
			headers: {
				'Content-Type': 'application/json',
				'cache-control': 'no-cache'
			},
			body: JSON.stringify({
				chat_id: chatId,
				text: postData,
				parse_mode: 'html'
			})
		});

		const res = await req.json();

		store.setShowSendMsgResultModal(true);
		if (res.ok) {
			store.setSendMsgText('Сообщение отправлено, до встречи!');
			resetMemberFields();
		} else throw new Error('Что-то пошло не по плану (');
	} catch (error) {
		store.setSendMsgText(error);
	}
}

function resetMemberFields() {
	Object.keys(newMember).forEach((key) => (newMember[key] = ''));
}
</script>

<template>
	<page-section-wrapper>
		<div class="w-full h-full overflow-y-auto">
			<div class="px-4 md:px-6 flex flex-col items-center h-full gap-y-6">
				<h4 class="text-center fs-md text-gray pt-8 pb-1 font-bold w-full block">Присоединяйся!</h4>
				<p class="fs-sm-md text-gray-600 text-center"
					>Заполни форму ниже, и мы свяжемся с тобой в ближайшее время!</p
				>

				<div class="md:max-w-3xl flex flex-col w-full">
					<form
						class="flex flex-col bg-gray-200 fs-sm-md text-gray-700 rounded-xl p-4 w-full"
						@submit="onSubmit"
					>
						<label class="mt-4 mb-2" for="">Как тебя зовут?</label>
						<input type="text" class="form-item w-full" v-model="newMember.name" />

						<label class="mt-4 mb-2" for="">Откуда ты?</label>
						<input type="text" class="form-item w-full" v-model="newMember.city" />

						<label class="mt-4 mb-2" for="">Твой контактный номер телефона для связи</label>
						<phone-input @onInput="(phone) => (newMember.phone = phone)" />

						<input
							type="submit"
							class="btn btn-success"
							:disabled="submitDisabled"
							value="Отправить"
						/>
					</form>

					<div class="flex text-gray-700 items-center xs-height:pb-8 pt-8 fs-sm-md">
						<comp-checkbox
							:checkIn="agreedToTerms"
							@onChange="(val) => (agreedToTerms = val)"
							class="mr-4"
						/>
						<span
							@click="agreedToTerms = !agreedToTerms"
							class="cursor-pointer select-none"
							tabindex="0"
							>Согласен с&nbsp;<a class="font-bold" href="#" target="_blank"
								>политикой обработки персональных данных</a
							></span
						></div
					>
				</div>
			</div>
		</div>
	</page-section-wrapper>
</template>
