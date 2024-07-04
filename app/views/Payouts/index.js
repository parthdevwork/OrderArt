import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import styles from './styles';
import Axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URLS } from '../../configs/url';
import moment from 'moment';
import { LineChart } from 'react-native-chart-kit';
import theme from '../../theme';

const PayoutScreen = (props) => {
  const [payoutsData, setPayoutsData] = useState([]);
  const [balanceData, setBalanceData] = useState({});
  const [chartData, setChartData] = useState({
    labels: ['label'],
    datasets: [
      {
        data: [0],
      },
    ],
  });

  useFocusEffect(
    React.useCallback(() => {
      loadData();
      return () => { };
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

    let payouts = await Axios.get(
      API_URLS.BASE_URL_V2 + 'stripe-payouts?sort=-id',
      { headers },
    );

    if (payouts.status == 200 && payouts.data && payouts.data.status == 200) {
      let tempLabel = [];
      let tempData = [];
      payouts.data.data.forEach((item) => {
        let amount = item.payment_amount.substring(1);
        amount = Math.floor(amount);

        tempData.push(amount);
        tempLabel.push(moment(item.payment_datetime).format('DD MMM'));
      });

      setChartData({
        labels: tempLabel,
        datasets: [
          {
            data: tempData.reverse(),
          },
        ],
      });

      setPayoutsData(payouts.data.data);
    }

    let balance = await Axios.get(
      API_URLS.BASE_URL_V2 + 'stripe-payouts/balance',
      { headers },
    );

    if (
      balance.status == 200 &&
      balance.data &&
      balance.data.status == 200 &&
      balance.data.data &&
      balance.data.data.balance_data
    ) {
      setBalanceData(balance.data.data.balance_data);
    }
  };

  const getFormatedDate = (value) =>
    moment(value).format('YYYY-MM-DD') +
    ' at ' +
    moment(value).format('hh:mmA');

  const renderItem = ({ item }) => (
    <View style={[styles.cardWrapper, styles.shadow]} key={item.id}>
      <View style={styles.slideActionBlock}>
        <View style={styles.slideActionBox}>
          <View style={{ flex: 3 }}>
            <Text style={styles.paymentId}>#{item.id}</Text>
            <Text style={styles.dateDetails}>
              {getFormatedDate(item.payment_datetime)}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.priceStyle}>{item.payment_amount}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerView}></View> */}
      <ScrollView style={styles.pageContainer}>
        <View style={styles.balanceBlock}>
          <View style={[styles.balance, styles.shadow, { marginLeft: 20 }]}>
            <Text style={styles.balanceTitle}>Available Balance</Text>
            <Text style={styles.balanceAmount}>
              {balanceData.available &&
                balanceData.available.length > 0 &&
                balanceData.available[0].amount
                ? '$' + balanceData.available[0].amount / 100
                : '$0.00'}
            </Text>
          </View>
          <View style={[styles.balance, styles.shadow, { marginRight: 20 }]}>
            <Text style={styles.balanceTitle}>Pending Balance</Text>
            <Text style={styles.balanceAmount}>
              {balanceData.pending &&
                balanceData.pending.length > 0 &&
                balanceData.pending[0].amount
                ? '$' + balanceData.pending[0].amount / 100
                : '$0.00'}
            </Text>
          </View>
        </View>
        {payoutsData.length > 1 && (
          <View style={styles.graphBlock}>
            <LineChart
              data={chartData}
              width={Dimensions.get('window').width - 40} // from react-native
              height={200}
              verticalLabelRotation={70}
              yAxisLabel="$"
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              getDotColor={() => theme.brand}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                  stroke: theme.brand,
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        )}
        <Text style={styles.listTitle}>Income History</Text>
        {payoutsData.length > 0 ? (
          payoutsData.map((item) => renderItem({ item }))
        ) : (
          <View style={[styles.cardWrapper, styles.shadow]}>
            <Text style={{ color: '#777', fontFamily: 'UberMove-Bold' }}>
              No record found
            </Text>
          </View>
        )}
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </View>
  );
};

export default PayoutScreen;
