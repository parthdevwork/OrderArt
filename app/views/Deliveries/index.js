import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import theme from '../../theme';
import NotAllocated from './NotAllocated';
import InTransit from './InTransit';
import Delivered from './Delivered';
import Cancelled from './Cancelled';

const Tab = createMaterialTopTabNavigator();
let Deliveries = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="NotAllocated"
      tabStyle={{ height: 100 }}
      tabBarOptions={{
        allowFontScaling: false,
        inactiveBackgroundColor: theme.white,
        activeTintColor: theme.white,
        inactiveTintColor: theme.lightestGray,
        labelStyle: {fontSize: Platform.OS == 'ios' ? 12 : 9, fontFamily: 'Roboto-Bold' },
        style: { backgroundColor: theme.brand, height: 55 },
        indicatorStyle: {
          marginTop: 20,
          backgroundColor: theme.white,
        },
      }}
      backBehavior={'initialRoute'}>
      <Tab.Screen name="NotAllocated" component={NotAllocated} options={{ tabBarLabel: 'Waiting' }} />
      <Tab.Screen name="InTransit" component={InTransit} options={{ tabBarLabel: 'In Transit' }} />
      <Tab.Screen name="Delivered" component={Delivered} options={{ tabBarLabel: 'Delivered' }} />
      <Tab.Screen name="Cancelled" component={Cancelled} options={{ tabBarLabel: 'Cancelled' }} />
    </Tab.Navigator>
  );
};

export default Deliveries;
