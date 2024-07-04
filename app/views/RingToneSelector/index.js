import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Modal,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {
  getSelectedRingTones,
  getRingTones,
  hideModal,
  showModal,
  updateRingToneToServer,
} from '../../redux/actions';
import {playSampleSound} from 'react-native-notification-sounds';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import theme from '../../theme';
import PickerCard from '../../components/PickerCard';

const DATA = [
  {
    id: '1',
    image: require('../../img/table_booking.png'),
    key: 'table_booking_ringtone',
    title: 'Table Booking',
  },
  {
    id: '2',
    image: require('../../img/dish_of_day.png'),
    key: 'order_booking_ringtone',
    title: 'Order Booking',
  },
];

const RingToneSelector = (props) => {
  const [ringtone, selectRingtone] = useState({});
  const [selectRingtoneFor, setSelectRingtoneFor] = useState('');

  useEffect(() => {
    props
      .getRingTones()
      .then()
      .catch((e) => e);
    props
      .getSelectedRingTones()
      .then()
      .catch((e) => e);
  }, []);

  const updateRingTone = async () => {
    props.hideModal();
    await AsyncStorage.setItem(selectRingtoneFor, JSON.stringify(ringtone));
    const data = {
      ringtone_path: ringtone.url,
      for:
        selectRingtoneFor == 'table_booking_ringtone'
          ? 'reservations'
          : 'orders',
    };
    props.updateRingToneToServer(data);
  };

  const renderRingToneItem = ({item}) => (
    <TouchableOpacity
      key={item.title}
      activeOpacity={0.9}
      style={{flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10}}
      onPress={() => {
        playSampleSound(item);
        selectRingtone(item);
      }}>
      <Image
        style={styles.checkImg}
        source={
          ringtone.url == item.url
            ? require('../../img/dish_checked.png')
            : require('../../img/dish_unchecked.png')
        }
      />
      <Text style={{marginLeft: 25}}>{item.title}</Text>
    </TouchableOpacity>
  );

  const ringToneModal = () => (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.isModalVisible}>
      <View style={styles.modalCenteredView}>
        <View style={styles.modalView}>
          <View style={{padding: 20}}>
            <Text style={{fontSize: 18}}>Table booking notifications</Text>
          </View>
          <FlatList
            data={props.ringTones}
            renderItem={renderRingToneItem}
            keyExtractor={(item) => item.title}
          />
          <View style={styles.modalFooter}>
            <TouchableOpacity
              onPress={() => {
                props.hideModal();
              }}>
              <Text style={{fontSize: 17, color: theme.darkBrand}}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() => updateRingTone()}>
              <Text style={{fontSize: 17, color: theme.darkBrand}}>
                SET RINGTONE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderItem = ({item}) => (
    <PickerCard
      image={item.image}
      title={item.title}
      onPress={() => {
        setSelectRingtoneFor(item.key);
        AsyncStorage.getItem(item.key).then((r) => {
          if (r != null) {
            selectRingtone(JSON.parse(r));
            props.showModal();
          } else {
            // if (item.key == 'table_booking_ringtone'){
            // 	console.log('props.selectedRingtones.find((item) => item.for == reservations)', props.selectedRingtones.find((item) => item.for == 'reservations'))
            // } else if(item.key == 'order_booking_ringtone') {
            // 	console.log('props.selectedRingtones.find((item) => item.for == orders)', props.selectedRingtones.find((item) => item.for == 'orders'))
            // } else {
            selectRingtone({});
            props.showModal();
            // }
          }
        });
      }}
    />
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerView}></View> */}
      <View style={styles.pageContainer}>
        <FlatList
          data={DATA}
          contentContainerStyle={{paddingBottom: 30}}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      {ringToneModal()}
    </View>
  );
};

function bindAction(dispatch) {
  return {
    getRingTones: (params) => dispatch(getRingTones(params)),
    getSelectedRingTones: (params) => dispatch(getSelectedRingTones(params)),
    showModal: (params) => dispatch(showModal(params)),
    hideModal: (params) => dispatch(hideModal(params)),
    updateRingToneToServer: (data) => dispatch(updateRingToneToServer(data)),
  };
}

const mapStateToProps = (state) => ({
  isModalVisible: state.ringTones.isModalVisible,
  ringTones: state.ringTones.ringTones,
  selectedRingtones: state.ringTones.selectedRingtones,
});

const _RingToneSelector = connect(
  mapStateToProps,
  bindAction,
)(RingToneSelector);

export default _RingToneSelector;
