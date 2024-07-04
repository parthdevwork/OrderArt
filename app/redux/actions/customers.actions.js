/**
 *  Import action creator constants & dependencies
 */
import { customersConstants } from '../constants';
import { API_URLS } from '../../configs/url';

export const getCustomers = (data, isInitialLoad) => ({
	type: customersConstants.GET_CUSTOMERS,
	payload: {
		request: {
			url: API_URLS.CUSTOMERS,
			method: 'get',
			params: data
		},
	},
	isInitialLoad
});

export const beginSubscribeCustomer = (id) => ({
	type: customersConstants.SUBSCRIBE_CUSTOMER,
	payload: {
		request: {
			url: `${API_URLS.SUBSCRIBE_CUSTOMERS}/${id}`,
			method: 'post',
		},
	}
});

export const setSearchText = (searchText) => ({
	type: customersConstants.SET_SEARCH_TEXT,
	searchText
})

export function subscribeCustomer(id) {
	return async dispatch => {
		try {
			const response = await dispatch(beginSubscribeCustomer(id));
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

export const beginUnSubscribeCustomer = (id) => ({
	type: customersConstants.UNSUBSCRIBE_CUSTOMER,
	payload: {
		request: {
			url: `${API_URLS.UNSUBSCRIBE_CUSTOMERS}/${id}`,
			method: 'post',
		},
	}
});

export function unSubscribeCustomer(id) {
	return async dispatch => {
		try {
			const response = await dispatch(beginUnSubscribeCustomer(id));
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

export const beginVerifyCustomer = (id) => ({
	type: customersConstants.VERIFY_CUSTOMER,
	payload: {
		request: {
			url: `${API_URLS.VERIFY_CUSTOMER}/${id}`,
			method: 'post',
		},
	}
});

export function verifyCustomer(id) {
	return async dispatch => {
		try {
			const response = await dispatch(beginVerifyCustomer(id));
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

export const beginUnVerifyCustomer = (id) => ({
	type: customersConstants.UNVERIFY_CUSTOMER,
	payload: {
		request: {
			url: `${API_URLS.UNVERIFY_CUSTOMER}/${id}`,
			method: 'post',
		},
	}
});

export function unVerifyCustomer(id) {
	return async dispatch => {
		try {
			const response = await dispatch(beginUnVerifyCustomer(id));
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