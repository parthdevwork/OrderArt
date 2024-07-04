import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import styles from './styles';
import theme from '../../theme';
import Axios from 'axios';
import ReportFilter from '../../components/ReportFilter';
import {API_URLS} from '../../configs/url';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';

const ReportsScreen = (props) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [pageData, setPageData] = useState({});
  const [fabState, setFabState] = useState({
    open: false,
    value: 0,
    isChange: false,
    options: [
      {
        value: 0,
        text: 'Today',
      },
      {
        value: 1,
        text: 'Last 7 Days',
      },
      {
        value: 2,
        text: 'Last 30 Days',
      },
    ],
  });

  useEffect(() => {
    if (fabState.value == 0) {
      loadReport({
        start_date: moment().format('DD-MM-YYYY'),
        end_date: moment().format('DD-MM-YYYY'),
      });
    } else if (fabState.value == 1) {
      loadReport({
        end_date: moment().format('DD-MM-YYYY'),
        start_date: moment().add(-6, 'days').format('DD-MM-YYYY'),
      });
    } else if (fabState.value == 2) {
      loadReport({
        end_date: moment().format('DD-MM-YYYY'),
        start_date: moment().add(-29, 'days').format('DD-MM-YYYY'),
      });
    }
  }, [fabState.value]);

  loadReport = async (params) => {
    const token = await AsyncStorage.getItem('access_token');

    let headers = {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else return;

    setIsRequesting(true);
    Axios.get(API_URLS.BASE_URL_V2 + 'reports/listing', {
      headers,
      params,
    })
      .then((result) => {
        if (result.status == 200 && result.data && result.data.status == 200) {
          setPageData(result.data.data);
        }
        setIsRequesting(false);
      })
      .catch((error) => {
        setIsRequesting(false);
      });
  };

  return (
    <>
      {isRequesting && <Loader loading={isRequesting} />}
      <View style={styles.container}>
        {/* <View style={styles.headerView}></View> */}
        <View style={styles.pageContainer}>
          <View style={styles.reportSection}>
            <View style={styles.reportSubSection}>
              <View style={styles.reportSubSectionHead}>
                <Image
                  style={styles.reportIconImage}
                  source={require('../../icons/report-order.png')}
                />
                <Text style={styles.reportSubSectionHeadName}>Orders</Text>
              </View>
              <Text style={styles.reportSectionDetailBlock}>
                {(pageData.orders && pageData.orders.count) || '0'}
              </Text>
            </View>
            <View style={styles.reportSubSection}>
              <View style={styles.reportSubSectionHead}>
                <Image
                  style={styles.reportIconImage}
                  source={require('../../icons/report-cost.png')}
                />
                <Text style={styles.reportSubSectionHeadName}>Amount</Text>
              </View>
              <Text style={styles.reportSectionDetailBlock}>
                {pageData.orders && pageData.orders.amount
                  ? '$' + parseFloat(pageData.orders.amount).toFixed(2)
                  : '$0'}
              </Text>
            </View>
          </View>
          <View style={styles.reportSection}>
            <View style={styles.reportSubSection}>
              <View style={styles.reportSubSectionHead}>
                <Image
                  style={styles.reportIconImage}
                  source={require('../../icons/report-reservation.png')}
                />
                <Text style={styles.reportSubSectionHeadName}>Bookings</Text>
              </View>
              <Text style={styles.grievanceReport}>
                <Text
                  style={{color: theme.brand, fontFamily: 'UberMove-Regular'}}>
                  Count{' '}
                </Text>
                {(pageData.reservations && pageData.reservations.count) || '0'}
              </Text>
              <Text style={styles.grievanceReport}>
                <Text style={{color: 'green', fontFamily: 'UberMove-Regular'}}>
                  Guests{' '}
                </Text>
                {(pageData.reservations && pageData.reservations.guests) || '0'}
              </Text>
            </View>
            <View style={styles.reportSubSection}>
              <View style={styles.reportSubSectionHead}>
                <Image
                  style={styles.reportIconImage}
                  source={require('../../icons/report-grievance.png')}
                />
                <Text style={styles.reportSubSectionHeadName}>Grievances</Text>
              </View>
              <Text style={styles.grievanceReport}>
                <Text
                  style={{color: theme.brand, fontFamily: 'UberMove-Regular'}}>
                  Open{' '}
                </Text>
                {(pageData.grievances && pageData.grievances.open) || '0'}
              </Text>
              <Text style={styles.grievanceReport}>
                <Text style={{color: 'green', fontFamily: 'UberMove-Regular'}}>
                  Closed{' '}
                </Text>
                {(pageData.grievances && pageData.grievances.close) || '0'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ReportFilter
        filterState={fabState}
        setFilterState={setFabState}></ReportFilter>
    </>
  );
};

function bindAction(dispatch) {
  return {};
}

const mapStateToProps = (state) => ({
  isRequesting: state.users.isRequesting,
});

const _ReportsScreen = connect(mapStateToProps, bindAction)(ReportsScreen);

export default _ReportsScreen;
