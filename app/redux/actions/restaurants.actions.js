/**
 *  Import action creator constants & dependencies
 */
import {restaurants} from '../constants';
import {API_URLS} from '../../configs/url';

export const getRestaurant = () => ({
  type: restaurants.GET_RESTAURANT,
  payload: {
    request: {
      url: API_URLS.RESTAURANTS,
      method: 'get',
    },
  },
});

const beginUpdateRestaurant = (data) => ({
  type: restaurants.UPDATE_RESTAURANT,
  payload: {
    request: {
      url: `${API_URLS.RESTAURANTS}/${data.resid}`,
      method: 'put',
      data,
    },
  },
});

export function updateRestaurant(data) {
  return async (dispatch) => {
    try {
      const response = await dispatch(beginUpdateRestaurant(data));
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
