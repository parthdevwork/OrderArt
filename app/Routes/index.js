import React, {useEffect} from 'react';
import {Image, Text} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import theme from '../theme';

/**
 * Screens
 */
import Dashboard from '../views/Dashboard';
import Login from '../views/Login';
import Menu from '../views/Menu';
import Orders from '../views/Orders';
import Reservations from '../views/Reservations';
import Grievance from '../views/Grievance';
import ForgotPassword from '../views/ForgotPassword';
import DishOptions from '../views/DishOptions';
import ManageRestaurant from '../views/ManageRestaurant';
import RingToneSelector from '../views/RingToneSelector';
import IvrGreetings from '../views/IvrGreetings';
import GrievanceDetails from '../views/GrievanceDetails';
import RestaurantDetails from '../views/RestaurantDetails';
import DishDetails from '../views/DishDetails';
import Customers from '../views/Customers';
import OrderDetails from '../views/OrderDetails';
import InitScreen from '../views/InitScreen';
import ReservationDetails from '../views/Reservations/ReservationDetails';
import ServiceDisable from '../views/ServiceDisable';
import Reports from '../views/Reports';
import PayoutScreen from '../views/Payouts';
import MarketingScreen from '../views/Marketing';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import {CardStyleInterpolators} from '@react-navigation/stack';
import {navigationRef, isReadyRef} from './RootNavigation';
import Surcharges from '../views/Surcharge';
import Promotions from '../views/Promotions';
import EditDish from '../views/EditDish';
import Deliveries from '../views/Deliveries';
import Capmping from '../views/Camping/Capmping';
import ShowMessages from '../views/Camping/ShowMessages';
import CampingType from '../views/Camping/CampingType';

function DashBoardComponent() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Menu {...props} />}
      screenOptions={{
        swipeEnabled: false, // Disable swipe gesture
      }}>
      <Drawer.Screen name="Feed" component={Dashboard} />
    </Drawer.Navigator>
  );
}

function LogoTitle(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        marginLeft: 20,
        justifyContent: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => navigation.goBack()}
      activeOpacity={0.7}>
      <Image
        style={{width: 25, height: 25}}
        resizeMode="stretch"
        source={require('../img/left-arrow.png')}
      />
      <Text
        style={{
          fontSize: 22,
          color: theme.deliverText,
          marginLeft: 40,
          fontFamily: 'UberMove-Bold',
        }}>
        {props.title || 'Back'}
      </Text>
    </TouchableOpacity>
  );
}

export function AppContainer() {
  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
      <Stack.Navigator
        initialRouteName="InitScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.white,
            height: 50,
            shadowColor: 'transparent',
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
          headerLeft: null,
          title: '',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'UberMove-Bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={DashBoardComponent}
          options={
            (({route}) => ({title: route.params.name}),
            {
              headerShown: false,
              gestureEnabled: false,
            })
          }
        />
        <Stack.Screen name="InitScreen" component={InitScreen} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={({route}) => ({headerShown: false})}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{
            headerLeft: (props) => <LogoTitle {...props} title={'Home'} />,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Reservations"
          component={Reservations}
          options={{
            headerLeft: (props) => <LogoTitle {...props} title={'Bookings'} />,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Grievance"
          component={Grievance}
          options={{
            headerLeft: (props) => (
              <LogoTitle {...props} title={'Customer Grievance'} />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerLeft: (props) => (
              <LogoTitle {...props} title={'Forgot Password'} />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Reports"
          component={Reports}
          options={{
            headerLeft: (props) => <LogoTitle {...props} title={'Reports'} />,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="DishOptions"
          component={DishOptions}
          options={{
            headerLeft: (props) => (
              <LogoTitle {...props} title={'Dish Management'} />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        {/* <Stack.Screen
          name="ManageRestaurant"
          component={ManageRestaurant}
          options={{
            headerLeft: (props) => (
              <LogoTitle {...props} title={'Manage Restaurant'} />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        /> */}
        <Stack.Screen
          name="ManageRestaurant"
          component={ManageRestaurant}
          options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="RingToneSelector"
          component={RingToneSelector}
          options={{
            headerLeft: (props) => (
              <LogoTitle {...props} title={'Select RingTone'} />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="IvrGreetings"
          component={IvrGreetings}
          options={{
            headerLeft: (props) => (
              <LogoTitle {...props} title={'IVR Greetings'} />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Deliveries"
          component={Deliveries}
          options={{
            headerLeft: (props) => (
              <LogoTitle {...props} title={'Deliveries'} />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="GrievanceDetails"
          component={GrievanceDetails}
          options={{
            headerLeft: (props) => (
              <LogoTitle {...props} title={'Grievance Details'} />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="RestaurantDetails"
          component={RestaurantDetails}
          options={{
            headerLeft: (props) => (
              <LogoTitle {...props} title={'Restaurant Details'} />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="DishDetails"
          component={DishDetails}
          options={{
            headerLeft: (props) => (
              <LogoTitle {...props} title={"Today's Dish"} />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Customers"
          component={Customers}
          options={{
            headerLeft: (props) => <LogoTitle {...props} title={'Customers'} />,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={{
            headerLeft: (props) => (
              <LogoTitle {...props} title={'Order Details'} />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="ReservationDetails"
          component={ReservationDetails}
          options={{
            headerLeft: (props) => (
              <LogoTitle {...props} title={'Reservation Details'} />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="ServiceDisable"
          component={ServiceDisable}
          options={{
            headerLeft: (props) => (
              <LogoTitle {...props} title={'Quick Disable Service'} />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Marketing"
          component={MarketingScreen}
          options={{
            headerLeft: (props) => <LogoTitle {...props} title={'Marketing'} />,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Payouts"
          component={PayoutScreen}
          options={{
            headerLeft: (props) => <LogoTitle {...props} title={'Payouts'} />,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="EditDish"
          component={EditDish}
          options={({route}) => ({
            headerLeft: (props) => (
              <LogoTitle
                {...props}
                title={
                  'Editing ' +
                  (route.params.title.length > 15
                    ? route.params.title.substring(0, 15) + '...'
                    : route.params.title)
                }
              />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}
        />
        <Stack.Screen
          name="Surcharges"
          component={Surcharges}
          options={{
            headerLeft: (props) => (
              <LogoTitle {...props} title={'Surcharges'} />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Promotions"
          component={Promotions}
          options={{
            headerLeft: (props) => (
              <LogoTitle {...props} title={'Promotions'} />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="camping"
          component={Capmping}
          options={{
            headerLeft: (props) => <LogoTitle {...props} title={'Campaigns'} />,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="sms"
          component={ShowMessages}
          // options={{
          //   headerLeft: (props) => <LogoTitle {...props}/>,
          //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // }}
          options={({route}) => ({headerShown: false})}
        />
        <Stack.Screen
          name="campingType"
          component={CampingType}
          options={{
            headerLeft: (props) => (
              <LogoTitle {...props} title={'Choose camping type'} />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
