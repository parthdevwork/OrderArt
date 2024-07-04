import React, {useEffect} from 'react';
import {View, Text, Switch} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Completed from './Completed';
import Rejected from './Rejected';
import Processing from './Processing';
import {connect} from 'react-redux';
import {
  clearOrders,
  getAutoAcceptState,
  setAutoAccept,
} from '../../redux/actions';
import theme from '../../theme';
import styles from './styles';

const Tab = createMaterialTopTabNavigator();

let Orders = (props) => {
  const {navigation} = props;

  useEffect(
    () =>
      navigation.addListener('blur', (e) => {
        props.clearOrders();
      }),
    [navigation],
  );

  useEffect(() => {
    props.getAutoAcceptState();
  }, []);

  const toggleSwitch = () => {
    const data = {
      auto_accept_order: props.isAutoAccept == 1 ? 0 : 1,
    };
    props.setAutoAccept(data);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.autoAccept}>
          <Text style={styles.autoAcceptText}>Auto Accept </Text>
          <Switch
            trackColor={{false: theme.ultraLight, true: theme.ultraLight}}
            thumbColor={props.isAutoAccept == 1 ? theme.darkBrand : theme.gray}
            ios_backgroundColor={
              props.isAutoAccept == 1 ? theme.ultraLight : theme.lightGray
            }
            onValueChange={() => toggleSwitch()}
            value={props.isAutoAccept == 1}
          />
        </View>
      ),
    });
  }, [props.isAutoAccept]);

  return (
    <Tab.Navigator
      initialRouteName="Processing"
      tabStyle={{
        height: 100,
      }}
      tabBarOptions={{
        allowFontScaling: false,
        inactiveBackgroundColor: theme.deliverText,
        activeTintColor: theme.deliverText,
        inactiveTintColor: theme.gray,
        labelStyle: {
          fontSize: Platform.OS == 'ios' ? 14 : 10,
          fontFamily: 'UberMove-Bold',
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
    clearOrders: () => dispatch(clearOrders()),
    getAutoAcceptState: () => dispatch(getAutoAcceptState()),
    setAutoAccept: (data) => dispatch(setAutoAccept(data)),
  };
}

const mapStateToProps = (state) => ({
  isAutoAccept: state.orders.isAutoAccept,
});

Orders = connect(mapStateToProps, bindAction)(Orders);

export default Orders;
