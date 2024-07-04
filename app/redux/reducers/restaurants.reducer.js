import { restaurants } from '../constants';
import { success, failure } from '../../utilities'

const initialState = {
	isRequesting: false,
	restaurantDetails: {}
};

const restaurantseReducer = (state = initialState, action) => {
	switch (action.type) {
		case restaurants.GET_RESTAURANT:
			return { ...state, isRequesting: true };
		case success(restaurants.GET_RESTAURANT):
			return { ...state, restaurantDetails: action.payload.data.data[0], isRequesting: false };
		case restaurants.UPDATE_RESTAURANT:
			return { ...state, isRequesting: true };
		case success(restaurants.UPDATE_RESTAURANT):
		case failure(restaurants.UPDATE_RESTAURANT):
			return { ...state, isRequesting: false };
		default:
			return state;
	}
}

export default restaurantseReducer;