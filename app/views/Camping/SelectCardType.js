import React from 'react';
import {Text, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const width = Dimensions.get('screen').width;

const SelectCardType = ({...props}) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.leftbutton,
        {borderColor: props.selectedId === props.item.id ? '#f0364e' : 'black'},
      ]}>
      <Feather
        name={props.item.icon}
        size={20}
        color={props.selectedId === props.item.id ? '#f0364e' : '#776bc7'}
      />
      <Text
        style={{
          marginTop: 10,
          fontFamily: 'UberMove-Regular',
          color: props.selectedId === props.item.id ? '#f0364e' : '#68686a',
        }}>
        {' '}
        {props.item.type}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  leftbutton: {
    paddingVertical: 18,
    width: width * 0.45,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});

export default SelectCardType;
