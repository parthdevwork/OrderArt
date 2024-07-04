/**
 *  Import action creator constants & dependencies
 */
import {servicesConstants} from '../constants';
import {API_URLS} from '../../configs/url';

export const getQuickDisabledServices = (data) => ({
  type: servicesConstants.GET_QUICK_DISABLED_SERVICES,
  payload: {
    request: {
      url: API_URLS.SERVICE_QUICK_DISABLE,
      method: 'get',
      params: data,
    },
  },
});

export const getTodayDisabledServices = (data) => ({
  type: servicesConstants.GET_TODAY_DISABLED_SERVICES,
  payload: {
    request: {
      url: API_URLS.SERVICE_TODAY_DISABLE,
      method: 'get',
      params: data,
    },
  },
});

export const getTodayThreshold = () => {
  return {
    type: servicesConstants.GET_TODAY_THRESHOLD,
    payload: {
      request: {
        url: API_URLS.THRESHOLD_DISABLE,
        method: 'get',
      },
    },
  };
};

export const getRestaurantDelay = () => {
  return {
    type: servicesConstants.GET_DELAY,
    payload: {
      request: {
        url: API_URLS.RESTAURANT_DELAY,
        method: 'get',
      },
    },
  };
};

export const beginSavingThreshold = (data) => ({
  type: servicesConstants.SAVE_TODAY_THRESHOLD,
  payload: {
    request: {
      url: API_URLS.TODAY_THRESHOLD,
      method: 'post',
      data,
    },
  },
});

export function saveTodayThreshold(data) {
  return async (dispatch) => {
    try {
      const response = await dispatch(beginSavingThreshold(data));
      if (response.payload) {
        const {data} = response.payload;
        return data;
      }
      throw response;
    } catch (error) {
      throw error.response;
    }
  };
}

export const saveQuickDisable = (data) => ({
  type: servicesConstants.SAVE_QUICK_DISABLE_SERVICE,
  payload: {
    request: {
      url: API_URLS.SERVICE_QUICK_DISABLE,
      method: 'post',
      data,
    },
  },
});

export const saveTodayDisable = (data) => ({
  type: servicesConstants.SAVE_TODAY_DISABLED_SERVICE,
  payload: {
    request: {
      url: API_URLS.SERVICE_TODAY_DISABLE,
      method: 'post',
      data,
    },
  },
});

export const beingUpdateDelay = (data) => ({
  type: servicesConstants.SAVE_DELAY,
  payload: {
    request: {
      url: API_URLS.UPADAT_DELAY,
      method: 'post',
      data,
    },
  },
});

export function saveUpdateDelay(data) {
  console.log('***data***', data);
  return async (dispatch) => {
    try {
      const response = await dispatch(beingUpdateDelay(data));
      if (response.payload) {
        const responseData = response.payload.data;
        console.log(responseData);
        return responseData;
      }

      throw new Error('Invalid response');
    } catch (error) {
      throw error;
    }
  };
}
