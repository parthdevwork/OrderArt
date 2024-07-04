/**
 *  Import action creator constants & dependencies
 */
import { ordersConstants } from '../constants';
import { API_URLS } from '../../configs/url';

export const getAutoAcceptState = () => ({
	type: ordersConstants.GET_AUTO_ACCEPT_STATUS,
	payload: {
		request: {
			url: API_URLS.AUTO_ACCEPT_ORDER,
			method: 'get',
		},
	},
});

export const setAutoAccept = (data) => ({
	type: ordersConstants.SET_AUTO_ACCEPT_STATUS,
	payload: {
		request: {
			url: API_URLS.AUTO_ACCEPT_ORDER,
			method: 'post',
			data
		},
	},
});

export const getOrders = ({type, search, page, start_date, end_date}) => ({
	type: ordersConstants.GET_ORDERS,
	payload: {
		request: {
			url: API_URLS.BASE_URL_V2 + 'orders',
			params: {
				status: type,
				sort: '-id',
				search: search.length ? search : null,
				page,
				'per-page': 20,
				start_date,
				end_date,
			},
			method: 'get',
		},
	},
	orderType: type,
	page
});

export const getSingleOrder = (id) => ({
	type: ordersConstants.GET_SINGLE_ORDER,
	payload: {
		request: {
			url: `${API_URLS.SINGLE_ORDER}/${id}`,
			method: 'get',
		},
	},
});

export const showPrintModal = () => ({
	type: ordersConstants.SHOW_PRINT_MODAL,
});

export const hidePrintModal = () => ({
	type: ordersConstants.HIDE_PRINT_MODAL,
});

export const showOrderAcceptModal = () => ({
	type: ordersConstants.SHOW_ORDER_ACCEPT_MODAL,
});

export const hideOrderAcceptModal = () => ({
	type: ordersConstants.HIDE_ORDER_ACCEPT_MODAL,
});

export const managePageCounter = (isIncrement) => ({
	type: (isIncrement ? ordersConstants.INCREMENT_PAGE_COUNTER : ordersConstants.DECREMENT_PAGE_COUNTER),
});

export const managePageCounterForAccept = (isIncrement) => ({
	type: (isIncrement ? ordersConstants.INCREMENT_PAGE_COUNTER_ACCEPT : ordersConstants.DECREMENT_PAGE_COUNTER_ACCEPT),
});

export const showOrderRejectModal = () => ({
	type: ordersConstants.SHOW_ORDER_REJECT_MODAL,
})

export const hideOrderRejectModal = () => ({
	type: ordersConstants.HIDE_ORDER_REJECT_MODAL,
})

export const changeRejectionText = (value) => ({
	type: ordersConstants.CHANGE_REJECTION_REMARK,
	value
})

export const changeProcessingTime = (value) => ({
	type: ordersConstants.CHANGE_PROCESSING_TIME,
	value
})

export const setIsToPrintDocket = (value) => ({
	type: ordersConstants.IS_TO_PRINT_DOCKET,
	value
})

export const setIsScheduledDelivery = (value) => ({
	type: ordersConstants.IS_SCHEDULE_DELIVERY,
	value
})

export const clearOrders = () => ({
	type: ordersConstants.CLEAR_ORDER
})

export const markOrderViewed = (id) => ({
	type: ordersConstants.MARK_ORDER_VIEWED,
	payload: {
		request: {
			url: `${API_URLS.ORDERS}/view/${id}`,
			method: 'get',
		},
	},
});

export const beginPrintOrder = (id, data) => ({
	type: ordersConstants.PRINT_ORDER,
	payload: {
		request: {
			url: `${API_URLS.ORDERS}/print/${id}`,
			method: 'post',
			data
		},
	},
});

/**
 *  Create new Smart Plan
 */
export function printOrder(id, data) {
	return async dispatch => {
		try {
			const response = await dispatch(beginPrintOrder(id, data));
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

export const beginRejectOrder = (id, data) => ({
	type: ordersConstants.REJECT_ORDER,
	payload: {
		request: {
			url: `${API_URLS.ORDERS}/${id}/status`,
			method: 'post',
			data
		},
	},
});

/**
 *  Create new Smart Plan
 */
export function rejectOrder(id, data) {
	return async dispatch => {
		try {
			const response = await dispatch(beginRejectOrder(id, data));
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

export const beginAcceptOrder = (id, data) => ({
	type: ordersConstants.ACCEPT_ORDER,
	payload: {
		request: {
			url: `${API_URLS.ORDERS}/${id}/status`,
			method: 'post',
			data
		},
	},
});

/**
 *  Create new Smart Plan
 */
export function acceptOrder(id, data) {
	return async dispatch => {
		try {
			const response = await dispatch(beginAcceptOrder(id, data));
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

export const beginChangeOrderStatus = (id, data) => ({
	type: ordersConstants.CHANGE_ORDER_STATUS,
	payload: {
		request: {
			url: `${API_URLS.ORDERS}/${id}/status`,
			method: 'post',
			data
		},
	},
});

/**
 *  Create new Smart Plan
 */
export function changeOrderStatus(id, data) {
	return async dispatch => {
		try {
			const response = await dispatch(beginChangeOrderStatus(id, data));
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

