global.XMLHttpRequest = global.originalXMLHttpRequest
  ? global.originalXMLHttpRequest
  : global.XMLHttpRequest;
global.FormData = global.originalFormData
  ? global.originalFormData
  : global.FormData;

fetch; // Ensure to get the lazy property

if (window.__FETCH_SUPPORT__) {
  // it's RNDebugger only to have
  window.__FETCH_SUPPORT__.blob = false;
} else {
  /*
   * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
   * If you're using another way you can just use the native Blob and remove the `else` statement
   */
  global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
  global.FileReader = global.originalFileReader
    ? global.originalFileReader
    : global.FileReader;
}

import React from 'react';
import {AppRegistry, Text} from 'react-native';
import App from './App';
import {isTablet} from './app/common/utilities';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';

import configureStore from './app/redux/store';

const store = configureStore();
const setDefaultConfig = () => {
  let components = [Text];

  const customProps = {style: {}};
  const TextRender = components[0].render;
  const initialDefaultProps = components[0].constructor.defaultProps;

  components[0].render = function render(props) {
    let oldProps = {...props};

    if (Array.isArray(oldProps.style)) {
      oldProps.style = oldProps.style.reduce(
        (obj, item) => Object.assign(obj, {...item}),
        {},
      );
    }

    if (oldProps.style && oldProps.style.fontSize && isTablet()) {
      // isTablet is custom function.
      customProps.style.fontSize = oldProps.style.fontSize + 3;
    }

    if (oldProps.style && oldProps.style.fontFamily) {
      customProps.style.fontFamily = oldProps.style.fontFamily;
    } else {
      customProps.style.fontFamily = 'Roboto-Regular';
    }

    components[0].constructor.defaultProps = {
      ...initialDefaultProps,
      ...customProps,
    };

    props = {...props, style: {...oldProps.style}};

    if (Object.keys(customProps.style).length > 0) {
      props.style = {
        ...JSON.parse(JSON.stringify(props.style)),
        ...customProps.style,
      };
    }

    try {
      return TextRender.apply(this, arguments);
    } finally {
    }
  };
};

setDefaultConfig();

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppContainer);
