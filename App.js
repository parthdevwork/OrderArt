import React from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  LogBox,
} from 'react-native';
import AppStatusBar from './app/components/AppStatusBar';
import {AppContainer} from './app/Routes';
import theme from './app/theme';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import NotificationSounds, {
  playSampleSound,
} from 'react-native-notification-sounds';

import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from './app/Routes/RootNavigation';
import Axios from 'axios';
import {API_URLS} from './app/configs/url';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';
import {ZohoDeskPortalSDK} from 'react-native-zohodesk-portal-sdk';
LogBox.ignoreAllLogs();
// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  try {
    const sound =
      Platform.OS == 'android'
        ? remoteMessage.notification.android.sound
        : remoteMessage.notification.sound;
    playSampleSound({url: sound});
  } catch (err) {
    console.log(err);
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.messageListener;
    this.bookingSoundObj;
    this.orderSoundObj;
    if (Text.defaultProps == null) Text.defaultProps = {};
    if (TextInput.defaultProps == null) TextInput.defaultProps = {};

    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps.allowFontScaling = false;
  }

  state = {
    notification: {},
    isNotificationAlertVisible: false,
  };

  setNotificationAlertVisible = (visible) => {
    this.setState({isNotificationAlertVisible: visible});
  };

  async componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);

    const keepAwake = await AsyncStorage.getItem('keepAwake');

    if (keepAwake == null || keepAwake == 'true') {
      AsyncStorage.setItem('keepAwake', 'true');
      activateKeepAwake();
    } else {
      deactivateKeepAwake();
    }

    const authStatus = await messaging().requestPermission({
      alert: true,
      sound: true,
      announcement: true,
      criticalAlert: true,
    });

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) console.log('Authorization status:', authStatus);

    messaging()
      .getInitialNotification()
      .then((notification) => {
        this.handleNotificationReceivedInbackground(notification);
      });

    messaging()
      .getToken()
      .then((fcmToken) => {
        AsyncStorage.setItem('fcm_token', fcmToken);
      });

    // Register background handler
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      try {
        const {notification, data} = remoteMessage;
        const notificationData = JSON.parse(data.data);

        this.shownotificationAndPlaySound(data.type, {
          title: notification.title,
          body: notification.body,
          type: notificationData && data.id ? data.type : null,
          id: notificationData && data.id ? data.id : null,
        });
      } catch (err) {
        console.log(err);
      }
    });

    setInterval(() => {
      // order, reservation
      this.checkIfStatusPending();
    }, 10000);

    messaging().onNotificationOpenedApp((notification) => {
      this.handleNotificationReceivedInbackground(notification);
    });

    ZohoDeskPortalSDK.initialise(
      '806613541',
      'edbsn36a0ebdaa6e4c41e6f96c6dd16df50cfedb99c46d699156de143489ed312444c',
      'US',
    );
  }

  checkIfStatusPending = async () => {
    let headers = {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
    };

    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else return;

    Axios.get(API_URLS.BASE_URL_V2 + 'pushnotifications/status', {headers})
      .then((result) => {
        if (result.status == 200 && result.data && result.data.status == 200) {
          let orders = result.data.data.orders || [];
          let bookings = result.data.data.reservations || [];
          let grievances = result.data.data.grievances || [];

          if (orders.length) {
            this.shownotificationAndPlaySound('order');
          } else if (bookings.length) {
            this.shownotificationAndPlaySound('reservation');
          } else if (grievances.length) {
            this.shownotificationAndPlaySound('reservation');
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  shownotificationAndPlaySound = async (notificationType, notificationObj) => {
    let selectedTones = [];
    try {
      const rings =
        (await NotificationSounds.getNotifications('notification')) || [];
      if (Platform.OS === 'ios') {
        rings.forEach((element) => {
          let tomeArray = element.url.split('/');
          if (
            tomeArray[tomeArray.length - 2] == 'New' &&
            tomeArray[tomeArray.length - 3] == 'UISounds'
          ) {
            selectedTones.push(element);
          }
        });
      } else {
        selectedTones = rings;
      }
    } catch (error) {}
    try {
      this.bookingSoundObj = JSON.parse(
        await AsyncStorage.getItem('table_booking_ringtone'),
      );
    } catch (error) {}
    try {
      this.orderSoundObj = JSON.parse(
        await AsyncStorage.getItem('order_booking_ringtone'),
      );
    } catch (error) {}

    let defaultSound1 =
        selectedTones.length > 1 ? selectedTones[0].url : 'default',
      defaultSound2 =
        selectedTones.length > 1 ? selectedTones[1].url : 'default';

    let soundToPlay =
      notificationType == 'order'
        ? (this.orderSoundObj && this.orderSoundObj.url) || defaultSound1
        : notificationType == 'reservation' || notificationType == 'grievance'
        ? (this.bookingSoundObj && this.bookingSoundObj.url) || defaultSound2
        : defaultSound2;

    playSampleSound({
      url: soundToPlay || defaultSound1,
    });

    if (notificationObj) {
      if (this.state.isNotificationAlertVisible) {
        this.setState({
          notification: {},
          isNotificationAlertVisible: false,
        });
      }

      this.setState({
        notification: notificationObj,
        isNotificationAlertVisible: true,
      });
    }
  };

  componentWillUnmount() {
    this.messageListener();
  }

  handleNotificationReceivedInbackground(notification) {
    if (!notification || !notification.data) return;
    const {data} = notification.data;
    const notificationData = JSON.parse(data);

    if (notificationData && notification.data.id) {
      this.moveToRespectiveScreen(notification.data.type, notification.data.id);
    }
  }

  /**
   * redirect on notification
   */
  moveToRespectiveScreen(type, id) {
    switch (type) {
      case 'order':
        RootNavigation.navigate('OrderDetails', {id});
        break;
      case 'grievance':
        RootNavigation.navigate('GrievanceDetails', {id});
        break;
      case 'reservation':
        RootNavigation.navigate('ReservationDetails', {id});
        break;
      default:
    }
  }

  render() {
    return (
      <>
        <SafeAreaView style={{backgroundColor: theme.white}} />
        <SafeAreaView style={{flex: 1, backgroundColor: theme.whiteGray}}>
          <AppContainer />
          {this.state.isNotificationAlertVisible && (
            <View style={styles.centeredView}>
              <View style={styles.mainContainer}>
                <View style={styles.topPart}>
                  <Text style={styles.alertTitleTextStyle}>
                    {this.state.notification.title}
                  </Text>
                </View>
                <View style={styles.middlePart}>
                  <Text style={styles.alertMessageTextStyle}>
                    {this.state.notification.body}
                  </Text>
                </View>
                <View style={styles.bottomPart}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setNotificationAlertVisible(false);
                    }}
                    style={styles.alertMessageButtonStyle}>
                    <Text style={styles.alertMessageButtonTextStyle}>
                      Close
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.notification.id) {
                        this.moveToRespectiveScreen(
                          this.state.notification.type,
                          this.state.notification.id,
                        );
                      }

                      this.setNotificationAlertVisible(false);
                    }}
                    style={styles.alertMessageButtonStyle}>
                    <Text style={styles.alertMessageButtonTextStyle}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  mainContainer: {
    flexDirection: 'column',
    width: '70%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
  },
  topPart: {
    width: '100%',
    minHeight: 50,
    paddingTop: 20,
    paddingEnd: 20,
    paddingStart: 20,
    paddingBottom: 2,
  },
  middlePart: {
    width: '100%',
    minHeight: 50,
    color: '#FFFFFF',
    fontSize: 16,
    paddingTop: 2,
    paddingEnd: 20,
    paddingStart: 20,
    paddingBottom: 20,
  },
  bottomPart: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  alertTitleTextStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 2,
    marginHorizontal: 2,
  },
  alertMessageTextStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  alertMessageButtonStyle: {
    width: '50%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  alertMessageButtonTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(48,173,239)',
  },
});
