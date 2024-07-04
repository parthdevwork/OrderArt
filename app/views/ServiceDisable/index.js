import React, {useEffect, useState} from 'react';
import {connect, useSelector} from 'react-redux';

import {View, Text, Switch} from 'react-native';
import Toast from 'react-native-simple-toast';

import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {
  getQuickDisabledServices,
  getTodayDisabledServices,
  saveTodayThreshold,
  saveQuickDisable,
  saveTodayDisable,
  saveUpdateDelay,
  getTodayThreshold,
  getRestaurantDelay,
} from '../../redux/actions';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../../components/Loader';
import styles from './styles';
import theme from '../../theme';
import colors from '../../theme/colors';
import axios from 'axios';
import {API_URLS} from '../../configs/url';
import AsyncStorage from '@react-native-community/async-storage';

let ServiceDisable = (props) => {
  const [thresHold, setThresHold] = useState('');
  const quickDisabled = useSelector((state) => state.services.quickDisabled);

  useEffect(() => {
    getAllData();
    getThresh();
    getDelay();
  }, [thresHoldValue]);

  const getThresh = async () => {
    const token = await AsyncStorage.getItem('access_token');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_URLS.BASE_URL_V2}${API_URLS.THRESHOLD_DISABLE}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie:
          '_csrf=e8946ff522870777d05e76f4f742c5dd3c2f75e5381ea24185c20ef13161c7d5a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%2252aLO-BSEVO-kjKdUsoa-6FgeA18fxb9%22%3B%7D',
      },
    };

    try {
      const response = await axios.request(config);
      setThresHold(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllData = () => {
    props.getQuickDisabledServices();
    props.getTodayDisabledServices();
    props.getTodayThreshold();
    props.getRestaurantDelay();
  };
  const [isEdit, setIdEdit] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [thresHoldValue, setThresHoldValue] = useState(0);
  const [takeMinutes, setTakeMinutes] = useState(0);
  const [delayMinutes, setDelayMinutes] = useState(0);
  const [delays, setDelays] = useState('');
  console.log('-*-*-*-*-*>', delays?.delivery);
  useEffect(() => {}, [delays.takeaway]);

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
      console.log('***response***', response.data);
      setDelays(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const isTrue = (value) => value == 1;

  const saveThreshold = () => {
    props
      .saveTodayThreshold({
        order_threshold: thresHoldValue,
      })
      .then((res) => {
        setTimeout(() => {
          Toast.showWithGravity(
            res.message || 'Saved sucessfully.',
            Toast.SHORT,
            Toast.CENTER,
          );
        }, 100);
      })
      .catch((err) => {
        setTimeout(() => {
          Toast.showWithGravity(
            err || 'Error in Saving.',
            Toast.SHORT,
            Toast.CENTER,
          );
        }, 100);
      });
  };

  const saveUpdateTakeaway = () => {
    const data = {type: 'takeaway', time: takeMinutes};
    props
      .saveUpdateDelay(data)
      .then((res) => {
        setTimeout(() => {
          Toast.showWithGravity(
            res.message || 'Saved sucessfully.',
            Toast.SHORT,
            Toast.CENTER,
          );
        }, 100);
      })
      .catch((err) => {
        setTimeout(() => {
          Toast.showWithGravity(
            err.message || 'Error in Saving.',
            Toast.SHORT,
            Toast.CENTER,
          );
        }, 100);
      });
  };
  const saveUpdateDelivery = () => {
    const data = {type: 'delivery', time: delayMinutes};
    props
      .saveUpdateDelay(data)
      .then((res) => {
        setTimeout(() => {
          Toast.showWithGravity(
            res.message || 'Saved sucessfully.',
            Toast.SHORT,
            Toast.CENTER,
          );
        }, 100);
      })
      .catch((err) => {
        setTimeout(() => {
          Toast.showWithGravity(
            err.message || 'Error in Saving.',
            Toast.SHORT,
            Toast.CENTER,
          );
        }, 100);
      });
  };

  const saveDelayTake = () => {
    setDelays((prev) => {
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem('access_token');
          let data = new FormData();
          data.append('type', 'takeaway');
          data.append('time', prev.takeaway);

          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.orderart.com.au/restaurants/update-delay',
            headers: {
              Authorization: `Bearer ${token}`,
              Cookie:
                '_csrf=5309587c163eb79e58c0553e7e3d8648bd695faab64fc4386e2b96c3d6467a9da%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22YUy2fWfBcGqeSB_tKzX4yBQ890IsRHr4%22%3B%7D',
            },
            data: data,
          };

          const response = await axios.request(config);
          setTimeout(() => {
            Toast.showWithGravity(
              response.message || 'Saved successfully.',
              Toast.SHORT,
              Toast.CENTER,
            );
          }, 50);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();

      return prev;
    });
  };

  const saveDelayDelivery = async () => {
    setDelays((prev) => {
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem('access_token');
          let data = new FormData();
          data.append('type', 'delivery');
          data.append('time', prev.delivery);

          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.orderart.com.au/restaurants/update-delay',
            headers: {
              Authorization: `Bearer ${token}`,
              Cookie:
                '_csrf=5309587c163eb79e58c0553e7e3d8648bd695faab64fc4386e2b96c3d6467a9da%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22YUy2fWfBcGqeSB_tKzX4yBQ890IsRHr4%22%3B%7D',
            },
            data: data,
          };

          const response = await axios.request(config);
          console.log('***Dilevry***', response.data);
          setTimeout(() => {
            Toast.showWithGravity(
              response.message || 'Saved successfully.',
              Toast.SHORT,
              Toast.CENTER,
            );
          }, 50);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();

      return prev;
    });
  };

  const renderDelays = () => (
    <View style={styles.optionCard}>
      <Heading title={'Delays'} />
      <View style={styles.thresHoldContainer}>
        <Text style={styles.takeDelayTxt}>Takeaway</Text>
        <View style={styles.minutesBox}>
          <Text style={styles.minValue}>
            {delays && delays.takeaway ? delays.takeaway : takeMinutes} min
          </Text>
        </View>
        <>
          <TouchableOpacity
            onPress={() => {
              if (delays.takeaway) {
                setDelays((prev) => ({
                  ...prev,
                  takeaway: Math.max(parseInt(prev.takeaway) - 1, 0),
                }));
                saveDelayTake();
              } else {
                setTakeMinutes((prev) => Math.max(parseInt(prev) - 1, 0));
                saveDelayTake();
              }
            }}
            style={[
              styles.roundBtn,
              {backgroundColor: colors.brand, marginStart: 20},
            ]}>
            <AntDesign name="minus" size={30} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (delays.takeaway) {
                setDelays((prev) => ({
                  ...prev,
                  takeaway: (parseInt(prev.takeaway) || 0) + 1,
                }));
                saveDelayTake();
              } else {
                setTakeMinutes((prev) => (parseInt(prev) || 0) + 1);
                saveDelayTake();
              }
            }}
            style={[
              styles.roundBtn,
              {backgroundColor: '#52c7b9', marginStart: 20},
            ]}>
            <AntDesign name="plus" size={30} color={colors.white} />
          </TouchableOpacity>
        </>
      </View>
      <View style={{borderBottomWidth: 1, borderBottomColor: '#52c7b9'}} />
      <View style={styles.thresHoldContainer}>
        <Text style={styles.takeDelayTxt}>Delivery</Text>
        <View style={styles.minutesBox}>
          <Text style={styles.minValue}>
            {delays && delays.delivery ? delays.delivery : delayMinutes} min
          </Text>
        </View>
        <>
          <TouchableOpacity
            onPress={() => {
              if (delays.delivery) {
                setDelays((prev) => ({
                  ...prev,
                  delivery: Math.max(parseInt(prev.delivery) - 1, 0),
                }));
                saveDelayDelivery();
              } else {
                setDelayMinutes((prev) => Math.max(parseInt(prev) - 1, 0));
                saveDelayDelivery();
              }
            }}
            style={[
              styles.roundBtn,
              {backgroundColor: colors.brand, marginStart: 20},
            ]}>
            <AntDesign name="minus" size={30} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (delays.delivery) {
                setDelays((prev) => ({
                  ...prev,
                  delivery: (parseInt(prev.delivery) || 0) + 1,
                }));
                saveDelayDelivery();
              } else {
                setDelayMinutes((prev) => (parseInt(prev) || 0) + 1);
                saveDelayDelivery();
              }
            }}
            style={[
              styles.roundBtn,
              {backgroundColor: '#52c7b9', marginStart: 20},
            ]}>
            <AntDesign name="plus" size={30} color={colors.white} />
          </TouchableOpacity>
        </>
      </View>
    </View>
  );

  const renderThreshold = () => (
    <View style={styles.optionCard}>
      <Heading title={'Order Threshold'} />
      <View style={styles.thresHoldContainer}>
        <View style={[styles.roundBtn, {backgroundColor: colors.black}]}>
          {!isInput ? (
            <Text style={styles.threshHoldValue}>
              {thresHold && thresHold.order_threshold !== undefined
                ? thresHold.order_threshold
                : thresHoldValue}
            </Text>
          ) : (
            <TextInput
              cursorColor={colors.white}
              value={
                thresHold && thresHold.order_threshold
                  ? thresHold.order_threshold
                  : thresHoldValue
              }
              onChangeText={(txt) => {
                setThresHoldValue(txt);
                setThresHold(txt);
              }}
              style={styles.threshHoldValue}
            />
          )}
        </View>
        {!isEdit ? (
          <TouchableOpacity
            onPress={() => {
              setIdEdit(true);
              setIsInput(true);
            }}>
            <Feather
              name="edit"
              size={30}
              color={colors.brand}
              style={{marginStart: 25}}
            />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                setIdEdit(false);
                setIsInput(false);
              }}
              style={[
                styles.roundBtn,
                {backgroundColor: colors.brand, marginStart: 20},
              ]}>
              <AntDesign name="close" size={30} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIdEdit(false);
                setIsInput(false);
                saveThreshold();
              }}
              style={[
                styles.roundBtn,
                {backgroundColor: '#52c7b9', marginStart: 20},
              ]}>
              <AntDesign name="check" size={30} color={colors.white} />
            </TouchableOpacity>
          </>
        )}
      </View>
      <Text style={styles.thresDescription}>
        * After the limit is reached the online ordering ie take away and
        delivery service will be disabled until midnight today.
      </Text>
    </View>
  );

  const Heading = ({title}) => (
    <View style={{paddingBottom: 10}}>
      <Text style={styles.heading}>{title || ''}</Text>
    </View>
  );

  const toggleSwitch = (key, value, type) => {
    let obj = {};
    if (type == 'todayDisabled') {
      obj[key] = value ? 0 : 1;
      props.saveTodayDisable(obj);

      if (obj[key] == 1) {
        obj[key] = 0;
        props.saveQuickDisable(obj);
      }
    } else {
      obj[key] = value ? 0 : 1;
      props.saveQuickDisable(obj);

      if (obj[key] == 1) {
        obj[key] = 0;
        props.saveTodayDisable(obj);
      }
    }
  };

  const Item = ({title, value, type, apiKey, parentType}) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{title || 'N/A'}</Text>
      <Switch
        trackColor={{false: theme.lightGray, true: theme.ultraLight}}
        thumbColor={value === true ? theme.darkBrand : theme.gray}
        // ios_backgroundColor={theme.ultraLight}
        onValueChange={() => toggleSwitch(apiKey, value, type, parentType)}
        value={value}
      />
    </View>
  );

  const renderDelivery = () => (
    <View style={styles.optionCard}>
      <Heading title={'Delivery'} />
      <Item
        title={'Disable Until Midnight'}
        value={isTrue(props.todayDisabled.delivery_disabled)}
        apiKey={'delivery_disabled'}
        type={'todayDisabled'}
        parentType={'delivery'}
      />
      <Item
        title={'Disable'}
        value={isTrue(props.quickDisabled.delivery_disabled)}
        apiKey={'delivery_disabled'}
        type={'quickDisabled'}
        parentType={'delivery'}
      />
    </View>
  );
  console.log(props.todayDisabled.take_away_disabled);
  const renderTakeAway = () => (
    <View style={styles.optionCard}>
      <Heading title={'Take Away'} />
      <Item
        title={'Disable Until Midnight'}
        value={isTrue(props.todayDisabled.take_away_disabled)}
        apiKey={'take_away_disabled'}
        type={'todayDisabled'}
        parentType={'take_away'}
      />
      <Item
        title={'Disable'}
        value={isTrue(props.quickDisabled.take_away_disabled)}
        apiKey={'take_away_disabled'}
        type={'quickDisabled'}
        parentType={'take_away'}
      />
    </View>
  );

  const renderReservations = () => (
    <View style={styles.optionCard}>
      <Heading title={'Reservations'} />
      <Item
        title={'Disable Until Midnight'}
        value={isTrue(props.todayDisabled.reservation_disabled)}
        apiKey={'reservation_disabled'}
        type={'todayDisabled'}
        parentType={'reservations'}
      />
      <Item
        title={'Disable'}
        value={isTrue(props.quickDisabled.reservation_disabled)}
        apiKey={'reservation_disabled'}
        type={'quickDisabled'}
        parentType={'reservations'}
      />
    </View>
  );

  return (
    <>
      {props.isRequesting && <Loader loading={props.isRequesting} />}
      <View style={styles.container}>
        {/* <View style={styles.headerView}></View> */}
        <ScrollView style={styles.pageContainer}>
          {renderDelays()}
          {renderDelivery()}
          {renderTakeAway()}
          {renderReservations()}
          {renderThreshold()}
        </ScrollView>
      </View>
    </>
  );
};

function bindAction(dispatch) {
  return {
    getQuickDisabledServices: () => dispatch(getQuickDisabledServices()),
    getTodayDisabledServices: () => dispatch(getTodayDisabledServices()),
    getTodayThreshold: () => dispatch(getTodayThreshold()),
    getRestaurantDelay: () => dispatch(getRestaurantDelay()),
    saveTodayThreshold: (data) => dispatch(saveTodayThreshold(data)),
    saveQuickDisable: (data) => dispatch(saveQuickDisable(data)),
    saveTodayDisable: (data) => dispatch(saveTodayDisable(data)),
    saveUpdateDelay: (data) => dispatch(saveUpdateDelay(data)),
  };
}

const mapStateToProps = (state) => ({
  todayDisabled: state.services.todayDisabled,
  quickDisabled: state.services.quickDisabled,
  isRequesting: state.services.isRequesting,
  thresHoldData: state.services.thresHoldData,
  delay: state.services.delay,
});

ServiceDisable = connect(mapStateToProps, bindAction)(ServiceDisable);

export default ServiceDisable;
