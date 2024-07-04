import { ringToneConstants } from '../constants';
import { success, failure } from '../../utilities'
const initialState = {
	isModalVisible: false,
	ringTones: []
};

const ringToneReducer = (state = initialState, action) => {

	switch (action.type) {
		case ringToneConstants.GET_RINGTONES:
			return { ...state, ringTones: action.data || [] }
		case ringToneConstants.SHOW_MODAL:
			return { ...state, isModalVisible: true }
		case ringToneConstants.HIDE_MODAL:
			return { ...state, isModalVisible: false }

		case ringToneConstants.GET_SELECTED_RINGTONES:
			return { ...state, isRequesting: true }
		case success(ringToneConstants.GET_SELECTED_RINGTONES):
			return { ...state, isRequesting: false, selectedRingtones: action.payload.data.data || [] }
		default:
			return state;
	}
}
export default ringToneReducer;