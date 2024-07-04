import { greetingsConstants } from '../constants';
import { success, failure } from '../../utilities'

const initialState = {
	isRequesting: true,
	ivrGreetings: [],
	allAvailableIvrGreetings: [],

	isGreetingsLoaded: false,
	isModalVisible: false,

	selectedIvr: {},
	updateIvrDetail: {},
};

const greetingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case greetingsConstants.APPLY_GREETING:
			return { ...state, isRequesting: true };

		case success(greetingsConstants.APPLY_GREETING):
			return { ...state, isRequesting: false, updateIvrDetail: action.payload.data.data }

		case failure(greetingsConstants.APPLY_GREETING):
			return { ...state, isRequesting: false }

		case greetingsConstants.GET_IVR_GREETINGS:
			return { ...state, isRequesting: true };

		case success(greetingsConstants.GET_IVR_GREETINGS):
			var { data } = action.payload.data;

			return {
				...state,
				isRequesting: false,
				ivrGreetings: data,
				isGreetingsLoaded: true
			}

		case failure(greetingsConstants.GET_IVR_GREETINGS):
			return { ...state, isRequesting: false }

		case greetingsConstants.GET_ALL_GREETINGS:
			return { ...state, isRequesting: true };

		case success(greetingsConstants.GET_ALL_GREETINGS):
			var { data } = action.payload.data;

			return {
				...state,
				isRequesting: false,
				allAvailableIvrGreetings: data,
			}

		case failure(greetingsConstants.GET_ALL_GREETINGS):
			return { ...state, isRequesting: false }

		case greetingsConstants.SHOW_MODAL:
			let res = {
				...state,
				isModalVisible: true
			};

			if (action.selectedIvr) {
				res.selectedIvr = action.selectedIvr;
			}

			return res
		case greetingsConstants.HIDE_MODAL:
			return { ...state, isModalVisible: false }

		default:
			return state;
	}
}

export default greetingsReducer;