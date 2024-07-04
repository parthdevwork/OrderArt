import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Promotions from '../Promotions';
import theme from '../../theme';
import SmsAndEmailScreen from './SmsEmail';

const Tab = createMaterialTopTabNavigator();
const MarketingScreen = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="Promotions"
      tabStyle={{
        height: 100,
      }}
      tabBarOptions={{
        allowFontScaling: false,
        inactiveBackgroundColor: theme.gray,
        activeTintColor: theme.deliverText,
        inactiveTintColor: theme.gray,
        labelStyle: {fontSize: 14, fontFamily: 'UberMove-Bold'},
        style: {backgroundColor: theme.white, height: 55},
        indicatorStyle: {
          marginTop: 20,
          backgroundColor: theme.black,
          marginVertical: 10,
        },
      }}>
      <Tab.Screen
        name="Promotions"
        component={Promotions}
        options={{
          tabBarLabel: 'Promotions',
        }}
      />
      <Tab.Screen
        name="SmsAndEmail"
        component={SmsAndEmailScreen}
        options={{tabBarLabel: 'SMS/Email'}}
      />
    </Tab.Navigator>
  );
};

export default MarketingScreen;
