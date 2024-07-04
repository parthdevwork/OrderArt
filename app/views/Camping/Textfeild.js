import {Dimensions, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';

const height = Dimensions.get('screen').height;

const Textfeild = ({
  placeholder,
  inputStyle,
  value,
  onChangeText,
  paddingVertical,
}) => {
  return (
    <View
      style={[
        styles.textFieldView,
        {paddingVertical: paddingVertical, ...inputStyle},
      ]}>
      <TextInput
        style={{
          marginHorizontal: 15,
          paddingVertical: 15,
          fontFamily: 'UberMove-Regular',
        }}
        placeholder={placeholder}
        placeholderTextColor={'black'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default Textfeild;

const styles = StyleSheet.create({
  textFieldView: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    width: '100%',
    justifyContent: 'center',
  },
});
