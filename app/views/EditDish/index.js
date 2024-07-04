import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';

import Axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {API_URLS} from '../../configs/url';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';

const EditDish = ({route: {params}}) => {
  const navigation = useNavigation();
  const [multiPrice, setMultiPrice] = useState(false);
  const [priceData, setPriceData] = useState('');

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

    let result = await Axios.get(
      API_URLS.BASE_URL_V2 + `dishes/${params.id}/dish-prices`,
      {headers},
    );

    if (result.status == 200 && result.data && result.data.status == 200) {
      if (result.data.data.multi_size) {
        setPriceData(result.data.data.prices);
      } else {
        setPriceData(result.data.data.price);
      }

      setMultiPrice(result.data.data.multi_size);
    }
  };

  const onSave = async () => {
    const token = await AsyncStorage.getItem('access_token');

    let headers = {
      accept: 'application/json',
      'content-type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else return;

    let data = {
      dish_id: params.id,
    };

    if (multiPrice) {
      data.prices = [];

      priceData.forEach((item) => {
        data.prices.push({
          size_id: item.size.id,
          price: item.price,
        });
      });
    } else {
      data.price = priceData;
    }

    let result = await Axios.post(
      API_URLS.BASE_URL_V2 + `dishes/dish-prices-update`,
      data,
      {headers},
    );

    if (result.status == 200 && result.data.status == 200) {
      Toast.showWithGravity(result.data.message, Toast.SHORT, Toast.CENTER);

      navigation.goBack();
    }
  };

  const onChange = async (value, id) => {
    if (multiPrice) {
      let data = priceData;
      data.forEach((item) => {
        if (item.size.id == id) {
          item.price = value;
        }
      });

      return setPriceData(data);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerView}></View> */}
      <ScrollView
        style={styles.pageContainer}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}>
        <View style={[styles.cardWrapper, styles.shadow]}>
          <View style={styles.inputWrapper}>
            {multiPrice &&
              typeof priceData == 'object' &&
              priceData.length &&
              priceData.map((item) => (
                <View style={{marginBottom: 5}} key={item.size.id}>
                  <FloatingLabelInput
                    keyboardType={'numeric'}
                    onChangeText={(text) => onChange(text, item.size.id)}
                    label={item.size.title}
                    secureTextEntry={false}
                    autoCapitalize="none"
                    defaultValue={item.price}
                    key={item.size.id}
                  />
                </View>
              ))}
            {!multiPrice && typeof priceData == 'string' && (
              <View>
                <FloatingLabelInput
                  keyboardType={'numeric'}
                  onChangeText={(text) => setPriceData(text)}
                  label={'Price'}
                  secureTextEntry={false}
                  autoCapitalize="none"
                  defaultValue={priceData}
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            style={[styles.saveButton, styles.shadow]}
            onPress={onSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditDish;
