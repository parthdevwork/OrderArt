import { customersConstants } from '../constants';
import { success, failure } from '../../utilities'

const initialState = {
	isRequesting: false,
	customersList: [],
	searchParam: ''
};

const customersReducer = (state = initialState, action) => {
	switch (action.type) {
		case customersConstants.GET_CUSTOMERS:
			return { ...state, isRequesting: action.isInitialLoad, searchParam: action.isInitialLoad ? initialState.searchParam : state.searchParam };

		case success(customersConstants.GET_CUSTOMERS):
			const { data } = action.payload.data;
			return { ...state, isRequesting: false, customersList: data.items }

		case failure(customersConstants.GET_CUSTOMERS):
			return { ...state, isRequesting: false }

		case customersConstants.SUBSCRIBE_CUSTOMER:
		case customersConstants.VERIFY_CUSTOMER:
		case customersConstants.UNSUBSCRIBE_CUSTOMER:
		case customersConstants.UNVERIFY_CUSTOMER:
			return { ...state, isRequesting: true };

		case success(customersConstants.SUBSCRIBE_CUSTOMER):
		case success(customersConstants.VERIFY_CUSTOMER):
		case success(customersConstants.UNSUBSCRIBE_CUSTOMER):
		case success(customersConstants.UNVERIFY_CUSTOMER):

			const customer = action.payload.data.data
			let list = state.customersList
			const idx = list.findIndex(cus => cus.id == customer.id)
			list[idx] = customer

			return { ...state, isRequesting: false, customersList: list };

		case failure(customersConstants.SUBSCRIBE_CUSTOMER):
		case failure(customersConstants.VERIFY_CUSTOMER):
		case failure(customersConstants.UNSUBSCRIBE_CUSTOMER):
		case failure(customersConstants.UNVERIFY_CUSTOMER):
			return { ...state, isRequesting: false };

		case customersConstants.SET_SEARCH_TEXT:
			return { ...state, searchParam: action.searchText || '' };

		default:
			return { ...state }
	}
}

export default customersReducer;