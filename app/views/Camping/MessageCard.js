import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const MessageCard = ({
  inputStyle,
  onPress,
  showEditIcon,
  onEditPress,
  description,
  onEdit,
  item,
  text,
}) => {
  const countCharacters = () => {
    return text.length;
  };
  return (
    <TouchableOpacity
      style={{alignItems: 'center', ...inputStyle}}
      onPress={onPress}>
      <View style={styles.cardView}>
        <View style={styles.cardTopRow}>
          <MaterialCommunityIcons
            name="message-processing-outline"
            size={22}
            color={'#85d8d0'}
          />
          <Text
            style={{
              fontSize: 18,
              width: width * 0.73,
              marginStart: 10,
              fontFamily: 'UberMove-Bold',
            }}>
            SMS Content
          </Text>

          {showEditIcon === true ? (
            <TouchableOpacity onPress={onEditPress}>
              <Feather name="edit" color="#f0364e" size={22} style={{}} />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.description}>
          <Text
            style={{
              fontSize: 15,
              color: colors.gray,
              fontFamily: 'UberMove-Regular',
              letterSpacing: 1,
            }}>
            {text}
            {/* {item.sms_content} */}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: height * 0.018,
            marginTop: height * 0.01,
          }}>
          <TouchableOpacity>
            <Text style={styles.bottomText}>
              {description ? countCharacters() : '150 characters'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onEdit}>
            <AntDesign
              name="edit"
              size={20}
              color={colors.brand}
              style={{marginHorizontal: 10, alignSelf: 'flex-end'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  cardView: {
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    width: '100%',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 10,
  },
  cardTopRow: {
    marginTop: height * 0.015,
    flexDirection: 'row',
    paddingLeft: height * 0.02,
    alignItems: 'center',
  },
  description: {
    width: width * 0.72,
    marginLeft: height * 0.018,
    marginTop: height * 0.01,
  },
  bottomText: {
    color: '#6dbcb6',
    fontSize: 13,
    marginTop: height * 0.01,
    fontFamily: 'UberMove-Bold',
  },
});
