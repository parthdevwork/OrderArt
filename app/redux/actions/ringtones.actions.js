/**
 *  Import action creator constants & dependencies
 */
import NotificationSounds from 'react-native-notification-sounds';
import {Platform} from 'react-native'
import { ringToneConstants } from '../constants';
import { API_URLS } from '../../configs/url';

export const dispatchGetRingTones = (data) => ({
	type: ringToneConstants.GET_RINGTONES,
	data
});

export const showModal = () => ({
	type: ringToneConstants.SHOW_MODAL,
});

export const hideModal = () => ({
	type: ringToneConstants.HIDE_MODAL,
});

/**
 *  Create new Smart Plan
 */
export function getRingTones() {
	return async dispatch => {
		try {
			const rings = (await NotificationSounds.getNotifications('notification')) || []
			let selectedTones = []

			if(Platform.OS === 'ios'){
				rings.forEach(element => {
					let tomeArray = element.url.split('/')
					if(tomeArray[tomeArray.length-2] == 'New' && tomeArray[tomeArray.length-3] == 'UISounds') {
						selectedTones.push(element)
					}
				});
			} else {
				selectedTones = rings;
			}
			dispatch(dispatchGetRingTones(selectedTones))
			return selectedTones;
		} catch (error) {
			throw error.response;
		}
	};
}
/**
 *  get selected ring tones
 */
export const getSelectedRingTones = () => ({
	type: ringToneConstants.GET_SELECTED_RINGTONES,
	payload: {
		request: {
			url: API_URLS.BASE_URL_V2 + 'ringtones/get',
			method: 'get'
		},
	},
});

export const updateRingToneToServer = (data) => ({
	type: ringToneConstants.SAVE_RINGTONE,
	payload: {
		request: {
			url: API_URLS.BASE_URL_V2 + 'ringtones/save',
			method: 'post',
			data
		},
	},
});