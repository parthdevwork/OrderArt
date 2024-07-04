import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Alert,
  BackHandler,
  Dimensions,
  Platform,
  ScrollView,
  RefreshControl,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {connect, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Carousel from 'react-native-snap-carousel';
import {setToken, clearOrders, getRestaurant} from '../../redux/actions';
import styles from './styles';
import {API_URLS} from '../../configs/url';
import Axios from 'axios';

import {
  ZohoDeskPortalSDK,
  ZDPortalHome,
} from 'react-native-zohodesk-portal-sdk';
import colors from '../../theme/colors';
import theme from '../../theme';
import axios from 'axios';
const _renderItem = ({item}) => {
  return (
    <View style={styles.slide}>
      <View style={styles.slideTitleContainer}>
        <Text style={styles.slideTitle}>{item.title}</Text>
      </View>
      {item.index == 0 && (
        <View style={styles.slideActionBlock}>
          <View style={styles.slideActionBox}>
            <View style={{flex: 1}}>
              <Text style={styles.slideDetailTitleText}>Today </Text>
              <Text style={styles.slideDetailTitleValue}>
                $
                {item.data.today && item.data.today.amount
                  ? item.data.today.amount
                  : '0.00'}
              </Text>
              <Text style={styles.slideDetailTitleSubValue}>
                {item.data.today && item.data.today.total
                  ? item.data.today.total
                  : 0}{' '}
                Deliveries
              </Text>
              <Text style={styles.slideDetailTitleDisc}>
                {/* {item.data.today && item.data.today.delivery
                  ? item.data.today.delivery
                  : 0}{' '}
                Deliveries |{' '} */}
                {item.data.today && item.data.today.takeaway
                  ? item.data.today.takeaway
                  : 0}{' '}
                Pickups
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.slideDetailTitleText}>This Week</Text>
              <Text style={styles.slideDetailTitleValue}>
                $
                {item.data.week && item.data.week.amount
                  ? item.data.week.amount
                  : '0.00'}
              </Text>
              <Text style={styles.slideDetailTitleSubValue}>
                {/* {item.data.week && item.data.week.total
                  ? item.data.week.total
                  : 0}{' '}
                Orders */}
                {item.data.week && item.data.week.delivery
                  ? item.data.week.delivery
                  : 0}{' '}
                Deliveries
              </Text>
              <Text style={styles.slideDetailTitleDisc}>
                {/* {item.data.week && item.data.week.delivery
                  ? item.data.week.delivery
                  : 0}{' '}
                Deliveries |{' '} */}
                {item.data.week && item.data.week.takeaway
                  ? item.data.week.takeaway
                  : 0}{' '}
                Pickups
              </Text>
            </View>
          </View>
        </View>
      )}
      {item.index == 1 && (
        <View style={styles.slideActionBlock}>
          <View style={styles.slideActionBox}>
            <View style={{flex: 1}}>
              <Text style={styles.slideDetailTitleText}>Today</Text>
              <Text style={styles.slideDetailTitleValue}>
                $
                {item.data.today && item.data.today.amount
                  ? item.data.today.amount
                  : '0.00'}
              </Text>
              <Text style={styles.slideDetailTitleSubValue}>
                {item.data.today && item.data.today.total
                  ? item.data.today.total
                  : 0}{' '}
                Orders
              </Text>
              <Text style={styles.slideDetailTitleDisc}>
                {item.data.today && item.data.today.dine_in
                  ? item.data.today.dine_in
                  : 0}{' '}
                Dine-in |{' '}
                {item.data.today && item.data.today.delivery
                  ? item.data.today.delivery
                  : 0}{' '}
                Deliveries |
              </Text>
              <Text style={styles.slideDetailTitleDisc}>
                {item.data.today && item.data.today.takeaway
                  ? item.data.today.takeaway
                  : 0}{' '}
                Pickups
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.slideDetailTitleText}>This Week</Text>
              <Text style={styles.slideDetailTitleValue}>
                $
                {item.data.week && item.data.week.amount
                  ? item.data.week.amount
                  : '0.00'}
              </Text>
              <Text style={styles.slideDetailTitleSubValue}>
                {item.data.week && item.data.week.total
                  ? item.data.week.total
                  : 0}{' '}
                Orders {/* 217 Orders */}
              </Text>
              <Text style={styles.slideDetailTitleDisc}>
                {item.data.week && item.data.week.dine_in
                  ? item.data.week.dine_in
                  : 0}{' '}
                Dine-in
                {/* 217 Dine-in |{' '} */}
                {item.data.week && item.data.week.delivery
                  ? item.data.week.delivery
                  : 0}{' '}
                | Deliveries |
              </Text>
              <Text style={styles.slideDetailTitleDisc}>
                {item.data.week && item.data.week.takeaway
                  ? item.data.week.takeaway
                  : 0}{' '}
                Pickups
                {/* 217 Pickups */}
              </Text>
            </View>
          </View>
        </View>
      )}
      {item.index == 2 && (
        <View style={styles.slideActionBlock}>
          <View style={styles.slideActionBox}>
            <View style={{flex: 1}}>
              <Text style={styles.slideDetailTitleText}>BOOKINGS TODAY</Text>
              <Text style={styles.slideDetailTitleValue}>
                {item.data.today && item.data.today.total
                  ? item.data.today.total
                  : 0}
              </Text>
              <Text style={styles.slideDetailTitleDisc}>
                {item.data.today && item.data.today.ivr
                  ? item.data.today.ivr
                  : 0}{' '}
                Chat |{' '}
                {item.data.today && item.data.today.website
                  ? item.data.today.website
                  : 0}{' '}
                Website
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.slideDetailTitleText}>
                Bookings This Week
              </Text>
              <Text style={styles.slideDetailTitleValue}>
                {item.data.week && item.data.week.total
                  ? item.data.week.total
                  : 0}
              </Text>
              <Text style={styles.slideDetailTitleDisc}>
                {item.data.week && item.data.week.ivr ? item.data.week.ivr : 0}{' '}
                Chat |{' '}
                {item.data.week && item.data.week.website
                  ? item.data.week.website
                  : 0}{' '}
                Website
              </Text>
            </View>
          </View>
        </View>
      )}
      {item.index == 3 && (
        <View style={styles.slideActionBlock}>
          <View style={styles.slideActionBox}>
            <View style={{flex: 1}}>
              <Text style={styles.slideDetailTitleText}>Today </Text>
              <Text style={styles.slideDetailTitleValue}>
                $
                {item.data.today && item.data.today.amount
                  ? item.data.today.amount
                  : '0.00'}
              </Text>
              <Text style={styles.slideDetailTitleSubValue}>
                {item.data.today && item.data.today.total
                  ? item.data.today.total
                  : 0}{' '}
                Orders
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.slideDetailTitleText}>This Week</Text>
              <Text style={styles.slideDetailTitleValue}>
                ${' '}
                {item.data.week && item.data.week.amount
                  ? item.data.week.amount
                  : '0.00'}
              </Text>
              <Text style={styles.slideDetailTitleSubValue}>
                {item.data.week && item.data.week.total
                  ? item.data.week.total
                  : 0}{' '}
                Orders
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const _renderText = ({item}) => {
  return (
    <View style={{}}>
      <Text
        style={[
          {
            marginHorizontal: 5,
            fontSize: Platform.OS === 'ios' ? 18 : 14,
            fontWeight: 'bold',
          },
          {color: theme.blue},
        ]}>
        {item.title}
      </Text>
      <View style={styles.whatsContainer}>
        <Text style={styles.whatsText}>{item.description}</Text>
      </View>
    </View>
  );
};
const Dashboard = (props) => {
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [refreshing, setRefreshing] = useState(false);
  const [delays, setDelays] = useState('');
  const [sliderData, setSliderData] = useState([
    {
      index: 0,
      icon: require('../../icons/trolley.png'),
      title: 'Website Orders',
      data: {},
    },
    {
      index: 1,
      icon: require('../../icons/online-order.png'),
      title: 'POS Orders',
      data: {},
    },
    {
      index: 2,
      icon: require('../../icons/report-reservation.png'),
      title: 'Reservations',
      data: {},
    },
    {
      index: 3,
      icon: require('../../icons/dinning-table.png'),
      title: 'Table Orders',
      data: {},
    },
  ]);
  const [sliderTextData, setSliderTextData] = useState('');
  const [alertData, setAlertData] = useState();
  const [deliveryData, setDeliveryData] = useState({});

  const quickDisabled = useSelector((state) => state.services.quickDisabled);
  const todayDisabled = useSelector((state) => state.services.todayDisabled);
  const resaturantdetails = useSelector(
    (state) => state.restaurants.restaurantDetails,
  );

  useEffect(() => {
    props.getRestaurant();
  }, []);
  // const reservationDisabled = useSelector(
  //   (state) => state.services.reservationDisabled,
  // );
  // const helo = useSelector((state) => state.restaurants.restaurantDetails);

  let disabledServices = [];

  const disabledServicesLabel = disabledServices.join(' and ');
  const getDelay = async () => {
    const token = await AsyncStorage.getItem('access_token');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_URLS.BASE_URL_V2}${API_URLS.RESTAURANT_DELAY}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie:
          '_csrf=e8946ff522870777d05e76f4f742c5dd3c2f75e5381ea24185c20ef13161c7d5a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%2252aLO-BSEVO-kjKdUsoa-6FgeA18fxb9%22%3B%7D',
      },
    };

    try {
      const response = await axios.request(config);
      setDelays(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  Dimensions.addEventListener('change', () => {
    setWidth(Dimensions.get('window').width);
  });

  useEffect(() => {
    const WhatsNew = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.orderart.com.au//mobile-dashboard/get-system-messages',
        headers: {
          Authorization: 'Bearer QqyfGpUDTkqAISiwZF7ObyWeKl8F9ej_',
          Cookie:
            '_csrf=e8759a57b0ce1130c6b5ca8b26994c6a32b48e081c82b1435af8eb710a659afca%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22p2JSwxlZIdCXtx_19E6YpN25t0S5zds8%22%3B%7D',
        },
      };

      axios
        .request(config)
        .then((response) => {
          const CheckAlert = JSON.parse(JSON.stringify(response.data));

          setSliderTextData(CheckAlert);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    WhatsNew();
  }, []);

  useEffect(() => {
    const Alert = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.orderart.com.au/mobile-dashboard/get-fail-delivery-count?restaurant_id=${resaturantdetails?.resid}`,
        headers: {
          Authorization: 'Bearer QqyfGpUDTkqAISiwZF7ObyWeKl8F9ej_',
          Cookie:
            '_csrf=ab97215ebe5c73c22c21bf77381e8d25f13e4374f39d87f817caa8ce3f081639a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22bIlk3M3sofDcfsZEyS1UMwn65eyHWZYo%22%3B%7D',
        },
      };

      axios
        .request(config)
        .then((response) => {
          setAlertData(response.data.data[0].fail_del_count);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    Alert();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      props.clearOrders();

      // get delivery data counts
      getDeliveryData();
      // get delivery data counts in every 30 sec
      const interval = setInterval(async () => {
        getDeliveryData();
      }, 30000);

      loadSliderData();
      return () => {
        clearInterval(interval);
      };
    }, []),
  );

  useEffect(() => {
    getDelay();
  }, [delays]);

  const loadSliderData = async () => {
    const token = await AsyncStorage.getItem('access_token');
    console.log('**-*-*-*->', token);
    let headers = {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else return;

    let tempSliderData = [...sliderData];
    let reservation = await Axios.get(
      API_URLS.BASE_URL_V2 + 'mobile-dashboard/reservations',
      {headers},
    );
    let pos = await Axios.get(
      API_URLS.BASE_URL_V2 + 'mobile-dashboard/pos-orders',
      {headers},
    );
    let website = await Axios.get(
      API_URLS.BASE_URL_V2 + 'mobile-dashboard/website-orders',
      {headers},
    );
    let tableOrder = await Axios.get(
      API_URLS.BASE_URL_V2 + 'mobile-dashboard/table-orders',
      {headers},
    );

    if (
      reservation.status == 200 &&
      reservation.data &&
      reservation.data.status == 200
    ) {
      tempSliderData[2].data = reservation.data.data;
    }
    if (pos.status == 200 && pos.data && pos.data.status == 200) {
      tempSliderData[1].data = pos.data.data;
    }
    if (website.status == 200 && website.data && website.data.status == 200) {
      tempSliderData[0].data = website.data.data;
    }
    if (
      tableOrder.status == 200 &&
      tableOrder.data &&
      tableOrder.data.status == 200
    ) {
      tempSliderData[3].data = tableOrder.data.data;
    }

    setSliderData(tempSliderData);
    setRefreshing(false);
  };

  const getDeliveryData = async () => {
    const token = await AsyncStorage.getItem('access_token');

    let headers = {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else return;

    let deliveryData = await Axios.get(
      API_URLS.BASE_URL_V2 + 'doordash-logs/summary',
      {headers},
    );

    if (deliveryData.status == 200 && deliveryData?.data?.status == 200) {
      setDeliveryData(deliveryData.data.data);
    }
  };

  const getFCMToken = () => {
    AsyncStorage.getItem('fcm_token').then((token) => {
      if (token) {
        let deviceInfo = {
          app_version: DeviceInfo.getVersion(),
          uuid: DeviceInfo.getUniqueId(),
          model: DeviceInfo.getModel(),
          os_version: DeviceInfo.getSystemVersion(),
          registration_id: token,
          platform: Platform.OS,
        };
        DeviceInfo.getManufacturer().then((value) => {
          deviceInfo.manufacturer = value;
        });
        DeviceInfo.getDeviceName().then((value) => {
          deviceInfo.device_name = value;
        });
        DeviceInfo.getDeviceName().then((value) => {
          deviceInfo.device_name = value;
        });
        props.setToken(deviceInfo);
      }
    });
  };
  const customerGrievancesImg = require('../../img/customer_grievances.png');
  const dishDisableImg = require('../../img/dish_disable.png');
  const action = (component, img, titleName, width) => {
    return (
      <View>
        <TouchableOpacity
          style={{...styles.action, width: width * 0.17, height: width * 0.17}}
          onPress={() => props.navigation.navigate(component)}>
          <Image
            style={[
              styles.actionImg,
              {
                backgroundColor:
                  img === customerGrievancesImg || img === dishDisableImg
                    ? 'white'
                    : colors.black,
                borderRadius:
                  img === customerGrievancesImg || img === dishDisableImg
                    ? 50
                    : 0,
              },
            ]}
            source={img}
          />
        </TouchableOpacity>
        <Text style={styles.actionText}>{titleName}</Text>
      </View>
    );
  };

  const actions = () => {
    return (
      <View style={styles.actionBlock}>
        <View style={styles.actionBox}>
          <View>
            {action(
              'Orders',
              require('../../icons/shopping-bag.png'),
              'Orders',
              width,
            )}

            {action(
              'IvrGreetings',
              require('../../icons/voice-search.png'),
              'IVR Greetings',
              width,
            )}

            {action(
              'Marketing',
              require('../../icons/price-up.png'),
              'Marketing',
              width,
            )}
          </View>
          <View>
            {action(
              'Reservations',
              require('../../icons/reception-1.png'),
              'Bookings',
              width,
            )}
            {action(
              'Payouts',
              require('../../icons/hand.png'),
              'Payouts',
              width,
            )}
            {action(
              'Reports',
              require('../../icons/news.png'),
              'Reports',
              width,
            )}
          </View>
          <View>
            {action(
              'camping',
              require('../../img/camping.png'),
              'Campaigns',
              width,
            )}
            {action(
              'ServiceDisable',
              require('../../icons/new_disable.png'),
              'Services',
              width,
            )}
            {action(
              'DishOptions',
              require('../../icons/dish_disable1.png'),
              'Products',
              width,
            )}
          </View>
          <View>
            {/* {action(
              'camping',
              require('../../img/camping.png'),
              'Campaigns',
              width,
            )} */}
            {action(
              'Customers',
              require('../../img/info.png'),
              'Customers',
              width,
            )}
            {action(
              'Grievance',
              require('../../icons/reception.png'),
              'Grievances',
              width,
            )}
            {action(
              'ManageRestaurant',
              require('../../icons/planning.png'),
              'Manage',
              width,
            )}
          </View>
        </View>
      </View>
    );
  };

  const setZohoUser = async () => {
    const token = await AsyncStorage.getItem('access_token');

    ZohoDeskPortalSDK.isUserSignedIn((isSignedIn) => {
      if (!isSignedIn) {
        ZohoDeskPortalSDK.setUserToken(
          token,
          (msg) => {
            console.log('Success Alert ' + msg);
          },
          (error) => {
            console.log('Failure Alert ' + error);
          },
        );
      } else {
        console.log('User is already signed in');
      }
    });
  };

  const renderDisabledService = (
    serviceName,
    quickDisabledFlag,
    todayDisabledFlag,
  ) => {
    if (quickDisabledFlag === 1 || todayDisabledFlag === 1) {
      return (
        <Text style={styles.disabledServiceDetailsText}>
          {serviceName} (disabled
          {todayDisabledFlag === 1 ? ' until midnight' : ''})
        </Text>
      );
    }
    return null;
  };

  useEffect(() => {
    getFCMToken();

    const backAction = () => {
      let isFocused = props.navigation.isFocused();
      if (!isFocused) return;

      Alert.alert('Hold on!', 'Are you sure you want to exit app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    setZohoUser();
    return () => backHandler.remove();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    getDelay();
    loadSliderData();
    // wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground style={styles.backgroundImg}>
        <View
          style={{
            marginHorizontal: 25,
            marginTop: Platform.OS === Platform ? 1 : 10,
          }}>
          <Text
            style={{
              // fontSize: 23,
              fontSize: Platform.OS === 'ios' ? 23 : 18,
              color: theme.darkestGray,
              fontWeight: 'bold',
            }}>
            {resaturantdetails?.resname}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                // fontSize: 18,
                fontSize: Platform.OS === 'ios' ? 18 : 13,
                color: theme.deliverType,
                fontWeight: 'bold',
              }}>
              powered by Orderart
            </Text>
            <TouchableOpacity
              style={styles.headerRightMenu}
              onPress={() => {
                ZDPortalHome.show();
              }}>
              <Image
                style={[
                  {...styles.leftHeaderIcon},
                  {
                    marginTop: -20,
                    alignSelf: 'flex-end',
                  },
                ]}
                source={require('../../icons/helpline1.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{marginHorizontal: 25}}>
            <View style={styles.alertContainer}>
              <Text style={[styles.deliveryAlerts, {width: '45%'}]}>
                Delivery Alerts
              </Text>

              <Text style={styles.deliveryAlerts}>Delays (min)</Text>
            </View>
            <View style={styles.AlertButton}>
              <View style={styles.alertIcons}>
                <Image
                  source={require('../../icons/alert_icons.png')}
                  style={{height: 30, width: 30}}
                />
                {alertData < 1 ? (
                  <Text
                    style={[
                      styles.deliveryAlerts,
                      {marginLeft: 20, color: 'white'},
                    ]}>
                    No Alert
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.deliveryAlerts,
                      {marginLeft: 20, color: 'white'},
                    ]}>
                    {}
                    {''} Failed
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={[
                  styles.delayContainer,
                  {paddingLeft: 20, paddingRight: 20},
                ]}
                onPress={() => props.navigation.navigate('ServiceDisable')}>
                <Image
                  source={require('../../icons/delivery.png')}
                  style={{height: 30, width: 30}}
                />
                <Text
                  style={[
                    styles.deliveryAlerts,
                    {color: 'green', paddingLeft: 3},
                  ]}>
                  {delays && delays.delivery ? delays.delivery : 0}
                </Text>
                <Text
                  style={[
                    styles.deliveryAlerts,
                    {color: 'green', paddingLeft: 3},
                  ]}>
                  min
                </Text>
                <Image
                  source={require('../../icons/paper-bag.png')}
                  style={{height: 20, width: 20, marginLeft: 13}}
                />
                <Text
                  style={[
                    styles.deliveryAlerts,
                    {color: 'green', paddingLeft: 3},
                  ]}>
                  {delays && delays.takeaway ? delays.takeaway : 0}
                </Text>
                <Text
                  style={[
                    styles.deliveryAlerts,
                    {color: 'green', paddingLeft: 3, paddingRight: 6},
                  ]}>
                  min
                </Text>
              </TouchableOpacity>
            </View>

            {quickDisabled.delivery_disabled ||
            quickDisabled.reservation_disabled ||
            quickDisabled.take_away_disabled ||
            todayDisabled.delivery_disabled ||
            todayDisabled.reservation_disabled ||
            todayDisabled.take_away_disabled ? (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ServiceDisable')}
                style={styles.picked_upContainer}>
                <Text style={styles.disabledServicesText}>
                  Services Disabled
                </Text>
                {renderDisabledService(
                  'Delivery',
                  quickDisabled.delivery_disabled,
                  todayDisabled.delivery_disabled,
                )}
                {renderDisabledService(
                  'Reservation',
                  quickDisabled.reservation_disabled,
                  todayDisabled.reservation_disabled,
                )}
                {renderDisabledService(
                  'Take Away',
                  quickDisabled.take_away_disabled,
                  todayDisabled.take_away_disabled,
                )}
              </TouchableOpacity>
            ) : null}

            <Text style={[styles.summary]}>Summary</Text>
          </View>
          <View style={styles.sliderBlock}>
            <Carousel
              data={sliderData}
              renderItem={_renderItem}
              sliderWidth={width}
              itemWidth={
                Platform.OS === Platform
                  ? width - width / 3.5
                  : width - width / 3
              }
              // autoplay={true} // Enable autoplay
              // autoplayInterval={5000} // Set autoplay interval in milliseconds
            />
          </View>
          <Text style={styles.deliverText}>Deliveries</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Deliveries')}>
            <View style={styles.deliveryCard}>
              <View style={styles.delivaryActionBox}>
                {/* <Image
                  style={{width: 35, height: 35}}
                  source={require('../../icons/tracking.png')}
                /> */}
                <View style={styles.delivaryTypes}>
                  <Text style={styles.delivaryActionText}>Delivered</Text>
                  <Text style={[styles.delivaryActionNumber, {fontSize: 14}]}>
                    {deliveryData.delivered || 0}
                  </Text>
                </View>
                <View style={styles.delivaryTypes}>
                  <Text style={styles.delivaryActionText}>In Transit</Text>
                  <Text style={[styles.delivaryActionNumber, {fontSize: 14}]}>
                    {deliveryData.picked_up || 0}
                  </Text>
                </View>
                <View style={styles.delivaryTypes}>
                  <Text style={styles.delivaryActionText}>Not Allocated</Text>
                  <Text style={[styles.delivaryActionNumber, {fontSize: 14}]}>
                    {deliveryData.scheduled || 0}
                  </Text>
                </View>
                <View style={styles.delivaryTypes}>
                  <Text style={styles.delivaryActionText}>Cancelled</Text>
                  <Text style={[styles.delivaryActionNumber, {fontSize: 14}]}>
                    {deliveryData.cancelled || 0}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <Carousel
            data={sliderTextData.data}
            renderItem={_renderText}
            sliderWidth={width}
            itemWidth={width - width / 9}
            autoplay={true}
            autoplayInterval={5000}
            loop={true}
          />

          {actions()}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

function bindAction(dispatch) {
  return {
    getRestaurant: () => dispatch(getRestaurant()),
    setToken: (params) => dispatch(setToken(params)),
    clearOrders: (params) => dispatch(clearOrders(params)),
  };
}

const mapStateToProps = (state) => ({});

const DashboarScreen = connect(mapStateToProps, bindAction)(Dashboard);

export default DashboarScreen;
