/**
 *  Import action creator constants & dependencies
 */
import { greetingsConstants } from '../constants';
import { API_URLS } from '../../configs/url';

export const beginSetIvrGreetings = (data) => ({
	type: greetingsConstants.APPLY_GREETING,
	payload: {
		request: {
			url: API_URLS.BASE_URL_V2 + API_URLS.UPDATE_IVR,
			method: 'post',
			data
		},
	},
});

export const setIvrGreetings = (data) => {
	return async dispatch => {
		try {
			const response = await dispatch(beginSetIvrGreetings(data));
			if (response.payload) {
				const { data } = response.payload;
				return data;
			}
			throw response;
		} catch (error) {
			if (error && error.error && error.error.response)
				throw error.error.response
			else
				throw error;
		}
	};
}

export const getIvrGreetings = () => ({
	type: greetingsConstants.GET_IVR_GREETINGS,
	payload: {
		request: {
			url: API_URLS.BASE_URL_V2 + API_URLS.ACTIVE_IVR,
			method: 'get',
		},
	},
});

export const getAllIvrGreetings = () => ({
	type: greetingsConstants.GET_ALL_GREETINGS,
	payload: {
		request: {
			url: API_URLS.BASE_URL_V2 + API_URLS.AVAILABLE_IVR,
			method: 'get',
		},
	},
});

export const showIvrModal = (selectedIvr) => ({
	type: greetingsConstants.SHOW_MODAL,
	selectedIvr
});

export const hideIvrModal = () => ({
	type: greetingsConstants.HIDE_MODAL,
});


