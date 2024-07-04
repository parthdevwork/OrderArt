import {servicesConstants} from '../constants';
import {success, failure} from '../../utilities';

const initialState = {
  todayDisabled: {
    delivery_disabled: 0,
    take_away_disabled: 0,
    reservation_disabled: 0,
  },
  quickDisabled: {
    delivery_disabled: 0,
    take_away_disabled: 0,
    reservation_disabled: 0,
  },
  isRequesting: false,
  thresHoldData: {order_threshold: 0},
  delay: {takeaway: 0, delivery: 0},
};

const ringToneReducer = (state = initialState, action) => {
  switch (action.type) {
    case servicesConstants.GET_TODAY_DISABLED_SERVICES:
      return {...state, isRequesting: true};
    case success(servicesConstants.GET_TODAY_THRESHOLD):
      return {
        ...state,
        thresHoldData: action.payload.data.data,
      };
    case failure(servicesConstants.GET_TODAY_THRESHOLD):
      return {
        ...state,
        isRequesting: false,
      };
    case success(servicesConstants.GET_DELAY):
      console.log(
        '****servicesConstants.GET_DELAY****',
        action.payload.data.data,
      );
      return {
        ...state,
        delay: action.payload.data.data,
      };
    case failure(servicesConstants.GET_DELAY):
      return {
        ...state,
        isRequesting: false,
      };

    case success(servicesConstants.GET_TODAY_DISABLED_SERVICES):
      return {...state, todayDisabled: action.payload.data.data};
    case success(servicesConstants.GET_QUICK_DISABLED_SERVICES):
      return {
        ...state,
        quickDisabled: action.payload.data.data,
        isRequesting: false,
      };
    case failure(servicesConstants.GET_TODAY_DISABLED_SERVICES):
      return {...state, isRequesting: false};
    case failure(servicesConstants.GET_QUICK_DISABLED_SERVICES):
      return {...state, isRequesting: false};
    case servicesConstants.SAVE_TODAY_THRESHOLD:
      return {...state, isRequesting: true};

    case success(servicesConstants.SAVE_DELAY): {
    }
    case failure(servicesConstants.SAVE_DELAY):
      return {...state, isRequesting: false};
    case success(servicesConstants.SAVE_TODAY_THRESHOLD):
    case failure(servicesConstants.SAVE_TODAY_THRESHOLD):
      return {...state, isRequesting: false};
    case servicesConstants.SAVE_QUICK_DISABLE_SERVICE: {
      const rqData = action.payload.request.data;
      const {delivery_disabled, take_away_disabled, reservation_disabled} =
        rqData;

      let QD = state.quickDisabled;

      if (typeof delivery_disabled != 'undefined') {
        QD.delivery_disabled = rqData.delivery_disabled;
      }
      if (typeof take_away_disabled != 'undefined') {
        QD.take_away_disabled = rqData.take_away_disabled;
      }
      if (typeof reservation_disabled != 'undefined') {
        QD.reservation_disabled = rqData.reservation_disabled;
      }
      return {...state, quickDisabled: {...QD}};
    }
    case servicesConstants.SAVE_TODAY_DISABLED_SERVICE: {
      const rqData = action.payload.request.data;
      const {delivery_disabled, take_away_disabled, reservation_disabled} =
        rqData;

      let TD = state.todayDisabled;

      if (typeof delivery_disabled != 'undefined') {
        TD.delivery_disabled = rqData.delivery_disabled;
      }
      if (typeof take_away_disabled != 'undefined') {
        TD.take_away_disabled = rqData.take_away_disabled;
      }
      if (typeof reservation_disabled != 'undefined') {
        TD.reservation_disabled = rqData.reservation_disabled;
      }
      return {...state, todayDisabled: {...TD}};
    }
    default:
      return state;
  }
};
export default ringToneReducer;
