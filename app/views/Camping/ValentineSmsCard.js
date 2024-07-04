import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../theme/colors';

const width = Dimensions.get('screen').width;

const ValentineSmsCard = ({item, onPress, selectData}) => {
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(100,100,100,0.5)',
    },
    modalView: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 15,
    },
    messageCardView: {
      width: '100%',
      paddingVertical: 10,
      marginTop: 8,
      borderWidth: selectData == item.id ? 1 : null,
      borderColor: selectData == item.id ? '#f0364e' : null,

      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 1,
      backgroundColor: '#ffffff',
    },
    textViewDes: {
      top: -6,
      left: 18,
      fontSize: 12,
      zIndex: 1,
      backgroundColor: 'white',
      position: 'absolute',
      fontFamily: 'UberMove-Regular',
    },
    input: {
      marginHorizontal: 4,
      height: 130,
      width: '100%',
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 11,
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.messageCardView}
      activeOpacity={0.8}>
      <View style={{width: '90%', paddingLeft: 10}}>
        <Text
          style={{
            marginTop: 7,
            color: colors.darkGray,
            fontSize: 12,
            fontFamily: 'UberMove-Regular',
          }}>
          {item.sms_content}
        </Text>
        <Text
          style={{
            marginTop: 3,
            color: colors.darkGray,
            fontSize: 12,
            fontFamily: 'UberMove-Regular',
          }}>
          {item.created_by}
        </Text>
        <Text
          style={{
            marginTop: 1,
            color: colors.darkGray,
            fontSize: 13,
            fontFamily: 'UberMove-Regular',
          }}>
          {item.link}
        </Text>

        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="message-processing-outline"
            size={22}
            color={'#509088'}
            style={{width: width * 0.07}}
          />
          <Text
            style={{
              color: item.charcter > 150 ? colors.brand : '#509088',
              marginRight: '63%',
              fontFamily: 'UberMove-Bold',
            }}>
            {item.charcter} charaters
          </Text>
          {selectData.id == item.id ? (
            <TouchableOpacity>
              <FontAwesome5 name="pen" color={'#f0364e'} size={15} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ValentineSmsCard;
