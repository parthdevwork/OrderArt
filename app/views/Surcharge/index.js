import React, {useState} from 'react';
import {View, Text, ScrollView, Image, Switch} from 'react-native';
import styles from './styles';
import Axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {API_URLS} from '../../configs/url';
import theme from '../../theme';

const Surcharges = () => {
  const [surchargeData, setSurchargeData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
      return () => {};
    }, []),
  );

  const loadData = async () => {
    const token = await AsyncStorage.getItem('access_token');

    let headers = {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else return;

    let surchargeList = await Axios.get(
      API_URLS.BASE_URL_V2 + 'global-surcharges',
      {headers},
    );

    if (
      surchargeList.status == 200 &&
      surchargeList.data &&
      surchargeList.data.status == 200
    ) {
      setSurchargeData(surchargeList.data.data);
    }
  };

  const toggleSwitch = async (item, value) => {
    let temp = surchargeData;
    temp.forEach((e) => {
      if (e.id == item.id) {
        e.status = value == true ? 1 : 0;
      }
    });
    setSurchargeData([...temp]);

    const token = await AsyncStorage.getItem('access_token');

    let headers = {
      accept: 'application/json',
      'content-type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else return;

    await Axios.put(
      API_URLS.BASE_URL_V2 + `global-surcharges/${item.id}/status`,
      {status: value ? 1 : 0},
      {headers},
    );
  };

  const renderItem = (item) => (
    <View style={[styles.cardWrapper, styles.shadow]} key={item.id}>
      <View style={styles.slideActionBlock}>
        <View style={styles.slideActionBox}>
          <View style={{flex: 3}}>
            <Text style={styles.surchargeTitle}>{item.charge_name}</Text>
            <View style={styles.surchargeOptionBlock}>
              <View style={styles.surchargeOptionBlock}>
                {item.is_takeaway == 1 ? (
                  <Image
                    style={styles.surchargeOptionIcon}
                    source={require('../../icons/checked.png')}
                  />
                ) : (
                  <Image
                    style={styles.surchargeOptionIcon}
                    source={require('../../icons/cancel.png')}
                  />
                )}
                <Text style={[styles.surchargeOptionText, {width: 70}]}>
                  {' '}
                  Takeaway
                </Text>
              </View>
              <View style={styles.surchargeOptionBlock}>
                {item.is_online_payment == 1 ? (
                  <Image
                    style={styles.surchargeOptionIcon}
                    source={require('../../icons/checked.png')}
                  />
                ) : (
                  <Image
                    style={styles.surchargeOptionIcon}
                    source={require('../../icons/cancel.png')}
                  />
                )}
                <Text style={styles.surchargeOptionText}> Online Payment</Text>
              </View>
            </View>
            <View style={styles.surchargeOptionBlock}>
              <View style={styles.surchargeOptionBlock}>
                {item.is_delivery == 1 ? (
                  <Image
                    style={styles.surchargeOptionIcon}
                    source={require('../../icons/checked.png')}
                  />
                ) : (
                  <Image
                    style={styles.surchargeOptionIcon}
                    source={require('../../icons/cancel.png')}
                  />
                )}
                <Text style={[styles.surchargeOptionText, {width: 70}]}>
                  {' '}
                  Delivery
                </Text>
              </View>
              <View style={styles.surchargeOptionBlock}>
                {item.is_table_ordering == 1 ? (
                  <Image
                    style={styles.surchargeOptionIcon}
                    source={require('../../icons/checked.png')}
                  />
                ) : (
                  <Image
                    style={styles.surchargeOptionIcon}
                    source={require('../../icons/cancel.png')}
                  />
                )}
                <Text style={styles.surchargeOptionText}> Table Ordering</Text>
              </View>
            </View>
            <View style={styles.surchargeOptionBlock}>
              <View style={styles.surchargeOptionBlock}>
                {item.is_dining == 1 ? (
                  <Image
                    style={styles.surchargeOptionIcon}
                    source={require('../../icons/checked.png')}
                  />
                ) : (
                  <Image
                    style={styles.surchargeOptionIcon}
                    source={require('../../icons/cancel.png')}
                  />
                )}
                <Text style={[styles.surchargeOptionText, {width: 70}]}>
                  {' '}
                  Dining
                </Text>
              </View>
              <View style={styles.surchargeOptionBlock}>
                {item.is_cod == 1 ? (
                  <Image
                    style={styles.surchargeOptionIcon}
                    source={require('../../icons/checked.png')}
                  />
                ) : (
                  <Image
                    style={styles.surchargeOptionIcon}
                    source={require('../../icons/cancel.png')}
                  />
                )}
                <Text style={styles.surchargeOptionText}>
                  {' '}
                  Cash on Delivery
                </Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.priceStyle}>
              +{item.type != 'percentage' && ' $'}
              {item.value}
              {item.type == 'percentage' && '%'}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Switch
              trackColor={{false: theme.lightGray, true: theme.ultraLight}}
              thumbColor={item.status == 1 ? theme.darkBrand : theme.gray}
              ios_backgroundColor={
                item.status == 1 ? theme.ultraLight : theme.lightGray
              }
              onValueChange={(value) => {
                toggleSwitch(item, value);
              }}
              value={item.status == 1}
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerView}></View> */}
      <ScrollView style={styles.pageContainer}>
        {surchargeData.length > 0 ? (
          surchargeData.map((item) => renderItem(item))
        ) : (
          <View
            style={[
              styles.cardWrapper,
              styles.shadow,
              {alignItems: 'center', justifyContent: 'center'},
            ]}>
            <Text style={{color: '#777', fontFamily: 'UberMove-Bold'}}>
              No record found
            </Text>
          </View>
        )}
        <View style={{height: 50}}></View>
      </ScrollView>
    </View>
  );
};

export default Surcharges;
