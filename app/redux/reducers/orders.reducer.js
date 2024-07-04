import {ordersConstants} from '../constants';
import {success, failure} from '../../utilities';

const initialState = {
  isRequesting: true,
  isAutoAccept: 0,
  processingOrdersList: [],
  completedOrdersList: [],
  rejectedOrdersList: [],

  isProcessingOrderListLoaded: false,
  isCompletedOrderListLoaded: false,
  isRejectedOrderListLoaded: false,

  singleOrderDetail: {},
  isPrintModalVisible: false,
  isAcceptModalVisible: false,
  isRejectModalVisible: false,
  print_copies: 1,
  print_copies_accept: 1,
  rejectionText: '',
  isScheduledDelivery: false,
  isToPrintDocket: true,
  processingTime: '',
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ordersConstants.GET_ORDERS:
      return {...state, isRequesting: true};

    case success(ordersConstants.GET_ORDERS):
      const {data, meta} = action.payload.data;
      const {orderType, page} = action.meta.previousAction;

      let newData = {};

      switch (orderType) {
        case 'processing':
          newData = {
            processingOrdersList:
              page == 1 ? data : [...state.processingOrdersList, ...data],
            isProcessingOrderListLoaded: true,
          };
          break;
        case 'completed':
          newData = {
            completedOrdersList:
              page == 1 ? data : [...state.completedOrdersList, ...data],
            isCompletedOrderListLoaded: true,
          };
          break;
        case 'rejected':
          newData = {
            rejectedOrdersList:
              page == 1 ? data : [...state.rejectedOrdersList, ...data],
            isRejectedOrderListLoaded: true,
          };
          break;
      }

      return {...state, isRequesting: false, ...newData, meta};

    case failure(ordersConstants.GET_ORDERS):
      return {...state, isRequesting: false};

    case ordersConstants.GET_SINGLE_ORDER:
      return {...state, isRequesting: true, singleOrderDetail: {}};

    case success(ordersConstants.GET_SINGLE_ORDER):
      return {
        ...state,
        isRequesting: false,
        singleOrderDetail: action.payload.data.data,
      };

    case failure(ordersConstants.GET_SINGLE_ORDER):
      return {...state, isRequesting: false, singleOrderDetail: {}};

    case ordersConstants.SHOW_PRINT_MODAL:
      return {...state, isPrintModalVisible: true};

    case ordersConstants.HIDE_PRINT_MODAL:
      return {...state, isPrintModalVisible: false};

    case ordersConstants.SHOW_ORDER_ACCEPT_MODAL:
      return {...state, isAcceptModalVisible: true};

    case ordersConstants.HIDE_ORDER_ACCEPT_MODAL:
      return {...state, isAcceptModalVisible: false};

    case ordersConstants.SHOW_ORDER_REJECT_MODAL:
      return {...state, isRejectModalVisible: true};

    case ordersConstants.CHANGE_REJECTION_REMARK:
      return {...state, rejectionText: action.value};

    case ordersConstants.CHANGE_PROCESSING_TIME:
      return {...state, processingTime: action.value};

    case ordersConstants.HIDE_ORDER_REJECT_MODAL:
      return {...state, isRejectModalVisible: false};

    case ordersConstants.INCREMENT_PAGE_COUNTER:
      return {...state, print_copies: (state.print_copies += 1)};

    case ordersConstants.DECREMENT_PAGE_COUNTER:
      return {
        ...state,
        print_copies: state.print_copies == 1 ? 1 : (state.print_copies -= 1),
      };

    case ordersConstants.INCREMENT_PAGE_COUNTER_ACCEPT:
      return {...state, print_copies_accept: (state.print_copies_accept += 1)};

    case ordersConstants.DECREMENT_PAGE_COUNTER_ACCEPT:
      return {
        ...state,
        print_copies_accept:
          state.print_copies_accept == 1 ? 1 : (state.print_copies_accept -= 1),
      };

    case ordersConstants.PRINT_ORDER:
      return {...state, print_copies: 1};

    case ordersConstants.IS_TO_PRINT_DOCKET:
      return {...state, isToPrintDocket: action.value};

    case ordersConstants.IS_SCHEDULE_DELIVERY:
      return {...state, isScheduledDelivery: action.value};

    case ordersConstants.ACCEPT_ORDER:
      return {...state, isAcceptModalVisible: false};

    case ordersConstants.CHANGE_ORDER_STATUS:
      return {...state, isRequesting: true};

    case success(ordersConstants.CHANGE_ORDER_STATUS):
      return {
        ...state,
        isRequesting: false,
        singleOrderDetail: action.payload.data.data,
      };

    case success(ordersConstants.ACCEPT_ORDER):
      return {
        ...state,
        print_copies_accept: 1,
        processingTime: '',
        isScheduledDelivery: false,
        singleOrderDetail: action.payload.data.data,
      };

    case ordersConstants.REJECT_ORDER:
      return {...state, isRejectModalVisible: false};

    case ordersConstants.CLEAR_ORDER:
      return {
        ...state,
        processingOrdersList: [],
        completedOrdersList: [],
        rejectedOrdersList: [],
        isProcessingOrderListLoaded: false,
        isCompletedOrderListLoaded: false,
        isRejectedOrderListLoaded: false,
      };

    case success(ordersConstants.REJECT_ORDER):
      return {
        ...state,
        rejectionText: '',
        singleOrderDetail: action.payload.data.data,
      };

    case ordersConstants.SET_AUTO_ACCEPT_STATUS:
      return {
        ...state,
        isAutoAccept: action.payload.request.data.auto_accept_order,
      };

    case success(ordersConstants.GET_AUTO_ACCEPT_STATUS):
    case success(ordersConstants.SET_AUTO_ACCEPT_STATUS):
      const value = action.payload.data ? action.payload.data.data.value : 0;
      return {...state, isAutoAccept: value};

    default:
      return state;
  }
};

export default ordersReducer;
