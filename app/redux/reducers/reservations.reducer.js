import { reservationsConstants } from '../constants';
import { success, failure } from '../../utilities'

const initialState = {
	isRequesting: true,
	processingReservationList: [],
	completedReservationList: [],
	rejectedReservationList: [],
	isProcessingReservationListLoaded: false,
	isCompletedReservationListLoaded: false,
	isRejectedReservationListLoaded: false,
	singleReservationDetail: {}
};

const reservationsReducer = (state = initialState, action) => {
	switch (action.type) {
		case reservationsConstants.GET_RESERVATIONS:
			return { ...state, isRequesting: true };

		case success(reservationsConstants.GET_RESERVATIONS):
			const { data, meta } = action.payload.data;
			const { reservationType, page } = action.meta.previousAction

			let newData = {}

			switch (reservationType) {
				case 'processing':
					newData = {
						processingReservationList: page == 1 ? data : [...state.processingReservationList, ...data],
						isProcessingReservationListLoaded: true
					}
					break
				case 'completed':
					newData = {
						completedReservationList: page == 1 ? data : [...state.completedReservationList, ...data],
						isCompletedReservationListLoaded: true
					}
					break
				case 'rejected':
					newData = {
						rejectedReservationList: page == 1 ? data : [...state.rejectedReservationList, ...data],
						isRejectedReservationListLoaded: true
					}
					break
			}

			return { ...state, isRequesting: false, ...newData, meta }
		case reservationsConstants.PRINT_RESERVATION:
			return { ...state, isRequesting: false }

		case failure(reservationsConstants.GET_RESERVATIONS):
			return { ...state, isRequesting: false }

		case reservationsConstants.GET_SINGLE_RESERVATION:
			return { ...state, isRequesting: true, singleReservationDetail: {} };

		case success(reservationsConstants.GET_SINGLE_RESERVATION):
			return { ...state, isRequesting: false, singleReservationDetail: action.payload.data.data }

		case failure(reservationsConstants.GET_SINGLE_RESERVATION):
			return { ...state, isRequesting: false, singleReservationDetail: {} }

		case success(reservationsConstants.ACCEPT_RESERVATION):
			return { ...state, isRequesting: false, singleReservationDetail: action.payload.data.data }

		case success(reservationsConstants.REJECT_RESERVATION):
			return { ...state, isRequesting: false, singleReservationDetail: action.payload.data.data }

		case success(reservationsConstants.COMPLETE_RESERVATION):
			return { ...state, isRequesting: false, singleReservationDetail: action.payload.data.data }

		case reservationsConstants.CLEAR_RESERVATIONS:
			return {
				...state,
				processingReservationList: [],
				completedReservationList: [],
				rejectedReservationList: [],
				isProcessingReservationListLoaded: false,
				isCompletedReservationListLoaded: false,
				isRejectedReservationListLoaded: false,
			}

		default:
			return state;
	}
}

export default reservationsReducer;