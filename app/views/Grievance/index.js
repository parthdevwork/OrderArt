import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Open from './Open';
import Closed from './Closed';
import theme from '../../theme';

import {connect} from 'react-redux';
import {clearGrievances} from '../../redux/actions';

const Tab = createMaterialTopTabNavigator();

let Grievance = (props) => {
  const {navigation} = props;

  useEffect(
    () =>
      navigation.addListener('blur', (e) => {
        props.clearGrievances();
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
        labelStyle: {fontSize: 14, fontFamily: 'UberMove-Bold'},
        style: {backgroundColor: theme.white, height: 55},
        indicatorStyle: {
          marginTop: 20,
          backgroundColor: theme.black,
          marginVertical: 10,
        },
      }}>
      <Tab.Screen
        name="Open"
        component={Open}
        options={{tabBarLabel: 'Open'}}
      />
      <Tab.Screen
        name="Closed"
        component={Closed}
        options={{tabBarLabel: 'Closed'}}
      />
    </Tab.Navigator>
  );
};

function bindAction(dispatch) {
  return {
    clearGrievances: () => dispatch(clearGrievances()),
  };
}

const mapStateToProps = (state) => ({});

Grievance = connect(mapStateToProps, bindAction)(Grievance);

export default Grievance;
