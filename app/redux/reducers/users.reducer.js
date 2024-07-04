import { userConstants } from '../constants';
import { success, failure } from '../../utilities'

const initialState = {
	isRequesting: false
};

const usersReducer = (state = initialState, action) => {

	switch (action.type) {
		case userConstants.LOGIN:
			return { ...state, isRequesting: true };
		case success(userConstants.LOGIN):
		case failure(userConstants.LOGIN):
			return { ...state, isRequesting: false }
		default:
			return state;
	}
}
export default usersReducer;