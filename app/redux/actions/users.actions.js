/**
 *  Import action creator constants & dependencies
 */
import { userConstants } from '../constants';
import { API_URLS } from '../../configs/url';

export const beginLoginUser = (data) => ({
	type: userConstants.LOGIN,
	payload: {
		request: {
			url: API_URLS.LOGIN,
			method: 'post',
			data,
		},
	},
});

export const setToken = (data) => ({
	type: userConstants.SET_TOKEN,
	payload: {
		request: {
			url: API_URLS.FCM_SUBSCRIBE,
			method: 'post',
			data,
		},
	},
});


export function loginUser(data) {
	return async dispatch => {
		try {
			const response = await dispatch(beginLoginUser(data));
			if (response.payload) {
				const { data } = response.payload;
				return data;
			}
			throw response;
		} catch (error) {
			throw error.response;
		}
	};
}