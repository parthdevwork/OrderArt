/**
 *  Import action creator constants & dependencies
 */
import { dishesConstants } from '../constants';
import { API_URLS } from '../../configs/url';

export const getDishes = (data) => ({
	type: dishesConstants.GET_DISHES,
	payload: {
		request: {
			url: API_URLS.DISHES,
			method: 'get',
			params: data
		},
	},
});

export const disableDish = (id) => ({
	type: dishesConstants.DISBALE_DISH,
	payload: {
		request: {
			url: `${API_URLS.DISHES}/${id}/disable`,
			method: 'get',
		},
	},
	id
});

export const enableDish = (id) => ({
	type: dishesConstants.ENABLE_DISH,
	payload: {
		request: {
			url: `${API_URLS.DISHES}/${id}/enable`,
			method: 'get',
		},
	},
	id
});

export const markDishOfDay = (id, value) => ({
	type: dishesConstants.MARK_DISH_OF_DAY,
	payload: {
		request: {
			url: `${API_URLS.DISHES}/${id}/dish-of-the-day?enable=${value}`,
			method: 'get',
		},
	},
	id
});

export const filterList = (filterText) => ({
	type: dishesConstants.FILTER_LIST,
	filterText
})

export const resetFilterAndList = () => ({
	type: dishesConstants.RESET_FILTERS,
})