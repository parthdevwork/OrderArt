import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../theme/colors';

const CampingButton = ({name, inputStyle, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {...inputStyle}]}
      onPress={onPress}>
      <FontAwesome5 name="clipboard-list" size={25} style={{color: 'white'}} />
      <Text style={styles.buttonTxet}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CampingButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    flexDirection: 'row',
  },
  buttonTxet: {
    color: 'white',
    fontSize: 17,
    paddingLeft: 10,
    fontFamily: 'UberMove-Bold',
  },
});
