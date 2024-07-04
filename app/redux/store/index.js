import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';
import {composeWithDevTools} from 'redux-devtools-extension';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from '../reducers';
import axios from 'axios';
import JquerParam from 'jquery-param';

import * as RootNavigation from './../../Routes/RootNavigation';

import {API_URLS} from '../../configs/url';

const client = axios.create({
  baseURL: API_URLS.BASE_URL,
  headers: {
    accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded',
  },
});

client.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const middlewareConfig = {
  interceptors: {
    request: [
      {
        success({getState, dispatch, getSourceAction}, req) {
          let request = req;
          if (request.method == 'post') {
            request.data = JquerParam(request.data);
          }
          if (request.method == 'put') {
            request.data = JquerParam(request.data);
          }
          return request;
        },
      },
    ],
    response: [
      {
        success({getState, dispatch, getSourceAction}, response) {
          return response;
        },
        error({getState, dispatch, getSourceAction}, error) {
          if (!axios.isCancel(error)) {
            httpHandleError(error.response);
          }

          return Promise.reject(error);
        },
      },
    ],
  },
};

const httpHandleError = ({status}) => {
  if (status == 401) {
    AsyncStorage.clear();
    RootNavigation.navigate('Login');
  }
};

/**
 * Prepare the Redux Store
 */
const composedMiddlewares = applyMiddleware(thunk);

const createStoreWithMiddleware = applyMiddleware(
  axiosMiddleware(client, middlewareConfig),
  thunk,
)(createStore);

const storeEnhancers = composeWithDevTools({
  name: 'ORDER ART',
})(composedMiddlewares);

const configureStore = () => {
  return createStoreWithMiddleware(reducers, undefined, storeEnhancers);
};

export default configureStore;
