import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  Switch,
  Alert,
} from 'react-native';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../../theme';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';

const DATA = [
  {
    id: '0',
    image: require('../../img/restaurant_details.png'),
    title: 'Screen Mode',
    isScreen: true,
  },
  {
    id: '1',
    image: require('../../img/restaurant_details.png'),
    title: 'Restaurant Details',
    component: 'RestaurantDetails',
  },
  // {
  // 	id: '2',
  // 	image: require('../../img/payment_report.png'),
  // 	title: 'Payment Mode',
  // 	component: 'RestaurantDetails'
  // },
  {
    id: '3',
    image: require('../../img/restaurant_details.png'),
    title: 'Service Disable Options',
    component: 'ServiceDisable',
  },
  {
    id: '4',
    image: require('../../img/dish_disable.png'),
    title: 'Products',
    component: 'DishOptions',
  },
  // {
  //   id: '5',
  //   image: require('../../img/dish_of_day.png'),
  //   title: 'Dish Of the Day',
  //   component: 'DishDetails',
  // },
  {
    id: '6',
    image: require('../../img/customerManage.png'),
    title: 'Customers',
    component: 'Customers',
  },
  {
    id: '7',
    image: require('../../img/grievanceManage.png'),
    title: 'Customer Grievance',
    component: 'Grievance',
  },
  {
    id: '8',
    image: require('../../img/table_booking.png'),
    title: 'Table Booking Settings',
    component: 'Orders',
  },
  {
    id: '9',
    image: require('../../img/promotion.png'),
    title: 'Promotions',
    component: 'Promotions',
  },
  {
    id: '10',
    image: require('../../img/surcharge.png'),
    title: 'Surcharges',
    component: 'Surcharges',
  },
  {
    id: '11',
    image: require('../../img/ringManage.png'),
    title: 'Select Ringtone',
    component: 'RingToneSelector',
  },
  {
    id: '12',
    image: require('../../img/voice.png'),
    title: 'IVR Greetings',
    component: 'IvrGreetings',
  },
];

const ManageRestaurant = (props) => {
  const [alwaysOn, isAlwaysOn] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('keepAwake').then((value) => {
      isAlwaysOn(value == 'true');
      if (value == 'true') {
        activateKeepAwake();
      } else {
        deactivateKeepAwake();
      }
    });
  }, []);

  const setScreenMode = () => {
    if (alwaysOn) {
      AsyncStorage.setItem('keepAwake', 'false');
      deactivateKeepAwake();
    } else {
      AsyncStorage.setItem('keepAwake', 'true');
      activateKeepAwake();
    }
    isAlwaysOn(!alwaysOn);
  };

  const logOut = () => {
    Alert.alert(
      'Are you sure you want to logout?',
      '',
      [
        {
          text: 'Logout',
          onPress: () => {
            AsyncStorage.removeItem('access_token');
            props.navigation.navigate('Login');
          },
        },
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const renderItem = ({item}) =>
    item.isScreen ? (
      <TouchableOpacity style={styles.cardWrapper} activeOpacity={1}>
        <View style={styles.titleSection}>
          <Image style={{height: 40, width: 40}} source={item.image} />
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
        <View style={styles.screenToggler}>
          <Text style={styles.alwaysOnTxt}>Always On</Text>
          <Switch
            trackColor={{false: theme.lightGray, true: theme.ultraLight}}
            thumbColor={alwaysOn ? theme.darkBrand : theme.gray}
            ios_backgroundColor={alwaysOn ? theme.ultraLight : theme.lightGray}
            onValueChange={() => setScreenMode()}
            value={alwaysOn}
          />
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={styles.cardWrapper}
        activeOpacity={1}
        onPress={() => props.navigation.navigate(item.component)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item.title == 'Customer Grievance' ||
          item.title == 'Customers' ||
          item.title == 'Select Ringtone' ? (
            <View style={styles.img}>
              <Image
                style={{height: 30, width: 30}}
                source={item.image}
                resizeMode="contain"
              />
            </View>
          ) : (
            <Image style={{height: 40, width: 40}} source={item.image} />
          )}

          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
        <AntDesign
          name="right"
          size={20}
          color={theme.gray}
          style={{alignSelf: 'center'}}
        />
      </TouchableOpacity>
    );

  return (
    <>
      <View style={styles.container}>
        <View style={[styles.headerView]}>
          <View
            style={{flexDirection: 'row', marginTop: 25, alignItems: 'center'}}>
            <TouchableOpacity
              style={{marginStart: 10, flexDirection: 'row', width: '75%'}}
              onPress={() => props.navigation.goBack()}>
              <AntDesign name="left" size={25} color={theme.deliverText} />
              <Text style={styles.headerTitle}>Manage Restaurant</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={logOut}>
              <Text style={styles.logOutTxt}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.pageContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{paddingHorizontal: 20}}
            data={DATA}
            contentContainerStyle={{paddingBottom: 30}}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </>
  );
};

export default ManageRestaurant;
