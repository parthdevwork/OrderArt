import React, {useEffect} from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Completed from './Completed';
import Rejected from './Rejected';
import Processing from './Processing';
import {connect} from 'react-redux';
import {clearReservations} from '../../redux/actions';
import theme from '../../theme';
import {Platform} from 'react-native';

const Tab = createMaterialTopTabNavigator();

let Reservations = (props) => {
  const {navigation} = props;

  useEffect(
    () =>
      navigation.addListener('blur', (e) => {
        props.clearReservations();
      }),
    [navigation],
  );

  return (
    <Tab.Navigator
      initialRouteName="Processing"
      tabStyle={{
        height: 100,
      }}
      tabBarOptions={{
        allowFontScaling: false,
        inactiveBackgroundColor: theme.gray,
        activeTintColor: theme.deliverText,
        inactiveTintColor: theme.gray,
        labelStyle: {
          fontSize: Platform.OS == 'ios' ? 14 : 10,
          fontFamily: 'Roboto-Bold',
        },
        style: {backgroundColor: theme.white, height: 55},
        indicatorStyle: {
          marginTop: 20,
          backgroundColor: theme.deliverText,
          marginVertical: 10,
        },
      }}
      backBehavior={'initialRoute'}>
      <Tab.Screen
        name="Processing"
        component={Processing}
        options={{tabBarLabel: 'Processing'}}
      />
      <Tab.Screen
        name="Completed"
        component={Completed}
        options={{tabBarLabel: 'Completed'}}
      />
      <Tab.Screen
        name="Rejected"
        component={Rejected}
        options={{tabBarLabel: 'Rejected'}}
      />
    </Tab.Navigator>
  );
};

function bindAction(dispatch) {
  return {
    clearReservations: (type) => dispatch(clearReservations(type)),
  };
}

const mapStateToProps = (state) => ({});

Reservations = connect(mapStateToProps, bindAction)(Reservations);

export default Reservations;
