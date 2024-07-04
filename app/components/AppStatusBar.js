import React from 'react';
import {StatusBar, View} from 'react-native';
import theme from '../theme';

const AppStatusBar = ({backgroundColor, ...props}) => {
  if (!backgroundColor) backgroundColor = theme.brand;
  return (
    <View>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
  );
};
export default AppStatusBar;
