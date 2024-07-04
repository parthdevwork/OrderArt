import { dishesConstants } from '../constants';
import { success, failure } from '../../utilities'

const initialState = {
	isRequesting: false,
	dishesList: [],
	allDishes: []
};

const dishesReducer = (state = initialState, action) => {
	switch (action.type) {

		case dishesConstants.GET_DISHES:
			return { ...state, isRequesting: true };

		case success(dishesConstants.GET_DISHES):
			const { data } = action.payload.data;
			return { ...state, isRequesting: false, dishesList: data, allDishes: data }

		case failure(dishesConstants.GET_DISHES):
			return { ...state, isRequesting: false }

		case dishesConstants.ENABLE_DISH:
		case dishesConstants.DISBALE_DISH:

			let list = state.dishesList
			const idx = list.findIndex(d => d.itemid == action.id)
			list[idx].status = list[idx].status == 1 ? 0 : 1

			return { ...state, dishesList: [...list] };

		case dishesConstants.MARK_DISH_OF_DAY:
			let dList = state.dishesList
			const dIdx = dList.findIndex(d => d.itemid == action.id)
			dList[dIdx].dishoftheday = dList[dIdx].dishoftheday == 1 ? 0 : 1
			return { ...state, dishesList: [...dList] };

		case dishesConstants.FILTER_LIST:
			let listClone = JSON.parse(JSON.stringify(state.allDishes))
			listClone = listClone.filter(item => item.itemname.toLowerCase().includes(action.filterText.toLowerCase()))
			return { ...state, filterText: action.filterText || '', dishesList: listClone };

		case dishesConstants.RESET_FILTERS:
			return { ...state, filterText: '', dishesList: state.allDishes };
		default:
			return { ...state }

	}
}

export default dishesReducer;