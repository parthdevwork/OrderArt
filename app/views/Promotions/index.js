import React, {useState} from 'react';
import {View, Text, ScrollView, Image, Switch} from 'react-native';
import styles from './styles';
import Axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {API_URLS} from '../../configs/url';
import theme from '../../theme';

const Promotions = () => {
  const [promotionData, setPromotionData] = useState([]);

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

    let surchargeList = await Axios.get(API_URLS.BASE_URL_V2 + 'offers', {
      headers,
    });

    if (
      surchargeList.status == 200 &&
      surchargeList.data &&
      surchargeList.data.status == 200
    ) {
      setPromotionData(surchargeList.data.data);
    }
  };

  const toggleSwitch = async (item, value) => {
    let temp = promotionData;
    temp.forEach((e) => {
      if (e.id == item.id) {
        e.status = value == true ? 1 : 0;
      }
    });

    setPromotionData([...temp]);
    const token = await AsyncStorage.getItem('access_token');

    let headers = {
      accept: 'application/json',
      'content-type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else return;

    let result = await Axios.put(
      API_URLS.BASE_URL_V2 + `offers/${item.id}/status`,
      {status: value},
      {headers},
    );
  };

  const renderItem = (item) => (
    <View style={[styles.cardWrapper, styles.shadow]} key={item.id}>
      <View style={styles.slideActionBlock}>
        <View style={styles.slideActionBox}>
          <View style={{flex: 4}}>
            <Text style={styles.surchargeTitle}>{item.promo_code}</Text>
            <View style={styles.surchargeOptionBlock}>
              <View style={styles.surchargeOptionBlock}>
                {item.is_takeaway ? (
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
                {item.online_payment_valid ? (
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
                {item.is_delivery ? (
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
                {item.is_table_ordering ? (
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
                {item.is_fine_dining ? (
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
                {item.cash_on_delivery_valid ? (
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
            <Text style={styles.surchargeDiscription}>
              Valid From {item.valid_from_date} To {item.valid_to_date}
            </Text>
            <View style={styles.surchargeOptionBlock}>
              <View style={styles.surchargeOptionBlock}>
                <Text style={[styles.surchargeOptionText]}>Min Amount: </Text>
                <Text
                  style={[styles.surchargeOptionText, {fontWeight: 'bold'}]}>
                  {(item.min_amount && '$' + item.min_amount) || 'No'}
                </Text>
              </View>
              <View style={[styles.surchargeSpacer]}></View>
              <View style={styles.surchargeOptionBlock}>
                <Text style={[styles.surchargeOptionText]}>Voucher: </Text>
                <Text
                  style={[styles.surchargeOptionText, {fontWeight: 'bold'}]}>
                  {item.is_coupon == 1 ? 'Yes' : 'No'}
                </Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.priceStyle}>
              {item.offer_type != 'per' && '$'}
              {item.offer_amount}
              {item.offer_type == 'per' && '%'}
              {' off'}
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
        {promotionData.length > 0 ? (
          promotionData.map((item) => renderItem(item))
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

export default Promotions;
