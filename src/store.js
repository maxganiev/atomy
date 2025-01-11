import { reactive } from 'vue';
import { Member } from '@static_data/members';

export const store = reactive({
	showMemberInfo: false,
	setShowMemberInfo(value = true) {
		this.showMemberInfo = value;
	},

	activeMember: null,
	setActiveMember(/**@type {Member}*/ activeMember) {
		this.activeMember = activeMember;
	},

	showSendMsgResultModal: false,
	setShowSendMsgResultModal(val = false) {
		this.showSendMsgResultModal = val;
	},

	sendMsgText: '',
	setSendMsgText(text = '') {
		this.sendMsgText = text;
	}
});
