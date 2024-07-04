/**
 *  Import action creator constants & dependencies
 */
import { reservationsConstants } from '../constants';
import { API_URLS } from '../../configs/url';

export const getReservations = ({status, search, page, start_date, end_date}) => ({
	type: reservationsConstants.GET_RESERVATIONS,
	payload: {
		request: {
			url: API_URLS.BASE_URL_V2 + 'reservations',
			method: 'get',
			params: {
				status,
				sort: '-id',
				search: search.length ? search : null,
				page,
				per: 20,
				start_date,
				end_date,
			}
		},
	},
	reservationType: status,
	page
});

export const beginPrintReservation = (id, data) => ({
	type: reservationsConstants.PRINT_RESERVATION,
	payload: {
		request: {
			url: `${API_URLS.BASE_URL_V2}${API_URLS.RESERVATIONS}/print/${id}`,
			method: 'post',
			data
		},
	},
});

/**
 *  Create new Smart Plan
 */
export function printReservation(id, data) {
	return async dispatch => {
		try {
			const response = await dispatch(beginPrintReservation(id, data));
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

export const clearReservations = (type) => ({
	type: reservationsConstants.CLEAR_RESERVATIONS,
	reservationType: type
});

export const getSingleReservation = (id) => ({
	type: reservationsConstants.GET_SINGLE_RESERVATION,
	payload: {
		request: {
			url: `${API_URLS.RESERVATIONS}/${id}`,
			method: 'get',
		},
	},
});


export const markReservationViewed = (id) => ({
	type: reservationsConstants.MARK_RESERVATION_VIEWED,
	payload: {
		request: {
			url: `${API_URLS.RESERVATIONS}/view/${id}`,
			method: 'get',
		},
	},
});

export const acceptReservation = (id) => ({
	type: reservationsConstants.ACCEPT_RESERVATION,
	payload: {
		request: {
			url: `${API_URLS.RESERVATIONS}/accept/${id}`,
			method: 'get'
		}
	}
})

export const rejectReservation = (id) => ({
	type: reservationsConstants.REJECT_RESERVATION,
	payload: {
		request: {
			url: `${API_URLS.RESERVATIONS}/reject/${id}`,
			method: 'get'
		}
	}
})

export const completeReservation = (id) => ({
	type: reservationsConstants.COMPLETE_RESERVATION,
	payload: {
		request: {
			url: `${API_URLS.RESERVATIONS}/complete/${id}`,
			method: 'get'
		}
	}
})