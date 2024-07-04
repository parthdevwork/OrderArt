import { grievanceConstants } from '../constants';
import { success, failure } from '../../utilities'

const initialState = {
	isRequesting: false,
	singleGrievanceDetail: {},
	openGrievances: [],
	closedGrievances: [],

	isOpenGrivancesLoaded: false,
	isClosedGrievanceLoaded: false
};

const grievanceReducer = (state = initialState, action) => {
	switch (action.type) {
		case grievanceConstants.GET_GRIEVANCES:
			return { ...state, isRequesting: true };

		case success(grievanceConstants.GET_GRIEVANCES):
			const { data, meta } = action.payload.data;
			const { grievanceType, page } = action.meta.previousAction

			let newData = {}

			switch (grievanceType) {
				case 'open':
					newData = {
						openGrievances: page == 1 ? data : [...state.openGrievances, ...data],
						isOpenGrivancesLoaded: true
					}
					break
				case 'closed':
					newData = {
						closedGrievances: page == 1 ? data : [...state.closedGrievances, ...data],
						isClosedGrievanceLoaded: true
					}
					break
			}

			return { ...state, isRequesting: false, ...newData, meta }

		case failure(grievanceConstants.GET_GRIEVANCES):
			return { ...state, isRequesting: false }

		case grievanceConstants.GET_SINGLE_GRIEVANCE:
			return { ...state, isRequesting: true, singleGrievanceDetail: {} };

		case success(grievanceConstants.GET_SINGLE_GRIEVANCE):
			return { ...state, isRequesting: false, singleGrievanceDetail: action.payload.data.data }

		case grievanceConstants.CLOSE_GRIEVANCE:
			return { ...state, isRequesting: true };

		case success(grievanceConstants.CLOSE_GRIEVANCE):
			return { ...state, isRequesting: false, singleGrievanceDetail: action.payload.data.data }

		case failure(grievanceConstants.CLOSE_GRIEVANCE):
			return { ...state, isRequesting: false }

		case grievanceConstants.CLEAR_GRIEVANCES:
			return {
				...state,
				openGrievances: [],
				closedGrievances: [],
				isOpenGrivancesLoaded: false,
				isClosedGrievanceLoaded: false
			}
		default:
			return state;
	}
}

export default grievanceReducer;