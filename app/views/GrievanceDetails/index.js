import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Image,
  Linking,
  TextInput,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  keyboadav,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import theme from '../../theme';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {getSingleGrievance, closeGrievance} from '../../redux/actions';
import Loader from '../../components/Loader';

const GrievanceDetails = (props) => {
  const [remarks, setRemarks] = useState('');

  const {grievance} = props;
  const grievanceId = props.route.params.id;

  useEffect(() => {
    props.getSingleGrievance(grievanceId);
  }, []);

  const proceedCloseGrievance = () => {
    const data = {
      comment: remarks,
    };
    Alert.alert(
      'Confirmation',
      'Are you sure you want to close grievance?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => props.closeGrievance(grievanceId, data)},
      ],
      {cancelable: false},
    );
  };

  const CardHeader = () => (
    <View style={{...styles.equalGrid, flexDirection: 'column'}}>
      <View style={styles.headerContainer}>
        <Text style={{fontSize: 20, flex: 1, alignSelf: 'center'}}>
          {grievance.customer && grievance.customer.name}
        </Text>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() =>
            Linking.openURL('tel:' + grievance.customer.contact).catch(
              (error) => {
                console.log('Error when handling phone', error);
              },
            )
          }>
          <Image style={styles.call} source={require('../../img/call.png')} />
          <Text style={{fontSize: 18, fontWeight: '300'}}>
            {grievance.customer && grievance.customer.contact}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ValueMapper = ({label, value, color = theme.gray}) => (
    <View style={styles.equalGrid}>
      <View style={styles.orderValues}>
        <Text style={styles.fontBasicStyle} numberOfLines={1}>
          {label}
        </Text>
        <Text style={styles.fontBasicStyle}>:</Text>
      </View>
      <View style={{flex: 1, marginLeft: 10}}>
        <Text style={[{...styles.fontBasicStyle}, {color}]}>{value}</Text>
      </View>
    </View>
  );
  const Heading = ({label, color = theme.deliverText}) => (
    <Text
      style={[{...styles.fontBasicStyle}, {color, fontFamily: 'Roboto-Bold'}]}
      numberOfLines={1}>
      {label}
    </Text>
  );

  const renderData = () => (
    <View style={styles.container}>
      {/* <View style={styles.headerView}></View> */}
      <View style={styles.pageContainer}>
        <View style={styles.card}>
          <KeyboardAwareScrollView
            contentContainerStyle={{padding: 0, margin: 0, bottom: 0}}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={true}>
            <CardHeader />
            <View style={{marginTop: 5}}>
              <Heading label={'Order Details : '} />
              <ValueMapper label={'Order No.'} value={grievance.order_id} />
              <ValueMapper
                label={'Order Date'}
                value={grievance.last_modified && grievance.last_modified.at}
              />
              <ValueMapper
                label={'Comments'}
                value={grievance.comments && grievance.comments.by_customer}
              />
              <ValueMapper label={'Reason'} value={grievance.subject} />
              <Heading label={'Grievance Type : '} />
              <Text style={styles.note}>
                {grievance.subject && grievance.subject}
              </Text>
              {grievance.comments &&
                grievance.comments.by_restaurant &&
                grievance.comments.by_restaurant != 'none' && (
                  <View style={{marginTop: 5}}>
                    <Heading label={'Closing Comment: : '} />
                    <Text style={styles.note}>
                      {grievance.comments.by_restaurant}
                    </Text>
                  </View>
                )}
            </View>
            {grievance.status == 'open' && (
              <>
                <View style={{paddingBottom: 20}}>
                  <TextInput
                    style={{
                      height: 80,
                      backgroundColor: theme.lighterGray,
                      fontSize: 18,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      fontFamily: 'Roboto-Regular',
                    }}
                    placeholder={'Restaurant Comments'}
                    placeholderTextColor={theme.gray}
                    onChangeText={(text) => setRemarks(text)}
                    value={remarks}
                  />
                </View>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => proceedCloseGrievance()}>
                  <Text style={{color: theme.white, fontFamily: 'Roboto-Bold'}}>
                    Close Grievance
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </KeyboardAwareScrollView>
        </View>
      </View>
    </View>
  );

  return props.isRequesting && !grievance.id ? (
    <Loader loading={props.isRequesting} />
  ) : (
    renderData()
  );
};

function bindAction(dispatch) {
  return {
    getSingleGrievance: (params) => dispatch(getSingleGrievance(params)),
    closeGrievance: (id, data) => dispatch(closeGrievance(id, data)),
  };
}

const mapStateToProps = (state) => ({
  isRequesting: state.grievance.isRequesting,
  grievance: state.grievance.singleGrievanceDetail,
});

const _GrievanceDetails = connect(
  mapStateToProps,
  bindAction,
)(GrievanceDetails);

export default _GrievanceDetails;
