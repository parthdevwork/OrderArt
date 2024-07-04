import React, {useEffect, useRef} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import CampingButton from './CampingButton';
import CustomTextinput from './CustomTextinput';
import {useSelector} from 'react-redux';
import moment from 'moment';

const VerificationCodeSent = ({...props}) => {
  const resaturantdetails = useSelector(
    (state) => state.restaurants.restaurantDetails,
  );
  const last4Digits = resaturantdetails?.rescontactpercell?.slice(-4);
  const refRBSheet = useRef();

  useEffect(() => {
    if (refRBSheet.current) {
      if (props?.visible) {
        refRBSheet.current.open();
      } else {
        refRBSheet.current.close();
      }
    }
  }, [props?.visible]);

  const formatScheduledDatetime = (time) => {
    const scheduledDatetime = moment(time);
    const now = moment();
    const today = moment().startOf('day');
    const tomorrow = moment().add(1, 'days').startOf('day');

    let formattedDate;

    if (scheduledDatetime.isSame(today, 'day')) {
      formattedDate = `${scheduledDatetime.format('h:mm a')} today`;
    } else if (scheduledDatetime.isSame(tomorrow, 'day')) {
      formattedDate = `${scheduledDatetime.format('h:mm a')} tomorrow`;
    } else {
      formattedDate = scheduledDatetime.format('h:mm a [on] MMMM Do');
    }

    return formattedDate;
  };

  return (
    <Modal animationType="fade" visible={props.visible} transparent={true}>
      <View style={styles.mainView}>
        <TouchableOpacity style={styles.pageVeiw} onPress={props.onClose}>
          <AntDesign name="close" size={20} />
        </TouchableOpacity>
        <View style={styles.whiteBox}>
          <View style={styles.iconBackground}>
            <MaterialCommunityIcons
              name="message-alert"
              size={58}
              color="white"
            />
          </View>
          <Text style={styles.codeSent}>Code Sent</Text>
          <Text style={styles.numberText}>
            We have sent you a code on xxxx{last4Digits}. Please verify the code
            to create the Campaign
          </Text>
          <View style={styles.line} />
          <CampingButton
            name={'Verify'}
            inputStyle={{marginTop: 40, width: '92%'}}
            onPress={() => refRBSheet.current?.open()}
          />
          <CampingButton
            name={'Resend Code'}
            inputStyle={styles.buttonText}
            onPress={() => refRBSheet.current?.open()}
          />
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: {
              height: '50%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              backgroundColor: 'white',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <View style={styles.modelView}>
            <Text style={styles.verificationText}>Verification Code</Text>
            <Text style={styles.sentCodeText}>
              Please enter code sent to xxxx{last4Digits} to create the
              campaign.
            </Text>
            <Text
              style={[
                styles.modalText,
                {
                  fontSize: 20,
                  marginTop: 15,
                  fontWeight: '500',
                  letterSpacing: 1,
                  fontFamily: 'UberMove-Regular',
                },
              ]}>
              {props?.campingData?.campaign_name} Campaign{'\n'}Click to Details
            </Text>

            <Text
              style={[styles.sentCodeText, {marginTop: 10, marginStart: 18}]}>
              Scheduled for{' '}
              {formatScheduledDatetime(props?.campingData?.scheduled_datetime)}
            </Text>
            <CustomTextinput
              label={'Please enter verification code'}
              textInputStyle={{height: 50}}
              multiline={false}
              number={true}
              onChangeText={props.onChangeText}
            />
            <TouchableOpacity
              onPress={() => {
                props.onVerify();
              }}
              style={styles.verifyButton}>
              <Text style={styles.verifyText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  pageVeiw: {
    height: 35,
    width: 35,
    marginTop: 35,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  whiteBox: {
    backgroundColor: 'white',
    height: 550,
    width: '100%',
    marginTop: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {marginTop: 20, width: '92%'},
  line: {
    width: '90%',
    alignItems: 'center',
    height: 2,
    backgroundColor: '#e1e2e4',
    marginTop: 25,
  },
  numberText: {
    width: '85%',
    color: '#5a6368',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'UberMove-Regular',
  },
  iconBackground: {
    height: 120,
    width: 120,
    backgroundColor: '#f0364e',
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 105,
  },
  modalText: {
    paddingHorizontal: 15,
  },
  input: {
    marginHorizontal: 4,
    height: 50,
    borderWidth: 2,
    borderColor: '#584cbe',
    borderRadius: 11,
    marginTop: 18,
    paddingLeft: 10,
  },
  textViewDes: {
    top: 169,
    left: 28,
    fontSize: 12,
    zIndex: 1,
    backgroundColor: 'white',
    position: 'absolute',
  },
  modelView: {
    flex: 1,
    backgroundColor: 'white',
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 15,
  },
  verificationText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 25,
    fontFamily: 'UberMove-Bold',
  },
  codeSent: {fontSize: 30, marginTop: 8, fontFamily: 'UberMove-Bold'},
  verifyButton: {
    paddingVertical: 14,
    backgroundColor: '#f0364e',
    borderRadius: 10,
    marginTop: 25,
    width: '78%',
    alignSelf: 'center',
  },
  verifyText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontFamily: 'UberMove-Bold',
  },
  mainView: {flex: 1, backgroundColor: '#f3f4f8', paddingHorizontal: 15},
  sentCodeText: {
    marginTop: 5,
    color: '#696d70',
    fontSize: 14,
    letterSpacing: 0.5,
    fontFamily: 'UberMove-Regular',
  },
});

export default VerificationCodeSent;
