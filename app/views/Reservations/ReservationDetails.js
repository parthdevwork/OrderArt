import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, Alert, Modal} from 'react-native';

import Loader from '../../components/Loader';
import {connect} from 'react-redux';
import {
  getSingleReservation,
  markReservationViewed,
  acceptReservation,
  rejectReservation,
  completeReservation,
  printReservation,
} from '../../redux/actions';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import theme from '../../theme';
import colors from '../../theme/colors';

let ReservationsDetails = (props) => {
  const [showPrintModal, setPrintModalState] = useState(false);
  const [printCount, setPrintCount] = useState(1);
  const reservationId = props.route.params.id;
  const {reservation} = props;

  useEffect(() => {
    props.getSingleReservation(reservationId);
    props.markReservationViewed(reservationId);

    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setPrintModalState(true);
          }}>
          <Image
            source={require('../../img/printer.png')}
            style={{height: 25, width: 25, marginRight: 20}}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const print = () => {
    setPrintModalState(false);
    const params = {print_copies: printCount};

    props.printReservation(reservationId, params).then(
      (res) => {
        setTimeout(() => {
          Toast.showWithGravity(res.message, Toast.SHORT, Toast.CENTER);
        }, 500);
      },
      (err) => {
        Toast.showWithGravity(
          'Something went wrong',
          Toast.SHORT,
          Toast.CENTER,
        );
      },
    );
  };

  const printOptionModal = () => (
    <Modal
      animationType="none"
      transparent={true}
      visible={showPrintModal}
      onRequestClose={() => {
        setPrintModalState(false);
      }}>
      <View style={styles.modalCenteredView}>
        <View style={styles.modalView}>
          <View style={styles.printModalHeader}>
            <TouchableOpacity
              onPress={() => setPrintModalState(false)}
              style={{position: 'absolute', marginLeft: 20}}>
              <Image
                source={require('../../img/close.png')}
                style={{height: 18, width: 18}}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 22,
                color: '#fff',
                alignSelf: 'center',
                fontFamily: 'UberMove-Bold',
              }}>
              Select Print Count
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginVertical: 30,
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.counterBtn}
              onPress={() =>
                setPrintCount(printCount > 1 ? printCount - 1 : 1)
              }>
              <Text>-</Text>
            </TouchableOpacity>

            <Text style={styles.counterValue}>{printCount}</Text>

            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.counterBtn}
              onPress={() => setPrintCount(printCount + 1)}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.printModalFooter}>
            <TouchableOpacity onPress={() => setPrintModalState(false)}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'UberMove-Regular',
                  color: colors.black,
                }}>
                Close
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => print()}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'UberMove-Regular',
                  color: colors.black,
                }}>
                Print
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const proceedRejectReservation = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to reject reservation?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => props.rejectReservation(reservationId)},
      ],
      {cancelable: false},
    );
  };

  /**
   *
   */
  const ValueMapper = ({
    label = '',
    value = '',
    color = theme.gray,
    hasDivider = true,
  }) => (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        },
        hasDivider
          ? {
              borderBottomColor: theme.gray,
              borderBottomWidth: 0.5,
              paddingVertical: 2,
            }
          : null,
      ]}>
      <View style={styles.orderValues}>
        <Text style={styles.fontBasicStyle}>{label}</Text>
        <Text style={[styles.fontBasicStyle, {alignSelf: 'center'}]}>:</Text>
      </View>
      <View style={{marginLeft: 10, flex: 2}}>
        <Text style={[{...styles.fontBasicStyle}, {color}]}>
          {value || '--'}
        </Text>
      </View>
    </View>
  );

  const CardHeader = () => (
    <View
      style={{
        ...styles.equalGrid,
        borderBottomColor: theme.gray,
        borderBottomWidth: 0.5,
        paddingVertical: 2,
        paddingBottom: 5,
      }}>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 16, fontFamily: 'UberMove-Bold'}}>
          {reservation
            ? `${reservation.first_name} ${reservation.last_name}`
            : '--'}
        </Text>
      </View>
      <View style={styles.orderAmount}>
        <Text style={styles.heading}>
          {reservation.details &&
            reservation.details.length &&
            reservation.details[0].quantity}
        </Text>
        <View style={{flexDirection: 'row'}}>
          {reservation.viewed == 0 && (
            <Image
              style={styles.newImg}
              source={require('../../img/new_icon.png')}
            />
          )}
          <View style={styles.price}>
            <Text style={{color: '#fff'}}>$ 10</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return props.isRequesting && !reservation.id ? (
    <Loader loading={props.isRequesting} />
  ) : (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View>
        {/* <View style={styles.headerView}></View> */}
        <View style={styles.pageContainer}>
          <View
            style={{
              paddingHorizontal: 20,
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: 20,
                backgroundColor: theme.white,
                borderRadius: 10,
              }}>
              <CardHeader />
              <ValueMapper label={'Booking No.'} value={reservation.id} />
              <ValueMapper
                label={'Status'}
                value={reservation.status}
                color={theme.deliverText}
              />
              <ValueMapper
                label={'Order Date'}
                value={reservation.order_date}
                color={theme.deliverText}
              />
              <ValueMapper
                label={'Reservation Date'}
                value={reservation.reservation_date}
                color={theme.deliverText}
              />
              <ValueMapper
                label={'Event'}
                value={reservation.event}
                color={theme.deliverText}
              />
              <ValueMapper
                label={'Guests'}
                value={reservation.guests}
                color={theme.deliverText}
              />
              <ValueMapper label={'Mobile'} value={reservation.mobile} />
              <ValueMapper label={'Email'} value={reservation.email} />
              <ValueMapper label={'Message'} value={reservation.message} />
            </View>
          </View>
        </View>
      </View>
      {(reservation.status == 'pending' ||
        reservation.status == 'processing') && (
        <View style={styles.actionsContainer}>
          {reservation.status == 'pending' ? (
            <>
              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.5}
                onPress={() => props.acceptReservation(reservationId)}>
                <Text style={{color: theme.white, fontFamily: 'UberMove-Bold'}}>
                  ACCEPT
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[{...styles.actionButton}, {backgroundColor: '#464646'}]}
                onPress={() => proceedRejectReservation()}>
                <Text style={{color: theme.white, fontFamily: 'UberMove-Bold'}}>
                  REJECT
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.actionButton, {marginHorizontal: '20%'}]}
              activeOpacity={0.5}
              onPress={() => props.completeReservation(reservationId)}>
              <Text style={{color: theme.white, fontFamily: 'UberMove-Bold'}}>
                COMPLETE
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      {printOptionModal()}
    </View>
  );
};

function bindAction(dispatch) {
  return {
    getSingleReservation: (params) => dispatch(getSingleReservation(params)),
    markReservationViewed: (params) => dispatch(markReservationViewed(params)),
    printReservation: (id, data) => dispatch(printReservation(id, data)),
    acceptReservation: (id) => dispatch(acceptReservation(id)),
    rejectReservation: (id) => dispatch(rejectReservation(id)),
    completeReservation: (id) => dispatch(completeReservation(id)),
  };
}

const mapStateToProps = (state) => ({
  isRequesting: state.reservations.isRequesting,
  reservation: state.reservations.singleReservationDetail,
});

ReservationsDetails = connect(mapStateToProps, bindAction)(ReservationsDetails);

export default ReservationsDetails;
